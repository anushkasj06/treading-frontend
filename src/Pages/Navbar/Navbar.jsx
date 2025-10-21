import React, { use } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
  } from "@/components/ui/sheet"
import { DragHandleHorizontalIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import Sidebar from './Sidebar'
import { Avatar,AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'


const Navbar = () => {


  return (
    <div className='px-2 py-3 border-b z-50 bg-background bg-opacity-0
    sticky top-0 left-0 right-0 flex justify-between items-center'>
       <div className='flex items-center gap-3'>
       <Sheet>
            <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className='rounded-full h-11 w-11'>
                    <DragHandleHorizontalIcon className='w-10 h-7' />
                </Button>
            </SheetTrigger>
            <SheetContent className="w-72 border-r-0 flex-col justify-center " side='left'>
                <SheetHeader>
                <SheetTitle >
                    <div className='text-3xl flex justify-center item-center gap-1 margin-10px mt-2'>
                    <Avatar>
                        <AvatarImage src="data:image/jpeg;base64,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" />
                    </Avatar>
                    <div>
                        <span className='font-bold text-rose-500'>Crypto</span>
                        <span>Tread</span>
                    </div>
                    </div>
                </SheetTitle>
                </SheetHeader>
                <div   className="mt-2 mb-8">
                <Sidebar/>
                </div>
            </SheetContent>
        </Sheet>

        <p className='text-sm lg:text-base cursor-pointer font-bold md:block '>
            <span className='text-rose-500'>Crypto</span>
             Treading
        </p>
        <div className='p-0 ml-9'>
            <Button variant="outline" className='flex items-center gap-2  text-white hover:bg-gray-300 border-0'>
                <MagnifyingGlassIcon/>
                <span>Search</span>
            </Button>
        </div>
       </div>
       <div>
        <Avatar >
            <AvatarFallback>CT</AvatarFallback>
        </Avatar>
       </div>
    </div> 
  )
}

export default Navbar