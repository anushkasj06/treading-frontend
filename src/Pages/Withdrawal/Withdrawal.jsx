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
import "./Withdrawal.css"

const Withdrawal = () => {
  const getStatus = (index) => {
    const statuses = ['completed', 'pending', 'failed'];
    return statuses[index % 3];
  }

  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return 'Completed';
      case 'pending': return 'Pending';
      case 'failed': return 'Failed';
      default: return 'Pending';
    }
  }

  return (
    <div className="withdrawalScene">
      <div className="withdrawalBackdrop" />
      <div className="withdrawalGlow withdrawalGlow--one" />
      <div className="withdrawalGlow withdrawalGlow--two" />
      <div className="withdrawalGlow withdrawalGlow--three" />
      <div className="withdrawalParticles">
        {[...Array(7)].map((_, index) => (
          <span key={index} className={`withdrawalParticle withdrawalParticle--${index + 1}`} />
        ))}
      </div>

      <div className="withdrawalContent">
        <div className="withdrawalHeader">
          <h1>Withdrawal History</h1>
          <p>View all your withdrawal requests and their status</p>
        </div>

        <div className="withdrawalTableContainer">
          <Table className="withdrawalTable">
            <TableCaption className="withdrawalTableCaption">List of your withdrawal transactions</TableCaption>
            <TableHeader className="withdrawalTableHeader">
              <TableRow>
                <TableHead className="withdrawalTableHead">DATE</TableHead>
                <TableHead className="withdrawalTableHead">METHOD</TableHead>
                <TableHead className="withdrawalTableHead">AMOUNT</TableHead>
                <TableHead className="withdrawalTableHead text-right">STATUS</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {[1,1,1,1,1,1,1,1,1,1,1].map((item, index) => {
                const status = getStatus(index);
                return (
                  <TableRow key={index} className="withdrawalTableRow">
                    <TableCell className="withdrawalTableCell">
                      <p className="withdrawalDateCell">June 2, 2024 at 11:43</p>
                    </TableCell>
                    <TableCell className="withdrawalTableCell">
                      <span className="withdrawalMethodCell">BANK</span>
                    </TableCell>
                    <TableCell className="withdrawalTableCell">$1,500</TableCell>
                    <TableCell className="withdrawalTableCell text-right">
                      <span className={`withdrawalStatus ${status}`}>
                        {getStatusText(status)}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Withdrawal
