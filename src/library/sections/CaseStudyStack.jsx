import React from 'react';
import { motion } from 'framer-motion';
import { TOKENS } from '../tokens';

import { InteractiveCard3D } from '../shared';

const caseStudies = [
  {
    type: "Commercial Dispute",
    challenge: "A complex multi-party contract breach threatening cross-border IP licensing structures.",
    outcome: "Secured complete liability insulation and full ownership preservation via structured arbitration.",
    metric: "$12.4M Recovered"
  },
  {
    type: "White-Collar Defense",
    challenge: "Executive facing grand jury investigation and whistleblower claims of financial wire fraud.",
    outcome: "Conducted exhaustive discovery logs audit proving complete lack of enrichment and intent. Dismissed before indictment.",
    metric: "Complete Dismissal"
  },
  {
    type: "Legacy Preservation",
    challenge: "Restructuring dynastic family trusts across multiple jurisdictions under hostile estate tax audits.",
    outcome: "Designed secure multi-tier inheritance architectures isolating core assets from regulatory exposure.",
    metric: "$85M Insulated"
  }
];

export default function CaseStudyStack() {
  return (
    <section 
      className="py-24 px-6 md:px-12 select-none relative"
      style={{ backgroundColor: TOKENS.bg, fontFamily: TOKENS.fontSans }}
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-left mb-16">
          <span 
            className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase block mb-3"
            style={{ color: TOKENS.accent }}
          >
            Matters of Record
          </span>
          <h2 
            className="text-3xl md:text-5xl font-light leading-tight"
            style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
          >
            Case Study Stack
          </h2>
        </div>

        {/* Scroll-driven stacking wrapper */}
        <div className="relative space-y-8 md:space-y-0 md:h-[140vh] pb-12">
          {caseStudies.map((study, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="w-full md:sticky"
              style={{
                // Sticky overrides for desktop stacking
                top: `${100 + idx * 45}px`,
                zIndex: 10 + idx
              }}
            >
              <InteractiveCard3D className="group hover:border-firmGold/50">
                <div className="w-full flex flex-col justify-between text-left h-full">
                  <div>
                    <span 
                      className="text-[10px] font-bold tracking-widest uppercase block mb-4"
                      style={{ color: TOKENS.accent }}
                    >
                      {study.type}
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 relative z-10">
                      <div>
                        <h4 className="text-[10px] font-bold tracking-widest text-[#F0EDE6] opacity-40 uppercase mb-2">The Challenge</h4>
                        <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(240, 237, 230, 0.7)' }}>
                          {study.challenge}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold tracking-widest text-[#F0EDE6] opacity-40 uppercase mb-2">The Outcome</h4>
                        <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(240, 237, 230, 0.7)' }}>
                          {study.outcome}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t flex justify-between items-baseline relative z-10" style={{ borderColor: TOKENS.border }}>
                    <span className="text-[10px] tracking-widest uppercase text-firmMuted/40">Audit Record</span>
                    <span 
                      className="text-lg md:text-2xl font-light tracking-wide"
                      style={{ color: TOKENS.accent, fontFamily: TOKENS.fontSerif }}
                    >
                      {study.metric}
                    </span>
                  </div>
                </div>
              </InteractiveCard3D>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
