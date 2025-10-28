import React from 'react'
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'

const SignUpForm = () => {
  const form = useForm({
  defaultValues: {
    fullName: '',
    email: '',
    password: '',
  }
})


  const onSubmit = (data) => {
    console.log('Form data:', data)
  }

  return (
    <div className='px-10 py-2'>
      <h1 className='text-xl font-bold text-center pb-3'>Create new Account</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>

          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className='border w-full border-rose-700 p-5'
                    placeholder='Anushka Jadhav'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className='border w-full border-rose-700 p-5'
                    placeholder='anushkasjXXXX@gmail.com'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className='border w-full border-rose-700 p-5'
                    placeholder='1243*******'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <Button type='submit' className='w-full py-5'>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default SignUpForm
