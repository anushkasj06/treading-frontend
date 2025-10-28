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


const Portfolio = () => {
  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5 text-rose-600 ">Portfolio</h1>
       <Table>
      <TableCaption>List of top cryptocurrencies.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">ASSET</TableHead>
          <TableHead>PRICE</TableHead>
          <TableHead>UNIT</TableHead>
          <TableHead>CHANGE</TableHead>
          <TableHead>CHANGE(%)</TableHead>
          <TableHead className="text-right">VALUE</TableHead>
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
    </div>
  )
}

export default Portfolio
