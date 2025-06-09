import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import productsData from '../data/productsData';
import { toast } from 'react-toastify';

const DetailBeliSekarang = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productsData.find((p) => p.id === parseInt(id));

  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const storedFav = JSON.parse(localStorage.getItem('favorites')) || [];
    setCart(storedCart);
    setFavorites(storedFav);
  }, []);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const totalPrice = product ? product.price * quantity : 0;

  const handleAddToCart = () => {
    if (!product) return;

    const existingIndex = cart.findIndex((item) => item.id === product.id);
    let updatedCart = [];

    if (existingIndex >= 0) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart = [...cart, { ...product, quantity }];
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success(`${product.name} (x${quantity}) ditambahkan ke keranjang!`,);
  };

  const handleAddToFavorite = () => {
    if (!product) return;

    if (!favorites.find((item) => item.id === product.id)) {
      const updatedFav = [...favorites, product];
      setFavorites(updatedFav);
      localStorage.setItem('favorites', JSON.stringify(updatedFav));
      toast.success(`${product.name} ditambahkan ke favorit!`,);
    } else {
      toast.info(`${product.name} sudah ada di favorit!`,);
    }
  };

  const handleBuyNow = () => {
    if (!product) return;

    const checkoutItem = { ...product, quantity };
    localStorage.setItem('checkoutItem', JSON.stringify(checkoutItem));
    toast.success('Mengalihkan ke halaman pembayaran...', { delay: 100 });
    setTimeout(() => {
      navigate('/pembayaran');
    }, 1000);
  };

  if (!product) {
    return (
      <div className="p-8 text-center text-red-600 font-semibold text-lg">
        Produk tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow rounded-lg mt-6">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p className="text-lg text-gray-700 mb-2">Kategori: {product.category}</p>
      <p className="text-gray-600 mb-4">{product.description}</p>

      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={decrement}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded transition"
          aria-label="Kurangi jumlah"
        >
          −
        </button>
        <span className="text-xl font-semibold w-10 text-center">{quantity}</span>
        <button
          onClick={increment}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded transition"
          aria-label="Tambah jumlah"
        >
          +
        </button>
      </div>

      <p className="text-indigo-700 font-bold text-xl mb-6">
        Total Harga: Rp{totalPrice.toLocaleString()}
      </p>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleBuyNow}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Beli Sekarang
        </button>
        <button
          onClick={handleAddToCart}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Tambah ke Keranjang
        </button>
        <button
          onClick={handleAddToFavorite}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          Favorit
        </button>
      </div>
    </div>
  );
};

export default DetailBeliSekarang;
