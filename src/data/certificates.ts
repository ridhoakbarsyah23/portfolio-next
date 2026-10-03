export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url: string;
  image: string;
  category: string;
}

export const certificates: Certificate[] = [
  {
    id: "cert-1",
    title: "Fullstack NestJS & Bonus Source Code React - Online Learning",
    issuer: "BuildWithAngga",
    date: "Sep 2026",
    url: "#",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    category: "Fullstack"
  },
  {
    id: "cert-2",
    title: "AI for Work & Career Readiness with Google AI Products",
    issuer: "Hacktiv8 Indonesia",
    date: "Mar 2026",
    url: "#",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    category: "Artificial Intelligence"
  },
  {
    id: "cert-3",
    title: "Java Bootcamp",
    issuer: "CODE.ID",
    date: "Jun 2025",
    url: "#",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
    category: "Programming"
  },
  {
    id: "cert-4",
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    date: "Mar 2024",
    url: "#",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop",
    category: "Web Development"
  },
  {
    id: "cert-5",
    title: "Scalable Web Service with Golang - DTS Kominfo 2022",
    issuer: "Hacktiv8 Indonesia",
    date: "Okt 2022",
    url: "#",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    category: "Backend"
  },
  {
    id: "cert-6",
    title: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding Indonesia",
    date: "Okt 2022",
    url: "#",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=800&auto=format&fit=crop",
    category: "Web Development"
  },
  {
    id: "cert-7",
    title: "Full Stack Developer with Ruby (HTML, CSS, Ruby and Ruby on rails)",
    issuer: "Progate",
    date: "Mei 2022",
    url: "#",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
    category: "Fullstack"
  },
  {
    id: "cert-8",
    title: "Belajar Membuat Aplikasi Flutter untuk Pemula",
    issuer: "Dicoding Indonesia",
    date: "Jun 2022",
    url: "#",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
    category: "Mobile Development"
  },
  {
    id: "cert-9",
    title: "Sertifikasi Kompetensi Junior Web Developer",
    issuer: "BNSP",
    date: "Okt 2021",
    url: "#",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop",
    category: "Web Development"
  }
];
