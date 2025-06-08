import React, { useState } from 'react';

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

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama harus diisi.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid.';
    }

    if (!formData.packageId) {
      newErrors.packageId = 'Pilih paket langganan.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // Reset error for the field
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSuccess(false);

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        packageId: 'monthly',
      });
    }, 2000);
  };

  const selectedPackage = packages.find((p) => p.id === formData.packageId);

  return (
    <section
      id="subscription"
      className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md"
      aria-label="Form Berlangganan ResQMeal"
    >
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Berlangganan ResQMeal
      </h2>

      <p className="text-center mb-8 text-gray-600">
        Pilih paket berlangganan yang sesuai dengan kebutuhanmu dan nikmati kemudahan mendapatkan makanan sehat setiap saat.
      </p>

      {success && (
        <div
          role="alert"
          className="mb-6 p-4 bg-green-100 text-green-700 border border-green-300 rounded"
        >
          Terima kasih sudah berlangganan! Kami akan segera menghubungi Anda.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Nama */}
        <div className="mb-6">
          <label htmlFor="name" className="block font-semibold mb-2 text-gray-700">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-describedby={errors.name ? 'name-error' : undefined}
            aria-invalid={errors.name ? 'true' : 'false'}
            disabled={submitting}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-red-600 text-sm">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-6">
          <label htmlFor="email" className="block font-semibold mb-2 text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-describedby={errors.email ? 'email-error' : undefined}
            aria-invalid={errors.email ? 'true' : 'false'}
            disabled={submitting}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-red-600 text-sm">
              {errors.email}
            </p>
          )}
        </div>

        {/* Paket Langganan */}
        <div className="mb-8">
          <fieldset>
            <legend className="block font-semibold mb-3 text-gray-700">
              Pilih Paket Langganan <span className="text-red-500">*</span>
            </legend>

            {packages.map(({ id, label, price, description }) => (
              <label
                key={id}
                htmlFor={id}
                className={`flex items-start p-3 mb-3 border rounded-lg cursor-pointer hover:bg-indigo-50 ${
                  formData.packageId === id ? 'border-indigo-600 bg-indigo-100' : 'border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  id={id}
                  name="packageId"
                  value={id}
                  checked={formData.packageId === id}
                  onChange={handleChange}
                  className="mt-1 mr-3"
                  disabled={submitting}
                />
                <div>
                  <span className="text-lg font-semibold text-indigo-700">{label}</span>
                  <p className="text-gray-600 text-sm">{description}</p>
                  <p className="mt-1 font-bold text-indigo-600">
                    Rp{price.toLocaleString()}
                  </p>
                </div>
              </label>
            ))}

            {errors.packageId && (
              <p className="mt-1 text-red-600 text-sm">{errors.packageId}</p>
            )}
          </fieldset>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
        >
          {submitting ? 'Memproses...' : 'Berlangganan Sekarang'}
        </button>
      </form>
    </section>
  );
};

export default Subscription;
