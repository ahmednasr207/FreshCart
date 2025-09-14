'use server'

import { getUserToken } from '../lib/auth-utils'

export async function addwishlist(productId:string) {
  const token = await getUserToken()
  if (!token) {
    throw new Error('Token error: User is not authenticated')
  }

  const res = await fetch(`${process.env.NEXTAUTH_PUBLIC_URL}/api/v1/wishlist`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify({
     productId
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


export async function DELETEwishlist(productId: string) {
  const token = await getUserToken();
  if (!token) {
    throw new Error('Token error: User is not authenticated');
  }

  const res = await fetch(`${process.env.NEXTAUTH_PUBLIC_URL}/api/v1/wishlist/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify({ }),
  });

  if (!res.ok) {
    const errRes = await res.json();
    console.error('❌ Error:', errRes);
    throw new Error(`Failed to delete from wishlist: ${errRes.message || res.statusText}`);
  }

  const data = await res.json();
  return data;
}



export async function getwishlist() {
  const token = await getUserToken()
  if (!token) {
    throw new Error('Token error: User is not authenticated')
  }

  const res = await fetch(`${process.env.NEXTAUTH_PUBLIC_URL}/api/v1/wishlist`, {
    method: 'GET', 
    headers: {
      token: token,
    },
 
  })

  if (!res.ok) {
    const errRes = await res.json()
    console.error('❌ Error:', errRes)
    throw new Error(`Failed to change password: ${errRes.message || res.statusText}`)
  }

  const data = await res.json()
  return data
}