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
  icon: <FaUsers size={36} className="text-purple-600" />,
  title: 'Mahasiswa & Pelajar',
  description:
    'Mahasiswa dan pelajar yang peduli dengan lingkungan dan ingin berkontribusi dalam mengurangi limbah makanan sambil mendapatkan makanan lezat dan terjangkau.',
  marketShare: 35,
},
{
  id: 2,
  icon: <FaLaptop size={36} className="text-blue-600" />,
  title: 'Karyawan Kantoran',
  description:
    'Karyawan kantor yang sadar akan pentingnya sustainability, memilih ResQMeal untuk makan siang yang tidak hanya praktis dan bergizi tapi juga membantu mengurangi sampah makanan.',
  marketShare: 30,
},
{
  id: 3,
  icon: <FaAppleAlt size={36} className="text-green-600" />,
  title: 'Pecinta Lingkungan',
  description:
    'Orang-orang yang aktif mengurangi jejak karbon dan limbah makanan dengan memilih ResQMeal sebagai solusi makanan yang ramah lingkungan.',
  marketShare: 20,
},
{
  id: 4,
  icon: <FaHome size={36} className="text-red-600" />,
  title: 'Ibu Rumah Tangga',
  description:
    'Ibu rumah tangga yang ingin menyediakan makanan sehat dan bergizi untuk keluarga sekaligus mendukung gerakan pengurangan limbah makanan melalui ResQMeal.',
  marketShare: 15,
},

];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
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
    threshold: 0.2,
  });

  return (
    <section
      id="target-market"
      className="bg-gray-50 py-16 px-6 max-w-7xl mx-auto"
      aria-label="Target Market ResQMeal"
      ref={sectionRef}
    >
      <motion.h2
        className="text-4xl font-extrabold mb-10 text-center text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Segmen Pasar Utama
      </motion.h2>

      <motion.p
        className="max-w-3xl mx-auto mb-12 text-center text-gray-600 text-lg"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        ResQMeal melayani berbagai segmen pasar dengan kebutuhan dan preferensi berbeda.
        Berikut adalah target market utama kami yang menjadi fokus layanan.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {targetMarkets.map(({ id, icon, title, description, marketShare }, index) => (
          <motion.article
            key={id}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer"
            custom={index}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeInUp}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">{icon}</div>
              <h3
                className="text-2xl font-semibold text-gray-900 mb-3"
              >
                {title}
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
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
                  <motion.div
                    className="bg-purple-600 h-4 rounded-full"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${marketShare}%` } : {}}
                    transition={{ duration: 1.2, delay: 0.2 + index * 0.2 }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">{marketShare}% dari pasar</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default TargetMarket;
