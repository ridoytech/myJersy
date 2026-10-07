'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { InstagramIcon, FacebookIcon, XIcon } from '@/components/ui/social-icons';
import { useCart } from '@/context/CartContext';

interface JerseySlide {
  id: string;
  category: string;
  title: string;
  line1: string;
  line2: string;
  subtitle: string;
  price: string;
  rawPrice: number;
  swatchColor: string;
  image: string;
  bgGradient: string;
  centerTagline: string;
}

const HERO_SLIDES: JerseySlide[] = [
  {
    id: 'maroon',
    category: 'SOCCER',
    title: 'Wear your heritage',
    line1: 'Wear your',
    line2: 'heritage',
    subtitle:
      'Elegance meets tradition in every stitch. Our heritage collection brings the spirit of the past to your everyday style.',
    price: 'P 340',
    rawPrice: 340,
    swatchColor: '#6e1124',
    image: '/images/jersey-maroon.png',
    bgGradient: 'radial-gradient(ellipse at 50% 50%, #5e0b1d 0%, #35040f 45%, #140105 100%)',
    centerTagline: 'Together\nwe build the legacy',
  },
  {
    id: 'emerald',
    category: 'SOCCER',
    title: 'Fade into the spotlight',
    line1: 'Fade into',
    line2: 'the spotlight',
    subtitle:
      'Bold football style meets unmatched comfort. Designed for players who want to stand out, our kits bring performance, quality and style together on and off the pitch.',
    price: 'P 320',
    rawPrice: 320,
    swatchColor: '#0e634e',
    image: '/images/jersey-emerald.png',
    bgGradient: 'radial-gradient(ellipse at 50% 50%, #0d5c49 0%, #06372b 45%, #021712 100%)',
    centerTagline: 'Custom fit for every team\nOn-pitch. Off-pitch. Always.',
  },
  {
    id: 'volt',
    category: 'SOCCER',
    title: 'High-speed diagonal',
    line1: 'High-speed',
    line2: 'diagonal',
    subtitle:
      'Loud colours, quiet confidence. Sublimated match kits designed to turn heads before the whistle blows.',
    price: 'P 320',
    rawPrice: 320,
    swatchColor: '#8a7608',
    image: '/images/jersey-volt.png',
    bgGradient: 'radial-gradient(ellipse at 50% 50%, #635208 0%, #3a3004 45%, #141101 100%)',
    centerTagline: 'Electrify the pitch\nUnmatched velocity.',
  },
  {
    id: 'legacy',
    category: 'SOCCER',
    title: 'Built for the legacy',
    line1: 'Built for the',
    line2: 'legacy',
    subtitle:
      'Matte stealth black with gold lettering. Engineered for clubs that play to dominate every single match.',
    price: 'P 360',
    rawPrice: 360,
    swatchColor: '#2b2520',
    image: '/images/jersey-legacy.png',
    bgGradient: 'radial-gradient(ellipse at 50% 50%, #2f2823 0%, #1a1714 45%, #0a0807 100%)',
    centerTagline: 'Dominance defined\nStealth precision.',
  },
];

