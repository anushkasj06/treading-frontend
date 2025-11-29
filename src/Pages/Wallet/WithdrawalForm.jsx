import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPaymentDetails } from '@/State/PaymentDetails/Action'
import { Loader2 } from 'lucide-react'
import "./Wallet.css"

const WithdrawalForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const wallet = useSelector((store) => store.wallet);
  const paymentDetails = useSelector((store) => store.paymentDetails);
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(fetchPaymentDetails(jwt));
    }
  }, [dispatch, jwt]);

  const handleChange = (value) => {
    // Only allow numbers
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      setError(null);
    }
  }

  const maskAccountNumber = (accountNumber) => {
    if (!accountNumber) return "Not provided";
    if (accountNumber.length <= 4) return accountNumber;
    return "**** **** " + accountNumber.slice(-4);
  };

  const handleSubmit = async () => {
    setError(null);

    // Validation
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (!paymentDetails?.paymentDetails) {
      setError("Please add payment details first");
      return;
    }

    if (parseFloat(amount) > parseFloat(wallet?.wallet?.balance || 0)) {
      setError("Insufficient balance");
      return;
    }

    setIsLoading(true);

    try {
      // Note: Backend withdrawal endpoint needs to be implemented
      // For now, this is a placeholder that shows the structure
      // You'll need to add a withdrawal endpoint in your backend
      console.log('Withdrawal Request:', {
        amount: parseFloat(amount),
        paymentDetails: paymentDetails.paymentDetails
      });

      // TODO: Implement withdrawal API call when backend endpoint is available
      // await dispatch(withdrawMoney(amount, paymentDetails.paymentDetails.id, jwt));
      
      // Note: Backend withdrawal endpoint needs to be implemented
      // The backend currently doesn't have a withdrawal endpoint that transfers money to bank account
      // You need to add: POST /api/wallet/withdraw endpoint in your backend
      setError("Withdrawal functionality is not available yet. The backend withdrawal endpoint needs to be implemented.");
      
      // Uncomment when backend endpoint is ready:
      // if (onSuccess) {
      //   onSuccess();
      // }
    } catch (error) {
      console.error("Error processing withdrawal:", error);
      setError(error.message || "Failed to process withdrawal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const availableBalance = parseFloat(wallet?.wallet?.balance || 0);

  return (
    <div className='walletFormCard space-y-5'>
      <div className='flex justify-between items-center rounded-2xl bg-gradient-to-r from-rose-500 to-fuchsia-500
      text-lg font-semibold px-5 py-4 text-white'>
        <p>Available balance</p>
        <p>${availableBalance.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}</p>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <h1>Enter withdrawal amount</h1>
        <Input
          onChange={(e)=> handleChange(e.target.value)} 
          value={amount}
          className='walletInput text-center text-2xl'
          placeholder="$9999"
          type="number"
          min="1"
          disabled={isLoading}
        />
      </div>

      {paymentDetails?.paymentDetails ? (
        <div>
          <p className='pb-2'>Transfer to</p>
          <div className='walletRadioCard justify-between'>
            <div className='flex items-center gap-3'>
              <img 
                className='w-8 h-8 rounded-full' 
                src="https://static.vecteezy.com/system/resources/previews/002/249/718/non_2x/bank-building-icon-finance-symbol-illustration-for-web-and-mobil-app-on-grey-background-free-vector.jpg" 
                alt="Bank" 
              />
              <div>
                <p className='font-semibold'>{paymentDetails.paymentDetails.bankName || 'Bank Account'}</p>
                <p className='text-sm text-muted-foreground'>{maskAccountNumber(paymentDetails.paymentDetails.accountNumber)}</p>
              </div>
            </div>
            <span className='text-sm text-emerald-600 font-semibold'>Default</span>
          </div>
        </div>
      ) : (
        <div className='walletFormError'>
          <p className='text-amber-600 text-sm font-medium'>
            Please add payment details first to withdraw funds.
          </p>
        </div>
      )}

      {error && (
        <div className='walletFormError'>
          <p className='text-red-600 text-sm font-medium'>{error}</p>
        </div>
      )}

      <DialogClose asChild>
        <Button 
          onClick={handleSubmit} 
          className='walletFormButton w-full'
          disabled={isLoading || !amount || !paymentDetails?.paymentDetails}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Confirm withdrawal'
          )}
        </Button>
      </DialogClose>
    </div>
  )
}

export default WithdrawalForm
