import React from 'react';
import { Instagram, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 py-8 bg-[#0b1120] mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-right">
                <h3 className="font-black text-xl text-white">Sofex.</h3>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2 text-xs text-slate-300">
                <div className="flex gap-4 font-bold">
                    <a href="tel:0655110977" className="hover:text-white flex items-center gap-1.5 transition-colors"><Phone size={14} className="text-purple-500"/> 0655110977</a>
                    <a href="tel:0540330093" className="hover:text-white flex items-center gap-1.5 transition-colors"><Phone size={14} className="text-purple-500"/> 0540330093</a>
                </div>
                <a href="https://www.instagram.com/sof_ex16?igsh=MTRyd2hndjNrNmIwMg==" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-rose-500 transition-colors">
                    <Instagram size={14} /> تابعنا على إنستغرام
                </a>
            </div>
        </div>
        <div className="text-center mt-4 pt-4 border-t border-white/5">
            <p className="text-slate-600 text-[10px]">
            &copy; {new Date().getFullYear()} Sofex. جميع الحقوق محفوظة. 
            </p>
        </div>
      </div>
    </footer>
  );
};