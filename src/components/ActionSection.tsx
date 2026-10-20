import React, { useState } from 'react';
import { FolderOpen, Share2, CheckCircle2, ChevronRight, X, ChevronLeft } from 'lucide-react';
import { ACTION_FOLDERS } from '../data/content';
import { ShareModal } from './ShareModal';
import { sounds } from '../utils/audio';

import tongsampahAtasImg from '../assets/tongsampah-atas.png';
import tongsampahBawahImg from '../assets/tongsampah-bawah.png';
import folder1Img from '../assets/folder1.png';
import folder2Img from '../assets/folder2.png';
import folder3Img from '../assets/folder3.png';
// Fallback SVG assets to ensure 100% reliability
import tongsampahAtasSvg from '../assets/tongsampah-atas.svg';
import tongsampahBawahSvg from '../assets/tongsampah-bawah.svg';
import folder1Svg from '../assets/folder1.svg';
import folder2Svg from '../assets/folder2.svg';
import folder3Svg from '../assets/folder3.svg';

interface ActionSectionProps {
  onOpenSecret?: () => void;
}

export const ActionSection: React.FC<ActionSectionProps> = ({ onOpenSecret }) => {
  // Initially null so guide card only appears when a document/step is pressed
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [completedFolders, setCompletedFolders] = useState<Record<string, boolean>>({
    'act-1': true,
  });
  // Bin starts closed when website is opened, and opens smoothly on click/interaction
  const [isLidOpen, setIsLidOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const toggleFolder = (id: string) => {
    sounds.playFlip();
    // Ensure bin remains open when interacting with folders
    setIsLidOpen(true);
    setSelectedFolderId((prev) => (prev === id ? null : id));
    setCompletedFolders((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const handleOpenShare = () => {
    sounds.playPop();
    setIsShareModalOpen(true);
  };

  const toggleLid = () => {
    sounds.playPop();
    setIsLidOpen((prev) => !prev);
  };

  const activeFolderIndex = ACTION_FOLDERS.findIndex((f) => f.id === selectedFolderId);
  const activeFolder = activeFolderIndex !== -1 ? ACTION_FOLDERS[activeFolderIndex] : null;

  const handleNextStep = () => {
    if (activeFolderIndex < ACTION_FOLDERS.length - 1) {
      toggleFolder(ACTION_FOLDERS[activeFolderIndex + 1].id);
    }
  };

  const handlePrevStep = () => {
    if (activeFolderIndex > 0) {
      toggleFolder(ACTION_FOLDERS[activeFolderIndex - 1].id);
    }
  };

  return (
    <section id="action" className="pt-3 sm:pt-8 pb-0 flex flex-col items-center overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 w-full flex flex-col items-center">
        {/* Header matching 3R DMI.jpg */}
        <div className="text-center mb-2.5 sm:mb-5">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#283618] leading-tight tracking-tight uppercase">
            MULAI DARI KAMPUS,
          </h2>
          <div className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-[#283618] tracking-wider uppercase mt-0.5">
            MULAI DARI SEKARANG
          </div>
          <p className="font-body text-[#283618]/90 text-xs sm:text-sm font-semibold mt-2 max-w-md mx-auto">
            Kamu nggak perlu jadi aktivis buat mulai peduli. Cukup 3 langkah kecil ini.
          </p>
        </div>

        {/* 3 Step Action Pill Bar - 3 Columns on mobile & desktop */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-3 w-full max-w-2xl mb-4 sm:mb-6 items-stretch">
          {ACTION_FOLDERS.map((folder) => {
            const isSelected = selectedFolderId === folder.id;
            const isDone = !!completedFolders[folder.id];

            return (
              <button
                key={folder.id}
                type="button"
                onClick={() => toggleFolder(folder.id)}
                className={`p-1.5 sm:p-3 h-11 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-between transition-all cursor-pointer border-2 text-left ${
                  isSelected
                    ? 'bg-[#283618] text-[#FEFAE0] border-[#1e2a12] shadow-md scale-[1.02]'
                    : isDone
                    ? 'bg-[#FEFAE0] text-[#283618] border-[#283618] hover:bg-[#f6f0cb]'
                    : 'bg-[#5B4436] text-[#FEFAE0] border-[#433126]'
                }`}
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <div
                    className={`w-4.5 h-4.5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center font-display text-[9px] sm:text-xs font-black shrink-0 ${
                      isDone ? 'bg-[#283618] text-white' : 'bg-white/20 text-white'
                    }`}
                  >
                    {folder.stepNumber}
                  </div>
                  <span className="font-display text-[8.5px] sm:text-xs font-bold truncate">
                    Tahap {folder.stepNumber}
                  </span>
                </div>
                {isDone && <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-300 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Detailed Folder Drawer/Card when selected - positioned right ABOVE the trash bin and BELOW Tahap 1-2-3 buttons */}
        {activeFolder && (
          <div className="w-full max-w-2xl mt-2 mb-6 p-5 sm:p-6 rounded-3xl bg-white/95 border-2 border-[#283618]/25 shadow-xl text-[#283618] animate-fade-in transition-all">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#283618]/20 mb-3">
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-[#283618]" />
                  <span className="font-display text-sm sm:text-base font-black text-[#283618] uppercase tracking-wide">
                    Panduan Langkah #{activeFolder.stepNumber}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#283618]/15 text-[#283618]">
                    Aksi Mahasiswa UNM
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedFolderId(null)}
                    className="w-7 h-7 rounded-full bg-[#283618]/15 hover:bg-[#283618]/30 text-[#283618] flex items-center justify-center transition cursor-pointer"
                    title="Tutup Panduan"
                  >
                    <X className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              <h3 className="font-display text-lg sm:text-xl font-black text-[#283618] mb-1">
                {activeFolder.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#283618]/80 font-semibold mb-4">
                {activeFolder.summary}
              </p>

              <div className="space-y-2 mb-4">
                {activeFolder.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs font-medium text-[#283618]">
                    <CheckCircle2 className="w-4 h-4 text-[#283618] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-2xl bg-[#FEFAE0] border border-[#283618]/20 text-xs italic text-[#283618] mb-4">
                {activeFolder.quote}
              </div>

              {/* Step Navigation Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-[#283618]/15">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={activeFolderIndex === 0}
                  className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl transition ${
                    activeFolderIndex === 0
                      ? 'opacity-40 cursor-not-allowed text-[#283618]/50'
                      : 'hover:bg-[#283618]/10 text-[#283618] cursor-pointer'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Langkah Sebelumnya</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={activeFolderIndex === ACTION_FOLDERS.length - 1}
                  className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl transition ${
                    activeFolderIndex === ACTION_FOLDERS.length - 1
                      ? 'opacity-40 cursor-not-allowed text-[#283618]/50'
                      : 'bg-[#283618] text-[#FEFAE0] hover:bg-[#1e2a12] cursor-pointer shadow-sm'
                  }`}
                >
                  <span>Langkah Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}



        {/* The Iconic Illustrated Trash Bin using authentic assets */}
        <div className="relative mt-16 sm:mt-22 md:mt-28 my-4 pt-4 sm:pt-6 flex flex-col items-center select-none">
          {/* Lid of the trash bin (when open: leans slanted on right flank touching the ground) */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              toggleLid();
            }}
            className={`relative z-30 -mb-8 sm:-mb-10 transition-all duration-700 cubic-bezier(0.34, 1.25, 0.64, 1) cursor-pointer select-none ${
              isLidOpen ? 'drop-shadow-2xl' : 'drop-shadow-md hover:scale-[1.02]'
            }`}
            style={{
              transform: isLidOpen
                ? 'translate(clamp(142px, 22.5vw, 190px), clamp(195px, 29vw, 252px)) rotate(76deg)'
                : 'translate(0px, 0px) rotate(0deg)',
              transformOrigin: 'center center',
            }}
            title={isLidOpen ? 'Klik untuk menutup tong sampah' : 'Klik untuk membuka tong sampah'}
          >
            <img
              src={tongsampahAtasImg}
              alt="Aset Asli Tutup Tong Sampah"
              className="w-56 sm:w-72 h-auto select-none pointer-events-none drop-shadow-md"
              draggable={false}
              onError={(e) => {
                e.currentTarget.src = tongsampahAtasSvg;
              }}
            />
          </div>

          {/* Main Trash Bin Body & Cavity with Embedded Action Folders */}
          <div
            onClick={toggleLid}
            className="relative z-20 flex flex-col items-center cursor-pointer"
            title={isLidOpen ? 'Klik untuk menutup tong sampah' : 'Klik untuk membuka tong sampah'}
          >
            {/* Dark Interior Cavity at Mouth of the Bin */}
            <div
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-60 h-7 sm:h-9 bg-[#202914]/75 rounded-full blur-[1px] transition-opacity duration-300 pointer-events-none z-10 ${
                isLidOpen ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* 3 Action Folders: Menumpuk ke atas dengan gap rapat, masuk ke dalam bibir mulut tong sampah */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 flex flex-col items-center -space-y-[65px] sm:-space-y-[82px] md:-space-y-[94px] transition-all duration-500 ease-out z-15 ${
                isLidOpen
                  ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto'
                  : 'translate-y-24 sm:translate-y-32 opacity-0 scale-75 pointer-events-none'
              }`}
              style={{
                bottom: 'calc(100% - clamp(48px, 7.5vw, 62px))',
              }}
            >
              {ACTION_FOLDERS.map((folder, index) => {
                const isSelected = selectedFolderId === folder.id;
                const folderImg = index === 0 ? folder1Img : index === 1 ? folder2Img : folder3Img;
                const folderSvg = index === 0 ? folder1Svg : index === 1 ? folder2Svg : folder3Svg;

                // Subtle upright tilt: nearly vertical with organic variation
                const baseRotation = index === 0 ? '-rotate-1' : index === 1 ? 'rotate-1' : '-rotate-2';
                // Cascading z-index: bottom folder sits behind front rim (z-20), selected folder rises
                const folderZIndex = isSelected ? 'z-[18]' : index === 0 ? 'z-[11]' : index === 1 ? 'z-[12]' : 'z-[13]';

                return (
                  <button
                    key={folder.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFolder(folder.id);
                    }}
                    className={`group relative flex flex-col items-center cursor-pointer transition-all duration-300 focus:outline-none ${folderZIndex} ${baseRotation} ${
                      isSelected
                        ? '-translate-y-2 sm:-translate-y-3 scale-105'
                        : 'hover:-translate-y-1 hover:scale-102'
                    }`}
                    title={folder.title}
                  >
                    {/* Pure Folder Graphic: Clean, without any step number or badge */}
                    <div
                      className={`relative rounded-2xl p-1 transition-all ${
                        isSelected
                          ? 'ring-2 sm:ring-3 ring-[#283618] bg-white/25 drop-shadow-2xl'
                          : 'drop-shadow-lg group-hover:drop-shadow-2xl'
                      }`}
                    >
                      <img
                        src={folderImg}
                        alt={folder.title}
                        className="w-28 sm:w-34 md:w-38 h-auto object-contain select-none pointer-events-none"
                        draggable={false}
                        onError={(e) => {
                          e.currentTarget.src = folderSvg;
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Badan Tong Sampah Asli (Full & Utuh, tanpa rumput dan tanpa sampah) */}
            <div className="relative flex flex-col items-center">
              <img
                src={tongsampahBawahImg}
                alt="Aset Asli Badan Tong Sampah"
                className="relative z-20 w-56 sm:w-72 h-auto object-contain select-none pointer-events-none drop-shadow-2xl"
                draggable={false}
                onError={(e) => {
                  e.currentTarget.src = tongsampahBawahSvg;
                }}
              />

              {/* The Iconic "SHARE" Button */}
              <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenShare();
                  }}
                  className="group px-7 py-2.5 sm:px-8 sm:py-3 rounded-full bg-[#283618] hover:bg-[#1e2a12] text-white font-display text-2xl sm:text-3xl font-black tracking-wider uppercase shadow-2xl active:scale-95 transition-all transform hover:scale-105 cursor-pointer border-2 border-[#FEFAE0] flex items-center gap-2"
                >
                  <span>SHARE</span>
                  <Share2 className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Closing Quote from 3R DMI.jpg & Image 7 */}
        <div className="text-center my-10 max-w-lg mx-auto">
          <p className="font-display text-lg sm:text-xl md:text-2xl font-black text-[#283618] leading-snug tracking-wide">
            Bumi ini dipinjam dari anak cucu kita.
            <br />
            Yuk jaga bareng-bareng!
          </p>
        </div>
      </div>

      {/* Footer Banner with rounded top corners matching Image 7 */}
      <footer className="w-full bg-[#5B4436] text-[#FEFAE0] pt-6 pb-8 px-4 text-center rounded-t-[32px] sm:rounded-t-[40px] shadow-2xl relative z-20">
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center gap-1">
          <p className="font-display text-sm sm:text-base font-black tracking-wider">
            Craft 4 Earth - DKV UNM 2024
          </p>
          <p className="text-[11px] text-[#FEFAE0]/75">
            Mata Kuliah Desain Media Interaktif • Fakultas Seni dan Desain • Universitas Negeri Makassar
          </p>
        </div>
      </footer>

      {/* Share & Pledge Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </section>
  );
};
