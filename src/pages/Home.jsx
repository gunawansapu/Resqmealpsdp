import React, { useState, useEffect, useRef,} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import EarthAnimation from "../assets/bumi.json"; // ganti sesuai path
import Lottie from "lottie-react";
import Delivery from "../assets/delivery.json";
import Donation from "../assets/donation.json";
import MarketPlace from "../assets/marketplace.json";
import Langganan from "../assets/Langganan.json";
import Limbah from "../assets/sustain.json";
import Eco from "../assets/eco.json";
import Anim1 from "../assets/global-delivery.json";
import Anim2 from "../assets/delivery-team.json";
import Anim3 from "../assets/deliveryman-riding-scooter.json";
import Anim4 from "../assets/delivery-service.json";
import { Typewriter } from 'react-simple-typewriter';

// Data slide untuk hero
const slides = [
  {
    title: "ResQMeal",
    subtitle:
      "Rescuing Meals, Nourishing Lives — Platform food hub untuk selamatkan makanan layak konsumsi",
    bg: "from-green-400 via-yellow-200 to-white",
    buttonText: "Jelajahi Sekarang",
    scrollToId: "produk-layanan",  // ini yang baru
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Food Hub Terintegrasi",
    subtitle:
      "Pusat sortir & distribusi makanan dari UMKM, restoran, dan supermarket.",
    bg: "from-green-300 via-green-200 to-white",
    buttonText: "Lihat Produk",
    link: "/marketplace",
    image:
      "https://awsimages.detik.net.id/community/media/visual/2024/09/01/milled-artisan-bakery-12.jpeg?w=1200",
  },
  {
    title: "Donasi Makanan",
    subtitle:
      "Bantu sesama dengan menyumbangkan makanan ke komunitas dan kurir lokal.",
    bg: "from-yellow-200 via-green-100 to-white",
    buttonText: "Donasi Sekarang",
    link: "/donasi",
    image:
      "https://png.pngtree.com/png-vector/20220526/ourmid/pngtree-charity-and-donating-food-concept-png-image_4740793.png",
  },
];

