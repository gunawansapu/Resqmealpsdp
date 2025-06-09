import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Pembayaran = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [checkoutId, setCheckoutId] = useState(null); // ✅ untuk redirect ke detail produk
  const [form, setForm] = useState({
    nama: '',
    alamat: '',
    telepon: '',
    metodePembayaran: 'transfer',
  });

  useEffect(() => {
    const checkoutItem = JSON.parse(localStorage.getItem('checkoutItem'));
    if (checkoutItem && checkoutItem.id) {
      setItems([checkoutItem]);
      setCheckoutId(checkoutItem.id); // ✅ simpan ID untuk redirect
    } else {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      if (storedCart.length === 0) {
        toast.error('Keranjang kosong, silakan tambah produk terlebih dahulu.', {
          position: 'top-center',
          autoClose: 2000,
          onClose: () => navigate('/keranjang'),
        });
        return;
      }
      setItems(storedCart);
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

    toast.success(
      `Pembayaran berhasil!\nTotal bayar: Rp${totalPrice.toLocaleString()}\nTerima kasih, ${form.nama}!`,
      {
        position: 'top-center', // ✅ notifikasi muncul di tengah atas
        autoClose: 3000,
        onClose: () => {
          localStorage.removeItem('cart');
          localStorage.removeItem('checkoutItem');
          setItems([]);
          // ✅ redirect sesuai sumber pembelian
          if (checkoutId) {
            navigate(`/produk/${checkoutId}`);
          } else {
            navigate('/marketplace');
          }
        },
      }
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-8 mt-24 mb-24 bg-white shadow rounded-lg">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6">Pembayaran</h2>

      <h3 className="text-lg font-semibold mb-4">Ringkasan Pesanan:</h3>
      <ul className="mb-6 max-h-48 overflow-auto border rounded p-4">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between mb-2">
            <span>
              {item.name} x {item.quantity || 1}
            </span>
            <span>
              Rp{(item.price * (item.quantity || 1)).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>

      <div className="text-right font-bold text-xl mb-6">
        Total Harga: Rp{totalPrice.toLocaleString()}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold" htmlFor="nama">
            Nama Lengkap
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="alamat">
            Alamat Pengiriman
          </label>
          <textarea
            id="alamat"
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="telepon">
            Nomor Telepon
          </label>
          <input
            type="tel"
            id="telepon"
            name="telepon"
            value={form.telepon}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label
            className="block mb-1 font-semibold"
            htmlFor="metodePembayaran"
          >
            Metode Pembayaran
          </label>
          <select
            id="metodePembayaran"
            name="metodePembayaran"
            value={form.metodePembayaran}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="transfer">Transfer Bank</option>
            <option value="cod">Cash on Delivery (COD)</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition"
        >
          Konfirmasi Pembayaran
        </button>
      </form>
    </div>
  );
};

export default Pembayaran;
