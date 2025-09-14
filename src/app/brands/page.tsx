export const metadata = {
  title: "Brands | FreshCart - Explore Top Fashion Brands",
  description:
    "Discover and shop from a variety of top fashion brands at FreshCart. Find your favorite labels and latest collections.",
  keywords: [
    "brands",
    "fashion brands",
    "FreshCart",
    "clothing brands",
    "online shopping",
  ],
  openGraph: {
    title: "FreshCart | Fashion Brands",
    description:
      "Explore the top fashion brands and their collections at FreshCart.",
    url: "https://www.freshcart.com/brands",
    siteName: "FreshCart",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "FreshCart - Fashion Brands",
    description:
      "Shop the latest collections from your favorite fashion brands at FreshCart.",
  },
};

import React from 'react'
import Brand from './clint.brand'
import { getAllbrands } from '../../_api/getallbrands'

export default async function Page() {
  const brands = await getAllbrands()

  return (
    <div className="p-4 py-8 bg-gray-100 min-h-screen">
      <Brand brands={brands} />
    </div>
  )
}
