import { Input } from '@/components/ui/input'
import React, { useState, useEffect } from 'react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { DotIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '@/State/Order/Action'
import { fetchWallet } from '@/State/Wallet/Action'
import { fetchAssetByCoinId } from '@/State/Asset/Action'
import { Loader2 } from 'lucide-react'
import { DialogClose } from '@/components/ui/dialog'
import "./Stock.css"

const TreadingForm = ({ coinDetails, onSuccess, showToast }) => {
    const dispatch = useDispatch();
    const wallet = useSelector((store) => store.wallet);
    const order = useSelector((store) => store.order);
    const asset = useSelector((store) => store.asset);
    const [orderType, setOrderType] = useState("BUY");
    const [amount, setAmount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const jwt = localStorage.getItem("jwt");

    // Get current price
    const currentPrice = coinDetails?.market_data?.current_price?.usd || 
                        coinDetails?.current_price?.usd || 
                        coinDetails?.current_price || 
                        0;

    // Calculate quantity based on amount
    const quantity = amount && currentPrice > 0 ? (parseFloat(amount) / currentPrice).toFixed(8) : 0;

    // Get wallet balance
    const walletBalance = parseFloat(wallet?.wallet?.balance || 0);

    // Get available quantity for selling
    const availableQuantity = asset?.assetByCoin?.quantity || 0;

    // Check if insufficient balance for BUY
    const insufficientBalance = orderType === "BUY" && amount && parseFloat(amount) > walletBalance;

    // Check if insufficient quantity for SELL
    const insufficientQuantity = orderType === "SELL" && amount && parseFloat(quantity) > availableQuantity;

    useEffect(() => {
        if (jwt) {
            if (!wallet?.wallet) {
                dispatch(fetchWallet(jwt));
            }
            // Fetch asset for this coin to get available quantity
            if (coinDetails?.id) {
                dispatch(fetchAssetByCoinId(coinDetails.id, jwt));
            }
        }
    }, [dispatch, jwt, coinDetails?.id]); // Removed wallet from dependencies to prevent infinite loop

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setAmount(value);
            setError(null);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!amount || parseFloat(amount) <= 0) {
            setError("Please enter a valid amount");
            return;
        }

        if (orderType === "BUY" && parseFloat(amount) > walletBalance) {
            setError("Insufficient wallet balance");
            return;
        }

        if (orderType === "SELL" && parseFloat(quantity) > availableQuantity) {
            setError("Insufficient quantity to sell");
            return;
        }

        if (!coinDetails?.id) {
            setError("Coin information not available");
            return;
        }

        setIsLoading(true);

        try {
            // Backend endpoint POST /api/orders/pay creates and pays in one step
            // It expects: coinId (String), quantity (double), orderType (OrderType enum)
            const orderData = {
                coinId: coinDetails.id,
                quantity: parseFloat(quantity),
                orderType: orderType, // BUY or SELL
            };

            console.log("Creating and paying for order:", orderData);
            
            // This creates the order, processes payment, and updates wallet/assets in one call
            const createdOrder = await dispatch(createOrder(orderData, jwt));

            if (createdOrder?.id) {
                // Order is already paid and processed, refresh wallet and asset
                await dispatch(fetchWallet(jwt));
                if (coinDetails?.id) {
                    await dispatch(fetchAssetByCoinId(coinDetails.id, jwt));
                }

                // Show success toast
                if (showToast) {
                    const action = orderType === "BUY" ? "bought" : "sold";
                    showToast(
                        `Successfully ${action} ${parseFloat(quantity).toFixed(6)} ${coinDetails?.symbol?.toUpperCase() || 'coins'}!`,
                        'success'
                    );
                }

                // Reset form
                setAmount("");
                setError(null);

                if (onSuccess) {
                    onSuccess();
                }
            } else {
                setError("Failed to create order");
            }
        } catch (error) {
            console.error("Error processing order:", error);
            const errorMessage = error.response?.data?.message || 
                                error.response?.data?.error || 
                                error.message || 
                                "Failed to process order. Please try again.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    const formatPrice = (price) => {
        return parseFloat(price).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const formatChange = (change, percentage) => {
        const isPositive = (change || 0) >= 0;
        return (
            <span className={isPositive ? 'text-emerald-500' : 'text-red-500'}>
                {isPositive ? '+' : ''}{formatPrice(change || 0)} ({isPositive ? '+' : ''}{parseFloat(percentage || 0).toFixed(2)}%)
            </span>
        );
    };

    const priceChange = coinDetails?.market_data?.price_change_24h || 
                       coinDetails?.price_change_24h || 
                       0;
    const priceChangePercent = coinDetails?.market_data?.price_change_percentage_24h || 
                              coinDetails?.price_change_percentage_24h || 
                              0;

    return (
        <div className='stockTradeCard space-y-5'>
            <div>
                <div className='flex gap-4 items-center justify-between'>
                    <Input
                        className='stockInput'
                        placeholder="Enter Amount...."
                        onChange={handleAmountChange}
                        value={amount}
                        type="number"
                        name="amount"
                        min="0"
                        step="0.01"
                        disabled={isLoading}
                    />
                    <div>
                        <p className='border text-2xl flex justify-center items-center w-36 h-14 rounded-md'>
                            {quantity > 0 ? parseFloat(quantity).toFixed(6) : "0.000000"}
                        </p>
                    </div>
                </div>
                {insufficientBalance && (
                    <h1 className='text-red-700 text-sm mt-2'>Insufficient wallet balance to buy</h1>
                )}
                {insufficientQuantity && (
                    <h1 className='text-red-700 text-sm mt-2'>Insufficient quantity to sell</h1>
                )}
            </div> 

            <div className='border rounded-md'>
                <div className='flex gap-5 items-center p-3'>
                    <div>
                        <Avatar> 
                            <AvatarImage
                                className='h-7 w-7'
                                src={coinDetails?.image?.large || 
                                     coinDetails?.image || 
                                     "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"}
                            />
                        </Avatar>
                    </div>
                    <div>
                        <div className='flex items-center gap-2'>
                            <p className='font-semibold'>{coinDetails?.symbol?.toUpperCase() || 'N/A'}</p>
                            <DotIcon className='text-gray-400'/>
                            <p className='text-gray-400'>{coinDetails?.name || 'Coin'}</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <p className='text-xl font-bold'>${formatPrice(currentPrice)}</p>
                            {formatChange(priceChange, priceChangePercent)}
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex items-center justify-between'>
                <p>Order Type</p>
                <p>Market Order</p>
            </div>

            <div className='flex items-center justify-between'>
                <p>{orderType === "BUY" ? "Available Cash" : "Available Quantity"} </p>
                <p className='font-semibold'>
                    {orderType === "BUY" 
                        ? `$${formatPrice(walletBalance)}` 
                        : `${parseFloat(availableQuantity).toFixed(8)}`}
                </p>
            </div>

            {error && (
                <div className='stockFormError'>
                    <p className='text-red-600 text-sm font-medium'>{error}</p>
                </div>
            )}

            <div>
                <DialogClose asChild>
                    <Button 
                        className={`stockTradeButton w-full ${orderType === "SELL" ? "bg-rose-600 hover:bg-rose-500" : ""}`}
                        onClick={handleSubmit}
                        disabled={isLoading || !amount || insufficientBalance || insufficientQuantity}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            orderType
                        )}
                    </Button>
                </DialogClose>
                <Button 
                    variant="link" 
                    className="mt-5 text-slate-900 w-full text-xl" 
                    onClick={() => {
                        setOrderType(orderType === "BUY" ? "SELL" : "BUY");
                        setError(null);
                    }}
                    disabled={isLoading}
                >
                    {orderType === "BUY" ? "Or Sell" : "Or Buy"}
                </Button>
            </div>

        </div>
    )
}

export default TreadingForm
