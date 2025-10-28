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

const Withdrawal = () => {
  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5 ">WITHDRAWAL</h1>
       <Table className="border">
      <TableCaption>List of top cryptocurrencies.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="py-5">DATE</TableHead>
          <TableHead>METHOD</TableHead>
          <TableHead>AMOUNT</TableHead>
          <TableHead className="text-right">STATUS</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {[1,1,1,1,1,1,1,1,1,1,1].map((item, index) => (
          <TableRow key={index} className="hover:bg-gray-900">
             <TableCell>
              <p>June 2, 2024 at 11:43</p>
             </TableCell>           
            <TableCell>BANK</TableCell>
            <TableCell>$490B</TableCell>
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

export default Withdrawal
