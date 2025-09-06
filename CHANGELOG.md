# Changelog

All notable changes to the Neural Network Tutorial project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Parameter sliders for interactive examples
- Progress tracking system
- Enhanced error handling and user feedback

## [0.4.0] - 2025-01-06

### Added
- **Chapter 3: The Perceptron** - Complete implementation
  - Comprehensive perceptron learning algorithm with step-by-step visualization
  - Interactive Python code with real-time training progress display
  - Binary classification with linearly separable and XOR datasets
  - Decision boundary visualization showing learning progression
  - Weight evolution tracking throughout training epochs
  - Educational content covering perceptron history, limitations, and real-world applications
  - Learning rule implementation with adjustable learning rate
  - Training accuracy metrics and individual prediction analysis
- Enhanced educational content with historical context and AI Winter explanation
- Real-world analogies (bouncer at club) for better understanding
- Interactive experiments with different datasets and learning rates

### Changed
- Updated project status to reflect Chapter 3 completion (3/6 chapters now complete)
- Enhanced chapter navigation and educational flow
- Improved code examples with comprehensive commenting and explanations

### Technical
- Implemented complete Perceptron class with fit/predict methods
- Added training history tracking for visualization purposes
- Created decision boundary calculation and plotting functionality
- Enhanced matplotlib integration with 4-panel visualization layout

## [0.3.0] - 2025-01-06

### Added
- **Chapter 2: Activation Functions** - Complete implementation
  - ReLU, Sigmoid, and Tanh function explanations and visualizations
  - Interactive Python code with 4-panel matplotlib comparison plots
  - Comprehensive educational content covering when to use each function
  - Mathematical foundations and practical usage guidelines
  - Real-world analogies and decision tables
- Updated ROADMAP.md with detailed implementation status tracking
- Chapter completion percentages and priority indicators
- Comprehensive test suite for Chapter 2 (`test_chapter2.js`)

### Changed
- Enhanced chapter navigation with "Next Steps" sections
- Improved mathematical notation and formula presentation
- Updated project documentation with current implementation status

### Fixed
- JSX syntax error in Chapter 2 component (missing className attribute)

## [0.2.0] - 2025-01-05

### Added
- **Resizable Panel Layout** using `react-resizable-panels`
  - Three-panel drag-to-resize interface (content, code editor, output)
  - Horizontal and vertical panel groups with resize handles
  - Auto-save functionality for panel sizes using localStorage
  - Persistent layout state across browser sessions
- **Fullscreen Image Viewing** for matplotlib plots
  - Click any plot to expand to fullscreen modal
  - ESC key support to close modal
  - Click outside modal to close
  - Improved plot visibility and interaction
- **Enhanced Plot Display**
  - Base64 image conversion for matplotlib plots
  - Custom `show_plot()` function for plot capture
  - "Expand" button for quick fullscreen access
  - Proper plot cleanup to prevent memory leaks

### Changed
- Completely restructured `TutorialLayout.tsx` from fixed grid to resizable panels
- Updated `usePyodide.ts` to capture and return matplotlib plots as images
- Modified all components to handle image arrays in execution results
- Enhanced code editor integration with improved error handling

### Fixed
- **Matplotlib Plot Display Issue** - Plots now render correctly in browser
  - Fixed Agg backend configuration for web display
  - Implemented proper base64 image capture system
  - Added comprehensive plot handling throughout component chain
- **Puppeteer Test Compatibility** - Updated test selectors and async handling
  - Replaced deprecated `page.waitForTimeout()` with Promise-based delays
  - Fixed invalid CSS selectors like `button:has-text("Run")`
  - Improved test reliability and error handling

### Technical
- Added `react-resizable-panels` dependency
- Enhanced TypeScript interfaces for execution results
- Improved error boundaries and user feedback systems

## [0.1.0] - 2024-12-XX

### Added
- **Core Infrastructure Setup**
  - Next.js 15.5.2 project with TypeScript and Tailwind CSS
  - Pyodide integration for Python execution in browser
  - Monaco Editor integration for VS Code-like editing experience
  - Basic routing structure for dynamic chapters (`/chapters/[id]`)
- **Chapter 1: The Neuron** - Complete implementation
  - Comprehensive tutorial content explaining neuron fundamentals
  - Interactive Python code with matplotlib visualizations
  - Weight and bias demonstrations with live plotting
  - Mathematical foundations and real-world analogies
- **Python Environment**
  - Pyodide WebAssembly Python runtime
  - Pre-loaded NumPy and Matplotlib libraries
  - Custom Python execution hook (`usePyodide.ts`)
  - Browser-based code execution with output capture
- **UI Components**
  - Basic tutorial layout with split-screen design
  - Code editor component with syntax highlighting
  - Output display with formatted results
  - Navigation between chapters
- **Development Tools**
  - Basic Puppeteer testing framework
  - Development server configuration
  - Build and deployment setup for Vercel/Netlify

### Project Structure
- Established modular component architecture
- Created hooks for Python integration
- Set up chapter-based content organization
- Implemented dynamic routing system

---

## Release Notes

### Version 0.4.0 Highlights
🧠 **The Perceptron Arrives!** Chapter 3 introduces the first neural network that can actually learn from data! Watch the perceptron train in real-time, see decision boundaries evolve, and understand why this 1957 breakthrough sparked both AI excitement and the first AI Winter. Complete with XOR demonstration showing the perceptron's fundamental limitation.

### Version 0.3.0 Highlights
🎉 **Chapter 2 Complete!** The Neural Network Tutorial now has two fully-functional chapters covering the foundational concepts of neurons and activation functions. Users can interact with ReLU, Sigmoid, and Tanh functions through comprehensive Python examples and visualizations.

### Version 0.2.0 Highlights  
🎨 **Major UI Overhaul!** Introduced resizable panels that let users customize their learning experience. The new layout includes drag-to-resize functionality and fullscreen plot viewing, making it much easier to focus on different aspects of the tutorial.

### Version 0.1.0 Highlights
🚀 **Foundation Laid!** Successfully created a browser-based Python execution environment with Pyodide, enabling real-time code editing and visualization without requiring any server setup.

---

## Development Metrics

| Version | Chapters Complete | Key Features | Lines of Code |
|---------|------------------|--------------|---------------|
| 0.4.0   | 3/6 (50%)       | The Perceptron + Learning Algorithm | ~5,500+ |
| 0.3.0   | 2/6 (33%)       | Activation Functions | ~4,500+ |
| 0.2.0   | 1/6 (17%)       | Resizable Layout + Fullscreen | ~3,000+ |
| 0.1.0   | 1/6 (17%)       | Basic Infrastructure + Chapter 1 | ~2,000+ |

## Contributors

- **Primary Development**: Implementation of chapters, infrastructure, and testing
- **Community**: Issue reports and feature suggestions (coming soon!)

---

*For planned features and development roadmap, see [ROADMAP.md](./ROADMAP.md)*