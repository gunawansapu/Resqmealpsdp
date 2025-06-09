import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Keranjang = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  // Hapus produk dari keranjang
  const handleRemove = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Checkout semua produk di keranjang
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Keranjang kosong, silakan tambah produk terlebih dahulu.');
      return;
    }

    const totalPrice = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

    // Simpan data pembayaran ke localStorage
    localStorage.setItem('totalPembayaran', totalPrice);
    localStorage.setItem('checkoutItems', JSON.stringify(cart));

    // Arahkan ke halaman pembayaran (tanpa hapus dulu)
    navigate('/pembayaran');
  };

  if (cart.length === 0) {
    return (
      <div
        className="p-8 text-center text-gray-600"
        style={{
          marginTop: '100px',
          marginBottom: '100px',
          minHeight: 'calc(100vh - 200px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.25rem',
        }}
      >
        Keranjang belanja kosong.
      </div>
    );
  }

  return (
    <div
      className="max-w-4xl mx-auto p-8 bg-white shadow rounded-lg"
      style={{
        marginTop: '100px',
        marginBottom: '100px',
        minHeight: 'calc(100vh - 200px)',
      }}
    >
      <h2 className="text-2xl font-bold mb-6">Keranjang Belanja</h2>
      <ul className="space-y-4">
        {cart.map(item => (
          <li key={item.id} className="flex items-center justify-between border rounded p-4 shadow-sm">
            <Link to={`/produk/${item.id}`} className="flex items-center gap-4 flex-grow hover:underline">
              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p>Jumlah: {item.quantity || 1}</p>
                <p className="text-indigo-700 font-bold">
                  Rp{(item.price * (item.quantity || 1)).toLocaleString()}
                </p>
              </div>
            </Link>
            <button
              onClick={() => handleRemove(item.id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              aria-label={`Hapus ${item.name} dari keranjang`}
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 text-right font-bold text-xl">
        Total Harga: Rp
        {cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0).toLocaleString()}
      </div>

      <button
        onClick={handleCheckout}
        className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded shadow hover:bg-indigo-700 transition"
      >
        Beli Sekarang
      </button>
    </div>
  );
};

export default Keranjang;
