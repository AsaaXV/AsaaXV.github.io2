import React, { useState, useEffect } from 'react';
import { Trophy, Sparkles, X, Award, RotateCcw, CheckCircle2, ShieldCheck, Heart, Copy, Play } from 'lucide-react';
import { sounds } from '../utils/audio';

interface SecretEasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WasteItem {
  name: string;
  type: 'organik' | 'anorganik';
  icon: string;
  desc: string;
}

const GAME_ITEMS: WasteItem[] = [
  { name: 'Botol Plastik PET', type: 'anorganik', icon: '🧴', desc: 'Kemasan minuman air mineral' },
  { name: 'Sisa Nasi Kuning Kantin', type: 'organik', icon: '🍚', desc: 'Sisa makanan sarapan' },
  { name: 'Kardus Paket Olshop', type: 'anorganik', icon: '📦', desc: 'Kotak karton kiriman paket' },
  { name: 'Kulit Jeruk & Pisang', type: 'organik', icon: '🍌', desc: 'Sisa kulit buah segar' },
  { name: 'Cup Es Kopi Plastik', type: 'anorganik', icon: '🥤', desc: 'Gelas plastik minuman dingin' },
  { name: 'Kertas HVS Bekas Skripsi', type: 'anorganik', icon: '📄', desc: 'Lembaran kertas print bekas' },
  { name: 'Daun Kering Halaman Pinisi', type: 'organik', icon: '🍂', desc: 'Guguran daun pohon kampus' },
  { name: 'Kaleng Minuman Bersoda', type: 'anorganik', icon: '🥫', desc: 'Kaleng aluminium kemasan' },
  { name: 'Sisa Tulang Ayam Lalapan', type: 'organik', icon: '🍗', desc: 'Sisa makanan lauk pauk' },
  { name: 'Sedotan Plastik Minuman', type: 'anorganik', icon: '🥤', desc: 'Sedotan plastik sekali pakai' },
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
    }, 180);
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
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-5 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg md:max-w-xl rounded-3xl bg-[#FEFAE0] shadow-2xl border-4 border-[#283618] overflow-hidden flex flex-col h-[92dvh] max-h-[680px] text-[#283618]"
      >
        {/* Header Ruang Rahasia */}
        <div className="bg-[#283618] text-[#FEFAE0] px-3.5 sm:px-5 py-3 flex items-center justify-between border-b-3 border-[#1e2a12] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FEFAE0] text-[#283618] flex items-center justify-center shadow-xs">
              <Trophy className="w-4 h-4 text-[#283618]" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-[#FEFAE0]/80">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>EASTER EGG DKV UNM</span>
              </div>
              <h3 className="font-display text-sm sm:text-base font-black text-white leading-tight">
                Ruang Rahasia Green Warrior
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-[#5B4436] hover:bg-[#433126] text-[#FEFAE0] transition active:scale-95 border border-[#FEFAE0]/30 cursor-pointer"
            title="Tutup Ruang Rahasia"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Responsive Tab Navigation (Optimized for Mobile HP) */}
        <div className="flex border-b-2 border-[#283618]/15 bg-[#5B4436]/10 px-2 pt-1.5 gap-1.5 text-xs font-bold text-[#283618] shrink-0 select-none overflow-x-auto no-scrollbar">
          <button
            onClick={() => { sounds.playPop(); setActiveTab('arcade'); }}
            className={`flex-1 py-2 px-2.5 rounded-t-xl transition-all cursor-pointer whitespace-nowrap text-center ${
              activeTab === 'arcade'
                ? 'bg-[#283618] text-[#FEFAE0] font-display font-black shadow-xs'
                : 'text-[#283618] hover:bg-white/40 font-semibold'
            }`}
          >
            <span className="sm:hidden">🎮 Kuis Pilah</span>
            <span className="hidden sm:inline">🎮 Pilah Kilat (15 Detik)</span>
          </button>
          <button
            onClick={() => { sounds.playPop(); setActiveTab('ktm'); }}
            className={`flex-1 py-2 px-2.5 rounded-t-xl transition-all cursor-pointer whitespace-nowrap text-center ${
              activeTab === 'ktm'
                ? 'bg-[#283618] text-[#FEFAE0] font-display font-black shadow-xs'
                : 'text-[#283618] hover:bg-white/40 font-semibold'
            }`}
          >
            <span className="sm:hidden">💳 KTM Digital</span>
            <span className="hidden sm:inline">💳 KTM Hijau Digital</span>
          </button>
          <button
            onClick={() => { sounds.playPop(); setActiveTab('secrets'); }}
            className={`flex-1 py-2 px-2.5 rounded-t-xl transition-all cursor-pointer whitespace-nowrap text-center ${
              activeTab === 'secrets'
                ? 'bg-[#283618] text-[#FEFAE0] font-display font-black shadow-xs'
                : 'text-[#283618] hover:bg-white/40 font-semibold'
            }`}
          >
            <span className="sm:hidden">🤫 Catatan UNM</span>
            <span className="hidden sm:inline">🤫 Catatan Rahasia UNM</span>
          </button>
        </div>

        {/* Content Body: Flexible & Smoothly Scrollable on HP */}
        <div className="p-3.5 sm:p-5 overflow-y-auto flex-1 flex flex-col">
          {/* TAB 1: MINI-ARCADE KUIS PILAH KILAT */}
          {activeTab === 'arcade' && (
            <div className="flex flex-col items-center text-center my-auto">
              {!isPlaying && !gameOver && (
                <div className="py-2 max-w-sm mx-auto">
                  <div className="w-14 h-14 rounded-2xl bg-[#5B4436]/15 border-2 border-[#5B4436]/30 flex items-center justify-center text-2xl mx-auto mb-2 shadow-xs">
                    ⚡
                  </div>
                  <h4 className="font-display text-base sm:text-lg font-black text-[#283618]">
                    Tantangan Pilah Kilat 15 Detik
                  </h4>
                  <p className="text-xs text-[#5B4436] mt-1 mb-4 leading-relaxed font-medium">
                    Uji kecepatan refleksmu! Tentukan apakah sampah kampus ini termasuk <strong>Organik</strong> atau <strong>Anorganik</strong> secepat mungkin.
                  </p>
                  <button
                    type="button"
                    onClick={startArcade}
                    className="px-6 py-3 rounded-full bg-[#5B4436] hover:bg-[#433126] text-[#FEFAE0] font-display text-xs sm:text-sm font-black shadow-md cursor-pointer transition-all hover:scale-105 active:scale-95 border-2 border-[#FEFAE0] inline-flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Mulai Main Sekarang!</span>
                  </button>
                </div>
              )}

              {isPlaying && (
                <div className="w-full max-w-sm mx-auto flex flex-col">
                  {/* Top Stats Bar */}
                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#283618] text-[#FEFAE0] font-display text-xs font-black mb-3 shadow-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-[#FEFAE0]/80">WAKTU:</span>
                      <span className={`text-sm tabular-nums ${timeLeft <= 5 ? 'text-rose-300 animate-ping' : 'text-amber-200'}`}>
                        {timeLeft}s
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#FEFAE0]/80 mr-1">SKOR:</span>
                      <span className="text-amber-200 text-sm">{score}</span>
                    </div>
                    {combo > 1 && (
                      <div className="text-[10px] bg-amber-400 text-[#283618] px-2 py-0.5 rounded-full font-black animate-bounce">
                        {combo}x Combo!
                      </div>
                    )}
                  </div>

                  {/* Tactile Waste Item Card */}
                  <div
                    className={`p-5 rounded-3xl bg-[#F7F5EB] shadow-md border-3 transition-all duration-150 flex flex-col items-center justify-center my-1 select-none ${
                      feedback === 'correct'
                        ? 'border-emerald-600 bg-emerald-50 scale-102'
                        : feedback === 'wrong'
                        ? 'border-rose-600 bg-rose-50 animate-shake'
                        : 'border-[#283618]/30'
                    }`}
                  >
                    <div className="text-5xl mb-1.5">{currentItem.icon}</div>
                    <div className="font-display text-base font-black text-[#283618]">
                      {currentItem.name}
                    </div>
                    <span className="text-[10px] text-[#5B4436] mt-0.5 font-medium">{currentItem.desc}</span>
                  </div>

                  {/* Dual Thumb Action Buttons (Designed for fast thumb tapping on phones) */}
                  <div className="grid grid-cols-2 gap-2.5 mt-3 select-none">
                    <button
                      type="button"
                      onClick={() => handleAnswer('organik')}
                      className="p-3 sm:p-3.5 rounded-2xl bg-[#283618] hover:bg-[#1e2a12] text-[#FEFAE0] font-display text-xs font-black shadow-md cursor-pointer transition-all active:translate-y-1 border-b-4 border-[#16200d] flex flex-col items-center gap-0.5 active:bg-[#16200d]"
                    >
                      <span className="text-lg">🍃</span>
                      <span>ORGANIK</span>
                      <span className="text-[9px] text-[#FEFAE0]/80 font-normal">Sisa Makanan & Daun</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAnswer('anorganik')}
                      className="p-3 sm:p-3.5 rounded-2xl bg-[#5B4436] hover:bg-[#433126] text-[#FEFAE0] font-display text-xs font-black shadow-md cursor-pointer transition-all active:translate-y-1 border-b-4 border-[#3c2a21] flex flex-col items-center gap-0.5 active:bg-[#3c2a21]"
                    >
                      <span className="text-lg">♻️</span>
                      <span>ANORGANIK</span>
                      <span className="text-[9px] text-[#FEFAE0]/80 font-normal">Plastik & Kertas</span>
                    </button>
                  </div>
                </div>
              )}

              {gameOver && (
                <div className="py-2 max-w-sm mx-auto">
                  <div className="w-12 h-12 rounded-2xl bg-[#283618]/15 border-2 border-[#283618]/30 flex items-center justify-center text-2xl mx-auto mb-1.5">
                    🎉
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#5B4436]">Waktu 15 Detik Habis!</span>
                  <h4 className="font-display text-xl font-black text-[#283618] mt-0.5">
                    Skor Akhir: <span className="text-[#283618]">{score}</span>
                  </h4>
                  <p className="text-xs text-[#5B4436] mt-1 max-w-xs mx-auto leading-relaxed font-medium">
                    {score >= 80
                      ? 'Luar biasa! Refleks pemilahanmu setingkat Eco-Champion UNM! 🌟'
                      : 'Keren! Terus latih kebiasaan memilah sampah sehari-hari di kampus! 🌿'}
                  </p>
                  <button
                    type="button"
                    onClick={startArcade}
                    className="mt-3 px-6 py-2 rounded-full bg-[#283618] hover:bg-[#1e2a12] text-[#FEFAE0] font-display text-xs font-black shadow-md cursor-pointer transition-all active:scale-95 border border-[#FEFAE0] inline-flex items-center gap-1.5"
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
            <div className="flex flex-col items-center my-auto">
              <p className="text-xs text-[#5B4436] text-center mb-2.5 font-medium max-w-sm">
                Ketik nama dan identitasmu untuk mendapatkan <strong>Kartu Tanda Mahasiswa Ramah Lingkungan</strong> edisi DKV UNM:
              </p>

              {/* Form Input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-sm mb-3 text-xs font-bold text-[#283618]">
                <div>
                  <label className="block text-[10px] text-[#5B4436] mb-0.5">Nama Mahasiswa:</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-xl border-2 border-[#283618]/30 bg-white font-medium text-xs focus:outline-none focus:border-[#283618]"
                    placeholder="Nama Lengkap"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[#5B4436] mb-0.5">NIM Mahasiswa:</label>
                  <input
                    type="text"
                    value={studentNIM}
                    onChange={(e) => setStudentNIM(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-xl border-2 border-[#283618]/30 bg-white font-medium text-xs focus:outline-none focus:border-[#283618]"
                    placeholder="NIM"
                  />
                </div>
              </div>

              {/* The Virtual ID Card */}
              <div className="w-full max-w-sm rounded-3xl bg-gradient-to-br from-[#283618] to-[#1a2410] text-[#FEFAE0] p-4 shadow-xl border-3 border-[#FEFAE0] relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#FEFAE0]/30 pb-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-7 h-7 rounded-full bg-[#FEFAE0] text-[#283618] font-black flex items-center justify-center text-[10px]">
                      UNM
                    </div>
                    <div>
                      <div className="text-[9px] font-black uppercase tracking-wider text-amber-200">
                        UNIVERSITAS NEGERI MAKASSAR
                      </div>
                      <div className="text-[8px] text-[#FEFAE0]/80">GREEN WARRIOR CARD 2026</div>
                    </div>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-amber-200" />
                </div>

                <div className="grid grid-cols-3 gap-2 items-center">
                  <div className="col-span-2 space-y-1">
                    <div>
                      <span className="text-[8px] uppercase tracking-wider text-[#FEFAE0]/70 block leading-tight">Nama Lengkap</span>
                      <span className="font-display text-xs font-black text-white leading-tight block">{studentName || 'Mahasiswa UNM'}</span>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase tracking-wider text-[#FEFAE0]/70 block leading-tight">NIM</span>
                      <span className="text-[11px] font-mono font-bold text-amber-200 leading-tight block">{studentNIM || '220806501001'}</span>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase tracking-wider text-[#FEFAE0]/70 block leading-tight">Program Studi</span>
                      <span className="text-[10px] text-white/90 font-medium leading-tight block">{studentDept}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-black/25 border border-[#FEFAE0]/30 text-center">
                    <Award className="w-6 h-6 text-amber-300 mb-0.5" />
                    <span className="text-[7.5px] font-black uppercase text-amber-200">VERIFIED</span>
                    <span className="text-[7px] text-white/80 leading-tight">Eco-Champion</span>
                  </div>
                </div>

                <div className="mt-2.5 pt-1.5 border-t border-[#FEFAE0]/20 flex items-center justify-between text-[7.5px] text-[#FEFAE0]/80">
                  <span>ID: #UNM-3R-DKV-2026</span>
                  <span className="text-amber-200 font-bold">#BebasSampahUNM</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-3">
                <button
                  type="button"
                  onClick={copyKTM}
                  className="px-4 py-1.5 rounded-full bg-[#5B4436] hover:bg-[#433126] text-white font-display text-xs font-black shadow-xs cursor-pointer transition-all active:scale-95 border border-[#FEFAE0] flex items-center gap-1.5"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin!' : 'Salin Teks Komitmen'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: CATATAN RAHASIA UNM */}
          {activeTab === 'secrets' && (
            <div className="space-y-2.5 text-xs text-[#283618] max-w-sm mx-auto my-auto">
              <div className="p-3 rounded-2xl bg-white/75 border border-[#283618]/20 shadow-xs">
                <div className="font-display font-black text-xs text-[#283618] flex items-center gap-1 mb-0.5">
                  <span>📍 Titik Refill Air Gratis Kampus UNM</span>
                </div>
                <p className="text-[10px] leading-relaxed text-[#5B4436] font-medium">
                  Tahukah kamu? Ada dispenser air minum layak konsumsi di <strong>Lobi Gedung Pinisi Lt. 1</strong> dan <strong>Perpustakaan Pusat UNM</strong>. Membawa tumbler sendiri bisa langsung menghemat minimal Rp 10.000 setiap hari kuliah!
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-white/75 border border-[#283618]/20 shadow-xs">
                <div className="font-display font-black text-xs text-[#5B4436] flex items-center gap-1 mb-0.5">
                  <span>☕ Kafe Ramah Tumbler Sekitar Pettarani</span>
                </div>
                <p className="text-[10px] leading-relaxed text-[#5B4436] font-medium">
                  Banyak kedai kopi di sekitar Jl. Pendidikan dan Jl. A.P. Pettarani memberikan <strong>diskon potongan harga Rp 2.000 – Rp 5.000</strong> jika kamu membawa tumbler sendiri saat take-away. Tanyakan barista sebelum memesan!
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#283618]/10 border border-[#283618]/20 shadow-xs text-center">
                <div className="font-display font-bold text-[11px] text-[#283618] flex items-center justify-center gap-1 mb-0.5">
                  <Heart className="w-3 h-3 text-rose-600 fill-rose-600" />
                  <span>Pesan dari Tim Kreator DKV UNM:</span>
                </div>
                <p className="text-[10px] italic text-[#283618] font-medium">
                  "Kampanye ini kami rancang dengan harapan kecil: semoga halaman kampus kita selalu bersih, teduh, dan menjadi kebanggaan kita bersama!"
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Unified Bottom Footer */}
        <div className="p-2.5 bg-[#5B4436]/15 border-t-2 border-[#283618]/20 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#5B4436] hover:bg-[#433126] text-white font-display text-xs font-black shadow-md cursor-pointer transition-all active:scale-95 border border-[#FEFAE0]/40 flex items-center gap-1.5"
          >
            <X className="w-3.5 h-3.5" />
            <span>Tutup Ruang Rahasia</span>
          </button>
        </div>
      </div>
    </div>
  );
};
