import React, { useState, useEffect, useRef } from 'react';
import { FACTS_DATA } from '../data/content';
import { GrassDivider } from './GrassDivider';
import { DesktopScaleContainer } from './DesktopScaleContainer';

interface AnimatedCountUpProps {
  valueString: string;
  startAnimation: boolean;
  duration?: number;
}

const AnimatedCountUp: React.FC<AnimatedCountUpProps> = ({
  valueString,
  startAnimation,
  duration = 3000,
}) => {
  // Determine number type based on string structure
  const isPercent = valueString.includes('%');
  const hasCommaDecimal = valueString.includes(',');
  const hasDotThousands = !hasCommaDecimal && valueString.includes('.') && valueString.split('.').length === 2 && valueString.split('.')[1].length === 3;

  // Compute numeric target
  let targetNumber = 0;
  let initialFormatted = '0';

  if (isPercent && hasCommaDecimal) {
    // e.g. "40,76%" -> target 40.76
    const cleanNum = parseFloat(valueString.replace('%', '').replace(',', '.').trim()) || 0;
    targetNumber = cleanNum;
    initialFormatted = '0,00%';
  } else if (hasCommaDecimal) {
    // e.g. "25,14" -> target 25.14
    const cleanNum = parseFloat(valueString.replace(',', '.').trim()) || 0;
    targetNumber = cleanNum;
    initialFormatted = '0,00';
  } else if (hasDotThousands) {
    // e.g. "2.000" -> target 2000
    const cleanNum = parseInt(valueString.replace(/\./g, '').trim(), 10) || 0;
    targetNumber = cleanNum;
    initialFormatted = '0';
  } else {
    targetNumber = parseFloat(valueString.replace('%', '').trim()) || 0;
    initialFormatted = isPercent ? '0%' : '0';
  }

  const [displayValue, setDisplayValue] = useState<string>(initialFormatted);

  useEffect(() => {
    if (!startAnimation) return;

    let animationFrameId: number;
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic curve for gradual 3-second deceleration
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentVal = ease * targetNumber;

      if (progress < 1) {
        if (isPercent && hasCommaDecimal) {
          setDisplayValue(`${currentVal.toFixed(2).replace('.', ',')}%`);
        } else if (hasCommaDecimal) {
          setDisplayValue(currentVal.toFixed(2).replace('.', ','));
        } else if (hasDotThousands) {
          setDisplayValue(Math.floor(currentVal).toLocaleString('id-ID'));
        } else {
          setDisplayValue(Math.floor(currentVal).toString() + (isPercent ? '%' : ''));
        }
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(valueString);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [startAnimation, targetNumber, duration, valueString, isPercent, hasCommaDecimal, hasDotThousands]);

  return <span>{displayValue}</span>;
};

export const FactsSection: React.FC = () => {
  const [hasStartedCount, setHasStartedCount] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Trigger stopwatch count-up once when the section enters the viewport
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('IntersectionObserver' in window)) {
      setHasStartedCount(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStartedCount(true);
          observer.disconnect(); // Active once only as requested
        }
      },
      {
        threshold: 0.15,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="facts"
      className="pt-1 pb-1 sm:pt-4 sm:pb-3 px-3 sm:px-4 max-w-4xl mx-auto flex flex-col items-center"
    >
      {/* Header matching 3R DMI.jpg & Screenshot */}
      <div className="text-center mb-2 sm:mb-3">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-[#283618] leading-tight tracking-tight uppercase">
          FAKTA YANG HARUS KAMU KETAHUI
        </h2>
        <p className="font-body text-[#283618]/90 text-xs sm:text-sm font-semibold mt-0.5 max-w-md mx-auto">
          Data riil timbulan dan komposisi sampah yang perlu kita cermati bersama.
        </p>
      </div>

      {/* 3 Stat Cards with Stopwatch Count-up - Skala Proporsional Otomatis agar Muat Utuh di Layar HP */}
      <DesktopScaleContainer designWidth={760} className="w-full my-0">
        <div className="grid grid-cols-3 gap-5 w-full items-stretch">
          {FACTS_DATA.map((fact) => {
            return (
              <div
                key={fact.id}
                className="rounded-[28px] p-6.5 bg-[#5B4436] text-[#FEFAE0] shadow-xl flex flex-col justify-between h-full min-h-[270px] w-full select-none transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center mb-4">
                    <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-black/40 text-white">
                      {fact.badge}
                    </span>
                  </div>

                  {/* Animated Stopwatch Numeric Counter (0 -> Angka Riil selama 3 detik) */}
                  <div className="my-3 min-h-[76px] flex flex-col justify-center">
                    <div className="font-display text-4xl sm:text-5xl font-black tracking-tight tabular-nums leading-none transition-colors drop-shadow text-white group-hover:text-amber-200">
                      <AnimatedCountUp
                        valueString={fact.number}
                        startAnimation={hasStartedCount}
                        duration={3000}
                      />
                    </div>
                    <div className="font-display text-xs sm:text-sm font-black text-amber-300 uppercase tracking-wider mt-1.5">
                      {fact.unit}
                    </div>
                  </div>

                  {/* Teks Fakta Persis dari Pengguna - Tampil Utuh Tanpa Terpotong */}
                  <div className="mt-4 pt-3.5 border-t border-white/20">
                    <p className="font-body text-xs sm:text-sm font-medium text-white/95 leading-relaxed text-left">
                      {fact.title}
                    </p>
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
