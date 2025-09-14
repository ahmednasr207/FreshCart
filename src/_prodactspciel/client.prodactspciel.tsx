'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getonepost } from '../_api/getonepost';
import Bootuncart from '../_detalscart/Bootun.add.cart'
import LoadingScreen from '../app/loading';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  ratingsAverage: number;
  images: string[];
  
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getPost(id);
    }
  }, [id]);

  async function getPost(productId: string) {
    try {
      setLoading(true);
      const productData = await getonepost(productId);
      setProduct(productData.data);
      if (productData.data.images.length > 0) {
        setMainImage(productData.data.images[0]);
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product data');
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingScreen />;
  if (error)
    return (
      <div className="text-center py-10 text-red-500 text-xl">{error}</div>
    );
  if (!product)
    return (
      <div className="text-center py-10 text-gray-500 text-xl">
        Product not found
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6 w-full ">
      <div className="bg-white rounded-lg shadow-xl w-[90%]  h-[80%] p-8 flex flex-col md:flex-row gap-10 my-5">

        <div className="flex-[0_0_40%] flex flex-col items-center gap-4">
          <div className="relative w-full" style={{ paddingTop: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            {mainImage && (
              <Image
                src={mainImage}
                alt={product.title}
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            )}
          </div>

          <div className="flex gap-3 mt-4 overflow-x-auto w-full">
            {product.images.map((imgUrl, index) => (
              <div
                key={index}
                className={`relative w-20 h-20 rounded-md cursor-pointer border-2 flex-shrink-0 ${
                  imgUrl === mainImage ? 'border-green-600' : 'border-transparent'
                }`}
                onClick={() => setMainImage(imgUrl)}
              >
                <Image
                  src={imgUrl}
                  alt={`${product.title} thumbnail ${index + 1}`}

                  width={100}
                  height={100}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='  w-full flex  flex-col justify-between'>
       <div className="flex-[0_0_60%] flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{product.title}</h1>
            <p className="text-gray-700 leading-relaxed mb-8 whitespace-pre-line">
              {product.description}
            </p>
          </div>

          <div>
            <p className="text-3xl font-bold text-gray-900 mb-8">{product.price} EGP</p>
                           <Bootuncart id={product._id} />
           
          </div>
        </div>        </div>


      </div>
    </div>
  );
}
