'use client'

import React, { useContext, useEffect, useState } from 'react';
import { getdatacard, removallprodctcart, addprodctnumbr } from '../_api/card';
import { ICartProduct } from '../types/interfaceproducts';
import Bootunremovcart from './Bootun.remov.cart';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import { AppContext } from '@/types/context';
import Link from 'next/link';
import LoadingScreen from '../app/loading'; 

type CartResponse = {
  _id?: string; 
  products: ICartProduct[];
  totalCartPrice: number;
};

export default function Cart() {
  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [cartid, setCartId] = useState<string | null>(null); 
  const [loading, setLoading] = useState(true);
  const [loadingProductIdi, setloadingProductId] = useState<string | null>(null);
  const [didibol, setdidibol] = useState(false);
  const { setcount } = useContext(AppContext)!;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCartData();
  }, []);

  async function fetchCartData() {
    setLoading(true);
    setError(null);
    try {
      const data = await getdatacard();
      setCartData(data);
      setCartId(data._id || null);  
      const sum = data?.products?.reduce((total: number, item: { count: number }) => total + item.count, 0);
      setcount(sum || 0);
    } catch (err) {
      setError('Failed to load cart data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteAllProducts() {
    try {
      const res = await removallprodctcart();
      if (res.message === 'success') {
        toast.success('All products removed successfully');
        fetchCartData();
        setcount(0);
      } else {
        toast.error(res.message || 'Failed to delete products');
      }
    } catch (err) {
      toast.error('Error deleting products');
      console.error(err);
    }
  }

  async function addnumprprodact(id: string, count: number) {
    setloadingProductId(id);
    setdidibol(true);
    try {
      const data = await addprodctnumbr(id, count);
      if (data.status === 'success') {
        setCartData(data.data);
        const sum = data?.data?.products?.reduce((total: number, item: { count: number }) => total + item.count, 0);
        setcount(sum || 0);
      }
    } catch (err) {
      toast.error('Error updating product quantity');
      console.error(err);
    } finally {
      setloadingProductId(null);
      setdidibol(false);
    }
  }

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
            onClick={fetchCartData}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!cartData?.products?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Looks like you haven t added any items to your cart yet.</p>
          <Link 
            href="/Products"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-4 py-8 bg-gray-50">
      {didibol && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
            <i className="fas fa-spinner fa-spin text-blue-500 text-3xl mb-3"></i>
            <p className="text-gray-700">Updating cart...</p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Shopping Cart</h2>
          <p className="mt-2 text-lg text-gray-600">
            Total Price: <span className="font-semibold text-green-600">${cartData?.totalCartPrice || 0}</span>
          </p>

          <div className="mt-4">
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white" 
              onClick={deleteAllProducts} 
              variant="destructive"
            >
              <i className="fas fa-trash mr-2"></i>
              Delete All Products
            </Button>
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-4">Image</th>
                <th scope="col" className="px-6 py-4">Product</th>
                <th scope="col" className="px-6 py-4">Quantity</th>
                <th scope="col" className="px-6 py-4">Price</th>
                <th scope="col" className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartData.products.map((item) => (
                <tr
                  key={item.product._id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="p-4">
                    <img
                      src={item.product.imageCover}
                      className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-lg"
                      alt={item.product.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {item.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => addnumprprodact(item.product._id, item.count - 1)}
                        disabled={loadingProductIdi === item.product._id}
                        className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                        aria-label="Decrease quantity"
                      >
                        {item.count === 1 ? (
                          <i className="fas fa-trash text-red-500 text-xs"></i>
                        ) : (
                          <i className="fas fa-minus"></i>
                        )}
                      </button>

                      {loadingProductIdi === item.product._id ? (
                        <div className="w-12 h-8 flex items-center justify-center">
                          <i className="fas fa-spinner fa-spin text-blue-500"></i>
                        </div>
                      ) : (
                        <span className="w-12 text-center font-medium">
                          {item.count}
                        </span>
                      )}

                      <button
                        onClick={() => addnumprprodact(item.product._id, item.count + 1)}
                        disabled={loadingProductIdi === item.product._id}
                        className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                        aria-label="Increase quantity"
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">${item.price}</td>
                  <td className="px-6 py-4">
                    <Bootunremovcart id={item.product._id} getdata={fetchCartData} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {cartid && (
          <div className="flex justify-end mt-8 space-x-4">
            <Link 
              href="/Products"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Continue Shopping
            </Link>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Link href={'/checkoutseession/'+cartid}>
                Proceed to Checkout
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}