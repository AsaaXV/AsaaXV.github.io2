import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Volume2, VolumeX, Shield, Heart, Trophy, RotateCcw, Play, Sparkles, AlertTriangle, Flame, ArrowLeft, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/audio';

import bumiImg from '../assets/bumi.png';
import tongsampahBawahImg from '../assets/tongsampah-bawah.png';
import tongsampahAtasImg from '../assets/tongsampah-atas.png';
import botolBekasImg from '../assets/botol-bekas.png';
import kardusBekasImg from '../assets/kardus-bekas.png';
import bajuBekasImg from '../assets/baju_bayi_bekas.png';
import sampah1Img from '../assets/sampah1.png';
import sampah2Img from '../assets/sampah2.png';

interface FallingItem {
  id: string;
  kind: 'trash' | 'hazard' | 'powerup';
  subType: string;
  name: string;
  image?: string;
  icon?: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-110
  speed: number;
  points: number;
  rotation: number;
  rotSpeed: number;
  size: number;
  color: string;
}

interface FloatingText {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
}

interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
}

interface EarthRescueGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EDUCATIONAL_TIPS = [
  'Daur ulang 1 ton kertas dapat menyelamatkan 17 pohon dan menghemat 26.500 liter air bersih!',
  'Plastik sekali pakai butuh hingga 450 tahun untuk terurai. Bawa tas belanja kain sendiri!',
  'Mendaur ulang kaleng aluminium menghemat energi 95% dibandingkan memproduksi dari bahan mentah.',
  'Kompos dari sisa makanan mengurangi gas metana berbahaya di tempat pembuangan akhir sampah.',
  'Membawa tumbler minum sendiri menyelamatkan bumi dari ratusan sampah botol plastik setiap tahunnya!',
  'Memilah sampah dari rumah memudahkan petugas kebersihan dan industri daur ulang bekerja efektif.'
];

