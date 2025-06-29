# Development Container

This project includes a VS Code development container configuration that provides a consistent development environment with all necessary tools and dependencies.

## 🚀 Quick Start with Dev Containers

### Prerequisites
- [VS Code](https://code.visualstudio.com/)
- [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- [Docker](https://www.docker.com/get-started)

### Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/leejsinclair/badge-cli-generator.git
   cd badge-cli-generator
   ```

2. **Open in VS Code**:
   ```bash
   code .
   ```

3. **Open in Container**:
   - VS Code will detect the devcontainer configuration
   - Click "Reopen in Container" when prompted
   - Or use `Ctrl+Shift+P` → "Dev Containers: Reopen in Container"

## 🛠️ What's Included

### Environment
- **Node.js 20** (LTS) with npm
- **Git** for version control
- **GitHub CLI** for GitHub integration

### VS Code Extensions
- **TypeScript** support with enhanced features
- **ESLint** for code linting
- **Prettier** for code formatting
- **Jest** for testing support
- **GitHub** integration (PRs, Actions)
- **JSON & YAML** editing support

### Development Setup
- **Auto-installation** of npm dependencies
- **Pre-built** project ready to use
- **Configured** linting and formatting on save
- **Port forwarding** for development servers

## 🎯 Development Workflow

Once the container is running:

```bash
# All dependencies are already installed!

# Generate a badge
npm start generate

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Build project
npm run build

# Development mode
npm run dev generate
```

## 🔧 Container Features

- **Consistent Environment**: Same Node.js version and tools for all contributors
- **Fast Setup**: No need to install Node.js, npm, or configure environment
- **Isolated**: Doesn't affect your local system
- **Pre-configured**: All extensions and settings ready to go
- **Git Integration**: Full Git functionality within the container

## 📁 File Persistence

- Your code changes are automatically synced
- Git history is preserved
- Generated badges are saved to your local `my-badges/` folder

## 🚪 Alternative Setup

If you prefer to develop locally without containers:

```bash
# Make sure you have Node.js 18+ installed
npm install
npm run build
npm test
```

## 💡 Tips

- **Terminal**: Use the integrated terminal for all commands
- **Extensions**: All recommended extensions are automatically installed
- **Formatting**: Code is automatically formatted on save
- **Linting**: ESLint runs automatically and shows issues inline
- **Testing**: Jest extension provides test running and debugging

## 🔍 Troubleshooting

### Container won't start
- Ensure Docker is running
- Try rebuilding: `Ctrl+Shift+P` → "Dev Containers: Rebuild Container"

### Extensions not working
- Reload window: `Ctrl+Shift+P` → "Developer: Reload Window"
- Check that all extensions installed properly

### Performance issues
- Allocate more resources to Docker
- Close unused VS Code windows

---

Happy coding! 🎉
