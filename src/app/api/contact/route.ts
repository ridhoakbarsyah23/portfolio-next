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
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>New portfolio inquiry</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ message: "Failed to send message. Please try again later." }, { status: 502 });
    }

    return NextResponse.json({ message: "Message sent successfully." });
  } catch {
    return NextResponse.json({ message: "Unable to process contact request." }, { status: 500 });
  }
}
