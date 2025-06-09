import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const inputFocusVariants = {
  focused: {
    boxShadow: "0 0 8px 2px rgba(34,197,94,0.6)",
    borderColor: "#22c55e",
  },
  unfocused: {
    boxShadow: "none",
    borderColor: "#d1d5db",
  },
};

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const buttonHover = {
  scale: 1.05,
  boxShadow: "0 8px 15px rgba(34,197,94,0.4)",
};

const GabungMitra = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    alamat: "",
  });

  const [focus, setFocus] = useState({
    nama: false,
    email: false,
    telepon: false,
    alamat: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFocus = (e) => {
    setFocus((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleBlur = (e) => {
    setFocus((prev) => ({ ...prev, [e.target.name]: false }));
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nama, email, telepon, alamat } = formData;

    if (!nama || !email || !telepon || !alamat) {
      toast.error("Semua field wajib diisi!");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Format email tidak valid!");
      return;
    }

    // TODO: Kirim data ke server API

    toast.success("Pendaftaran Mitra berhasil!");
    setFormData({ nama: "", email: "", telepon: "", alamat: "" });
  };

  return (
    <motion.div 
      className="max-w-3xl mx-auto mt-0 p-10 bg-gradient-to-r from-green-100 to-green-50 rounded-xl shadow-xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Toaster position="top-center" />
      <h1 className="text-4xl font-extrabold mb-8 text-center text-green-700 drop-shadow-md">
        Gabung Mitra <span className="text-green-900">ResQMeal</span>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-7">
        {["nama", "email", "telepon", "alamat"].map((field) => {
          const isTextarea = field === "alamat";
          const label = {
            nama: "Nama Lengkap",
            email: "Email",
            telepon: "Nomor Telepon",
            alamat: "Alamat Lengkap",
          }[field];

          return (
            <motion.div 
              key={field} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 * (["nama","email","telepon","alamat"].indexOf(field)) }}
            >
              <label className="block mb-2 font-semibold text-green-800" htmlFor={field}>
                {label}
              </label>
              {isTextarea ? (
                <motion.textarea
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  rows={4}
                  placeholder={`Masukkan ${label.toLowerCase()}`}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 resize-none text-gray-700 placeholder-green-600 focus:outline-none"
                  variants={inputFocusVariants}
                  animate={focus[field] ? "focused" : "unfocused"}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              ) : (
                <motion.input
                  type={field === "email" ? "email" : field === "telepon" ? "tel" : "text"}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder={`Masukkan ${label.toLowerCase()}`}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-green-600 focus:outline-none"
                  variants={inputFocusVariants}
                  animate={focus[field] ? "focused" : "unfocused"}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
            </motion.div>
          );
        })}

        <motion.button
          type="submit"
          className="w-full bg-green-600 text-white font-bold py-4 rounded-lg shadow-md hover:bg-green-700 focus:outline-none"
          whileHover={buttonHover}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          Daftar Sekarang
        </motion.button>
      </form>
    </motion.div>
  );
};

export default GabungMitra;
