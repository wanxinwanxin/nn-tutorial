'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { TutorialLayout } from '@/components/Layout'

// Import chapter content components
import Chapter1 from './chapters/Chapter1'
import Chapter1Chunked from './chapters/Chapter1Chunked'
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
      description: 'Interactive micro-learning chunks with exercises',
      component: Chapter1Chunked,
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
# Forward propagation through layers

import numpy as np
import matplotlib.pyplot as plt

class MultiLayerNetwork:
    """
    A multi-layer neural network for forward propagation
    Demonstrates layer-by-layer computation and adjustable architecture
    """
    
    def __init__(self, layer_sizes, activation='relu'):
        """
        Initialize network with specified architecture
        
        Args:
            layer_sizes: List of integers [input_size, hidden1_size, hidden2_size, ..., output_size]
            activation: Activation function ('relu', 'sigmoid', 'tanh')
        """
        self.layer_sizes = layer_sizes
        self.num_layers = len(layer_sizes)
        self.activation_name = activation
        
        # Initialize weights and biases for each layer
        self.weights = []
        self.biases = []
        
        print(f"Initializing {self.num_layers}-layer network: {layer_sizes}")
        print(f"Activation function: {activation.upper()}")
        
        # Initialize parameters for each layer
        for i in range(len(layer_sizes) - 1):
            # Xavier/Glorot initialization for better training
            weight_matrix = np.random.randn(layer_sizes[i], layer_sizes[i+1]) * np.sqrt(2.0 / layer_sizes[i])
            bias_vector = np.zeros((1, layer_sizes[i+1]))
            
            self.weights.append(weight_matrix)
            self.biases.append(bias_vector)
            
            print(f"Layer {i+1}: {layer_sizes[i]} → {layer_sizes[i+1]} (weights: {weight_matrix.shape})")
    
    def relu(self, x):
        """ReLU activation function"""
        return np.maximum(0, x)
    
    def sigmoid(self, x):
        """Sigmoid activation function"""
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))  # Clip to prevent overflow
    
    def tanh(self, x):
        """Tanh activation function"""
        return np.tanh(x)
    
    def get_activation_function(self):
        """Get the activation function based on name"""
        if self.activation_name == 'relu':
            return self.relu
        elif self.activation_name == 'sigmoid':
            return self.sigmoid
        elif self.activation_name == 'tanh':
            return self.tanh
        else:
            raise ValueError(f"Unknown activation function: {self.activation_name}")
    
    def forward_propagation(self, X, verbose=True):
        """
        Perform forward propagation through all layers
        
        Args:
            X: Input data (batch_size, input_features)
            verbose: Print layer-by-layer computation details
            
        Returns:
            output: Final network output
            activations: List of activations for each layer (for visualization)
        """
        if verbose:
            print("\\n" + "="*50)
            print("FORWARD PROPAGATION - LAYER BY LAYER")
            print("="*50)
        
        activation_func = self.get_activation_function()
        activations = [X]  # Store activations for each layer
        current_input = X
        
        if verbose:
            print(f"Input shape: {X.shape}")
            print(f"Input values: {X.flatten()[:5]}..." if X.size > 5 else f"Input values: {X.flatten()}")
        
        # Forward propagation through each layer
        for layer_idx in range(len(self.weights)):
            if verbose:
                print(f"\\n--- Layer {layer_idx + 1} ---")
                print(f"Input shape: {current_input.shape}")
                print(f"Weight matrix shape: {self.weights[layer_idx].shape}")
                print(f"Bias shape: {self.biases[layer_idx].shape}")
            
            # Linear transformation: z = W*x + b
            linear_output = np.dot(current_input, self.weights[layer_idx]) + self.biases[layer_idx]
            
            if verbose:
                print(f"Linear output (before activation): {linear_output.flatten()[:3]}..." if linear_output.size > 3 else f"Linear output: {linear_output.flatten()}")
            
            # Apply activation function (except for output layer in some cases)
            if layer_idx == len(self.weights) - 1:
                # For output layer, you might want different activation
                # For now, we'll apply the same activation
                activated_output = activation_func(linear_output)
            else:
                activated_output = activation_func(linear_output)
            
            if verbose:
                print(f"After {self.activation_name} activation: {activated_output.flatten()[:3]}..." if activated_output.size > 3 else f"After activation: {activated_output.flatten()}")
            
            activations.append(activated_output)
            current_input = activated_output
        
        if verbose:
            print(f"\\nFinal output shape: {current_input.shape}")
            print(f"Final output: {current_input.flatten()}")
        
        return current_input, activations
    
    def visualize_network_architecture(self):
        """Create a visualization of the network architecture"""
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))
        
        # Plot 1: Network Architecture Diagram
        ax1.set_title('Network Architecture', fontsize=14, fontweight='bold')
        
        # Calculate positions for neurons
        max_neurons = max(self.layer_sizes)
        layer_positions = np.linspace(0, len(self.layer_sizes)-1, len(self.layer_sizes))
        
        colors = ['lightblue', 'lightgreen', 'lightcoral', 'lightyellow', 'lightpink']
        
        for layer_idx, layer_size in enumerate(self.layer_sizes):
            # Calculate neuron positions for this layer
            if layer_size == 1:
                neuron_positions = [max_neurons / 2]
            else:
                neuron_positions = np.linspace(0, max_neurons, layer_size)
            
            # Draw neurons
            for neuron_pos in neuron_positions:
                circle = plt.Circle((layer_positions[layer_idx], neuron_pos), 0.15, 
                                  color=colors[layer_idx % len(colors)], 
                                  ec='black', linewidth=1)
                ax1.add_patch(circle)
            
            # Add layer labels
            if layer_idx == 0:
                label = f'Input\\n({layer_size})'
            elif layer_idx == len(self.layer_sizes) - 1:
                label = f'Output\\n({layer_size})'
            else:
                label = f'Hidden {layer_idx}\\n({layer_size})'
            
            ax1.text(layer_positions[layer_idx], -0.8, label, 
                    ha='center', va='center', fontweight='bold')
        
        # Draw connections between layers
        for layer_idx in range(len(self.layer_sizes) - 1):
            current_size = self.layer_sizes[layer_idx]
            next_size = self.layer_sizes[layer_idx + 1]
            
            # Calculate positions
            if current_size == 1:
                current_positions = [max_neurons / 2]
            else:
                current_positions = np.linspace(0, max_neurons, current_size)
                
            if next_size == 1:
                next_positions = [max_neurons / 2]
            else:
                next_positions = np.linspace(0, max_neurons, next_size)
            
            # Draw connections (sample a few to avoid clutter)
            for i, curr_pos in enumerate(current_positions):
                for j, next_pos in enumerate(next_positions):
                    if len(current_positions) * len(next_positions) <= 20:  # Only draw if not too many
                        ax1.plot([layer_positions[layer_idx], layer_positions[layer_idx + 1]], 
                                [curr_pos, next_pos], 'k-', alpha=0.3, linewidth=0.5)
        
        ax1.set_xlim(-0.5, len(self.layer_sizes) - 0.5)
        ax1.set_ylim(-1.5, max_neurons + 0.5)
        ax1.set_aspect('equal')
        ax1.axis('off')
        
        # Plot 2: Layer Information
        ax2.set_title('Layer Details', fontsize=14, fontweight='bold')
        
        layer_info = []
        param_counts = []
        
        for i in range(len(self.layer_sizes)):
            if i == 0:
                layer_info.append(f'Input: {self.layer_sizes[i]} features')
                param_counts.append(0)
            elif i == len(self.layer_sizes) - 1:
                layer_info.append(f'Output: {self.layer_sizes[i]} neurons')
                params = self.layer_sizes[i-1] * self.layer_sizes[i] + self.layer_sizes[i]
                param_counts.append(params)
            else:
                layer_info.append(f'Hidden {i}: {self.layer_sizes[i]} neurons')
                params = self.layer_sizes[i-1] * self.layer_sizes[i] + self.layer_sizes[i]
                param_counts.append(params)
        
        # Create bar chart of parameters per layer
        bars = ax2.bar(range(len(layer_info)), param_counts, 
                      color=['lightblue', 'lightgreen', 'lightcoral', 'lightyellow'][:len(layer_info)])
        
        ax2.set_xlabel('Layer')
        ax2.set_ylabel('Number of Parameters')
        ax2.set_xticks(range(len(layer_info)))
        ax2.set_xticklabels([f'Layer {i}' for i in range(len(layer_info))], rotation=45)
        
        # Add value labels on bars
        for bar, count in zip(bars, param_counts):
            if count > 0:
                ax2.text(bar.get_x() + bar.get_width()/2, bar.get_height() + max(param_counts)*0.01,
                        str(count), ha='center', va='bottom')
        
        total_params = sum(param_counts)
        ax2.text(0.5, 0.95, f'Total Parameters: {total_params}', 
                transform=ax2.transAxes, ha='center', va='top', 
                bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.8))
        
        plt.tight_layout()
        plt.show()

