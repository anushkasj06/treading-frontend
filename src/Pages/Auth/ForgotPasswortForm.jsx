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

const ForgotPasswortForm = () => {
  const form = useForm({
  defaultValues: {
    email: '',
  }
})


  const onSubmit = (data) => {
    console.log('Form data:', data)
  }

  return (
    <div className='authForm'>
      <h1 className='authFormHeading'>Reset access</h1>
      <p className='authFormSubHeading'>Enter your account email to receive a secure recovery link.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='authFormLabel'>Email address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='authInput'
                    placeholder='you@example.com'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <Button  type='submit' className='authPrimaryButton'>
            Send recovery email
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ForgotPasswortForm
