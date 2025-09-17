'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

interface User {
  name?: string
  email?: string
}

export default function ClientProfile() {
  const { data } = useSession()
  const [userInfo, setUserInfo] = useState<User | null>(null)

  useEffect(() => {
    if (data?.user) {
      setUserInfo(data.user)
    }
  }, [data])

  return (
    <section className="bg-gray-100 rounded-xl p-6 shadow mb-6">
      <h2 className="text-xl mb-4 text-gray-700 border-b-2 border-blue-500 pb-2 font-semibold">
        User Information
      </h2>
      <p>
        <span className="font-semibold">Name:</span> {userInfo?.name || 'Not available'}
      </p>
      <p>
        <span className="font-semibold">Email:</span> {userInfo?.email || 'Not available'}
      </p>
    </section>
  )
}
