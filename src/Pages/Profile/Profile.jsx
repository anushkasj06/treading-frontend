import React from 'react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { VerifiedIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AccountVerificationForm from './AccountVerificationForm'
import { Button } from '@/components/ui/button'

const Profile = () => {

  const handleEnableTwoStepVerification =()=>{
    console.log("Two step verification")
  } 


  return (
    <div className='flex flex-col items-center mb-5'>
      <div className='pt-10 w-full lg:w-[60%]'>
        <Card>
          <CardHeader>
            <CardTitle>Your Informtaion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='lg:flex gap-32'>
              <div className='space-y-7'>
                <div className='flex'>
                <p className='w-[9rem]'>Email: </p>
                <p className='text-gray-500'>anushkasjadhav1@gmail.com</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem]'>Full Name: </p>
                  <p className='text-gray-500'>Anushka Jadhav</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem]'>Date of Birth: </p>
                  <p className='text-gray-500'>20/04/2006</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem]'>Nationality: </p>
                  <p className='text-gray-500'>India</p>
                </div>
              </div>
              <div className='space-y-7'>
                <div className='flex'>
                <p className='w-[9rem]'>Email: </p>
                <p className='text-gray-500'>anushkasjadhav1@gmail.com</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem]'>Full Name: </p>
                  <p className='text-gray-500'>Anushka Jadhav</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem]'>Date of Birth: </p>
                  <p className='text-gray-500'>20/04/2006</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem]'>Nationality: </p>
                  <p className='text-gray-500'>India</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='mt-6'>
          <Card className="w-full">
            <CardHeader className='pb-7' >
              <div className='flex items-center gap-3'>
                <CardTitle>
                  2 Step verification
                </CardTitle>
                {true ? <Badge className={"space-x-2 text-white bg-green-600"}>
                  <VerifiedIcon/>
                  <span>
                    Enable
                  </span>
                </Badge> : 
                <Badge className="bg-orange-500">
                  <span>
                    Disable
                  </span>
                </Badge>
                }
                
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <Dialog>
                  <DialogTrigger>
                    <Button>Enable Two Step Verification</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Verify Your Account</DialogTitle>
                    </DialogHeader>
                    <AccountVerificationForm handleSubmit={handleEnableTwoStepVerification}/>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile
