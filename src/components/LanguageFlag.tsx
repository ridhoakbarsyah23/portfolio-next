import type { Language } from "@/components/LanguageProvider";

export default function LanguageFlag({ language }: { language: Language }) {
  if (language === "id") {
    return (
      <svg viewBox="0 0 24 16" className="language-flag-svg" aria-hidden="true">
        <rect width="24" height="8" fill="#CE1126" />
        <rect y="8" width="24" height="8" fill="#FFFFFF" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 60 30" className="language-flag-svg" aria-hidden="true">
      <clipPath id="uk-flag-clip">
        <rect width="60" height="30" rx="1" />
      </clipPath>
      <g clipPath="url(#uk-flag-clip)">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0 0 60 30M60 0 0 30" stroke="#FFFFFF" strokeWidth="6" />
        <path d="M0 0 60 30M60 0 0 30" stroke="#C8102E" strokeWidth="2" />
        <path d="M30 0v30M0 15h60" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}
