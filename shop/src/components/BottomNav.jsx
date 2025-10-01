import React from 'react';
import { Link } from 'react-router-dom';

export default function BottomNav() {
  const navItems = [
    { name: "Home", icon: () => "", path: "/home" }, 
    { name: "Orders", icon: () => "", path: "/orders" },
    { name: "Account", icon: () => "", path: "/account" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-gray-600 via-gray-800 to-gray-600 
                     text-white shadow-md 
                     hover:from-gray-800 hover:via-gray-600 hover:to-gray-800 
                     hover:shadow-lg hover:scale-105 
                     transition-all duration-300 ease-in-out">
      <div className="flex justify-center items-center h-16 max-w-lg mx-auto space-x-16">
  {navItems.map((item) => (
    <Link
      key={item.name}
      to={item.path}
      className={`flex flex-col items-center justify-center p-2 text-sm font-medium transition-colors 
        ${window.location.pathname === item.path ? 'text-blue-600' : 'text-white-500 hover:text-blue-600'}
      `}
    >
      <item.icon className="w-5 h-5 mb-1" />
      {item.name}
    </Link>
  ))}
</div>

    </nav>
  );
}