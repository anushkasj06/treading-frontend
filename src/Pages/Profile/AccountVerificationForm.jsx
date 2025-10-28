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

const AccountVerificationForm = () => {
  const [value, setValue] = useState("")

  const handleSubmit = () => {
    console.log("Entered OTP:", value)
  }

  return (
    <div className='flex justify-center'>
      <div className='space-y-5 mt-10 w-full'>
        <div className='flex justify-between items-center'>
          <p>Email:</p>
          <p>anushkasjadhav1@gmail.com</p>

          {/* ✅ Proper Dialog Structure */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>Send OTP</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enter OTP</DialogTitle>
              </DialogHeader>

              <div className='py-5 flex flex-col gap-6 justify-center items-center'>
                {/* ✅ Fixed setter name */}
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
    </div>
  )
}

export default AccountVerificationForm
