'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Send, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '@/context/CartContext';

export function QuoteModal() {
  const { isQuoteModalOpen, setIsQuoteModalOpen } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    clubName: '',
    sport: 'Soccer',
    quantity: '20',
    contactName: '',
    email: '',
    phone: '',
    notes: '',
  });

  if (!isQuoteModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsQuoteModalOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#F8F7F4] rounded-3xl overflow-hidden shadow-2xl border border-[#E7E4DC] p-6 sm:p-10 text-[#141416]">
        {/* Close Button */}
        <button
          onClick={() => setIsQuoteModalOpen(false)}
          className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#141416] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-[#141416]">Quote Request Received!</h3>
            <p className="text-sm text-[#645F54] max-w-sm">
              Our sportswear designers are preparing your 3D proof and formal written quotation. We will contact you at {formData.email || 'your email'} shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#8A857A] uppercase tracking-wider">
                Fast Response Guarantee
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#141416] tracking-tight">
                Request a written quote
              </h2>
              <p className="text-xs text-[#645F54]">
                Receive free 3D digital design proofs within 2-4 business days.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#645F54] uppercase tracking-wider mb-1">
                    Club or Team Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.clubName}
                    onChange={(e) => setFormData({ ...formData, clubName: e.target.value })}
                    placeholder="e.g. Apex Football Academy"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D0C3] bg-white font-medium text-xs focus:outline-none focus:ring-2 focus:ring-[#141416]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#645F54] uppercase tracking-wider mb-1">
                    Sport Discipline
                  </label>
                  <select
                    value={formData.sport}
                    onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D0C3] bg-white font-medium text-xs focus:outline-none focus:ring-2 focus:ring-[#141416]"
                  >
                    <option value="Soccer">Soccer / Football</option>
                    <option value="Basketball">Basketball Sets</option>
                    <option value="Netball">Netball</option>
                    <option value="Rugby">Rugby</option>
                    <option value="Golf">Golf / Polos</option>
                    <option value="Other">Other Teamwear</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#645F54] uppercase tracking-wider mb-1">
                    Quantity Needed *
                  </label>
                  <input
                    required
                    type="number"
                    min="10"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D0C3] bg-white font-medium text-xs focus:outline-none focus:ring-2 focus:ring-[#141416]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#645F54] uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="e.g. Kagiso Motsepe"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D0C3] bg-white font-medium text-xs focus:outline-none focus:ring-2 focus:ring-[#141416]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#645F54] uppercase tracking-wider mb-1">
                    Work Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="coach@academy.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D0C3] bg-white font-medium text-xs focus:outline-none focus:ring-2 focus:ring-[#141416]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#645F54] uppercase tracking-wider mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+267 ..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D0C3] bg-white font-medium text-xs focus:outline-none focus:ring-2 focus:ring-[#141416]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#645F54] uppercase tracking-wider mb-1">
                  Design Notes or Specific Colorways
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us any specific Pantone codes, badges, sponsors or match date requirements..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D0C3] bg-white font-medium text-xs focus:outline-none focus:ring-2 focus:ring-[#141416]"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 text-[11px] text-[#787266]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero spam guarantee</span>
              </div>
              <button
                type="submit"
                className="py-3 px-6 rounded-full bg-[#141416] hover:bg-black text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <span>Submit Quote Request</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
