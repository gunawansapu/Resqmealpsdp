import React, { useEffect, useState } from 'react';
import {
  FaTruckLoading,
  FaWarehouse,
  FaClipboardList,
  FaUserCheck,
  FaShippingFast,
} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const supplyChainSteps = [
  {
    id: 1,
    icon: <FaClipboardList size={36} className="text-indigo-600" />,
    title: 'Perencanaan',
    description:
      'Merencanakan pengumpulan dan distribusi makanan layak konsumsi dari berbagai mitra untuk meminimalisir limbah.',
    bgColor: 'bg-indigo-100',
  },
  {
    id: 2,
    icon: <FaUserCheck size={36} className="text-green-600" />,
    title: 'Pemilihan Mitra',
    description:
      'Memilih mitra restoran, UMKM, dan supermarket yang menyediakan makanan layak konsumsi untuk diselamatkan.',
    bgColor: 'bg-green-100',
  },
  {
    id: 3,
    icon: <FaTruckLoading size={36} className="text-yellow-600" />,
    title: 'Pengumpulan & Pengiriman',
    description:
      'Makanan dari mitra dikumpulkan dan diangkut dengan tepat waktu ke pusat sortir ResQMeal.',
    bgColor: 'bg-yellow-100',
  },
  {
    id: 4,
    icon: <FaWarehouse size={36} className="text-blue-600" />,
    title: 'Sortir dan Penyimpanan',
    description:
      'Makanan disortir, diperiksa kualitasnya, dan disimpan dengan aman sebelum didistribusikan ke pelanggan.',
    bgColor: 'bg-blue-100',
  },
  {
    id: 5,
    icon: <FaShippingFast size={36} className="text-red-600" />,
    title: 'Distribusi ke Pelanggan',
    description:
      'Pesanan makanan dikirim ke pelanggan dengan cepat dan aman melalui layanan pengantaran ResQMeal.',
    bgColor: 'bg-red-100',
  },
];

const SupplyChain = () => {
  const [visibleStep, setVisibleStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleStep((prev) =>
        prev < supplyChainSteps.length ? prev + 1 : prev
      );
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = () => {
    toast.success('Terima kasih telah mempelajari rantai pasok kami!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });
  };

  return (
    <section
      id="supply-chain"
      className="py-16 px-6 bg-white max-w-7xl mx-auto"
    >
      <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
        Proses Rantai Pasok ResQMeal
      </h2>

      <div
        className="
          flex flex-col space-y-6
          md:flex-row md:space-x-6 md:space-y-0 md:overflow-x-auto
          md:scrollbar-thin md:scrollbar-thumb-indigo-300 md:scrollbar-track-indigo-100
        "
      >
        {supplyChainSteps.map(
          ({ id, icon, title, description, bgColor }, index) => (
            <div
              key={id}
              className={`
                flex flex-col justify-between items-center
                w-full md:w-72 h-80 rounded-xl p-6 shadow-md text-center
                transition-all duration-700 ${bgColor}
                ${
                  visibleStep > index
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }
                hover:shadow-xl hover:scale-[1.03] cursor-pointer
              `}
              style={{ transitionDelay: `${index * 300}ms` }}
              tabIndex={0}
              role="group"
              aria-labelledby={`step-title-${id}`}
              aria-describedby={`step-desc-${id}`}
            >
              <div>
                <div className="mb-4 flex justify-center">{icon}</div>
                <h3
                  id={`step-title-${id}`}
                  className="font-semibold text-xl text-gray-900 mb-2"
                >
                  {title}
                </h3>
                <p
                  id={`step-desc-${id}`}
                  className="text-gray-700 text-sm leading-relaxed"
                >
                  {description}
                </p>
              </div>
            </div>
          )
        )}
      </div>

      <div className="mt-14 text-center">
        <button
          className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          onClick={handleButtonClick}
        >
          Pelajari Lebih Lanjut
        </button>
      </div>

      <ToastContainer />
    </section>
  );
};

export default SupplyChain;
