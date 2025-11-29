import React, { useEffect, useState } from 'react'
import "./Wallet.css"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { CopyIcon, DollarSign, ShuffleIcon, UploadIcon, WalletIcon, ArrowDownIcon, ArrowUpIcon } from 'lucide-react'
import { ReloadIcon, UpdateIcon } from '@radix-ui/react-icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWallet, fetchTransactions, walletDeposit } from '@/State/Wallet/Action'
import TopUpForm from './TopUpForm'
import WithdrawalForm from './WithdrawalForm'
import TransferForm from './TransferForm'
import { useSearchParams } from 'react-router-dom'

const Wallet = () => {
  const dispatch = useDispatch();
  const wallet = useSelector((store) => store.wallet);
  const [searchParams, setSearchParams] = useSearchParams();
  const [lastSync, setLastSync] = useState(new Date());
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(fetchWallet(jwt));
      dispatch(fetchTransactions(jwt));
    }
  }, [dispatch, jwt]);

  // Handle payment redirect from Razorpay/Stripe
  useEffect(() => {
    const orderId = searchParams.get('order_id');
    const paymentId = searchParams.get('payment_id') || 
                      searchParams.get('razorpay_payment_id') || 
                      searchParams.get('payment_link_id') ||
                      searchParams.get('session_id'); // Stripe session ID
    
    if (orderId && jwt && paymentId) {
      // Only process if we haven't processed this order yet
      const processedKey = `processed_${orderId}_${paymentId}`;
      if (sessionStorage.getItem(processedKey)) {
        // Already processed, just clean up URL
        setSearchParams({});
        return;
      }

      // Mark as processing
      sessionStorage.setItem(processedKey, 'true');
      
      dispatch(walletDeposit(orderId, paymentId, jwt))
        .then(() => {
          // Refresh wallet and transactions
          dispatch(fetchWallet(jwt));
          dispatch(fetchTransactions(jwt));
          setLastSync(new Date());
          // Remove query params after processing
          setTimeout(() => {
            setSearchParams({});
          }, 2000);
        })
        .catch((error) => {
          console.error("Error processing deposit:", error);
          // Remove the processed flag on error so user can retry
          sessionStorage.removeItem(processedKey);
          // Still remove query params even on error
          setTimeout(() => {
            setSearchParams({});
          }, 3000);
        });
    } else if (orderId && !paymentId) {
      // If no payment_id, might be a redirect before payment completion
      // Just clean up the URL
      setTimeout(() => {
        setSearchParams({});
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]); // Only depend on searchParams string to prevent infinite loops

  const handleRefresh = () => {
    if (jwt) {
      dispatch(fetchWallet(jwt));
      dispatch(fetchTransactions(jwt));
      setLastSync(new Date());
    }
  };

  const handleCopyWalletId = () => {
    if (wallet?.wallet?.id) {
      navigator.clipboard.writeText(wallet.wallet.id.toString());
      // You could add a toast notification here
    }
  };

  const formatBalance = (balance) => {
    if (!balance) return "0.00";
    return parseFloat(balance).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'WALLET_TRANSFER':
        return <ShuffleIcon className='text-blue-500' />;
      case 'DEPOSIT':
        return <ArrowDownIcon className='text-emerald-500' />;
      case 'WITHDRAWAL':
        return <ArrowUpIcon className='text-rose-500' />;
      default:
        return <ShuffleIcon className='text-rose-600' />;
    }
  };

  const getTransactionColor = (type, amount) => {
    if (type === 'WALLET_TRANSFER' || type === 'WITHDRAWAL') {
      return 'text-rose-400';
    }
    return 'text-emerald-400';
  };

  return (
    <div className='walletScene'>
      <div className='walletShell'>
        <section className='walletHero'>
          <div className='walletHeader'>
            <div className='walletHeaderInfo'>
              <div className='w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center'>
                <WalletIcon size={30} />
              </div>
              <div>
                <CardTitle className="text-2xl">My Wallet</CardTitle>
                <div className='flex items-center gap-2 text-sm text-white/70'>
                  <p>#{wallet?.wallet?.id || 'Loading...'}</p>
                  <CopyIcon 
                    size={15} 
                    className='cursor-pointer hover:text-slate-300 transition-colors'
                    onClick={handleCopyWalletId}
                  />
                </div>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <span className='walletBalanceBadge'>
                Synced · {Math.floor((new Date() - lastSync) / 60000)}m ago
              </span>
              <ReloadIcon 
                className='w-6 h-6 cursor-pointer hover:text-gray-400 transition-colors'
                onClick={handleRefresh}
              />
            </div>
          </div>

          <div className='walletBalance'>
            <DollarSign size={32}/>
            <span>{formatBalance(wallet?.wallet?.balance)}</span>
          </div>
          <div className='walletSteps'>
            <span className='walletStepPill'>Secure wallet</span>
            <span className='walletStepPill'>Real-time tracking</span>
            <span className='walletStepPill'>Instant settlement</span>
          </div>

          <div className='walletActions'>
            <Dialog>
              <DialogTrigger asChild>
                <div className='walletActionCard'>
                  <UploadIcon size={28} />
                  <span className='text-sm'>Add money</span>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Top up your wallet</DialogTitle>
                </DialogHeader>
                <TopUpForm onSuccess={handleRefresh} />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <div className='walletActionCard'>
                  <UploadIcon size={28} />
                  <span className='text-sm'>Withdraw</span>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Withdraw funds</DialogTitle>
                </DialogHeader>
                <WithdrawalForm onSuccess={handleRefresh} />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <div className='walletActionCard'>
                  <ShuffleIcon size={28} />
                  <span className='text-sm'>Transfer</span>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Transfer to another wallet</DialogTitle>
                </DialogHeader>
                <TransferForm onSuccess={handleRefresh} />
              </DialogContent>
            </Dialog>
          </div>
        </section>

        <section className='walletHistory'>
          <div className='walletHistoryHeader'>
            <div>
              <h1 className='text-2xl font-semibold'>Transaction history</h1>
              <p className='text-white/60 text-sm'>Latest events from your wallet</p>
            </div>
            <UpdateIcon 
              className='w-6 h-6 cursor-pointer hover:text-gray-400 transition-colors'
              onClick={handleRefresh}
            />
          </div>

          <div className='walletHistoryList'>
            {wallet?.loading ? (
              <div className='flex justify-center items-center py-8'>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
              </div>
            ) : wallet?.transactions && wallet.transactions.length > 0 ? (
              wallet.transactions.map((transaction, index) => (
                <div key={transaction.id || index} className='walletHistoryItem'>
                  <div className='flex items-center gap-4'>
                    <Avatar className='bg-white/10'>
                      <AvatarFallback>
                        {getTransactionIcon(transaction.walletTransactionType)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className='font-medium'>
                        {transaction.walletTransactionType === 'WALLET_TRANSFER' 
                          ? transaction.purpose || 'Wallet Transfer'
                          : transaction.walletTransactionType || 'Transaction'}
                      </h1>
                      <p className='text-sm text-gray-400'>{formatDate(transaction.date)}</p>
                    </div>
                  </div>
                  <p className={`text-sm font-semibold ${getTransactionColor(transaction.walletTransactionType, transaction.amount)}`}>
                    {transaction.walletTransactionType === 'WALLET_TRANSFER' || transaction.walletTransactionType === 'WITHDRAWAL' ? '-' : '+'}
                    ${transaction.amount?.toLocaleString() || '0'}
                  </p>
                </div>
              ))
            ) : (
              <div className='text-center py-8 text-white/60'>
                <p>No transactions found</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Wallet
