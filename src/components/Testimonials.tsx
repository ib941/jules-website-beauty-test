import { Star, CheckCircle, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Marcus Vance",
    role: "Senior Staff Software Engineer",
    company: "DevCloud Labs",
    rating: 5,
    title: "Quantum X Pro handles Docker and 4K video flawlessly",
    content: "Upgraded from my old machine to the Quantum X Pro laptop. Build times cut by 45%, and the 120Hz OLED screen is easily the best display I've ever coded on. Battery really does last the entire workday.",
    product: "Quantum X Pro 16\"",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Elena Rostova",
    role: "Music Producer & Sound Designer",
    company: "SoundScape Studio",
    rating: 5,
    title: "The acoustic precision on the SonicWave ANC is surreal",
    content: "The low-end response is tight without muddying mids, and the noise cancellation creates absolute isolation during travel. I switch between Bluetooth on my phone and wired on my interface instantly.",
    product: "SonicWave Studio ANC",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "David Chen",
    role: "Hardware & Gaming Tech Reviewer",
    company: "ApexGear Media",
    rating: 5,
    title: "UltraView 34\" QD-OLED is a genuine game changer",
    content: "Infinite contrast, true deep blacks with zero backlight bleed, and 175Hz refresh rate makes both gaming and timeline video scrubbing feel completely effortless. Truly premium build quality.",
    product: "UltraView 34\" Curved QD-OLED",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
];

export default function Testimonials() {
  return (
    <section className="py-4">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Customer Stories
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1 mb-3">
          Trusted by 50,000+ Creators & Engineers
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Read unfiltered feedback from professionals who rely on Tech Haven gear every single day.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative"
          >
            <Quote size={32} className="text-zinc-200 dark:text-zinc-800 absolute top-6 right-6" />

            <div>
              {/* Rating stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              <h3 className="font-bold text-base text-zinc-900 dark:text-white mb-2 leading-snug">
                &ldquo;{t.title}&rdquo;
              </h3>

              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                {t.content}
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-200">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-white flex items-center gap-1">
                    {t.name}
                    <CheckCircle size={14} className="text-blue-500 fill-blue-500 text-white" />
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{t.role}</p>
                </div>
              </div>

              <span className="text-[11px] font-medium bg-zinc-200/60 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-300">
                {t.product}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
