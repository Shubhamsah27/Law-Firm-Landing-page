import React from 'react';
import { motion } from 'framer-motion';
import { TOKENS } from '../tokens';
import { InteractiveCard3D } from '../shared';

const bentoItems = [
  {
    title: "Business Litigation",
    desc: "Complex contract disputes, intellectual property defense, antitrust allegations, and shareholder litigation requiring structured resolution.",
    size: "large",
    tag: "Primary Focus"
  },
  {
    title: "Corporate Law",
    desc: "Mergers and acquisitions, seed finance structures, international trade compliance, and multi-state governance directives.",
    size: "medium",
    tag: "Transaction Strategy"
  },
  {
    title: "Family Law",
    desc: "Discreet counsel for private wealth protection, high-value asset splits, and cross-border matrimonial concerns.",
    size: "medium",
    tag: "Asset Protection"
  },
  {
    title: "Employment Law",
    desc: "Executive compensation rules, restrictive covenant disputes, and enterprise employment advisory.",
    size: "small",
    tag: "Regulatory"
  },
  {
    title: "Criminal Defense",
    desc: "White-collar audits, financial crime defense, and federal investigation representation.",
    size: "small",
    tag: "Trial Practice"
  },
  {
    title: "Estate Planning",
    desc: "Multi-generational legacy wealth trusts, private foundations, and tax insulation systems.",
    size: "small",
    tag: "Generational Wealth"
  }
];

export default function BentoPracticeAreas() {
  return (
    <section 
      className="py-24 px-6 md:px-12 select-none"
      style={{ backgroundColor: TOKENS.bg, fontFamily: TOKENS.fontSans }}
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-left mb-16">
          <span 
            className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase block mb-3"
            style={{ color: TOKENS.accent }}
          >
            Sectors of Expertise
          </span>
          <h2 
            className="text-3xl md:text-5xl font-light leading-tight"
            style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
          >
            Bento Practice Areas
          </h2>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[minmax(220px,_auto)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {bentoItems.map((item, idx) => {
            let colSpan = "md:col-span-2";
            if (item.size === "large") colSpan = "md:col-span-6 lg:col-span-4 lg:row-span-2";
            else if (item.size === "medium") colSpan = "md:col-span-3";
            else colSpan = "md:col-span-3 lg:col-span-2";

            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                }}
                className={`h-full ${colSpan}`}
              >
                <InteractiveCard3D className="group hover:border-firmGold/50 h-full">
                  {({ hovered }) => (
                    item.size === "large" ? (
                      <div className="flex flex-col justify-between h-full text-left">
                        <div>
                          <div className="flex justify-between items-start">
                            <span 
                              className="text-[9px] font-bold tracking-widest uppercase block mb-4"
                              style={{ color: TOKENS.accent }}
                            >
                              {item.tag}
                            </span>
                            <span className="text-[9px] font-bold tracking-widest uppercase opacity-45">
                              Core Specialization
                            </span>
                          </div>
                          
                          <h3 
                            className="text-2xl md:text-3xl font-light mb-4 tracking-wide transition-colors group-hover:text-firmGold"
                            style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
                          >
                            {item.title}
                          </h3>
                          
                          <p 
                            className="text-sm font-light leading-relaxed mb-6 max-w-xl"
                            style={{ color: 'rgba(240, 237, 230, 0.75)' }}
                          >
                            {item.desc}
                          </p>

                          <div className="w-full h-[1px] bg-firmBorder/10 my-6" style={{ backgroundColor: TOKENS.border }} />

                          {/* Additional detailed structure for large bento block */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                            <div>
                              <h4 className="text-[10px] font-bold tracking-widest uppercase opacity-40 mb-2">Tactical Focus</h4>
                              <ul className="text-xs font-light space-y-1.5" style={{ color: 'rgba(240, 237, 230, 0.6)' }}>
                                <li>· High-Stakes Contract Claims</li>
                                <li>· Intellectual Property Audits</li>
                                <li>· Partnership Dissolutions</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-[10px] font-bold tracking-widest uppercase opacity-40 mb-2">Performance Record</h4>
                              <ul className="text-xs font-light space-y-1.5" style={{ color: 'rgba(240, 237, 230, 0.6)' }}>
                                <li>· Over 94% Favorable Resolution</li>
                                <li>· State and Federal Board Trials</li>
                                <li>· Multi-Party Leveraged Settlements</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="mt-8 pt-6 border-t flex justify-between items-center" style={{ borderColor: TOKENS.border }}>
                          <span className="text-[9px] tracking-widest uppercase text-firmMuted/40">Audit Record Summary</span>
                          <motion.span 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: hovered ? 0 : 20, opacity: hovered ? 1 : 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[10px] font-semibold tracking-widest uppercase"
                            style={{ color: TOKENS.accent }}
                          >
                            Overview →
                          </motion.span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div>
                          <span 
                            className="text-[9px] font-bold tracking-widest uppercase block mb-4"
                            style={{ color: TOKENS.accent }}
                          >
                            {item.tag}
                          </span>
                          <h3 
                            className="text-xl font-light mb-3 tracking-wide transition-colors group-hover:text-firmGold"
                            style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
                          >
                            {item.title}
                          </h3>
                          <p 
                            className="text-xs md:text-sm font-light leading-relaxed"
                            style={{ color: 'rgba(240, 237, 230, 0.6)' }}
                          >
                            {item.desc}
                          </p>
                        </div>
                        
                        <div className="mt-8 flex justify-end overflow-hidden h-4">
                          <motion.span 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: hovered ? 0 : 20, opacity: hovered ? 1 : 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[10px] font-semibold tracking-widest uppercase"
                            style={{ color: TOKENS.accent }}
                          >
                            Overview →
                          </motion.span>
                        </div>
                      </>
                    )
                  )}
                </InteractiveCard3D>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
