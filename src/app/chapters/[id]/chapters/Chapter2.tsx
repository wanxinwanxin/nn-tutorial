export default function Chapter2() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Chapter 2: Activation Functions</h1>
        <p className="text-xl text-gray-600">
          Adding non-linearity to neural networks
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Why Do We Need Activation Functions?</h2>
        <p className="text-gray-700 leading-relaxed">
          In Chapter 1, we learned about neurons that compute <strong>y = w × x + b</strong>. But there's a problem: 
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
              Solves the "vanishing gradient" problem and is computationally efficient.
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
              than sigmoid because it's zero-centered, making optimization easier.
            </p>
          </div>
        </div>
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
          you're ready to learn about the perceptron in Chapter 3. We'll combine neurons with 
          activation functions to create our first learning algorithm!
        </p>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-blue-700 text-sm">
            <strong>Key Takeaway:</strong> Activation functions are what make neural networks "neural" - 
            they allow networks to learn complex patterns by introducing non-linearity into otherwise 
            linear transformations.
          </p>
        </div>
      </div>
    </div>
  )
}