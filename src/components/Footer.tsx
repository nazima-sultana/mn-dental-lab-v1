import React from 'react';
import { Phone, MapPin, ShieldCheck, Lock, Settings } from 'lucide-react';
import { DentalLogo } from './DentalLogo';
import { BusinessInfo } from '../types';

interface FooterProps {
  business: BusinessInfo;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Footer: React.FC<FooterProps> = ({ business, onOpenAdmin, isAdminLoggedIn }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Credential column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <DentalLogo size={42} lightMode={true} />
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">
                  {business.name}
                </h3>
                <p className="text-xs font-semibold text-sky-400">
                  {business.tagline}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Medical-grade dental laboratory based in Hyderabad, specializing in CAD/CAM zirconia, custom implant prostheses, DMLS laser sintered copings, and esthetic anterior smile design.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
              <div className="text-slate-200 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Senior Dental Technician: {business.technicianName}
              </div>
              <div className="text-slate-400 font-mono">
                {business.registrationNo}
              </div>
            </div>
          </div>

          {/* Quick links & Specialties */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Specialized Laboratory Disciplines
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>Implant Prostheses & Custom Abutments</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>Multilayer Zirconia & DMLS Laser Copings</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>PFM, N.C & Precision Cast Work</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>Balanced Complete & Flexible Dentures</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>Esthetic Crowns, Bridges & Veneers</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-sm">
              <a
                href={`tel:${business.phone}`}
                className="flex items-center gap-2 text-sky-400 hover:text-sky-300 font-semibold"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>{business.phone}</span>
              </a>
              <div className="flex items-start gap-2 text-slate-400 text-xs">
                <MapPin className="w-4 h-4 shrink-0 text-slate-500 mt-0.5" />
                <span>{business.address}</span>
              </div>
              <div className="text-xs text-slate-500 pt-1">
                {business.workingHours}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar with Admin portal trigger */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {business.name}. All rights reserved. Registered Dental Laboratory (DCI).
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-600">
              Hyderabad, Telangana, India
            </span>

            {/* Owner / Admin trigger button */}
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-sky-400 transition-colors px-2 py-1 rounded bg-slate-900/60 hover:bg-slate-900 border border-slate-800"
              title="Open Owner Edit Panel (/admin)"
              id="footer-admin-btn"
            >
              {isAdminLoggedIn ? (
                <>
                  <Settings className="w-3.5 h-3.5 text-sky-400" />
                  <span className="text-sky-400 font-medium">Owner Panel (Active)</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Owner Login</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
