import React, { useState, useEffect } from 'react';
import { Trophy, Sparkles, X, Award, RotateCcw, CheckCircle2, ShieldCheck, Heart, Share2, Copy } from 'lucide-react';
import { sounds } from '../utils/audio';

interface SecretEasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WasteItem {
  name: string;
  type: 'organik' | 'anorganik';
  icon: string;
}

const GAME_ITEMS: WasteItem[] = [
  { name: 'Botol Plastik PET', type: 'anorganik', icon: '🧴' },
  { name: 'Sisa Nasi Kuning Kantin', type: 'organik', icon: '🍚' },
  { name: 'Kardus Paket Olshop', type: 'anorganik', icon: '📦' },
  { name: 'Kulit Jeruk & Pisang', type: 'organik', icon: '🍌' },
  { name: 'Cup Es Kopi Plastik', type: 'anorganik', icon: '🥤' },
  { name: 'Kertas HVS Bekas Skripsi', type: 'anorganik', icon: '📄' },
  { name: 'Daun Kering Halaman Pinisi', type: 'organik', icon: '🍂' },
  { name: 'Kaleng Minuman Bersoda', type: 'anorganik', icon: '🥫' },
  { name: 'Sisa Tulang Ayam Lalapan', type: 'organik', icon: '🍗' },
  { name: 'Sedotan Plastik Jajan', type: 'anorganik', icon: '🥤' },
];

