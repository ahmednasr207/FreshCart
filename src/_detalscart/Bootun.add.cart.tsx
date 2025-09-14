'use client';
import { Button } from '@/components/ui/button'
import React ,{useContext} from 'react'
import { addprodctcart } from '../_api/card'
import { toast } from 'react-hot-toast'
import {AppContext} from '../types/context'
export default function ButtonAddCart({ id }: { id: string }) {

const {setcount}=useContext(AppContext)!

  async function addCart(id: string) {
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
      className="bg-green-600 text-white rounded-3xl px-6 py-2 hover:bg-green-800"
    >
      Add product to cart
    </Button>
  )
}
