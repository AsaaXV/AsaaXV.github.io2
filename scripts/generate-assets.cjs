const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.join(__dirname, '../public/assets');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. TOTEBAG SVG (Exact match to totebag.png: orange smiling totebag + khaki front bag with green pocket)
const totebagSvg = `
<svg viewBox="0 0 500 500" width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Filter for realistic watercolor rough edges and brush grain -->
    <filter id="roughPaper" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
    </filter>
    <linearGradient id="orangeGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#EB7234" />
      <stop offset="40%" stopColor="#DF6024" />
      <stop offset="80%" stopColor="#CD4A15" />
      <stop offset="100%" stopColor="#B33B0D" />
    </linearGradient>
    <linearGradient id="khakiGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#DEBE58" />
      <stop offset="50%" stopColor="#CAA943" />
      <stop offset="100%" stopColor="#A7872C" />
    </linearGradient>
    <linearGradient id="greenLogoGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#559132" />
      <stop offset="100%" stopColor="#316317" />
    </linearGradient>
  </defs>

  <!-- BACK TOTEBAG (Orange with Cute Smile) -->
  <g transform="rotate(-6 220 250)" filter="url(#roughPaper)">
    <!-- Handles -->
    <path d="M 175 160 C 165 95, 275 95, 265 160" stroke="#B33B0D" stroke-width="26" stroke-linecap="round" fill="none" />
    <path d="M 175 160 C 165 95, 275 95, 265 160" stroke="#E2652B" stroke-width="16" stroke-linecap="round" fill="none" />

    <!-- Bag Body -->
    <rect x="140" y="150" width="165" height="180" rx="28" fill="url(#orangeGrad)" stroke="#872906" stroke-width="8" stroke-linejoin="round" />

    <!-- Grid / Canvas texture pattern -->
    <g stroke="#FED6B3" stroke-width="2.5" stroke-opacity="0.35" stroke-dasharray="4 6">
      <line x1="160" y1="180" x2="285" y2="180" />
      <line x1="160" y1="210" x2="285" y2="210" />
      <line x1="160" y1="240" x2="285" y2="240" />
      <line x1="160" y1="270" x2="285" y2="270" />
      <line x1="160" y1="300" x2="285" y2="300" />
      <line x1="180" y1="165" x2="180" y2="315" />
      <line x1="210" y1="165" x2="210" y2="315" />
      <line x1="240" y1="165" x2="240" y2="315" />
      <line x1="270" y1="165" x2="270" y2="315" />
    </g>

    <!-- Adorable Hand-painted Face (Matching totebag.png) -->
    <!-- Eyes -->
    <circle cx="192" cy="225" r="7.5" fill="#3D1303" />
    <circle cx="252" cy="225" r="7.5" fill="#3D1303" />
    <!-- Smile -->
    <path d="M 200 248 Q 222 272 244 248" stroke="#3D1303" stroke-width="7.5" stroke-linecap="round" fill="none" />
  </g>

  <!-- FRONT FOLDED TOTEBAG (Khaki Yellow with Green Logo) -->
  <g transform="rotate(14 300 290)" filter="url(#roughPaper)">
    <!-- Folded Bag Silhouette -->
    <polygon points="230,195 365,210 390,360 250,370" fill="url(#khakiGrad)" stroke="#6B5414" stroke-width="8" stroke-linejoin="round" />

    <!-- Bag Top Opening Fold -->
    <polygon points="230,195 365,210 335,245 205,230" fill="#EAD176" stroke="#6B5414" stroke-width="6" stroke-linejoin="round" />

    <!-- Green U / Chevron Logo Emblem (Matching totebag.png) -->
    <path d="M 270,250 L 278,310 L 330,318 L 340,260 L 318,260 L 310,292 L 295,288 L 290,252 Z"
          fill="url(#greenLogoGrad)" stroke="#1F470F" stroke-width="5" stroke-linejoin="round" />

    <!-- Canvas grid texture -->
    <g stroke="#614B10" stroke-width="2" stroke-opacity="0.3" stroke-dasharray="3 5">
      <line x1="240" y1="240" x2="375" y2="255" />
      <line x1="245" y1="280" x2="380" y2="295" />
      <line x1="250" y1="320" x2="385" y2="335" />
      <line x1="270" y1="220" x2="280" y2="360" />
      <line x1="310" y1="225" x2="320" y2="365" />
      <line x1="350" y1="230" x2="360" y2="360" />
    </g>
  </g>
</svg>
`;

