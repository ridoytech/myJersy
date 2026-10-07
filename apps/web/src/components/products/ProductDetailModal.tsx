'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ShoppingBag, Heart, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function ProductDetailModal() {
  const {
    selectedProductForDetail,
    setSelectedProductForDetail,
    addToCart,
    setIsQuoteModalOpen,
  } = useCart();

  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>('desc');

  if (!selectedProductForDetail) return null;

  const product = selectedProductForDetail;

  const thumbnails = [
    { label: 'Front', img: product.image },
    { label: 'Back', img: '/images/jersey-legacy.png' },
    { label: 'Detail', img: '/images/jersey-emerald.png' },
  ];

  const handleAddToCart = () => {
    addToCart({
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity,
      image: product.image,
      color: 'Standard',
    });
    setSelectedProductForDetail(null);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#F8F7F4] rounded-3xl overflow-hidden shadow-2xl border border-[#E7E4DC] my-8 text-[#141416]">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductForDetail(null)}
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#141416] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-10">
          {/* Left: 3D Preview & Angle Thumbnails */}
          <div className="md:col-span-6 flex flex-col items-center justify-between space-y-4">
            <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl bg-[#EFECE5] flex items-center justify-center p-6 border border-[#E3DFD4]">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={thumbnails[activeThumb]?.img || product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 drop-shadow-2xl transition-all duration-300"
                />
              </div>
            </div>

            {/* Thumbnails row */}
            <div className="flex items-center gap-3">
              {thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveThumb(idx)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden bg-[#ECE8E0] border transition-all cursor-pointer ${
                    activeThumb === idx
                      ? 'border-[#141416] ring-2 ring-[#141416]/20 scale-105'
                      : 'border-[#DBD6C9] opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={thumb.img}
                    alt={thumb.label}
                    fill
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details & Purchase Actions */}
          <div className="md:col-span-6 space-y-5 text-left flex flex-col justify-between">
            <div className="space-y-4">
              {/* Category & Title */}
              <div>
                <span className="text-xs font-bold text-[#8A857A] uppercase tracking-wider">
                  Soccer
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#141416] tracking-tight">
                  {product.name}
                </h2>
                <div className="flex items-center gap-2 pt-1 text-xs text-[#787266]">
                  <span className="font-bold text-sm text-[#141416]">From P {product.price}</span>
                  <span>/ piece</span>
                  <span>• Ref: {product.ref || 'GC-RJ-02'}</span>
                </div>
              </div>

              {/* Proof Guarantee Notice */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] font-medium text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0" />
                <span>Design proof in 2 to 4 days: you approve before we print</span>
              </div>

              {/* Size Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#645F54] uppercase tracking-wider">Select size</span>
                  <span className="text-[#8A857A] underline cursor-pointer">Size guide</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {['XS', 'S', 'M', 'L', 'XL', '2XL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-8 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-[#141416] text-white border-[#141416] shadow-sm'
                          : 'bg-white text-[#4A453A] border-[#DCD7CB] hover:border-[#141416]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & CTA Buttons */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#D5D0C3] rounded-full bg-white px-2 py-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-6 h-6 flex items-center justify-center font-bold text-sm hover:text-black cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-6 h-6 flex items-center justify-center font-bold text-sm hover:text-black cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-6 rounded-full bg-[#141416] hover:bg-black text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to cart</span>
                  </button>

                  <button
                    className="p-3 rounded-full border border-[#D5D0C3] hover:bg-white text-[#141416] transition-colors cursor-pointer"
                    aria-label="Add to wishlist"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-2.5 rounded-full border border-[#D5D0C3] hover:bg-white text-[#141416] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Buy now & request quote &gt;
                </button>
                <p className="text-[10px] text-center text-[#827D70]">
                  No payment now. We send a written quote before anything is made.
                </p>
              </div>

              {/* Accordions */}
              <div className="border-t border-[#E3DFD4] pt-3 space-y-2 text-xs">
                {/* Description & fit */}
                <div className="border-b border-[#E3DFD4] pb-2">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'desc' ? null : 'desc')}
                    className="w-full flex items-center justify-between font-bold text-[#141416] py-1 cursor-pointer"
                  >
                    <span>Description & fit</span>
                    {openAccordion === 'desc' ? (
                      <ChevronUp className="w-4 h-4 text-[#8A857A]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#8A857A]" />
                    )}
                  </button>
                  {openAccordion === 'desc' && (
                    <div className="pt-2 text-[#645F54] space-y-2 leading-relaxed">
                      <p>
                        Deep maroon with gold trim and a crest-ready chest. A classic cut for clubs that carry their history on their shoulders. Classic straight fit with a slightly longer back hem.
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="px-2 py-0.5 rounded-full bg-[#EAE6DD] text-[10px] font-semibold text-[#544F45]">
                          Gold trim
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#EAE6DD] text-[10px] font-semibold text-[#544F45]">
                          Crest-ready chest
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#EAE6DD] text-[10px] font-semibold text-[#544F45]">
                          Heat-pressed numbering
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Fabric & care */}
                <div className="border-b border-[#E3DFD4] pb-2">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'fabric' ? null : 'fabric')}
                    className="w-full flex items-center justify-between font-bold text-[#141416] py-1 cursor-pointer"
                  >
                    <span>Fabric & care</span>
                    {openAccordion === 'fabric' ? (
                      <ChevronUp className="w-4 h-4 text-[#8A857A]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#8A857A]" />
                    )}
                  </button>
                  {openAccordion === 'fabric' && (
                    <p className="pt-2 text-[#645F54] leading-relaxed">
                      100% Recycled moisture-wicking polyester interlock. Machine wash cold at 30°C. Do not tumble dry. Do not iron directly on crest or gold foil prints.
                    </p>
                  )}
                </div>

                {/* Production & delivery */}
                <div className="border-b border-[#E3DFD4] pb-2">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'delivery' ? null : 'delivery')}
                    className="w-full flex items-center justify-between font-bold text-[#141416] py-1 cursor-pointer"
                  >
                    <span>Production & delivery</span>
                    {openAccordion === 'delivery' ? (
                      <ChevronUp className="w-4 h-4 text-[#8A857A]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#8A857A]" />
                    )}
                  </button>
                  {openAccordion === 'delivery' && (
                    <p className="pt-2 text-[#645F54] leading-relaxed">
                      Custom manufactured in 10-14 working days from final artwork sign-off. Express door-to-door courier dispatch nationwide.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
