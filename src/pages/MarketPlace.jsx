import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const promoImages = [
  'https://marketplace.canva.com/EAGZb85YAWo/1/0/1600w/canva-spanduk-warung-makan-mie-ayam-modern-meriah-merah-kuning-8aUypq8ddes.jpg',
  'https://static1.squarespace.com/static/5a5dbe4632601eb31977f947/5a5dbe9653450ab899649d1f/62fb321d8e7ca70722113aa3/1660630864601/Diskon-Merdeka_Landscape.jpg?format=1500w',
  'https://asset-a.grid.id/crop/0x0:0x0/x/photo/2023/02/16/stylo-januari-2023-landscape-20230216022638.jpg',
  'https://mykohotel.com/wp-content/uploads/2024/10/DH-Bolu__landscape-792x446.jpg'
];

const productsData = [
  {
    id: 1,
    name: 'Roti Bakkery',
    category: 'Makanan',
    price: 12000,
    description: 'Bakkery Murah Meriah.',
    imageUrl: 'https://awsimages.detik.net.id/community/media/visual/2024/08/30/artisan-bakery-3_43.jpeg?w=650',
  },
  {
    id: 2,
    name: 'Minuman Detoks',
    category: 'Minuman',
    price: 5000,
    description: 'Minuman detoks alami untuk kesehatan tubuh.',
    imageUrl: 'https://kehamilansehat.com/wp-content/uploads/2025/03/Buka-Puasa-dengan-Jus-Buah-Hati-Hati-Bisa-Bikin-Mom-Menyesal.jpg',
  },
  {
    id: 3,
    name: 'Snack Sehat',
    category: 'Makanan',
    price: 15000,
    description: 'Snack ringan tanpa bahan pengawet.',
    imageUrl: 'https://main.mobile.doss.co.id/storage/uploads/2023/10/photo-1546069901-ba9599a7e63c.webp',
  },
  {
    id: 4,
    name: 'Vitamin C Booster',
    category: 'Suplemen',
    price: 10000,
    description: 'Suplemen vitamin C untuk meningkatkan imun.',
    imageUrl: 'https://www.uni-health.com/pub/media/catalog/product/cache/bac7b768ee0296ed2137f1171d0548da/s/i/single_product_hf0036.png',
  },
  {
    id: 5,
    name: 'Nasi Goreng',
    category: 'Makanan',
    price: 10000,
    description: 'Nasi Goreng Hotel Enak Bintang Lima dengan Harga Murah',
    imageUrl: 'https://www.dapurkobe.co.id/wp-content/uploads/nasi-goreng-pattaya.jpg',
  },
  {
    id: 6,
    name: 'Air Mineral Premium',
    category: 'Minuman',
    price: 15000,
    description: 'Air mineral berkualitas tinggi dengan pH seimbang.',
    imageUrl: 'https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p1/294/2025/02/20/amdk-equil-1235144172.jpg',
  },
];

const categories = ['Semua', 'Makanan', 'Minuman', 'Suplemen'];
const ITEMS_PER_PAGE = 3;

const SliderPromo = () => {
  const [current, setCurrent] = useState(0);
  const total = promoImages.length;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % total);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto rounded-xl overflow-hidden shadow-lg mb-8" data-aos="zoom-in">
      <img
        src={promoImages[current]}
        alt={`Promo ${current + 1}`}
        className="w-full h-48 md:h-64 object-cover transition-transform duration-700 ease-in-out"
        loading="lazy"
      />
      <button onClick={prevSlide} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow">
        <ChevronLeft />
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow">
        <ChevronRight />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {promoImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${current === index ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

const MarketPlace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [sortPrice, setSortPrice] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...productsData];

    if (selectedCategory !== 'Semua') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortPrice === 'asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortPrice === 'desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [selectedCategory, searchTerm, sortPrice]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section
      id="marketplace"
      className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-md"
      data-aos="fade-up"
    >
      <h2 className="text-4xl font-extrabold mb-8 text-center text-green-700 drop-shadow-md">
        Marketplace <span className="text-green-900">ResQMeal</span>
      </h2>

      <SliderPromo />

      <div className="flex flex-col md:flex-row md:justify-between mb-6 gap-4">
        <input
          type="search"
          placeholder="Cari produk..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sortPrice || ''}
          onChange={(e) => setSortPrice(e.target.value || null)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">Sortir Harga</option>
          <option value="asc">Harga Terendah</option>
          <option value="desc">Harga Tertinggi</option>
        </select>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayedProducts.length === 0 ? (
          <li className="text-center col-span-full text-gray-600 italic">
            Produk tidak ditemukan.
          </li>
        ) : (
          displayedProducts.map(({ id, name, price, description, imageUrl }) => (
            <li
              key={id}
              className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow flex flex-col group"
              data-aos="fade-up"
            >
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{description}</p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-indigo-700 font-bold text-lg">
                    Rp{price.toLocaleString()}
                  </span>
                  <button
  type="button"
  onClick={() => navigate(`/produk/${id}`)}
  aria-label={`Beli produk ${name}`}
  className="bg-indigo-600 text-white px-5 py-2 rounded-md shadow-md
    transform transition-transform duration-300 ease-in-out
    hover:bg-indigo-700 hover:shadow-xl
    active:translate-y-1
    focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1"
>
  Beli Sekarang
</button>


                </div>
              </div>
            </li>
          ))
        )}
      </ul>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            &lt; Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? 'bg-indigo-600 text-white' : ''
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next &gt;
          </button>
        </div>
      )}
    </section>
  );
};

export default MarketPlace;