# Example 1: Simple 3-layer network for XOR problem
print("Example 1: Solving XOR with Multi-layer Network")
print("=" * 50)

# Create a network: 2 inputs → 4 hidden → 1 output
network = MultiLayerNetwork([2, 4, 1], activation='relu')

# XOR dataset
X_xor = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
print(f"\\nXOR Input data:\\n{X_xor}")

# Forward propagation
output, activations = network.forward_propagation(X_xor, verbose=True)

print(f"\\nNetwork predictions for XOR:")
for i, (input_val, pred) in enumerate(zip(X_xor, output)):
    print(f"Input: {input_val} → Output: {pred[0]:.4f}")

# Visualize the network
network.visualize_network_architecture()

# Example 2: Experiment with different architectures
print("\\n" + "="*60)
print("Example 2: Comparing Different Network Architectures")
print("="*60)

architectures = [
    [2, 3, 1],      # Small network
    [2, 8, 4, 1],   # Deeper network
    [2, 16, 1],     # Wide network
]

sample_input = np.array([[0.5, 0.8]])

for i, arch in enumerate(architectures):
    print(f"\\n--- Architecture {i+1}: {arch} ---")
    net = MultiLayerNetwork(arch, activation='sigmoid')
    output, _ = net.forward_propagation(sample_input, verbose=False)
    print(f"Output: {output[0][0]:.4f}")

