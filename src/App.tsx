import React, { useState } from 'react';
import { ProductProvider } from './context/ProductContext';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import About from './components/About';
import Footer from './components/Footer';
import AdminPage from './components/AdminPage';
import { Settings } from 'lucide-react';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  if (showAdmin) {
    return (
      <ProductProvider>
        <AdminPage onBack={() => setShowAdmin(false)} />
      </ProductProvider>
    );
  }

  return (
    <ProductProvider>
      <div className="relative">
        {/* Admin Button */}
        <button
          onClick={() => setShowAdmin(true)}
          className="fixed top-6 right-6 z-50 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-rose-500 hover:bg-white transition-all duration-200 hover:scale-110"
          title="Admin Panel"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Main Content */}
        <Hero />
        <Gallery />
        <About />
        <Footer />
      </div>
    </ProductProvider>
  );
}

export default App;