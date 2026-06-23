import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { TOKENS } from '../tokens';
import { InteractiveCard3D } from '../shared';

const testimonials = [
  {
    quote: "Jonathan Mercer provided unmatched strategic leadership. His trial experience was clear from day one and ultimately led to a full defense verdict in our commercial dispute.",
    author: "Sarah K.",
    meta: "Business Litigation"
  },
  {
    quote: "In high-stakes matters, clarity is just as valuable as technical capability. The team provided remarkable counsel, protecting our multi-generational family trusts with absolute precision.",
    author: "Marcus T.",
    meta: "Estate Planning"
  },
  {
    quote: "Their M&A advisory team structures contracts with a disciplined approach that isolates liabilities completely. I trust them blindly on all corporate transaction architectures.",
    author: "Elena R.",
    meta: "Corporate Operations"
  },
  {
    quote: "A powerhouse in white-collar regulatory defense. Their deep discovery audit process uncovered details that saved our company's profile completely.",
    author: "James L.",
    meta: "Criminal Defense"
  },
  {
    quote: "Exceptional representation through a complex corporate partnership dissolution. Direct communication, absolute authority, and premium client service.",
    author: "Sophia G.",
    meta: "Commercial Dispute"
  },
  {
    quote: "Matrimonial divisions are emotionally taxing and financially complex. Their family law strategy kept assets insulated and settled the dispute in record time.",
    author: "David H.",
    meta: "Family Trust Division"
  }
];

export default function MasonryTestimonialGrid() {
  return (
    <section 
      className="py-24 px-6 md:px-12 select-none"
      style={{ backgroundColor: TOKENS.bg, fontFamily: TOKENS.fontSans }}
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span 
            className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase block mb-3"
            style={{ color: TOKENS.accent }}
          >
            TESTIMONIALS
          </span>
          <h2 
            className="text-3xl md:text-5xl font-light leading-tight"
            style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
          >
            Masonry Testimonial Grid
          </h2>
        </div>

        {/* Masonry Layout Grid */}
        <motion.div 
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
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
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="break-inside-avoid relative"
            >
              <InteractiveCard3D className="group hover:border-firmGold/50">
                <div className="relative z-10 text-left w-full flex flex-col items-center text-center">
                  {/* Large quotation mark top left */}
                  <span 
                    className="absolute -top-6 left-2 font-serif text-8xl select-none pointer-events-none opacity-30 leading-none"
                    style={{ color: TOKENS.accent }}
                  >
                    “
                  </span>

                  {/* Stars Row */}
                  <div className="flex justify-center mb-4 mt-2">
                    <div className="flex space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-firmGold fill-firmGold" />
                      ))}
                    </div>
                  </div>

                  <blockquote 
                    className="text-sm md:text-base font-light italic leading-relaxed mb-6 px-2"
                    style={{ color: 'rgba(240, 237, 230, 0.85)', fontFamily: TOKENS.fontSans }}
                  >
                    "{item.quote}"
                  </blockquote>

                  <div className="w-16 h-[1.5px] mb-6" style={{ backgroundColor: TOKENS.border }} />

                  {/* Initials Circle + Name + Subtext */}
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 border flex items-center justify-center bg-[#0A0A0F] mb-3" style={{ borderColor: TOKENS.accent }}>
                      <span className="text-[10px] font-semibold tracking-wider text-firmGold uppercase">
                        {item.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <cite 
                      className="not-italic text-xs font-semibold uppercase tracking-widest block"
                      style={{ color: TOKENS.text }}
                    >
                      {item.author}
                    </cite>
                    <span 
                      className="text-[9px] font-semibold tracking-widest uppercase mt-1 block"
                      style={{ color: TOKENS.accent }}
                    >
                      {item.meta}
                    </span>
                  </div>
                </div>
              </InteractiveCard3D>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
