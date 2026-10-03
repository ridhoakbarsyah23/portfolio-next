export interface ExperienceItem {
  year: string;
  yearEn: string;
  title: string;
  company: string;
  desc: string[];
  descEn: string[];
}

export const experienceTimeline: ExperienceItem[] = [
  {
    year: "Desember 2025 - Saat ini",
    yearEn: "December 2025 - Present",
    title: "Programmer",
    company: "Freelance",
    desc: [
      "Mengembangkan aplikasi POS untuk UMKM.",
      "Mengembangkan aplikasi AI Agent untuk customer service.",
    ],
    descEn: [
      "Developing POS applications for small and medium businesses.",
      "Developing an AI agent application for customer service.",
    ],
  },
  {
    year: "Agustus 2025 - November 2025",
    yearEn: "August 2025 - November 2025",
    title: "Programmer",
    company: "PT Data Kreatif",
    desc: [
      "Mengembangkan dan memelihara fitur pada sistem SIMRS dan EMR untuk mendukung operasional rumah sakit.",
      "Mengidentifikasi dan memperbaiki bug aplikasi untuk meningkatkan stabilitas dan keandalan sistem.",
      "Berkoordinasi dengan tim implementor dan pengguna rumah sakit untuk memahami kebutuhan serta menerjemahkannya menjadi solusi teknis.",
      "Melakukan testing dan debugging untuk memastikan fitur berjalan sesuai kebutuhan dan fungsi yang ditentukan.",
      "Melakukan peningkatan dan penyesuaian fitur berdasarkan feedback pengguna dan kebutuhan operasional.",
    ],
    descEn: [
      "Developed and maintained features in SIMRS and EMR systems to support hospital operations.",
      "Identified and fixed application bugs to improve system stability and reliability.",
      "Coordinated with implementation teams and hospital users to translate their needs into technical solutions.",
      "Performed testing and debugging to ensure features met defined requirements.",
      "Improved and adjusted features based on user feedback and operational needs.",
    ],
  },
  {
    year: "Januari 2025 - Juli 2025",
    yearEn: "January 2025 - July 2025",
    title: "Programmer",
    company: "Freelance",
    desc: [
      "Mengembangkan dan merancang aplikasi Dieng Run Event.",
    ],
    descEn: ["Developed and designed the Dieng Run event application."],
  },
  {
    year: "Januari 2023 - Januari 2024",
    yearEn: "January 2023 - January 2024",
    title: "Frontend Developer",
    company: "PT Tristar Surya Gemilang",
    desc: [
      "Mengembangkan fitur pada SISAPPRA versi 2.0 Satpol PP DKI Jakarta.",
      "Mengembangkan fitur pada NEW LMS Bank BJB untuk segmen UMKM.",
    ],
    descEn: [
      "Developed features for SISAPPRA 2.0 for Satpol PP DKI Jakarta.",
      "Developed features for Bank BJB's new LMS for the small-business segment.",
    ],
  },
  {
    year: "Juli 2021 - September 2021",
    yearEn: "July 2021 - September 2021",
    title: "Frontend Developer Intern",
    company: "CV Bahira Studio",
    desc: [
      'Merancang ulang antarmuka pengguna (UI) untuk website sistem keuangan "Laraduit".',
      "Mengembangkan tampilan antarmuka yang lebih terstruktur dan sesuai dengan kebutuhan sistem.",
    ],
    descEn: [
      'Redesigned the user interface for the "Laraduit" financial system website.',
      "Developed a more structured interface aligned with system requirements.",
    ],
  },
];
