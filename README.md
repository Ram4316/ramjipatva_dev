# 🚀 Ramji Patva - Full Stack Developer Portfolio

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features smooth animations, dark mode support, and optimized performance.

## ✨ Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive across all devices
- **Dark Mode**: Built-in dark/light theme toggle
- **Performance**: Optimized with Next.js 15 and Turbopack
- **SEO Ready**: Meta tags and structured data for better search visibility
- **Accessibility**: WCAG compliant with proper ARIA labels

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **UI Components**: Radix UI + Custom Components
- **Deployment**: GitHub Pages + GitHub Actions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ram4316/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:8000](http://localhost:8000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── sections/          # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── ContactSection.tsx
│   ├── ui/               # Reusable UI components
│   ├── DarkModeToggle.tsx
│   ├── FloatingNav.tsx
│   └── HireMeButton.tsx
├── hooks/                # Custom React hooks
└── lib/                  # Utility functions
```

## 🎨 Customization

### Colors & Themes
Edit `src/app/globals.css` to customize the color scheme and CSS variables.

### Content
Update the content in each section component:
- `HeroSection.tsx` - Your name, title, and introduction
- `AboutSection.tsx` - Personal story and experience
- `SkillsSection.tsx` - Skills and expertise
- `ProjectsSection.tsx` - Portfolio projects
- `TestimonialsSection.tsx` - Client feedback
- `ContactSection.tsx` - Contact information

### Styling
Modify Tailwind classes in the components or add custom CSS in `globals.css`.

## 🚀 Deployment

### GitHub Pages (Automatic)

The portfolio is automatically deployed to GitHub Pages using GitHub Actions:

1. **Push to main branch** - Automatic deployment triggers
2. **Check Actions tab** - Monitor build and deployment progress
3. **View live site** - Available at `https://ram4316.github.io/my-portfolio`

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Export static files**
   ```bash
   npm run export
   ```

3. **Deploy the `out/` folder** to your hosting provider

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run export` - Export static files

## 📱 Performance Optimizations

- **Hydration Fixed**: Resolved React hydration errors
- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Optimized images and SVGs
- **Bundle Analysis**: Minimal bundle size
- **Lazy Loading**: Components load only when needed

## 🐛 Troubleshooting

### Common Issues

1. **Hydration Errors**: Fixed by moving random generation to useEffect
2. **Build Errors**: Ensure Node.js 18+ and clean install
3. **Styling Issues**: Check Tailwind CSS configuration

### Getting Help

- Check the [Issues](../../issues) page
- Review the [GitHub Actions](../../actions) for build logs
- Ensure all dependencies are properly installed

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Portfolio**: [https://ram4316.github.io/my-portfolio](https://ram4316.github.io/my-portfolio)
- **GitHub**: [@Ram4316](https://github.com/Ram4316)
- **Email**: [Your Email]

---

⭐ **Star this repository if you found it helpful!**