// 2. TUMBLER SVG (Exact match to tumbler.png: warm golden-brown/caramel tumbler with handle & dark lid)
const tumblerSvg = `
<svg viewBox="0 0 500 500" width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="roughPaper2" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
    </filter>
    <linearGradient id="caramelGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#A8752E" />
      <stop offset="25%" stopColor="#D5A250" />
      <stop offset="60%" stopColor="#BF8B3B" />
      <stop offset="100%" stopColor="#7E5218" />
    </linearGradient>
    <linearGradient id="lidGradTumbler" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#4A453F" />
      <stop offset="100%" stopColor="#25221E" />
    </linearGradient>
  </defs>

  <g transform="rotate(-3 250 250)" filter="url(#roughPaper2)">
    <!-- Right Handle (C-shape) -->
    <path d="M 285 205 C 345 205, 345 325, 280 325" stroke="#4F3512" stroke-width="26" stroke-linecap="round" fill="none" />
    <path d="M 285 205 C 335 205, 335 325, 280 325" stroke="#A8752E" stroke-width="14" stroke-linecap="round" fill="none" />

    <!-- Tumbler Main Body (Golden Caramel Watercolor Cylinder) -->
    <polygon points="190,165 295,165 280,380 205,380" fill="url(#caramelGrad)" stroke="#4A300E" stroke-width="8" stroke-linejoin="round" />

    <!-- Specular highlight streak on left side -->
    <line x1="210" y1="175" x2="218" y2="370" stroke="#FDE8B6" stroke-width="9" stroke-linecap="round" stroke-opacity="0.75" />
    <line x1="225" y1="175" x2="230" y2="368" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-opacity="0.6" />

    <!-- Dark Shading on right side -->
    <line x1="282" y1="175" x2="272" y2="370" stroke="#482F0B" stroke-width="8" stroke-linecap="round" stroke-opacity="0.45" />

    <!-- Dark Tumbler Lid Rim -->
    <rect x="180" y="142" width="125" height="26" rx="9" fill="url(#lidGradTumbler)" stroke="#221F1C" stroke-width="7" />
    <line x1="190" y1="148" x2="295" y2="148" stroke="#7A736B" stroke-width="4" stroke-linecap="round" stroke-opacity="0.7" />

    <!-- Sipper Spout Top Flap -->
    <polygon points="192,142 205,125 240,125 242,142" fill="#36322D" stroke="#1D1A17" stroke-width="5" stroke-linejoin="round" />

    <!-- Bottom Rim -->
    <path d="M 205 380 Q 242 390 280 380" stroke="#4A300E" stroke-width="7" fill="none" />
  </g>
</svg>
`;

