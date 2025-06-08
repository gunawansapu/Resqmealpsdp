import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
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
            <li><Link to="/" className="hover:text-green-200">Beranda</Link></li>
            <li><Link to="/tentang" className="hover:text-green-200">Tentang</Link></li>
            <li><Link to="/services" className="hover:text-green-200">Services</Link></li>
            <li><Link to="/supplychain" className="hover:text-green-200">Supply Chain</Link></li>
            <li><Link to="/targetmarket" className="hover:text-green-200">Target Market</Link></li>
            <li><Link to="/uniquevalue" className="hover:text-green-200">Unique Value</Link></li>
            <li><Link to="/marketplace" className="hover:text-green-200">Marketplace</Link></li>
            <li><Link to="/donasi" className="hover:text-green-200">Donasi</Link></li>
            <li><Link to="/langganan" className="hover:text-green-200">Langganan</Link></li>
            <li><Link to="/kontak" className="hover:text-green-200">Kontak</Link></li>
          </ul>
        </div>

        {/* Contact & Sosial */}
        <div>
          <h2 className="text-xl font-bold mb-4">Hubungi Kami</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Mail size={16} /> support@resqmeal.id</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +62 812-3456-7890</li>
          </ul>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-green-200"><Facebook /></a>
            <a href="#" className="hover:text-green-200"><Instagram /></a>
          </div>
        </div>

      </div>

      <div className="text-center text-sm text-green-200 mt-10">
        &copy; {new Date().getFullYear()} ResQMeal. Semua Hak Dilindungi.
      </div>
    </footer>
  );
}
