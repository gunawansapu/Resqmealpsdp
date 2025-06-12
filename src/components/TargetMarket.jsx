import React from 'react';
import {
  FaLeaf,
  FaUserFriends,
  FaStore,
  FaMotorcycle,
  FaHandsHelping,
} from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const targetMarkets = [
  {
    id: 1,
    icon: <FaLeaf size={40} className="text-green-600" />,
    title: 'Pecinta Lingkungan',
    description: 'Individu yang peduli terhadap sustainability, zero waste, dan penyelamatan makanan sisa.',
    marketShare: 30,
  },
  {
    id: 2,
    icon: <FaUserFriends size={40} className="text-blue-600" />,
    title: 'Masyarakat Ekonomi Menengah Bawah',
    description: 'Mahasiswa, pekerja kantoran, dan masyarakat umum yang mencari makanan berkualitas dengan harga lebih terjangkau.',
    marketShare: 25,
  },
  {
    id: 3,
    icon: <FaStore size={40} className="text-purple-600" />,
    title: 'Mitra Bisnis & UMKM',
    description: 'Restoran, supermarket, bakery, dan usaha kecil yang menjadi sumber makanan sisa layak konsumsi.',
    marketShare: 20,
  },
  {
    id: 4,
    icon: <FaMotorcycle size={40} className="text-orange-500" />,
    title: 'Mitra Driver & Kurir',
    description: 'Mitra ojek online & kurir lokal yang berperan dalam pengantaran makanan secara cepat & efisien.',
    marketShare: 15,
  },
  {
    id: 5,
    icon: <FaHandsHelping size={40} className="text-pink-500" />,
    title: 'Komunitas Sosial',
    description: 'Organisasi sosial yang membeli makanan layak konsumsi untuk disalurkan ke masyarakat kurang mampu.',
    marketShare: 10,
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: 'easeOut',
    },
  }),
};

const TargetMarket = () => {
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section
      id="target-market"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white to-gray-50 px-6 max-w-7xl mx-auto"
    >
      <motion.h2
        className="text-5xl font-extrabold text-center text-gray-900 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Target Market ResQMeal
      </motion.h2>

      <motion.p
        className="max-w-3xl mx-auto text-lg text-center text-gray-600 mb-16"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        ResQMeal melayani beragam segmen masyarakat dengan misi utama menyelamatkan makanan sisa, mengurangi limbah, dan membantu masyarakat secara sosial dan ekonomi.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {targetMarkets.map(({ id, icon, title, description, marketShare }, index) => (
          <motion.article
            key={id}
            className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transform transition-transform duration-300 cursor-pointer group"
            custom={index}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeInUp}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 bg-gray-100 rounded-full p-4 shadow-inner group-hover:scale-110 transition">
                {icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">{description}</p>

              <div className="w-full">
                <div className="flex justify-between mb-1 text-sm text-gray-500 font-medium">
                  <span>Pangsa Pasar</span>
                  <span>{marketShare}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-3 rounded-full bg-gradient-to-r from-green-500 to-teal-600"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${marketShare}%` } : {}}
                    transition={{ duration: 1.2, delay: 0.3 + index * 0.2 }}
                  />
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default TargetMarket;
