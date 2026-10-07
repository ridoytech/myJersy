'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useCart } from '@/context/CartContext';
import { GenesisRotatingStamp } from '@/components/categories/GenesisRotatingStamp';

const FEATURES = [
  {
    num: '01',
    title: 'Full sublimation',
    desc: 'Unlimited colours dyed into the fabric, so it never cracks or peels.',
  },
  {
    num: '02',
    title: 'Names & numbers',
    desc: 'Every player personalised, printed and packed individually.',
  },
  {
    num: '03',
    title: 'Crests & sponsors',
    desc: 'Logos placed exactly where you want them, redrawn if needed.',
  },
  {
    num: '04',
    title: 'Fabric choice',
    desc: 'Six performance fabrics for every sport and climate.',
  },
];

export function CustomTeamwear() {
  const { setIsQuoteModalOpen } = useCart();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="custom-teamwear"
      className="relative w-full bg-[#F6F5F2] pt-10 pb-24 sm:pt-14 sm:pb-28 lg:pt-16 lg:pb-32 px-6 sm:px-10 lg:px-16 select-none"
    >
      <div className="max-w-[1240px] mx-auto relative">
        {/* Floating Rotating Stamp on Left (desktop) */}
        <div className="hidden 2xl:flex absolute -left-28 top-1/2 -translate-y-1/2 z-20 pointer-events-auto">
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="cursor-pointer transition-transform hover:scale-105 active:scale-95 focus:outline-none"
            title="Start an inquiry"
          >
            <GenesisRotatingStamp />
          </button>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Dark Jersey Card with Inset Fabric Swatch */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-start relative">
            {/* Stamp for large desktop between 1280px and 1536px */}
            <div className="hidden xl:flex 2xl:hidden absolute -left-20 top-1/2 -translate-y-1/2 z-20">
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="cursor-pointer scale-90 hover:scale-95 transition-transform"
                title="Start an inquiry"
              >
                <GenesisRotatingStamp />
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[460px] sm:max-w-[490px] drop-shadow-[0_25px_50px_rgba(0,0,0,0.14)] group cursor-pointer"
              onClick={() => setIsQuoteModalOpen(true)}
            >
              <div className="relative w-full aspect-[855/1035] rounded-[32px] overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.015]">
                <Image
                  src="/images/custom-teamwear/jersey-with-inset-transparent.png"
                  alt="Genesis Custom Teamwear - Sublimated black and gold jersey on wall hook"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 490px"
                  className="object-contain"
                />
              </div>

              {/* Mobile / Tablet Stamp Badge */}
              <div className="xl:hidden absolute -bottom-4 -left-3 sm:-left-4 z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsQuoteModalOpen(true);
                  }}
                  className="cursor-pointer scale-75 sm:scale-90"
                >
                  <GenesisRotatingStamp />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Real Typography, Feature List, and Action */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left lg:pl-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Category Eyebrow */}
              <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#8C867A]">
                CUSTOM TEAMWEAR
              </span>

              {/* Main Headline */}
              <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#141416] leading-[1.08] tracking-tight mt-3 mb-5 font-sans">
                Your crest.<br />
                Your colours.<br />
                Your names.
              </h2>

              {/* Subtitle / Paragraph */}
              <p className="text-[#645F54] text-sm sm:text-[15px] leading-relaxed max-w-[460px] mb-8 font-normal">
                Every kit starts as a blank canvas. Send us your idea or logo and we design, print and sew it in-house.
              </p>

              {/* Interactive Features List with Real Elements */}
              <div className="border-t border-[#E3DFD4] max-w-[500px]">
                {FEATURES.map((item, idx) => {
                  const isHovered = hoveredIdx === idx;
                  return (
                    <div
                      key={item.num}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      className={`group border-b border-[#E3DFD4] py-4 sm:py-4.5 px-2 -mx-2 rounded-xl transition-all duration-200 cursor-pointer ${
                        isHovered ? 'bg-[#ECE8DC]/50' : ''
                      }`}
                      onClick={() => setIsQuoteModalOpen(true)}
                    >
                      <div className="flex items-baseline gap-4 sm:gap-6">
                        {/* Real Number Element */}
                        <span className="text-xs sm:text-[13px] font-mono font-medium text-[#8C867A] w-6 flex-shrink-0 group-hover:text-[#141416] transition-colors">
                          {item.num}
                        </span>

                        {/* Real Title and Description Elements */}
                        <div className="flex-1">
                          <h3 className="text-sm sm:text-[15px] font-bold text-[#141416] leading-snug">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-[13px] text-[#787265] leading-relaxed mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Interactive Link */}
              <div className="pt-7">
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#141416] hover:text-[#5E594F] border-b border-[#141416] pb-0.5 transition-all group cursor-pointer"
                >
                  <span>Custom manufacturing</span>
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 font-bold">
                    ›
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
