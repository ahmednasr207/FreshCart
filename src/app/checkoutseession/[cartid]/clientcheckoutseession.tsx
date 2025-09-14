

'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useParams } from 'next/navigation'
import { gatshipp } from '../../../_api/order'

export default function CheckoutForm() {
  const { cartid } = useParams()

  const form = useForm({
    defaultValues: {
      details: '',
      phone: '',
      city: ''
    }
  })

  const onSubmit = async (data: {details:string,phone:string,city:string}) => {
    const shippingAddress = {
      details: data.details,
      phone: data.phone,
      city: data.city
    }

    if (typeof cartid === 'string') {
      const res = await gatshipp(cartid, shippingAddress)

      window.open(res.session.url)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4   ">
      <div className="w-[90%] h-[80%]  p-8 rounded-lg ">
        <h2 className="text-4xl font-bold text-center mb-8">Shipping Info</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Details */}
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-3xl'>Address Details</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter full address"
                      className="w-full border border-black rounded-md px-4 py-7"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-3xl'>Phone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="Enter your phone number"
                      className="w-full border border-black rounded-md px-4 py-7"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-3xl'>City</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your city"
                      className="w-full border border-black rounded-md px-4 py-7"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className=" text-3xl w-full bg-black text-white hover:bg-gray-800 rounded-md py-6 mt-3">
              Pay Now
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
