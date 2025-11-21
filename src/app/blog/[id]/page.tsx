import Image from "next/image";
import { articles } from "@/data/articles";
import { notFound } from "next/navigation";

interface ArticleDetailProps {
  params: { id: string };
}

export default function ArticleDetail({ params }: ArticleDetailProps) {
  // Pastikan params.id ada
  if (!params?.id) return notFound();

  const article = articles.find((item) => item.id.toString() === params.id);

  // Jika artikel tidak ditemukan
  if (!article) return notFound();

  return (
    <article className="container py-5" style={{ maxWidth: 800 }}>
      <h1 className="fw-bold mb-3">{article.title}</h1>
      <small className="text-muted d-block mb-4">{article.date}</small>

      {/* Thumbnail */}
      {article.image && (
        <div className="mb-4 rounded overflow-hidden">
          <Image src={article.image} alt={article.title} width={800} height={450} className="img-fluid rounded" priority />
        </div>
      )}

      {/* Konten artikel */}
      {typeof article.content === "string" ? (
        <div style={{ whiteSpace: "pre-line" }}>{article.content}</div>
      ) : (
        // Jika pakai JSX atau HTML
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      )}
    </article>
  );
}
