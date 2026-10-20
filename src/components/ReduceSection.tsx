import React, { useState } from 'react';
import { Sparkles, RotateCw, CheckCircle2 } from 'lucide-react';
import { REDUCE_CARDS } from '../data/content';
import { sounds } from '../utils/audio';
import { TotebagIllustration, SedotanBesiIllustration, TumblerIllustration } from './HandDrawnIllustrations';
import { GrassDivider } from './GrassDivider';
import { DesktopScaleContainer } from './DesktopScaleContainer';
import reduceImg from '../assets/reduce.png';

export const ReduceSection: React.FC = () => {
  // Store flipped state for each card independently (false = front, true = back)
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({
    'reduce-1': false,
    'reduce-2': false,
    'reduce-3': false,
  });

  const handleToggleFlip = (cardId: string) => {
    sounds.playFlip();
    setFlippedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <section id="reduce" className="pt-2 pb-1 sm:pt-5 sm:pb-3 px-3 sm:px-4 max-w-4xl mx-auto flex flex-col items-center">
      {/* Header with reduce.png badge positioned next to the section title */}
      <div className="flex flex-col items-center text-center mb-2 sm:mb-3.5">
        <div className="flex items-center justify-center gap-2.5 sm:gap-4 flex-wrap">
          <img
            src={reduceImg}
            alt="Logo Reduce - Kurangi Dari Awal"
            className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300 select-none pointer-events-none"
            draggable={false}
          />
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#283618] leading-tight tracking-tight uppercase">
            REDUCE
          </h2>
        </div>
        <div className="font-display text-lg sm:text-xl md:text-2xl font-black text-[#283618] tracking-wide mt-0.5">
          Kurangi Dari Awal
        </div>
        <p className="font-body text-[#283618]/90 text-xs sm:text-sm font-semibold mt-0.5 max-w-md mx-auto leading-relaxed">
          Cara terbaik untuk mengelola sampah adalah tidak menghasilkannya sejak awal.
        </p>
      </div>

      {/* 3 Interactive Flip Cards - Skala Proporsional Otomatis agar Muat Utuh di Layar HP */}
      <DesktopScaleContainer designWidth={760} className="w-full my-0">
        <div className="grid grid-cols-3 gap-5 w-full items-stretch">
          {REDUCE_CARDS.map((card) => {
            const isFlipped = !!flippedCards[card.id];

            return (
              <div
                key={card.id}
                className="perspective-1200 w-full min-h-[355px] flex flex-col"
              >
                {/* Inner 3D Flip Card Container */}
                <div
                  onClick={() => handleToggleFlip(card.id)}
                  className="relative w-full flex-1 transform-style-3d flip-card-transition cursor-pointer select-none group"
                  style={{
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                  title={isFlipped ? 'Klik kartu untuk membalik kembali ke depan' : 'Klik kartu untuk membalik dan melihat fakta'}
                >
                  {/* 1. SISI DEPAN (FRONT FACE) */}
                  <div className="absolute inset-0 backface-hidden rounded-[28px] bg-[#5B4436] text-[#FEFAE0] p-4.5 flex flex-col justify-between shadow-xl transition-all overflow-hidden">
                    {/* Top Row: Nomor Kartu */}
                    <div className="flex items-center justify-between w-full">
                      <span className="font-display text-2xl font-black text-white leading-none">
                        {card.number}
                      </span>
                    </div>

                    {/* Middle Center Group */}
                    <div className="my-auto flex flex-col items-center justify-center text-center gap-1.5 py-0.5 w-full">
                      {/* Illustrated Icon */}
                      <div className="w-20 h-20 rounded-2xl bg-[#FEFAE0] mx-auto flex items-center justify-center group-hover:scale-105 transition-transform p-2 shadow-sm">
                        {card.iconType === 'tumbler' && <TumblerIllustration className="w-full h-full drop-shadow-xs" />}
                        {card.iconType === 'plastic' && <TotebagIllustration className="w-full h-full drop-shadow-xs" />}
                        {card.iconType === 'food' && <SedotanBesiIllustration className="w-full h-full drop-shadow-xs" />}
                      </div>

                      {/* Title */}
                      <div className="px-1 mt-0.5">
                        <h3 className="font-display text-base font-black text-white leading-tight">
                          {card.title}
                        </h3>
                      </div>

                      {/* Front Description */}
                      <div className="px-0.5 mt-0.5">
                        <p className="font-body text-xs text-white/90 leading-relaxed font-normal">
                          {card.frontDescription}
                        </p>
                      </div>
                    </div>

                    {/* Bottom hint to Flip In-Place */}
                    <div className="pt-2 mt-auto border-t border-white/20 flex items-center justify-center gap-1.5 text-[11px] font-bold text-white/90 group-hover:text-white transition">
                      <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                      <span>Klik untuk membalik kartu ↺</span>
                    </div>
                  </div>

                  {/* 2. SISI BELAKANG (BACK FACE) - Rapi, Padat, Tidak Terpotong */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[28px] bg-[#283618] text-[#FEFAE0] p-4.5 flex flex-col justify-between shadow-xl transition-all overflow-hidden">
                    {/* Top Row: Number & Badge */}
                    <div className="flex items-center justify-between gap-1.5 w-full">
                      <span className="font-display text-2xl font-black text-[#FEFAE0] leading-none">
                        {card.number}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#FEFAE0] text-[#283618] shadow-xs">
                        <Sparkles className="w-3 h-3 text-[#283618] shrink-0" />
                        <span>Fakta & Dampak</span>
                      </span>
                    </div>

                    {/* Middle Center Group */}
                    <div className="my-auto flex flex-col justify-center gap-2 py-0.5 w-full">
                      {/* Primary Highlight Quote */}
                      <div className="py-2 px-3 rounded-xl bg-black/35 border border-[#FEFAE0]/25 text-center flex flex-col items-center justify-center shadow-inner">
                        <p className="font-display text-[12.5px] font-black text-amber-200 leading-snug">
                          "{card.flipBackText}"
                        </p>
                      </div>

                      {/* Supporting Practical Action Steps */}
                      <div className="space-y-1.5 text-left">
                        {card.backTips.map((tip, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 p-2 rounded-xl bg-white/10 border border-white/10"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0 mt-0.5" />
                            <span className="text-[11.5px] text-[#FEFAE0] font-normal leading-snug">
                              {tip}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom hint to Flip Back */}
                    <div className="pt-2 mt-auto border-t border-[#FEFAE0]/25 flex items-center justify-center gap-1.5 text-[11px] font-bold text-[#FEFAE0] group-hover:text-white transition">
                      <RotateCw className="w-3.5 h-3.5 group-hover:-rotate-180 transition-transform duration-500" />
                      <span>Klik kartu untuk kembali ↺</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </DesktopScaleContainer>
    </section>
  );
};
