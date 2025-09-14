'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Brandint } from '../../types/interfaceproducts';
import { getbrands } from '../../_api/getallbrands';
import LoadingScreen from '../loading'; 

export default function Brand({ brands }: { brands: Brandint[] }) {
  const [selectedBrand, setSelectedBrand] = useState<Brandint | null>(null);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 

  async function handleBrandClick(id: string) {
    setLoading(true); 
    setError(null); 
    
    try {
      const brandd = await getbrands(id);
      setSelectedBrand(brandd);
    } catch (err) {
      console.error('Error fetching brand:', err);
      setError('Failed to load brand details. Please try again.');
    } finally {
      setLoading(false); 
    }
  }

  if (loading) return <LoadingScreen />;

  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-8'>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 w-[90%] max-w-4xl">
          <span className="block sm:inline">{error}</span>
          <button 
            className="absolute top-0 right-0 p-2" 
            onClick={() => setError(null)}
          >
            &times;
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 p-4 w-[95%] ">
        {brands.slice().reverse().map((brand) => (
          <div
            key={brand._id}
            onClick={() => handleBrandClick(brand._id)}
            className="group hover:shadow-green-700 border rounded-lg hover:scale-[0.98] hover:cursor-pointer overflow-hidden shadow-sm hover:shadow-md transition duration-300 bg-white"
          >
            <div className="w-full h-48 md:h-56 relative">
              <Image
                src={brand.image || '/fallback.jpg'}
                alt={brand.name}
                fill
                quality={85}
                className="object-cover group-hover:scale-105 transition duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
            <div className="text-center p-4">
              <h2 className="text-green-700 text-lg font-semibold truncate">{brand.name}</h2>
              <p className="text-gray-600 text-sm mt-1 truncate">{brand.slug}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedBrand && (
        <div
          onClick={() => setSelectedBrand(null)}
          className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center px-4 z-50 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-4xl max-h-[90vh] min-h-[300px] rounded-xl shadow-2xl p-6 relative flex flex-col gap-6 overflow-y-auto"
          >
            <button
              onClick={() => setSelectedBrand(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              &times;
            </button>

            {/* المحتوى الرئيسي */}
            <div className="flex flex-col md:flex-row items-center gap-7 mt-4">
              {/* الصورة */}
              <div className="w-full md:w-2/5">
                <div className="w-full h-48 md:h-64 relative rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={selectedBrand.image || '/fallback.jpg'}
                    alt={selectedBrand.name}
                    fill
                    quality={90}
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              </div>

              {/* النصوص */}
              <div className="w-full md:w-3/5 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-green-700 mb-2">{selectedBrand.name}</h3>
                <p className="text-lg text-gray-600 mb-4">{selectedBrand.slug}</p>
                <p className="text-sm text-gray-500">
                  Created: {new Date(selectedBrand.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button
                onClick={() => setSelectedBrand(null)}
                className="px-6 py-2 bg-gray-700 text-white text-lg rounded-lg hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}