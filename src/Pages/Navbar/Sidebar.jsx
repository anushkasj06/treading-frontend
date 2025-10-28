import React from 'react'
import { 
  DashboardIcon,
  HomeIcon,
  BookmarkIcon,
  ActivityLogIcon,
  ExitIcon,
  PersonIcon,
} from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom'
import {
  WalletIcon,
  CreditCardIcon,
  LandmarkIcon
} from "lucide-react"
import { Button } from '@/components/ui/button'
import {
  SheetClose
} from "@/components/ui/sheet"

const menu = [
  {name: "Home", path: "/", icon: <HomeIcon className="w-5 h-5" />, isActive: true},
  {name: "Portfolio", path: "/portfolio", icon: <DashboardIcon className="w-5 h-5" />, isActive: false},
  {name: "Watchlist", path: "/watchlist", icon: <BookmarkIcon className="w-5 h-5" />, isActive: false},
  {name: "Activity", path: "/activity", icon: <ActivityLogIcon className="w-5 h-5" />, isActive: false},
  {name: "Wallet", path: "/wallet", icon: <WalletIcon className="w-5 h-5" />, isActive: false},
  {name: "Payment Details", path: "payment-details", icon: <LandmarkIcon className="w-5 h-5" />, isActive: false},
  {name: "Withdrawal", path: "/withdrawal", icon: <CreditCardIcon className="w-5 h-5" />, isActive: false},
  {name: "Profile", path: "/profile", icon: <PersonIcon className="w-5 h-5" />, isActive: false},
  {name: "Logout", path: "/logout", icon: <ExitIcon className="w-5 h-5" />, isActive: false},
]

const Sidebar = () => {
  const navigate = useNavigate();
  
  return (
    <div className="mt-10 space-y-5">
      {menu.map((item, index) => (
        <SheetClose asChild key={index}>
          <Button
            variant="outline"
            className="flex items-center gap-5 py-6 w-full hover:bg-red-100"
            onClick={() => navigate(item.path)}
          >
            <span className="w-8">{item.icon}</span>
            <p>{item.name}</p>
          </Button>
        </SheetClose>
      ))}
    </div>
  )
}

export default Sidebar
