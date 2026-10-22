"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Shield, Cpu } from "lucide-react";

interface HeroSlide {
  id: string;
  badge: string;
  badgeIcon: typeof Sparkles;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  image: string;
  gradient: string;
}

const slides: HeroSlide[] = [
  {
    id: "slide-1",
    badge: "Next-Gen Architecture",
    badgeIcon: Cpu,
    title: "Quantum X Pro. Engineered for the Impossible.",
    subtitle: "Experience 16 cores of neural compute, breathtaking 4K OLED HDR, and 22-hour battery life built into an aerospace titanium unibody.",
    ctaText: "Discover Quantum X",
    ctaLink: "/products/prod-1",
    secondaryCtaText: "Browse All Laptops",
    secondaryCtaLink: "/products?category=laptops",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
    gradient: "from-blue-950/90 via-zinc-950/80 to-transparent",
  },
  {
    id: "slide-2",
    badge: "Spatial Audio Revolution",
    badgeIcon: Sparkles,
    title: "Pure Sound. Zero Distraction.",
    subtitle: "SonicWave Studio headphones deliver custom graphene drivers, 45dB hybrid noise cancelation, and lossless high-resolution spatial audio.",
    ctaText: "Experience Sound",
    ctaLink: "/products/prod-2",
    secondaryCtaText: "Explore Audio Gear",
    secondaryCtaLink: "/products?category=audio",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000&auto=format&fit=crop",
    gradient: "from-purple-950/90 via-zinc-950/80 to-transparent",
  },
  {
    id: "slide-3",
    badge: "Spatial Computing",
    badgeIcon: Shield,
    title: "Step Beyond Reality with Apex Vision VR",
    subtitle: "Dual 4K Micro-OLED displays with 23 million pixels and sub-millimeter eye tracking. The future of immersion is here.",
    ctaText: "Explore Apex Vision",
    ctaLink: "/products/prod-12",
    secondaryCtaText: "View Wearables",
    secondaryCtaLink: "/products?category=wearables",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=2000&auto=format&fit=crop",
    gradient: "from-emerald-950/90 via-zinc-950/80 to-transparent",
  },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section
      aria-label="Hero banner"
      className="relative rounded-3xl overflow-hidden bg-zinc-950 text-white min-h-[540px] sm:min-h-[580px] lg:min-h-[620px] flex items-center shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        const BadgeIcon = slide.badgeIcon;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image: LCP image prioritized on first slide, lazy loaded on others */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority={index === 0}
                loading={index === 0 ? undefined : "lazy"}
                className="object-cover scale-105 transition-transform duration-1000"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} backdrop-brightness-75`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30" />
            </div>

            {/* Slide Content */}
            <div className="relative h-full flex flex-col justify-center p-8 sm:p-12 md:p-16 max-w-3xl z-20">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-blue-300 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide w-fit mb-6">
                <BadgeIcon size={16} className="text-blue-400" />
                <span>{slide.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight text-white drop-shadow-sm">
                {slide.title}
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-zinc-300 mb-8 leading-relaxed max-w-2xl drop-shadow">
                {slide.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={slide.ctaLink}
                  className="inline-flex items-center gap-2 bg-white text-zinc-950 px-7 py-3.5 rounded-full font-bold hover:bg-zinc-100 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
                >
                  {slide.ctaText} <ArrowRight size={18} />
                </Link>

                {slide.secondaryCtaText && slide.secondaryCtaLink && (
                  <Link
                    href={slide.secondaryCtaLink}
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white px-6 py-3.5 rounded-full font-semibold hover:bg-white/20 transition-all"
                  >
                    {slide.secondaryCtaText}
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <div className="absolute right-6 bottom-6 sm:bottom-10 z-20 flex items-center gap-3">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute left-8 sm:left-16 bottom-6 sm:bottom-10 z-20 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-blue-500" : "w-2 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
