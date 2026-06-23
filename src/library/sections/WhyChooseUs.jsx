import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Users, Scale } from 'lucide-react';
import { TOKENS } from '../tokens';
import { InteractiveCard3D } from '../shared';

const features = [
  {
    icon: <Shield className="w-5 h-5" style={{ color: TOKENS.accent }} />,
    title: "Strategic Counsel",
    desc: "Every matter begins with a clear plan and disciplined execution."
  },
  {
    icon: <Award className="w-5 h-5" style={{ color: TOKENS.accent }} />,
    title: "Proven Results",
    desc: "Decades of experience across complex legal matters."
  },
  {
    icon: <Users className="w-5 h-5" style={{ color: TOKENS.accent }} />,
    title: "Client Commitment",
    desc: "Direct communication and personalized guidance."
  },
  {
    icon: <Scale className="w-5 h-5" style={{ color: TOKENS.accent }} />,
    title: "Trial Experience",
    desc: "Prepared to advocate aggressively when needed."
  }
];

export default function WhyChooseUs() {
  return (
    <section 
      className="py-24 px-6 md:px-12 flex flex-col justify-center items-center select-none"
      style={{ backgroundColor: TOKENS.bg, fontFamily: TOKENS.fontSans }}
    >
      <div className="w-full max-w-6xl">
        <div className="text-center md:text-left mb-16">
          <span 
            className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase block mb-3"
            style={{ color: TOKENS.accent }}
          >
            Distinctive Competence
          </span>
          <h2 
            className="text-3xl md:text-5xl font-light leading-tight text-left"
            style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
          >
            Why Clients Select Our Firm
          </h2>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="h-full"
            >
              <InteractiveCard3D 
                className="hover:border-firmGold/50"
                drawTopBorder={true}
                borderDelay={idx * 0.1}
              >
                <div>
                  <div 
                    className="w-10 h-10 border flex items-center justify-center mb-6"
                    style={{ borderColor: TOKENS.border }}
                  >
                    {feature.icon}
                  </div>
                  <h3 
                    className="text-lg font-medium tracking-wide mb-3"
                    style={{ color: TOKENS.text }}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="text-sm font-light leading-relaxed"
                    style={{ color: 'rgba(240, 237, 230, 0.6)' }}
                  >
                    {feature.desc}
                  </p>
                </div>
              </InteractiveCard3D>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
