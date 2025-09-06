'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64 text-gray-500">Loading visualization...</div>
})

interface PlotlyVisualizationProps {
  data?: any[]
  layout?: any
  config?: any
  className?: string
  title?: string
}

export default function PlotlyVisualization({
  data = [],
  layout = {},
  config = {},
  className = '',
  title
}: PlotlyVisualizationProps) {
  const defaultLayout = {
    autosize: true,
    margin: { l: 50, r: 50, t: title ? 50 : 30, b: 50 },
    showlegend: true,
    title: title ? { text: title, font: { size: 16 } } : undefined,
    paper_bgcolor: 'white',
    plot_bgcolor: 'white',
    ...layout
  }

  const defaultConfig = {
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'],
    responsive: true,
    ...config
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      {title && (
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
      )}
      <div className="p-4">
        <Plot
          data={data}
          layout={defaultLayout}
          config={defaultConfig}
          style={{ width: '100%', height: '400px' }}
          useResizeHandler={true}
        />
      </div>
    </div>
  )
}

// Helper functions for common visualizations
export const createLinePlot = (x: number[], y: number[], title = 'Line Plot', xTitle = 'X', yTitle = 'Y') => {
  return {
    data: [{
      x,
      y,
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'blue' },
      name: 'Data'
    }],
    layout: {
      title,
      xaxis: { title: xTitle },
      yaxis: { title: yTitle }
    }
  }
}

export const createScatterPlot = (x: number[], y: number[], title = 'Scatter Plot', xTitle = 'X', yTitle = 'Y') => {
  return {
    data: [{
      x,
      y,
      type: 'scatter',
      mode: 'markers',
      marker: { color: 'red', size: 8 },
      name: 'Data Points'
    }],
    layout: {
      title,
      xaxis: { title: xTitle },
      yaxis: { title: yTitle }
    }
  }
}

export const createFunctionPlot = (func: (x: number) => number, xRange: [number, number], title = 'Function Plot') => {
  const x = []
  const y = []
  const step = (xRange[1] - xRange[0]) / 100
  
  for (let i = xRange[0]; i <= xRange[1]; i += step) {
    x.push(i)
    y.push(func(i))
  }
  
  return createLinePlot(x, y, title, 'Input', 'Output')
}