'use client';

import React, { useState } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'What is the minimum order?',
    a: 'Team orders start from 15 pieces per design. Sizes can be mixed freely across your squad within that quantity.',
  },
  {
    q: 'Can I order a sample first?',
    a: 'Yes! We can ship physical blank sizing samples or produce a one-off pre-production sample kit so your club committee can feel the fabric and inspect sizing before the full run.',
  },
  {
    q: 'How do I pay?',
    a: 'We send a detailed written quote. Once approved, we accept Bank EFT and Credit Card with a 50% deposit to start production and the remaining 50% prior to dispatch.',
  },
  {
    q: 'Do you help with design?',
    a: 'Absolutely! Our in-house sportswear designers will take your rough sketch or existing club colours and create a realistic 3D digital proof with unlimited revisions until it is match-ready.',
  },
  {
    q: 'What logo files should I send?',
    a: 'Vector files (AI, EPS, SVG, or high-resolution PDF) provide the sharpest sublimation print. If you only have a JPEG or PNG, our team can vectorize and redraw it for you.',
  },
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { setIsQuoteModalOpen } = useCart();

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 px-4 sm:px-8 lg:px-14 bg-[#F8F7F4] text-[#141416]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Title Area */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <span className="text-[11px] font-bold tracking-widest text-[#8A857A] uppercase">
              FAQS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#141416]">
              Questions,<br />answered.
            </h2>
            <p className="text-sm text-[#696459] leading-relaxed max-w-sm">
              Minimums, timings, artwork and delivery: the things teams ask us most.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#141416] hover:text-[#5E594F] transition-colors cursor-pointer"
              >
                <span>Ask our team</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Accordion List */}
          <div className="lg:col-span-7 divide-y divide-[#E5E1D7] border-t border-b border-[#E5E1D7]">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className="py-5">
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between text-left gap-4 font-bold text-base sm:text-lg text-[#141416] hover:text-black cursor-pointer transition-colors"
                  >
                    <span>{faq.q}</span>
                    <div className="w-7 h-7 rounded-full bg-[#EAE6DC] flex items-center justify-center flex-shrink-0 transition-transform">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 text-[#141416]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-[#141416]" />
                      )}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="pt-3 pr-8 text-xs sm:text-sm text-[#645F54] leading-relaxed animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
