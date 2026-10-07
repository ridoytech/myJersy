'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, animate } from 'motion/react';
import { ChevronLeft, ChevronRight, MoveHorizontal } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Academy training kit',
    subtitle: 'PREMIUM TRAINING WEAR & APPAREL',
    image: '/images/gallery-1.jpg',
  },
  {
    id: 'g2',
    title: 'Monastrial Match Kit 05',
    subtitle: 'MATCHWEAR • SUBLIMATED STRIPES',
    image: '/images/gallery-2.jpg',
  },
  {
    id: 'g3',
    title: 'Proform Speed Edition',
    subtitle: 'RUNNING & ATHLETICS • MICRO-MESH',
    image: '/images/gallery-3.jpg',
  },
  {
    id: 'g4',
    title: 'Stealth Blackout #7',
    subtitle: 'CHAMPIONSHIP SQUAD • BUILT TO WIN',
    image: '/images/gallery-4.jpg',
  },
  {
    id: 'g5',
    title: 'Varsity Athletics Singlet',
    subtitle: 'ELITE DIVISION • NUMBER 24',
    image: '/images/gallery-5.jpg',
  },
  {
    id: 'g6',
    title: 'Championship Matchday #16',
    subtitle: 'FIRST TEAM • SUBLIMATED MATCH KIT',
    image: '/images/gallery-7.jpg',
  },
  {
    id: 'g7',
    title: 'Custom Stealth Pro 00',
    subtitle: 'TEAMWEAR • GOLD METALLIC FOIL',
    image: '/images/gallery-8.jpg',
  },
  {
    id: 'g8',
    title: 'Striker High-Velocity Series',
    subtitle: 'ON-PITCH APPAREL & MATCH SOCKS',
    image: '/images/gallery-11.jpg',
  },
  {
    id: 'g9',
    title: 'Matchday Spotlight Pitch',
    subtitle: 'STADIUM PERFORMANCE • MATCH READY',
    image: '/images/gallery-6.jpg',
  },
];

export function KitsInTheWild() {
  // Card 3 active by default, matching user's reference image
  const [activeIdx, setActiveIdx] = useState(2);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  // Compute dynamic drag boundaries
  const updateConstraints = () => {
    if (containerRef.current && trackRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const trackWidth = trackRef.current.scrollWidth;
      const maxDrag = Math.max(0, trackWidth - containerWidth + 60);
      setDragConstraints({ left: -maxDrag, right: 0 });
    }
  };

  useEffect(() => {
    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  // Slide to card index smoothly
  const slideToCard = (idx: number) => {
    if (!containerRef.current || !trackRef.current) return;
    const cardWidth = 325;
    const targetX = Math.max(
      dragConstraints.left,
      Math.min(0, -(idx * cardWidth) + 40)
    );
    animate(dragX, targetX, {
      type: 'spring',
      damping: 28,
      stiffness: 220,
    });
  };

  const handleNext = () => {
    const next = (activeIdx + 1) % GALLERY_ITEMS.length;
    setActiveIdx(next);
    slideToCard(next);
  };

  const handlePrev = () => {
    const prev = (activeIdx - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setActiveIdx(prev);
    slideToCard(prev);
  };

  const currentItem = GALLERY_ITEMS[hoveredIdx !== null ? hoveredIdx : activeIdx]!;

  return (
    <section
      id="our-work"
      className="bg-[#0A0A0C] text-white pt-28 pb-20 sm:pb-24 px-6 sm:px-10 lg:px-16 overflow-hidden select-none border-t border-white/5 scroll-mt-20"
    >
      <div className="w-full space-y-8 lg:space-y-10">
        {/* Section Header matching user reference image */}
        <div className="flex items-end justify-between border-b border-white/10 pb-6">
          {/* Left Title with Eyebrow */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/50 uppercase">
              <span>PERFORMANCE MEETS STYLE</span>
              <span className="w-4 h-[1px] bg-white/40" />
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Kits in the wild
            </h2>
          </div>

          {/* Right Label */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-white/40 uppercase">
            <span>COLLECTION 2025</span>
            <span className="w-5 h-[1px] bg-white/30" />
          </div>
        </div>

        {/* Draggable Gallery Carousel Track */}
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing py-2"
        >
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={dragConstraints}
            dragElastic={0.12}
            style={{ x: dragX }}
            onDragEnd={() => {
              const currentX = dragX.get();
              const cardWidth = 325;
              const approxIdx = Math.round(-currentX / cardWidth);
              const clamped = Math.max(0, Math.min(GALLERY_ITEMS.length - 1, approxIdx));
              setActiveIdx(clamped);
            }}
            className="flex items-center gap-2 sm:gap-2.5 touch-pan-y"
          >
            {GALLERY_ITEMS.map((item, idx) => {
              const isCardActive = activeIdx === idx;
              const isCardHovered = hoveredIdx === idx;
              const isColorful = isCardHovered || (hoveredIdx === null && isCardActive);

              return (
                <motion.div
                  key={item.id}
                  onClick={() => {
                    setActiveIdx(idx);
                    slideToCard(idx);
                  }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={`relative flex-shrink-0 w-[240px] sm:w-[280px] lg:w-[315px] h-[460px] sm:h-[520px] lg:h-[580px] rounded-lg sm:rounded-xl overflow-hidden cursor-pointer group transition-all duration-500 ${
                    isCardActive
                      ? 'ring-1 ring-white/40 shadow-2xl z-10'
                      : 'hover:ring-1 hover:ring-white/20'
                  }`}
                >
                  {/* Photo with B&W by default -> Colorful on hover */}
                  <div className="relative w-full h-full overflow-hidden bg-zinc-950">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 280px, 320px"
                      priority={idx < 4}
                      className={`object-cover w-full h-full pointer-events-none transition-all duration-700 ease-out group-hover:scale-105 ${
                        isColorful
                          ? 'filter-none'
                          : 'filter grayscale contrast-125 brightness-95'
                      }`}
                    />

                    {/* Subtle vignette gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 opacity-70 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

                    {/* Floating Drag Indicator Badge on Card 4 (like reference image) */}
                    {idx === 3 && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-wider uppercase text-white/90 flex items-center gap-1.5 shadow-xl pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                        <MoveHorizontal className="w-3 h-3 text-white/70" />
                        <span>DRAG TO SLIDE</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Section Footer: Title on Left, Counter and Navigation on Right */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          {/* Active Item Title & Subtitle */}
          <div className="space-y-1 text-left">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white transition-all duration-300">
              {currentItem.title}
            </h3>
            <p className="text-[11px] sm:text-xs font-semibold text-white/50 tracking-wider uppercase transition-all duration-300">
              {currentItem.subtitle}
            </p>
          </div>

          {/* Right Counter & Circular Navigation Arrows */}
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="text-xs font-semibold tracking-widest text-white/50">
              {(activeIdx + 1).toString().padStart(2, '0')} / {GALLERY_ITEMS.length.toString().padStart(2, '0')}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous gallery image"
                className="w-9 h-9 rounded-full border border-white/20 hover:border-white/60 bg-white/5 hover:bg-white/15 flex items-center justify-center transition-all active:scale-90 text-white cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next gallery image"
                className="w-9 h-9 rounded-full border border-white/20 hover:border-white/60 bg-white/5 hover:bg-white/15 flex items-center justify-center transition-all active:scale-90 text-white cursor-pointer shadow-md"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
