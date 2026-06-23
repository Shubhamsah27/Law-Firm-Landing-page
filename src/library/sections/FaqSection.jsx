import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { TOKENS } from '../tokens';
import { Divider, InteractiveCard3D } from '../shared';

const faqData = [
  {
    q: "How does the initial retainer process operate?",
    a: "Every engagement begins with a conflict check, followed by an intake session where we outline legal vulnerability and map operational timelines. A formal engagement agreement is executed before any discovery commences."
  },
  {
    q: "What is your approach to white-collar regulatory investigations?",
    a: "We initiate immediate discovery holds, audit digital logs, secure physical ledgers, and establish dialogue with regulatory agencies. Our strategy focuses on minimizing corporate disruption while protecting partner interests."
  },
  {
    q: "Do you represent clients in federal and state appellate courts?",
    a: "Yes. Our appellate advocacy group represents clients across multiple jurisdictions, crafting briefs and presenting oral arguments to reverse trial rulings or defend favorable outcomes."
  }
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  // Scroll hooks for Variant B vertical line draw
  const variantBRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: variantBRef,
    offset: ["start center", "end center"]
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section 
      className="py-24 px-6 md:px-12 select-none"
      style={{ backgroundColor: TOKENS.bg, fontFamily: TOKENS.fontSans }}
    >
      <div className="w-full max-w-5xl mx-auto space-y-24">
        
        {/* VARIANT A: ACCORDION VIEW */}
        <div className="text-left">
          <div className="mb-12">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase block mb-2" style={{ color: TOKENS.accent }}>
              FAQ — Variant A
            </span>
            <h2 className="text-2xl md:text-4xl font-light" style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}>
              Interactive Accordions
            </h2>
          </div>

          <div className="space-y-4">
            {faqData.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div 
                  key={idx} 
                  className="border-b bg-[#0E0E15]/30 pb-4 transition-colors"
                  style={{ borderColor: TOKENS.border }}
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full py-4 flex justify-between items-center text-left focus:outline-none"
                  >
                    <span 
                      className="text-sm md:text-base font-medium tracking-wide transition-colors duration-300"
                      style={{ color: isOpen ? TOKENS.accent : TOKENS.text }}
                    >
                      {item.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="ml-4"
                    >
                      <ChevronDown className="w-4 h-4 text-firmGold" style={{ color: TOKENS.accent }} />
                    </motion.div>
                  </button>

                  {/* Horizontal gold line draws left to right on expand */}
                  <div className="h-[1px] w-full overflow-hidden relative">
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute inset-0 origin-left"
                      style={{ backgroundColor: TOKENS.accent }}
                    />
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.15, duration: 0.2 }}
                          className="pt-4 pb-2 text-xs md:text-sm font-light leading-relaxed text-firmMuted/70"
                          style={{ color: 'rgba(240, 237, 230, 0.6)' }}
                        >
                          {item.a}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Separator Divider */}
        <Divider />

        {/* VARIANT B: EDITORIAL SPLIT VIEW */}
        <div ref={variantBRef} className="text-left">
          <div className="mb-12">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase block mb-2" style={{ color: TOKENS.accent }}>
              FAQ — Variant B
            </span>
            <h2 className="text-2xl md:text-4xl font-light" style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}>
              Editorial Split Grid
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-11 gap-8 relative items-stretch">
            
            {/* Left Column Questions */}
            <div className="md:col-span-5">
              <InteractiveCard3D drawTopBorder={true} borderDelay={0.1}>
                <div className="space-y-8">
                  {faqData.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                      className="space-y-2"
                    >
                      <span className="text-[10px] font-semibold tracking-wider text-firmGold block" style={{ color: TOKENS.accent }}>
                        QUESTION {idx + 1}
                      </span>
                      <h3 className="text-sm md:text-base font-semibold leading-snug" style={{ color: TOKENS.text }}>
                        {item.q}
                      </h3>
                    </motion.div>
                  ))}
                </div>
              </InteractiveCard3D>
            </div>

            {/* Vertical Divider Line Draws Top to Bottom on Scroll */}
            <div className="hidden md:block md:col-span-1 relative h-full">
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-firmBorder/10" />
              <motion.div 
                className="absolute top-0 left-1/2 w-[1px] -translate-x-1/2 origin-top h-full"
                style={{ scaleY, backgroundColor: TOKENS.accent }}
              />
            </div>

            {/* Right Column Answers */}
            <div className="md:col-span-5">
              <InteractiveCard3D drawTopBorder={true} borderDelay={0.3}>
                <div className="space-y-8">
                  {faqData.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 + idx * 0.15, ease: "easeOut" }}
                      className="space-y-2"
                    >
                      <span className="text-[10px] font-semibold tracking-wider text-firmMuted/40 block">
                        RESPONSE {idx + 1}
                      </span>
                      <p className="text-xs md:text-sm font-light leading-relaxed" style={{ color: 'rgba(240, 237, 230, 0.6)' }}>
                        {item.a}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </InteractiveCard3D>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
