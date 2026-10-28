import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'

interface ParticleFieldProps {
  scrollProgress?: number
  count?: number
}

const particleVertexShader = `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uMouse;
  uniform float uPixelRatio;

  attribute float aSize;
  attribute vec3 aColor;
  attribute float aSpeed;
  attribute vec3 aOffset;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;

    vec3 pos = position;

    // Organic neural currents and harmonic swirl
    float angle = uTime * 0.12 * aSpeed + aOffset.x;
    pos.x += sin(angle + pos.z * 0.15) * 0.35;
    pos.y += cos(angle + pos.x * 0.15) * 0.35;

    // Scroll warp: forward flight speed along Z-axis as user scrolls
    float zSpan = 55.0;
    float zShift = uScroll * 40.0 + uTime * aSpeed * 1.8;
    pos.z = mod(pos.z + zShift + 35.0, zSpan) - 35.0;

    // Subtle pointer repulsion / fluid draft
    float mouseDist = length(pos.xy - uMouse * 6.0);
    pos.xy += (uMouse * 1.2) / (1.0 + mouseDist * 0.3);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuation with perspective
    float depth = -mvPosition.z;
    gl_PointSize = (aSize * uPixelRatio * (32.0 / max(depth, 0.2)));

    // Distance fade (soft entry and exit)
    vAlpha = smoothstep(0.4, 2.8, depth) * (1.0 - smoothstep(22.0, 48.0, depth));
  }
`

const particleFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    // Exponential soft glow with bright core
    float core = 1.0 - smoothstep(0.0, 0.18, dist);
    float halo = 1.0 - smoothstep(0.1, 0.5, dist);
    float intensity = core * 0.85 + halo * 0.55;

    vec3 finalColor = mix(vColor, vec3(1.0), core * 0.65);
    gl_FragColor = vec4(finalColor, intensity * vAlpha);
  }
`

export function ParticleField({ scrollProgress = 0, count = 4200 }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const { gl } = useThree()

  const [positions, colors, sizes, speeds, offsets] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    const spd = new Float32Array(count)
    const off = new Float32Array(count * 3)

    const palette = [
      new THREE.Color('#ffffff'), // Pure bright white core
      new THREE.Color('#e9d5ff'), // Soft lavender
      new THREE.Color('#c084fc'), // Electric purple
      new THREE.Color('#9333ea'), // Deep violet
      new THREE.Color('#38bdf8'), // Faint cool cyan accent
    ]

    for (let i = 0; i < count; i++) {
      // Clustered galaxy distribution
      const r = Math.pow(Math.random(), 0.65) * 18.0
      const theta = Math.random() * Math.PI * 2
      const z = (Math.random() - 0.5) * 55.0

      pos[i * 3] = r * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(theta) * 0.65 // slightly flattened wide aspect
      pos[i * 3 + 2] = z

      // Pick color with weighted distribution
      const rand = Math.random()
      let pickedColor = palette[0]
      if (rand < 0.38) pickedColor = palette[0] // 38% white
      else if (rand < 0.68) pickedColor = palette[1] // 30% lavender
      else if (rand < 0.90) pickedColor = palette[2] // 22% electric purple
      else if (rand < 0.96) pickedColor = palette[3] // 6% deep violet
      else pickedColor = palette[4] // 4% cyan accent

      col[i * 3] = pickedColor.r
      col[i * 3 + 1] = pickedColor.g
      col[i * 3 + 2] = pickedColor.b

      sz[i] = Math.random() * 2.8 + 1.2
      spd[i] = Math.random() * 0.8 + 0.3

      off[i * 3] = Math.random() * Math.PI * 2
      off[i * 3 + 1] = Math.random() * Math.PI * 2
      off[i * 3 + 2] = Math.random() * Math.PI * 2
    }

    return [pos, col, sz, spd, off]
  }, [count])

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: scrollProgress },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
  }), [gl])

  useFrame((state) => {
    if (!pointsRef.current) return
    const mat = pointsRef.current.material as THREE.ShaderMaterial
    mat.uniforms.uTime.value = state.clock.getElapsedTime()
    mat.uniforms.uScroll.value = scrollProgress
    mat.uniforms.uMouse.value.set(state.pointer.x, state.pointer.y)
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aColor"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          args={[speeds, 1]}
        />
        <bufferAttribute
          attach="attributes-aOffset"
          args={[offsets, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
