export const metadata = {
  title: "Product Details | FreshCart - Fashion & Accessories",
  description:
    "Explore detailed information about our stylish clothing and accessories at FreshCart. Make informed choices and shop your favorites.",
  keywords: [
    "product details",
    "fashion products",
    "clothing",
    "accessories",
    "FreshCart",
    "online shopping",
  ],
  openGraph: {
    title: "FreshCart | Product Details",
    description:
      "Discover more about our fashion products and accessories at FreshCart.",
    url: "https://www.freshcart.com/product", 
    siteName: "FreshCart",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "FreshCart - Product Details",
    description:
      "Find detailed info and shop your favorite fashion items at FreshCart.",
  },
};

import React from 'react'
import ProductDetailPage from '../../../_prodactspciel/client.prodactspciel'

export default function page() {
  return (
    <div>
      <ProductDetailPage />
    </div>
  )
}
