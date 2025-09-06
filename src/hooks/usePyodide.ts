'use client'

import { useState, useEffect, useRef } from 'react'

export interface PyodideInterface {
  runPython: (code: string) => any
  runPythonAsync: (code: string) => Promise<any>
  loadPackage: (packages: string | string[]) => Promise<void>
  globals: any
}

// Extend window type for Pyodide
declare global {
  interface Window {
    loadPyodide: (config?: any) => Promise<PyodideInterface>
  }
}

export const usePyodide = () => {
  const [pyodide, setPyodide] = useState<PyodideInterface | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const initRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (initRef.current) return
    initRef.current = true

    const loadPyodide = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Load pyodide from CDN using dynamic script loading
        if (!window.loadPyodide) {
          const script = document.createElement('script')
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js'
          document.head.appendChild(script)
          
          // Wait for script to load
          await new Promise<void>((resolve, reject) => {
            script.onload = () => resolve()
            script.onerror = () => reject(new Error('Failed to load Pyodide script'))
          })
        }
        
        const pyodideInstance = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
        })
        
        // Load essential packages
        await pyodideInstance.loadPackage(['numpy', 'matplotlib'])
        
        // Set up matplotlib to work in browser
        pyodideInstance.runPython(`
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
import io
import base64

# Function to capture plots as base64 images
def show_plot():
    """Capture the current plot and return as base64 image"""
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight', dpi=100)
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()
    plt.close()  # Close the figure to prevent memory leaks
    return f"data:image/png;base64,{img_base64}"

# Override plt.show() to use our custom function
plt.show = show_plot
print("Python environment ready!")
        `)
        
        setPyodide(pyodideInstance)
      } catch (err) {
        console.error('Failed to load Pyodide:', err)
        setError(err instanceof Error ? err.message : 'Failed to load Python environment')
      } finally {
        setLoading(false)
      }
    }

    loadPyodide()
  }, [])

  const runCode = async (code: string): Promise<{ result: any; output: string; images?: string[]; error?: string }> => {
    if (!pyodide) {
      throw new Error('Python environment not ready')
    }

    try {
      // Capture stdout and images
      pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
_plot_images = []
      `)

      // Override show_plot to collect images
      pyodide.runPython(`
def show_plot():
    """Capture the current plot and return as base64 image"""
    import io
    import base64
    import matplotlib.pyplot as plt
    
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight', dpi=100)
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()
    img_data = f"data:image/png;base64,{img_base64}"
    _plot_images.append(img_data)
    plt.close()  # Close the figure to prevent memory leaks
    return img_data

# Override plt.show() to use our custom function
import matplotlib.pyplot as plt
plt.show = show_plot
      `)

      // Run user code
      const result = pyodide.runPython(code)
      
      // Get captured output and images
      const output = pyodide.runPython('sys.stdout.getvalue()')
      const images = pyodide.runPython('_plot_images.copy()')
      
      // Reset stdout
      pyodide.runPython('sys.stdout = sys.__stdout__')

      return { result, output, images: images || [] }
    } catch (err) {
      // Reset stdout in case of error
      try {
        pyodide.runPython('sys.stdout = sys.__stdout__')
      } catch {}
      
      return {
        result: null,
        output: '',
        images: [],
        error: err instanceof Error ? err.message : 'Python execution error'
      }
    }
  }

  return {
    pyodide,
    loading,
    error,
    runCode,
    isReady: !loading && !error && !!pyodide
  }
}