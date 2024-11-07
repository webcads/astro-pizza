// import React, { useState } from 'react';
// import { Pizza, ShoppingCart, Menu, X } from 'lucide-react';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-md fixed w-full z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Pizza className="h-8 w-8 text-red-500" />
//             <span className="ml-2 text-xl font-bold text-gray-900">PizzaHub</span>
//           </div>
          
//           <div className="hidden md:flex items-center space-x-8">
//             <a href="#menu" className="text-gray-700 hover:text-red-500">Menu</a>
//             <a href="#about" className="text-gray-700 hover:text-red-500">About</a>
//             <a href="#contact" className="text-gray-700 hover:text-red-500">Contact</a>
//             <button className="flex items-center space-x-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
//               <ShoppingCart className="h-5 w-5" />
//               <span>Cart (0)</span>
//             </button>
//           </div>

//           <div className="md:hidden flex items-center">
//             <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
//               {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {isOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             <a href="#menu" className="block px-3 py-2 text-gray-700 hover:text-red-500">Menu</a>
//             <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-red-500">About</a>
//             <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-red-500">Contact</a>
//             <button className="flex items-center space-x-1 w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
//               <ShoppingCart className="h-5 w-5" />
//               <span>Cart (0)</span>
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }