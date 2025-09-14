import Clienthome from "../_home/client.home";

export const metadata = {
  title: "Home | FreshCart - Clothing & Accessories Store",
  description:
    "Discover the latest trends in fashion at FreshCart. Shop stylish clothing, accessories, and everyday essentials for men, women, and kids. Quality you can trust, delivered to your door.",
  keywords: [
    "clothing store",
    "online fashion",
    "accessories",
    "men's fashion",
    "women's fashion",
    "kids clothes",
    "FreshCart",
    "shop online",
    "fashion trends",
  ],
  openGraph: {
    title: "FreshCart | Fashion & Accessories for the Whole Family",
    description:
      "Explore top-quality clothing and accessories for men, women, and kids. Stay trendy with FreshCart.",
    url: "https://www.freshcart.com",
    siteName: "FreshCart",
    images: [
      {
        url: "/images/freshcart-logo.svg", 
        width: 1200,
        height: 630,
        alt: "FreshCart - Fashion Store",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FreshCart - Trendy Clothing & Accessories",
    description:
      "Shop online for stylish clothes and accessories at FreshCart.",
    images: ["https://www.freshcart.com/og-image.jpg"], // عدل حسب الحاجة
  },
};

export default function Home() {
  return (
    <>
      <Clienthome />
    </>
  );
}
