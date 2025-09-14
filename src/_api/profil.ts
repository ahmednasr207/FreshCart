'use server'

import { getUserToken } from '../lib/auth-utils'

export async function changepassword(currentPassword: string, password: string, rePassword: string) {
  const token = await getUserToken()
  if (!token) {
    throw new Error('Token error: User is not authenticated')
  }

  const res = await fetch(`${process.env.NEXTAUTH_PUBLIC_URL}/api/v1/users/changeMyPassword`, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify({
      currentPassword,
      password,
      rePassword
    })
  })

  if (!res.ok) {
    const errRes = await res.json()
    console.error('❌ Error:', errRes)
    throw new Error(`Failed to change password: ${errRes.message || res.statusText}`)
  }

  const data = await res.json()
  return data
}
