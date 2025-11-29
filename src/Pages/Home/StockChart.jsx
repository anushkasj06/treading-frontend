import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { fetchMarketChart } from "@/State/Coin/Action"
import ReactApexChart from "react-apexcharts"
import { useDispatch, useSelector } from "react-redux"

const timeSeries = [
  { keyword: "DIGITAL_CURRENCY_DAILY", key: "Time Series (Daily)", label: "1 Day", value: 1 },
  { keyword: "DIGITAL_CURRENCY_WEEKLY", key: "Time Series (Weekly)", label: "1 Week", value: 7 },
  { keyword: "DIGITAL_CURRENCY_MONTHLY", key: "Time Series (Monthly)", label: "1 Month", value: 30 },
]

const tiers = [
  { label: "Volatility", value: "32.4", suffix: "%", caption: "7 day average" },
  { label: "Open Interest", value: "$9.2B", caption: "Total open positions" },
  { label: "Funding Rate", value: "0.03%", caption: "Hourly average" }
]

const StockChart = ({ coinId = "bitcoin" }) => {
  const dispatch = useDispatch()
  const coin = useSelector((store) => store.coin)
  const [activeLabel, setActiveLabel] = useState(timeSeries[0])

  const series = [
    {
      name: coinId,
      data:
        coin?.marketChart?.data?.map((item) => ({
          x: new Date(item[0]).getTime(),
          y: item[1]
        })) || []
    }
  ]

  const options = {
    chart: {
      id: "rose-gradient-chart",
      type: "area",
      height: 450,
      zoom: { autoScaleYaxis: true },
      toolbar: { show: false },
      foreColor: "#A1A1AA"
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 3.5, colors: ["#38bdf8"] },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.7,
        gradientToColors: ["#1d4ed8"],
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 90]
      }
    },
    markers: { size: 0, colors: ["#0ea5e9"], strokeColors: "#38bdf8", hover: { size: 6 } },
    grid: { borderColor: "#1e293b", strokeDashArray: 4, show: true },
    xaxis: { type: "datetime", tickAmount: 6, labels: { style: { colors: "#94a3b8", fontSize: "12px" } } },
    yaxis: { labels: { style: { colors: "#94a3b8", fontSize: "12px" } } },
    tooltip: { theme: "dark" }
  }

  useEffect(() => {
    if (!coinId || !activeLabel?.value) return
    dispatch(
      fetchMarketChart({
        coinId,
        days: activeLabel.value,
        jwt: localStorage.getItem("jwt")
      })
    )
  }, [dispatch, coinId, activeLabel])

  const handleTimeActiveLabel = (val) => {
    setActiveLabel(val)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {timeSeries.map((item) => (
          <Button
            key={item.label}
            onClick={() => handleTimeActiveLabel(item)}
            variant={activeLabel.label === item.label ? "default" : "outline"}
            className={`rounded-full px-4 ${
              activeLabel.label === item.label
                ? "bg-gradient-to-r from-sky-500 to-blue-600 border-0"
                : "text-slate-300 border-white/20 bg-white/5 hover:bg-white/10"
            }`}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <div id="chart-timelines" className="chartContainer w-full rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur transition-all duration-300 hover:border-white/20 hover:bg-white/8 hover:shadow-lg hover:shadow-sky-500/10">
        <ReactApexChart options={options} series={series} type="area" height={420} />
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        {tiers.map((tier, index) => (
          <div key={tier.label} className={`chartTierCard rounded-2xl border border-white/10 bg-white/5 py-3 transition-all duration-300 hover:border-white/20 hover:bg-white/8 hover:scale-105 cursor-pointer animation-delay-${index}`}>
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">{tier.label}</p>
            <p className="text-xl font-bold text-white mt-1">
              {tier.value}
              {tier.suffix || ""}
            </p>
            <p className="text-xs text-slate-500 mt-1">{tier.caption}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StockChart

