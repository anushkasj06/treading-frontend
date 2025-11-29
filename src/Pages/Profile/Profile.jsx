import React from 'react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { VerifiedIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AccountVerificationForm from './AccountVerificationForm'
import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux'
import "./Profile.css"


const Profile = () => {

  const auth = useSelector((store) => store.auth);

  const handleEnableTwoStepVerification =()=>{
    console.log("Two step verification")
  } 


  return (
    <div className='profileScene'>
      <div className='profileShell'>
        <section className='profileHero'>
          <div className='profileHeroHeader'>
            <div>
              <p className='text-sm text-white/70'>Signed in as</p>
              <h2 className='text-2xl font-semibold'>{auth.user?.fullName || "Analyst"}</h2>
              <p className='text-sm text-white/60'>{auth.user?.email}</p>
            </div>
            <div className='flex items-center gap-2'>
              <Badge className='bg-emerald-500/20 text-emerald-100 border-emerald-400/30 rounded-full'>
                Verified
              </Badge>
              <Button variant="outline" className='border-white/20 text-white rounded-full'>
                Update info
              </Button>
            </div>
          </div>

          <div className='profileStats'>
            <div className='profileStatCard'>
              <span>Account age</span>
              <strong>2 years</strong>
              <p className='text-xs text-emerald-300'>Active</p>
            </div>
            <div className='profileStatCard'>
              <span>Sessions</span>
              <strong>128</strong>
              <p className='text-xs text-white/60'>Past 30 days</p>
            </div>
            <div className='profileStatCard'>
              <span>Alerts followed</span>
              <strong>64</strong>
              <p className='text-xs text-white/60'>Desk highlights</p>
            </div>
          </div>
        </section>

        <section className='profileGrid'>
          <Card className='profileCard'>
            <CardHeader className='pb-4'>
              <CardTitle>Personal info</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='profileInfoRow'>
                <span>Email</span>
                <p>{auth.user?.email}</p>
              </div>
              <div className='profileInfoRow'>
                <span>Full name</span>
                <p>{auth.user?.fullName}</p>
              </div>
              <div className='profileInfoRow'>
                <span>Date of birth</span>
                <p>20/04/2006</p>
              </div>
              <div className='profileInfoRow'>
                <span>Nationality</span>
                <p>India</p>
              </div>
            </CardContent>
          </Card>

          <Card className='profileCard profileVerificationPanel'>
            <div className='flex items-center justify-between flex-wrap gap-2'>
              <CardTitle>Two step verification</CardTitle>
              <Badge className='space-x-2 text-white bg-green-600'>
                <VerifiedIcon className='w-3.5 h-3.5'/>
                <span>Enabled</span>
              </Badge>
            </div>
            <p>Keep things safe with a quick second check.</p>
            <div className='verificationSteps'>
              <div>Step 1 · Send code to your email.</div>
              <div>Step 2 · Enter the 6 digits.</div>
              <div>Step 3 · Done, access stays secure.</div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className='rounded-full'>Run verification</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Verify your account</DialogTitle>
                </DialogHeader>
                <AccountVerificationForm handleSubmit={handleEnableTwoStepVerification}/>
              </DialogContent>
            </Dialog>
          </Card>
        </section>
      </div>
    </div>
  )
}

export default Profile
