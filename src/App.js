import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import TranslatingPlane from "./components/translating-plane/TranslatingPlane";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [1, 1, 1],
        }}
      >
        <color args={["#000000"]} />
        <Experience />
        {/* <TranslatingPlane/> */}
      </Canvas>
    </div>
  );
}

export default App;
