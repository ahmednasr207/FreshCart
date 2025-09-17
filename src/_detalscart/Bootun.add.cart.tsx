'use client';
import { Button } from '@/components/ui/button'
import React ,{useContext} from 'react'
import { addprodctcart } from '../_api/card'
import { toast } from 'react-hot-toast'
import {AppContext} from '../types/context'
import { useSession } from 'next-auth/react';
import{ useRouter } from 'next/navigation';
export default function ButtonAddCart({ id }: { id: string }) {

const {setcount}=useContext(AppContext)!

const {data ,status }=useSession()
const routerr=useRouter();


  async function addCart(id: string) {

if(status==='unauthenticated'){

toast.error('Please sign in to continue');

setTimeout(()=>{
  
toast.loading('You are being redirected to the login page...');

},100)


setTimeout(()=>{
  
routerr.push('/auth/signin')

},3000)


return
}

    const data = await addprodctcart(id)
    if (data.status === 'success') {
      toast.success('Product added successfully')
      const sum = data?.data?.products?.reduce((total:number, item:{count:number}) => total += item.count, 0);
      setcount(sum);
    } else {
      toast.error(data.message)
    }
  }

  return (
    <Button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        addCart(id)
      }}
      className="bg-green-600 text-white w-[90%] rounded-3xl px-6 py-2 hover:bg-green-800"
    >
      Add product to cart
    </Button>
  )
}
