import React, { useState, useEffect, useRef } from 'react';
import { FaLeaf, FaClock, FaHeart, FaStar } from 'react-icons/fa';

const uniqueValues = [
  {
    id: 1,
    icon: <FaLeaf size={36} className="text-green-600" />,
    title: 'Bahan Alami & Sehat',
    shortDesc:
      'Kami hanya menggunakan bahan segar dan alami tanpa bahan pengawet.',
    longDesc:
      'ResQMeal berkomitmen menggunakan bahan-bahan segar dan alami yang dipilih secara ketat. Semua produk bebas dari bahan pengawet dan zat kimia berbahaya, memastikan setiap hidangan sehat dan aman dikonsumsi setiap hari.',
  },
  {
    id: 2,
    icon: <FaClock size={36} className="text-indigo-600" />,
    title: 'Pemesanan Cepat & Mudah',
    shortDesc:
      'Sistem pemesanan online yang praktis, cocok untuk gaya hidup sibuk.',
    longDesc:
      'Kami menyediakan platform pemesanan online yang intuitif dan responsif, memungkinkan pelanggan melakukan pemesanan hanya dalam beberapa klik. Waktu pengolahan dan pengiriman yang cepat menjadikan ResQMeal pilihan tepat untuk yang mengutamakan kecepatan dan kemudahan.',
  },
  {
    id: 3,
    icon: <FaHeart size={36} className="text-red-600" />,
    title: 'Menu Variatif & Lezat',
    shortDesc:
      'Beragam pilihan menu yang selalu diperbarui dengan cita rasa tinggi.',
    longDesc:
      'ResQMeal menawarkan menu yang sangat variatif, mulai dari hidangan tradisional hingga modern. Semua menu dikembangkan oleh chef berpengalaman dengan fokus pada cita rasa yang memanjakan lidah dan nilai gizi yang optimal.',
  },
  {
    id: 4,
    icon: <FaStar size={36} className="text-yellow-600" />,
    title: 'Harga Terjangkau & Bersahabat',
    shortDesc:
      'Kami menyediakan makanan berkualitas dengan harga yang tetap ramah di kantong.',
    longDesc:
      'Dengan model bisnis efisien dan supply chain yang optimal, ResQMeal bisa menawarkan harga yang kompetitif tanpa mengorbankan kualitas. Kami percaya makanan sehat dan lezat harus bisa dinikmati oleh semua kalangan.',
  },
];

const UniqueValue = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [modalData, setModalData] = useState(null);
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!visibleItems.includes(index)) {
              setVisibleItems((prev) => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      refs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [visibleItems]);

  // Modal close handler (focus return)
  const closeModal = () => setModalData(null);

  return (
    <>
      <section
        id="unique-value"
        className="py-16 px-6 max-w-7xl mx-auto bg-white"
        aria-label="Unique Value Proposition ResQMeal"
      >
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
          Nilai Unik Kami
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {uniqueValues.map(({ id, icon, title, shortDesc, longDesc }, index) => (
            <article
              key={id}
              ref={(el) => (refs.current[index] = el)}
              data-index={index}
              className={`p-8 rounded-xl shadow-lg bg-gray-50 transform transition duration-700 ease-in-out
                ${
                  visibleItems.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
              tabIndex={0}
              role="region"
              aria-labelledby={`uv-title-${id}`}
              aria-describedby={`uv-desc-${id}`}
            >
              <div className="flex items-center mb-4 space-x-4">
                <div>{icon}</div>
                <h3
                  id={`uv-title-${id}`}
                  className="text-2xl font-semibold text-gray-900"
                >
                  {title}
                </h3>
              </div>
              <p
                id={`uv-desc-${id}`}
                className="text-gray-700 mb-6 leading-relaxed"
              >
                {shortDesc}
              </p>
              <button
                onClick={() => setModalData({ title, longDesc })}
                className="text-indigo-600 hover:text-indigo-800 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400"
                aria-haspopup="dialog"
              >
                Baca Selengkapnya &rarr;
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Modal */}
      {modalData && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          tabIndex={-1}
          onClick={closeModal}
          onKeyDown={(e) => e.key === 'Escape' && closeModal()}
        >
          <div
            className="bg-white rounded-lg max-w-xl w-full p-8 relative shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="modal-title" className="text-3xl font-bold mb-6 text-gray-900">
              {modalData.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-8">{modalData.longDesc}</p>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
              aria-label="Tutup dialog"
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
