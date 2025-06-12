import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdEmail, MdLocationOn, MdPhone, MdSend } from 'react-icons/md';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Pesan Anda telah dikirim!', {
      position: 'top-center',
      autoClose: 3000,
    });
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section className="py-24 bg-gradient-to-br from-green-50 to-white px-6 md:px-20">
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >

        {/* Side Illustration + Info */}
        <motion.div
          className="space-y-8 text-center md:text-left"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-700 leading-tight">
            Hubungi Tim <span className="text-green-900">ResQMeal</span>
          </h2>
          <p className="text-lg text-gray-600">
            Kami senang mendengar dari Anda! Kirimkan pertanyaan, kolaborasi, atau masukan.
          </p>

          <div className="space-y-4 text-gray-700 text-lg">
            <p className="flex items-center justify-center md:justify-start gap-3"><MdLocationOn className="text-green-500 text-2xl" /> Jl. Peduli Makanan No. 123, Semarang</p>
            <p className="flex items-center justify-center md:justify-start gap-3"><MdPhone className="text-green-500 text-2xl" /> 0822-1234-5678</p>
            <p className="flex items-center justify-center md:justify-start gap-3"><MdEmail className="text-green-500 text-2xl" /> kontak@resqmeal.id</p>
          </div>

          <motion.img
            src="https://cdn-icons-png.flaticon.com/512/5977/5977583.png"
            alt="Contact Illustration"
            className="w-64 mx-auto md:mx-0"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 space-y-8"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Nama</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Pesan</label>
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-full text-lg font-bold shadow-lg hover:brightness-110 transition flex justify-center items-center gap-3"
          >
            <MdSend size={22} />
            Kirim Pesan
          </motion.button>
        </motion.form>
      </motion.div>

      <ToastContainer />
    </section>
  );
}
