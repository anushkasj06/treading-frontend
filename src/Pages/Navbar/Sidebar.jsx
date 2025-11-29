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
import { Badge } from '@/components/ui/badge'
import {
  SheetClose
} from "@/components/ui/sheet"

import { useDispatch } from 'react-redux'
import { logout } from '@/State/Auth/Action'
import "./Navbar.css"


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
  const dispatch =  useDispatch();



  const handleLogout =()=>{
    dispatch(logout())
  }
  
  return (
    <div className="sidebarPanel">
      <div className="sidebarStatus">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/70">Desk status</p>
            <p className="text-lg font-semibold text-white">Hyperion Alpha</p>
          </div>
          <Badge className="bg-emerald-500/20 text-emerald-100 border-emerald-400/30 rounded-full">Auto mode</Badge>
        </div>
        <div className="sidebarStatusStats">
          <div>
            <p className="text-xs text-white/60">Alerts</p>
            <strong className="text-white text-base">12</strong>
          </div>
          <div>
            <p className="text-xs text-white/60">Watchlist</p>
            <strong className="text-white text-base">8</strong>
          </div>
          <div>
            <p className="text-xs text-white/60">Latency</p>
            <strong className="text-emerald-300 text-base">12 ms</strong>
          </div>
          <div>
            <p className="text-xs text-white/60">Signals</p>
            <strong className="text-white text-base">27</strong>
          </div>
        </div>
      </div>
      <div className="sidebarList space-y-3">
      {menu.map((item, index) => (
        <SheetClose asChild key={index}>
          <Button
            variant="ghost"
            className={`flex items-center justify-between gap-5 py-5 w-full border border-white/5 rounded-2xl hover:bg-white/10 ${item.name === "Logout" ? "text-rose-300 hover:text-white" : "text-white"}`}
            onClick={() => {navigate(item.path)
              if(item.name === "Logout"){
                handleLogout()
              }
            }}
          >
            <div className="flex items-center gap-4">
              <span className="w-8 text-white/70">{item.icon}</span>
              <p className="font-medium">{item.name}</p>
            </div>
            {item.isActive && (
              <Badge className="sidebarActiveBadge rounded-full">Now</Badge>
            )}
          </Button>
        </SheetClose>
      ))}
      </div>
    </div>
  )
}

export default Sidebar
