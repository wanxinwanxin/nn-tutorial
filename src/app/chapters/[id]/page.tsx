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
      description: 'Our first learning neural network for binary classification',
      component: Chapter3,
      defaultCode: `# Chapter 3: The Perceptron
# Our first neural network that can learn from data!

import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

class Perceptron:
    """
    A simple perceptron for binary classification
    The first neural network that could learn!
    """
    
    def __init__(self, learning_rate=0.1, max_iterations=1000):
        self.learning_rate = learning_rate
        self.max_iterations = max_iterations
        self.weights = None
        self.bias = None
        self.training_history = []
    
    def step_function(self, x):
        """
        Step activation function:
        - If x >= 0: return 1 (Class A)
        - If x < 0: return 0 (Class B)
        """
        return np.where(x >= 0, 1, 0)
    
    def predict(self, X):
        """Make predictions using current weights"""
        linear_output = np.dot(X, self.weights) + self.bias
        return self.step_function(linear_output)
    
    def fit(self, X, y):
        """
        Train the perceptron using the learning rule:
        If prediction is wrong:
          w = w + learning_rate * (target - prediction) * input
          b = b + learning_rate * (target - prediction)
        """
        # Initialize weights randomly
        n_features = X.shape[1]
        self.weights = np.random.normal(0, 0.1, n_features)
        self.bias = np.random.normal(0, 0.1)
        
        self.training_history = []
        
        print("Training the Perceptron...")
        print(f"Initial weights: [{self.weights[0]:.3f}, {self.weights[1]:.3f}]")
        print(f"Initial bias: {self.bias:.3f}\\n")
        
        for epoch in range(self.max_iterations):
            all_correct = True
            epoch_errors = 0
            
            for i in range(len(X)):
                # Make prediction
                prediction = self.predict(X[i:i+1])[0]
                target = y[i]
                
                # Calculate error
                error = target - prediction
                
                if error != 0:  # Prediction was wrong
                    all_correct = False
                    epoch_errors += 1
                    
                    # Update weights and bias (Perceptron Learning Rule)
                    self.weights += self.learning_rate * error * X[i]
                    self.bias += self.learning_rate * error
                    
                    print(f"Epoch {epoch+1}, Sample {i+1}: Wrong prediction!")
                    print(f"  Target: {target}, Predicted: {prediction}")
                    print(f"  Updated weights: [{self.weights[0]:.3f}, {self.weights[1]:.3f}]")
                    print(f"  Updated bias: {self.bias:.3f}")
            
            # Store training history for visualization
            accuracy = 1 - (epoch_errors / len(X))
            self.training_history.append({
                'epoch': epoch + 1,
                'weights': self.weights.copy(),
                'bias': self.bias,
                'accuracy': accuracy,
                'errors': epoch_errors
            })
            
            # Check if converged
            if all_correct:
                print(f"\\n🎉 Converged after {epoch + 1} epochs!")
                print(f"Final weights: [{self.weights[0]:.3f}, {self.weights[1]:.3f}]")
                print(f"Final bias: {self.bias:.3f}")
                break
        
        if not all_correct:
            print(f"\\n⚠️  Did not converge after {self.max_iterations} epochs.")
            print("This might happen if the data is not linearly separable.")
    
    def decision_boundary(self, x_min, x_max):
        """Calculate decision boundary line for 2D visualization"""
        if self.weights[1] != 0:
            x = np.array([x_min, x_max])
            y = -(self.weights[0] * x + self.bias) / self.weights[1]
            return x, y
        else:
            # Vertical line
            x = np.array([-self.bias/self.weights[0], -self.bias/self.weights[0]])
            y = np.array([x_min, x_max])
            return x, y

# Create a simple 2D binary classification dataset
def create_linearly_separable_data(n_samples=20):
    """Create a dataset that can be separated by a straight line"""
    np.random.seed(42)  # For reproducible results
    
    # Class 0 points (bottom-left cluster)
    class_0_x = np.random.normal(2, 0.8, n_samples//2)
    class_0_y = np.random.normal(2, 0.8, n_samples//2)
    
    # Class 1 points (top-right cluster)  
    class_1_x = np.random.normal(5, 0.8, n_samples//2)
    class_1_y = np.random.normal(5, 0.8, n_samples//2)
    
    # Combine data
    X = np.column_stack([
        np.concatenate([class_0_x, class_1_x]),
        np.concatenate([class_0_y, class_1_y])
    ])
    y = np.concatenate([np.zeros(n_samples//2), np.ones(n_samples//2)])
    
    return X, y

def create_xor_data(n_samples=20):
    """Create XOR dataset - NOT linearly separable!"""
    np.random.seed(42)
    
    # Four clusters forming XOR pattern
    cluster_size = n_samples // 4
    
    # Class 0: bottom-left and top-right
    x0 = np.concatenate([
        np.random.normal(1, 0.3, cluster_size),  # bottom-left
        np.random.normal(4, 0.3, cluster_size)   # top-right
    ])
    y0 = np.concatenate([
        np.random.normal(1, 0.3, cluster_size),  # bottom-left
        np.random.normal(4, 0.3, cluster_size)   # top-right
    ])
    
    # Class 1: top-left and bottom-right
    x1 = np.concatenate([
        np.random.normal(1, 0.3, cluster_size),  # top-left
        np.random.normal(4, 0.3, cluster_size)   # bottom-right
    ])
    y1 = np.concatenate([
        np.random.normal(4, 0.3, cluster_size),  # top-left
        np.random.normal(1, 0.3, cluster_size)   # bottom-right
    ])
    
    X = np.column_stack([
        np.concatenate([x0, x1]),
        np.concatenate([y0, y1])
    ])
    y = np.concatenate([np.zeros(len(x0)), np.ones(len(x1))])
    
    return X, y

# Choose your dataset
print("🤖 Welcome to the Perceptron Tutorial!")
print("Choose your dataset:")
print("1. Linearly Separable (perceptron will learn)")
print("2. XOR Pattern (perceptron will struggle)")

# For this demo, we'll use the linearly separable dataset
# Try changing this to create_xor_data() to see the limitation!
X, y = create_linearly_separable_data(20)

# Visualize the dataset
plt.figure(figsize=(12, 10))

# Plot 1: Initial dataset
plt.subplot(2, 2, 1)
plt.scatter(X[y==0, 0], X[y==0, 1], c='red', marker='o', s=100, alpha=0.7, label='Class 0')
plt.scatter(X[y==1, 0], X[y==1, 1], c='blue', marker='s', s=100, alpha=0.7, label='Class 1')
plt.title('Initial Dataset')
plt.xlabel('Feature 1')
plt.ylabel('Feature 2')
plt.legend()
plt.grid(True, alpha=0.3)

# Create and train perceptron
perceptron = Perceptron(learning_rate=0.1, max_iterations=100)
perceptron.fit(X, y)

# Plot 2: Final decision boundary
plt.subplot(2, 2, 2)
plt.scatter(X[y==0, 0], X[y==0, 1], c='red', marker='o', s=100, alpha=0.7, label='Class 0')
plt.scatter(X[y==1, 0], X[y==1, 1], c='blue', marker='s', s=100, alpha=0.7, label='Class 1')

# Draw decision boundary
x_min, x_max = X[:, 0].min() - 1, X[:, 0].max() + 1
y_min, y_max = X[:, 1].min() - 1, X[:, 1].max() + 1

if perceptron.weights is not None:
    boundary_x, boundary_y = perceptron.decision_boundary(x_min, x_max)
    plt.plot(boundary_x, boundary_y, 'g-', linewidth=3, label='Decision Boundary')

plt.xlim(x_min, x_max)
plt.ylim(y_min, y_max)
plt.title('Final Result with Decision Boundary')
plt.xlabel('Feature 1')
plt.ylabel('Feature 2')
plt.legend()
plt.grid(True, alpha=0.3)

# Plot 3: Training progress
if perceptron.training_history:
    epochs = [h['epoch'] for h in perceptron.training_history]
    accuracies = [h['accuracy'] for h in perceptron.training_history]
    
    plt.subplot(2, 2, 3)
    plt.plot(epochs, accuracies, 'b-', linewidth=2, marker='o')
    plt.title('Learning Progress')
    plt.xlabel('Epoch')
    plt.ylabel('Accuracy')
    plt.grid(True, alpha=0.3)
    plt.ylim(0, 1.1)

# Plot 4: Weight evolution
if perceptron.training_history:
    weight1_history = [h['weights'][0] for h in perceptron.training_history]
    weight2_history = [h['weights'][1] for h in perceptron.training_history]
    
    plt.subplot(2, 2, 4)
    plt.plot(epochs, weight1_history, 'r-', linewidth=2, marker='o', label='Weight 1')
    plt.plot(epochs, weight2_history, 'g-', linewidth=2, marker='s', label='Weight 2')
    plt.title('Weight Evolution During Training')
    plt.xlabel('Epoch')
    plt.ylabel('Weight Value')
    plt.legend()
    plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Test the trained perceptron
print("\\n📊 Testing the trained perceptron:")
predictions = perceptron.predict(X)
accuracy = np.mean(predictions == y)
print(f"Training Accuracy: {accuracy:.2%}")

# Show some individual predictions
print("\\n🔍 Individual Predictions:")
for i in range(min(5, len(X))):
    pred = predictions[i]
    actual = y[i]
    status = "✅ Correct" if pred == actual else "❌ Wrong"
    print(f"Sample {i+1}: [{X[i,0]:.2f}, {X[i,1]:.2f}] → Predicted: {pred}, Actual: {actual} {status}")

print("\\n💡 Try This:")
print("1. Change the learning_rate (try 0.01 or 1.0)")
print("2. Replace create_linearly_separable_data() with create_xor_data()")
print("3. Watch how the perceptron struggles with XOR!")
print("4. Observe the decision boundary - it's always a straight line")

print("\\n🎯 Key Insight:")
print("The perceptron can only learn patterns that are linearly separable.")
print("For complex patterns (like XOR), we need multi-layer networks!")
print("That's what we'll explore in Chapter 4! 🚀")`
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