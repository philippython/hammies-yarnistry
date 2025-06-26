import React from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from './ProductCard';
import { Sparkles } from 'lucide-react';

const Gallery: React.FC = () => {
  const { products } = useProducts();

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-rose-400 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
              Our Collection
            </h2>
            <Sparkles className="w-8 h-8 text-rose-400 ml-3" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Each piece is lovingly handcrafted with premium yarns and attention to detail
          </p>
        </div>

        {/* Products Grid */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
            </div>
            <p className="text-xl text-gray-500">
              No products available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;