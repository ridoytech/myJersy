'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { GenesisRotatingStamp } from './GenesisRotatingStamp';

interface CategoryItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  image: string;
  bgColor: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-soccer',
    code: '[01]',
    title: 'Soccer',
    subtitle: 'Match kits, sublimated edge to edge.',
    image: '/images/clean-soccer.jpg',
    bgColor: '#060B0F',
  },
  {
    id: 'cat-basketball',
    code: '[02]',
    title: 'Basketball sets',
    subtitle: 'Singlets and shorts, cut to move.',
    image: '/images/clean-basketball.jpg',
    bgColor: '#070D12',
  },
  {
    id: 'cat-golf',
    code: '[03]',
    title: 'Golf',
    subtitle: 'Polos and layers for the course.',
    image: '/images/clean-golf.jpg',
    bgColor: '#16181C',
  },
  {
    id: 'cat-tennis',
    code: '[04]',
    title: 'Tennis',
    subtitle: 'Performance polo & court kits.',
    image: '/images/card-tennis-clean.jpg',
    bgColor: '#1A1C20',
  },
  {
    id: 'cat-hoodies',
    code: '[05]',
    title: 'Outerwear & Hoodies',
    subtitle: 'Warmups, track tops & fleece.',
    image: '/images/card-hoodie-clean.jpg',
    bgColor: '#1B151A',
  },
  {
    id: 'cat-accessories',
    code: '[06]',
    title: 'Caps & Accessories',
    subtitle: 'Custom embroidered squad headwear.',
    image: '/images/card-cap-clean.jpg',
    bgColor: '#181A1D',
  },
];

export function BuiltForEverySquad() {
  const { setIsQuoteModalOpen } = useCart();

  return (
    <section
      id="categories"
      className="relative bg-[#F6F5F2] text-[#141416] pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-28 px-6 sm:px-10 lg:px-16 xl:pl-32 xl:pr-16 overflow-hidden select-none border-t border-[#E8E6E0]"
    >
      <div className="relative w-full max-w-[1540px] mx-auto">
        {/* Floating Rotating Genesis Inquiry Stamp Badge on Left (Pure Vector SVG) */}
        <div className="hidden xl:block absolute -left-24 2xl:-left-28 top-[360px] 2xl:top-[380px] z-20 pointer-events-none">
          <GenesisRotatingStamp />
        </div>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-9 sm:pb-11">
          {/* Left Title with Eyebrow */}
          <div className="space-y-1.5 text-left">
            <span className="block text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#86837C] uppercase">
              SHOP BY GARMENT
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-[#141416] leading-[1.04]">
              Built for
              <br />
              every squad
            </h2>
          </div>

          {/* Right Link: View all products */}
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#141416] hover:text-[#5E594F] transition-colors cursor-pointer self-start sm:self-end pb-1.5"
          >
            <span>View all products</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Full 3x2 Grid: All 6 Cards are Proper Full-Height Cards with Real HTML Elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              onClick={() => setIsQuoteModalOpen(true)}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative h-[460px] sm:h-[500px] lg:h-[520px] rounded-[24px] sm:rounded-[28px] overflow-hidden cursor-pointer group border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_22px_45px_rgba(0,0,0,0.18)] transition-all duration-500"
              style={{ backgroundColor: cat.bgColor }}
            >
              {/* Product Background Image */}
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={idx < 3}
                  className="object-cover object-top w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Top Left Real Code Tag */}
                <div className="absolute top-5 left-5 z-20">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-white/90 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15">
                    {cat.code}
                  </span>
                </div>

                {/* Top Right Real Arrow Button */}
                <div className="absolute top-5 right-5 z-20">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 group-hover:bg-white group-hover:text-black group-hover:scale-110 group-hover:border-white transition-all duration-300 shadow-lg">
                    <ArrowUpRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </div>

                {/* Bottom Shadow / Gradient Overlay for Maximum Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 via-35% to-transparent pointer-events-none" />

                {/* Real HTML Typography for Title and Subtitle */}
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-7 text-white text-left z-20">
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-white/70 mt-1 font-normal line-clamp-1">
                    {cat.subtitle}
                  </p>
                </div>

                {/* Card Edge Ring Highlight */}
                <div className="absolute inset-0 rounded-[24px] sm:rounded-[28px] ring-1 ring-inset ring-white/10 group-hover:ring-white/30 transition-all pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
