'use client';

import React from 'react';
import { ArrowRight, FileText, CheckCircle2, Scissors, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface Step {
  num: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Brief',
    desc: 'Tell us the garment, quantity, colours and match date. Send your logo and any references.',
    icon: <FileText className="w-5 h-5 text-[#141416]" />,
  },
  {
    num: '02',
    title: 'Design proof',
    desc: 'We send a 3D digital proof with names, numbers and placements. Revise until it is perfect.',
    icon: <CheckCircle2 className="w-5 h-5 text-[#141416]" />,
  },
  {
    num: '03',
    title: 'Production',
    desc: 'Once approved, your kit is printed, cut and sewn in-house with quality checks at every stage.',
    icon: <Scissors className="w-5 h-5 text-[#141416]" />,
  },
  {
    num: '04',
    title: 'Delivery',
    desc: 'Packed per player and collected or delivered, with dispatch timing confirmed in your quote.',
    icon: <Truck className="w-5 h-5 text-[#141416]" />,
  },
];

export function OrderProcess() {
  const { setIsQuoteModalOpen } = useCart();

  return (
    <section id="process" className="py-12 px-4 sm:px-8 lg:px-14 bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl bg-[#EEEBE2] border border-[#E0DCD1] p-8 sm:p-12 lg:p-16 space-y-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#DCD8CC] pb-6">
            <div className="space-y-1">
              <span className="text-[11px] font-bold tracking-widest text-[#858074] uppercase">
                HOW ORDERING WORKS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#141416]">
                From brief<br className="hidden sm:inline" /> to match day
              </h2>
            </div>
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#141416] hover:text-[#5E594F] transition-colors cursor-pointer"
            >
              <span>Full ordering guide</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 4 Steps Timeline Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, idx) => (
              <div key={idx} className="space-y-4 group">
                <div className="flex items-center justify-between border-b border-[#D8D4C7] pb-3">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#888377]">
                    {step.num}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/70 border border-[#D5D0C3] flex items-center justify-center group-hover:bg-[#141416] group-hover:text-white transition-colors duration-300">
                    {step.icon}
                  </div>
                </div>
                <div className="space-y-1.5 text-left">
                  <h3 className="text-lg font-extrabold text-[#141416] group-hover:text-amber-800 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#6B6559] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
