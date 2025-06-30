import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { Upload, Plus, X, Eye, EyeOff, Trash2, AlertTriangle, Loader2, Edit3, Save, Camera, Image as ImageIcon } from 'lucide-react';
import { Product } from '../types';

const ADMIN_PASSWORD = 'hammies2024'; // Simple demo password

const AdminPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { products, addProduct, updateProduct, removeProduct, uploadImage, loading, error } = useProducts();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    imageFile: null as File | null,
  });

  // Edit form state
  const [editData, setEditData] = useState<Partial<Product>>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password!');
    }
  };

  const handleImageUpload = async (file: File, isEdit = false) => {
    try {
      setUploadingImage(true);
      const imageUrl = await uploadImage(file);
      
      if (isEdit) {
        setEditData(prev => ({ ...prev, imageUrl }));
      } else {
        setFormData(prev => ({ ...prev, imageUrl, imageFile: file }));
      }
    } catch (error) {
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      handleImageUpload(file, isEdit);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.price || !formData.imageUrl) {
      alert('Please fill in all fields and upload an image');
      return;
    }

    setIsSubmitting(true);
    try {
      await addProduct({
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
        imageFile: null,
      });

      alert('Product added successfully!');
    } catch (error) {
      alert('Failed to add product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product.id);
    setEditData({
      title: product.title,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setEditData({});
  };

  const saveEdit = async () => {
    if (!editingProduct || !editData.title || !editData.description || !editData.price || !editData.imageUrl) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await updateProduct(editingProduct, {
        title: editData.title,
        description: editData.description,
        price: typeof editData.price === 'string' ? parseFloat(editData.price) : editData.price,
        imageUrl: editData.imageUrl,
      });

      setEditingProduct(null);
      setEditData({});
      alert('Product updated successfully!');
    } catch (error) {
      alert('Failed to update product. Please try again.');
    }
  };

  const handleDeleteProduct = async (productId: string, productTitle: string) => {
    if (deleteConfirm === productId) {
      try {
        await removeProduct(productId);
        setDeleteConfirm(null);
        alert(`"${productTitle}" has been permanently deleted!`);
      } catch (error) {
        alert('Failed to delete product. Please try again.');
      }
    } else {
      setDeleteConfirm(productId);
      setTimeout(() => {
        if (deleteConfirm === productId) {
          setDeleteConfirm(null);
        }
      }, 5000);
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
              {error && (
                <p className="text-red-500 text-sm mt-2">⚠️ {error}</p>
              )}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Enter amount in Nigerian Naira</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image
                </label>
                <div className="space-y-4">
                  {/* Image Upload */}
                  <div className="flex items-center gap-4">
                    <label className="flex-1 cursor-pointer">
                      <div className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-rose-400 transition-colors duration-200 flex items-center justify-center gap-2 text-gray-600 hover:text-rose-600">
                        {uploadingImage ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Camera className="w-5 h-5" />
                            <span>Upload from Phone/Camera</span>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={(e) => handleFileSelect(e)}
                        className="hidden"
                        disabled={uploadingImage || isSubmitting}
                      />
                    </label>
                  </div>

                  {/* Image Preview */}
                  {formData.imageUrl && (
                    <div className="relative">
                      <img 
                        src={formData.imageUrl} 
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, imageUrl: '', imageFile: null }))}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* URL Input as fallback */}
                  <div className="relative">
                    <input
                      type="url"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="Or paste image URL here"
                      disabled={isSubmitting}
                    />
                    <ImageIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || uploadingImage || !formData.imageUrl}
                className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white py-3 px-6 rounded-xl font-medium hover:from-rose-500 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Adding Product...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Add Product
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Product List */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Current Products ({loading ? '...' : products.length})
            </h2>
            
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-rose-400 animate-spin" />
                <span className="ml-2 text-gray-600">Loading products...</span>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {products.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-xl p-4">
                    {editingProduct === product.id ? (
                      // Edit Mode
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img 
                              src={editData.imageUrl || product.imageUrl} 
                              alt={editData.title || product.title}
                              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                            />
                            <label className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-200">
                              <Camera className="w-5 h-5 text-white" />
                              <input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                onChange={(e) => handleFileSelect(e, true)}
                                className="hidden"
                                disabled={uploadingImage}
                              />
                            </label>
                          </div>
                          <div className="flex-1 space-y-2">
                            <input
                              type="text"
                              name="title"
                              value={editData.title || ''}
                              onChange={handleEditInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                              placeholder="Product title"
                            />
                            <textarea
                              name="description"
                              value={editData.description || ''}
                              onChange={handleEditInputChange}
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm resize-none"
                              placeholder="Product description"
                            />
                            <div className="relative">
                              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">₦</span>
                              <input
                                type="number"
                                name="price"
                                value={editData.price || ''}
                                onChange={handleEditInputChange}
                                min="0"
                                step="100"
                                className="w-full pl-6 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                                placeholder="Price"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={saveEdit}
                            className="flex-1 px-3 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-1"
                          >
                            <Save className="w-4 h-4" />
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="flex-1 px-3 py-2 bg-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-400 transition-colors duration-200"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div className="flex items-center gap-4">
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
                        <div className="flex-shrink-0 flex gap-2">
                          <button
                            onClick={() => startEdit(product)}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                            title="Edit product"
                          >
                            <Edit3 className="w-5 h-5" />
                          </button>
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
                    )}
                  </div>
                ))}
                
                {products.length === 0 && !loading && (
                  <div className="text-center py-8 text-gray-500">
                    <Plus className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No products yet. Add your first product above!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;