# Example 3: Data flow visualization
print("\\n" + "="*60)
print("Example 3: Visualizing Data Flow Through Layers")
print("="*60)

# Create a network for demonstration
demo_network = MultiLayerNetwork([3, 5, 3, 2], activation='tanh')

# Sample input
demo_input = np.array([[1.0, -0.5, 0.8]])
print(f"Demo input: {demo_input}")

# Forward propagation with detailed output
output, all_activations = demo_network.forward_propagation(demo_input, verbose=True)

# Create data flow visualization
fig, axes = plt.subplots(2, 2, figsize=(12, 8))
fig.suptitle('Data Flow Through Network Layers', fontsize=16, fontweight='bold')

for i, (ax, activation) in enumerate(zip(axes.flat, all_activations)):
    if i < len(all_activations):
        # Plot activation values
        ax.bar(range(len(activation.flatten())), activation.flatten(), 
               color=f'C{i}', alpha=0.7)
        ax.set_title(f'Layer {i} {"(Input)" if i == 0 else "(Hidden)" if i < len(all_activations)-1 else "(Output)"}')
        ax.set_xlabel('Neuron Index')
        ax.set_ylabel('Activation Value')
        ax.grid(True, alpha=0.3)
    else:
        ax.axis('off')

plt.tight_layout()
plt.show()

