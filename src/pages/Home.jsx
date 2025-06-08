import React, { useState, useEffect, useRef, } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: "ResQMeal",
    subtitle: "Rescuing Meals, Nourishing Lives — Platform food hub untuk selamatkan makanan layak konsumsi",
    bg: "from-green-400 via-yellow-200 to-white",
    buttonText: "Jelajahi Sekarang",
    link:"/",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Food Hub Terintegrasi",
    subtitle: "Pusat sortir & distribusi makanan dari UMKM, restoran, dan supermarket.",
    bg: "from-green-300 via-green-200 to-white",
    buttonText: "Lihat Produk",
    link:"/marketplace",
    image: "https://awsimages.detik.net.id/community/media/visual/2024/09/01/milled-artisan-bakery-12.jpeg?w=1200",
  },
  {
    title: "Donasi Makanan",
    subtitle: "Bantu sesama dengan menyumbangkan makanan ke komunitas dan kurir lokal.",
    bg: "from-yellow-200 via-green-100 to-white",
    buttonText: "Donasi Sekarang",
    link:"/donasi",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
  },
];


const Button = ({ children, className, ...props }) => (
  <button className={`px-6 py-3 rounded-md font-semibold transition-colors duration-300 ${className}`} {...props}>
    {children}
  </button>
);

