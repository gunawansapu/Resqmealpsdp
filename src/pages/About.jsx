import React, { useEffect } from 'react';
import AOS from 'aos';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'aos/dist/aos.css';
import 'swiper/css';

const team = [
  { name: 'Yuwanandra', title: 'CEO & Founder', image: 'https://raw.githubusercontent.com/gunawansapu/gunawan/main/yuwan.jpg' },
  { name: 'Gerry', title: 'Chief Operating Officer', image: 'https://raw.githubusercontent.com/gunawansapu/gunawan/main/gerry.jpg' },
  { name: 'Ariq', title: 'Chief Financial Officer', image: 'https://raw.githubusercontent.com/gunawansapu/gunawan/main/arqi.jpg' },
  { name: 'Gunawan', title: 'Chief Technology Officer', image: 'https://raw.githubusercontent.com/gunawansapu/gunawan/main/gunawan.jpg' },
  { name: 'Ardit', title: 'Head of Warehouse', image: 'https://raw.githubusercontent.com/gunawansapu/gunawan/main/ardit.jpg' },
];

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <section className="bg-gradient-to-b from-white to-green-50 py-32 px-6 md:px-20 overflow-hidden">

      {/* Tentang */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center mb-32">
        <div className="flex justify-center" data-aos="fade-right">
          <div className="relative group transition-transform duration-500">
            <img
              src="https://raw.githubusercontent.com/gunawansapu/gunawan/main/resqmeal.jpg"
              alt="Tentang ResQMeal"
              className="rounded-3xl shadow-2xl w-full max-w-md transform group-hover:scale-105 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
          </div>
        </div>

        <div className="text-center md:text-left" data-aos="fade-left">
  <h2 className="text-5xl font-extrabold text-green-800 leading-tight mb-8">
    Tentang <span className="text-green-900">ResQMeal</span>
  </h2>
  <p className="text-gray-700 text-xl mb-6 leading-relaxed tracking-wide">
    ResQMeal adalah platform penyelamatan makanan yang bertujuan mengurangi pemborosan makanan dari restoran dan UMKM, serta menyalurkannya secara aman kepada masyarakat yang membutuhkan.
  </p>
  <p className="text-gray-600 text-lg leading-relaxed">
    Kami percaya setiap piring makanan yang diselamatkan adalah langkah kecil menuju masa depan yang lebih berkelanjutan, manusiawi, dan adil.
  </p>
</div>

      </div>

      {/* Tim Kami */}
      <div className="max-w-7xl mx-auto text-center mb-24" data-aos="fade-up">
        <h3 className="text-4xl font-bold text-green-700 mb-8">Tim Kami</h3>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          Tim berdedikasi yang bekerja profesional & berkomitmen untuk mewujudkan visi besar ResQMeal dalam menyelamatkan makanan & mendistribusikannya secara adil.
        </p>
      </div>

      {/* Slider Tim */}
      <div className="max-w-6xl mx-auto" data-aos="zoom-in">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          speed={900}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {team.map((person, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl text-center shadow-lg hover:shadow-2xl p-10 transition-all duration-500 hover:scale-[1.05] border border-green-100 group">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full rounded-full object-cover border-4 border-green-300 shadow-md"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-full border-4 border-white opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-1">{person.name}</h4>
                <p className="text-sm text-green-700 font-medium">{person.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </section>
  );
}
