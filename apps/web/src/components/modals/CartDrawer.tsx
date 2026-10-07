'use client';

import React from 'react';
import Image from 'next/image';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalCount,
    setIsQuoteModalOpen,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F7F4] border-l border-[#E5E1D7] shadow-2xl flex flex-col justify-between text-[#141416]">
          {/* Header */}
          <div className="p-6 border-b border-[#E7E3D8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#141416]" />
              <h2 className="text-lg font-black tracking-tight text-[#141416]">
                Squad Cart ({totalCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-black/5 text-[#645F54] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
                <div className="w-16 h-16 rounded-full bg-[#EAE6DD] flex items-center justify-center text-[#827D70]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-base text-[#141416]">Your cart is empty</h3>
                <p className="text-xs text-[#7A7568] max-w-xs">
                  Browse our team favourites or customize your bespoke kit to add to cart.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white border border-[#E7E3D8] flex gap-4 items-center shadow-sm"
                >
                  <div className="relative w-16 h-16 rounded-xl bg-[#F0EDE6] overflow-hidden flex-shrink-0 flex items-center justify-center border border-[#E2DED3]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="flex-1 space-y-1 text-left min-w-0">
                    <h4 className="font-bold text-xs text-[#141416] truncate">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-[#787266]">
                      <span className="font-semibold text-black">Size: {item.size}</span>
                      {item.customNumber && (
                        <span>• #{item.customNumber} {item.customName}</span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-[#141416]">
                      P {item.price * item.quantity}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#999385] hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center border border-[#D5D0C3] rounded-full bg-[#FAF9F6] px-1.5 py-0.5 text-xs">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-4 h-4 flex items-center justify-center font-bold hover:text-black cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-5 text-center font-bold text-[11px]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-4 h-4 flex items-center justify-center font-bold hover:text-black cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E7E3D8] bg-white space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[#686357]">
                  <span>Subtotal</span>
                  <span className="font-bold text-base text-[#141416]">P {totalPrice}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-600">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Free nationwide delivery included for orders over 15 kits</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsQuoteModalOpen(true);
                }}
                className="w-full py-3.5 px-6 rounded-full bg-[#141416] hover:bg-black text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all cursor-pointer"
              >
                <span>Request Written Team Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
