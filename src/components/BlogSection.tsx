"use client";

interface Props {
  darkMode: boolean;
}

export default function BlogSection({ darkMode }: Props) {
  return (
    <section
      id="blog"
      className="relative py-32 transition-colors duration-300
        bg-slate-50 text-slate-900
        dark:bg-[#0a0a0a] dark:text-white
        overflow-hidden"
    >
      {/* Subtle Grid Background */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)]
          dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),
                    linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]
          bg-[size:60px_60px]
          opacity-40
        "
      />

      <div className="relative container mx-auto px-6 max-w-3xl text-center">
        {/* Badge */}
        <span
          className="
            inline-block mb-6 rounded-full border px-4 py-1 text-xs tracking-widest
            border-slate-300 text-slate-600
            dark:border-white/20 dark:text-white/60
          "
        >
          BLOG
        </span>

        {/* Title */}
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">Articles</h2>

        {/* Subtitle */}
        <p
          className="
            mt-4 text-base md:text-lg
            text-slate-600
            dark:text-white/60
          "
        >
          Writing about development, technology, and experiences.
        </p>

        {/* Divider */}
        <div
          className="
            mx-auto mt-10 h-px w-40
            bg-gradient-to-r from-transparent via-slate-300 to-transparent
            dark:via-white/30
          "
        />

        {/* Status */}
        <div className="mt-12">
          <p
            className="
              text-sm uppercase tracking-[0.3em]
              text-slate-500
              dark:text-white/50
            "
          >
            Under Development
          </p>

          <p
            className="
              mt-4 max-w-xl mx-auto text-sm md:text-base leading-relaxed
              text-slate-600
              dark:text-white/60
            "
          >
            This section is currently being crafted. Soon, it will feature carefully written articles focused on modern web development and software engineering.
          </p>
        </div>
      </div>
    </section>
  );
}
