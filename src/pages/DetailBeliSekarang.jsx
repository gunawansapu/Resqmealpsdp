import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import productsData from '../data/productsData';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Heart, ShoppingCart, CheckCircle } from 'lucide-react';

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
    toast.success(`${product.name} (x${quantity}) berhasil ditambahkan ke keranjang!`);
  };

  const handleAddToFavorite = () => {
    if (!product) return;

    if (!favorites.find((item) => item.id === product.id)) {
      const updatedFav = [...favorites, product];
      setFavorites(updatedFav);
      localStorage.setItem('favorites', JSON.stringify(updatedFav));
      toast.success(`${product.name} ditambahkan ke favorit!`);
    } else {
      toast.info(`${product.name} sudah ada di favorit!`);
    }
  };

  const handleBuyNow = () => {
    if (!product) return;

    const checkoutItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      imageUrl: product.imageUrl,
    };

    localStorage.removeItem('checkoutItems');
    localStorage.setItem('checkoutItem', JSON.stringify(checkoutItem));

    toast.success('Mengalihkan ke halaman pembayaran...');
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
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-2xl rounded-3xl mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="relative group">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl shadow-lg transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-4 text-green-700">{product.name}</h1>
          <p className="text-sm text-gray-500 mb-3 bg-green-100 px-3 py-1 rounded-full inline-block">
            Kategori: {product.category}
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          <div className="mb-6 flex items-center gap-4">
            <button
              onClick={decrement}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-5 rounded-full transition"
            >
              −
            </button>
            <span className="text-2xl font-semibold w-14 text-center">{quantity}</span>
            <button
              onClick={increment}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-5 rounded-full transition"
            >
              +
            </button>
          </div>

          <p className="text-3xl text-green-600 font-extrabold mb-8">
            Rp{totalPrice.toLocaleString()}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleBuyNow}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-full text-lg shadow-lg hover:scale-105 transition"
            >
              <CheckCircle size={24} /> Beli Sekarang
            </button>

            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full text-lg shadow-lg hover:scale-105 transition"
            >
              <ShoppingCart size={24} className="scale-125" /> Tambah ke Keranjang
            </button>

            <button
              onClick={handleAddToFavorite}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-6 py-3 rounded-full text-lg shadow-lg hover:scale-105 transition"
            >
              <Heart size={24} /> Favorit
            </button>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
};

export default DetailBeliSekarang;
