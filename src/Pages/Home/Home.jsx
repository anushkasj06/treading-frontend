import React from "react";
import { Button } from "@/components/ui/button";
import AssetTable from "./AssetTable";
import StockChart from "./StockChart";
import { Avatar,AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { DotIcon } from "@radix-ui/react-icons";
import { MessageCircle } from "lucide-react";


const Home = () => {
  const [category, setCategory] = React.useState("all");


  const handleCategory = (value) => {
    setCategory(value);
  };

  return (
    <div className="relative">
      <div className="lg:flex">
        {/* Left Section */}
        <div className="lg:block lg:w-[50%] border-r p-5">
          <div className="p-3 flex items-center gap-4 flex-wrap">
            <Button
              onClick={() => handleCategory("all")}
              variant={category === "all" ? "default" : "outline"}
              className="rounded-full px-4 py-2"
            >
              All
            </Button>

            <Button
              onClick={() => handleCategory("top50")}
              variant={category === "top50" ? "default" : "outline"}
              className="rounded-full px-4 py-2"
            >
              Top 50
            </Button>

            <Button
              onClick={() => handleCategory("topGainers")}
              variant={category === "topGainers" ? "default" : "outline"}
              className="rounded-full px-4 py-2"
            >
              Top Gainers
            </Button>

            <Button
              onClick={() => handleCategory("topLosers")}
              variant={category === "topLosers" ? "default" : "outline"}
              className="rounded-full px-4 py-2"
            >
              Top Losers
            </Button>
          </div>
          <AssetTable />
        </div>

        {/* Right Section */}
        <div className="hidden lg:block lg:w-[50%] p-5">
            <StockChart />
            <div className="flex items-center gap-5">
                <div >
                <Avatar>
                  <AvatarImage src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" 
                  className="w-7 h-7"
                  alt="User Avatar" />
                </Avatar>
              </div>
              <div>
                <div className="flex items-center gap-2">
                <p>BTC</p>
                <DotIcon  className="text-gray-400"/>
                <p className="text-gray-400">Bitcoin</p>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-xl font-bold" >5464</p>
                <p className="text-red-600">
                  <span>-1319049822.578</span>
                  <span>(-0.2980.3%)</span>
                </p>
              </div>
              </div>
            </div>
        </div>
        <section className="absolute bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2">
              <div className="relative cursor-pointer group">
                <Button
                  className="w-[10rem] h-[3rem] gap-2 items-center rounded-full shadow-md bg-rose-600 hover:bg-rose-600 transition-all duration-200"
                >
                  <MessageCircle
                    size={26}
                    className="text-white transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="text-white font-semibold">Chat Bot</span>
                </Button>
              </div>
          </section>
      </div>
    </div>
  );
};

export default Home;
