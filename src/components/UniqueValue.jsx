import React, { useState, useEffect, useRef } from 'react';
import { FaRecycle,
  FaHandHoldingHeart,
  FaDollarSign,
  FaShieldAlt,
  FaGlobeAmericas} from 'react-icons/fa';
import { motion } from 'framer-motion';

const uniqueValues = [
  {
    id: 1,
    icon: <FaRecycle size={42} className="text-green-500" />,
    title: 'Mengurangi Food Waste',
    shortDesc: 'Menyelamatkan makanan sisa agar tidak menjadi limbah sia-sia.',
    longDesc:
      'ResQMeal memanfaatkan surplus makanan layak konsumsi dari mitra bisnis dan restoran, mengurangi pembuangan makanan sekaligus mendukung ketahanan pangan.',
  },
  {
    id: 2,
    icon: <FaDollarSign size={42} className="text-yellow-500" />,
    title: 'Harga Terjangkau',
    shortDesc: 'Makanan berkualitas dengan harga lebih hemat.',
    longDesc:
      'Dengan sistem food rescue, ResQMeal dapat memberikan makanan berkualitas yang tetap aman, namun dengan harga yang lebih terjangkau untuk konsumen.',
  },
  {
    id: 3,
    icon: <FaHandHoldingHeart size={42} className="text-pink-500" />,
    title: 'Dampak Sosial',
    shortDesc: 'Membantu masyarakat kurang mampu dan komunitas sosial.',
    longDesc:
      'Sebagian makanan surplus disalurkan ke lembaga sosial untuk membantu masyarakat yang membutuhkan, mendukung gerakan ketahanan pangan sosial.',
  },
  {
    id: 4,
    icon: <FaShieldAlt size={42} className="text-indigo-500" />,
    title: 'Keamanan & Kualitas',
    shortDesc: 'Proses sortir ketat untuk menjamin keamanan pangan.',
    longDesc:
      'Setiap makanan yang diproses ResQMeal melalui tahap penyortiran ketat, quality control, serta standar higienitas untuk menjaga keamanan makanan yang disalurkan.',
  },
  {
    id: 5,
    icon: <FaGlobeAmericas size={42} className="text-blue-500" />,
    title: 'Ramah Lingkungan',
    shortDesc: 'Kontribusi nyata dalam pengurangan limbah & karbon.',
    longDesc:
      'Dengan mengurangi food waste, ResQMeal secara langsung mengurangi emisi karbon, mendukung sustainability, dan memperpanjang siklus hidup makanan yang aman konsumsi.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const UniqueValue = () => {
  const [modalData, setModalData] = useState(null);
  const closeModal = () => setModalData(null);

  return (
    <>
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 px-6 max-w-7xl mx-auto">
        <motion.h2
          className="text-5xl font-extrabold text-center text-gray-900 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Keunggulan Utama ResQMeal
        </motion.h2>

        <motion.p
          className="max-w-3xl mx-auto text-lg text-center text-gray-600 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Kami membangun solusi pangan yang sehat, efisien, berdampak sosial & lingkungan.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {uniqueValues.map(({ id, icon, title, shortDesc, longDesc }) => (
            <motion.div
              key={id}
              variants={cardVariants}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transform transition-transform duration-300 cursor-pointer group"
              onClick={() => setModalData({ title, longDesc })}
              tabIndex={0}
              role="button"
              aria-label={`Baca selengkapnya tentang ${title}`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-5 bg-gray-100 rounded-full p-4 shadow-inner group-hover:scale-110 transition">
                  {icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{shortDesc}</p>

                <button className="mt-6 text-indigo-600 hover:text-indigo-800 font-medium">
                  Selengkapnya →
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {modalData && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900">{modalData.title}</h2>
            <p className="text-gray-700 leading-relaxed mb-8">{modalData.longDesc}</p>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
              aria-label="Tutup"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UniqueValue;
