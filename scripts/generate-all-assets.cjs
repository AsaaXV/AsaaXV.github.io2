const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDirs = [
  path.join(__dirname, '../public/assets'),
  path.join(__dirname, '../src/assets'),
];

for (const dir of targetDirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 1. REDUCE ICON / BADGE (reduce.png)
const reduceSvg = `
<svg viewBox="0 0 500 500" width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="roughPaperR1" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
    </filter>
    <linearGradient id="gradEmerald" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4ADE80" />
      <stop offset="60%" stop-color="#16A34A" />
      <stop offset="100%" stop-color="#14532D" />
    </linearGradient>
    <linearGradient id="gradLeaf" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#86EFAC" />
      <stop offset="100%" stop-color="#15803D" />
    </linearGradient>
  </defs>

  <g filter="url(#roughPaperR1)">
    <!-- Outer Soft Halo -->
    <circle cx="250" cy="250" r="230" fill="#FEFAE0" stroke="#283618" stroke-width="8" stroke-dasharray="8 10" opacity="0.9" />
    <circle cx="250" cy="250" r="205" fill="#DCFCE7" stroke="#16A34A" stroke-width="6" />

    <!-- Downward Trend Eco Arrow (Reducing waste) -->
    <path d="M 120 180 Q 230 180, 270 280 L 310 240 L 320 370 L 190 360 L 235 315 Q 190 230, 120 220 Z"
          fill="url(#gradEmerald)" stroke="#14532D" stroke-width="8" stroke-linejoin="round" />

    <!-- Botanical Sprout Leaf -->
    <path d="M 280 200 C 260 110, 390 100, 390 100 C 390 100, 410 220, 310 220 Z"
          fill="url(#gradLeaf)" stroke="#166534" stroke-width="7" stroke-linejoin="round" />
    <path d="M 290 200 Q 340 160, 385 110" stroke="#FEFAE0" stroke-width="5" stroke-linecap="round" fill="none" />

    <!-- Cute sparkles -->
    <circle cx="150" cy="130" r="8" fill="#F59E0B" />
    <circle cx="390" cy="290" r="10" fill="#F59E0B" />
    <polygon points="120,290 128,300 120,310 112,300" fill="#22C55E" />

    <!-- Text badge: REDUCE -->
    <rect x="140" y="395" width="220" height="60" rx="30" fill="#14532D" stroke="#FEFAE0" stroke-width="5" />
    <text x="250" y="438" font-family="sans-serif" font-weight="900" font-size="34" fill="#FEFAE0" text-anchor="middle" letter-spacing="4">REDUCE</text>
  </g>
</svg>
`;

// 2. REUSE ICON / BADGE (reuse.png)
const reuseSvg = `
<svg viewBox="0 0 500 500" width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="roughPaperR2" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
    </filter>
    <linearGradient id="gradReuseAmber" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FDE68A" />
      <stop offset="50%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#78350F" />
    </linearGradient>
    <linearGradient id="gradReuseTeal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#6EE7B7" />
      <stop offset="70%" stop-color="#059669" />
      <stop offset="100%" stop-color="#064E3B" />
    </linearGradient>
  </defs>

  <g filter="url(#roughPaperR2)">
    <!-- Outer Badge -->
    <circle cx="250" cy="250" r="230" fill="#FEFAE0" stroke="#78350F" stroke-width="8" stroke-dasharray="8 10" opacity="0.9" />
    <circle cx="250" cy="250" r="205" fill="#FEF3C7" stroke="#D97706" stroke-width="6" />

    <!-- Two Loop Recirculating Arrows (Infinite Reuse) -->
    <!-- Top Arc Arrow -->
    <path d="M 140 230 C 140 140, 240 110, 330 140 L 320 100 L 390 160 L 310 200 L 320 165 C 245 140, 175 165, 175 230 Z"
          fill="url(#gradReuseTeal)" stroke="#064E3B" stroke-width="7" stroke-linejoin="round" />

    <!-- Bottom Arc Arrow -->
    <path d="M 360 270 C 360 360, 260 390, 170 360 L 180 400 L 110 340 L 190 300 L 180 335 C 255 360, 325 335, 325 270 Z"
          fill="url(#gradReuseAmber)" stroke="#78350F" stroke-width="7" stroke-linejoin="round" />

    <!-- Reusable Tumbler in the Center -->
    <g transform="translate(195, 160) scale(0.9)">
      <!-- Tumbler body -->
      <rect x="30" y="45" width="60" height="110" rx="14" fill="#0284C7" stroke="#075985" stroke-width="6" />
      <rect x="25" y="30" width="70" height="20" rx="8" fill="#F8FAFC" stroke="#075985" stroke-width="5" />
      <!-- Reusable Straw -->
      <path d="M 70 30 L 80 5 L 98 12" stroke="#E2E8F0" stroke-width="8" stroke-linecap="round" fill="none" />
      <path d="M 70 30 L 80 5 L 98 12" stroke="#475569" stroke-width="4" stroke-linecap="round" fill="none" />
      <!-- Leaf on Tumbler -->
      <path d="M 45 95 C 45 70, 75 75, 75 75 C 75 75, 75 105, 45 95 Z" fill="#86EFAC" stroke="#15803D" stroke-width="3" />
    </g>

    <!-- Text badge: REUSE -->
    <rect x="155" y="395" width="190" height="60" rx="30" fill="#78350F" stroke="#FEFAE0" stroke-width="5" />
    <text x="250" y="438" font-family="sans-serif" font-weight="900" font-size="34" fill="#FEFAE0" text-anchor="middle" letter-spacing="4">REUSE</text>
  </g>
</svg>
`;

// 3. RECYCLE ICON / BADGE (recycle.png)
const recycleSvg = `
<svg viewBox="0 0 500 500" width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="roughPaperR3" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
    </filter>
    <linearGradient id="gradRecycle" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#86EFAC" />
      <stop offset="50%" stop-color="#22C55E" />
      <stop offset="100%" stop-color="#14532D" />
    </linearGradient>
  </defs>

  <g filter="url(#roughPaperR3)">
    <!-- Outer Badge -->
    <circle cx="250" cy="250" r="230" fill="#FEFAE0" stroke="#14532D" stroke-width="8" stroke-dasharray="8 10" opacity="0.9" />
    <circle cx="250" cy="250" r="205" fill="#E0F2FE" stroke="#0284C7" stroke-width="6" />

    <!-- Classic 3-Arrow Recycling Mobius Loop with Watercolor Styling -->
    <!-- Top-Right to Bottom-Right Arrow -->
    <path d="M 235 90 L 265 90 L 330 185 L 305 200 L 380 230 L 385 145 L 360 160 L 290 60 L 235 60 Z"
          fill="url(#gradRecycle)" stroke="#14532D" stroke-width="6" stroke-linejoin="round" />

    <!-- Bottom Arrow (Right to Left) -->
    <path d="M 330 250 L 315 275 L 180 275 L 180 305 L 115 240 L 195 190 L 195 220 L 310 220 Z"
          fill="url(#gradRecycle)" stroke="#14532D" stroke-width="6" stroke-linejoin="round" transform="rotate(120 250 240)" />

    <!-- Left to Top-Left Arrow -->
    <path d="M 330 250 L 315 275 L 180 275 L 180 305 L 115 240 L 195 190 L 195 220 L 310 220 Z"
          fill="url(#gradRecycle)" stroke="#14532D" stroke-width="6" stroke-linejoin="round" transform="rotate(240 250 240)" />

    <!-- Center Eco Heart/Sprout -->
    <circle cx="250" cy="235" r="24" fill="#22C55E" stroke="#14532D" stroke-width="4" />
    <path d="M 242 245 C 235 225, 265 225, 258 245 Z" fill="#FEFAE0" />

    <!-- Text badge: RECYCLE -->
    <rect x="135" y="395" width="230" height="60" rx="30" fill="#15803D" stroke="#FEFAE0" stroke-width="5" />
    <text x="250" y="438" font-family="sans-serif" font-weight="900" font-size="34" fill="#FEFAE0" text-anchor="middle" letter-spacing="4">RECYCLE</text>
  </g>
</svg>
`;

// 4. BUMI HERO ILLUSTRATION (bumi.png)
const bumiSvg = `
<svg viewBox="0 0 500 500" width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="roughPaperEarth" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
    </filter>
    <radialGradient id="oceanGrad" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#38BDF8" />
      <stop offset="45%" stop-color="#0284C7" />
      <stop offset="85%" stop-color="#0369A1" />
      <stop offset="100%" stop-color="#075985" />
    </radialGradient>
    <linearGradient id="landGrad1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#A3E635" />
      <stop offset="40%" stop-color="#65A30D" />
      <stop offset="100%" stop-color="#3F6212" />
    </linearGradient>
    <linearGradient id="landGrad2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#86EFAC" />
      <stop offset="60%" stop-color="#22C55E" />
      <stop offset="100%" stop-color="#15803D" />
    </linearGradient>
  </defs>

  <!-- Sparkles around Earth -->
  <g fill="#F59E0B">
    <polygon points="65,110 75,130 65,150 55,130" />
    <polygon points="420,95 428,110 420,125 412,110" />
    <polygon points="435,360 445,375 435,390 425,375" />
    <circle cx="85" cy="380" r="9" fill="#10B981" />
    <circle cx="395" cy="220" r="7" fill="#FBBF24" />
  </g>

  <!-- Sprout on top of Earth head -->
  <g transform="translate(250, 48)">
    <path d="M 0 45 Q 5 25, 0 10" stroke="#15803D" stroke-width="8" stroke-linecap="round" fill="none" />
    <!-- Left Leaf -->
    <path d="M 0 20 C -25 15, -35 -5, -15 -10 C -5 -5, 0 10, 0 20 Z" fill="#84CC16" stroke="#3F6212" stroke-width="4" />
    <!-- Right Leaf -->
    <path d="M 0 15 C 25 10, 35 -10, 15 -15 C 5 -10, 0 5, 0 15 Z" fill="#A3E635" stroke="#3F6212" stroke-width="4" />
    <circle cx="0" cy="5" r="5" fill="#FEF08A" />
  </g>

  <g filter="url(#roughPaperEarth)">
    <!-- Atmosphere Glow -->
    <circle cx="250" cy="270" r="186" fill="#BAE6FD" opacity="0.3" />

    <!-- Earth Globe -->
    <circle cx="250" cy="270" r="175" fill="url(#oceanGrad)" stroke="#0C4A6E" stroke-width="9" />

    <!-- Continents / Island Landmasses (Detailed Watercolor Shapes) -->
    <!-- Continent 1 (Top Left / Eurasia-style) -->
    <path d="M 125 210 Q 150 160, 210 165 Q 265 170, 275 220 Q 255 245, 210 235 Q 175 260, 135 245 Z"
          fill="url(#landGrad1)" stroke="#365314" stroke-width="6" stroke-linejoin="round" />
    
    <!-- Continent 2 (Top Right / North America style) -->
    <path d="M 310 160 Q 370 170, 395 225 Q 365 265, 335 240 Q 295 250, 290 205 Z"
          fill="url(#landGrad2)" stroke="#14532D" stroke-width="6" stroke-linejoin="round" />

    <!-- Continent 3 (Bottom Center / Africa-Australia style) -->
    <path d="M 180 295 Q 220 275, 275 300 Q 320 335, 305 385 Q 240 425, 205 390 Q 165 350, 180 295 Z"
          fill="url(#landGrad1)" stroke="#365314" stroke-width="6" stroke-linejoin="round" />

    <!-- Cute Island specs -->
    <ellipse cx="140" cy="305" rx="14" ry="10" fill="#84CC16" stroke="#365314" stroke-width="3" />
    <ellipse cx="370" cy="310" rx="16" ry="12" fill="#84CC16" stroke="#365314" stroke-width="3" />

    <!-- Fluffy Clouds Floating on Earth -->
    <!-- Cloud 1 -->
    <g fill="#FFFFFF" opacity="0.9" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))">
      <path d="M 120 180 Q 135 160, 160 165 Q 185 155, 200 175 Q 215 185, 205 200 L 130 200 Z" />
    </g>
    <!-- Cloud 2 -->
    <g fill="#FFFFFF" opacity="0.9" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))">
      <path d="M 320 310 Q 345 295, 370 305 Q 395 300, 400 320 Q 395 335, 375 335 L 325 335 Z" />
    </g>

    <!-- Adorable Friendly Face on the Planet Earth! -->
    <!-- Left Eye with Twinkle -->
    <ellipse cx="205" cy="245" rx="11" ry="14" fill="#0F172A" />
    <circle cx="202" cy="240" r="4.5" fill="#FFFFFF" />
    <circle cx="208" cy="250" r="2" fill="#FFFFFF" />

    <!-- Right Eye with Twinkle -->
    <ellipse cx="295" cy="245" rx="11" ry="14" fill="#0F172A" />
    <circle cx="292" cy="240" r="4.5" fill="#FFFFFF" />
    <circle cx="298" cy="250" r="2" fill="#FFFFFF" />

    <!-- Rosy Cheeks -->
    <ellipse cx="180" cy="265" rx="14" ry="9" fill="#FB7185" opacity="0.75" />
    <ellipse cx="320" cy="265" rx="14" ry="9" fill="#FB7185" opacity="0.75" />

    <!-- Happy Smile -->
    <path d="M 230 265 Q 250 288, 270 265" stroke="#0F172A" stroke-width="6.5" stroke-linecap="round" fill="none" />
    <path d="M 237 270 Q 250 286, 263 270" fill="#EF4444" />
  </g>
</svg>
`;

// 5. BOTOL BEKAS PLASTIK (botol bekas.png)
const botolBekasSvg = `
<svg viewBox="0 0 500 500" width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="roughPaperBottle" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
    </filter>
    <linearGradient id="plasticBodyGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#E0F2FE" />
      <stop offset="25%" stop-color="#BAE6FD" />
      <stop offset="50%" stop-color="#F0F9FF" />
      <stop offset="85%" stop-color="#7DD3FC" />
      <stop offset="100%" stop-color="#38BDF8" />
    </linearGradient>
    <linearGradient id="capGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0284C7" />
      <stop offset="50%" stop-color="#0369A1" />
      <stop offset="100%" stop-color="#075985" />
    </linearGradient>
  </defs>

  <!-- Shadow on floor -->
  <ellipse cx="250" cy="450" rx="150" ry="22" fill="#283618" opacity="0.18" />

  <g transform="rotate(-15 250 260)" filter="url(#roughPaperBottle)">
    <!-- Blue Cap & Ring -->
    <rect x="220" y="55" width="60" height="35" rx="6" fill="url(#capGrad)" stroke="#0C4A6E" stroke-width="5" />
    <!-- Ridges on Cap -->
    <line x1="235" y1="58" x2="235" y2="87" stroke="#38BDF8" stroke-width="3" />
    <line x1="250" y1="58" x2="250" y2="87" stroke="#38BDF8" stroke-width="3" />
    <line x1="265" y1="58" x2="265" y2="87" stroke="#38BDF8" stroke-width="3" />
    <rect x="216" y="90" width="68" height="12" rx="4" fill="#0284C7" stroke="#0C4A6E" stroke-width="4" />

    <!-- Bottle Neck -->
    <path d="M 224 102 L 210 160 L 290 160 L 276 102 Z"
          fill="url(#plasticBodyGrad)" stroke="#0369A1" stroke-width="6" stroke-linejoin="round" />

    <!-- Main Bottle Body with Waist Ridges (Classic mineral water bottle) -->
    <path d="M 190 160 L 310 160 
             L 320 220 Q 305 235, 320 250
             L 325 320 Q 305 340, 325 360
             L 320 420 Q 250 445, 180 420
             L 175 360 Q 195 340, 175 320
             L 180 250 Q 195 235, 180 220 Z"
          fill="url(#plasticBodyGrad)" stroke="#0369A1" stroke-width="7" stroke-linejoin="round" />

    <!-- Water Label Banner -->
    <rect x="175" y="240" width="150" height="75" rx="8" fill="#38BDF8" stroke="#0284C7" stroke-width="4" />
    <rect x="180" y="245" width="140" height="65" rx="6" fill="#F0F9FF" />
    <!-- Label graphic: mountain / water drop -->
    <path d="M 210 290 L 235 260 L 255 280 L 275 255 L 295 290 Z" fill="#0284C7" opacity="0.6" />
    <text x="250" y="275" font-family="sans-serif" font-weight="bold" font-size="12" fill="#0369A1" text-anchor="middle">AIR MINERAL</text>
    <text x="250" y="295" font-family="sans-serif" font-size="9" fill="#0284C7" text-anchor="middle">600 mL • Bekas</text>

    <!-- Translucent Light Reflections / Shine -->
    <path d="M 195 170 L 190 410" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" opacity="0.75" />
    <path d="M 205 175 L 202 360" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity="0.5" />
    <path d="M 305 175 L 308 410" stroke="#0284C7" stroke-width="5" stroke-linecap="round" opacity="0.4" />

    <!-- Residual droplets inside -->
    <circle cx="240" cy="390" r="5" fill="#38BDF8" opacity="0.6" />
    <circle cx="265" cy="405" r="7" fill="#38BDF8" opacity="0.6" />
  </g>
</svg>
`;

// 6. POT BUNGA DARI BOTOL (Pot-Bunga-dari-Botol.png)
const potBungaSvg = `
<svg viewBox="0 0 500 500" width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="roughPaperPot" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
    </filter>
    <linearGradient id="potPaintGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FEF08A" />
      <stop offset="50%" stop-color="#FACC15" />
      <stop offset="100%" stop-color="#EAB308" />
    </linearGradient>
    <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#542810" />
      <stop offset="100%" stop-color="#2C1205" />
    </linearGradient>
    <linearGradient id="flowerGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FDA4AF" />
      <stop offset="50%" stop-color="#F43F5E" />
      <stop offset="100%" stop-color="#BE123C" />
    </linearGradient>
    <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#86EFAC" />
      <stop offset="60%" stop-color="#22C55E" />
      <stop offset="100%" stop-color="#14532D" />
    </linearGradient>
  </defs>

  <!-- Ground Shadow -->
  <ellipse cx="250" cy="455" rx="145" ry="24" fill="#283618" opacity="0.25" />

  <!-- Botanical Plant & Flower Growing Out Of Pot -->
  <g filter="url(#roughPaperPot)">
    <!-- Central Plant Stem -->
    <path d="M 250 250 Q 250 160, 248 115" stroke="#166534" stroke-width="12" stroke-linecap="round" fill="none" />

    <!-- Large Left Leaf -->
    <path d="M 250 210 C 170 210, 140 140, 110 165 C 130 230, 210 240, 250 230 Z"
          fill="url(#leafGrad)" stroke="#14532D" stroke-width="6" stroke-linejoin="round" />
    <path d="M 250 220 Q 180 195, 120 170" stroke="#DCFCE7" stroke-width="4" fill="none" />

    <!-- Large Right Leaf -->
    <path d="M 250 190 C 330 180, 360 120, 390 140 C 375 205, 290 225, 250 210 Z"
          fill="url(#leafGrad)" stroke="#14532D" stroke-width="6" stroke-linejoin="round" />
    <path d="M 250 200 Q 320 170, 380 145" stroke="#DCFCE7" stroke-width="4" fill="none" />

    <!-- Blooming Pink/Rose Flower on Top -->
    <g transform="translate(248, 110)">
      <!-- Petals -->
      <circle cx="-32" cy="-18" r="28" fill="url(#flowerGrad)" stroke="#9F1239" stroke-width="4" />
      <circle cx="32" cy="-18" r="28" fill="url(#flowerGrad)" stroke="#9F1239" stroke-width="4" />
      <circle cx="-20" cy="30" r="28" fill="url(#flowerGrad)" stroke="#9F1239" stroke-width="4" />
      <circle cx="20" cy="30" r="28" fill="url(#flowerGrad)" stroke="#9F1239" stroke-width="4" />
      <circle cx="0" cy="-38" r="28" fill="url(#flowerGrad)" stroke="#9F1239" stroke-width="4" />
      <!-- Flower Center Core -->
      <circle cx="0" cy="0" r="22" fill="#FEF08A" stroke="#CA8A04" stroke-width="5" />
      <circle cx="0" cy="0" r="16" fill="#F59E0B" />
      <circle cx="-5" cy="-5" r="3" fill="#FFFFFF" />
    </g>

    <!-- Upcycled Cut Plastic Bottle Pot with Cute Cat Ears Rim -->
    <!-- Pot Silhouette with Cut Cat Ears -->
    <path d="M 140 250
             L 165 200 L 195 245
             L 305 245 L 335 200 L 360 250
             L 350 430 Q 250 455, 150 430 Z"
          fill="url(#potPaintGrad)" stroke="#854D0E" stroke-width="7" stroke-linejoin="round" />

    <!-- Visible Rich Soil Surface at Top Opening -->
    <ellipse cx="250" cy="250" rx="95" ry="18" fill="url(#soilGrad)" stroke="#1E0A02" stroke-width="4" />

    <!-- Small pebbles/moss in soil -->
    <ellipse cx="210" cy="252" rx="10" ry="5" fill="#78716C" />
    <ellipse cx="280" cy="251" rx="8" ry="4" fill="#84CC16" />

    <!-- Adorable Hand-Painted Cat Face on the Pot! -->
    <!-- Left Eye -->
    <ellipse cx="210" cy="330" rx="8" ry="10" fill="#451A03" />
    <circle cx="208" cy="326" r="3.5" fill="#FFFFFF" />
    <!-- Right Eye -->
    <ellipse cx="290" cy="330" rx="8" ry="10" fill="#451A03" />
    <circle cx="288" cy="326" r="3.5" fill="#FFFFFF" />
    <!-- Cute Triangle Nose -->
    <polygon points="250,345 244,352 256,352" fill="#F43F5E" />
    <!-- Whiskers -->
    <line x1="175" y1="338" x2="150" y2="332" stroke="#451A03" stroke-width="4" stroke-linecap="round" />
    <line x1="175" y1="348" x2="148" y2="352" stroke="#451A03" stroke-width="4" stroke-linecap="round" />
    <line x1="325" y1="338" x2="350" y2="332" stroke="#451A03" stroke-width="4" stroke-linecap="round" />
    <line x1="325" y1="348" x2="352" y2="352" stroke="#451A03" stroke-width="4" stroke-linecap="round" />
    <!-- Smile -->
    <path d="M 244 354 Q 250 364, 256 354" stroke="#451A03" stroke-width="4" stroke-linecap="round" fill="none" />

    <!-- Rosy Blushing Cheeks -->
    <circle cx="185" cy="350" r="12" fill="#FDA4AF" opacity="0.8" />
    <circle cx="315" cy="350" r="12" fill="#FDA4AF" opacity="0.8" />

    <!-- Label badge on pot -->
    <rect x="180" y="395" width="140" height="28" rx="14" fill="#FEFAE0" stroke="#854D0E" stroke-width="3" />
    <text x="250" y="414" font-family="sans-serif" font-weight="bold" font-size="13" fill="#283618" text-anchor="middle">POT BOTOL DIY</text>
  </g>
</svg>
`;

// 7. KARDUS BEKAS (kardus-bekas.png)
const kardusBekasSvg = `
<svg viewBox="0 0 500 500" width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="roughPaperBox" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
    </filter>
    <linearGradient id="boxTopGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#EAB308" />
      <stop offset="100%" stop-color="#CA8A04" />
    </linearGradient>
    <linearGradient id="boxFrontGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>
    <linearGradient id="boxSideGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#92400E" />
      <stop offset="100%" stop-color="#78350F" />
    </linearGradient>
    <linearGradient id="tapeGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#FEF08A" />
      <stop offset="50%" stop-color="#FDE047" />
      <stop offset="100%" stop-color="#CA8A04" />
    </linearGradient>
  </defs>

  <!-- Shadow below box -->
  <polygon points="100,410 260,460 440,390 280,360" fill="#283618" opacity="0.22" />

  <g filter="url(#roughPaperBox)">
    <!-- 3D Perspective Cardboard Box -->
    <!-- Top Face (Tutup atas kardus) -->
    <polygon points="250,110 390,165 260,225 120,170"
             fill="url(#boxTopGrad)" stroke="#5B3615" stroke-width="7" stroke-linejoin="round" />

    <!-- Left / Front Face -->
    <polygon points="120,170 260,225 260,395 120,335"
             fill="url(#boxFrontGrad)" stroke="#5B3615" stroke-width="7" stroke-linejoin="round" />

    <!-- Right / Side Face -->
    <polygon points="260,225 390,165 390,325 260,395"
             fill="url(#boxSideGrad)" stroke="#5B3615" stroke-width="7" stroke-linejoin="round" />

    <!-- Kraft Packing Tape Sealing the Box -->
    <polygon points="240,110 260,110 270,225 250,225"
             fill="url(#tapeGrad)" stroke="#A16207" stroke-width="3" opacity="0.9" />
    <polygon points="250,225 270,225 270,395 250,395"
             fill="url(#tapeGrad)" stroke="#A16207" stroke-width="3" opacity="0.9" />

    <!-- Eco / Fragile / Recycle stamp on the front face -->
    <g transform="translate(155, 235) skewY(21) scale(0.85)">
      <!-- Box Stamp border -->
      <rect x="0" y="0" width="90" height="65" rx="8" fill="none" stroke="#451A03" stroke-width="4" stroke-dasharray="6 4" opacity="0.8" />
      <!-- Recycle 3 arrows stamp -->
      <path d="M 45 15 L 55 25 L 50 25 C 50 35, 40 40, 32 38 L 30 42 C 42 45, 55 38, 55 25 L 60 25 Z"
            fill="#451A03" opacity="0.8" />
      <text x="45" y="55" font-family="sans-serif" font-weight="900" font-size="12" fill="#451A03" text-anchor="middle" opacity="0.85">RECYCLE</text>
    </g>

    <!-- Side barcode & Handle cutout -->
    <g transform="translate(295, 205) skewY(-23) scale(0.85)">
      <!-- Oval Cutout Handle -->
      <rect x="25" y="10" width="55" height="18" rx="9" fill="#451A03" stroke="#2C1205" stroke-width="3" />
      <!-- Barcode lines -->
      <g stroke="#2C1205" stroke-width="3" opacity="0.7">
        <line x1="20" y1="45" x2="20" y2="70" />
        <line x1="26" y1="45" x2="26" y2="70" stroke-width="5" />
        <line x1="36" y1="45" x2="36" y2="70" />
        <line x1="42" y1="45" x2="42" y2="70" stroke-width="4" />
        <line x1="52" y1="45" x2="52" y2="70" />
        <line x1="60" y1="45" x2="60" y2="70" stroke-width="6" />
        <line x1="72" y1="45" x2="72" y2="70" />
        <line x1="80" y1="45" x2="80" y2="70" stroke-width="4" />
      </g>
    </g>

    <!-- Corrugated Texture Lines -->
    <g stroke="#92400E" stroke-width="1.5" stroke-opacity="0.35">
      <line x1="125" y1="190" x2="255" y2="245" />
      <line x1="125" y1="230" x2="255" y2="285" />
      <line x1="125" y1="270" x2="255" y2="325" />
      <line x1="125" y1="310" x2="255" y2="365" />
    </g>
  </g>
</svg>
`;

// 8. BAJU BAYI BEKAS (baju_bayi_bekas.png)
const bajuBayiBekasSvg = `
<svg viewBox="0 0 500 500" width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="roughPaperCloth" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
    </filter>
    <linearGradient id="babyClothGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#E0F2FE" />
      <stop offset="50%" stop-color="#BAE6FD" />
      <stop offset="100%" stop-color="#7DD3FC" />
    </linearGradient>
    <linearGradient id="collarGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F1F5F9" />
    </linearGradient>
  </defs>

  <!-- Hanger at Top -->
  <g transform="translate(250, 60)" stroke="#B45309" stroke-width="7" fill="none" stroke-linecap="round">
    <path d="M 0 0 C 0 -25, 25 -25, 25 -10 C 25 5, 0 15, 0 35" />
    <path d="M -85 70 L 0 35 L 85 70" stroke-linejoin="round" />
  </g>

  <g filter="url(#roughPaperCloth)">
    <!-- Baby Onesie Romper Body -->
    <path d="M 190 120
             L 120 160 L 95 210 L 140 235 L 175 190
             L 175 360
             C 175 390, 200 420, 225 410
             L 240 375 L 260 375 L 275 410
             C 300 420, 325 390, 325 360
             L 325 190
             L 360 235 L 405 210 L 380 160
             L 310 120
             Q 250 150, 190 120 Z"
          fill="url(#babyClothGrad)" stroke="#0284C7" stroke-width="7" stroke-linejoin="round" />

    <!-- Cute Soft Collar -->
    <path d="M 190 120 Q 250 155, 310 120 Q 250 135, 190 120 Z"
          fill="url(#collarGrad)" stroke="#0369A1" stroke-width="5" />

    <!-- Snap buttons on diaper leg bottom -->
    <circle cx="230" cy="395" r="5" fill="#FFFFFF" stroke="#0284C7" stroke-width="2.5" />
    <circle cx="250" cy="385" r="5" fill="#FFFFFF" stroke="#0284C7" stroke-width="2.5" />
    <circle cx="270" cy="395" r="5" fill="#FFFFFF" stroke="#0284C7" stroke-width="2.5" />

    <!-- Cute Baby Motifs on Fabric (Stars, Little Clouds) -->
    <!-- Center Teddy Bear / Cloud Face -->
    <g transform="translate(250, 250)">
      <circle cx="0" cy="0" r="38" fill="#FFFFFF" stroke="#0284C7" stroke-width="4" opacity="0.9" />
      <!-- Bear ears -->
      <circle cx="-28" cy="-28" r="14" fill="#FFFFFF" stroke="#0284C7" stroke-width="4" />
      <circle cx="28" cy="-28" r="14" fill="#FFFFFF" stroke="#0284C7" stroke-width="4" />
      <!-- Eyes & cute mouth -->
      <circle cx="-12" cy="-5" r="4" fill="#0369A1" />
      <circle cx="12" cy="-5" r="4" fill="#0369A1" />
      <ellipse cx="0" cy="8" rx="6" ry="4" fill="#0284C7" />
      <path d="M -7 14 Q 0 20, 7 14" stroke="#0369A1" stroke-width="3" stroke-linecap="round" fill="none" />
    </g>

    <!-- Little Star specs -->
    <polygon points="205,180 209,188 218,188 211,194 213,202 205,197 197,202 199,194 192,188 201,188" fill="#FACC15" />
    <polygon points="295,180 299,188 308,188 301,194 303,202 295,197 287,202 289,194 282,188 291,188" fill="#FACC15" />
    <polygon points="215,310 218,316 225,316 220,320 222,326 215,322 208,326 210,320 205,316 212,316" fill="#FACC15" />
    <polygon points="285,310 288,316 295,316 290,320 292,326 285,322 278,326 280,320 275,316 282,316" fill="#FACC15" />

    <!-- Cute Tag: "100% Katun Lembut" -->
    <rect x="180" y="440" width="140" height="26" rx="13" fill="#FEFAE0" stroke="#0284C7" stroke-width="3" />
    <text x="250" y="458" font-family="sans-serif" font-weight="bold" font-size="11" fill="#0369A1" text-anchor="middle">KATUN BAYI LEMBUT</text>
  </g>
</svg>
`;

// 9. KAIN DARI BAJU BEKAS BAYI (Kain_Dari_Baju_Bekas_Bayi.png)
const kainDariBajuBekasSvg = `
<svg viewBox="0 0 500 500" width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="roughPaperWipes" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
    </filter>
    <linearGradient id="wipe1Grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#BAE6FD" />
      <stop offset="100%" stop-color="#38BDF8" />
    </linearGradient>
    <linearGradient id="wipe2Grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FED7AA" />
      <stop offset="100%" stop-color="#FB923C" />
    </linearGradient>
    <linearGradient id="wipe3Grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#BBF7D0" />
      <stop offset="100%" stop-color="#4ADE80" />
    </linearGradient>
  </defs>

  <!-- Shadow on surface -->
  <polygon points="110,430 390,430 450,460 70,460" fill="#283618" opacity="0.2" />

  <g filter="url(#roughPaperWipes)">
    <!-- STACK OF UP-CYCLED COTTON CLEANING WIPES / LAP SERBAGUNA -->

    <!-- Wipe 3 (Bottom Layer: Soft Pastel Green with decorative stitching) -->
    <g transform="translate(0, 40)">
      <polygon points="120,300 380,290 410,380 90,390"
               fill="url(#wipe3Grad)" stroke="#15803D" stroke-width="6" stroke-linejoin="round" />
      <!-- Zigzag stitched border edge -->
      <polygon points="125,305 375,295 405,375 95,385"
               fill="none" stroke="#FEFAE0" stroke-width="3" stroke-dasharray="6 5" />
    </g>

    <!-- Wipe 2 (Middle Layer: Soft Pastel Orange/Peach) -->
    <g transform="translate(10, 20) rotate(-4 250 300)">
      <polygon points="125,270 385,260 415,350 95,360"
               fill="url(#wipe2Grad)" stroke="#C2410C" stroke-width="6" stroke-linejoin="round" />
      <!-- Zigzag stitched border edge -->
      <polygon points="130,275 380,265 410,345 100,355"
               fill="none" stroke="#7C2D12" stroke-width="3" stroke-dasharray="6 5" />
    </g>

    <!-- Wipe 1 (Top Layer: Upcycled from baby onesie with bear and star patterns) -->
    <g transform="rotate(3 250 250)">
      <polygon points="130,190 390,180 420,290 100,300"
               fill="url(#wipe1Grad)" stroke="#0369A1" stroke-width="7" stroke-linejoin="round" />
      
      <!-- Zigzag Serged Edge Stitching -->
      <polygon points="135,195 385,185 415,285 105,295"
               fill="none" stroke="#F43F5E" stroke-width="4" stroke-dasharray="6 4" />

      <!-- Baby Bear Fabric Pattern visible on the cut cloth -->
      <g transform="translate(260, 240) scale(0.65)">
        <circle cx="0" cy="0" r="30" fill="#FFFFFF" stroke="#0284C7" stroke-width="3" />
        <circle cx="-22" cy="-22" r="11" fill="#FFFFFF" stroke="#0284C7" stroke-width="3" />
        <circle cx="22" cy="-22" r="11" fill="#FFFFFF" stroke="#0284C7" stroke-width="3" />
        <circle cx="-10" cy="-4" r="3" fill="#0369A1" />
        <circle cx="10" cy="-4" r="3" fill="#0369A1" />
        <ellipse cx="0" cy="6" rx="5" ry="3" fill="#0284C7" />
      </g>
      <polygon points="175,220 178,226 185,226 180,230 182,236 175,232 168,236 170,230 165,226 172,226" fill="#FACC15" />
      <polygon points="345,230 348,236 355,236 350,240 352,246 345,242 338,246 340,240 335,236 342,236" fill="#FACC15" />
    </g>

    <!-- Jute / Eco Twine Ribbon wrapping the stack -->
    <path d="M 235 155 Q 260 150, 280 155 L 290 415 Q 260 420, 235 415 Z"
          fill="#CA8A04" stroke="#713F12" stroke-width="5" opacity="0.9" />

    <!-- Cute Bow Tie on Ribbon -->
    <g transform="translate(260, 165)">
      <ellipse cx="-20" cy="-5" rx="18" ry="10" fill="#EAB308" stroke="#713F12" stroke-width="4" transform="rotate(-20)" />
      <ellipse cx="20" cy="-5" rx="18" ry="10" fill="#EAB308" stroke="#713F12" stroke-width="4" transform="rotate(20)" />
      <circle cx="0" cy="0" r="9" fill="#CA8A04" stroke="#713F12" stroke-width="4" />
    </g>

    <!-- Eco Craft Tag Attached with string -->
    <g transform="translate(275, 185) rotate(12)">
      <!-- Tag string -->
      <line x1="-15" y1="-15" x2="0" y2="0" stroke="#713F12" stroke-width="3" />
      <!-- Kraft Tag Body -->
      <polygon points="0,0 20,-15 150,-15 150,45 20,45 0,0" fill="#FEF08A" stroke="#854D0E" stroke-width="4" />
      <circle cx="15" cy="0" r="4" fill="#713F12" />
      <text x="75" y="15" font-family="sans-serif" font-weight="900" font-size="12" fill="#713F12" text-anchor="middle">LAP SERBAGUNA</text>
      <text x="75" y="32" font-family="sans-serif" font-weight="bold" font-size="10" fill="#15803D" text-anchor="middle">Upcycled Cotton</text>
    </g>
  </g>
</svg>
`;

// Items to generate
const newAssets = [
  { name: 'reduce', svg: reduceSvg },
  { name: 'reuse', svg: reuseSvg },
  { name: 'recycle', svg: recycleSvg },
  { name: 'bumi', svg: bumiSvg },
  { name: 'botol bekas', svg: botolBekasSvg },
  { name: 'Pot-Bunga-dari-Botol', svg: potBungaSvg },
  { name: 'kardus-bekas', svg: kardusBekasSvg },
  { name: 'baju_bayi_bekas', svg: bajuBayiBekasSvg },
  { name: 'Kain_Dari_Baju_Bekas_Bayi', svg: kainDariBajuBekasSvg },
];

async function run() {
  for (const item of newAssets) {
    for (const dir of targetDirs) {
      const pngPath = path.join(dir, `${item.name}.png`);
      const svgPath = path.join(dir, `${item.name}.svg`);

      // Save SVG
      fs.writeFileSync(svgPath, item.svg.trim());

      // Save PNG via sharp
      await sharp(Buffer.from(item.svg))
        .png()
        .toFile(pngPath);

      console.log(`Generated in ${dir}: ${item.name}.png and .svg`);
    }
  }

  // Also make standard aliases to ensure any import or URL convention works flawlessly
  for (const dir of targetDirs) {
    // botol-bekas.png alias
    fs.copyFileSync(path.join(dir, 'botol bekas.png'), path.join(dir, 'botol-bekas.png'));
    // kardus bekas.png alias
    fs.copyFileSync(path.join(dir, 'kardus-bekas.png'), path.join(dir, 'kardus bekas.png'));
    // baju bayi bekas.png alias
    fs.copyFileSync(path.join(dir, 'baju_bayi_bekas.png'), path.join(dir, 'baju bayi bekas.png'));
    // Pot Bunga dari Botol.png alias
    fs.copyFileSync(path.join(dir, 'Pot-Bunga-dari-Botol.png'), path.join(dir, 'Pot Bunga dari Botol.png'));
    // Kain Dari Baju Bekas Bayi.png alias
    fs.copyFileSync(path.join(dir, 'Kain_Dari_Baju_Bekas_Bayi.png'), path.join(dir, 'Kain Dari Baju Bekas Bayi.png'));
  }

  console.log('Successfully generated all 9 custom assets + aliases in public/assets and src/assets!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
