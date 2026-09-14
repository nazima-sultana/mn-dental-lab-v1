import React, { useState } from 'react';
import { 
  Lock, KeyRound, Save, RefreshCw, Download, Upload, Plus, Trash2, 
  Image as ImageIcon, ArrowLeft, CheckCircle2, AlertCircle, Eye, 
  Layers, Info, Phone, ShieldCheck, Sparkles, Building, FileText
} from 'lucide-react';
import { LabWebsiteData, ServiceItem, GalleryItem } from '../types';

interface AdminPanelProps {
  data: LabWebsiteData;
  onSave: (newData: LabWebsiteData) => void;
  onReset: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
  onClose: () => void;
  isLoggedIn: boolean;
  onLogin: (password: string) => boolean;
  onLogout: () => void;
  isSavedNotice: boolean;
  processImageUpload: (file: File) => Promise<string>;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  data,
  onSave,
  onReset,
  onExport,
  onImport,
  onClose,
  isLoggedIn,
  onLogin,
  onLogout,
  isSavedNotice,
  processImageUpload
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'business' | 'hero' | 'about' | 'services' | 'gallery' | 'backup'>('business');
  
  // Local working copy of data being edited
  const [editableData, setEditableData] = useState<LabWebsiteData>(JSON.parse(JSON.stringify(data)));
  const [uploadingTarget, setUploadingTarget] = useState<string | null>(null);

  // Synchronize if prop data changes from outside (e.g. reset)
  React.useEffect(() => {
    setEditableData(JSON.parse(JSON.stringify(data)));
  }, [data]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(passwordInput);
    if (success) {
      setLoginError('');
      setPasswordInput('');
    } else {
      setLoginError('Incorrect password. Default password is: admin (or mndental)');
    }
  };

  const handleSaveAll = () => {
    onSave(editableData);
  };

