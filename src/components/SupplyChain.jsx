import React, { useEffect, useState } from 'react';
import {
  FaClipboardList,
  FaUserCheck,
  FaTruckLoading,
  FaWarehouse,
  FaShippingFast,
} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const supplyChainSteps = [
  {
    id: 1,
    icon: <FaClipboardList size={36} className="text-indigo-600" />,
    title: 'Perencanaan Tepat Sasaran',
    description:
      'Merencanakan pengumpulan & distribusi makanan sesuai permintaan komunitas untuk mengurangi overstock.',
    bgColor: 'bg-indigo-50',
  },
  {
    id: 2,
    icon: <FaUserCheck size={36} className="text-green-600" />,
    title: 'Seleksi Mitra Strategis',
    description:
      'Bekerjasama dengan restoran, UMKM, & supermarket yang memiliki standar keamanan pangan tinggi.',
    bgColor: 'bg-green-50',
  },
  {
    id: 3,
    icon: <FaTruckLoading size={36} className="text-yellow-600" />,
    title: 'Pengumpulan & Logistik',
    description:
      'Pengantaran cepat dari mitra ke pusat sortir untuk menjaga kesegaran dan kualitas.',
    bgColor: 'bg-yellow-50',
  },
  {
    id: 4,
    icon: <FaWarehouse size={36} className="text-blue-600" />,
    title: 'Sortir & Penyimpanan',
    description:
      'Penyortiran ketat & penyimpanan bersih sesuai standar untuk menjaga keamanan makanan.',
    bgColor: 'bg-blue-50',
  },
  {
    id: 5,
    icon: <FaShippingFast size={36} className="text-red-600" />,
    title: 'Distribusi Akhir',
    description:
      'Pengiriman cepat ke pelanggan & komunitas, memastikan produk tiba tepat waktu dan aman.',
    bgColor: 'bg-red-50',
  },
];

const SupplyChain = () => {
  const [visibleStep, setVisibleStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleStep((prev) =>
        prev < supplyChainSteps.length ? prev + 1 : prev
      );
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    toast.info('Rantai pasok kami mengutamakan efisiensi & keamanan pangan!', {
      position: 'top-center',
      autoClose: 3000,
    });
  };

  return (
    <section
      id="supply-chain"
      className="py-20 px-6 bg-gray-100"
      aria-label="Rantai Pasok ResQMeal"
    >
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
          Proses Rantai Pasok
        </h2>
        <p className="text-gray-600 text-lg">
          Menjamin keamanan, efisiensi, dan dampak sosial dari hulu ke hilir.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-6 overflow-x-auto space-y-6 md:space-y-0 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100">
        {supplyChainSteps.map((step, idx) => (
          <div
            key={step.id}
            className={`flex-shrink-0 w-full sm:w-64 bg-white rounded-3xl p-6 shadow-md transform transition-all duration-700 ${
              visibleStep > idx
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            } hover:shadow-xl hover:translate-y-1 cursor-pointer`}
            style={{ transitionDelay: `${idx * 200}ms` }}
            tabIndex={0}
            aria-labelledby={`step-${step.id}-title`}
          >
            <div className={`${step.bgColor} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
              {step.icon}
            </div>
            <h3 id={`step-${step.id}-title`} className="text-xl font-semibold text-gray-800 mb-2 text-center">
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm text-center">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={handleClick}
          className="inline-block px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          Pelajari Lebih Lanjut
        </button>
      </div>
      <ToastContainer />
    </section>
  );
};

export default SupplyChain;
