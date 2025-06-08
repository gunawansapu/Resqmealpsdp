import React, { useState, useEffect } from 'react';
import { FaUtensils } from 'react-icons/fa';

const Hero = () => {
  // State loading saat klik button
  const [loading, setLoading] = useState(false);
  // State untuk animasi teks
  const [animate, setAnimate] = useState(false);

  // Trigger animasi saat mount
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Fungsi simulasi pesan
  const handleOrderClick = () => {
    setLoading(true);
    // Simulasi delay 2 detik
    setTimeout(() => {
      setLoading(false);
      alert('Terima kasih sudah memesan di ResQMeal!');
    }, 2000);
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(0,0,0,0.6), 
            rgba(0,0,0,0.6)
          ),
          url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1470&q=80')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      aria-label="Hero section ResQMeal"
    >
      {/* Container utama */}
      <div className="max-w-5xl text-center text-white z-10">
        {/* Judul utama dengan animasi */}
        <h1
          className={`text-6xl md:text-7xl font-extrabold mb-6 transform transition-all duration-1000 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          ResQMeal
        </h1>

        {/* Subjudul dengan highlight */}
        <p
          className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed font-light tracking-wide ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } transition-all duration-1000 delay-200`}
        >
          <span className="text-yellow-400 font-semibold">Makanan sehat & cepat</span> untuk
          menemani hari sibukmu. Pesan dengan mudah dan nikmati layanan kami tanpa repot.
        </p>

        {/* Call to action tombol */}
        <div
          className={`inline-flex items-center justify-center space-x-3 bg-yellow-400 text-black font-semibold rounded-full px-10 py-4 cursor-pointer select-none
            hover:bg-yellow-300 active:scale-95 transition-transform duration-150
            ${
              loading ? 'cursor-not-allowed opacity-80' : 'cursor-pointer opacity-100'
            }
            transform
          `}
          onClick={() => {
            if (!loading) handleOrderClick();
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !loading) handleOrderClick();
          }}
          aria-busy={loading}
          aria-label="Pesan sekarang ResQMeal"
        >
          <FaUtensils size={22} />
          <span>{loading ? 'Memproses...' : 'Pesan Sekarang'}</span>
          {loading && (
            <svg
              className="animate-spin ml-3 h-5 w-5 text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
              ></path>
            </svg>
          )}
        </div>

        {/* Additional tagline */}
        <p
          className={`mt-12 text-sm md:text-base max-w-xl mx-auto opacity-75 ${
            animate ? 'opacity-75 translate-y-0' : 'opacity-0 translate-y-10'
          } transition-all duration-1000 delay-400`}
        >
          Pengantaran cepat & layanan ramah. <br />
          ResQMeal, partner makan sehat terbaik Anda.
        </p>
      </div>

      {/* Overlay gelap tambahan untuk kontras */}
      <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
    </section>
  );
};

export default Hero;
