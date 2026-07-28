# Portfolio Next.js

Personal portfolio website for Ridho Akbarsyah Ramadhan, built with Next.js, React, TypeScript, Bootstrap, and Framer Motion.

The site presents professional experience, skills, case-study style project pages, blog posts, CV preview, and a production-ready contact form.

## Features

- Responsive one-page portfolio with dark/light mode.
- Experience, skills, project, blog, and contact sections.
- Project case study pages under `/projects/[id]`.
- Blog listing, blog detail pages, and a blog admin dashboard under `/admin/blog`.
- Blog API with admin-key protection, server-side validation, draft filtering, and optional GitHub-backed storage.
- Contact form API using Resend, with mailto fallback in the UI.
- SEO metadata, Open Graph/Twitter metadata, `robots.txt`, and `sitemap.xml`.
- CV preview modal with PDF download.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Bootstrap 5 and React Bootstrap
- Framer Motion
- React Markdown
- React PDF

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm.cmd run dev
```

Open:

```text
http://localhost:3000
```

On Windows PowerShell, use `npm.cmd` if `npm` is blocked by the execution policy.

## Scripts

```bash
npm.cmd run dev
npm.cmd run build
npm.cmd run lint
npx.cmd tsc --noEmit
```

## Environment Variables

Create `.env.local` for local development.

```env
BLOG_ADMIN_KEY=replace-with-a-strong-admin-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional: required for writing blog posts in production through GitHub storage
BLOG_GITHUB_TOKEN=
BLOG_GITHUB_REPO=owner/repository-name
BLOG_GITHUB_BRANCH=main

# Optional: required for direct contact form email delivery
RESEND_API_KEY=
CONTACT_TO_EMAIL=ridhoakbarsyah23@gmail.com
CONTACT_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
```

Notes:

- `BLOG_ADMIN_KEY` is required for admin blog access.
- Without GitHub storage variables, local blog writes use `src/data/blog-posts.json`.
- In production, blog writes require `BLOG_GITHUB_TOKEN`, `BLOG_GITHUB_REPO`, and `BLOG_GITHUB_BRANCH`.
- `RESEND_API_KEY` is required for the contact API to send email directly. If it is missing, the UI offers an email-app fallback.
- Set `NEXT_PUBLIC_SITE_URL` to the deployed domain so canonical URLs, Open Graph URLs, robots, and sitemap use the production URL.

## Blog Admin

Admin page:

```text
/admin/blog
```

Use the value from `BLOG_ADMIN_KEY` to load, create, edit, publish, draft, or delete posts.

New posts use SEO-friendly IDs generated from the title, for example:

```text
/blog/belajar-next-js
```

## Project Data

Project content is stored in:

```text
src/data/projects.ts
```

The homepage project cards and `/projects/[id]` case study pages use the same data source.

## SEO Routes

Generated routes:

```text
/robots.txt
/sitemap.xml
```

The sitemap includes the homepage, project case studies, and published blog posts.

## Contact

- Email: `ridhoakbarsyah23@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/ridhoakbarsyah/`
- GitHub: `https://github.com/ridhoakbarsyah23`