  // Helper for image upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetCallback: (dataUrl: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingTarget('Processing image...');
      const dataUrl = await processImageUpload(file);
      targetCallback(dataUrl);
      setUploadingTarget(null);
    } catch (err: any) {
      alert(err.message || 'Error reading image file');
      setUploadingTarget(null);
    }
  };

  // Service helper functions
  const updateService = (index: number, field: keyof ServiceItem, value: any) => {
    const newServices = [...editableData.services];
    newServices[index] = { ...newServices[index], [field]: value };
    setEditableData({ ...editableData, services: newServices });
  };

  const addService = () => {
    const newService: ServiceItem = {
      id: `srv-${Date.now()}`,
      title: 'New Prosthetic Service',
      category: 'Crown & Bridge',
      description: 'Comprehensive dental prosthetic service fabricated to clinical tolerances.',
      materials: ['Medical-Grade Alloy / Ceramic'],
      features: ['High fracture resistance', 'Microscopic marginal fit'],
      imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      turnaround: '3-4 Working Days'
    };
    setEditableData({ ...editableData, services: [...editableData.services, newService] });
  };

  const deleteService = (index: number) => {
    if (confirm('Delete this service?')) {
      const newServices = editableData.services.filter((_, i) => i !== index);
      setEditableData({ ...editableData, services: newServices });
    }
  };

  // Gallery helper functions
  const updateGalleryItem = (index: number, field: keyof GalleryItem, value: any) => {
    const newGallery = [...editableData.gallery];
    newGallery[index] = { ...newGallery[index], [field]: value };
    setEditableData({ ...editableData, gallery: newGallery });
  };

  const addGalleryItem = () => {
    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: 'New Dental Restoration Case',
      category: 'Esthetic Crowns & Bridges',
      description: 'Case description and clinical details of restoration fabricated in laboratory.',
      imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
      tag: 'New Case'
    };
    setEditableData({ ...editableData, gallery: [...editableData.gallery, newItem] });
  };

  const deleteGalleryItem = (index: number) => {
    if (confirm('Delete this gallery item?')) {
      const newGallery = editableData.gallery.filter((_, i) => i !== index);
      setEditableData({ ...editableData, gallery: newGallery });
    }
  };

  // --- 1. LOGIN SCREEN (If not authenticated) ---
  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <Lock className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Owner Admin Login</h3>
                <p className="text-xs text-blue-200">M.N Dental Laboratory Management</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-xs text-blue-200 hover:text-white px-2 py-1 rounded bg-white/10"
            >
              Exit
            </button>
          </div>

          <form onSubmit={handleLoginSubmit} className="p-6 sm:p-8 space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Owner Access Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="Enter admin password..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 pl-10"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-blue-900">Laboratory Owner Quick Access:</p>
              <p>Default password: <code className="font-mono font-bold bg-blue-200 px-1 py-0.5 rounded text-blue-900">admin</code></p>
              <p className="text-[11px] text-slate-500">You can edit all text, phone, address, and upload new photos after logging in.</p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>Unlock Owner Panel</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="py-3 px-4 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- 2. FULL OWNER CONTENT EDIT PANEL ---
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex flex-col">
      
      {/* Top Admin Header Bar */}
      <header className="bg-slate-900 text-white px-4 sm:px-6 py-3 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="View Live Website"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>M.N Dental Laboratory</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-600 text-white uppercase tracking-wider">
                Owner Edit Panel
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Live Content & Photo Editor (No coding needed • Saves to Local Storage)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Saved Notification */}
          {isSavedNotice && (
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Saved to Browser!
            </span>
          )}

          {/* Save Button */}
          <button
            onClick={handleSaveAll}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>

          {/* View Website */}
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium transition-colors"
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline">Preview Live</span>
          </button>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="px-3 py-2 rounded-xl bg-rose-950/50 hover:bg-rose-900/60 border border-rose-800/40 text-rose-300 text-xs font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Layout: Tabs on left / top & Content form on right */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-100">
        
        {/* Navigation Tabs */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-3 sm:p-4 flex md:flex-col gap-1.5 overflow-x-auto shrink-0 shadow-sm">
          <button
            onClick={() => setActiveTab('business')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors text-left whitespace-nowrap ${
              activeTab === 'business' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Building className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Business & Contact</span>
          </button>

          <button
            onClick={() => setActiveTab('hero')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors text-left whitespace-nowrap ${
              activeTab === 'hero' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Hero & Banner</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors text-left whitespace-nowrap ${
              activeTab === 'about' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>About & Credentials</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors text-left whitespace-nowrap ${
              activeTab === 'services' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Services Grid ({editableData.services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors text-left whitespace-nowrap ${
              activeTab === 'gallery' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Work Gallery ({editableData.gallery.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors text-left whitespace-nowrap ${
              activeTab === 'backup' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Download className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Backup & Reset</span>
          </button>
        </aside>

        {/* Form Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-4xl mx-auto space-y-8 pb-16">
            
            {uploadingTarget && (
              <div className="p-3 bg-blue-600 text-white text-xs font-semibold rounded-xl flex items-center gap-2 animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{uploadingTarget}</span>
              </div>
            )}

            {/* TAB 1: BUSINESS & CONTACT DETAILS */}
            {activeTab === 'business' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Laboratory Business Details</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Update business name, master technician details, phone number, address, and Google Maps embed.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={editableData.business.name}
                      onChange={(e) => setEditableData({
                        ...editableData,
                        business: { ...editableData.business, name: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={editableData.business.tagline}
                      onChange={(e) => setEditableData({
                        ...editableData,
                        business: { ...editableData.business, tagline: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Technician Name
                    </label>
                    <input
                      type="text"
                      value={editableData.business.technicianName}
                      onChange={(e) => setEditableData({
                        ...editableData,
                        business: { ...editableData.business, technicianName: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Registration & Council Details
                    </label>
                    <input
                      type="text"
                      value={editableData.business.registrationNo}
                      onChange={(e) => setEditableData({
                        ...editableData,
                        business: { ...editableData.business, registrationNo: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Primary Contact Number (Click to call)
                    </label>
                    <input
                      type="text"
                      value={editableData.business.phone}
                      onChange={(e) => setEditableData({
                        ...editableData,
                        business: { ...editableData.business, phone: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      WhatsApp Number (With Country Code e.g. 917981635546)
                    </label>
                    <input
                      type="text"
                      value={editableData.business.whatsapp}
                      onChange={(e) => setEditableData({
                        ...editableData,
                        business: { ...editableData.business, whatsapp: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Complete Address
                    </label>
                    <input
                      type="text"
                      value={editableData.business.address}
                      onChange={(e) => setEditableData({
                        ...editableData,
                        business: { ...editableData.business, address: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Area / Locality
                    </label>
                    <input
                      type="text"
                      value={editableData.business.area}
                      onChange={(e) => setEditableData({
                        ...editableData,
                        business: { ...editableData.business, area: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Working Hours
                    </label>
                    <input
                      type="text"
                      value={editableData.business.workingHours}
                      onChange={(e) => setEditableData({
                        ...editableData,
                        business: { ...editableData.business, workingHours: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Google Maps Embed Iframe URL
                    </label>
                    <input
                      type="text"
                      value={editableData.business.mapsEmbedUrl}
                      onChange={(e) => setEditableData({
                        ...editableData,
                        business: { ...editableData.business, mapsEmbedUrl: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Paste the src URL from Google Maps &gt; Share &gt; Embed Map.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={handleSaveAll}
                    className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md transition-colors"
                  >
                    Save Business Details
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: HERO & BANNER */}
            {activeTab === 'hero' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Hero Section & Visual Banner</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Customize the main headline, description, button labels, and background photo.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Hero Badge Text
                    </label>
                    <input
                      type="text"
                      value={editableData.hero.badge}
                      onChange={(e) => setEditableData({
                        ...editableData,
                        hero: { ...editableData.hero, badge: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Main Headline
                    </label>
                    <input
                      type="text"
                      value={editableData.hero.headline}
                      onChange={(e) => setEditableData({
                        ...editableData,
                        hero: { ...editableData.hero, headline: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Subheadline Description
                    </label>
                    <textarea
                      rows={3}
                      value={editableData.hero.subheadline}
                      onChange={(e) => setEditableData({
                        ...editableData,
                        hero: { ...editableData.hero, subheadline: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Primary CTA Button Label
                      </label>
                      <input
                        type="text"
                        value={editableData.hero.primaryCtaText}
                        onChange={(e) => setEditableData({
                          ...editableData,
                          hero: { ...editableData.hero, primaryCtaText: e.target.value }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Secondary CTA Button Label
                      </label>
                      <input
                        type="text"
                        value={editableData.hero.secondaryCtaText}
                        onChange={(e) => setEditableData({
                          ...editableData,
                          hero: { ...editableData.hero, secondaryCtaText: e.target.value }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Hero Background Image Selector / Uploader */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                      Hero Dental Background Image
                    </label>

                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <div className="w-32 h-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shrink-0">
                        <img
                          src={editableData.hero.bgImageUrl}
                          alt="Hero Preview"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 w-full space-y-2">
                        <input
                          type="text"
                          placeholder="Paste image URL (Unsplash or direct image link)"
                          value={editableData.hero.bgImageUrl}
                          onChange={(e) => setEditableData({
                            ...editableData,
                            hero: { ...editableData.hero, bgImageUrl: e.target.value }
                          })}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="flex items-center gap-2">
                          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200 transition-colors">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Hero Photo from Device</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, (dataUrl) => {
                                setEditableData({
                                  ...editableData,
                                  hero: { ...editableData.hero, bgImageUrl: dataUrl }
                                });
                              })}
                            />
                          </label>
                          <span className="text-[11px] text-slate-400">
                            Auto-compressed for fast loading
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={handleSaveAll}
                    className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md transition-colors"
                  >
                    Save Hero Content
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: ABOUT & CREDENTIALS */}
            {activeTab === 'about' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">About Mohd. Ahmed Uddin & Laboratory</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Update technician bio, lab philosophy, and technician working image.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={editableData.about.title}
                      onChange={(e) => setEditableData({
                        ...editableData,
                        about: { ...editableData.about, title: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Section Subtitle / Lead Paragraph
                    </label>
                    <textarea
                      rows={2}
                      value={editableData.about.subtitle}
                      onChange={(e) => setEditableData({
                        ...editableData,
                        about: { ...editableData.about, subtitle: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Technician Image Uploader */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                      Dental Technician Working Photo
                    </label>

                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <img
                          src={editableData.about.imageUrl}
                          alt="Technician Preview"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 w-full space-y-2">
                        <input
                          type="text"
                          placeholder="Paste image URL..."
                          value={editableData.about.imageUrl}
                          onChange={(e) => setEditableData({
                            ...editableData,
                            about: { ...editableData.about, imageUrl: e.target.value }
                          })}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-blue-500"
                        />

                        <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200 transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Technician Photo from Computer</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, (dataUrl) => {
                              setEditableData({
                                ...editableData,
                                about: { ...editableData.about, imageUrl: dataUrl }
                              });
                            })}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Bio Paragraphs */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Detailed Bio & Laboratory Description
                    </label>
                    <textarea
                      rows={5}
                      value={editableData.about.paragraphs.join('\n\n')}
                      onChange={(e) => setEditableData({
                        ...editableData,
                        about: {
                          ...editableData.about,
                          paragraphs: e.target.value.split('\n\n').filter(Boolean)
                        }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 leading-relaxed"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Separate paragraphs with a blank double line.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={handleSaveAll}
                    className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md transition-colors"
                  >
                    Save About Info
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: SERVICES MANAGEMENT */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Dental Services & Specialties</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Edit service names, descriptions, materials, and change service images.
                    </p>
                  </div>
                  <button
                    onClick={addService}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Service</span>
                  </button>
                </div>

                {editableData.services.map((service, index) => (
                  <div
                    key={service.id || index}
                    className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                        Service #{index + 1}
                      </span>
                      <button
                        onClick={() => deleteService(index)}
                        className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove Service</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Service Title
                        </label>
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => updateService(index, 'title', e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Category Badge
                        </label>
                        <input
                          type="text"
                          value={service.category}
                          onChange={(e) => updateService(index, 'category', e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={service.description}
                          onChange={(e) => updateService(index, 'description', e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Turnaround Time
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 3-4 Working Days"
                          value={service.turnaround || ''}
                          onChange={(e) => updateService(index, 'turnaround', e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Materials (Comma-separated)
                        </label>
                        <input
                          type="text"
                          value={service.materials.join(', ')}
                          onChange={(e) => updateService(
                            index,
                            'materials',
                            e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                          )}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Image uploader / URL */}
                      <div className="sm:col-span-2 pt-2 border-t border-slate-100">
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                          Service Card Photo
                        </label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          <div className="w-24 h-16 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                            <img
                              src={service.imageUrl}
                              alt={service.title}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          <div className="flex-1 w-full space-y-1.5">
                            <input
                              type="text"
                              placeholder="Image URL..."
                              value={service.imageUrl}
                              onChange={(e) => updateService(index, 'imageUrl', e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono"
                            />
                            <label className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium">
                              <Upload className="w-3 h-3" />
                              <span>Replace Photo with Computer File</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFileUpload(e, (dataUrl) => {
                                  updateService(index, 'imageUrl', dataUrl);
                                })}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveAll}
                    className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md transition-colors"
                  >
                    Save All Services
                  </button>
                </div>
              </div>
            )}

            {/* TAB 5: GALLERY MANAGEMENT */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Dental Work Gallery</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Add sample cases (crowns, bridges, dentures, implants), update photos, and edit case descriptions.
                    </p>
                  </div>
                  <button
                    onClick={addGalleryItem}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Photo</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {editableData.gallery.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                            Photo #{index + 1}
                          </span>
                          <button
                            onClick={() => deleteGalleryItem(index)}
                            className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>

                        {/* Image preview & file uploader */}
                        <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 relative group">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="cursor-pointer w-full py-1.5 px-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center gap-1.5 border border-blue-200">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Image from Device</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, (dataUrl) => {
                                updateGalleryItem(index, 'imageUrl', dataUrl);
                              })}
                            />
                          </label>
                          <input
                            type="text"
                            placeholder="Or paste direct image URL..."
                            value={item.imageUrl}
                            onChange={(e) => updateGalleryItem(index, 'imageUrl', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Case Title
                          </label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateGalleryItem(index, 'title', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                              Category Tab
                            </label>
                            <select
                              value={item.category}
                              onChange={(e) => updateGalleryItem(index, 'category', e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
                            >
                              <option value="Esthetic Crowns & Bridges">Esthetic Crowns & Bridges</option>
                              <option value="Implant Prostheses">Implant Prostheses</option>
                              <option value="Zirconia, PFM, DMLS, N.C">Zirconia, PFM, DMLS, N.C</option>
                              <option value="Complete Denture">Complete Denture</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                              Short Tag
                            </label>
                            <input
                              type="text"
                              value={item.tag}
                              onChange={(e) => updateGalleryItem(index, 'tag', e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Case Description
                          </label>
                          <textarea
                            rows={2}
                            value={item.description}
                            onChange={(e) => updateGalleryItem(index, 'description', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveAll}
                    className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md transition-colors"
                  >
                    Save All Gallery Items
                  </button>
                </div>
              </div>
            )}

            {/* TAB 6: BACKUP, RESTORE & SECURITY */}
            {activeTab === 'backup' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Backup, Export & Security</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Download a full JSON backup of your customized website, import previous backups, or change password.
                  </p>
                </div>

                {/* Password Change */}
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-blue-600" />
                    Change Admin Password
                  </h3>
                  <div className="max-w-xs space-y-2">
                    <input
                      type="text"
                      placeholder="Enter new password"
                      value={editableData.adminPassword || 'admin'}
                      onChange={(e) => setEditableData({
                        ...editableData,
                        adminPassword: e.target.value
                      })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-mono"
                    />
                    <p className="text-[11px] text-slate-500">
                      Changes take effect upon clicking "Save Changes".
                    </p>
                  </div>
                </div>

                {/* Export / Download Backup */}
                <div className="p-5 rounded-xl bg-blue-50/60 border border-blue-100 space-y-3">
                  <h3 className="text-sm font-bold text-blue-950 flex items-center gap-2">
                    <Download className="w-4 h-4 text-blue-600" />
                    Export Full Website Backup (.json)
                  </h3>
                  <p className="text-xs text-slate-600">
                    Saves all text, custom services, and photo data into a standalone JSON file on your computer.
                  </p>
                  <button
                    onClick={onExport}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                {/* Import Backup */}
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-blue-600" />
                    Import Website Backup (.json)
                  </h3>
                  <p className="text-xs text-slate-600">
                    Restore previously saved website text and photos from a JSON backup file.
                  </p>
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-sm transition-colors">
                    <Upload className="w-4 h-4 text-blue-600" />
                    <span>Select JSON File to Restore</span>
                    <input
                      type="file"
                      accept=".json,application/json"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onImport(file);
                      }}
                    />
                  </label>
                </div>

                {/* Factory Reset */}
                <div className="p-5 rounded-xl bg-rose-50 border border-rose-200 space-y-3">
                  <h3 className="text-sm font-bold text-rose-900 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-rose-600" />
                    Reset to Factory Defaults
                  </h3>
                  <p className="text-xs text-rose-700">
                    Revert all changes and restore original M.N Dental Laboratory content and photos.
                  </p>
                  <button
                    onClick={onReset}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Reset All Content</span>
                  </button>
                </div>

              </div>
            )}

          </div>
        </main>

      </div>
    </div>
  );
};
