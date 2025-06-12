import React, { useEffect, useState } from 'react';
import { FaTruck, FaLeaf, FaClock, FaUtensils } from 'react-icons/fa';

const servicesData = [
  {
    id: 1,
    icon: <FaTruck size={40} className="text-yellow-400 mb-4" />,
    title: 'Pengantaran Super Cepat',
    description:
      'Makanan disampaikan dalam waktu singkat melalui jaringan kurir yang handal dan pelacakan waktu nyata.',
  },
  {
    id: 2,
    icon: <FaLeaf size={40} className="text-green-400 mb-4" />,
    title: 'Kemitraan UMKM & Supermarket',
    description:
      'Mengurangi limbah dengan bermitra bersama restoran, UMKM, bakery, dan supermarket terdekat.',
  },
  {
    id: 3,
    icon: <FaClock size={40} className="text-blue-400 mb-4" />,
    title: 'Layanan 24/7',
    description:
      'Platform selalu aktif, memudahkan donasi dan transaksi kapan saja—siang maupun malam.',
  },
  {
    id: 4,
    icon: <FaUtensils size={40} className="text-red-400 mb-4" />,
    title: 'Donasi & Food Hub',
    description:
      'Fasilitas donasi makanan layak konsumsi & food hub lokal untuk distribusi ke yang membutuhkan.',
  },
];

const Services = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const top = document.getElementById('services').getBoundingClientRect().top;
      if (top < window.innerHeight * 0.85) {
        setVisible(true);
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="services"
      className="py-20 bg-white px-6"
      aria-label="Layanan ResQMeal"
    >
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-4 text-gray-900">Layanan Kami</h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          Solusi terpadu untuk memberdayakan platform jual-beli & donasi makanan sisa, lengkap dengan food hub lokal.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {servicesData.map((svc) => (
          <article
            key={svc.id}
            className={`bg-gray-50 p-8 rounded-3xl shadow-lg transform transition-all duration-700 ease-out
              ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              hover:shadow-2xl hover:translate-y-1 cursor-pointer`}
            tabIndex={0}
            role="region"
            aria-labelledby={`svc-title-${svc.id}`}
          >
            <div className="flex flex-col items-center text-center">
              {svc.icon}
              <h3 id={`svc-title-${svc.id}`} className="text-xl font-semibold text-gray-800 mb-2">
                {svc.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{svc.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
