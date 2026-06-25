import React from 'react';
import { MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 py-12 relative z-10 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-8">
          {/* Address Section */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center justify-center md:justify-start gap-2">
              <MapPin className="text-blue-500" size={20} />
              Alamat Domisili
            </h3>
            <p className="text-gray-400 max-w-sm leading-relaxed mx-auto md:mx-0 text-sm md:text-base">
              Jl. Kusuma Indah Blok A19 No. 32<br />
              Jatibening, Pondok Gede<br />
              Bekasi Selatan
            </p>
          </div>

          {/* Map Section */}
          <div className="w-full md:w-auto flex justify-center">
            <div className="h-32 w-full max-w-[250px] md:w-64 rounded-xl overflow-hidden border border-zinc-800 shadow-lg relative group bg-zinc-900">
              <iframe
                title="Google Maps Location"
                src="https://www.google.com/maps?q=jl.kusuma+indah+blok.A19+no.32,+jatibening,+pondokgede,+bekasi+selatan&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(20%)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm border-t border-white/5 pt-8">
          <p>&copy; {new Date().getFullYear()} Yuan Nata Nugraha. All rights reserved.</p>
          <p className="mt-2 text-xs opacity-50">Built with React, Tailwind & Motion</p>
        </div>
      </div>
    </footer>
  );
};
