import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulasi pengiriman
    alert('Pesan Anda telah dikirim!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section className="bg-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Info Kontak */}
        <div>
          <h2 className="text-3xl font-bold text-green-700 mb-6">Hubungi Kami</h2>
          <p className="text-gray-700 mb-4">
            Kami siap mendengar pertanyaan, saran, atau kolaborasi dari Anda.
          </p>
          <ul className="text-gray-600 space-y-3">
            <li>
              📍 Alamat: Jl. Peduli Makanan No. 123, Semarang
            </li>
            <li>
              📞 Telepon: 0822-1234-5678
            </li>
            <li>
              📧 Email: kontak@resqmeal.id
            </li>
          </ul>
        </div>

        {/* Form Kontak */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-xl shadow">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-green-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-green-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Pesan</label>
              <textarea
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-green-100"
              />
            </div>

            <button
              type="submit"
              className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
