import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Marketplace from './pages/MarketPlace';
import Donation from './pages/Donation';
import Subscription from './pages/Subscription';
import Contact from './pages/Contact';
import SupplyChain from './components/SupplyChain';
import TargetMarket from './components/TargetMarket';
import UniqueValue from './components/UniqueValue';
import Services from './components/Services';
import ScrollToTop from "./components/ScrollToTop";



function App() {
  return (
  <Router>
      <ScrollToTop /> {/* Tambahan penting */}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tentang" element={<About />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/donasi" element={<Donation />} />
            <Route path="/langganan" element={<Subscription />} />
            <Route path="/supplychain" element={<SupplyChain />} />
            <Route path="/targetmarket" element={<TargetMarket />} />
            <Route path="/uniquevalue" element={<UniqueValue />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;