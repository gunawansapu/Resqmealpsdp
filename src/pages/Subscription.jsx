import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheckCircle } from 'react-icons/fa';

const packages = [
  { id: 'monthly', label: 'Paket Bulanan', price: 120000, description: 'Berlangganan setiap bulan dengan pengiriman teratur.' },
  { id: 'quarterly', label: 'Paket 3 Bulan', price: 330000, description: 'Diskon 8% dibandingkan paket bulanan.' },
  { id: 'yearly', label: 'Paket Tahunan', price: 1200000, description: 'Hemat besar dengan paket tahunan sekaligus.' },
];

const Subscription = () => {
  const [formData, setFormData] = useState({ name: '', email: '', packageId: 'monthly' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const packageRef = useRef(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nama harus diisi.';
    if (!formData.email.trim()) newErrors.email = 'Email harus diisi.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format email tidak valid.';
    if (!formData.packageId) newErrors.packageId = 'Pilih paket langganan.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Harap isi form dengan benar.');
      return;
    }

    setSubmitting(true);
    setSuccess(false);

    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setFormData({ name: '', email: '', packageId: 'monthly' });
      toast.success('Berhasil berlangganan! Kami akan segera menghubungi Anda.');
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <motion.section
      id="subscription"
      className="max-w-4xl mx-auto p-10 bg-white rounded-2xl shadow-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-700 leading-tight">
  Langganan <span className="text-green-900">ResQMeal</span>
</h2>

      <p className="text-center mb-10 text-gray-500 text-lg">
        Pilih paket yang sesuai, nikmati hemat & makanan berkualitas setiap bulan.
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        <div ref={nameRef}>
          <label htmlFor="name" className="font-semibold text-lg block mb-2 text-gray-700">Nama Lengkap *</label>
          <input
            id="name" name="name" type="text" value={formData.name} onChange={handleChange}
            className={`w-full px-5 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 transition`}
            disabled={submitting}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div ref={emailRef}>
          <label htmlFor="email" className="font-semibold text-lg block mb-2 text-gray-700">Email *</label>
          <input
            id="email" name="email" type="email" value={formData.email} onChange={handleChange}
            className={`w-full px-5 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 transition`}
            disabled={submitting}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div ref={packageRef}>
          <p className="font-semibold text-lg mb-4 text-gray-700">Pilih Paket *</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {packages.map(({ id, label, price, description }) => (
              <label
                key={id}
                htmlFor={id}
                className={`border rounded-2xl p-5 cursor-pointer transition-all duration-300 ${formData.packageId === id ? 'border-green-500 shadow-xl scale-105' : 'border-gray-300 hover:border-green-400 hover:shadow-md'}`}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="radio" id={id} name="packageId" value={id}
                    checked={formData.packageId === id} onChange={handleChange}
                    className="mt-1 cursor-pointer"
                    disabled={submitting}
                  />
                  <div>
                    <div className="text-xl font-semibold text-green-700">{label}</div>
                    <p className="text-gray-500">{description}</p>
                    <p className="mt-2 text-lg font-bold text-green-700">Rp{price.toLocaleString()}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
          {errors.packageId && <p className="text-red-500 text-sm mt-2">{errors.packageId}</p>}
        </div>

        <button
          type="submit" disabled={submitting}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 rounded-xl shadow-lg hover:brightness-110 transition text-lg flex justify-center items-center gap-3"
        >
          {submitting ? (
            <div className="animate-spin h-6 w-6 border-4 border-white border-t-transparent rounded-full"></div>
          ) : (
            <FaCheckCircle size={22} />
          )}
          {submitting ? 'Memproses...' : 'Berlangganan Sekarang'}
        </button>

        <ToastContainer position="top-center" autoClose={2500} />
      </form>
    </motion.section>
  );
};

export default Subscription;
