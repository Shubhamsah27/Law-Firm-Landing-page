import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TOKENS } from '../tokens';

const milestones = [
  {
    year: "1998",
    title: "Founding & Vision",
    desc: "Jonathan Mercer established the firm with a single core mandate: white-collar defense and institutional commercial litigation."
  },
  {
    year: "2006",
    title: "National Presence",
    desc: "Opened our second office in San Francisco, expanding transaction strategy representation into Silicon Valley venture markets."
  },
  {
    year: "2015",
    title: "First Landmark Verdict",
    desc: "Secured a historic $45M defense verdict in a multi-state patent dispute, establishing ourselves as premier trial advocates."
  },
  {
    year: "2023",
    title: "Legacy Preservation Group",
    desc: "Formed a multi-generational wealth preservation division, providing trust architecture for private clients worldwide."
  }
];

export default function VerticalTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section 
      ref={containerRef}
      className="py-24 pb-48 px-6 md:px-12 select-none relative overflow-hidden"
      style={{ backgroundColor: TOKENS.bg, fontFamily: TOKENS.fontSans }}
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-left mb-20">
          <span 
            className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase block mb-3"
            style={{ color: TOKENS.accent }}
          >
            Chronology
          </span>
          <h2 
            className="text-3xl md:text-5xl font-light leading-tight"
            style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
          >
            Milestones of Trust
          </h2>
        </div>

        <div className="relative">
          {/* Vertical Path Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2">
            {/* Background Line */}
            <div className="absolute inset-0 bg-firmBorder/10 w-full h-full" />
            {/* Animated Draw Line */}
            <motion.div 
              className="absolute top-0 left-0 right-0 origin-top h-full w-full"
              style={{ 
                scaleY: pathLength,
                backgroundColor: TOKENS.accent
              }}
            />
          </div>

          <div className="space-y-12">
            {milestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={idx}
                  className="flex flex-col md:flex-row items-start relative w-full"
                >
                  {/* Left Column (Desktop) */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 md:text-right ${isEven ? 'md:order-1' : 'md:order-3'}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span 
                        className="text-2xl md:text-3xl font-light block mb-2"
                        style={{ color: TOKENS.accent, fontFamily: TOKENS.fontSerif }}
                      >
                        {milestone.year}
                      </span>
                      <h3 
                        className="text-lg font-semibold tracking-wide mb-2"
                        style={{ color: TOKENS.text }}
                      >
                        {milestone.title}
                      </h3>
                      <p 
                        className="text-xs md:text-sm font-light leading-relaxed text-firmMuted/70"
                        style={{ color: 'rgba(240, 237, 230, 0.6)' }}
                      >
                        {milestone.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center Node dot */}
                  <div className="absolute left-4 md:left-1/2 top-1.5 -translate-x-1/2 z-10 md:order-2">
                    <div 
                      className="w-3.5 h-3.5 border bg-[#0A0A0F]"
                      style={{ borderColor: TOKENS.accent }}
                    />
                  </div>

                  {/* Spacer Column (Desktop) */}
                  <div className={`hidden md:block w-1/2 ${isEven ? 'md:order-3' : 'md:order-1'}`} />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
