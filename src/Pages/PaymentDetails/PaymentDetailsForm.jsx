import React, { useEffect, useState } from 'react'
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { useDispatch } from 'react-redux'
import { addPaymentDetails } from '@/State/PaymentDetails/Action'
import { Loader2 } from 'lucide-react'
import "./Payment.css"

const PaymentDetailsForm = ({ onSuccess, existingData }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const jwt = localStorage.getItem("jwt");

  const form = useForm({
    defaultValues: {
      accountHolderName: existingData?.accountHolderName || '',
      ifsc: existingData?.ifsc || '',
      accountNumber: '',
      confirmAccountNumber: '',
      bankName: existingData?.bankName || ''
    }
  });

  // Update form when existingData changes
  useEffect(() => {
    if (existingData) {
      form.reset({
        accountHolderName: existingData.accountHolderName || '',
        ifsc: existingData.ifsc || '',
        accountNumber: '',
        confirmAccountNumber: '',
        bankName: existingData.bankName || ''
      });
    }
  }, [existingData, form]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError(null);

    // Validate account numbers match
    if (data.accountNumber !== data.confirmAccountNumber) {
      setError("Account numbers do not match");
      setIsSubmitting(false);
      return;
    }

    // Validate required fields
    if (!data.accountNumber || !data.accountHolderName || !data.ifsc || !data.bankName) {
      setError("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const paymentData = {
        accountNumber: data.accountNumber,
        accountHolderName: data.accountHolderName,
        ifsc: data.ifsc,
        bankName: data.bankName
      };

      await dispatch(addPaymentDetails(paymentData, jwt));
      
      // Reset form on success
      form.reset({
        accountHolderName: '',
        ifsc: '',
        accountNumber: '',
        confirmAccountNumber: '',
        bankName: ''
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error submitting payment details:", error);
      setError(error.message || "Failed to save payment details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='financeFormCard'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>

          <FormField
            control={form.control}
            name='accountHolderName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account holder name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='financeInput'
                    placeholder='Anushka Jadhav'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='ifsc'
            render={({ field }) => (
              <FormItem>
                <FormLabel>IFSC code</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='financeInput'
                    placeholder='BKID000XXXX'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='accountNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='financeInput'
                    placeholder='7854XXXXXX'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='confirmAccountNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm account number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='financeInput'
                    placeholder='7854XXXXXX'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='bankName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='financeInput'
                    placeholder='YES BANK'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <div className='financeFormError'>
              <p className='text-red-600 text-sm font-medium'>{error}</p>
            </div>
          )}

          <Button 
            type='submit' 
            className='financePrimaryButton w-full'
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              existingData ? "Update Details" : "Save Details"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default PaymentDetailsForm
