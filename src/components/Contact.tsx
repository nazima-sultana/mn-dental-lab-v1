import React, { useState } from 'react';
import { Phone, MapPin, Mail, Clock, MessageSquare, Send, CheckCircle2, ShieldCheck, Building } from 'lucide-react';
import { BusinessInfo } from '../types';

interface ContactProps {
  business: BusinessInfo;
}

export const Contact: React.FC<ContactProps> = ({ business }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    clinicName: '',
    doctorName: '',
    phone: '',
    workType: 'Zirconia & Esthetic Crowns',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate direct WhatsApp link or phone intent with the entered case inquiry
    const textMessage = `*Case Inquiry for M.N Dental Lab*\n*Clinic / Doctor:* ${formData.doctorName} (${formData.clinicName})\n*Phone:* ${formData.phone}\n*Restoration:* ${formData.workType}\n*Notes:* ${formData.message || 'Please arrange sample / pickup'}`;
    const whatsappUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(textMessage)}`;
    
    setFormSubmitted(true);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold tracking-wide uppercase">
            <Phone className="w-3.5 h-3.5 text-blue-600" />
            <span>Connect with Dental Laboratory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Clinic Pickup, Turnaround & Lab Contact
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Direct communication with Senior Technician Mohd. Ahmed Uddin for impression pickup, digital scan transfer, or case consultation in Hyderabad.
          </p>
        </div>

        {/* Two-Column Grid: Contact Cards & Form + Maps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact & Location Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Phone Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-200">
                  Direct Line to Master Technician
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-600/60 text-[11px] font-semibold text-white border border-white/20">
                  Fast Response
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {business.phone}
                </h3>
                <p className="text-sm text-blue-100 mt-1">
                  Mohd. Ahmed Uddin ({business.registrationNo})
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={`tel:${business.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-blue-900 font-bold text-sm hover:bg-blue-50 transition-colors shadow-sm"
                  id="contact-call-direct"
                >
                  <Phone className="w-4 h-4 text-blue-700" />
                  <span>Call Now</span>
                </a>

                <a
                  href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
                    `Hello Mohd. Ahmed Uddin, I am contacting you from a dental clinic in Hyderabad regarding lab work.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-400 transition-colors shadow-sm"
                  id="contact-whatsapp-direct"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Address & Facility Location */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Laboratory Address
                  </h4>
                  <p className="text-sm text-slate-700 font-medium mt-1">
                    {business.name}
                  </p>
                  <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">
                    {business.address}
                  </p>
                  <p className="text-xs text-blue-700 font-semibold mt-1">
                    Landmark: {business.area}, Hyderabad
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-200">
                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Operating Timings
                  </h4>
                  <p className="text-sm text-slate-600 mt-1">
                    {business.workingHours}
                  </p>
                  <p className="text-xs text-emerald-700 font-semibold mt-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {business.emergencySupport}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-200">
                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 shrink-0 mt-0.5">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Official Registration
                  </h4>
                  <p className="text-sm text-slate-700 mt-1">
                    {business.qualification}
                  </p>
                  <p className="text-xs font-mono text-slate-500 mt-0.5">
                    {business.registrationNo}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Embed & Quick Case Inquiry Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Google Maps Embed Frame */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
              <div className="p-3 bg-slate-900 text-white flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-slate-200">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  M.N Dental Lab Location: Asif Nagar / Karwan / Tappa Chabutra, Hyderabad
                </span>
                <a
                  href="https://maps.google.com/?q=Tappa+Chabutra,+Karwan,+Hyderabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-white underline text-[11px]"
                >
                  Open in Google Maps
                </a>
              </div>
              
              <div className="w-full h-72 sm:h-80 relative">
                <iframe
                  title="M.N Dental Laboratory Hyderabad Location Map"
                  src={business.mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter saturate-125"
                />
              </div>
            </div>

            {/* Clinic Case Inquiry / Impression Pickup Form */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Request Clinic Pickup or Price Estimation
                  </h3>
                  <p className="text-xs text-slate-500">
                    Dentists and prosthodontists can submit requirements directly to Mohd. Ahmed Uddin.
                  </p>
                </div>
                <ShieldCheck className="w-6 h-6 text-blue-600 hidden sm:block" />
              </div>

              {formSubmitted ? (
                <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-900">
                    Inquiry Transmitted to Mohd. Ahmed Uddin!
                  </h4>
                  <p className="text-xs text-emerald-700">
                    WhatsApp has opened with your case details. We will confirm turnaround time shortly.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-2 text-xs font-semibold text-emerald-800 underline"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Doctor / Clinic Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. Rao / Smile Dental"
                        value={formData.doctorName}
                        onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Clinic Location / Area
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Banjara Hills / Mehdipatnam"
                        value={formData.clinicName}
                        onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Type of Restoration
                      </label>
                      <select
                        value={formData.workType}
                        onChange={(e) => setFormData({ ...formData, workType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="Multilayer Zirconia Crowns & Bridges">Multilayer Zirconia Crowns & Bridges</option>
                        <option value="Implant Prostheses & Custom Abutment">Implant Prostheses & Custom Abutment</option>
                        <option value="DMLS Laser Sintered Copings / PFM">DMLS Laser Sintered Copings / PFM</option>
                        <option value="Complete Denture / Flexible Partial">Complete Denture / Flexible Partial</option>
                        <option value="E.max Aesthetic Veneers & Inlays">E.max Aesthetic Veneers & Inlays</option>
                        <option value="Full Arch Edentulous Rehabilitation">Full Arch Edentulous Rehabilitation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Case Notes / Turnaround Urgency
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Tooth numbers, shade preference, or express pickup request..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Case Inquiry to WhatsApp (7981635546)</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
