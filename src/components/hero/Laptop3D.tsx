"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, Html, RoundedBox } from "@react-three/drei";
import ScreenContent, { ModeType } from "./ScreenContent";

interface Laptop3DProps {
  activeMode: ModeType;
  setActiveMode: (mode: ModeType) => void;
}

export default function Laptop3D({ activeMode, setActiveMode }: Laptop3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Dynamic mode-driven accent colors for backlight and ambient lighting
  const modeColors = useMemo(() => {
    switch (activeMode) {
      case "dev":
        return {
          accent: "#10b981", // Emerald
          glow: "#059669",
          keyLight: "#34d399",
        };
      case "studio":
        return {
          accent: "#a855f7", // Violet
          glow: "#8b5cf6",
          keyLight: "#c084fc",
        };
      case "gaming":
        return {
          accent: "#f43f5e", // Crimson / Neon Rose
          glow: "#e11d48",
          keyLight: "#fb7185",
        };
    }
  }, [activeMode]);

  // Gentle cursor parallax lerping (smooth 60fps tilt)
  useFrame((state) => {
    if (!groupRef.current) return;
    const targetRotY = state.pointer.x * 0.2;
    const targetRotX = 0.08 - state.pointer.y * 0.12;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
  });

  // Chiclet keyboard layout rows (horizontal along X-Z plane)
  const keyRows = useMemo(() => {
    const rows = [];
    const rowZPositions = [-0.6, -0.4, -0.2, 0.0, 0.2]; // Z positions relative to keyboard center
    const widths = [0.17, 0.17, 0.17, 0.17, 0.17];

    for (let r = 0; r < 5; r++) {
      const z = rowZPositions[r];
      if (r === 4) {
        // Bottom row with wide spacebar
        rows.push({ x: -1.1, z, w: 0.28 });
        rows.push({ x: -0.75, z, w: 0.24 });
        rows.push({ x: 0, z, w: 1.15 }); // Spacebar
        rows.push({ x: 0.75, z, w: 0.24 });
        rows.push({ x: 1.1, z, w: 0.28 });
      } else {
        // Standard alphanumeric keys
        const count = 13;
        const startX = -1.25;
        const step = 2.5 / (count - 1);
        for (let c = 0; c < count; c++) {
          rows.push({ x: startX + c * step, z, w: widths[r] });
        }
      }
    }
    return rows;
  }, []);

  return (
    <>
      {/* Studio Lighting Setup for vibrant metallic reflections */}
      <ambientLight intensity={1.1} />
      <directionalLight position={[6, 9, 7]} intensity={2.2} castShadow />
      <directionalLight position={[-6, 5, 2]} intensity={1.2} color="#38bdf8" />
      <directionalLight position={[0, -4, 4]} intensity={0.6} color="#ffffff" />

      {/* Reactive Neon accent point lights behind the screen & under the chassis */}
      <pointLight
        position={[0, 1.5, -1.2]}
        intensity={3.5}
        distance={7}
        color={modeColors.glow}
      />
      <pointLight
        position={[0, 0.15, 0.1]}
        intensity={1.8}
        distance={4.5}
        color={modeColors.accent}
      />

      {/* Subtle floating animation */}
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.35}>
        <group ref={groupRef} position={[0, -0.32, 0]}>
          {/* =============================================================
              1. BASE CHASSIS (Horizontal on X-Z plane, Y is thickness)
              ============================================================= */}
          {/* Main Lower Body Unibody */}
          <RoundedBox
            args={[3.8, 0.12, 2.6]}
            radius={0.035}
            smoothness={4}
            position={[0, -0.06, 0]}
          >
            <meshStandardMaterial
              color="#1c1f26"
              roughness={0.25}
              metalness={0.85}
            />
          </RoundedBox>

          {/* Recessed Keyboard Well (Thin box lying flat horizontally) */}
          <mesh position={[0, 0.002, -0.2]}>
            <boxGeometry args={[3.12, 0.004, 1.34]} />
            <meshStandardMaterial color="#0a0c10" roughness={0.6} metalness={0.4} />
          </mesh>

          {/* Illuminated Keyboard Backlight Bed (Lying flat horizontally) */}
          <mesh position={[0, 0.004, -0.2]}>
            <boxGeometry args={[3.08, 0.004, 1.3]} />
            <meshBasicMaterial
              color={modeColors.accent}
              transparent
              opacity={0.4}
            />
          </mesh>

          {/* Chiclet Keycaps (Horizontal boxes) */}
          {keyRows.map((k, i) => (
            <mesh key={i} position={[k.x, 0.015, -0.2 + k.z]}>
              <boxGeometry args={[k.w, 0.016, 0.16]} />
              <meshStandardMaterial
                color="#181b22"
                roughness={0.35}
                metalness={0.6}
              />
            </mesh>
          ))}

          {/* Trackpad (Thin box lying flat horizontally) */}
          <mesh position={[0, 0.003, 0.72]}>
            <boxGeometry args={[1.32, 0.004, 0.82]} />
            <meshStandardMaterial
              color="#161922"
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>
          {/* Trackpad Subtle Border */}
          <mesh position={[0, 0.002, 0.72]}>
            <boxGeometry args={[1.35, 0.003, 0.85]} />
            <meshBasicMaterial color="#2d323e" />
          </mesh>

          {/* Front Thumb Notch */}
          <mesh position={[0, -0.01, 1.302]}>
            <boxGeometry args={[0.34, 0.04, 0.01]} />
            <meshStandardMaterial color="#0b0c10" roughness={0.5} />
          </mesh>

          {/* Speaker Grilles (Left & Right strips lying flat) */}
          <mesh position={[-1.7, 0.002, -0.2]}>
            <boxGeometry args={[0.12, 0.004, 1.3]} />
            <meshStandardMaterial color="#0c0e12" roughness={0.8} metalness={0.3} />
          </mesh>
          <mesh position={[1.7, 0.002, -0.2]}>
            <boxGeometry args={[0.12, 0.004, 1.3]} />
            <meshStandardMaterial color="#0c0e12" roughness={0.8} metalness={0.3} />
          </mesh>

          {/* =============================================================
              2. CYLINDER HINGE (Along X axis at back edge)
              ============================================================= */}
          <mesh position={[0, 0.025, -1.26]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.045, 0.045, 3.42, 32]} />
            <meshStandardMaterial color="#1b1e26" roughness={0.3} metalness={0.85} />
          </mesh>

          {/* =============================================================
              3. DISPLAY LID & BEZEL (Angled back at ~115 degrees)
              ============================================================= */}
          {/* Hinge Pivot Group */}
          <group position={[0, 0.025, -1.26]} rotation={[-0.4363, 0, 0]}>
            {/* Outer Lid Frame Backing */}
            <RoundedBox
              args={[3.8, 2.4, 0.06]}
              radius={0.035}
              smoothness={4}
              position={[0, 1.2, -0.03]}
            >
              <meshStandardMaterial
                color="#1c1f26"
                roughness={0.25}
                metalness={0.85}
              />
            </RoundedBox>

            {/* Glowing Logo on the back of the lid */}
            <mesh position={[0, 1.2, -0.062]}>
              <circleGeometry args={[0.14, 32]} />
              <meshBasicMaterial color={modeColors.accent} transparent opacity={0.7} />
            </mesh>

            {/* Inner Screen Bezel Frame */}
            <mesh position={[0, 1.2, 0.002]}>
              <boxGeometry args={[3.76, 2.36, 0.006]} />
              <meshStandardMaterial color="#08090c" roughness={0.6} metalness={0.4} />
            </mesh>

            {/* Top Webcam Notch */}
            <mesh position={[0, 2.31, 0.008]}>
              <circleGeometry args={[0.015, 16]} />
              <meshBasicMaterial color="#000000" />
            </mesh>
            <mesh position={[0.03, 2.31, 0.008]}>
              <circleGeometry args={[0.006, 16]} />
              <meshBasicMaterial color="#10b981" />
            </mesh>

            {/* Screen Glass Backing Box */}
            <mesh position={[0, 1.18, 0.005]}>
              <boxGeometry args={[3.4, 2.15, 0.004]} />
              <meshStandardMaterial color="#040507" roughness={0.2} metalness={0.9} />
            </mesh>

            {/* =============================================================
                4. INTERACTIVE SCREEN PORTAL (Drei Html WITHOUT occlude)
                ============================================================= */}
            <Html
              transform
              distanceFactor={1.2}
              position={[0, 1.18, 0.01]}
              style={{
                pointerEvents: "auto",
              }}
            >
              <ScreenContent mode={activeMode} onModeChange={setActiveMode} />
            </Html>
          </group>
        </group>
      </Float>
    </>
  );
}
