# ramjipatva.dev — Personal Portfolio

Personal portfolio website built with Next.js, Tailwind CSS, and Framer Motion.
Live at [ramjipatva.dev](https://ramjipatva.dev)

---

## Tech Stack

- **Framework** — Next.js 15 (App Router)
- **Styling** — Tailwind CSS v4
- **Animations** — Framer Motion
- **Email** — Resend API
- **Image Storage** — Cloudinary
- **Project Data** — GitHub JSON (`public/projects.json`, `public/categories.json`)
- **Deployment** — Vercel

---

## Project Structure

```
src/
├── app/
│   ├── admin/
│   │   └── page.tsx              # Password-protected admin panel
│   ├── api/
│   │   ├── admin/
│   │   │   ├── login/route.ts    # Admin auth
│   │   │   ├── logout/route.ts
│   │   │   ├── projects/route.ts # CRUD + reorder for projects
│   │   │   ├── categories/route.ts # CRUD for categories
│   │   │   └── upload/route.ts   # Cloudinary image upload
│   │   └── contact/route.ts      # Resend email API
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx   # Fetches live from GitHub JSON
│   │   └── ContactSection.tsx
│   ├── DarkModeToggle.tsx
│   ├── FloatingNav.tsx
│   └── HireMeButton.tsx
└── lib/
    └── utils.ts
public/
├── profile.jpeg                  # Profile photo
├── projects.json                 # Live project data (managed via admin)
└── categories.json               # Live category list (managed via admin)
```

---

## Local Development

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Fill in all values in .env.local

# Start dev server
npm run dev
```

Open [http://localhost:8000](http://localhost:8000)
Admin panel at [http://localhost:8000/admin](http://localhost:8000/admin)

---

## Environment Variables

Create `.env.local` with:

```env
# Resend (contact form emails)
RESEND_API_KEY=your_resend_api_key

# Cloudinary (project image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# GitHub (read/write projects.json and categories.json)
GITHUB_TOKEN=your_personal_access_token
GITHUB_REPO=Ram4316/ramjipatva_dev
GITHUB_BRANCH=master

# Admin panel password
ADMIN_PASSWORD=your_password
```

> Never commit `.env.local` — it is in `.gitignore` by default.

---

## Admin Panel

Access at `/admin`. Password protected.

### Features
- **Add / Edit / Delete** projects
- **Upload images** to Cloudinary (multiple per project)
- **Drag to reorder** projects — order reflects on portfolio instantly
- **Filter by category** using the dropdown
- **Manage categories** — add or remove categories, stored in `categories.json`
- All changes save to GitHub JSON and reflect on the live portfolio

### How data flows
```
Admin Panel
  ├── Upload image → Cloudinary → returns URL
  ├── Save project → GitHub API → updates public/projects.json
  └── Save category → GitHub API → updates public/categories.json

Portfolio (ProjectsSection)
  └── Fetches live from GitHub raw URL on every page load
      ├── public/projects.json  → project cards + modal
      └── public/categories.json → filter buttons
```

---

## Resend Setup

1. Create a free account at [resend.com](https://resend.com)
2. Go to **API Keys** → **Create API Key**
3. Add to `.env.local` as `RESEND_API_KEY`
4. The `from` address uses `onboarding@resend.dev` (no domain needed on free plan)
5. The `to` address must match your Resend signup email on the free plan
6. Once you verify `ramjipatva.dev` on Resend, update `from` to `contact@ramjipatva.dev`

---

## Cloudinary Setup

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. From the dashboard, copy **Cloud Name**, **API Key**, **API Secret**
3. Add all three to `.env.local`
4. Images upload to the `portfolio/projects` folder automatically
5. Free tier: 25GB storage, 25GB bandwidth/month — never pauses

---

## GitHub Token Setup

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **Generate new token (classic)**
3. Name: `portfolio-admin`, Expiration: No expiration
4. Check: ✅ **repo** (full repo access)
5. Copy token → add to `.env.local` as `GITHUB_TOKEN`

> Keep this token private. If exposed publicly, GitHub will auto-revoke it.

---

## Vercel Deployment

### 1. Push to GitHub
```bash
git add .
git commit -m "your message"
git push
```

### 2. Import on Vercel
1. Go to [vercel.com](https://vercel.com) → sign in with GitHub
2. Click **Add New Project** → import `ramjipatva_dev`
3. Framework auto-detects as **Next.js**

### 3. Add Environment Variables
In Vercel → Project Settings → Environment Variables, add all 8 keys from the table above. Set each to **Production + Preview + Development**.

### 4. Deploy
Click **Deploy**. Every `git push` to `master` triggers automatic redeployment.

### 5. Connect Custom Domain
1. Vercel → Settings → Domains → Add `ramjipatva.dev`
2. Add the DNS records Vercel provides to your domain registrar
3. Wait 5–30 minutes for propagation

---

## Adding a New Project

**Via Admin Panel (recommended):**
1. Go to `/admin` → login
2. Click **+ Add Project**
3. Fill in details, upload images, save
4. Portfolio updates automatically

**Via GitHub directly:**
Edit `public/projects.json` and add an entry following the existing format.

---

## Adding a New Category

**Via Admin Panel:**
1. Go to `/admin` → login
2. Click **🏷 Manage Categories**
3. Type the new category name → click **Add**
4. It appears in the portfolio filter and project form immediately

---

## Notes

- Default theme is **dark mode**
- Profile photo served from `public/profile.jpeg`
- The portfolio fetches fresh data on every page load — no rebuild needed after admin changes
- Admin panel is not indexed by search engines (no sitemap entry)
