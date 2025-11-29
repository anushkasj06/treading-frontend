import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import PaymentDetailsForm from './PaymentDetailsForm'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPaymentDetails } from '@/State/PaymentDetails/Action'
import "./Payment.css"

const PaymentDetails = () => {
  const dispatch = useDispatch();
  const paymentDetails = useSelector((store) => store.paymentDetails);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(fetchPaymentDetails(jwt));
    }
  }, [dispatch, jwt]);

  const maskAccountNumber = (accountNumber) => {
    if (!accountNumber) return "Not provided";
    if (accountNumber.length <= 4) return accountNumber;
    return "**********" + accountNumber.slice(-4);
  };

  const handleFormSuccess = async () => {
    // Refresh payment details after successful submission
    if (jwt) {
      await dispatch(fetchPaymentDetails(jwt));
    }
    setIsDialogOpen(false);
  };

  return (
    <div className='financeScene'>
      <div className='financeHero space-y-6'>
        <div className='flex items-center justify-between flex-wrap gap-4'>
          <div>
            <p className='text-xs uppercase tracking-[0.35em] text-white/60'>Linked Payout</p>
            <h1 className='text-3xl font-semibold'>Payment Details</h1>
            <p className='text-white/60 text-sm mt-2'>Securely stored on encrypted vaults</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className='financeUpdateButton rounded-full px-5 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white transition-all duration-300 hover:scale-105'>
                {paymentDetails?.paymentDetails ? "Update Details" : "Add Details"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Payment Details</DialogTitle>
              </DialogHeader>
              <PaymentDetailsForm onSuccess={handleFormSuccess} existingData={paymentDetails?.paymentDetails} />
            </DialogContent>
          </Dialog>
        </div>

        {paymentDetails?.loading ? (
          <Card className='financeCard'>
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-rose-600"></div>
              <p className="ml-3 text-white/60">Loading payment details...</p>
            </div>
          </Card>
        ) : paymentDetails?.paymentDetails ? (
          <Card className='financeCard'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-xl'>{paymentDetails.paymentDetails.bankName || "Bank Account"}</CardTitle>
              <CardDescription className='text-white/70'>A/C No: {maskAccountNumber(paymentDetails.paymentDetails.accountNumber)}</CardDescription>
            </CardHeader>
            <CardContent className='space-y-3 text-white/80'>
              <div className='flex items-center justify-between py-2 border-b border-white/10'>
                <p className='text-white/60'>Account Holder</p>
                <p className='font-semibold'>{paymentDetails.paymentDetails.accountHolderName || "Not provided"}</p>
              </div>
              <div className='flex items-center justify-between py-2 border-b border-white/10'>
                <p className='text-white/60'>IFSC Code</p>
                <p className='font-semibold'>{paymentDetails.paymentDetails.ifsc || "Not provided"}</p>
              </div>
              <div className='flex items-center justify-between py-2'>
                <p className='text-white/60'>Bank Name</p>
                <p className='font-semibold'>{paymentDetails.paymentDetails.bankName || "Not provided"}</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className='financeCard'>
            <CardContent className='py-8 text-center'>
              <p className='text-white/60 mb-4'>No payment details found</p>
              <p className='text-sm text-white/40'>Click "Add Details" to add your payment information</p>
            </CardContent>
          </Card>
        )}

        {paymentDetails?.error && (
          <div className='financeErrorCard'>
            <p className='text-red-400 text-sm'>Error: {paymentDetails.error}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentDetails
