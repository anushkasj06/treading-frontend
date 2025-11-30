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
import { useDispatch } from 'react-redux'
import { login } from '@/State/Auth/Action'
import { useNavigate } from 'react-router-dom'

const SignInForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const form = useForm({
  defaultValues: {
    email: '',
    password: '',
  }
})


  const onSubmit = (data) => {
    dispatch(login(data, navigate))
    console.log('Form data:', data)
  }

  return (
    <div className='authForm'>
      <h1 className='authFormHeading'>Log in to your hub</h1>
      <p className='authFormSubHeading'>Secure authentication with adaptive protection.</p>
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

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='authFormLabel'>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='password'
                    className='authInput'
                    placeholder='••••••••'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <Button  type='submit' className='authPrimaryButton'>
            Continue
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default SignInForm
