/* eslint-disable react/no-unescaped-entities */
'use client'

interface ChunkProgress {
  id: string
  title: string
  completed: boolean
}

interface ProgressTrackerProps {
  chunks: ChunkProgress[]
  currentChunk: number
}

export default function ProgressTracker({ chunks, currentChunk }: ProgressTrackerProps) {
  const completedCount = chunks.filter(chunk => chunk.completed).length
  const progressPercentage = (completedCount / chunks.length) * 100

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 sticky top-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Chapter 6 Progress</h3>
      
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{completedCount}/{chunks.length} completed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Chunk List */}
      <div className="space-y-2">
        {chunks.map((chunk, index) => (
          <div
            key={chunk.id}
            className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
              index === currentChunk
                ? 'bg-blue-50 border border-blue-200'
                : chunk.completed
                ? 'bg-green-50'
                : 'bg-gray-50'
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
              chunk.completed
                ? 'bg-green-500 text-white'
                : index === currentChunk
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-600'
            }`}>
              {chunk.completed ? '✓' : index + 1}
            </div>
            
            <span className={`text-sm ${
              index === currentChunk
                ? 'text-blue-800 font-medium'
                : chunk.completed
                ? 'text-green-800'
                : 'text-gray-600'
            }`}>
              {chunk.title}
            </span>

            {index === currentChunk && (
              <div className="ml-auto">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Completion Message */}
      {completedCount === chunks.length && (
        <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎉</span>
            <span className="text-green-800 font-semibold">Chapter Complete!</span>
          </div>
          <p className="text-green-700 text-sm mt-1">
            Excellent work! You've mastered the complete training loop for neural networks.
          </p>
        </div>
      )}
    </div>
  )
}