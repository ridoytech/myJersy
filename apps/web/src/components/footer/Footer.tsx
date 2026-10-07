'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/ui/social-icons';
import { useCart } from '@/context/CartContext';

export function Footer() {
  const { setIsQuoteModalOpen } = useCart();

  return (
    <footer className="bg-[#F8F7F4] text-[#141416] pt-16 pb-12 px-4 sm:px-8 lg:px-14 border-t border-[#E5E1D7] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 text-left">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#141416] text-white flex items-center justify-center font-extrabold text-xs">
                G
              </div>
              <span className="font-extrabold text-lg text-[#141416] tracking-tight">
                MY JERSEY
              </span>
            </Link>
            <p className="text-xs text-[#696459] max-w-sm leading-relaxed">
              Custom sublimated jerseys and performance teamwear, manufactured for clubs, academies, schools and corporate sporting events in Southern Africa.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[#726C60]">
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-[#DCD7CB] flex items-center justify-center hover:bg-[#141416] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-[#DCD7CB] flex items-center justify-center hover:bg-[#141416] hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-[#DCD7CB] flex items-center justify-center hover:bg-[#141416] hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-3 gap-6 text-xs">
            {/* Shop Column */}
            <div className="space-y-3">
              <h4 className="font-bold text-[#8A857A] uppercase tracking-wider text-[10px]">
                SHOP
              </h4>
              <ul className="space-y-2 text-[#544F44]">
                <li>
                  <a href="#products" className="hover:text-black transition-colors">
                    All products
                  </a>
                </li>
                <li>
                  <a href="#products" className="hover:text-black transition-colors">
                    Football jerseys
                  </a>
                </li>
                <li>
                  <a href="#custom-builder" className="hover:text-black transition-colors">
                    Custom kits
                  </a>
                </li>
                <li>
                  <a href="#products" className="hover:text-black transition-colors">
                    Training wear
                  </a>
                </li>
              </ul>
            </div>

            {/* Help Column */}
            <div className="space-y-3">
              <h4 className="font-bold text-[#8A857A] uppercase tracking-wider text-[10px]">
                HELP
              </h4>
              <ul className="space-y-2 text-[#544F44]">
                <li>
                  <a href="#process" className="hover:text-black transition-colors">
                    How to order
                  </a>
                </li>
                <li>
                  <a href="#custom-builder" className="hover:text-black transition-colors">
                    Fabrics & sizing
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-black transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="hover:text-black transition-colors text-left cursor-pointer"
                  >
                    Request a quote
                  </button>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-3">
              <h4 className="font-bold text-[#8A857A] uppercase tracking-wider text-[10px]">
                COMPANY
              </h4>
              <ul className="space-y-2 text-[#544F44]">
                <li>
                  <a href="#about" className="hover:text-black transition-colors">
                    About MY JERSEY
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-black transition-colors">
                    Custom manufacturing
                  </a>
                </li>
                <li>
                  <a href="#our-work" className="hover:text-black transition-colors">
                    Our work
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Privacy policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Small Bottom Copyright Bar */}
        <div className="pt-8 border-t border-[#E5E1D7] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#858073]">
          <div>© 2026 MY JERSEY. All rights reserved.</div>
          <div>hello@myjersey.com • Bangladesh</div>
        </div>

        {/* Giant Iconic Typography Banner */}
        <div className="pt-6 select-none pointer-events-none text-center">
          <h1 className="text-[12vw] font-black leading-none tracking-tighter text-[#141416]/90 block">
            MY JERSEY
          </h1>
        </div>
      </div>
    </footer>
  );
}
