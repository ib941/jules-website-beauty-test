"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle2, Copy, Check } from "lucide-react";

export default function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  const copyCode = () => {
    navigator.clipboard.writeText("WELCOME50");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-zinc-950 text-white p-8 sm:p-12 lg:p-16 text-center shadow-2xl border border-blue-800/40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.2),transparent_50%)]" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-300 border border-white/20">
          <Mail size={28} />
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Unlock $50 Off Your First Setup
        </h2>

        <p className="text-base sm:text-lg text-blue-100/80 mb-8 max-w-lg mx-auto">
          Subscribe to the Tech Haven Insider newsletter for exclusive member pricing, private hardware drops, and early firmware access.
        </p>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your professional email..."
              required
              className="flex-1 px-5 py-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-white text-sm"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-950 font-bold px-7 py-3.5 rounded-full text-sm hover:bg-blue-50 transition-all hover:scale-105 active:scale-95 shadow-lg shrink-0"
            >
              Get $50 Voucher <ArrowRight size={16} />
            </button>
          </form>
        ) : (
          <div className="bg-white/15 backdrop-blur-md border border-white/25 p-6 rounded-2xl max-w-md mx-auto flex flex-col items-center">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-lg mb-2">
              <CheckCircle2 size={22} />
              <span>You&apos;re on the VIP list!</span>
            </div>
            <p className="text-xs text-blue-100 mb-4">
              Here is your instant voucher for checkout:
            </p>
            <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-xl font-mono text-sm tracking-wider">
              <span className="font-bold text-yellow-300">WELCOME50</span>
              <button
                onClick={copyCode}
                className="p-1 hover:bg-white/20 rounded transition-colors text-white/80 hover:text-white"
                aria-label="Copy voucher code"
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>
          </div>
        )}

        <p className="text-[11px] text-blue-200/50 mt-4">
          Demo discount code. No spam, ever. Unsubscribe with 1 click anytime.
        </p>
      </div>
    </section>
  );
}
