import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "@/State/Order/Action";
import { Loader2 } from "lucide-react";
import "./Activity.css"

const Activity = () => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const order = useSelector((store) => store.order);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (auth?.jwt) {
      dispatch(fetchOrders(auth.jwt));
    }
  }, [auth?.jwt, dispatch]);

  useEffect(() => {
    if (order?.orders) {
      setOrders(order.orders);
    }
  }, [order?.orders]);

  const formatDate = (dateString) => {
    if (!dateString) return { date: "N/A", time: "N/A" };
    try {
      const date = new Date(dateString);
      const dateStr = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
      const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      return { date: dateStr, time: timeStr };
    } catch (error) {
      return { date: "N/A", time: "N/A" };
    }
  };

  const formatPrice = (price) => {
    if (!price) return "$0.00";
    const numPrice = typeof price === 'number' ? price : parseFloat(price);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numPrice);
  };

  const calculateProfitLoss = (order) => {
    if (!order?.orderItems) return { value: 0, formatted: "$0.00" };
    
    const { orderType, orderItems } = order;
    const { buyPrice, sellPrice, quantity } = orderItems;
    
    if (orderType === "BUY") {
      // For buy orders, profit/loss is based on current price vs buy price
      // Since we don't have current price here, we'll show the order value
      const value = parseFloat(order.price) || 0;
      return { value, formatted: formatPrice(value) };
    } else {
      // For sell orders, profit/loss = (sellPrice - buyPrice) * quantity
      const profit = (parseFloat(sellPrice) - parseFloat(buyPrice)) * parseFloat(quantity);
      return { 
        value: profit, 
        formatted: profit >= 0 ? `+${formatPrice(profit)}` : formatPrice(profit) 
      };
    }
  };

  const getCoinImageUrl = (coin) => {
    // Use coin.image if available, otherwise fallback to CoinGecko URL
    if (coin?.image) return coin.image;
    return `https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400`; // Fallback
  };

  if (order?.loading) {
    return (
      <div className="activityScene">
        <div className="activityContent" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="activityScene">
      <div className="activityBackdrop" />
      <div className="activityGlow activityGlow--one" />
      <div className="activityGlow activityGlow--two" />
      <div className="activityGlow activityGlow--three" />
      <div className="activityParticles">
        {[...Array(7)].map((_, index) => (
          <span key={index} className={`activityParticle activityParticle--${index + 1}`} />
        ))}
      </div>

      <div className="activityContent">
        <div className="activityHeader">
          <h1>Trading History</h1>
          <p>Track all your trading activities and performance metrics</p>
        </div>

        <div className="activityTableContainer">
          <Table className="activityTable">
            <TableCaption className="activityTableCaption">
              {orders.length > 0 
                ? `List of your recent trading activities (${orders.length} orders)`
                : "No trading activities yet"}
            </TableCaption>
            <TableHeader className="activityTableHeader">
              <TableRow>
                <TableHead className="activityTableHead">DATE & TIME</TableHead>
                <TableHead className="activityTableHead">TRADING PAIR</TableHead>
                <TableHead className="activityTableHead">BUY PRICE</TableHead>
                <TableHead className="activityTableHead">SELLING PRICE</TableHead>
                <TableHead className="activityTableHead">ORDER TYPE</TableHead>
                <TableHead className="activityTableHead">PROFIT/LOSS</TableHead>
                <TableHead className="activityTableHead text-right">VALUE</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="activityTableCell text-center">
                    <p className="text-slate-400">No trading activities found. Start trading to see your history here.</p>
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((orderItem, index) => {
                  const { date, time } = formatDate(orderItem.timestamp);
                  const coin = orderItem?.orderItems?.coin;
                  const coinName = coin?.name || "Unknown";
                  const coinSymbol = coin?.symbol?.toUpperCase() || "N/A";
                  const coinId = coin?.id || "";
                  const buyPrice = orderItem?.orderItems?.buyPrice || 0;
                  const sellPrice = orderItem?.orderItems?.sellPrice || 0;
                  const orderType = orderItem?.orderType || "BUY";
                  const profitLoss = calculateProfitLoss(orderItem);
                  const orderValue = parseFloat(orderItem?.price) || 0;

                  return (
                    <TableRow key={orderItem.id || index} className="activityTableRow">
                      <TableCell className="activityTableCell">
                        <div className="activityDateCell">
                          <p>{date}</p>
                          <p>{time}</p>
                        </div>
                      </TableCell>
                      <TableCell className="activityTableCell">
                        <div className="activityCoinCell">
                          <Avatar>
                            <AvatarImage
                              src={getCoinImageUrl(coin)}
                              alt={coinName}
                              className="w-7 h-7"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                            <AvatarFallback>{coinSymbol}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{coinName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="activityTableCell">{formatPrice(buyPrice)}</TableCell>
                      <TableCell className="activityTableCell">
                        {sellPrice > 0 ? formatPrice(sellPrice) : "N/A"}
                      </TableCell>
                      <TableCell className="activityTableCell">
                        <span className={orderType === "BUY" ? "activityProfit" : "activityLoss"}>
                          {orderType}
                        </span>
                      </TableCell>
                      <TableCell className="activityTableCell">
                        <span className={profitLoss.value >= 0 ? "activityProfit" : "activityLoss"}>
                          {profitLoss.formatted}
                        </span>
                      </TableCell>
                      <TableCell className="activityTableCell text-right">{formatPrice(orderValue)}</TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Activity
