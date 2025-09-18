'use server'

import { getUserToken, getUserId } from '../lib/auth-utils'

type ShippingAddress = {
  details: string
  phone: string
  city: string
}

export async function gatshipp(cartid: string, shippingAddress: ShippingAddress) {
  const token = await getUserToken()
  if (!token) {
    throw new Error('Token error: User is not authenticated')
  }

  const res = await fetch(`${process.env.NEXTAUTH_PUBLIC_URL}/api/v1/orders/checkout-session/${cartid}?https://fresh-cart-five-iota.vercel.app/allorders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token:token,
    },
    body: JSON.stringify({shippingAddress}),
  })

  if (!res.ok) {
    throw new Error(`Failed to create checkout session: ${res.statusText}`)
  }

  const data = await res.json()
  return data
}




export async function gatuserorder(cartid: string, shippingAddress: ShippingAddress) {
  const token = await getUserToken()
  
  if (!token) {
    throw new Error('Token error: User is not authenticated')
  }

  const res = await fetch(`${process.env.NEXTAUTH_PUBLIC_URL}/api/v1/orders/checkout-session/${cartid}?${process.env.NEXTAUTH_LOCAL_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token:token,
    },
    body: JSON.stringify({shippingAddress}),
  })

  if (!res.ok) {
    throw new Error(`Failed to create checkout session: ${res.statusText}`)
  }

  const data = await res.json()
  return data
}




// export async function getuserorder() {
//   const token = await getUserToken()
//   if (!token) {
//     throw new Error('Token error: User is not authenticated')
//   }

//   const res = await fetch(`${process.env.NEXTAUTH_PUBLIC_URL}/api/v1/orders`, {
//     method: 'GET',
//     headers: {
//       token:token,
//     },
//   })

//   if (!res.ok) {
//     throw new Error(`Failed to create checkout session: ${res.statusText}`)
//   }

//   const data = await res.json()
//   return data 
// }




export async function getuserorder() {
  const token = await getUserToken()
  const id=await getUserId()
  if (!token) {
    throw new Error('Token error: User is not authenticated')
  }

  const res = await fetch(`${process.env.NEXTAUTH_PUBLIC_URL}/api/v1/orders/user/${id}`, {
    method: 'GET',
    headers: {
      token:token,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to create checkout session: ${res.statusText}`)
  }

  const data = await res.json()
  return data 
}













