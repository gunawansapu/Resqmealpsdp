import React, { useState, useEffect, useRef } from 'react';
import { FaLeaf, FaClock, FaHeart, FaStar } from 'react-icons/fa';

const uniqueValues = [
 {
  id: 1,
  icon: <FaLeaf size={36} className="text-green-600" />,
  title: 'Bahan Alami & Diselamatkan',
  shortDesc:
    'Menggunakan bahan makanan layak konsumsi yang diselamatkan dari limbah.',
  longDesc:
    'ResQMeal mengutamakan pemanfaatan bahan makanan alami yang masih layak konsumsi dari mitra seperti restoran dan supermarket. Dengan pendekatan ini, kami tidak hanya menghadirkan makanan sehat, tapi juga turut mengurangi food waste secara signifikan.',
},
{
  id: 2,
  icon: <FaClock size={36} className="text-indigo-600" />,
  title: 'Pemesanan Mudah & Efisien',
  shortDesc:
    'Proses pemesanan cepat dengan sistem digital yang efisien dan transparan.',
  longDesc:
    'Melalui platform digital ResQMeal, pelanggan dapat memesan makanan dengan cepat dan praktis. Sistem kami dirancang untuk mempermudah pelacakan status pesanan serta memastikan makanan sampai tepat waktu tanpa mengorbankan kualitas.',
},
{
  id: 3,
  icon: <FaHeart size={36} className="text-red-600" />,
  title: 'Menu Enak & Bernilai Sosial',
  shortDesc:
    'Hidangan Enak dan Layak dengan misi sosial yang kuat.',
  longDesc:
    'Setiap menu di ResQMeal tidak hanya dibuat untuk memanjakan lidah, tapi juga sarat makna. Dengan menyelamatkan makanan yang masih layak, setiap pesanan Anda turut membantu misi sosial dalam mengurangi limbah dan mendukung ketahanan pangan.',
},
{
  id: 4,
  icon: <FaStar size={36} className="text-yellow-600" />,
  title: 'Harga Bersahabat & Berdampak',
  shortDesc:
    'Harga terjangkau untuk makanan sehat dan berkelanjutan.',
  longDesc:
    'Dengan memanfaatkan bahan dari food rescue, ResQMeal mampu menyediakan makanan bernutrisi dengan harga yang lebih terjangkau. Setiap pembelian bukan hanya menghemat pengeluaran, tetapi juga berkontribusi langsung pada solusi lingkungan dan sosial.',
},

];

const UniqueValue = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            if (!visibleItems.includes(index)) {
              setVisibleItems((prev) => [...prev, index]);
            }
          } else {
            // Optional: remove when out of view if you want animation to reset
            // setVisibleItems((prev) => prev.filter((i) => i !== index));
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

  const [modalData, setModalData] = useState(null);
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
              className={`p-8 rounded-xl shadow-lg bg-gray-50 transform transition duration-700 ease-in-out cursor-pointer
                ${
                  visibleItems.includes(index)
                    ? 'opacity-100 translate-y-0 animate-floating'
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

      {/* Custom CSS for floating animation */}
      <style jsx>{`
        @keyframes floating {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-floating {
          animation: floating 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default UniqueValue;
