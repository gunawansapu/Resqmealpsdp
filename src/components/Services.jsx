import React, { useEffect, useState } from 'react';
import { FaTruck, FaHandHoldingHeart, FaStore, FaBuilding, FaWarehouse } from 'react-icons/fa';

const servicesData = [
  {
    id: 1,
    icon: <FaStore size={40} className="text-green-500 mb-4" />,
    title: 'B2C Platform',
    description:
      'Menyediakan platform untuk konsumen membeli makanan surplus berkualitas langsung dari merchant terdekat.',
  },
  {
    id: 2,
    icon: <FaBuilding size={40} className="text-blue-500 mb-4" />,
    title: 'B2B Collaboration',
    description:
      'Mitra bisnis seperti restoran, hotel, supermarket, dan UMKM berkolaborasi untuk mengelola surplus makanan mereka.',
  },
  {
    id: 3,
    icon: <FaHandHoldingHeart size={40} className="text-pink-500 mb-4" />,
    title: 'Food Donation Platform',
    description:
      'Memfasilitasi penyaluran makanan sisa layak konsumsi kepada komunitas sosial dan masyarakat kurang mampu.',
  },
  {
    id: 4,
    icon: <FaTruck size={40} className="text-yellow-500 mb-4" />,
    title: 'Logistic & Delivery',
    description:
      'Pengiriman makanan dengan sistem logistik cepat dan efisien melalui jaringan kurir internal dan eksternal.',
  },
  {
    id: 5,
    icon: <FaWarehouse size={40} className="text-purple-500 mb-4" />,
    title: 'Food Rescue Hub',
    description:
      'Pusat penyimpanan makanan surplus sebelum dialokasikan ke konsumen atau lembaga sosial.',
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
    <section id="services" className="py-24 bg-white px-6" aria-label="Layanan ResQMeal">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-4 text-gray-900">Layanan ResQMeal</h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          Kami hadir sebagai solusi terintegrasi pengelolaan makanan surplus dari hulu hingga hilir, baik untuk individu maupun bisnis.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
