/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from 'react'
import { QuizComponent, CodeExercise, ProgressTracker, InteractiveSlider } from '../../../../components/Interactive'

export default function Chapter6() {
  const [currentChunk, setCurrentChunk] = useState(0)
  const [chunkProgress, setChunkProgress] = useState([
    { id: 'chunk1', title: 'Training Loop Basics', completed: false },
    { id: 'chunk2', title: 'Epochs & Batching', completed: false },
    { id: 'chunk3', title: 'Train/Validation Splits', completed: false },
    { id: 'chunk4', title: 'Loss Monitoring', completed: false },
    { id: 'chunk5', title: 'Hyperparameter Tuning', completed: false },
    { id: 'chunk6', title: 'Early Stopping & Evaluation', completed: false }
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
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-3 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Chapter 6: Training Loop</h1>
          <p className="text-xl text-gray-600">
            Master the complete neural network training process through interactive learning chunks
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">🎯 New Interactive Learning Experience!</h2>
          <p className="text-blue-700">
            Chapter 6 uses a new approach: <strong>micro-learning chunks</strong> with exercises between concepts.
            Complete each chunk to unlock the next one and track your progress!
          </p>
        </div>

        {/* Chunk Content */}
        {currentChunk === 0 && <Chunk1 onExerciseComplete={handleExerciseComplete} />}
        {currentChunk === 1 && <Chunk2 onExerciseComplete={handleExerciseComplete} />}
        {currentChunk === 2 && <Chunk3 onExerciseComplete={handleExerciseComplete} />}
        {currentChunk === 3 && <Chunk4 onExerciseComplete={handleExerciseComplete} />}
        {currentChunk === 4 && <Chunk5 onExerciseComplete={handleExerciseComplete} />}
        {currentChunk === 5 && <Chunk6 onExerciseComplete={handleExerciseComplete} />}
      </div>

      {/* Progress Sidebar */}
      <div className="lg:col-span-1">
        <ProgressTracker chunks={chunkProgress} currentChunk={currentChunk} />
      </div>
    </div>
  )
}

// Chunk 1: Training Loop Basics
function Chunk1({ onExerciseComplete }: { onExerciseComplete: (correct: boolean) => void }) {
  return (
    <div className="space-y-6">
      <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
        <h2 className="text-2xl font-semibold text-green-800 mb-2">Chunk 1: Training Loop Fundamentals</h2>
        <p className="text-green-700">
          Let's understand what makes a complete training system work.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">What is a Training Loop?</h3>
        <p className="text-gray-700 leading-relaxed">
          Up until now, we've been manually setting weights and running single predictions. But in real machine learning,
          we need a <strong>training loop</strong> - an automated system that:
        </p>
        
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Feeds training data through the network</li>
          <li>Calculates how wrong the predictions are (loss)</li>
          <li>Uses backpropagation to update weights</li>
          <li>Repeats this process many times</li>
          <li>Monitors progress and knows when to stop</li>
        </ul>

        <div className="bg-blue-100 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-800 mb-2">🍳 Real-World Analogy: Learning to Cook</h4>
          <p className="text-blue-700 text-sm">
            Imagine you&apos;re learning to make the perfect pancake. You don&apos;t get it right on the first try!
            You make one pancake (forward pass), taste it (calculate loss), adjust the recipe 
            (backpropagation), then make another pancake. You repeat this until you&apos;re consistently 
            making great pancakes. That&apos;s exactly how neural networks learn!
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">The Basic Training Loop Structure</h3>
        <p className="text-gray-700 leading-relaxed">
          Every training loop follows the same basic pattern:
        </p>
        
        <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
          <div className="space-y-1">
            <div className="text-green-600"># Basic Training Loop</div>
            <div>for epoch in range(num_epochs):</div>
            <div className="ml-4">for batch in training_data:</div>
            <div className="ml-8">predictions = network.forward(batch)</div>
            <div className="ml-8">loss = calculate_loss(predictions, targets)</div>
            <div className="ml-8">gradients = network.backward(loss)</div>
            <div className="ml-8">network.update_weights(gradients)</div>
          </div>
        </div>
      </div>

      <QuizComponent
        question="In a training loop, what happens immediately AFTER we calculate the loss?"
        options={[
          { id: 'a', text: 'We make a prediction on new data', isCorrect: false },
          { id: 'b', text: 'We run backpropagation to calculate gradients', isCorrect: true },
          { id: 'c', text: 'We update the learning rate', isCorrect: false },
          { id: 'd', text: 'We save the model to disk', isCorrect: false }
        ]}
        explanation="After calculating loss, we use backpropagation to calculate gradients - this tells us HOW to adjust each weight to reduce the error. Only then can we update the weights!"
        onComplete={onExerciseComplete}
      />
    </div>
  )
}

// Chunk 2: Epochs and Batching
function Chunk2({ onExerciseComplete }: { onExerciseComplete: (correct: boolean) => void }) {
  return (
    <div className="space-y-6">
      <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
        <h2 className="text-2xl font-semibold text-orange-800 mb-2">Chunk 2: Epochs & Batching Strategy</h2>
        <p className="text-orange-700">
          Learn why we process data in batches and repeat training multiple times.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">What is an Epoch?</h3>
        <p className="text-gray-700 leading-relaxed">
          An <strong>epoch</strong> is one complete pass through your entire training dataset. 
          If you have 1000 training examples, one epoch means the network has seen all 1000 examples once.
        </p>
        
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-yellow-800 mb-2">📚 Why Multiple Epochs?</h4>
          <p className="text-yellow-700 text-sm">
            Just like studying for an exam, you don&apos;t learn everything after reading the material once! 
            Neural networks need to see the same data multiple times to gradually improve their understanding.
            Each epoch, they get a little bit better at recognizing patterns.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">What is Batch Processing?</h3>
        <p className="text-gray-700 leading-relaxed">
          Instead of processing one example at a time, we group them into <strong>batches</strong>. 
          This is much more efficient and often leads to better learning!
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="text-lg font-semibold text-red-800 mb-2">❌ One at a Time (Slow)</h4>
            <ul className="space-y-1 text-red-700 text-sm">
              <li>• Process example 1 → Update weights</li>
              <li>• Process example 2 → Update weights</li>
              <li>• Process example 3 → Update weights</li>
              <li>• Very slow, noisy updates</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="text-lg font-semibold text-green-800 mb-2">✅ In Batches (Fast)</h4>
            <ul className="space-y-1 text-green-700 text-sm">
              <li>• Process examples 1-32 together</li>
              <li>• Calculate average gradient</li>
              <li>• Update weights once per batch</li>
              <li>• Much faster, stable updates</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Common Batch Sizes</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="space-y-2 text-sm">
            <div><strong>Batch Size 1:</strong> Called "Stochastic Gradient Descent" - very noisy but fast per update</div>
            <div><strong>Batch Size 32-128:</strong> Sweet spot for most problems - good balance of speed and stability</div>
            <div><strong>Batch Size = Full Dataset:</strong> Called "Batch Gradient Descent" - most stable but slowest</div>
          </div>
        </div>
      </div>

      <CodeExercise
        title="Complete the Batching Function"
        description="Fill in the missing code to create batches from training data:"
        codeTemplate={`def create_batches(data, batch_size):
    batches = []
    for i in range(0, len(data), batch_size):
        # Your code here: extract a batch from data
        batch = _______________
        batches.append(batch)
    return batches`}
        solution="data[i:i + batch_size]"
        hint="Use Python slicing to get elements from index i to i + batch_size"
        onComplete={onExerciseComplete}
      />
    </div>
  )
}

function Chunk3({ onExerciseComplete }: { onExerciseComplete: (correct: boolean) => void }) {
  return (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
        <h2 className="text-2xl font-semibold text-purple-800 mb-2">Chunk 3: Train/Validation Splits</h2>
        <p className="text-purple-700">
          Learn to prevent overfitting by properly evaluating your model&apos;s performance.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">The Problem: How Do We Know If Our Model Is Good?</h3>
        <p className="text-gray-700 leading-relaxed">
          Imagine studying for a test by memorizing the exact questions and answers. You'd get 100% on those specific questions, 
          but fail miserably on new questions! Neural networks can do the same thing - they might <strong>overfit</strong> to the training data.
        </p>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <h4 className="text-lg font-semibold text-red-800 mb-2">⚠️ The Overfitting Problem</h4>
          <p className="text-red-700 text-sm">
            A model might achieve 99% accuracy on training data but only 60% on new, unseen data. 
            It memorized the training examples instead of learning the underlying patterns!
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">The Solution: Train/Validation Split</h3>
        <p className="text-gray-700 leading-relaxed">
          We solve this by splitting our data into two parts:
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">📚 Training Set (80%)</h4>
            <ul className="space-y-1 text-blue-700 text-sm">
              <li>• Used to train the model</li>
              <li>• Model sees these examples during learning</li>
              <li>• Updates weights based on this data</li>
              <li>• Like study materials for an exam</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="text-lg font-semibold text-green-800 mb-2">🧪 Validation Set (20%)</h4>
            <ul className="space-y-1 text-green-700 text-sm">
              <li>• Used ONLY to test performance</li>
              <li>• Model never sees these during training</li>
              <li>• Gives unbiased estimate of real performance</li>
              <li>• Like the actual exam questions</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">How to Split Your Data</h3>
        <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
          <div className="space-y-1">
            <div className="text-green-600"># Common data splitting approach</div>
            <div>total_data = 1000 examples</div>
            <div>train_size = 800 examples (80%)</div>
            <div>validation_size = 200 examples (20%)</div>
            <div></div>
            <div className="text-blue-600"># Shuffle data first, then split!</div>
            <div>shuffled_data = shuffle(total_data)</div>
            <div>train_data = shuffled_data[:800]</div>
            <div>val_data = shuffled_data[800:]</div>
          </div>
        </div>
        
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-yellow-800 mb-2">🔀 Why Shuffle First?</h4>
          <p className="text-yellow-700 text-sm">
            If your data is ordered (like all cats first, then all dogs), splitting without shuffling would put 
            all cats in training and all dogs in validation. That&apos;s not representative!
          </p>
        </div>
      </div>

      <QuizComponent
        question="Your model gets 95% accuracy on training data but only 65% on validation data. What's happening?"
        options={[
          { id: 'a', text: 'The model is working perfectly', isCorrect: false },
          { id: 'b', text: 'The model is overfitting to the training data', isCorrect: true },
          { id: 'c', text: 'The validation data is corrupted', isCorrect: false },
          { id: 'd', text: 'The model needs more training epochs', isCorrect: false }
        ]}
        explanation="This is a classic sign of overfitting! The model has memorized the training data instead of learning generalizable patterns. The large gap between training and validation accuracy indicates the model won&apos;t perform well on new, unseen data."
        onComplete={onExerciseComplete}
      />
    </div>
  )
}

function Chunk4({ onExerciseComplete }: { onExerciseComplete: (correct: boolean) => void }) {
  const [learningRate, setLearningRate] = useState(0.1)
  
  return (
    <div className="space-y-6">
      <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
        <h2 className="text-2xl font-semibold text-red-800 mb-2">Chunk 4: Loss Monitoring & Visualization</h2>
        <p className="text-red-700">
          Learn to read training curves like a doctor reads an EKG - they tell you everything about your model&apos;s health!
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">What Are Loss Curves?</h3>
        <p className="text-gray-700 leading-relaxed">
          Loss curves are plots that show how your model&apos;s error decreases over time during training. 
          They're like a pulse monitor for your neural network - they tell you if learning is healthy or if something&apos;s wrong.
        </p>
        
        <div className="bg-blue-100 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-800 mb-2">🩺 Reading the Vital Signs</h4>
          <p className="text-blue-700 text-sm">
            Just like doctors can diagnose problems from heart rate patterns, ML engineers can diagnose 
            training problems from loss curves. A healthy training curve should generally go down smoothly.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Common Loss Curve Patterns</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="text-lg font-semibold text-green-800 mb-2">✅ Healthy Learning</h4>
            <div className="text-green-600 font-mono text-xs mb-2">
              Loss: 0.8 → 0.4 → 0.2 → 0.1 → 0.05
            </div>
            <ul className="space-y-1 text-green-700 text-sm">
              <li>• Loss decreases smoothly</li>
              <li>• Training and validation curves close together</li>
              <li>• Eventually plateaus at low loss</li>
            </ul>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="text-lg font-semibold text-orange-800 mb-2">⚠️ Overfitting</h4>
            <div className="text-orange-600 font-mono text-xs mb-2">
              Train: 0.8 → 0.2 → 0.05 → 0.01<br/>
              Val: 0.8 → 0.4 → 0.6 → 0.8 ↗️
            </div>
            <ul className="space-y-1 text-orange-700 text-sm">
              <li>• Training loss keeps decreasing</li>
              <li>• Validation loss starts increasing</li>
              <li>• Growing gap between the two</li>
            </ul>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="text-lg font-semibold text-red-800 mb-2">❌ Learning Rate Too High</h4>
            <div className="text-red-600 font-mono text-xs mb-2">
              Loss: 0.8 → 1.2 → 0.3 → 2.1 → 0.9
            </div>
            <ul className="space-y-1 text-red-700 text-sm">
              <li>• Loss jumps around wildly</li>
              <li>• No smooth downward trend</li>
              <li>• Model can&apos;t converge</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">😴 Learning Rate Too Low</h4>
            <div className="text-gray-600 font-mono text-xs mb-2">
              Loss: 0.800 → 0.795 → 0.790 → 0.785
            </div>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li>• Loss decreases very slowly</li>
              <li>• Takes forever to train</li>
              <li>• Might plateau too early</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Interactive Learning Rate Experiment</h3>
        <p className="text-gray-700 leading-relaxed">
          Adjust the learning rate below to see how it affects the training curve pattern:
        </p>
        
        <InteractiveSlider
          label="Learning Rate"
          min={0.001}
          max={1.0}
          step={0.001}
          defaultValue={0.1}
          description={
            learningRate < 0.01 ? "Very slow learning - loss decreases gradually" :
            learningRate < 0.1 ? "Good learning rate - smooth convergence" :
            learningRate < 0.5 ? "Fast learning - might oscillate" :
            "Too high - loss will jump around wildly"
          }
          onChange={setLearningRate}
          formatValue={(val) => val.toFixed(3)}
        />
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="text-center font-mono text-sm">
            <div className="text-gray-600 mb-2">Simulated Loss Curve with Learning Rate {learningRate.toFixed(3)}:</div>
            <div className={`${
              learningRate < 0.01 ? 'text-gray-600' :
              learningRate < 0.1 ? 'text-green-600' :
              learningRate < 0.5 ? 'text-orange-600' :
              'text-red-600'
            }`}>
              {learningRate < 0.01 ? 'Epoch 1: 0.800 → Epoch 2: 0.795 → Epoch 3: 0.790...' :
               learningRate < 0.1 ? 'Epoch 1: 0.800 → Epoch 2: 0.400 → Epoch 3: 0.200 → Converged!' :
               learningRate < 0.5 ? 'Epoch 1: 0.800 → Epoch 2: 0.200 → Epoch 3: 0.350 → Epoch 4: 0.150...' :
               'Epoch 1: 0.800 → Epoch 2: 1.200 → Epoch 3: 2.100 → Diverged!'}
            </div>
          </div>
        </div>
      </div>

      <QuizComponent
        question="Look at this training curve: Training loss decreases smoothly to 0.01, but validation loss decreases to 0.3 then starts increasing to 0.6. What should you do?"
        options={[
          { id: 'a', text: 'Continue training - the model needs more epochs', isCorrect: false },
          { id: 'b', text: 'Stop training early - the model is overfitting', isCorrect: true },
          { id: 'c', text: 'Increase the learning rate to train faster', isCorrect: false },
          { id: 'd', text: 'The validation data must be wrong', isCorrect: false }
        ]}
        explanation="This is classic overfitting! When validation loss starts increasing while training loss continues decreasing, your model is memorizing the training data. You should implement early stopping to halt training when validation loss stops improving."
        onComplete={onExerciseComplete}
      />
    </div>
  )
}

function Chunk5({ onExerciseComplete }: { onExerciseComplete: (correct: boolean) => void }) {
  const [batchSize, setBatchSize] = useState(32)
  const [architecture, setArchitecture] = useState(64)
  
  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400">
        <h2 className="text-2xl font-semibold text-indigo-800 mb-2">Chunk 5: Hyperparameter Tuning</h2>
        <p className="text-indigo-700">
          Master the art and science of choosing the right settings for optimal model performance.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">What Are Hyperparameters?</h3>
        <p className="text-gray-700 leading-relaxed">
          Hyperparameters are the settings you choose BEFORE training starts. Unlike weights (which the model learns), 
          hyperparameters are decisions YOU make about how the learning process should work.
        </p>
        
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-yellow-800 mb-2">🎛️ Think of It Like Cooking</h4>
          <p className="text-yellow-700 text-sm">
            The ingredients are your data, the cooking process is training, but YOU decide the oven temperature (learning rate), 
            cooking time (epochs), and batch size. Get these wrong, and even good ingredients won&apos;t make a good meal!
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Key Hyperparameters to Tune</h3>
        
        <div className="space-y-3">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="font-semibold text-blue-800">Learning Rate</div>
            <div className="text-blue-700 text-sm">How big steps to take when updating weights (0.001 - 0.1 typical)</div>
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="font-semibold text-green-800">Batch Size</div>
            <div className="text-green-700 text-sm">How many examples to process together (16, 32, 64, 128 common)</div>
          </div>
          
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="font-semibold text-purple-800">Network Architecture</div>
            <div className="text-purple-700 text-sm">Number of layers and neurons per layer (affects model capacity)</div>
          </div>
          
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="font-semibold text-orange-800">Number of Epochs</div>
            <div className="text-orange-700 text-sm">How many times to go through the entire dataset</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Interactive Hyperparameter Experiment</h3>
        <p className="text-gray-700 leading-relaxed">
          Experiment with different hyperparameters to see their effects:
        </p>
        
        <div className="space-y-4">
          <InteractiveSlider
            label="Batch Size"
            min={1}
            max={128}
            step={1}
            defaultValue={32}
            description={
              batchSize <= 8 ? "Small batch: More updates but noisier gradients" :
              batchSize <= 64 ? "Good batch size: Balanced speed and stability" :
              "Large batch: Fewer updates but more stable gradients"
            }
            onChange={setBatchSize}
          />
          
          <InteractiveSlider
            label="Hidden Layer Size"
            min={8}
            max={256}
            step={8}
            defaultValue={64}
            description={
              architecture <= 32 ? "Small network: Fast training but limited capacity" :
              architecture <= 128 ? "Medium network: Good balance for most problems" :
              "Large network: High capacity but slower and prone to overfitting"
            }
            onChange={setArchitecture}
          />
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="text-center font-mono text-sm">
            <div className="text-gray-600 mb-2">Current Configuration:</div>
            <div className="text-blue-600">
              Batch Size: {batchSize} | Hidden Neurons: {architecture}
            </div>
            <div className="text-gray-600 mt-2">
              Estimated Training Speed: {batchSize >= 64 ? 'Fast' : 'Medium'} | 
              Model Capacity: {architecture >= 128 ? 'High' : architecture >= 64 ? 'Medium' : 'Low'}
            </div>
          </div>
        </div>
      </div>

      <QuizComponent
        question="You're training a model and the validation loss is much higher than training loss after just a few epochs. Your hyperparameters: learning_rate=0.1, batch_size=128, hidden_size=512. What should you try first?"
        options={[
          { id: 'a', text: 'Increase the learning rate to 0.5', isCorrect: false },
          { id: 'b', text: 'Reduce the hidden layer size to prevent overfitting', isCorrect: true },
          { id: 'c', text: 'Increase the batch size to 256', isCorrect: false },
          { id: 'd', text: 'Train for more epochs', isCorrect: false }
        ]}
        explanation="Early overfitting with high validation loss suggests the model is too complex for your data. With 512 hidden neurons, the network might have too much capacity. Reducing the hidden layer size (or adding regularization) would help the model generalize better."
        onComplete={onExerciseComplete}
      />
    </div>
  )
}

