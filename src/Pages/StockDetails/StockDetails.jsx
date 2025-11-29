import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BookMarkedIcon, DotIcon } from "lucide-react";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TreadingForm from "./TreadingForm";
import StockChart from "../Home/StockChart";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCoinDetails } from "@/State/Coin/Action";
import { Toast, useToast } from "@/components/ui/toast";
import "./Stock.css"

const StockDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const coin = useSelector((store) => store.coin);
  const [bookmarked, setBookmarked] = useState(false);
  const [coinDetails, setCoinDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    setLoading(true);
    
    // 1️⃣ Try to load from Redux state first
    if (coin?.coinDetails && (coin.coinDetails.id === id || coin.coinDetails.name?.toLowerCase() === id.toLowerCase())) {
      setCoinDetails(coin.coinDetails);
      setLoading(false);
      return;
    }

    // 2️⃣ Try to find in coinList or top50 from Redux
    const coinListCache = coin?.coinList || [];
    const top50Cache = coin?.top50 || [];
    const foundCoin = coinListCache.find((c) => c.id === id || c.id?.toLowerCase() === id.toLowerCase()) || 
                      top50Cache.find((c) => c.id === id || c.id?.toLowerCase() === id.toLowerCase());
    
    if (foundCoin) {
      setCoinDetails(foundCoin);
      sessionStorage.setItem(`coin_${id}`, JSON.stringify(foundCoin));
      setLoading(false);
      return;
    }

    // 3️⃣ Try to load from sessionStorage
    const cachedCoin = sessionStorage.getItem(`coin_${id}`);
    if (cachedCoin) {
      try {
        const parsed = JSON.parse(cachedCoin);
        setCoinDetails(parsed);
        setLoading(false);
        return;
      } catch (e) {
        console.error("Error parsing cached coin:", e);
      }
    }

    // 4️⃣ Try top50Cache from sessionStorage
    const top50SessionCache = sessionStorage.getItem("top50_coins");
    if (top50SessionCache) {
      try {
        const top50 = JSON.parse(top50SessionCache);
        const foundCoin = top50.find((c) => c.id === id || c.id?.toLowerCase() === id.toLowerCase());
        if (foundCoin) {
          setCoinDetails(foundCoin);
          sessionStorage.setItem(`coin_${id}`, JSON.stringify(foundCoin));
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error("Error parsing top50 cache:", e);
      }
    }

    // 5️⃣ Fetch from backend
    dispatch(
      fetchCoinDetails({
        coinId: id,
        jwt: localStorage.getItem("jwt"),
      })
    ).then((action) => {
      if (action?.payload) {
        setCoinDetails(action.payload);
        sessionStorage.setItem(`coin_${id}`, JSON.stringify(action.payload));
      } else {
        // If fetch fails, try to use basic data structure
        setCoinDetails({
          id: id,
          name: id.charAt(0).toUpperCase() + id.slice(1),
          symbol: id.toUpperCase().slice(0, 3),
          current_price: { usd: 0 },
          price_change_24h: 0,
          price_change_percentage_24h: 0,
          image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
        });
      }
      setLoading(false);
    }).catch((error) => {
      console.error("Error fetching coin details:", error);
      setLoading(false);
    });
  }, [id, dispatch, coin?.coinDetails, coin?.coinList, coin?.top50]);


  if (loading || !coinDetails) {
    return (
      <div className="stockScene">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">Loading coin details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="stockScene">
      <div className="stockHero">
      {/* Top Section */}
      <div className="flex justify-between items-center flex-wrap">
        <div className="flex gap-5 items-center">
          <Avatar className="h-12 w-12 ring-2 ring-rose-500/30">
            <AvatarImage
              className="h-12 w-12"
              src={
                coinDetails?.image?.large ||
                coinDetails?.image ||
                "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
              }
              alt={coinDetails?.name || "Coin Logo"}
            />
            <AvatarFallback className="bg-rose-500/20 text-rose-400 font-bold">
              {coinDetails?.symbol?.toUpperCase() || "BTC"}
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold">
                {coinDetails?.symbol?.toUpperCase() || "BTC"}
              </p>
              <DotIcon className="text-gray-400" />
              <p className="text-gray-400">{coinDetails?.name || "Bitcoin"}</p>
            </div>

            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold">
                $
                {coinDetails?.market_data?.current_price?.usd
                  ? coinDetails.market_data.current_price.usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : coinDetails?.current_price?.usd?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
                  || coinDetails?.current_price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  || "0.00"}
              </p>
              <p
                className={`${
                  (coinDetails?.market_data?.price_change_percentage_24h ?? coinDetails?.price_change_percentage_24h ?? 0) >= 0
                    ? "text-green-500"
                    : "text-red-500"
                } text-sm font-semibold`}
              >
                <span>
                  {(coinDetails?.market_data?.price_change_24h ?? coinDetails?.price_change_24h ?? 0) >= 0 ? '+' : ''}
                  {coinDetails?.market_data?.price_change_24h
                    ? coinDetails.market_data.price_change_24h.toFixed(2)
                    : coinDetails?.price_change_24h?.toFixed(2) || "0.00"}
                </span>
                <span>
                  {' '}(
                  {(coinDetails?.market_data?.price_change_percentage_24h ?? coinDetails?.price_change_percentage_24h ?? 0) >= 0 ? '+' : ''}
                  {coinDetails?.market_data?.price_change_percentage_24h
                    ? coinDetails.market_data.price_change_percentage_24h.toFixed(2)
                    : coinDetails?.price_change_percentage_24h?.toFixed(2) ||
                      "0.00"}
                  %)
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center mt-4 lg:mt-0">
          <Button
            variant="outline"
            className="mr-5 border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all duration-300 hover:scale-105"
            onClick={() => setBookmarked(!bookmarked)}
          >
            {bookmarked ? (
              <BookmarkFilledIcon className="h-6 w-6 text-rose-500" />
            ) : (
              <BookMarkedIcon className="h-6 w-6" />
            )}
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="stockTradeBtn bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white shadow-lg hover:shadow-rose-500/50 transition-all duration-300 hover:scale-105">
                Trade
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>How much do you want to spend?</DialogTitle>
              </DialogHeader>
              <TreadingForm 
                coinDetails={coinDetails} 
                onSuccess={() => {
                  // Optionally refresh data or show success message
                  console.log("Order completed successfully");
                }}
                showToast={showToast}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      </div>
      {/* Chart Section */}
      <div className="mt-14 stockChartSection">
        <StockChart coinId={id} />
      </div>

      {/* Toast Notification - rendered at page level for visibility */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={hideToast}
        />
      )}
    </div>
  );
};

export default StockDetails;
