import React from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  { name: "أمين. ب", role: "منظم حفلات", text: "أفضل نوعية تعاملت معها في السوق. الألوان قوية جداً والتوصيل كان سريع للبليدة.", stars: 5 },
  { name: "سارة. م", role: "حفل تخرج", text: "درناها في التخرج تاعنا كانت أجواء خيالية! الصور خرجت تحفة فنية.", stars: 5 },
  { name: "كريم. س", role: "عريس", text: "خدمة احترافية، وصلوني في الوقت والمنتج آمن تماماً ما خلّاش بقع في الحوايج.", stars: 5 },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-[#0b1120] border-y border-white/5">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-16">ماذا يقول عملاؤنا؟</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
                <div key={i} className="bg-[#1e293b]/50 backdrop-blur-sm p-8 rounded-3xl border border-white/5 relative hover:border-purple-500/30 transition-colors">
                    <Quote className="absolute top-6 left-6 text-purple-500/20 w-10 h-10" />
                    <div className="flex gap-1 mb-4">
                        {[...Array(review.stars)].map((_, idx) => (
                            <Star key={idx} size={16} className="text-yellow-400" fill="currentColor" />
                        ))}
                    </div>
                    <p className="text-slate-300 mb-6 leading-relaxed">"{review.text}"</p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-rose-500 flex items-center justify-center font-bold text-white text-sm">
                            {review.name.charAt(0)}
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm">{review.name}</p>
                            <p className="text-xs text-slate-500">{review.role}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};