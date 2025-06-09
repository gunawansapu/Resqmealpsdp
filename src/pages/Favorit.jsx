import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
      <div className="min-h-screen pt-20 pb-20 flex items-center justify-center text-gray-600 text-lg">
        Belum ada produk favorit.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded-lg mt-6 min-h-screen pt-20 pb-20">
      <h2 className="text-2xl font-bold mb-6">Produk Favorit</h2>
      <ul className="space-y-4">
        {favorites.map((product) => (
          <li
            key={product.id}
            className="flex flex-col sm:flex-row items-center justify-between border rounded p-4 shadow-sm gap-4"
          >
            <Link
              to={`/produk/${product.id}`}
              className="flex items-center gap-4 flex-grow hover:underline"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-indigo-700 font-bold">
                  Rp{product.price.toLocaleString()}
                </p>
              </div>
            </Link>
            <button
              onClick={() => handleRemove(product.id)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              aria-label={`Hapus ${product.name} dari favorit`}
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorit;
