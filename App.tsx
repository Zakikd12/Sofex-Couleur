import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { ProductOptions } from './components/ProductOptions';
import { OrderForm } from './components/OrderForm';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f172a] font-[Cairo] text-white selection:bg-purple-500 selection:text-white relative overflow-x-hidden flex flex-col">
      
      {/* Dark Mode Background Effects */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] bg-rose-500/10 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      {/* Navbar */}
      <nav className="absolute top-0 w-full z-50 px-6 py-6">
        <div className="container mx-auto flex justify-between items-center max-w-6xl">
            <div className="text-3xl font-black text-white tracking-tighter drop-shadow-lg">Sofex<span className="text-purple-500">.</span></div>
            <button 
                onClick={() => setIsOrderOpen(true)}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-white hover:text-black transition-all hidden sm:block shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
                اطلب الآن
            </button>
        </div>
      </nav>

      {/* Main Content with padding bottom for mobile button safety */}
      <main className="flex-grow pb-24 sm:pb-0">
        <Hero onOpenOrder={() => setIsOrderOpen(true)} />
        <Features />
        <ProductOptions />
        
        {/* Sticky Mobile Order Button */}
        <div className="fixed bottom-6 left-0 w-full px-4 z-40 sm:hidden pointer-events-none">
            <button 
                onClick={() => setIsOrderOpen(true)}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-rose-600 text-white rounded-2xl font-bold shadow-2xl pointer-events-auto flex items-center justify-center gap-2"
            >
                <span>اطلب الآن</span>
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs">الدفع عند الاستلام</span>
            </button>
        </div>

        <OrderForm isOpen={isOrderOpen} onClose={() => setIsOrderOpen(false)} onOpen={() => setIsOrderOpen(true)} />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;