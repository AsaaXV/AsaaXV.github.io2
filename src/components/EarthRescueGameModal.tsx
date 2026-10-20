import React, { useState, useEffect, useRef } from 'react';
import { X, Volume2, VolumeX, Shield, Heart, Trophy, RotateCcw, Play, Sparkles, AlertTriangle, ArrowLeft, ArrowRight, Award } from 'lucide-react';
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
  label: string;
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
  'Memilah sampah dari rumah memudahkan petugas kebersihan dan industri daur ulang bekerja efektif.',
  'Satu botol kaca daur ulang menghemat energi cukup untuk menyalakan lampu selama 4 jam!'
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

  // Mobile button hold interval
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
      if (holdIntervalRef.current) {
        clearInterval(holdIntervalRef.current);
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

  // Handle pointer / touch movement directly over the arena
  const handlePointerMove = (clientX: number) => {
    if (!arenaRef.current || gameState !== 'playing') return;
    const rect = arenaRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const clampedPercentage = Math.max(10, Math.min(90, (relativeX / rect.width) * 100));
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

  // Mobile on-screen thumb buttons (smooth hold & tap support)
  const startMovingLeft = (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();
    keysPressed.current.left = true;
    keysPressed.current.right = false;
    targetBinX.current = Math.max(8, targetBinX.current - 9);
  };

  const stopMovingLeft = (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();
    keysPressed.current.left = false;
  };

  const startMovingRight = (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();
    keysPressed.current.right = true;
    keysPressed.current.left = false;
    targetBinX.current = Math.min(92, targetBinX.current + 9);
  };

  const stopMovingRight = (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();
    keysPressed.current.right = false;
  };

  // Trigger floating text
  const addFloatingText = (text: string, x: number, y: number, color: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setFloatingTexts((prev) => [...prev, { id, text, x, y, color }]);
    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((ft) => ft.id !== id));
    }, 850);
  };

  // Spawn visual celebration particles on catch
  const spawnParticles = (x: number, y: number, color: string, count: number = 6) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
      const speed = Math.random() * 2 + 1.2;
      newParticles.push({
        id: `${Date.now()}-${i}-${Math.random()}`,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2,
        color,
        size: Math.random() * 5 + 3,
        alpha: 1,
      });
    }
    setParticles((prev) => [...prev, ...newParticles]);
  };

  // Spawn new falling item (Trash, Toxic Smoke Hazard, or Eco Powerup)
  const spawnItem = (currentLvl: number): FallingItem => {
    const rand = Math.random();
    const spawnX = Math.floor(Math.random() * 78) + 11; // 11% to 89%

    // Dynamic progressive difficulty: speed scales with level AND current score
    // Starting speed is fast and increases progressively for real arcade challenge
    const scoreBonusSpeed = Math.min(scoreRef.current * 0.002, 0.65);
    const baseSpeed = 0.62 + (currentLvl - 1) * 0.16 + scoreBonusSpeed;

    // Hazard chance increases with level (from 24% at lvl 1 up to 40% at higher levels)
    const hazardChance = Math.min(0.24 + (currentLvl - 1) * 0.045, 0.40);

    if (rand < hazardChance) {
      // Toxic Smoke Hazard (MUST BE AVOIDED - descends with extra velocity!)
      return {
        id: `hazard-${Date.now()}-${Math.random()}`,
        kind: 'hazard',
        subType: 'toxic_smoke',
        name: 'Asap Polusi',
        label: 'BAHAYA ☠️',
        icon: '☁️',
        x: spawnX,
        y: -10,
        // Hazard falls 15% faster to test reflexes!
        speed: baseSpeed * (1.12 + Math.random() * 0.28),
        points: 0,
        rotation: 0,
        rotSpeed: (Math.random() - 0.5) * 3.5,
        size: 46,
        color: '#292524',
      };
    }

    // 8% chance of Eco Powerup (Shield or Heart recovery)
    if (rand < hazardChance + 0.08) {
      const isHeart = Math.random() > 0.45;
      return {
        id: `powerup-${Date.now()}-${Math.random()}`,
        kind: 'powerup',
        subType: isHeart ? 'heart' : 'shield',
        name: isHeart ? 'Bibit Hijau (+1 ❤️)' : 'Perisai Ozon (6s)',
        label: isHeart ? '+1 NYAWA' : 'KEBAL',
        icon: isHeart ? '🌱' : '🛡️',
        x: spawnX,
        y: -10,
        speed: baseSpeed * 0.85,
        points: 30,
        rotation: 0,
        rotSpeed: 2.0,
        size: 38,
        color: isHeart ? '#283618' : '#2563eb',
      };
    }

    // Otherwise: Recyclable Trash with varied drop physics
    const trashList = [
      { subType: 'botol', name: 'Botol PET', label: 'PLASTIK', image: botolBekasImg, points: 15, size: 40, color: '#386641', speedMult: 1.05 },
      { subType: 'kardus', name: 'Kardus Bekas', label: 'KARDUS', image: kardusBekasImg, points: 20, size: 42, color: '#5B4436', speedMult: 1.10 },
      { subType: 'baju', name: 'Kain Bekas', label: 'TEKSTIL', image: bajuBekasImg, points: 25, size: 40, color: '#BC6C25', speedMult: 0.95 },
      { subType: 'kertas', name: 'Kertas Kering', label: 'KERTAS', image: sampah1Img, points: 10, size: 36, color: '#606C38', speedMult: 0.90 },
      { subType: 'sampah2', name: 'Limbah Bungkus', label: 'DAUR ULANG', image: sampah2Img, points: 15, size: 38, color: '#4A5759', speedMult: 1.0 },
    ];
    const picked = trashList[Math.floor(Math.random() * trashList.length)];

    return {
      id: `trash-${Date.now()}-${Math.random()}`,
      kind: 'trash',
      subType: picked.subType,
      name: picked.name,
      label: picked.label,
      image: picked.image,
      x: spawnX,
      y: -10,
      speed: baseSpeed * (picked.speedMult + (Math.random() - 0.5) * 0.2),
      points: picked.points,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 3,
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

  // Main 60 FPS Game Loop
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
      const dt = Math.min((timestamp - lastFrameTime.current) / 16.66, 2.2);
      lastFrameTime.current = timestamp;

      // 1. Keyboard / button hold movement interpolation (faster response for high-speed dodging)
      const moveSpeed = 2.5 * dt;
      if (keysPressed.current.left) {
        targetBinX.current = Math.max(8, targetBinX.current - moveSpeed);
      }
      if (keysPressed.current.right) {
        targetBinX.current = Math.min(92, targetBinX.current + moveSpeed);
      }

      // Smooth responsive lerp for trash bin horizontal movement
      currentBinX.current += (targetBinX.current - currentBinX.current) * 0.35 * dt;
      setBinX(currentBinX.current);

      // 2. Spawn items with interval scaling by level & score (gets faster and more intense)
      const currentLevel = levelRef.current;
      const spawnInterval = Math.max(1050 - (currentLevel - 1) * 130 - Math.min(scoreRef.current * 0.45, 260), 380);
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
            alpha: p.alpha - 0.03 * dt,
          }))
          .filter((p) => p.alpha > 0)
      );

      // 4. Update falling items & collision detection
      const survivingItems: FallingItem[] = [];
      const binCurrentX = currentBinX.current;

      // Arena Hitbox bounds:
      // Bin sits at bottom-2 (top is around Y: 68%, bottom around Y: 98%)
      // Width of bin mouth + lid is ~22-26%
      const BIN_TOP_Y = 68;
      const BIN_BOTTOM_Y = 98;
      const HAZARD_HITBOX_HALF_WIDTH = 17.0; // Generous so toxic smoke touch NEVER fails to register
      const CATCH_HALF_WIDTH = 15.0; // Catch zone for trash and powerups

      const currentItems = itemsRef.current;
      for (let i = 0; i < currentItems.length; i++) {
        const item = currentItems[i];
        const nextY = item.y + item.speed * dt * 1.05;
        const nextRot = item.rotation + item.rotSpeed * dt;

        // Continuous Swept-Y Interval Check:
        // Checks if the movement segment from item.y to nextY intersects the bin's vertical region [BIN_TOP_Y, BIN_BOTTOM_Y]
        // This guarantees collision cannot be skipped regardless of high falling speed or frame-rate drops!
        const sweptYOverlaps = !(Math.max(item.y, nextY) < BIN_TOP_Y || Math.min(item.y, nextY) > BIN_BOTTOM_Y);
        const distFromBinX = Math.abs(item.x - binCurrentX);

        if (item.kind === 'hazard') {
          // Check collision with toxic smoke hazard (skull ☠️)
          if (sweptYOverlaps && distFromBinX <= HAZARD_HITBOX_HALF_WIDTH) {
            // DIRECT HIT WITH TOXIC SMOKE!
            if (shieldActiveRef.current) {
              sounds.playTrashCatch(1);
              addFloatingText('🛡️ TERTANGKIS PERISAI!', item.x, 70, '#2563eb');
              spawnParticles(item.x, 74, '#3b82f6', 10);
            } else {
              // HURT: Guaranteed deduction of 1 Heart!
              heartsRef.current -= 1;
              comboRef.current = 0;
              setHearts(heartsRef.current);
              setCombo(0);

              sounds.playToxicHurt();
              setIsHurt(true);
              setTimeout(() => setIsHurt(false), 450);
              addFloatingText('-1 ❤️ KENA RACUN POLUSI!', item.x, 70, '#b91c1c');
              spawnParticles(item.x, 74, '#7f1d1d', 14);

              if (heartsRef.current <= 0) {
                // Game Over!
                heartsRef.current = 0;
                setHearts(0);
                setGameState('gameover');
                sounds.playGameOver();

                try {
                  const currentHigh = parseInt(localStorage.getItem('earth_falling_trash_high_score') || '0', 10);
                  if (scoreRef.current > currentHigh) {
                    localStorage.setItem('earth_falling_trash_high_score', scoreRef.current.toString());
                    setHighScore(scoreRef.current);
                  }
                } catch {
                  // ignore
                }
                return;
              }
            }
            continue; // Hazard consumed
          }
        } else if (item.kind === 'trash') {
          // Check catch for recyclable trash
          if (sweptYOverlaps && distFromBinX <= CATCH_HALF_WIDTH) {
            // SUCCESSFUL CATCH!
            caughtCountRef.current += 1;
            comboRef.current += 1;
            if (comboRef.current > maxComboRef.current) {
              maxComboRef.current = comboRef.current;
            }

            const currentCombo = comboRef.current;
            const comboMultiplier = currentCombo >= 10 ? 2.2 : currentCombo >= 5 ? 1.6 : currentCombo >= 3 ? 1.25 : 1.0;
            const pointsEarned = Math.round(item.points * comboMultiplier);
            scoreRef.current += pointsEarned;

            // Audio & visual feedback
            sounds.playTrashCatch(currentCombo);
            if (currentCombo % 5 === 0) {
              sounds.playCombo(Math.min(Math.floor(currentCombo / 5), 4));
            }
            addFloatingText(`+${pointsEarned}${currentCombo > 2 ? ` (${currentCombo}x Combo!)` : ''}`, item.x, 68, '#283618');
            spawnParticles(item.x, 74, item.color, 8);

            // Trash bin bounce squash
            setBinSquash(true);
            setTimeout(() => setBinSquash(false), 130);

            // Update UI state
            setScore(scoreRef.current);
            setCombo(comboRef.current);
            setMaxCombo(maxComboRef.current);
            setCaughtCount(caughtCountRef.current);

            // Level up progression every 100 points
            const newLevel = Math.floor(scoreRef.current / 100) + 1;
            if (newLevel > levelRef.current) {
              levelRef.current = newLevel;
              setLevel(newLevel);
              sounds.playFanfare();
              addFloatingText(`🔥 LEVEL ${newLevel}! MAKIN CEPAT!`, 50, 36, '#BC6C25');
            }
            continue; // Trash caught
          }
        } else if (item.kind === 'powerup') {
          // Check collection for powerup
          if (sweptYOverlaps && distFromBinX <= CATCH_HALF_WIDTH) {
            sounds.playPowerUp();
            if (item.subType === 'heart') {
              if (heartsRef.current < 3) {
                heartsRef.current += 1;
                setHearts(heartsRef.current);
                addFloatingText('+1 ❤️ PULIH!', item.x, 68, '#283618');
              } else {
                scoreRef.current += 50;
                setScore(scoreRef.current);
                addFloatingText('+50 POIN MAKS!', item.x, 68, '#283618');
              }
              spawnParticles(item.x, 74, '#606C38', 12);
            } else if (item.subType === 'shield') {
              shieldActiveRef.current = true;
              setShieldActive(true);
              setShieldTimeLeft(6);
              addFloatingText('🛡️ PERISAI AKTIF 6s!', item.x, 68, '#2563eb');
              spawnParticles(item.x, 74, '#60a5fa', 12);
            }
            continue; // Powerup collected
          }
        }

        // Check if item reached the ground / fell off screen
        if (nextY > 104) {
          if (item.kind === 'trash') {
            // Sampah tidak diambil / lolos ke tanah: mengurangi 1 nyawa
            if (shieldActiveRef.current) {
              addFloatingText('🛡️ PERISAI MELINDUNGI!', item.x, 88, '#2563eb');
              spawnParticles(item.x, 92, '#3b82f6', 6);
            } else {
              heartsRef.current -= 1;
              comboRef.current = 0;
              setHearts(heartsRef.current);
              setCombo(0);

              sounds.playToxicHurt();
              setIsHurt(true);
              setTimeout(() => setIsHurt(false), 450);
              addFloatingText('-1 ❤️ SAMPAH TERCECER!', item.x, 88, '#b91c1c');
              spawnParticles(item.x, 92, '#b91c1c', 8);

              if (heartsRef.current <= 0) {
                // Game Over!
                heartsRef.current = 0;
                setHearts(0);
                setGameState('gameover');
                sounds.playGameOver();

                try {
                  const currentHigh = parseInt(localStorage.getItem('earth_falling_trash_high_score') || '0', 10);
                  if (scoreRef.current > currentHigh) {
                    localStorage.setItem('earth_falling_trash_high_score', scoreRef.current.toString());
                    setHighScore(scoreRef.current);
                  }
                } catch {
                  // ignore
                }
                return;
              }
            }
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

  // Achievement title based on score
  const getRankBadge = (pts: number) => {
    if (pts >= 250) return { title: 'Eco-Champion Pinisi 🌟', desc: 'Legenda daur ulang kampus!' };
    if (pts >= 140) return { title: 'Penjaga Kampus Hijau 🌿', desc: 'Refleks memilah sangat tajam!' };
    if (pts >= 60) return { title: 'Penyelamat Bumi Muda 🍃', desc: 'Langkah awal yang hebat!' };
    return { title: 'Relawan Lingkungan 🌱', desc: 'Ayo coba lagi dan perbaiki rekor!' };
  };

  const rank = getRankBadge(score);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      {/* Outer Cabinet Card - Perfectly budgeted to fit mobile screens within 94dvh without overflowing */}
      <div className="relative w-full max-w-lg md:max-w-xl bg-[#FEFAE0] rounded-3xl shadow-2xl border-4 border-[#283618] overflow-hidden flex flex-col h-[94dvh] max-h-[690px] select-none text-[#283618]">
        
        {/* 1. Header Bar: Authentic DKV UNM Craft Arcade Aesthetic */}
        <div className="bg-[#283618] text-[#FEFAE0] px-3.5 sm:px-5 py-2.5 flex items-center justify-between border-b-3 border-[#1e2a12] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FEFAE0] p-1 flex items-center justify-center shadow-xs">
              <img src={bumiImg} alt="Earth" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="font-display font-black text-xs sm:text-sm tracking-wide uppercase text-white leading-tight">
                Misi Penyelamat Bumi
              </h2>
              <p className="text-[10px] text-[#FEFAE0]/70 font-semibold leading-none mt-0.5">
                3R Arcade • DKV UNM Makassar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleSound}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FEFAE0] transition active:scale-95 cursor-pointer"
              title={audioMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
            >
              {audioMuted ? <VolumeX className="w-4 h-4 text-red-300" /> : <Volume2 className="w-4 h-4 text-emerald-300" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-[#5B4436] hover:bg-[#433126] text-[#FEFAE0] transition active:scale-95 border border-[#FEFAE0]/30 cursor-pointer"
              title="Tutup Game"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. Compact Arcade HUD Dashboard */}
        <div className="bg-[#FEFAE0] px-3 py-1.5 border-b-2 border-[#283618]/15 flex items-center justify-between text-xs font-bold shrink-0">
          {/* Hearts / Health */}
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((heartIndex) => (
              <Heart
                key={heartIndex}
                className={`w-4 h-4 transition-transform duration-200 ${
                  heartIndex <= hearts
                    ? 'text-rose-600 fill-rose-600 scale-100 drop-shadow-xs'
                    : 'text-stone-300 fill-stone-200 scale-90'
                }`}
              />
            ))}
            {shieldActive && (
              <span className="ml-1 inline-flex items-center gap-0.5 text-[9px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full font-black border border-blue-300 animate-pulse">
                <Shield className="w-2.5 h-2.5 fill-blue-600" /> {shieldTimeLeft}s
              </span>
            )}
          </div>

          {/* Level & Combo Badge */}
          <div className="flex items-center gap-1.5">
            <span
              className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-black border transition-all ${
                level >= 3
                  ? 'bg-rose-600 text-white border-rose-700 animate-pulse'
                  : level === 2
                  ? 'bg-amber-600 text-white border-amber-700'
                  : 'bg-[#5B4436]/10 text-[#5B4436] border-[#5B4436]/20'
              }`}
            >
              {level >= 3 ? `🔥 LVL ${level} TURBO!` : level === 2 ? `⚡ LVL ${level} CEPAT` : `LVL ${level}`}
            </span>
            {combo > 1 && (
              <span className="bg-[#283618] text-[#FEFAE0] px-2 py-0.5 rounded-full font-display font-black text-[10px] tracking-wide animate-bounce">
                {combo}x COMBO!
              </span>
            )}
          </div>

          {/* Score & High Score */}
          <div className="flex items-center gap-2">
            <div className="text-right">
              <span className="text-[9px] text-[#5B4436] block leading-none font-bold">SKOR</span>
              <span className="font-display text-sm sm:text-base font-black text-[#283618] leading-none">{score}</span>
            </div>
            <div className="text-right pl-1.5 border-l border-[#283618]/20 hidden xs:block">
              <span className="text-[9px] text-[#5B4436] block leading-none flex items-center gap-0.5 font-bold">
                <Trophy className="w-2.5 h-2.5 text-amber-600" /> TOP
              </span>
              <span className="font-display text-xs font-bold text-amber-800 leading-none">{highScore}</span>
            </div>
          </div>
        </div>

        {/* 3. Main Arena Container (Flexible Height - adapts to small & big phones) */}
        <div
          ref={arenaRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className={`relative flex-1 w-full min-h-[240px] max-h-[440px] overflow-hidden select-none cursor-ew-resize transition-colors duration-150 ${
            isHurt ? 'bg-red-100' : 'bg-gradient-to-b from-[#F9F7EE] via-[#EFF6E7] to-[#DFEDD2]'
          }`}
          style={{ touchAction: 'none' }}
        >
          {/* Subtle eco hand-drawn cloud silhouettes in background */}
          <div className="absolute inset-0 pointer-events-none opacity-35">
            <div className="absolute top-3 left-4 w-20 h-6 bg-white/90 rounded-full blur-[1px]" />
            <div className="absolute top-10 right-8 w-24 h-7 bg-white/90 rounded-full blur-[1px]" />
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-8 bg-white/80 rounded-full blur-[1px]" />
          </div>

          {/* Hurt Red Flash Overlay */}
          {isHurt && (
            <div className="absolute inset-0 bg-red-600/20 pointer-events-none animate-pulse z-30" />
          )}

          {/* Floating Text Notifications */}
          {floatingTexts.map((ft) => (
            <div
              key={ft.id}
              className="absolute font-display font-black text-xs sm:text-sm pointer-events-none z-40 transform -translate-x-1/2 drop-shadow-sm animate-floatUp whitespace-nowrap"
              style={{
                left: `${ft.x}%`,
                top: `${ft.y}%`,
                color: ft.color,
                textShadow: '0 1px 3px rgba(255,255,255,0.9)',
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
                // Toxic Smoke Hazard (billowing industrial dark smog cloud with hazard tag)
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
                    <div className="relative w-10 h-10 rounded-2xl bg-stone-900 border-2 border-amber-500 flex items-center justify-center shadow-lg animate-pulse">
                      <span className="text-lg select-none">☠️</span>
                      {/* Dark puff cloud dots */}
                      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-stone-800" />
                      <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 rounded-full bg-stone-700" />
                    </div>
                    <span className="text-[8.5px] font-black text-white bg-red-700 px-1 py-0.2 rounded shadow-xs mt-0.5 border border-red-300 tracking-wider">
                      HINDARI!
                    </span>
                  </div>
                );
              }

              if (item.kind === 'powerup') {
                // Eco Power-Up (Shield or Life Sprout)
                return (
                  <div
                    key={item.id}
                    className="absolute pointer-events-none z-20 flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      transform: `translate(-50%, -50%) scale(1.05)`,
                    }}
                  >
                    <div
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xl shadow-md border-2 ${
                        item.subType === 'heart'
                          ? 'bg-[#FEFAE0] border-[#283618] text-[#283618] animate-bounce'
                          : 'bg-blue-100 border-blue-600 text-blue-700 animate-pulse'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span className="text-[8px] font-black text-[#283618] bg-[#FEFAE0] px-1 rounded shadow-xs mt-0.5 border border-[#283618]/30">
                      {item.label}
                    </span>
                  </div>
                );
              }

              // Recyclable Trash with Project Assets & Clear Craft Badge
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
                  <div className="relative p-0.5 bg-white/60 rounded-xl shadow-xs backdrop-blur-xs border border-[#283618]/20">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-contain filter drop-shadow-xs"
                        style={{ width: `${item.size}px`, height: `${item.size}px` }}
                      />
                    ) : (
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white shadow-xs"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.icon || '♻️'}
                      </div>
                    )}
                  </div>
                  <span className="text-[8px] font-extrabold text-[#283618] bg-[#FEFAE0]/90 px-1 py-0.2 rounded shadow-xs mt-0.5 border border-[#283618]/30 tracking-tight leading-none">
                    {item.label}
                  </span>
                </div>
              );
            })}

          {/* Grass Floor Baseline at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-7 bg-gradient-to-t from-[#283618] to-[#3b4e23] border-t-2 border-[#1e2a12] z-10 flex items-center justify-center">
            <span className="text-[9.5px] text-[#FEFAE0]/80 font-display font-semibold tracking-wider select-none">
              GERAKKAN TONG KE KIRI & KANAN
            </span>
          </div>

          {/* Player Trash Bin (Tong Sampah) */}
          <div
            className={`absolute bottom-2 z-20 transform -translate-x-1/2 pointer-events-none transition-transform duration-75 ${
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
                <div className="absolute -inset-3 rounded-full border-3 border-blue-400 bg-blue-400/20 animate-pulse pointer-events-none" />
              )}

              {/* Trash Bin Lid Open Angle */}
              <div className="w-20 sm:w-24 relative -mb-2.5 z-10 transform -rotate-6 transition-transform">
                <img
                  src={tongsampahAtasImg}
                  alt="Tutup Tong Sampah"
                  className="w-full object-contain drop-shadow-xs"
                />
              </div>

              {/* Trash Bin Body */}
              <div className="w-16 sm:w-20 relative">
                <img
                  src={tongsampahBawahImg}
                  alt="Tong Sampah"
                  className="w-full object-contain drop-shadow-md"
                />
                {/* Eco Badge on Bin */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#283618] text-[#FEFAE0] text-[8px] font-display font-black px-1.5 py-0.2 rounded-full border border-[#FEFAE0]/50 shadow-xs whitespace-nowrap">
                  3R KEEPER
                </div>
              </div>
            </div>
          </div>

          {/* INTRO SCREEN OVERLAY (Crafted Warm Poster) */}
          {gameState === 'intro' && (
            <div className="absolute inset-0 z-40 bg-[#FEFAE0]/95 backdrop-blur-xs flex flex-col items-center justify-center p-4 sm:p-6 text-center text-[#283618] animate-fadeIn">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#283618]/10 border-3 border-[#283618] flex items-center justify-center p-2 mb-2 shadow-md">
                <img src={bumiImg} alt="Earth" className="w-full h-full object-contain animate-bounce" />
              </div>

              <h3 className="text-base sm:text-xl font-display font-black text-[#283618] uppercase tracking-wide mb-1">
                Tangkap Sampah, Jaga Bumi!
              </h3>
              <p className="text-[#5B4436] text-xs max-w-sm mb-3.5 leading-relaxed font-medium">
                Pilah & tangkap sampah daur ulang! Semakin tinggi skor, sampah & kepulan asap polusi ☠️ akan <strong>jatuh semakin cepat & deras</strong>. Jangan biarkan sampah tercecer ke tanah (-1 ❤️)!
              </p>

              {/* 2 Clear Mission Cards */}
              <div className="grid grid-cols-2 gap-2 max-w-xs sm:max-w-sm w-full mb-4 text-left">
                <div className="bg-[#283618]/10 border-2 border-[#283618]/30 p-2 rounded-xl">
                  <div className="flex items-center gap-1 text-[#283618] font-display font-black text-[11px] mb-0.5">
                    <Sparkles className="w-3 h-3 text-[#606C38]" /> TANGKAP (+Poin):
                  </div>
                  <p className="text-[10px] text-[#5B4436] leading-tight font-medium">
                    Tangkap botol, kardus & kain. Jangan sampai tercecer ke tanah (-1 ❤️)!
                  </p>
                </div>
                <div className="bg-rose-50 border-2 border-rose-300 p-2 rounded-xl">
                  <div className="flex items-center gap-1 text-rose-700 font-display font-black text-[11px] mb-0.5">
                    <AlertTriangle className="w-3 h-3 text-rose-600" /> HINDARI (-1 ❤️):
                  </div>
                  <p className="text-[10px] text-rose-900 leading-tight font-medium">
                    Kepulan asap hitam polusi mengurangi 1 nyawa bumi!
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={startGame}
                className="px-6 py-2.5 sm:px-7 sm:py-3 bg-[#5B4436] hover:bg-[#433126] text-[#FEFAE0] font-display font-black text-xs sm:text-sm rounded-full border-2 border-[#FEFAE0] shadow-lg transition transform hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>MULAI MISI SEKARANG!</span>
              </button>
            </div>
          )}

          {/* GAME OVER SCREEN OVERLAY (Authentic Stamped Report Card) */}
          {gameState === 'gameover' && (
            <div className="absolute inset-0 z-40 bg-[#FEFAE0]/95 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center text-[#283618] animate-fadeIn overflow-y-auto">
              <div className="w-12 h-12 rounded-full bg-rose-100 border-2 border-rose-500 flex items-center justify-center mb-1.5 shadow-xs">
                <AlertTriangle className="w-6 h-6 text-rose-600" />
              </div>

              <h3 className="text-lg sm:text-xl font-display font-black text-[#283618] mb-0.5">
                MISI SELESAI!
              </h3>
              
              {/* Rank Badge */}
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#283618] text-[#FEFAE0] text-[11px] font-display font-black mb-2 shadow-xs">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>{rank.title}</span>
              </div>

              {/* Stats Grid */}
              <div className="bg-white/80 border-2 border-[#283618]/20 rounded-2xl p-2.5 max-w-xs w-full mb-2.5 grid grid-cols-3 gap-1.5 text-center shadow-xs">
                <div className="bg-[#283618]/5 p-1.5 rounded-xl">
                  <span className="text-[9px] text-[#5B4436] block font-bold">SKOR</span>
                  <span className="text-base font-display font-black text-[#283618]">{score}</span>
                </div>
                <div className="bg-[#283618]/5 p-1.5 rounded-xl">
                  <span className="text-[9px] text-[#5B4436] block font-bold">TERTANGKAP</span>
                  <span className="text-base font-display font-black text-[#5B4436]">{caughtCount}</span>
                </div>
                <div className="bg-[#283618]/5 p-1.5 rounded-xl">
                  <span className="text-[9px] text-[#5B4436] block font-bold">MAX COMBO</span>
                  <span className="text-base font-display font-black text-amber-700">{maxCombo}x</span>
                </div>
              </div>

              {/* Educational 3R Tip Card */}
              <div className="bg-[#5B4436]/10 border border-[#5B4436]/30 rounded-xl p-2.5 max-w-xs sm:max-w-sm w-full mb-3 text-left">
                <span className="text-[9.5px] font-display font-black uppercase text-[#5B4436] block mb-0.5">
                  💡 Fakta Kampanye 3R:
                </span>
                <p className="text-[10px] text-[#283618] leading-snug font-medium">
                  {eduTip}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={startGame}
                  className="px-5 py-2 sm:px-6 sm:py-2.5 bg-[#5B4436] hover:bg-[#433126] text-[#FEFAE0] font-display font-black text-xs rounded-full border border-[#FEFAE0] shadow-md transition transform hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Main Lagi</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 font-display font-bold text-xs rounded-full transition active:scale-95 cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 4. TACTILE MOBILE ARCADE CONTROLLER (Optimized specifically for phone screens) */}
        <div className="bg-[#FEFAE0] p-2.5 sm:p-3 border-t-3 border-[#283618]/20 flex flex-col gap-1.5 shrink-0 select-none">
          {/* Real-time Position Visual Bar & Drag Track */}
          <div
            className="w-full h-3 rounded-full bg-[#283618]/15 border border-[#283618]/25 relative cursor-pointer px-1 flex items-center"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = Math.max(10, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100));
              targetBinX.current = pct;
            }}
            onTouchMove={(e) => {
              if (e.touches.length > 0) {
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = Math.max(10, Math.min(90, ((e.touches[0].clientX - rect.left) / rect.width) * 100));
                targetBinX.current = pct;
              }
            }}
          >
            {/* Sliding Thumb Indicator */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#283618] border-2 border-[#FEFAE0] shadow-md -ml-2.5 transition-transform"
              style={{ left: `${binX}%` }}
            />
          </div>

          {/* Chunky Dual Thumb Steering Buttons */}
          <div className="flex items-center justify-between gap-2.5">
            <button
              type="button"
              onMouseDown={startMovingLeft}
              onMouseUp={stopMovingLeft}
              onMouseLeave={stopMovingLeft}
              onTouchStart={startMovingLeft}
              onTouchEnd={stopMovingLeft}
              className="flex-1 py-3 px-3 rounded-2xl bg-[#5B4436] hover:bg-[#433126] text-[#FEFAE0] font-display font-black text-xs sm:text-sm shadow-md border-b-4 border-[#3c2a21] active:border-b-0 active:translate-y-1 active:bg-[#3c2a21] transition-all flex items-center justify-center gap-1.5 cursor-pointer select-none"
            >
              <ArrowLeft className="w-4 h-4 stroke-[3]" />
              <span>GESER KIRI</span>
            </button>

            <button
              type="button"
              onMouseDown={startMovingRight}
              onMouseUp={stopMovingRight}
              onMouseLeave={stopMovingRight}
              onTouchStart={startMovingRight}
              onTouchEnd={stopMovingRight}
              className="flex-1 py-3 px-3 rounded-2xl bg-[#283618] hover:bg-[#1e2a12] text-[#FEFAE0] font-display font-black text-xs sm:text-sm shadow-md border-b-4 border-[#16200d] active:border-b-0 active:translate-y-1 active:bg-[#16200d] transition-all flex items-center justify-center gap-1.5 cursor-pointer select-none"
            >
              <span>GESER KANAN</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

          {/* Footnote instruction */}
          <div className="flex items-center justify-between text-[9.5px] text-[#5B4436] font-semibold px-1">
            <span>💡 Sentuh tombol kiri/kanan atau usap layar</span>
            <span className="hidden sm:inline">Keyboard: A / D / Panah</span>
          </div>
        </div>
      </div>
    </div>
  );
};
