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

const WatchList = () => {

  const handleRemoveToWatchList = (value) => {
    //logic to remove from watchlist
    console.log("remove from watchlist", value);
  }


  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5 text-rose-600">  Watchlist</h1>
       <Table className="border">
      <TableCaption>List of top cryptocurrencies.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="py-5">COIN</TableHead>
          <TableHead>SYMBOL</TableHead>
          <TableHead>VOLUME</TableHead>
          <TableHead>MARKET CAP</TableHead>
          <TableHead>24H CHANGE</TableHead>
          <TableHead className="text-right">PRICE</TableHead>
          <TableHead className="text-right text-red-600">REMOVE</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {[1,1,1,1,1,1,1,1,1,1,1].map((item, index) => (
          <TableRow key={index} className="hover:bg-gray-900">
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
            <TableCell>BTC</TableCell>
            <TableCell>$25.4B</TableCell>
            <TableCell>$490B</TableCell>
            <TableCell className="text-green-600">+2.1%</TableCell>
            <TableCell className="text-right">$26,500</TableCell>
            <TableCell className="text-right cursor-pointer">
              <Button onClick={() => handleRemoveToWatchList(item.id)} variant="outline" className="text-white">
                <BookmarkFilledIcon size="icon" className="h-10 ww-10" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}

export default WatchList
