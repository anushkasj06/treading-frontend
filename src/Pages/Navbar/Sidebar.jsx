import React from 'react'
import { 
  DashboardIcon,
  HomeIcon,
  BookmarkIcon,
  ActivityLogIcon,
  ExitIcon,
    PersonIcon,
} from '@radix-ui/react-icons'

import {
  WalletIcon,
  CreditCardIcon,
} from "lucide-react"
import { Button } from '@/components/ui/button'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
import { LandmarkIcon } from 'lucide-react'

const menu = [
  {name: "Home", path: "/", icon: <HomeIcon className="w-5 h-5" />, isActive: true},
  {name: "Portfolio", path: "/portfolio", icon: <DashboardIcon className="w-5 h-5" />, isActive: false},
  {name: "Watchlist", path: "/watchlist", icon: <BookmarkIcon className="w-5 h-5" />, isActive: false},
  {name: "Activity", path: "/activity", icon: <ActivityLogIcon className="w-5 h-5" />, isActive: false},
  {name: "Wallet", path: "/wallet", icon: <WalletIcon className="w-5 h-5" />, isActive: false},
  {name: "Payment Details", path: "/payment", icon: <LandmarkIcon className="w-5 h-5" />, isActive: false},
  {name: "Withdrawal", path: "/withdrawal", icon: <CreditCardIcon className="w-5 h-5" />, isActive: false},
  {name: "Profile", path: "/profile", icon: <PersonIcon className="w-5 h-5" />, isActive: false},
  {name: "Logout", path: "/logout", icon: <ExitIcon className="w-5 h-5" />, isActive: false},
]

const Sidebar = () => {
  return (

      <div className="mt-10 space-y-5">
        {menu.map((item, index) => (
          <div key={index}>
            <SheetClose className='w-full'>
            <Button variant="outline" className='flex items-center gap-5 py-6 w-full onhover:bg-red-100'>
              <span className='w-8'>
                {item.icon}
              </span>
              <p>{item.name}</p>
            </Button>
            </SheetClose>
          </div>
        ))}
      </div>
  )
}

export default Sidebar