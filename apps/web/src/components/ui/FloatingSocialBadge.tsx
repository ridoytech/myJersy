'use client';

import React from 'react';
import Image from 'next/image';
import { InstagramIcon, FacebookIcon, XIcon } from '@/components/ui/social-icons';
import { useCart } from '@/context/CartContext';

export function FloatingSocialBadge() {
  const { setIsQuoteModalOpen } = useCart();

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-3.5 mix-blend-difference text-white">
      {/* Circular Stamp: MY JERSEY • HERITAGE WEAR */}
      <div
        onClick={() => setIsQuoteModalOpen(true)}
        className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center cursor-pointer group hover:scale-105 transition-transform select-none"
        title="MY JERSEY • Heritage Wear"
      >
        <Image
          src="/images/genesis-badge.svg"
          alt="MY JERSEY • Heritage Wear"
          width={80}
          height={80}
          className="w-full h-full object-contain pointer-events-none drop-shadow-md"
        />
      </div>

      {/* Social Icons (Instagram, Facebook, X) */}
      <div className="flex items-center gap-2.5 text-white/80 pl-1">
        <a
          href="#"
          className="w-8 h-8 rounded-full border border-white/30 bg-transparent hover:border-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
          aria-label="Instagram"
        >
          <InstagramIcon className="w-3.5 h-3.5" />
        </a>
        <a
          href="#"
          className="w-8 h-8 rounded-full border border-white/30 bg-transparent hover:border-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
          aria-label="Facebook"
        >
          <FacebookIcon className="w-3.5 h-3.5" />
        </a>
        <a
          href="#"
          className="w-8 h-8 rounded-full border border-white/30 bg-transparent hover:border-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
          aria-label="X (Twitter)"
        >
          <XIcon className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
