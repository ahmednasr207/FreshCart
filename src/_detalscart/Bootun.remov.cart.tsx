
'use client';

import { Button } from '@/components/ui/button'
import React,{useContext} from 'react'
import { toast } from 'react-hot-toast'
import { removprodctcart } from '../_api/card'
import {AppContext}from '../types/context'

export default function ButtonRemoveCart({ id, getdata }: { id: string; getdata: () => void }) {


const {setcount}=useContext(AppContext)!


  async function removeCart(id: string) {
    const data = await removprodctcart(id)

    if (data.status === 'success') {
      toast.success('Product deleted successfully')

      getdata()

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
        removeCart(id)
      }}
      className="bg-red-600 text-white rounded-3xl px-6 py-2 text-2xl hover:bg-red-800"
    >
      Remove
    </Button>
  )
}
