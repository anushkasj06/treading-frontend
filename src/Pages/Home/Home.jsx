import React from "react";
import { Button } from "@/components/ui/button";
import AssetTable from "./AssetTable";
import StockChart from "./StockChart";
import { Avatar,AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { Cross1Icon, DotIcon } from "@radix-ui/react-icons";
import { MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

const Home = () => {
  const [category, setCategory] = React.useState("all");
  const [inputValue, setInputValue] = React.useState("");
  const [isBotReleased, setIsBotReleased] = React.useState(false);


  const handleCategory = (value) => {
    setCategory(value);
  };

  const handleBotRelease = () => {
    setIsBotReleased(!isBotReleased);
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Handle the enter key press event
      console.log('User input:', inputValue);
      // You can add your logic here to send the message to the chat bot
      setInputValue(''); // Clear the input field after sending the message
    }
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
        
      </div>

      <section className="absolute bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2">

            {/* Chat Box */}
            {isBotReleased &&  <div className="rounded-md w-[20rem] md:w-[25rem] lg:w-[25rem] h-[70vh] bg-slate-950 flex flex-col">
              
              {/* Header */}
              <div className="flex justify-between items-center p-3 border-b border-gray-700">
                <p className="text-gray-400 font-bold">Chat Bot</p>
                <Button
                  onClick={handleBotRelease}
                 variant="ghost" size="icon" className="p-0">
                  <Cross1Icon />
                </Button>
              </div>

              {/* Chat Messages */}
              <div className="h-[76%] flex flex-col overflow-y-auto gap-3 px-5 py-3">

                {/* Initial Bot Message */}
                <div className="self-start max-w-[80%] bg-rose-600 px-4 py-2 rounded-md">
                  <p className="text-white">Hello! How can I assist you today?</p>
                  <p className="text-white">Please enter your query below:</p>
                  <p className="text-white">like, "What is the price of BTC?"</p>
                </div>

                {/* Sample conversation */}
                {[1, 2, 1, 2, 1, 2].map((item) => (
                  <div
                    key={item}
                    className={`pb-2 w-full flex ${
                      item % 2 === 0 ? "justify-start" : "justify-end"
                    }`}
                  >
                    {item % 2 === 0 ? (
                      <div className="max-w-[80%] bg-rose-600 px-4 py-2 rounded-md shadow-sm shadow-rose-800 ">
                        <p className="text-white">The current price of BTC is $54,640.</p>
                      </div>
                    ) : (
                      <div className="max-w-[80%] bg-rose-400 px-4 py-2 rounded-md shadow-sm">
                        <p className="text-white">User: What is the price of ETH?</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-3 border-t border-gray-700">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  onChange={handleChange}
                  value={inputValue}
                  onKeyPress={handleKeyPress}
                  className="w-full px-3 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-rose-600"
                />
              </div>


              
            </div>}

            {/* Chat Button */}
            <div className="relative w-[10rem] cursor-pointer group">
              <Button
                onClick={handleBotRelease}
                className="w-[10rem] h-[3rem] gap-2 items-center rounded-full shadow-md bg-rose-600 hover:bg-rose-600 transition-all duration-200"
              >
                <MessageCircle
                  size={26}
                  className="text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                />
                <span className="text-white font-semibold">Chat Bot</span>
              </Button>
            </div>
      </section>


    </div>
  );
};

export default Home;
