export const siteConfig = {
  name: "Ridho Akbarsyah Ramadhan",
  title: "Ridho Akbarsyah Ramadhan - Frontend Developer Portfolio",
  description:
    "Portfolio Ridho Akbarsyah Ramadhan, Frontend Developer from Cilacap with experience in government, healthcare, reporting dashboards, and web application development.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  author: "Ridho Akbarsyah Ramadhan",
  keywords: [
    "Ridho Akbarsyah Ramadhan",
    "Frontend Developer",
    "Next.js Developer",
    "React Developer",
    "Laravel Developer",
    "Portfolio Developer",
    "Cilacap Developer",
    "Government Dashboard",
    "Healthcare System",
    "SIMRS",
    "EMR",
  ],
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
