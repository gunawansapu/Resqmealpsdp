import React, { useState, useMemo } from 'react';

const productsData = [
  {
    id: 1,
    name: 'Box Makanan Sehat',
    category: 'Makanan',
    price: 50000,
    description: 'Makanan sehat siap saji dengan bahan organik.',
    imageUrl: 'https://awsimages.detik.net.id/community/media/visual/2024/08/30/artisan-bakery-3_43.jpeg?w=650',
  },
  {
    id: 2,
    name: 'Minuman Detoks',
    category: 'Minuman',
    price: 30000,
    description: 'Minuman detoks alami untuk kesehatan tubuh.',
    imageUrl: 'https://kehamilansehat.com/wp-content/uploads/2025/03/Buka-Puasa-dengan-Jus-Buah-Hati-Hati-Bisa-Bikin-Mom-Menyesal.jpg',
  },
  {
    id: 3,
    name: 'Snack Sehat',
    category: 'Makanan',
    price: 20000,
    description: 'Snack ringan tanpa bahan pengawet.',
    imageUrl: 'https://main.mobile.doss.co.id/storage/uploads/2023/10/photo-1546069901-ba9599a7e63c.webp',
  },
  {
    id: 4,
    name: 'Vitamin C Booster',
    category: 'Suplemen',
    price: 75000,
    description: 'Suplemen vitamin C untuk meningkatkan imun.',
    imageUrl: 'https://source.unsplash.com/200x150/?vitamin',
  },
  {
    id: 5,
    name: 'Smoothie Bowl',
    category: 'Makanan',
    price: 60000,
    description: 'Smoothie bowl segar dengan topping buah.',
    imageUrl: 'https://source.unsplash.com/200x150/?smoothie,bowl',
  },
  {
    id: 6,
    name: 'Air Mineral Premium',
    category: 'Minuman',
    price: 15000,
    description: 'Air mineral berkualitas tinggi dengan pH seimbang.',
    imageUrl: 'https://source.unsplash.com/200x150/?water',
  },
  // Tambah produk lain jika perlu
];

const categories = ['Semua', 'Makanan', 'Minuman', 'Suplemen'];
const ITEMS_PER_PAGE = 3;

const MarketPlace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [sortPrice, setSortPrice] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Marketplace ResQMeal
      </h2>

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
              {/* Gambar dengan efek hover zoom dan shadow */}
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

                  {/* Tombol Beli dengan animasi 3D hover */}
                  <button
                    type="button"
                    onClick={() => alert(`Berhasil membeli: ${name}`)}
                    aria-label={`Beli produk ${name}`}
                    className="bg-indigo-600 text-white px-5 py-2 rounded-md shadow-md
                      transform transition-transform duration-300 ease-in-out
                      hover:bg-indigo-700 hover:shadow-xl
                      active:translate-y-1
                      focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1
                      "
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
          className="flex justify-center mt-8 space-x-3"
        >
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md border ${
              currentPage === 1
                ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                : 'text-indigo-600 border-indigo-600 hover:bg-indigo-100'
            }`}
            aria-label="Halaman sebelumnya"
          >
            &lt;
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                aria-current={currentPage === pageNum ? 'page' : undefined}
                className={`px-3 py-1 rounded-md border ${
                  currentPage === pageNum
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'text-indigo-600 border-indigo-600 hover:bg-indigo-100'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md border ${
              currentPage === totalPages
                ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                : 'text-indigo-600 border-indigo-600 hover:bg-indigo-100'
            }`}
            aria-label="Halaman berikutnya"
          >
            &gt;
          </button>
        </nav>
      )}
    </section>
  );
};

export default MarketPlace;