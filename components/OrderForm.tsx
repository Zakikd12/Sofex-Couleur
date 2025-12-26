import React, { useState, useEffect, useMemo } from 'react';
import { ProductSize, OrderFormState, COLOR_CONFIG, PRICING, WILAYAS, ColorVariant } from '../types';
import { Check, Send, Loader2, ArrowRight, X, Minus, Plus, Phone, MapPin, User, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

// Telegram Configuration
const TELEGRAM_BOT_TOKEN = "8249247789:AAE9saD1Bjz5L9Zqg_jZae9I5fYet0DzxGY";
const TELEGRAM_CHAT_ID = "7917961504";

const calculateProductsTotal = (quantities: Record<string, { [key in ProductSize]: number }>) => {
  let total1kgCount = 0;
  let total2kgCount = 0;

  Object.values(quantities).forEach(qty => {
    total1kgCount += qty[ProductSize.ONE_KG];
    total2kgCount += qty[ProductSize.TWO_KG];
  });

  let price = 0;
  if (total1kgCount > 0) {
    if (total1kgCount <= 4) price += (PRICING['1KG'] as any)[total1kgCount];
    else price += total1kgCount * ((PRICING['1KG'] as any)[4] / 4);
  }
  if (total2kgCount > 0) {
    if (total2kgCount <= 4) price += (PRICING['2KG'] as any)[total2kgCount];
    else price += total2kgCount * ((PRICING['2KG'] as any)[4] / 4);
  }
  return price;
};

export const OrderForm: React.FC<OrderFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<OrderFormState>({ name: '', phone: '', wilaya: '', addressDetails: '' });
  const [quantities, setQuantities] = useState<Record<string, { [key in ProductSize]: number }>>(() => {
    const initial: any = {};
    Object.keys(COLOR_CONFIG).forEach(color => {
      initial[color] = { [ProductSize.ONE_KG]: 0, [ProductSize.TWO_KG]: 0 };
    });
    return initial;
  });

  const [view, setView] = useState<'SELECTION' | 'FORM'>('SELECTION');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const updateQuantity = (color: string, size: ProductSize, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [color]: { ...prev[color], [size]: Math.max(0, prev[color][size] + delta) }
    }));
  };

  const productsTotal = useMemo(() => calculateProductsTotal(quantities), [quantities]);
  
  const shippingCost = useMemo(() => {
    if (!formData.wilaya) return 0;
    const selectedWilaya = WILAYAS.find(w => w.code === formData.wilaya);
    return selectedWilaya ? selectedWilaya.price : 0;
  }, [formData.wilaya]);

  const finalTotal = productsTotal + shippingCost;

  const totalItems = useMemo(() => {
    let count = 0;
    Object.values(quantities).forEach(q => count += (q['1KG'] + q['2KG']));
    return count;
  }, [quantities]);

  const sendToTelegram = async () => {
    const wilayaName = WILAYAS.find(w => w.code === formData.wilaya)?.name || formData.wilaya;
    
    // Format the items list
    let itemsListText = "";
    Object.entries(quantities).forEach(([colorKey, sizes]) => {
        const colorLabel = COLOR_CONFIG[colorKey as ColorVariant].label;
        if (sizes[ProductSize.ONE_KG] > 0) {
            itemsListText += `▫️ <b>${colorLabel}</b> (1 كغ): ${sizes[ProductSize.ONE_KG]} حبة\n`;
        }
        if (sizes[ProductSize.TWO_KG] > 0) {
            itemsListText += `▫️ <b>${colorLabel}</b> (2 كغ): ${sizes[ProductSize.TWO_KG]} حبة\n`;
        }
    });

    const message = `
🔔 <b>طلب جديد من Sofex</b> 🔔
➖➖➖➖➖➖➖➖
👤 <b>معلومات العميل:</b>
<b>الاسم:</b> ${formData.name}
<b>الهاتف:</b> ${formData.phone}
<b>الولاية:</b> [${formData.wilaya}] ${wilayaName}
<b>العنوان:</b> ${formData.addressDetails}
➖➖➖➖➖➖➖➖
🛒 <b>تفاصيل الطلبية:</b>
${itemsListText}
➖➖➖➖➖➖➖➖
💰 <b>الحساب:</b>
<b>المنتجات:</b> ${productsTotal.toLocaleString()} دج
<b>التوصيل:</b> ${shippingCost} دج
<b>المجموع الكلي:</b> ${finalTotal.toLocaleString()} دج
    `;

    try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML',
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to send telegram message');
        }
        return true;
    } catch (error) {
        console.error('Error sending order:', error);
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (totalItems === 0) return;
    
    setIsSubmitting(true);
    
    // Send to Telegram
    const sent = await sendToTelegram();
    
    setIsSubmitting(false);
    
    if (sent) {
        setIsSuccess(true);
    } else {
        alert("حدث خطأ أثناء إرسال الطلب، يرجى التأكد من اتصال الانترنت والمحاولة مرة أخرى.");
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setView('SELECTION');
    onClose();
    setQuantities(prev => {
      const reset: any = {};
      Object.keys(COLOR_CONFIG).forEach(c => reset[c] = { '1KG': 0, '2KG': 0 });
      return reset;
    });
    setFormData({ name: '', phone: '', wilaya: '', addressDetails: '' });
  };

  // --- RENDER SUCCESS ---
  if (isSuccess && isOpen) {
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#1e293b] border border-white/10 relative z-10 p-10 rounded-3xl shadow-2xl max-w-sm w-full text-center"
            >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="text-green-500 w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">تم استلام طلبك!</h3>
                <p className="text-slate-400 mb-8">شكراً لك، سيقوم فريقنا بالاتصال بك قريباً.</p>
                <button onClick={resetForm} className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-slate-200 transition-colors">عودة للرئيسية</button>
            </motion.div>
        </div>
    );
  }

  // --- RENDER MAIN FORM ---
  return (
    <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center sm:p-4 font-[Cairo]">
                {/* Backdrop */}
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    onClick={onClose}
                ></motion.div>

                {/* Main Modal Container */}
                <motion.div 
                    initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="bg-[#0f172a] w-full md:max-w-4xl h-full md:h-auto md:max-h-[90vh] md:rounded-[2rem] shadow-[0_0_60px_rgba(139,92,246,0.15)] relative z-10 flex flex-col border border-white/10 overflow-hidden"
                >
                    {/* Header */}
                    <div className="px-6 py-5 bg-[#0f172a] border-b border-white/10 flex justify-between items-center sticky top-0 z-20">
                        <div>
                            <span className="font-black text-2xl text-white tracking-tight">إعداد الطلب</span>
                        </div>
                        <button onClick={onClose} className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors text-white">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#020617] relative">
                        <AnimatePresence mode="wait">
                            {view === 'SELECTION' ? (
                                <motion.div 
                                    key="selection"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="p-4 sm:p-6"
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {Object.entries(COLOR_CONFIG).map(([key, config]) => {
                                            const qty1 = quantities[key][ProductSize.ONE_KG];
                                            const qty2 = quantities[key][ProductSize.TWO_KG];
                                            const isActive = qty1 > 0 || qty2 > 0;

                                            return (
                                                <div 
                                                    key={key} 
                                                    className={`relative overflow-hidden rounded-3xl border transition-all duration-300 group ${isActive ? 'bg-white/5 border-purple-500 ring-1 ring-purple-500' : 'bg-[#0f172a] border-white/10 hover:border-white/20'}`}
                                                >
                                                    {/* Card Header with Color Splash */}
                                                    <div className="relative p-5 flex items-center gap-4 z-10">
                                                        <div className={`w-14 h-14 rounded-full ${config.tailwindColor} shadow-[0_0_20px_rgba(0,0,0,0.5)] ring-2 ring-white/10 flex items-center justify-center`}>
                                                            {isActive && <Check className="text-white drop-shadow-md" />}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-black text-xl text-white">{config.label}</h3>
                                                            <p className="text-xs text-slate-400 font-medium mt-0.5">اختر الحجم المناسب</p>
                                                        </div>
                                                    </div>

                                                    {/* Background Glow */}
                                                    <div className={`absolute top-0 right-0 w-32 h-32 ${config.tailwindColor} blur-[60px] opacity-20 -mr-10 -mt-10 pointer-events-none transition-opacity ${isActive ? 'opacity-40' : 'opacity-10'}`}></div>

                                                    {/* Sizes & Controls */}
                                                    <div className="p-4 pt-0 space-y-3 relative z-10">
                                                        
                                                        {/* 1KG Row */}
                                                        <div className={`flex items-center justify-between p-2 pr-3 rounded-xl transition-colors ${qty1 > 0 ? 'bg-white/10' : 'bg-black/20'}`}>
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-white text-sm">حجم 1 كغ</span>
                                                                <span className="text-[10px] text-slate-400">حوالي 2350 دج</span>
                                                            </div>
                                                            <div className="flex items-center bg-[#0f172a] rounded-lg border border-white/10 overflow-hidden h-9">
                                                                <button onClick={() => updateQuantity(key, ProductSize.ONE_KG, -1)} className="w-8 h-full flex items-center justify-center hover:bg-white/10 text-white transition-colors disabled:opacity-30" disabled={qty1 === 0}><Minus size={14}/></button>
                                                                <span className={`w-8 text-center text-sm font-bold ${qty1 > 0 ? 'text-purple-400' : 'text-slate-500'}`}>{qty1}</span>
                                                                <button onClick={() => updateQuantity(key, ProductSize.ONE_KG, 1)} className="w-8 h-full flex items-center justify-center hover:bg-white/10 text-white transition-colors"><Plus size={14}/></button>
                                                            </div>
                                                        </div>

                                                        {/* 2KG Row */}
                                                        <div className={`flex items-center justify-between p-2 pr-3 rounded-xl transition-colors ${qty2 > 0 ? 'bg-white/10' : 'bg-black/20'}`}>
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-white text-sm">حجم 2 كغ</span>
                                                                <span className="text-[10px] text-slate-400">حوالي 2900 دج</span>
                                                            </div>
                                                            <div className="flex items-center bg-[#0f172a] rounded-lg border border-white/10 overflow-hidden h-9">
                                                                <button onClick={() => updateQuantity(key, ProductSize.TWO_KG, -1)} className="w-8 h-full flex items-center justify-center hover:bg-white/10 text-white transition-colors disabled:opacity-30" disabled={qty2 === 0}><Minus size={14}/></button>
                                                                <span className={`w-8 text-center text-sm font-bold ${qty2 > 0 ? 'text-purple-400' : 'text-slate-500'}`}>{qty2}</span>
                                                                <button onClick={() => updateQuantity(key, ProductSize.TWO_KG, 1)} className="w-8 h-full flex items-center justify-center hover:bg-white/10 text-white transition-colors"><Plus size={14}/></button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="h-20"></div> {/* Spacer for bottom bar */}
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="form"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    className="p-6 h-full flex flex-col justify-center max-w-md mx-auto"
                                >
                                    <button onClick={() => setView('SELECTION')} className="text-sm font-bold text-slate-400 hover:text-white flex items-center gap-2 mb-6 w-fit transition-colors">
                                        <ArrowRight size={16} /> العودة لتعديل الكميات
                                    </button>

                                    {/* Order Summary Card */}
                                    <div className="bg-[#1e293b] border border-white/10 rounded-2xl overflow-hidden mb-6">
                                        {/* Header with Product Thumbnail */}
                                        <div className="bg-white/5 p-4 flex items-center gap-4 border-b border-white/5">
                                           <div className="w-16 h-16 bg-[#0f172a] rounded-xl flex items-center justify-center p-2 border border-white/10 shrink-0">
                                              <img src="https://i.postimg.cc/KjPQ3FTt/cas-generated-1766504769277.png" alt="Sofex" className="w-full h-full object-contain" />
                                           </div>
                                           <div>
                                              <h4 className="font-bold text-white text-sm">مطفأة ألوان Sofex</h4>
                                              <p className="text-[10px] text-slate-400 mt-1">{totalItems} منتجات في السلة</p>
                                           </div>
                                        </div>

                                        <div className="p-5">
                                            {/* Selected Items List (Visualized) */}
                                            <div className="mb-6 space-y-2 max-h-32 overflow-y-auto custom-scrollbar pr-2">
                                                {Object.entries(quantities).flatMap(([key, sizes]) => {
                                                    const items = [];
                                                    if (sizes['1KG'] > 0) items.push({ key, size: '1KG', qty: sizes['1KG'] });
                                                    if (sizes['2KG'] > 0) items.push({ key, size: '2KG', qty: sizes['2KG'] });
                                                    return items;
                                                }).map((item, i) => (
                                                    <div key={i} className="flex items-center justify-between text-xs bg-white/5 p-2 rounded-lg">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-3 h-3 rounded-full ${COLOR_CONFIG[item.key as ColorVariant].tailwindColor}`}></div>
                                                            <span className="text-slate-300">{COLOR_CONFIG[item.key as ColorVariant].label}</span>
                                                            <span className="text-slate-500">|</span>
                                                            <span className="font-bold text-white">{item.size === '1KG' ? '1 كغ' : '2 كغ'}</span>
                                                        </div>
                                                        <div className="bg-white/10 px-2 py-0.5 rounded text-white font-bold">x{item.qty}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="space-y-3 pt-4 border-t border-white/5">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-slate-300 text-sm">مجموع المنتجات</span>
                                                    <span className="font-bold text-white">{productsTotal.toLocaleString()} دج</span>
                                                </div>
                                                
                                                {/* Dynamic Shipping Row */}
                                                <div className="flex justify-between items-center">
                                                    <span className="text-slate-300 text-sm flex items-center gap-2">تكلفة التوصيل {formData.wilaya && <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-400">({WILAYAS.find(w => w.code === formData.wilaya)?.name})</span>}</span>
                                                    <span className={`font-bold transition-all ${shippingCost > 0 ? 'text-white' : 'text-slate-500'}`}>
                                                        {shippingCost > 0 ? `${shippingCost} دج` : '--'}
                                                    </span>
                                                </div>

                                                <div className="flex justify-between items-end pt-3 border-t border-white/10 mt-2">
                                                    <div>
                                                        <p className="text-xs text-slate-400 mb-1">المبلغ الإجمالي للدفع</p>
                                                        <p className="text-3xl font-black text-purple-400">{finalTotal.toLocaleString()} <span className="text-sm font-normal text-slate-400">دج</span></p>
                                                    </div>
                                                    <div className="bg-green-500/10 text-green-400 px-3 py-1 rounded-lg text-xs font-bold border border-green-500/20">
                                                        الدفع عند الاستلام
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-slate-400 mb-1.5 block pr-1">الاسم واللقب</label>
                                            <div className="relative group">
                                                <User className="absolute top-3.5 right-4 text-slate-500 w-5 h-5 group-focus-within:text-purple-500 transition-colors" />
                                                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full pl-4 pr-12 py-3 bg-[#0f172a] border border-white/10 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all font-bold text-white placeholder:text-slate-600 placeholder:font-normal" placeholder="اكتب اسمك هنا" />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="text-xs font-bold text-slate-400 mb-1.5 block pr-1">رقم الهاتف</label>
                                            <div className="relative group">
                                                <Phone className="absolute top-3.5 right-4 text-slate-500 w-5 h-5 group-focus-within:text-purple-500 transition-colors" />
                                                <input required type="tel" dir="ltr" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full pl-4 pr-12 py-3 bg-[#0f172a] border border-white/10 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all font-bold text-white placeholder:text-slate-600 placeholder:font-normal text-right placeholder:text-right" placeholder="05 / 06 / 07 ..." />
                                            </div>
                                        </div>

                                        {/* Address Section */}
                                        <div>
                                            <label className="text-xs font-bold text-slate-400 mb-1.5 block pr-1">العنوان والشحن</label>
                                            <div className="flex gap-3">
                                                {/* Wilaya Dropdown */}
                                                <div className="relative w-1/3 min-w-[120px]">
                                                    <MapPin className="absolute top-3.5 right-3 text-slate-500 w-5 h-5 z-10 pointer-events-none" />
                                                    <select 
                                                        required 
                                                        value={formData.wilaya} 
                                                        onChange={e => setFormData({...formData, wilaya: e.target.value})}
                                                        className="w-full pl-2 pr-10 py-3 bg-[#0f172a] border border-white/10 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all font-bold text-white appearance-none cursor-pointer text-sm"
                                                    >
                                                        <option value="" disabled>الولاية</option>
                                                        {WILAYAS.map(w => (
                                                            <option key={w.code} value={w.code} className="bg-slate-900">{w.code} - {w.name}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="absolute top-4 left-3 text-slate-500 w-4 h-4 pointer-events-none" />
                                                </div>

                                                {/* Details Input */}
                                                <div className="relative flex-1">
                                                    <input 
                                                        required 
                                                        type="text" 
                                                        value={formData.addressDetails} 
                                                        onChange={e => setFormData({...formData, addressDetails: e.target.value})} 
                                                        className="w-full px-4 py-3 bg-[#0f172a] border border-white/10 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all font-bold text-white placeholder:text-slate-600 placeholder:font-normal text-sm" 
                                                        placeholder="البلدية / الحي / تفاصيل المنزل" 
                                                    />
                                                </div>
                                            </div>
                                            {formData.wilaya && (
                                                <motion.p initial={{opacity: 0}} animate={{opacity: 1}} className="text-[10px] text-purple-400 mt-1.5 mr-1 font-medium">
                                                    تم تحديد سعر التوصيل لولاية {WILAYAS.find(w => w.code === formData.wilaya)?.name}: {shippingCost} دج
                                                </motion.p>
                                            )}
                                        </div>
                                        
                                        <div className="h-20"></div> {/* Spacer for bottom button */}

                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Footer Action Bar */}
                    <div className="p-4 sm:p-6 bg-[#0f172a]/90 backdrop-blur-lg border-t border-white/10 absolute bottom-0 w-full z-30">
                        {view === 'SELECTION' ? (
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-400 font-bold">الإجمالي</span>
                                    <span className="text-2xl sm:text-3xl font-black text-white">{productsTotal.toLocaleString()} <span className="text-sm font-normal text-purple-400">دج</span></span>
                                </div>
                                
                                {totalItems > 0 ? (
                                    <button 
                                        onClick={() => setView('FORM')}
                                        className="flex-1 max-w-xs py-3.5 bg-white text-black rounded-xl font-bold hover:bg-purple-100 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                                    >
                                        <span>تأكيد الاختيار</span>
                                        <ArrowRight size={18} className="rotate-180" />
                                    </button>
                                ) : (
                                    <div className="flex-1 max-w-xs text-center text-sm text-slate-500 font-medium bg-white/5 py-3.5 rounded-xl border border-white/5">
                                        اختر منتجاً للمتابعة
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button 
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full py-4 bg-gradient-to-r from-purple-600 to-rose-600 text-white rounded-xl font-bold shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send size={20}/> <span>تأكيد الطلب نهائياً</span></>}
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        )}
    </AnimatePresence>
  );
};