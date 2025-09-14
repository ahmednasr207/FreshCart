'use client';

import { useEffect, useState } from 'react';
import { getwishlist, DELETEwishlist } from '@/_api/Wishlist';
import Image from 'next/image';
import WishlistData from '@/_buttonwishlist/dele.wishwishlist';
import ButtonAddCart from '../_detalscart/Bootun.add.cart';
import LoadingScreen from '../app/loading'
import { InterfaceProducts } from '@/types/interfaceproducts';

export default function WishlistPageClient() {
  const [products, setProducts] = useState<InterfaceProducts[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWishlist = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getwishlist();
      if (res.status === 'success') {
        setProducts(res.data || []);
      } else {
        setError('Failed to load wishlist');
      }
    } catch (err) {
      console.error('Error fetching wishlist:', err);
      setError('An error occurred while loading your wishlist');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
          <div className="text-6xl mb-4 text-red-500">❌</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchWishlist}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
          <div className="text-6xl mb-4">❤️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h1>
          <p className="text-gray-600 mb-6">You havent added any products to your wishlist yet.</p>
          <a 
            href="/Products"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Browse Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
          <p className="text-gray-600 mt-2">{products.length} {products.length === 1 ? 'item' : 'items'} in your wishlist</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product._id} 
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <Image
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  src={product.imageCover || '/fallback-image.jpg'}
                  alt={product.title || 'Product image'}
                  width={400}
                  height={300}
                  onError={(e) => {
                    e.currentTarget.src = '/fallback-image.jpg';
                  }}
                />
                <div className="absolute top-2 right-2">
                  <WishlistData
                    productIdd={product._id}
                    getdata={fetchWishlist} 
                  />
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 h-14">
                  {product.title}
                </h3>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-green-600">
                    ${product.price}
                  </span>
                  {product.ratingsAverage && (
                    <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded flex items-center gap-1">
                      ⭐ {product.ratingsAverage}
                    </span>
                  )}
                </div>

                <div className="mt-4  w-full text-center">
                  <ButtonAddCart id={product._id}  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}