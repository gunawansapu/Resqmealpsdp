import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    <div className="relative w-full max-w-6xl mx-auto rounded-xl overflow-hidden shadow-lg mb-8">
      <img
        src={promoImages[current]}
        alt={`Promo ${current + 1}`}
        className="w-full h-48 md:h-64 object-cover transition-transform duration-700 ease-in-out"
        loading="lazy"
      />

      {/* Tombol panah */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
        aria-label="Sebelumnya"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
        aria-label="Berikutnya"
      >
        <ChevronRight />
      </button>

      {/* Dot navigasi */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {promoImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Pilih promo ${index + 1}`}
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

  const filteredProducts = useMemo(() => {
    let filtered = productsData;

    if (selectedCategory !== 'Semua') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (searchTerm.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortPrice === 'asc') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortPrice === 'desc') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }
    return filtered;
  }, [selectedCategory, searchTerm, sortPrice]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortPrice(e.target.value || null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <section
      id="marketplace"
      className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-md"
      aria-label="Marketplace ResQMeal"
    >
      <h2 className="text-4xl font-extrabold mb-8 text-center text-green-700 drop-shadow-md">
        Marketplace <span className="text-green-900">ResQMeal</span>
      </h2>

      {/* Slider Promo */}
      <SliderPromo />

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:justify-between mb-6 gap-4">
        <input
          type="search"
          placeholder="Cari produk..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Cari produk"
        />

        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Filter kategori produk"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sortPrice || ''}
          onChange={handleSortChange}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Sortir produk berdasarkan harga"
        >
          <option value="">Sortir Harga</option>
          <option value="asc">Harga Terendah</option>
          <option value="desc">Harga Tertinggi</option>
        </select>
      </div>

      {/* Product List */}
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
              aria-label={`Produk ${name} dengan harga Rp${price.toLocaleString()}`}
            >
              <div className="overflow-hidden">
                <img
                  src={imageUrl}
                  alt={name}
                  loading="lazy"
                  className="w-full h-40 object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-90"
                />
              </div>

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

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="Navigasi halaman produk"
          className="flex justify-center items-center gap-4 mt-8 select-none"
        >
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Halaman sebelumnya"
            className="px-3 py-1 rounded-md border border-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-100"
          >
            &lt; Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              aria-current={currentPage === i + 1 ? 'page' : undefined}
              aria-label={`Halaman ${i + 1}`}
              className={`px-3 py-1 rounded-md border border-indigo-400
                ${
                  currentPage === i + 1
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-indigo-100'
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Halaman berikutnya"
            className="px-3 py-1 rounded-md border border-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-100"
          >
            Next &gt;
          </button>
        </nav>
      )}
    </section>
  );
};

export default MarketPlace;