// Reusable Components
const Button = ({ children, className, ...props }) => (
  <button
    className={`px-6 py-3 rounded-md font-semibold transition-colors duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children, className }) => (
  <div className={`shadow-md rounded-lg bg-white ${className}`}>{children}</div>
);

const CardContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const Home = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // Auto Slide
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Statistik Impact
  const statsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [stats, setStats] = useState({
    makanan: 0,
    mitra: 0,
    komunitas: 0,
    donasi: 0,
  });

  const finalStats = {
    makanan: 12500,
    mitra: 340,
    komunitas: 150,
    donasi: 9800,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (hasAnimated) {
      const duration = 1500;
      const fps = 60;
      const totalFrames = Math.round((duration / 1000) * fps);
      let frame = 0;

      const interval = setInterval(() => {
        frame++;
        setStats({
          makanan: Math.round((finalStats.makanan * frame) / totalFrames),
          mitra: Math.round((finalStats.mitra * frame) / totalFrames),
          komunitas: Math.round((finalStats.komunitas * frame) / totalFrames),
          donasi: Math.round((finalStats.donasi * frame) / totalFrames),
        });

        if (frame === totalFrames) clearInterval(interval);
      }, duration / totalFrames);
    }
  }, [hasAnimated]);

  
  // Di bagian atas file Home.jsx
const sectionAnim = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// Variants motion
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const textAnim = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: [0, -10, 0],  // animasi naik turun berulang
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.3 },
  },
};

const handleScrollToProduk = () => {
  const el = document.getElementById('produk-layanan');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};




  return (
    <div>
      <main className="bg-white min-h-screen">
       {/* HERO SLIDER */}
<section
  className={`relative h-screen flex items-center justify-center overflow-hidden px-6 md:px-20 text-green-900 bg-gradient-to-r ${slides[current].bg}`}
>
  <AnimatePresence initial={true} mode="wait">
    {slides.map(
      (slide, i) =>
        i === current && (
          <motion.div
            key={slide.title}
            initial={{ opacity: 0, rotateY: 90, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, rotateY: -90, scale: 0.8, x: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl"
          >
            <div className="md:w-1/2 text-center md:text-left">
              <motion.h1
                className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 10,
                  delay: 0.2,
                }}
              >
                {slide.title}
              </motion.h1>

              <motion.p
                className="mt-6 text-lg md:text-xl font-light drop-shadow-md max-w-md mx-auto md:mx-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {slide.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
              <Button
  onClick={() => {
    if (slide.scrollToId) {
      const el = document.getElementById(slide.scrollToId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(slide.link);
    }
  }}
  className="mt-8 bg-green-700 text-white hover:bg-green-800 shadow-lg px-8 py-3"
>
  {slide.buttonText}
</Button>

              </motion.div>
            </div>

            <motion.div
              className="md:w-1/2 mt-10 md:mt-0 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="rounded-xl shadow-lg max-w-md w-full object-cover"
              />
            </motion.div>
          </motion.div>
        )
    )}
  </AnimatePresence>

  {/* Kontrol Navigasi Slider */}
  <button
    onClick={prevSlide}
    aria-label="Previous Slide"
    className="absolute left-6 top-1/2 -translate-y-1/2 bg-green-600 rounded-full p-3 text-white hover:bg-green-700 shadow-md transition"
  >
    &#8592;
  </button>
  <button
    onClick={nextSlide}
    aria-label="Next Slide"
    className="absolute right-6 top-1/2 -translate-y-1/2 bg-green-600 rounded-full p-3 text-white hover:bg-green-700 shadow-md transition"
  >
    &#8594;
  </button>

          {/* Dot Navigasi */}
          <div className="absolute bottom-10 flex justify-center w-full space-x-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                  i === current ? "bg-green-700" : "bg-green-300 hover:bg-green-500"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
           </section>

          {/* Product Layanan*/}
<section
  id="produk-layanan"
  className="relative overflow-hidden bg-gradient-to-b from-white to-green-50 py-20"
>
  <motion.div
    className="text-center mb-16 px-4"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <h2 className="text-4xl font-bold text-green-800">
      Produk dan Layanan Kami
    </h2>
    <p className="text-gray-600 mt-3 text-lg">
      Solusi terintegrasi untuk makanan berlebih
    </p>
  </motion.div>

  <div className="relative z-10 flex flex-col items-center gap-16 px-6 md:px-20">
    {[
      {
        title: "🥦 Food Hub Terintegrasi",
        desc: "Pusat sortir & distribusi makanan dari UMKM, restoran, dan supermarket.",
        animation: EarthAnimation,
      },
      {
        title: "🛒 Marketplace Makanan Sisa",
        desc: "Jual beli makanan layak konsumsi langsung dari mitra terpercaya.",
        animation: MarketPlace,
      },
      {
        title: "🛵 Pengantaran via Ojek Online",
        desc: "Makanan diantar cepat dan aman ke pelanggan.",
        animation: Delivery, // Ganti sesuai animasi
      },
      {
        title: "❤️ Opsi Donasi Makanan",
        desc: "Bantu sesama dengan menyumbangkan makanan ke komunitas.",
        animation: Donation, // Ganti sesuai animasi
      },
      {
        title: "📦 Program Berlangganan",
        desc: "Paket hemat makanan berkualitas untuk pelanggan tetap.",
        animation: Langganan, // Ganti sesuai animasi
      },
      {
        title: "🌱 Pengolahan Limbah",
        desc: "Makanan tak layak jadi pupuk organik ramah lingkungan.",
        animation: Limbah, // Ganti sesuai animasi
      },
    ].map((item, i) => (
      <motion.div
        key={i}
        className="flex flex-col items-center text-center bg-white rounded-2xl shadow-lg px-8 py-10 w-full max-w-2xl hover:shadow-xl transition-shadow duration-300"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: i * 0.1 }}
        viewport={{ once: true }}
      >
        <Lottie animationData={item.animation} loop={true} className="w-40 h-40 mb-6" />
        <h3 className="text-2xl font-semibold text-green-700">{item.title}</h3>
        <p className="text-gray-600 mt-2">{item.desc}</p>
      </motion.div>
    ))}
  </div>
</section>


{/* Kenapa ResQMeal */}
{/* Kenapa ResQMeal */}
<section className="bg-green-100 py-20 px-6 md:px-20">
      {/* Judul dan deskripsi */}
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl font-bold text-green-800"
          variants={itemVariants}
        >
          Kenapa ResQMeal? 🌱
        </motion.h2>
        <motion.p
          className="text-gray-700 mt-2 max-w-xl mx-auto"
          variants={itemVariants}
        >
          Kami bukan sekadar aplikasi makanan sisa — kami adalah ekosistem
          penyelamatan makanan yang efisien, berkelanjutan, dan berdampak sosial.
        </motion.p>
      </motion.div>

      {/* Fitur-fitur */}
      <motion.div
        className="grid md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={containerVariants}
      >
        {[
          "Terintegrasi dengan ojek online",
          "Zero waste & pemrosesan limbah makanan",
          "Food hub fisik di tiap kota operasi",
          "Donasi makanan terverifikasi",
          "Mitra UMKM dan bisnis lokal",
          "Berdayakan komunitas & kurir lokal",
        ].map((feature, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-lg transition"
            variants={itemVariants}
          >
            <p className="text-green-700 font-medium text-base">{feature}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Animasi Lottie di bawah */}
      <div className="mt-16 flex justify-center">
        <Lottie
          animationData={Eco}
          loop
          autoplay
          style={{ width: "400px", height: "400px" }}
        />
      </div>
    </section>

{/* Lottie Animasi Horizontal dalam Card 3D + Typewriter */}
<div className="flex flex-wrap justify-center gap-8 px-4 py-12 bg-white">
  {[
    { anim: Anim1, words: ['Pemrosesan Limbah', 'Zero Waste', 'Ramah Lingkungan'] },
    { anim: Anim2, words: ['Distribusi Makanan', 'Cepat & Efisien', 'Aman Terkirim'] },
    { anim: Anim3, words: ['UMKM Lokal', 'Peluang Usaha', 'Bisnis Mandiri'] },
    { anim: Anim4, words: ['Komunitas Sosial', 'Donasi Makanan', 'Kebaikan Bersama'] },
  ].map((item, i) => (
    <div
      key={i}
      className="relative w-40 sm:w-52 md:w-60 p-1 rounded-2xl group perspective"
    >
      <div className="bg-white rounded-2xl shadow-xl transform group-hover:rotate-[1deg] group-hover:scale-[1.03] transition duration-500 ease-out">
        {/* Border animasi */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-green-400 animate-borderPulse pointer-events-none"></div>

        <div className="p-4 flex flex-col items-center">
          <Lottie animationData={item.anim} loop autoplay className="w-28 sm:w-36 md:w-44" />
          <p className="mt-4 text-green-700 text-center font-semibold text-sm sm:text-base">
            <Typewriter
              words={item.words}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1500}
            />
          </p>
        </div>
      </div>
    </div>
  ))}
</div>



        {/* Map Lokasi */}
        <section className="py-3 px-6 md:px-20 bg-white">
    <motion.section
  className="py-20 px-6 md:px-20 bg-white"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.3 }}
  variants={fadeUpVariants}
>
  <h2 className="text-3xl font-bold text-green-800 text-center mb-10">
    Lokasi Food Hub Kami
  </h2>
  <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg border border-green-300">
    <iframe
      title="Lokasi Food Hub ResQMeal"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.521365834669!2d110.42281711524769!3d-7.005152794890182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708bbd3a57ebed%3A0xf7ab1ef60a051c89!2sSemarang%20City%20Center!5e0!3m2!1sen!2sid!4v1686345677902!5m2!1sen!2sid"
      width="100%"
      height="100%"
      loading="lazy"
      className="border-0"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
  </motion.section>
        </section>

{/* Testimoni */}
<section className="py-20 bg-green-50 px-6 md:px-20">
  <div className="text-center mb-12">
    <h2 className="text-3xl font-semibold text-green-800">Apa Kata Mereka?</h2>
    <p className="text-gray-600 mt-2 max-w-xl mx-auto">
      Komentar dari pelanggan dan mitra kami.
    </p>
  </div>

  {/* Testimoni Pelanggan */}
  <div className="mb-16">
    <h3 className="text-2xl font-semibold text-green-700 mb-8 text-center">Pelanggan</h3>
    <div className="grid md:grid-cols-3 gap-8">
      {[
       {
    name: "Siti Nurhaliza",
    text: "ResQMeal sangat membantu kami mengurangi limbah makanan sekaligus berdonasi untuk yang membutuhkan.",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Yulia Rahma",
    text: "Platformnya mudah digunakan, dan saya bangga bisa ikut mengurangi sampah makanan.",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Andi Wijaya",
    text: "Saya sangat puas dengan layanan pengantaran cepat dan kualitas makanannya selalu terjaga.",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
      ].map((testimonial, i) => (
        <motion.div
          key={i}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}  // animasi ulang tiap scroll
          transition={{ duration: 0.6, delay: i * 0.2 }}
          className="flex"
        >
          <Card className="p-6 rounded-2xl bg-white shadow-md flex flex-col justify-between w-full min-h-[280px]">
            <div className="flex flex-col items-center mb-4">
              <img
                src={testimonial.photo}
                alt={`${testimonial.name} photo`}
                className="w-16 h-16 rounded-full object-cover mb-2"
              />
              <p className="text-green-700 font-semibold">{testimonial.name}</p>
            </div>
            <p className="text-gray-700 italic text-center flex-grow">"{testimonial.text}"</p>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>

  {/* Testimoni Mitra */}
  <div>
    <h3 className="text-2xl font-semibold text-green-700 mb-8 text-center">Mitra</h3>
    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
    name: "Budi Santoso",
    text: "Integrasi dengan ojek online membuat pengiriman jadi sangat mudah dan cepat!",
    photo: "https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww",
  },
  {
    name: "Rina Putri",
    text: "Pengantaran lewat ojek online bikin makanan sampai dengan kondisi tetap segar dan tepat waktu.",
    photo: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    name: "Agus Wijaya",
    text: "Layanan ojek online ResQMeal sangat membantu saya yang butuh pengiriman cepat setiap hari.",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
  },
      ].map((testimonial, i) => (
        <motion.div
          key={i}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: i * 0.2 }}
          className="flex"
        >
          <Card className="p-6 rounded-2xl bg-white shadow-md flex flex-col justify-between w-full min-h-[280px]">
            <div className="flex flex-col items-center mb-4">
              <img
                src={testimonial.photo}
                alt={`${testimonial.name} photo`}
                className="w-16 h-16 rounded-full object-cover mb-2"
              />
              <p className="text-green-700 font-semibold">{testimonial.name}</p>
            </div>
            <p className="text-gray-700 italic text-center flex-grow">"{testimonial.text}"</p>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
</section>
{/* Statistik Impact */}
<section className="bg-green-50 py-20 px-6 md:px-20">
  <motion.div
    className="text-center mb-12"
    variants={textAnim}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, amount: 0.3 }}
  >
    <h2 className="text-3xl font-bold text-green-800">
      Statistik Impact ResQMeal
    </h2>
    <p className="text-gray-700 mt-2 max-w-xl mx-auto">
      Data pencapaian kami yang menunjukkan kontribusi nyata dalam penyelamatan makanan dan sosial.
    </p>
  </motion.div>

  <div
    className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center"
    ref={statsRef}
  >
    {[
      { label: "Makanan Terselamatkan (kg)", value: stats.makanan },
      { label: "Mitra UMKM", value: stats.mitra },
      { label: "Komunitas Terbantu", value: stats.komunitas },
      { label: "Paket Donasi Tersalurkan", value: stats.donasi },
    ].map((item, i) => (
      <div key={i} className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-3xl font-bold text-green-700">
          <CountUp
            end={item.value}
            duration={2}
            separator=","
            enableScrollSpy={true}
            scrollSpyOnce={false}
          />
        </h3>
        <p className="text-green-800 mt-2">{item.label}</p>
      </div>
    ))}
  </div>
</section>

        {/* FAQ */}
        <section className="py-20 px-6 md:px-20 bg-white max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-green-800 text-center mb-12">
            Pertanyaan Umum (FAQ)
          </h2>
          <div className="space-y-6">
            {[
              {
                question: "Bagaimana cara bergabung sebagai mitra?",
                answer:
                  "Anda dapat mendaftar melalui halaman pendaftaran mitra di aplikasi kami dan mengikuti proses verifikasi.",
              },
              {
                question: "Apakah makanan yang didonasikan aman dikonsumsi?",
                answer:
                  "Ya, kami melakukan proses sortir ketat untuk memastikan makanan layak konsumsi dan aman sebelum distribusi.",
              },
              {
                question: "Bagaimana cara mengajukan donasi makanan?",
                answer:
                  "Anda dapat menggunakan fitur donasi makanan di aplikasi atau menghubungi komunitas lokal yang bekerja sama dengan kami.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="border border-green-200 rounded-lg p-4 hover:shadow-md transition"
              >
                <summary className="font-semibold text-green-700 cursor-pointer">
                  {faq.question}
                </summary>
                <p className="mt-2 text-gray-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
