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

const PaymentDetailsForm = () => {
  const form = useForm({
  defaultValues: {
    accountHolderName: '',
    ifsc: '',
    accountNumber: '',
    confirmAccountNumber: '',
    bankName: ''   // ✅ corrected
  }
})


  const onSubmit = (data) => {
    console.log('Form data:', data)
  }

  return (
    <div className='px-10 py-2'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>

          <FormField
            control={form.control}
            name='accountHolderName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Holder Name:</FormLabel>
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
            name='ifsc'
            render={({ field }) => (
              <FormItem>
                <FormLabel>IFSC Code:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='border w-full border-rose-700 p-5'
                    placeholder='BKID000XXXX'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='accountNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='border w-full border-rose-700 p-5'
                    placeholder='7854XXXXXX'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='confirmAccountNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Account Number:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='border w-full border-rose-700 p-5'
                    placeholder='7854XXXXXX'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='bankName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='border w-full border-rose-700 p-5'
                    placeholder='YES BANK'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogClose className='w-full'>
            <Button type='submit' className='w-full py-5'>
            Submit
          </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  )
}

export default PaymentDetailsForm
