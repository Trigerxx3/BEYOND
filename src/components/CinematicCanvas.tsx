import { Suspense, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { ChromeStar } from './ChromeStar'
import { ParticleField } from './ParticleField'
import { FloatingGallery3D } from './FloatingGallery3D'

interface CinematicCanvasProps {
  scrollProgress: number
}

function SceneChoreography({ scrollProgress }: { scrollProgress: number }) {
  const violetLightRef = useRef<THREE.PointLight>(null)
  const dirLightRef = useRef<THREE.DirectionalLight>(null)

  // Camera & Star dynamic coordinates calculated from scroll progress
  useFrame((state) => {
    const p = THREE.MathUtils.clamp(scrollProgress, 0, 1)
    const camera = state.camera

    let targetCamZ = 7.2
    let targetCamY = 0
    let targetCamX = state.pointer.x * 0.4

    if (p < 0.2) {
      // Scene A: The Awakening
      const t = p / 0.2
      targetCamZ = THREE.MathUtils.lerp(7.2, 6.0, t)
      targetCamY = THREE.MathUtils.lerp(0, 0.1, t)
    } else if (p < 0.42) {
      // Scene B: The Approach
      const t = (p - 0.2) / 0.22
      targetCamZ = THREE.MathUtils.lerp(6.0, 3.2, t)
      targetCamY = THREE.MathUtils.lerp(0.1, 0.25, t)
    } else if (p < 0.62) {
      // Scene C: The Transformation (Macro proximity)
      const t = (p - 0.42) / 0.2
      targetCamZ = THREE.MathUtils.lerp(3.2, 1.4, t)
      targetCamY = THREE.MathUtils.lerp(0.25, -0.1, t)
    } else if (p < 0.75) {
      // Scene D: The Flight Through Space
      const t = (p - 0.62) / 0.13
      targetCamZ = THREE.MathUtils.lerp(1.4, 4.8, t)
      targetCamY = THREE.MathUtils.lerp(-0.1, 0.0, t)
    } else if (p < 0.90) {
      // Scene E: The Floating Gallery
      const t = (p - 0.75) / 0.15
      targetCamZ = THREE.MathUtils.lerp(4.8, 4.0, t)
      targetCamY = THREE.MathUtils.lerp(0.0, -0.2, t)
    } else {
      // Scene F & G: Intelligence Reveal & Final Invitation
      const t = (p - 0.90) / 0.1
      targetCamZ = THREE.MathUtils.lerp(4.0, 5.8, t)
      targetCamY = THREE.MathUtils.lerp(-0.2, 0.2, t)
    }

    // Smooth camera lerp
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.08)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY + state.pointer.y * 0.3, 0.08)
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.08)
    camera.lookAt(0, 0, 0)

    // Dynamic Violet Atmospheric Light
    if (violetLightRef.current) {
      const intensity =
        p < 0.35
          ? THREE.MathUtils.lerp(2.0, 6.0, p / 0.35)
          : p < 0.65
          ? THREE.MathUtils.lerp(6.0, 10.0, (p - 0.35) / 0.3)
          : THREE.MathUtils.lerp(10.0, 3.5, (p - 0.65) / 0.35)
      violetLightRef.current.intensity = intensity
    }
  })

  // Calculate Star Scale & Position based on scroll progress
  const getStarTransform = (): {
    scale: number
    position: [number, number, number]
    rotation: [number, number, number]
  } => {
    const p = scrollProgress
    if (p < 0.2) {
      const t = p / 0.2
      return {
        scale: THREE.MathUtils.lerp(1.0, 1.4, t),
        position: [0, 0, 0],
        rotation: [0, t * 0.8, 0],
      }
    } else if (p < 0.42) {
      const t = (p - 0.2) / 0.22
      return {
        scale: THREE.MathUtils.lerp(1.4, 2.8, t),
        position: [0, 0, 0],
        rotation: [t * 0.6, 0.8 + t * 1.5, t * 0.4],
      }
    } else if (p < 0.62) {
      const t = (p - 0.42) / 0.2
      // Macro close up: Star expands to fill the viewport
      return {
        scale: THREE.MathUtils.lerp(2.8, 6.2, t),
        position: [
          THREE.MathUtils.lerp(0, 0.4, t),
          THREE.MathUtils.lerp(0, -0.3, t),
          THREE.MathUtils.lerp(0, 0.5, t),
        ],
        rotation: [0.6 + t * 1.2, 2.3 + t * 2.0, 0.4 + t * 0.8],
      }
    } else if (p < 0.75) {
      // Moving away during flight through space
      const t = (p - 0.62) / 0.13
      return {
        scale: THREE.MathUtils.lerp(6.2, 0.01, t),
        position: [0.4 - t * 4, -0.3 - t * 3, 0.5 + t * 4],
        rotation: [1.8 + t * 2, 4.3 + t * 2, 1.2],
      }
    } else if (p < 0.88) {
      // Hidden or tiny background during Floating Gallery
      return {
        scale: 0.001,
        position: [0, 0, -10],
        rotation: [0, 0, 0],
      }
    } else {
      // Scene G: Re-emerges majestically for the final invitation
      const t = THREE.MathUtils.clamp((p - 0.88) / 0.12, 0, 1)
      return {
        scale: THREE.MathUtils.lerp(0.1, 1.8, t),
        position: [0, THREE.MathUtils.lerp(-2, 0.2, t), 0],
        rotation: [t * 0.4, t * 2.5, t * 0.3],
      }
    }
  }

  const star = getStarTransform()

  return (
    <>
      {/* Lighting Architecture */}
      <ambientLight intensity={0.6} color="#2e1065" />
      
      {/* Key Silver Specular Light */}
      <directionalLight
        ref={dirLightRef}
        position={[6, 8, 8]}
        intensity={2.8}
        color="#ffffff"
      />

      {/* Deep Violet & Electric Purple Volumetric Point Lights */}
      <pointLight
        ref={violetLightRef}
        position={[-5, 3, 2]}
        color="#a855f7"
        intensity={3.5}
        distance={25}
      />
      <pointLight
        position={[4, -4, 3]}
        color="#7c3aed"
        intensity={2.8}
        distance={20}
      />
      <pointLight
        position={[0, 0, -5]}
        color="#c084fc"
        intensity={2.0}
        distance={18}
      />

      {/* Cool Cyan Accent Fill Light */}
      <directionalLight
        position={[-6, -5, 4]}
        intensity={1.0}
        color="#38bdf8"
      />

      {/* Studio Environment Reflections */}
      <Environment preset="night" />

      {/* Centerpiece 3D Chrome Star */}
      <ChromeStar
        scale={star.scale}
        position={star.position}
        rotation={star.rotation}
        scrollProgress={scrollProgress}
        isHero={scrollProgress < 0.4}
      />

      {/* GPU Particle Field */}
      <ParticleField scrollProgress={scrollProgress} />

      {/* 3D Floating Gallery for Scene E */}
      <FloatingGallery3D scrollProgress={scrollProgress} />
    </>
  )
}

export function CinematicCanvas({ scrollProgress }: CinematicCanvasProps) {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-10">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
        }}
      >
        <Suspense fallback={null}>
          <SceneChoreography scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  )
}
