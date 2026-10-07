'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/context/CartContext';

interface JerseySpot {
  id: string;
  name: string;
  glowColor: string;
  src: string;
  widthClasses: string;
  marginClasses: string;
  zIndex: number;
}

const JERSEY_SPOTS: JerseySpot[] = [
  {
    id: 'volt-left',
    name: 'Volt Diagonal',
    glowColor: 'rgba(234, 179, 8, 0.65)',
    src: '/images/jersey-volt.png',
    widthClasses: 'w-[160px] sm:w-[200px] lg:w-[220px] h-[200px] sm:h-[250px] lg:h-[280px]',
    marginClasses: '-mr-[70px] sm:-mr-[90px] lg:-mr-[100px]',
    zIndex: 10,
  },
  {
    id: 'emerald',
    name: 'Emerald Fade',
    glowColor: 'rgba(16, 185, 129, 0.65)',
    src: '/images/jersey-emerald.png',
    widthClasses: 'w-[190px] sm:w-[240px] lg:w-[260px] h-[240px] sm:h-[300px] lg:h-[330px]',
    marginClasses: '-mr-[60px] sm:-mr-[80px] lg:-mr-[90px]',
    zIndex: 20,
  },
  {
    id: 'legacy',
    name: 'Legacy 88 Black & Gold',
    glowColor: 'rgba(245, 158, 11, 0.75)',
    src: '/images/jersey-legacy.png',
    widthClasses: 'w-[240px] sm:w-[300px] lg:w-[330px] h-[300px] sm:h-[370px] lg:h-[410px]',
    marginClasses: 'mx-0',
    zIndex: 30,
  },
  {
    id: 'maroon',
    name: 'Heritage Maroon 7',
    glowColor: 'rgba(225, 29, 72, 0.65)',
    src: '/images/jersey-maroon.png',
    widthClasses: 'w-[190px] sm:w-[240px] lg:w-[260px] h-[240px] sm:h-[300px] lg:h-[330px]',
    marginClasses: '-ml-[60px] sm:-ml-[80px] lg:-ml-[90px]',
    zIndex: 20,
  },
  {
    id: 'volt',
    name: 'Volt Diagonal',
    glowColor: 'rgba(234, 179, 8, 0.65)',
    src: '/images/jersey-volt.png',
    widthClasses: 'w-[160px] sm:w-[200px] lg:w-[220px] h-[200px] sm:h-[250px] lg:h-[280px]',
    marginClasses: '-ml-[70px] sm:-ml-[90px] lg:-ml-[100px]',
    zIndex: 10,
  },
];

export function CtaBanner() {
  const { setIsQuoteModalOpen } = useCart();
  const [activeJersey, setActiveJersey] = useState<JerseySpot | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-8 lg:px-14 bg-[#F8F7F4]">
      <div className="max-w-[1240px] mx-auto">
        <div className="relative rounded-[28px] sm:rounded-[36px] bg-[#0E0F12] text-white overflow-hidden pt-10 sm:pt-14 lg:pt-16 pb-0 text-center shadow-2xl border border-white/10 flex flex-col justify-between">
          {/* Subtle Top Ambient Stadium Light Beam */}
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] opacity-25 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(220,180,100,0.18) 40%, transparent 70%)',
            }}
          />

          {/* Dynamic Atmospheric Colored Glows behind each jersey at the bottom */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[340px] z-0 transition-opacity duration-500"
            style={{
              opacity: isHovered ? 0.95 : 0.75,
              background: `
                radial-gradient(ellipse 260px 220px at 15% 100%, rgba(234, 179, 8, 0.4) 0%, transparent 75%),
                radial-gradient(ellipse 260px 220px at 30% 100%, rgba(16, 185, 129, 0.4) 0%, transparent 75%),
                radial-gradient(ellipse 320px 260px at 50% 90%, rgba(245, 158, 11, 0.5) 0%, transparent 75%),
                radial-gradient(ellipse 260px 220px at 70% 100%, rgba(225, 29, 72, 0.4) 0%, transparent 75%),
                radial-gradient(ellipse 260px 220px at 85% 100%, rgba(234, 179, 8, 0.4) 0%, transparent 75%)
              `,
            }}
          />

          {/* Removed old highlight glow, will attach tooltip locally */}

          {/* Heading Content */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-3 px-4 sm:px-6">
            <h2 className="text-4xl sm:text-6xl lg:text-[64px] font-bold tracking-[-0.03em] leading-[1.05] text-white">
              Ready to kit<br />out your team.
            </h2>
            <p className="text-white/70 text-xs sm:text-sm max-w-md mx-auto leading-relaxed pt-1">
              Tell us what you need. We’ll come back with a 3D design proof and a clear, written quote.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-white text-[#0E0F12] font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-xl hover:bg-neutral-100 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <span>Request a quote</span>
                <span className="text-base font-bold leading-none translate-y-[-0.5px]">›</span>
              </button>
              <a
                href="#products"
                className="px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-xs sm:text-sm hover:scale-[1.02] active:scale-95 transition-all cursor-pointer backdrop-blur"
              >
                Browse products
              </a>
            </div>
          </div>

          {/* 5 Interactive Seamless Jerseys Anchored Directly to the Bottom Edge */}
          <div
            className="relative z-10 mt-4 sm:mt-6 lg:mt-8 w-full max-w-5xl mx-auto select-none px-4 flex justify-center items-end"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setActiveJersey(null);
            }}
          >
            {JERSEY_SPOTS.map((spot) => (
              <div
                key={spot.id}
                className={`relative cursor-pointer transition-all duration-300 origin-bottom ${spot.widthClasses} ${spot.marginClasses}`}
                style={{ 
                  zIndex: activeJersey?.id === spot.id ? 40 : spot.zIndex 
                }}
                onMouseEnter={() => setActiveJersey(spot)}
              >
                {/* Tooltip local to each jersey */}
                <AnimatePresence>
                  {activeJersey?.id === spot.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      className="absolute -top-8 sm:-top-12 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap px-3.5 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-xs font-semibold text-white tracking-wide shadow-2xl pointer-events-none"
                    >
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ backgroundColor: spot.glowColor }}
                        />
                        {spot.name}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  className="relative w-full h-full origin-bottom"
                  animate={{
                    y: activeJersey?.id === spot.id ? -15 : 0,
                    scale: activeJersey?.id === spot.id ? 1.05 : 1,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 25,
                    mass: 0.8,
                  }}
                >
                  <Image
                    src={spot.src}
                    alt={spot.name}
                    fill
                    sizes="(max-width: 768px) 30vw, 20vw"
                    priority
                    className="object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.85)]"
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
