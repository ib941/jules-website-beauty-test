import { Product } from "@/store/useStore";

export const categories = [
  { id: "all", name: "All Products", count: 20 },
  { id: "laptops", name: "Laptops & PCs", count: 3 },
  { id: "smartphones", name: "Smartphones & Tablets", count: 3 },
  { id: "audio", name: "Audio & Sound", count: 4 },
  { id: "wearables", name: "Wearables & VR", count: 3 },
  { id: "gaming", name: "Gaming Gear", count: 2 },
  { id: "accessories", name: "Peripherals & Docks", count: 5 },
] as const;

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Quantum X Pro 16\" Laptop",
    tagline: "Uncompromising M4 Neural Performance & 4K OLED Clarity",
    description: "The ultimate machine for professionals and creators. Features a brilliant 16-inch OLED display, next-gen neural processing, and all-day battery life for 3D rendering and compilation on the go.",
    price: 1899.99,
    originalPrice: 2199.99,
    category: "laptops",
    badge: "Best Seller",
    rating: 4.9,
    reviewsCount: 428,
    inStock: true,
    stockCount: 14,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
    features: [
      "16-inch 4K OLED HDR 120Hz Display",
      "32GB Unified LPDDR5X Memory",
      "1TB NVMe Gen 4 SSD",
      "Up to 22 hours real-world battery",
      "Dual Thunderbolt 5 ports with 80Gbps transfer"
    ],
    specs: {
      "Processor": "16-Core Neural Engine CPU",
      "Memory": "32GB Unified RAM",
      "Storage": "1TB PCIe 4.0 NVMe",
      "Display": "16.2\" 3840x2400 OLED 120Hz",
      "Weight": "1.78 kg",
      "Battery": "96Wh Lithium Polymer"
    },
    colors: [
      { name: "Space Titanium", hex: "#4A4D52" },
      { name: "Silver Frost", hex: "#E3E5E8" },
      { name: "Midnight Obsidian", hex: "#1C1E24" }
    ]
  },
  {
    id: "prod-2",
    name: "SonicWave Studio ANC Headphones",
    tagline: "Lossless Studio Spatial Audio with Adaptive 45dB Active Noise Cancellation",
    description: "Immerse yourself in pure studio audio with industry-leading active noise cancellation, custom graphene drivers, and high-resolution 24-bit/96kHz sound reproduction.",
    price: 299.99,
    originalPrice: 379.99,
    category: "audio",
    badge: "Staff Pick",
    rating: 4.8,
    reviewsCount: 312,
    inStock: true,
    stockCount: 22,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Adaptive Hybrid Active Noise Cancellation (45dB)",
      "40mm Custom Bio-Cellulose Drivers",
      "50-Hour battery with Quick Charge (5 min = 4 hrs)",
      "Multipoint seamless Bluetooth 5.4 connection",
      "Memory foam ear cushions wrapped in breathable protein leather"
    ],
    specs: {
      "Frequency Response": "10Hz - 45,000Hz",
      "Bluetooth": "5.4 with LDAC & aptX HD",
      "Battery Life": "50 Hours (ANC On)",
      "Weight": "254 g",
      "Microphones": "6-mic array with beamforming"
    },
    colors: [
      { name: "Matte Black", hex: "#1A1A1A" },
      { name: "Lunar Silver", hex: "#D8DCE3" },
      { name: "Sand Dune", hex: "#C5B29B" }
    ]
  },
  {
    id: "prod-3",
    name: "ErgoClick Vertical Precision Mouse",
    tagline: "Eliminates wrist fatigue with 57° natural handshake angle",
    description: "Designed by orthopedic engineers for maximum comfort and laser precision. Reduces muscular strain during grueling work sessions with silent magnetic clicks.",
    price: 79.99,
    originalPrice: 99.99,
    category: "accessories",
    badge: "Ergonomic Choice",
    rating: 4.7,
    reviewsCount: 189,
    inStock: true,
    stockCount: 31,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1000&auto=format&fit=crop",
    features: [
      "57° Natural handshake angle for optimal posture",
      "Adjustable 8K Darkfield Optical Sensor (800-8000 DPI)",
      "Dual wireless: Bluetooth 5.3 & 2.4GHz USB Dongle",
      "Rechargeable battery lasts up to 90 days per charge",
      "Customizable thumb wheel & programmable gesture keys"
    ],
    specs: {
      "Sensor": "Darkfield 8000 DPI",
      "Connectivity": "2.4GHz + BT LE",
      "Battery": "500mAh Li-Po (USB-C)",
      "Weight": "135 g"
    },
    colors: [
      { name: "Graphite", hex: "#2B2D31" },
      { name: "Pale Gray", hex: "#E0E2E5" }
    ]
  },
  {
    id: "prod-4",
    name: "Nexus Ultra 5G Smartphone",
    tagline: "200MP Periscope Zoom & Titanium aerospace enclosure",
    description: "Capture cinematic 8K footage with the revolutionary 200MP sensor array. Backed by Qualcomm's flagship processor, a 1-120Hz LTPO display, and ceramic shield protection.",
    price: 1099.99,
    originalPrice: 1299.99,
    category: "smartphones",
    badge: "Flagship",
    rating: 4.9,
    reviewsCount: 520,
    inStock: true,
    stockCount: 18,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop",
    features: [
      "6.8-inch Dynamic AMOLED 2X 120Hz LTPO (2600 nits peak)",
      "200MP Quad Camera with 10x Optical Periscope Zoom",
      "Snapdragon 8 Elite flagship 3nm chip",
      "5200mAh Battery with 80W Wired & 50W Wireless Fast Charge",
      "Titanium frame with IP68 waterproof rating"
    ],
    specs: {
      "Display": "6.8\" Quad HD+ 3120x1440 LTPO",
      "Chipset": "Snapdragon 8 Elite",
      "RAM": "16GB LPDDR5X",
      "Storage": "512GB UFS 4.0",
      "Cameras": "200MP + 50MP + 50MP + 12MP",
      "Weight": "218 g"
    },
    colors: [
      { name: "Natural Titanium", hex: "#8A8780" },
      { name: "Cosmic Black", hex: "#111215" },
      { name: "Deep Navy", hex: "#1B2A4A" }
    ]
  },
  {
    id: "prod-5",
    name: "Lumina Custom RGB Mechanical Keyboard",
    tagline: "Gasket-mounted hot-swappable switches with South-Facing RGB",
    description: "Elevate typing to an art form. CNC machined from aerospace aluminum with sound-dampening silicone gaskets, pre-lubed mechanical switches, and PBT double-shot keycaps.",
    price: 149.99,
    originalPrice: 189.99,
    category: "accessories",
    badge: "Hot Drop",
    rating: 4.8,
    reviewsCount: 265,
    inStock: true,
    stockCount: 19,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Gasket-mount structure with 5-layer acoustic dampening",
      "Hot-swappable PCB compatible with 3-pin and 5-pin switches",
      "Factory-lubed tactile mechanical switches (55g actuation)",
      "Per-key 16.8M color RGB with reactive typing modes",
      "Triple connectivity: 2.4GHz wireless, Bluetooth, and detachable Type-C"
    ],
    specs: {
      "Layout": "75% Compact (82 Keys)",
      "Material": "CNC Aluminum Case + Brass Weight",
      "Battery": "4000mAh (Up to 200 hours RGB off)",
      "Weight": "1.25 kg"
    },
    colors: [
      { name: "Anodized Black", hex: "#1F1F1F" },
      { name: "Chalk White", hex: "#F3F4F6" },
      { name: "Retro Gray", hex: "#6B7280" }
    ]
  },
  {
    id: "prod-6",
    name: "StreamCast 4K Pro Broadcast Webcam",
    tagline: "Sony STARVIS 2 sensor delivering 4K 60fps HDR with AI face tracking",
    description: "Look your absolute best in meetings, conferences, and high-definition live streams. High dynamic range hardware prevents blown-out backgrounds even in harsh lighting.",
    price: 129.99,
    originalPrice: 169.99,
    category: "accessories",
    badge: "Creator Essential",
    rating: 4.6,
    reviewsCount: 144,
    inStock: true,
    stockCount: 25,
    image: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Sony 1/1.8\" STARVIS 2 CMOS Sensor",
      "True 4K Ultra HD at 60 FPS HDR capture",
      "AI-driven autofocus and automatic framing",
      "Hardware privacy physical lens shutter",
      "Stereo noise-rejecting MEMS microphones"
    ],
    specs: {
      "Resolution": "3840x2160 @ 60fps",
      "Field of View": "65° / 78° / 90° adjustable",
      "Interface": "USB-C 3.2 Gen 1",
      "Weight": "180 g"
    }
  },
  {
    id: "prod-7",
    name: "CyberBlade RTX 4090 Gaming Laptop",
    tagline: "Desktop-grade liquid-cooled gaming with 240Hz Mini-LED display",
    description: "The apex predator of portable gaming. Armed with NVIDIA GeForce RTX 4090, Intel Core i9-14900HX, and a 2000-zone Mini-LED HDR display with 1000 nits peak brightness.",
    price: 2799.99,
    originalPrice: 3299.99,
    category: "laptops",
    badge: "Save $500",
    rating: 4.9,
    reviewsCount: 198,
    inStock: true,
    stockCount: 6,
    isFlashDeal: true,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1000&auto=format&fit=crop",
    features: [
      "NVIDIA GeForce RTX 4090 (175W TGP, 16GB GDDR6X)",
      "Intel Core i9-14900HX 24 cores / 32 threads",
      "16\" QHD+ 2560x1600 Mini-LED 240Hz 3ms G-Sync",
      "64GB DDR5 5600MHz RAM + 2TB NVMe SSD",
      "Vapor chamber cooling with liquid metal thermal interface"
    ],
    specs: {
      "GPU": "RTX 4090 16GB",
      "CPU": "Core i9-14900HX",
      "RAM": "64GB DDR5",
      "Storage": "2TB PCIe 4.0 SSD",
      "Weight": "2.45 kg"
    },
    colors: [
      { name: "Eclipse Black", hex: "#121316" }
    ]
  },
  {
    id: "prod-8",
    name: "AeroBook Air 14 Ultralight",
    tagline: "Weighs only 980 grams with 22-hour battery life and fanless silence",
    description: "Effortless portability meets premium endurance. Built from magnesium-aluminum alloy, making it featherlight yet durable enough to withstand daily travel.",
    price: 1249.99,
    originalPrice: 1399.99,
    category: "laptops",
    badge: "Ultra Portable",
    rating: 4.7,
    reviewsCount: 176,
    inStock: true,
    stockCount: 15,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Ultra-slim 11.5mm chassis weighing just 980 grams",
      "14-inch 2.8K Retina IPS Display (400 nits, 100% sRGB)",
      "Next-Gen 8-Core Low-Power Processor",
      "16GB LPDDR5 RAM & 512GB Fast SSD",
      "Silent zero-fan passive cooling design"
    ],
    specs: {
      "Processor": "8-Core Ultra Mobile SoC",
      "Display": "14\" 2880x1800 90Hz",
      "RAM": "16GB",
      "Battery": "70Wh (Up to 22h)",
      "Weight": "980 g"
    },
    colors: [
      { name: "Silver Moonlight", hex: "#E2E5E9" },
      { name: "Space Gray", hex: "#5C6068" },
      { name: "Champagne Gold", hex: "#EADCC9" }
    ]
  },
  {
    id: "prod-9",
    name: "PulseBeat Studio Pro Wireless Earbuds",
    tagline: "Dual dynamic drivers, LDAC codec support, and pocket wireless charging case",
    description: "Compact wireless earbuds that sound as expansive as full-sized studio monitors. Features intelligent active noise cancellation, transparency audio pass-through, and wind reduction.",
    price: 189.99,
    originalPrice: 229.99,
    category: "audio",
    badge: "-17% OFF",
    rating: 4.8,
    reviewsCount: 387,
    inStock: true,
    stockCount: 40,
    isFlashDeal: true,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Dual 11mm coaxial acoustic architecture for thunderous bass and crystal highs",
      "Smart adaptive noise cancellation up to 48dB",
      "Total 40 hours playtime with fast Qi wireless charging case",
      "IP55 water and sweat resistance for high-intensity workouts",
      "Spatial 360 audio with dynamic head tracking"
    ],
    specs: {
      "Drivers": "11mm Woofer + 6mm Planar Tweeter",
      "Codec": "LDAC, AAC, SBC",
      "Battery": "9h earbuds / 40h total case",
      "Water Resistance": "IP55"
    },
    colors: [
      { name: "Glacier White", hex: "#FAFAFA" },
      { name: "Phantom Black", hex: "#191A1E" }
    ]
  },
  {
    id: "prod-10",
    name: "SoundCore Atmos 7.1.2 Spatial Soundbar",
    tagline: "True up-firing Dolby Atmos speakers with wireless subwoofer included",
    description: "Transform your living room into an IMAX theater. Delivers 650 watts of immersive multidirectional sound with upward-firing height drivers bouncing audio off your ceiling.",
    price: 499.99,
    originalPrice: 599.99,
    category: "audio",
    badge: "Cinema Sound",
    rating: 4.8,
    reviewsCount: 112,
    inStock: true,
    stockCount: 8,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Dolby Atmos and DTS:X 7.1.2 multidirectional spatial immersion",
      "Dedicated 8-inch wireless down-firing subwoofer",
      "HDMI eARC with 4K 120Hz Dolby Vision passthrough",
      "Room calibration microphone tunes sound to your room acoustic profile",
      "AirPlay 2, Chromecast, and Spotify Connect built-in"
    ],
    specs: {
      "Total Output": "650 Watts Peak",
      "Channels": "7.1.2 Discrete",
      "Connectivity": "HDMI eARC, Optical, Wi-Fi 6, BT 5.3",
      "Subwoofer": "Wireless 8\" 200W"
    }
  },
  {
    id: "prod-11",
    name: "ChronoFit Ultra Titanium Smartwatch",
    tagline: "Dual-frequency GPS, ECG monitor, 100m water resistance & sapphire glass",
    description: "Built for extreme endurance athletes and outdoor adventurers. Features a rugged grade-5 titanium casing, sapphire crystal display, and multi-band satellite tracking.",
    price: 399.99,
    originalPrice: 479.99,
    category: "wearables",
    badge: "Best Seller",
    rating: 4.9,
    reviewsCount: 462,
    inStock: true,
    stockCount: 22,
    isFlashDeal: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Aerospace-grade Grade 5 Titanium casing with sapphire crystal lens",
      "Dual-frequency L1 + L5 GPS for pinpoint city and forest navigation",
      "Up to 14 days standard battery life / 60 hours in continuous GPS mode",
      "ECG heart health, SpO2 blood oxygen, and skin temperature sensor",
      "100-meter water resistance with scuba dive computer capabilities"
    ],
    specs: {
      "Case Size": "49mm Grade 5 Titanium",
      "Display": "1.92\" Always-On Retina AMOLED (3000 nits)",
      "Battery": "14 Days Typical",
      "Sensors": "ECG, SpO2, Skin Temp, Depth Gauge"
    },
    colors: [
      { name: "Raw Titanium", hex: "#A8A59E" },
      { name: "Black DLC Titanium", hex: "#232427" }
    ]
  },
  {
    id: "prod-12",
    name: "Apex Vision Pro Spatial VR Headset",
    tagline: "Dual 4K micro-OLED spatial computing with sub-millimeter eye & hand tracking",
    description: "Step into spatial computing where digital content blends seamlessly with your physical space. Controlled purely by your eyes, hands, and voice with zero controllers needed.",
    price: 1499.99,
    originalPrice: 1699.99,
    category: "wearables",
    badge: "Next-Gen",
    rating: 4.9,
    reviewsCount: 95,
    inStock: true,
    stockCount: 5,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Dual Micro-OLED displays with 23 million pixels combined",
      "Precise eye tracking with 12 cameras and LiDAR sensor array",
      "Real-time pass-through with under 12ms latency",
      "Spatial audio drivers embedded directly into the headband",
      "Custom carbon fiber and breathable knit strap design"
    ],
    specs: {
      "Resolution": "3840x3552 per eye",
      "Refresh Rate": "90Hz / 96Hz / 120Hz",
      "Tracking": "Inside-Out 6DoF + Eye + Hand",
      "Weight": "495 g"
    }
  },
  {
    id: "prod-13",
    name: "Halo Bio-Tracking Smart Ring",
    tagline: "Sleep recovery, continuous HRV, and core body temperature inside sleek titanium",
    description: "Discreet wellness tracking without bulky screens on your wrist. Measures physiological metrics straight from your finger pulse with medical-grade infrared photoplethysmography.",
    price: 249.99,
    originalPrice: 299.99,
    category: "wearables",
    badge: "Trending",
    rating: 4.6,
    reviewsCount: 88,
    inStock: true,
    stockCount: 16,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000&auto=format&fit=crop",
    features: [
      "7-Day battery life on a single 30-minute wireless dock charge",
      "Titanium build with non-allergenic medical resin interior",
      "Sleep stages analysis: Deep, REM, and Light sleep efficiency",
      "Waterproof to 100 meters (swim and sauna proof)",
      "Zero subscription fees for mobile application insights"
    ],
    specs: {
      "Material": "Grade 5 Titanium + PVD Coating",
      "Battery": "7 Days Continuous",
      "Weight": "4 to 6 grams (size dependent)",
      "Sensors": "Red/Infrared PPG, Temp, Accelerometer"
    },
    colors: [
      { name: "Stealth Black", hex: "#18181A" },
      { name: "Rose Gold", hex: "#E0A899" },
      { name: "Brushed Silver", hex: "#D6D9DE" }
    ]
  },
  {
    id: "prod-14",
    name: "SlateTab Studio 13\" OLED Tablet",
    tagline: "Tandem OLED 120Hz display with pressure-sensitive stylus included",
    description: "The dream canvas for digital illustrators, architects, and mobile creators. Incredible 1,000,000:1 contrast with zero parallax stylus input.",
    price: 849.99,
    originalPrice: 999.99,
    category: "smartphones",
    badge: "For Artists",
    rating: 4.8,
    reviewsCount: 215,
    inStock: true,
    stockCount: 12,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop",
    features: [
      "13-inch Tandem OLED Ultra Retina 120Hz ProMotion panel",
      "Magnetic stylus with 8192 levels of pressure and tilt sensitivity",
      "All-day 12-hour video playback battery",
      "Quad stereo speakers with wide acoustic dispersion",
      "Optional cantilever keyboard dock support"
    ],
    specs: {
      "Screen": "13\" 2752x2064 Tandem OLED",
      "Processor": "Next-Gen 10-core SoC",
      "Storage": "256GB / 512GB",
      "Weight": "570 g"
    },
    colors: [
      { name: "Space Gray", hex: "#4B4E54" },
      { name: "Cloud White", hex: "#F2F4F7" }
    ]
  },
  {
    id: "prod-15",
    name: "Horizon Fold 6 Dual-Screen Foldable",
    tagline: "Zero-gap flex hinge unfolds from pocket phone into an 8.0-inch canvas",
    description: "Experience the versatility of having a full-sized tablet that folds smoothly into your pocket. Armored aluminum chassis and ultra-thin flexible glass display.",
    price: 1699.99,
    originalPrice: 1899.99,
    category: "smartphones",
    badge: "Cutting Edge",
    rating: 4.7,
    reviewsCount: 160,
    inStock: true,
    stockCount: 9,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop",
    features: [
      "8.0-inch Inner Dynamic AMOLED 120Hz + 6.3-inch Outer Cover Display",
      "Zero-crease fluid hinge tested for 400,000 folds",
      "Triple 50MP camera setup with 8K recording",
      "Split-screen multi-tasking runs 3 apps simultaneously",
      "Under-display selfie camera for seamless screen estate"
    ],
    specs: {
      "Inner Screen": "8.0\" 2160x1856 120Hz",
      "Outer Screen": "6.3\" 2376x968 120Hz",
      "Battery": "4600mAh Dual-Cell",
      "Weight": "239 g"
    },
    colors: [
      { name: "Phantom Black", hex: "#111215" },
      { name: "Navy Blue", hex: "#1E2B45" },
      { name: "Silver Shadow", hex: "#CCD0D6" }
    ]
  },
  {
    id: "prod-16",
    name: "UltraView 34\" Curved QD-OLED Monitor",
    tagline: "0.03ms response time, 175Hz refresh rate with infinite contrast ratio",
    description: "Experience quantum dot color purity combined with organic OLED blacks. The 1800R curve wraps around your field of view for absolute immersion in games and creative workflows.",
    price: 899.99,
    originalPrice: 1099.99,
    category: "accessories",
    badge: "Top Rated",
    rating: 4.9,
    reviewsCount: 310,
    inStock: true,
    stockCount: 7,
    isFlashDeal: true,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop",
    features: [
      "34-inch 21:9 Ultrawide QD-OLED panel (3440 x 1440)",
      "Blazing 0.03ms GtG response time & 175Hz refresh rate",
      "VESA DisplayHDR True Black 400 certification with 99.3% DCI-P3",
      "Integrated KVM switch and 90W USB-C power delivery",
      "OLED care thermal heatsink with 3-year burn-in warranty"
    ],
    specs: {
      "Panel": "34\" Curved QD-OLED (1800R)",
      "Resolution": "3440 x 1440 WQHD",
      "Refresh": "175Hz",
      "Ports": "2x HDMI 2.1, 1x DP 1.4, 1x USB-C 90W"
    }
  },
  {
    id: "prod-17",
    name: "HyperDock 14-in-1 Dual Thunderbolt 4 Dock",
    tagline: "Single cable solution: dual 4K 144Hz video output, 100W PD & 2.5Gbps LAN",
    description: "Declutter your entire desk with one single cable connection. Powers your laptop, connects dual external displays, high-speed storage, SD cards, and high-fidelity audio.",
    price: 219.99,
    originalPrice: 269.99,
    category: "accessories",
    badge: "Desk Essential",
    rating: 4.8,
    reviewsCount: 174,
    inStock: true,
    stockCount: 28,
    image: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?q=80&w=1000&auto=format&fit=crop",
    features: [
      "14 ports including dual Thunderbolt 4 downstream (40Gbps)",
      "Supports dual 4K 144Hz or single 8K 60Hz displays",
      "100W host power delivery charges laptops under peak loads",
      "Ultra-fast 2.5 Gigabit Ethernet port for gigabit fiber internet",
      "CNC milled aluminum housing with heat-dissipating fins"
    ],
    specs: {
      "Bandwidth": "40Gbps Thunderbolt 4",
      "Host Charging": "100W Power Delivery",
      "Ports": "3x TB4, 4x USB-A 10Gbps, 1x 2.5GbE, SD/microSD, 3.5mm",
      "Weight": "450 g"
    }
  },
  {
    id: "prod-18",
    name: "Vortex Pro Handheld Gaming Console",
    tagline: "AMD Zen 4 APU with 7-inch 120Hz VRR screen for AAA gaming anywhere",
    description: "Carry your entire PC game library in the palm of your hand. Delivers smooth 60+ FPS in modern titles with comfortable ergonomic grips and hall-effect controls.",
    price: 649.99,
    originalPrice: 749.99,
    category: "gaming",
    badge: "Gamer Favorite",
    rating: 4.8,
    reviewsCount: 422,
    inStock: true,
    stockCount: 11,
    isFlashDeal: true,
    image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=1000&auto=format&fit=crop",
    features: [
      "AMD Ryzen Z1 Extreme processor with RDNA 3 graphics",
      "7-inch Full HD 120Hz display with FreeSync Premium VRR",
      "Hall Effect anti-drift magnetic joysticks and triggers",
      "Dual fans with zero-gravity heat pipe cooling system",
      "Expandable UHS-II microSD card slot and replaceable M.2 2280 SSD"
    ],
    specs: {
      "APU": "AMD Ryzen Z1 Extreme (8C / 16T)",
      "RAM": "16GB LPDDR5X-7500",
      "Storage": "512GB PCIe 4.0 NVMe",
      "Screen": "7\" 1920x1080 120Hz 500 nits",
      "Weight": "608 g"
    },
    colors: [
      { name: "Carbon Black", hex: "#1C1D21" },
      { name: "Arctic White", hex: "#F3F5F7" }
    ]
  },
  {
    id: "prod-19",
    name: "MechStrike Wireless Hall-Effect Controller",
    tagline: "Magnetic Hall-Effect joysticks and triggers with customizable back paddles",
    description: "Engineered for esports competitors. Eliminates joystick drift forever using contact-less magnetic sensors, mechanical microswitch face buttons, and 1000Hz polling rate.",
    price: 89.99,
    originalPrice: 119.99,
    category: "gaming",
    badge: "Zero Drift",
    rating: 4.9,
    reviewsCount: 230,
    inStock: true,
    stockCount: 34,
    image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Contact-free Hall Effect sticks guarantee zero stick drift",
      "Mechanical tactile switch buttons (0.3mm actuation distance)",
      "1000Hz wired & 2.4G wireless ultra-low latency polling rate",
      "4 customizable ergonomic rear paddles with macro recording",
      "Magnetic charging dock with RGB glow included in box"
    ],
    specs: {
      "Polling Rate": "1000Hz (1ms)",
      "Compatibility": "PC, Steam Deck, Switch, Android, iOS",
      "Battery": "1200mAh (Up to 24h gameplay)",
      "Weight": "245 g"
    },
    colors: [
      { name: "Matte Black", hex: "#1A1A1A" },
      { name: "Cyber White", hex: "#F5F5F7" },
      { name: "Neon Cyan", hex: "#00E5FF" }
    ]
  },
  {
    id: "prod-20",
    name: "Aura Smart Ambient Studio Light Bar",
    tagline: "Screen-sync reactive lighting with Matter & Apple HomeKit smart home support",
    description: "Transform your desktop setup with dynamic ambient backlighting. Casts millions of reactive colors matching the on-screen action, gaming audio rhythms, or warm concentration light.",
    price: 119.99,
    originalPrice: 149.99,
    category: "accessories",
    badge: "Setup Upgrade",
    rating: 4.7,
    reviewsCount: 156,
    inStock: true,
    stockCount: 20,
    image: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Zero-latency HDMI 2.1 screen synchronization box",
      "Dual independently addressable RGBIC light bars",
      "Matter over Wi-Fi compatible: Works with Apple Home, Google, Alexa",
      "Asymmetrical optical design illuminates desk without monitor glare",
      "Touch sensor bar and wireless rotary desktop dial controller"
    ],
    specs: {
      "Color Range": "16 Million + Tunable White 2200K - 6500K",
      "Luminance": "Up to 800 Lumens",
      "Connectivity": "Wi-Fi 2.4GHz & Bluetooth 5.0",
      "Lifespan": "50,000 Hours"
    }
  }
];
