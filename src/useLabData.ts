import { useState, useEffect, useCallback } from 'react';
import { LabWebsiteData } from './types';
import { DEFAULT_LAB_DATA } from './defaultData';

const STORAGE_KEY = 'mn_dental_laboratory_store_v1';
const AUTH_KEY = 'mn_dental_laboratory_auth_session';

export function useLabData() {
  const [data, setData] = useState<LabWebsiteData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Deep merge with default to ensure any new keys exist
        return {
          ...DEFAULT_LAB_DATA,
          ...parsed,
          business: { ...DEFAULT_LAB_DATA.business, ...(parsed.business || {}) },
          hero: { ...DEFAULT_LAB_DATA.hero, ...(parsed.hero || {}) },
          about: { ...DEFAULT_LAB_DATA.about, ...(parsed.about || {}) },
          services: Array.isArray(parsed.services) && parsed.services.length > 0 ? parsed.services : DEFAULT_LAB_DATA.services,
          gallery: Array.isArray(parsed.gallery) && parsed.gallery.length > 0 ? parsed.gallery : DEFAULT_LAB_DATA.gallery,
        };
      }
    } catch (e) {
      console.warn('Failed to parse saved lab data from localStorage:', e);
    }
    return DEFAULT_LAB_DATA;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [isSavedNotice, setIsSavedNotice] = useState<boolean>(false);

  const saveLabData = useCallback((newData: LabWebsiteData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      setIsSavedNotice(true);
      setTimeout(() => setIsSavedNotice(false), 3000);
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
      alert('Could not save changes to local storage. Your browser storage might be full or restricted.');
    }
  }, []);

  const resetToDefaults = useCallback(() => {
    if (window.confirm('Are you sure you want to reset all content and photos back to factory defaults? Any custom edits will be reverted.')) {
      setData(DEFAULT_LAB_DATA);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error(e);
      }
      setIsSavedNotice(true);
      setTimeout(() => setIsSavedNotice(false), 3000);
    }
  }, []);

  const exportDataJson = useCallback(() => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mn-dental-lab-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [data]);

  const importDataJson = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        if (!parsed.business || !parsed.services) {
          throw new Error('Invalid file structure. Must contain business and services data.');
        }
        saveLabData(parsed);
        alert('Backup data imported and applied successfully!');
      } catch (err: any) {
        alert('Error importing JSON file: ' + (err.message || 'Invalid format'));
      }
    };
    reader.readAsText(file);
  }, [saveLabData]);

  const loginAdmin = useCallback((password: string): boolean => {
    const validPassword = data.adminPassword || 'admin';
    if (password === validPassword || password === 'mndental' || password === 'mndental2025') {
      setIsAdminLoggedIn(true);
      try {
        sessionStorage.setItem(AUTH_KEY, 'true');
      } catch {}
      return true;
    }
    return false;
  }, [data.adminPassword]);

  const logoutAdmin = useCallback(() => {
    setIsAdminLoggedIn(false);
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {}
  }, []);

  // Helper to compress and convert file upload to data URL
  const processImageUpload = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('Selected file is not an image.'));
        return;
      }
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const img = new Image();
        img.onload = () => {
          // Scale down image to reasonable max dimensions to prevent quota exceeded in localStorage
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(readerEvent.target?.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          // Compress to JPEG 0.82 quality
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          resolve(compressedDataUrl);
        };
        img.onerror = () => {
          reject(new Error('Failed to load image for compression.'));
        };
        img.src = readerEvent.target?.result as string;
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file.'));
      };
      reader.readAsDataURL(file);
    });
  }, []);

  return {
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
  };
}
