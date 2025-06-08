import React, { useEffect, useState } from 'react';
import { FaTruck, FaLeaf, FaClock, FaUtensils } from 'react-icons/fa';

const servicesData = [
  {
    id: 1,
    icon: <FaTruck size={40} className="text-yellow-400 mb-4" />,
    title: 'Pengantaran Cepat',
    description:
      'Kami pastikan makanan layak konsumsi sampai ke tangan penerima dengan cepat dan aman.',
  },
  {
    id: 2,
    icon: <FaLeaf size={40} className="text-green-400 mb-4" />,
    title: 'Kemitraan UMKM & Supermarket',
    description:
      'Berkolaborasi dengan UMKM, restoran, dan supermarket untuk mengurangi limbah makanan.',
  },
  {
    id: 3,
    icon: <FaClock size={40} className="text-blue-400 mb-4" />,
    title: 'Layanan 24/7',
    description:
      'Platform kami aktif selama 24 jam untuk memudahkan donasi dan distribusi kapan saja.',
  },
  {
    id: 4,
    icon: <FaUtensils size={40} className="text-red-400 mb-4" />,
    title: 'Donasi Makanan',
    description:
      'Fasilitasi donasi makanan yang layak konsumsi untuk komunitas dan kurir lokal.',
  },
];

const Services = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Simple scroll listener untuk trigger animasi fade-in
    const onScroll = () => {
      const top = document
        .getElementById('services-section')
        .getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        setVisible(true);
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="services-section"
      className="py-20 bg-gray-100 px-6"
      aria-label="Layanan ResQMeal"
    >
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-4 text-gray-800">
          Layanan Kami
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Nikmati berbagai layanan yang kami tawarkan untuk memberikan pengalaman terbaik.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {servicesData.map(({ id, icon, title, description }) => (
          <article
            key={id}
            className={`bg-white p-8 rounded-xl shadow-lg transform transition duration-700 ease-in-out
              ${
                visible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }
              hover:shadow-2xl hover:-translate-y-2 cursor-pointer
            `}
            tabIndex={0}
            role="region"
            aria-labelledby={`service-title-${id}`}
          >
            <div className="flex flex-col items-center">
              {icon}
              <h3
                id={`service-title-${id}`}
                className="text-xl font-semibold text-gray-800 mb-3"
              >
                {title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
