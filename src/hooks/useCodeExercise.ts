'use client'

import { useState, useCallback } from 'react'

interface CodeExerciseHook {
  codeFromExercise: string | undefined
  currentCode: string
  onCodeChange: (code: string) => void
  onLoadInEditor: (code: string) => void
  onCheckSolution: () => Promise<any>
}

export function useCodeExercise(initialCode: string = ''): CodeExerciseHook {
  const [codeFromExercise, setCodeFromExercise] = useState<string | undefined>(undefined)
  const [currentCode, setCurrentCode] = useState<string>(initialCode)

  const onCodeChange = useCallback((code: string) => {
    setCurrentCode(code)
  }, [])

  const onLoadInEditor = useCallback((code: string) => {
    setCodeFromExercise(code)
  }, [])

  const onCheckSolution = useCallback(async () => {
    // This will be implemented to actually run the code and check results
    // For now, return a mock result
    return {
      output: "Code executed successfully",
      error: null,
      result: null
    }
  }, [])

  return {
    codeFromExercise,
    currentCode,
    onCodeChange,
    onLoadInEditor,
    onCheckSolution
  }
}