import { cookies } from 'next/headers'
import { decode } from 'next-auth/jwt'

export async function getUserToken() {

  const Tkensession=(process.env.NODE_ENV==="production" ? '__Secure-next-auth.session-token': "next-auth.session-token")
  const cookieStore = await cookies()
  const tokenValue = cookieStore.get (Tkensession)?.value

  if (!tokenValue) return null

  const token = await decode({
    token: tokenValue,
    secret: process.env.NEXTAUTH_SECRET!,
  })

  return token?.token
}



export async function getUserId() {
    const Tkensession=(process.env.NODE_ENV==="production" ? '__Secure-next-auth.session-token': "next-auth.session-token")

  const cookieStore = await cookies()
  const tokenValue = cookieStore.get(Tkensession)?.value

  if (!tokenValue) return null

  const token = await decode({
    token: tokenValue,
    secret: process.env.NEXTAUTH_SECRET!,
  })

  return token?.user?.id ?? null
}