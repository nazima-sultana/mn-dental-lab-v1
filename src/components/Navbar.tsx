import React, { useState, useEffect } from 'react';
import { Phone, MapPin, ShieldCheck, Menu, X, Settings, ArrowRight } from 'lucide-react';
import { DentalLogo } from './DentalLogo';
import { BusinessInfo } from '../types';

interface NavbarProps {
  business: BusinessInfo;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ business, onOpenAdmin, isAdminLoggedIn }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3' : 'bg-white/80 backdrop-blur-sm py-4'
    }`}>
      {/* Top micro bar for credentials */}
      <div className="hidden md:block bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-blue-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              {business.registrationNo}
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              {business.area}, {business.city}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-300">Dental Technician: <strong className="text-white font-semibold">{business.technicianName}</strong></span>
            {isAdminLoggedIn && (
              <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase border border-emerald-500/30">
                Owner Mode Active
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="flex items-center gap-3 group focus:outline-none"
            id="nav-brand-link"
          >
            <DentalLogo size={42} />
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                {business.name}
              </span>
              <span className="text-xs font-semibold text-blue-600 tracking-wide">
                {business.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors"
              id="nav-link-about"
            >
              About Lab
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors"
              id="nav-link-services"
            >
              Specialties & Services
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors"
              id="nav-link-gallery"
            >
              Case Gallery
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors"
              id="nav-link-contact"
            >
              Clinic Contact & Map
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            {/* Click-to-Call direct button */}
            <a
              href={`tel:${business.phone}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold shadow-sm shadow-blue-500/20 transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              id="nav-call-btn"
            >
              <Phone className="w-4 h-4 text-cyan-300 animate-pulse" />
              <span className="hidden sm:inline">Call: {business.phone}</span>
              <span className="sm:hidden">Call</span>
            </a>

            {/* Admin Settings Button */}
            <button
              onClick={onOpenAdmin}
              title="Owner / Admin Content Editor"
              className={`p-2 rounded-xl border transition-colors ${
                isAdminLoggedIn
                  ? 'bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
              id="nav-admin-btn"
            >
              <Settings className={`w-4 h-4 ${isAdminLoggedIn ? 'animate-spin-slow text-blue-600' : ''}`} />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
              id="mobile-menu-toggle"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2 pb-3 bg-white/95 rounded-2xl p-4 shadow-xl">
            <button
              onClick={() => scrollToSection('about')}
              className="text-left px-3 py-2 text-sm font-medium text-slate-800 hover:bg-blue-50 rounded-lg"
            >
              About Mohd. Ahmed Uddin & Lab
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-left px-3 py-2 text-sm font-medium text-slate-800 hover:bg-blue-50 rounded-lg"
            >
              Prosthetic Specialties
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-left px-3 py-2 text-sm font-medium text-slate-800 hover:bg-blue-50 rounded-lg"
            >
              Work Gallery & Cases
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left px-3 py-2 text-sm font-medium text-slate-800 hover:bg-blue-50 rounded-lg"
            >
              Address & Google Maps
            </button>

            <div className="pt-2 mt-2 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={`tel:${business.phone}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-blue-700 text-white rounded-xl font-bold text-sm"
              >
                <Phone className="w-4 h-4" />
                Call {business.phone}
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl font-medium text-sm"
              >
                <Settings className="w-4 h-4" />
                Owner Edit Panel (/admin)
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
