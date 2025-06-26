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