import React from 'react';

// Import aset gambar PNG asli secara langsung melalui modul Vite
import totebagImg from '../assets/totebag.png';
import tumblerImg from '../assets/tumbler.png';
import sedotanImg from '../assets/sedotan-besi.png';
import folder1Img from '../assets/folder1.png';
import folder2Img from '../assets/folder2.png';
import folder3Img from '../assets/folder3.png';
import sampah1Img from '../assets/sampah1.png';
import sampah2Img from '../assets/sampah2.png';
import tongsampahAtasImg from '../assets/tongsampah-atas.png';
import tongsampahBawahImg from '../assets/tongsampah-bawah.png';

// Fallback SVGs
import totebagSvg from '../assets/totebag.svg';
import tumblerSvg from '../assets/tumbler.svg';
import sedotanSvg from '../assets/sedotan-besi.svg';
import folder1Svg from '../assets/folder1.svg';
import folder2Svg from '../assets/folder2.svg';
import folder3Svg from '../assets/folder3.svg';
import sampah1Svg from '../assets/sampah1.svg';
import sampah2Svg from '../assets/sampah2.svg';
import tongsampahAtasSvg from '../assets/tongsampah-atas.svg';
import tongsampahBawahSvg from '../assets/tongsampah-bawah.svg';

/**
 * Komponen yang menggunakan 10 ASET ASLI dari pengguna dengan fallback otomatis:
 */

// 1. TOTEBAG ASLI (totebag.png)
export const TotebagIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <img
    src={totebagImg}
    alt="Aset Asli Totebag 3R"
    className={`object-contain select-none transition-transform duration-300 ${className}`}
    draggable={false}
    onError={(e) => {
      e.currentTarget.src = totebagSvg;
    }}
  />
);

// 2. TUMBLER ASLI (tumbler.png)
export const TumblerIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <img
    src={tumblerImg}
    alt="Aset Asli Tumbler 3R"
    className={`object-contain select-none transition-transform duration-300 ${className}`}
    draggable={false}
    onError={(e) => {
      e.currentTarget.src = tumblerSvg;
    }}
  />
);

// 3. SEDOTAN BESI ASLI (sedotan besi.png)
export const SedotanBesiIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <img
    src={sedotanImg}
    alt="Aset Asli Sedotan Besi 3R"
    className={`object-contain select-none transition-transform duration-300 ${className}`}
    draggable={false}
    onError={(e) => {
      e.currentTarget.src = sedotanSvg;
    }}
  />
);

// 4. FOLDER DOKUMEN ASLI (folder1.png, folder2.png, folder3.png)
export const FolderIllustration: React.FC<{
  variant?: 1 | 2 | 3;
  className?: string;
  isOpened?: boolean;
}> = ({ variant = 1, className = 'w-16 h-16', isOpened = false }) => {
  const src = variant === 2 ? folder2Img : variant === 3 ? folder3Img : folder1Img;
  const fallback = variant === 2 ? folder2Svg : variant === 3 ? folder3Svg : folder1Svg;

  return (
    <img
      src={src}
      alt={`Aset Asli Folder ${variant}`}
      className={`object-contain select-none transition-transform duration-300 ${
        isOpened ? '-translate-y-2 scale-105 drop-shadow-lg' : 'drop-shadow-md'
      } ${className}`}
      draggable={false}
      onError={(e) => {
        e.currentTarget.src = fallback;
      }}
    />
  );
};

// 5. SAMPAH TERPILAH ASLI (sampah1.png & sampah2.png)
export const SampahClusterIllustration: React.FC<{ className?: string; flipped?: boolean }> = ({
  className = 'w-24 h-14',
  flipped = false,
}) => {
  const src = flipped ? sampah2Img : sampah1Img;
  const fallback = flipped ? sampah2Svg : sampah1Svg;

  return (
    <img
      src={src}
      alt="Aset Asli Sampah Terpilah"
      className={`object-contain select-none pointer-events-none ${flipped ? '-scale-x-100' : ''} ${className}`}
      draggable={false}
      onError={(e) => {
        e.currentTarget.src = fallback;
      }}
    />
  );
};

