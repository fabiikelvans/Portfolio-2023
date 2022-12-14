import { useFrame, extend } from '@react-three/fiber';
import { button, folder, useControls } from 'leva';
import React, { useMemo, useRef, useEffect } from 'react'
import { DoubleSide, MathUtils } from 'three';
import { OrbitControls, Point, Points } from "@react-three/drei";
import fragmentShader from './shaders/fragmentShader';
import vertexShader from './shaders/vertexShader';
import * as THREE from 'three';
import fragmentParticlesShader from './shaders/fragmentParticles';
import vertexParticlesShader from './shaders/vertexParticles';

function WaterColor01() {

     // This reference will give us direct access to the mesh
  const mesh = useRef();
  const particles = useRef();
  const hover = useRef(false);

  // Debug
  const [{ scale, wireframe }, set] = useControls("Blob", 
  () => ({
    transform: folder({
      scale : { 
        value: 1.5, 
        min: 0.4, 
        max:3, step: 
        0.2,}
    }),
    material:  folder({
      wireframe: false,
    }),
    
    reset: button(() => {
      set({
        scale: 1.5,
        wireframe: false,
      })
    })
  })
);

  const uniforms = useMemo(
    () => ({
      u_resolution: {
        value: new THREE.Vector2(),
      },
      u_time: {
        value: 0.0,
      },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();

    // mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
    //   mesh.current.material.uniforms.u_intensity.value,
    //   hover.current ? 0.85 : 0.15,
    //   0.02
    // );
  });


  /**
 * Particles
 */
// Geometry
function Particles() {
    const particlesGeometry = new THREE.BufferGeometry()
const count = 50000

const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for(let i = 0; i < count * 3; i++)
{
    positions[i] = (Math.random() - 0.5) * 10
    colors[i] = Math.random()
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

// Material
const particlesMaterial = new THREE.PointsMaterial()

particlesMaterial.size = 0.1
particlesMaterial.sizeAttenuation = true

particlesMaterial.color = new THREE.Color('#ff88cc')
particlesMaterial.vertexColors = true



  
//   for(let i = 0; i < N; i++) {
//     positions[3*i] = 2 *Math.random() -1;
//     positions[3*i+1] = 2 *Math.random() -1;
//     positions[3*i+2] = 2 *Math.random() -1;
//   }
const Particles = new THREE.Points(particlesGeometry, particlesMaterial)

}




  return (
    <>
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      scale={3}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
    >
    <sphereGeometry args={[1, 162, 162]} />

      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={wireframe}
      />

    </mesh>

    {/* Particles */}
    <Particles
      ref={particles}
    >
      <sphereGeometry args={[1.5, 162, 162]} />

      <shaderMaterial
        fragmentShader={fragmentParticlesShader}
        vertexShader={vertexParticlesShader}
        uniforms={uniforms}
        wireframe={wireframe}
      />

    </Particles>
    </>
  )
}

export default WaterColor01