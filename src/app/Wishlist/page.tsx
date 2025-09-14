export const metadata = {
  title: "Wishlist | FreshCart - Your Favorite Items",
  description:
    "Browse your favorite fashion items saved in your FreshCart wishlist. Easily review and shop later your preferred products.",
  keywords: [
    "wishlist",
    "favorite items",
    "FreshCart",
    "saved products",
    "online shopping",
  ],
  openGraph: {
    title: "FreshCart | Wishlist",
    description:
      "View and manage your wishlist items at FreshCart.",
    url: "https://www.freshcart.com/wishlist",
    siteName: "FreshCart",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "FreshCart - Wishlist",
    description:
      "Check your saved favorite items and shop anytime from your wishlist at FreshCart.",
  },
};

import React from 'react'
import WishlistPageClient from '../../_buttonwishlist/WishlistPageClient'

export default function Page() {
  return (
    <div className="w-full p-4">
<h1 className="text-2xl font-bold text-center mb-8">Wishlist</h1>
      <WishlistPageClient />
    </div>
  )
}
