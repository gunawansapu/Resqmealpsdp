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
    <footer className="bg-gradient-to-br from-green-700 to-green-900 text-white py-14 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* About */}
        <div>
          <h2 className="text-2xl font-semibold mb-5">Tentang ResQMeal</h2>
          <p className="text-sm leading-relaxed text-gray-300">
            ResQMeal adalah platform inovatif yang menghubungkan restoran & UMKM dengan konsumen
            untuk menyelamatkan makanan sisa layak konsumsi secara aman, efisien, dan ramah lingkungan.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-2xl font-semibold mb-5">Navigasi Cepat</h2>
          <ul className="space-y-3 text-sm">
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
              { path: "/gabungmitra", label: "Gabung Mitra" },
            ].map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  onClick={(e) => handleNavigate(e, item.path)}
                  className="hover:text-green-300 transition-colors duration-300"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h2 className="text-2xl font-semibold mb-5">Hubungi Kami</h2>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-3">
              <Mail size={18} /> support@resqmeal.id
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} /> +62 812-3456-7890
            </li>
          </ul>
          <div className="flex gap-4 mt-6">
            <a
              href="#"
              className="bg-green-600 hover:bg-green-500 transition-colors duration-300 p-2 rounded-full"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="bg-green-600 hover:bg-green-500 transition-colors duration-300 p-2 rounded-full"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-green-200 mt-14">
        &copy; {new Date().getFullYear()} ResQMeal. Semua Hak Dilindungi.
      </div>
    </footer>
  );
}
