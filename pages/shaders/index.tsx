import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, {Suspense, useMemo, useRef, useState} from "react";
import Bubble from "../../components/Shaders/Bubble/Bubble";
import GradientHover from "../../components/Shaders/Gradients/Hover/GradientHover";
import Blob_01 from "../../components/Shaders/Blobs/Blob-01/Blob_01";
import Blob_02 from "../../components/Shaders/Blobs/Blob-02/Blob-02";
import Pepyaka from "../../components/Shaders/Abstract/Pepyaka/Pepyaka";
import Particle_01 from "../../components/Shaders/Particles/Particle-01/Particle-01";
import Particle_02 from "../../components/Shaders/Particles/Particle-02/Particle-02";
import Stripe from "../../components/Shaders/Gradients/Stripe/Stripe";

function ShaderPage() {
    const [control, setControl] = useState(true);
  return (
    <div className="bg-black h-[100vh] w-[100vw] bg-cover">
      <Canvas camera={{ position: [0.0, 0.0, 8.0] }}>
      {/* <ambientLight intensity={0.03} />
      <directionalLight position={[0.3, 0.15, 0.0]} intensity={2} /> */}

      <Suspense fallback={null}>
      {/*<Pepyaka/>*/}
      {/*    <Particle_01/>*/}
      {/*    <Particle_02/>*/}
      {/*    <Bubble/>*/}
      {/*    <Stripe/>*/}
      {/*    <GradientHover/>*/}
      {/*    <Blob_01/>*/}
      {/*    <Blob_02/>*/}
      </Suspense>

          <OrbitControls/>

      </Canvas>
      </div>
  )
}

export default ShaderPage