import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { BookmarkFilledIcon } from '@radix-ui/react-icons';

import { Avatar,AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'

const Activity = () => {
  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5 ">TREADING HISTORY</h1>
       <Table className="border">
      <TableCaption>List of top cryptocurrencies.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="py-5">DATE & TIME</TableHead>
          <TableHead>TREADING PAIR</TableHead>
          <TableHead>BUY PRICE</TableHead>
          <TableHead>SELLING PRICE</TableHead>
          <TableHead>ORDER TYPE</TableHead>
          <TableHead>PROFIT/LOSS</TableHead>
          <TableHead className="text-right">VALUE</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {[1,1,1,1,1,1,1,1,1,1,1].map((item, index) => (
          <TableRow key={index} className="hover:bg-gray-900">
             <TableCell>
              <p>2023-10-10</p>
              <p className="text-sm text-gray-500">12:00:56</p>
             </TableCell>
            <TableCell className="font-medium flex items-center gap-3">     
              <Avatar>
                <AvatarImage
                  src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
                  alt="Bitcoin"
                  className="w-7 h-7"
                />
                <AvatarFallback>BTC</AvatarFallback>
              </Avatar>
              <span>Bitcoin</span>
            </TableCell>
           
            <TableCell>$25.4B</TableCell>
            <TableCell>$490B</TableCell>
            <TableCell className="text-green-600">+2.1%</TableCell>
            <TableCell>$26,500</TableCell>
            <TableCell className="text-right cursor-pointer">
              $1500
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}

export default Activity
