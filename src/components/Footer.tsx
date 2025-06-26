import React from 'react';
import { Heart, Instagram, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleCustomOrder = () => {
    const message = "Hi! I want to make a custom order from Hammies Yarnistry.";
    const whatsappUrl = `https://wa.me/+2347031272217?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
              Hammies Yarnistry
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Creating beautiful, handcrafted crochet pieces that bring warmth and joy to your home.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/hammies_yarnistry?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-rose-400 hover:bg-gray-700 transition-all duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <button
                onClick={handleCustomOrder}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-rose-400 hover:bg-gray-700 transition-all duration-200"
                title="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#gallery" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Our Collection
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <button 
                  onClick={handleCustomOrder}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                >
                  Custom Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <p className="text-gray-400 mb-4">
              Ready to order or have questions? We'd love to hear from you!
            </p>
            <button 
              onClick={() => {
                const message = "Hi! I'd like to learn more about Hammies Yarnistry products.";
                const whatsappUrl = `https://wa.me/+2347031272217?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
              className="bg-gradient-to-r from-rose-400 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:from-rose-500 hover:to-pink-600 transition-all duration-300 flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Message Us
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Hammies Yarnistry. Made with <Heart className="w-4 h-4 inline text-rose-400" /> for craft lovers.
          </p>
          <p className="text-gray-500 text-sm mt-4 md:mt-0">
            All items are handmade and may vary slightly from photos.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;