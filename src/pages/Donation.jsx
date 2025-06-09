import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const paymentMethods = [
  { id: 'credit', label: 'Kartu Kredit' },
  { id: 'bank', label: 'Transfer Bank' },
  { id: 'ovo', label: 'OVO' },
  { id: 'gopay', label: 'GoPay' },
];

const Donation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    paymentMethod: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [donors, setDonors] = useState([
    { id: 1, name: 'Dewi', amount: 100000, method: 'OVO' },
    { id: 2, name: 'Rian', amount: 50000, method: 'Kartu Kredit' },
  ]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Nama wajib diisi';
    if (!formData.email.trim()) {
      errs.email = 'Email wajib diisi';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
      errs.email = 'Format email tidak valid';
    }
    if (!formData.amount) {
      errs.amount = 'Jumlah donasi wajib diisi';
    } else if (isNaN(formData.amount) || Number(formData.amount) <= 0) {
      errs.amount = 'Jumlah donasi harus angka lebih dari 0';
    }
    if (!formData.paymentMethod) errs.paymentMethod = 'Pilih metode pembayaran';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let cleanedValue = value;

    if (name === 'amount') {
      // Hapus titik pemisah ribuan
      cleanedValue = value.replace(/\./g, '');
      // Cegah input non-numerik selain angka
      if (!/^\d*$/.test(cleanedValue)) return;
    }

    setFormData((fd) => ({ ...fd, [name]: cleanedValue }));

    if (errors[name]) {
      setErrors((errs) => {
        const newErrs = { ...errs };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newDonor = {
      id: donors.length + 1,
      name: formData.name.trim(),
      amount: Number(formData.amount),
      method: paymentMethods.find((m) => m.id === formData.paymentMethod)?.label,
    };

    setDonors((prev) => [newDonor, ...prev]);
    setFormData({ name: '', email: '', amount: '', paymentMethod: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <motion.section
      id="donation"
      className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-green-100 to-green-50 rounded-xl shadow-xl"
      aria-label="Form Donasi ResQMeal"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-4xl font-extrabold mb-8 text-center text-green-700 drop-shadow-md"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        Donasi untuk <span className="text-green-900">ResQMeal</span>
      </motion.h2>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <p className="text-center text-gray-600 mb-6">
          Dukungan Anda membantu kami menyediakan makanan sehat dan bergizi.
        </p>

        {['name', 'email', 'amount'].map((field) => (
          <motion.div
            key={field}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label htmlFor={field} className="block text-gray-700 font-medium mb-1">
              {field === 'name' && 'Nama Lengkap'}
              {field === 'email' && 'Email'}
              {field === 'amount' && 'Jumlah Donasi (Rp)'}
              <span className="text-red-600">*</span>
            </label>
            <input
              id={field}
              name={field}
              type={field === 'email' ? 'email' : 'text'}
              value={formData[field]}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all ${
                errors[field] ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-indigo-400'
              }`}
              inputMode={field === 'amount' ? 'numeric' : undefined}
            />
            {errors[field] && (
              <p className="text-red-600 mt-1 text-sm">{errors[field]}</p>
            )}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label htmlFor="paymentMethod" className="block text-gray-700 font-medium mb-1">
            Metode Pembayaran<span className="text-red-600">*</span>
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all ${
              errors.paymentMethod ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-indigo-400'
            }`}
          >
            <option value="">-- Pilih Metode Pembayaran --</option>
            {paymentMethods.map(({ id, label }) => (
              <option key={id} value={id}>{label}</option>
            ))}
          </select>
          {errors.paymentMethod && (
            <p className="text-red-600 mt-1 text-sm">{errors.paymentMethod}</p>
          )}
        </motion.div>

        <motion.button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
          whileTap={{ scale: 0.95 }}
        >
          Donasi Sekarang
        </motion.button>

        <AnimatePresence>
          {submitted && (
            <motion.p
              role="alert"
              className="mt-4 text-green-600 font-semibold text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              Terima kasih atas donasi Anda!
            </motion.p>
          )}
        </AnimatePresence>
      </form>

      <motion.section
        className="mt-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Daftar Donatur Terbaru
        </h3>
        <ul className="max-w-xl mx-auto space-y-4">
          {donors.length === 0 && (
            <li className="text-center text-gray-500 italic">Belum ada donatur.</li>
          )}
          {donors.map(({ id, name, amount, method }) => (
            <motion.li
              key={id}
              className="flex justify-between bg-gray-100 p-4 rounded-md shadow-sm"
              aria-label={`Donatur ${name} memberikan donasi sebesar Rp${amount} melalui ${method}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: id * 0.1 }}
            >
              <span className="font-semibold text-gray-900">{name}</span>
              <span className="text-gray-700">Rp{amount.toLocaleString('id-ID')}</span>
              <span className="italic text-gray-600">{method}</span>
            </motion.li>
          ))}
        </ul>
      </motion.section>
    </motion.section>
  );
};

export default Donation;
