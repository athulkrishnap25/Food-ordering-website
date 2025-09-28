import { Routes, Route } from "react-router-dom";
import Instruction1 from "./pages/Instruction1";
import Instruction2 from "./pages/Instruction2";
import Instruction3 from "./pages/Instruction3";
import Home from "./pages/Home";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Instruction1 />} />
        <Route path="/instruction/2" element={<Instruction2 />} />
        <Route path="/instruction/3" element={<Instruction3 />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}
