export default function Chapter1() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Chapter 1: The Neuron</h1>
        <p className="text-xl text-gray-600">
          Understanding the basic building block of neural networks
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">What is a Neuron?</h2>
        <p className="text-gray-700 leading-relaxed">
          A neuron is the fundamental building block of neural networks. Just like biological neurons in our brain, 
          artificial neurons receive inputs, process them, and produce an output. At its simplest, a neuron performs 
          a mathematical transformation on its inputs.
        </p>
        
        <p className="text-gray-700 leading-relaxed">
          The most basic neuron computes a linear transformation: <strong>y = weight × input + bias</strong>
        </p>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Key Components:</h3>
          <ul className="space-y-2 text-blue-700">
            <li><strong>Input (x):</strong> The data fed into the neuron</li>
            <li><strong>Weight (w):</strong> How much the input is amplified or reduced</li>
            <li><strong>Bias (b):</strong> A constant value added to shift the output</li>
            <li><strong>Output (y):</strong> The result of the transformation</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Mathematical Foundation</h2>
        <p className="text-gray-700 leading-relaxed">
          The mathematical equation for a simple neuron is:
        </p>
        
        <div className="bg-gray-100 p-4 rounded-lg font-mono text-center text-lg">
          y = w × x + b
        </div>
        
        <p className="text-gray-700 leading-relaxed">
          Where:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
          <li><code>y</code> is the output</li>
          <li><code>w</code> is the weight (learned parameter)</li>
          <li><code>x</code> is the input</li>
          <li><code>b</code> is the bias (learned parameter)</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Why Weights and Biases Matter</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Weight (Slope)</h3>
            <p className="text-green-700 text-sm">
              Controls how steeply the output changes with input. A larger weight means 
              the neuron is more sensitive to changes in input.
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">Bias (Y-intercept)</h3>
            <p className="text-purple-700 text-sm">
              Shifts the entire function up or down. It determines the output when 
              the input is zero.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Interactive Example</h2>
        <p className="text-gray-700 leading-relaxed">
          In the code editor to the right, you can see a working implementation of a simple neuron. 
          The code demonstrates:
        </p>
        
        <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
          <li>How to define a neuron function</li>
          <li>How to compute the output for a given input</li>
          <li>How to visualize the neuron&apos;s behavior across different inputs</li>
        </ol>
        
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Try This:</h3>
          <ul className="space-y-1 text-yellow-700 text-sm">
            <li>• Change the weight value - see how it affects the line&apos;s slope</li>
            <li>• Modify the bias - notice how it shifts the line up or down</li>
            <li>• Try different input values and observe the outputs</li>
            <li>• Run the code to see the visualization!</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Real-World Analogy</h2>
        <p className="text-gray-700 leading-relaxed">
          Think of a neuron like a simple calculator that your brain uses to make decisions. 
          For example, when deciding whether to wear a jacket:
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 font-mono text-sm">
            decision = weight × temperature + bias
          </p>
          <p className="text-gray-600 text-sm mt-2">
            If temperature is low (cold) and weight is negative, the result might be positive → wear jacket!
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Next Steps</h2>
        <p className="text-gray-700 leading-relaxed">
          Now that you understand the basic neuron, you&apos;re ready to learn about activation functions 
          in Chapter 2. Activation functions add non-linearity to neurons, making them much more 
          powerful for solving complex problems.
        </p>
      </div>
    </div>
  )
}