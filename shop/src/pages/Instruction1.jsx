import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";
import chef from "../assets/welcomepage.png";

export default function Instruction1() {
  const { setName } = useContext(UserContext);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleNext = () => {
    if (input.trim()) {
      setName(input);
      navigate("/instruction/2");
    } else {
      alert("Please enter your name");
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-black text-white px-4">
      <div className="flex flex-col items-center justify-center z-10 md:mr-20 mb-8 md:mb-0">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">
          Welcome to QuickBite
        </h1>
        <p className="mb-4 text-lg text-center md:text-left">
          Enter your name to get started:
        </p>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-4 py-2 rounded-full text-black mb-4 bg-gray-50 w-64 md:w-72"
        />
        <button
          onClick={handleNext}
          className="px-4 py-2 rounded-full font-semibold bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900  text-white shadow-md  hover:from-gray-600 hover:via-gray-700 hover:to-gray-800  hover:shadow-lg hover:scale-105  transition-all duration-300 ease-in-out"
        >
          Next →
        </button>
      </div>
      <img src={chef} alt="Chef" className="w-72 md:w-96 h-auto" />
    </div>
  );
}
