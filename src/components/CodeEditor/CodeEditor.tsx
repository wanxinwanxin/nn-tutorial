'use client'

import { useState, useRef, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import type { editor } from 'monaco-editor'
import { usePyodide } from '@/hooks/usePyodide'

interface CodeEditorProps {
  defaultCode?: string
  onCodeChange?: (code: string) => void
  onExecute?: (result: { result: any; output: string; images?: string[]; error?: string }) => void
  className?: string
}

export default function CodeEditor({
  defaultCode = '',
  onCodeChange,
  onExecute,
  className = ''
}: CodeEditorProps) {
  const [code, setCode] = useState(defaultCode)
  const [isRunning, setIsRunning] = useState(false)
  const { runCode, isReady, loading, error: pyodideError } = usePyodide()
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

  useEffect(() => {
    setCode(defaultCode)
  }, [defaultCode])

  const handleEditorChange = (value: string | undefined) => {
    const newCode = value || ''
    setCode(newCode)
    onCodeChange?.(newCode)
  }

  const handleRunCode = async () => {
    if (!isReady || isRunning) return

    setIsRunning(true)
    try {
      const result = await runCode(code)
      onExecute?.(result)
    } catch (err) {
      onExecute?.({
        result: null,
        output: '',
        images: [],
        error: err instanceof Error ? err.message : 'Execution failed'
      })
    } finally {
      setIsRunning(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      handleRunCode()
    }
  }

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700">Python Code Editor</h3>
        <div className="flex items-center gap-2">
          {loading && (
            <span className="text-sm text-blue-600">Loading Python...</span>
          )}
          {pyodideError && (
            <span className="text-sm text-red-600">Error: {pyodideError}</span>
          )}
          <button
            onClick={handleRunCode}
            disabled={!isReady || isRunning}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              isReady && !isRunning
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isRunning ? 'Running...' : 'Run (Ctrl+Enter)'}
          </button>
        </div>
      </div>
      
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          defaultLanguage="python"
          value={code}
          onChange={handleEditorChange}
          onMount={(editor) => {
            editorRef.current = editor
            // Add keyboard shortcut
            editor.addCommand(
              // Ctrl+Enter or Cmd+Enter
              (window.navigator.platform.includes('Mac') ? 2048 : 2048) | 3, // Monaco.KeyMod.CtrlCmd | Monaco.KeyCode.Enter
              handleRunCode
            )
          }}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            theme: 'vs-light',
            automaticLayout: true,
            tabSize: 4,
            insertSpaces: true,
            wordWrap: 'on',
            folding: true,
            lineDecorationsWidth: 20,
            lineNumbersMinChars: 3
          }}
        />
      </div>
    </div>
  )
}