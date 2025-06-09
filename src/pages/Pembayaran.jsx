import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Pembayaran = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [checkoutId, setCheckoutId] = useState(null);
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
    setCheckoutId(singleItem.id); // jika perlu ID-nya
  } else if (multipleItems && multipleItems.length > 0) {
    setItems(multipleItems);
  } else {
    toast.error("Tidak ada item yang bisa dibayar.");
    navigate("/marketplace");
  }
}, []);


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
        position: 'top-center',
        autoClose: 3000,
        onClose: () => {
          localStorage.removeItem('cart');
          localStorage.removeItem('checkoutItem');
          localStorage.removeItem('checkoutItems');
          setItems([]);
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
