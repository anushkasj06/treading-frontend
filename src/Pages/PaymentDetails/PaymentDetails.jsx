import {Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import PaymentDetailsForm from './PaymentDetailsForm'

const PaymentDetails = () => {
  return (
    <div className='px-20'>
      <h1 className='text-3xl font-bold py-10'>Payment Details</h1>
      {true ? <Card>
        <CardHeader>
          <CardTitle>
            Yes Bank
          </CardTitle>
          <CardDescription>
            A/C No :
            **********2356
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex items-center'>
            <p className='w-32'>A/C Holder</p>
            <p className='text-gray-400'>Code with java</p>
          </div>
          <div className='flex items-center'>
            <p className='w-32' >IFSC</p>
            <p className='text-gray-400'>YESB000000457</p>
          </div>
        </CardContent>
      </Card>:
      <Dialog className="pt-5" >
        <DialogTrigger asChild>
          <Button className="py-6">Add payment details</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
          </DialogHeader>
          <PaymentDetailsForm/>
        </DialogContent>
    </Dialog>
      }
      
    </div>
  )
}

export default PaymentDetails
