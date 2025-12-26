import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Flame, Star } from 'lucide-react';

interface HeroProps {
  onOpenOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrder }) => {
  return (
    <div className="relative w-full pt-28 pb-10 lg:pt-40 lg:pb-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-right flex-1 z-20 order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 px-4 py-1.5 rounded-full mb-6">
               <span className="flex text-yellow-400 gap-0.5"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></span>
               <span className="text-xs font-bold text-purple-200">الخيار الأول للحفلات</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-4 tracking-tight drop-shadow-2xl">
              أشعل <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-rose-400 to-amber-400">
                أجواء الفرح
              </span>
            </h1>
            
            <p className="text-base lg:text-lg text-slate-300 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
              مطفأة ألوان <strong>Sofex</strong> الاحترافية. اجعل مناسبتك لا تُنسى مع سحابة من الألوان السينمائية.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start items-center">
              <button 
                onClick={onOpenOrder}
                className="group relative px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              >
                <span>شراء الآن</span>
                <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative w-full max-w-[280px] lg:max-w-[450px] mx-auto order-1 lg:order-2 mb-4 lg:mb-0"
          >
             {/* Glows */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-purple-600/40 via-rose-600/40 to-transparent rounded-full blur-[80px] -z-10 animate-pulse"></div>
             
             <motion.img 
               animate={{ y: [0, -15, 0] }}
               transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
               src="https://i.postimg.cc/KjPQ3FTt/cas-generated-1766504769277.png" 
               alt="Sofex Product" 
               className="w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 relative"
             />

             {/* Floating Info Cards - Adjusted positioning to stay on screen for mobile */}
             <div className="absolute top-10 right-0 lg:top-20 lg:-right-8 bg-black/40 backdrop-blur-md border border-white/10 p-3 lg:p-4 rounded-2xl flex items-center gap-3 animate-[bounce_4s_infinite]">
                 <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center">
                    <Flame className="text-white" size={18} fill="currentColor" />
                 </div>
                 <div>
                     <p className="text-white font-bold text-xs lg:text-sm">تأثير قوي</p>
                     <p className="text-slate-400 text-[10px] lg:text-xs">كثافة عالية</p>
                 </div>
             </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};