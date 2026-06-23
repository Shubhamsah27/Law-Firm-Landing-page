import React from 'react';
import { motion } from 'framer-motion';
import { TOKENS } from '../tokens';
import { InteractiveCard3D } from '../shared';

export default function StatementBlockVariant() {
  return (
    <section 
      className="py-24 px-6 md:px-12 select-none flex flex-col items-center justify-center min-h-[60vh]"
      style={{ backgroundColor: TOKENS.bg, fontFamily: TOKENS.fontSans }}
    >
      <div className="w-full max-w-3xl text-center">
        <InteractiveCard3D drawTopBorder={true} borderDelay={0.1} className="py-16 md:py-24 px-6 md:px-12">
          <div className="space-y-8 flex flex-col items-center justify-center w-full">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl md:text-5xl font-light leading-snug tracking-tight max-w-2xl mx-auto"
              style={{ 
                color: TOKENS.text, 
                fontFamily: TOKENS.fontSerif,
                letterSpacing: '-0.01em'
              }}
            >
              "Results are earned long before the courtroom."
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs md:text-sm font-light tracking-[0.2em] uppercase max-w-sm mx-auto"
              style={{ color: 'rgba(240, 237, 230, 0.4)' }}
            >
              Mercer &amp; Associates · Est. 1998
            </motion.p>
          </div>
        </InteractiveCard3D>
      </div>
    </section>
  );
}
