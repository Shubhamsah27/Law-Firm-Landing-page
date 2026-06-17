import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Shield, 
  Briefcase, 
  Scale, 
  FileCheck, 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  ArrowRight, 
  X, 
  Award, 
  Star, 
  ArrowUpRight, 
  FileText,
  User,
  Users,
  ChevronRight,
  Check
} from 'lucide-react';

// Animation variants for consistency across sections
const fadeUpVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Section Label Utility
function SectionLabel({ text }) {
  return (
    <div className="mb-4">
      <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-firmGold uppercase">
        {text}
      </span>
    </div>
  );
}

// Premium Drawing Divider Line
function Divider() {
  return (
    <div className="w-full relative overflow-hidden my-0">
      <motion.hr 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="border-t border-firmBorder/30 origin-left"
      />
    </div>
  );
}

// Premium Interactive NavLink with sliding underline
function NavLink({ href, children }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a 
      href={href} 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative hover:text-firmGold transition-colors py-2"
    >
      {children}
      {hovered && (
        <motion.div 
          layoutId="navUnderline"
          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-firmGold"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
    </a>
  );
}

// 3D Parallax Hero Logo Component
function HeroBrandLogo() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[400px] md:h-[550px] border border-firmBorder overflow-hidden group cursor-pointer"
      style={{ perspective: 1000 }}
    >
      {/* Logo Brand Image */}
      <motion.img 
        src="/logo.png" 
        alt="Mercer Law Brand" 
        className="w-full h-full object-cover object-center z-10"
        animate={{ 
          rotateY: coords.x * 15,
          rotateX: -coords.y * 15,
          scale: 1.03
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />
      {/* Subtle vignette on top */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/45 via-transparent to-transparent pointer-events-none z-10" />
      
      {/* Fine Gold border accent inside */}
      <div className="absolute inset-3 border border-firmGold/10 pointer-events-none group-hover:border-firmGold/30 transition-colors duration-500 z-20" />
    </div>
  );
}

// 3D Tilt Card wrapper
function InteractiveCard3D({ children, onClick, className = "" }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  return (
    <div style={{ perspective: 1200 }} className="h-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setCoords({ x: 0, y: 0 });
        }}
        onClick={onClick}
        className={`relative bg-firmSurface border border-firmBorder p-8 text-left cursor-pointer select-none h-full flex flex-col justify-between ${className}`}
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          rotateY: hovered ? coords.x * 20 : 0,
          rotateX: hovered ? -coords.y * 20 : 0,
          z: hovered ? 40 : 0,
          scale: hovered ? 1.04 : 1,
          boxShadow: hovered 
            ? "0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 25px 2px rgba(201, 168, 76, 0.15)" 
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
      >
        {/* 3D Inner Content Depth effect */}
        <div style={{ transform: hovered ? "translateZ(30px)" : "translateZ(0px)", transformStyle: "preserve-3d", transition: "transform 0.3s ease" }} className="h-full flex flex-col justify-between">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

// Cinematic Placeholder Component
function CinematicPlaceholder({ height = "h-[450px] md:h-[600px]", monogram = "M", title = "MERCER" }) {
  return (
    <div className={`relative w-full ${height} bg-[#1A1A28] border border-firmBorder overflow-hidden group`}>
      {/* Abstract Background Accents */}
      <div className="absolute inset-0 bg-radial-gradient from-firmSurface to-firmBg opacity-60" />
      
      {/* Luxury Grid Lines */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-20 pointer-events-none">
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-firmGold/10" />
        ))}
      </div>

      {/* Abstract Architectural Gold Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity duration-1000" xmlns="http://www.w3.org/2000/svg">
        <line x1="10%" y1="10%" x2="90%" y2="90%" stroke="#C9A84C" strokeWidth="0.5" />
        <line x1="90%" y1="10%" x2="10%" y2="90%" stroke="#C9A84C" strokeWidth="0.5" />
        <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="4 8" />
        <circle cx="50%" cy="50%" r="5%" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
      </svg>
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent opacity-80" />
      
      {/* Centered Institutional Monogram */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="w-16 h-16 md:w-20 md:h-20 border border-firmGold/40 flex items-center justify-center mb-4 transition-transform duration-700 group-hover:scale-105">
          <span className="font-heading text-3xl md:text-4xl text-firmGold font-light tracking-widest">{monogram}</span>
        </div>
        <div className="font-heading text-lg md:text-xl tracking-[0.3em] text-firmText/80 font-light mb-1">
          {title}
        </div>
        <div className="text-[10px] tracking-[0.2em] text-firmMuted uppercase font-medium">
          Est. 1998
        </div>
      </div>

      {/* Luxury Border Accent */}
      <div className="absolute inset-3 border border-firmGold/10 pointer-events-none group-hover:border-firmGold/30 transition-colors duration-500" />
    </div>
  );
}

// Elegant Custom Gold Pointer and Follower Ring Cursor
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (hidden) setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    const handleLinkHover = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'SELECT' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.cursor-pointer');
      setHovered(!!isInteractive);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleLinkHover);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleLinkHover);
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-2.5 h-2.5 bg-firmGold/60 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      style={{ boxShadow: "0 0 8px 1px rgba(201, 168, 76, 0.15)" }}
      animate={{
        x: position.x,
        y: position.y,
        scale: hovered ? 2.2 : 1,
        backgroundColor: hovered ? "rgba(201, 168, 76, 0.1)" : "rgba(201, 168, 76, 0.6)",
        border: hovered ? "1px solid rgba(201, 168, 76, 0.6)" : "1px solid transparent",
      }}
      transition={{ type: "spring", stiffness: 650, damping: 30, mass: 0.15 }}
    />
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null); // 'idle', 'booking', 'success'
  const [bookingForm, setBookingForm] = useState({
    practice: 'Corporate Law',
    date: '2026-06-22',
    time: '10:00 AM',
    name: '',
    email: '',
    phone: '',
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingStatus('booking');
    setTimeout(() => {
      setBookingStatus('success');
    }, 1500);
  };

  const practiceAreas = [
    { 
      title: "Family Law", 
      desc: "Discreet counsel for private wealth protection, high-value asset divisions, and complex child custody structures.",
      detail: "Providing secure representation through matrimonial disputes, trust preservation, prenuptial protections, and cross-jurisdictional family interests."
    },
    { 
      title: "Corporate Law", 
      desc: "Strategic advisory for institutional structures, venture financing, mergers and acquisitions, and governance.",
      detail: "Structuring complex corporate operations, seed/debt financing rounds, vendor infrastructure protocols, and international compliance strategies."
    },
    { 
      title: "Criminal Defense", 
      desc: "Aggressive defense in white-collar crimes, state and federal trial matters, and grand jury investigations.",
      detail: "Protecting liberties and corporate profiles against compliance investigations, financial crimes audits, and trial-level criminal allegations."
    },
    { 
      title: "Estate Planning", 
      desc: "Multi-generational legacy structures, private trusts, tax mitigation, and wealth inheritance planning.",
      detail: "Drafting generational wealth systems, dynastic trusts, estate administration directives, and structures focused on significant tax insulation."
    },
    { 
      title: "Business Litigation", 
      desc: "High-stakes commercial disputes, partnership dissolutions, and intellectual property litigation.",
      detail: "Trial advocacy for major contract breeches, patent protections, unfair trade claims, and high-liability partnership dissolutions."
    },
    { 
      title: "Employment Law", 
      desc: "Executive compensation, employment covenants, class actions, and corporate regulatory defense.",
      detail: "Formulating enterprise employment rules, executive separation structures, non-compete enforcement, and class action defense protocols."
    }
  ];

  const steps = [
    { 
      icon: <Users className="w-5 h-5 text-firmGold" />, 
      title: "01. Intake & Consult", 
      desc: "An exhaustive briefing to define legal vulnerability, clarify stakes, and identify operational timelines." 
    },
    { 
      icon: <Search className="w-5 h-5 text-firmGold" />, 
      title: "02. Discovery Audit", 
      desc: "Deep research into digital trails, expert witness matching, and document indexing." 
    },
    { 
      icon: <Scale className="w-5 h-5 text-firmGold" />, 
      title: "03. Strategy & Formulation", 
      desc: "Designing defensive mock trials, structuring leverage matrices, and outlining initial motions." 
    },
    { 
      icon: <FileCheck className="w-5 h-5 text-firmGold" />, 
      title: "04. Resolution Path", 
      desc: "Precision trials, strategic settlement points, or structured arbitration for finality." 
    }
  ];

  const caseResults = [
    {
      amount: "$12.4M",
      label: "Commercial Litigation Victory",
      type: "Business Litigation",
      challenge: "A corporate partner attempted a hostile intellectual property takeover, claiming breach of non-compete agreements.",
      strategy: "We audited 3 years of digital logs, establishing bad-faith negotiation, and counter-sued for trade secret violations.",
      outcome: "Unanimous jury verdict awarding full ownership preservation and $12.4M in punitive damages."
    },
    {
      amount: "$5.8M",
      label: "Personal Injury Settlement",
      type: "Civil Claims",
      challenge: "A client sustained career-ending injuries in a complex multi-vehicle logistics collision with contested liability.",
      strategy: "Reconstructed the accident using black-box telematics and proved systematic regulatory violations by the transport enterprise.",
      outcome: "Settlement secured prior to jury selection, granting $5.8M to structure life-long medical trusts."
    },
    {
      amount: "Defense Verdict",
      label: "Criminal Defense Case",
      type: "Criminal Defense",
      challenge: "Executive faced federal wire fraud charges carrying up to 20 years imprisonment based on whistleblower claims.",
      strategy: "Demonstrated that the internal ledger modifications were authorized and lacked any criminal intent or personal enrichment.",
      outcome: "Complete acquittal on all counts after a grueling 3-week federal jury trial."
    }
  ];

  const articles = [
    {
      category: "Corporate Law",
      date: "June 2025",
      headline: "What Business Owners Should Know About Contract Disputes",
      excerpt: "Modern commercial agreements require rigorous escape protocols and preemptive arbitration clauses to isolate risk and preserve ongoing operations."
    },
    {
      category: "Family Law",
      date: "May 2025",
      headline: "Understanding Child Custody Decisions in High-Asset Divorces",
      excerpt: "When substantial trusts and overseas estates enter the equations, child custody requires strategic multi-state and international legal frameworks."
    },
    {
      category: "Litigation",
      date: "April 2025",
      headline: "Preparing For A High-Stakes Litigation Matter",
      excerpt: "The first 48 hours of a litigation notice define the trajectory of the dispute. Understanding discovery retention holds is critical."
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0A0F] text-[#F5F1EA] selection:bg-firmGold selection:text-[#0A0A0F]">
      {/* Custom follower cursor */}
      <CustomCursor />

      {/* Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[1.5px] bg-firmGold origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Decorative Overlays */}
      <div className="noise-overlay" />
      <div className="vignette-overlay" />

      {/* Header / Navigation */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 border-b border-transparent ${scrolled ? 'bg-[#0A0A0F]/90 backdrop-blur-md border-firmBorder' : 'bg-transparent'}`}>
        <div className="editorial-container flex justify-between items-center h-20 md:h-24">
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <img 
              src="/logo.png" 
              alt="Mercer Law Logo" 
              className="h-12 md:h-14 object-contain transition-opacity duration-300 group-hover:opacity-90"
            />
          </a>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-medium tracking-[0.2em] uppercase text-firmMuted">
            <NavLink href="#practice-areas">Practice Areas</NavLink>
            <NavLink href="#process">Process</NavLink>
            <NavLink href="#attorney">Attorney</NavLink>
            <NavLink href="#results">Results</NavLink>
            <NavLink href="#insights">Insights</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>

          {/* Consultation Button */}
          <div className="flex items-center">
            <a 
              href="#contact" 
              className="px-5 py-2.5 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase border border-firmGold text-firmGold hover:bg-firmGold hover:text-[#0A0A0F] transition-all duration-300"
            >
              Schedule Consultation
            </a>
          </div>
        </div>
      </header>

      {/* Content Wrapper */}
      <main className="relative z-10">

        {/* SECTION 01 — HERO */}
        <section id="hero" className="pt-32 md:pt-40 pb-20 md:pb-32 overflow-hidden">
          <div className="editorial-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Cinematic Brand Portrait */}
              <motion.div 
                className="lg:col-span-5 w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariants}
              >
                <HeroBrandLogo />
              </motion.div>

              {/* Right Column: Hero Typography */}
              <motion.div 
                className="lg:col-span-7 flex flex-col justify-center text-left"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.div variants={fadeUpVariants}>
                  <SectionLabel text="Trusted Counsel Since 1998" />
                </motion.div>
                
                <h1 
                  className="font-heading text-4xl md:text-6xl lg:text-[70px] leading-[1.05] font-light text-firmText tracking-tight mb-8"
                >
                  {["When the outcome matters,", "experience becomes", "strategy."].map((line, idx) => (
                    <div key={idx} className="overflow-hidden">
                      <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.1, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {line}
                      </motion.div>
                    </div>
                  ))}
                </h1>

                <motion.p 
                  variants={fadeUpVariants}
                  className="text-base md:text-lg text-firmMuted max-w-xl font-light leading-relaxed mb-10"
                >
                  For over two decades, we have represented individuals, families, and businesses through their most important legal challenges. Precision in advice, authority in outcomes.
                </motion.p>

                <motion.div 
                  variants={fadeUpVariants} 
                  className="flex flex-wrap items-center gap-6"
                >
                  <a 
                    href="#contact" 
                    className="px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase border border-firmGold text-firmGold bg-firmGold/5 hover:bg-firmGold hover:text-[#0A0A0F] transition-all duration-300"
                  >
                    Schedule Consultation
                  </a>
                  <a 
                    href="#practice-areas" 
                    className="group flex items-center space-x-2 text-xs font-semibold tracking-[0.2em] uppercase text-firmText hover:text-firmGold transition-colors py-2"
                  >
                    <span>View Practice Areas</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Thin gold divider */}
        <Divider />

        {/* SECTION 02 — TRUST BAR */}
        <section className="bg-firmSurface/30 py-8 border-y border-firmBorder/20">
          <div className="editorial-container">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { count: "2500+", title: "Cases Resolved" },
                { count: "25+", title: "Years Experience" },
                { count: "4.9/5", title: "Client Rating" },
                { count: "15+", title: "Industry Awards" }
              ].map((metric, index) => (
                <motion.div 
                  key={index}
                  variants={fadeUpVariants}
                  className={`flex flex-col items-center justify-center text-center px-4 ${index !== 3 ? 'md:border-r border-firmBorder' : ''}`}
                >
                  <span className="font-heading text-2xl md:text-4xl text-firmGold font-light mb-1">{metric.count}</span>
                  <span className="text-[9px] md:text-[10px] tracking-[0.2em] text-firmMuted uppercase font-semibold">{metric.title}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SECTION 03 — PRACTICE AREAS */}
        <section id="practice-areas" className="py-20 md:py-32">
          <div className="editorial-container">
            <div className="max-w-2xl text-left mb-16 md:mb-20">
              <SectionLabel text="PRACTICE AREAS" />
              <h2 className="font-heading text-3xl md:text-5xl font-light text-firmText mt-2">
                Focused Expertise Across Complex Matters
              </h2>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {practiceAreas.map((area, index) => (
                <motion.div key={index} variants={fadeUpVariants}>
                  <InteractiveCard3D className="group min-h-[240px] hover:border-firmGold/50">
                    <div>
                      <h3 className="font-heading text-xl md:text-2xl text-firmText group-hover:text-firmGold transition-colors mb-4">
                        {area.title}
                      </h3>
                      <p className="text-xs md:text-sm text-firmMuted font-light leading-relaxed">
                        {area.desc}
                      </p>
                    </div>
                    <div className="mt-8 flex justify-end">
                      <span className="text-[10px] font-semibold tracking-widest text-firmGold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 uppercase">
                        Overview <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </InteractiveCard3D>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Thin gold divider */}
        <Divider />

        {/* SECTION 04 — HOW WE WORK */}
        <section id="process" className="py-20 md:py-32 bg-firmSurface/10">
          <div className="editorial-container">
            <div className="max-w-2xl text-left mb-16 md:mb-24">
              <SectionLabel text="OUR PROCESS" />
              <h2 className="font-heading text-3xl md:text-5xl font-light text-firmText mt-2">
                A Meticulous Path to Resolution
              </h2>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  variants={fadeUpVariants}
                  className="text-left relative flex flex-col justify-between"
                >
                  <div>
                    {/* Icon Container */}
                    <div className="w-10 h-10 border border-firmGold/30 flex items-center justify-center mb-6">
                      {step.icon}
                    </div>
                    <h3 className="font-heading text-lg md:text-xl text-firmText mb-3">
                      {step.title}
                    </h3>
                    <p className="text-xs md:text-sm text-firmMuted font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  {/* Visual Timeline line connector */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-5 left-[40px] right-[-40px] h-[0.5px] bg-firmGold/20" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Thin gold divider */}
        <Divider />

        {/* SECTION 05 — ATTORNEY SPOTLIGHT */}
        <section id="attorney" className="py-20 md:py-32">
          <div className="editorial-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Portrait */}
              <motion.div 
                className="lg:col-span-5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariants}
              >
                <div className="relative w-full h-[450px] md:h-[600px] border border-firmBorder overflow-hidden group">
                  {/* Subtle Vignette on Image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/80 via-transparent to-transparent z-10 pointer-events-none" />
                  <img 
                    src="/jonathan-mercer.png" 
                    alt="Jonathan Mercer" 
                    className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000 ease-out scale-100 group-hover:scale-105"
                  />
                  {/* Fine Gold border accent inside */}
                  <div className="absolute inset-3 border border-firmGold/10 pointer-events-none group-hover:border-firmGold/30 transition-colors duration-500 z-20" />
                </div>
              </motion.div>

              {/* Right Column: Bio */}
              <motion.div 
                className="lg:col-span-7 text-left"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.div variants={fadeUpVariants}>
                  <SectionLabel text="ATTORNEY PROFILE" />
                </motion.div>
                
                <motion.h2 
                  variants={fadeUpVariants}
                  className="font-heading text-3xl md:text-5xl font-light text-firmText mb-1"
                >
                  Meet Jonathan Mercer
                </motion.h2>
                <motion.div 
                  variants={fadeUpVariants}
                  className="text-xs font-semibold tracking-widest text-firmGold uppercase mb-8"
                >
                  Founding Partner
                </motion.div>

                <motion.p 
                  variants={fadeUpVariants}
                  className="text-sm md:text-base text-firmMuted font-light leading-relaxed mb-8 max-w-xl"
                >
                  Known for his strategic thinking and courtroom presence, Jonathan has spent more than twenty years helping clients navigate high-stakes legal matters. He represents companies and individuals in matters where failure is not a viable alternative.
                </motion.p>

                {/* Credentials */}
                <motion.div 
                  variants={fadeUpVariants}
                  className="border-t border-firmBorder/30 pt-8"
                >
                  <span className="text-[10px] font-bold tracking-[0.2em] text-firmText uppercase block mb-4">Credentials &amp; Recognitions</span>
                  <ul className="space-y-3">
                    {[
                      "Juris Doctor (JD), Harvard Law School",
                      "Top 100 Trial Lawyers (National Trial Association)",
                      "State Bar Board Member (Litigation Division)"
                    ].map((cred, i) => (
                      <li key={i} className="flex items-center text-xs md:text-sm text-firmMuted font-light">
                        <span className="w-1.5 h-1.5 bg-firmGold mr-3"></span>
                        {cred}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Thin gold divider */}
        <Divider />

        {/* SECTION 06 — CASE RESULTS */}
        <section id="results" className="py-20 md:py-32 bg-firmSurface/10">
          <div className="editorial-container">
            <div className="max-w-2xl text-left mb-16 md:mb-20">
              <SectionLabel text="CASE RESULTS" />
              <h2 className="font-heading text-3xl md:text-5xl font-light text-firmText mt-2">
                Results That Speak For Themselves
              </h2>
            </div>

            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {caseResults.map((result, index) => (
                <motion.div key={index} variants={fadeUpVariants}>
                  <InteractiveCard3D onClick={() => setSelectedCase(result)} className="group min-h-[220px] hover:border-firmGold/50">
                    <div>
                      <span className="text-[10px] font-semibold tracking-widest text-firmGold/60 uppercase block mb-2">
                        {result.type}
                      </span>
                      <div className="font-heading text-3xl md:text-4xl text-firmGold font-light mb-4 tracking-tight">
                        {result.amount}
                      </div>
                      <div className="text-xs md:text-sm text-firmText font-medium">
                        {result.label}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-6">
                      <span className="text-[10px] font-semibold tracking-widest text-firmGold uppercase flex items-center gap-1 group-hover:underline">
                        View Audit Details
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-firmGold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </InteractiveCard3D>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Thin gold divider */}
        <Divider />

        {/* SECTION 07 — TESTIMONIALS */}
        <section className="py-20 md:py-32">
          <div className="editorial-container">
            <div className="max-w-3xl mx-auto text-center">
              <SectionLabel text="TESTIMONIALS" />
              
              <div className="mt-8">
                {/* Single Big Editorial Quote slider or scroll layout */}
                <div className="space-y-16">
                  {[
                    {
                      text: "The team guided us through a difficult dispute with remarkable clarity and professionalism.",
                      author: "Sarah K.",
                      case: "Business Litigation"
                    },
                    {
                      text: "We felt supported from our first consultation through the final outcome. Their strategy was unmatched.",
                      author: "James R.",
                      case: "Family Law"
                    },
                    {
                      text: "Exceptional legal counsel delivered exactly when it mattered most. I highly recommend Jonathan Mercer.",
                      author: "Michael T.",
                      case: "Criminal Defense"
                    }
                  ].map((t, index) => (
                    <motion.div 
                      key={index}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      variants={fadeUpVariants}
                      className="border-b border-firmBorder/20 pb-16 last:border-b-0 last:pb-0"
                    >
                      <div className="flex justify-center mb-6">
                        <div className="flex space-x-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-firmGold fill-firmGold" />
                          ))}
                        </div>
                      </div>
                      <blockquote className="font-heading text-2xl md:text-3xl lg:text-4xl text-firmText italic font-light leading-relaxed max-w-2xl mx-auto mb-6">
                        "{t.text}"
                      </blockquote>
                      <cite className="not-italic text-xs tracking-widest text-firmMuted uppercase font-medium">
                        — {t.author} <span className="text-firmGold mx-2">·</span> {t.case}
                      </cite>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Thin gold divider */}
        <Divider />

        {/* SECTION 08 — INSIGHTS */}
        <section id="insights" className="py-20 md:py-32 bg-firmSurface/10">
          <div className="editorial-container">
            <div className="max-w-2xl text-left mb-16 md:mb-20">
              <SectionLabel text="INSIGHTS" />
              <h2 className="font-heading text-3xl md:text-5xl font-light text-firmText mt-2">
                Magazine &amp; Resources
              </h2>
            </div>

            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {articles.map((article, index) => (
                <motion.div key={index} variants={fadeUpVariants}>
                  <InteractiveCard3D className="group hover:border-firmGold/50">
                    <div>
                      <div className="flex items-center justify-between text-[10px] tracking-widest text-firmMuted font-semibold mb-6 uppercase">
                        <span>{article.category}</span>
                        <span>{article.date}</span>
                      </div>
                      <h3 className="font-heading text-xl md:text-2xl text-firmText mb-4 group-hover:text-firmGold transition-colors leading-snug">
                        {article.headline}
                      </h3>
                      <p className="text-xs md:text-sm text-firmMuted font-light leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-firmBorder/10 flex items-center justify-between w-full">
                      <span className="text-[10px] font-semibold tracking-widest text-firmText uppercase group-hover:text-firmGold transition-colors">
                        Read Article
                      </span>
                      <ArrowRight className="w-4 h-4 text-firmMuted group-hover:text-firmGold transition-colors group-hover:translate-x-1" />
                    </div>
                  </InteractiveCard3D>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Thin gold divider */}
        <Divider />

        {/* SECTION 09 — CONTACT & SCHEDULER */}
        <section id="contact" className="py-20 md:py-32">
          <div className="editorial-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Left Column: Context Info */}
              <div className="lg:col-span-5 text-left flex flex-col justify-between">
                <div>
                  <SectionLabel text="CONTACT" />
                  <h2 className="font-heading text-3xl md:text-5xl font-light text-firmText mt-2 mb-6">
                    Let's Discuss What Comes Next.
                  </h2>
                  <p className="text-sm md:text-base text-firmMuted font-light leading-relaxed mb-10 max-w-md">
                    Whether you are facing an active dispute, planning for the future, or protecting a business portfolio, our team offers the precision and authority required for resolution.
                  </p>
                </div>

                {/* Contact Channels */}
                <div className="space-y-6 border-t border-firmBorder/30 pt-8 mt-8 lg:mt-0">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 border border-firmGold/30 flex items-center justify-center mt-1">
                      <Phone className="w-4 h-4 text-firmGold" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold tracking-widest text-firmMuted uppercase block">Telephone</span>
                      <a href="tel:5551234567" className="text-sm md:text-base text-firmText hover:text-firmGold transition-colors">(555) 123-4567</a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 border border-firmGold/30 flex items-center justify-center mt-1">
                      <Mail className="w-4 h-4 text-firmGold" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold tracking-widest text-firmMuted uppercase block">Confidential Email</span>
                      <a href="mailto:contact@mercerlaw.com" className="text-sm md:text-base text-firmText hover:text-firmGold transition-colors">contact@mercerlaw.com</a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 border border-firmGold/30 flex items-center justify-center mt-1">
                      <MapPin className="w-4 h-4 text-firmGold" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold tracking-widest text-firmMuted uppercase block">Headquarters</span>
                      <span className="text-xs md:text-sm text-firmMuted font-light block">600 Montgomery St, San Francisco, CA 94111</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Consultation Scheduler */}
              <div className="lg:col-span-7 text-left bg-firmSurface border border-firmBorder p-8 md:p-10">
                <span className="text-[10px] font-semibold tracking-[0.2em] text-firmGold uppercase block mb-6">SCHEDULER</span>
                
                {bookingStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-16"
                  >
                    <div className="w-12 h-12 border border-firmGold flex items-center justify-center mb-6">
                      <Check className="w-6 h-6 text-firmGold" />
                    </div>
                    <h3 className="font-heading text-2xl text-firmText mb-2">Consultation Confirmed</h3>
                    <p className="text-xs md:text-sm text-firmMuted max-w-sm font-light leading-relaxed mb-6">
                      We have reserved your consultation for {bookingForm.date} at {bookingForm.time} under {bookingForm.name}. A confirmation email has been dispatched.
                    </p>
                    <button 
                      onClick={() => setBookingStatus(null)}
                      className="px-6 py-2.5 text-[10px] font-semibold tracking-widest uppercase border border-firmGold/30 text-firmGold hover:border-firmGold transition-colors"
                    >
                      Book Another Slot
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    {/* Step 1: Select Practice */}
                    <div>
                      <label className="text-[10px] font-semibold tracking-widest text-firmMuted uppercase block mb-2">Practice Matter</label>
                      <select 
                        required
                        value={bookingForm.practice}
                        onChange={(e) => setBookingForm({...bookingForm, practice: e.target.value})}
                        className="w-full bg-[#0A0A0F] border border-firmBorder px-4 py-3 text-xs md:text-sm text-firmText focus:border-firmGold focus:outline-none"
                      >
                        {practiceAreas.map((area, i) => (
                          <option key={i} value={area.title}>{area.title}</option>
                        ))}
                      </select>
                    </div>

                    {/* Step 2: Date & Time Picker */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-semibold tracking-widest text-firmMuted uppercase block mb-2">Preferred Date</label>
                        <div className="relative">
                          <input 
                            type="date"
                            required
                            value={bookingForm.date}
                            onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                            className="w-full bg-[#0A0A0F] border border-firmBorder px-4 py-3 text-xs md:text-sm text-firmText focus:border-firmGold focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-semibold tracking-widest text-firmMuted uppercase block mb-2">Time Slot</label>
                        <select 
                          required
                          value={bookingForm.time}
                          onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                          className="w-full bg-[#0A0A0F] border border-firmBorder px-4 py-3 text-xs md:text-sm text-firmText focus:border-firmGold focus:outline-none"
                        >
                          <option value="09:00 AM">09:00 AM - Eastern</option>
                          <option value="10:00 AM">10:00 AM - Eastern</option>
                          <option value="01:30 PM">01:30 PM - Eastern</option>
                          <option value="03:00 PM">03:00 PM - Eastern</option>
                        </select>
                      </div>
                    </div>

                    {/* Step 3: Contact Details */}
                    <div className="space-y-4">
                      <div>
                        <input 
                          type="text"
                          required
                          placeholder="Your Legal/Firm Name"
                          value={bookingForm.name}
                          onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                          className="w-full bg-[#0A0A0F] border border-firmBorder px-4 py-3 text-xs md:text-sm text-firmText focus:border-firmGold focus:outline-none placeholder-firmMuted/40"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input 
                          type="email"
                          required
                          placeholder="Confidential Email"
                          value={bookingForm.email}
                          onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                          className="w-full bg-[#0A0A0F] border border-firmBorder px-4 py-3 text-xs md:text-sm text-firmText focus:border-firmGold focus:outline-none placeholder-firmMuted/40"
                        />
                        <input 
                          type="tel"
                          required
                          placeholder="Secure Phone"
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                          className="w-full bg-[#0A0A0F] border border-firmBorder px-4 py-3 text-xs md:text-sm text-firmText focus:border-firmGold focus:outline-none placeholder-firmMuted/40"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit"
                      disabled={bookingStatus === 'booking'}
                      className="w-full bg-firmGold text-[#0A0A0F] py-4 text-xs font-semibold tracking-widest uppercase hover:bg-firmGold/90 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      {bookingStatus === 'booking' ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin" />
                          <span>Securing Schedule...</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4" />
                          <span>Confirm Consult Reservation</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-firmBorder bg-firmSurface/20 py-16 md:py-24 relative z-10">
        <div className="editorial-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start text-left">
            {/* Brand column */}
            <div className="md:col-span-5">
              <div className="mb-6">
                <img 
                  src="/logo.png" 
                  alt="Mercer Law Logo" 
                  className="h-12 object-contain"
                />
              </div>
              <p className="text-xs text-firmMuted font-light leading-relaxed max-w-sm mb-6">
                Institutional attorneys trusted with high-stakes litigation, private wealth architecture, and transactional strategy across the United States.
              </p>
              <div className="text-[10px] text-firmMuted/60 tracking-wider">
                &copy; {new Date().getFullYear()} Mercer &amp; Associates LLC. All rights reserved.
              </div>
            </div>

            {/* Links column */}
            <div className="md:col-span-4 grid grid-cols-2 gap-8">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-firmGold uppercase block mb-4">Firm</span>
                <ul className="space-y-3 text-xs text-firmMuted font-light">
                  <li><a href="#attorney" className="hover:text-firmText transition-colors">Our Founding Partner</a></li>
                  <li><a href="#process" className="hover:text-firmText transition-colors">Work Methodology</a></li>
                  <li><a href="#results" className="hover:text-firmText transition-colors">Historical Records</a></li>
                  <li><a href="#insights" className="hover:text-firmText transition-colors">Publications</a></li>
                </ul>
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-firmGold uppercase block mb-4">Legals</span>
                <ul className="space-y-3 text-xs text-firmMuted font-light">
                  <li><a href="#" className="hover:text-firmText transition-colors">Confidentiality Protocol</a></li>
                  <li><a href="#" className="hover:text-firmText transition-colors">Disclaimer</a></li>
                  <li><a href="#" className="hover:text-firmText transition-colors">Privacy Charter</a></li>
                  <li><a href="#" className="hover:text-firmText transition-colors">Terms of Representation</a></li>
                </ul>
              </div>
            </div>

            {/* Professional Notice column */}
            <div className="md:col-span-3 text-xs text-firmMuted/60 font-light border-l border-firmBorder/30 pl-6 space-y-4">
              <span className="text-[10px] font-semibold tracking-widest text-firmGold uppercase block">Legal Advertisement</span>
              <p className="leading-relaxed text-[11px]">
                The materials on this website are for informational purposes only and do not constitute legal advice. Prior results do not guarantee a similar outcome.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Case Details Drawer Component */}
      <AnimatePresence>
        {selectedCase && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCase(null)}
              className="fixed inset-0 bg-[#0A0A0F] z-50 pointer-events-auto"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-[600px] bg-firmSurface border-l border-firmBorder z-[60] p-8 md:p-12 overflow-y-auto"
            >
              {/* Close Button */}
              <div className="flex justify-between items-center mb-10">
                <span className="text-[10px] font-semibold tracking-widest text-firmGold uppercase">
                  Case Record Details
                </span>
                <button 
                  onClick={() => setSelectedCase(null)}
                  className="w-8 h-8 border border-firmBorder flex items-center justify-center text-firmMuted hover:text-firmGold hover:border-firmGold transition-all duration-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Main Info */}
              <div className="text-left space-y-8">
                <div>
                  <span className="text-xs font-semibold text-firmGold uppercase tracking-widest block mb-2">
                    {selectedCase.type}
                  </span>
                  <h3 className="font-heading text-4xl md:text-5xl text-firmText font-light tracking-tight mb-4">
                    {selectedCase.amount}
                  </h3>
                  <p className="text-base text-firmText font-medium">
                    {selectedCase.label}
                  </p>
                </div>

                <hr className="border-t border-firmBorder/30" />

                {/* Case Sections */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] font-bold tracking-widest text-firmGold uppercase mb-2">The Challenge</h4>
                    <p className="text-xs md:text-sm text-firmMuted font-light leading-relaxed">
                      {selectedCase.challenge}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold tracking-widest text-firmGold uppercase mb-2">Legal Strategy</h4>
                    <p className="text-xs md:text-sm text-firmMuted font-light leading-relaxed">
                      {selectedCase.strategy}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold tracking-widest text-firmGold uppercase mb-2">Case Outcome</h4>
                    <p className="text-xs md:text-sm text-firmMuted font-light leading-relaxed">
                      {selectedCase.outcome}
                    </p>
                  </div>
                </div>

                {/* Action button */}
                <div className="pt-8 border-t border-firmBorder/30">
                  <a 
                    href="#contact" 
                    onClick={() => setSelectedCase(null)}
                    className="w-full inline-flex items-center justify-center px-6 py-4 border border-firmGold text-firmGold text-xs font-semibold tracking-widest uppercase hover:bg-firmGold hover:text-[#0A0A0F] transition-all duration-300"
                  >
                    Discuss a Similar Matter
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
