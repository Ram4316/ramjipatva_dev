# ramjipatva.dev — Personal Portfolio

Personal portfolio website built with Next.js, Tailwind CSS, and Framer Motion.
Live at [ramjipatva.dev](https://ramjipatva.dev)

---

## Tech Stack

- **Framework** — Next.js 15 (App Router)
- **Styling** — Tailwind CSS v4
- **Animations** — Framer Motion
- **Email** — Resend API
- **Deployment** — Vercel

---

## Local Development

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Add your RESEND_API_KEY to .env.local

# Start dev server
npm run dev
```

Open [http://localhost:8000](http://localhost:8000)

---

## Environment Variables

Create a `.env.local` file in the root with:

```env
RESEND_API_KEY=your_resend_api_key_here
```

> Never commit `.env.local` — it is already in `.gitignore`

---

## Resend Setup

The contact form uses [Resend](https://resend.com) to send emails.

1. Go to [resend.com](https://resend.com) and create a free account
2. Navigate to **API Keys** → **Create API Key**
3. Copy the key and add it to `.env.local` as `RESEND_API_KEY`
4. In `src/app/api/contact/route.ts`:
   - `from` is set to `onboarding@resend.dev` (works without domain verification)
   - `to` must be the email you used to sign up on Resend (free plan restriction)
5. Once you verify your domain on Resend, update `from` to `contact@ramjipatva.dev`

---

## Vercel Deployment

### 1. Push to GitHub
```bash
git add .
git commit -m "your message"
git push
```

### 2. Import on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New Project**
3. Import the `ramjipatva_dev` repository
4. Framework will auto-detect as **Next.js** — no changes needed

### 3. Add Environment Variables
Before clicking Deploy, scroll to **Environment Variables** and add:

| Key | Value |
|-----|-------|
| `RESEND_API_KEY` | `your_resend_api_key_here` |

### 4. Deploy
Click **Deploy** — Vercel will build and deploy automatically.

### 5. Connect Custom Domain
1. Go to your project on Vercel → **Settings → Domains**
2. Add `ramjipatva.dev`
3. Vercel will show DNS records — add them in your domain registrar
4. Wait for propagation (usually 5–30 minutes)

### Redeployment
Every `git push` to `master` will automatically trigger a new deployment on Vercel.

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts      # Resend email API route
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── ContactSection.tsx
│   ├── DarkModeToggle.tsx
│   ├── FloatingNav.tsx
│   └── HireMeButton.tsx
└── lib/
    └── utils.ts
public/
└── profile.jpeg
```

---

## Notes

- Default theme is **dark mode**
- Contact form sends real emails via Resend API
- Profile photo is served from `public/profile.jpeg`
- Projects section still uses placeholder data — update `ProjectsSection.tsx` with real projects