// 3. SEDOTAN BESI SVG (Exact match to sedotan besi.png: crossed metallic straws + 3 yellow sparkle stars)
const sedotanBesiSvg = `
<svg viewBox="0 0 500 500" width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="roughPaper3" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
    </filter>
    <linearGradient id="metalStrawGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#4A4E54" />
      <stop offset="30%" stopColor="#CBD0D6" />
      <stop offset="50%" stopColor="#FFFFFF" />
      <stop offset="75%" stopColor="#828891" />
      <stop offset="100%" stopColor="#35383D" />
    </linearGradient>
  </defs>

  <g filter="url(#roughPaper3)">
    <!-- 1. STRAIGHT STRAW (Back: Bottom-Left to Top-Right) -->
    <g transform="rotate(-36 250 250)">
      <rect x="232" y="60" width="36" height="380" rx="18" fill="url(#metalStrawGrad)" stroke="#23262A" stroke-width="8" />
      <!-- Specular Highlight Line -->
      <line x1="244" y1="70" x2="244" y2="430" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" stroke-opacity="0.9" />
    </g>

    <!-- 2. BENT STRAW (Front: Angled tube with 45-deg elbow bend at top) -->
    <g>
      <!-- Lower Tube -->
      <path d="M 185 210 L 310 405" stroke="#23262A" stroke-width="44" stroke-linecap="round" />
      <path d="M 185 210 L 310 405" stroke="url(#metalStrawGrad)" stroke-width="34" stroke-linecap="round" />
      <path d="M 188 214 L 306 400" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" stroke-opacity="0.95" />

      <!-- Elbow Bend to Left -->
      <path d="M 130 195 L 185 210" stroke="#23262A" stroke-width="44" stroke-linecap="round" />
      <path d="M 130 195 L 185 210" stroke="url(#metalStrawGrad)" stroke-width="34" stroke-linecap="round" />
      <path d="M 134 196 L 185 210" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" stroke-opacity="0.95" />
    </g>

    <!-- 3. GOLDEN SPARKLES ✦ (Matching sedotan besi.png) -->
    <!-- Top Sparkle -->
    <g transform="translate(340, 115) scale(1.3)">
      <path d="M 0,-30 Q 2,-2 30,0 Q 2,2 0,30 Q -2,2 -30,0 Q -2,-2 0,-30 Z" fill="#FDD03B" stroke="#D19803" stroke-width="2" />
      <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
    </g>

    <!-- Middle-Right Sparkle -->
    <g transform="translate(380, 175) scale(0.9)">
      <path d="M 0,-30 Q 2,-2 30,0 Q 2,2 0,30 Q -2,2 -30,0 Q -2,-2 0,-30 Z" fill="#FDD03B" stroke="#D19803" stroke-width="2" />
      <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
    </g>

    <!-- Bottom-Left Sparkle -->
    <g transform="translate(135, 360) scale(1.1)">
      <path d="M 0,-30 Q 2,-2 30,0 Q 2,2 0,30 Q -2,2 -30,0 Q -2,-2 0,-30 Z" fill="#FDD03B" stroke="#D19803" stroke-width="2" />
      <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
    </g>
  </g>
</svg>
`;

// 4. TONG SAMPAH ATAS SVG (Exact match to tongsampah atas.png: galvanized metal trash can lid)
const tongsampahAtasSvg = `
<svg viewBox="0 0 500 250" width="1000" height="500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="roughPaper4" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
    </filter>
    <linearGradient id="lidMetalGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#7E858B" />
      <stop offset="35%" stopColor="#CED4D9" />
      <stop offset="60%" stopColor="#9FA7AD" />
      <stop offset="100%" stopColor="#555C62" />
    </linearGradient>
  </defs>

  <g filter="url(#roughPaper4)" transform="translate(0, 20)">
    <!-- Handle on top -->
    <path d="M 180 85 L 180 50 Q 180 32 205 32 L 295 32 Q 320 32 320 50 L 320 85"
          stroke="#3B4146" stroke-width="18" stroke-linecap="round" fill="none" />
    <path d="M 180 85 L 180 50 Q 180 32 205 32 L 295 32 Q 320 32 320 50 L 320 85"
          stroke="#C8CFD4" stroke-width="10" stroke-linecap="round" fill="none" />

    <!-- Convex Dome -->
    <path d="M 50 160 C 65 95, 180 75, 250 75 C 320 75, 435 95, 450 160 Z"
          fill="url(#lidMetalGrad)" stroke="#32373C" stroke-width="10" stroke-linejoin="round" />

    <!-- Dome Highlight curve -->
    <path d="M 100 120 Q 250 90 400 120" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" stroke-opacity="0.8" fill="none" />

    <!-- Bottom Flanged Rim with downward lip -->
    <path d="M 35 160 L 465 160 C 475 160, 480 172, 470 182 C 420 195, 80 195, 30 182 C 20 172, 25 160, 35 160 Z"
          fill="#868E94" stroke="#32373C" stroke-width="9" stroke-linejoin="round" />
    <line x1="50" y1="168" x2="450" y2="168" stroke="#D3D9DE" stroke-width="5" stroke-linecap="round" stroke-opacity="0.75" />
  </g>
</svg>
`;

