"use client";

import { FaExternalLinkAlt } from "react-icons/fa";

interface CertificateItem {
  id: number;
  title: string;
  year: number;
  link: string;
}

interface CertificateSectionProps {
  darkMode: boolean;
}

const certificates: CertificateItem[] = [
  {
    id: 1,
    title: "Java Bootcamp",
    year: 2024,
    link: "/certificate/Ridho-Akbarsyah.pdf",
  },
  {
    id: 2,
    title: "Belajar Dasar Pemrograman Web",
    year: 2024,
    link: "/certificate/sertifikat_course_123_336732_040324065936.pdf",
  },
  {
    id: 3,
    title: "Belajar Dasar Pemrograman JavaScript",
    year: 2023,
    link: "/certificate/sertifikat_course.pdf",
  },
];

export default function CertificateSection({ darkMode }: CertificateSectionProps) {
  return (
    <section
      id="certificate"
      className={`relative py-28 transition-colors duration-500
        ${darkMode ? "bg-[radial-gradient(circle_at_top,_#020617,_#000)]" : "bg-[radial-gradient(circle_at_top,_#f8fafc,_#ffffff)]"}`}
    >
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-140px] left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-400/15 blur-[140px]" />
      </div>

      <div className="relative container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2
            className={`text-4xl md:text-5xl font-extrabold tracking-tight
              ${darkMode ? "text-white drop-shadow-[0_0_18px_rgba(56,189,248,0.5)]" : "text-gray-900"}`}
          >
            Certificates
          </h2>
          <p className="mt-4 text-sm md:text-base opacity-70">Verified learning & professional milestones</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div
            className={`absolute left-[18px] top-0 h-full w-px
              ${darkMode ? "bg-gradient-to-b from-cyan-400/40 via-cyan-400/10 to-transparent" : "bg-gradient-to-b from-blue-500/40 via-blue-500/10 to-transparent"}`}
          />

          <div className="space-y-10 pl-14">
            {certificates.map((item) => (
              <div key={item.id} className="relative group">
                {/* Dot */}
                <div
                  className={`absolute left-[-14px] top-2 h-3 w-3 rounded-full
                    transition-all duration-300
                    ${darkMode ? "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" : "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"}`}
                />

                {/* Card */}
                <div
                  className={`flex items-center justify-between gap-6 rounded-xl p-6
                    backdrop-blur-xl border transition-all duration-300
                    hover:-translate-y-1
                    ${darkMode ? "bg-white/5 border-white/10 hover:border-cyan-400/40" : "bg-white border-gray-200 hover:border-blue-500/40"}`}
                >
                  {/* Info */}
                  <div>
                    <h3
                      className={`text-lg font-semibold transition-colors
                        ${darkMode ? "text-white group-hover:text-cyan-300" : "text-gray-900 group-hover:text-blue-600"}`}
                    >
                      {item.title}
                    </h3>
                    <span className="mt-1 block text-sm opacity-60">{item.year}</span>
                  </div>

                  {/* Link */}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 text-sm font-medium
                      transition-colors
                      ${darkMode ? "text-cyan-300 hover:text-cyan-200" : "text-blue-600 hover:text-blue-500"}`}
                  >
                    View
                    <FaExternalLinkAlt size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
