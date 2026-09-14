import React from 'react';
import { Layers, ShieldCheck, Clock, Check, Sparkles, MessageSquare, ArrowUpRight } from 'lucide-react';
import { ServiceItem, BusinessInfo } from '../types';

interface ServicesProps {
  services: ServiceItem[];
  business: BusinessInfo;
}

export const Services: React.FC<ServicesProps> = ({ services, business }) => {
  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-900 text-xs font-semibold tracking-wide uppercase">
            <Layers className="w-3.5 h-3.5 text-sky-700" />
            <span>Prosthetic Disciplines & Specialties</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Specialized Dental Laboratory Solutions
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From precision CAD/CAM titanium implant abutments to lifelike multi-unit anterior zirconia crowns and anatomical dentures, fabricated to the highest clinical tolerances.
          </p>
        </div>

        {/* Services Grid (4 Key Specialties) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <div
              key={service.id || index}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Container with high-res dental visuals */}
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-blue-900 shadow-sm">
                    {service.category}
                  </span>
                </div>

                {/* Turnaround badge */}
                {service.turnaround && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/80 backdrop-blur-md text-sky-300 border border-white/20">
                      <Clock className="w-3 h-3 text-cyan-300" />
                      {service.turnaround}
                    </span>
                  </div>
                )}

                {/* Title overlay on bottom of image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-md">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Service Details Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Materials list */}
                  <div className="mb-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      Materials & Technology
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {service.materials.map((mat, mIdx) => (
                        <span
                          key={mIdx}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features Checklist */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Clinical & Engineering Highlights
                    </h4>
                    <div className="space-y-1.5">
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <a
                    href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
                      `Hello Mohd. Ahmed Uddin, I would like to discuss a case for ${service.title}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-lg transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Send Case via WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${business.phone}`}
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-800 transition-colors"
                  >
                    <span>Call Technician</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Prescription Callout */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Need a Custom Shade Match or Complex Implant Restorative Plan?
            </h3>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Dental surgeons across Hyderabad are welcome to consult directly with Mohd. Ahmed Uddin for subgingival margin design, multi-unit angulation, or chairside shade verification.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3 w-full md:w-auto">
            <a
              href={`tel:${business.phone}`}
              className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-white text-blue-900 font-bold text-sm hover:bg-blue-50 transition-colors text-center shadow-md"
            >
              Direct Call: {business.phone}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
