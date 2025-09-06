'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { TutorialLayout } from '@/components/Layout'

// Import chapter content components
import Chapter1 from './chapters/Chapter1'
import Chapter2 from './chapters/Chapter2'
import Chapter3 from './chapters/Chapter3'
import Chapter4 from './chapters/Chapter4'
import Chapter5 from './chapters/Chapter5'
import Chapter6 from './chapters/Chapter6'

export default function ChapterPage() {
  const params = useParams()
  const chapterId = params.id as string

  const chapters = {
    '1': { 
      title: 'The Neuron', 
      description: 'Basic math operations and neural computation',
      component: Chapter1,
      defaultCode: `# Chapter 1: The Neuron
# Understanding the basic building block of neural networks

import numpy as np
import matplotlib.pyplot as plt

# Define a simple neuron function
def neuron(x, weight, bias):
    """
    A simple linear neuron: y = weight * x + bias
    """
    return weight * x + bias

# Try different weights and biases
x = 5  # input
weight = 2  # how much the input is amplified
bias = 1   # constant added to output

output = neuron(x, weight, bias)
print(f"Input: {x}")
print(f"Weight: {weight}, Bias: {bias}")
print(f"Output: {output}")

# Visualize how the neuron transforms inputs
x_values = np.linspace(-10, 10, 100)
y_values = [neuron(x, weight, bias) for x in x_values]

plt.figure(figsize=(8, 6))
plt.plot(x_values, y_values, 'b-', linewidth=2, label=f'y = {weight}x + {bias}')
plt.scatter([x], [output], color='red', s=100, zorder=5, label=f'Our example: ({x}, {output})')
plt.xlabel('Input (x)')
plt.ylabel('Output (y)')
plt.title('Simple Neuron: Linear Transformation')
plt.grid(True, alpha=0.3)
plt.legend()
plt.show()

print("\\nTry changing the weight and bias values to see how they affect the output!")` 
    },
    '2': { 
      title: 'Activation Functions', 
      description: 'Non-linearity in neural networks',
      component: Chapter2,
      defaultCode: `# Chapter 2: Activation Functions
# Adding non-linearity to neural networks

import numpy as np
import matplotlib.pyplot as plt

# Define the three main activation functions
def relu(x):
    """
    ReLU (Rectified Linear Unit): f(x) = max(0, x)
    Most popular activation function for hidden layers
    """
    return np.maximum(0, x)

def sigmoid(x):
    """
    Sigmoid: f(x) = 1 / (1 + e^(-x))
    Outputs values between 0 and 1, great for probabilities
    """
    return 1 / (1 + np.exp(-x))

def tanh(x):
    """
    Tanh: f(x) = (e^x - e^(-x)) / (e^x + e^(-x))
    Outputs values between -1 and 1, zero-centered
    """
    return np.tanh(x)

# Create input values to visualize the functions
x = np.linspace(-5, 5, 100)

# Apply each activation function
relu_output = relu(x)
sigmoid_output = sigmoid(x)
tanh_output = tanh(x)

# Create the visualization
plt.figure(figsize=(12, 8))

# Plot all three functions
plt.subplot(2, 2, 1)
plt.plot(x, relu_output, 'b-', linewidth=2, label='ReLU')
plt.title('ReLU: max(0, x)')
plt.xlabel('Input')
plt.ylabel('Output')
plt.grid(True, alpha=0.3)
plt.legend()

plt.subplot(2, 2, 2)
plt.plot(x, sigmoid_output, 'r-', linewidth=2, label='Sigmoid')
plt.title('Sigmoid: 1/(1+e^(-x))')
plt.xlabel('Input')
plt.ylabel('Output')
plt.grid(True, alpha=0.3)
plt.legend()

plt.subplot(2, 2, 3)
plt.plot(x, tanh_output, 'g-', linewidth=2, label='Tanh')
plt.title('Tanh: (e^x - e^(-x))/(e^x + e^(-x))')
plt.xlabel('Input')
plt.ylabel('Output')
plt.grid(True, alpha=0.3)
plt.legend()

# Comparison plot
plt.subplot(2, 2, 4)
plt.plot(x, relu_output, 'b-', linewidth=2, label='ReLU')
plt.plot(x, sigmoid_output, 'r-', linewidth=2, label='Sigmoid')
plt.plot(x, tanh_output, 'g-', linewidth=2, label='Tanh')
plt.title('Comparison of Activation Functions')
plt.xlabel('Input')
plt.ylabel('Output')
plt.grid(True, alpha=0.3)
plt.legend()

plt.tight_layout()
plt.show()

# Test the functions with specific values
test_values = [-2, -1, 0, 1, 2]
print("Testing activation functions:")
print("Input\\tReLU\\tSigmoid\\tTanh")
print("-" * 40)
for val in test_values:
    print(f"{val}\\t{relu(val):.3f}\\t{sigmoid(val):.3f}\\t{tanh(val):.3f}")

# Demonstrate the difference between linear and non-linear transformations
print("\\nWhy non-linearity matters:")
print("Without activation functions, multiple layers just create another linear function!")

# Example: neuron with activation function
def neuron_with_activation(x, weight, bias, activation_func):
    """
    A neuron that applies an activation function to the linear combination
    """
    linear_output = weight * x + bias
    return activation_func(linear_output)

# Test a neuron with different activation functions
test_input = 1.5
weight = 2.0
bias = -1.0

print(f"\\nNeuron test with input={test_input}, weight={weight}, bias={bias}:")
print(f"Linear output: {weight * test_input + bias:.3f}")
print(f"With ReLU: {neuron_with_activation(test_input, weight, bias, relu):.3f}")
print(f"With Sigmoid: {neuron_with_activation(test_input, weight, bias, sigmoid):.3f}")
print(f"With Tanh: {neuron_with_activation(test_input, weight, bias, tanh):.3f}")

print("\\nTry changing the input values, weights, or bias to see how each activation function responds!")`
    },
    '3': { 
      title: 'The Perceptron', 
      description: 'Simple binary classification',
      component: Chapter3,
      defaultCode: `# Chapter 3: The Perceptron
print("Perceptron tutorial - coming soon!")`
    },
    '4': { 
      title: 'Multi-layer Networks', 
      description: 'Forward propagation through layers',
      component: Chapter4,
      defaultCode: `# Chapter 4: Multi-layer Networks
print("Multi-layer networks tutorial - coming soon!")`
    },
    '5': { 
      title: 'Backpropagation', 
      description: 'Learning through gradient descent',
      component: Chapter5,
      defaultCode: `# Chapter 5: Backpropagation
print("Backpropagation tutorial - coming soon!")`
    },
    '6': { 
      title: 'Training Loop', 
      description: 'Putting it all together',
      component: Chapter6,
      defaultCode: `# Chapter 6: Training Loop
print("Training loop tutorial - coming soon!")`
    },
  }

  const chapter = chapters[chapterId as keyof typeof chapters]

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Chapter not found</h1>
          <Link href="/" className="text-indigo-600 hover:text-indigo-800">
            ← Back to home
          </Link>
        </div>
      </div>
    )
  }

  const ChapterComponent = chapter.component

  return (
    <TutorialLayout 
      title={`Chapter ${chapterId}: ${chapter.title}`}
      defaultCode={chapter.defaultCode}
    >
      <ChapterComponent />
      
      {/* Navigation */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-200">
        <div>
          {parseInt(chapterId) > 1 && (
            <Link 
              href={`/chapters/${parseInt(chapterId) - 1}`}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              ← Previous Chapter
            </Link>
          )}
        </div>
        <div>
          {parseInt(chapterId) < 6 && (
            <Link 
              href={`/chapters/${parseInt(chapterId) + 1}`}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Next Chapter →
            </Link>
          )}
        </div>
      </div>
    </TutorialLayout>
  )
}