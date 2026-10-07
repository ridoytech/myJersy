'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Star, ShoppingBag, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  rating: number;
  price: number;
  image: string;
  refCode: string;
  description: string;
  colors: string[];
}

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'Heritage Maroon Jersey',
    category: 'Soccer',
    rating: 4.9,
    price: 340,
    image: '/images/jersey-maroon.png',
    refCode: 'GC-RJ-01',
    description:
      'Deep maroon with gold trim and a crest-ready chest. A classic cut for clubs that carry their history on their shoulders.',
    colors: ['#3A0813', '#E0AA3E'],
  },
  {
    id: 'prod-2',
    name: 'Legacy Black & Gold Jersey',
    category: 'Soccer',
    rating: 4.9,
    price: 360,
    image: '/images/jersey-legacy.png',
    refCode: 'GC-RJ-02',
    description:
      'Matte stealth black, metallic championship gold and customized typography. Engineered for clubs that play to dominate.',
    colors: ['#141416', '#E0AA3E'],
  },
  {
    id: 'prod-3',
    name: 'Volt Diagonal Jersey',
    category: 'Soccer',
    rating: 4.7,
    price: 320,
    image: '/images/jersey-volt.png',
    refCode: 'GC-RJ-03',
    description:
      'High-visibility neon volt split with carbon black and clean crest placement. Ultra-breathable micro-mesh for matchday performance.',
    colors: ['#C4F000', '#141416'],
  },
  {
    id: 'prod-4',
    name: 'Emerald Fade Jersey',
    category: 'Soccer',
    rating: 4.8,
    price: 320,
    image: '/images/jersey-emerald.png',
    refCode: 'GC-RJ-04',
    description:
      'Vibrant emerald green fade with gold detailing. Cut from ultra-breathable match performance fabric.',
    colors: ['#0E634E', '#E0AA3E'],
  },
  {
    id: 'prod-5',
    name: 'Signature Name & Number',
    category: 'Custom Teamwear',
    rating: 5.0,
    price: 380,
    image: '/images/jersey-legacy.png',
    refCode: 'GC-RJ-05',
    description:
      'Completely custom bespoke sublimated kit with your team badge, individual player name, and metallic foil numbering.',
    colors: ['#141416', '#E0AA3E'],
  },
];

export function TeamFavourites() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart, setSelectedProductForDetail, setIsQuoteModalOpen } = useCart();

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="products" className="py-24 px-4 sm:px-8 lg:px-14 bg-[#F8F7F4] text-[#141416]">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E7E4DC] pb-6">
          <div className="space-y-1">
            <span className="text-[11px] font-bold tracking-widest text-[#8A857A] uppercase">
              BEST SELLERS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#141416]">
              Team favourites
            </h2>
          </div>
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#141416] hover:text-[#5E594F] transition-colors cursor-pointer"
          >
            <span>View all products</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth py-3 px-1"
        >
          {PRODUCTS_DATA.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[260px] sm:w-[290px] rounded-2xl bg-white border border-[#E8E5DD] hover:border-[#D0CCC1] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
              onClick={() => setSelectedProductForDetail(product)}
            >
              {/* Card Image Area */}
              <div className="relative h-[300px] w-full bg-[#F2F0EB] flex items-center justify-center p-6 overflow-hidden">
                <span className="absolute top-4 left-4 px-2.5 py-0.5 rounded-full bg-white/80 backdrop-blur text-[10px] font-semibold text-[#57534A] border border-white">
                  {product.category}
                </span>

                <div className="relative w-full h-full group-hover:scale-108 transition-transform duration-500 flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-2 drop-shadow-lg"
                  />
                </div>
              </div>

              {/* Card Info */}
              <div className="p-5 flex items-center justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-[#141416] leading-snug group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-[#787266]">
                    <div className="flex text-amber-500">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    </div>
                    <span>{product.rating.toFixed(1)}/5</span>
                  </div>
                  <div className="text-xs font-semibold text-[#141416] pt-1">
                    From P {product.price}
                  </div>
                </div>

                {/* Quick Add To Cart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({
                      name: product.name,
                      price: product.price,
                      size: 'L',
                      quantity: 1,
                      image: product.image,
                      color: 'Original',
                    });
                  }}
                  aria-label={`Add ${product.name} to cart`}
                  className="w-10 h-10 rounded-full bg-[#141416] hover:bg-black text-white flex items-center justify-center shadow-md active:scale-90 transition-all cursor-pointer flex-shrink-0"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Bottom Controls & Rotating Stamp */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E7E4DC]">
          {/* Rotating Stamp */}
          <div
            onClick={() => setIsQuoteModalOpen(true)}
            className="relative w-14 h-14 flex items-center justify-center cursor-pointer group hover:scale-105 transition-transform"
          >
            <svg
              className="absolute inset-0 w-full h-full animate-spin-slow text-[#141416]"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="circlePathLight"
                  d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                />
              </defs>
              <text fontSize="9.2" fill="currentColor" letterSpacing="2.8" fontWeight="700">
                <textPath xlinkHref="#circlePathLight">
                  INQUIRY • MY JERSEY • INQUIRY • MY JERSEY •
                </textPath>
              </text>
            </svg>
            <div className="w-6 h-6 rounded-full bg-[#141416] text-white flex items-center justify-center font-black text-[10px]">
              G
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              aria-label="Previous products"
              className="w-9 h-9 rounded-full border border-[#D5D1C6] flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              aria-label="Next products"
              className="w-9 h-9 rounded-full border border-[#D5D1C6] flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
