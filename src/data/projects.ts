import type { Language } from "@/components/LanguageProvider";

export interface ProjectContent {
  title: string;
  category: string;
  role: string;
  organization: string;
  period: string;
  location?: string;
  desc: string;
  overview: string;
  contributions: string[];
  scope: string[];
}

export interface ProjectItem {
  id: string;
  tags: string[];
  image?: string;
  content: Record<Language, ProjectContent>;
}

export const projects: ProjectItem[] = [
  {
    id: "pos-point-of-sale",
    tags: ["POS", "Sales", "Inventory", "Reporting"],
    content: {
      id: {
        title: "POS (Point of Sale)",
        category: "Sistem Bisnis",
        role: "Programmer",
        organization: "Freelance",
        period: "Desember 2025 - Saat ini",
        location: "Cilacap & Purwokerto, Jawa Tengah",
        desc: "Sistem terintegrasi untuk mengelola transaksi penjualan, pembayaran, inventori, dan pelaporan.",
        overview: "Proyek freelance yang dikembangkan untuk membantu UMKM menjalankan proses penjualan dan operasional utama melalui satu sistem POS.",
        contributions: ["Mengembangkan aplikasi POS untuk UMKM."],
        scope: ["Transaksi penjualan", "Pembayaran", "Inventori", "Pelaporan terintegrasi"],
      },
      en: {
        title: "POS (Point of Sale)",
        category: "Business System",
        role: "Programmer",
        organization: "Freelance",
        period: "December 2025 - Present",
        location: "Cilacap & Purwokerto, Central Java",
        desc: "An integrated system for managing sales transactions, payments, inventory, and reporting.",
        overview: "A freelance project developed to help small and medium businesses manage their core sales and operational processes through one POS system.",
        contributions: ["Developing a POS application for small and medium businesses."],
        scope: ["Sales transactions", "Payments", "Inventory", "Integrated reporting"],
      },
    },
  },
  {
    id: "ai-agent-customer-service",
    tags: ["AI Agent", "WhatsApp", "Customer Service", "Automation"],
    content: {
      id: {
        title: "AI Agent Customer Service",
        category: "Kecerdasan Buatan",
        role: "Programmer",
        organization: "Freelance",
        period: "Desember 2025 - Saat ini",
        location: "Cilacap & Purwokerto, Jawa Tengah",
        desc: "Sistem AI Customer Service yang mengotomatisasi interaksi pelanggan melalui WhatsApp.",
        overview: "AI Agent ini dirancang untuk membantu proses layanan pelanggan melalui WhatsApp, dari penanganan pertanyaan hingga kebutuhan transaksi dan pengiriman.",
        contributions: ["Mengembangkan aplikasi AI Agent untuk customer service."],
        scope: ["Pemrosesan pertanyaan pelanggan", "Informasi produk", "Pemesanan dan pembayaran", "Estimasi serta biaya pengiriman"],
      },
      en: {
        title: "AI Agent Customer Service",
        category: "Artificial Intelligence",
        role: "Programmer",
        organization: "Freelance",
        period: "December 2025 - Present",
        location: "Cilacap & Purwokerto, Central Java",
        desc: "An AI customer service system that automates customer interactions through WhatsApp.",
        overview: "This AI Agent supports customer service processes through WhatsApp, from handling questions to transaction and shipping needs.",
        contributions: ["Developing an AI Agent application for customer service."],
        scope: ["Customer question processing", "Product information", "Ordering and payments", "Shipping estimates and costs"],
      },
    },
  },
  {
    id: "simrs",
    tags: ["SIMRS", "Healthcare", "Integrated System"],
    image: "/projects/simrs.jpg",
    content: {
      id: {
        title: "SIMRS",
        category: "Kesehatan",
        role: "Programmer",
        organization: "PT Data Kreatif",
        period: "Agustus 2025 - November 2025",
        location: "Cileungsi, Bogor",
        desc: "Sistem terintegrasi untuk mendukung operasional rumah sakit secara daring.",
        overview: "Sistem Informasi Manajemen Rumah Sakit mendukung alur operasional dari pendaftaran pasien dan pelayanan medis hingga rekam medis dan laporan administrasi.",
        contributions: [
          "Mengembangkan dan memelihara fitur untuk mendukung operasional rumah sakit.",
          "Mengidentifikasi dan memperbaiki bug untuk meningkatkan stabilitas dan keandalan sistem.",
          "Berkoordinasi dengan tim implementor dan pengguna rumah sakit untuk menerjemahkan kebutuhan menjadi solusi teknis.",
          "Melakukan testing, debugging, serta penyesuaian fitur berdasarkan feedback pengguna.",
        ],
        scope: ["Pendaftaran pasien", "Pelayanan medis", "Manajemen rekam medis", "Laporan administrasi"],
      },
      en: {
        title: "SIMRS",
        category: "Healthcare",
        role: "Programmer",
        organization: "PT Data Kreatif",
        period: "August 2025 - November 2025",
        location: "Cileungsi, Bogor",
        desc: "An integrated system supporting online hospital operations.",
        overview: "The Hospital Management Information System supports operational workflows from patient registration and medical services to medical records and administrative reporting.",
        contributions: [
          "Developed and maintained features supporting hospital operations.",
          "Identified and fixed bugs to improve system stability and reliability.",
          "Coordinated with implementation teams and hospital users to translate requirements into technical solutions.",
          "Performed testing, debugging, and feature adjustments based on user feedback.",
        ],
        scope: ["Patient registration", "Medical services", "Medical record management", "Administrative reporting"],
      },
    },
  },
  {
    id: "emr",
    tags: ["EMR", "Healthcare", "Medical Records"],
    image: "/projects/emr.jpg",
    content: {
      id: {
        title: "EMR",
        category: "Rekam Medis",
        role: "Programmer",
        organization: "PT Data Kreatif",
        period: "Agustus 2025 - November 2025",
        location: "Cileungsi, Bogor",
        desc: "Sistem rekam medis elektronik yang digunakan untuk mendukung operasional rumah sakit.",
        overview: "EMR merupakan salah satu sistem yang dikembangkan dan dipelihara selama bekerja di PT Data Kreatif untuk mendukung kebutuhan operasional rumah sakit.",
        contributions: [
          "Mengembangkan dan memelihara fitur pada sistem EMR.",
          "Memperbaiki bug serta melakukan testing dan debugging.",
          "Menyesuaikan fitur berdasarkan kebutuhan operasional dan feedback pengguna.",
        ],
        scope: ["Rekam medis elektronik", "Pemeliharaan fitur", "Perbaikan bug", "Testing dan debugging"],
      },
      en: {
        title: "EMR",
        category: "Medical Records",
        role: "Programmer",
        organization: "PT Data Kreatif",
        period: "August 2025 - November 2025",
        location: "Cileungsi, Bogor",
        desc: "An electronic medical record system used to support hospital operations.",
        overview: "EMR was one of the systems developed and maintained while working at PT Data Kreatif to support hospital operational needs.",
        contributions: [
          "Developed and maintained features in the EMR system.",
          "Fixed bugs and performed testing and debugging.",
          "Adjusted features based on operational needs and user feedback.",
        ],
        scope: ["Electronic medical records", "Feature maintenance", "Bug fixing", "Testing and debugging"],
      },
    },
  },
  {
    id: "dieng-run-event",
    tags: ["Responsive Web App", "Registration", "Payment", "Event"],
    content: {
      id: {
        title: "Dieng Run Event",
        category: "Platform Event",
        role: "Programmer",
        organization: "Freelance",
        period: "Januari 2025 - Juli 2025",
        location: "Cilacap, Jawa Tengah",
        desc: "Responsive web app untuk mendukung pengelolaan dan pendaftaran event lari di kawasan Dieng.",
        overview: "Aplikasi ini membantu peserta menjalani proses pendaftaran event serta memperoleh informasi yang dibutuhkan terkait Dieng Run.",
        contributions: ["Mengembangkan dan merancang aplikasi Dieng Run Event."],
        scope: ["Registrasi peserta", "Pengelolaan data pendaftaran", "Pembayaran", "Informasi event"],
      },
      en: {
        title: "Dieng Run Event",
        category: "Event Platform",
        role: "Programmer",
        organization: "Freelance",
        period: "January 2025 - July 2025",
        location: "Cilacap, Central Java",
        desc: "A responsive web app supporting the management and registration of a running event in Dieng.",
        overview: "The application helps participants complete event registration and access relevant information about Dieng Run.",
        contributions: ["Developed and designed the Dieng Run Event application."],
        scope: ["Participant registration", "Registration data management", "Payments", "Event information"],
      },
    },
  },
  {
    id: "sisappra-satpol-pp-dki-jakarta",
    tags: ["SISAPPRA 2.0", "Government", "Monitoring"],
    image: "/projects/sisappra.png",
    content: {
      id: {
        title: "SISAPPRA Satpol PP DKI Jakarta",
        category: "Pemerintahan",
        role: "Frontend Developer",
        organization: "PT Tristar Surya Gemilang",
        period: "Januari 2023 - Januari 2024",
        location: "Purwokerto, Jawa Tengah",
        desc: "Sistem informasi untuk mengelola dan memantau aspek penegakan peraturan daerah, keamanan, dan ketertiban.",
        overview: "SISAPPRA versi 2.0 digunakan oleh Satpol PP Provinsi DKI Jakarta untuk mendukung pengelolaan dan pemantauan aktivitas terkait tugas instansi.",
        contributions: ["Mengembangkan fitur pada SISAPPRA versi 2.0 Satpol PP DKI Jakarta."],
        scope: ["Pengelolaan informasi", "Pemantauan penegakan peraturan daerah", "Tugas keamanan", "Ketertiban wilayah"],
      },
      en: {
        title: "SISAPPRA Satpol PP DKI Jakarta",
        category: "Government",
        role: "Frontend Developer",
        organization: "PT Tristar Surya Gemilang",
        period: "January 2023 - January 2024",
        location: "Purwokerto, Central Java",
        desc: "An information system for managing and monitoring regional regulation enforcement, security, and public order.",
        overview: "SISAPPRA 2.0 is used by Satpol PP DKI Jakarta to support the management and monitoring of activities related to the agency's responsibilities.",
        contributions: ["Developed features for SISAPPRA 2.0 for Satpol PP DKI Jakarta."],
        scope: ["Information management", "Regional regulation enforcement monitoring", "Security duties", "Regional public order"],
      },
    },
  },
  {
    id: "new-lms-bank-bjb",
    tags: ["LMS", "Banking", "Small Business"],
    content: {
      id: {
        title: "New LMS Bank BJB",
        category: "Perbankan",
        role: "Frontend Developer",
        organization: "PT Tristar Surya Gemilang",
        period: "Januari 2023 - Januari 2024",
        location: "Purwokerto, Jawa Tengah",
        desc: "Loan Management System Bank BJB untuk segmen UMKM dan nasabah Bank BJB.",
        overview: "New LMS merupakan sistem pengelolaan pinjaman yang ditujukan untuk mendukung layanan Bank BJB pada segmen UMKM.",
        contributions: ["Mengembangkan fitur pada New LMS Bank BJB untuk segmen UMKM."],
        scope: ["Loan Management System", "Segmen UMKM", "Layanan untuk nasabah Bank BJB"],
      },
      en: {
        title: "New LMS Bank BJB",
        category: "Banking",
        role: "Frontend Developer",
        organization: "PT Tristar Surya Gemilang",
        period: "January 2023 - January 2024",
        location: "Purwokerto, Central Java",
        desc: "Bank BJB's Loan Management System for the small-business segment and Bank BJB customers.",
        overview: "New LMS is a loan management system designed to support Bank BJB services for the small-business segment.",
        contributions: ["Developed features for Bank BJB's New LMS for the small-business segment."],
        scope: ["Loan Management System", "Small-business segment", "Services for Bank BJB customers"],
      },
    },
  },
  {
    id: "website-satpol-pp-dki-jakarta",
    tags: ["Government", "Public Service", "Web Application"],
    content: {
      id: {
        title: "Website Satpol PP DKI Jakarta",
        category: "Pelayanan Publik",
        role: "Developer",
        organization: "Tidak dicantumkan di CV",
        period: "Tidak dicantumkan di CV",
        desc: "Sistem informasi pengaduan masyarakat berbasis web untuk Satpol PP DKI Jakarta.",
        overview: "Website ini digunakan masyarakat untuk menyampaikan pengaduan maupun permohonan yang berkaitan dengan Satpol PP DKI Jakarta.",
        contributions: ["Mengembangkan sistem informasi pengaduan masyarakat berbasis website."],
        scope: ["Pengaduan masyarakat", "Permohonan masyarakat", "Layanan terkait Satpol PP DKI Jakarta"],
      },
      en: {
        title: "Satpol PP DKI Jakarta Website",
        category: "Public Service",
        role: "Developer",
        organization: "Not specified in the CV",
        period: "Not specified in the CV",
        desc: "A web-based public complaint information system for Satpol PP DKI Jakarta.",
        overview: "The website allows members of the public to submit complaints and requests related to Satpol PP DKI Jakarta.",
        contributions: ["Developed a web-based public complaint information system."],
        scope: ["Public complaints", "Public requests", "Services related to Satpol PP DKI Jakarta"],
      },
    },
  },
  {
    id: "sistem-keuangan-laraduit",
    tags: ["Laravel", "Tabler.io", "Finance", "UI Redesign"],
    content: {
      id: {
        title: "Sistem Keuangan Laraduit",
        category: "Sistem Keuangan",
        role: "Frontend Developer Intern",
        organization: "CV Bahira Studio",
        period: "Juli 2021 - September 2021",
        location: "Purwokerto, Jawa Tengah",
        desc: "Sistem keuangan perusahaan berbasis web yang dibangun dengan Laravel dan Tabler.io.",
        overview: "Laraduit digunakan untuk mencatat keuangan perusahaan. Pekerjaan pada proyek ini berfokus pada perancangan ulang antarmuka agar tampilannya lebih terstruktur dan sesuai kebutuhan sistem.",
        contributions: [
          "Merancang ulang antarmuka pengguna sistem keuangan Laraduit.",
          "Mengembangkan tampilan yang lebih terstruktur dan sesuai dengan kebutuhan sistem.",
        ],
        scope: ["Pencatatan keuangan perusahaan", "Perancangan ulang UI", "Laravel", "Tabler.io"],
      },
      en: {
        title: "Laraduit Financial System",
        category: "Financial System",
        role: "Frontend Developer Intern",
        organization: "CV Bahira Studio",
        period: "July 2021 - September 2021",
        location: "Purwokerto, Central Java",
        desc: "A web-based company financial system built with Laravel and Tabler.io.",
        overview: "Laraduit is used to record company finances. Work on this project focused on redesigning the interface to make it more structured and aligned with system requirements.",
        contributions: [
          "Redesigned the user interface of the Laraduit financial system.",
          "Developed a more structured interface aligned with system requirements.",
        ],
        scope: ["Company financial records", "UI redesign", "Laravel", "Tabler.io"],
      },
    },
  },
];

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}

export function getProjectContent(project: ProjectItem, language: Language) {
  return project.content[language];
}
