'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'react-hot-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { changepassword } from '../../_api/profil'
import { changePasswordSchema } from '../../types/scem_repassword'
import { z } from 'zod'

type ChangePasswordFormType = z.infer<typeof changePasswordSchema>

export default function ChangePasswordForm() {
  const form = useForm<ChangePasswordFormType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      rePassword: ''
    }
  });

  const onSubmit = async (data: ChangePasswordFormType) => {
    try {
      const res = await changepassword(data.currentPassword, data.password, data.rePassword)

      if (res.message === "success") {
        toast.success('Password has been changed successfully!')
      } else {
        toast.error(res.message || 'Something went wrong')
      }

    } catch (error) {
      let errorMessage = 'Something went wrong';
      if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        (error as { message: string }).message

      ) {
        errorMessage = (error as { message: string }).message
;
      }
      toast.error(errorMessage);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-[90%] max-w-lg bg-white p-8 rounded-lg shadow">
        <h2 className="text-4xl font-bold text-center mb-8">Change Password</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl">Current Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter current password"
                      className="w-full border border-black rounded-md px-4 py-6"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl">New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter new password"
                      className="w-full border border-black rounded-md px-4 py-6"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl">Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Re-enter new password"
                      className="w-full border border-black rounded-md px-4 py-6"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="text-2xl w-full bg-black text-white hover:bg-gray-800 rounded-md py-6 mt-3"
            >
              Update Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