const Card = ({ children, className }) => (
  <div className={`shadow-md rounded-lg bg-white ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={className}>
    {children}
  </div>
);

const Home = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate(); // ✅ Dipanggil di dalam komponen

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [current]);

  // Manual next/prev slide
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

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


  return (
    <div>
      <main className="bg-white min-h-screen">
        {/* Jumbotron Slider 3D - side by side teks & gambar */}
        <section
          className={`relative h-screen flex items-center justify-center overflow-hidden px-6 md:px-20 text-green-900 bg-gradient-to-r ${slides[current].bg}`}
        >
             <AnimatePresence initial={false} mode="wait">
      {slides.map((slide, i) =>
        i === current ? (
          <motion.div
            key={slide.title}
            initial={{ opacity: 0, rotateY: 90, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, rotateY: -90, scale: 0.8, x: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl"
          >
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="mt-6 text-lg md:text-xl font-light drop-shadow-md max-w-md mx-auto md:mx-0">
                {slide.subtitle}
              </p>
              <Button
                onClick={() => navigate(slide.link)}
                className="mt-8 bg-green-700 text-white hover:bg-green-800 shadow-lg px-8 py-3"
              >
                {slide.buttonText}
              </Button>
            </div>

            <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
              <img
                src={slide.image}
                alt={slide.title}
                className="rounded-xl shadow-lg max-w-md w-full object-cover"
              />
            </div>
          </motion.div>
        ) : null
      )}
    </AnimatePresence>

          {/* Controls */}
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

          {/* Pagination Dots */}
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

        {/* Produk dan Layanan */}
        <section className="py-20 bg-gray-50">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-green-800">
              Produk dan Layanan Kami
            </h2>
            <p className="text-gray-600 mt-2">Solusi terintegrasi untuk makanan berlebih</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-20">
            {[
              {
                title: "Food Hub Terintegrasi",
                desc: "Pusat sortir & distribusi makanan dari UMKM, restoran, dan supermarket."
              },
              {
                title: "Marketplace Makanan Sisa",
                desc: "Jual beli makanan layak konsumsi langsung dari mitra terpercaya."
              },
              {
                title: "Pengantaran via Ojek Online",
                desc: "Makanan diantar cepat dan aman ke pelanggan."
              },
              {
                title: "Opsi Donasi Makanan",
                desc: "Bantu sesama dengan menyumbangkan makanan ke komunitas."
              },
              {
                title: "Program Berlangganan",
                desc: "Paket hemat makanan berkualitas untuk pelanggan tetap."
              },
              {
                title: "Pengolahan Limbah",
                desc: "Makanan tak layak jadi pupuk organik ramah lingkungan."
              },
            ].map((item, i) => (
              <Card key={i} className="rounded-2xl shadow-md bg-white hover:scale-[1.03] transition-transform duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-green-700 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Kenapa ResQMeal */}
        <section className="bg-green-100 py-20 px-6 md:px-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800">Kenapa ResQMeal?</h2>
            <p className="text-gray-700 mt-2 max-w-xl mx-auto">
              Kami bukan sekadar aplikasi makanan sisa — kami adalah ekosistem penyelamatan makanan yang efisien, berkelanjutan, dan berdampak sosial.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Terintegrasi dengan ojek online",
              "Zero waste & pemrosesan limbah makanan",
              "Food hub fisik di tiap kota operasi",
              "Donasi makanan terverifikasi",
              "Mitra UMKM dan bisnis lokal",
              "Berdayakan komunitas & kurir lokal",
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-lg transition"
              >
                <p className="text-green-700 font-medium text-base">{feature}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Map Lokasi */}
        <section className="py-20 px-6 md:px-20 bg-white">
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
        </section>

        {/* Tambahan Konten baru */}

        {/* Testimoni */}
        <section className="py-20 bg-green-50 px-6 md:px-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-green-800">Apa Kata Mereka?</h2>
            <p className="text-gray-600 mt-2 max-w-xl mx-auto">
              Komentar dari pelanggan dan mitra kami.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Siti Nurhaliza",
                text: "ResQMeal sangat membantu kami mengurangi limbah makanan sekaligus berdonasi untuk yang membutuhkan.",
              },
              {
                name: "Budi Santoso",
                text: "Integrasi dengan ojek online membuat pengiriman jadi sangat mudah dan cepat!",
              },
              {
                name: "Yulia Rahma",
                text: "Platformnya mudah digunakan, dan saya bangga bisa ikut mengurangi sampah makanan.",
              },
            ].map((testimonial, i) => (
              <Card key={i} className="p-6 rounded-2xl bg-white shadow-md">
                <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                <p className="text-green-700 font-semibold text-right">- {testimonial.name}</p>
              </Card>
            ))}
          </div>
        </section>

         {/* Statistik Impact */}
        <section className="bg-green-50 py-20 px-6 md:px-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800">Statistik Impact ResQMeal</h2>
            <p className="text-gray-700 mt-2 max-w-xl mx-auto">
              Data pencapaian kami yang menunjukkan kontribusi nyata dalam penyelamatan makanan dan sosial.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center"
          ref={statsRef}
          >
           {[
  { label: "Makanan Terselamatkan (kg)", value: stats.makanan },
  { label: "Mitra UMKM", value: stats.mitra },
  { label: "Komunitas Terbantu", value: stats.komunitas },
  { label: "Paket Donasi Tersalurkan", value: stats.donasi },
].map((item, i) => (
  <div key={i} className="bg-white p-6 rounded-xl shadow-md">
    <h3 className="text-3xl font-bold text-green-700">{item.value.toLocaleString()}</h3>
    <p className="text-green-800 mt-2">{item.label}</p>
  </div>
))}

          </div>
        </section>

        {/* FAQ Singkat */}
        <section className="py-20 px-6 md:px-20 bg-white max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-green-800 text-center mb-12">Pertanyaan Umum (FAQ)</h2>
          <div className="space-y-6">
            {[
              {
                question: "Bagaimana cara bergabung sebagai mitra?",
                answer: "Anda dapat mendaftar melalui halaman pendaftaran mitra di aplikasi kami dan mengikuti proses verifikasi."
              },
              {
                question: "Apakah makanan yang didonasikan aman dikonsumsi?",
                answer: "Ya, kami melakukan proses sortir ketat untuk memastikan makanan layak konsumsi dan aman sebelum distribusi."
              },
              {
                question: "Bagaimana cara mengajukan donasi makanan?",
                answer: "Anda dapat menggunakan fitur donasi makanan di aplikasi atau menghubungi komunitas lokal yang bekerja sama dengan kami."
              },
            ].map((faq, i) => (
              <details key={i} className="border border-green-200 rounded-lg p-4 hover:shadow-md transition">
                <summary className="font-semibold text-green-700 cursor-pointer">{faq.question}</summary>
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
