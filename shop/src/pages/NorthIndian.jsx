import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaChevronLeft } from 'react-icons/fa';
import { useCart } from '../context/CartContext.jsx';

import FoodCard from '../components/FoodCards.jsx'; 
import BottomNav from '../components/BottomNav';

const NORTH_INDIAN_FOODS = [
    {
      foodName: "Chicken Tikka Masala",
      foodPrice: "₹400.00",
      foodDescription: "Classic Indian dish with tender chicken in a creamy tomato sauce.",
      image: "https://www.licious.in/blog/wp-content/uploads/2020/12/Chicken-Tikka-Masala-min.jpg",
      category: "North Indian",
      type: "Chicken"
    },
    {
      foodName: "Shahi Paneer",
      foodPrice: "₹380.00",
      foodDescription: "Cottage cheese cubes cooked in a thick, creamy, royal-style gravy.",
      image: "https://tse1.mm.bing.net/th/id/OIP.9Gcof8tZSHlQYs87PZM-BQHaGr?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "North Indian",
      type: "Veg"
    },
    {
      foodName: "Butter Chicken",
      foodPrice: "₹450.00",
      foodDescription: "Rich and creamy tomato-based curry with tender chicken pieces.",
      image: "https://www.licious.in/blog/wp-content/uploads/2020/10/butter-chicken--750x750.jpg",
      category: "North Indian",
      type: "Chicken"
    },
    {
      foodName: "Mutton Rogan Josh",
      foodPrice: "₹550.00",
      foodDescription: "Authentic Kashmiri style slow-cooked mutton curry with aromatic spices.",
      image: "https://th.bing.com/th/id/R.fb86ed11c8296131f6fa21eab32c698f?rik=P6Ig1y%2fvMVI3tg&riu=http%3a%2f%2fzuranazrecipe.com%2fwp-content%2fuploads%2f2016%2f07%2fMutton-Rogan-Joshhh.jpg&ehk=wj%2bZ%2fMJSZCJDEAXJa%2fl5O1gHQDaitZKonQHcHeXg0ug%3d&risl=&pid=ImgRaw&r=0",
      category: "North Indian",
      type: "Mutton"
    },
    {
      foodName: "Palak Paneer",
      foodPrice: "₹320.00",
      foodDescription: "Spinach puree cooked with cottage cheese and spices.",
      image: "https://tse4.mm.bing.net/th/id/OIP.GwXzFGmT-REKNq5WKJNUOgHaF2?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "North Indian",
      type: "Veg"
    },
    {
      foodName: "Dal Makhani",
      foodPrice: "₹280.00",
      foodDescription: "Slow-cooked black lentils and kidney beans with butter and cream.",
      image: "https://tse2.mm.bing.net/th/id/OIP.cO1N7ff2Vp2wt98Yx39JcwHaLG?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "North Indian",
      type: "Veg"
    },
    {
      foodName: "Chicken Korma",
      foodPrice: "₹420.00",
      foodDescription: "Chicken simmered in a mildly spiced, creamy yogurt-based curry.",
      image: "https://www.teaforturmeric.com/wp-content/uploads/2018/06/Authentic-Chicken-Korma_-2.jpg",
      category: "North Indian",
      type: "Chicken"
    },
    {
      foodName: "Beef Korma",
      foodPrice: "₹500.00",
      foodDescription: "Tender beef cooked in a rich and flavorful North Indian style korma gravy.",
      image: "https://nishkitchen.com/wp-content/uploads/2019/09/Beef-Korma-2B.jpg",
      category: "North Indian",
      type: "Beef"
    },
    {
      foodName: "Rajma Masala",
      foodPrice: "₹250.00",
      foodDescription: "Red kidney beans cooked in a thick, spiced tomato-onion gravy.",
      image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/07/rajma-recipe.jpg",
      category: "North Indian",
      type: "Veg"
    },
    {
      foodName: "Mutton Biryani",
      foodPrice: "₹600.00",
      foodDescription: "Fragrant basmati rice layered with juicy mutton and aromatic spices.",
      image: "https://www.cookwithnabeela.com/wp-content/uploads/2024/02/MuttonBiryani.webp",
      category: "North Indian",
      type: "Mutton"
    },
    {
      foodName: "Paneer Butter Masala",
      foodPrice: "₹360.00",
      foodDescription: "Cottage cheese cubes in a buttery, mildly sweet tomato gravy.",
      image: "https://i.pinimg.com/originals/88/08/26/8808269e6adf0f090788e00c07681e1d.jpg",
      category: "North Indian",
      type: "Veg"
    },
    {
      foodName: "Chicken Biryani",
      foodPrice: "₹500.00",
      foodDescription: "Long-grain basmati rice layered with spiced chicken and saffron.",
      image: "https://tse4.mm.bing.net/th/id/OIP.r6T2zRnyrrP8LdtOEaGVowHaGl?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "North Indian",
      type: "Chicken"
    },
    {
      foodName: "Beef Seekh Kebab",
      foodPrice: "₹480.00",
      foodDescription: "Juicy minced beef kebabs grilled on skewers with Indian spices.",
      image: "https://tse3.mm.bing.net/th/id/OIP.PO09rnWbRj-ubRPWWU3ZXQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "North Indian",
      type: "Beef"
    },
    {
      foodName: "Aloo Paratha with Curd",
      foodPrice: "₹180.00",
      foodDescription: "Stuffed wheat paratha with spiced mashed potatoes served with curd and pickle.",
      image: "https://i0.wp.com/pixahive.com/wp-content/uploads/2020/08/Aloo-paratha-with-curd-10748-pixahive.jpg?fit=1080%2C800&ssl=1",
      category: "North Indian",
      type: "Veg"
    },
    {
      foodName: "Mutton Keema Curry",
      foodPrice: "₹520.00",
      foodDescription: "Spicy minced mutton curry cooked with onions, tomatoes, and peas.",
      image: "https://yummyindiankitchen.com/wp-content/uploads/2016/01/hyderabadi-keema-mutton-keema-curry.jpg",
      category: "North Indian",
      type: "Mutton"
    }
];

export default function NorthIndian() {
    const categoryName = "North Indian"; 
    
    const { cartTotal } = useCart(); 

    const [selectedType, setSelectedType] = useState('All'); 

    const categoryFoods = NORTH_INDIAN_FOODS; 

    const filteredFoods = categoryFoods.filter(food => {
        if (selectedType === 'All') return true;
        if (selectedType === 'Veg') return food.type === 'Veg';
        if (selectedType === 'Non-Veg') return food.type !== 'Veg';
        return food.type.toLowerCase() === selectedType.toLowerCase();
    });

    const filterOptions = ['All', 'Veg', 'Non-Veg', 'Chicken', 'Mutton', 'Beef'];

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
                        <span 
                            className="absolute top-[-8px] right-[-10px] bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                        >
                            {cartTotal}
                        </span>
                    )}
                </Link>
            </div>
            
            <div className="px-5 pb-5">
                <h2 className="text-xl font-semibold mb-3">Filter by Type:</h2>
                <div className="flex gap-2 overflow-x-auto p-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
                    {filterOptions.map(option => (
                        <button
                            key={option}
                            onClick={() => setSelectedType(option)}
                            className={`px-4 py-2 rounded-full font-medium text-sm flex-shrink-0 transition-colors ${
                                selectedType === option
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">{selectedType} Dishes ({filteredFoods.length})</h1>
                
                {filteredFoods.length === 0 ? (
                    <p className="text-center text-gray-400 mt-10">No {selectedType} dishes found in {categoryName}.</p>
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