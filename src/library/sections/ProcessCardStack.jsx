import React from 'react';
import { motion } from 'framer-motion';
import { TOKENS } from '../tokens';
import { InteractiveCard3D } from '../shared';

const steps = [
  {
    num: "01",
    title: "Consultation & Intake",
    desc: "We initiate with an exhaustive briefing process to clarify client liabilities, establish core dispute scopes, and define initial retention benchmarks."
  },
  {
    num: "02",
    title: "Investigation & Audit",
    desc: "Our legal analysts query historical ledgers, secure physical retention chains, index electronic files, and align expert testimonies."
  },
  {
    num: "03",
    title: "Tactical Leverage Strategy",
    desc: "We formulate comprehensive counter-claims matrices, draft early compliance motions, and test arguments via defensive mock trials."
  },
  {
    num: "04",
    title: "Resolution & Execution",
    desc: "We present arguments with absolute authority at trial boards or execute structured, confidential settlement compacts to protect your profile."
  }
];

export default function ProcessCardStack() {
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
            Workflow Method
          </span>
          <h2 
            className="text-3xl md:text-5xl font-light leading-tight"
            style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
          >
            Process Card Stack
          </h2>
        </div>

        {/* Sticky Card Stacking Layout Container */}
        <div className="relative space-y-8 md:space-y-0 md:h-[155vh] pb-12">
          {steps.map((step, idx) => {
            // Progressive scaling for background elements
            const scale = 1 - (steps.length - 1 - idx) * 0.01;
            
            return (
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
                  top: `${100 + idx * 45}px`,
                  zIndex: 10 + idx
                }}
              >
                <InteractiveCard3D className="group hover:border-firmGold/50" drawTopBorder={true} borderDelay={idx * 0.15}>
                  <div 
                    className="w-full flex flex-col justify-between text-left h-full"
                    style={{
                      transform: `scale(${scale})`,
                      transformOrigin: 'top center',
                      transition: 'transform 0.4s ease'
                    }}
                  >
                    <div>
                      <div className="flex justify-between items-baseline mb-6">
                        <span 
                          className="font-heading text-4xl font-light select-none tracking-wider opacity-20"
                          style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
                        >
                          {step.num}
                        </span>
                        <span className="text-[9px] font-bold tracking-widest uppercase opacity-45">
                          Methodology Phase
                        </span>
                      </div>

                      <h3 
                        className="text-xl md:text-2xl font-light mb-4 tracking-wide transition-colors group-hover:text-firmGold"
                        style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
                      >
                        {step.title}
                      </h3>
                      
                      <p className="text-sm font-light leading-relaxed text-firmMuted/70" style={{ color: 'rgba(240, 237, 230, 0.7)' }}>
                        {step.desc}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t flex justify-between items-center" style={{ borderColor: TOKENS.border }}>
                      <span className="text-[9px] tracking-widest uppercase text-firmMuted/40">Operational Protocol</span>
                      <span className="text-xs text-firmGold">→</span>
                    </div>
                  </div>
                </InteractiveCard3D>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
