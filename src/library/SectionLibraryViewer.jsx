import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ChevronLeft, ChevronRight, Moon, Sun } from 'lucide-react';
import { TOKENS } from './tokens';

// Import all sections
import WhyChooseUs from './sections/WhyChooseUs';
import BentoPracticeAreas from './sections/BentoPracticeAreas';
import CaseStudyStack from './sections/CaseStudyStack';
import EditorialHeroVariant from './sections/EditorialHeroVariant';
import ContactVariant from './sections/ContactVariant';
import TrustStrip from './sections/TrustStrip';
import MasonryTestimonialGrid from './sections/MasonryTestimonialGrid';
import VerticalTimeline from './sections/VerticalTimeline';
import MegaFooter from './sections/MegaFooter';
import StatementSection from './sections/StatementSection';
import AwardsRecognition from './sections/AwardsRecognition';
import TeamGrid from './sections/TeamGrid';
import FaqSection from './sections/FaqSection';
import ComparisonTable from './sections/ComparisonTable';
import StickyStorytelling from './sections/StickyStorytelling';
import FeaturedBento from './sections/FeaturedBento';
import OfficeLocations from './sections/OfficeLocations';
import MediaPress from './sections/MediaPress';
import DragCarousel from './sections/DragCarousel';
import StatementBlockVariant from './sections/StatementBlockVariant';
import PremiumCtaBlock from './sections/PremiumCtaBlock';
import ProcessCardStack from './sections/ProcessCardStack';

const sectionList = [
  { id: 'why-choose-us', name: '01. Why Choose Us', component: <WhyChooseUs /> },
  { id: 'bento-practice-areas', name: '02. Bento Practice Areas', component: <BentoPracticeAreas /> },
  { id: 'case-study-stack', name: '03. Case Study Stack', component: <CaseStudyStack /> },
  { id: 'editorial-hero', name: '04. Editorial Hero', component: <EditorialHeroVariant /> },
  { id: 'contact-variant', name: '05. Contact Variant', component: <ContactVariant /> },
  { id: 'trust-strip', name: '06. Trust Strip', component: <TrustStrip /> },
  { id: 'masonry-testimonial', name: '07. Masonry Testimonials', component: <MasonryTestimonialGrid /> },
  { id: 'vertical-timeline', name: '08. Vertical Timeline', component: <VerticalTimeline /> },
  { id: 'mega-footer', name: '09. Mega Footer', component: <MegaFooter /> },
  { id: 'statement-section', name: '10. Statement Section', component: <StatementSection /> },
  { id: 'awards-recognition', name: '11. Awards & Recognition', component: <AwardsRecognition /> },
  { id: 'team-grid', name: '12. Team Grid', component: <TeamGrid /> },
  { id: 'faq-section', name: '13. FAQ Section', component: <FaqSection /> },
  { id: 'comparison-table', name: '14. Comparison Table', component: <ComparisonTable /> },
  { id: 'sticky-storytelling', name: '15. Sticky Storytelling', component: <StickyStorytelling /> },
  { id: 'featured-bento', name: '16. Featured Bento', component: <FeaturedBento /> },
  { id: 'office-locations', name: '17. Office Locations', component: <OfficeLocations /> },
  { id: 'media-press', name: '18. Media & Press', component: <MediaPress /> },
  { id: 'drag-carousel', name: '19. Drag Carousel', component: <DragCarousel /> },
  { id: 'statement-block-variant', name: '20. Statement Block Variant', component: <StatementBlockVariant /> },
  { id: 'premium-cta-block', name: '21. Premium CTA Block', component: <PremiumCtaBlock /> },
  { id: 'process-card-stack', name: '22. Process Card Stack', component: <ProcessCardStack /> }
];

export default function SectionLibraryViewer() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false); // Stub toggle state

  const activeSection = sectionList[activeIdx];

  const copyImportPath = () => {
    const importStr = `import ${activeSection.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')} from './library/sections/${activeSection.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}';`;
    navigator.clipboard.writeText(importStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % sectionList.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + sectionList.length) % sectionList.length);
  };

  // Keyboard navigation handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: TOKENS.bg, color: TOKENS.text }}>
      
      {/* Viewer Header Toolbar */}
      <header className="sticky top-0 z-[100] border-b bg-[#0E0E15]/95 backdrop-blur-md py-4 px-6 flex flex-wrap items-center justify-between gap-4" style={{ borderColor: TOKENS.border }}>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border flex items-center justify-center" style={{ borderColor: TOKENS.accent }}>
            <span className="text-xs font-serif font-light text-firmGold">L</span>
          </div>
          <span className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: TOKENS.text }}>
            Section Library
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3 order-3 md:order-none">
          {/* Copy Import Button */}
          <button 
            onClick={copyImportPath}
            className="flex items-center space-x-2 border px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-colors hover:text-[#0A0A0F]"
            style={{ 
              borderColor: TOKENS.accent, 
              color: TOKENS.accent,
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = TOKENS.accent;
              e.currentTarget.style.color = '#0A0A0F';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = TOKENS.accent;
            }}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Import'}</span>
          </button>

          {/* Stub Dark/Light Toggle */}
          <button 
            onClick={() => setIsLightMode(!isLightMode)}
            className="p-2 border transition-colors duration-200"
            style={{ borderColor: TOKENS.border, color: TOKENS.text }}
            title="Preview Light Tokens (Mockup Stub)"
          >
            {isLightMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Tabs Switcher Strip */}
      <nav className="bg-[#0E0E15]/50 border-b overflow-x-auto flex space-x-1 p-2 scrollbar-none" style={{ borderColor: TOKENS.border }}>
        {sectionList.map((sec, idx) => (
          <button
            key={sec.id}
            onClick={() => setActiveIdx(idx)}
            className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-colors whitespace-nowrap"
            style={{ 
              color: activeIdx === idx ? TOKENS.accent : 'rgba(240, 237, 230, 0.4)',
              borderBottom: activeIdx === idx ? `1.5px solid ${TOKENS.accent}` : 'none'
            }}
          >
            {sec.name}
          </button>
        ))}
      </nav>

      {/* Section Viewport */}
      <main className="flex-1 relative flex flex-col justify-between">
        
        {/* Previous Button Left */}
        <button 
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 border flex items-center justify-center bg-[#0E0E15]/40 hover:bg-[#0E0E15]/80 transition-colors z-20"
          style={{ borderColor: TOKENS.border }}
          title="Previous (Left Arrow)"
        >
          <ChevronLeft className="w-5 h-5" style={{ color: TOKENS.accent }} />
        </button>

        {/* Current Active Section Container */}
        <div className="flex-1 w-full bg-[#0A0A0F]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {activeSection.component}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Button Right */}
        <button 
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 border flex items-center justify-center bg-[#0E0E15]/40 hover:bg-[#0E0E15]/80 transition-colors z-20"
          style={{ borderColor: TOKENS.border }}
          title="Next (Right Arrow)"
        >
          <ChevronRight className="w-5 h-5" style={{ color: TOKENS.accent }} />
        </button>
      </main>

    </div>
  );
}
