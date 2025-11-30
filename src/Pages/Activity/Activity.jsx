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
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import "./Activity.css"

const Activity = () => {
  return (
    <div className="activityScene">
      <div className="activityBackdrop" />
      <div className="activityGlow activityGlow--one" />
      <div className="activityGlow activityGlow--two" />
      <div className="activityGlow activityGlow--three" />
      <div className="activityParticles">
        {[...Array(7)].map((_, index) => (
          <span key={index} className={`activityParticle activityParticle--${index + 1}`} />
        ))}
      </div>

      <div className="activityContent">
        <div className="activityHeader">
          <h1>Trading History</h1>
          <p>Track all your trading activities and performance metrics</p>
        </div>

        <div className="activityTableContainer">
          <Table className="activityTable">
            <TableCaption className="activityTableCaption">List of your recent trading activities</TableCaption>
            <TableHeader className="activityTableHeader">
              <TableRow>
                <TableHead className="activityTableHead">DATE & TIME</TableHead>
                <TableHead className="activityTableHead">TRADING PAIR</TableHead>
                <TableHead className="activityTableHead">BUY PRICE</TableHead>
                <TableHead className="activityTableHead">SELLING PRICE</TableHead>
                <TableHead className="activityTableHead">ORDER TYPE</TableHead>
                <TableHead className="activityTableHead">PROFIT/LOSS</TableHead>
                <TableHead className="activityTableHead text-right">VALUE</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {[1,1,1,1,1,1,1,1,1,1,1].map((item, index) => (
                <TableRow key={index} className="activityTableRow">
                  <TableCell className="activityTableCell">
                    <div className="activityDateCell">
                      <p>2023-10-10</p>
                      <p>12:00:56</p>
                    </div>
                  </TableCell>
                  <TableCell className="activityTableCell">
                    <div className="activityCoinCell">
                      <Avatar>
                        <AvatarImage
                          src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
                          alt="Bitcoin"
                          className="w-7 h-7"
                        />
                        <AvatarFallback>BTC</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">Bitcoin</span>
                    </div>
                  </TableCell>
                  <TableCell className="activityTableCell">$25,400</TableCell>
                  <TableCell className="activityTableCell">$26,500</TableCell>
                  <TableCell className="activityTableCell">
                    <span className="activityProfit">Buy</span>
                  </TableCell>
                  <TableCell className="activityTableCell">
                    <span className={index % 2 === 0 ? "activityProfit" : "activityLoss"}>
                      {index % 2 === 0 ? "+$1,100" : "-$500"}
                    </span>
                  </TableCell>
                  <TableCell className="activityTableCell text-right">$1,500</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Activity
