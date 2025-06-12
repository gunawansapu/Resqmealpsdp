import React from 'react';
import {
  FaUsers,
  FaLaptop,
  FaAppleAlt,
  FaHome,
} from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const targetMarkets = [
  {
    id: 1,
    icon: <FaUsers size={40} className="text-purple-600" />,
    title: 'Mahasiswa & Pelajar',
    description:
      'Peduli lingkungan dan aktif mendukung pengurangan food waste sambil menikmati makanan terjangkau.',
    marketShare: 35,
  },
  {
    id: 2,
    icon: <FaLaptop size={40} className="text-blue-600" />,
    title: 'Karyawan Kantoran',
    description:
      'Sibuk, praktis, tapi tetap peduli sustainability dengan makan siang praktis, sehat, dan ramah lingkungan.',
    marketShare: 30,
  },
  {
    id: 3,
    icon: <FaAppleAlt size={40} className="text-green-600" />,
    title: 'Pecinta Lingkungan',
    description:
      'Komunitas yang concern pada pengurangan jejak karbon dan limbah makanan secara aktif.',
    marketShare: 20,
  },
  {
    id: 4,
    icon: <FaHome size={40} className="text-red-600" />,
    title: 'Ibu Rumah Tangga',
    description:
      'Menyediakan makanan bergizi untuk keluarga sekaligus berkontribusi dalam gerakan penyelamatan pangan.',
    marketShare: 15,
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
        Kami melayani berbagai segmen dengan kebutuhan berbeda namun satu tujuan: menyelamatkan makanan & mengurangi limbah.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
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
                    className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600"
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
