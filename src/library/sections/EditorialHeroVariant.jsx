import React from 'react';
import { motion } from 'framer-motion';
import { TOKENS } from '../tokens';
import { SweepButton } from '../shared';

export default function EditorialHeroVariant() {
  return (
    <section 
      className="relative py-32 md:py-48 px-6 md:px-12 flex flex-col justify-center items-center overflow-hidden min-h-[85vh] select-none"
      style={{ backgroundColor: TOKENS.bg, fontFamily: TOKENS.fontSans }}
    >
      {/* Centered Watermark Behind Headline */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span 
          className="font-bold tracking-[0.2em] uppercase whitespace-nowrap text-center"
          style={{ 
            opacity: 0.025, 
            fontSize: 'clamp(200px, 30vw, 450px)',
            color: TOKENS.accent,
            fontFamily: TOKENS.fontSerif,
            lineHeight: 1
          }}
        >
          MERCER
        </span>
      </div>

      <div className="relative z-10 w-full max-w-4xl text-center flex flex-col items-center">
        <motion.span 
          initial={{ letterSpacing: "0.15em", opacity: 0 }}
          animate={{ letterSpacing: "0.3em", opacity: 1 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="text-[10px] md:text-xs font-bold uppercase block mb-6"
          style={{ color: TOKENS.accent }}
        >
          Premium Counsel &amp; Advocacy
        </motion.span>
        
        <h1 
          className="text-4xl md:text-6xl lg:text-[76px] font-light leading-[1.1] tracking-tight mb-8 text-center"
          style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
        >
          {["When the outcome matters,", "experience is everything."].map((line, idx) => (
            <div key={idx} className="overflow-hidden">
              <motion.span
                initial={{ y: 45, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block font-light"
              >
                {line}
              </motion.span>
            </div>
          ))}
        </h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm md:text-base font-light leading-relaxed max-w-xl mb-12 text-center"
          style={{ color: 'rgba(240, 237, 230, 0.7)' }}
        >
          Providing tactical legal systems, transactional oversight, and high-stakes advocacy across the United States. Structured with discipline, executed with precision.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex justify-center"
        >
          <SweepButton href="#contact" className="px-10 py-4 text-xs tracking-[0.25em] bg-firmGold/5">
            Initiate Conversation
          </SweepButton>
        </motion.div>
      </div>
    </section>
  );
}
