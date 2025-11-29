import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const AssetTable = ({ coin, category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("AssetTable coin data →", coin); // ✅ Debug log

  return (
    <div className="assetTableShell">
      <div className="assetTableHighlight">
        <div>
          <p className="text-sm text-slate-300 font-medium">Live market data for selected coins</p>
          <p className="text-xs text-slate-500">Click any coin to view detailed market information</p>
        </div>
        <Badge className="rounded-full bg-white/10 text-white border border-white/20">
          {category === "all" ? "All assets" : category}
        </Badge>
      </div>
      <ScrollArea className={category === "all" ? "h-[70vh]" : "h-[78vh]"}>
        <Table>
          <TableCaption>List of top cryptocurrencies.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Coin</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Volume</TableHead>
              <TableHead>Market cap</TableHead>
              <TableHead>24h</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {coin && coin.length > 0 ? (
              coin.map((item, index) => {
                const change = item?.price_change_percentage_24h ?? 0;
                const isPositive = change >= 0;
                return (
                  <TableRow key={item.id || index} className="assetRow">
                    <TableCell
                      onClick={() => navigate(`/market/${item?.id || "bitcoin"}`)}
                      className="font-medium flex items-center gap-3 cursor-pointer"
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={
                            item?.image ||
                            "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
                          }
                          alt={item?.name || "Bitcoin"}
                        />
                        <AvatarFallback>
                          {item?.symbol?.toUpperCase() || "BTC"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="assetCoin">
                        <p>{item?.name || "Bitcoin"}</p>
                        <span>Rank #{index + 1}</span>
                      </div>
                    </TableCell>

                    <TableCell className="uppercase tracking-wide text-slate-400">
                      {item?.symbol || "BTC"}
                    </TableCell>
                    <TableCell>
                      ${item?.total_volume?.toLocaleString() || "25.4B"}
                    </TableCell>
                    <TableCell>
                      ${item?.market_cap?.toLocaleString() || "490B"}
                    </TableCell>
                    <TableCell className={isPositive ? "assetTrendUp" : "assetTrendDown"}>
                      {isPositive ? "+" : ""}
                      {change ? change.toFixed(2) : "+2.1"}%
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      ${item?.current_price?.toLocaleString() || "26,500"}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan="6" className="text-center text-slate-400">
                  No coins found or still loading...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default AssetTable;
