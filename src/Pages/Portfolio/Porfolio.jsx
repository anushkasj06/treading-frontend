import React, { useEffect, useState } from 'react';
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
import { fetchAssets } from "@/State/Asset/Action";
import { Loader2 } from "lucide-react";
import "./Portfolio.css"

const Portfolio = () => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const asset = useSelector((store) => store.asset);
  const [assets, setAssets] = useState([]);
  const [portfolioStats, setPortfolioStats] = useState({
    totalBalance: 0,
    netChange: 0,
    assetCount: 0,
  });

  useEffect(() => {
    if (auth?.jwt) {
      dispatch(fetchAssets(auth.jwt));
    }
  }, [auth?.jwt, dispatch]);

  useEffect(() => {
    if (asset?.assets) {
      setAssets(asset.assets);
      
      // Calculate portfolio statistics
      let totalValue = 0;
      let totalCost = 0;
      
      asset.assets.forEach((assetItem) => {
        const currentPrice = assetItem?.coin?.currentPrice || 0;
        const quantity = assetItem?.quantity || 0;
        const buyPrice = assetItem?.buyPrice || 0;
        
        const currentValue = currentPrice * quantity;
        const costBasis = buyPrice * quantity;
        
        totalValue += currentValue;
        totalCost += costBasis;
      });
      
      const netChange = totalCost > 0 ? ((totalValue - totalCost) / totalCost) * 100 : 0;
      
      setPortfolioStats({
        totalBalance: totalValue,
        netChange: netChange,
        assetCount: asset.assets.length,
      });
    }
  }, [asset?.assets]);

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

  const formatNumber = (num) => {
    if (!num) return "0";
    const numValue = typeof num === 'number' ? num : parseFloat(num);
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    }).format(numValue);
  };

  const formatChange = (change) => {
    const numChange = typeof change === 'number' ? change : parseFloat(change);
    const sign = numChange >= 0 ? "+" : "";
    return `${sign}${numChange.toFixed(2)}%`;
  };

  const getCoinImageUrl = (coin) => {
    // Use coin.image if available, otherwise fallback to CoinGecko URL
    if (coin?.image) return coin.image;
    if (!coin?.id) return '';
    return `https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400`; // Fallback
  };

  const calculateAssetChange = (assetItem) => {
    const currentPrice = assetItem?.coin?.currentPrice || 0;
    const buyPrice = assetItem?.buyPrice || 0;
    
    if (buyPrice === 0) return 0;
    return ((currentPrice - buyPrice) / buyPrice) * 100;
  };

  if (asset?.loading) {
    return (
      <div className="portfolioScene">
        <div className="portfolioContent" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="portfolioScene">
      <div className="portfolioBackdrop" />
      <div className="portfolioGlow portfolioGlow--one" />
      <div className="portfolioGlow portfolioGlow--two" />
      <div className="portfolioGlow portfolioGlow--three" />
      <div className="portfolioParticles">
        {[...Array(7)].map((_, index) => (
          <span key={index} className={`portfolioParticle portfolioParticle--${index + 1}`} />
        ))}
      </div>

      <div className="portfolioContent">
        <div className="portfolioHeader">
          <p className='text-xs uppercase tracking-[0.35em]'>Holdings</p>
          <h1>Portfolio</h1>
          <p>Track your cryptocurrency holdings and performance</p>
        </div>

        <div className="portfolioStats">
          <div className="portfolioStatCard">
            <p>Total balance</p>
            <p className='text-2xl font-semibold mt-1'>{formatPrice(portfolioStats.totalBalance)}</p>
          </div>
          <div className="portfolioStatCard">
            <p>Net change</p>
            <p className={`text-xl font-semibold mt-1 ${portfolioStats.netChange >= 0 ? 'text-emerald-300' : 'text-red-400'}`}>
              {formatChange(portfolioStats.netChange)}
            </p>
          </div>
          <div className="portfolioStatCard">
            <p>Assets</p>
            <p className='text-xl font-semibold mt-1'>{portfolioStats.assetCount} {portfolioStats.assetCount === 1 ? 'coin' : 'coins'}</p>
          </div>
        </div>

        <div className="portfolioTable">
          <Table>
            <TableCaption className="portfolioTableCaption">
              {assets.length > 0 
                ? `List of your cryptocurrency holdings (${assets.length} assets)`
                : "No assets found. Start buying coins to build your portfolio."}
            </TableCaption>
            <TableHeader className="portfolioTableHeader">
              <TableRow>
                <TableHead className="portfolioTableHead">ASSET</TableHead>
                <TableHead className="portfolioTableHead">CURRENT PRICE</TableHead>
                <TableHead className="portfolioTableHead">QUANTITY</TableHead>
                <TableHead className="portfolioTableHead">BUY PRICE</TableHead>
                <TableHead className="portfolioTableHead">CHANGE</TableHead>
                <TableHead className="portfolioTableHead text-right">VALUE</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {assets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="portfolioTableCell text-center">
                    <p className="text-slate-400">No assets found. Start buying coins to build your portfolio.</p>
                  </TableCell>
                </TableRow>
              ) : (
                assets.map((assetItem, index) => {
                  const coin = assetItem?.coin;
                  const coinName = coin?.name || "Unknown";
                  const coinSymbol = coin?.symbol?.toUpperCase() || "N/A";
                  const coinId = coin?.id || "";
                  const currentPrice = coin?.currentPrice || 0;
                  const quantity = assetItem?.quantity || 0;
                  const buyPrice = assetItem?.buyPrice || 0;
                  const value = currentPrice * quantity;
                  const change = calculateAssetChange(assetItem);

                  return (
                    <TableRow key={assetItem.id || index} className="portfolioTableRow">
                      <TableCell className="portfolioTableCell">
                        <div className="portfolioCoinCell">
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
                      <TableCell className="portfolioTableCell">{formatPrice(currentPrice)}</TableCell>
                      <TableCell className="portfolioTableCell">{formatNumber(quantity)}</TableCell>
                      <TableCell className="portfolioTableCell">{formatPrice(buyPrice)}</TableCell>
                      <TableCell className={change >= 0 ? "portfolioChangePositive" : "portfolioChangeNegative"}>
                        {formatChange(change)}
                      </TableCell>
                      <TableCell className="portfolioTableCell text-right">{formatPrice(value)}</TableCell>
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

export default Portfolio
