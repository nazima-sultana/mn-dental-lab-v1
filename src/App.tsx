/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { useLabData } from './useLabData';
import { Phone, MessageCircle, Settings, CheckCircle2 } from 'lucide-react';

export default function App() {
  const {
    data,
    saveLabData,
    resetToDefaults,
    exportDataJson,
    importDataJson,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    isSavedNotice,
    processImageUpload
  } = useLabData();

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Check URL path or hash on mount and when hash changes
  useEffect(() => {
    const checkAdminRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash.includes('admin') || path.endsWith('/admin')) {
        setIsAdminOpen(true);
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);

    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
    };
  }, []);

  const handleOpenAdmin = () => {
    setIsAdminOpen(true);
    window.location.hash = '/admin';
  };

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash.includes('admin')) {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-sky-200 selection:text-sky-900 font-sans">
      
      {/* Save Toast when changes are written */}
      {isSavedNotice && (
        <div className="fixed bottom-20 right-6 z-50 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-bold animate-in fade-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span>Laboratory edits saved & persisted successfully!</span>
        </div>
      )}

      {/* Main Website View */}
      <Navbar
        business={data.business}
        onOpenAdmin={handleOpenAdmin}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      <main>
        <Hero
          hero={data.hero}
          business={data.business}
        />

        <About
          about={data.about}
          business={data.business}
        />

        <Services
          services={data.services}
          business={data.business}
        />

        <Gallery
          gallery={data.gallery}
          business={data.business}
        />

        <Contact
          business={data.business}
        />
      </main>

      <Footer
        business={data.business}
        onOpenAdmin={handleOpenAdmin}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Floating Fast Action Mobile Contact Bar */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40 flex items-center gap-2">
        <a
          href={`tel:${data.business.phone}`}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-900/30"
          id="mobile-float-call"
        >
          <Phone className="w-4 h-4" />
          <span>Call ({data.business.phone})</span>
        </a>

        <a
          href={`https://wa.me/${data.business.whatsapp}?text=${encodeURIComponent(
            `Hello Mohd. Ahmed Uddin, I am contacting you regarding dental lab work at M.N Dental Laboratory.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-3 rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-900/30"
          title="WhatsApp Chat"
          id="mobile-float-whatsapp"
        >
          <MessageCircle className="w-5 h-5" />
        </a>

        <button
          onClick={handleOpenAdmin}
          className="p-3 rounded-xl bg-slate-900 text-slate-300 hover:text-white shadow-lg"
          title="Owner Admin (/admin)"
          id="mobile-float-admin"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Owner / Admin Content Management Panel */}
      {isAdminOpen && (
        <AdminPanel
          data={data}
          onSave={saveLabData}
          onReset={resetToDefaults}
          onExport={exportDataJson}
          onImport={importDataJson}
          onClose={handleCloseAdmin}
          isLoggedIn={isAdminLoggedIn}
          onLogin={loginAdmin}
          onLogout={logoutAdmin}
          isSavedNotice={isSavedNotice}
          processImageUpload={processImageUpload}
        />
      )}
    </div>
  );
}
