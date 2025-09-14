export const metadata = {
  title: "Sign In | FreshCart - Access Your Account",
  description:
    "Sign in to your FreshCart account to manage orders, wishlist, and personalized shopping experience.",
  keywords: [
    "sign in",
    "login",
    "FreshCart",
    "user account",
    "online shopping",
  ],
  openGraph: {
    title: "FreshCart | Sign In",
    description: "Access your FreshCart account securely and start shopping.",
    url: "https://www.freshcart.com/signin",
    siteName: "FreshCart",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "FreshCart - Sign In",
    description: "Securely sign in to your FreshCart account and enjoy shopping.",
  },
}

import React from 'react'
import Signclient from './clientsigin'

export default function Page() {
  return (
    <div>
      <Signclient />
    </div>
  )
}
