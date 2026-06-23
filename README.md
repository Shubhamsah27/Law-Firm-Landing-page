# Mercer & Associates — Law Firm Landing Page & Reusable Section Library

A premium, interactive React landing page and modular section library designed for elite legal practices. Features curated HSL color palettes, modern typography, 3D tilt interactions, and dynamic SVG border drawings.

**🔗 Live Link (Landing Page):** [https://law-firm-template-qtuy.onrender.com/](https://law-firm-template-qtuy.onrender.com/)

**🔗 Live Playground (Section Library Mode):** [https://law-firm-template-qtuy.onrender.com/?mode=library](https://law-firm-template-qtuy.onrender.com/?mode=library)

---

## 🏛️ Project Architecture & Overview

This project serves a dual purpose:
1. **Premium Landing Page**: A fully realized, immersive dark-themed landing page for *Mercer & Associates* (Attorneys & Counselors at Law) optimized for branding, trust-building, and customer conversion.
2. **Reusable Section Library**: A compilation of **22 premium React sections** that can be previewed, customized, and integrated into law firm websites at scale.

---

## 🌌 The 22 Premium Reusable Sections

All components are located under [`src/library/sections/`](file:///d:/Templates/Law%20Firm%20Template/src/library/sections/) and are fully styled using global variables and tokens defined in [`src/library/tokens.js`](file:///d:/Templates/Law%20Firm%20Template/src/library/tokens.js):

1. **WhyChooseUs**: A clean value proposition layout highlighting tactical advantages.
2. **BentoPracticeAreas**: A multi-dimensional showcase of practice groups.
3. **CaseStudyStack**: A scroll-driven stacking card interface designed for Safari compatibility.
4. **EditorialHeroVariant**: A spacious, high-contrast, editorial layout variant.
5. **ContactVariant**: Form submissions equipped with focus border-drawing inputs.
6. **TrustStrip**: A minimal banner displaying client counts, case values, and credentials.
7. **MasonryTestimonialGrid**: An asymmetric grid layout for client endorsements.
8. **VerticalTimeline**: A visual chronicle of case progress and milestones.
9. **MegaFooter**: Comprehensive footer featuring site-map directories and social directories.
10. **StatementSection**: Large, center-aligned, serif quotes.
11. **AwardsRecognition**: Staggered recognition lists wrapped in `InteractiveCard3D`.
12. **TeamGrid**: Individual lawyer profiles featuring 3D tilt depth cards.
13. **FaqSection**: Split layout of editorial accordions.
14. **ComparisonTable**: Grid comparing traditional firms with Mercer's services.
15. **StickyStorytelling**: Dual-column scroll-synchronized layout.
16. **FeaturedBento**: 1 primary grid element + 4 secondary layout components.
17. **OfficeLocations**: Interactive map placeholder and card grid showing regional branches.
18. **MediaPress**: Auto-scrolling infinite publication log marquee.
19. **DragCarousel**: Free-drag sliding cards.
20. **StatementBlockVariant**: Minimal quote placards.
21. **PremiumCtaBlock**: Action block with CTA button sweep animations.
22. **ProcessCardStack**: Progressive overlapping scales (`1.0` to `0.97`) indicating standard workflow.

---

## 💎 Premium Design & Interactions

*   **3D Perspective Tilt (`InteractiveCard3D`)**: Dynamically tracks cursor movements to tilt cards in three-dimensional space (`rotateX`, `rotateY`, `z` translates) without spring overshoots.
*   **Clockwise SVG Drawing Borders**: Rectangular SVG paths trace the card perimeter in a clockwise draw transition when hovered.
*   **Gold Draw Dividers (`drawTopBorder`)**: An elegant accent line draws horizontally from left to right as elements scroll into view.
*   **Zero-Border-Radius Style Constraints**: Strictly enforces a sharp, premium `border-radius: 0px !important` design language across all components.
*   **Interactive Input Triggers (`FocusBorderInput`, `FocusBorderSelect`)**: Re-renders form elements with localized accent border animation on focus.

---

## 🛠️ Tech Stack

*   **Framework**: React 19, Vite (ESM)
*   **Animations**: Framer Motion
*   **Styling**: Tailwind CSS & PostCSS
*   **Icons**: Lucide React

---

## 🚀 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Shubhamsah27/Law-Firm-Landing-page.git
   cd Law-Firm-Landing-page
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Launch dev environment**:
   ```bash
   npm run dev
   ```

4. **Access the Library Mode**:
   Append `?mode=library` to your localhost URL to enter the playground:
   `http://localhost:5173/?mode=library`

5. **Build for production**:
   ```bash
   npm run build
   ```
