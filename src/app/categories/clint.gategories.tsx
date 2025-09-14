'use client';

import Image from 'next/image';
import { Category } from '../../types/interfaceproducts';
import { useState } from 'react';
import { getCategoriesById } from '../../_api/getallcategories';
import LoadingScreen from '../loading';

export default function CategoryList({ categories }: { categories: Category[] }) {
  const [categoryss, setCategoryss] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false); // إضافة حالة التحميل

  async function handleClick(id: string) {
    setLoading(true); // بدء التحميل
    try {
      const categoryData = await getCategoriesById(id);
      setCategoryss(categoryData);
    } catch (error) {
      console.error('Error fetching category:', error);
    } finally {
      setLoading(false); // إنهاء التحميل
    }
  }

  if (loading) return <LoadingScreen />; 

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => handleClick(category._id)}
            className="hover:shadow-green-700 hover:scale-[0.98] border rounded-lg hover:cursor-pointer overflow-hidden shadow-sm hover:shadow-md transition duration-200 bg-white"
          >
            <div className="w-full h-64 relative">
              <Image
                src={category.image || '/fallback.jpg'}
                alt={category.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="text-center py-4">
              <h2 className="text-green-700 text-lg font-semibold">{category.name}</h2>
            </div>
          </div>
        ))}
      </div>

      {categoryss && (
        <div 
          onClick={() => setCategoryss(null)} 
          className="w-full fixed top-0 left-0 right-0 bottom-0 p-4 py-8 bg-[rgba(23,22,22,0.8)] min-h-screen flex justify-center items-center z-50"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="text-center py-4 border border-gray-200 bg-black lg:w-[50%] md:w-[70%] w-[90%] flex flex-col justify-center items-center rounded-2xl relative max-h-[90vh] overflow-y-auto"
          >
            <div className='w-full flex justify-end p-2'>
              <button 
                className='mr-5 text-red-500 hover:text-red-700 transition-colors' 
                onClick={() => setCategoryss(null)}
                aria-label="Close"
              >
                <i className="fas fa-times text-3xl"></i>
              </button>
            </div>
            
            <div className="relative w-full md:w-[80%] h-64 md:h-80 my-4">
              <Image
                src={categoryss.image || '/fallback.jpg'}
                alt={categoryss.name}
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 768px) 90vw, 50vw"
              />
            </div>
            
            <div className="p-4 w-full">
              <h3 className="text-xl font-semibold text-white mb-2">{categoryss.name}</h3>
              <p className="text-sm text-gray-300 mt-1">
                Created: {new Date(categoryss.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}