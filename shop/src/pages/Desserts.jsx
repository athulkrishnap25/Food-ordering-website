import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaChevronLeft } from "react-icons/fa";
import { useCart } from "../context/CartContext.jsx";

import FoodCard from "../components/FoodCards.jsx";
import BottomNav from "../components/BottomNav";

const DESSERT_FOODS = [
  {
    foodName: "Chocolate Fudge Cake",
    foodPrice: "₹450.00",
    foodDescription:
      "Rich, dense chocolate cake with a velvety smooth fudge frosting.",
    image:
      "https://www.hickoryfarms.com/on/demandware.static/-/Sites-Web-Master-Catalog/default/dw78363360/images/products/decadent-chocolate-fudge-layer-cake-064026-2.jpg",
    category: "Desserts",
    type: "Veg",
  },
  {
    foodName: "Gulab Jamun",
    foodPrice: "₹150.00",
    foodDescription:
      "Deep-fried milk solids balls soaked in a light, sweet, and aromatic sugar syrup.",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.pUZBr5_gk2K3Z3dvQlML1gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    category: "Desserts",
    type: "Veg",
  },
  {
    foodName: "Rasgulla",
    foodPrice: "₹160.00",
    foodDescription: "Spongy cottage cheese balls cooked in light sugar syrup.",
    image:
      "https://madhurasrecipe.com/wp-content/uploads/2023/10/Rasgulla-Featured-Image.jpg",
    category: "Desserts",
    type: "Veg",
  },
  {
    foodName: "Tiramisu",
    foodPrice: "₹400.00",
    foodDescription:
      "A classic Italian dessert made of coffee-soaked ladyfingers and mascarpone cream.",
    image:
      "https://www.cookingclassy.com/wp-content/uploads/2022/08/tiramisu-17-1024x1536.jpg",
    category: "Desserts",
    type: "Veg",
  },
  {
    foodName: "Caramel Custard",
    foodPrice: "₹220.00",
    foodDescription:
      "Creamy, smooth custard dessert topped with a layer of soft caramel.",
    image:
      "https://www.tasteofhome.com/wp-content/uploads/2018/01/Caramel-Custard_EXPS_DIYD20_3136_E07_29_9b.jpg",
    category: "Desserts",
    type: "Veg",
  },
];

export default function Desserts() {
  const categoryName = "Desserts";

  const { cartTotal } = useCart();

  const [selectedType, setSelectedType] = useState("All");

  const categoryFoods = DESSERT_FOODS;

  const filteredFoods = categoryFoods.filter((food) => {
    if (selectedType === "All") return true;
    if (selectedType === "Veg") return food.type === "Veg";
    if (selectedType === "Non-Veg") return food.type !== "Veg";
    return food.type.toLowerCase() === selectedType.toLowerCase();
  });

  const filterOptions = [
    "All",
    "Veg"
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
