'use client'

import { useState } from 'react'
import { QuizComponent } from '../../../../components/Interactive'

export default function Chapter3() {
  const [quizProgress, setQuizProgress] = useState([
    { id: 'concept', completed: false },
    { id: 'learning', completed: false },
    { id: 'algorithm', completed: false }
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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Chapter 3: The Perceptron</h1>
        <p className="text-xl text-gray-600">
          Our first learning neural network for binary classification
        </p>
        
        {/* Progress Indicator */}
        <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center gap-3">
            <div className="text-green-600">
              🎯 Learning Progress: {completedQuizzes}/{totalQuizzes} concepts mastered
            </div>
            <div className="flex-1 bg-green-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedQuizzes / totalQuizzes) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">What is a Perceptron?</h2>
        <p className="text-gray-700 leading-relaxed">
          The perceptron is a historic milestone in artificial intelligence - it&apos;s the <strong>first neural network 
          that could actually learn</strong> from data! Created by Frank Rosenblatt in 1957, the perceptron 
          combines everything we&apos;ve learned so far: neurons, weights, biases, and activation functions.
        </p>
        
        <p className="text-gray-700 leading-relaxed">
          Unlike the static neurons from Chapter 1, the perceptron can <strong>adjust its weights automatically</strong> 
          to solve classification problems. It&apos;s like having a student that learns from its mistakes and gets 
          better over time!
        </p>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">The Big Innovation:</h3>
          <p className="text-blue-700 text-sm">
            The perceptron doesn&apos;t just compute - it <strong>learns</strong>. Show it examples of 
            &quot;this is a cat&quot; and &quot;this is a dog&quot;, and it figures out the pattern to classify new animals!
          </p>
        </div>

        <QuizComponent
          question="What makes the perceptron different from the simple neurons we learned about in Chapter 1?"
          options={[
            { id: 'a', text: 'It uses more complex mathematical equations', isCorrect: false },
            { id: 'b', text: 'It can automatically adjust its weights to learn from data', isCorrect: true },
            { id: 'c', text: 'It processes multiple inputs simultaneously', isCorrect: false },
            { id: 'd', text: 'It always produces more accurate results', isCorrect: false }
          ]}
          explanation="Exactly! The key innovation of the perceptron is learning. While Chapter 1's neurons had fixed weights that we set manually, the perceptron can adjust its own weights based on training examples. This automatic learning from mistakes is what made it the first 'intelligent' neural network."
          onComplete={(correct) => handleQuizComplete('concept', correct)}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Binary Classification Made Simple</h2>
        <p className="text-gray-700 leading-relaxed">
          Binary classification means sorting things into two categories. The perceptron excels at this:
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Real-World Examples</h3>
            <ul className="space-y-1 text-green-700 text-sm">
              <li>• Email: Spam or Not Spam</li>
              <li>• Medical: Healthy or Diseased</li>
              <li>• Finance: Approve or Reject Loan</li>
              <li>• Images: Cat or Dog</li>
              <li>• Students: Pass or Fail</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">How It Decides</h3>
            <p className="text-purple-700 text-sm">
              The perceptron draws an invisible line through your data. Everything on one side is 
              &quot;Class A&quot;, everything on the other side is &quot;Class B&quot;. It learns where to draw this line!
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">The Perceptron Architecture</h2>
        <p className="text-gray-700 leading-relaxed">
          A perceptron is just a neuron with a special activation function and learning rule:
        </p>
        
        <div className="bg-gray-100 p-4 rounded-lg font-mono text-center text-lg">
          output = step_function(w₁×x₁ + w₂×x₂ + ... + bias)
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Inputs (x)</h3>
            <p className="text-yellow-700 text-sm">
              The features of your data. For classifying animals: weight, height, fur length, etc.
            </p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Weights (w)</h3>
            <p className="text-red-700 text-sm">
              How important each feature is. These are what the perceptron learns and adjusts!
            </p>
          </div>
          
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Step Function</h3>
            <p className="text-indigo-700 text-sm">
              If result ≥ 0: output 1 (Class A)<br/>
              If result &lt; 0: output 0 (Class B)
            </p>
          </div>
        </div>

        <QuizComponent
          question="A perceptron is classifying emails as spam (1) or not spam (0). If the calculation w₁×x₁ + w₂×x₂ + bias = -2.5, what will the perceptron output?"
          options={[
            { id: 'a', text: '1 (spam) - because the calculation is negative', isCorrect: false },
            { id: 'b', text: '0 (not spam) - because the result is less than 0', isCorrect: true },
            { id: 'c', text: '-2.5 - the perceptron outputs the raw calculation', isCorrect: false },
            { id: 'd', text: '0.5 - because it applies a sigmoid function', isCorrect: false }
          ]}
          explanation="Perfect! The perceptron uses a step function: if the weighted sum is ≥ 0, output 1; if < 0, output 0. Since -2.5 < 0, the perceptron classifies this email as 0 (not spam). The step function creates a hard decision boundary, unlike sigmoid which gives probabilities."
          onComplete={(correct) => handleQuizComplete('learning', correct)}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">The Learning Algorithm</h2>
        <p className="text-gray-700 leading-relaxed">
          Here&apos;s the magic - how the perceptron learns from its mistakes:
        </p>
        
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">The Perceptron Learning Rule</h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
              <p className="text-gray-700">Make a prediction with current weights</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
              <p className="text-gray-700">Compare prediction to the correct answer</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
              <p className="text-gray-700">If wrong, adjust weights: <code className="bg-gray-200 px-2 py-1 rounded">w = w + η × (target - prediction) × input</code></p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
              <p className="text-gray-700">Repeat until all predictions are correct (or max iterations reached)</p>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-white rounded border">
            <p className="text-sm text-gray-600">
              <strong>η (eta)</strong> is the learning rate - how big steps to take when adjusting weights. 
              Too big = might overshoot, too small = learns very slowly.
            </p>
          </div>
        </div>

        <QuizComponent
          question="A perceptron predicts 1, but the correct answer is 0. The input was x = [2, -1]. What happens to the weights during learning?"
          options={[
            { id: 'a', text: 'Weights increase because the prediction was wrong', isCorrect: false },
            { id: 'b', text: 'Weights decrease according to: w = w + η × (0-1) × [2,-1] = w - η × [2,-1]', isCorrect: true },
            { id: 'c', text: 'Nothing happens because the prediction was close enough', isCorrect: false },
            { id: 'd', text: 'The bias changes but weights stay the same', isCorrect: false }
          ]}
          explanation="Excellent! The perceptron learning rule is: w = w + η × (target - prediction) × input. Here: w = w + η × (0-1) × [2,-1] = w + η × (-1) × [2,-1] = w - η × [2,-1]. So the first weight decreases by η×2, and the second weight increases by η×1 (since -(-1) = +1)."
          onComplete={(correct) => handleQuizComplete('algorithm', correct)}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Interactive Visualization</h2>
        <p className="text-gray-700 leading-relaxed">
          The code editor shows a complete perceptron implementation with real-time training visualization. You can:
        </p>
        
        <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
          <li>Watch the decision boundary evolve as the perceptron learns</li>
          <li>See how weights change after each training example</li>
          <li>Observe the perceptron making predictions and correcting mistakes</li>
          <li>Try different learning rates and see how it affects convergence</li>
          <li>Test with different datasets (linearly separable vs. non-separable)</li>
        </ol>
        
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Try This:</h3>
          <ul className="space-y-1 text-yellow-700 text-sm">
            <li>• Run the code to see the perceptron train on a 2D dataset</li>
            <li>• Watch the red decision line move as it learns</li>
            <li>• Notice how it converges when the data is linearly separable</li>
            <li>• Change the learning rate (eta) and see the difference</li>
            <li>• Try the XOR dataset - see why the perceptron struggles!</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">The Perceptron&apos;s Superpower & Weakness</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2">✅ Superpower: Guaranteed Learning</h3>
            <p className="text-green-700 text-sm">
              If your data is <strong>linearly separable</strong> (can be divided by a straight line), 
              the perceptron <em>will</em> find the solution. It&apos;s mathematically guaranteed!
            </p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 className="text-lg font-semibold text-red-800 mb-2">❌ Weakness: Only Linear Boundaries</h3>
            <p className="text-red-700 text-sm">
              If your data needs a curved boundary or can&apos;t be separated by a line 
              (like the XOR problem), the perceptron will never converge.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Real-World Analogy</h2>
        <p className="text-gray-700 leading-relaxed">
          Think of the perceptron like a bouncer at a club:
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <p className="text-gray-700 text-sm">
            <strong>The Bouncer&apos;s Job:</strong> Look at each person and decide &quot;Let in&quot; or &quot;Keep out&quot;
          </p>
          <p className="text-gray-700 text-sm">
            <strong>The Features:</strong> Age, dress code, behavior, VIP status (these are the inputs)
          </p>
          <p className="text-gray-700 text-sm">
            <strong>The Learning:</strong> When the bouncer makes a mistake (lets in troublemaker or blocks VIP), 
            they adjust their criteria for next time
          </p>
          <p className="text-gray-700 text-sm">
            <strong>The Limitation:</strong> If the &quot;good customer&quot; rules are too complex or contradictory, 
            the simple bouncer strategy won&apos;t work
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Historical Impact</h2>
        <p className="text-gray-700 leading-relaxed">
          The perceptron caused huge excitement in the 1950s-60s because it was the first artificial system 
          that could learn patterns from data. However, its limitations led to the first &quot;AI Winter&quot; 
          when researchers realized it couldn&apos;t solve many real problems.
        </p>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-blue-700 text-sm">
            <strong>The XOR Crisis:</strong> In 1969, Minsky and Papert proved that perceptrons couldn&apos;t 
            solve simple problems like XOR, leading to reduced AI funding for decades. The solution? 
            Multi-layer networks - which we&apos;ll explore in Chapter 4!
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Next Steps</h2>
        <p className="text-gray-700 leading-relaxed">
          The perceptron&apos;s limitation with non-linear problems led to one of the most important 
          breakthroughs in AI: <strong>multi-layer neural networks</strong>. In Chapter 4, we&apos;ll see how 
          stacking perceptrons with hidden layers can solve any pattern recognition problem!
        </p>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-green-700 text-sm">
            <strong>Key Takeaway:</strong> The perceptron introduced the fundamental concept of learning 
            from data through weight adjustment. This simple idea became the foundation for all modern 
            neural networks, including deep learning systems used today.
          </p>
        </div>
      </div>
    </div>
  )
}