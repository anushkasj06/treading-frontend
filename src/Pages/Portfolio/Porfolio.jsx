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
import "./Portfolio.css"

const mockPortfolio = Array.from({ length: 10 }).map((_, index) => ({
  name: "Bitcoin",
  symbol: "BTC",
  value: "$26,500",
  change: index % 2 === 0 ? "+2.1%" : "-1.3%",
  unit: "$25.4B",
  amount: "$490B"
}))

const Portfolio = () => {
  return (
    <div className="portfolioScene">
      <div className="portfolioBackdrop" />
      <div className="portfolioGlow portfolioGlow--one" />
      <div className="portfolioGlow portfolioGlow--two" />
      <div className="portfolioGlow portfolioGlow--three" />
      <div className="portfolioParticles">
        {[...Array(7)].map((_, index) => (
          <span key={index} className={`portfolioParticle portfolioParticle--${index + 1}`} />
        ))}
      </div>

      <div className="portfolioContent">
        <div className="portfolioHeader">
          <p className='text-xs uppercase tracking-[0.35em]'>Holdings</p>
          <h1>Portfolio</h1>
          <p>Track your cryptocurrency holdings and performance</p>
        </div>

        <div className="portfolioStats">
          <div className="portfolioStatCard">
            <p>Total balance</p>
            <p className='text-2xl font-semibold mt-1'>$125,000</p>
          </div>
          <div className="portfolioStatCard">
            <p>Net change</p>
            <p className='text-emerald-300 text-xl font-semibold mt-1'>+3.4%</p>
          </div>
          <div className="portfolioStatCard">
            <p>Assets</p>
            <p className='text-xl font-semibold mt-1'>12 coins</p>
          </div>
        </div>

        <div className="portfolioTable">
          <Table>
            <TableCaption className="portfolioTableCaption">List of your cryptocurrency holdings</TableCaption>
            <TableHeader className="portfolioTableHeader">
              <TableRow>
                <TableHead className="portfolioTableHead">ASSET</TableHead>
                <TableHead className="portfolioTableHead">PRICE</TableHead>
                <TableHead className="portfolioTableHead">UNIT</TableHead>
                <TableHead className="portfolioTableHead">CHANGE</TableHead>
                <TableHead className="portfolioTableHead">CHANGE(%)</TableHead>
                <TableHead className="portfolioTableHead text-right">VALUE</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {mockPortfolio.map((item, index) => (
                <TableRow key={index} className="portfolioTableRow">
                  <TableCell className="portfolioTableCell">
                    <div className="portfolioCoinCell">
                      <Avatar>
                        <AvatarImage
                          src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
                          alt="Bitcoin"
                          className="w-7 h-7"
                        />
                        <AvatarFallback>BTC</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="portfolioTableCell">{item.symbol}</TableCell>
                  <TableCell className="portfolioTableCell">{item.unit}</TableCell>
                  <TableCell className="portfolioTableCell">{item.amount}</TableCell>
                  <TableCell className={item.change.startsWith("+") ? "portfolioChangePositive" : "portfolioChangeNegative"}>
                    {item.change}
                  </TableCell>
                  <TableCell className="portfolioTableCell text-right">{item.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Portfolio
