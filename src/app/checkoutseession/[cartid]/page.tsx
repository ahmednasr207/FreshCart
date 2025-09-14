export const metadata = {
  title: "Checkout | FreshCart - Secure Shipping & Payment",
  description:
    "Enter your shipping information and complete your purchase securely at FreshCart. Fast and reliable checkout process for your fashion orders.",
  keywords: [
    "checkout",
    "shipping info",
    "payment",
    "FreshCart",
    "online shopping",
    "secure checkout",
  ],
  openGraph: {
    title: "FreshCart | Checkout & Shipping Information",
    description:
      "Complete your order by providing shipping details and payment through FreshCart's secure checkout.",
    url: "https://www.freshcart.com/checkout",
    siteName: "FreshCart",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "FreshCart - Checkout & Shipping",
    description:
      "Securely enter your shipping information and complete your purchase at FreshCart.",
  },
};

import React from 'react'
import CheckoutForm from './clientcheckoutseession'

export default function Page() {
  return (
    <div>
      <CheckoutForm />
    </div>
  )
}
