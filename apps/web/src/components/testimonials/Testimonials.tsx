'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

interface Testimonial {
  name: string;
  role: string;
  stars: number;
  quote: string;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Kagiso M.',
    role: 'Head Coach, Youth Academy',
    stars: 5,
    quote:
      'The kits arrived exactly like the proof: colours, names, everything. Our players haven’t stopped talking about them.',
    initials: 'KM',
  },
  {
    name: 'Naledi T.',
    role: 'Team Manager, Netball Club',
    stars: 5,
    quote:
      'They turned a rough sketch into a design we’re proud of in two days. Ordering forty sets was simple from start to finish.',
    initials: 'NT',
  },
  {
    name: 'Tebogo K.',
    role: 'Sports Director, Secondary School',
    stars: 5,
    quote:
      'Great fabric, clean print and honest timelines. We’re already planning next season’s training wear with them.',
    initials: 'TK',
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative w-full bg-[#F6F5F2] pt-16 pb-28 sm:pt-20 sm:pb-32 lg:pt-24 lg:pb-36 px-4 sm:px-8 lg:px-14 select-none overflow-hidden"
    >
      <div className="max-w-[1140px] mx-auto space-y-16 sm:space-y-20">
        {/* Arch Photo Collage with Nested Center Title */}
        <div className="relative w-full flex justify-center">
          <div className="w-full max-w-[960px] overflow-x-auto no-scrollbar pb-3 sm:pb-0">
            <div className="min-w-[800px] sm:min-w-0 flex items-end justify-center gap-2 sm:gap-2.5">
              {/* LEFT WING: Column 1 and Column 2 */}
              <div className="flex items-end gap-2 sm:gap-2.5 flex-shrink-0">
                {/* Column 1 (Far Left - 2 cards) */}
                <div className="flex flex-col gap-2 sm:gap-2.5 w-[75px] sm:w-[86px]">
                  {/* Card 01: Soccer Player #7 */}
                  <motion.div
                    whileHover={{ scale: 1.04, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full h-[105px] sm:h-[114px] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 shadow-md group cursor-pointer"
                  >
                    <Image
                      src="/images/testimonials/exact/card-01.png"
                      alt="Player kit #7"
                      fill
                      sizes="100px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>
                  {/* Card 02: 4 Framed Jerseys in Locker */}
                  <motion.div
                    whileHover={{ scale: 1.04, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full h-[70px] sm:h-[76px] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 shadow-md group cursor-pointer"
                  >
                    <Image
                      src="/images/testimonials/exact/card-02.png"
                      alt="Framed golden jerseys"
                      fill
                      sizes="100px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>
                </div>

                {/* Column 2 (Left-Mid - 3 cards) */}
                <div className="flex flex-col gap-2 sm:gap-2.5 w-[80px] sm:w-[92px]">
                  {/* Card 03: Orange Athletic Runner */}
                  <motion.div
                    whileHover={{ scale: 1.04, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full h-[62px] sm:h-[70px] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 shadow-md group cursor-pointer"
                  >
                    <Image
                      src="/images/testimonials/exact/card-03.png"
                      alt="Orange athletic runner"
                      fill
                      sizes="100px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>
                  {/* Card 04: Teal Player */}
                  <motion.div
                    whileHover={{ scale: 1.04, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full h-[62px] sm:h-[68px] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 shadow-md group cursor-pointer"
                  >
                    <Image
                      src="/images/testimonials/exact/card-04.png"
                      alt="Teal emerald jersey player"
                      fill
                      sizes="100px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>
                  {/* Card 05: Black Jersey on Hook #00 */}
                  <motion.div
                    whileHover={{ scale: 1.04, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full h-[72px] sm:h-[80px] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 shadow-md group cursor-pointer"
                  >
                    <Image
                      src="/images/testimonials/exact/card-05.png"
                      alt="Hanging black custom jersey 00"
                      fill
                      sizes="100px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>
                </div>
              </div>

              {/* CENTER NESTED BLOCK: Top Arch + Center Headline */}
              <div className="flex flex-col items-center flex-1 max-w-[460px] sm:max-w-[500px]">
                {/* Top Arch Formation (Columns 3, 4, 5, 6) */}
                <div className="flex items-end justify-center gap-2 sm:gap-2.5 w-full">
                  {/* Column 3: Female Athlete Tank */}
                  <motion.div
                    whileHover={{ scale: 1.04, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-[74px] sm:w-[86px] h-[132px] sm:h-[146px] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 shadow-md group cursor-pointer flex-shrink-0"
                  >
                    <Image
                      src="/images/testimonials/exact/card-06.png"
                      alt="Genesis squad athlete tank"
                      fill
                      sizes="100px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>

                  {/* Column 4: Green Athletic Mesh Apex */}
                  <motion.div
                    whileHover={{ scale: 1.04, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-[84px] sm:w-[94px] h-[150px] sm:h-[164px] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 shadow-lg group cursor-pointer flex-shrink-0"
                  >
                    <Image
                      src="/images/testimonials/exact/card-07.png"
                      alt="Breathable athletic mesh"
                      fill
                      sizes="110px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>

                  {/* Column 5: Maroon Patterned Soccer Player */}
                  <motion.div
                    whileHover={{ scale: 1.04, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-[84px] sm:w-[94px] h-[150px] sm:h-[164px] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 shadow-lg group cursor-pointer flex-shrink-0"
                  >
                    <Image
                      src="/images/testimonials/exact/card-08.png"
                      alt="Maroon patterned jersey soccer player"
                      fill
                      sizes="110px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>

                  {/* Column 6: Red Locker Room Jerseys 5 15 5 */}
                  <motion.div
                    whileHover={{ scale: 1.04, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-[74px] sm:w-[86px] h-[132px] sm:h-[146px] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 shadow-md group cursor-pointer flex-shrink-0"
                  >
                    <Image
                      src="/images/testimonials/exact/card-09.png"
                      alt="Squad kit locker room 5 15 5"
                      fill
                      sizes="100px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>
                </div>

                {/* Center Title Block sitting nestled directly below the arch */}
                <div className="pt-4 sm:pt-5 pb-1 text-center flex flex-col items-center">
                  {/* Subtle Badge */}
                  <span className="inline-block px-3 py-1 rounded-full bg-[#EAE6DC] text-[#706B60] text-[10px] sm:text-[11px] font-semibold tracking-wide mb-2.5">
                    Testimonials
                  </span>

                  {/* Main Two-Tone Headline */}
                  <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight leading-[1.12]">
                    <span className="text-[#141416] block">Trusted by teams</span>
                    <span className="text-[#969185] block font-semibold">on and off the pitch</span>
                  </h2>
                </div>
              </div>

              {/* RIGHT WING: Column 7 and Column 8 */}
              <div className="flex items-end gap-2 sm:gap-2.5 flex-shrink-0">
                {/* Column 7 (Right-Mid - 3 cards) */}
                <div className="flex flex-col gap-2 sm:gap-2.5 w-[80px] sm:w-[92px]">
                  {/* Card 10: White Jersey #20 */}
                  <motion.div
                    whileHover={{ scale: 1.04, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full h-[62px] sm:h-[70px] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 shadow-md group cursor-pointer"
                  >
                    <Image
                      src="/images/testimonials/exact/card-10.png"
                      alt="White match kit back view"
                      fill
                      sizes="100px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>
                  {/* Card 11: Orange/Blue Mannequin */}
                  <motion.div
                    whileHover={{ scale: 1.04, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full h-[62px] sm:h-[68px] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 shadow-md group cursor-pointer"
                  >
                    <Image
                      src="/images/testimonials/exact/card-11.png"
                      alt="Orange and blue split matchwear"
                      fill
                      sizes="100px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>
                  {/* Card 12: Basketball Jerseys #22 */}
                  <motion.div
                    whileHover={{ scale: 1.04, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full h-[72px] sm:h-[80px] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 shadow-md group cursor-pointer"
                  >
                    <Image
                      src="/images/testimonials/exact/card-12.png"
                      alt="Basketball sets singlets"
                      fill
                      sizes="100px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>
                </div>

                {/* Column 8 (Far Right - 2 cards) */}
                <div className="flex flex-col gap-2 sm:gap-2.5 w-[75px] sm:w-[86px]">
                  {/* Card 13: Female Athlete Close-up */}
                  <motion.div
                    whileHover={{ scale: 1.04, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full h-[105px] sm:h-[114px] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 shadow-md group cursor-pointer"
                  >
                    <Image
                      src="/images/testimonials/exact/card-13.png"
                      alt="Athlete portrait training kit"
                      fill
                      sizes="100px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>
                  {/* Card 14: Marble Strike Jersey Pattern */}
                  <motion.div
                    whileHover={{ scale: 1.04, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full h-[70px] sm:h-[76px] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 shadow-md group cursor-pointer"
                  >
                    <Image
                      src="/images/testimonials/exact/card-14.png"
                      alt="Marble strike sublimated jersey"
                      fill
                      sizes="100px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Real Customer Testimonial Reviews (Pixel-Perfect to Original) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 text-left max-w-[1040px] mx-auto pt-4">
          {TESTIMONIALS.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="space-y-3"
            >
              {/* Reviewer Header: Circular Black Initials + Name & Subtitle */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#141416] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                  {review.initials}
                </div>
                <div>
                  <h3 className="text-xs sm:text-[13px] font-bold text-[#141416] leading-tight">
                    {review.name}
                  </h3>
                  <p className="text-[11px] text-[#857F73] leading-tight mt-0.5">
                    {review.role}
                  </p>
                </div>
              </div>

              {/* 5 Solid Black Stars */}
              <div className="flex items-center gap-1 text-[#141416] text-xs select-none">
                {Array.from({ length: review.stars }).map((_, i) => (
                  <span key={i} className="text-sm leading-none">★</span>
                ))}
              </div>

              {/* Real Quote Text */}
              <p className="text-xs sm:text-[13px] text-[#423E36] leading-relaxed">
                &ldquo;{review.quote}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
