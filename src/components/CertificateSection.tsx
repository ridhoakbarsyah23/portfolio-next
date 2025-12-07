"use client";
import { FaExternalLinkAlt } from "react-icons/fa";

interface CertificateItem {
  id: number;
  title: string;
  pdf: string;
}

interface CertificateSectionProps {
  darkMode: boolean;
}

const certificates: CertificateItem[] = [
  { id: 1, title: "Java Bootcamp", pdf: "/certificate/Ridho-Akbarsyah.pdf" },
  {
    id: 2,
    title: "Belajar Dasar Pemrograman Web",
    pdf: "/certificate/sertifikat_course_123_336732_040324065936.pdf",
  },
  {
    id: 3,
    title: "Belajar Dasar Pemrograman JavaScript",
    pdf: "/certificate/sertifikat_course.pdf",
  },
];

export default function CertificateSection({ darkMode }: CertificateSectionProps) {
  return (
    <section id="certificate" className={`py-20 transition-all duration-300 ${darkMode ? "bg-gradient-to-b from-black to-gray-900" : "bg-gradient-to-b from-gray-100 to-white"}`}>
      <div className="container mx-auto px-6">
        <h2 className={`text-4xl font-extrabold text-center drop-shadow-lg tracking-wide ${darkMode ? "text-white" : "text-gray-900"}`}>My Certificate 🏆</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10 justify-items-center">
          {certificates.map((item) => (
            <div
              key={item.id}
              className={`group p-5 w-full max-w-sm rounded-2xl shadow-xl backdrop-blur-xl border transition-all duration-300 hover:scale-[1.05]
              ${darkMode ? "bg-gray-800/50 border-gray-700 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,255,255,0.4)]" : "bg-white border-gray-300 hover:border-blue-500 hover:shadow-[0_0_25px_rgba(0,132,255,0.4)]"}`}
            >
              <embed
                src={`${item.pdf}#zoom=100&toolbar=0&page=1`}
                type="application/pdf"
                className={`w-full h-56 rounded-xl border mb-4 transition-all duration-300 ${darkMode ? "border-gray-600 group-hover:border-cyan-400" : "border-gray-300 group-hover:border-blue-500"}`}
              />

              <h3 className={`text-lg font-semibold text-center mt-3 transition-colors ${darkMode ? "text-white group-hover:text-cyan-300" : "text-gray-800 group-hover:text-blue-600"}`}>{item.title}</h3>

              <a
                href={item.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 w-full mt-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                ${darkMode ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400 hover:bg-cyan-400 hover:text-black" : "bg-blue-500/20 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white"}`}
              >
                View Document <FaExternalLinkAlt size={12} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
