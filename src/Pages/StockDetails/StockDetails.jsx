import React from 'react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { BookMarkedIcon, DotIcon } from 'lucide-react'
import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import TreadingForm from './TreadingForm'
import StockChart from '../Home/StockChart'

const StockDetails = () => {
  return (
    <div className='p-5 mt-5'>
      <div className='flex justify-between'>
        <div className='flex gap-5 items-center'>
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
            <p className='text-red-600'>
              <span >-131949822.587</span>
              <span>(-0.25896314)</span>
            </p>
          </div>
        </div>
        </div>

        <div>
          <Button variant="outline" className="mr-5">
            {true ? (<BookmarkFilledIcon className='h-6 w-6'/>) :
            (
              <BookMarkedIcon className='h-6 w-6'/>
            )
            }
          </Button>
          <Dialog>
              <DialogTrigger>
                <Button size="lg">Tread</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>How much do you want to Spend?</DialogTitle>
                </DialogHeader>
                <TreadingForm/>
              </DialogContent>
          </Dialog>
        </div>

      </div>
      <div className='mt-10'>
        <StockChart/>
      </div>

    </div>
  )
}

export default StockDetails
