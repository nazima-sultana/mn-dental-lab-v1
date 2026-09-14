import React from 'react';
import { Phone, MessageCircle, ArrowDown, Award, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import { HeroConfig, BusinessInfo } from '../types';
import { DentalLogo } from './DentalLogo';

interface HeroProps {
  hero: HeroConfig;
  business: BusinessInfo;
}

export const Hero: React.FC<HeroProps> = ({ hero, business }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-32 pb-20 flex items-center bg-slate-950 overflow-hidden text-white"
    >
      {/* Background Image with Layered Medical Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.bgImageUrl}
          alt="Dental Laboratory Craftsmanship"
          className="w-full h-full object-cover object-center opacity-30 scale-105 filter brightness-75 transition-all duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Deep clinical blue gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-blue-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-600/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Action CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Government Registration & Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 backdrop-blur-md text-xs font-semibold text-sky-300">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>{hero.badge}</span>
            </div>

            {/* Business Logo & Main Headline */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <DentalLogo size={46} lightMode={true} />
                <div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                    {business.name}
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-sky-400 tracking-wider">
                    Mohd. Ahmed Uddin • {business.registrationNo}
                  </p>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {hero.headline}
              </h1>

              <div className="inline-block py-1 px-3 rounded-lg bg-sky-500/20 border border-sky-400/30">
                <p className="text-base sm:text-lg font-bold text-cyan-200 tracking-wide">
                  "{business.tagline}"
                </p>
              </div>
            </div>

            {/* Subheadline description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {hero.subheadline}
            </p>

            {/* Specialty Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full pt-2">
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Implant Prostheses & Custom Abutments</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Multilayer Zirconia & DMLS Laser Copings</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Esthetic Anterior Crowns & Smile Design</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Balanced Complete & Flexible Dentures</span>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 w-full sm:w-auto">
              {/* Primary Call Button */}
              <a
                href={`tel:${business.phone}`}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-bold text-base shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-sky-400 w-full sm:w-auto"
                id="hero-call-cta"
              >
                <Phone className="w-5 h-5 text-white animate-bounce" />
                <span>{hero.primaryCtaText} ({business.phone})</span>
              </a>

              {/* WhatsApp Consultation */}
              <a
                href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
                  `Hello Mohd. Ahmed Uddin, I am contacting you regarding dental laboratory case work from M.N Dental Laboratory.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-base backdrop-blur-md border border-emerald-400/30 shadow-lg shadow-emerald-950/40 transition-all transform hover:-translate-y-0.5 focus:outline-none w-full sm:w-auto"
                id="hero-whatsapp-cta"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>{hero.secondaryCtaText}</span>
              </a>
            </div>

            {/* Location & Turnaround Indicator */}
            <p className="text-xs text-slate-400 flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Serving Dental Clinics in {business.area}, Hyderabad & Surrounding Regions
            </p>
          </div>

          {/* Right Column: Key Statistics & Quality Card */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-2xl bg-gradient-to-b from-white/10 to-white/5 p-6 sm:p-8 backdrop-blur-xl border border-white/15 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-sky-300 text-sm font-semibold">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <span>Certified Laboratory Standards</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-200 border border-blue-400/30">
                  DCI DM305
                </span>
              </div>

              {/* Stat counters */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10">
                  <div className="text-3xl font-extrabold text-sky-400">
                    {business.experienceYears}
                  </div>
                  <div className="text-xs text-slate-300 font-medium mt-1">
                    Master Technician Experience
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10">
                  <div className="text-3xl font-extrabold text-cyan-300">
                    {business.casesCompleted}
                  </div>
                  <div className="text-xs text-slate-300 font-medium mt-1">
                    Prosthetic Restorations Fabricated
                  </div>
                </div>
              </div>

              {/* Lab feature points */}
              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3 text-sm text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-blue-600/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                  </div>
                  <div>
                    <span className="font-semibold text-white">Shade & Texture Precision:</span> True-to-life VITA 3D Master color graduation and natural translucency.
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-blue-600/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                  </div>
                  <div>
                    <span className="font-semibold text-white">Microscopic Marginal Fit:</span> Zero micro-gap margin verification before delivery.
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-blue-600/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                  </div>
                  <div>
                    <span className="font-semibold text-white">Express Turnaround:</span> Prompt pickup and delivery for dental clinics across Hyderabad.
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => scrollToSection('services')}
                  className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Explore Prosthetic Services</span>
                  <ArrowDown className="w-4 h-4 text-sky-300" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
