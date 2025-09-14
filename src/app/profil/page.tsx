export const metadata = {
  title: "User Profile | FreshCart - Your Orders & Info",
  description:
    "View your profile details, shipping address, and order history at FreshCart. Manage your account and keep track of your purchases easily.",
  keywords: [
    "user profile",
    "order history",
    "shipping address",
    "FreshCart",
    "account management",
    "online shopping",
  ],
  openGraph: {
    title: "FreshCart | User Profile & Order Summary",
    description:
      "Check your personal info, shipping details, and the number of orders you have placed at FreshCart.",
    url: "https://www.freshcart.com/profile",
    siteName: "FreshCart",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "FreshCart - User Profile & Orders",
    description:
      "Manage your profile and track your orders with FreshCart.",
  },
};

import React from 'react'
import { getuserorder } from '../../_api/order'
import { getUserToken } from '@/lib/auth-utils'
import Link from 'next/link'

export default async function Page() {
  const token = await getUserToken()
  const orders = await getuserorder()

  const firstOrder = orders[0] || null
  const userInfo = firstOrder?.user || null
  const shipping = firstOrder?.shippingAddress || null
  const orderCount = orders.length

  return (
    <div className="w-full flex justify-center items-center mt-12 font-sans text-gray-800 px-4">
      <div className="w-[80%] my-10">
        <h1 className="text-center mb-10 font-bold text-4xl text-blue-600">Profile</h1>

        {/* User Info */}
        <section className="bg-gray-100 rounded-xl p-6 shadow mb-6">
          <h2 className="text-xl mb-4 text-gray-700 border-b-2 border-blue-500 pb-2 font-semibold">User Info</h2>
          <p><span className="font-semibold">Name:</span> {userInfo?.name || 'N/A'}</p>
          <p><span className="font-semibold">Email:</span> {userInfo?.email || 'N/A'}</p>
        </section>

        {shipping && (
          <section className="bg-gray-100 rounded-xl p-6 shadow mb-6">
            <h2 className="text-xl mb-4 text-gray-700 border-b-2 border-blue-500 pb-2 font-semibold">Shipping Address</h2>
            <p><span className="font-semibold">City:</span> {shipping.city}</p>
            <p><span className="font-semibold">Details:</span> {shipping.details}</p>
            <p><span className="font-semibold">Phone:</span> {shipping.phone}</p>
          </section>
        )}

        <section className="bg-gray-100 rounded-xl p-6 shadow text-center mb-10">
          <h2 className="text-xl mb-2 text-gray-700 font-semibold">Number of Orders</h2>
          <p className="text-3xl font-bold text-blue-600">{orderCount}</p>
        </section>

        <section className="text-center mt-5 py-10 w-full">
          <Link href="/change-password" className="text-2xl w-[40%] py-6 px-9 bg-black text-white rounded-2xl">
            Change Password
          </Link>
        </section>
      </div>
    </div>
  )
}
