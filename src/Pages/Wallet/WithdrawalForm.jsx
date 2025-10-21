import React from 'react'
import { Input } from '@/components/ui/input'
import { RadioGroup } from '@radix-ui/react-radio-group'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'

const WithdrawalForm = () => {
  const [amount, setAmount] = React.useState("")

  const handleChange = (value) => {
    setAmount(value)
  }

  const handleSubmit = () => {
    console.log('Withdrawal Amount:', amount)
    // Add your submission logic here
  }

  return (
    <div className='pt-10 space-y-5'>
      <div className='flex justify-between items-center rounded-md bg-rose-500
      text-xl font-bold px-5 py-4'>
        <p>Available balance</p>
        <p>$90000</p>
      </div>
      <div className='flex flex-col items-center'>
        <h1>Enter Withdrawal Amount</h1>
        <Input
        onChange={(e)=>{handleChange}} 
        value={amount}
        className='withdrawalInput py-7 border-none 
        outline-none focus:outline-none px-0 text-2xl text-center'
        placeholder="$9999"
        type="number"
        />
        
      </div>

      <div>
        <p className='pb-2'>Transfer to</p>
        <div className='flex items-center gap-5 border px-5 py-5 rounded-md'>
          <img className='w-8 h-8 rounded-full' src="https://static.vecteezy.com/system/resources/previews/002/249/718/non_2x/bank-building-icon-finance-symbol-illustration-for-web-and-mobil-app-on-grey-background-free-vector.jpg" alt="" />
          <div >
            <p className='font-bold'>Yes Bank</p>
            <p className='text-sm text-muted-foreground'>**** **** 1234</p>
          </div>
        
        </div>
      </div>
      <DialogClose className='w-full'>
        <Button onClick={handleSubmit} className='w-full py-7  mt-5 bg-rose-500 hover:bg-rose-600 '>
        Confirm Withdrawal
      </Button>
      </DialogClose>
    </div>
  )
}

export default WithdrawalForm
