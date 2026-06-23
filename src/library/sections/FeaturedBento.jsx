import React from 'react';
import { motion } from 'framer-motion';
import { TOKENS } from '../tokens';
import { InteractiveCard3D } from '../shared';

const defaultBentoItems = [
  {
    title: "Global Wealth Architecture",
    desc: "Structuring multinational trust holdings, asset mitigation protection, and dynastic inheritance systems to preserve multi-generational legacies.",
    tag: "Featured Strategy",
    isFeatured: true
  },
  {
    title: "M&amp;A Integration",
    desc: "Managing regulatory review phases, corporate restructuring, and enterprise contracts auditing.",
    tag: "Transactional"
  },
  {
    title: "Trial Defense",
    desc: "Advocating at trial boards for commercial disputes and whistleblower white-collar defense.",
    tag: "Litigation"
  },
  {
    title: "Private Trusts",
    desc: "Drafting confidential generational estates protection directives.",
    tag: "Estate Systems"
  },
  {
    title: "Regulatory Compliance",
    desc: "Securing corporate profiles against federal compliance audits.",
    tag: "Compliance"
  }
];

export default function FeaturedBento({ items = defaultBentoItems }) {
  const featuredItem = items.find(i => i.isFeatured) || items[0];
  const supportingItems = items.filter(i => !i.isFeatured && i !== featuredItem);

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
            System Showcase
          </span>
          <h2 
            className="text-3xl md:text-5xl font-light leading-tight"
            style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
          >
            Featured Bento Grid
          </h2>
        </div>

        {/* Responsive Grid System: 1 large card + 4 supporting cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[minmax(220px,_auto)]">
          
          {/* Featured Large Card (Spans 2 columns on desktop) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="lg:col-span-2 lg:row-span-2 h-full"
          >
            <InteractiveCard3D className="group hover:border-firmGold/50 h-full" drawTopBorder={true} borderDelay={0.1}>
              <div className="flex flex-col justify-between h-full text-left">
                <div>
                  <span className="text-[9px] font-bold tracking-widest uppercase block mb-4" style={{ color: TOKENS.accent }}>
                    {featuredItem.tag}
                  </span>
                  <h3 
                    className="text-2xl md:text-3xl font-light mb-4 transition-colors group-hover:text-firmGold"
                    style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
                  >
                    {featuredItem.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed max-w-xl text-firmMuted/70" style={{ color: 'rgba(240, 237, 230, 0.7)' }}>
                    {featuredItem.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t flex justify-between items-center" style={{ borderColor: TOKENS.border }}>
                  <span className="text-[10px] tracking-widest uppercase text-firmMuted/30">Primary Module</span>
                  <span className="text-xs text-firmGold">→</span>
                </div>
              </div>
            </InteractiveCard3D>
          </motion.div>

          {/* Supporting Cards (4 cards) */}
          {supportingItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { duration: 0.5, delay: 0.2 + idx * 0.1, ease: [0.16, 1, 0.3, 1] } 
                }
              }}
              className="h-full"
            >
              <InteractiveCard3D className="group hover:border-firmGold/50 h-full" drawTopBorder={true} borderDelay={0.2 + idx * 0.1}>
                <div className="flex flex-col justify-between h-full text-left">
                  <div>
                    <span className="text-[9px] font-bold tracking-widest uppercase block mb-3" style={{ color: TOKENS.accent }}>
                      {item.tag}
                    </span>
                    <h3 
                      className="text-lg font-light mb-2 transition-colors group-hover:text-firmGold"
                      style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs font-light leading-relaxed text-firmMuted/60" style={{ color: 'rgba(240, 237, 230, 0.5)' }}>
                      {item.desc}
                    </p>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <span className="text-xs text-firmMuted/30 group-hover:text-firmGold">→</span>
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
