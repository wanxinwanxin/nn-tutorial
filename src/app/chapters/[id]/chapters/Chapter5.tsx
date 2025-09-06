export default function Chapter5() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Chapter 5: Backpropagation</h1>
        <p className="text-xl text-gray-600">
          Learning through gradient descent - How neural networks actually learn!
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">The Learning Problem</h2>
        <p className="text-gray-700 leading-relaxed">
          In Chapter 4, we built multi-layer networks that could solve complex problems like XOR. 
          But there was one big question left unanswered: <strong>How do we find the right weights and biases?</strong>
        </p>
        
        <p className="text-gray-700 leading-relaxed">
          Until now, we&apos;ve been using random weights. That&apos;s like trying to hit a target blindfolded! 
          <strong>Backpropagation</strong> is the algorithm that teaches neural networks to learn from their mistakes.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">The Big Idea:</h3>
          <p className="text-blue-700 text-sm">
            Backpropagation works backwards through the network, calculating how much each weight 
            contributed to the error, then adjusting weights to reduce that error. It&apos;s like 
            <strong> learning from mistakes</strong> - the foundation of all modern AI!
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">The Chain Rule: Mathematical Foundation</h2>
        <p className="text-gray-700 leading-relaxed">
          Backpropagation is built on the <strong>chain rule</strong> from calculus. Don&apos;t worry if 
          calculus sounds scary - we&apos;ll break it down step by step!
        </p>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Chain Rule in Simple Terms:</h3>
          <p className="text-gray-700 text-sm mb-2">
            If you want to know how changing A affects C, and A affects B which affects C:
          </p>
          <div className="font-mono text-sm bg-white p-2 rounded border">
            <div>Change in C = (Change in C due to B) × (Change in B due to A)</div>
            <div className="mt-1 text-gray-600">∂C/∂A = (∂C/∂B) × (∂B/∂A)</div>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Real-World Analogy:</h3>
          <p className="text-yellow-700 text-sm">
            Imagine you&apos;re a chef trying to improve a recipe. If the dish is too salty, you need to figure out: 
            Did the salt come from the sauce? The seasoning? Each ingredient? Backpropagation does this 
            for neural networks - it traces back through each layer to find what caused the error.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">How Backpropagation Works</h2>
        <p className="text-gray-700 leading-relaxed">
          Backpropagation happens in two main phases, working together like a feedback loop:
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2">1. Forward Pass</h3>
            <p className="text-green-700 text-sm mb-2">
              (We already know this from Chapter 4!)
            </p>
            <ul className="space-y-1 text-green-700 text-sm">
              <li>• Input flows through the network</li>
              <li>• Each layer processes and passes data forward</li>
              <li>• Network produces a prediction</li>
              <li>• Calculate the error (loss)</li>
            </ul>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 className="text-lg font-semibold text-red-800 mb-2">2. Backward Pass</h3>
            <p className="text-red-700 text-sm mb-2">
              (This is the new magic!)
            </p>
            <ul className="space-y-1 text-red-700 text-sm">
              <li>• Start with the error at the output</li>
              <li>• Calculate gradients layer by layer, backwards</li>
              <li>• Find how much each weight contributed to error</li>
              <li>• Update weights to reduce error</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Interactive Code Exploration</h2>
        <p className="text-gray-700 leading-relaxed">
          In the code editor, you&apos;ll implement backpropagation from scratch! You&apos;ll see:
        </p>

        <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
          <li>Complete backpropagation algorithm with step-by-step gradient calculation</li>
          <li>Gradient flow visualization showing how errors propagate backwards</li>
          <li>Weight update visualization during training</li>
          <li>Learning rate experiments and their effects on convergence</li>
          <li>Training a network to solve XOR using backpropagation</li>
          <li>Loss curves showing the network learning over time</li>
        </ul>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-2">🎯 Learning Goals</h3>
          <p className="text-green-700 text-sm">
            By the end of this chapter, you&apos;ll understand how neural networks learn from data, 
            how gradients flow backwards through layers, and how to implement the backpropagation 
            algorithm that powers all modern deep learning!
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Next Steps</h2>
        <p className="text-gray-700 leading-relaxed">
          After mastering backpropagation, we&apos;ll put everything together in Chapter 6 (Training Loop) 
          to build a complete learning system with data loading, training, validation, and all the 
          practical details needed for real-world neural networks!
        </p>
      </div>
    </div>
  )
}