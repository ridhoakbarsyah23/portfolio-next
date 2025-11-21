import Image from "next/image";
import { articles } from "@/data/articles";

export default function ArticleDetail({ params }: { params: { id: string } }) {
  const article = articles.find((item) => item.id.toString() === params.id);

  if (!article) {
    return (
      <div className="container py-5 text-center">
        <h2 className="fw-bold">Artikel tidak ditemukan.</h2>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ maxWidth: 800 }}>
      <h1 className="fw-bold mb-3">{article.title}</h1>
      <small className="text-muted d-block mb-3">{article.date}</small>

      {article.image && <Image src={article.image} alt={article.title} width={800} height={450} className="img-fluid rounded mb-4" />}

      <div style={{ whiteSpace: "pre-line" }}>{article.content}</div>
    </div>
  );
}
