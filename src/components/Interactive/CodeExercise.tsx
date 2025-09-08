'use client'

import { useState } from 'react'

interface CodeExerciseProps {
  title: string
  description: string
  codeTemplate: string
  solution: string
  hint: string
  onComplete: (correct: boolean) => void
  // New props for Monaco integration
  onLoadInEditor?: (code: string) => void
  currentEditorCode?: string
  onCheckSolution?: () => Promise<any>
}

export default function CodeExercise({ 
  title, 
  description, 
  codeTemplate, 
  solution, 
  hint, 
  onComplete,
  onLoadInEditor,
  currentEditorCode,
  onCheckSolution
}: CodeExerciseProps) {
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [codeLoadedInEditor, setCodeLoadedInEditor] = useState(false)
  const [isChecking, setIsChecking] = useState(false)

  const loadExerciseInEditor = () => {
    if (onLoadInEditor) {
      onLoadInEditor(codeTemplate)
      setCodeLoadedInEditor(true)
      setShowResult(false)
      setIsCorrect(false)
    }
  }

  const checkSolution = async () => {
    if (!onCheckSolution) {
      // Fallback to simple string matching if no execution available
      const normalizedUser = (currentEditorCode || '').trim().replace(/\s+/g, ' ')
      const normalizedSolution = solution.trim().replace(/\s+/g, ' ')
      const correct = normalizedUser.includes(normalizedSolution) || normalizedUser === normalizedSolution
      
      setIsCorrect(correct)
      setShowResult(true)
      onComplete(correct)
      return
    }

    setIsChecking(true)
    try {
      const result = await onCheckSolution()
      // Determine correctness based on execution result
      const correct = !result.error && result.output && !result.output.includes('Error')
      
      setIsCorrect(correct)
      setShowResult(true)
      onComplete(correct)
    } catch (error) {
      setIsCorrect(false)
      setShowResult(true)
      onComplete(false)
    } finally {
      setIsChecking(false)
    }
  }

  const handleReset = () => {
    if (onLoadInEditor) {
      onLoadInEditor(codeTemplate)
    }
    setShowResult(false)
    setIsCorrect(false)
    setShowHint(false)
    setShowSolution(false)
    setCodeLoadedInEditor(false)
  }

  const showSolutionHandler = () => {
    if (onLoadInEditor) {
      onLoadInEditor(solution)
      setShowSolution(true)
      setCodeLoadedInEditor(true)
    }
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
      
      {!codeLoadedInEditor ? (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">💻</span>
              </div>
              <div>
                <p className="text-blue-900 font-medium">Use the Code Editor →</p>
                <p className="text-blue-700 text-sm">Load this exercise in the Monaco editor for the best coding experience</p>
              </div>
            </div>
            <button
              onClick={loadExerciseInEditor}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all flex items-center gap-2"
            >
              📝 Load in Editor →
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 text-green-800">
            <span className="text-lg">⚡</span>
            <span className="font-medium">Code loaded in editor!</span>
            <span className="text-sm text-green-600">→ Switch to Code tab to continue</span>
          </div>
          {currentEditorCode && (
            <div className="mt-2 text-sm text-green-700">
              Current editor has {currentEditorCode.split('\n').length} lines of code
            </div>
          )}
        </div>
      )}

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
            disabled={!codeLoadedInEditor || isChecking}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isChecking ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Checking...
              </>
            ) : (
              <>
                🔍 Check Solution
              </>
            )}
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