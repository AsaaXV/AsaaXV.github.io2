import React, { useState, useRef } from 'react';
import { RefreshCw } from 'lucide-react';
import { RECYCLE_PHASES } from '../data/content';
import { sounds } from '../utils/audio';
import recycleImg from '../assets/recycle.png';
import bumiImg from '../assets/bumi.png';

export const RecycleSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const wheelRef = useRef<HTMLDivElement>(null);
  const startAngleRef = useRef(0);
  const startRotationRef = useRef(0);
  const lastClickAngleRef = useRef(0);

  // Sound sequence for animated turn
  const playRatchetSequence = (steps = 4) => {
    for (let i = 0; i < steps; i++) {
      setTimeout(() => {
        sounds.playWheelClick();
      }, i * 65);
    }
  };

  const handleNextPhase = () => {
    playRatchetSequence(4);
    const nextIndex = (activeStepIndex + 1) % RECYCLE_PHASES.length;
    setActiveStepIndex(nextIndex);
    // Smooth forward progression by 90 degrees clockwise (never rewind backwards from 4 to 1)
    setWheelRotation((prev) => prev - 90);
  };

  const handleSelectPhase = (index: number) => {
    playRatchetSequence(3);
    setActiveStepIndex(index);
    // Calculate shortest angular distance to target phase so it rotates smoothly without jarring rewinds
    setWheelRotation((prev) => {
      const baseTarget = -index * 90;
      const diff = ((((baseTarget - prev) % 360) + 540) % 360) - 180;
      return prev + diff;
    });
  };

  // Direct Interactive Drag-to-Rotate Semicircular Half Wheel
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!wheelRef.current) return;
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    // For the half wheel container, the center of the full circle is at the bottom baseline
    const centerY = rect.top + rect.height;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);

    startAngleRef.current = angle;
    startRotationRef.current = wheelRotation;
    lastClickAngleRef.current = wheelRotation;
    setIsDragging(true);

    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    sounds.playWheelClick();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !wheelRef.current) return;
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height;
    const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);

    const deltaAngle = currentAngle - startAngleRef.current;
    const newRotation = startRotationRef.current + deltaAngle;
    setWheelRotation(newRotation);

    // Play click sound every 22.5 degrees of rotation
    if (Math.abs(newRotation - lastClickAngleRef.current) >= 22.5) {
      sounds.playWheelClick();
      lastClickAngleRef.current = newRotation;
    }

    // Determine current active phase while rotating (whichever spoke is closest to top 0 deg, 90 deg step)
    const activeIdx = (((Math.round(-newRotation / 90) % 4) + 4) % 4);
    if (activeIdx !== activeStepIndex) {
      setActiveStepIndex(activeIdx);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    // Snap to closest 90 deg increment relative to current rotation so it never jerks or rewinds
    const snappedRotation = Math.round(wheelRotation / 90) * 90;
    const snapIndex = (((Math.round(-snappedRotation / 90) % 4) + 4) % 4);
    setActiveStepIndex(snapIndex);
    setWheelRotation(snappedRotation);
    sounds.playWheelClick();

    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
  };

  const currentPhase = RECYCLE_PHASES[activeStepIndex];

  return (
    <section id="recycle" className="pt-1 pb-1 sm:pt-4 sm:pb-3 px-3 sm:px-4 max-w-4xl mx-auto flex flex-col items-center">
      {/* Header with recycle.png badge positioned next to section title */}
      <div className="flex flex-col items-center text-center mb-2 sm:mb-3">
        <div className="flex items-center justify-center gap-2.5 sm:gap-4 flex-wrap">
          <img
            src={recycleImg}
            alt="Logo Recycle - Ubah Jadi Baru"
            className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300 select-none pointer-events-none"
            draggable={false}
          />
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#283618] leading-tight tracking-tight uppercase">
            RECYCLE
          </h2>
        </div>
        <div className="font-display text-lg sm:text-xl md:text-2xl font-black text-[#283618] tracking-wider uppercase mt-0.5">
          UBAH JADI BARU
        </div>
        <p className="font-body text-[#283618]/90 text-xs sm:text-sm font-semibold mt-0.5 max-w-md mx-auto">
          alur pemrosesan sampah daur ulang menjadi produk baru bernilai guna.
        </p>
      </div>

      {/* Roda Siklus Interaktif Visual (4 Tahap Kuadran 90 Derajat) */}
      <div className="w-full relative flex flex-col items-center">
        {/* SETIR SETENGAH LINGKARAN DENGAN KOTAK ANGKA DI ATASNYA */}
        <div className="relative my-2 flex flex-col items-center select-none w-full max-w-lg">
          
          {/* 1. KOTAK INDIKATOR TAHAP: BAHAN & AKSI DIGABUNGKAN */}
          <div className="w-full max-w-sm sm:max-w-md rounded-3xl bg-[#283618] text-[#FEFAE0] p-4 sm:p-5 shadow-2xl border-4 border-[#1e2a12] flex flex-col items-center relative z-30 transition-all duration-300">
            {/* Header: Indikator Nomor Tahap */}
            <div className="flex items-center justify-between w-full border-b border-white/15 pb-2.5 mb-2.5">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#FEFAE0]/80">
                INDIKATOR TAHAP
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-300 text-[#283618] font-display font-black text-xs sm:text-sm shadow-sm">
                0{currentPhase.step} / 04
              </span>
            </div>

            {/* Gabungan Aksi & Bahan */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
              {/* Kolom Aksi */}
              <div className="bg-black/25 rounded-2xl p-3 border border-white/10 flex flex-col justify-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                  Aksi
                </span>
                <span className="font-display text-sm sm:text-base font-black text-white leading-snug">
                  {currentPhase.action || currentPhase.title}
                </span>
              </div>

              {/* Kolom Bahan */}
              <div className="bg-black/25 rounded-2xl p-3 border border-white/10 flex flex-col justify-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#DDA15E] mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DDA15E]" />
                  Bahan
                </span>
                <span className="font-display text-xs sm:text-sm font-bold text-[#FEFAE0]/95 leading-snug">
                  {currentPhase.material}
                </span>
              </div>
            </div>

            {/* Downward indicator notch pointing to the top number on the half-wheel */}
            <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-[14px] border-t-[#1e2a12]" />
          </div>

          {/* 2. RODA SETENGAH LINGKARAN (4 Kuadran: 0, 90, 180, 270) Sesuai Gambar Referensi */}
          <div className="relative mt-6 flex flex-col items-center w-full">
            
            {/* Semicircular Viewport */}
            <div className="relative w-[330px] h-[170px] min-[390px]:w-[370px] min-[390px]:h-[190px] sm:w-[460px] sm:h-[235px] overflow-hidden flex justify-center items-start">
              {/* Full circular wheel positioned so its top half fills the viewport */}
              <div
                ref={wheelRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                title="Seret roda atau klik angka untuk memilih tahap"
                className={`relative w-[330px] h-[330px] min-[390px]:w-[370px] min-[390px]:h-[370px] sm:w-[460px] sm:h-[460px] rounded-full flex items-center justify-center touch-none select-none ${
                  isDragging ? 'cursor-grabbing' : 'cursor-grab'
                }`}
                style={{ touchAction: 'none' }}
              >
                {/* Rotating Wheel Group */}
                <div
                  className={`absolute inset-0 rounded-full flex items-center justify-center ${
                    isDragging ? 'transition-none' : 'transition-transform duration-500 ease-out'
                  }`}
                  style={{
                    transform: `rotate(${wheelRotation}deg)`,
                  }}
                >
                  {/* Planet Bumi Circular Body (Menggantikan Roda Kemudi) */}
                  <div className="w-full h-full rounded-full relative flex items-center justify-center">
                    {/* Lingkaran Inti Planet Bumi */}
                    <div className="w-[86%] h-[86%] rounded-full relative flex items-center justify-center overflow-hidden shadow-2xl bg-sky-200/15">
                      <img
                        src={bumiImg}
                        alt="Planet Bumi"
                        className="w-full h-full object-contain select-none pointer-events-none"
                        draggable={false}
                      />
                      {/* Ring Atmosfer Halus */}
                      <div className="absolute inset-0 rounded-full border-2 sm:border-3 border-emerald-400/30 ring-4 ring-sky-400/20 pointer-events-none" />
                    </div>

                    {/* Orbit Ring Dashed */}
                    <div className="absolute inset-2 sm:inset-3 rounded-full border-2 border-dashed border-[#606C38]/40 pointer-events-none" />

                    {/* 4 Step Indicator Studs / Numbers on the planet */}
                    {[0, 90, 180, 270].map((angle, i) => {
                      const stepNum = i + 1;
                      const isStepActive = currentPhase.step === stepNum;
                      const rad = (angle - 90) * (Math.PI / 180);
                      const distance = 146; // distance from center in px
                      const x = Math.cos(rad) * distance;
                      const y = Math.sin(rad) * distance;

                      return (
                        <button
                          key={`notch-${stepNum}`}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectPhase(i);
                          }}
                          className={`absolute w-10 h-10 sm:w-11 sm:h-11 rounded-full font-display font-black text-xs sm:text-sm flex items-center justify-center transition-all cursor-pointer ${
                            isStepActive
                              ? 'bg-[#283618] text-white ring-4 ring-amber-400 scale-125 z-20 shadow-xl'
                              : 'bg-[#C4B8A5] text-[#283618] hover:scale-110 z-10 border-2 border-white/60 shadow-md'
                          }`}
                          style={{
                            transform: `translate(${x}px, ${y}px) rotate(${-wheelRotation}deg)`,
                          }}
                          title={`Pilih Tahap 0${stepNum}: ${RECYCLE_PHASES[i]?.title}`}
                        >
                          {stepNum}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* POROS HIJAU STATIS - Tombol Putar */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextPhase();
                }}
                className="absolute bottom-0 z-30 w-20 h-10 sm:w-24 sm:h-12 rounded-t-full bg-[#283618] hover:bg-[#1e2a12] active:scale-95 text-[#FEFAE0] flex flex-col items-center justify-start pt-1 sm:pt-1.5 border-t-3 border-x-3 border-[#1e2a12] cursor-pointer transition-all group"
                title="Klik untuk memutar setir ke tahap berikutnya"
              >
                <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FEFAE0] group-hover:rotate-180 transition-transform duration-500" />
                <span className="font-display text-[8px] sm:text-[9.5px] font-black uppercase tracking-widest text-[#FEFAE0] leading-none mt-0.5">
                  Putar
                </span>
              </button>
            </div>

            {/* 3. PALANG DASAR HORIZONTAL COKELAT DENGAN AKSEN INSET (Sesuai Gambar Referensi) */}
            <div className="w-full max-w-[410px] sm:max-w-[480px] h-4.5 bg-[#433126] rounded-full border-t-2 border-[#5B4436] -mt-2 z-20 flex items-center justify-center relative shadow-sm">
              <div className="w-32 h-1.5 rounded-full bg-[#2e1f17]" />
            </div>

            {/* 4. PENANDA TOMBOL ANGKA 1-4 DI BAWAH PALANG (Warna Persis Gambar Referensi) */}
            <div className="mt-4 flex flex-col items-center select-none">
              <div className="flex items-center gap-3 sm:gap-3.5">
                {RECYCLE_PHASES.map((phase, idx) => {
                  const isActive = activeStepIndex === idx;
                  return (
                    <button
                      key={`step-mark-${phase.step}`}
                      type="button"
                      onClick={() => handleSelectPhase(idx)}
                      className={`rounded-full flex items-center justify-center font-display font-black text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'w-8 h-8 sm:w-9 sm:h-9 bg-[#283618] text-white ring-4 ring-amber-400 scale-110 shadow-md'
                          : 'w-7 h-7 sm:w-8 sm:h-8 bg-[#C4B8A5] text-[#283618] hover:bg-[#b8a995] hover:scale-105'
                      }`}
                      title={`Pilih Tahap 0${phase.step}: ${phase.title}`}
                    >
                      {phase.step}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
