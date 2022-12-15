import {useFrame, extend, useThree, Color, PointsProps} from '@react-three/fiber';
import { button, folder, useControls } from 'leva';
import React, { useMemo, useRef, useEffect } from 'react'
import { DoubleSide, MathUtils } from 'three';
import { OrbitControls, Point, Points } from "@react-three/drei";
import fragmentShader from './shaders/fragmentShader';
import vertexShader from './shaders/vertexShader';
import * as THREE from 'three';
import fragmentParticlesShader from './shaders/fragmentParticles';
import vertexParticlesShader from './shaders/vertexParticles';

const Particles = (props : any) => {
  const { count } = props;
  const radius = 2;

  // This reference gives us direct access to our points
  const points = useRef<PointsProps>();

  // Generate our positions attributes array
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    const distance = 1;

    for (let i = 0; i < count; i++) {

      let inc = Math.PI*(3 - Math.sqrt(5));
      let off = 2/count;
      let rad = 1.5;
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = i * inc;

      let p = i * off - 1 + (off / 2);
      let r = Math.sqrt(1 - p*p);

      let x = distance * Math.sin(theta) * Math.cos(phi)
      let y = distance * Math.sin(theta) * Math.sin(phi);
      let z = distance * Math.cos(theta);

      // positions[3*i] = rad*Math.cos(phi) *r;
      // positions[3*i+1] = rad*y;
      // positions[3*i+2] = rad*Math.sin(phi) -r;

      positions.set([x, y, z], i * 3);
    }


    return positions;
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: {
      value: 0.0
    },
    uRadius: {
      value: radius
    },
    uColor: {
      value: new THREE.Color('#ffffff')
    }
  }), [])

  useFrame((state) => {
    const { clock } = state;

    // @ts-ignore
    points.current.material.uniforms.uTime.value = clock.elapsedTime;
    points.current.rotation.y = clock.elapsedTime / 5;
  });

  return (
      <points ref={points} scale={4.3}>
        <bufferGeometry>
          <bufferAttribute
              attach="attributes-position"
              count={particlesPosition.length / 3}
              array={particlesPosition}
              itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
            depthWrite={false}
            fragmentShader={fragmentParticlesShader}
            vertexShader={vertexParticlesShader}
            uniforms={uniforms}
        />
      </points>
  );
};


function WaterColor01() {

     // This reference will give us direct access to the mesh
  const mesh = useRef();

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
      u_sky: {
        value: new THREE.Color('#ffffff')
      },
      u_ground: {
        value: new THREE.Color('#ffffff')
      }
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
    <Particles count={10000} shape="sphere" />
      
    </>
  )
}

export default WaterColor01