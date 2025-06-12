import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ShoppingBag, CreditCard, MapPin, Phone } from 'lucide-react';

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
      toast.error('Mohon lengkapi semua data.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      toast.success(
        `Pembayaran berhasil!\nTotal bayar: Rp${totalPrice.toLocaleString()}\nTerima kasih, ${form.nama}!`,
        { autoClose: 3000 }
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
      <div className="max-w-5xl mx-auto mt-20 mb-20 p-10 bg-white rounded-3xl shadow-2xl border border-gray-200">

        <h2 className="text-4xl font-bold text-indigo-700 mb-10 text-center">🧾 Pembayaran</h2>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Ringkasan Pesanan */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
              <ShoppingBag size={22} /> Ringkasan Pesanan
            </h3>

            <div className="divide-y divide-gray-200 max-h-72 overflow-y-auto bg-white p-4 rounded-lg shadow-inner">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between py-3 text-gray-700 text-sm">
                  <span>{item.name} x {item.quantity || 1}</span>
                  <span className="font-semibold text-green-700">
                    Rp{(item.price * (item.quantity || 1)).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-right mt-6 text-lg font-bold text-indigo-700">
              Total: Rp{totalPrice.toLocaleString()}
            </div>
          </div>

          {/* Form Pembayaran */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Nama Lengkap</label>
              <div className="flex items-center bg-white border rounded-lg shadow-sm">
                <div className="p-3 text-gray-400"><CreditCard size={18} /></div>
                <input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  placeholder="Nama lengkap"
                  className="w-full px-3 py-3 focus:outline-none"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Alamat Pengiriman</label>
              <div className="flex items-start bg-white border rounded-lg shadow-sm">
                <div className="p-3 text-gray-400"><MapPin size={18} /></div>
                <textarea
                  name="alamat"
                  value={form.alamat}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Alamat lengkap"
                  className="w-full px-3 py-3 focus:outline-none"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Nomor Telepon</label>
              <div className="flex items-center bg-white border rounded-lg shadow-sm">
                <div className="p-3 text-gray-400"><Phone size={18} /></div>
                <input
                  type="tel"
                  name="telepon"
                  value={form.telepon}
                  onChange={handleChange}
                  placeholder="08xxxxxxxxxx"
                  className="w-full px-3 py-3 focus:outline-none"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Metode Pembayaran</label>
              <select
                name="metodePembayaran"
                value={form.metodePembayaran}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none"
                disabled={loading}
              >
                <option value="transfer">Transfer Bank</option>
                <option value="cod">Cash on Delivery (COD)</option>
              </select>
            </div>

            <button
              type="submit"
              className={`w-full py-4 rounded-xl text-white text-lg font-semibold tracking-wide transition-all shadow-lg ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-500 to-indigo-700 hover:scale-105'
              }`}
              disabled={loading}
            >
              {loading ? 'Memproses Pembayaran...' : 'Konfirmasi & Bayar Sekarang'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Pembayaran;
