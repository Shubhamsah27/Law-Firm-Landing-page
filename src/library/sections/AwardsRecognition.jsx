import { InteractiveCard3D } from '../shared';

const awards = [
  { title: "Top 100 Trial Lawyers", issuer: "National Trial Advocates", year: "2025" },
  { title: "Best Law Firms 2025", issuer: "U.S. News & World Report", year: "2025" },
  { title: "Chambers Ranked", issuer: "Chambers & Partners", year: "2024" },
  { title: "Super Lawyers Rating", issuer: "Thomson Reuters", year: "2024" },
  { title: "State Bar Recognition", issuer: "State Bar Association", year: "2023" },
  { title: "Martindale-Hubbell AV Rated", issuer: "Martindale-Hubbell Peer Review", year: "2023" }
];

export default function AwardsRecognition() {
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
            Accolades &amp; Integrity
          </span>
          <h2 
            className="text-3xl md:text-5xl font-light leading-tight"
            style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
          >
            Awards &amp; Recognition
          </h2>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
          {awards.map((award, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="h-full"
            >
              <InteractiveCard3D 
                className="group hover:border-firmGold/50 h-full"
                drawTopBorder={true}
                borderDelay={idx * 0.1}
              >
                <div className="flex flex-col justify-between h-full text-left w-full">
                  <div>
                    <div 
                      className="w-10 h-10 border flex items-center justify-center mb-6"
                      style={{ borderColor: TOKENS.border }}
                    >
                      <Award className="w-5 h-5" style={{ color: TOKENS.accent }} />
                    </div>
                    <h3 
                      className="text-lg font-light tracking-wide mb-2"
                      style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
                    >
                      {award.title}
                    </h3>
                    <p className="text-xs text-firmMuted/60 leading-relaxed uppercase tracking-wider">
                      {award.issuer}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t flex justify-between items-center relative z-10" style={{ borderColor: TOKENS.border }}>
                    <span className="text-[9px] tracking-widest uppercase text-firmMuted/40">Credential Year</span>
                    <span className="text-xs font-semibold text-firmGold">{award.year}</span>
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
