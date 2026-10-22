import { Truck, RotateCcw, ShieldCheck, Headphones, Zap } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Free Express Shipping",
    desc: "2-Day delivery on orders over $99",
  },
  {
    icon: ShieldCheck,
    title: "2-Year Full Warranty",
    desc: "100% parts & labor coverage",
  },
  {
    icon: RotateCcw,
    title: "30-Day Risk-Free Returns",
    desc: "No restocking fees, hassle-free",
  },
  {
    icon: Headphones,
    title: "24/7 Tech Concierge",
    desc: "Live support from hardware experts",
  },
];

export default function TrustBadges() {
  return (
    <section aria-label="Store perks" className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
      {badges.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="flex items-center gap-3.5 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60 transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
          >
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shrink-0">
              <Icon size={22} />
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-tight leading-tight">{item.title}</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{item.desc}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
