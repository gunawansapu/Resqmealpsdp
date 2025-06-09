import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (e, path) => {
    e.preventDefault();
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(path);
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    }
  };

  return (
    <footer className="bg-green-700 text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h2 className="text-xl font-bold mb-4">Tentang ResQMeal</h2>
          <p className="text-sm leading-relaxed">
            ResQMeal adalah platform yang menghubungkan restoran & UMKM dengan konsumen untuk menyelamatkan makanan sisa layak konsumsi secara aman dan efisien.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Navigasi Cepat</h2>
          <ul className="space-y-2 text-sm">
            {[
              { path: "/", label: "Beranda" },
              { path: "/tentang", label: "Tentang" },
              { path: "/services", label: "Services" },
              { path: "/supplychain", label: "Supply Chain" },
              { path: "/targetmarket", label: "Target Market" },
              { path: "/uniquevalue", label: "Unique Value" },
              { path: "/marketplace", label: "Marketplace" },
              { path: "/donasi", label: "Donasi" },
              { path: "/langganan", label: "Langganan" },
              { path: "/contact", label: "Kontak" },
              { path: "/favorit", label: "Favorit" },
              { path: "/keranjang", label: "Keranjang" },
              { path: "/pembayaran", label: "Pembayaran" },
              { path: "/gabungmitra", label: "Gabung Mitra" },
            ].map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  onClick={(e) => handleNavigate(e, item.path)}
                  className="hover:text-green-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Sosial */}
        <div>
          <h2 className="text-xl font-bold mb-4">Hubungi Kami</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@resqmeal.id
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +62 812-3456-7890
            </li>
          </ul>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-green-200">
              <Facebook />
            </a>
            <a href="#" className="hover:text-green-200">
              <Instagram />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-green-200 mt-10">
        &copy; {new Date().getFullYear()} ResQMeal. Semua Hak Dilindungi.
      </div>
    </footer>
  );
}
