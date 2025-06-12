import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination as SwiperPagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const promoImages = [
  'https://marketplace.canva.com/EAGZb85YAWo/1/0/1600w/canva-spanduk-warung-makan-mie-ayam-modern-meriah-merah-kuning-8aUypq8ddes.jpg',
  'https://raw.githubusercontent.com/gunawansapu/gunawan/main/nasgor%20promo.png',
  'https://asset-a.grid.id/crop/0x0:0x0/x/photo/2023/02/16/stylo-januari-2023-landscape-20230216022638.jpg',
  'https://mykohotel.com/wp-content/uploads/2024/10/DH-Bolu__landscape-792x446.jpg'
];

const productsData = [
  { id: 1, name: 'Roti Bakkery', category: 'Makanan', price: 12000, description: 'Bakkery Murah Meriah.', imageUrl: 'https://awsimages.detik.net.id/community/media/visual/2024/08/30/artisan-bakery-3_43.jpeg?w=650' },
  { id: 2, name: 'Minuman Detoks', category: 'Minuman', price: 5000, description: 'Minuman detoks alami untuk kesehatan tubuh.', imageUrl: 'https://kehamilansehat.com/wp-content/uploads/2025/03/Buka-Puasa-dengan-Jus-Buah-Hati-Hati-Bisa-Bikin-Mom-Menyesal.jpg' },
  { id: 3, name: 'Snack Sehat', category: 'Makanan', price: 15000, description: 'Snack ringan tanpa bahan pengawet.', imageUrl: 'https://main.mobile.doss.co.id/storage/uploads/2023/10/photo-1546069901-ba9599a7e63c.webp' },
  { id: 4, name: 'Vitamin C Booster', category: 'Suplemen', price: 10000, description: 'Vitamin C booster.', imageUrl: 'https://www.uni-health.com/pub/media/catalog/product/cache/bac7b768ee0296ed2137f1171d0548da/s/i/single_product_hf0036.png' },
  { id: 5, name: 'Nasi Goreng', category: 'Makanan', price: 10000, description: 'Nasi goreng bintang lima.', imageUrl: 'https://aslimasako.com/storage/post/new-title-29022024-065154.jpg' },
  { id: 6, name: 'Air Mineral Premium', category: 'Minuman', price: 15000, description: 'Air mineral premium.', imageUrl: 'https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p1/294/2025/02/20/amdk-equil-1235144172.jpg' },
  { id: 7, name: 'Risol', category: 'Makanan', price: 5000, description: 'Risol mayo, sayur dan rebung enak murah.', imageUrl: 'https://www.masakapahariini.com/wp-content/uploads/2023/06/risoles-ragout.jpeg' },
  { id: 8, name: 'Sate Ayam', category: 'Makanan', price: 10000, description: 'Sate ayam enak lezat murah berkualitas.', imageUrl: 'https://www.dapurkobe.co.id/wp-content/uploads/sate-ayam.jpg' },
  { id: 9, name: 'Ketoprak', category: 'Makanan', price: 8000, description: 'Ketoprak enak dengan bumbu kacang.', imageUrl: 'https://asset.kompas.com/crops/H84-oywnJbx-F-88tV7RV9xbi4E=/0x0:739x493/1200x800/data/photo/2020/01/29/5e318845429db.jpg' },
  { id: 10, name: 'Dimsum', category: 'Makanan', price: 4000, description: 'Dimsum enak lembut daging ayam.', imageUrl: 'https://cdn.idntimes.com/content-images/community/2024/06/img-20240605-192130-2b64a83f842f8dac9ad37a9c9fa77858.jpg' },
];

const categories = ['Semua', 'Makanan', 'Minuman', 'Suplemen'];
const itemsPerPage = 6;

const MarketPlace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Ambil state dari URL
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'Semua');
  const [sortPrice, setSortPrice] = useState(searchParams.get('sort') || '');
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  // Scroll ke atas setiap page atau filter berubah
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, searchTerm, selectedCategory, sortPrice]);

  // Update URL params setiap state berubah
  useEffect(() => {
    const params = {
      search: searchTerm,
      category: selectedCategory,
      sort: sortPrice,
      page: currentPage
    };
    setSearchParams(params);
  }, [searchTerm, selectedCategory, sortPrice, currentPage, setSearchParams]);

  const filteredProducts = useMemo(() => {
    let filtered = [...productsData];
    if (selectedCategory !== 'Semua') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    if (searchTerm.trim()) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (sortPrice === 'asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortPrice === 'desc') {
      filtered.sort((a, b) => b.price - a.price);
    }
    return filtered;
  }, [selectedCategory, searchTerm, sortPrice]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold text-center mb-10 text-green-700">Marketplace <span className="text-green-900">ResQMeal</span></h2>

      {/* Promo Slider */}
      <div className="mb-8">
        <Swiper
          modules={[Autoplay, Navigation, SwiperPagination]}
          spaceBetween={20}
          slidesPerView={1}
          loop
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
        >
          {promoImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img src={img} alt={`Promo ${idx}`} className="rounded-xl shadow-lg w-full h-56 object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Filter & Sort */}
      <div className="flex flex-col md:flex-row md:justify-between mb-8 gap-4">
        <input
          type="search"
          placeholder="Cari produk..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          className="flex-grow px-4 py-2 border rounded-md shadow focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <select
          value={selectedCategory}
          onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
          className="px-4 py-2 border rounded-md shadow focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        <select
          value={sortPrice}
          onChange={(e) => { setSortPrice(e.target.value); setCurrentPage(1); }}
          className="px-4 py-2 border rounded-md shadow focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="">Urutkan Harga</option>
          <option value="asc">Termurah</option>
          <option value="desc">Termahal</option>
        </select>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayedProducts.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500">Produk tidak ditemukan.</div>
        ) : (
          displayedProducts.map(({ id, name, price, description, imageUrl }) => (
            <div key={id} className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition p-4 flex flex-col" data-aos="fade-up">
              <img src={imageUrl} alt={name} className="rounded-2xl h-56 w-full object-cover mb-4 transform hover:scale-105 transition duration-300" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{name}</h3>
              <p className="text-gray-600 flex-grow">{description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-semibold text-green-700">Rp{price.toLocaleString()}</span>
                <button
                  type="button"
                  onClick={() => navigate(`/produk/${id}`)}
                  className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded-xl shadow-lg hover:from-green-600 hover:to-green-800 transition duration-300"
                >
                  Beli Sekarang
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 gap-2">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-3 py-1 rounded-md bg-white border shadow disabled:opacity-50">
            <ChevronLeft />
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button key={idx} onClick={() => setCurrentPage(idx + 1)} className={`px-4 py-2 rounded-md ${currentPage === idx + 1 ? 'bg-green-600 text-white' : 'bg-white border shadow'}`}>
              {idx + 1}
            </button>
          ))}
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-1 rounded-md bg-white border shadow disabled:opacity-50">
            <ChevronRight />
          </button>
        </div>
      )}
    </section>
  );
};

export default MarketPlace;
