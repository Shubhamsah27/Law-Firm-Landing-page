import React from 'react';
import { motion } from 'framer-motion';
import { TOKENS } from '../tokens';
import { SweepButton, InteractiveCard3D } from '../shared';

export default function PremiumCtaBlock() {
  return (
    <section 
      className="py-24 px-6 md:px-12 select-none relative"
      style={{ backgroundColor: TOKENS.bg, fontFamily: TOKENS.fontSans }}
    >
      <div className="w-full max-w-6xl mx-auto">
        <InteractiveCard3D drawTopBorder={true} borderDelay={0.1} className="py-12 px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left w-full">
            
            {/* Left/Main Column: Serif Statement */}
            <div className="lg:col-span-8">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl md:text-4xl font-light leading-tight tracking-wide"
                style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
              >
                Let's secure your legal trajectory. Connect with our senior partners today.
              </motion.h2>
            </div>

            {/* Right Column: CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-start gap-6 lg:text-right w-full"
            >
              <SweepButton href="#contact" className="w-full sm:w-auto lg:w-full px-8 py-4 text-xs tracking-[0.2em] bg-firmGold/5">
                Request Consultation
              </SweepButton>
              
              <a 
                href="#results" 
                className="text-xs font-semibold tracking-widest uppercase hover:underline transition-all block lg:text-right w-full pl-2 lg:pl-0"
                style={{ color: 'rgba(240, 237, 230, 0.4)' }}
              >
                View Case Records
              </a>
            </motion.div>

          </div>
        </InteractiveCard3D>
      </div>
    </section>
  );
}
