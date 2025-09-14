'use client';
import Image from "next/image";
import { getAllProducts } from '../_api/getallprodct';
import { useEffect, useState } from "react";
import { InterfaceProducts } from "../types/interfaceproducts";
import LoadingScreen from "../app/loading";
import Link from "next/link";
import Bootuncart from '../_detalscart/Bootun.add.cart';
import LargeDisplay from "./cart.img";
import Wishlist from "@/_buttonwishlist/buttonwishlist";

export default function Clienthome() {
  const [query, setQuery] = useState<InterfaceProducts[]>([]);
  const [queryall, setAllProducts] = useState<InterfaceProducts[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getdata() {
      try {
        const products = await getAllProducts();
        setQuery(products);
        setAllProducts(products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getdata();
  }, []);

  function filterProducts(data: string) {
    const filtered = queryall.filter((item) =>
      item.title.toLowerCase().trim().includes(data.toLowerCase().trim())
    );
    setQuery(filtered);
  }

  if (loading) return <LoadingScreen />;

  return (
    <div className="w-full">

<div className="w-full">
  <LargeDisplay></LargeDisplay>
</div>

      <div className="w-full my-10 flex justify-center">
        <form onSubmit={(e) => e.preventDefault()} className="w-[90%] p-4">
          <input
            onChange={(e) => filterProducts(e.target.value)}
            type="text"
            className="border border-gray-300 w-full rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="ابحث عن منتج..."
          />
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {query.map((product) => (
          <div
            key={product._id}
            className="w-full max-w-sm rounded-lg 
     hover:shadow-lg transition-transform duration-300 hover:scale-[1.02] overflow-hidden cursor-pointer flex flex-col"
          >
            <Link href={`/prodactspciel/${product._id}`} className="block">
              <Image
                className="rounded-t-lg object-cover w-full "
                src={product.imageCover}
                alt={product.title}
                width={500}
                height={200}
              />
            </Link>

            <div className="px-5 py-4 flex-1 flex flex-col justify-between">
              <Link href={`/prodactspciel/${product._id}`}>
                <h5 className="text-lg font-semibold tracking-tight text-gray-900 line-clamp-1 hover:text-blue-600">
                  {product.title}
                </h5>
              </Link>
                <div> <Wishlist   productIdd={product._id}  />     </div>

              <div className="flex items-center justify-between mt-3">
                <span className="text-xl font-bold text-green-600">
                  {product.price} EGP
                </span>
                <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  ⭐ {product.ratingsAverage}
                </span>
              </div>

                <Bootuncart id={product._id} />
            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
