import { Button } from '@/components/ui/button'
import React from 'react'
import ReactApexChart from 'react-apexcharts'

const timeSeries = [
  {
    keyword: 'DIGITAL_CURRENCY_DAILY',
    key: 'Time Series (Daily)',
    lable: '1 Day',
    value: '1',
  },
  {
    keyword: 'DIGITAL_CURRENCY_WEEKLY',
    key: 'Time Series (Weekly)',
    lable: '1 Week',
    value: '7',
  },
  {
    keyword: 'DIGITAL_CURRENCY_MONTHLY',
    key: 'Time Series (Monthly)',
    lable: '1 Month',
    value: '30',
  },
]

const series = [
  {
    name: 'Price',
    data: [
      [1758207793983, 117735.87157682],
      [1758211255855, 117676.424762366],
      [1758215005443, 117644.581806626],
      [1758218577160, 117607.209984159],
      [1758222131262, 117851.185392053],
      [1758226012546, 117479.654706262],
      [1758229440959, 117575.953057389],
      [1758232975116, 117412.082603559],
      [1758236541122, 116948.585861576],
      [1758240184296, 117169.117937077],
      [1758243645212, 117447.660445725],
      [1758247341132, 117246.223263218],
      [1758250953933, 117162.559358372],
      [1758254585632, 117001.295495472],
      [1758258173292, 117050.601699425],
      [1758261768108, 116946.208493718],
      [1758265508542, 116802.451877607],
      [1758268939833, 116957.2847664],
      [1758272498193, 116960.446275965],
      [1758276170251, 116544.948638568],
      [1758279763394, 116542.945415232],
      [1758283314573, 116402.897961496],
      [1758286833832, 116207.719826684],
      [1758290505392, 116310.944271055],
      [1758294181520, 115976.8436483],
    ],
  },
]

const StockChart = () => {
  const [activeLable, setActiveLable] = React.useState('1 Day')

  const options = {
    chart: {
      id: 'rose-gradient-chart',
      type: 'area',
      height: 450,
      zoom: { autoScaleYaxis: true },
      toolbar: { show: false },
      foreColor: '#A1A1AA',
    },
    dataLabels: {
      enabled: false, // 👈 disables the floating value labels
    },
    stroke: {
      curve: 'smooth',
      width: 3.5,
      colors: ['#FB7185'], // base rose-400
      gradient: {
        shade: 'light',
        type: 'horizontal',
        gradientToColors: ['#E11D48'], // rose-600
        shadeIntensity: 0.9,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.8,
        gradientToColors: ['#FFE4E6'], // rose-100 for soft fade
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    markers: {
      size: 0,
      colors: ['#F43F5E'], // rose-500
      strokeColors: '#E11D48',
      hover: { size: 6 },
    },
    grid: {
      borderColor: '#27272A',
      strokeDashArray: 4,
      show: true,
    },
    xaxis: {
      type: 'datetime',
      tickAmount: 6,
      labels: {
        style: {
          colors: '#A1A1AA',
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#A1A1AA',
          fontSize: '12px',
        },
      },
    },
    tooltip: {
      theme: 'dark',
    },
  }

  const handleTimeActiveLable = (val) => {
    setActiveLable(val)
  }

  return (
    <div>
      <div className="space-x-3 mb-4">
        {timeSeries.map((time) => (
          <Button
            key={time.lable}
            onClick={() => handleTimeActiveLable(time.lable)}
            variant={activeLable === time.lable ? 'default' : 'outline'}
          >
            {time.lable}
          </Button>
        ))}
      </div>
      <div id="chart-timelines" className="w-full">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={450}
        />
      </div>
    </div>
  )
}

export default StockChart
