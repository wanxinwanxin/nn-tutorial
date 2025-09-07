/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from 'react'

interface ChunkProgress {
  id: string
  title: string
  completed: boolean
}

interface FloatingProgressTrackerProps {
  chunks: ChunkProgress[]
  currentChunk: number
  chapterTitle?: string
}

export default function FloatingProgressTracker({ 
  chunks, 
  currentChunk, 
  chapterTitle = "Chapter Progress" 
}: FloatingProgressTrackerProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const completedCount = chunks.filter(chunk => chunk.completed).length
  const progressPercentage = (completedCount / chunks.length) * 100

  return (
    <>
      {/* Floating Progress Button */}
      <button
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105 z-40 group"
        aria-label="View Progress"
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-sm font-medium hidden group-hover:block whitespace-nowrap">
            {completedCount}/{chunks.length}
          </span>
        </div>
        
        {/* Mini Progress Ring */}
        <div className="absolute inset-0 -m-1">
          <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 56 56">
            <circle
              cx="28"
              cy="28"
              r="26"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx="28"
              cy="28"
              r="26"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="2"
              fill="none"
              strokeDasharray={`${progressPercentage * 1.63} 163.4`}
              className="transition-all duration-500"
            />
          </svg>
        </div>
      </button>

      {/* Floating Progress Overlay */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-in slide-in-from-bottom-4 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">{chapterTitle}</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Progress Overview */}
            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-600">Overall Progress</span>
                  <span className="text-sm font-bold text-gray-800">{completedCount}/{chunks.length} completed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                    style={{ width: `${progressPercentage}%` }}
                  >
                    <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-500 mt-1">
                  {Math.round(progressPercentage)}%
                </div>
              </div>

              {/* Chunk List */}
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {chunks.map((chunk, index) => (
                  <div
                    key={chunk.id}
                    className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                      index === currentChunk
                        ? 'bg-blue-50 border-2 border-blue-200 shadow-sm'
                        : chunk.completed
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      chunk.completed
                        ? 'bg-green-500 text-white shadow-sm'
                        : index === currentChunk
                        ? 'bg-blue-500 text-white shadow-sm animate-pulse'
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {chunk.completed ? '✓' : index + 1}
                    </div>
                    
                    <div className="flex-1">
                      <span className={`text-sm font-medium block ${
                        index === currentChunk
                          ? 'text-blue-800'
                          : chunk.completed
                          ? 'text-green-800'
                          : 'text-gray-600'
                      }`}>
                        {chunk.title}
                      </span>
                      <span className="text-xs text-gray-500 block mt-1">
                        {chunk.completed 
                          ? 'Completed ✨' 
                          : index === currentChunk 
                          ? 'In Progress...' 
                          : 'Upcoming'
                        }
                      </span>
                    </div>

                    {index === currentChunk && !chunk.completed && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Completion Celebration */}
              {completedCount === chunks.length && (
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl text-center">
                  <div className="text-3xl mb-2">🎉</div>
                  <h4 className="text-lg font-bold text-green-800 mb-1">Chapter Complete!</h4>
                  <p className="text-green-700 text-sm">
                    Outstanding work! You've mastered all the concepts in this chapter.
                  </p>
                </div>
              )}

              {/* Quick Actions */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors"
                >
                  Continue Learning
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}