print("\\n🎯 Key Takeaways:")
print("1. Multi-layer networks can solve non-linear problems like XOR")
print("2. Each layer transforms the data step by step")
print("3. Network architecture (width/depth) affects learning capacity")
print("4. Forward propagation is just matrix multiplication + activation functions!")
`
    },
    '5': { 
      title: 'Backpropagation', 
      description: 'Learning through gradient descent',
      component: Chapter5,
      defaultCode: `# Chapter 5: Backpropagation
# Learning through gradient descent - How neural networks actually learn!

import numpy as np
import matplotlib.pyplot as plt

class BackpropagationNetwork:
    """
    A neural network with backpropagation learning
    Demonstrates gradient computation and weight updates
    """
    
    def __init__(self, layer_sizes, learning_rate=0.1):
        """Initialize network with backpropagation capability"""
        self.layer_sizes = layer_sizes
        self.learning_rate = learning_rate
        self.num_layers = len(layer_sizes)
        
        # Initialize weights and biases
        self.weights = []
        self.biases = []
        
        print(f"Initializing network: {layer_sizes}")
        print(f"Learning rate: {learning_rate}")
        
        # Xavier initialization for better learning
        for i in range(len(layer_sizes) - 1):
            weight_matrix = np.random.randn(layer_sizes[i], layer_sizes[i+1]) * np.sqrt(2.0 / layer_sizes[i])
            bias_vector = np.zeros((1, layer_sizes[i+1]))
            
            self.weights.append(weight_matrix)
            self.biases.append(bias_vector)
            
            print(f"Layer {i+1}: {layer_sizes[i]} → {layer_sizes[i+1]}")
        
        # Store training history for visualization
        self.training_history = []
    
    def sigmoid(self, x):
        """Sigmoid activation function"""
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))
    
    def sigmoid_derivative(self, x):
        """Derivative of sigmoid function (needed for backpropagation)"""
        s = self.sigmoid(x)
        return s * (1 - s)
    
    def forward_propagation(self, X, store_activations=True):
        """Forward pass through the network"""
        activations = [X]  # Store activations for each layer
        z_values = []      # Store pre-activation values (needed for gradients)
        
        current_input = X
        
        for layer_idx in range(len(self.weights)):
            # Linear transformation: z = W*x + b
            z = np.dot(current_input, self.weights[layer_idx]) + self.biases[layer_idx]
            z_values.append(z)
            
            # Apply activation function
            activation = self.sigmoid(z)
            activations.append(activation)
            
            current_input = activation
        
        if store_activations:
            return current_input, activations, z_values
        else:
            return current_input
    
    def compute_loss(self, predictions, targets):
        """Compute Mean Squared Error loss"""
        return np.mean((predictions - targets) ** 2)
    
    def backward_propagation(self, X, y, activations, z_values):
        """
        Backward pass - compute gradients using the chain rule
        This is where the magic happens!
        """
        m = X.shape[0]  # Number of samples
        
        # Initialize gradient storage
        weight_gradients = [np.zeros_like(w) for w in self.weights]
        bias_gradients = [np.zeros_like(b) for b in self.biases]
        
        # Start with output layer error
        # For MSE loss: dL/da = 2(a - y) where a is prediction, y is target
        output_error = 2 * (activations[-1] - y) / m
        
        print("\\n" + "="*50)
        print("BACKPROPAGATION - GRADIENT COMPUTATION")
        print("="*50)
        print(f"Output error: {output_error.flatten()}")
        
        # Work backwards through layers
        current_error = output_error
        
        for layer_idx in reversed(range(len(self.weights))):
            print(f"\\n--- Layer {layer_idx + 1} Gradients ---")
            
            # Current layer's pre-activation values
            z = z_values[layer_idx]
            
            # Gradient of activation function
            activation_gradient = self.sigmoid_derivative(z)
            
            # Error for this layer: dL/dz = dL/da * da/dz
            layer_error = current_error * activation_gradient
            
            print(f"Layer error: {layer_error.flatten()}")
            
            # Gradient for weights: dL/dW = (previous_activation)^T * dL/dz
            previous_activation = activations[layer_idx]
            weight_gradients[layer_idx] = np.dot(previous_activation.T, layer_error)
            
            # Gradient for biases: dL/db = sum(dL/dz) across samples
            bias_gradients[layer_idx] = np.sum(layer_error, axis=0, keepdims=True)
            
            print(f"Weight gradient: {weight_gradients[layer_idx].flatten()}")
            print(f"Bias gradient: {bias_gradients[layer_idx].flatten()}")
            
            # Propagate error to previous layer (if not input layer)
            if layer_idx > 0:
                # dL/da_prev = dL/dz * W^T
                current_error = np.dot(layer_error, self.weights[layer_idx].T)
        
        return weight_gradients, bias_gradients
    
    def update_parameters(self, weight_gradients, bias_gradients):
        """Update weights and biases using computed gradients"""
        print(f"\\n--- Parameter Updates (Learning Rate: {self.learning_rate}) ---")
        
        for layer_idx in range(len(self.weights)):
            # Store old values for comparison
            old_weight = self.weights[layer_idx][0, 0] if self.weights[layer_idx].size > 0 else 0
            old_bias = self.biases[layer_idx][0, 0] if self.biases[layer_idx].size > 0 else 0
            
            # Update rule: new_param = old_param - learning_rate * gradient
            self.weights[layer_idx] -= self.learning_rate * weight_gradients[layer_idx]
            self.biases[layer_idx] -= self.learning_rate * bias_gradients[layer_idx]
            
            # Show the update
            new_weight = self.weights[layer_idx][0, 0] if self.weights[layer_idx].size > 0 else 0
            new_bias = self.biases[layer_idx][0, 0] if self.biases[layer_idx].size > 0 else 0
            
            print(f"Layer {layer_idx + 1}: Weight {old_weight:.4f} → {new_weight:.4f}")
    
    def train_step(self, X, y, verbose=True):
        """Perform one training step (forward + backward + update)"""
        # Forward propagation
        predictions, activations, z_values = self.forward_propagation(X, store_activations=True)
        
        # Compute loss
        loss = self.compute_loss(predictions, y)
        
        if verbose:
            print(f"\\nPredictions: {predictions.flatten()}")
            print(f"Targets: {y.flatten()}")
            print(f"Loss: {loss:.6f}")
        
        # Backward propagation
        weight_gradients, bias_gradients = self.backward_propagation(X, y, activations, z_values)
        
        # Update parameters
        self.update_parameters(weight_gradients, bias_gradients)
        
        return loss
    
    def train(self, X, y, epochs=20, verbose_frequency=5):
        """Train the network for multiple epochs"""
        print(f"\\n🚀 Starting Training for {epochs} epochs")
        print("="*50)
        
        losses = []
        
        for epoch in range(epochs):
            # Perform one training step
            verbose = (epoch % verbose_frequency == 0) or (epoch < 2) or (epoch >= epochs - 2)
            loss = self.train_step(X, y, verbose=verbose)
            
            losses.append(loss)
            
            if verbose:
                print(f"\\n📊 Epoch {epoch + 1}/{epochs} - Loss: {loss:.6f}")
        
        print(f"\\n🎉 Training Complete! Final Loss: {losses[-1]:.6f}")
        return losses

