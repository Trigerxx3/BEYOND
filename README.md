# ✦ B E Y O N D

<div align="center">

  <h3>Neural Intelligence Engine &bull; Superconscious Architecture</h3>

  <p>
    <strong>A next-generation cinematic WebGL experience bridging intent, design, and neural intelligence.</strong>
  </p>

  <p>
    <a href="https://github.com/Trigerxx3/BEYOND/stargazers"><img src="https://img.shields.io/github/stars/Trigerxx3/BEYOND?style=for-the-badge&color=8b5cf6&logo=github" alt="GitHub stars" /></a>
    <a href="https://github.com/Trigerxx3/BEYOND/network/members"><img src="https://img.shields.io/github/forks/Trigerxx3/BEYOND?style=for-the-badge&color=a855f7&logo=github" alt="GitHub forks" /></a>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React 19" /></a>
    <a href="https://threejs.org/"><img src="https://img.shields.io/badge/Three.js-WebGL-000000?style=for-the-badge&logo=three.js" alt="Three.js" /></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite" alt="Vite" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind-CSS%204-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" /></a>
  </p>

</div>

---

## 🌌 Overview

**BEYOND** is an ultra-premium, cinematic landing experience crafted for **Superconscious** — a neural intelligence architecture that turns intent into action before you make it. 

Built with **React 19**, **Three.js / React Three Fiber**, **GSAP ScrollTrigger**, and **Lenis smooth scrolling**, the site guides visitors through a synchronized 520vh 3D journey featuring real-time metallic reflections, curved cylinder floating gallery meshes, dynamic quantum particle fields, and interactive command interfaces.

---

## ✨ Highlights & Features

- **🪐 Real-Time 3D WebGL Core**
  - **Chrome Star**: Procedural 3D metallic chrome artifact with dynamic rotation, environment reflections, and smooth reactive dampening.
  - **Curved 3D Floating Gallery**: Cylindrically arranged 3D image meshes floating in perspective space with raycasted hover tilt and smooth depth parallax.
  - **Quantum Particle Field**: Interactive particle cloud reacting subtly to mouse movement and scroll depth.

- **🎬 Scrubbed Cinematic Scroll Track (520vh)**
  - Seamless choreography orchestrated by **GSAP ScrollTrigger** and **Lenis**.
  - Multi-scene progression (Scene A: The Awakening &rarr; Scene B & C: The Neural Shift &rarr; Scene D & E: Deep Immersion &rarr; Scene F: The Intelligence Reveal).

- **⚡ Telemetry & Intelligence Explorer**
  - Interactive neural telemetry slider demonstrating latency benchmarks, synaptic throughput, and predictive confidence levels.
  - Curated capability cards detailing multi-modal interface adaptivity.

- **🔮 Luxury Command & Interaction Suite**
  - **Command Palette (`SearchModal`)**: Quick modal search across system specs, benchmarks, and platform sections.
  - **Priority Access Modal (`WaitlistModal`)**: Interactive early-access registration with validation and smooth state feedback.
  - **Changelog & Roadmap (`UpdatesModal`)**: Version log showing past releases and upcoming neural milestones.
  - **Accessibility First**: Built-in toggle for `prefers-reduced-motion` and manual motion reduction controls.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite](https://vitejs.dev/) |
| **3D & WebGL** | [Three.js](https://threejs.org/) &bull; [@react-three/fiber](https://r3f.docs.pmnd.rs/) &bull; [@react-three/drei](https://github.com/pmndrs/drei) |
| **Choreography & Motion** | [GSAP (GreenSock)](https://greensock.com/gsap/) + ScrollTrigger &bull; [Framer Motion](https://www.framer.com/motion/) |
| **Smooth Scrolling** | [Lenis](https://lenis.darkroom.engineering/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + Custom Glassmorphic Utilities |
| **Icons & Typography** | [Lucide React](https://lucide.dev/) &bull; *Space Grotesk*, *Orbitron*, *Inter* via Google Fonts |

---

## 📂 Project Structure

```
future-ai/
├── public/
│   ├── assets/              # Gallery imagery, card textures, hero assets
│   ├── favicon.svg          # Four-point purple star favicon
│   └── icons.svg
├── src/
│   ├── assets/              # Static vector illustrations
│   ├── components/
│   │   ├── ChromeStar.tsx          # 3D Metallic star artifact
│   │   ├── CinematicCanvas.tsx     # Master R3F canvas & camera controller
│   │   ├── FinalCTA.tsx            # Scene G: Final portal & CTA
│   │   ├── FloatingGallery3D.tsx   # 3D Curved floating gallery
│   │   ├── Footer.tsx              # Minimalist luxury footer
│   │   ├── HeroSection.tsx         # Scene A: Typography & intro badge
│   │   ├── IntelligenceSection.tsx # Scene F: Telemetry & intelligence cards
│   │   ├── NavigationBar.tsx       # Floating glassmorphic nav pill
│   │   ├── ParticleField.tsx       # 3D Quantum starfield particles
│   │   ├── SearchModal.tsx         # Command palette search
│   │   ├── StoryScrollOverlay.tsx  # Scroll-tied story captions
│   │   ├── UpdatesModal.tsx        # Neural engine updates & changelog
│   │   └── WaitlistModal.tsx       # VIP Waitlist modal
│   ├── App.tsx              # Master layout, Lenis setup & GSAP triggers
│   ├── index.css            # Design tokens, film-grain & glassmorphism
│   └── main.tsx             # Application entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version `18.x` or higher recommended)
- `npm`, `pnpm`, or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Trigerxx3/BEYOND.git
   cd BEYOND
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to experience the site.

4. **Build for production:**
   ```bash
   npm run build
   ```
   To preview the production build locally:
   ```bash
   npm run preview
   ```

---

## 🎨 Design System & Aesthetics

- **Color Palette**: Deep Obsidian (`#030206`), Electric Violet (`#8B5CF6`), Cyber Orchid (`#C084FC`), and Frost White.
- **Glassmorphism**: Multi-layered backdrop blurs (`backdrop-blur-xl`), ultra-fine translucent borders (`border-white/10`), and film grain overlay.
- **Typography Hierarchy**:
  - Headings: *Space Grotesk*
  - Technical Badges & Data: *Orbitron*
  - Body & Microcopy: *Inter*

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Crafted with passion for the future of neural interfaces. Designed for high performance across all modern desktop and mobile browsers.</sub>
</div>
