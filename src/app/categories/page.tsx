export const metadata = {
  title: "Categories | FreshCart - Explore Fashion Collections",
  description:
    "Browse through a wide range of fashion categories at FreshCart. Discover clothing, accessories, and more for men, women, and kids.",
  keywords: [
    "categories",
    "fashion collections",
    "clothing",
    "accessories",
    "FreshCart",
    "shop online",
  ],
  openGraph: {
    title: "FreshCart | Fashion Categories",
    description:
      "Explore our diverse fashion categories and find your perfect style at FreshCart.",
    url: "https://www.freshcart.com/categories",
    siteName: "FreshCart",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "FreshCart - Fashion Categories",
    description:
      "Discover and shop fashion categories easily at FreshCart.",
  },
};

import { getAllCategories } from '../../_api/getallcategories';
import CategoryList from '../categories/clint.gategories';

export default async function Page() {
  const categories = await getAllCategories();

  return (
    <div className="p-4 py-8 bg-gray-100 min-h-screen">
      <CategoryList categories={categories} />
    </div>
  );
}
