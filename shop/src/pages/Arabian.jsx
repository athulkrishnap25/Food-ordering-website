import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaChevronLeft } from "react-icons/fa";
import { useCart } from "../context/CartContext.jsx";

import FoodCard from "../components/FoodCards.jsx";
import BottomNav from "../components/BottomNav";

const ARABIAN_FOODS = [
  {
    foodName: "Chicken Mandi",
    foodPrice: "₹650.00",
    foodDescription:
      "Traditional Yemeni dish of rice and chicken cooked in a deep pit.",
    image:
      "https://img.freepik.com/premium-photo/close-up-chicken-mandi-rice-dish-generative-ai_786587-4197.jpg?w=2000",
    category: "Arabian",
    type: "Chicken",
  },
  {
    foodName: "Lamb Kabsa",
    foodPrice: "₹800.00",
    foodDescription:
      "Aromatic mixed rice dish, commonly regarded as the national dish of Saudi Arabia.",
    image:
      "https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2023/04/15/3773861-571269809.jpg?itok=pgy9HiVz",
    category: "Arabian",
    type: "Mutton",
  },
  {
    foodName: "Falafel Wrap",
    foodPrice: "₹200.00",
    foodDescription:
      "Deep-fried balls made from ground chickpeas, served wrapped in pita bread.",
    image:
      "https://recipes.timesofindia.com/photo/62708678.cms",
    category: "Arabian",
    type: "Veg",
  },
  {
    foodName: "Hummus with Pita",
    foodPrice: "₹150.00",
    foodDescription:
      "Chickpea dip mixed with tahini, lemon juice, and garlic, served with warm bread.",
    image:
      "https://s3-us-east-2.amazonaws.com/electroluxarabia/wp-content/uploads/hummus-with-pita-bread.jpg",
    category: "Arabian",
    type: "Veg",
  },
  {
    foodName: "Beef Kabsa",
    foodPrice: "₹550.00",
    foodDescription:
      "Aromatic rice dish cooked with tender beef and a blend of spices.",
    image:
      "https://th.bing.com/th/id/R.d3444cc6860be2e1687392ec18427e86?rik=wlo4JJ62di%2bmCg&riu=http%3a%2f%2f2.bp.blogspot.com%2f-z00WmFBciRs%2fVmZ8fcb8SJI%2fAAAAAAAACho%2fzCJJRVvFIRk%2fs1600%2f2015-12-08_09.07.27.jpg&ehk=LCL4N94eUi%2b1%2bCgT%2bv2eQ9ZMfgsq46d0jONwGkXWpys%3d&risl=&pid=ImgRaw&r=0",
    category: "Arabian",
    type: "Beef",
  },
];

export default function Arabian() {
  const categoryName = "Arabian";

  const { cartTotal } = useCart();

  const [selectedType, setSelectedType] = useState("All");

  const categoryFoods = ARABIAN_FOODS;

  const filteredFoods = categoryFoods.filter((food) => {
    if (selectedType === "All") return true;
    if (selectedType === "Veg") return food.type === "Veg";
    if (selectedType === "Non-Veg") return food.type !== "Veg";
    return food.type.toLowerCase() === selectedType.toLowerCase();
  });

  const filterOptions = ["All", "Veg", "Non-Veg", "Chicken", "Mutton", "Beef"];

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