# Example: Learning XOR with Backpropagation
print("🤖 Learning XOR with Backpropagation")
print("=" * 50)

# XOR dataset - the classic non-linear problem
X_xor = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y_xor = np.array([[0], [1], [1], [0]])

print("XOR Dataset:")
for i in range(len(X_xor)):
    print(f"Input: {X_xor[i]} → Target: {y_xor[i][0]}")

# Create network: 2 inputs → 4 hidden → 1 output
network = BackpropagationNetwork([2, 4, 1], learning_rate=1.0)

# Test before training
print("\\n🔍 Before Training:")
predictions_before = network.forward_propagation(X_xor, store_activations=False)
print("Predictions:", predictions_before.flatten())
print("Targets:   ", y_xor.flatten())

# Train the network
losses = network.train(X_xor, y_xor, epochs=20, verbose_frequency=10)

# Test after training
print("\\n🎯 After Training:")
predictions_after = network.forward_propagation(X_xor, store_activations=False)
print("Predictions:", predictions_after.flatten())
print("Targets:   ", y_xor.flatten())

# Visualize training progress
plt.figure(figsize=(12, 8))

# Plot 1: Loss curve
plt.subplot(2, 2, 1)
plt.plot(losses, 'b-', linewidth=2, marker='o')
plt.title('Training Loss Over Time')
plt.xlabel('Epoch')
plt.ylabel('Loss (MSE)')
plt.grid(True, alpha=0.3)
plt.yscale('log')

