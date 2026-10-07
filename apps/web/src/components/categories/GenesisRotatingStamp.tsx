'use client';

import React from 'react';
import { motion } from 'motion/react';

export function GenesisRotatingStamp() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
      className="w-20 h-20 sm:w-24 sm:h-24 select-none pointer-events-none opacity-90 hover:opacity-100 transition-opacity"
      aria-hidden="true"
    >
      <svg viewBox="0 0 140 140" className="w-full h-full overflow-visible">
        <defs>
          {/* Circular path for the circular text (radius 50 centered at 70,70) */}
          <path
            id="genesisInquiryCircle"
            d="M 70,70 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
            fill="none"
          />
        </defs>

        {/* Circular Text: MY JERSEY • INQUIRY • */}
        <text
          fill="#141416"
          fontSize="10"
          fontWeight="800"
          letterSpacing="0.28em"
          fontFamily="'Outfit', -apple-system, BlinkMacSystemFont, sans-serif"
          className="uppercase"
        >
          <textPath href="#genesisInquiryCircle" startOffset="0%">
            MY JERSEY • INQUIRY • MY JERSEY • INQUIRY •
          </textPath>
        </text>

        {/* Center Stylized Genesis G Monogram (Geometric Shield Cut) */}
        <g transform="translate(48, 48) scale(0.44)">
          {/* Outer G contour with sharp geometric cuts */}
          <path
            d="M 22 0 L 78 0 L 98 20 L 98 42 L 72 42 L 72 26 L 28 26 L 16 38 L 16 62 L 28 74 L 72 74 L 72 58 L 50 58 L 50 40 L 98 40 L 98 80 L 78 100 L 22 100 L 0 78 L 0 22 Z"
            fill="#141416"
          />
        </g>
      </svg>
    </motion.div>
  );
}
