import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaChevronLeft } from "react-icons/fa";
import { useCart } from "../context/CartContext.jsx";

import FoodCard from "../components/FoodCards.jsx";
import BottomNav from "../components/BottomNav";

const CHINESE_FOODS = [
  {
    foodName: "Chicken Hakka Noodles",
    foodPrice: "₹250.00",
    foodDescription:
      "Stir-fried noodles with shredded chicken and mixed vegetables.",
    image:
      "https://www.spiritofindiapattaya.com/wp-content/uploads/2023/01/Chicken-Hakka-Noodles.jpg",
    category: "Chinese",
    type: "Chicken",
  },
  {
    foodName: "Veg Manchurian Dry",
    foodPrice: "₹220.00",
    foodDescription:
      "Crispy vegetable balls tossed in a spicy, tangy Manchurian sauce.",
    image:
      "https://vegecravings.com/wp-content/uploads/2017/03/veg-manchurian-dry-recipe-step-by-step-instructions-10.jpg",
    category: "Chinese",
    type: "Veg",
  },
  {
    foodName: "Chilli Paneer Gravy",
    foodPrice: "₹300.00",
    foodDescription:
      "Fried paneer cubes cooked with onions, capsicum, and a savory sauce.",
    image:
      "https://www.dissdash.com/wp-content/uploads/2020/05/chilli-paneer.jpg",
    category: "Chinese",
    type: "Veg",
  },
  {
    foodName: "Prawn Fried Rice",
    foodPrice: "₹350.00",
    foodDescription:
      "Wok-tossed rice with fresh prawns, scrambled egg, and scallions.",
    image:
      "https://www.licious.in/blog/wp-content/uploads/2022/07/shutterstock_1582779079.jpg",
    category: "Chinese",
    type: "Fish",
  },
  {
    foodName: "Beef Stir Fry",
    foodPrice: "₹420.00",
    foodDescription:
      "Thin slices of beef stir-fried with broccoli and ginger-soy sauce.",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.9L_9bPaV-JJDueQ0hBwj5QAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
    category: "Chinese",
    type: "Beef",
  },
  {
    foodName: "Chicken Lollipop",
    foodPrice: "₹280.00",
    foodDescription: "Spicy, deep-fried chicken wings shaped like lollipops.",
    image:
      "https://purendesi.in/wp-content/uploads/2024/05/Chicken-Lollipop-Recipe.jpg",
    category: "Chinese",
    type: "Chicken",
  },
  {
    foodName: "Cumin Lamb",
    foodPrice: "₹580.00",
    foodDescription: "Spicy, tender lamb cooked with cumin and other spices.",
    image:
      "https://feed-your-sole.com/wp-content/uploads/2020/07/Chinese-Cumin-Lamb-Recipe-1024x768.png",
    category: "Chinese",
    type: "Mutton",
  },
];

export default function Chinese() {
  const categoryName = "Chinese";

  const { cartTotal } = useCart();

  const [selectedType, setSelectedType] = useState("All");

  const categoryFoods = CHINESE_FOODS;

  const filteredFoods = categoryFoods.filter((food) => {
    if (selectedType === "All") return true;
    if (selectedType === "Veg") return food.type === "Veg";
    if (selectedType === "Non-Veg") return food.type !== "Veg";
    // Note: Added 'Fish' to type filter logic below
    return food.type.toLowerCase() === selectedType.toLowerCase();
  });

  const filterOptions = [
    "All",
    "Veg",
    "Non-Veg",
    "Chicken",
    "Mutton",
    "Beef",
    "Fish",
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
