import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ReduceSection } from './components/ReduceSection';
import { ReuseSection } from './components/ReuseSection';
import { RecycleSection } from './components/RecycleSection';
import { FactsSection } from './components/FactsSection';
import { ActionSection } from './components/ActionSection';
import { AcademicReportModal } from './components/AcademicReportModal';
import { SecretEasterEggModal } from './components/SecretEasterEggModal';
import { EarthRescueGameModal } from './components/EarthRescueGameModal';
import { GrassDivider } from './components/GrassDivider';

export default function App() {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isSecretOpen, setIsSecretOpen] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false);

  // Secret Easter Egg Key Listener: Mengetik "unm", "3r", atau "rahasia" membuka ruang rahasia
  useEffect(() => {
    let keyBuffer = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 10) {
        keyBuffer = keyBuffer.slice(-10);
      }
      if (keyBuffer.endsWith('unm') || keyBuffer.endsWith('3r') || keyBuffer.endsWith('rahasia')) {
        setIsSecretOpen(true);
        keyBuffer = '';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleScrollToReduce = () => {
    const el = document.getElementById('reduce');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#FEFAE0] text-[#283618] font-body flex flex-col items-center">
      {/* Container wrapper: fluid responsive layout */}
      <div className="w-full max-w-5xl mx-auto">
        {/* Top Navbar */}
        <Navbar
          onOpenReport={() => setIsReportOpen(true)}
          onOpenSecret={() => setIsSecretOpen(true)}
        />

        {/* Main Content Sections with bottom padding for fixed grass */}
        <main className="w-full pb-16 sm:pb-24">
          {/* Section 0: Hero 3R */}
          <HeroSection
            onStartExplore={handleScrollToReduce}
            onOpenGame={() => setIsGameOpen(true)}
          />

          {/* Section 1: REDUCE */}
          <ReduceSection />

          {/* Section 2: REUSE */}
          <ReuseSection />

          {/* Section 3: RECYCLE */}
          <RecycleSection />

          {/* Section 4: FAKTA DAN DATA */}
          <FactsSection />

          {/* Section 5: AJAKAN AKSI */}
          <ActionSection onOpenSecret={() => setIsSecretOpen(true)} />
        </main>
      </div>

      {/* 1 Navigasi Rumput Fixed di Bagian Paling Bawah yang Mengikuti saat Scroll */}
      <div className="fixed bottom-0 left-0 right-0 w-full z-30 pointer-events-none select-none overflow-hidden leading-none">
        <GrassDivider variant="bottom" className="w-full text-[#283618] opacity-95 drop-shadow-md" />
      </div>

      {/* Academic Project & Team Document Modal */}
      <AcademicReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />

      {/* FITUR RAHASIA: Ruang Rahasia DKV UNM (Easter Egg) */}
      <SecretEasterEggModal
        isOpen={isSecretOpen}
        onClose={() => setIsSecretOpen(false)}
      />

      {/* Game Penyelamatan Bumi: Earth Pollution Defense Arcade */}
      <EarthRescueGameModal
        isOpen={isGameOpen}
        onClose={() => setIsGameOpen(false)}
      />
    </div>
  );
}
