import React, { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Settings,
  LogOut,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // dropdownOpen sekarang objek untuk kontrol dropdown desktop per menu
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // toggleDropdown terima parameter nama menu
  const toggleDropdown = (menuName) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const toggleMobileDropdown = (index) => {
    setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
  };

  const toggleAccountDropdown = () =>
    setAccountDropdownOpen((prev) => !prev);

  const handleLogin = () => {
    setIsLoggedIn(true);
    toast.success("Berhasil login!");
    setMenuOpen(false);
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
    toast.success("Registrasi berhasil!");
    setMenuOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast.success("Berhasil logout");
    setAccountDropdownOpen(false);
  };

  const navItems = [
    { name: "Beranda", to: "/" },
    { name: "Tentang", to: "/tentang" },
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
    {
      name: "Langganan",
      to: "/langganan",
      submenu: [{ name: "Gabung Mitra", to: "/gabungmitra" }],
    },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-green-200 via-yellow-100 to-yellow-200 shadow-md h-16 flex items-center">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center w-full">
        <div className="text-xl font-bold text-green-700">
          <Link to="/">ResQMeal</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item, i) =>
            item.submenu ? (
              <div key={i} className="relative">
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-200"
                >
                  <span>{item.name}</span>
                  {dropdownOpen[item.name] ? (
                    <ChevronUp className="ml-1 w-4 h-4" />
                  ) : (
                    <ChevronDown className="ml-1 w-4 h-4" />
                  )}
                </button>
                {dropdownOpen[item.name] && (
                  <div className="absolute left-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                    <Link
                      to={item.to}
                      className="block px-4 py-2 hover:bg-green-100"
                      onClick={() =>
                        setDropdownOpen((prev) => ({
                          ...prev,
                          [item.name]: false,
                        }))
                      }
                    >
                      {item.name}
                    </Link>
                    {item.submenu.map((sub, j) => (
                      <Link
                        key={j}
                        to={sub.to}
                        className="block px-4 py-2 hover:bg-green-100"
                        onClick={() =>
                          setDropdownOpen((prev) => ({
                            ...prev,
                            [item.name]: false,
                          }))
                        }
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={i}
                to={item.to}
                className="text-gray-700 hover:text-green-600 transition-colors duration-200"
              >
                {item.name}
              </Link>
            )
          )}

          {/* Favorit dan Keranjang diletakkan di kanan, sebelum login/avatar */}
          <Link
            to="/favorit"
            className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200"
            title="Favorit"
          >
            <Heart size={20} />
          </Link>
          <Link
            to="/keranjang"
            className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-200"
            title="Keranjang"
          >
            <ShoppingCart size={20} />
          </Link>

          {!isLoggedIn ? (
            <>
              <button
                onClick={handleLogin}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
              >
                Login
              </button>
              <button
                onClick={handleRegister}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
              >
                Register
              </button>
            </>
          ) : (
            <div className="relative">
              <img
                src="https://i.pravatar.cc/40"
                alt="avatar"
                onClick={toggleAccountDropdown}
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              {accountDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-48 z-50">
                  <Link
                    to="/akun"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                    onClick={() => setAccountDropdownOpen(false)}
                  >
                    <Settings size={16} /> Pengaturan Akun
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Toggle + Avatar */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="text-gray-800"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {isLoggedIn && (
            <img
              src="https://i.pravatar.cc/40"
              alt="avatar"
              onClick={toggleAccountDropdown}
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          )}
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
                      onClick={() => toggleMobileDropdown(i)}
                      className="flex items-center justify-between w-full text-gray-700 hover:text-green-600 text-lg font-medium"
                    >
                      {item.name}
                      {openSubmenuIndex === i ? (
                        <ChevronUp className="ml-1 w-5 h-5" />
                      ) : (
                        <ChevronDown className="ml-1 w-5 h-5" />
                      )}
                    </button>
                    {openSubmenuIndex === i && (
                      <div className="pl-4 mt-1 flex flex-col space-y-2">
                        <Link
                          to={item.to}
                          className="text-base font-semibold"
                          onClick={() => {
                            setMenuOpen(false);
                            setOpenSubmenuIndex(null);
                          }}
                        >
                          {item.name}
                        </Link>
                        {item.submenu.map((sub, j) => (
                          <Link
                            key={j}
                            to={sub.to}
                            className="text-base hover:text-green-600"
                            onClick={() => {
                              setMenuOpen(false);
                              setOpenSubmenuIndex(null);
                            }}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={i}
                    to={item.to}
                    className="text-lg font-medium text-gray-700 hover:text-green-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              )}

              {/* Favorit & Keranjang mobile */}
              <div className="flex space-x-6 pt-2">
                <Link
                  to="/favorit"
                  className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                  title="Favorit"
                >
                  <Heart size={20} />
                </Link>
                <Link
                  to="/keranjang"
                  className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                  title="Keranjang"
                >
                  <ShoppingCart size={20} />
                </Link>
              </div>

              {!isLoggedIn ? (
                <div className="pt-4 flex flex-col space-y-2">
                  <button
                    onClick={() => {
                      handleLogin();
                      setMenuOpen(false);
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      handleRegister();
                      setMenuOpen(false);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                  >
                    Register
                  </button>
                </div>
              ) : (
                <div className="pt-4 flex flex-col space-y-1">
                  <Link
                    to="/akun"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Settings size={16} /> Pengaturan Akun
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
