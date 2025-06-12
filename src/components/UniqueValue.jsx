import React, { useState, useEffect, useRef } from 'react';
import { FaLeaf, FaClock, FaHeart, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const uniqueValues = [
  {
    id: 1,
    icon: <FaLeaf size={42} className="text-green-500" />,
    title: 'Bahan Alami & Diselamatkan',
    shortDesc: 'Menggunakan bahan makanan layak konsumsi yang diselamatkan dari limbah.',
    longDesc:
      'ResQMeal mengutamakan bahan alami layak konsumsi dari mitra restoran & supermarket. Dengan menyelamatkan makanan, kami menghadirkan nutrisi sehat sekaligus mengurangi food waste secara signifikan.',
  },
  {
    id: 2,
    icon: <FaClock size={42} className="text-indigo-500" />,
    title: 'Pemesanan Mudah & Efisien',
    shortDesc: 'Proses pemesanan cepat dengan sistem digital yang efisien dan transparan.',
    longDesc:
      'Platform ResQMeal memudahkan pemesanan cepat, pelacakan status real-time, serta pengiriman tepat waktu, tanpa mengorbankan kualitas makanan yang diterima pelanggan.',
  },
  {
    id: 3,
    icon: <FaHeart size={42} className="text-red-500" />,
    title: 'Menu Enak & Bernilai Sosial',
    shortDesc: 'Hidangan enak dan bergizi dengan misi sosial kuat.',
    longDesc:
      'Setiap menu ResQMeal bukan hanya memanjakan lidah, tapi juga berperan aktif dalam gerakan penyelamatan makanan dan mendukung ketahanan pangan nasional.',
  },
  {
    id: 4,
    icon: <FaStar size={42} className="text-yellow-500" />,
    title: 'Harga Bersahabat & Berdampak',
    shortDesc: 'Harga terjangkau untuk makanan sehat & berkelanjutan.',
    longDesc:
      'Berkat food rescue, ResQMeal menyediakan makanan bergizi dengan harga lebih terjangkau. Setiap transaksi turut berkontribusi bagi solusi lingkungan dan sosial.',
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
