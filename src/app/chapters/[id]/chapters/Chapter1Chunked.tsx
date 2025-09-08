/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from 'react'
import { QuizComponent, CodeExercise, FloatingProgressTracker, InteractiveSlider } from '../../../../components/Interactive'

interface Chapter1ChunkedProps {
  onLoadInEditor?: (code: string) => void
  currentEditorCode?: string
  onCheckSolution?: () => Promise<any>
}

export default function Chapter1Chunked({ 
  onLoadInEditor,
  currentEditorCode,
  onCheckSolution
}: Chapter1ChunkedProps = {}) {
  const [currentChunk, setCurrentChunk] = useState(0)
  const [chunkProgress, setChunkProgress] = useState([
    { id: 'chunk1', title: 'What is a Neuron?', completed: false },
    { id: 'chunk2', title: 'Mathematical Foundation', completed: false },
    { id: 'chunk3', title: 'Weights & Biases Impact', completed: false },
    { id: 'chunk4', title: 'Real-World Applications', completed: false }
  ])

  const completeChunk = (chunkIndex: number) => {
    setChunkProgress(prev => 
      prev.map((chunk, index) => 
        index === chunkIndex ? { ...chunk, completed: true } : chunk
      )
    )
    if (chunkIndex < chunkProgress.length - 1) {
      setCurrentChunk(chunkIndex + 1)
    }
  }

  const handleExerciseComplete = (correct: boolean) => {
    if (correct) {
      setTimeout(() => {
        completeChunk(currentChunk)
      }, 1500)
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Content - Now Full Width */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Chapter 1: The Neuron</h1>
          <p className="text-xl text-gray-600">
            Understanding the basic building block of neural networks through interactive micro-learning
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">🧠 Interactive Learning Journey</h2>
          <p className="text-blue-700">
            This chapter uses <strong>micro-learning chunks</strong> with exercises between concepts.
            Master each chunk to unlock the next one and track your progress!
          </p>
        </div>

        {/* Chunk Content */}
        {currentChunk === 0 && <Chunk1 onExerciseComplete={handleExerciseComplete} />}
        {currentChunk === 1 && <Chunk2 onExerciseComplete={handleExerciseComplete} />}
        {currentChunk === 2 && <Chunk3 onExerciseComplete={handleExerciseComplete} />}
        {currentChunk === 3 && <Chunk4 onExerciseComplete={handleExerciseComplete} />}
      </div>

      {/* Floating Progress Tracker */}
      <FloatingProgressTracker 
        chunks={chunkProgress} 
        currentChunk={currentChunk} 
        chapterTitle="Chapter 1: The Neuron"
      />
    </div>
  )
}

// Chunk 1: What is a Neuron?
function Chunk1({ onExerciseComplete }: { onExerciseComplete: (correct: boolean) => void }) {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
        <h2 className="text-2xl font-semibold text-blue-800 mb-2">Chunk 1: What is a Neuron?</h2>
        <p className="text-blue-700">
          Let's start with the fundamental building block of all neural networks.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">The Basic Concept</h3>
        <p className="text-gray-700 leading-relaxed">
          A neuron is the fundamental building block of neural networks. Just like biological neurons in our brain, 
          artificial neurons receive inputs, process them, and produce an output.
        </p>
        
        <div className="bg-green-100 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-green-800 mb-2">🧠 Real-World Analogy: Decision Making</h4>
          <p className="text-green-700 text-sm">
            Think of a neuron like your brain deciding whether to wear a jacket. You consider the temperature (input), 
            how much you hate being cold (weight), and your general preference for jackets (bias). 
            Your brain processes this information and decides: jacket or no jacket!
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Key Components of a Neuron</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="text-lg font-semibold text-purple-800 mb-2">🔢 Input (x)</h4>
            <p className="text-purple-700 text-sm">
              The data that gets fed into the neuron. This could be temperature, 
              pixel values in an image, or any other numerical information.
            </p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="text-lg font-semibold text-orange-800 mb-2">⚖️ Weight (w)</h4>
            <p className="text-orange-700 text-sm">
              How much the input matters. A large positive weight means the input 
              strongly influences the output. A negative weight means it inhibits the output.
            </p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="text-lg font-semibold text-yellow-800 mb-2">📊 Bias (b)</h4>
            <p className="text-yellow-700 text-sm">
              The neuron's baseline preference. Even with no input, bias determines 
              the neuron's natural tendency to be active or inactive.
            </p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="text-lg font-semibold text-red-800 mb-2">📤 Output (y)</h4>
            <p className="text-red-700 text-sm">
              The result of the neuron's calculation. This becomes the input 
              to the next neuron or the final prediction of the network.
            </p>
          </div>
        </div>
      </div>

      <QuizComponent
        question="In our jacket decision analogy, what would the 'weight' represent?"
        options={[
          { id: 'a', text: 'The current temperature outside', isCorrect: false },
          { id: 'b', text: 'How much you care about temperature when deciding', isCorrect: true },
          { id: 'c', text: 'Whether you decide to wear the jacket', isCorrect: false },
          { id: 'd', text: 'Your general preference for jackets', isCorrect: false }
        ]}
        explanation="The weight determines how much influence the temperature has on your decision. If you really hate being cold, temperature has a high weight in your decision-making process!"
        onComplete={onExerciseComplete}
      />
    </div>
  )
}

