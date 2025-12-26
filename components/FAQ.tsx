import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { q: "هل الألوان تترك بقع على الملابس؟", a: "لا، منتج Sofex مصمم ليكون قابلاً للغسل بسهولة. في معظم الحالات يزول بمجرد نفضه، وإذا بقي أثر يزول بالماء تماماً." },
  { q: "هل المنتج آمن على البشرة؟", a: "نعم 100%. نستخدم مواد طبيعية (نشا الذرة وألوان غذائية) غير سامة وغير مضرة للبشرة أو التنفس." },
  { q: "كم مدة استمرار العبوة؟", a: "عبوة 1 كغ تستمر حوالي 4 ثواني من الضخ المتواصل، وعبوة 2 كغ تستمر حوالي 8 ثواني. الكثافة عالية جداً وتعطي تأثيراً كبيراً." },
  { q: "كيف يتم التوصيل والدفع؟", a: "نوفر التوصيل لـ 58 ولاية حتى باب المنزل أو المكتب. الدفع يكون عند استلام المنتج (Main à main)." },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-black text-white text-center mb-10">أسئلة يتكرر طرحها</h2>
        
        <div className="space-y-4">
            {faqs.map((faq, i) => (
                <div key={i} className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
                    <button 
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        className="w-full p-6 flex items-center justify-between text-right hover:bg-white/5 transition-colors"
                    >
                        <span className="font-bold text-white text-lg">{faq.q}</span>
                        {openIndex === i ? <Minus className="text-purple-400" /> : <Plus className="text-slate-400" />}
                    </button>
                    <AnimatePresence>
                        {openIndex === i && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-white/5">
                                    {faq.a}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};