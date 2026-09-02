# Khors Renewables — Website

> Cut your electricity bills by up to 95%. High-quality solar solutions, expert installation, maximum savings, and a greener planet.

Marketing website for **Khors Renewables** — a rooftop solar provider based in Chennai, India. Built with Next.js 16 (App Router), React 19, and Tailwind CSS 4.

---

## 1. Overview

Single-page marketing site that showcases:

- **Hero** — value proposition with trust bar
- **Who We Are** — company introduction
- **Rooftop Solar Solutions** — 6-step service flow + benefits
- **Solar Trusted** — products (panels, inverters, mounting) & team
- **Subsidiary** — group companies
- **Contact** — CTA, contact cards, business hours & consultation modal

All sections are anchored for navigation via the sticky `Navbar` (`app/page.tsx:10-25`).

Lead capture is handled through a global `ConsultationModal` (`components/consultation/ConsultationModal.tsx`) triggered from any `ConsultationButton`, posting to `POST /api/consultation`.

## 2. Features

- Responsive, full-bleed design with Tailwind CSS
- Sticky navigation with smooth-scroll anchors (`app/globals.css:26-34`)
- Global consultation context & modal (`app/layout.tsx:29-31`)
- Email delivery via Nodemailer (`app/api/consultation/route.ts:128-145`)
- Optimized images with `next/image`
- Brand design tokens (navy, leaf green) in `app/globals.css:3-13`
- ESLint + TypeScript strict mode

## 3. Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.3.2 (App Router, Turbopack) |
| UI | React 19.2.8, Tailwind CSS 4, lucide-react |
| Fonts | Inter & Montserrat via `next/font/google` |
| Email | Nodemailer 9.x |
| Tooling | TypeScript 5, ESLint 9, `eslint-config-next` |

## 4. Project Structure

```
.
├── app/
│   ├── api/consultation/route.ts  # Lead email handler (Node.js runtime)
│   ├── globals.css                # Tailwind + theme tokens + scroll offsets
│   ├── layout.tsx                 # Root layout, fonts, metadata, providers
│   ├── page.tsx                   # Page composition (section order)
│   ├── icon.png                   # Browser tab icon (Khors logo)
│   └── apple-icon.png             # iOS home screen icon
├── components/
│   ├── Navbar.tsx
│   ├── consultation/              # Context, Button, Modal, Form
│   └── pages/                     # Hero, WhoWeAre, Rooftop, SolarTrusted, Subsidary, Contact
├── public/
│   ├── hero/                      # Hero backgrounds
│   ├── rooftop/ who-we-are/ solar-trusted/ subsidary/ contact/ navbar/
│   └── _archive/                  # Legacy assets
├── next.config.ts                 # Turbopack root + dev cache headers
├── tsconfig.json                  # Path alias @/* -> ./*
├── eslint.config.mjs
└── postcss.config.mjs
```

Section order in `app/page.tsx:15-20` is the source of truth:

```tsx
<Hero />
<WhoWeAre />
<Rooftop />
<SolarTrusted />
<Subsidary />
<Contact />
```

## 5. Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** 10+ (or pnpm/yarn)

## 6. Installation

```bash
# clone
git clone <repo-url>
cd khors-renewables-website

# install
npm install
```

## 7. Environment Variables

Create a `.env.local` in the project root. Required for the consultation form:

```env
# SMTP (defaults: host=smtp.gmail.com, port=465)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=contact@khorsrenewables.com
SMTP_PASS=your_app_password

# Where consultation leads are sent
CONSULTATION_RECIPIENT_EMAIL=contact@khorsrenewables.com
```

> `.env*` is git-ignored (` .gitignore:34`). For Gmail you need an [App Password](https://support.google.com/accounts/answer/185833), not your regular password.

Optional overrides already handled with defaults in `app/api/consultation/route.ts:101-102`.

## 8. Development

```bash
npm run dev
```

Opens [http://localhost:3000](http://localhost:3000) with Turbopack. Dev assets are served with `no-store` headers to avoid stale chunk hydration issues (`next.config.ts:13-31`).

## 9. Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 10. Build & Production

```bash
npm run build
npm run start
```

Ensure all env vars are set in your hosting provider (Vercel, etc.) before building.

## 11. API Reference

### `POST /api/consultation`

Submits a consultation lead and sends an HTML email.

**Runtime:** `nodejs` (`app/api/consultation/route.ts:4`)

**Body (JSON):**

```json
{
  "fullName": "Jane Doe",
  "whatsapp": "9876543210",
  "bill": "₹3000-5000",
  "pincode": "600042"
}
```

**Required:** `fullName`, `whatsapp`, `pincode`. `bill` is optional.

**Responses:**

- `200 { success: true }` — email sent
- `400 { success: false, message: "Missing required fields" | "Invalid request body" }`
- `500 { success: false, message: "Email is not configured" | "Failed to send email" }`

Validation: `app/api/consultation/route.ts:92-110`

## 12. Key Configuration

- **Turbopack root** pinned to project dir to ignore stray `package-lock.json` in home directory (`next.config.ts:9-11`)
- **Scroll margin** for sticky navbar: `4.75rem` mobile / `5.75rem` desktop (`app/globals.css:26-34`)
- **Global zoom** `0.955` for proportional scaling on large viewports (`app/globals.css:44`)
- **Fonts** use `display: swap` and CSS variables `--font-inter`, `--font-montserrat`

## 13. Deployment

Easiest with [Vercel](https://vercel.com):

1. Push to GitHub
2. Import project in Vercel
3. Add env vars in **Settings → Environment Variables**
4. Deploy — `next build` runs automatically

Any Node-compatible host works — just run `npm run build && npm run start`.

## 14. Contact

- **Email:** contact@khorsrenewables.com
- **Phone:** +91 72008 30719 / +91 72005 39720
- **Address:** #5A, Taramani Link Road, Baby Nagar, Velachery, Chennai, Tamil Nadu – 600042
- **Hours:** MON–SAT: 10:30 AM – 7:30 PM
