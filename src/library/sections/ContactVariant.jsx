import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { TOKENS } from '../tokens';
import { InteractiveCard3D, FocusBorderInput, SweepButton } from '../shared';

export default function ContactVariant() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const inputClass = "w-full bg-[#0A0A0F] border px-4 py-3 text-xs md:text-sm text-[#F0EDE6] placeholder-firmMuted/40";

  return (
    <section 
      className="py-24 px-6 md:px-12 select-none"
      style={{ backgroundColor: TOKENS.bg, fontFamily: TOKENS.fontSans }}
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Context & 4 Info Cards */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div>
              <span 
                className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase block mb-3"
                style={{ color: TOKENS.accent }}
              >
                Inquiries
              </span>
              <h2 
                className="text-3xl md:text-5xl font-light leading-tight mb-6"
                style={{ color: TOKENS.text, fontFamily: TOKENS.fontSerif }}
              >
                Connect With Our Team.
              </h2>
              <p className="text-sm text-firmMuted font-light leading-relaxed max-w-md mb-8">
                Consultations are conducted in absolute confidentiality. Direct your inquiries through our secure channels or request scheduling.
              </p>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1: Telephone */}
              <InteractiveCard3D className="group min-h-[140px] hover:border-firmGold/50">
                <div className="flex flex-col justify-between h-full">
                  <Phone className="w-4 h-4 mb-4 transition-colors group-hover:text-firmGold" style={{ color: TOKENS.accent }} />
                  <div>
                    <span className="text-[9px] font-bold tracking-widest uppercase block text-firmMuted mb-1">Telephone</span>
                    <a href="tel:5551234567" className="text-xs font-semibold text-firmText hover:text-firmGold transition-colors">(555) 123-4567</a>
                  </div>
                </div>
              </InteractiveCard3D>

              {/* Card 2: Email */}
              <InteractiveCard3D className="group min-h-[140px] hover:border-firmGold/50">
                <div className="flex flex-col justify-between h-full">
                  <Mail className="w-4 h-4 mb-4 transition-colors group-hover:text-firmGold" style={{ color: TOKENS.accent }} />
                  <div>
                    <span className="text-[9px] font-bold tracking-widest uppercase block text-firmMuted mb-1">Confidential Email</span>
                    <a href="mailto:office@mercer.com" className="text-xs font-semibold text-firmText hover:text-firmGold transition-colors">office@mercer.com</a>
                  </div>
                </div>
              </InteractiveCard3D>

              {/* Card 3: Location */}
              <InteractiveCard3D className="group min-h-[140px] hover:border-firmGold/50">
                <div className="flex flex-col justify-between h-full">
                  <MapPin className="w-4 h-4 mb-4 transition-colors group-hover:text-firmGold" style={{ color: TOKENS.accent }} />
                  <div>
                    <span className="text-[9px] font-bold tracking-widest uppercase block text-firmMuted mb-1">Office Location</span>
                    <span className="text-xs font-semibold text-firmText">600 Montgomery St, SF</span>
                  </div>
                </div>
              </InteractiveCard3D>

              {/* Card 4: Hours */}
              <InteractiveCard3D className="group min-h-[140px] hover:border-firmGold/50">
                <div className="flex flex-col justify-between h-full">
                  <Clock className="w-4 h-4 mb-4 transition-colors group-hover:text-firmGold" style={{ color: TOKENS.accent }} />
                  <div>
                    <span className="text-[9px] font-bold tracking-widest uppercase block text-firmMuted mb-1">Working Hours</span>
                    <span className="text-xs font-semibold text-firmText">Mon — Fri: 8 AM — 6 PM</span>
                  </div>
                </div>
              </InteractiveCard3D>

            </div>
          </div>

          {/* Right Column: Reservation Form */}
          <div className="lg:col-span-7 bg-firmSurface border p-8 md:p-10 text-left" style={{ backgroundColor: TOKENS.surface, borderColor: TOKENS.border }}>
            <span 
              className="text-[10px] font-semibold tracking-[0.25em] uppercase block mb-8"
              style={{ color: TOKENS.accent }}
            >
              Consultation Scheduler
            </span>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <FocusBorderInput 
                type="text"
                required
                placeholder="Your Name"
                value={formState.name}
                onChange={(e) => setFormState({...formState, name: e.target.value})}
                className={inputClass}
              />

              <FocusBorderInput 
                type="email"
                required
                placeholder="Confidential Email"
                value={formState.email}
                onChange={(e) => setFormState({...formState, email: e.target.value})}
                className={inputClass}
              />

              <FocusBorderInput 
                type="text"
                required
                placeholder="Describe your matter..."
                value={formState.message}
                onChange={(e) => setFormState({...formState, message: e.target.value})}
                className={inputClass}
              />

              <SweepButton 
                type="submit"
                className="w-full py-4 text-xs tracking-[0.25em] bg-firmGold/5"
              >
                Send Request
              </SweepButton>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
