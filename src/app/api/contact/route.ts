import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_TO_EMAIL = "dev.ridho.akbarsyah@gmail.com";
const DEFAULT_FROM_EMAIL = "Portfolio Contact <onboarding@resend.dev>";

function cleanText(value: unknown) {
  return String(value || "").trim();
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validatePayload(name: string, email: string, message: string) {
  if (name.length < 2) {
    return "Name must be at least 2 characters.";
  }

  if (!isValidEmail(email)) {
    return "Please enter a valid email address.";
  }

  if (message.length < 10) {
    return "Message must be at least 10 characters.";
  }

  if (message.length > 3000) {
    return "Message is too long. Please keep it under 3000 characters.";
  }

  return "";
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { name?: string; email?: string; message?: string };
    const name = cleanText(body.name);
    const email = cleanText(body.email);
    const message = cleanText(body.message);
    const validationError = validatePayload(name, email, message);

    if (validationError) {
      return NextResponse.json({ message: validationError }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM_EMAIL;

    if (!resendApiKey) {
      return NextResponse.json(
        {
          code: "CONTACT_NOT_CONFIGURED",
          message: "Direct email delivery is not configured yet.",
        },
        { status: 503 },
      );
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Portfolio inquiry from ${name}`,
        text: `${message}\n\nFrom: ${name}\nEmail: ${email}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; padding: 40px 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
              
              <!-- Header -->
              <div style="background-color: #2563EB; padding: 32px 40px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">New Portfolio Inquiry</h1>
                <p style="color: #bfdbfe; margin: 8px 0 0 0; font-size: 15px;">You have a new message from a potential client.</p>
              </div>

              <!-- Body -->
              <div style="padding: 40px;">
                <div style="margin-bottom: 24px;">
                  <p style="margin: 0 0 4px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; font-weight: 600;">Sender</p>
                  <p style="margin: 0; font-size: 16px; color: #111827; font-weight: 500;">${escapeHtml(name)}</p>
                </div>
                
                <div style="margin-bottom: 32px;">
                  <p style="margin: 0 0 4px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; font-weight: 600;">Email Address</p>
                  <a href="mailto:${escapeHtml(email)}" style="margin: 0; font-size: 16px; color: #2563EB; text-decoration: none; font-weight: 500;">${escapeHtml(email)}</a>
                </div>

                <div style="margin-bottom: 32px; background-color: #f3f4f6; padding: 24px; border-radius: 8px; border-left: 4px solid #2563EB;">
                  <p style="margin: 0 0 12px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; font-weight: 600;">Message</p>
                  <p style="margin: 0; font-size: 15px; color: #374151; line-height: 1.6;">${escapeHtml(message).replace(/\\n/g, "<br />")}</p>
                </div>

                <!-- Action Button -->
                <div style="text-align: center; margin-top: 40px;">
                  <a href="mailto:${escapeHtml(email)}?subject=Re: Portfolio Inquiry" style="display: inline-block; background-color: #111827; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 15px;">Reply to ${escapeHtml(name)}</a>
                </div>
              </div>

              <!-- Footer -->
              <div style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; font-size: 13px; color: #9ca3af;">Sent automatically from your Portfolio Website.</p>
              </div>

            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend API Error:", response.status, errorText);
      return NextResponse.json({ message: `Failed to send message: ${errorText}` }, { status: 502 });
    }

    return NextResponse.json({ message: "Message sent successfully." });
  } catch {
    return NextResponse.json({ message: "Unable to process contact request." }, { status: 500 });
  }
}
