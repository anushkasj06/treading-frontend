import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@radix-ui/react-dialog'

const TransferForm = () => {
  const [FormData, setFormData] = React.useState({
    amount: '',
    walletId: '',
    purpose: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...FormData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = () => {
    console.log('Transfer Data:', FormData)
    // Add your submission logic here
  }


  return (
    <div>
      <div className="pb-2">
        <h1 className='pb-1'>Enter Amount</h1>
        <Input className="py-7 border-rose-700" placeholder="$9999" name="amount" onChange={handleChange} value={FormData.amount} />
      </div>

      <div className="pb-2">
        <h1 className='pb-1'>Wallet Id</h1>
        <Input className="py-7 border-rose-700" placeholder="Enter Wallet Id" name="walletId" onChange={handleChange} value={FormData.walletId} />
      </div>

      <div className='pb-2'>
        <h1 className='pb-1'>Purpose</h1>
        <Input className="py-7 border-rose-700" placeholder="Enter Purpose " name="purpose" onChange={handleChange} value={FormData.purpose} />
      </div>

      <DialogClose className='w-full'>
        <Button onClick={handleSubmit} className="w-full py-7  mt-5 bg-rose-500 hover:bg-rose-600 ">
        Submit
      </Button>
      </DialogClose>
    </div>

    
  )
}

export default TransferForm