export const EarthRescueGameModal: React.FC<EarthRescueGameModalProps> = ({ isOpen, onClose }) => {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'gameover'>('intro');
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('earth_falling_trash_high_score') || '0', 10);
    } catch {
      return 0;
    }
  });
  const [level, setLevel] = useState(1);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [caughtCount, setCaughtCount] = useState(0);
  const [shieldActive, setShieldActive] = useState(false);
  const [shieldTimeLeft, setShieldTimeLeft] = useState(0);
  const [isHurt, setIsHurt] = useState(false);
  const [binSquash, setBinSquash] = useState(false);
  const [audioMuted, setAudioMuted] = useState(!sounds.enabled);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [eduTip, setEduTip] = useState(EDUCATIONAL_TIPS[0]);

  // Bin position in percentage (0 to 100)
  const [binX, setBinX] = useState(50);
  const targetBinX = useRef(50);
  const currentBinX = useRef(50);

  // Persistent refs for continuous 60fps game loop simulation
  const itemsRef = useRef<FallingItem[]>([]);
  const heartsRef = useRef(3);
  const scoreRef = useRef(0);
  const levelRef = useRef(1);
  const comboRef = useRef(0);
  const maxComboRef = useRef(0);
  const caughtCountRef = useRef(0);
  const shieldActiveRef = useRef(false);

  const arenaRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastSpawnTime = useRef<number>(0);
  const lastFrameTime = useRef<number>(0);
  const keysPressed = useRef<{ left: boolean; right: boolean }>({ left: false, right: false });

  // Play opening alert / fanfare when modal opens
  useEffect(() => {
    if (isOpen) {
      sounds.playAlert();
      setGameState('intro');
      setEduTip(EDUCATIONAL_TIPS[Math.floor(Math.random() * EDUCATIONAL_TIPS.length)]);
    } else {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    }
  }, [isOpen]);

  // Shield countdown timer
  useEffect(() => {
    if (!shieldActive) {
      shieldActiveRef.current = false;
      return;
    }
    shieldActiveRef.current = true;
    const interval = setInterval(() => {
      setShieldTimeLeft((prev) => {
        if (prev <= 1) {
          shieldActiveRef.current = false;
          setShieldActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [shieldActive]);

  // Keyboard navigation listeners
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysPressed.current.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysPressed.current.right = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysPressed.current.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysPressed.current.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Handle pointer / mouse movement over the arena
  const handlePointerMove = (clientX: number) => {
    if (!arenaRef.current || gameState !== 'playing') return;
    const rect = arenaRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const clampedPercentage = Math.max(8, Math.min(92, (relativeX / rect.width) * 100));
    targetBinX.current = clampedPercentage;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handlePointerMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handlePointerMove(e.touches[0].clientX);
    }
  };

  // Trigger floating text
  const addFloatingText = (text: string, x: number, y: number, color: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setFloatingTexts((prev) => [...prev, { id, text, x, y, color }]);
    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((ft) => ft.id !== id));
    }, 900);
  };

  // Spawn visual celebration particles on catch
  const spawnParticles = (x: number, y: number, color: string, count: number = 6) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
      const speed = Math.random() * 2 + 1.5;
      newParticles.push({
        id: `${Date.now()}-${i}-${Math.random()}`,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        color,
        size: Math.random() * 5 + 4,
        alpha: 1,
      });
    }
    setParticles((prev) => [...prev, ...newParticles]);
  };

  // Spawn new falling item (Trash, Toxic Smoke Hazard, or Eco Powerup)
  const spawnItem = (currentLvl: number): FallingItem => {
    const rand = Math.random();
    const spawnX = Math.floor(Math.random() * 80) + 10; // 10% to 90%
    const baseSpeed = 0.38 + currentLvl * 0.08;

    // 25% chance of Toxic Smoke Hazard (increases slightly with level up to 35%)
    const hazardChance = Math.min(0.24 + currentLvl * 0.02, 0.38);

    if (rand < hazardChance) {
      // Toxic Smoke Hazard (MUST BE AVOIDED)
      return {
        id: `hazard-${Date.now()}-${Math.random()}`,
        kind: 'hazard',
        subType: 'toxic_smoke',
        name: 'Asap Beracun',
        icon: '☠️',
        x: spawnX,
        y: -10,
        speed: baseSpeed * (0.9 + Math.random() * 0.3),
        points: 0,
        rotation: 0,
        rotSpeed: (Math.random() - 0.5) * 3,
        size: 52,
        color: '#1f2937',
      };
    }

    // 8% chance of Eco Powerup (Shield or Heart recovery)
    if (rand < hazardChance + 0.08) {
      const isHeart = Math.random() > 0.45;
      return {
        id: `powerup-${Date.now()}-${Math.random()}`,
        kind: 'powerup',
        subType: isHeart ? 'heart' : 'shield',
        name: isHeart ? 'Bibit Kehidupan (+1 ❤️)' : 'Perisai Ozon (Kebal 6s)',
        icon: isHeart ? '🌱' : '🛡️',
        x: spawnX,
        y: -10,
        speed: baseSpeed * 0.85,
        points: 40,
        rotation: 0,
        rotSpeed: 2,
        size: 42,
        color: isHeart ? '#10b981' : '#3b82f6',
      };
    }

    // Otherwise: Recyclable Trash (Collect into trash bin)
    const trashList = [
      { subType: 'botol', name: 'Botol Plastik PET', image: botolBekasImg, points: 15, size: 44, color: '#0ea5e9' },
      { subType: 'kardus', name: 'Kardus Bekas', image: kardusBekasImg, points: 20, size: 46, color: '#d97706' },
      { subType: 'baju', name: 'Kain Baju Bekas', image: bajuBekasImg, points: 25, size: 44, color: '#ec4899' },
      { subType: 'kertas', name: 'Kertas Kering', image: sampah1Img, points: 10, size: 40, color: '#84cc16' },
      { subType: 'sampah2', name: 'Limbah Plastik', image: sampah2Img, points: 15, size: 42, color: '#6366f1' },
    ];
    const picked = trashList[Math.floor(Math.random() * trashList.length)];

    return {
      id: `trash-${Date.now()}-${Math.random()}`,
      kind: 'trash',
      subType: picked.subType,
      name: picked.name,
      image: picked.image,
      x: spawnX,
      y: -10,
      speed: baseSpeed * (0.95 + Math.random() * 0.3),
      points: picked.points,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 4,
      size: picked.size,
      color: picked.color,
    };
  };

  // Start / Restart Game
  const startGame = () => {
    sounds.playAlert();

    // Reset persistent simulation state
    itemsRef.current = [];
    heartsRef.current = 3;
    scoreRef.current = 0;
    levelRef.current = 1;
    comboRef.current = 0;
    maxComboRef.current = 0;
    caughtCountRef.current = 0;
    shieldActiveRef.current = false;

    // Reset React UI state
    setHearts(3);
    setScore(0);
    setLevel(1);
    setCombo(0);
    setMaxCombo(0);
    setCaughtCount(0);
    setItems([]);
    setParticles([]);
    setFloatingTexts([]);
    setShieldActive(false);
    setShieldTimeLeft(0);
    setIsHurt(false);
    targetBinX.current = 50;
    currentBinX.current = 50;
    setBinX(50);
    lastSpawnTime.current = performance.now();
    lastFrameTime.current = performance.now();
    setGameState('playing');
  };

  // Main 60 FPS Game Loop - Depends ONLY on gameState so it never restarts when state updates
  useEffect(() => {
    if (gameState !== 'playing') {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      return;
    }

    lastFrameTime.current = performance.now();
    lastSpawnTime.current = performance.now();

    const gameLoop = (timestamp: number) => {
      // Calculate delta time
      const dt = Math.min((timestamp - lastFrameTime.current) / 16.66, 2.5);
      lastFrameTime.current = timestamp;

      // 1. Keyboard movement interpolation
      if (keysPressed.current.left) {
        targetBinX.current = Math.max(8, targetBinX.current - 1.8 * dt);
      }
      if (keysPressed.current.right) {
        targetBinX.current = Math.min(92, targetBinX.current + 1.8 * dt);
      }

      // Smooth lerp for trash bin horizontal movement
      currentBinX.current += (targetBinX.current - currentBinX.current) * 0.28 * dt;
      setBinX(currentBinX.current);

      // 2. Spawn items with interval scaling by current level
      const currentLevel = levelRef.current;
      const spawnInterval = Math.max(1300 - currentLevel * 120, 600);
      if (timestamp - lastSpawnTime.current > spawnInterval) {
        itemsRef.current.push(spawnItem(currentLevel));
        lastSpawnTime.current = timestamp;
      }

      // 3. Update particles
      setParticles((prevParticles) =>
        prevParticles
          .map((p) => ({
            ...p,
            x: p.x + p.vx * 0.3 * dt,
            y: p.y + p.vy * 0.3 * dt,
            alpha: p.alpha - 0.028 * dt,
          }))
          .filter((p) => p.alpha > 0)
      );

      // 4. Update falling items & collision detection
      const survivingItems: FallingItem[] = [];
      const binTopY = 82; // Trash bin mouth is situated around Y = 82% to 92%
      const binBottomY = 96;
      const binWidthPercent = 20; // Hitbox width of the bin mouth
      const binCurrentX = currentBinX.current;

      const currentItems = itemsRef.current;
      for (let i = 0; i < currentItems.length; i++) {
        const item = currentItems[i];
        const nextY = item.y + item.speed * dt * 0.85;
        const nextRot = item.rotation + item.rotSpeed * dt;

        // Check collision with trash bin mouth
        const inYRange = nextY >= binTopY - 4 && nextY <= binBottomY;
        const inXRange = Math.abs(item.x - binCurrentX) <= binWidthPercent / 2 + 3;

        if (inYRange && inXRange) {
          // Collision occurred!
          if (item.kind === 'trash') {
            // SUCCESSFUL CATCH!
            caughtCountRef.current += 1;
            comboRef.current += 1;
            if (comboRef.current > maxComboRef.current) {
              maxComboRef.current = comboRef.current;
            }

            // Multiplier bonus for combos (1x, 1.2x, 1.5x, 2x)
            const currentCombo = comboRef.current;
            const comboMultiplier = currentCombo >= 10 ? 2.0 : currentCombo >= 5 ? 1.5 : currentCombo >= 3 ? 1.2 : 1.0;
            const pointsEarned = Math.round(item.points * comboMultiplier);
            scoreRef.current += pointsEarned;

            // Audio & visual feedback
            sounds.playTrashCatch(currentCombo);
            if (currentCombo % 5 === 0) {
              sounds.playCombo(Math.min(Math.floor(currentCombo / 5), 4));
            }
            addFloatingText(`+${pointsEarned}${currentCombo > 2 ? ` (x${currentCombo} Combo!)` : ''}`, item.x, binTopY - 6, '#10b981');
            spawnParticles(item.x, binTopY, item.color, 8);

            // Trash bin bounce squash
            setBinSquash(true);
            setTimeout(() => setBinSquash(false), 140);

            // Update UI state
            setScore(scoreRef.current);
            setCombo(comboRef.current);
            setMaxCombo(maxComboRef.current);
            setCaughtCount(caughtCountRef.current);

            // Level up progression every 150 points
            const newLevel = Math.floor(scoreRef.current / 150) + 1;
            if (newLevel > levelRef.current) {
              levelRef.current = newLevel;
              setLevel(newLevel);
              sounds.playFanfare();
              addFloatingText(`LEVEL ${newLevel}! LEBIH CEPAT!`, 50, 40, '#f59e0b');
            }
          } else if (item.kind === 'hazard') {
            // HIT TOXIC SMOKE!
            if (shieldActiveRef.current) {
              // Shield absorbed toxic smoke!
              sounds.playTrashCatch(1);
              addFloatingText('🛡️ TERTANGKIS PERISAI!', item.x, binTopY - 6, '#3b82f6');
              spawnParticles(item.x, binTopY, '#3b82f6', 10);
            } else {
              // HURT: Lost 1 Heart
              heartsRef.current -= 1;
              comboRef.current = 0; // Reset combo on mistake
              setHearts(heartsRef.current);
              setCombo(0);

              sounds.playToxicHurt();
              setIsHurt(true);
              setTimeout(() => setIsHurt(false), 450);
              addFloatingText('-1 ❤️ ASAP BERACUN!', item.x, binTopY - 6, '#ef4444');
              spawnParticles(item.x, binTopY, '#dc2626', 12);

              if (heartsRef.current <= 0) {
                // Game Over!
                heartsRef.current = 0;
                setHearts(0);
                setGameState('gameover');
                sounds.playGameOver();

                // Save High Score
                try {
                  const currentHigh = parseInt(localStorage.getItem('earth_falling_trash_high_score') || '0', 10);
                  if (scoreRef.current > currentHigh) {
                    localStorage.setItem('earth_falling_trash_high_score', scoreRef.current.toString());
                    setHighScore(scoreRef.current);
                  }
                } catch {
                  // ignore
                }
                return; // stop game loop
              }
            }
          } else if (item.kind === 'powerup') {
            // Collected Eco Power-Up
            sounds.playPowerUp();
            if (item.subType === 'heart') {
              if (heartsRef.current < 3) {
                heartsRef.current += 1;
                setHearts(heartsRef.current);
                addFloatingText('+1 ❤️ NYAWA PULIH!', item.x, binTopY - 6, '#10b981');
              } else {
                scoreRef.current += 50;
                setScore(scoreRef.current);
                addFloatingText('+50 POIN MAKSIMAL!', item.x, binTopY - 6, '#10b981');
              }
              spawnParticles(item.x, binTopY, '#10b981', 12);
            } else if (item.subType === 'shield') {
              shieldActiveRef.current = true;
              setShieldActive(true);
              setShieldTimeLeft(6);
              addFloatingText('🛡️ PERISAI AKTIF (6 DETIK)!', item.x, binTopY - 6, '#3b82f6');
              spawnParticles(item.x, binTopY, '#60a5fa', 14);
            }
          }
          // Do not push collided item to survivingItems
          continue;
        }

        // Check if item reached the ground / fell off screen
        if (nextY > 105) {
          // Trash fell to ground unnoticed
          if (item.kind === 'trash' && comboRef.current > 0) {
            // Break combo streak gently if recyclable trash misses bin
            comboRef.current = 0;
            setCombo(0);
          }
          continue;
        }

        // Keep item falling
        survivingItems.push({
          ...item,
          y: nextY,
          rotation: nextRot,
        });
      }

      // Update persistent items array and sync with React for smooth render
      itemsRef.current = survivingItems;
      setItems([...survivingItems]);

      animFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [gameState]);

  const toggleSound = () => {
    sounds.toggle();
    setAudioMuted(!sounds.enabled);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-fadeIn">
      {/* Outer Retro Container */}
      <div className="relative w-full max-w-3xl bg-[#fffdfa] rounded-3xl shadow-2xl border-4 border-[#3c2a21] overflow-hidden flex flex-col max-h-[95vh]">
        {/* Top Header Bar */}
        <div className="bg-[#2d5a3f] text-white px-4 sm:px-6 py-3 flex items-center justify-between border-b-4 border-[#3c2a21] select-none">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center p-1">
              <img src={bumiImg} alt="Earth" className="w-full h-full object-contain animate-spin-slow" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg tracking-wide uppercase font-serif text-[#fef9c3] flex items-center gap-1.5">
                <span>TANGKAP SAMPAH: SELAMATKAN BUMI</span>
              </h2>
              <p className="text-[11px] sm:text-xs text-[#bbf7d0] font-sans font-medium">
                Geser tong sampah ke kiri & kanan untuk menangkap sampah dan hindari asap beracun!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleSound}
              className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition active:scale-95"
              title={audioMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
            >
              {audioMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-red-300" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl bg-red-500/80 hover:bg-red-600 text-white transition active:scale-95 border-2 border-red-900"
              title="Tutup Game"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Arcade HUD Dashboard (Visible during Play and Game Over) */}
        <div className="bg-[#fef3c7] px-4 py-2 border-b-2 border-[#d97706]/40 flex items-center justify-between text-xs sm:text-sm font-bold text-[#78350f]">
          {/* Hearts / Health */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] uppercase tracking-wider text-stone-600 mr-1">Nyawa:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((heartIndex) => (
                <Heart
                  key={heartIndex}
                  className={`w-5 h-5 transition-transform duration-200 ${
                    heartIndex <= hearts
                      ? 'text-red-500 fill-red-500 scale-100 drop-shadow'
                      : 'text-stone-300 fill-stone-200 scale-90'
                  }`}
                />
              ))}
            </div>
            {shieldActive && (
              <span className="ml-2 inline-flex items-center gap-1 text-[11px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full border border-blue-300 font-extrabold animate-pulse">
                <Shield className="w-3.5 h-3.5 fill-blue-500" /> {shieldTimeLeft}s
              </span>
            )}
          </div>

          {/* Level & Combo */}
          <div className="flex items-center gap-3">
            <span className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-md border border-amber-300 font-mono">
              LEVEL {level}
            </span>
            {combo > 1 && (
              <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-full font-extrabold text-[11px] animate-bounce tracking-wide shadow-sm">
                COMBO x{combo}!
              </span>
            )}
          </div>

          {/* Score & High Score */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-stone-500 block leading-none">SKOR</span>
              <span className="font-mono text-base sm:text-lg text-[#1e3a8a]">{score}</span>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-stone-500 block leading-none flex items-center gap-0.5">
                <Trophy className="w-3 h-3 text-amber-500" /> REKOR
              </span>
              <span className="font-mono text-base text-amber-700">{highScore}</span>
            </div>
          </div>
        </div>

        {/* Main Arena Container */}
        <div
          ref={arenaRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className={`relative w-full h-[460px] sm:h-[510px] overflow-hidden select-none cursor-ew-resize transition-colors duration-200 ${
            isHurt ? 'bg-red-100' : 'bg-gradient-to-b from-[#e0f2fe] via-[#f0fdf4] to-[#fef3c7]'
          }`}
          style={{ touchAction: 'none' }}
        >
          {/* Sky background clouds and subtle retro sun/earth */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div className="absolute top-4 left-6 w-24 h-8 bg-white/70 rounded-full blur-sm" />
            <div className="absolute top-12 right-12 w-32 h-10 bg-white/70 rounded-full blur-sm" />
            <div className="absolute top-8 left-1/3 w-28 h-9 bg-white/60 rounded-full blur-sm" />
          </div>

          {/* Hurt Red Flash Overlay */}
          {isHurt && (
            <div className="absolute inset-0 bg-red-500/25 pointer-events-none animate-pulse z-30" />
          )}

          {/* Floating Text Notifications */}
          {floatingTexts.map((ft) => (
            <div
              key={ft.id}
              className="absolute font-black text-sm sm:text-base pointer-events-none z-40 transform -translate-x-1/2 drop-shadow-md animate-floatUp whitespace-nowrap"
              style={{
                left: `${ft.x}%`,
                top: `${ft.y}%`,
                color: ft.color,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {ft.text}
            </div>
          ))}

          {/* Visual Burst Particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full pointer-events-none z-30"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                opacity: p.alpha,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}

          {/* Falling Items Rendering */}
          {gameState === 'playing' &&
            items.map((item) => {
              if (item.kind === 'hazard') {
                // Toxic Smoke Hazard (Swirling poisonous cloud)
                return (
                  <div
                    key={item.id}
                    className="absolute pointer-events-none z-20 flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
                    }}
                  >
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-stone-900 via-stone-800 to-purple-950 flex items-center justify-center shadow-lg border-2 border-purple-400/50 animate-pulse">
                      <span className="text-xl select-none">☠️</span>
                      {/* Toxic smoke puffs around it */}
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-900/80 blur-xs" />
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-stone-700/80 blur-xs" />
                    </div>
                    <span className="text-[10px] font-black text-red-600 bg-white/90 px-1 rounded shadow-xs mt-0.5 border border-red-300">
                      ASAP BERACUN!
                    </span>
                  </div>
                );
              }

              if (item.kind === 'powerup') {
                // Eco Power-Up (Shield or Life Heart)
                return (
                  <div
                    key={item.id}
                    className="absolute pointer-events-none z-20 flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      transform: `translate(-50%, -50%) scale(1.1)`,
                    }}
                  >
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center text-2xl shadow-lg border-2 ${
                        item.subType === 'heart'
                          ? 'bg-emerald-100 border-emerald-500 animate-bounce'
                          : 'bg-blue-100 border-blue-500 animate-pulse'
                      }`}
                    >
                      {item.icon}
                    </div>
                  </div>
                );
              }

              // Recyclable Trash with Real Project Assets
              return (
                <div
                  key={item.id}
                  className="absolute pointer-events-none z-20 flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
                  }}
                >
                  <div className="relative p-1 bg-white/40 rounded-xl backdrop-blur-xs">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-contain drop-shadow filter"
                        style={{ width: `${item.size}px`, height: `${item.size}px` }}
                      />
                    ) : (
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shadow"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.icon || '🗑️'}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

          {/* Grass Floor Baseline at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#2d5a3f] to-[#3f7a56] border-t-4 border-[#1f3f2c] z-10 flex items-center justify-center">
            <span className="text-[11px] text-emerald-100/70 font-mono tracking-wider select-none">
              GERAKKAN MOUSE / SWIPE JARI / TOMBOL ◀ ▶ UNTUK GESER
            </span>
          </div>

          {/* Player Trash Bin (Tong Sampah) */}
          <div
            className={`absolute bottom-3 z-20 transform -translate-x-1/2 pointer-events-none transition-transform duration-75 ${
              isHurt ? 'animate-shake' : ''
            }`}
            style={{
              left: `${binX}%`,
              transform: `translateX(-50%) ${binSquash ? 'scale(1.18, 0.82)' : 'scale(1, 1)'}`,
            }}
          >
            <div className="relative flex flex-col items-center">
              {/* Shield aura if active */}
              {shieldActive && (
                <div className="absolute -inset-4 rounded-full border-4 border-blue-400 bg-blue-400/20 animate-pulse pointer-events-none" />
              )}

              {/* Trash Bin Lid Open Angle */}
              <div className="w-24 sm:w-28 relative -mb-3 z-10 transform -rotate-6 transition-transform">
                <img
                  src={tongsampahAtasImg}
                  alt="Tutup Tong Sampah"
                  className="w-full object-contain drop-shadow-md"
                />
              </div>

              {/* Trash Bin Body */}
              <div className="w-20 sm:w-24 relative">
                <img
                  src={tongsampahBawahImg}
                  alt="Tong Sampah"
                  className="w-full object-contain drop-shadow-xl"
                />
                {/* Visual Eco Badge on Bin */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2d5a3f] text-[#fef9c3] text-[9px] font-black px-1.5 py-0.5 rounded-full border border-[#fef9c3]/50 shadow-sm whitespace-nowrap">
                  3R KEEPER
                </div>
              </div>
            </div>
          </div>

          {/* INTRO SCREEN OVERLAY */}
          {gameState === 'intro' && (
            <div className="absolute inset-0 z-40 bg-stone-900/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-4 border-emerald-400 flex items-center justify-center p-2 mb-3 shadow-xl">
                <img src={bumiImg} alt="Earth" className="w-full h-full object-contain animate-bounce" />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#fef9c3] uppercase tracking-wider font-serif mb-1">
                TANGKAP SAMPAH, SELAMATKAN BUMI!
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm max-w-md mb-5 leading-relaxed">
                Sampah berjatuhan dari atmosfer! Geser tong sampah untuk menangkap semua sampah daur ulang, tapi <strong>HINDARI asap hitam beracun ☠️</strong> agar nyawa bumi tidak berkurang!
              </p>

              {/* Guide Cards */}
              <div className="grid grid-cols-2 gap-3 max-w-md w-full mb-6 text-left">
                <div className="bg-emerald-950/80 border-2 border-emerald-500/50 p-2.5 rounded-xl">
                  <div className="flex items-center gap-1.5 text-emerald-300 font-bold text-xs mb-1">
                    <Sparkles className="w-3.5 h-3.5" /> TANGKAP (+Poin):
                  </div>
                  <p className="text-[11px] text-stone-300">
                    Botol plastik, kardus, kain bekas, & sampah kering. Bangun kombo streak!
                  </p>
                </div>
                <div className="bg-red-950/80 border-2 border-red-500/50 p-2.5 rounded-xl">
                  <div className="flex items-center gap-1.5 text-red-300 font-bold text-xs mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> HINDARI (-1 ❤️):
                  </div>
                  <p className="text-[11px] text-stone-300">
                    Asap hitam beracun! Jangan sampai terkena tong sampah.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={startGame}
                className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-black text-base rounded-2xl border-4 border-emerald-800 shadow-xl transition transform hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-white" /> MULAI BERMAIN SEKARANG!
              </button>
            </div>
          )}

          {/* GAME OVER SCREEN OVERLAY */}
          {gameState === 'gameover' && (
            <div className="absolute inset-0 z-40 bg-stone-900/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-red-500/20 border-4 border-red-500 flex items-center justify-center mb-3">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>

              <h3 className="text-2xl font-black text-red-400 font-serif tracking-wider mb-1">
                PERMAINAN SELESAI!
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm mb-4">
                Bumi terkena polusi asap beracun. Usaha Anda membersihkan sampah sangat berarti!
              </p>

              {/* Stats Grid */}
              <div className="bg-stone-800/90 border-2 border-stone-700 rounded-2xl p-4 max-w-sm w-full mb-4 grid grid-cols-3 gap-2 text-center">
                <div className="bg-stone-900/60 p-2 rounded-xl">
                  <span className="text-[10px] text-stone-400 block font-mono">SKOR AKHIR</span>
                  <span className="text-xl font-black text-emerald-400 font-mono">{score}</span>
                </div>
                <div className="bg-stone-900/60 p-2 rounded-xl">
                  <span className="text-[10px] text-stone-400 block font-mono">TERTANGKAP</span>
                  <span className="text-xl font-black text-amber-400 font-mono">{caughtCount}</span>
                </div>
                <div className="bg-stone-900/60 p-2 rounded-xl">
                  <span className="text-[10px] text-stone-400 block font-mono">MAX COMBO</span>
                  <span className="text-xl font-black text-blue-400 font-mono">{maxCombo}x</span>
                </div>
              </div>

              {/* Educational 3R Tip Card */}
              <div className="bg-[#2d5a3f]/90 border-2 border-[#bbf7d0]/40 rounded-xl p-3 max-w-md w-full mb-5 text-left flex items-start gap-2.5">
                <Sparkles className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-yellow-300 block mb-0.5">
                    Fakta Daur Ulang 3R:
                  </span>
                  <p className="text-xs text-stone-200 leading-snug font-sans">
                    {eduTip}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={startGame}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-black text-sm rounded-xl border-3 border-emerald-900 shadow-lg transition transform hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" /> MAIN LAGI
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 bg-stone-700 hover:bg-stone-600 text-stone-200 font-bold text-sm rounded-xl border-2 border-stone-600 transition active:scale-95 cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Control Helpers for Mobile & Desktop */}
        <div className="bg-[#fffdfa] px-4 py-2.5 border-t-2 border-[#3c2a21]/20 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600 font-medium">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-bold text-stone-700 bg-stone-200/80 px-2 py-0.5 rounded text-[11px]">
              <ArrowLeft className="w-3 h-3" /> <ArrowRight className="w-3 h-3" /> / Tombol A-D
            </span>
            <span className="hidden sm:inline text-stone-500">atau geser mouse untuk menggerakkan tong</span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Tangkap Sampah
            </span>
            <span className="inline-flex items-center gap-1 text-red-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-red-500" /> Hindari Asap
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
