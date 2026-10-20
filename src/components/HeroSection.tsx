import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { GrassDivider } from './GrassDivider';
import { sounds } from '../utils/audio';
import bumiImg from '../assets/bumi.png';

interface HeroSectionProps {
  onStartExplore: () => void;
  onOpenGame: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartExplore, onOpenGame }) => {
  const handleClick = () => {
    sounds.playWheelClick();
    onStartExplore();
  };

  const handleEarthClick = () => {
    sounds.playAlert();
    onOpenGame();
  };

  return (
    <section id="hero" className="relative pt-6 pb-0 flex flex-col items-center text-center overflow-hidden">
      {/* Background warm aesthetic texture */}
      <div className="max-w-xl mx-auto px-4 flex flex-col items-center">
        
        {/* Planet di sebelah KIRI, tulisan 3R di sebelah KANAN */}
        <div className="relative my-2 select-none flex items-center justify-center gap-3 sm:gap-4 md:gap-5 group">
          {/* Earth Illustration (bumi.png) di KIRI - Easter Egg misterius saat diklik */}
          <button
            type="button"
            onClick={handleEarthClick}
            className="relative flex flex-col items-center group-hover:scale-105 active:scale-95 transition-transform duration-300 cursor-pointer focus:outline-none"
            aria-label="Ilustrasi Bumi Hijau Lestari"
          >
            <img
              src={bumiImg}
              alt="Ilustrasi Bumi Hijau Lestari"
              className="w-14 h-14 sm:w-18 sm:h-18 md:w-22 md:h-22 object-contain drop-shadow-md select-none transition-transform duration-300 pointer-events-none"
              draggable={false}
            />
          </button>

          {/* Tulisan 3R di KANAN */}
          <div className="relative">
            <h1 className="font-display text-[64px] sm:text-[90px] md:text-[108px] font-black leading-none text-[#283618] tracking-tight drop-shadow-sm transition-transform duration-300 hover:scale-105 cursor-default">
              3R
            </h1>
            <div className="absolute -top-1 -right-2.5 text-[#5B4436] animate-bounce">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 fill-[#5B4436]" />
            </div>
          </div>
        </div>

        {/* 3 Pillars Subheader: REDUCE · REUSE · RECYCLE */}
        <div className="w-full flex items-center justify-around max-w-md my-3 font-display font-extrabold text-sm sm:text-base md:text-lg text-[#283618] tracking-wider uppercase">
          <span className="hover:text-[#5B4436] transition-colors cursor-pointer">REDUCE</span>
          <span className="text-[#283618]/30">•</span>
          <span className="hover:text-[#5B4436] transition-colors cursor-pointer">REUSE</span>
          <span className="text-[#283618]/30">•</span>
          <span className="hover:text-[#5B4436] transition-colors cursor-pointer">RECYCLE</span>
        </div>

        {/* Narrative text from the visual mockup */}
        <p className="font-body text-[#283618]/90 text-sm sm:text-base font-semibold leading-relaxed max-w-md my-2 sm:my-3">
          Bumi tidak butuh pahlawan super cukup kamu yang mau mulai. 3 langkah kecil bisa mengubah arah masa depan bumi kita. Siap ambil bagian?
        </p>

        {/* Minimalist Pill Button matching original design */}
        <div className="mt-1.5 mb-3 sm:mb-6">
          <button
            type="button"
            onClick={handleClick}
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#5B4436] text-[#FEFAE0] font-display text-base sm:text-lg font-black tracking-wide shadow-lg hover:bg-[#433126] active:scale-95 transition-all transform hover:-translate-y-0.5 cursor-pointer select-none"
          >
            <span>GESER KE BAWAH</span>
            <div className="w-7 h-7 rounded-full bg-[#FEFAE0] text-[#5B4436] flex items-center justify-center group-hover:translate-y-1 transition-transform duration-200 shadow-xs">
              <ArrowDown className="w-4 h-4 stroke-[3]" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
