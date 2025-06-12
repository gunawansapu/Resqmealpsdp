import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const Keranjang = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Keranjang kosong, silakan tambah produk terlebih dahulu.');
      return;
    }

    localStorage.removeItem('checkoutItem');
    localStorage.setItem('checkoutItems', JSON.stringify(cart));
    navigate('/pembayaran');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center text-gray-600 px-4">
        <div className="text-7xl mb-4 animate-bounce">🛒</div>
        <h2 className="text-2xl font-semibold mb-2">Keranjang Belanja Kosong</h2>
        <p className="text-gray-500 text-sm mb-6">Ayo tambahkan produk ke dalam keranjang kamu!</p>
        <Link 
          to="/marketplace"
          className="bg-green-500 text-white px-6 py-3 rounded-full shadow hover:bg-green-600 transition"
        >
          Belanja Sekarang
        </Link>
      </div>
    );
  }

  const totalHarga = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  return (
    <div className="max-w-5xl mx-auto pt-20 pb-20 px-4">
      <h2 className="text-3xl font-bold mb-10 text-green-700 text-center">Keranjang Belanja</h2>

      <div className="space-y-6">
        {cart.map(item => (
          <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition">
            <Link to={`/produk/${item.id}`} className="flex items-center gap-4 w-full sm:w-auto">
              <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
              <div>
                <h3 className="font-semibold text-xl mb-1 text-green-800">{item.name}</h3>
                <p className="text-gray-600 mb-1">Jumlah: {item.quantity || 1}</p>
                <p className="text-indigo-700 font-bold text-lg">
                  Rp{(item.price * (item.quantity || 1)).toLocaleString()}
                </p>
              </div>
            </Link>

            <button
              onClick={() => handleRemove(item.id)}
              className="mt-4 sm:mt-0 bg-red-500 text-white px-5 py-3 rounded-xl hover:bg-red-600 flex items-center gap-2 transition"
              aria-label={`Hapus ${item.name} dari keranjang`}
            >
              <FaTrash /> Hapus
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-green-50 border border-green-200 rounded-2xl p-6 shadow-md sticky bottom-0">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="font-bold text-2xl text-green-700">
            Total: Rp{totalHarga.toLocaleString()}
          </div>
          <button
            onClick={handleCheckout}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white text-lg px-8 py-4 rounded-2xl shadow hover:brightness-110 transition"
          >
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default Keranjang;
