# Contributing to Badge Generator

Thank you for your interest in contributing to Badge Generator! We welcome contributions from everyone.

## 🚀 Quick Start

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/badge-cli-generator.git`
3. Install dependencies: `npm install`
4. Build the project: `npm run build`
5. Run tests: `npm test`

## 🛠 Development Workflow

### Prerequisites
- Node.js 18+ and npm
- Git

### Setup
```bash
npm install
npm run build
npm test
```

### Making Changes
1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Run tests: `npm test`
4. Run linting: `npm run lint`
5. Commit using conventional commits (see below)
6. Push to your fork and create a Pull Request

## 📝 Commit Message Guidelines

We use [Conventional Commits](https://conventionalcommits.org/) for consistent commit messages:

```
type(scope): description

feat(auth): add user login functionality
fix(api): resolve null pointer exception
docs(readme): update installation instructions
test(auth): add unit tests for login component
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes
- `perf`: Performance improvements
- `build`: Build system changes

## 🧪 Testing

- Run all tests: `npm test`
- Run tests in watch mode: `npm run test:watch`
- Tests are located in `src/__tests__/`

Please ensure all tests pass before submitting a PR.

## 🎨 Code Style

We use ESLint and Prettier for code formatting:

```bash
npm run lint        # Check for linting issues
npm run lint:fix    # Auto-fix linting issues
npm run format      # Format code with Prettier
```

## 📋 Pull Request Process

1. **Fork & Branch**: Create a feature branch from `main`
2. **Code**: Implement your changes with tests
3. **Test**: Ensure all tests pass
4. **Commit**: Use conventional commit messages
5. **Push**: Push to your fork
6. **PR**: Create a Pull Request with:
   - Clear title and description
   - Link to any related issues
   - Screenshots if applicable

### PR Checklist
- [ ] Tests pass locally
- [ ] Code follows style guidelines
- [ ] Documentation updated if needed
- [ ] Conventional commit messages used
- [ ] No breaking changes (or clearly documented)

## 🐛 Reporting Bugs

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, etc.)
- Screenshots or code examples if applicable

## 💡 Suggesting Features

For feature requests:
- Check if it already exists in issues
- Provide clear use case and rationale
- Consider implementation complexity
- Be open to discussion and iteration

## 📁 Project Structure

```
src/
├── components/          # Reusable badge components
│   ├── background/      # Background drawing logic
│   ├── icon/           # Icon rendering logic
│   └── textbox/        # Text box rendering logic
├── createBadge/        # Badge configuration types
├── __tests__/          # Test files
├── badge-generator.ts  # Main badge generator class
├── cli.ts             # CLI interface
└── download-icons.ts  # Icon downloading utility
```

## 🔧 Development Tips

- Use `npm run dev` for development mode with hot reloading
- Test your changes with different badge configurations
- Ensure new features are well-documented
- Consider backward compatibility

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## ❓ Questions?

Feel free to:
- Open an issue for questions
- Start a discussion for broader topics
- Reach out to maintainers

Thank you for contributing! 🎉