// 6. TONG SAMPAH INTERAKTIF LENGKAP MENGGUNAKAN ASET ASLI
// - tongsampah atas.png (Tutup Tong Seng yang terpasang pas di atas badan tong)
// - tongsampah bawah.png (Badan Tong Seng)
// - folder1.png, folder2.png, folder3.png (3 File Aksi yang otomatis keluar dari dalam tong)
// - sampah1.png & sampah2.png (Tumpukan Sampah Terpilah di Dasar)
export const InteractiveTrashBinIllustration: React.FC<{
  isOpen?: boolean;
  onToggle?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  selectedFolder?: string | null;
  onSelectFolder?: (folderId: string) => void;
  onOpenShare?: () => void;
  className?: string;
}> = ({
  isOpen = true,
  onToggle,
  onMouseEnter,
  onMouseLeave,
  selectedFolder,
  onSelectFolder,
  onOpenShare,
  className = 'w-96 max-w-full',
}) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative flex flex-col items-center select-none ${className}`}
    >
      {/* 3 File Aksi Asli (folder1, folder2, folder3) yang KELUAR saat kursor mengarah / dibuka */}
      <div className="relative w-72 sm:w-80 h-28 -mb-12 z-10 flex justify-center items-end gap-1 px-4">
        {/* Folder 1: Reduce Guide (folder1.png) */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelectFolder?.('act-1');
          }}
          className={`transform transition-all duration-500 cursor-pointer ${
            isOpen
              ? selectedFolder === 'act-1'
                ? '-translate-y-8 scale-115 z-30 -rotate-6'
                : '-translate-y-4 hover:-translate-y-7 hover:scale-110 -rotate-6 z-10'
              : 'translate-y-16 opacity-0 scale-75 pointer-events-none'
          }`}
          title="Buka Dokumen Aksi 01 (Reduce)"
        >
          <FolderIllustration
            variant={1}
            className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-lg"
            isOpened={selectedFolder === 'act-1'}
          />
        </div>

        {/* Folder 2: Reuse Guide (folder2.png) */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelectFolder?.('act-2');
          }}
          className={`transform transition-all duration-500 cursor-pointer ${
            isOpen
              ? selectedFolder === 'act-2'
                ? '-translate-y-10 scale-120 z-30 rotate-2 -mx-3'
                : '-translate-y-6 hover:-translate-y-9 hover:scale-110 rotate-2 z-20 -mx-3'
              : 'translate-y-16 opacity-0 scale-75 pointer-events-none'
          }`}
          title="Buka Dokumen Aksi 02 (Reuse)"
        >
          <FolderIllustration
            variant={2}
            className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-xl"
            isOpened={selectedFolder === 'act-2'}
          />
        </div>

        {/* Folder 3: Recycle Guide (folder3.png) */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelectFolder?.('act-3');
          }}
          className={`transform transition-all duration-500 cursor-pointer ${
            isOpen
              ? selectedFolder === 'act-3'
                ? '-translate-y-8 scale-115 z-30 rotate-8'
                : '-translate-y-4 hover:-translate-y-7 hover:scale-110 rotate-8 z-10'
              : 'translate-y-16 opacity-0 scale-75 pointer-events-none'
          }`}
          title="Buka Dokumen Aksi 03 (Recycle)"
        >
          <FolderIllustration
            variant={3}
            className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-lg"
            isOpened={selectedFolder === 'act-3'}
          />
        </div>
      </div>

      {/* Tutup Tong Sampah Asli (tongsampah atas.png) - Terpasang pas di atas badan tong */}
      <div
        onClick={onToggle}
        className={`relative z-20 cursor-pointer transition-all duration-500 transform ${
          isOpen
            ? '-translate-y-5 rotate-12 scale-105 drop-shadow-xl'
            : 'translate-y-2 rotate-0 drop-shadow-md'
        }`}
        title="Klik untuk membuka/menutup tong sampah"
      >
        <img
          src={tongsampahAtasImg}
          alt="Aset Asli Tutup Tong Sampah"
          className="w-64 sm:w-72 h-auto drop-shadow-xl select-none pointer-events-none"
          draggable={false}
          onError={(e) => {
            e.currentTarget.src = tongsampahAtasSvg;
          }}
        />
      </div>

      {/* Badan Tong Sampah Asli (tongsampah bawah.png) */}
      <div
        onClick={onToggle}
        className="relative z-15 -mt-4 flex flex-col items-center cursor-pointer"
        title="Klik untuk membuka/menutup tong sampah"
      >
        <img
          src={tongsampahBawahImg}
          alt="Aset Asli Badan Tong Sampah"
          className="w-64 sm:w-72 h-auto drop-shadow-2xl select-none pointer-events-none"
          draggable={false}
          onError={(e) => {
            e.currentTarget.src = tongsampahBawahSvg;
          }}
        />

        {/* Big "SHARE" Badge in Front of Bin matching 3R DMI.jpg */}
        <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenShare?.();
            }}
            className="px-7 py-3 rounded-full bg-[#283618] hover:bg-[#1e2a12] active:scale-95 border-3 border-[#FEFAE0] shadow-2xl flex items-center justify-center transform hover:scale-110 transition-all cursor-pointer select-none group"
            title="Buka Komitmen & Bagikan Aksi 3R"
          >
            <span className="font-display text-lg sm:text-xl font-black text-[#FEFAE0] tracking-wider group-hover:scale-105 transition-transform">
              SHARE
            </span>
          </button>
        </div>
      </div>

      {/* Clustered Trash around base using sampah1.png & sampah2.png */}
      <div className="relative -mt-8 w-80 sm:w-96 flex justify-between items-center pointer-events-none z-20 px-2">
        <SampahClusterIllustration className="w-28 sm:w-36 h-auto -ml-6 drop-shadow-md" />
        <SampahClusterIllustration className="w-28 sm:w-36 h-auto -mr-6 drop-shadow-md" flipped />
      </div>
    </div>
  );
};

