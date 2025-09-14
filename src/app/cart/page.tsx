export const metadata = {
  title: "Cart | FreshCart - Your Shopping Cart",
  description:
    "Review the items in your shopping cart at FreshCart before proceeding to checkout. Easy and secure shopping experience.",
  keywords: [
    "shopping cart",
    "cart",
    "FreshCart",
    "online shopping",
    "checkout",
  ],
  openGraph: {
    title: "FreshCart | Your Shopping Cart",
    description:
      "Check your cart items and get ready to complete your purchase at FreshCart.",
    url: "https://www.freshcart.com/cart",
    siteName: "FreshCart",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "FreshCart - Shopping Cart",
    description:
      "View and manage your shopping cart items at FreshCart.",
  },
};

import React from 'react'
import Cart from '../../_detalscart/client.cart'

export default function Page() {
  return (
    <div>
      <Cart />
    </div>
  )
}
