import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, DbProduct } from '../types';
import { supabase } from '../lib/supabase';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Helper function to convert database product to frontend product
const dbProductToProduct = (dbProduct: DbProduct): Product => ({
  id: dbProduct.id,
  title: dbProduct.title,
  description: dbProduct.description,
  price: dbProduct.price,
  imageUrl: dbProduct.image_url,
  createdAt: dbProduct.created_at,
});

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from Supabase
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      const formattedProducts = data?.map(dbProductToProduct) || [];
      setProducts(formattedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  // Add product to Supabase
  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt'>) => {
    try {
      setError(null);
      
      const { data, error } = await supabase
        .from('products')
        .insert([
          {
            title: productData.title,
            description: productData.description,
            price: productData.price,
            image_url: productData.imageUrl,
          }
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        const newProduct = dbProductToProduct(data);
        setProducts(prev => [newProduct, ...prev]);
      }
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Failed to add product. Please try again.');
      throw err;
    }
  };

  // Remove product from Supabase
  const removeProduct = async (id: string) => {
    try {
      setError(null);
      
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error removing product:', err);
      setError('Failed to delete product. Please try again.');
      throw err;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ 
      products, 
      addProduct, 
      removeProduct, 
      loading, 
      error 
    }}>
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