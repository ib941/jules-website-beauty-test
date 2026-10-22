"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import Laptop3D from "./Laptop3D";
import { ModeType } from "./ScreenContent";

interface LaptopCanvasProps {
  activeMode: ModeType;
  setActiveMode: (mode: ModeType) => void;
}

export default function LaptopCanvas({ activeMode, setActiveMode }: LaptopCanvasProps) {
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0.45, 4.3], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        className="w-full h-full select-none"
      >
        <Laptop3D activeMode={activeMode} setActiveMode={setActiveMode} />
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.65}
          scale={9}
          blur={2.4}
          far={4}
          color="#000000"
        />
      </Canvas>
    </div>
  );
}
