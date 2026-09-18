export interface ExperienceItem {
  year: string;
  title: string;
  company: string;
  desc: string[];
}

export const experienceTimeline: ExperienceItem[] = [
  {
    year: "Desember 2025 - Saat ini",
    title: "Programmer",
    company: "Freelance",
    desc: [
      "Mengembangkan aplikasi POS untuk UMKM.",
      "Mengembangkan aplikasi AI Agent untuk customer service.",
    ],
  },
  {
    year: "Agustus 2025 - November 2025",
    title: "Programmer",
    company: "PT Data Kreatif",
    desc: [
      "Mengembangkan dan memelihara fitur pada sistem SIMRS dan EMR untuk mendukung operasional rumah sakit.",
      "Mengidentifikasi dan memperbaiki bug aplikasi untuk meningkatkan stabilitas dan keandalan sistem.",
      "Berkoordinasi dengan tim implementor dan pengguna rumah sakit untuk memahami kebutuhan serta menerjemahkannya menjadi solusi teknis.",
      "Melakukan testing dan debugging untuk memastikan fitur berjalan sesuai kebutuhan dan fungsi yang ditentukan.",
      "Melakukan peningkatan dan penyesuaian fitur berdasarkan feedback pengguna dan kebutuhan operasional.",
    ],
  },
  {
    year: "Januari 2025 - Juli 2025",
    title: "Programmer",
    company: "Freelance",
    desc: [
      "Mengembangkan dan merancang aplikasi Dieng Run Event.",
    ],
  },
  {
    year: "Januari 2023 - Januari 2024",
    title: "Frontend Developer",
    company: "PT Tristar Surya Gemilang",
    desc: [
      "Mengembangkan fitur pada SISAPPRA versi 2.0 Satpol PP DKI Jakarta.",
      "Mengembangkan fitur pada NEW LMS Bank BJB untuk segmen UMKM.",
    ],
  },
  {
    year: "Juli 2021 - September 2021",
    title: "Frontend Developer Intern",
    company: "CV Bahira Studio",
    desc: [
      'Merancang ulang antarmuka pengguna (UI) untuk website sistem keuangan "Laraduit".',
      "Mengembangkan tampilan antarmuka yang lebih terstruktur dan sesuai dengan kebutuhan sistem.",
    ],
  },
];
