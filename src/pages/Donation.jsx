import React, { useState } from 'react';

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
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
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
    setFormData((fd) => ({ ...fd, [name]: value }));
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
    <section
      id="donation"
      className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg"
      aria-label="Form Donasi ResQMeal"
    >
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Donasi untuk ResQMeal
      </h2>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-6"
        aria-describedby="donation-desc"
      >
        <p id="donation-desc" className="text-center text-gray-600 mb-6">
          Dukungan Anda membantu kami menyediakan makanan sehat dan bergizi untuk
          lebih banyak orang.
        </p>

        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
            Nama Lengkap<span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'error-name' : undefined}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.name ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-indigo-400'
            }`}
          />
          {errors.name && (
            <p id="error-name" className="text-red-600 mt-1 text-sm">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
            Email<span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'error-email' : undefined}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-indigo-400'
            }`}
          />
          {errors.email && (
            <p id="error-email" className="text-red-600 mt-1 text-sm">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="amount" className="block text-gray-700 font-semibold mb-1">
            Jumlah Donasi (Rp)<span className="text-red-600">*</span>
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            min="1"
            value={formData.amount}
            onChange={handleChange}
            aria-invalid={errors.amount ? 'true' : 'false'}
            aria-describedby={errors.amount ? 'error-amount' : undefined}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.amount ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-indigo-400'
            }`}
          />
          {errors.amount && (
            <p id="error-amount" className="text-red-600 mt-1 text-sm">
              {errors.amount}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="paymentMethod"
            className="block text-gray-700 font-semibold mb-1"
          >
            Metode Pembayaran<span className="text-red-600">*</span>
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            aria-invalid={errors.paymentMethod ? 'true' : 'false'}
            aria-describedby={errors.paymentMethod ? 'error-paymentMethod' : undefined}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.paymentMethod ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-indigo-400'
            }`}
          >
            <option value="">-- Pilih Metode Pembayaran --</option>
            {paymentMethods.map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
          {errors.paymentMethod && (
            <p id="error-paymentMethod" className="text-red-600 mt-1 text-sm">
              {errors.paymentMethod}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors"
        >
          Donasi Sekarang
        </button>

        {submitted && (
          <p
            role="alert"
            className="mt-4 text-green-600 font-semibold text-center"
          >
            Terima kasih atas donasi Anda!
          </p>
        )}
      </form>

      <section className="mt-12">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Daftar Donatur Terbaru
        </h3>
        <ul className="max-w-xl mx-auto space-y-4">
          {donors.length === 0 && (
            <li className="text-center text-gray-500 italic">Belum ada donatur.</li>
          )}
          {donors.map(({ id, name, amount, method }) => (
            <li
              key={id}
              className="flex justify-between bg-gray-100 p-4 rounded-md shadow-sm"
              aria-label={`Donatur ${name} memberikan donasi sebesar Rp${amount} melalui ${method}`}
            >
              <span className="font-semibold text-gray-900">{name}</span>
              <span className="text-gray-700">Rp{amount.toLocaleString()}</span>
              <span className="italic text-gray-600">{method}</span>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default Donation;
