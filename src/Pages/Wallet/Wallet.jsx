import React from 'react'
import {
  Card,
  CardContent,
  // CardAction,
  // CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
  // CardTitle,
} from "@/components/ui/card"

import {
  Avatar,
  AvatarFallback,
  // AvatarImage,
} from "@/components/ui/avatar"

import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { CopyIcon, DollarSign, ShuffleIcon, UploadIcon, WalletIcon } from 'lucide-react'
import { ReloadIcon, UpdateIcon } from '@radix-ui/react-icons'
import TopUpForm from './TopUpForm'
import WithdrawalForm from './WithdrawalForm'
import TransferForm from './TransferForm'

const Wallet = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className='pt-10 w-full lg:w-[60%]'>
      <Card>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <div className='flex flex-center gap-5'>
              <WalletIcon size={30} />
               <div>
              <CardTitle className="text-2xl"> My Wallet</CardTitle>
                <div className='flex items-center gap-2'>
                  <p>#A475Ed</p>
                  <CopyIcon size={15} className='cursor-pointer hover:text-slate-300'/>
              
                </div>
                
            </div>
            </div>

            <div>
              <ReloadIcon className='w-6 h-6 cursor-pointer hover:text-gray-400'/>
            </div>
           

          </div>
        </CardHeader>
        <CardContent>
          <div className='flex items-center'>
            <DollarSign/>
            <span className='text-2xl font-semibold'>20000</span>
          </div> 
          <div className='flex gap-7 mt-5'>
            <Dialog className="shadow-md shadow-rose-500  rounded-md">
              <DialogTrigger>
                <div className='h-24 w-24 hover:text-gray-400 cursor-pointer
                flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md'>
                  <UploadIcon size={30}  />
                  <span className='text-sm mt-2'>Add Money</span>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Top Up your wallet
                  </DialogTitle>
                </DialogHeader>
                <TopUpForm />
              </DialogContent>
              
            </Dialog>
            <Dialog>
              <DialogTrigger>
                <div className='h-24 w-24 hover:text-gray-400 cursor-pointer
                flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md'>
                  <UploadIcon size={30} />
                  <span className='text-sm mt-2'>Withdrawal</span>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Top Up your wallet
                  </DialogTitle>
                </DialogHeader>
                <WithdrawalForm />
              </DialogContent>
              
            </Dialog>
            <Dialog>
              <DialogTrigger>
                <div className='h-24 w-24 hover:text-gray-400 cursor-pointer
                flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md'>
                  <ShuffleIcon size={30} />
                  <span className='text-sm mt-2'>Transfer</span>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Transfer to other Wallet
                  </DialogTitle>
                </DialogHeader>
                <TransferForm/>
              </DialogContent>
              
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <div className='py-5 pt-10'>
      <div className='flex gap-5 items-center pb-5'> 
        <h1 className='text-2xl font-semibold'>Transaction History</h1>
        <UpdateIcon className='w-7 h-7 p-0 cursor-pointer hover:text-gray-400' />
      </div>
      
      <div className='space-y-5'>  
      {[1,1,1,1,1,1,1,1,1].map((item, index) => (
        <div key={index}>
        <Card className="lg:w-[100%] h-20 px-5 flex justify-between items-center">
        <div className='flex items-center gap-2'>
          <Avatar>
            <AvatarFallback>
              <ShuffleIcon className='text-rose-600' />
            </AvatarFallback>
          </Avatar>
          <div className='space-y-1'>
            <h1 className=''>Buy Asset</h1>
            <p className='text-sm text-gray-500'>2024-01-01</p>
          </div>
        </div>
        <div>
          <p className='text-sm text-green-300'>999 USD</p>
        </div>
      </Card>
      </div>
      ))}
      </div>


      </div >
      </div>
      
    </div>
  )
}

export default Wallet
