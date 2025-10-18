import React from 'react'
import ReactApexChart from 'react-apexcharts'

const StockChart = () => {
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

  const options = {
    chart: {
      id: 'rose-gradient-chart',
      type: 'area',
      height: 550,
      zoom: {
        autoScaleYaxis: true,
      },
      toolbar: { show: false },
    },
    stroke: {
      curve: 'smooth',
      width: 3, // thicker line for visibility
      colors: ['#E11D48'], // rose-600 from shadcn palette
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'datetime',
      tickAmount: 6,
      labels: {
        style: {
          colors: '#A1A1AA', // zinc-400
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#A1A1AA',
        },
      },
    },
    markers: {
      size: 0,
      colors: ['#E11D48'],
      strokeColors: '#F43F5E', // rose-500 edge
      strokeWidth: 1,
      hover: { size: 5 },
    },
    tooltip: {
      theme: 'dark',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 1,
        gradientToColors: ['#F43F5E'], // rose-500 lighter shade
        opacityFrom: 0.5, // softer inner fill
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    grid: {
      borderColor: '#404040',
      strokeDashArray: 3,
      show: true,
    },
  }

  return (
    <div id="chart-timelines" className="w-full">
      <ReactApexChart options={options} series={series} type="area" height={550} />
    </div>
  )
}

export default StockChart
