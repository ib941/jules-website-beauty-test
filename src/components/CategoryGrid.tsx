import Link from "next/link";
import { Laptop, Smartphone, Headphones, Watch, Gamepad2, Keyboard, ArrowRight } from "lucide-react";

const categories = [
  {
    id: "laptops",
    name: "Laptops & PCs",
    description: "Ultraportables, Creator Workstations & Gaming Rigs",
    count: "3 models",
    icon: Laptop,
    gradient: "from-blue-500/10 to-indigo-500/10 hover:border-blue-500/40",
    iconColor: "text-blue-500",
  },
  {
    id: "smartphones",
    name: "Smartphones & Tablets",
    description: "Foldables, Flagship 5G & OLED Creative Tablets",
    count: "3 models",
    icon: Smartphone,
    gradient: "from-purple-500/10 to-pink-500/10 hover:border-purple-500/40",
    iconColor: "text-purple-500",
  },
  {
    id: "audio",
    name: "Audio & Sound",
    description: "ANC Headphones, Studio Earbuds & Dolby Atmos",
    count: "4 models",
    icon: Headphones,
    gradient: "from-amber-500/10 to-orange-500/10 hover:border-amber-500/40",
    iconColor: "text-amber-500",
  },
  {
    id: "wearables",
    name: "Wearables & VR",
    description: "Titanium GPS Watches, Smart Rings & Spatial Headsets",
    count: "3 models",
    icon: Watch,
    gradient: "from-emerald-500/10 to-teal-500/10 hover:border-emerald-500/40",
    iconColor: "text-emerald-500",
  },
  {
    id: "gaming",
    name: "Gaming Gear",
    description: "Handheld Zen4 Consoles, Hall-Effect Controllers",
    count: "2 models",
    icon: Gamepad2,
    gradient: "from-rose-500/10 to-red-500/10 hover:border-rose-500/40",
    iconColor: "text-rose-500",
  },
  {
    id: "accessories",
    name: "Peripherals & Docks",
    description: "Curved QD-OLEDs, Mechanical Boards & Thunderbolt 4",
    count: "5 models",
    icon: Keyboard,
    gradient: "from-cyan-500/10 to-sky-500/10 hover:border-cyan-500/40",
    iconColor: "text-cyan-500",
  },
];

export default function CategoryGrid() {
  return (
    <section>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Browse by Department
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
            Explore Hardware Categories
          </h2>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:gap-2 transition-all"
        >
          View all hardware <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.id}
              href={`/products?category=${cat.id}`}
              className={`group flex flex-col justify-between p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${cat.gradient}`}
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-xl bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${cat.iconColor}`}
                >
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-sm sm:text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-1 hidden sm:block">
                  {cat.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/50 text-xs font-medium text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                <span>{cat.count}</span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