export function HeroSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('XL');
  const [slideDirection, setSlideDirection] = useState<number>(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { setSelectedProductForDetail, setIsQuoteModalOpen } = useCart();

  const currentSlide = HERO_SLIDES[currentIdx]!;
  const nextIdx = (currentIdx + 1) % HERO_SLIDES.length;
  const nextSlide = HERO_SLIDES[nextIdx]!;

  const handleNext = () => {
    setSlideDirection(1);
    setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setSlideDirection(-1);
    setCurrentIdx((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleJumpToSlide = (idx: number) => {
    if (idx === currentIdx) return;
    setSlideDirection(idx > currentIdx ? 1 : -1);
    setCurrentIdx(idx);
  };

  // Subtle 3D mouse tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full text-white flex flex-col justify-between pt-24 sm:pt-28 pb-8 px-6 sm:px-10 lg:px-16 overflow-hidden select-none transition-colors duration-700"
      style={{
        background: currentSlide.bgGradient,
      }}
    >
      {/* Subtle radial vignette overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/10 to-black/45 pointer-events-none" />

      {/* TOP RIGHT: SOCCER, Price & Choose your size matching user's image */}
      <div className="absolute top-24 sm:top-28 right-6 sm:right-10 lg:right-16 z-20 flex flex-col items-end text-right">
        <div className="text-[11px] font-bold tracking-widest text-white/55 uppercase">
          {currentSlide.category}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
            className="text-3xl sm:text-4xl font-extrabold sm:font-black text-white tracking-tight my-0.5"
          >
            {currentSlide.price}
          </motion.div>
        </AnimatePresence>

        <div className="text-xs text-white/70 tracking-wide font-medium mt-1 mb-2.5">
          Choose your size
        </div>

        {/* Size buttons: S, M, L, XL with XL active by default */}
        <div className="flex items-center gap-2">
          {['S', 'M', 'L', 'XL'].map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                aria-label={`Select size ${size}`}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-slate-950 font-black shadow-lg scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* DEAD-CENTER FLOATING JERSEY: Exactly centered horizontally in the viewport */}
      <div className="pointer-events-auto lg:absolute lg:left-1/2 lg:top-[48%] lg:-translate-x-1/2 lg:-translate-y-1/2 z-10 flex flex-col items-center justify-center my-auto lg:my-0 py-2">
        <div
          className="relative w-[320px] h-[370px] sm:w-[440px] sm:h-[500px] lg:w-[560px] lg:h-[620px] flex flex-col items-center justify-center cursor-pointer group"
          style={{
            transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${
              -mousePos.y * 12
            }deg)`,
            transition: 'transform 0.18s ease-out',
          }}
          onClick={() =>
            setSelectedProductForDetail({
              name: currentSlide.title,
              price: currentSlide.rawPrice,
              image: currentSlide.image,
              ref: `GC-RJ-0${currentIdx + 1}`,
            })
          }
        >
          {/* PREMIUM 3D SLIDE ANIMATION */}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={currentSlide.id}
              initial={{
                x: slideDirection > 0 ? 360 : -360,
                opacity: 0,
                scale: 0.88,
                rotateY: slideDirection > 0 ? 16 : -16,
                filter: 'blur(5px)',
              }}
              animate={{
                x: 0,
                opacity: 1,
                scale: 1,
                rotateY: 0,
                filter: 'blur(0px)',
              }}
              exit={{
                x: slideDirection > 0 ? -360 : 360,
                opacity: 0,
                scale: 0.88,
                rotateY: slideDirection > 0 ? -16 : 16,
                filter: 'blur(5px)',
              }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1], // Silky luxury cubic-bezier ease
              }}
              className="relative w-full h-[90%] flex items-center justify-center animate-float-jersey"
            >
              {/* 100% Transparent PNG jersey with zero white background */}
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </AnimatePresence>

          {/* Soft 3D Floor Shadow under jersey */}
          <motion.div
            key={`shadow-${currentSlide.id}`}
            initial={{ opacity: 0.3, scale: 0.8 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="w-56 sm:w-72 lg:w-80 h-4 bg-black/60 blur-lg rounded-[100%] mx-auto mt-2 pointer-events-none"
          />
        </div>
      </div>

      {/* LEFT CONTENT COLUMN: Anchored directly on the left with NO extra breathing gap */}
      <div className="relative z-20 w-full flex-1 flex flex-col justify-center items-start my-auto">
        <div className="w-full max-w-lg lg:max-w-xl flex flex-col justify-center space-y-7 text-left">
          {/* Top Pagination Control: < > 01 —— 04 */}
          <div className="flex items-center gap-3.5 text-xs font-semibold text-white/90">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous look"
                className="w-7 h-7 rounded-full border border-white/20 bg-black/20 hover:bg-white/20 flex items-center justify-center transition-all active:scale-90 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next look"
                className="w-7 h-7 rounded-full border border-white/20 bg-black/20 hover:bg-white/20 flex items-center justify-center transition-all active:scale-90 cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Counter & horizontal line: 01 —— 04 */}
            <span className="tracking-widest text-[13px] font-medium text-white/90">
              0{currentIdx + 1}
            </span>

            {/* Progress line */}
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                const targetIdx = Math.round(ratio * (HERO_SLIDES.length - 1));
                handleJumpToSlide(targetIdx);
              }}
              className="relative w-20 sm:w-24 h-5 flex items-center cursor-pointer group"
              title="Click to jump look"
            >
              <div className="w-full h-[1.5px] bg-white/25 rounded-full group-hover:bg-white/40 transition-colors" />
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-md pointer-events-none"
                animate={{
                  left: `calc(${(currentIdx / (HERO_SLIDES.length - 1)) * 100}% - 4px)`,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>

            <span className="tracking-widest text-[13px] font-medium text-white/90">
              0{HERO_SLIDES.length}
            </span>
          </div>

          {/* Headline & Description with smooth slide */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, x: slideDirection > 0 ? -25 : 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: slideDirection > 0 ? 25 : -25 }}
              transition={{ duration: 0.38, ease: 'easeOut' }}
              className="space-y-4"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-[76px] font-bold tracking-tight leading-[1.03] text-white">
                <span className="block">{currentSlide.line1}</span>
                <span className="block">{currentSlide.line2}</span>
              </h1>
              <p className="text-white/70 text-sm sm:text-[15px] max-w-md leading-relaxed font-normal pt-1">
                {currentSlide.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Action Buttons matching Image 2 */}
          <div className="flex items-center gap-3.5 pt-2">
            <button
              onClick={() =>
                setSelectedProductForDetail({
                  name: currentSlide.title,
                  price: currentSlide.rawPrice,
                  image: currentSlide.image,
                  ref: `GC-RJ-0${currentIdx + 1}`,
                })
              }
              className="px-6 sm:px-7 py-3 rounded-full bg-white text-slate-950 font-bold text-xs tracking-wider flex items-center gap-2 shadow-xl hover:bg-white/90 active:scale-95 transition-all cursor-pointer"
            >
              <span>Get the look</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-6 sm:px-7 py-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/25 text-white font-medium text-xs tracking-wider backdrop-blur active:scale-95 transition-all cursor-pointer"
            >
              Request a quote
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR: Left stamp & socials, Center tagline, Right next-look thumbnail */}
      <div className="relative z-20 w-full pt-4 flex items-end justify-between text-xs text-white/60">
        {/* Bottom Left: Circular Heritage Badge & Socials matching Image 2 */}
        <div className="flex flex-col items-start gap-3.5">
          {/* Circular Stamp: MY JERSEY • HERITAGE WEAR */}
          <div
            onClick={() => setIsQuoteModalOpen(true)}
            className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center cursor-pointer group hover:scale-105 transition-transform select-none"
            title="MY JERSEY • Heritage Wear"
          >
            <Image
              src="/images/genesis-badge.svg"
              alt="MY JERSEY • Heritage Wear"
              width={96}
              height={96}
              className="w-full h-full object-contain pointer-events-none drop-shadow-md"
            />
          </div>

          {/* Social Icons (Instagram, Facebook, X) matching Image 2 */}
          <div className="flex items-center gap-2.5 text-white/80">
            <a
              href="#"
              className="w-8 h-8 rounded-full border border-white/20 bg-black/20 hover:border-white/60 hover:bg-white/15 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full border border-white/20 bg-black/20 hover:border-white/60 hover:bg-white/15 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full border border-white/20 bg-black/20 hover:border-white/60 hover:bg-white/15 flex items-center justify-center transition-all cursor-pointer"
              aria-label="X (Twitter)"
            >
              <XIcon className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Bottom Center: Tagline & Accent Line directly under center jersey */}
        <div className="hidden md:flex flex-col items-center justify-center pb-2 text-center absolute left-1/2 -translate-x-1/2 bottom-8">
          <p className="text-xs sm:text-[13px] text-white/70 font-light tracking-wide whitespace-pre-line leading-relaxed">
            {currentSlide.centerTagline}
          </p>
          <div className="w-8 h-[1.5px] bg-white/35 rounded-full mt-2" />
        </div>

        {/* Bottom Right: Next Look Thumbnail preview */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Miniature Floating Jersey (Clicking switches with premium slide animation) */}
          <button
            onClick={handleNext}
            aria-label={`Switch to ${nextSlide.title}`}
            className="relative w-16 h-20 sm:w-20 sm:h-24 lg:w-24 lg:h-28 flex items-center justify-center cursor-pointer group hover:scale-110 active:scale-95 transition-all"
            title={`Next look: ${nextSlide.title} (Click to slide)`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={nextSlide.id}
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.75 }}
                transition={{ duration: 0.35 }}
                className="relative w-full h-full drop-shadow-2xl"
              >
                <img
                  src={nextSlide.image}
                  alt={nextSlide.title}
                  className="w-full h-full object-contain p-1 filter drop-shadow-md"
                />
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>
    </section>
  );
}
