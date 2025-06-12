import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";

const Favorit = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFav = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFav);
  }, []);

  const handleRemove = (id) => {
    const updatedFav = favorites.filter((item) => item.id !== id);
    setFavorites(updatedFav);
    localStorage.setItem('favorites', JSON.stringify(updatedFav));
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <div className="text-7xl mb-6 animate-bounce">💖</div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Belum ada produk favorit</h2>
        <p className="text-gray-500 mb-6">Yuk tambahkan produk kesukaanmu!</p>
        <Link 
          to="/marketplace"
          className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition"
        >
          Cari Produk
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-20">
      <h2 className="text-3xl font-extrabold text-green-700 text-center mb-12">
        Produk Favorit Anda
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {favorites.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 flex flex-col"
          >
            <Link to={`/produk/${product.id}`} className="group">
              <div className="overflow-hidden rounded-t-3xl">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-xl text-green-800 mb-2">{product.name}</h3>
                <p className="text-indigo-700 font-bold text-lg">
                  Rp{product.price.toLocaleString()}
                </p>
              </div>
            </Link>

            <button
              onClick={() => handleRemove(product.id)}
              className="bg-red-500 text-white py-4 rounded-b-3xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-red-600 transition duration-300"
              aria-label={`Hapus ${product.name} dari favorit`}
            >
              <FaTrash /> Hapus dari Favorit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorit;
