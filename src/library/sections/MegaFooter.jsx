import React from 'react';
import { motion } from 'framer-motion';
import { TOKENS } from '../tokens';

const columns = [
  {
    title: "Practice Areas",
    links: ["Family Law", "Corporate Law", "Criminal Defense", "Estate Planning", "Business Litigation", "Employment Law"]
  },
  {
    title: "Resources",
    links: ["Confidential Audits", "Magazine Insights", "Legal Definitions", "Annual Reports", "Press Releases", "Faq & Guidelines"]
  },
  {
    title: "Company",
    links: ["Our Founders", "Chronology", "Awards & Accolades", "Careers", "Secure Portal", "Contact Channels"]
  },
  {
    title: "Contact",
    links: ["SF Headquarters", "NYC Regional Office", "Secure Support Line", "Public Inquiries", "Press Room", "Confidential Protocol"]
  }
];

export default function MegaFooter() {
  return (
    <footer 
      className="py-24 px-6 md:px-12 select-none relative overflow-hidden text-left"
      style={{ backgroundColor: TOKENS.bg, fontFamily: TOKENS.fontSans }}
    >
      {/* Top Divider draws left-to-right on scroll */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-transparent overflow-hidden">
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full w-full origin-left"
          style={{ backgroundColor: TOKENS.accent }}
        />
      </div>

      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 items-start">
          
          {/* Brand/Monogram Description */}
          <div className="md:col-span-4 space-y-6">
            <span 
              className="text-2xl font-bold tracking-[0.2em]"
              style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
            >
              MERCER
            </span>
            <p 
              className="text-xs font-light leading-relaxed max-w-xs"
              style={{ color: 'rgba(240, 237, 230, 0.5)' }}
            >
              Institutional attorneys trusted with high-stakes litigation, private legacy trusts, and transactional strategy across North America.
            </p>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {columns.map((col, idx) => (
              <div key={idx} className="space-y-4">
                <span 
                  className="text-[10px] font-bold tracking-widest uppercase block"
                  style={{ color: TOKENS.accent }}
                >
                  {col.title}
                </span>
                
                <motion.ul 
                  className="space-y-2.5"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05
                      }
                    }
                  }}
                >
                  {col.links.map((link, linkIdx) => (
                    <motion.li 
                      key={linkIdx}
                      variants={{
                        hidden: { opacity: 0, x: -5 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
                      }}
                    >
                      <a 
                        href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-xs font-light hover:text-firmGold transition-colors"
                        style={{ color: 'rgba(240, 237, 230, 0.6)' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = TOKENS.accent}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(240, 237, 230, 0.6)'}
                      >
                        {link}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row: copyright + privacy + terms */}
        <div className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] tracking-wider text-firmMuted/40" style={{ borderColor: TOKENS.border }}>
          <span>&copy; {new Date().getFullYear()} MERCER LAW LLC. All rights reserved.</span>
          <div className="flex space-x-6">
            <a href="#privacy" className="hover:text-firmText transition-colors">Privacy Charter</a>
            <a href="#terms" className="hover:text-firmText transition-colors">Terms of Service</a>
            <a href="#disclaimer" className="hover:text-firmText transition-colors">Legal Disclaimer</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
