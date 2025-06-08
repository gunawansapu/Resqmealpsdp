import React from 'react';
import { FaUsers, FaLaptop, FaAppleAlt, FaHome } from 'react-icons/fa';

const targetMarkets = [
  {
    id: 1,
    icon: <FaUsers size={36} className="text-purple-600" />,
    title: 'Mahasiswa & Pelajar',
    description:
      'Mereka yang membutuhkan makanan sehat, praktis, dan ekonomis untuk menunjang aktivitas belajar sehari-hari.',
    marketShare: 35,
  },
  {
    id: 2,
    icon: <FaLaptop size={36} className="text-blue-600" />,
    title: 'Karyawan Kantoran',
    description:
      'Pekerja dengan jadwal padat yang mencari makanan bergizi dan cepat saji saat jam makan siang.',
    marketShare: 30,
  },
  {
    id: 3,
    icon: <FaAppleAlt size={36} className="text-green-600" />,
    title: 'Pecinta Makanan Sehat',
    description:
      'Orang-orang yang sangat memperhatikan kualitas dan kandungan gizi makanan yang dikonsumsi.',
    marketShare: 20,
  },
  {
    id: 4,
    icon: <FaHome size={36} className="text-red-600" />,
    title: 'Ibu Rumah Tangga',
    description:
      'Mencari solusi makanan praktis dan bergizi untuk keluarga di tengah kesibukan rumah tangga.',
    marketShare: 15,
  },
];

const TargetMarket = () => {
  return (
    <section
      id="target-market"
      className="bg-gray-50 py-16 px-6 max-w-7xl mx-auto"
      aria-label="Target Market ResQMeal"
    >
      <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
        Segmen Pasar Utama
      </h2>
      <p className="max-w-3xl mx-auto mb-12 text-center text-gray-600 text-lg">
        ResQMeal melayani berbagai segmen pasar dengan kebutuhan dan preferensi berbeda.
        Berikut adalah target market utama kami yang menjadi fokus layanan.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {targetMarkets.map(({ id, icon, title, description, marketShare }) => (
          <article
            key={id}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer"
            tabIndex={0}
            role="region"
            aria-labelledby={`target-title-${id}`}
            aria-describedby={`target-desc-${id}`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">{icon}</div>
              <h3
                id={`target-title-${id}`}
                className="text-2xl font-semibold text-gray-900 mb-3"
              >
                {title}
              </h3>
              <p
                id={`target-desc-${id}`}
                className="text-gray-700 mb-6 leading-relaxed"
              >
                {description}
              </p>
              <div className="w-full">
                <div
                  aria-label={`${marketShare}% pangsa pasar`}
                  role="progressbar"
                  aria-valuenow={marketShare}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="bg-gray-200 h-4 rounded-full overflow-hidden"
                >
                  <div
                    className="bg-purple-600 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${marketShare}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">{marketShare}% dari pasar</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TargetMarket;
