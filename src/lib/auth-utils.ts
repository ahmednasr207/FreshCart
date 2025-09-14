import { cookies } from 'next/headers'
import { decode } from 'next-auth/jwt'

export async function getUserToken() {
  const cookieStore = await cookies()
  const tokenValue = cookieStore.get ("next-auth.session-token")?.value

  if (!tokenValue) return null

  const token = await decode({
    token: tokenValue,
    secret: process.env.NEXTAUTH_SECRET!,
  })

  return token?.token
}



export async function getUserId() {
  const cookieStore = await cookies()
  const tokenValue = cookieStore.get("next-auth.session-token")?.value

  if (!tokenValue) return null

  const token = await decode({
    token: tokenValue,
    secret: process.env.NEXTAUTH_SECRET!,
  })

  return token?.user?.id ?? null
}