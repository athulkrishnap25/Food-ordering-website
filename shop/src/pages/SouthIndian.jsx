import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaChevronLeft } from 'react-icons/fa';
import { useCart } from '../context/CartContext.jsx';

import FoodCard from '../components/FoodCards.jsx'; 
import BottomNav from '../components/BottomNav';

const SOUTH_INDIAN_FOODS = [
    {
        foodName: "Kerala Sadya",
        foodPrice: "₹350.00",
        foodDescription: "Traditional feast of 24+ vegetarian dishes served on banana leaf.",
        image: "https://www.keralatourism.org/images/cuisine/sadya-1024x576.jpg",
        category: "South Indian",
        type: "Veg"
    },
    {
        foodName: "Dosa and Sambar",
        foodPrice: "₹120.00",
        foodDescription: "Crispy savory crepe served with lentil stew and coconut chutney.",
        image: "https://i.redd.it/244nqsm9fgnz.jpg",
        category: "South Indian",
        type: "Veg"
    },
    {
        foodName: "Appam with Stew",
        foodPrice: "₹150.00",
        foodDescription: "Soft, lace-rimmed pancakes paired with mildly spiced coconut milk stew.",
        image: "https://images.slurrp.com/prodarticles/ln1j9x0luf.webp?impolicy=slurrp-20210601&width=1200&height=900&q=75",
        category: "South Indian",
        type: "Chicken"
    },
    {
        foodName: "Puttu with Kadala Curry",
        foodPrice: "₹100.00",
        foodDescription: "Steamed rice flour cylinders with black chickpea curry.",
        image: "https://i.ytimg.com/vi/e2kxi7BxvLs/maxresdefault.jpg",
        category: "South Indian",
        type: "Veg"
    },
    {
        foodName: "Meen Curry",
        foodPrice: "₹230.00",
        foodDescription: "Tangy fish curry with tamarind and coconut oil tempering.",
        image: "https://melam.com/wp-content/uploads/2022/12/alappuzha-meen-curry.jpg",
        category: "South Indian",
        type: "Fish"
    },
    {
        foodName: "Chicken Chettinad",
        foodPrice: "₹380.00",
        foodDescription: "Spicy, aromatic chicken dish from the Chettinad region of Tamil Nadu.",
        image: "https://www.funfoodfrolic.com/wp-content/uploads/2020/11/Chicken-Chettinad-Thumbnail.jpg",
        category: "South Indian",
        type: "Chicken"
    },
    {
        foodName: "Mutton Pepper Fry",
        foodPrice: "₹580.00",
        foodDescription: "Spicy, aromatic mutton dish from the Chettinad region of Tamil Nadu.",
        image: "https://tse1.mm.bing.net/th/id/OIP.lT5PyO-YDGL3v_6dmbEgBwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
        category: "South Indian",
        type: "Mutton"
    },
    {
        foodName: "Beef Chettinad",
        foodPrice: "₹480.00",
        foodDescription: "Spicy, aromatic beef dish from the Chettinad region of Tamil Nadu.",
        image: "https://cdn.shopify.com/s/files/1/2313/8987/articles/Screen_Shot_2020-10-06_at_9.15.34_pm_1000x1000.png?v=1625548246",
        category: "South Indian",
        type: "Beef"
    },
];

export default function SouthIndian() {
    const categoryName = "South Indian"; 
    
    const { cartTotal } = useCart(); 

    const [selectedType, setSelectedType] = useState('All'); 

    const categoryFoods = SOUTH_INDIAN_FOODS; 
    const filteredFoods = categoryFoods.filter(food => {
        if (selectedType === 'All') return true;
        if (selectedType === 'Veg') return food.type === 'Veg';
        if (selectedType === 'Non-Veg') return food.type !== 'Veg';
        return food.type.toLowerCase() === selectedType.toLowerCase();
    });
    const filterOptions = ['All', 'Veg', 'Non-Veg', 'Chicken', 'Mutton', 'Beef', 'Fish'];

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