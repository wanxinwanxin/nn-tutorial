'use client'

import { useState, ReactNode, useEffect } from 'react'
import Link from 'next/link'
import CodeEditor from '@/components/CodeEditor'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

interface TutorialLayoutProps {
  children: ReactNode
  defaultCode?: string
  title?: string
  onCodeExecute?: (result: { result: any; output: string; images?: string[]; error?: string }) => void
}

export default function TutorialLayout({
  children,
  defaultCode = '',
  title,
  onCodeExecute
}: TutorialLayoutProps) {
  const [executionResult, setExecutionResult] = useState<{
    result: any
    output: string
    images?: string[]
    error?: string
  } | null>(null)
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)

  const handleCodeExecute = (result: { result: any; output: string; images?: string[]; error?: string }) => {
    setExecutionResult(result)
    onCodeExecute?.(result)
  }

  // Handle ESC key to close fullscreen modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && fullscreenImage) {
        setFullscreenImage(null)
      }
    }

    if (fullscreenImage) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden' // Prevent background scrolling
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [fullscreenImage])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {title || 'Neural Network Tutorial'}
            </h1>
            <nav className="flex space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                Home
              </Link>
              <Link href="/chapters/1" className="text-gray-600 hover:text-gray-800">
                Chapters
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-200px)]">
        <PanelGroup 
          direction="horizontal" 
          className="h-full"
          autoSaveId="tutorial-layout"
        >
          {/* Tutorial Content Panel */}
          <Panel defaultSize={40} minSize={25} className="h-full">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full overflow-auto">
              <div className="p-6">
                {children}
              </div>
            </div>
          </Panel>

          <PanelResizeHandle className="w-2 bg-gray-200 hover:bg-blue-400 transition-colors" />

          {/* Code Editor + Output Panel Group */}
          <Panel defaultSize={60} minSize={30} className="h-full">
            <PanelGroup direction="vertical" className="h-full">
              {/* Code Editor Panel */}
              <Panel defaultSize={60} minSize={30} className="h-full">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
                  <CodeEditor
                    defaultCode={defaultCode}
                    onExecute={handleCodeExecute}
                    className="h-full"
                  />
                </div>
              </Panel>

              <PanelResizeHandle className="h-2 bg-gray-200 hover:bg-blue-400 transition-colors" />

              {/* Output Panel */}
              <Panel defaultSize={40} minSize={20} className="h-full">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
                    <h3 className="text-sm font-medium text-gray-700">Output</h3>
                    {executionResult && (
                      <button
                        onClick={() => setExecutionResult(null)}
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  
                  <div className="flex-1 p-4 overflow-auto min-h-0">
                    {!executionResult && (
                      <p className="text-gray-500 text-sm">
                        Run code to see output here
                      </p>
                    )}
                    
                    {executionResult?.error && (
                      <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-3">
                        <p className="text-red-800 text-sm font-medium">Error:</p>
                        <pre className="text-red-700 text-sm mt-1 whitespace-pre-wrap">
                          {executionResult.error}
                        </pre>
                      </div>
                    )}
                    
                    {executionResult?.output && (
                      <div className="bg-gray-50 border border-gray-200 rounded-md p-3 mb-3">
                        <p className="text-gray-800 text-sm font-medium">Output:</p>
                        <pre className="text-gray-700 text-sm mt-1 whitespace-pre-wrap font-mono">
                          {executionResult.output}
                        </pre>
                      </div>
                    )}
                    
                    {executionResult?.images && executionResult.images.length > 0 && (
                      <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-green-800 text-sm font-medium">Plots:</p>
                          <button
                            onClick={() => setFullscreenImage(executionResult.images![0])}
                            className="text-xs text-green-600 hover:text-green-800 bg-green-100 px-2 py-1 rounded"
                          >
                            Expand
                          </button>
                        </div>
                        <div className="mt-2 space-y-2">
                          {executionResult.images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Plot ${index + 1}`}
                              className="max-w-full h-auto rounded border cursor-pointer hover:opacity-90"
                              onClick={() => setFullscreenImage(image)}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {executionResult?.result !== null && executionResult?.result !== undefined && (
                      <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                        <p className="text-blue-800 text-sm font-medium">Result:</p>
                        <pre className="text-blue-700 text-sm mt-1 whitespace-pre-wrap font-mono">
                          {String(executionResult.result)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </main>

      {/* Fullscreen Modal for Plots */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <div className="relative max-w-full max-h-full">
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={fullscreenImage}
              alt="Fullscreen plot"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded text-sm">
              Press ESC or click outside to close
            </div>
          </div>
        </div>
      )}
    </div>
  )
}