// 5. TONG SAMPAH BAWAH SVG (Exact match to tongsampah bawah.png: corrugated metal bucket)
const tongsampahBawahSvg = `
<svg viewBox="0 0 500 500" width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="roughPaper5" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
    </filter>
    <linearGradient id="bodyMetalGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#6C7379" />
      <stop offset="25%" stopColor="#C4CBD0" />
      <stop offset="50%" stopColor="#E2E7EA" />
      <stop offset="75%" stopColor="#98A0A6" />
      <stop offset="100%" stopColor="#51575D" />
    </linearGradient>
  </defs>

  <g filter="url(#roughPaper5)">
    <!-- Tapered Galvanized Bucket Body -->
    <polygon points="60,40 440,40 390,460 110,460"
             fill="url(#bodyMetalGrad)" stroke="#32373C" stroke-width="11" stroke-linejoin="round" />

    <!-- Top Lip rim -->
    <rect x="50" y="32" width="400" height="20" rx="8" fill="#757D83" stroke="#32373C" stroke-width="6" />

    <!-- Vertical Corrugated Zinc Ribs (Matching tongsampah bawah.png) -->
    <!-- Rib 1 -->
    <line x1="135" y1="52" x2="155" y2="445" stroke="#3B4146" stroke-width="8" stroke-opacity="0.6" />
    <line x1="128" y1="52" x2="148" y2="445" stroke="#FFFFFF" stroke-width="4.5" stroke-opacity="0.75" />

    <!-- Rib 2 -->
    <line x1="205" y1="52" x2="215" y2="445" stroke="#3B4146" stroke-width="8" stroke-opacity="0.6" />
    <line x1="198" y1="52" x2="208" y2="445" stroke="#FFFFFF" stroke-width="4.5" stroke-opacity="0.75" />

    <!-- Rib 3 (Center) -->
    <line x1="285" y1="52" x2="278" y2="445" stroke="#3B4146" stroke-width="8" stroke-opacity="0.6" />
    <line x1="278" y1="52" x2="271" y2="445" stroke="#FFFFFF" stroke-width="4.5" stroke-opacity="0.75" />

    <!-- Rib 4 -->
    <line x1="365" y1="52" x2="345" y2="445" stroke="#3B4146" stroke-width="8" stroke-opacity="0.6" />
    <line x1="358" y1="52" x2="338" y2="445" stroke="#FFFFFF" stroke-width="4.5" stroke-opacity="0.75" />

    <!-- Bottom Rim Base -->
    <path d="M 110 460 Q 250 480 390 460" stroke="#32373C" stroke-width="9" fill="none" />
  </g>
</svg>
`;

// Helper for Folders 1, 2, 3
function getFolderSvg(bodyColor, strokeColor, shadowColor) {
  return `
<svg viewBox="0 0 500 500" width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="roughPaperFolder" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
  <g filter="url(#roughPaperFolder)">
    <!-- Folder Back flap with tab on top right-center -->
    <path d="M 100 135 L 235 135 L 275 170 L 400 170 C 420 170, 428 180, 428 200 L 428 385 C 428 405, 415 415, 395 415 L 105 415 C 85 415, 75 405, 75 385 L 75 165 C 75 145, 85 135, 100 135 Z"
          fill="${shadowColor}" stroke="${strokeColor}" stroke-width="10" stroke-linejoin="round" />

    <!-- Yellow Label Strip -->
    <rect x="130" y="152" width="100" height="28" rx="6" fill="#D3B843" stroke="${strokeColor}" stroke-width="4" />

    <!-- Front Cover with diagonal shadow -->
    <polygon points="75,200 428,200 415,415 88,415" fill="${bodyColor}" stroke="${strokeColor}" stroke-width="10" stroke-linejoin="round" />

    <!-- Diagonal shadow wash across right half -->
    <polygon points="250,200 428,200 415,415 310,415" fill="${shadowColor}" opacity="0.35" />

    <!-- Crease lines -->
    <line x1="95" y1="390" x2="405" y2="390" stroke="${strokeColor}" stroke-width="5" stroke-opacity="0.4" />
  </g>
</svg>
`;
}

// 6. FOLDER 1 (Light olive green: #779247)
const folder1Svg = getFolderSvg('#799649', '#3D4F21', '#5B7233');

// 7. FOLDER 2 (Medium foliage green: #53752E)
const folder2Svg = getFolderSvg('#557831', '#2C4017', '#3F5B22');

// 8. FOLDER 3 (Deep forest green: #2E501F)
const folder3Svg = getFolderSvg('#2F5321', '#172B0E', '#203A16');

