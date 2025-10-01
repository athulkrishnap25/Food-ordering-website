import React from "react";

export default function CategoryCard({ image, name }) {
  return (
    <div className="flex flex-col items-center shadow-md rounded-xl p-4 w-60">
      <div className="w-40 h-40 rounded-full overflow-hidden mb-2">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-center text-white-800 font-semibold">{name}</h3>
    </div>
  );
}