// Chunk 2: Mathematical Foundation
function Chunk2({ onExerciseComplete }: { onExerciseComplete: (correct: boolean) => void }) {
  return (
    <div className="space-y-6">
      <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
        <h2 className="text-2xl font-semibold text-green-800 mb-2">Chunk 2: The Math Behind Neurons</h2>
        <p className="text-green-700">
          Now let's see how neurons actually calculate their outputs using simple math.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">The Neuron Equation</h3>
        <p className="text-gray-700 leading-relaxed">
          Every neuron performs the same basic calculation. It's surprisingly simple:
        </p>
        
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <div className="text-3xl font-mono font-bold text-blue-600 mb-4">
            y = w × x + b
          </div>
          <div className="text-sm text-gray-600">
            Output = Weight × Input + Bias
          </div>
        </div>
        
        <div className="bg-blue-100 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-800 mb-2">🏠 Home Thermostat Example</h4>
          <div className="text-blue-700 text-sm space-y-2">
            <p><strong>Scenario:</strong> A smart thermostat deciding whether to turn on heating</p>
            <p><strong>Input (x):</strong> Room temperature = 65°F</p>
            <p><strong>Weight (w):</strong> -2 (negative because lower temp means more heating needed)</p>
            <p><strong>Bias (b):</strong> 140 (baseline preference for 70°F comfort)</p>
            <p><strong>Calculation:</strong> y = -2 × 65 + 140 = -130 + 140 = 10</p>
            <p><strong>Result:</strong> Positive output = turn on heating!</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Breaking Down Each Part</h3>
        
        <div className="space-y-3">
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
            <div className="font-semibold text-purple-800">y (Output)</div>
            <div className="text-purple-700 text-sm">The final result - what the neuron "thinks" or predicts</div>
          </div>
          
          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
            <div className="font-semibold text-orange-800">w (Weight)</div>
            <div className="text-orange-700 text-sm">Learned parameter - how important the input is (can be positive or negative)</div>
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="font-semibold text-green-800">x (Input)</div>
            <div className="text-green-700 text-sm">The data we feed into the neuron (temperature, pixel value, etc.)</div>
          </div>
          
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <div className="font-semibold text-yellow-800">b (Bias)</div>
            <div className="text-yellow-700 text-sm">Learned parameter - the neuron's baseline preference when input is zero</div>
          </div>
        </div>
      </div>

      <CodeExercise
        title="Calculate the Neuron Output"
        description="Given: input = 3, weight = 2, bias = -1. Calculate the neuron's output:"
        codeTemplate={`def neuron_output(input_val, weight, bias):
    # Calculate: output = weight * input + bias
    output = ________________
    return output

# Test with our values
result = neuron_output(3, 2, -1)
print(f"Neuron output: {result}")`}
        solution="weight * input_val + bias"
        hint="Remember the neuron equation: y = w × x + b, where w is weight, x is input_val, and b is bias"
        onComplete={onExerciseComplete}
      />
    </div>
  )
}

