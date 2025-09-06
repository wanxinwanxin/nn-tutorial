import Link from 'next/link'

export default function Home() {
  const chapters = [
    { id: 1, title: 'The Neuron', description: 'Basic math operations and neural computation' },
    { id: 2, title: 'Activation Functions', description: 'Non-linearity in neural networks' },
    { id: 3, title: 'The Perceptron', description: 'Simple binary classification' },
    { id: 4, title: 'Multi-layer Networks', description: 'Forward propagation through layers' },
    { id: 5, title: 'Backpropagation', description: 'Learning through gradient descent' },
    { id: 6, title: 'Training Loop', description: 'Putting it all together' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Neural Network Tutorial
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Learn neural networks step by step with interactive Python code examples. 
            Build your understanding from single neurons to complete networks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {chapters.map((chapter) => (
            <Link 
              key={chapter.id} 
              href={`/chapters/${chapter.id}`}
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
            >
              <div className="flex items-center mb-3">
                <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3">
                  {chapter.id}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {chapter.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                {chapter.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              How it works
            </h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div>
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  📚
                </div>
                <strong>Learn concepts</strong><br />
                Understand the theory behind each component
              </div>
              <div>
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  💻
                </div>
                <strong>Run Python code</strong><br />
                Execute and modify real code in your browser
              </div>
              <div>
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  📊
                </div>
                <strong>See results</strong><br />
                Visualize outputs with interactive plots
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}