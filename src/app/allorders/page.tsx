export const metadata = {
  title: "My Orders | FreshCart - Track Your Purchases",
  description:
    "View and manage your past orders at StyleNest. Track payment status, delivery, and order details easily.",
  keywords: [
    "orders",
    "my orders",
    "purchase history",
    "StyleNest",
    "online shopping",
    "order tracking",
  ],
  openGraph: {
    title: "StyleNest | My Orders",
    description:
      "Manage and track your orders at StyleNest. Secure and easy shopping experience.",
    url: "https://www.stylenest.com/orders",
    siteName: "StyleNest",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "StyleNest - My Orders",
    description: "Track and manage your StyleNest orders easily.",
  },
};

import React from "react";
import Image from "next/image";
import { getuserorder } from "../../_api/order";

interface Product {
  _id: string;
  title: string;
  imageCover: string;
}

interface CartItem {
  _id: string;
  product: Product;
  price: number;
  count: number;
}

interface Order {
  _id: string;
  id: string;
  createdAt: string;
  isPaid: boolean;
  isDelivered: boolean;
  paymentMethodType: string;
  totalOrderPrice: number;
  cartItems: CartItem[];
}

export default async function OrdersPage() {
  let orders: Order[] = [];

  try {
    orders = await getuserorder();
  } catch (_) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Error loading orders</h1>
          <p className="text-gray-600">There was an issue fetching your orders. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
          <div className="text-6xl mb-4">📦</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h1>
          <p className="text-gray-600">You haven&apos;t placed any orders. Start shopping to see your orders here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">Track and manage your purchases</p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all hover:shadow-lg"
            >
              <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Order #{order.id}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.isPaid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Not Paid"}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.isDelivered ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.isDelivered ? "Delivered" : "Processing"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
                    <p className="text-gray-900 capitalize">{order.paymentMethodType}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
                    <p className="text-xl font-bold text-green-700">{order.totalOrderPrice} EGP</p>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>

                <div className="space-y-3">
                  {order.cartItems.map((item) => (
                    <div key={item._id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        width={64}
                        height={64}
                        className="rounded-md flex-shrink-0 object-cover"
                      />
                      <div className="flex-grow min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{item.product.title}</h4>
                        <div className="flex flex-wrap gap-4 mt-1">
                          <span className="text-sm text-gray-600">{item.price} EGP</span>
                          <span className="text-sm text-gray-600">Qty: {item.count}</span>
                          <span className="text-sm font-medium text-gray-900">
                            Total: {item.price * item.count} EGP
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
