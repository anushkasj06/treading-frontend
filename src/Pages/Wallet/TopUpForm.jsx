import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DotFilledIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { useDispatch } from 'react-redux'
import { createPaymentLink } from '@/State/Wallet/Action'
import { Loader2 } from 'lucide-react'
import "./Wallet.css"


const TopUpForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('RAZORPAY')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const jwt = localStorage.getItem("jwt");

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setAmount(value);
      setError(null);
    }
  }

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (parseFloat(amount) < 1) {
      setError("Minimum amount is $1");
      return;
    }

    setIsLoading(true);

    try {
      // Backend expects amount in base currency (dollars/rupees), not cents/paise
      // Backend will multiply by 100 internally for payment gateways
      const amountValue = Math.round(parseFloat(amount));
      
      console.log("Submitting payment request:", {
        paymentMethod,
        amount: amountValue,
        originalAmount: amount
      });
      
      const result = await dispatch(createPaymentLink(paymentMethod, amountValue, jwt));
      
      console.log("Payment link result:", result);
      
      if (result?.payment_url) {
        // Redirect to payment gateway
        window.location.href = result.payment_url;
      } else {
        setError("Failed to create payment link. No payment URL received.");
      }
    } catch (error) {
      console.error("Error creating payment link:", error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.response?.data?.errorMessage ||
                          error.message || 
                          "Failed to create payment link. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='walletFormCard space-y-5'>
      <div>
        <h1>Enter amount</h1>
        <Input 
          onChange={handleAmountChange} 
          value={amount}
          className='walletInput'
          placeholder='$9999'
          type="number"
          min="1"
          disabled={isLoading}
        />
      </div>
      <div>
        <h1>Choose payment method</h1>
        <RadioGroup 
          className='flex flex-col space-y-3 pt-3' 
          defaultValue="RAZORPAY"
          onValueChange={(value) => handlePaymentMethodChange(value)}
          disabled={isLoading}
        >
          <div className='walletRadioCard'>
            <RadioGroupItem icon={DotFilledIcon} value="RAZORPAY" id="razorpay" />
            <Label htmlFor="razorpay" className='text-base font-medium'>Razorpay</Label>
          </div>
          <div className='walletRadioCard'>
            <RadioGroupItem icon={DotFilledIcon} value="STRIPE" id="stripe" />
            <Label htmlFor="stripe" className='text-base font-medium'>Stripe</Label>
          </div>
        </RadioGroup>
      </div>

      {error && (
        <div className='walletFormError'>
          <p className='text-red-600 text-sm font-medium'>{error}</p>
        </div>
      )}

      <Button 
        onClick={handleSubmit} 
        className='walletFormButton w-full'
        disabled={isLoading || !amount}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Add funds'
        )}
      </Button>
    </div>
  )
}

export default TopUpForm
