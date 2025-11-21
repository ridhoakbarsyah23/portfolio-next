"use client";

import Image from "next/image";
import Link from "next/link";
import { articles } from "@/data/articles";

export default function BlogSection() {
  return (
    <section id="blog" className="py-5 container text-center">
      <h2 className="fw-bold mb-4">Latest Articles</h2>

      <div className="row">
        {articles.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="p-3 border rounded shadow-sm h-100">
              {/* Thumbnail */}
              <div className="mb-3">
                <Image src={item.image} alt={item.title} width={300} height={180} className="img-fluid rounded" />
              </div>

              <h5 className="fw-bold">{item.title}</h5>
              <small className="text-muted d-block mb-2">{item.date}</small>
              <p>{item.excerpt}</p>

              <Link href={`/blog/${item.id}`} className="btn btn-primary btn-sm">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
