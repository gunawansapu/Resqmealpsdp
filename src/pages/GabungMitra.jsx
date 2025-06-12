import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const inputFocusVariants = {
  focused: {
    boxShadow: "0 0 10px rgba(34,197,94,0.5)",
    borderColor: "#22c55e",
  },
  unfocused: {
    boxShadow: "none",
    borderColor: "#d1d5db",
  },
};

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (e) => {
    setFocus((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleBlur = (e) => {
    setFocus((prev) => ({ ...prev, [e.target.name]: false }));
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

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

    toast.success("Pendaftaran Mitra berhasil!");
    setFormData({ nama: "", email: "", telepon: "", alamat: "" });
  };

  return (
    <motion.section
      className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-4xl font-extrabold mb-10 text-center text-green-700 drop-shadow-md tracking-wide">
        Gabung Mitra <span className="text-green-900">ResQMeal</span>
      </h1>

      <p className="text-center mb-8 text-gray-600 text-lg">
        Daftar sebagai mitra kami dan ikut serta dalam gerakan mengurangi limbah makanan.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {["nama", "email", "telepon", "alamat"].map((field, idx) => {
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
              transition={{ delay: 0.1 * idx }}
            >
              <label className="block mb-2 font-semibold text-gray-800 text-lg leading-relaxed" htmlFor={field}>
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
                  className="w-full rounded-lg border px-5 py-4 resize-none text-gray-700 placeholder-green-500 focus:outline-none text-base"
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
                  className="w-full rounded-lg border px-5 py-4 text-gray-700 placeholder-green-500 focus:outline-none text-base"
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
          className="w-full bg-green-600 text-white font-bold py-4 rounded-lg shadow-md hover:bg-green-700 focus:outline-none text-lg"
          whileHover={buttonHover}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          Daftar Sekarang
        </motion.button>
      </form>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          position: "fixed",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
        }}
      />
    </motion.section>
  );
};

export default GabungMitra;
