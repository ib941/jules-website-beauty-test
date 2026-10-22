"use client";

import { useState, useEffect, useRef } from "react";
import {
  Terminal,
  Play,
  Pause,
  Zap,
  Volume2,
  Sliders,
  CheckCircle2,
  Cpu,
  Flame,
  Activity,
  Layers,
  Sparkles,
  Wifi,
  BatteryCharging,
  RefreshCw,
  FileCode,
  Music,
} from "lucide-react";

export type ModeType = "dev" | "studio" | "gaming";

interface ScreenContentProps {
  mode: ModeType;
  onModeChange?: (mode: ModeType) => void;
}

export default function ScreenContent({ mode, onModeChange }: ScreenContentProps) {
  return (
    <div className="w-[1024px] h-[640px] bg-zinc-950 text-white select-none overflow-hidden flex flex-col font-sans rounded-xl border border-zinc-800/80 shadow-2xl relative">
      {/* Top Global OS Titlebar */}
      <div className="h-9 bg-zinc-900/95 border-b border-zinc-800/80 px-4 flex items-center justify-between text-xs text-zinc-400 shrink-0 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors inline-block cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors inline-block cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors inline-block cursor-pointer" />
          </div>
          <span className="font-mono text-[11px] text-zinc-300 font-semibold">
            QuantumOS 16.4 Pro
          </span>
        </div>

        {/* 3D Screen Mode Switcher Pills */}
        <div className="flex items-center gap-1 bg-zinc-950/80 p-0.5 rounded-lg border border-zinc-800/80">
          <button
            type="button"
            onClick={() => onModeChange?.("dev")}
            className={`px-3 py-1 rounded-md text-[10px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              mode === "dev"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <Terminal size={12} />
            <span>Dev Mode</span>
          </button>
          <button
            type="button"
            onClick={() => onModeChange?.("studio")}
            className={`px-3 py-1 rounded-md text-[10px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              mode === "studio"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <Sliders size={12} />
            <span>Studio Mode</span>
          </button>
          <button
            type="button"
            onClick={() => onModeChange?.("gaming")}
            className={`px-3 py-1 rounded-md text-[10px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              mode === "gaming"
                ? "bg-rose-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <Zap size={12} />
            <span>Gaming Mode</span>
          </button>
        </div>

        {/* Right Status Tray */}
        <div className="flex items-center gap-4 text-[11px] font-mono text-zinc-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <Wifi size={12} /> Wi-Fi 7
          </span>
          <span className="flex items-center gap-1 text-zinc-300">
            <BatteryCharging size={13} className="text-emerald-400" /> 100%
          </span>
          <span className="text-zinc-200 font-semibold">12:00 PM</span>
        </div>
      </div>

      {/* Main Viewport Content based on Active Mode */}
      <div className="flex-1 relative overflow-hidden bg-black">
        {mode === "dev" && <DevView />}
        {mode === "studio" && <StudioView />}
        {mode === "gaming" && <GamingView />}
      </div>
    </div>
  );
}

/* =========================================================================
   1. DEV MODE VIEW
   ========================================================================= */
function DevView() {
  const [activeTab, setActiveTab] = useState<"pipeline" | "kernel">("pipeline");
  const [isCompiling, setIsCompiling] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "▲ Next.js 16.4.2 (Turbopack) ready on http://localhost:3000",
    "✓ 16-Core Neural Engine initialized in Unified Memory",
    "✓ WebGPU context created with 800 GB/s bandwidth",
    "✓ Ready for real-time inference (38.4 TOPS active)",
  ]);

  const handleCompile = () => {
    setIsCompiling(true);
    setTimeout(() => {
      const compileTime = (0.15 + Math.random() * 0.15).toFixed(2);
      setLogs((prev) => [
        ...prev.slice(-4),
        `⚡ Compiled 42 modules in ${compileTime}s (Turbopack zero cache drop)`,
        `✓ Fast Refresh applied: Neural model re-synchronized`,
      ]);
      setIsCompiling(false);
    }, 500);
  };

  return (
    <div className="h-full flex flex-col justify-between p-4 bg-[#0d1117] text-zinc-200 font-mono text-xs select-none">
      {/* VS Code Tab Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("pipeline")}
            className={`px-3 py-1.5 rounded-t-lg flex items-center gap-2 font-medium transition-colors cursor-pointer ${
              activeTab === "pipeline"
                ? "bg-zinc-800/90 text-cyan-400 border-t-2 border-cyan-400"
                : "bg-zinc-900/40 text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <FileCode size={14} className="text-cyan-400" />
            <span>pipeline.ts</span>
          </button>
          <button
            onClick={() => setActiveTab("kernel")}
            className={`px-3 py-1.5 rounded-t-lg flex items-center gap-2 font-medium transition-colors cursor-pointer ${
              activeTab === "kernel"
                ? "bg-zinc-800/90 text-emerald-400 border-t-2 border-emerald-400"
                : "bg-zinc-900/40 text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Cpu size={14} className="text-emerald-400" />
            <span>neural_kernel.rs</span>
          </button>
        </div>

        <button
          onClick={handleCompile}
          disabled={isCompiling}
          className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-emerald-900/30 cursor-pointer disabled:opacity-50"
        >
          <Play size={12} className={isCompiling ? "animate-spin fill-white" : "fill-white"} />
          <span>{isCompiling ? "Compiling..." : "Run Hot Build"}</span>
        </button>
      </div>

      {/* Editor Body & Terminal Split */}
      <div className="grid grid-cols-12 gap-3 flex-1 overflow-hidden">
        {/* Left: Code Editor */}
        <div className="col-span-7 bg-[#161b22] rounded-xl p-3.5 border border-zinc-800/80 overflow-y-auto leading-relaxed shadow-inner">
          <div className="flex items-center gap-2 text-zinc-500 text-[10px] pb-2 border-b border-zinc-800 mb-2">
            <span>TypeScript 5.8</span>
            <span>•</span>
            <span>Strict Null Checks: ON</span>
            <span>•</span>
            <span className="text-emerald-400">Zero Warnings</span>
          </div>

          {activeTab === "pipeline" ? (
            <div className="space-y-1 text-[11px]">
              <div className="text-zinc-500">// High-throughput neural compute dispatch</div>
              <div>
                <span className="text-purple-400">import</span> &#123;{" "}
                <span className="text-cyan-300">NeuralEngine</span>, <span className="text-cyan-300">TensorFlow4D</span>{" "}
                &#125; <span className="text-purple-400">from</span>{" "}
                <span className="text-amber-300">&quot;@hardware/quantum-soc&quot;</span>;
              </div>
              <div className="pt-1">
                <span className="text-blue-400">export async function</span>{" "}
                <span className="text-yellow-300">dispatchInferencePass</span>(
                <span className="text-orange-300">input: Float32Array</span>
                ): <span className="text-emerald-400">Promise&lt;Result&gt;</span> &#123;
              </div>
              <div className="pl-4 text-zinc-400">
                <span className="text-purple-400">const</span> core ={" "}
                <span className="text-cyan-400">NeuralEngine.allocate</span>(&#123;
              </div>
              <div className="pl-8 text-zinc-300">
                cores: <span className="text-purple-400">16</span>,
              </div>
              <div className="pl-8 text-zinc-300">
                precision: <span className="text-amber-400">&quot;fp16-zero-drop&quot;</span>,
              </div>
              <div className="pl-8 text-zinc-300">
                memoryBandwidth: <span className="text-emerald-400">&quot;800GB/s&quot;</span>
              </div>
              <div className="pl-4">&#125;);</div>
              <div className="pl-4 text-zinc-300">
                <span className="text-purple-400">const</span> prediction ={" "}
                <span className="text-purple-400">await</span> core.infer(input);
              </div>
              <div className="pl-4">
                <span className="text-purple-400">return</span> prediction;
              </div>
              <div>&#125;</div>
            </div>
          ) : (
            <div className="space-y-1 text-[11px]">
              <div className="text-zinc-500">// Low-level SIMD Rust Kernel for AVX-512</div>
              <div>
                <span className="text-purple-400">pub unsafe fn</span>{" "}
                <span className="text-yellow-300">gemm_quantum_f32</span>(
                <span className="text-orange-300">a: *const f32, b: *const f32</span>
                ) -&gt; <span className="text-emerald-400">__m512</span> &#123;
              </div>
              <div className="pl-4 text-zinc-400">
                <span className="text-purple-400">let</span> va = _mm512_loadu_ps(a);
              </div>
              <div className="pl-4 text-zinc-400">
                <span className="text-purple-400">let</span> vb = _mm512_loadu_ps(b);
              </div>
              <div className="pl-4 text-emerald-400">_mm512_fmadd_ps(va, vb, _mm512_setzero_ps())</div>
              <div>&#125;</div>
            </div>
          )}
        </div>

        {/* Right: Real-time Terminal */}
        <div className="col-span-5 bg-black/90 rounded-xl p-3.5 border border-zinc-800/80 flex flex-col justify-between shadow-inner">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800 text-[10px] text-zinc-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Terminal size={12} /> zsh - dev@quantum-x: ~/workspace
              </span>
              <span className="text-zinc-500">Node v22.12</span>
            </div>

            <div className="space-y-1.5 text-[10px]">
              {logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`${
                    log.includes("⚡") || log.includes("✓")
                      ? "text-emerald-400"
                      : "text-zinc-300"
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-800 text-[10px] text-zinc-400 flex items-center justify-between">
            <span>Memory: 14.2 / 32 GB</span>
            <span className="text-emerald-400 font-bold">Latency: 0.12 ms</span>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="pt-2 mt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-400">
        <span className="flex items-center gap-1 text-emerald-400 font-medium">
          <CheckCircle2 size={12} /> Neural Architecture Sync • 16 Active Threads
        </span>
        <span className="text-zinc-500">UTF-8 • LF • TypeScript</span>
      </div>
    </div>
  );
}

/* =========================================================================
   2. STUDIO MODE VIEW
   ========================================================================= */
function StudioView() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(85);
  const [activePreset, setActivePreset] = useState<"master" | "vocal" | "bass">("master");
  const [seconds, setSeconds] = useState(164);

  // Animate playback timecode
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setSeconds((prev) => (prev >= 252 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `0${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Equalizer bar heights
  const [eqHeights, setEqHeights] = useState<number[]>([
    45, 60, 75, 90, 85, 70, 60, 80, 95, 75, 65, 55, 70, 85, 90, 60,
  ]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setEqHeights((prev) =>
        prev.map(() => Math.floor(30 + Math.random() * 65))
      );
    }, 150);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="h-full flex flex-col justify-between p-4 bg-[#100d1c] text-zinc-200 font-sans text-xs select-none">
      {/* DAW Transport Bar */}
      <div className="flex items-center justify-between border-b border-purple-900/40 pb-3 mb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center transition-all shadow-lg shadow-purple-900/40 cursor-pointer active:scale-95"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5 fill-white" />}
          </button>

          <div>
            <div className="font-bold text-white text-sm flex items-center gap-2">
              <Music size={14} className="text-purple-400" />
              <span>Nordic_Aurora_Spatial_Master_96kHz.flac</span>
            </div>
            <div className="text-[10px] text-zinc-400 font-mono">
              {formatTime(seconds)} / 04:12 • 24-Bit / 96kHz Lossless Spatial Audio
            </div>
          </div>
        </div>

        {/* Preset Selector Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePreset("master")}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
              activePreset === "master"
                ? "bg-purple-600 text-white shadow-md shadow-purple-900/40"
                : "bg-purple-950/40 text-purple-300 hover:bg-purple-900/30"
            }`}
          >
            Mastering Limiter
          </button>
          <button
            onClick={() => setActivePreset("vocal")}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
              activePreset === "vocal"
                ? "bg-purple-600 text-white shadow-md shadow-purple-900/40"
                : "bg-purple-950/40 text-purple-300 hover:bg-purple-900/30"
            }`}
          >
            Vocal Warmth
          </button>
          <button
            onClick={() => setActivePreset("bass")}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
              activePreset === "bass"
                ? "bg-purple-600 text-white shadow-md shadow-purple-900/40"
                : "bg-purple-950/40 text-purple-300 hover:bg-purple-900/30"
            }`}
          >
            Sub Bass +3dB
          </button>
        </div>

        {/* Volume Slider */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-300">
          <Volume2 size={16} className="text-purple-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-24 accent-purple-500 cursor-pointer"
          />
          <span>{volume}%</span>
        </div>
      </div>

      {/* Center Audio Workstation Panels */}
      <div className="grid grid-cols-12 gap-3 flex-1 overflow-hidden">
        {/* Equalizer Spectrum Visualizer */}
        <div className="col-span-8 bg-zinc-950/80 rounded-xl p-4 border border-purple-900/30 flex flex-col justify-between shadow-inner">
          <div className="flex items-center justify-between text-[11px] text-purple-300 font-mono pb-2 border-b border-purple-950">
            <span>24-Band Graphic Master Equalizer</span>
            <span className="text-emerald-400 font-bold">THD: &lt; 0.0002% • 130dB SNR</span>
          </div>

          {/* Equalizer Bar Display */}
          <div className="flex items-end justify-between gap-1.5 h-36 px-2">
            {eqHeights.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div
                  className="w-full rounded-t-sm transition-all duration-150"
                  style={{
                    height: `${isPlaying ? h : 10}%`,
                    background:
                      h > 80
                        ? "linear-gradient(to top, #a855f7, #ec4899)"
                        : "linear-gradient(to top, #6366f1, #a855f7)",
                  }}
                />
                <span className="text-[8px] text-zinc-500 font-mono hidden md:inline">
                  {i * 2 + 1}k
                </span>
              </div>
            ))}
          </div>

          {/* Waveform Strip */}
          <div className="relative h-12 bg-purple-950/30 rounded-lg border border-purple-900/20 overflow-hidden flex items-center px-3">
            <svg className="w-full h-8 text-purple-400/80" viewBox="0 0 500 50" preserveAspectRatio="none">
              <path
                d="M0,25 Q20,5 40,25 T80,25 T120,45 T160,10 T200,30 T240,5 T280,40 T320,15 T360,35 T400,10 T440,30 T480,20 T500,25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-red-400 shadow-md transition-all duration-1000"
              style={{ left: `${(seconds / 252) * 100}%` }}
            />
          </div>
        </div>

        {/* Right: Master Output Meters & Hardware DSP */}
        <div className="col-span-4 bg-zinc-950/80 rounded-xl p-4 border border-purple-900/30 flex flex-col justify-between font-mono text-[10px]">
          <div>
            <div className="text-purple-300 font-bold pb-2 border-b border-purple-950 flex items-center justify-between">
              <span>Hardware DSP Bus</span>
              <span className="text-emerald-400">Locked 0 Latency</span>
            </div>

            <div className="space-y-3 mt-3">
              <div>
                <div className="flex justify-between text-zinc-400 mb-1">
                  <span>Stereo Master L</span>
                  <span className="text-white">-2.4 dB</span>
                </div>
                <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-purple-500 transition-all duration-150"
                    style={{ width: isPlaying ? "82%" : "5%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-zinc-400 mb-1">
                  <span>Stereo Master R</span>
                  <span className="text-white">-2.1 dB</span>
                </div>
                <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-purple-500 transition-all duration-150"
                    style={{ width: isPlaying ? "85%" : "5%" }}
                  />
                </div>
              </div>

              <div className="pt-2 text-zinc-400 space-y-1">
                <div>Sample Rate: <span className="text-white">96,000 Hz</span></div>
                <div>Buffer Size: <span className="text-white">32 Samples</span></div>
                <div>Engine: <span className="text-purple-400">Metal Pro Audio</span></div>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-800/40 text-purple-200">
            Spatial B-format Ambisonics Ready
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="pt-2 mt-2 border-t border-purple-900/40 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
        <span className="text-purple-400">Graphene Acoustic Drivers • 45dB Active Cancelation</span>
        <span>Output: 32-Bit Floating Point</span>
      </div>
    </div>
  );
}

/* =========================================================================
   3. GAMING MODE VIEW (with interactive mini-canvas starfield/game loop)
   ========================================================================= */
function GamingView() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fpsPreset, setFpsPreset] = useState<"ultra" | "esports">("ultra");
  const [liveFps, setLiveFps] = useState(168);
  const [isStressTesting, setIsStressTesting] = useState(false);

  // Live FPS fluctuation
  useEffect(() => {
    const base = fpsPreset === "ultra" ? 168 : 240;
    const interval = setInterval(() => {
      const jitter = Math.floor(Math.random() * 9) - 4;
      setLiveFps(base + jitter);
    }, 400);
    return () => clearInterval(interval);
  }, [fpsPreset]);

  // Mini Interactive Starfield Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const stars: { x: number; y: number; z: number; oZ: number }[] = [];
    const numStars = isStressTesting ? 450 : 220;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * canvas.width * 2,
        y: (Math.random() - 0.5) * canvas.height * 2,
        z: Math.random() * canvas.width,
        oZ: canvas.width,
      });
    }

    const render = () => {
      ctx.fillStyle = "rgba(5, 7, 15, 0.35)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const speed = isStressTesting ? 14 : 4.5;

      stars.forEach((star) => {
        star.z -= speed;
        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = (Math.random() - 0.5) * canvas.width * 2;
          star.y = (Math.random() - 0.5) * canvas.height * 2;
        }

        const k = 128.0 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          const size = Math.max(0.8, (1 - star.z / canvas.width) * 3);
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = isStressTesting ? "#f43f5e" : "#38bdf8";
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [isStressTesting]);

  const triggerStressTest = () => {
    setIsStressTesting(true);
    setTimeout(() => setIsStressTesting(false), 2400);
  };

  return (
    <div className="h-full flex flex-col justify-between p-4 bg-[#07090e] text-zinc-200 font-sans text-xs select-none relative overflow-hidden">
      {/* Background Interactive Starfield Game Canvas */}
      <canvas
        ref={canvasRef}
        width={1000}
        height={600}
        onClick={triggerStressTest}
        className="absolute inset-0 w-full h-full object-cover cursor-crosshair opacity-80"
      />

      {/* Cyberpunk HUD Top Telemetry Bar */}
      <div className="relative z-10 flex items-center justify-between pb-3 mb-2 border-b border-rose-900/40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-rose-500 tracking-wider flex items-center gap-1.5 uppercase">
            <Zap size={14} className="fill-rose-500" /> Apex Vision Engine 4K
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400 font-mono text-[11px]">DirectX 12 Ultimate • Vulkan Pro</span>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFpsPreset("ultra")}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              fpsPreset === "ultra"
                ? "bg-rose-600 text-white shadow-lg shadow-rose-900/40"
                : "bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            Ultra Ray Tracing
          </button>
          <button
            onClick={() => setFpsPreset("esports")}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              fpsPreset === "esports"
                ? "bg-rose-600 text-white shadow-lg shadow-rose-900/40"
                : "bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            240Hz Esports Low-Lag
          </button>
        </div>
      </div>

      {/* Main Center Overlays */}
      <div className="relative z-10 flex items-start justify-between flex-1">
        {/* Real-time FPS & GPU Telemetry HUD Widget */}
        <div className="bg-black/85 backdrop-blur-md p-4 rounded-xl border border-rose-500/30 font-mono shadow-2xl">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-5xl font-black text-emerald-400 tracking-tight leading-none">
              {liveFps}
            </span>
            <span className="text-xs text-zinc-400 font-bold uppercase">FPS</span>
          </div>
          <div className="text-[11px] text-zinc-300 space-y-1 mt-2">
            <div>
              99% Low: <span className="text-white font-bold">{liveFps - 14} FPS</span>
            </div>
            <div>
              Frame Time:{" "}
              <span className="text-emerald-400 font-bold">{(1000 / liveFps).toFixed(1)} ms</span>
            </div>
            <div>
              DLSS 3: <span className="text-rose-400 font-bold">Frame Generation ON</span>
            </div>
            <div>
              VRAM: <span className="text-white font-bold">14.2 GB / 16 GB GDDR7</span>
            </div>
          </div>
        </div>

        {/* Crosshair & Interactive Trigger */}
        <div className="flex flex-col items-end gap-3">
          <div className="bg-black/85 backdrop-blur-md p-3.5 rounded-xl border border-rose-500/30 font-mono text-right text-[11px]">
            <div className="flex items-center justify-end gap-1.5 text-rose-400 font-bold">
              <Flame size={14} className="fill-rose-400" />
              <span>GPU Core: 61°C</span>
            </div>
            <div className="text-zinc-400 text-[10px]">Dual Vapor Chamber Fans: 1,450 RPM</div>
            <div className="text-emerald-400 text-[10px] font-bold mt-1">G-Sync Ultimate Active</div>
          </div>

          <button
            onClick={triggerStressTest}
            className="bg-rose-600 hover:bg-rose-500 active:scale-95 text-white px-4 py-2 rounded-xl text-xs font-black tracking-wide flex items-center gap-2 shadow-xl shadow-rose-950/60 cursor-pointer transition-all"
          >
            <RefreshCw size={13} className={isStressTesting ? "animate-spin" : ""} />
            <span>{isStressTesting ? "STRESS PASS ACTIVE (450 STARS)" : "TRIGGER GPU STRESS PASS"}</span>
          </button>
        </div>
      </div>

      {/* Bottom Weapon / Health HUD */}
      <div className="relative z-10 pt-2 border-t border-rose-900/40 flex items-center justify-between text-[11px] font-mono text-zinc-400 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <span className="text-emerald-400 font-bold">OLED 120Hz ProMotion (0.03ms GtG)</span>
          <span>HDR 1000 TrueBlack</span>
        </div>
        <span className="text-rose-400">Click screen anywhere to engage warp speed</span>
      </div>
    </div>
  );
}
