export const metadata = {
  title: "Change Password | FreshCart Account Settings",
  description:
    "Securely update your password to keep your FreshCart account safe. Easy and fast password change process.",
  keywords: [
    "change password",
    "account security",
    "FreshCart",
    "update password",
    "user settings",
    "online shopping",
  ],
  openGraph: {
    title: "FreshCart | Change Password",
    description:
      "Update your account password securely and keep your FreshCart account safe.",
    url: "https://www.freshcart.com/change-password",
    siteName: "FreshCart",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "FreshCart - Change Password",
    description:
      "Easily change your account password at FreshCart for better security.",
  },
};

import React from 'react'
import ChangePasswordForm from './clientchange-password'

export default function Page() {
  return (
    <div>
      <ChangePasswordForm />
    </div>
  )
}
