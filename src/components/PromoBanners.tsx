import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, RefreshCw, Layers, ShieldCheck } from "lucide-react";

export default function PromoBanners() {
  return (
    <div className="flex flex-col gap-8">
      {/* Dual Bento Banners */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Banner 1: Creator Studio */}
        <div className="relative rounded-3xl overflow-hidden min-h-[380px] flex flex-col justify-end p-8 sm:p-10 text-white group shadow-lg">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1600&auto=format&fit=crop"
              alt="Creator Studio Gear"
              fill
              loading="lazy"
              className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
          </div>

          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-blue-500/20 backdrop-blur-md text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-semibold mb-3">
              <Layers size={14} /> Pro Creator Collection
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Build Your Dream Desktop Setup
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 mb-6 max-w-md">
              Save up to $300 when bundling our Curved QD-OLED 34&quot; monitor with the Lumina mechanical keyboard and Thunderbolt dock.
            </p>
            <Link
              href="/products?category=accessories"
              className="inline-flex items-center gap-2 bg-white text-zinc-950 font-bold px-6 py-3 rounded-full text-sm hover:bg-zinc-100 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Shop Creator Essentials <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Banner 2: Next-Gen Wearables & Spatial */}
        <div className="relative rounded-3xl overflow-hidden min-h-[380px] flex flex-col justify-end p-8 sm:p-10 text-white group shadow-lg">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop"
              alt="Wearables and Spatial VR"
              fill
              loading="lazy"
              className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-purple-950/50 to-transparent" />
          </div>

          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-purple-500/20 backdrop-blur-md text-purple-300 border border-purple-400/30 px-3 py-1 rounded-full text-xs font-semibold mb-3">
              <Sparkles size={14} /> Spatial & Bio-Tech
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Next-Gen Spatial Computing & Health
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 mb-6 max-w-md">
              From titanium smart rings tracking recovery to dual 4K micro-OLED VR headsets. Immerse yourself in the next era.
            </p>
            <Link
              href="/products?category=wearables"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-full text-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Explore Wearables <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Full-width Wide Trade-in / Certified Refurbished Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-zinc-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-12 lg:p-14 border border-zinc-800 shadow-xl">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <RefreshCw size={13} /> Official Trade-In Program
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Trade in your old gear. Get up to $650 instant credit.
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
              Upgrade to the latest flagship laptop, smartphone, or headphones effortlessly. We provide prepaid shipping kits, instant digital appraisal, and certified data wiping.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full">
                <ShieldCheck size={14} className="text-emerald-400" /> Free Return Kit
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full">
                <ShieldCheck size={14} className="text-emerald-400" /> Instant Store Credit
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full">
                <ShieldCheck size={14} className="text-emerald-400" /> DoD Data Destruction
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-white text-zinc-950 px-8 py-4 rounded-full font-bold text-sm hover:bg-zinc-100 transition-all text-center shadow-lg hover:scale-105 active:scale-95"
            >
              Get Instant Estimate <ArrowRight size={18} />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-sm transition-all text-center border border-white/20"
            >
              View Eligible Devices
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
