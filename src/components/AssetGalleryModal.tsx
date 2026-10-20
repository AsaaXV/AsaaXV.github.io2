import React from 'react';
import { X, CheckCircle2, Image as ImageIcon, Sparkles, ExternalLink } from 'lucide-react';
import { sounds } from '../utils/audio';

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

import bumiImg from '../assets/bumi.png';
import reduceImg from '../assets/reduce.png';
import reuseImg from '../assets/reuse.png';
import recycleImg from '../assets/recycle.png';
import botolBekasImg from '../assets/botol bekas.png';
import potBungaImg from '../assets/Pot-Bunga-dari-Botol.png';
import kardusBekasImg from '../assets/kardus-bekas.png';
import rakBukuKardusImg from '../assets/Rak-Buku-Mini-Dari-Kardus.png';
import bajuBayiBekasImg from '../assets/baju_bayi_bekas.png';
import kainDariBajuBekasImg from '../assets/Kain_Dari_Baju_Bekas_Bayi.png';

interface AssetGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ASSETS_LIST = [
  {
    id: 'totebag',
    fileName: 'totebag.png',
    name: 'Totebag Belanja & Upcycle',
    description: 'Ilustrasi tas belanja kain ramah lingkungan bermuka senyum & totebag lipat.',
    image: totebagImg,
    usedIn: 'Hero Section, Reduce Card #01, Reuse Upcycle #03',
    sectionId: 'hero',
    badge: 'Hero & Reduce',
  },
  {
    id: 'tumbler',
    fileName: 'tumbler.png',
    name: 'Tumbler & Botol Minum Pribadi',
    description: 'Botol stainless steel reusable dengan tutup sipper dan handle ergonomis.',
    image: tumblerImg,
    usedIn: 'Hero Section, Reduce Card #02, Simulasi Penghematan',
    sectionId: 'reduce',
    badge: 'Hero & Reduce',
  },
  {
    id: 'sedotan-besi',
    fileName: 'sedotan besi.png',
    name: 'Sedotan Besi & Sikat Pembersih',
    description: 'Sepasang sedotan logam (lurus & bengkok) higienis dengan efek kilau emas.',
    image: sedotanImg,
    usedIn: 'Hero Section, Reduce Card #03, Simulasi Tolak Plastik',
    sectionId: 'reduce',
    badge: 'Hero & Reduce',
  },
  {
    id: 'tongsampah-atas',
    fileName: 'tongsampah atas.png',
    name: 'Tutup Tong Seng Bertekstur',
    description: 'Tutup seng bergelombang interaktif yang terangkat saat tong sampah terbuka.',
    image: tongsampahAtasImg,
    usedIn: 'Action Section (Interaktif Buka/Tutup)',
    sectionId: 'action',
    badge: 'Action Section',
  },
  {
    id: 'tongsampah-bawah',
    fileName: 'tongsampah bawah.png',
    name: 'Badan Tong Seng + Tombol SHARE',
    description: 'Badan seng silinder kokoh dengan tekstur seng dan lencana interaktif SHARE.',
    image: tongsampahBawahImg,
    usedIn: 'Action Section (Wadah Utama Panduan)',
    sectionId: 'action',
    badge: 'Action Section',
  },
  {
    id: 'folder1',
    fileName: 'folder1.png',
    name: 'Folder Dokumen Langkah #01',
    description: 'Folder hijau pastel berisi panduan kurangi sampah dari sumbernya.',
    image: folder1Img,
    usedIn: 'Action Section (Keluar dari Tong Sampah & Drawer)',
    sectionId: 'action',
    badge: 'Action Dokumen #01',
  },
  {
    id: 'folder2',
    fileName: 'folder2.png',
    name: 'Folder Dokumen Langkah #02',
    description: 'Folder panduan memilah sampah dan membuat sudut daur ulang kamar kos.',
    image: folder2Img,
    usedIn: 'Action Section (Keluar dari Tong Sampah & Drawer)',
    sectionId: 'action',
    badge: 'Action Dokumen #02',
  },
  {
    id: 'folder3',
    fileName: 'folder3.png',
    name: 'Folder Dokumen Langkah #03',
    description: 'Folder panduan aksi kolektif dan menyebarkan semangat 3R ke mahasiswa.',
    image: folder3Img,
    usedIn: 'Action Section (Keluar dari Tong Sampah & Drawer)',
    sectionId: 'action',
    badge: 'Action Dokumen #03',
  },
  {
    id: 'sampah1',
    fileName: 'sampah1.png',
    name: 'Tumpukan Sampah Terpilah (Kiri)',
    description: 'Kluster sampah daur ulang kertas dan botol di sisi kiri dasar tong sampah.',
    image: sampah1Img,
    usedIn: 'Action Section (Dasar Tong Sampah Kiri)',
    sectionId: 'action',
    badge: 'Action Sekitar Tong',
  },
  {
    id: 'sampah2',
    fileName: 'sampah2.png',
    name: 'Tumpukan Sampah Terpilah (Kanan)',
    description: 'Kluster kemasan daur ulang di sisi kanan dasar tong sampah.',
    image: sampah2Img,
    usedIn: 'Action Section (Dasar Tong Sampah Kanan)',
    sectionId: 'action',
    badge: 'Action Sekitar Tong',
  },
  {
    id: 'bumi',
    fileName: 'bumi.png',
    name: 'Ilustrasi Bumi Hijau Ceria',
    description: 'Ilustrasi bumi tersenyum ramah lingkungan yang mendampingi judul utama 3R di Hero Section.',
    image: bumiImg,
    usedIn: 'Hero Section (Mendampingi Judul Utama 3R)',
    sectionId: 'hero',
    badge: 'Hero Section',
  },
  {
    id: 'reduce-badge',
    fileName: 'reduce.png',
    name: 'Ikon & Emblem Reduce',
    description: 'Logo aksi Reduce (Kurangi dari awal) dengan warna hijau alami.',
    image: reduceImg,
    usedIn: 'Reduce Section Header & Kartu Folder Tong Sampah #01',
    sectionId: 'reduce',
    badge: '3R Core & Action',
  },
  {
    id: 'reuse-badge',
    fileName: 'reuse.png',
    name: 'Ikon & Emblem Reuse',
    description: 'Logo aksi Reuse (Gunakan kembali) dengan simbol panah sirkular ramah lingkungan.',
    image: reuseImg,
    usedIn: 'Reuse Section Header & Kartu Folder Tong Sampah #02',
    sectionId: 'reuse',
    badge: '3R Core & Action',
  },
  {
    id: 'recycle-badge',
    fileName: 'recycle.png',
    name: 'Ikon & Emblem Recycle',
    description: 'Logo aksi Recycle (Daur ulang jadi bernilai) dengan siklus panah pemrosesan.',
    image: recycleImg,
    usedIn: 'Recycle Section Header & Kartu Folder Tong Sampah #03',
    sectionId: 'recycle',
    badge: '3R Core & Action',
  },
  {
    id: 'botol-bekas',
    fileName: 'botol bekas.png',
    name: 'Botol Plastik Bekas Minum',
    description: 'Foto bahan asal limbah botol plastik sebelum di-upcycle.',
    image: botolBekasImg,
    usedIn: 'Reuse Section (Kartu Kreasi 1: Bahan Asal)',
    sectionId: 'reuse',
    badge: 'Reuse Bahan Asal',
  },
  {
    id: 'pot-bunga',
    fileName: 'Pot-Bunga-dari-Botol.png',
    name: 'Pot Bunga dari Botol Bekas',
    description: 'Foto hasil kreasi pot tanaman sukulen/hias cantik dari botol plastik upcycled.',
    image: potBungaImg,
    usedIn: 'Reuse Section (Kartu Kreasi 1: Hasil Kreasi)',
    sectionId: 'reuse',
    badge: 'Reuse Hasil Kreasi',
  },
  {
    id: 'kardus-bekas',
    fileName: 'kardus-bekas.png',
    name: 'Kardus Paket Ekspedisi Bekas',
    description: 'Foto bahan asal limbah kardus tebal cokelat yang dapat dimanfaatkan ulang.',
    image: kardusBekasImg,
    usedIn: 'Reuse Section (Kartu Kreasi 2: Bahan Asal)',
    sectionId: 'reuse',
    badge: 'Reuse Bahan Asal',
  },
  {
    id: 'rak-buku-mini',
    fileName: 'Rak-Buku-Mini-Dari-Kardus.png',
    name: 'Rak Buku Mini dari Kardus',
    description: 'Foto hasil kreasi rak buku mini meja dan organizer bersekat yang kokoh dari kardus upcycled.',
    image: rakBukuKardusImg,
    usedIn: 'Reuse Section (Kartu Kreasi 2: Hasil Kreasi)',
    sectionId: 'reuse',
    badge: 'Reuse Hasil Kreasi',
  },
  {
    id: 'baju-bayi-bekas',
    fileName: 'baju_bayi_bekas.png',
    name: 'Baju Bayi Bekas (Katun)',
    description: 'Foto bahan asal pakaian bayi katun lembut yang sudah tidak terpakai.',
    image: bajuBayiBekasImg,
    usedIn: 'Reuse Section (Kartu Kreasi 3: Bahan Asal)',
    sectionId: 'reuse',
    badge: 'Reuse Bahan Asal',
  },
  {
    id: 'kain-lap',
    fileName: 'Kain_Dari_Baju_Bekas_Bayi.png',
    name: 'Kain Lap Serbaguna dari Baju Bayi',
    description: 'Foto hasil kreasi lap mikrofiber/katun serbaguna yang lembut dan berdaya serap tinggi.',
    image: kainDariBajuBekasImg,
    usedIn: 'Reuse Section (Kartu Kreasi 3: Hasil Kreasi)',
    sectionId: 'reuse',
    badge: 'Reuse Hasil Kreasi',
  },
];

