'use client'

import { useState } from 'react'

interface InteractiveSliderProps {
  label: string
  min: number
  max: number
  step: number
  defaultValue: number
  unit?: string
  description: string
  onChange: (value: number) => void
  formatValue?: (value: number) => string
}

export default function InteractiveSlider({
  label,
  min,
  max,
  step,
  defaultValue,
  unit = '',
  description,
  onChange,
  formatValue
}: InteractiveSliderProps) {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (newValue: number) => {
    setValue(newValue)
    onChange(newValue)
  }

  const displayValue = formatValue ? formatValue(value) : value.toString()

  return (
    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-indigo-800 font-semibold">{label}</label>
        <span className="bg-indigo-100 px-2 py-1 rounded text-indigo-800 font-mono text-sm">
          {displayValue}{unit}
        </span>
      </div>
      
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => handleChange(Number(e.target.value))}
        className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer slider"
        style={{
          background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((value - min) / (max - min)) * 100}%, #e0e7ff ${((value - min) / (max - min)) * 100}%, #e0e7ff 100%)`
        }}
      />
      
      <div className="flex justify-between text-xs text-indigo-600">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
      
      <p className="text-sm text-indigo-700">{description}</p>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #6366f1;
          border: 2px solid white;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #6366f1;
          border: 2px solid white;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  )
}