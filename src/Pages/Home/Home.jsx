import React from "react";
import { Button } from "@/components/ui/button";
import AssetTable from "./AssetTable";
import StockChart from "./StockChart";

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
        </div>
      </div>
    </div>
  );
};

export default Home;
