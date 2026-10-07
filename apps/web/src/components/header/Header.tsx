'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  theme?: 'dark' | 'light';
}

export function Header({ theme = 'dark' }: HeaderProps) {
  const { totalCount, setIsCartOpen, setIsQuoteModalOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLightSection, setIsLightSection] = useState(theme === 'light');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Check if current scroll position is over a light section (like #categories or #products)
      const categoriesEl = document.getElementById('categories');
      if (categoriesEl) {
        const rect = categoriesEl.getBoundingClientRect();
        // Header height is ~70px
        if (rect.top <= 70 && rect.bottom >= 70) {
          setIsLightSection(true);
          return;
        }
      }

      const productsEl = document.getElementById('products');
      if (productsEl) {
        const rect = productsEl.getBoundingClientRect();
        if (rect.top <= 70 && rect.bottom >= 70) {
          setIsLightSection(true);
          return;
        }
      }

      setIsLightSection(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ease-out ${
        scrolled
          ? `top-3 sm:top-5 left-4 right-4 sm:left-12 sm:right-12 lg:left-24 lg:right-24 2xl:left-40 2xl:right-40 rounded-full px-5 sm:px-7 py-3.5 sm:py-4 ${
              isLightSection
                ? 'bg-white/90 backdrop-blur-md border border-black/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
                : 'bg-[#0E0F12]/90 backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.2)]'
            }`
          : 'top-0 left-0 right-0 px-6 sm:px-10 lg:px-16 py-5 sm:py-6 bg-transparent'
      }`}
    >
      <div className="relative w-full flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm tracking-tighter shadow-sm group-hover:scale-105 transition-all ${
              isLightSection
                ? 'bg-black/5 border border-black/15 text-[#141416]'
                : 'bg-white/10 border border-white/20 text-white backdrop-blur'
            }`}
          >
            <span className="font-extrabold text-xs">G</span>
          </div>
          <span
            className={`font-bold tracking-tight text-base sm:text-lg transition-colors ${
              isLightSection ? 'text-[#141416]' : 'text-white'
            }`}
          >
            MY JERSEY
          </span>
        </Link>

        {/* Center Navigation Pill matching reference designs */}
        <nav
          className={`hidden md:flex items-center gap-7 px-7 py-2 rounded-full text-xs font-semibold tracking-wider shadow-md transition-all ${
            isLightSection
              ? 'bg-white/85 hover:bg-white text-[#141416] border border-black/10'
              : 'bg-black/25 hover:bg-black/35 text-white/90 border border-white/10 backdrop-blur-md'
          }`}
        >
          <a
            href="#categories"
            className={`transition-colors ${
              isLightSection ? 'hover:text-black' : 'hover:text-white'
            }`}
          >
            PRODUCTS
          </a>
          <a
            href="#custom-builder"
            className={`transition-colors ${
              isLightSection ? 'hover:text-black' : 'hover:text-white'
            }`}
          >
            CUSTOM
          </a>
          <a
            href="#our-work"
            className={`transition-colors ${
              isLightSection ? 'hover:text-black' : 'hover:text-white'
            }`}
          >
            OUR WORK
          </a>
          <a
            href="#process"
            className={`transition-colors ${
              isLightSection ? 'hover:text-black' : 'hover:text-white'
            }`}
          >
            ABOUT
          </a>
        </nav>

        {/* Right Action: Request a Quote & Cart matching reference image */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className={`hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur transition-all active:scale-95 cursor-pointer shadow-sm ${
              isLightSection
                ? 'bg-white hover:bg-[#141416] hover:text-white text-[#141416] border border-black/15'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            }`}
          >
            REQUEST A QUOTE
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </button>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Open cart"
            className={`relative p-2 rounded-full backdrop-blur transition-all active:scale-95 cursor-pointer ${
              isLightSection
                ? 'bg-white hover:bg-black/5 border border-black/15 text-[#141416]'
                : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold flex items-center justify-center animate-pulse">
                {totalCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-full cursor-pointer ${
              isLightSection
                ? 'bg-white border border-black/15 text-[#141416]'
                : 'bg-black/25 text-white border border-white/10'
            }`}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-4 md:hidden p-4 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-white/10 text-white flex flex-col gap-3 shadow-2xl animate-in fade-in slide-in-from-top-2">
          <a
            href="#categories"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg hover:bg-white/10 font-medium text-sm"
          >
            PRODUCTS
          </a>
          <a
            href="#custom-builder"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg hover:bg-white/10 font-medium text-sm"
          >
            CUSTOM
          </a>
          <a
            href="#our-work"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg hover:bg-white/10 font-medium text-sm"
          >
            OUR WORK
          </a>
          <a
            href="#process"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg hover:bg-white/10 font-medium text-sm"
          >
            ABOUT
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsQuoteModalOpen(true);
            }}
            className="mt-2 w-full py-2.5 rounded-full bg-white text-slate-950 font-semibold text-xs uppercase tracking-wider"
          >
            REQUEST A QUOTE
          </button>
        </div>
      )}
    </header>
  );
}
