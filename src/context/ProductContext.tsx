import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  removeProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Diverse collection of crochet products with Nigerian Naira prices
const initialProducts: Product[] = [
  {
    id: '1',
    title: 'Boho Crochet Tote Bag',
    description: 'Handcrafted bohemian-style tote bag perfect for daily use',
    price: 18000,
    imageUrl: 'https://images.pexels.com/photos/6045242/pexels-photo-6045242.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Cozy Crochet Slippers',
    description: 'Warm and comfortable house slippers in soft yarn',
    price: 11200,
    imageUrl: 'https://images.pexels.com/photos/7691691/pexels-photo-7691691.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Vintage Crochet Top',
    description: 'Elegant sleeveless crochet top with intricate patterns',
    price: 26000,
    imageUrl: 'https://images.pexels.com/photos/4946515/pexels-photo-4946515.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Chunky Knit Shrug',
    description: 'Oversized cozy shrug perfect for layering',
    price: 22000,
    imageUrl: 'https://images.pexels.com/photos/7691728/pexels-photo-7691728.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Crochet Bucket Hat',
    description: 'Trendy bucket hat with beautiful stitch patterns',
    price: 12800,
    imageUrl: 'https://images.pexels.com/photos/5691630/pexels-photo-5691630.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Baby Crochet Blanket',
    description: 'Soft and gentle blanket perfect for little ones',
    price: 30000,
    imageUrl: 'https://images.pexels.com/photos/6032874/pexels-photo-6032874.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '7',
    title: 'Crochet Market Bag',
    description: 'Eco-friendly mesh bag for shopping and storage',
    price: 14000,
    imageUrl: 'https://images.pexels.com/photos/7078662/pexels-photo-7078662.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '8',
    title: 'Amigurumi Cat',
    description: 'Adorable handmade cat toy for children',
    price: 16000,
    imageUrl: 'https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '9',
    title: 'Crochet Cardigan',
    description: 'Elegant long cardigan with button closure',
    price: 34000,
    imageUrl: 'https://images.pexels.com/photos/7691735/pexels-photo-7691735.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '10',
    title: 'Crochet Headband',
    description: 'Stylish headband with flower detail',
    price: 8800,
    imageUrl: 'https://images.pexels.com/photos/7691740/pexels-photo-7691740.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '11',
    title: 'Crochet Scarf',
    description: 'Long cozy scarf in beautiful gradient colors',
    price: 15200,
    imageUrl: 'https://images.pexels.com/photos/7691745/pexels-photo-7691745.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
  {
    id: '12',
    title: 'Crochet Poncho',
    description: 'Stylish poncho perfect for any season',
    price: 27200,
    imageUrl: 'https://images.pexels.com/photos/7691750/pexels-photo-7691750.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
  },
];

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Check if products exist in localStorage
    const savedProducts = localStorage.getItem('hammies-products');
    
    if (savedProducts) {
      // Use saved products if they exist
      try {
        const parsedProducts = JSON.parse(savedProducts);
        setProducts(parsedProducts);
      } catch (error) {
        console.error('Error parsing saved products:', error);
        // If parsing fails, use initial products
        setProducts(initialProducts);
        localStorage.setItem('hammies-products', JSON.stringify(initialProducts));
      }
    } else {
      // First time visit - use initial products
      setProducts(initialProducts);
      localStorage.setItem('hammies-products', JSON.stringify(initialProducts));
    }
  }, []);

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    const updatedProducts = [newProduct, ...products];
    setProducts(updatedProducts);
    localStorage.setItem('hammies-products', JSON.stringify(updatedProducts));
  };

  const removeProduct = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('hammies-products', JSON.stringify(updatedProducts));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, removeProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};