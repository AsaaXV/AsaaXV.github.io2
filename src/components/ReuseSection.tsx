import React, { useState } from 'react';
import { REUSE_ITEMS } from '../data/content';
import { sounds } from '../utils/audio';
import { GrassDivider } from './GrassDivider';
import { DesktopScaleContainer } from './DesktopScaleContainer';

import reuseImg from '../assets/reuse.png';
import botolBekasImg from '../assets/botol bekas.png';
import potBungaImg from '../assets/Pot-Bunga-dari-Botol.png';
import kardusBekasImg from '../assets/kardus-bekas.png';
import rakBukuKardusImg from '../assets/Rak-Buku-Mini-Dari-Kardus.png';
import bajuBayiBekasImg from '../assets/baju_bayi_bekas.png';
import kainDariBajuBekasImg from '../assets/Kain_Dari_Baju_Bekas_Bayi.png';

export const ReuseSection: React.FC = () => {
  // Store state for each card: 0 = Origin/Limbah, 1 = Upcycled/Hasil Kreasi
  // Default to 1 (Hasil Kreasi) so the cards immediately focus on the creative outcomes and benefits
  const [cardStates, setCardStates] = useState<Record<string, number>>({
    'reuse-1': 1,
    'reuse-2': 1,
    'reuse-3': 1,
  });

  const toggleCardState = (id: string) => {
    sounds.playPop();
    setCardStates((prev) => {
      const current = prev[id] ?? 1;
      return { ...prev, [id]: current === 1 ? 0 : 1 };
    });
  };

  return (
    <section id="reuse" className="pt-1 pb-1 sm:pt-4 sm:pb-3 px-3 sm:px-4 max-w-4xl mx-auto flex flex-col items-center">
      {/* Header with reuse.png badge positioned next to section title */}
      <div className="flex flex-col items-center text-center mb-2 sm:mb-3">
        <div className="flex items-center justify-center gap-2.5 sm:gap-4 flex-wrap">
          <img
            src={reuseImg}
            alt="Logo Reuse - Gunakan Kembali"
            className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300 select-none pointer-events-none"
            draggable={false}
          />
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#283618] leading-tight tracking-tight uppercase">
            REUSE
          </h2>
        </div>
        <div className="font-display text-lg sm:text-xl md:text-2xl font-black text-[#283618] tracking-wide mt-0.5">
          Masih Bisa Dipakai Nggak?
        </div>
        <p className="font-body text-[#283618]/90 text-xs sm:text-sm font-semibold mt-0.5 max-w-md mx-auto leading-relaxed">
          Kita mengupayakan barang yang kita miliki selagi masih layak dan aman digunakan.
        </p>
      </div>

      {/* 3 Cards: Skala Proporsional Otomatis agar Muat Utuh Berdampingan di HP */}
      <DesktopScaleContainer designWidth={760} className="w-full my-0">
        <div className="grid grid-cols-3 gap-5 w-full items-stretch">
          {REUSE_ITEMS.map((item) => {
            const isAfter = (cardStates[item.id] ?? 1) === 1;

            return (
              <div key={item.id} className="flex flex-col items-center justify-between h-full w-full">
                {/* Card Container */}
                <div className="relative w-full flex-1 flex flex-col items-center">
                  {/* Main Card with exact minimalist aesthetic */}
                  <div
                    onClick={() => toggleCardState(item.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleCardState(item.id);
                      }
                    }}
                    className={`w-full h-full min-h-[385px] rounded-[28px] p-4.5 flex flex-col justify-between transition-all duration-300 shadow-xl cursor-pointer select-none transform hover:-translate-y-2 hover:shadow-2xl group ${
                      isAfter
                        ? 'bg-[#283618] text-[#FEFAE0]'
                        : 'bg-[#4A3525] text-[#FEFAE0]'
                    }`}
                  >
                    {/* Top Bar inside Card */}
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-black/35 text-white/95">
                          {item.category}
                        </span>
                        <span className="text-[11px] font-medium text-white/70 group-hover:text-white/90 transition-colors">
                          {isAfter ? 'Hasil Kreasi' : 'Bahan Asal'}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <div className="mb-2">
                        <h3 className="font-display text-lg font-black text-white leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-xs text-white/80 font-medium mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>

                      {/* Visual Art Box: Menampilkan foto asli bahan asal vs hasil kreasi */}
                      <div className="my-1.5 h-38 rounded-2xl bg-black/30 flex flex-col items-center justify-center p-2 relative overflow-hidden border border-white/10 transition-colors">
                        {item.id === 'reuse-1' && (
                          !isAfter ? (
                            <div className="flex flex-col items-center justify-center text-center animate-fade-in w-full h-full">
                              <div className="h-24 w-full flex items-center justify-center mb-1">
                                <img
                                  src={botolBekasImg}
                                  alt="Bahan Asal: botol bekas.png"
                                  className="max-h-24 max-w-[90%] w-auto h-auto object-contain drop-shadow-md select-none pointer-events-none"
                                  draggable={false}
                                />
                              </div>
                              <span className="text-xs font-bold text-[#FEFAE0] leading-none">Botol Plastik Bekas</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center text-center animate-fade-in w-full h-full">
                              <div className="h-24 w-full flex items-center justify-center mb-1">
                                <img
                                  src={potBungaImg}
                                  alt="Hasil Kreasi: Pot-Bunga-dari-Botol.png"
                                  className="max-h-24 max-w-[90%] w-auto h-auto object-contain drop-shadow-md select-none pointer-events-none"
                                  draggable={false}
                                />
                              </div>
                              <span className="text-xs font-bold text-white leading-none">Pot Bunga Meja Cantik</span>
                            </div>
                          )
                        )}

                        {item.id === 'reuse-2' && (
                          !isAfter ? (
                            <div className="flex flex-col items-center justify-center text-center animate-fade-in w-full h-full">
                              <div className="h-24 w-full flex items-center justify-center mb-1">
                                <img
                                  src={kardusBekasImg}
                                  alt="Bahan Asal: kardus-bekas.png"
                                  className="max-h-24 max-w-[90%] w-auto h-auto object-contain drop-shadow-md select-none pointer-events-none"
                                  draggable={false}
                                />
                              </div>
                              <span className="text-xs font-bold text-[#FEFAE0] leading-none">Kardus Paket Belanja</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center text-center animate-fade-in w-full h-full">
                              <div className="h-24 w-full flex items-center justify-center mb-1">
                                <img
                                  src={rakBukuKardusImg}
                                  alt="Hasil Kreasi: Rak-Buku-Mini-Dari-Kardus.png"
                                  className="max-h-24 max-w-[90%] w-auto h-auto object-contain drop-shadow-md select-none pointer-events-none"
                                  draggable={false}
                                />
                              </div>
                              <span className="text-xs font-bold text-white leading-none">Rak Buku Mini Meja</span>
                            </div>
                          )
                        )}

                        {item.id === 'reuse-3' && (
                          !isAfter ? (
                            <div className="flex flex-col items-center justify-center text-center animate-fade-in w-full h-full">
                              <div className="h-24 w-full flex items-center justify-center mb-1">
                                <img
                                  src={bajuBayiBekasImg}
                                  alt="Bahan Asal: baju_bayi_bekas.png"
                                  className="max-h-24 max-w-[90%] w-auto h-auto object-contain drop-shadow-md select-none pointer-events-none"
                                  draggable={false}
                                />
                              </div>
                              <span className="text-xs font-bold text-[#FEFAE0] leading-none">Baju Bayi Bekas</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center text-center animate-fade-in w-full h-full">
                              <div className="h-24 w-full flex items-center justify-center mb-1">
                                <img
                                  src={kainDariBajuBekasImg}
                                  alt="Hasil Kreasi: Kain_Dari_Baju_Bekas_Bayi.png"
                                  className="max-h-24 max-w-[90%] w-auto h-auto object-contain drop-shadow-md select-none pointer-events-none"
                                  draggable={false}
                                />
                              </div>
                              <span className="text-xs font-bold text-white leading-none">Lap Serbaguna Katun Halus</span>
                            </div>
                          )
                        )}
                      </div>



                      {/* Deskripsi & Manfaat Kreasi */}
                      <div className="text-xs leading-relaxed mt-1.5">
                        {isAfter ? (
                          <div className="space-y-1.5">
                            <p className="text-white/90 font-normal text-xs leading-snug">
                              {item.after.description}
                            </p>
                            <div className="p-2 rounded-xl bg-white/10 text-xs text-[#FEFAE0] leading-snug">
                              <span><strong>Manfaat:</strong> {item.after.benefit}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1.5">
                            <p className="text-[#FEFAE0]/90 font-normal text-xs leading-snug">
                              {item.before.description}
                            </p>
                            <div className="p-2 rounded-xl bg-black/25 text-xs text-amber-200 flex items-start gap-1.5 leading-snug">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1" />
                              <span>{item.before.drawback}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Minimal subtle hint on hover */}
                    <div className="pt-2 mt-1.5 text-center text-[11px] text-white/70 group-hover:text-white/90 transition-colors border-t border-white/10">
                      <span>{isAfter ? 'Ketuk kartu untuk melihat bahan asal' : 'Ketuk kartu untuk melihat hasil kreasi'}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </DesktopScaleContainer>

      {/* Callout matching 3R DMI.jpg & Screenshot */}
      <div className="w-full text-center mt-2.5 sm:mt-4 mb-0.5 py-2 sm:py-2.5 px-4 rounded-2xl bg-[#283618]/10 border border-[#283618]/20">
        <p className="font-display text-sm sm:text-base md:text-lg font-black text-[#283618] tracking-wide">
          "Siapa bilang barang bekas tidak bisa naik kelas?"
        </p>
      </div>
    </section>
  );
};
