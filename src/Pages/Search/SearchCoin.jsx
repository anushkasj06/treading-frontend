import React from 'react'
//import "./Wallet.css"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SearchIcon, ArrowUpRight } from 'lucide-react'


const mockResults = [
  { name: "Bitcoin", symbol: "BTC", price: "$54,642", move: "+2.3%" },
  { name: "Ethereum", symbol: "ETH", price: "$3,214", move: "+1.1%" },
  { name: "Solana", symbol: "SOL", price: "$128", move: "+4.6%" }
]

const SearchCoin = () => {
  return (
    <div className='searchScene'>
      <div className='searchCard'>
        <div>
          <p className='text-sm text-white/70 uppercase tracking-[0.35em]'>Quick scan</p>
          <h1 className='text-3xl font-semibold mt-1'>Search the coin universe</h1>
          <p className='text-white/70 text-sm mt-2'>Find anything instantly with symbol, name, or chain.</p>
        </div>

        <div className='flex gap-3 flex-wrap'>
          <Input className='searchInput flex-1' placeholder='e.g. BTC, SOL, DeFi' />
          <Button className='rounded-full px-5 flex items-center gap-2'>
            <SearchIcon size={18} />
            Scan
          </Button>
        </div>

        <div className='searchList'>
          {mockResults.map((item) => (
            <div key={item.symbol} className='searchListItem'>
              <div>
                <p className='font-semibold'>{item.name} <span className='text-white/60 text-sm'>{item.symbol}</span></p>
                <p className='text-white/60 text-sm'>Last trade · {item.price}</p>
              </div>
              <div className='flex items-center gap-3'>
                <span className='text-emerald-300 text-sm'>{item.move}</span>
                <Button variant="ghost" size="icon">
                  <ArrowUpRight />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className='searchEmpty'>
          Need custom filters? Ask the desk bot for watch ideas.
        </div>
      </div>
    </div>
  )
}

export default SearchCoin
