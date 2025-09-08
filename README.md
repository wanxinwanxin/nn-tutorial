# Neural Network Tutorial

An interactive website that teaches neural network concepts step-by-step with executable Python code examples.

## 🚧 Current Status

**Version 0.7.0** - All 6 chapters complete with revolutionary micro-learning format

- ✅ **Chapter 1: The Neuron** - Enhanced with 4-chunk micro-learning format, interactive exercises and progress tracking
- ✅ **Chapter 2: Activation Functions** - Complete with ReLU, Sigmoid, Tanh examples
- ✅ **Chapter 3: The Perceptron** - Complete with learning algorithm and decision boundaries
- ✅ **Chapter 4: Multi-layer Networks** - Complete with forward propagation and network architecture
- ✅ **Chapter 5: Backpropagation** - Complete with gradient computation and learning visualization
- ✅ **Chapter 6: Training Loop** - Revolutionary chunked learning experience with quizzes, sliders, and exercises

**Live Demo:** Run `npm run dev` and visit `http://localhost:3000`

## ✨ Features

- 🧠 **Progressive Learning**: 6 chapters building from single neurons to complete networks
- 🎯 **Micro-learning Format**: Chapter 1 revolutionized with bite-sized chunks, quizzes, and exercises
- 🐍 **Interactive Python**: Run and modify real Python code in your browser via Pyodide
- 📊 **Live Visualizations**: Matplotlib plots rendered instantly with fullscreen viewing
- 🎛️ **Resizable Layout**: Drag panels to focus on code, content, or output
- 📱 **Fully Responsive**: Tabbed mobile interface with full-screen content utilization
- 🎮 **Interactive Elements**: Quizzes, sliders, code exercises, and progress tracking
- ⚡ **No Server Required**: All code execution happens client-side
- 🖼️ **Image Interactions**: Click plots to expand fullscreen, press ESC to close
- 💾 **Auto-save Layout**: Panel sizes and progress remembered across sessions

## 📚 Chapters

### ✅ Available Now
1. **The Neuron** - Learn the basic building block with weights, biases, and linear transformations
   - Interactive neuron function with live plotting
   - Weight and bias visualization
   - Real-world analogies

2. **Activation Functions** - Add non-linearity to enable complex learning
   - ReLU, Sigmoid, and Tanh implementations
   - Side-by-side function comparisons
   - Usage guidelines for each function type

3. **The Perceptron** - Binary classification with learning algorithm
   - Complete perceptron implementation with training visualization
   - Decision boundary evolution and weight tracking
   - XOR problem demonstration showing perceptron limitations
   - Historical context and AI Winter explanation

4. **Multi-layer Networks** - Forward propagation through layers
   - Complete multi-layer network implementation with adjustable architecture
   - Layer-by-layer computation visualization and detailed logging
   - Network diagram generation and data flow visualization
   - XOR problem solution demonstration with multi-layer approach
   - Interactive architecture comparison (width vs depth)

5. **Backpropagation** - Learn how neural networks actually learn from data
   - Complete backpropagation algorithm with step-by-step gradient calculation
   - Chain rule explanation with real-world analogies
   - Weight update visualization during training
   - XOR problem solution using gradient descent
   - Learning rate experiments and convergence analysis

6. **Training Loop** - Revolutionary interactive learning experience
   - Complete training process with chunked micro-learning format
   - Interactive quizzes, code exercises, and parameter sliders
   - Progress tracking and visual feedback systems
   - Advanced educational UX with modern design patterns

## 🛠️ Technology Stack

- **Frontend**: Next.js 15.5.2 with TypeScript and Tailwind CSS
- **Code Execution**: Pyodide (Python 3.11 in browser via WebAssembly)
- **Code Editor**: Monaco Editor (VS Code in browser)
- **Visualizations**: Matplotlib (converted to base64 images) + Plotly.js
- **Layout**: react-resizable-panels for drag-to-resize functionality
- **Python Libraries**: NumPy, Matplotlib pre-loaded
- **Deployment**: Vercel/Netlify ready with static generation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/wanxinwanxin/nn-tutorial.git
cd nn-tutorial

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

> **Note**: First load may take 10-15 seconds as Pyodide downloads Python runtime

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
src/
├── app/                           # Next.js app router pages
│   ├── chapters/[id]/            # Dynamic chapter pages
│   │   └── chapters/            # Individual chapter components
│   │       ├── Chapter1.tsx    # ✅ The Neuron (complete)
│   │       ├── Chapter2.tsx    # ✅ Activation Functions (complete)
│   │       └── Chapter3-6.tsx  # 🚧 Coming soon
│   ├── globals.css              # Global styles + resizable panel CSS
│   ├── layout.tsx               # Root layout
│   └── page.tsx                # Home page
├── components/                   # Reusable components
│   ├── CodeEditor/             # Monaco editor with Python execution
│   ├── Layout/                # Resizable tutorial layout
│   │   └── TutorialLayout.tsx # Split-pane with drag handles
│   └── Visualization/         # Plotting components (Plotly)
├── hooks/                      # Custom React hooks
│   └── usePyodide.ts          # 🔥 Core: Python execution + matplotlib capture
└── tests/                     # Puppeteer integration tests
    ├── test_chapter2.js       # Automated chapter testing
    └── test_simple_resize.js  # Layout functionality tests
```

### 🔑 Key Files:
- **`usePyodide.ts`** - Handles Python execution and plot capture
- **`TutorialLayout.tsx`** - Implements resizable 3-panel layout
- **`Chapter1.tsx` & `Chapter2.tsx`** - Complete tutorial implementations

## 🗺️ Development Roadmap

**Current Progress:** Phase 2 Complete, Phase 3 Advanced

- ✅ **Phase 1**: Core Infrastructure (100% complete)
- ✅ **Phase 2**: Content Creation (6/6 chapters complete)
- 🔄 **Phase 3**: Interactive Features (85% complete - Chapter 1 micro-learning implemented)
- 🔄 **Phase 4**: Polish & Performance (90% complete - Mobile responsive, UI improvements)
- ⏳ **Phase 5**: Deployment (80% complete - Ready for production)

See [ROADMAP.md](./ROADMAP.md) for detailed implementation plans and progress tracking.

**Next Priority:** Extend micro-learning format to remaining chapters (2-5)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines:
- Follow the existing chapter structure (see Chapter 1 & 2 as examples)
- Test with `npm run dev` and verify Pyodide functionality
- Add tests using the Puppeteer framework in `/tests`
- Update ROADMAP.md with progress
- Follow the established code style (TypeScript + Tailwind)

### Running Tests:
```bash
# Test specific chapter
node test_chapter2.js

# Test layout functionality  
node test_simple_resize.js
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Pyodide](https://pyodide.org/) for Python in the browser
- Uses [Monaco Editor](https://microsoft.github.io/monaco-editor/) for VS Code-like editing
- Layout powered by [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels)
- Powered by [Next.js](https://nextjs.org/) and [React](https://reactjs.org/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Plotting with [Matplotlib](https://matplotlib.org/) and [Plotly.js](https://plotly.com/javascript/)

---

**⭐ Star this repo if you find it helpful!**

For detailed changelog, see [CHANGELOG.md](./CHANGELOG.md)