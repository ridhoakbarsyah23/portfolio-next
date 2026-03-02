"use client";

interface Props {
  darkMode: boolean;
}

export default function BlogSection({ darkMode }: Props) {
  return (
    <section
      id="blog"
      className={`border-t py-20 transition-colors ${
        darkMode
          ? "border-white/10 bg-black text-white"
          : "border-slate-200 bg-white text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <div className="mb-12 text-center">
          <p
            className={`mb-2 text-xs font-medium uppercase tracking-widest ${
              darkMode ? "text-white/40" : "text-slate-500"
            }`}
          >
            Blog
          </p>

          <h2 className="text-3xl font-semibold md:text-5xl">
            Writing about building things on the web.
          </h2>

          <p
            className={`mx-auto mt-4 max-w-2xl text-sm md:text-base ${
              darkMode ? "text-white/60" : "text-slate-600"
            }`}
          >
            Short essays and notes on software engineering, frontend architecture, and lessons learned from real projects.
          </p>
        </div>

        {/* Grid Content */}
        <div
          className={`grid grid-cols-2 gap-8 border-t pt-10 md:grid-cols-3 ${
            darkMode ? "border-white/10" : "border-slate-200"
          }`}
        >
          <BlogItem
            title="Engineering Notes"
            desc="Thoughts on architecture, trade-offs, and maintainable code."
            darkMode={darkMode}
          />
          <BlogItem
            title="Practical Lessons"
            desc="What actually worked — and what didn’t — in real projects."
            darkMode={darkMode}
          />
          <BlogItem
            title="Tools & Workflow"
            desc="Frameworks, libraries, and workflows I trust and use."
            darkMode={darkMode}
          />
        </div>

        {/* Footer */}
        <p
          className={`mt-10 text-center text-sm ${
            darkMode ? "text-white/40" : "text-slate-500"
          }`}
        >
          Articles coming soon. No rush — quality first.
        </p>
      </div>
    </section>
  );
}

function BlogItem({
  title,
  desc,
  darkMode,
}: {
  title: string;
  desc: string;
  darkMode: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 shadow-sm transition-all hover:shadow-md ${
        darkMode
          ? "bg-white/5 text-white hover:bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
          : "bg-slate-50 text-slate-800 hover:bg-slate-100"
      }`}
    >
      <h3 className="text-md font-medium md:text-lg">{title}</h3>
      <p
        className={`mt-2 text-xs md:text-sm ${
          darkMode ? "text-white/60" : "text-slate-600"
        }`}
      >
        {desc}
      </p>
    </div>
  );
}
