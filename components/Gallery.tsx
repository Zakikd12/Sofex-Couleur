import React from 'react';
import { motion } from 'framer-motion';

export const Gallery: React.FC = () => {
  const images = [
    "from-purple-500 to-rose-500",
    "from-blue-400 to-cyan-300",
    "from-yellow-400 to-orange-500",
    "from-green-400 to-emerald-600",
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-purple-400 font-bold tracking-wider text-sm">معرض الصور</span>
          <h2 className="text-4xl font-black text-white mt-2">لحظات صنعتها Sofex</h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">شاهد كيف حولت ألواننا المناسبات العادية إلى ذكريات سينمائية لا تنسى.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[500px] md:h-[400px]">
            {images.map((gradient, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className={`relative rounded-3xl overflow-hidden group cursor-pointer ${i === 0 || i === 3 ? 'md:col-span-2' : 'col-span-1'}`}
                >
                    {/* Placeholder for real images - using gradients for demo */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/20 font-black text-4xl transform -rotate-12 group-hover:scale-110 transition-transform">Sofex Event</span>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white font-bold">حفل تخرج 2024</p>
                        <p className="text-xs text-slate-300">الجزائر العاصمة</p>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};