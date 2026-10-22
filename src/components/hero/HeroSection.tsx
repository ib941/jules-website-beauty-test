"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Zap, ArrowRight, Cpu, Sparkles } from "lucide-react";
import { ModeType } from "./ScreenContent";

// Dynamically import the 3D Canvas with ssr: false to guarantee clean client-only mounting
const LaptopCanvas = dynamic(() => import("./LaptopCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[460px] flex flex-col items-center justify-center text-zinc-500">
      <div className="w-12 h-12 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin mb-4" />
      <span className="font-mono text-xs text-zinc-400">
        Initializing 3D Engine &amp; WebGL Canvas...
      </span>
    </div>
  ),
});

export default function HeroSection() {
  const [activeMode, setActiveMode] = useState<ModeType>("dev");

  return (
    <section
      aria-label="Interactive 3D Laptop Hero"
      className="relative rounded-3xl overflow-hidden bg-[#0B0D13] border border-zinc-800/80 shadow-2xl p-6 sm:p-10 lg:p-14 text-white"
    >
      {/* Background Ambient Radial Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-violet-600/20 via-blue-600/15 to-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[550px] h-[320px] bg-gradient-to-tr from-rose-500/15 via-purple-600/15 to-blue-600/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Main Grid: Left Column Copy & Actions, Right Column 3D Canvas */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column (Copy & Actions) */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-bold tracking-wide uppercase mb-6 shadow-sm w-fit">
            <Zap size={14} className="text-violet-400 fill-violet-400" />
            <span>Next-Gen Architecture</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.08] mb-6">
            Infinite Power.{" "}
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent block">
              Absolute Precision.
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl mb-8">
            Switch seamlessly between high-throughput code compilation, lossless audio rendering, and ultra-high FPS gaming.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <Link
              href="/products/prod-1"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-violet-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Configure Your Build <ArrowRight size={18} />
            </Link>

            <Link
              href="/products?category=laptops"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold border border-zinc-700/80 hover:border-zinc-500 text-zinc-300 hover:text-white hover:bg-zinc-800/40 transition-all"
            >
              Explore Specs
            </Link>
          </div>

          {/* Hardware Specs Pill Strip */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-zinc-400 pt-5 border-t border-zinc-800/80">
            <span className="bg-zinc-900/90 px-3.5 py-1.5 rounded-full border border-zinc-800/80 flex items-center gap-1.5">
              <Cpu size={13} className="text-violet-400" /> 16-Core Neural SoC
            </span>
            <span className="bg-zinc-900/90 px-3.5 py-1.5 rounded-full border border-zinc-800/80">
              4K OLED 120Hz
            </span>
            <span className="bg-zinc-900/90 px-3.5 py-1.5 rounded-full border border-zinc-800/80">
              32GB Unified RAM
            </span>
            <span className="bg-zinc-900/90 px-3.5 py-1.5 rounded-full border border-zinc-800/80 text-emerald-400 font-bold">
              22h Battery
            </span>
          </div>
        </div>

        {/* Right Column (3D Interactive Laptop Canvas) */}
        <div className="lg:col-span-7 relative h-[480px] sm:h-[560px] lg:h-[640px] w-full flex items-center justify-center">
          <LaptopCanvas activeMode={activeMode} setActiveMode={setActiveMode} />

          {/* Interactive Hint Callout */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono text-zinc-400 bg-zinc-900/90 border border-zinc-800 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-xl">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping inline-block" />
              <span>✦ Move cursor to float • Click screen elements to interact in 3D</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
