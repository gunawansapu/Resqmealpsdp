import React, { useState } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleMobileDropdown = () => setMobileDropdownOpen((prev) => !prev);

  // Untuk mobile menu, buat list item termasuk sub-items Services
  const navItems = [
    { name: "Beranda", to: "/" },
    { name: "Tentang", to: "/tentang" },
    // Services dropdown di mobile dibuat nested
    {
      name: "Services",
      to: "/services",
      submenu: [
        { name: "Supply Chain", to: "/supplychain" },
        { name: "Target Market", to: "/targetmarket" },
        { name: "Unique Value", to: "/uniquevalue" },
      ],
    },
    { name: "Marketplace", to: "/marketplace" },
    { name: "Donasi", to: "/donasi" },
    { name: "Langganan", to: "/langganan" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-green-200 via-yellow-100 via-yellow-50 to-yellow-200
 shadow-md h-16 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center w-full">
        <div className="text-xl font-bold text-green-700">
          <Link to="/">ResQMeal</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            className="text-gray-700 hover:text-green-600 transition-colors duration-200"
          >
            Beranda
          </Link>

          <Link
            to="/tentang"
            className="text-gray-700 hover:text-green-600 transition-colors duration-200"
          >
            Tentang
          </Link>

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-200 focus:outline-none"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <span>Services</span>
              {dropdownOpen ? (
                <ChevronUp className="ml-1 w-4 h-4" />
              ) : (
                <ChevronDown className="ml-1 w-4 h-4" />
              )}
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                <Link
                  to="/services"
                  className="block px-4 py-2 hover:bg-green-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Services
                </Link>
                <Link
                  to="/supplychain"
                  className="block px-4 py-2 hover:bg-green-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Supply Chain
                </Link>
                <Link
                  to="/targetmarket"
                  className="block px-4 py-2 hover:bg-green-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Target Market
                </Link>
                <Link
                  to="/uniquevalue"
                  className="block px-4 py-2 hover:bg-green-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Unique Value
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/marketplace"
            className="text-gray-700 hover:text-green-600 transition-colors duration-200"
          >
            Marketplace
          </Link>

          <Link
            to="/donasi"
            className="text-gray-700 hover:text-green-600 transition-colors duration-200"
          >
            Donasi
          </Link>

          <Link
            to="/langganan"
            className="text-gray-700 hover:text-green-600 transition-colors duration-200"
          >
            Langganan
          </Link>

          <Link
            to="/contact"
            className="text-gray-700 hover:text-green-600 transition-colors duration-200"
          >
            Kontak
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="text-gray-800"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-16 left-0 w-full bg-white border-t shadow-lg overflow-hidden z-50"
          >
            <div className="flex flex-col py-4 px-6 space-y-3">
              {navItems.map((item, i) =>
                item.submenu ? (
                  <div key={i}>
                    <button
                      onClick={toggleMobileDropdown}
                      className="flex items-center justify-between w-full text-gray-700 hover:text-green-600 transition-colors duration-200 text-lg font-medium focus:outline-none"
                    >
                      {item.name}
                      {mobileDropdownOpen ? (
                        <ChevronUp className="ml-1 w-5 h-5" />
                      ) : (
                        <ChevronDown className="ml-1 w-5 h-5" />
                      )}
                    </button>
                    {mobileDropdownOpen && (
                      <div className="pl-4 mt-1 flex flex-col space-y-2">
                        {item.submenu.map((subitem, j) => (
                          <Link
                            key={j}
                            to={subitem.to}
                            className="text-gray-700 hover:text-green-600 transition-colors duration-200 text-base"
                            onClick={() => setMenuOpen(false)}
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={i}
                    to={item.to}
                    className="text-gray-700 hover:text-green-600 transition-colors duration-200 text-lg font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
