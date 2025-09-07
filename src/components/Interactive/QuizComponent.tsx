'use client'

import { useState } from 'react'

interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

interface QuizComponentProps {
  question: string
  options: QuizOption[]
  explanation: string
  onComplete: (correct: boolean) => void
}

export default function QuizComponent({ question, options, explanation, onComplete }: QuizComponentProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleOptionSelect = (optionId: string) => {
    if (showResult) return
    setSelectedOption(optionId)
  }

  const handleSubmit = () => {
    if (!selectedOption) return
    
    const selectedOptionData = options.find(opt => opt.id === selectedOption)
    const correct = selectedOptionData?.isCorrect || false
    
    setIsCorrect(correct)
    setShowResult(true)
    onComplete(correct)
  }

  const handleReset = () => {
    setSelectedOption(null)
    setShowResult(false)
    setIsCorrect(false)
  }

  return (
    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
          ?
        </div>
        <h3 className="text-lg font-semibold text-blue-800">Quick Check</h3>
      </div>
      
      <p className="text-blue-900 font-medium">{question}</p>
      
      <div className="space-y-2">
        {options.map((option) => (
          <div
            key={option.id}
            className={`p-3 rounded-lg cursor-pointer border-2 transition-all ${
              selectedOption === option.id
                ? showResult
                  ? option.isCorrect
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : 'bg-red-100 border-red-500 text-red-800'
                  : 'bg-blue-100 border-blue-500 text-blue-800'
                : showResult && option.isCorrect
                ? 'bg-green-50 border-green-300 text-green-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => handleOptionSelect(option.id)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selectedOption === option.id
                  ? showResult
                    ? option.isCorrect
                      ? 'border-green-500 bg-green-500'
                      : 'border-red-500 bg-red-500'
                    : 'border-blue-500 bg-blue-500'
                  : showResult && option.isCorrect
                  ? 'border-green-500 bg-green-500'
                  : 'border-gray-400'
              }`}>
                {((selectedOption === option.id) || (showResult && option.isCorrect)) && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <span className="text-sm">{option.text}</span>
            </div>
          </div>
        ))}
      </div>

      {showResult && (
        <div className={`p-4 rounded-lg ${
          isCorrect ? 'bg-green-100 border border-green-300' : 'bg-orange-100 border border-orange-300'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">
              {isCorrect ? '✅' : '💡'}
            </span>
            <span className={`font-semibold ${
              isCorrect ? 'text-green-800' : 'text-orange-800'
            }`}>
              {isCorrect ? 'Correct!' : 'Learning Opportunity'}
            </span>
          </div>
          <p className={`text-sm ${
            isCorrect ? 'text-green-700' : 'text-orange-700'
          }`}>
            {explanation}
          </p>
        </div>
      )}

      <div className="flex gap-3">
        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedOption
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-all"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}