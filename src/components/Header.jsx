import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-green-100 via-yellow-50 to-white dark:from-green-900 dark:via-gray-800 dark:to-gray-900 shadow-sm py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo dan Nama */}
        <div className="flex items-center space-x-4">
          <img src={logo} alt="ResQMeal Logo" className="w-12 h-12 rounded-full shadow-md" />
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-green-800 dark:text-green-200">
              ResQMeal Hub Corporation
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Rescuing Meals, Nourishing Lives
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/marketplace"
            className="inline-block px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-full shadow-md transition-colors"
          >
            Jelajahi Marketplace
          </Link>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;