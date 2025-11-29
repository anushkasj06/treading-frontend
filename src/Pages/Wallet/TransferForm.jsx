import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { useDispatch, useSelector } from 'react-redux'
import { walletTransfer } from '@/State/Wallet/Action'
import { Loader2 } from 'lucide-react'
import "./Wallet.css"

const TransferForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const wallet = useSelector((store) => store.wallet);
  const [formData, setFormData] = useState({
    amount: '',
    walletId: '',
    purpose: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const jwt = localStorage.getItem("jwt");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(null);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (!formData.walletId) {
      setError("Please enter a wallet ID");
      return;
    }

    if (parseFloat(formData.amount) > parseFloat(wallet?.wallet?.balance || 0)) {
      setError("Insufficient balance");
      return;
    }

    setIsLoading(true);

    try {
      // Backend expects amount in smallest currency unit (cents/paise)
      const amountInCents = Math.round(parseFloat(formData.amount) * 100);
      await dispatch(walletTransfer(
        parseInt(formData.walletId),
        amountInCents,
        formData.purpose || 'Wallet Transfer',
        jwt
      ));

      // Reset form
      setFormData({
        amount: '',
        walletId: '',
        purpose: ''
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error transferring money:", error);
      setError(error.message || "Failed to transfer money. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='walletFormCard space-y-4'>
      <div>
        <h1>Enter amount</h1>
        <Input 
          className="walletInput" 
          placeholder="$9999" 
          name="amount" 
          onChange={handleChange} 
          value={formData.amount}
          type="number"
          min="1"
          disabled={isLoading}
        />
      </div>

      <div>
        <h1>Wallet ID</h1>
        <Input 
          className="walletInput" 
          placeholder="Enter wallet ID" 
          name="walletId" 
          onChange={handleChange} 
          value={formData.walletId}
          type="number"
          disabled={isLoading}
        />
      </div>

      <div>
        <h1>Purpose (Optional)</h1>
        <Input 
          className="walletInput" 
          placeholder="Enter purpose" 
          name="purpose" 
          onChange={handleChange} 
          value={formData.purpose}
          disabled={isLoading}
        />
      </div>

      {error && (
        <div className='walletFormError'>
          <p className='text-red-600 text-sm font-medium'>{error}</p>
        </div>
      )}

      <div className='text-sm text-gray-600'>
        <p>Available Balance: ${parseFloat(wallet?.wallet?.balance || 0).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}</p>
      </div>

      <DialogClose asChild>
        <Button 
          onClick={handleSubmit} 
          className="walletFormButton w-full"
          disabled={isLoading || !formData.amount || !formData.walletId}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Submit transfer'
          )}
        </Button>
      </DialogClose>
    </div>
  )
}

export default TransferForm

