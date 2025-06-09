import React, { useEffect } from 'react';
import AOS from 'aos';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'aos/dist/aos.css';
import 'swiper/css';

const team = [
  {
    name: 'Yuwanandra ',
    title: 'CEO & Founder',
    image: 'https://raw.githubusercontent.com/gunawansapu/gunawan/main/yuwan.jpg',
  },
  {
    name: 'Gerry',
    title: 'Chief Operating Officer',
    image: 'https://raw.githubusercontent.com/gunawansapu/gunawan/main/gerry.jpg',
  },
  {
    name: 'Ariq',
    title: 'Chief Financial Officer',
    image: 'https://raw.githubusercontent.com/gunawansapu/gunawan/main/arqi.jpg',
  },
  {
    name: 'Gunawan',
    title: 'Chief Technology Officer',
    image: 'https://raw.githubusercontent.com/gunawansapu/gunawan/main/gunawan.jpg',
  },
  {
    name: 'Ardit',
    title: 'Head of Warehouse',
    image: 'https://raw.githubusercontent.com/gunawansapu/gunawan/main/ardit.jpg',
  },
];


export default function About() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="bg-white py-20 px-6 md:px-12 overflow-x-hidden">
      {/* Tentang */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="flex justify-center">
          <img
            src="https://raw.githubusercontent.com/gunawansapu/gunawan/main/resqmeal.jpg"
            alt="Tentang ResQMeal"
            className="rounded-2xl shadow-2xl w-full max-w-md transition-opacity duration-500"
            loading="lazy"
          />
        </div>

        <div className="text-center md:text-left" data-aos="fade-left">
          <h2 className="text-4xl font-extrabold text-green-700 mb-4">
            Tentang <span className="text-green-900">ResQMeal</span>
          </h2>
          <p className="text-gray-700 text-lg mb-4 leading-relaxed">
            ResQMeal adalah platform penyelamatan makanan yang bertujuan untuk mengurangi pemborosan makanan dari restoran dan UMKM, serta menyalurkannya secara aman kepada masyarakat yang membutuhkan.
          </p>
          <p className="text-gray-600 text-md">
            Kami percaya bahwa setiap piring makanan yang diselamatkan adalah langkah kecil menuju masa depan yang lebih berkelanjutan, manusiawi, dan adil.
          </p>
        </div>
      </div>

      {/* Tim Kami */}
      <div className="max-w-7xl mx-auto text-center mb-10" data-aos="fade-up">
        <h3 className="text-3xl font-bold text-green-700 mb-4">Tim Kami</h3>
        <p className="text-gray-600 max-w-xl mx-auto">
          Tim berdedikasi yang bekerja untuk mewujudkan visi ResQMeal dalam menyelamatkan makanan dan mendistribusikannya secara adil.
        </p>
      </div>

      {/* Slider Tim */}
      <div className="max-w-6xl mx-auto" data-aos="zoom-in-up">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
          speed={1000}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {team.map((person, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-xl text-center shadow-lg hover:shadow-2xl p-6 transition duration-300 hover:scale-105 active:scale-100">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-green-200"
                  loading="lazy"
                />
                <h4 className="text-lg font-semibold text-gray-800">{person.name}</h4>
                <p className="text-sm text-green-700">{person.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}