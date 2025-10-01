import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaChevronLeft } from "react-icons/fa";
import { useCart } from "../context/CartContext.jsx";

import FoodCard from "../components/FoodCards.jsx";
import BottomNav from "../components/BottomNav";

const BEVERAGE_FOODS = [
  {
    foodName: "Masala Chai",
    foodPrice: "₹50.00",
    foodDescription:
      "Traditional Indian tea brewed with milk, sugar, and aromatic spices.",
    image:
      "https://shivanilovesfood.com/wp-content/uploads/2022/08/Chai-6.jpg",
    category: "Beverages",
    type: "Veg",
  },
  {
    foodName: "Fresh Lime Soda",
    foodPrice: "₹80.00",
    foodDescription:
      "Refreshing Indian drink made with lime juice, sugar, salt, and soda/water.",
    image:
      "https://www.thealigarhchef.com/wp-content/uploads/2021/05/fresh-lime-soda-sweet-salted-1024x1024-1.jpg",
    category: "Beverages",
    type: "Veg",
  },
  {
    foodName: "Cold Coffee",
    foodPrice: "₹150.00",
    foodDescription:
      "Blended coffee with chilled milk and ice cream, served cold.",
    image:
      "https://rachnas-kitchen.com/wp-content/uploads/2017/07/cold-coffee-2.jpg",
    category: "Beverages",
    type: "Veg",
  },
  {
    foodName: "Mango Lassi",
    foodPrice: "₹180.00",
    foodDescription:
      "Thick, creamy yogurt-based drink blended with ripe mango pulp.",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.xpvyVy-U8LxqpDtCLZF2qAHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
    category: "Beverages",
    type: "Veg",
  },
  {
    foodName: "Strawberry Mojito",
    foodPrice: "₹200.00",
    foodDescription:
      "Non-alcoholic mocktail with fresh strawberries, mint, lime, and soda.",
    image:
      "https://bakesbychichi.com/wp-content/uploads/2021/07/DSC_4890.jpg",
    category: "Beverages",
    type: "Veg",
  },
];

export default function Beverages() {
  const categoryName = "Beverages";

  const { cartTotal } = useCart();

  const [selectedType, setSelectedType] = useState("All");

  const categoryFoods = BEVERAGE_FOODS;

  const filteredFoods = categoryFoods.filter((food) => {
    if (selectedType === "All") return true;
    if (selectedType === "Veg") return food.type === "Veg";
    if (selectedType === "Non-Veg") return food.type !== "Veg";
    return food.type.toLowerCase() === selectedType.toLowerCase();
  });

  const filterOptions = [
    "All",
    "Veg",
  ];

  return (
    <div className="relative w-screen bg-gradient-to-r from-gray-900 to-black text-white min-h-screen">
      <div className="flex justify-between items-center p-5">
        <div className="flex items-center space-x-3">
          <Link to="/home" className="text-white">
            <FaChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold text-left capitalize">
            {categoryName}
          </h1>
        </div>

        <Link to="/cart" className="relative text-white">
          <FaShoppingCart className="w-7 h-7" />
          {cartTotal > 0 && (
            <span className="absolute top-[-8px] right-[-10px] bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {cartTotal}
            </span>
          )}
        </Link>
      </div>

      <div className="px-5 pb-5">
        <h2 className="text-xl font-semibold mb-3">Filter by Type:</h2>
        <div className="flex gap-2 overflow-x-auto p-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedType(option)}
              className={`px-4 py-2 rounded-full font-medium text-sm flex-shrink-0 transition-colors ${
                selectedType === option
                  ? "bg-red-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          {selectedType} Dishes ({filteredFoods.length})
        </h1>

        {filteredFoods.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">
            No {selectedType} dishes found in {categoryName}.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
            {filteredFoods.map((food) => (
              <FoodCard
                key={food.foodName}
                image={food.image}
                foodName={food.foodName}
                foodPrice={food.foodPrice}
                foodDescription={food.foodDescription}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-10">
        <BottomNav />
      </div>
    </div>
  );
}
