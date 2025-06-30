import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, DbProduct } from '../types';
import { supabase } from '../lib/supabase';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
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

  // Upload image to Supabase Storage
  const uploadImage = async (file: File): Promise<string> => {
    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `product-images/${fileName}`;

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      console.error('Error uploading image:', err);
      throw new Error('Failed to upload image. Please try again.');
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

  // Update product in Supabase
  const updateProduct = async (id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>) => {
    try {
      setError(null);
      
      const updateData: any = {};
      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.price !== undefined) updateData.price = updates.price;
      if (updates.imageUrl !== undefined) updateData.image_url = updates.imageUrl;

      const { data, error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        const updatedProduct = dbProductToProduct(data);
        setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
      }
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Failed to update product. Please try again.');
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
      updateProduct,
      removeProduct, 
      uploadImage,
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