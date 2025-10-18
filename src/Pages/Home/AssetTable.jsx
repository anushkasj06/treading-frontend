import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Avatar,AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'

const AssetTable = () => {
  return (
    <Table>
      <TableCaption>List of top cryptocurrencies.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">COIN</TableHead>
          <TableHead>SYMBOL</TableHead>
          <TableHead>VOLUME</TableHead>
          <TableHead>MARKET CAP</TableHead>
          <TableHead>24h</TableHead>
          <TableHead className="text-right">PRICE</TableHead>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AssetTable;
