import React, { useEffect, useRef } from "react";
import "./Home.css";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AssetTable from "./AssetTable";
import StockChart from "./StockChart";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Cross1Icon, DotIcon } from "@radix-ui/react-icons";
import { ArrowUpRight, MessageCircle, ShieldCheck, Sparkles, Zap, Waves, Activity, Play, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { getCoinList, getTop50CoinList } from "@/State/Coin/Action";

const heroStats = [
  { label: "Active Coins", value: "2,413", delta: "Live updates" },
  { label: "New Alerts", value: "187", delta: "Last hour" },
  { label: "Connected Exchanges", value: "32", delta: "Fast connection" }
]

const quickInsights = [
  { title: "Bitcoin Trend", detail: "BTC is up 2.4% today" },
  { title: "Trading Volume", detail: "High activity at $3.6B" },
  { title: "Market Status", detail: "Stable at 0.03%" }
]

const trustSignals = [
  { title: "Fast Trading", detail: "Orders execute in under 15ms" },
  { title: "Safe Trading", detail: "Auto protection enabled" },
  { title: "Market Sentiment", detail: "Positive outlook" },
  { title: "Trading Tools", detail: "27 ready-to-use strategies" }
]

const tickerItems = [
  { label: "Bitcoin", value: "+2.4%" },
  { label: "Ethereum", value: "18 gwei" },
  { label: "Solana", value: "+4.2%" },
  { label: "Tether", value: "$1.1B" },
  { label: "AI Coins", value: "+1.2%" }
]

const workflowSteps = [
  { title: "Choose Filter", detail: "Select coins you want to track" },
  { title: "Watch Charts", detail: "Monitor prices and trends in real-time" },
  { title: "Quick Actions", detail: "Use tools for faster trading decisions" }
]

const tourSteps = [
  { 
    title: "Welcome to Trading Dashboard", 
    description: "This is your main dashboard where you can track all cryptocurrencies in real-time.",
    target: "hero",
    position: "bottom"
  },
  { 
    title: "Market Overview", 
    description: "Filter and view coins by category: All, Top 50, Top Gainers, or Top Losers.",
    target: "marketPanel",
    position: "bottom"
  },
  { 
    title: "Price Charts", 
    description: "View detailed price charts with different time periods: 1 Day, 1 Week, or 1 Month.",
    target: "chartPanel",
    position: "top"
  },
  { 
    title: "Trading Assistant", 
    description: "Get help with prices, trends, and trading strategies from our AI assistant.",
    target: "botButton",
    position: "left"
  }
]

const Home = () => {
  const [category, setCategory] = React.useState("all");
  const [inputValue, setInputValue] = React.useState("");
  const [isBotReleased, setIsBotReleased] = React.useState(false);
  const [isTourActive, setIsTourActive] = React.useState(false);
  const [currentTourStep, setCurrentTourStep] = React.useState(0);
  const heroRef = useRef(null);
  const marketPanelRef = useRef(null);
  const chartPanelRef = useRef(null);
  const botButtonRef = useRef(null);

  const coin = useSelector((store) => store.coin);
  const dispatch = useDispatch();

  const handleCategory = (value) => {
    setCategory(value);
  };

  const handleBotRelease = () => {
    setIsBotReleased(!isBotReleased);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("User input:", inputValue);
      setInputValue("");
    }
  };

  const handleStartTour = () => {
    setIsTourActive(true);
    setCurrentTourStep(0);
  };

  const handleNextTourStep = () => {
    if (currentTourStep < tourSteps.length - 1) {
      setCurrentTourStep(currentTourStep + 1);
    } else {
      setIsTourActive(false);
      setCurrentTourStep(0);
    }
  };

  const handleSkipTour = () => {
    setIsTourActive(false);
    setCurrentTourStep(0);
  };

  const getTourTargetRef = (target) => {
    switch(target) {
      case "hero": return heroRef;
      case "marketPanel": return marketPanelRef;
      case "chartPanel": return chartPanelRef;
      case "botButton": return botButtonRef;
      default: return null;
    }
  };

  useEffect(() => {
    switch (category) {
      case "top50":
        dispatch(getTop50CoinList());
        break;
      case "topGainers":
        // dispatch(getTopGainersList());
        break;
      case "topLosers":
        // dispatch(getTopLosersList());
        break;
      default:
        dispatch(getCoinList(1));
    }
  }, [category, dispatch]);

  return (
    <div className="homeScene">
      <div className="homeBackdrop" />
      <div className="homeGlow homeGlow--one" />
      <div className="homeGlow homeGlow--two" />
      <div className="homeGlow homeGlow--three" />
      <div className="homeParticles">
        {[...Array(7)].map((_, index) => (
          <span key={index} className={`homeParticle homeParticle--${index + 1}`} />
        ))}
      </div>

      <div className="homeContent">
        <section className="homeHero" ref={heroRef}>
          <div className="homeHeroText">
            <span className="homeTag">Live Dashboard</span>
            <h1>Track, analyze, and trade cryptocurrencies in one place</h1>
            <p>Monitor market movements, get instant updates, and make smart trading decisions. All data updates in real-time.</p>
            <div className="homeHeroActions">
              <Button className="homePrimaryButton rounded-full px-6 py-5 text-base font-semibold shadow-2xl bg-gradient-to-r from-emerald-400 via-sky-500 to-indigo-500 hover:scale-[1.02] transition-all duration-300">
                View Market
              </Button>
              <Button
                onClick={handleStartTour}
                variant="outline"
                className="homeTourButton rounded-full border-white/30 text-slate-50 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
              >
                <Play className="mr-2 h-4 w-4" />
                Take Tour
              </Button>
            </div>
            <div className="homeStatsRow">
              {heroStats.map((stat) => (
                <div key={stat.label} className="homeStatCard">
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                  <p className="text-emerald-300 text-xs">{stat.delta}</p>
                </div>
              ))}
            </div>
          </div>

          <Card className="homeHeroCard">
            <CardHeader className="p-0">
              <CardTitle>Market Summary</CardTitle>
              <CardDescription className="text-slate-200">
                Get the latest market updates every few seconds to stay informed.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ul>
                {quickInsights.map((item) => (
                  <li key={item.title} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-slate-300">{item.detail}</p>
                    </div>
                    <ArrowUpRight className="text-slate-400" size={18} />
                  </li>
                ))}
              </ul>
              <Separator className="my-5 bg-white/10" />
              <div className="flex flex-wrap gap-4">
                <Badge className="homeBadge rounded-full px-4 py-1 bg-white/10 text-white border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <Sparkles className="mr-1 h-3.5 w-3.5 animate-pulse" /> AI Assistant Active
                </Badge>
                <Badge className="homeBadge rounded-full px-4 py-1 bg-emerald-500/20 text-emerald-100 border border-emerald-400/30 hover:bg-emerald-500/30 transition-all duration-300">
                  <ShieldCheck className="mr-1 h-3.5 w-3.5" /> Security Enabled
                </Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="homeTicker">
          <div className="homeTickerTrack">
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <div key={`${item.label}-${index}`} className="homeTickerItem">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <section className="homeBody">
          <Card className="homePanel" ref={marketPanelRef}>
            <div className="homePanelHeader">
              <div>
                <p className="homePanelTitle">Market Overview</p>
                <p className="homePanelDescription">Filter coins by category to find what you're looking for.</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {["all", "top50", "topGainers", "topLosers"].map((cat) => (
                  <Button
                    key={cat}
                    onClick={() => handleCategory(cat)}
                    variant={category === cat ? "default" : "outline"}
                    className={`rounded-full px-4 ${category === cat ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white border-0" : "border-white/20 text-white/80 hover:bg-white/10"}`}
                  >
                    {cat === "all"
                      ? "All"
                      : cat === "top50"
                      ? "Top 50"
                      : cat === "topGainers"
                      ? "Top gainers"
                      : "Top losers"}
                  </Button>
                ))}
              </div>
            </div>
            <AssetTable coin={category === "all" ? coin.coinList : coin.top50} category={category} />
          </Card>

          <div className="flex flex-col gap-6">
            <Card className="homePanel chartCard" ref={chartPanelRef}>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="homePanelTitle">Price Chart</p>
                  <p className="homePanelDescription">
                    Interactive charts with smooth zoom and real-time Bitcoin price tracking.
                  </p>
                </div>
                <Badge className="rounded-full px-4 py-1 bg-white/10 text-white border border-white/20">
                  BTC • Live
                </Badge>
              </div>
              <StockChart />
              <div className="flex items-center justify-between flex-wrap gap-3 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
                      alt="BTC"
                    />
                  </Avatar>
                  <div>
                    <p className="font-semibold">BTC · Bitcoin</p>
                    <p className="text-xs text-slate-400">Pulling data from Binance, Coinbase, and more</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-emerald-400 font-semibold">+2.8% today</p>
                  <p className="text-xs text-slate-400">Next check-in in 03m 21s</p>
                </div>
              </div>
            </Card>

            <div className="homeMiniGrid">
              {trustSignals.map((signal) => (
                <div key={signal.title} className="miniCard">
                  <h4>{signal.title}</h4>
                  <p>{signal.detail}</p>
                </div>
              ))}
              <div className="miniCard">
                <h4>System Status</h4>
                <p className="text-emerald-300">All systems running • 99.99% uptime</p>
              </div>
            </div>

            <div className="homeWorkflow">
              {workflowSteps.map((step, index) => (
                <div key={step.title} className="homeWorkflowCard">
                  <div className="homeWorkflowBadge">
                    <span>{index + 1}</span>
                    {index === 0 ? <Activity className="h-4 w-4" /> : <Waves className="h-4 w-4" />}
                  </div>
                  <div>
                    <h5>{step.title}</h5>
                    <p>{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="botLauncher">
        {isBotReleased && (
          <div className="botPanel">
            <div className="botPanelHeader">
              <div>
                <p className="font-semibold text-white">Trading Assistant</p>
                <p className="text-xs text-slate-400">Ask about prices, get trading ideas, or quick market updates.</p>
              </div>
              <Button onClick={handleBotRelease} variant="ghost" size="icon" className="text-white">
                <Cross1Icon />
              </Button>
            </div>

            <div className="botMessages">
              <div className="botBubble agent">
                <p>Hello! I can help you check prices, analyze trends, or suggest trading strategies.</p>
                <p className="text-xs opacity-80 mt-1">Try asking "What's the price of Ethereum?"</p>
              </div>
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className={`botBubble ${item % 2 === 0 ? "agent" : "user"}`}
                >
                  {item % 2 === 0 ? (
                    <p>The current price of BTC is $54,640.</p>
                  ) : (
                    <p>What’s the price of ETH?</p>
                  )}
                </div>
              ))}
            </div>

            <div className="botInput">
              <Input
                type="text"
                placeholder="Type a quick question..."
                onChange={handleChange}
                value={inputValue}
                onKeyPress={handleKeyPress}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>
        )}

        <span className="botBadge">Need help?</span>
        <Button ref={botButtonRef} onClick={handleBotRelease} className="botFab hover:scale-105 transition-transform duration-300">
          <MessageCircle size={20} />
          <span>Open Assistant</span>
          <Zap size={18} className="text-yellow-300 animate-pulse" />
        </Button>
      </section>

      {/* Tour Overlay */}
      {isTourActive && (
        <div className="tourOverlay">
          <div className="tourBackdrop" onClick={handleSkipTour}></div>
          <div className={`tourTooltip tourTooltip--${tourSteps[currentTourStep].position} tourTooltip--fixed`}>
            <div className="tourTooltipContent">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white">{tourSteps[currentTourStep].title}</h3>
                <Button
                  onClick={handleSkipTour}
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 h-6 w-6"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-slate-300 mb-4">{tourSteps[currentTourStep].description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Step {currentTourStep + 1} of {tourSteps.length}
                </span>
                <div className="flex gap-2">
                  {currentTourStep > 0 && (
                    <Button
                      onClick={() => setCurrentTourStep(currentTourStep - 1)}
                      variant="outline"
                      className="text-xs px-3 py-1 text-white border-white/20 hover:bg-white/10"
                    >
                      Previous
                    </Button>
                  )}
                  <Button
                    onClick={handleNextTourStep}
                    className="text-xs px-3 py-1 bg-gradient-to-r from-sky-500 to-indigo-500 text-white"
                  >
                    {currentTourStep === tourSteps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
