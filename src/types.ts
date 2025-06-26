export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: string;
}

export interface AdminState {
  isAuthenticated: boolean;
}

// Database product type (matches Supabase schema)
export interface DbProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  created_at: string;
  updated_at: string;
}