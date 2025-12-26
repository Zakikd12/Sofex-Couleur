import React from 'react';
import { ShieldCheck, Palette, Camera, Zap } from 'lucide-react';

const features = [
  { icon: <ShieldCheck size={24} />, title: "آمنة 100%", desc: "آمنة على البشرة والملابس" },
  { icon: <Palette size={24} />, title: "ألوان مركزة", desc: "ألوان زاهية وواضحة" },
  { icon: <Camera size={24} />, title: "مثالي للتصوير", desc: "يعطي طابع سينمائي" },
  { icon: <Zap size={24} />, title: "سهل التنظيف", desc: "يزول بالماء بسهولة" },
];

export const Features: React.FC = () => {
  return (
    <section className="py-6 relative z-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        {features.map((f, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/5 p-4 rounded-2xl text-center group hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 mx-auto bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center text-purple-400 mb-3 shadow-lg group-hover:scale-110 group-hover:text-purple-300 transition-all">
                    {f.icon}
                </div>
                <h3 className="font-bold text-white text-base mb-1">{f.title}</h3>
                <p className="text-xs text-slate-400">{f.desc}</p>
            </div>
        ))}
        </div>
      </div>
    </section>
  );
};