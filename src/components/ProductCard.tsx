import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleOrderNow = () => {
    const message = `Hi! I'm interested in "${product.title}" from Hammies Yarnistry.

Product Details:
- Name: ${product.title}
- Description: ${product.description}
- Price: ₦${product.price.toLocaleString()}

Could you please provide more details about this item?`;
    
    const whatsappUrl = `https://wa.me/+2347031272217?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square">
        <img 
          src={product.imageUrl} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Hover Actions */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors duration-200">
            <Heart className="w-5 h-5 text-rose-500" />
          </button>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-lg font-bold text-gray-800">₦{product.price.toLocaleString()}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-rose-600 transition-colors duration-200">
          {product.title}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {product.description}
        </p>
        
        <button 
          onClick={handleOrderNow}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-400 to-pink-500 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:from-rose-500 hover:to-pink-600 hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <ShoppingBag className="w-5 h-5" />
          Order Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;