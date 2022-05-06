import React, { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree, useLoader, extend } from '@react-three/fiber'
import * as THREE from 'three'; 
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
extend(OrbitControls)
type propsSet = {
  position: number[];
}

// export function control(){
//   const ref = useRef();
//   const { camera , gl } = useThree();
//   useFrame(() => {
//     if(ref.current)ref.current?.update();
//   });
//   return <orbitControls ref={ref} args={[camera, gl.domElement]} enableDamping dampingFactor={0.1} rotateSpeed={0.5} />
// }


function Box(props:JSX.IntrinsicElements['mesh']) {
  const threeRef = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useFrame((state, delta) => (threeRef.current.rotation.x += 0.01));
  return (
    <mesh
      {...props}
      ref={threeRef}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const listBox = () => {
  let setList = [];
  for (let z_index = 0; z_index < 10; z_index++) {
    for (let y_index = 0; y_index < 10; y_index++) {
      for (let x_index = 0; x_index < 10; x_index++) {
        setList.push([1.2*x_index,-1.2*y_index,1.2*z_index])
      }
    }
  }
  return setList;
};

function calcRandom(min:number, max:number) {
  return Math.random() * (max - min) + min;
}

function ContentThree(){
  return (
    <Canvas
      gl={{ powerPreference: 'high-performance', antialias: false, stencil: false, depth: false, alpha: false }}
      camera={{ position: [50, 10, 0], near: 0.1, far: 100, zoom: 1 }}>
    {listBox().map((item:number[],index:number) => {
      return (<Box key={index} position={[item[0],item[1],item[2]]} />)
    })}
    <mesh>
      <ambientLight intensity={0.5} />
      <spotLight
        color="antiquewhite"
        position={[0, 12, 20]}
        intensity={10}
        angle={Math.PI / 4}
        castShadow
        distance={40}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        penumbra={1}
      />
      <sphereBufferGeometry args={[10, 40, 50]} attach="geometry" />
      <meshBasicMaterial color={0x0000ff} attach="material" />
    </mesh>
  </Canvas>
  )
}

export default ContentThree;
