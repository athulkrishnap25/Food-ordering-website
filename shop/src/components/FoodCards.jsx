import React from "react";
import { useCart } from "../context/CartContext.jsx"; 

export default function FoodCard({ image, foodName, foodPrice, foodDescription }) {
  const { addToCart } = useCart(); 
  const product = { image, foodName, foodPrice, foodDescription }; 

  return (
    <div className="flex flex-col items-center shadow-lg rounded-xl p-4 w-60 bg-gray-700 flex-shrink-0">
      <div className="w-full h-32 overflow-hidden mb-3 rounded-lg">
        <img src={image} alt={foodName} className="w-full h-full object-cover" />
      </div>
      
      <h3 className="text-left text-white font-bold text-lg w-full mb-1">{foodName}</h3>
      <p className="text-left text-green-400 font-semibold text-xl w-full mb-2">{foodPrice}</p>
      <p className="text-left text-gray-300 text-sm w-full mb-4 line-clamp-2">{foodDescription}</p>

      <button 
        onClick={() => addToCart(product)} 
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-full transition duration-300"
      >
        Add to Cart
      </button>
    </div>
  );
}