// Chunk 3: Weights & Biases Impact
function Chunk3({ onExerciseComplete }: { onExerciseComplete: (correct: boolean) => void }) {
  const [weight, setWeight] = useState(1.0)
  const [bias, setBias] = useState(0.0)
  const [input, setInput] = useState(2.0)
  
  const output = weight * input + bias
  
  return (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
        <h2 className="text-2xl font-semibold text-purple-800 mb-2">Chunk 3: Understanding Weights & Biases</h2>
        <p className="text-purple-700">
          Let's see how changing weights and biases affects the neuron's behavior.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Interactive Neuron Playground</h3>
        <p className="text-gray-700 leading-relaxed">
          Use the sliders below to see how weights and biases change the neuron's output in real-time!
        </p>
        
        <div className="bg-gray-100 p-6 rounded-lg">
          <div className="text-center mb-4">
            <div className="text-2xl font-mono text-blue-600 mb-2">
              y = {weight.toFixed(1)} × {input.toFixed(1)} + {bias.toFixed(1)}
            </div>
            <div className="text-xl font-bold text-green-600">
              Output = {output.toFixed(2)}
            </div>
          </div>
          
          <div className="space-y-4">
            <InteractiveSlider
              label="Weight (w)"
              min={-3}
              max={3}
              step={0.1}
              defaultValue={1.0}
              description={
                weight > 1.5 ? "High positive weight - input strongly increases output" :
                weight > 0.5 ? "Moderate positive weight - input moderately affects output" :
                weight > -0.5 ? "Small weight - input has little effect" :
                weight > -1.5 ? "Moderate negative weight - input decreases output" :
                "High negative weight - input strongly decreases output"
              }
              onChange={setWeight}
              formatValue={(val) => val.toFixed(1)}
            />
            
            <InteractiveSlider
              label="Bias (b)"
              min={-5}
              max={5}
              step={0.1}
              defaultValue={0.0}
              description={
                bias > 2 ? "High positive bias - neuron is naturally active" :
                bias > 0.5 ? "Positive bias - neuron leans toward being active" :
                bias > -0.5 ? "Neutral bias - no baseline preference" :
                bias > -2 ? "Negative bias - neuron leans toward being inactive" :
                "High negative bias - neuron is naturally inactive"
              }
              onChange={setBias}
              formatValue={(val) => val.toFixed(1)}
            />
            
            <InteractiveSlider
              label="Input (x)"
              min={-5}
              max={5}
              step={0.1}
              defaultValue={2.0}
              description={`Current input value: ${input.toFixed(1)}`}
              onChange={setInput}
              formatValue={(val) => val.toFixed(1)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Key Insights</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">🔄 Weight Effects</h4>
            <ul className="space-y-1 text-blue-700 text-sm">
              <li>• Positive weight: Input and output move in same direction</li>
              <li>• Negative weight: Input and output move in opposite directions</li>
              <li>• Larger magnitude: Stronger influence on output</li>
              <li>• Zero weight: Input is completely ignored</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="text-lg font-semibold text-green-800 mb-2">📈 Bias Effects</h4>
            <ul className="space-y-1 text-green-700 text-sm">
              <li>• Positive bias: Shifts output upward</li>
              <li>• Negative bias: Shifts output downward</li>
              <li>• Zero bias: Output depends only on weighted input</li>
              <li>• Bias = output when input is zero</li>
            </ul>
          </div>
        </div>
      </div>

      <QuizComponent
        question="You have a neuron with weight = -2 and bias = 6. What happens when the input increases from 1 to 2?"
        options={[
          { id: 'a', text: 'Output increases from 4 to 6', isCorrect: false },
          { id: 'b', text: 'Output decreases from 4 to 2', isCorrect: true },
          { id: 'c', text: 'Output stays the same', isCorrect: false },
          { id: 'd', text: 'Output becomes negative', isCorrect: false }
        ]}
        explanation="With weight = -2 and bias = 6: When input = 1, output = -2×1 + 6 = 4. When input = 2, output = -2×2 + 6 = 2. The negative weight means higher input leads to lower output!"
        onComplete={onExerciseComplete}
      />
    </div>
  )
}

// Chunk 4: Real-World Applications
function Chunk4({ onExerciseComplete }: { onExerciseComplete: (correct: boolean) => void }) {
  return (
    <div className="space-y-6">
      <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
        <h2 className="text-2xl font-semibold text-orange-800 mb-2">Chunk 4: Neurons in the Real World</h2>
        <p className="text-orange-700">
          See how the simple neuron concept applies to real problems we solve every day.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Real-World Examples</h3>
        
        <div className="space-y-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">🌡️ Smart Thermostat</h4>
            <div className="text-blue-700 text-sm space-y-1">
              <p><strong>Problem:</strong> Decide when to turn on heating/cooling</p>
              <p><strong>Input:</strong> Current room temperature</p>
              <p><strong>Weight:</strong> How much temperature deviation matters</p>
              <p><strong>Bias:</strong> Target comfort temperature preference</p>
              <p><strong>Output:</strong> Heating/cooling intensity</p>
            </div>
          </div>
          
          <div className="bg-green-100 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-green-800 mb-2">📧 Email Spam Filter</h4>
            <div className="text-green-700 text-sm space-y-1">
              <p><strong>Problem:</strong> Identify spam emails</p>
              <p><strong>Input:</strong> Number of suspicious words (FREE, URGENT, etc.)</p>
              <p><strong>Weight:</strong> How much suspicious words indicate spam</p>
              <p><strong>Bias:</strong> General spam likelihood threshold</p>
              <p><strong>Output:</strong> Spam probability score</p>
            </div>
          </div>
          
          <div className="bg-purple-100 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-purple-800 mb-2">🏠 Home Security System</h4>
            <div className="text-purple-700 text-sm space-y-1">
              <p><strong>Problem:</strong> Detect potential break-ins</p>
              <p><strong>Input:</strong> Motion sensor reading (0-10 movement level)</p>
              <p><strong>Weight:</strong> Sensitivity to movement</p>
              <p><strong>Bias:</strong> Background noise threshold</p>
              <p><strong>Output:</strong> Alert trigger level</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Why Single Neurons Have Limitations</h3>
        <p className="text-gray-700 leading-relaxed">
          A single neuron can only solve <strong>linearly separable</strong> problems - basically, 
          problems where you can draw a straight line to separate the answers.
        </p>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <h4 className="text-lg font-semibold text-red-800 mb-2">⚠️ The XOR Problem</h4>
          <p className="text-red-700 text-sm mb-2">
            Single neurons can't solve XOR (exclusive OR) - a problem that requires a curved decision boundary.
            This limitation led to the development of multi-layer neural networks!
          </p>
          <div className="bg-white p-2 rounded font-mono text-xs">
            <div>XOR Truth Table:</div>
            <div>Input A | Input B | Output</div>
            <div>   0   |   0    |   0   </div>
            <div>   0   |   1    |   1   </div>
            <div>   1   |   0    |   1   </div>
            <div>   1   |   1    |   0   </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">🎓 Chapter 1 Complete!</h3>
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
          <p className="text-gray-700 leading-relaxed mb-4">
            Congratulations! You now understand the fundamental building block of all neural networks:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-semibold text-green-800 mb-2">What You've Learned:</div>
              <ul className="space-y-1 text-green-700">
                <li>• What neurons are and how they work</li>
                <li>• The basic neuron equation: y = wx + b</li>
                <li>• How weights and biases affect output</li>
                <li>• Real-world neuron applications</li>
              </ul>
            </div>
            
            <div>
              <div className="font-semibold text-blue-800 mb-2">Coming Next:</div>
              <ul className="space-y-1 text-blue-700">
                <li>• Chapter 2: Activation Functions</li>
                <li>• Why we need non-linear functions</li>
                <li>• ReLU, Sigmoid, and Tanh functions</li>
                <li>• Building more powerful neurons</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <span className="text-lg">🎉</span>
            <span className="ml-2 font-semibold text-gray-800">Ready for Chapter 2: Activation Functions!</span>
          </div>
        </div>
      </div>

      <CodeExercise
        title="Final Challenge: Build a Complete Neuron"
        description="Create a function that implements a complete neuron with input, weight, and bias:"
        codeTemplate={`def complete_neuron(inputs, weights, bias):
    """
    A neuron that can handle multiple inputs
    inputs: list of input values [x1, x2, x3, ...]
    weights: list of weights [w1, w2, w3, ...]
    bias: single bias value
    """
    # Calculate weighted sum of inputs
    weighted_sum = 0
    for i in range(len(inputs)):
        weighted_sum += ________________
    
    # Add bias and return
    output = weighted_sum + bias
    return output

# Test with: inputs=[1, 2], weights=[0.5, -1.5], bias=2
result = complete_neuron([1, 2], [0.5, -1.5], 2)
print(f"Multi-input neuron output: {result}")`}
        solution="inputs[i] * weights[i]"
        hint="For each input, multiply it by its corresponding weight: inputs[i] * weights[i]"
        onComplete={onExerciseComplete}
      />
    </div>
  )
}