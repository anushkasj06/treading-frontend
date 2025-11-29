import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from '@/components/ui/button'
import "./Profile.css"

const AccountVerificationForm = () => {
  const [value, setValue] = useState("")

  const handleSubmit = () => {
    console.log("Entered OTP:", value)
  }

  return (
    <div className='otpCard'>
      <div className='flex flex-col gap-2'>
        <p className='text-sm text-slate-600'>Email</p>
        <p className='text-base font-semibold text-slate-900'>anushkasjadhav1@gmail.com</p>
      </div>

      <div className='mt-4 flex justify-between items-center'>
        <p className='text-sm text-slate-500'>Send a one time code to confirm.</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className='rounded-full'>Send OTP</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter the 6-digit code</DialogTitle>
            </DialogHeader>

            <div className='py-5 flex flex-col gap-4 justify-center items-center'>
              <InputOTP
                value={value}
                onChange={(value) => setValue(value)}
                maxLength={6}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <p className='otpTagline text-slate-500 text-xs'>Code expires in 2 minutes.</p>

              <DialogClose asChild>
                <Button className='w-[10rem]' onClick={handleSubmit}>
                  Submit
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default AccountVerificationForm
