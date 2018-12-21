import React from 'react'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'

import 'echarts/lib/chart/line'

import { processArray } from 'utils'
const LineCharts = props => {
  const { minHeight = 450, data = [] } = props
  const { x, y } = processArray(data)
  const option = {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '0',
      right: '6%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
        },
        axisLabel: {
          textStyle: {
            fontSize: 10,
          },
        },
        data: x,
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
        },
        axisLabel: {
          margin: 2,
          textStyle: {
            fontSize: 10,
          },
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: '余额',
        type: 'line',
        showSymbol: false,
        itemStyle: {
          normal: {
            color: '#4ab6bd',
            borderColor: '#1c5f8b',
            borderWidth: 4,
          },
        },
        connectNulls: true,
        lineStyle: {
          normal: {
            width: 0,
          },
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#4ab6bd',
              },
              {
                offset: 1,
                color: '#1c5f8b',
              },
            ],
          },
        },
        data: y,
      },
    ],
  }

  return (
    <ReactEchartsCore
      echarts={echarts}
      option={option}
      className="react_for_echarts"
      style={{
        minHeight,
      }}
      theme="macarons"
      opts={{ renderer: 'svg' }}
    />
  )
}

export default LineCharts
