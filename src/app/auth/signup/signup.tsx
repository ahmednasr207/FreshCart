'use client'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { registerUser } from '../../../_api/apirejsteruser'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchemaType, formSchema } from '../../../types/interfaceschema'
import {RegisterResponse} from'../../../types/interfaceproducts'
import { useRouter } from 'next/navigation'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast';

export default function Signupclient() {

const router = useRouter()

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
  })

  const [loading, setLoading] =useState(false)
  const onSubmit = async (data:formSchemaType) => {
    try {
      setLoading(true)

const rejastr: RegisterResponse = await registerUser(data);



      if (rejastr.message==='success') {

toast.success('Signup successful! Redirecting you to the login page...');
        setTimeout(() => {
  router.push('/auth/signin')
  }, 2000);



}else{


toast.error(rejastr.message || 'Registration failed ❌');
}


   } catch (error: unknown) {
  if (error instanceof Error) {
    toast.error(error.message || 'Registration failed ❌');
  } else {
    toast.error('Something went wrong ❌');
  }
}
finally{

setLoading(false)


    }




  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-[90%] max-w-2xl p-10 bg-white shadow-xl rounded-lg dark:bg-gray-800">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          Create a New Account
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="h-12 text-base" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Email</FormLabel>
                  <FormControl>
                    <Input type="email" className="h-12 text-base" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="h-12 text-base" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* rePassword */}
            <FormField
              name="rePassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="h-12 text-base" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" className="h-12 text-base" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg font-medium transition-colors"
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />: 'Create Account'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