# Plot 2: Predictions vs Targets
plt.subplot(2, 2, 2)
x_pos = np.arange(len(X_xor))
plt.bar(x_pos - 0.2, y_xor.flatten(), 0.4, label='Target', alpha=0.7, color='green')
plt.bar(x_pos + 0.2, predictions_after.flatten(), 0.4, label='Prediction', alpha=0.7, color='blue')
plt.xlabel('XOR Sample')
plt.ylabel('Output')
plt.title('Final Predictions vs Targets')
plt.xticks(x_pos, ['[0,0]', '[0,1]', '[1,0]', '[1,1]'])
plt.legend()
plt.grid(True, alpha=0.3)

# Plot 3: Learning rate comparison
plt.subplot(2, 2, 3)
learning_rates = [0.1, 0.5, 1.0, 2.0]
final_losses = []

for lr in learning_rates:
    net = BackpropagationNetwork([2, 4, 1], learning_rate=lr)
    losses_lr = net.train(X_xor, y_xor, epochs=20, verbose_frequency=1000)  # Silent training
    final_losses.append(losses_lr[-1])

plt.bar(range(len(learning_rates)), final_losses, color=['red', 'orange', 'green', 'blue'], alpha=0.7)
plt.xlabel('Learning Rate')
plt.ylabel('Final Loss')
plt.title('Learning Rate Effect on Final Loss')
plt.xticks(range(len(learning_rates)), learning_rates)
plt.grid(True, alpha=0.3)

# Plot 4: Network architecture
plt.subplot(2, 2, 4)
layer_sizes = network.layer_sizes
max_neurons = max(layer_sizes)

for layer_idx, layer_size in enumerate(layer_sizes):
    # Calculate neuron positions
    if layer_size == 1:
        positions = [max_neurons / 2]
    else:
        positions = np.linspace(0, max_neurons, layer_size)
    
    # Draw neurons
    for pos in positions:
        circle = plt.Circle((layer_idx, pos), 0.15, color=f'C{layer_idx}', alpha=0.7)
        plt.gca().add_patch(circle)
    
    # Add labels
    if layer_idx == 0:
        label = f'Input\\n({layer_size})'
    elif layer_idx == len(layer_sizes) - 1:
        label = f'Output\\n({layer_size})'
    else:
        label = f'Hidden\\n({layer_size})'
    
    plt.text(layer_idx, -0.5, label, ha='center', va='center', fontweight='bold')

plt.xlim(-0.5, len(layer_sizes) - 0.5)
plt.ylim(-1, max_neurons + 0.5)
plt.title('Network Architecture')
plt.axis('off')

plt.tight_layout()
plt.show()

print("\\n🎯 Key Insights from Backpropagation:")
print("1. The network learns by computing gradients and updating weights")
print("2. Loss decreases over time as the network learns the XOR pattern")
print("3. Different learning rates affect convergence speed and stability")
print("4. Backpropagation enables learning of non-linear patterns!")

print("\\n💡 Try This:")
print("1. Change the learning rate and see how it affects training")
print("2. Modify the network architecture (add more hidden neurons)")
print("3. Try different datasets (AND, OR gates)")
print("4. Observe how gradients flow backwards through the layers")

print("\\n🚀 Next: Chapter 6 will show how to put this all together")
print("   in a complete training loop with batches, validation, and more!")`
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