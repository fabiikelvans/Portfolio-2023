import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import Stripe from "../../components/Shaders/Stripe/Stripe";
import WaterColor01 from "../../components/Shaders/Water-Color-1/WaterColor-01";
import Particle from "../../components/Shaders/Particles/Particle";

function ShaderPage() {
  return (
    <div className="bg-black h-[100vh] w-[100vw]">
      <Canvas camera={{ position: [0.0, 0.0, 8.0] }}>
      {/* <ambientLight intensity={0.03} />
      <directionalLight position={[0.3, 0.15, 0.0]} intensity={2} /> */}

      <Suspense fallback={null}>
      <WaterColor01/>
      {/*    <Particle/>*/}
      <OrbitControls />
      </Suspense>
      
      </Canvas>
      </div>
  )
}

export default ShaderPage