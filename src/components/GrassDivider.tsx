import React from 'react';

interface GrassDividerProps {
  variant?: 'bottom' | 'tall' | 'spiky' | 'foliage';
  className?: string;
}

export const GrassDivider: React.FC<GrassDividerProps> = ({ variant = 'bottom', className = '' }) => {
  if (variant === 'spiky') {
    return (
      <div className={`w-full overflow-hidden leading-none select-none pointer-events-none ${className}`}>
        <svg
          viewBox="0 0 1200 90"
          className="w-full h-auto text-[#283618] block"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          {/* Layer 1: background spiky grass */}
          <path
            d="M0,90 L0,50 L30,20 L45,55 L80,10 L115,60 L150,25 L185,65 L225,15 L260,60 L300,30 L340,65 L380,20 L420,60 L460,25 L500,65 L540,15 L580,60 L620,25 L660,65 L700,20 L740,60 L780,15 L820,65 L860,30 L900,60 L940,20 L980,65 L1020,15 L1060,60 L1100,30 L1140,55 L1175,20 L1200,50 L1200,90 Z"
            opacity="0.4"
          />
          {/* Layer 2: foreground spiky grass */}
          <path
            d="M0,90 L0,60 L40,35 L70,70 L105,25 L140,70 L180,35 L215,75 L255,20 L295,70 L335,35 L375,75 L415,25 L455,70 L495,30 L535,75 L575,20 L615,70 L655,30 L695,75 L735,25 L775,70 L815,20 L855,75 L895,35 L935,70 L975,25 L1015,75 L1055,30 L1095,70 L1135,35 L1170,60 L1200,65 L1200,90 Z"
            fill="#283618"
          />
        </svg>
      </div>
    );
  }

  // Default organic lush grass matching Image 1, 2, 3, 4, 5, 6, 7
  return (
    <div className={`w-full overflow-hidden leading-none select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1200 130"
        className="w-full h-auto text-[#283618] block"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        {/* Layer 1: Back tall blades with lighter opacity */}
        <path
          d="M0,130 L0,65 L20,30 L38,70 L60,20 L85,75 L115,15 L145,80 L175,28 L205,75 L238,12 L270,80 L305,35 L340,85 L375,22 L415,80 L455,18 L495,85 L535,28 L575,80 L615,15 L655,85 L695,28 L735,80 L775,18 L815,85 L855,28 L895,75 L935,15 L975,80 L1015,25 L1055,80 L1095,28 L1135,75 L1170,35 L1200,70 L1200,130 Z"
          opacity="0.35"
        />

        {/* Layer 2: Midground blades with rich angles */}
        <path
          d="M0,130 L0,75 L30,42 L55,80 L90,32 L125,85 L165,38 L200,90 L245,22 L285,90 L325,42 L365,95 L410,32 L450,90 L500,28 L545,95 L595,38 L640,90 L685,32 L730,95 L780,22 L825,90 L870,38 L915,90 L960,28 L1005,95 L1050,38 L1095,90 L1140,42 L1180,78 L1200,85 L1200,130 Z"
          opacity="0.75"
        />

        {/* Layer 3: Foreground deep rich blades */}
        <path
          d="M0,130 L0,90 L40,60 L75,95 L120,52 L160,100 L205,58 L255,105 L300,52 L355,100 L405,58 L460,105 L515,48 L570,102 L625,58 L680,105 L735,52 L790,100 L845,58 L900,105 L955,52 L1010,100 L1065,60 L1120,102 L1170,68 L1200,95 L1200,130 Z"
          fill="#1c2711"
        />
      </svg>
    </div>
  );
};
