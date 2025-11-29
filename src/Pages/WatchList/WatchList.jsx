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
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import "./WatchList.css"

const WatchList = () => {

  const handleRemoveToWatchList = (value) => {
    //logic to remove from watchlist
    console.log("remove from watchlist", value);
  }

  return (
    <div className="watchlistScene">
      <div className="watchlistBackdrop" />
      <div className="watchlistGlow watchlistGlow--one" />
      <div className="watchlistGlow watchlistGlow--two" />
      <div className="watchlistGlow watchlistGlow--three" />
      <div className="watchlistParticles">
        {[...Array(7)].map((_, index) => (
          <span key={index} className={`watchlistParticle watchlistParticle--${index + 1}`} />
        ))}
      </div>

      <div className="watchlistContent">
        <div className="watchlistHeader">
          <h1>Watchlist</h1>
          <p>Monitor your favorite cryptocurrencies and track their performance</p>
        </div>

        <div className="watchlistTableContainer">
          <Table className="watchlistTable">
            <TableCaption className="watchlistTableCaption">List of cryptocurrencies in your watchlist</TableCaption>
            <TableHeader className="watchlistTableHeader">
              <TableRow>
                <TableHead className="watchlistTableHead">COIN</TableHead>
                <TableHead className="watchlistTableHead">SYMBOL</TableHead>
                <TableHead className="watchlistTableHead">VOLUME</TableHead>
                <TableHead className="watchlistTableHead">MARKET CAP</TableHead>
                <TableHead className="watchlistTableHead">24H CHANGE</TableHead>
                <TableHead className="watchlistTableHead text-right">PRICE</TableHead>
                <TableHead className="watchlistTableHead text-right removeHead">REMOVE</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {[1,1,1,1,1,1,1,1,1,1,1].map((item, index) => (
                <TableRow key={index} className="watchlistTableRow">
                  <TableCell className="watchlistTableCell">
                    <div className="watchlistCoinCell">
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
                  <TableCell className="watchlistTableCell">BTC</TableCell>
                  <TableCell className="watchlistTableCell">$25.4B</TableCell>
                  <TableCell className="watchlistTableCell">$490B</TableCell>
                  <TableCell className="watchlistTableCell">
                    <span className="watchlistChange">+2.1%</span>
                  </TableCell>
                  <TableCell className="watchlistTableCell text-right">$26,500</TableCell>
                  <TableCell className="watchlistTableCell text-right">
                    <Button 
                      onClick={() => handleRemoveToWatchList(item.id)} 
                      variant="outline" 
                      className="watchlistRemoveButton text-white border-rose-600/30 bg-rose-600/10 hover:bg-rose-600/20"
                    >
                      <BookmarkFilledIcon className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default WatchList
