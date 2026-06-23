import React from 'react';
import { motion } from 'framer-motion';
import { TOKENS } from '../tokens';

export default function StatementSection() {
  return (
    <section 
      className="py-36 md:py-48 px-6 md:px-12 select-none flex items-center justify-center min-h-[50vh]"
      style={{ backgroundColor: TOKENS.bg, fontFamily: TOKENS.fontSans }}
    >
      <div className="w-full max-w-4xl text-center">
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl md:text-5xl font-light italic leading-normal max-w-3xl mx-auto px-4"
          style={{ 
            color: TOKENS.text, 
            fontFamily: TOKENS.fontSerif,
            letterSpacing: '-0.01em'
          }}
        >
          "Preparation is not a step in the process. It is the process."
        </motion.blockquote>
      </div>
    </section>
  );
}
