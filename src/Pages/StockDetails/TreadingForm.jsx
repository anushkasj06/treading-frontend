import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { DotIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

const TreadingForm = () => {
    const [orderType, setOrderType] = useState("BUY");
    const handleChange=()=>{
        console.log()
    }
  return (
    <div className='space-y-10 p-5'>
        <div>
            <div className='flex gap-4 items-center justify-between'>
                <Input
                className='py-7 focus:outline-none'
                placeholder="Enter Amount...."
                onChange={handleChange}
                type="number"
                name="amount"
                />
                <div>
                    <p className='border text-2xl flex justify-center items-center w-36 h-14 rounded-md'>4563</p>
                </div>
            </div>
            {true && <h1 className='text-red-700'>Insufficient wallet balance to buy</h1>}
        </div> 

        <div className='border rounded-md'>
            <div className='flex gap-5 items-center p-3'>
                <div>
                <Avatar> 
                    <AvatarImage
                    className='h-7 w-7'
                    src={"https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"}
                    />
                </Avatar>
                </div>
                <div >
                <div className='flex items-center gap-2'>
                    <p>BTC</p>
                    <DotIcon className='text-gray-400'/>
                    <p className='text-gray-400'>Bitcoin</p>
                </div>
                <div className='flex items-center gap-2'>
                    <p className='text-xl font-bold'>$6554</p>
                    <p className='text-green-600'>
                    <span >-131949822.587</span>
                    <span>(-0.25896314)</span>
                    </p>
                </div>
                </div>
            </div>
        </div>


        <div className='flex items-center justify-between'>
            <p>Order Type</p>
            <p>Market Order</p>
        </div>

        <div className='flex items-center justify-between'>
            <p>{orderType=="BUY" ? "Available Case": "Available Quantity "} </p>
            <p>{orderType=="But" ? 9000: 23.3}</p>
        </div>

        <div>
            <Button className={`w-full py-6 ${orderType=="SELL" ? "bg-rose-700 text-white hover:bg-rose-400": "bg-green-800 text-black hover:bg-green-400" }`}>
                {orderType}
            </Button>
            <Button variant="link" className="mt-5 text-white w-full text-xl " onClick={()=>setOrderType(orderType=="BUY"? "SELL":"BUY")}>
                {orderType=="BUY" ? "Or Sell": "Or Buy"}
            </Button>
        </div>
    </div>
  )
}

export default TreadingForm