export const SecretEasterEggModal: React.FC<SecretEasterEggModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'arcade' | 'ktm' | 'secrets'>('arcade');

  // Mini-Arcade State
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  // KTM Digital State
  const [studentName, setStudentName] = useState('Muh. Fatur');
  const [studentNIM, setStudentNIM] = useState('220806501001');
  const [studentDept, setStudentDept] = useState('Desain Komunikasi Visual (DKV)');
  const [copied, setCopied] = useState(false);

  // Play fanfare when opened
  useEffect(() => {
    if (isOpen) {
      sounds.playFanfare();
    }
  }, [isOpen]);

  // Mini-Arcade Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isPlaying && timeLeft === 0) {
      setIsPlaying(false);
      setGameOver(true);
      sounds.playFanfare();
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const startArcade = () => {
    sounds.playPop();
    setScore(0);
    setCombo(0);
    setTimeLeft(15);
    setGameOver(false);
    setIsPlaying(true);
    setCurrentItemIndex(Math.floor(Math.random() * GAME_ITEMS.length));
  };

  const handleAnswer = (chosenType: 'organik' | 'anorganik') => {
    if (!isPlaying) return;
    const current = GAME_ITEMS[currentItemIndex];
    if (current.type === chosenType) {
      sounds.playSuccess();
      setScore((prev) => prev + 10 + combo * 2);
      setCombo((prev) => prev + 1);
      setFeedback('correct');
    } else {
      sounds.playPop();
      setCombo(0);
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      setCurrentItemIndex((prev) => (prev + 1) % GAME_ITEMS.length);
    }, 200);
  };

  const copyKTM = () => {
    sounds.playPop();
    const text = `🎖️ KARTU ANGGOTA GREEN WARRIOR UNM 2026\nNama: ${studentName}\nNIM: ${studentNIM}\nFakultas: ${studentDept}\nStatus: Terverifikasi Pejuang Kampus Bebas Sampah #3R_UNM`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  const currentItem = GAME_ITEMS[currentItemIndex];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-3xl bg-[#FEFAE0] shadow-2xl border-4 border-[#283618] overflow-hidden flex flex-col animate-rotate-expand max-h-[92vh]"
      >
        {/* Header Ruang Rahasia */}
        <div className="bg-[#283618] text-[#FEFAE0] p-4 sm:p-5 flex items-center justify-between border-b-4 border-[#1e2a12] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FEFAE0] text-[#283618] flex items-center justify-center shadow-md animate-bounce">
              <Trophy className="w-5 h-5 text-[#283618]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[9.5px] font-black uppercase tracking-widest text-[#FEFAE0]/80">
                <Sparkles className="w-3.5 h-3.5" />
                <span>EASTER EGG DKV UNM</span>
              </div>
              <h3 className="font-display text-base sm:text-xl font-black text-white leading-tight">
                Ruang Rahasia Green Warrior
              </h3>
            </div>
          </div>

          <span className="text-[10px] sm:text-xs font-black bg-[#1e2a12] text-emerald-200 px-3 py-1 rounded-full border border-[#FEFAE0]/30">
            Unlocked 🔓
          </span>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b-2 border-[#5B4436]/20 bg-[#5B4436]/10 px-4 pt-2 gap-2 text-xs font-bold text-[#283618] shrink-0">
          <button
            onClick={() => { sounds.playPop(); setActiveTab('arcade'); }}
            className={`px-3 py-2 rounded-t-xl transition-all cursor-pointer ${
              activeTab === 'arcade'
                ? 'bg-[#283618] text-white font-black border-t-2 border-x-2 border-[#1e2a12]'
                : 'hover:bg-white/40'
            }`}
          >
            🎮 Mini-Arcade (15 Detik)
          </button>
          <button
            onClick={() => { sounds.playPop(); setActiveTab('ktm'); }}
            className={`px-3 py-2 rounded-t-xl transition-all cursor-pointer ${
              activeTab === 'ktm'
                ? 'bg-[#283618] text-white font-black border-t-2 border-x-2 border-[#1e2a12]'
                : 'hover:bg-white/40'
            }`}
          >
            💳 KTM Hijau Digital
          </button>
          <button
            onClick={() => { sounds.playPop(); setActiveTab('secrets'); }}
            className={`px-3 py-2 rounded-t-xl transition-all cursor-pointer ${
              activeTab === 'secrets'
                ? 'bg-[#283618] text-white font-black border-t-2 border-x-2 border-[#1e2a12]'
                : 'hover:bg-white/40'
            }`}
          >
            🤫 Catatan Rahasia UNM
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {/* TAB 1: MINI-ARCADE */}
          {activeTab === 'arcade' && (
            <div className="flex flex-col items-center text-center">
              {!isPlaying && !gameOver && (
                <div className="py-4">
                  <div className="text-4xl mb-2">⚡</div>
                  <h4 className="font-display text-lg sm:text-xl font-black text-[#283618]">
                    Tantangan Pilah Kilat 15 Detik
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5B4436] max-w-md mx-auto mt-1 mb-5">
                    Uji refleksmu sebagai pejuang lingkungan! Tentukan jenis sampah apakah <strong>Organik</strong> atau <strong>Anorganik</strong> secepat mungkin.
                  </p>
                  <button
                    onClick={startArcade}
                    className="px-8 py-3 rounded-full bg-[#5B4436] hover:bg-[#433126] text-white font-display text-sm font-black shadow-xl cursor-pointer transition-all hover:scale-105 active:scale-95 border-2 border-[#FEFAE0]"
                  >
                    Mulai Main Sekarang! 🚀
                  </button>
                </div>
              )}

              {isPlaying && (
                <div className="w-full max-w-md">
                  {/* Top Stats Bar */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-[#283618] text-white font-display text-sm font-black mb-4 shadow">
                    <div className="flex items-center gap-1.5">
                      <span>Waktu:</span>
                      <span className={`text-base tabular-nums ${timeLeft <= 5 ? 'text-red-300 animate-ping' : 'text-amber-200'}`}>
                        {timeLeft}s
                      </span>
                    </div>
                    <div>
                      Skor: <span className="text-amber-200 text-base">{score}</span>
                    </div>
                    {combo > 1 && (
                      <div className="text-[11px] bg-amber-400 text-[#283618] px-2 py-0.5 rounded-full animate-bounce">
                        Combo x{combo}!
                      </div>
                    )}
                  </div>

                  {/* Waste Item Card */}
                  <div
                    className={`p-6 rounded-3xl bg-white shadow-xl border-4 transition-all duration-200 flex flex-col items-center justify-center my-3 ${
                      feedback === 'correct'
                        ? 'border-emerald-500 bg-emerald-50 scale-105'
                        : feedback === 'wrong'
                        ? 'border-red-500 bg-red-50 animate-shake'
                        : 'border-[#5B4436]'
                    }`}
                  >
                    <div className="text-6xl mb-2">{currentItem.icon}</div>
                    <div className="font-display text-lg font-black text-[#283618]">
                      {currentItem.name}
                    </div>
                    <span className="text-[11px] text-stone-500 mt-0.5">Pilih wadah yang benar:</span>
                  </div>

                  {/* 2 Answer Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <button
                      onClick={() => handleAnswer('organik')}
                      className="p-3.5 rounded-2xl bg-[#283618] hover:bg-[#1e2a12] text-white font-display text-xs sm:text-sm font-black shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95 border-2 border-[#1e2a12] flex flex-col items-center gap-1"
                    >
                      <span className="text-xl">🍃</span>
                      <span>ORGANIK</span>
                      <span className="text-[9px] opacity-80 font-normal">Sisa Makanan & Daun</span>
                    </button>

                    <button
                      onClick={() => handleAnswer('anorganik')}
                      className="p-3.5 rounded-2xl bg-[#5B4436] hover:bg-[#433126] text-white font-display text-xs sm:text-sm font-black shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95 border-2 border-[#433126] flex flex-col items-center gap-1"
                    >
                      <span className="text-xl">♻️</span>
                      <span>ANORGANIK</span>
                      <span className="text-[9px] opacity-80 font-normal">Plastik, Kertas & Logam</span>
                    </button>
                  </div>
                </div>
              )}

              {gameOver && (
                <div className="py-3">
                  <div className="text-5xl mb-2">🎉</div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#5B4436]">Waktu Habis!</span>
                  <h4 className="font-display text-2xl font-black text-[#283618] mt-1">
                    Skor Akhirmu: <span className="text-[#283618]">{score}</span>
                  </h4>
                  <p className="text-xs text-[#5B4436] mt-1 max-w-sm mx-auto">
                    {score >= 80
                      ? 'Luar biasa! Kamu resmi berpredikat Eco-Champion Pinisi Bintang 5! 🌟'
                      : 'Keren! Terus latih kebiasaan memilah sampah sehari-hari di kampus! 🌿'}
                  </p>
                  <button
                    onClick={startArcade}
                    className="mt-4 px-6 py-2.5 rounded-full bg-[#283618] hover:bg-[#1e2a12] text-white font-display text-xs font-black shadow cursor-pointer transition-all hover:scale-105 active:scale-95 border border-[#FEFAE0] inline-flex items-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Main Lagi</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: KTM HIJAU DIGITAL */}
          {activeTab === 'ktm' && (
            <div className="flex flex-col items-center">
              <p className="text-xs text-[#5B4436] text-center mb-3">
                Ketik nama dan identitasmu untuk mendapatkan <strong>Kartu Tanda Mahasiswa Ramah Lingkungan</strong> edisi khusus DKV UNM:
              </p>

              {/* Form Input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg mb-4 text-xs font-bold text-[#283618]">
                <div>
                  <label className="block text-[10px] text-[#5B4436] mb-0.5">Nama Mahasiswa:</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border-2 border-[#283618]/30 bg-white font-medium"
                    placeholder="Nama Lengkap"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[#5B4436] mb-0.5">NIM Mahasiswa:</label>
                  <input
                    type="text"
                    value={studentNIM}
                    onChange={(e) => setStudentNIM(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border-2 border-[#283618]/30 bg-white font-medium"
                    placeholder="Nomor Induk Mahasiswa"
                  />
                </div>
              </div>

              {/* The Virtual ID Card */}
              <div className="w-full max-w-lg rounded-3xl bg-gradient-to-br from-[#283618] to-[#1c2711] text-[#FEFAE0] p-5 shadow-2xl border-4 border-[#FEFAE0] relative overflow-hidden">
                {/* Background watermarks */}
                <div className="absolute -right-10 -bottom-10 opacity-10 text-9xl font-display font-black text-white pointer-events-none">
                  UNM
                </div>

                <div className="flex items-center justify-between border-b border-[#FEFAE0]/30 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#FEFAE0] text-[#283618] font-black flex items-center justify-center text-xs">
                      UNM
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-amber-200">
                        UNIVERSITAS NEGERI MAKASSAR
                      </div>
                      <div className="text-[8px] text-white/80">KARTU ANGGOTA GREEN WARRIOR 2026</div>
                    </div>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-amber-200" />
                </div>

                <div className="grid grid-cols-3 gap-3 items-center">
                  <div className="col-span-2 space-y-1">
                    <div>
                      <span className="text-[8.5px] uppercase tracking-wider text-[#FEFAE0]/70 block">Nama Lengkap</span>
                      <span className="font-display text-sm font-black text-white">{studentName || 'Mahasiswa UNM'}</span>
                    </div>
                    <div>
                      <span className="text-[8.5px] uppercase tracking-wider text-[#FEFAE0]/70 block">NIM / Angkatan</span>
                      <span className="text-xs font-mono font-bold text-amber-200">{studentNIM || '220806501001'}</span>
                    </div>
                    <div>
                      <span className="text-[8.5px] uppercase tracking-wider text-[#FEFAE0]/70 block">Program Studi</span>
                      <span className="text-xs text-white/90 font-medium">{studentDept}</span>
                    </div>
                  </div>

                  {/* Golden Badge Stamp */}
                  <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-black/20 border border-[#FEFAE0]/30 text-center">
                    <Award className="w-8 h-8 text-amber-300 mb-0.5" />
                    <span className="text-[8px] font-black uppercase text-amber-200">VERIFIED</span>
                    <span className="text-[7.5px] text-white/80 leading-tight">Eco-Champion</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#FEFAE0]/20 flex items-center justify-between text-[8px] text-[#FEFAE0]/80">
                  <span>ID: #UNM-3R-DKV-2026</span>
                  <span className="text-amber-200 font-bold">#BebasSampahUNM</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={copyKTM}
                  className="px-5 py-2 rounded-full bg-[#5B4436] hover:bg-[#433126] text-white font-display text-xs font-black shadow cursor-pointer transition-all hover:scale-105 active:scale-95 border border-[#FEFAE0] flex items-center gap-1.5"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin!' : 'Salin Teks Komitmen'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: CATATAN RAHASIA UNM */}
          {activeTab === 'secrets' && (
            <div className="space-y-3 text-xs text-[#283618]">
              <div className="p-3.5 rounded-2xl bg-white/70 border border-[#283618]/20 shadow-sm">
                <div className="font-display font-black text-sm text-[#283618] flex items-center gap-1.5 mb-1">
                  <span>📍 Titik Refill Air Gratis Kampus UNM</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#5B4436]">
                  Tahukah kamu? Ada dispenser air minum layak konsumsi di <strong>Lobi Gedung Pinisi Lt. 1</strong> dan <strong>Perpustakaan Pusat UNM</strong>. Membawa tumbler sendiri bisa langsung menghemat minimal Rp 10.000 setiap hari kuliah!
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/70 border border-[#283618]/20 shadow-sm">
                <div className="font-display font-black text-sm text-[#5B4436] flex items-center gap-1.5 mb-1">
                  <span>☕ Kafe Ramah Tumbler Sekitar Pettarani</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#5B4436]">
                  Banyak kedai kopi di sekitar Jl. Pendidikan dan Jl. A.P. Pettarani memberikan <strong>diskon potongan harga Rp 2.000 – Rp 5.000</strong> jika kamu membawa tumbler sendiri saat *take-away*. Tanyakan barista sebelum memesan!
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#283618]/10 border border-[#283618]/20 shadow-sm text-center">
                <div className="font-display font-bold text-xs text-[#283618] flex items-center justify-center gap-1 mb-0.5">
                  <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                  <span>Pesan dari Tim Kreator DKV UNM:</span>
                </div>
                <p className="text-[11px] italic text-[#283618]">
                  "Kampanye ini kami rancang dengan harapan kecil: semoga halaman kampus kita selalu bersih, teduh, dan menjadi kebanggaan kita bersama. Terima kasih sudah menjelajahi hingga ke ruang rahasia ini!"
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Unified Bottom Footer Button (Tutup Ruang Rahasia) */}
        <div className="p-3 bg-[#5B4436]/15 border-t-2 border-[#283618]/20 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#5B4436] hover:bg-[#433126] text-white font-display text-xs sm:text-sm font-black shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95 border-2 border-[#FEFAE0]/50 flex items-center gap-2 group"
          >
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <X className="w-3.5 h-3.5 stroke-[3] text-[#FEFAE0] group-hover:text-white" />
            </div>
            <span>Tutup Ruang Rahasia</span>
            <span className="text-[10px] text-amber-200 font-semibold">(Esc)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
