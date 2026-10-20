import React from 'react';
import { X, PieChart, Users, MessageSquareQuote, CheckCircle2, Lightbulb, BarChart3, HelpCircle } from 'lucide-react';
import { sounds } from '../utils/audio';

interface AcademicReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AcademicReportModal: React.FC<AcademicReportModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-[#FEFAE0] rounded-3xl shadow-2xl border-4 border-[#283618] text-[#283618] max-h-[92vh] flex flex-col overflow-hidden animate-fade-in">
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-[#283618] text-[#FEFAE0] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FEFAE0] text-[#283618] flex items-center justify-center font-display font-black text-lg">
              3R
            </div>
            <div>
              <h2 className="font-display text-lg sm:text-xl font-black leading-tight text-white">
                Laporan Riset DKV UNM
              </h2>
              <p className="text-xs text-[#FEFAE0]/85 font-semibold">
                Data Hasil Riset Pengguna • Kuesioner Google Form & Wawancara (16 Responden)
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            aria-label="Tutup Laporan"
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body: HANYA DATA HASIL RISET */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Section 1: Demografi & Statistik Utama */}
          <div className="p-5 rounded-2xl bg-white/90 border border-[#283618]/20 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-base font-black text-[#283618] flex items-center gap-2">
                <PieChart className="w-5 h-5 text-[#283618]" />
                <span>Statistik Survei Google Form (16 Responden)</span>
              </h3>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#283618]/10 text-[#283618]">
                Mahasiswa UNM Makassar
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3">
              <div className="p-3 rounded-xl bg-[#FEFAE0] border border-[#283618]/15 text-center">
                <span className="block font-display text-2xl font-black text-[#283618]">87.5%</span>
                <span className="text-[11px] font-bold text-[#283618]/85">Usia 18-20 Tahun</span>
                <p className="text-[10px] text-slate-500 mt-1">Fase adaptasi awal perkuliahan & kos</p>
              </div>

              <div className="p-3 rounded-xl bg-[#FEFAE0] border border-[#283618]/15 text-center">
                <span className="block font-display text-2xl font-black text-[#5B4436]">81.3%</span>
                <span className="text-[11px] font-bold text-[#283618]/85">Mahasiswa Non-DKV</span>
                <p className="text-[10px] text-slate-500 mt-1">Target utama edukasi visual ramah</p>
              </div>

              <div className="p-3 rounded-xl bg-[#FEFAE0] border border-[#283618]/15 text-center">
                <span className="block font-display text-2xl font-black text-rose-800">56.3%</span>
                <span className="text-[11px] font-bold text-[#283618]/85">Kurang Fasilitas</span>
                <p className="text-[10px] text-slate-500 mt-1">Tempat sampah terpilah minim & membingungkan</p>
              </div>

              <div className="p-3 rounded-xl bg-[#FEFAE0] border border-[#283618]/15 text-center">
                <span className="block font-display text-2xl font-black text-emerald-800">100%</span>
                <span className="text-[11px] font-bold text-[#283618]/85">Ingin Visual Menarik</span>
                <p className="text-[10px] text-slate-500 mt-1">Menolak poster kaku penuh teks panjang</p>
              </div>
            </div>
          </div>

          {/* Section 2: Temuan Masalah & Perilaku di Lapangan */}
          <div className="p-5 rounded-2xl bg-white/90 border border-[#283618]/20 shadow-xs">
            <h4 className="font-display text-sm sm:text-base font-black text-[#283618] mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#5B4436]" />
              <span>Temuan Masalah Utama Berdasarkan Riset Lapangan</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-[#5B4436]/10 border border-[#5B4436]/20">
                <div className="w-7 h-7 rounded-lg bg-[#5B4436] text-white flex items-center justify-center font-display text-xs font-bold mb-2">
                  1
                </div>
                <h5 className="font-display text-xs font-black text-[#5B4436] mb-1">
                  Kebingungan Pemilahan
                </h5>
                <p className="text-xs text-[#283618]/90 leading-relaxed">
                  Mahasiswa sering bingung membedakan jenis sampah basah, plastik kering, dan residu jika tidak ada panduan visual langsung di tempat sampah.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#283618]/10 border border-[#283618]/20">
                <div className="w-7 h-7 rounded-lg bg-[#283618] text-white flex items-center justify-center font-display text-xs font-bold mb-2">
                  2
                </div>
                <h5 className="font-display text-xs font-black text-[#283618] mb-1">
                  Kelelahan Informasi (Info Fatigue)
                </h5>
                <p className="text-xs text-[#283618]/90 leading-relaxed">
                  Format poster aturan resmi atau regulasi kampus terlalu panjang dan monoton, sehingga diabaikan mahasiswa saat melintas.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-800/10 border border-emerald-800/20">
                <div className="w-7 h-7 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-display text-xs font-bold mb-2">
                  3
                </div>
                <h5 className="font-display text-xs font-black text-emerald-900 mb-1">
                  Butuh Aksi Nyata Praktis
                </h5>
                <p className="text-xs text-[#283618]/90 leading-relaxed">
                  Mahasiswa membutuhkan tips 3R konkret yang dapat langsung dipraktikkan di kamar kos dan kampus tanpa biaya tambahan.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Suara & Kutipan Langsung Responden (Voice of User) */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-black uppercase tracking-wider text-[#5B4436] flex items-center gap-1.5">
              <MessageSquareQuote className="w-4 h-4" />
              <span>Insight & Kutipan Langsung Responden</span>
            </h4>

            <div className="space-y-2.5">
              <div className="p-4 rounded-2xl bg-white/90 border-l-4 border-[#5B4436] text-xs sm:text-sm text-slate-800 shadow-xs">
                <p className="italic leading-relaxed">
                  "Yang bikin bosan itu layout yang tidak membuat mata terarah, desain terlalu banyak teks yang dipanjang-panjangkan demi terlihat penuh, warna monoton, dan UI template default."
                </p>
                <div className="mt-2 flex items-center justify-between text-xs font-bold text-[#5B4436]">
                  <span>— Akbar (Responden Non-DKV, 19 Tahun)</span>
                  <span className="text-[10px] font-semibold text-slate-500">Evaluasi UI/UX</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border-l-4 border-[#283618] text-xs sm:text-sm text-slate-800 shadow-xs">
                <p className="italic leading-relaxed">
                  "Apabila tidak ada keterangan yang dikasih di atas tempat sampah, saya bingung jenis sampah mana yang harus dibuang ke mana."
                </p>
                <div className="mt-2 flex items-center justify-between text-xs font-bold text-[#283618]">
                  <span>— Rani (Responden Non-DKV, 20 Tahun)</span>
                  <span className="text-[10px] font-semibold text-slate-500">Masalah Lapangan</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border-l-4 border-emerald-700 text-xs sm:text-sm text-slate-800 shadow-xs">
                <p className="italic leading-relaxed">
                  "Visual yang paling sesuai adalah ilustrasi/infografis sederhana dan ramah, menampilkan contoh yang dekat dengan keseharian mahasiswa."
                </p>
                <div className="mt-2 flex items-center justify-between text-xs font-bold text-emerald-800">
                  <span>— Keyra (Responden DKV, 20 Tahun)</span>
                  <span className="text-[10px] font-semibold text-slate-500">Preferensi Desain</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Implikasi Riset ke Solusi Desain Microsite */}
          <div className="p-5 rounded-2xl bg-[#5B4436]/10 border border-[#283618]/20">
            <h4 className="font-display text-sm sm:text-base font-black text-[#283618] mb-2.5 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#5B4436]" />
              <span>Rekomendasi Desain Berdasarkan Hasil Riset</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#283618]">
              <div className="p-3 rounded-xl bg-white/80 border border-[#283618]/15">
                <span className="font-display font-black text-[#283618] block mb-1">
                  1. Scrollytelling Ringan
                </span>
                <p className="leading-relaxed text-[#283618]/85">
                  Format satu halaman (single scroll) tanpa menu berlapis, memudahkan mahasiswa mencerna informasi dalam hitungan detik.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/80 border border-[#283618]/15">
                <span className="font-display font-black text-[#283618] block mb-1">
                  2. Aset Gambar Asli & Gamifikasi
                </span>
                <p className="leading-relaxed text-[#283618]/85">
                  Menghadirkan tempat sampah interaktif dengan file aksi yang keluar saat dibuka, membuat proses belajar menjadi menyenangkan.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/80 border border-[#283618]/15">
                <span className="font-display font-black text-[#283618] block mb-1">
                  3. Contoh Dekat Keseharian
                </span>
                <p className="leading-relaxed text-[#283618]/85">
                  Fokus pada tumbler, totebag, botol skincare, dan kardus paket online yang akrab bagi kehidupan mahasiswa kampus.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3.5 bg-[#5B4436]/15 border-t border-[#283618]/20 flex items-center justify-between shrink-0">
          <span className="text-xs font-bold text-[#283618]">
            Data Hasil Riset Perancangan Media Interaktif 3R • DKV UNM 2026
          </span>
          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="px-5 py-2 rounded-full bg-[#283618] text-[#FEFAE0] font-display text-xs font-bold hover:bg-[#1e2a12] transition cursor-pointer"
          >
            Tutup Laporan
          </button>
        </div>
      </div>
    </div>
  );
};
