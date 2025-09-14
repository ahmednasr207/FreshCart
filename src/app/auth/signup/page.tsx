export const metadata = {
  title: "Signup | FreshCart - Create Your Account",
  description:
    "Join FreshCart today to start shopping the latest fashion trends. Easy and secure account registration.",
  keywords: [
    "signup",
    "create account",
    "register",
    "FreshCart",
    "online shopping",
  ],
  openGraph: {
    title: "FreshCart | Signup",
    description: "Create your FreshCart account to enjoy personalized shopping experience.",
    url: "https://www.freshcart.com/signup",
    siteName: "FreshCart",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "FreshCart - Signup",
    description: "Register your account on FreshCart and start shopping today.",
  },
}

import React from 'react'
import Signupclient from './signup'

export default function Page() {
  return (
    <div>
      <Signupclient />
    </div>
  )
}
