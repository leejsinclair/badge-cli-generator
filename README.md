# Badge Generator

[![Build Status](https://github.com/leejsinclair/badge-cli-generator/actions/workflows/ci.yml/badge.svg)](https://github.com/leejsinclair/badge-cli-generator/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/badge-generator.svg)](https://badge.fury.io/js/badge-generator)

A TypeScript-based CLI tool that creates beautiful circular badges with icons and text. Perfect for generating custom badges for projects, achievements, or any visual identification needs.

## ✨ Features

- 🎨 **Beautiful circular badges** with customizable colors
- 🎯 **Rich icon library** powered by Lucide icons
- 📝 **Custom text labels** with automatic sizing
- 🎭 **Interactive CLI** for easy badge creation
- 🖼️ **PNG output** with high-quality rendering
- 🎨 **Predefined color palette** for consistent styling
- 📁 **Organized output** saves badges to `my-badges/` folder

## 🚀 Quick Start

### Option 1: Using Dev Containers (Recommended)

Perfect for a consistent development environment:

```bash
# Prerequisites: VS Code + Dev Containers extension + Docker
git clone https://github.com/leejsinclair/badge-cli-generator.git
cd badge-cli-generator
code .
# Click "Reopen in Container" when prompted
```

### Option 2: Local Development

```bash
# Clone the repository
git clone https://github.com/leejsinclair/badge-cli-generator.git
cd badge-cli-generator

# Install dependencies
npm install

# Build the project
npm run build

# Generate your first badge
npm start generate
```

## 📖 Interactive Example

```bash
$ npm start generate

✔ Enter the badge text: Example
✔ Choose an SVG icon: zap.svg
✔ Choose a color: secondary
✔ Enter the output filename (without extension): example-badge
✔ Enter the badge size (optional): 200

Generating badge...
Badge generated successfully: my-badges/example-badge.png
```

![Example Badge](./resources/example-badge.png 'Example Badge')

## 🎨 Color Palette

Choose from our carefully selected color palette:

| Color     | Hex Code | Preview   |
| --------- | -------- | --------- |
| primary   | #FF6B6B  | 🔴 Red    |
| secondary | #4ECDC4  | 🩵 Teal   |
| accent    | #45B7D1  | 🔵 Blue   |
| success   | #8AC46B  | 🟢 Green  |
| warning   | #FFD66B  | 🟡 Yellow |
| info      | #6B88FF  | 🟣 Purple |
| error     | #FF6B87  | 🔴 Pink   |

## 🎯 Available Icons

The generator includes hundreds of icons from the [Lucide](https://lucide.dev/) icon library. Popular choices include:

- `star.svg` - Perfect for achievements
- `heart.svg` - Great for favorites
- `zap.svg` - Ideal for energy/power themes
- `shield.svg` - Security and protection
- `trophy.svg` - Awards and competitions
- `check.svg` - Completion and success
- And hundreds more!

## 🛠️ Development

### Dev Container (Recommended)

Use the included development container for a consistent environment:

- Node.js 20, all dependencies pre-installed
- VS Code extensions and settings configured
- See [.devcontainer/README.md](.devcontainer/README.md) for details

### Local Development

### Prerequisites

- Node.js 18+ and npm
- Canvas dependencies (automatically handled)

### Setup

```bash
npm install
npm run build
npm test
```

### Dev Container Authentication

If you're using the dev container and encounter git authentication issues:

1. **Authenticate with GitHub CLI** (recommended):

   ```bash
   gh auth login --git-protocol https
   ```

   Choose "Paste an authentication token" and use a [Personal Access Token](https://github.com/settings/tokens) with `repo` scope.

2. **If you see SSH errors**, ensure the remote uses HTTPS:
   ```bash
   git remote set-url origin https://github.com/leejsinclair/badge-cli-generator.git
   ```

The dev container includes all necessary tools (Git, Node.js, GitHub CLI) pre-configured for development.

### Scripts

- `npm run build` - Download icons and compile TypeScript
- `npm start generate` - Run the badge generator
- `npm run dev generate` - Development mode with ts-node
- `npm test` - Run test suite
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier

## 🏗️ Architecture

- **Badge Generator**: Core class handling canvas rendering
- **Components**: Modular rendering system (Background, Icon, TextBox)
- **CLI Interface**: Interactive command-line tool
- **Icon Management**: Automated SVG icon downloading and processing
- **Type Safety**: Full TypeScript implementation with comprehensive types

## 🧪 Testing

Comprehensive test suite covering:

- Color validation and conversion
- Background rendering logic
- Icon processing and scaling
- Text box rendering and positioning

```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contributing Steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Commit using [Conventional Commits](https://conventionalcommits.org/)
5. Push to your fork and submit a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Lucide](https://lucide.dev/) for the beautiful icon library
- [Canvas API](https://github.com/Automattic/node-canvas) for high-quality image rendering
- [Inquirer](https://github.com/SBoudrias/Inquirer.js) for the interactive CLI experience

## 📚 API Documentation

### BadgeGenerator Class

```typescript
import { BadgeGenerator } from './badge-generator'

const generator = new BadgeGenerator()

await generator.createBadge({
  text: 'Achievement',
  color: 'primary',
  icon: 'star.svg',
  output: 'my-achievement.png',
  size: 200, // optional, defaults to 200
})
```

### Configuration Options

```typescript
interface BadgeConfig {
  text: string // Text to display
  color: ColorName // Color from predefined palette
  icon?: string // SVG icon filename (optional)
  output: string // Output filename
  size?: number // Badge size in pixels (optional)
}
```

---

<div align="center">

**[⭐ Star this repo](https://github.com/leejsinclair/badge-cli-generator)** • **[🐛 Report Bug](https://github.com/leejsinclair/badge-cli-generator/issues)** • **[💡 Request Feature](https://github.com/leejsinclair/badge-cli-generator/issues)**

Made with ❤️ by the Badge Generator team

</div>
