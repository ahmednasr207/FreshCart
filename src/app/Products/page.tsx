export const metadata = {
  title: "Search Products | FreshCart - Find Your Favorite Fashion",
  description:
    "Search and explore a wide range of stylish clothing and accessories at FreshCart. Find your perfect outfit with ease.",
  keywords: [
    "search products",
    "fashion search",
    "clothing store",
    "FreshCart",
    "online shopping",
    "accessories",
  ],
  openGraph: {
    title: "FreshCart | Search Products",
    description:
      "Discover stylish clothing and accessories by searching at FreshCart.",
    url: "https://www.freshcart.com/search",
    siteName: "FreshCart",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "FreshCart - Search Products",
    description:
      "Find your favorite fashion items easily with FreshCart search.",
  },
};

import React from 'react'
import SearchProduct from '../../_prodect/serch.prodact'

export default function page() {
  return (
    <div>
      <SearchProduct />
    </div>
  )
}
