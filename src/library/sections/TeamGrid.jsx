import { InteractiveCard3D } from '../shared';

const team = [
  {
    name: "Jonathan Mercer",
    role: "Founding Partner",
    specialty: "High-Stakes Trial Litigation & White-Collar Defense",
    isFeatured: true,
    monogram: "JM"
  },
  {
    name: "Eleanor Vance",
    role: "Senior Partner",
    specialty: "Corporate M&A & Private Wealth Preservation Strategy",
    isFeatured: false,
    monogram: "EV"
  },
  {
    name: "Marcus Brody",
    role: "Partner",
    specialty: "Matrimonial Asset Protection & Private Family Trusts",
    isFeatured: false,
    monogram: "MB"
  },
  {
    name: "Sophia Sterling",
    role: "Senior Associate",
    specialty: "Intellectual Property Disputes & Appellate Advocacy",
    isFeatured: false,
    monogram: "SS"
  }
];

export default function TeamGrid() {
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
            Attorneys &amp; Partners
          </span>
          <h2 
            className="text-3xl md:text-5xl font-light leading-tight"
            style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
          >
            Our Legal Counsel
          </h2>
        </div>

        {/* Layout Grid: 1 large featured left, 3 supporting stacked right (desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {team.map((member, idx) => {
            return (
              <div key={idx} className={`lg:col-span-6 ${member.isFeatured ? 'lg:row-span-2' : ''}`}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="h-full"
                >
                  <InteractiveCard3D className="group hover:border-firmGold/50">
                    <div className="w-full flex flex-col justify-between text-left h-full">
                      {/* Portrait Placeholder Container */}
                      <div className="relative w-full h-[220px] md:h-[300px] bg-[#0A0A0F] border border-firmBorder/10 overflow-hidden mb-6 flex items-center justify-center">
                        {/* Monogram placeholder */}
                        <span 
                          className="text-4xl font-light tracking-[0.2em]"
                          style={{ color: TOKENS.border, fontFamily: TOKENS.fontSerif }}
                        >
                          {member.monogram}
                        </span>

                        {/* Premium Portrait image zoom mockup */}
                        <motion.div 
                          className="absolute inset-0 border border-firmGold/5 z-10 pointer-events-none"
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />

                        {/* Gold curtain-lift overlay reveal */}
                        <motion.div 
                          initial={{ scaleY: 1 }}
                          whileInView={{ scaleY: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0 origin-top pointer-events-none z-20"
                          style={{ backgroundColor: TOKENS.accent }}
                        />
                      </div>

                      {/* Profile info */}
                      <div className="text-left relative z-10 w-full">
                        <span className="text-[9px] font-bold tracking-widest uppercase block mb-1" style={{ color: TOKENS.accent }}>
                          {member.role}
                        </span>
                        <h3 
                          className="text-xl font-light tracking-wide mb-2 transition-colors duration-300 group-hover:text-firmGold"
                          style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
                        >
                          {member.name}
                        </h3>
                        <p className="text-xs font-light leading-relaxed text-firmMuted/70" style={{ color: 'rgba(240, 237, 230, 0.6)' }}>
                          {member.specialty}
                        </p>
                      </div>
                    </div>
                  </InteractiveCard3D>
                </motion.div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
