import React, { useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const packages = [
  { id: 'monthly', label: 'Paket Bulanan', price: 120000, description: 'Berlangganan setiap bulan dengan pengiriman teratur.' },
  { id: 'quarterly', label: 'Paket 3 Bulan', price: 330000, description: 'Diskon 8% dibandingkan paket bulanan.' },
  { id: 'yearly', label: 'Paket Tahunan', price: 1200000, description: 'Hemat besar dengan paket tahunan sekaligus.' },
];

const Subscription = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    packageId: 'monthly',
  });
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
      // Scroll ke error pertama
      if (errors.name && nameRef.current) {
        nameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        nameRef.current.focus();
      } else if (errors.email && emailRef.current) {
        emailRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        emailRef.current.focus();
      } else if (errors.packageId && packageRef.current) {
        packageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      toast.error('Harap Isi form terlebih dahulu.');
      return;
    }

    setSubmitting(true);
    setSuccess(false);

    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setFormData({ name: '', email: '', packageId: 'monthly' });
      toast.success('Terima kasih sudah berlangganan! Kami akan segera menghubungi Anda.');
      setTimeout(() => setSuccess(false), 3000);
    }, 2000);
  };

  return (
    <section
      id="subscription"
      className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-green-100 to-green-50 rounded-xl shadow-xl"
      aria-label="Form Berlangganan ResQMeal"
    >
      <h2 className="text-4xl font-extrabold mb-8 text-center text-green-700 drop-shadow-md">
        Berlangganan <span className="text-green-900">ResQMeal</span>
      </h2>

      <p className="text-center mb-8 text-gray-600">
        Pilih paket berlangganan yang sesuai dengan kebutuhanmu dan nikmati kemudahan mendapatkan makanan sehat setiap saat.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        {/* Nama */}
        <div className="mb-8" ref={nameRef}>
          <label
            htmlFor="name"
            className="block font-semibold mb-3 text-gray-800 text-lg leading-relaxed"
            style={{ letterSpacing: '0.02em' }}
          >
            Nama Lengkap <span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-5 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-300 text-lg ${
              errors.name ? 'border-red-600 shadow-red-300' : 'border-gray-300 focus:shadow-indigo-300'
            }`}
            aria-describedby={errors.name ? 'name-error' : undefined}
            aria-invalid={errors.name ? 'true' : 'false'}
            disabled={submitting}
            style={{ lineHeight: '1.6' }}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-red-600 text-sm">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-8" ref={emailRef}>
          <label
            htmlFor="email"
            className="block font-semibold mb-3 text-gray-800 text-lg leading-relaxed"
            style={{ letterSpacing: '0.02em' }}
          >
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-5 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-300 text-lg ${
              errors.email ? 'border-red-600 shadow-red-300' : 'border-gray-300 focus:shadow-indigo-300'
            }`}
            aria-describedby={errors.email ? 'email-error' : undefined}
            aria-invalid={errors.email ? 'true' : 'false'}
            disabled={submitting}
            style={{ lineHeight: '1.6' }}
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-red-600 text-sm">
              {errors.email}
            </p>
          )}
        </div>

        {/* Paket Langganan */}
        <div className="mb-10" ref={packageRef}>
          <fieldset>
            <legend className="block font-semibold mb-4 text-gray-800 text-lg leading-relaxed" style={{ letterSpacing: '0.02em' }}>
              Pilih Paket Langganan <span className="text-red-600">*</span>
            </legend>

            {packages.map(({ id, label, price, description }) => (
              <label
                key={id}
                htmlFor={id}
                className={`flex items-start p-5 mb-4 border rounded-lg cursor-pointer transition-all duration-300
                  ${
                    formData.packageId === id
                      ? 'border-indigo-600 bg-indigo-100 shadow-lg scale-105'
                      : 'border-gray-300 hover:bg-indigo-50 hover:shadow-md'
                  }
                `}
              >
                <input
                  type="radio"
                  id={id}
                  name="packageId"
                  value={id}
                  checked={formData.packageId === id}
                  onChange={handleChange}
                  className="mt-1 mr-5 cursor-pointer"
                  disabled={submitting}
                />
                <div>
                  <span className="text-xl font-semibold text-indigo-700">{label}</span>
                  <p className="text-gray-700 text-base mt-1">{description}</p>
                  <p className="mt-2 font-bold text-indigo-600 text-lg">
                    Rp{price.toLocaleString()}
                  </p>
                </div>
              </label>
            ))}

            {errors.packageId && (
              <p className="mt-2 text-red-600 text-sm">{errors.packageId}</p>
            )}
          </fieldset>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors flex justify-center items-center space-x-3 text-lg"
          aria-live="polite"
        >
          {submitting && (
            <svg
              className="animate-spin h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          )}
          <span>{submitting ? 'Memproses...' : 'Berlangganan Sekarang'}</span>
        </button>
      </form>
    </section>
  );
};

export default Subscription;
