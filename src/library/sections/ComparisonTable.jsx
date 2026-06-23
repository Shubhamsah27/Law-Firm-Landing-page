import React from 'react';
import { motion } from 'framer-motion';
import { TOKENS } from '../tokens';

import { InteractiveCard3D } from '../shared';

const rows = [
  { feature: "Direct Partner Access", mercer: true, traditional: false },
  { feature: "Clear Communication", mercer: true, traditional: false },
  { feature: "Tactical Leverage Strategy", mercer: true, traditional: false },
  { feature: "Aggressive Trial Advocacy", mercer: true, traditional: false },
  { feature: "Personalized Client Attention", mercer: true, traditional: false }
];

export default function ComparisonTable() {
  return (
    <section 
      className="py-24 px-6 md:px-12 select-none"
      style={{ backgroundColor: TOKENS.bg, fontFamily: TOKENS.fontSans }}
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span 
            className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase block mb-3"
            style={{ color: TOKENS.accent }}
          >
            Tactical Comparison
          </span>
          <h2 
            className="text-3xl md:text-5xl font-light leading-tight"
            style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
          >
            Why Clients Choose Mercer
          </h2>
        </div>

        {/* Responsive Table Grid Wrapped in InteractiveCard3D */}
        <InteractiveCard3D className="group hover:border-firmGold/50">
          <div className="w-full p-2 md:p-6 text-left h-full">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 pb-6 border-b border-firmBorder/30 text-xs md:text-sm font-bold tracking-widest uppercase text-firmText" style={{ borderColor: TOKENS.border }}>
              <div className="text-left text-firmMuted/40">Criteria</div>
              <div className="text-center text-firmGold" style={{ color: TOKENS.accent }}>Mercer &amp; Assoc.</div>
              <div className="text-center text-firmMuted/50">Traditional Firms</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-firmBorder/10" style={{ divideColor: TOKENS.border }}>
              {rows.map((row, idx) => (
                <motion.div 
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { duration: 0.5, delay: idx * 0.1, ease: "easeOut" } 
                    }
                  }}
                  className="grid grid-cols-3 gap-4 py-6 items-center text-left text-xs md:text-sm"
                >
                  {/* Column 1: Feature Title */}
                  <div className="font-medium text-[#F0EDE6]" style={{ color: TOKENS.text }}>
                    {row.feature}
                  </div>

                  {/* Column 2: Mercer checkmark draws in */}
                  <div className="flex justify-center">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={TOKENS.accent} strokeWidth="3">
                      <motion.path 
                        d="M20 6L9 17l-5-5"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 + idx * 0.1, ease: "easeOut" }}
                      />
                    </svg>
                  </div>

                  {/* Column 3: Traditional cross fades in */}
                  <div className="flex justify-center">
                    <motion.svg 
                      className="w-4 h-4 text-firmText opacity-40" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.4 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 + idx * 0.1 }}
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </motion.svg>
                  </div>

                </motion.div>
              ))}
            </div>
          </div>
        </InteractiveCard3D>
      </div>
    </section>
  );
}