function Chunk6({ onExerciseComplete }: { onExerciseComplete: (correct: boolean) => void }) {
  return (
    <div className="space-y-6">
      <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-400">
        <h2 className="text-2xl font-semibold text-pink-800 mb-2">Chunk 6: Early Stopping & Model Evaluation</h2>
        <p className="text-pink-700">
          Master the final pieces: knowing when to stop training and properly evaluating your model&apos;s performance.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Early Stopping: The Art of Knowing When to Quit</h3>
        <p className="text-gray-700 leading-relaxed">
          Early stopping is like knowing when to stop cooking - too little and it&apos;s underdone, too much and it&apos;s burnt! 
          We monitor the validation loss and stop training when it stops improving.
        </p>
        
        <div className="bg-green-100 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-green-800 mb-2">🛑 How Early Stopping Works</h4>
          <div className="space-y-2 text-green-700 text-sm">
            <div><strong>1. Monitor:</strong> Watch validation loss after each epoch</div>
            <div><strong>2. Patience:</strong> Wait a few epochs for improvement (patience = 5 is common)</div>
            <div><strong>3. Stop:</strong> If no improvement for 'patience' epochs, stop training</div>
            <div><strong>4. Restore:</strong> Use the best weights from when validation loss was lowest</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Complete Model Evaluation Strategy</h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">📊 Training Metrics</h4>
            <ul className="space-y-1 text-blue-700 text-sm">
              <li>• Track training loss/accuracy</li>
              <li>• Monitor gradient norms</li>
              <li>• Watch for convergence</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="text-lg font-semibold text-green-800 mb-2">✅ Validation Metrics</h4>
            <ul className="space-y-1 text-green-700 text-sm">
              <li>• Validation loss/accuracy</li>
              <li>• Early stopping criteria</li>
              <li>• Generalization gap</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="text-lg font-semibold text-purple-800 mb-2">🧪 Test Metrics</h4>
            <ul className="space-y-1 text-purple-700 text-sm">
              <li>• Final model performance</li>
              <li>• Only evaluated ONCE</li>
              <li>• Real-world estimate</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">The Complete Training Loop</h3>
        <p className="text-gray-700 leading-relaxed">
          Here's what a production-ready training loop looks like:
        </p>
        
        <div className="bg-gray-900 p-4 rounded-lg text-green-400 font-mono text-sm">
          <div className="space-y-1">
            <div className="text-yellow-400"># Complete Training System</div>
            <div>best_val_loss = float('inf')</div>
            <div>patience_counter = 0</div>
            <div>PATIENCE = 5</div>
            <div></div>
            <div>for epoch in range(MAX_EPOCHS):</div>
            <div className="ml-4">train_loss = train_one_epoch(model, train_data)</div>
            <div className="ml-4">val_loss = validate(model, val_data)</div>
            <div className="ml-4"></div>
            <div className="ml-4 text-blue-400"># Early stopping logic</div>
            <div className="ml-4">if val_loss &lt; best_val_loss:</div>
            <div className="ml-8">best_val_loss = val_loss</div>
            <div className="ml-8">save_checkpoint(model)  # Save best model</div>
            <div className="ml-8">patience_counter = 0</div>
            <div className="ml-4">else:</div>
            <div className="ml-8">patience_counter += 1</div>
            <div className="ml-4"></div>
            <div className="ml-4">if patience_counter {'>='} PATIENCE:</div>
            <div className="ml-8">load_checkpoint(model)  # Restore best</div>
            <div className="ml-8">break  # Stop training</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">🎓 Congratulations!</h3>
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
          <p className="text-gray-700 leading-relaxed mb-4">
            You&apos;ve now learned the complete neural network training pipeline! From basic neurons to production-ready training loops, 
            you understand:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-semibold text-green-800 mb-2">Core Concepts:</div>
              <ul className="space-y-1 text-green-700">
                <li>• Neurons and activation functions</li>
                <li>• Perceptrons and their limitations</li>
                <li>• Multi-layer networks and forward propagation</li>
                <li>• Backpropagation and gradient descent</li>
              </ul>
            </div>
            
            <div>
              <div className="font-semibold text-blue-800 mb-2">Training Systems:</div>
              <ul className="space-y-1 text-blue-700">
                <li>• Complete training loops and epochs</li>
                <li>• Batch processing and data splits</li>
                <li>• Loss monitoring and hyperparameter tuning</li>
                <li>• Early stopping and model evaluation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <CodeExercise
        title="Final Challenge: Complete Early Stopping Implementation"
        description="Implement the missing early stopping logic:"
        codeTemplate={`def train_with_early_stopping(model, train_data, val_data, patience=5):
    best_val_loss = float('inf')
    patience_counter = 0
    best_model = None
    
    for epoch in range(100):  # Max epochs
        train_loss = train_epoch(model, train_data)
        val_loss = validate(model, val_data)
        
        # Your code here: Implement early stopping logic
        if ________________________:
            best_val_loss = val_loss
            best_model = copy.deepcopy(model)
            patience_counter = 0
        else:
            patience_counter += 1
            
        if patience_counter >= patience:
            return best_model  # Return best model
    
    return best_model`}
        solution="val_loss < best_val_loss"
        hint="Compare the current validation loss with the best validation loss seen so far"
        onComplete={onExerciseComplete}
      />
    </div>
  )
}