// 9. SAMPAH 1 (Cluster of crumpled paper/packaging matching sampah1.png)
const sampah1Svg = `
<svg viewBox="0 0 500 350" width="1000" height="700" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="roughPaperS1" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
  <g filter="url(#roughPaperS1)">
    <!-- Yellow crumpled paper left -->
    <path d="M 80 230 Q 60 180, 120 160 Q 170 150, 180 210 Q 185 270, 125 285 Q 70 285, 80 230 Z"
          fill="#CCA23D" stroke="#7A5D1D" stroke-width="7" stroke-linejoin="round" />
    <!-- Dark red/brick crumpled box center -->
    <path d="M 165 175 Q 145 95, 230 85 Q 310 80, 300 170 Q 310 240, 220 235 Q 160 245, 165 175 Z"
          fill="#A43B2E" stroke="#5E1D15" stroke-width="7" stroke-linejoin="round" />
    <!-- Green crumpled wrapper bottom -->
    <path d="M 240 205 Q 230 140, 310 140 Q 380 150, 370 210 Q 365 275, 290 260 Q 235 260, 240 205 Z"
          fill="#528343" stroke="#2B4D20" stroke-width="7" stroke-linejoin="round" />
    <!-- White crumpled carton top right -->
    <path d="M 280 120 Q 295 60, 355 65 Q 395 90, 370 140 Q 330 155, 285 140 Z"
          fill="#E5EAE7" stroke="#798380" stroke-width="6" stroke-linejoin="round" />
  </g>
</svg>
`;

// 10. SAMPAH 2 (Cluster matching sampah2.png)
const sampah2Svg = `
<svg viewBox="0 0 500 350" width="1000" height="700" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="roughPaperS2" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
  <g filter="url(#roughPaperS2)">
    <!-- White/silver foil left -->
    <path d="M 100 220 Q 90 140, 160 145 Q 200 160, 185 220 Q 170 270, 115 255 Z"
          fill="#CAD0D1" stroke="#687173" stroke-width="7" stroke-linejoin="round" />
    <!-- Magenta crumpled wrapper center -->
    <path d="M 160 180 Q 150 95, 230 110 Q 290 125, 270 200 Q 250 265, 190 240 Z"
          fill="#9C4475" stroke="#561E3E" stroke-width="7" stroke-linejoin="round" />
    <!-- Golden yellow paper right -->
    <path d="M 230 180 Q 240 120, 310 135 Q 360 160, 345 225 Q 320 275, 250 255 Z"
          fill="#C49B36" stroke="#6E5319" stroke-width="7" stroke-linejoin="round" />
    <!-- Muted maroon top -->
    <path d="M 205 130 Q 215 70, 275 80 Q 300 115, 260 145 Z"
          fill="#87352D" stroke="#4C1A14" stroke-width="6" stroke-linejoin="round" />
  </g>
</svg>
`;

const assets = [
  { name: 'totebag', svg: totebagSvg },
  { name: 'tumbler', svg: tumblerSvg },
  { name: 'sedotan-besi', svg: sedotanBesiSvg },
  { name: 'tongsampah-atas', svg: tongsampahAtasSvg },
  { name: 'tongsampah-bawah', svg: tongsampahBawahSvg },
  { name: 'folder1', svg: folder1Svg },
  { name: 'folder2', svg: folder2Svg },
  { name: 'folder3', svg: folder3Svg },
  { name: 'sampah1', svg: sampah1Svg },
  { name: 'sampah2', svg: sampah2Svg },
];

async function generate() {
  for (const item of assets) {
    const pngPath = path.join(outDir, `${item.name}.png`);
    const svgPath = path.join(outDir, `${item.name}.svg`);

    // Write SVG
    fs.writeFileSync(svgPath, item.svg.trim());

    // Convert SVG to transparent PNG using sharp
    await sharp(Buffer.from(item.svg))
      .png()
      .toFile(pngPath);

    console.log(`Generated: ${item.name}.png and ${item.name}.svg`);
  }

  // Create alias for space-named variants like "sedotan besi.png", "tongsampah atas.png", etc.
  fs.copyFileSync(path.join(outDir, 'sedotan-besi.png'), path.join(outDir, 'sedotan besi.png'));
  fs.copyFileSync(path.join(outDir, 'tongsampah-atas.png'), path.join(outDir, 'tongsampah atas.png'));
  fs.copyFileSync(path.join(outDir, 'tongsampah-bawah.png'), path.join(outDir, 'tongsampah bawah.png'));

  console.log('All 10 asset files successfully created in public/assets!');
}

generate().catch(console.error);
