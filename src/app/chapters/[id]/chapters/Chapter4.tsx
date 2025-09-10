'use client'

import { useState } from 'react'
import { QuizComponent } from '../../../../components/Interactive'

export default function Chapter4() {
  const [quizProgress, setQuizProgress] = useState([
    { id: 'architecture', completed: false }
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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Chapter 4: Multi-layer Networks</h1>
        <p className="text-xl text-gray-600">
          Forward propagation through layers
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Beyond the Single Perceptron</h2>
        <p className="text-gray-700 leading-relaxed">
          In Chapter 3, we discovered the perceptron&apos;s fundamental limitation: it can only solve 
          <strong> linearly separable</strong> problems. Remember the XOR problem? A single perceptron 
          couldn&apos;t learn it because there&apos;s no straight line that can separate the data.
        </p>
        
        <p className="text-gray-700 leading-relaxed">
          The solution? <strong>Multi-layer networks!</strong> By stacking multiple layers of neurons, 
          we can learn complex, non-linear patterns that single perceptrons cannot handle.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">The Big Breakthrough:</h3>
          <p className="text-blue-700 text-sm">
            Multi-layer networks can learn <strong>any</strong> pattern! This is called the 
            &quot;Universal Approximation Theorem&quot; - with enough hidden neurons, a neural network 
            can approximate any continuous function.
          </p>
        </div>

        <QuizComponent
          question="Why can't a single perceptron solve the XOR problem, but a multi-layer network can?"
          options={[
            { id: 'a', text: 'Single perceptrons are too slow for complex problems', isCorrect: false },
            { id: 'b', text: 'XOR requires a non-linear decision boundary that only hidden layers can create', isCorrect: true },
            { id: 'c', text: 'Multi-layer networks have more parameters so they memorize better', isCorrect: false },
            { id: 'd', text: 'Single perceptrons can only handle one input at a time', isCorrect: false }
          ]}
          explanation="Exactly! XOR data cannot be separated by a straight line - it needs a curved or multi-segment boundary. Hidden layers with activation functions create these non-linear transformations, allowing the network to bend and curve the decision boundary to solve non-linearly separable problems."
          onComplete={(correct) => handleQuizComplete('architecture', correct)}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Network Architecture</h2>
        <p className="text-gray-700 leading-relaxed">
          A multi-layer network consists of three types of layers:
        </p>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Input Layer</h3>
            <p className="text-green-700 text-sm">
              Receives the raw data (features). Each neuron represents one input feature.
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">Hidden Layer(s)</h3>
            <p className="text-purple-700 text-sm">
              The &quot;thinking&quot; layers that learn complex patterns. Can have multiple hidden layers!
            </p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h3 className="text-lg font-semibold text-orange-800 mb-2">Output Layer</h3>
            <p className="text-orange-700 text-sm">
              Produces the final prediction. Number of neurons = number of classes/outputs.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Forward Propagation</h2>
        <p className="text-gray-700 leading-relaxed">
          Forward propagation is how data flows through the network from input to output. 
          It&apos;s like an assembly line where each layer processes the data and passes it to the next layer.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">The Process:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li><strong>Input Layer:</strong> Receives raw features (x₁, x₂, x₃, ...)</li>
            <li><strong>Hidden Layer:</strong> Each neuron computes: activation(weights × inputs + bias)</li>
            <li><strong>Output Layer:</strong> Takes hidden layer outputs as inputs and produces final prediction</li>
            <li><strong>Prediction:</strong> The network&apos;s final answer!</li>
          </ol>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Real-World Analogy:</h3>
          <p className="text-yellow-700 text-sm">
            Think of a restaurant kitchen: Raw ingredients (input) → Prep cooks (hidden layer 1) → 
            Main chefs (hidden layer 2) → Plating (output layer) → Final dish (prediction)!
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Layer-by-Layer Computation</h2>
        <p className="text-gray-700 leading-relaxed">
          Each layer performs the same basic computation we learned in previous chapters, 
          but now the output of one layer becomes the input to the next layer.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
          <div className="space-y-2">
            <div><strong>Layer 1 (Hidden):</strong></div>
            <div className="ml-4">h₁ = activation(W₁ × input + b₁)</div>
            <div><strong>Layer 2 (Output):</strong></div>
            <div className="ml-4">output = activation(W₂ × h₁ + b₂)</div>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          Where:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
          <li><code>W₁, W₂</code> are weight matrices for each layer</li>
          <li><code>b₁, b₂</code> are bias vectors for each layer</li>
          <li><code>h₁</code> is the hidden layer output</li>
          <li><code>activation</code> is our activation function (ReLU, Sigmoid, etc.)</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Network Architecture Design</h2>
        <p className="text-gray-700 leading-relaxed">
          One of the exciting aspects of multi-layer networks is that you can adjust the architecture:
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Width (Neurons per Layer)</h3>
            <ul className="space-y-1 text-indigo-700 text-sm">
              <li>• More neurons = more capacity to learn</li>
              <li>• Too many = overfitting risk</li>
              <li>• Too few = underfitting</li>
            </ul>
          </div>
          
          <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
            <h3 className="text-lg font-semibold text-pink-800 mb-2">Depth (Number of Layers)</h3>
            <ul className="space-y-1 text-pink-700 text-sm">
              <li>• More layers = more complex patterns</li>
              <li>• Deeper networks need more data</li>
              <li>• Start simple, add complexity as needed</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Why Multi-layer Networks Work</h2>
        <p className="text-gray-700 leading-relaxed">
          The magic happens because each layer learns different levels of abstraction:
        </p>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Example: Image Recognition</h3>
          <ul className="space-y-1 text-gray-700 text-sm">
            <li><strong>Layer 1:</strong> Detects edges and simple shapes</li>
            <li><strong>Layer 2:</strong> Combines edges into parts (eyes, nose, wheels)</li>
            <li><strong>Layer 3:</strong> Combines parts into objects (face, car)</li>
            <li><strong>Output:</strong> Final classification (person, vehicle)</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Interactive Code Exploration</h2>
        <p className="text-gray-700 leading-relaxed">
          In the code editor, you&apos;ll build a complete multi-layer network from scratch! 
          You can experiment with:
        </p>

        <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
          <li>Different network architectures (number of layers and neurons)</li>
          <li>Various activation functions for each layer</li>
          <li>Forward propagation step-by-step visualization</li>
          <li>Network diagram showing data flow</li>
          <li>Real examples with the XOR problem (finally solvable!)</li>
        </ul>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-2">🎯 Learning Goals</h3>
          <p className="text-green-700 text-sm">
            By the end of this chapter, you&apos;ll understand how to build networks that can solve 
            complex problems like XOR, and you&apos;ll see exactly how data flows through multiple layers 
            to produce intelligent predictions!
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Next Steps</h2>
        <p className="text-gray-700 leading-relaxed">
          After mastering forward propagation, we&apos;ll learn how these networks actually learn 
          in Chapter 5 (Backpropagation) - the algorithm that automatically adjusts all those 
          weights and biases to minimize errors!
        </p>
      </div>
    </div>
  )
}