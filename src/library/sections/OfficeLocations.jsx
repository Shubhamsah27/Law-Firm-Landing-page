import React from 'react';
import { motion } from 'framer-motion';
import { TOKENS } from '../tokens';
import { MapPin, Phone } from 'lucide-react';
import { InteractiveCard3D } from '../shared';

const offices = [
  { city: "New York", address: "55 Hudson Yards, New York, NY 10001", phone: "(212) 555-0199" },
  { city: "Chicago", address: "110 N Wacker Dr, Chicago, IL 60606", phone: "(312) 555-0144" },
  { city: "Washington D.C.", address: "1700 Pennsylvania Ave, Washington, DC 20006", phone: "(202) 555-0188" },
  { city: "Los Angeles", address: "1999 Avenue of the Stars, Los Angeles, CA 90067", phone: "(310) 555-0122" }
];

export default function OfficeLocations() {
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
            National Presence
          </span>
          <h2 
            className="text-3xl md:text-5xl font-light leading-tight"
            style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
          >
            Office Locations
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Large Dark Map Placeholder Wrapped in InteractiveCard3D */}
          <div className="lg:col-span-6 w-full h-[320px] md:h-[450px]">
            <InteractiveCard3D drawTopBorder={true} borderDelay={0.1}>
              <div className="w-full h-full flex flex-col justify-between relative group overflow-hidden p-6">
                {/* Inner Gold accent border */}
                <div className="absolute inset-3 border border-firmGold/5 pointer-events-none group-hover:border-firmGold/15 transition-colors duration-500" />
                
                {/* Grid Pattern Background */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10 pointer-events-none">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className="border-[0.5px] border-firmGold/10" />
                  ))}
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center py-12">
                  <MapPin className="w-8 h-8 mb-4 opacity-50" style={{ color: TOKENS.accent }} />
                  <span className="text-xs uppercase tracking-[0.25em]" style={{ color: TOKENS.text }}>
                    Interactive Network Map
                  </span>
                  <span className="text-[9px] tracking-widest text-firmMuted/40 uppercase mt-2">
                    Est. 1998 · 4 Regional Offices
                  </span>
                </div>
              </div>
            </InteractiveCard3D>
          </div>

          {/* Right Column: Stacked Location Cards Wrapped in InteractiveCard3D */}
          <div className="lg:col-span-6 space-y-6">
            {offices.map((office, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, x: 40 },
                  visible: { 
                    opacity: 1, 
                    x: 0, 
                    transition: { duration: 0.6, delay: 0.2 + idx * 0.15, ease: [0.16, 1, 0.3, 1] } 
                  }
                }}
              >
                <InteractiveCard3D drawTopBorder={true} borderDelay={0.2 + idx * 0.1} className="w-full">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left w-full p-2">
                    <div>
                      <h3 
                        className="text-lg md:text-xl font-light mb-1"
                        style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
                      >
                        {office.city}
                      </h3>
                      <p className="text-xs font-light text-firmMuted/70" style={{ color: 'rgba(240, 237, 230, 0.6)' }}>
                        {office.address}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 text-xs font-semibold" style={{ color: TOKENS.accent }}>
                      <Phone className="w-3.5 h-3.5" />
                      <a href={`tel:${office.phone.replace(/[^0-9]/g, '')}`} className="hover:underline">
                        {office.phone}
                      </a>
                    </div>
                  </div>
                </InteractiveCard3D>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
