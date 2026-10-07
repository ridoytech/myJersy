'use client';

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/header/Header';
import { HeroSection } from '@/components/hero/HeroSection';
import { KitsInTheWild } from '@/components/selected-work/KitsInTheWild';
import { BuiltForEverySquad } from '@/components/categories/BuiltForEverySquad';
import { CustomTeamwear } from '@/components/custom-builder/CustomTeamwear';
import { OrderProcess } from '@/components/process/OrderProcess';
import { Testimonials } from '@/components/testimonials/Testimonials';
import { FaqSection } from '@/components/faq/FaqSection';
import { CtaBanner } from '@/components/cta/CtaBanner';
import { Footer } from '@/components/footer/Footer';
import { ProductDetailModal } from '@/components/products/ProductDetailModal';
import { QuoteModal } from '@/components/modals/QuoteModal';
import { CartDrawer } from '@/components/modals/CartDrawer';

export default function Home() {
  return (
    <CartProvider>
      <div className="relative min-h-screen bg-[#F8F7F4] text-[#141416]">
        {/* Navigation */}
        <Header theme="dark" />

        {/* Hero Section */}
        <HeroSection />

        {/* Selected Work: Kits in the wild */}
        <KitsInTheWild />

        {/* Categories: Built for every squad (Section 3) */}
        <BuiltForEverySquad />

        {/* Custom Teamwear: Your crest. Your colours. Your names. (Section 4) */}
        <CustomTeamwear />

        {/* Note: TeamFavourites is preserved if needed for products catalog */}
        {/* <TeamFavourites /> */}

        {/* Process: From brief to match day */}
        <OrderProcess />

        {/* Social Proof & Testimonials: Trusted by teams */}
        <Testimonials />

        {/* FAQ Section: Questions, answered */}
        <div id="faq">
          <FaqSection />
        </div>

        {/* Final CTA Banner: Ready to kit out your team */}
        <CtaBanner />

        {/* Footer */}
        <Footer />

        {/* Overlays & Interactive Drawers */}
        <ProductDetailModal />
        <QuoteModal />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
