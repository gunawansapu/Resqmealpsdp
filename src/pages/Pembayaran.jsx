import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Pembayaran = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [checkoutId, setCheckoutId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nama: '',
    alamat: '',
    telepon: '',
    metodePembayaran: 'transfer',
  });

  useEffect(() => {
    const singleItem = JSON.parse(localStorage.getItem('checkoutItem'));
    const multipleItems = JSON.parse(localStorage.getItem('checkoutItems'));

    if (singleItem && !multipleItems) {
      setItems([singleItem]);
      setCheckoutId(singleItem.id);
    } else if (multipleItems && multipleItems.length > 0) {
      setItems(multipleItems);
    } else {
      toast.error("Tidak ada item yang bisa dibayar.");
      navigate("/marketplace");
    }
  }, [navigate]);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nama || !form.alamat || !form.telepon) {
      toast.error('Mohon lengkapi semua data.', {
        position: 'top-center',
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      toast.success(
        `Pembayaran berhasil!\nTotal bayar: Rp${totalPrice.toLocaleString()}\nTerima kasih, ${form.nama}!`,
        {
          position: 'top-center',
          autoClose: 3000,
        }
      );

      localStorage.removeItem('cart');
      localStorage.removeItem('checkoutItem');
      localStorage.removeItem('checkoutItems');
      setItems([]);
      setLoading(false);

      setTimeout(() => {
        if (checkoutId) {
          navigate(`/produk/${checkoutId}`);
        } else {
          navigate('/marketplace');
        }
      }, 3000);
    }, 1000);
  };

  return (
    <>
      <ToastContainer />
      <div className="max-w-4xl mx-auto mt-24 mb-24 p-8 bg-gradient-to-br from-white to-slate-100 rounded-xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 border-b pb-2">Pembayaran</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">🛒 Ringkasan Pesanan</h3>
          <ul className="divide-y divide-gray-200 border rounded-md max-h-60 overflow-y-auto bg-white p-4 shadow-sm">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between py-2 text-gray-600 text-sm">
                <span>{item.name} x {item.quantity || 1}</span>
                <span className="font-medium text-gray-800">
                  Rp{(item.price * (item.quantity || 1)).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
          <div className="text-right mt-4 font-bold text-lg text-indigo-800">
            Total: Rp{totalPrice.toLocaleString()}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nama" className="block text-sm font-semibold text-gray-600 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Nama lengkap Anda"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="alamat" className="block text-sm font-semibold text-gray-600 mb-1">
              Alamat Pengiriman
            </label>
            <textarea
              id="alamat"
              name="alamat"
              value={form.alamat}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Alamat lengkap Anda"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="telepon" className="block text-sm font-semibold text-gray-600 mb-1">
              Nomor Telepon
            </label>
            <input
              type="tel"
              id="telepon"
              name="telepon"
              value={form.telepon}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="08xxxxxxxxxx"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="metodePembayaran" className="block text-sm font-semibold text-gray-600 mb-1">
              Metode Pembayaran
            </label>
            <select
              id="metodePembayaran"
              name="metodePembayaran"
              value={form.metodePembayaran}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              disabled={loading}
            >
              <option value="transfer">Transfer Bank</option>
              <option value="cod">Cash on Delivery (COD)</option>
            </select>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-md font-semibold text-white text-lg tracking-wide transition-all duration-300 shadow-md ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02]'
            }`}
            disabled={loading}
          >
            {loading ? 'Memproses Pembayaran...' : '💸 Konfirmasi Pembayaran'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Pembayaran;
