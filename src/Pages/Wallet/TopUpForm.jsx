import { Input } from '@/components/ui/input'
import React from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DotFilledIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'


const TopUpForm = () => {
  const [amount, setAmount] = React.useState('')
  const [paymentMethod, setPaymentMethod] = React.useState('RAZORPAY')



  const handleAmountChange = (e) => {
    setAmount(e.target.value)
  }

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value)
  }

  const handleSubmit = (e) => {
    console.log('Amount:', amount)
    console.log('Payment Method:', paymentMethod)
    // Add your submission logic here
  }

  

  return (
    <>
    <div className='pt-10 space-y-5'>
      <div>
        <h1 className='pb-1'>Enter Amount</h1>
        <Input onChange={handleAmountChange} 
        value={amount}
        className='py-7 text-lg'
        placeholder='$9999'
        />
      </div>
      <div className='pb-1'>
        <h1>select Payment Method</h1>
        <RadioGroup 
        className='flex flex-col space-y-3 pt-5' 
        defaultValue="RAZORPAY"
        onValueChange={(value) => handlePaymentMethodChange(value)}>
          <div className='flex items-center space-x-2 border p-3 px-5 rounded-md'>
            <RadioGroupItem icon={DotFilledIcon} value="RAZORPAY" id="razorpay" />
            <Label htmlFor="razorpay">Razorpay</Label>
            <div className='bg-white rounded-md px-5 py-3 w-32'>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Razorpay_logo.svg/1200px-Razorpay_logo.svg.png?20171127075036" alt="" />

            </div>

            <RadioGroupItem icon={DotFilledIcon} value="STRIPE" id="stripe" />
            <Label htmlFor="stripe">Stripe</Label>
            <div className='bg-white rounded-md px-5  ml-2 py-3 w-30'>
              <img className='h-5' src="https://e7.pngegg.com/pngimages/776/791/png-clipart-stripe-payment-gateway-e-commerce-payment-system-business-strips-blue-company.png" alt="" />

            </div>
          </div>
        </RadioGroup>
      </div>

      <Button onClick={handleSubmit} className='w-full py-7  mt-5 bg-rose-500 hover:bg-rose-600 '>
        Submit
      </Button>
    </div>
    </>
  )
}

export default TopUpForm