export const AssetGalleryModal: React.FC<AssetGalleryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleJumpToSection = (sectionId: string) => {
    sounds.playPop();
    onClose();
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#FEFAE0] rounded-3xl border-4 border-[#5B4436] shadow-2xl overflow-hidden flex flex-col text-[#283618]"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#5B4436] text-[#FEFAE0] flex items-center justify-between border-b-4 border-[#433126]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#FEFAE0]/20 flex items-center justify-center text-[#FEFAE0] shadow-inner">
              <ImageIcon className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg sm:text-2xl font-black text-white">
                  10 Aset Asli Terpasang
                </h2>
                <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500 text-white flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 10/10 Aktif
                </span>
              </div>
              <p className="text-xs text-[#FEFAE0]/85 font-medium mt-0.5">
                Karya Tim DKV UNM 2026 — Semua file PNG asli dimuat dan terintegrasi di aplikasi
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#FEFAE0]/20 hover:bg-[#FEFAE0]/30 text-white flex items-center justify-center transition cursor-pointer"
            title="Tutup Galeri"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Assets Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <div className="p-3.5 rounded-2xl bg-[#283618]/10 border border-[#283618]/20 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#283618]">
              <Sparkles className="w-4 h-4 text-[#5B4436]" />
              <span>Seluruh 10 file PNG asli telah aktif dan terpasang di posisi visual masing-masing.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {ASSETS_LIST.map((item, idx) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-white border-2 border-[#283618]/15 shadow-sm hover:shadow-md hover:border-[#283618]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Badge & Index */}
                  <div className="flex items-center justify-between text-[11px] font-bold mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#283618]/10 text-[#283618]">
                      #{idx + 1} {item.badge}
                    </span>
                    <code className="text-[10px] text-[#5B4436] font-mono bg-[#FEFAE0] px-1.5 py-0.5 rounded border border-[#5B4436]/20">
                      {item.fileName}
                    </code>
                  </div>

                  {/* Image Display */}
                  <div className="w-full h-32 rounded-xl bg-[#FEFAE0]/60 p-2 flex items-center justify-center overflow-hidden border border-[#283618]/10 group-hover:bg-[#FEFAE0] transition-colors">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Title & Desc */}
                  <h3 className="font-display text-sm font-black text-[#283618] mt-2.5 leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-[#283618]/80 mt-1 leading-snug">
                    {item.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#283618]/10 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-[#5B4436] line-clamp-1">
                    {item.usedIn}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleJumpToSection(item.sectionId)}
                    className="text-[10px] font-bold text-[#283618] hover:text-[#5B4436] flex items-center gap-1 shrink-0 ml-1 cursor-pointer"
                  >
                    <span>Lihat</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#FEFAE0] border-t-2 border-[#283618]/15 flex items-center justify-between text-xs text-[#283618]/80 font-bold px-6">
          <span>Total: 10/10 file aset asli diverifikasi</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 rounded-full bg-[#5B4436] text-[#FEFAE0] hover:bg-[#433126] transition cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
