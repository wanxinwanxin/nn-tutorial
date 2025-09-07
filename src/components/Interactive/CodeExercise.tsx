'use client'

import { useState } from 'react'

interface CodeExerciseProps {
  title: string
  description: string
  codeTemplate: string
  solution: string
  hint: string
  onComplete: (correct: boolean) => void
}

export default function CodeExercise({ title, description, codeTemplate, solution, hint, onComplete }: CodeExerciseProps) {
  const [userCode, setUserCode] = useState(codeTemplate)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  const checkSolution = () => {
    // Simple string matching - could be enhanced with more sophisticated checking
    const normalizedUser = userCode.trim().replace(/\s+/g, ' ')
    const normalizedSolution = solution.trim().replace(/\s+/g, ' ')
    const correct = normalizedUser.includes(normalizedSolution) || normalizedUser === normalizedSolution
    
    setIsCorrect(correct)
    setShowResult(true)
    onComplete(correct)
  }

  const handleReset = () => {
    setUserCode(codeTemplate)
    setShowResult(false)
    setIsCorrect(false)
    setShowHint(false)
    setShowSolution(false)
  }

  const showSolutionHandler = () => {
    setUserCode(solution)
    setShowSolution(true)
  }

  return (
    <div className="bg-purple-50 p-6 rounded-lg border border-purple-200 space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
          {'</>'}
        </div>
        <h3 className="text-lg font-semibold text-purple-800">{title}</h3>
      </div>
      
      <p className="text-purple-900">{description}</p>
      
      <div className="bg-gray-900 p-4 rounded-lg">
        <textarea
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          className="w-full h-32 bg-transparent text-green-400 font-mono text-sm resize-none border-none outline-none"
          placeholder="Type your code here..."
          disabled={showResult && isCorrect}
        />
      </div>

      {showResult && (
        <div className={`p-4 rounded-lg ${
          isCorrect ? 'bg-green-100 border border-green-300' : 'bg-orange-100 border border-orange-300'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">
              {isCorrect ? '🎉' : '🤔'}
            </span>
            <span className={`font-semibold ${
              isCorrect ? 'text-green-800' : 'text-orange-800'
            }`}>
              {isCorrect ? 'Great job!' : 'Not quite right'}
            </span>
          </div>
          <p className={`text-sm ${
            isCorrect ? 'text-green-700' : 'text-orange-700'
          }`}>
            {isCorrect 
              ? 'Your code looks good! You understand the concept.' 
              : 'Take another look at your code. Check the hint if needed.'
            }
          </p>
        </div>
      )}

      {showHint && !isCorrect && (
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-300">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-yellow-800">Hint</span>
          </div>
          <p className="text-sm text-yellow-700">{hint}</p>
        </div>
      )}

      <div className="flex gap-3 flex-wrap">
        {!showResult ? (
          <button
            onClick={checkSolution}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-all"
          >
            Check Code
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-all"
          >
            Reset
          </button>
        )}
        
        {!isCorrect && (
          <>
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-all"
            >
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
            
            {!showSolution && (
              <button
                onClick={showSolutionHandler}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-all"
              >
                Show Solution
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}