import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TOKENS } from '../tokens';
import { InteractiveCard3D } from '../shared';

const cards = [
  { title: "Matters of Arbitration", desc: "Settling commercial claims through private structures." },
  { title: "Antitrust Advisory", desc: "Evaluating market operations against federal compliance charters." },
  { title: "IP Protection Systems", desc: "Formulating digital asset holding registries globally." },
  { title: "Executive Separation", desc: "Drafting high-liability corporate exit compacts discreetly." },
  { title: "Whistleblower Auditing", desc: "Defending enterprise clients against regulatory disclosures." }
];

export default function DragCarousel() {
  const [width, setWidth] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  return (
    <section 
      className="py-24 px-6 md:px-12 select-none overflow-hidden"
      style={{ backgroundColor: TOKENS.bg, fontFamily: TOKENS.fontSans }}
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-left mb-16 flex justify-between items-end">
          <div>
            <span 
              className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase block mb-3"
              style={{ color: TOKENS.accent }}
            >
              Exhibitions
            </span>
            <h2 
              className="text-3xl md:text-5xl font-light leading-tight"
              style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
            >
              Museum Drag Carousel
            </h2>
          </div>
          
          <span className="hidden md:inline text-[9px] tracking-widest text-firmMuted/40 uppercase">
            Click &amp; Drag Carousel
          </span>
        </div>

        {/* Desktop Drag Carousel */}
        <div className="hidden md:block">
          <motion.div 
            ref={carouselRef} 
            className="cursor-grab active:cursor-grabbing overflow-hidden"
          >
            <motion.div 
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              className="flex space-x-6"
              style={{ width: 'max-content' }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.8 }}
            >
              {cards.map((card, idx) => (
                <div 
                  key={idx}
                  className="w-[320px] h-[265px] select-none"
                >
                  <InteractiveCard3D drawTopBorder={true} borderDelay={idx * 0.1} className="h-full">
                    <div className="flex flex-col justify-between h-full text-left">
                      <div>
                        <span className="text-[9px] font-bold tracking-widest uppercase block mb-4" style={{ color: TOKENS.accent }}>
                          Case {idx + 1}
                        </span>
                        <h3 
                          className="text-lg font-light tracking-wide mb-3"
                          style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
                        >
                          {card.title}
                        </h3>
                        <p className="text-xs font-light leading-relaxed text-firmMuted/60" style={{ color: 'rgba(240, 237, 230, 0.5)' }}>
                          {card.desc}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center mt-6 pt-4 border-t w-full" style={{ borderColor: TOKENS.border }}>
                        <span className="text-[10px] tracking-wider uppercase text-firmMuted/40">Audit Record</span>
                        <span className="text-xs" style={{ color: TOKENS.accent }}>→</span>
                      </div>
                    </div>
                  </InteractiveCard3D>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile vertical stack fallback */}
        <div className="block md:hidden space-y-6 text-left">
          {cards.map((card, idx) => (
            <div key={idx} className="h-[210px] w-full">
              <InteractiveCard3D drawTopBorder={true} borderDelay={idx * 0.1} className="h-full">
                <div className="flex flex-col justify-between h-full text-left w-full">
                  <div>
                    <span className="text-[9px] font-bold tracking-widest uppercase block mb-2" style={{ color: TOKENS.accent }}>
                      Case {idx + 1}
                    </span>
                    <h3 className="text-lg font-light tracking-wide mb-2" style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}>
                      {card.title}
                    </h3>
                    <p className="text-xs font-light leading-relaxed text-firmMuted/60" style={{ color: 'rgba(240, 237, 230, 0.5)' }}>
                      {card.desc}
                    </p>
                  </div>
                  <div className="flex justify-end w-full">
                    <span className="text-xs" style={{ color: TOKENS.accent }}>→</span>
                  </div>
                </div>
              </InteractiveCard3D>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
