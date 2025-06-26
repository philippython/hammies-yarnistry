import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { Upload, Plus, X, Eye, EyeOff, Trash2, AlertTriangle } from 'lucide-react';

const ADMIN_PASSWORD = 'hammies2024'; // Simple demo password

const AdminPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { products, addProduct, removeProduct } = useProducts();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password!');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.price || !formData.imageUrl) {
      alert('Please fill in all fields');
      return;
    }

    addProduct({
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      imageUrl: formData.imageUrl,
    });

    setFormData({
      title: '',
      description: '',
      price: '',
      imageUrl: '',
    });

    alert('Product added successfully!');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteProduct = (productId: string, productTitle: string) => {
    if (deleteConfirm === productId) {
      // Permanently delete the product
      removeProduct(productId);
      setDeleteConfirm(null);
      alert(`"${productTitle}" has been permanently deleted!`);
    } else {
      // Show confirmation
      setDeleteConfirm(productId);
      setTimeout(() => {
        if (deleteConfirm === productId) {
          setDeleteConfirm(null);
        }
      }, 5000); // Auto-cancel after 5 seconds
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-rose-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Admin Access</h2>
            <p className="text-gray-600 mt-2">Enter password to manage products</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white py-3 px-6 rounded-xl font-medium hover:from-rose-500 hover:to-pink-600 transition-all duration-300"
            >
              Login
            </button>
          </form>

          <button
            onClick={onBack}
            className="w-full mt-4 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            ← Back to Website
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your Hammies Yarnistry collection</p>
            </div>
            <button
              onClick={onBack}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              ← Back to Website
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add Product Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Plus className="w-6 h-6 text-rose-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="e.g., Cozy Pastel Blanket"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                  placeholder="Describe your beautiful creation..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₦)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₦</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="100"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="25,000"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Enter amount in Nigerian Naira</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white py-3 px-6 rounded-xl font-medium hover:from-rose-500 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </form>
          </div>

          {/* Product List */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Current Products ({products.length})</h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {products.map((product) => (
                <div key={product.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">{product.title}</h3>
                    <p className="text-sm text-gray-600 truncate">{product.description}</p>
                    <p className="text-sm font-medium text-rose-600">₦{product.price.toLocaleString()}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {deleteConfirm === product.id ? (
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-red-600 text-xs">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Sure?</span>
                        </div>
                        <button
                          onClick={() => handleDeleteProduct(product.id, product.title)}
                          className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors duration-200"
                        >
                          DELETE
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded-lg hover:bg-gray-400 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleDeleteProduct(product.id, product.title)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        title="Delete product permanently"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {products.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Plus className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No products yet. Add your first product above!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;