import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

interface ChromeStarProps {
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
  scrollProgress?: number
  isHero?: boolean
}

export function createFourPointStarShape(outerRadius = 2.3, innerRadius = 0.36) {
  const shape = new THREE.Shape()

  // Top tip (0, outerRadius)
  shape.moveTo(0, outerRadius)

  // Quadrant 1: Top to Right tip (outerRadius, 0)
  shape.bezierCurveTo(0, innerRadius, innerRadius, 0, outerRadius, 0)

  // Quadrant 2: Right to Bottom tip (0, -outerRadius)
  shape.bezierCurveTo(innerRadius, 0, 0, -innerRadius, 0, -outerRadius)

  // Quadrant 3: Bottom to Left tip (-outerRadius, 0)
  shape.bezierCurveTo(0, -innerRadius, -innerRadius, 0, -outerRadius, 0)

  // Quadrant 4: Left to Top tip (0, outerRadius)
  shape.bezierCurveTo(-innerRadius, 0, 0, innerRadius, 0, outerRadius)

  return shape
}

export function ChromeStar({
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scrollProgress: _scrollProgress = 0,
  isHero = true,
}: ChromeStarProps) {
  const groupRef = useRef<THREE.Group>(null)
  const innerMeshRef = useRef<THREE.Mesh>(null)

  // Generate sculpted 3D beveled star geometry
  const geometry = useMemo(() => {
    const shape = createFourPointStarShape(2.2, 0.38)
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      steps: 4,
      depth: 0.36,
      bevelEnabled: true,
      bevelThickness: 0.28,
      bevelSize: 0.16,
      bevelOffset: -0.02,
      bevelSegments: 16,
      curveSegments: 32,
    }
    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    geom.center()
    geom.computeVertexNormals()
    return geom
  }, [])

  // Create inner diamond facet for ultra-luxury chrome refraction
  const centerDiamondGeom = useMemo(() => {
    const geom = new THREE.OctahedronGeometry(0.55, 0)
    geom.scale(0.8, 0.8, 1.4)
    geom.computeVertexNormals()
    return geom
  }, [])

  // Chrome physical material with high reflectivity and purple specular tint
  const chromeMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#f0f4f8'),
      metalness: 0.98,
      roughness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 1.0,
      ior: 2.6,
      envMapIntensity: 3.5,
      specularColor: new THREE.Color('#d8b4fe'),
      specularIntensity: 1.5,
    })
  }, [])

  const diamondMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ffffff'),
      metalness: 0.85,
      roughness: 0.02,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      transmission: 0.65,
      ior: 2.2,
      thickness: 0.4,
      envMapIntensity: 4.0,
      specularColor: new THREE.Color('#c084fc'),
    })
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Base rotation
    const time = state.clock.getElapsedTime()
    const mouseX = state.pointer.x * 0.4
    const mouseY = state.pointer.y * 0.3

    if (isHero) {
      // Dynamic continuous rotation with pointer parallax
      groupRef.current.rotation.y = time * 0.25 + mouseX + rotation[1]
      groupRef.current.rotation.x = Math.sin(time * 0.35) * 0.15 - mouseY + rotation[0]
      groupRef.current.rotation.z = Math.cos(time * 0.28) * 0.12 + rotation[2]

      // Subtle breathing float
      groupRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.08
      groupRef.current.position.x = position[0] + mouseX * 0.3
      groupRef.current.position.z = position[2]
    } else {
      // Background or secondary star
      groupRef.current.rotation.y += delta * 0.2
      groupRef.current.rotation.x = rotation[0] + Math.sin(time * 0.4) * 0.1
      groupRef.current.rotation.z = rotation[2] + Math.cos(time * 0.3) * 0.08
    }

    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.z = -time * 0.4
    }
  })

  return (
    <group ref={groupRef} scale={scale} position={position}>
      {/* Sculpted Chrome Star Main Body */}
      <mesh
        geometry={geometry}
        material={chromeMaterial}
        castShadow
        receiveShadow
      />

      {/* Internal Diamond Facet Center */}
      <mesh
        ref={innerMeshRef}
        geometry={centerDiamondGeom}
        material={diamondMaterial}
        position={[0, 0, 0]}
      />

      {/* Subtle Purple Specular Point Lights on Star Tips */}
      <pointLight position={[0, 2.2, 0.4]} color="#c084fc" intensity={1.5} distance={3} />
      <pointLight position={[2.2, 0, 0.4]} color="#a855f7" intensity={1.5} distance={3} />
      <pointLight position={[0, -2.2, 0.4]} color="#818cf8" intensity={1.5} distance={3} />
      <pointLight position={[-2.2, 0, 0.4]} color="#a855f7" intensity={1.5} distance={3} />
      <pointLight position={[0, 0, 0.8]} color="#ffffff" intensity={2.0} distance={2.5} />
    </group>
  )
}
