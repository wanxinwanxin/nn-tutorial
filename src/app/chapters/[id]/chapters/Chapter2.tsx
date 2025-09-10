'use client'

import { useState } from 'react'
import { QuizComponent } from '../../../../components/Interactive'

export default function Chapter2() {
  const [quizProgress, setQuizProgress] = useState([
    { id: 'linearity', completed: false },
    { id: 'functions', completed: false },
    { id: 'selection', completed: false }
  ])

  const handleQuizComplete = (quizId: string, correct: boolean) => {
    if (correct) {
      setQuizProgress(prev =>
        prev.map(quiz =>
          quiz.id === quizId ? { ...quiz, completed: true } : quiz
        )
      )
    }
  }

  const completedQuizzes = quizProgress.filter(q => q.completed).length
  const totalQuizzes = quizProgress.length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Chapter 2: Activation Functions</h1>
        <p className="text-xl text-gray-600">
          Adding non-linearity to neural networks
        </p>
        
        {/* Progress Indicator */}
        <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="text-blue-600">
              🎯 Learning Progress: {completedQuizzes}/{totalQuizzes} concepts mastered
            </div>
            <div className="flex-1 bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedQuizzes / totalQuizzes) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Why Do We Need Activation Functions?</h2>
        <p className="text-gray-700 leading-relaxed">
          In Chapter 1, we learned about neurons that compute <strong>y = w × x + b</strong>. But there&apos;s a problem: 
          this is a linear function! If we stack multiple linear neurons together, we just get another linear function.
        </p>
        
        <p className="text-gray-700 leading-relaxed">
          To solve complex, real-world problems, neural networks need <strong>non-linearity</strong>. 
          This is where activation functions come in - they add curves and bends to our linear transformations.
        </p>

        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <h3 className="text-lg font-semibold text-red-800 mb-2">The Linear Problem:</h3>
          <p className="text-red-700 text-sm">
            Without activation functions, a 10-layer neural network would be mathematically 
            equivalent to a single linear function. No matter how deep, it could only learn 
            straight lines!
          </p>
        </div>

        <QuizComponent
          question="What would happen if you stacked multiple linear neurons (y = w×x + b) without activation functions?"
          options={[
            { id: 'a', text: 'The network would become more powerful and learn complex patterns', isCorrect: false },
            { id: 'b', text: 'Each layer would add new non-linear capabilities to the network', isCorrect: false },
            { id: 'c', text: 'The entire network would still be equivalent to a single linear function', isCorrect: true },
            { id: 'd', text: 'The network would learn exponentially complex relationships', isCorrect: false }
          ]}
          explanation="Correct! Stacking linear functions still gives you a linear function. If f(x) = ax + b and g(x) = cx + d, then g(f(x)) = c(ax + b) + d = acx + (bc + d), which is still linear. This is why we need activation functions to introduce non-linearity."
          onComplete={(correct) => handleQuizComplete('linearity', correct)}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">How Activation Functions Work</h2>
        <p className="text-gray-700 leading-relaxed">
          An activation function is applied to the output of a neuron:
        </p>
        
        <div className="bg-gray-100 p-4 rounded-lg font-mono text-center text-lg">
          output = activation_function(w × x + b)
        </div>
        
        <p className="text-gray-700 leading-relaxed">
          Instead of outputting the raw linear combination, the neuron first passes it through 
          an activation function that can introduce curves, steps, or other non-linear behaviors.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Common Activation Functions</h2>
        
        <div className="grid gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">ReLU (Rectified Linear Unit)</h3>
            <div className="font-mono text-sm mb-2">f(x) = max(0, x)</div>
            <p className="text-blue-700 text-sm">
              <strong>Most popular!</strong> Simple and effective. Outputs the input if positive, zero if negative. 
              Solves the &quot;vanishing gradient&quot; problem and is computationally efficient.
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Sigmoid</h3>
            <div className="font-mono text-sm mb-2">f(x) = 1 / (1 + e^(-x))</div>
            <p className="text-green-700 text-sm">
              <strong>S-shaped curve.</strong> Outputs values between 0 and 1, making it great for binary classification. 
              Historically important but can suffer from vanishing gradients.
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">Tanh (Hyperbolic Tangent)</h3>
            <div className="font-mono text-sm mb-2">f(x) = (e^x - e^(-x)) / (e^x + e^(-x))</div>
            <p className="text-purple-700 text-sm">
              <strong>S-shaped but centered.</strong> Outputs values between -1 and 1. Often works better 
              than sigmoid because it&apos;s zero-centered, making optimization easier.
            </p>
          </div>
        </div>

        <QuizComponent
          question="Which activation function would be BEST for a hidden layer in a deep neural network?"
          options={[
            { id: 'a', text: 'Sigmoid - because it gives probabilities between 0 and 1', isCorrect: false },
            { id: 'b', text: 'ReLU - because it avoids vanishing gradients and is computationally efficient', isCorrect: true },
            { id: 'c', text: 'Tanh - because it always gives the most accurate results', isCorrect: false },
            { id: 'd', text: 'Linear function - because it preserves the original data', isCorrect: false }
          ]}
          explanation="Correct! ReLU is the most popular choice for hidden layers because: (1) it solves the vanishing gradient problem that affects Sigmoid and Tanh in deep networks, (2) it's computationally very fast (just max(0,x)), and (3) it helps networks train faster and often achieve better performance."
          onComplete={(correct) => handleQuizComplete('functions', correct)}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Interactive Visualization</h2>
        <p className="text-gray-700 leading-relaxed">
          The code editor shows implementations of all three activation functions. You can:
        </p>
        
        <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
          <li>See how each function transforms the same input values</li>
          <li>Visualize the characteristic curves of each function</li>
          <li>Compare their behaviors side by side</li>
          <li>Understand when to use each activation function</li>
        </ol>
        
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Try This:</h3>
          <ul className="space-y-1 text-yellow-700 text-sm">
            <li>• Run the code to see all three activation functions plotted</li>
            <li>• Notice how ReLU cuts off negative values at zero</li>
            <li>• Observe the smooth S-curves of Sigmoid and Tanh</li>
            <li>• Try changing the input range to see different parts of the functions</li>
            <li>• Modify the functions to see how small changes affect the curves</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">When to Use Each Function</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Use ReLU for:</h3>
            <ul className="space-y-1 text-blue-700 text-sm">
              <li>• Hidden layers in deep networks</li>
              <li>• When you want fast training</li>
              <li>• Most general-purpose applications</li>
              <li>• Convolutional Neural Networks</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Use Sigmoid for:</h3>
            <ul className="space-y-1 text-green-700 text-sm">
              <li>• Binary classification output</li>
              <li>• When you need probabilities (0-1)</li>
              <li>• Logistic regression</li>
              <li>• Gates in LSTM networks</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">Use Tanh for:</h3>
            <ul className="space-y-1 text-purple-700 text-sm">
              <li>• Hidden layers (better than sigmoid)</li>
              <li>• When you want zero-centered outputs</li>
              <li>• Recurrent Neural Networks</li>
              <li>• When inputs are normalized</li>
            </ul>
          </div>
        </div>

        <QuizComponent
          question="You're building a binary classifier to detect spam emails. For the OUTPUT layer, which activation function should you choose?"
          options={[
            { id: 'a', text: 'ReLU - because it\'s the most popular and fastest', isCorrect: false },
            { id: 'b', text: 'Tanh - because it gives zero-centered outputs', isCorrect: false },
            { id: 'c', text: 'Sigmoid - because it outputs probabilities between 0 and 1', isCorrect: true },
            { id: 'd', text: 'Linear - because we want the raw prediction values', isCorrect: false }
          ]}
          explanation="Perfect! For binary classification, Sigmoid is ideal for the output layer because it squashes any real number to a probability between 0 and 1. You can interpret the output as: >0.5 = spam, <0.5 = not spam. ReLU would be great for hidden layers, but not for probabilistic output."
          onComplete={(correct) => handleQuizComplete('selection', correct)}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Real-World Analogy</h2>
        <p className="text-gray-700 leading-relaxed">
          Think of activation functions like different types of switches or valves:
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <p className="text-gray-700 text-sm">
            <strong>ReLU:</strong> Like a one-way valve - allows flow in one direction only (positive values)
          </p>
          <p className="text-gray-700 text-sm">
            <strong>Sigmoid:</strong> Like a dimmer switch - gradually transitions from off (0) to full power (1)
          </p>
          <p className="text-gray-700 text-sm">
            <strong>Tanh:</strong> Like a balanced scale - can tip either way with smooth transitions (-1 to +1)
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">The Math Behind the Magic</h2>
        <p className="text-gray-700 leading-relaxed">
          Each activation function has different mathematical properties that make it suitable for different tasks:
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-300 p-2 text-left">Function</th>
                <th className="border border-gray-300 p-2 text-left">Range</th>
                <th className="border border-gray-300 p-2 text-left">Derivative</th>
                <th className="border border-gray-300 p-2 text-left">Key Property</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 font-mono">ReLU</td>
                <td className="border border-gray-300 p-2">[0, ∞)</td>
                <td className="border border-gray-300 p-2">0 or 1</td>
                <td className="border border-gray-300 p-2">Fast computation</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2 font-mono">Sigmoid</td>
                <td className="border border-gray-300 p-2">(0, 1)</td>
                <td className="border border-gray-300 p-2">f(x)(1-f(x))</td>
                <td className="border border-gray-300 p-2">Probability output</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-mono">Tanh</td>
                <td className="border border-gray-300 p-2">(-1, 1)</td>
                <td className="border border-gray-300 p-2">1 - f(x)²</td>
                <td className="border border-gray-300 p-2">Zero-centered</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Next Steps</h2>
        <p className="text-gray-700 leading-relaxed">
          Now that you understand how activation functions add non-linearity to neural networks, 
          you&apos;re ready to learn about the perceptron in Chapter 3. We&apos;ll combine neurons with 
          activation functions to create our first learning algorithm!
        </p>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-blue-700 text-sm">
            <strong>Key Takeaway:</strong> Activation functions are what make neural networks &quot;neural&quot; - 
            they allow networks to learn complex patterns by introducing non-linearity into otherwise 
            linear transformations.
          </p>
        </div>
      </div>
    </div>
  )
}