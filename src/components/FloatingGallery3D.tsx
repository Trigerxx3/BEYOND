import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Image } from '@react-three/drei'

interface FloatingGallery3DProps {
  scrollProgress: number
}

interface PanelData {
  url: string
  position: [number, number, number]
  scale: [number, number]
  radius: number
  floatSpeed: number
  floatAmp: number
  phase: number
  tag: string
  label: string
}

const PANELS: PanelData[] = [
  // 1. Large Central Landscape Sculpture Panel
  {
    url: '/assets/gallery-sculpture.jpg',
    position: [0, 0, 0],
    scale: [4.6, 2.6],
    radius: 0.12,
    floatSpeed: 0.6,
    floatAmp: 0.08,
    phase: 0,
    tag: 'CORE DYNAMICS',
    label: 'Fluid Synaptic Lattice',
  },
  // 2. Smaller Editorial Portrait Panel (Upper-Left)
  {
    url: '/assets/gallery-portrait.jpg',
    position: [-3.8, 1.8, 0.5],
    scale: [1.8, 2.4],
    radius: 0.1,
    floatSpeed: 0.8,
    floatAmp: 0.12,
    phase: 1.2,
    tag: 'NEURAL WEARABLE',
    label: 'Sub-cranial Auricular Array',
  },
  // 3. Small Portrait Panel (Upper-Right)
  {
    url: '/assets/gallery-interface.jpg',
    position: [3.7, 1.6, -0.2],
    scale: [1.7, 2.3],
    radius: 0.1,
    floatSpeed: 0.7,
    floatAmp: 0.1,
    phase: 2.5,
    tag: 'TELEMETRY BAND',
    label: 'Motor-Cortex Pre-Computation',
  },
  // 4. Large Blue-Toned Portrait (Lower-Left)
  {
    url: '/assets/gallery-blue-portrait.jpg',
    position: [-3.3, -2.0, 0.7],
    scale: [2.2, 2.9],
    radius: 0.12,
    floatSpeed: 0.5,
    floatAmp: 0.14,
    phase: 3.8,
    tag: 'HUMAN INTERACTION',
    label: 'Silent Intention Decoding',
  },
  // 5. Smaller Motion Art Image (Lower-Right)
  {
    url: '/assets/gallery-motion.jpg',
    position: [3.5, -1.8, 0.3],
    scale: [1.8, 2.4],
    radius: 0.1,
    floatSpeed: 0.9,
    floatAmp: 0.11,
    phase: 4.9,
    tag: 'KINETIC RESONANCE',
    label: 'Zero-Latency Synthesis',
  },
]

function FloatingPanel({
  panel,
  galleryOpacity,
}: {
  panel: PanelData
  galleryOpacity: number
}) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    const mouseX = state.pointer.x * 0.25
    const mouseY = state.pointer.y * 0.2

    // Independent gentle floating motion + pointer parallax
    meshRef.current.position.y =
      panel.position[1] +
      Math.sin(time * panel.floatSpeed + panel.phase) * panel.floatAmp +
      mouseY * 0.2
    meshRef.current.position.x =
      panel.position[0] + mouseX * 0.25
    meshRef.current.position.z =
      panel.position[2] + Math.cos(time * 0.4 + panel.phase) * 0.05

    // Subtle tilt
    meshRef.current.rotation.y = mouseX * 0.1
    meshRef.current.rotation.x = -mouseY * 0.08
  })

  if (galleryOpacity <= 0.01) return null

  return (
    <group
      ref={meshRef}
      position={panel.position}
    >
      {/* 3D Image Panel with Rounded Corners */}
      <Image
        url={panel.url}
        scale={panel.scale}
        radius={panel.radius}
        transparent
        opacity={galleryOpacity}
      />

      {/* Subtle Violet Rim Glow Behind Panel */}
      <mesh position={[0, 0, -0.04]}>
        <planeGeometry args={[panel.scale[0] + 0.1, panel.scale[1] + 0.1]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={galleryOpacity * 0.18}
        />
      </mesh>
    </group>
  )
}

export function FloatingGallery3D({ scrollProgress }: FloatingGallery3DProps) {
  const containerRef = useRef<THREE.Group>(null)

  // Gallery visibility window: smoothly emerges between 0.60 and 0.88 scroll progress
  // Scene E peak is around 0.72 - 0.82
  let opacity = 0
  if (scrollProgress >= 0.58 && scrollProgress <= 0.92) {
    if (scrollProgress < 0.68) {
      opacity = (scrollProgress - 0.58) / 0.1
    } else if (scrollProgress > 0.84) {
      opacity = 1 - (scrollProgress - 0.84) / 0.08
    } else {
      opacity = 1
    }
  }

  // Smooth ease for opacity
  opacity = THREE.MathUtils.clamp(opacity, 0, 1)

  useFrame(() => {
    if (!containerRef.current) return
    // Forward glide through the gallery as user scrolls
    const zOffset = (scrollProgress - 0.72) * 12.0
    containerRef.current.position.z = -zOffset
  })

  return (
    <group ref={containerRef} position={[0, 0, -2]}>
      {PANELS.map((panel, idx) => (
        <FloatingPanel
          key={idx}
          panel={panel}
          galleryOpacity={opacity}
        />
      ))}
    </group>
  )
}
