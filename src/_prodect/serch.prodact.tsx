
'use client';

import React, {useState } from 'react';
import { getAllProducts } from '../_api/getallprodct';
import { InterfaceProducts } from '../types/interfaceproducts'
import { useEffect } from 'react';
import Image from 'next/image';
import LoadingScreen from '../app/loading';
import Bootuncart from '../_detalscart/Bootun.add.cart';
import Wishlist from '../_buttonwishlist/buttonwishlist';
import Link from 'next/link';
export default function SearchProduct() {
  const [allProducts, setAllProducts] = useState<InterfaceProducts[]>([]);
  const [query, setQuery] = useState<InterfaceProducts[]>([]);
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const fetchData = async () => {
    try {
        const products = await getAllProducts();
        setQuery(products);
        setAllProducts(products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); 
      }
    };
    fetchData();
  }, []);

  function filterProducts(value: string) {
    if (!value) {
      setQuery(allProducts);
      return;
    }

    const filtered = allProducts.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setQuery(filtered);
  }
if (loading) return <LoadingScreen />; 
  return (
    <div className='w-full'>
      <div className='w-full my-10 flex justify-center'>
        <form onSubmit={(e) => e.preventDefault()} className="w-[90%] p-4">
          <input
            onChange={(e) => filterProducts(e.target.value)}
            type="text"
            className='border border-2 w-full rounded-2xl p-4'
            placeholder="ابحث عن منتج..."
          />
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {query.map((product) => (
          <div key={product.id}>
            <div className="  w-full max-w-sm bg-white border border-gray-200 rounded-lg 
            shadow hover:shadow-lg transition-transform duration-300 hover:scale-[1.02] overflow-hidden cursor-pointer">
             
<Link href={`/prodactspciel/${product._id}`} className="block">
             <Image
                className="p-2 rounded-t-lg object-cover w-full h-full"
                src={product.imageCover}
                alt={product.title}
                width={500}
                height={300}
              />
            </Link>
              <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 mt-2 line-clamp-1">
                  {product.title}
                </h5>
                <div> <Wishlist   productIdd={product._id}  />     </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-2xl font-bold text-green-600">
                    {product.price} EGP
                  </span>
                  
                  <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    ⭐ {product.ratingsAverage}
                  </span>
                </div>
                <div className='w-full text-center mt-2'>
           <Bootuncart id={product._id} />

                </div>
              
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
