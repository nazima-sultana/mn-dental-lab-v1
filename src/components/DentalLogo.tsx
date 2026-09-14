import React from 'react';

interface DentalLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  lightMode?: boolean;
}

export const DentalLogo: React.FC<DentalLogoProps> = ({
  className = '',
  size = 40,
  showText = false,
  lightMode = false
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Precision Tooth & Crown Dental Emblem */}
      <div
        style={{ width: size, height: size }}
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-800 text-white shadow-md shadow-blue-500/20 p-2 shrink-0 border border-white/20"
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Aesthetic Stylized Tooth & Crown Architecture */}
          <path
            d="M50 14C38 14 30 20 27 28C24 35 24 45 28 58C31 68 34 84 39 88C43 91 46 88 47 78C48 68 49 60 50 60C51 60 52 68 53 78C54 88 57 91 61 88C66 84 69 68 72 58C76 45 76 35 73 28C70 20 62 14 50 14Z"
            fill="white"
          />
          {/* Anatomical Crown Ridge Highlight */}
          <path
            d="M38 28C42 25 46 24 50 24C54 24 58 25 62 28C64 32 64 38 62 44C58 48 54 50 50 50C46 50 42 48 38 44C36 38 36 32 38 28Z"
            fill="#E0F2FE"
          />
          {/* Micro Geometric Crown Facets */}
          <path
            d="M44 32L50 27L56 32L50 37L44 32Z"
            fill="#0284C7"
          />
          {/* Sparkle of Esthetic Finish */}
          <circle cx="68" cy="22" r="3.5" fill="#38BDF8" />
          <path d="M68 15V19M68 25V29M61 22H65M71 22H75" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-bold tracking-tight text-lg leading-tight ${lightMode ? 'text-white' : 'text-slate-900'}`}>
              M.N DENTAL
            </span>
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 tracking-wide uppercase">
              LAB
            </span>
          </div>
          <span className={`text-[11px] tracking-wider uppercase font-medium ${lightMode ? 'text-blue-200' : 'text-slate-500'}`}>
            Esthetic Crowns & Bridges
          </span>
        </div>
      )}
    </div>
  );
};
