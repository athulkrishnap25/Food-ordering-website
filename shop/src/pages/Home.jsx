import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";

export default function Home() {
  const { name } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">
        Hello, {name ? name : "Guest"}! 👋
      </h1>
      <p className="text-lg">Welcome to the QuickBite</p>
    </div>
  );
}
