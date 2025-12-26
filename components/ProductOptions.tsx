import React from 'react';
import { COLOR_CONFIG } from '../types';
import { motion } from 'framer-motion';

export const ProductOptions: React.FC = () => {
  return (
    <section className="py-12 bg-[#0f172a] text-white overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto mb-8 gap-4 border-b border-white/5 pb-6">
            <div>
                <h2 className="text-2xl font-bold">الألوان المتوفرة</h2>
                <p className="text-slate-400 text-sm">اختر اللون الذي يعبر عن فرحتك</p>
            </div>
            {/* Composition tags removed as requested */}
        </div>

        {/* Colors Grid */}
        <div className="grid grid-cols-5 gap-3 max-w-4xl mx-auto mb-12">
          {Object.entries(COLOR_CONFIG).map(([key, config], index) => (
            <motion.div 
              key={key}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center gap-2 group cursor-default"
            >
              <div className={`w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full ${config.tailwindColor} shadow-[0_0_20px_rgba(0,0,0,0.2)] group-hover:scale-110 transition-transform duration-300 border-2 border-slate-700 flex items-center justify-center`}>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-300">{config.label}</h3>
            </motion.div>
          ))}
        </div>

        {/* Sizes - Compact Horizontal */}
        <div className="max-w-3xl mx-auto bg-white/5 rounded-2xl p-6 border border-white/5">
            <h3 className="text-lg font-bold mb-4 text-center">الأحجام المتوفرة</h3>
            <div className="flex justify-center gap-4 sm:gap-8 items-center">
                
                {/* 1KG */}
                <div className="text-center flex-1">
                    <div className="h-16 w-8 bg-slate-700 mx-auto rounded mb-2 relative overflow-hidden ring-1 ring-white/10">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    </div>
                    <p className="text-lg font-bold">1 كغ</p>
                    <p className="text-xs text-slate-400">خفيف وسهل الاستخدام</p>
                </div>

                {/* Vertical Divider */}
                <div className="w-px h-16 bg-white/10"></div>

                {/* 2KG */}
                <div className="text-center flex-1 relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-purple-600 text-[10px] px-2 py-0.5 rounded text-white whitespace-nowrap">الأكثر طلباً</div>
                    <div className="h-20 w-10 bg-gradient-to-t from-purple-900/80 to-slate-700 mx-auto rounded mb-2 relative overflow-hidden ring-1 ring-purple-500/50 shadow-[0_0_15px_rgba(147,51,234,0.2)]">
                         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    </div>
                    <p className="text-xl font-bold text-purple-400">2 كغ</p>
                    <p className="text-xs text-slate-400">قوة وكثافة مضاعفة</p>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};