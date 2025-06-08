import React, { useEffect, useState } from 'react';
import { FaTruckLoading, FaWarehouse, FaClipboardList, FaUserCheck, FaShippingFast } from 'react-icons/fa';

const supplyChainSteps = [
  {
    id: 1,
    icon: <FaClipboardList size={36} className="text-indigo-600" />,
    title: 'Perencanaan',
    description:
      'Menentukan kebutuhan bahan bangunan dan mempersiapkan jadwal pengadaan.',
    bgColor: 'bg-indigo-100',
  },
  {
    id: 2,
    icon: <FaUserCheck size={36} className="text-green-600" />,
    title: 'Pemilihan Supplier',
    description:
      'Memilih supplier yang terpercaya dan menyediakan bahan berkualitas.',
    bgColor: 'bg-green-100',
  },
  {
    id: 3,
    icon: <FaTruckLoading size={36} className="text-yellow-600" />,
    title: 'Pengadaan & Pengiriman',
    description:
      'Supplier mengirimkan bahan ke gudang toko secara tepat waktu.',
    bgColor: 'bg-yellow-100',
  },
  {
    id: 4,
    icon: <FaWarehouse size={36} className="text-blue-600" />,
    title: 'Penyimpanan di Gudang',
    description:
      'Bahan disimpan dengan aman di gudang sebelum dijual ke pelanggan.',
    bgColor: 'bg-blue-100',
  },
  {
    id: 5,
    icon: <FaShippingFast size={36} className="text-red-600" />,
    title: 'Distribusi ke Pelanggan',
    description:
      'Bahan bangunan dikirimkan ke pelanggan sesuai pesanan.',
    bgColor: 'bg-red-100',
  },
];

const SupplyChain = () => {
  const [visibleStep, setVisibleStep] = useState(0);

  useEffect(() => {
    // Animasi step muncul satu per satu tiap 600ms
    const interval = setInterval(() => {
      setVisibleStep((prev) =>
        prev < supplyChainSteps.length ? prev + 1 : prev
      );
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="supply-chain"
      className="py-16 px-6 bg-white max-w-7xl mx-auto"
      aria-label="Supply Chain Process"
    >
      <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
        Proses Rantai Pasok Toko Bangunan Didi Jaya
      </h2>

      <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0 justify-center items-start">
        {supplyChainSteps.map(({ id, icon, title, description, bgColor }, index) => (
          <div
            key={id}
            className={`flex flex-col items-center rounded-lg p-6 shadow-lg max-w-xs text-center transition-all duration-700
              ${
                visibleStep > index
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              } ${bgColor}`}
            style={{ transitionDelay: `${index * 300}ms` }}
            tabIndex={0}
            role="group"
            aria-labelledby={`step-title-${id}`}
            aria-describedby={`step-desc-${id}`}
          >
            <div className="mb-4">{icon}</div>
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
        ))}
      </div>

      <div className="mt-14 text-center">
        <button
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors duration-300"
          onClick={() => alert('Terima kasih telah mempelajari rantai pasok kami!')}
          aria-label="Pelajari Lebih Lanjut tentang Rantai Pasok"
        >
          Pelajari Lebih Lanjut
        </button>
      </div>
    </section>
  );
};

export default SupplyChain;
