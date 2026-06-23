import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TOKENS } from '../tokens';
import { InteractiveCard3D } from '../shared';

const panelsData = [
  {
    word: "PREPARATION",
    title: "Rigorous Case Audits",
    desc: "Every legal defense begins months before entering a courtroom. We audit thousands of digital logs, index physical files, and align expert testimonies to isolate vulnerabilities."
  },
  {
    word: "STRATEGY",
    title: "Leveraged Action Plans",
    desc: "Strategic maneuvers dictate resolutions. We build comprehensive negotiation leverage matrices and draft early motions to pressure opposing parties before trials commence."
  },
  {
    word: "ADVOCACY",
    title: "Aggressive Courtroom Trial",
    desc: "When settlements fail, trial authority is everything. Our experienced trial partners argue with absolute clarity, using digital reconstruction models to win jury verdicts."
  },
  {
    word: "RESULTS",
    title: "Insulated Legacies",
    desc: "Finality and asset protection. We secure multi-million dollar corporate awards, acquit criminal charges, and build insulated generational trust systems."
  }
];

// Single scroll panel hook-wired child
function ScrollPanel({ idx, title, desc, onInView }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView(idx);
    }
  }, [isInView, idx, onInView]);

  return (
    <div 
      ref={ref}
      className="h-[100vh] flex flex-col justify-center text-left px-6 md:px-12 relative py-12"
    >
      <InteractiveCard3D drawTopBorder={true} borderDelay={0.1} className="w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span 
            className="text-[10px] font-bold tracking-[0.25em] uppercase block mb-3"
            style={{ color: TOKENS.accent }}
          >
            Phase 0{idx + 1}
          </span>
          <h3 
            className="text-2xl md:text-4xl font-light mb-6 tracking-wide"
            style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
          >
            {title}
          </h3>
          <p className="text-xs md:text-sm font-light leading-relaxed text-firmMuted/70" style={{ color: 'rgba(240, 237, 230, 0.6)' }}>
            {desc}
          </p>
        </motion.div>
      </InteractiveCard3D>
    </div>
  );
}

export default function StickyStorytelling() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section 
      className="relative select-none"
      style={{ backgroundColor: TOKENS.bg, fontFamily: TOKENS.fontSans }}
    >
      {/* 100vh * panels height outer grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-start relative">
        
        {/* Left Sticky Panel */}
        <div className="lg:col-span-5 h-[200px] lg:h-[100vh] lg:sticky lg:top-0 flex flex-row lg:flex-col justify-center items-center lg:items-start px-6 md:px-16 space-x-6 lg:space-x-0 lg:space-y-8 bg-[#0E0E15]/90 lg:bg-transparent border-b lg:border-b-0 border-firmBorder/20 z-40" style={{ borderColor: TOKENS.border }}>
          {panelsData.map((item, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div 
                key={idx} 
                className="relative cursor-pointer text-left py-2"
                onClick={() => {
                  const targetEl = document.getElementById(`story-panel-${idx}`);
                  if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span 
                  className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase block transition-all duration-300"
                  style={{ 
                    color: isActive ? TOKENS.accent : TOKENS.text,
                    opacity: isActive ? 1 : 0.25
                  }}
                >
                  {item.word}
                </span>

                {/* Underline draws on active */}
                <div className="h-[1.5px] w-full overflow-hidden mt-1.5 relative hidden lg:block">
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0 origin-left"
                    style={{ backgroundColor: TOKENS.accent }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Scroll Panel List */}
        <div className="lg:col-span-7 divide-y divide-firmBorder/10 relative" style={{ divideColor: TOKENS.border }}>
          {panelsData.map((panel, idx) => (
            <div id={`story-panel-${idx}`} key={idx} className="relative">
              <ScrollPanel 
                idx={idx}
                title={panel.title}
                desc={panel.desc}
                onInView={setActiveIdx}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
