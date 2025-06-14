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
import { useAuth } from "./AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const { isLoggedIn, login, logout, register } = useAuth();

  // Pastikan fungsi ini async jika login, logout, register async
  const handleLogin = async () => {
    try {
      await login();
      toast.success("Berhasil login!");
      setMenuOpen(false);
    } catch (error) {
      toast.error("Gagal login.");
    }
  };

  const handleRegister = async () => {
    try {
      await register();
      toast.success("Berhasil register!");
      setMenuOpen(false);
    } catch (error) {
      toast.error("Gagal register.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.info("Anda telah logout.");
      setMenuOpen(false);
      setAccountDropdownOpen(false);
    } catch (error) {
      toast.error("Gagal logout.");
    }
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

 const logoVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      type: "spring"
    }
  }),
};

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      repeat: Infinity,
      repeatDelay: 2,
    },
  },
};

const letterVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, type: "spring" } },
};

 const text = "ResQMeal".split("");

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-green-200 via-yellow-100 to-yellow-200 shadow-md h-16 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center w-full">
           <div className="flex items-center">
    <img 
  src="https://raw.githubusercontent.com/gunawansapu/gunawan/main/resqmeallogo.jpg" 
  alt="ResQMeal Logo" 
  className="h-10 w-10 mr-2 rounded-full animate-spin-slow"
/>

     {/* Animated text */}
      <motion.div
        className="flex"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {text.map((letter, index) => (
          <motion.span 
            key={index}
            className="text-xl font-bold text-green-700"
            variants={letterVariants}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
  {navItems.map((item, i) =>
    item.submenu ? (
      <div key={i} className="relative">
        <button
          onClick={() =>
            setDropdownOpen((prev) => ({
              ...prev,
              [item.name]: !prev[item.name],
            }))
          }
          className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-200"
        >
          {item.name}
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
              onClick={() => {
                setDropdownOpen((prev) => ({
                  ...prev,
                  [item.name]: false,
                }));
                window.scrollTo({ top: 0, behavior: 'smooth' }); // <- scrollToTop disini
              }}
            >
              {item.name}
            </Link>
            {item.submenu.map((sub, j) => (
              <Link
                key={j}
                to={sub.to}
                className="block px-4 py-2 hover:bg-green-100"
                onClick={() => {
                  setDropdownOpen((prev) => ({
                    ...prev,
                    [item.name]: false,
                  }));
                  window.scrollTo({ top: 0, behavior: 'smooth' }); // <- scrollToTop disini
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
  className="text-gray-700 hover:text-green-600 transition-colors duration-200"
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
>
  {item.name}
</Link>
    )
  )}

            <Link
              to="/favorit"
              className="flex items-center text-gray-700 hover:text-red-600"
              title="Favorit"
            >
              <Heart size={20} />
            </Link>
            <Link
              to="/keranjang"
              className="flex items-center text-gray-700 hover:text-green-600"
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
                  onClick={() =>
                    setAccountDropdownOpen((prev) => !prev)
                  }
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

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-3">
            <button onClick={() => setMenuOpen((prev) => !prev)} className="text-gray-800">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {isLoggedIn && (
              <img
                src="https://i.pravatar.cc/40"
                alt="avatar"
                onClick={() =>
                  setAccountDropdownOpen((prev) => !prev)
                }
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
                onClick={() =>
                  setOpenSubmenuIndex((prev) => (prev === i ? null : i))
                }
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
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }, 100);
                    }}
                  >
                    {item.name}
                  </Link>

                  {item.submenu.map((sub, j) => (
                    <Link
                      key={j}
                      to={sub.to}
                      className="text-gray-700 text-sm"
                      onClick={() => {
                        setMenuOpen(false);
                        setOpenSubmenuIndex(null);
                        setTimeout(() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }, 100);
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
              className="text-gray-700 hover:text-green-600 text-lg font-medium"
              onClick={() => {
                setMenuOpen(false);
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }}
            >
              {item.name}
            </Link>
          )
        )}

        {/* Tambahkan Favorit dan Keranjang di menu mobile */}
        <Link
          to="/favorit"
          className="flex items-center space-x-2 text-gray-700 hover:text-red-600 text-lg font-medium"
          onClick={() => setMenuOpen(false)}
        >
          <Heart size={20} />
          <span>Favorit</span>
        </Link>
        <Link
          to="/keranjang"
          className="flex items-center space-x-2 text-gray-700 hover:text-green-600 text-lg font-medium"
          onClick={() => setMenuOpen(false)}
        >
          <ShoppingCart size={20} />
          <span>Keranjang</span>
        </Link>

        {!isLoggedIn ? (
          <>
            <button
              onClick={async () => {
                await handleLogin();
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
            >
              Login
            </button>
            <button
              onClick={async () => {
                await handleRegister();
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
            >
              Register
            </button>
          </>
        ) : (
          <>
            <Link
              to="/akun"
              className="text-gray-700 hover:text-green-600 text-lg font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Pengaturan Akun
            </Link>
            <button
              onClick={async () => {
                await handleLogout();
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </motion.div>
  )}
</AnimatePresence>

</nav>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
};

export default Navbar;
