import React from 'react';
import { Award, CheckCircle2, ShieldCheck, Microscope, Sparkles, UserCheck } from 'lucide-react';
import { AboutConfig, BusinessInfo } from '../types';

interface AboutProps {
  about: AboutConfig;
  business: BusinessInfo;
}

export const About: React.FC<AboutProps> = ({ about, business }) => {
  return (
    <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold tracking-wide uppercase">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>{about.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {about.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {about.subtitle}
          </p>
        </div>

        {/* Two-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Professional Dental Lab / Technician Working Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/3] bg-slate-100 group">
              <img
                src={about.imageUrl}
                alt="Mohd. Ahmed Uddin Dental Technician at Work in M.N Dental Laboratory"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              {/* Overlay card for technician verification */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg text-slate-900">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {business.technicianName}
                    </h4>
                    <p className="text-xs font-semibold text-blue-700">
                      Dental Technician • {business.registrationNo}
                    </p>
                  </div>
                  <div className="hidden sm:block text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5" /> DCI Certified
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro floating feature card */}
            <div className="hidden sm:flex absolute -bottom-6 -right-6 bg-blue-700 text-white p-5 rounded-2xl shadow-xl border-4 border-white items-center gap-4 max-w-xs">
              <Microscope className="w-8 h-8 text-cyan-300 shrink-0" />
              <div>
                <div className="text-xs font-medium text-blue-100 uppercase tracking-wider">
                  Quality Assurance
                </div>
                <div className="text-sm font-bold text-white">
                  100% Microscopic Margin & Contact Inspection
                </div>
              </div>
            </div>
          </div>

          {/* Right: Detailed Expertise, Philosophy & Standards */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <div className="space-y-4 text-slate-700 text-base leading-relaxed">
              {about.paragraphs.map((paragraph, idx) => (
                <p key={idx} className="text-slate-600">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Key highlights checklist */}
            <div className="pt-2">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                Laboratory Highlights & Standards
              </h3>
              <div className="space-y-2.5">
                {about.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick credentials callout */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-blue-900 block">
                  Hyderabad Clinic Turnaround
                </span>
                <span className="text-xs text-slate-600">
                  Daily pickup & express delivery in Asif Nagar, Karwan, Tappa Chabutra, and all Hyderabad localities.
                </span>
              </div>
              <a
                href={`tel:${business.phone}`}
                className="shrink-0 ml-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-colors"
              >
                Inquire Now
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
