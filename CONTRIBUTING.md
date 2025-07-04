# Contributing to Your Module Name

Thank you for your interest in contributing to this project! This document provides guidelines and information for contributors.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

- Use the GitHub issue tracker
- Include a clear and descriptive title
- Provide detailed steps to reproduce the bug
- Include your operating system and Node.js version
- Include any error messages or stack traces

### Suggesting Enhancements

- Use the GitHub issue tracker
- Describe the enhancement in detail
- Explain why this enhancement would be useful
- Include any mockups or examples if applicable

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass (`npm test`)
6. Run linting (`npm run lint`)
7. Format your code (`npm run format`)
8. Build the project (`npm run build`)
9. Commit your changes (`git commit -m 'Add amazing feature'`)
10. Push to the branch (`git push origin feature/amazing-feature`)
11. Open a Pull Request

## Development Setup

1. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/your-module-name.git
   cd your-module-name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. Make your changes and test them:
   ```bash
   npm run build
   npm test
   npm run lint
   ```

## Coding Standards

- Follow the existing code style
- Use TypeScript for all new code
- Write meaningful commit messages
- Add JSDoc comments for public APIs
- Write tests for new functionality
- Ensure 100% test coverage for new code

## Testing

- Write unit tests for all new functionality
- Ensure existing tests continue to pass
- Aim for high test coverage
- Use descriptive test names

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding or updating tests
- `chore:` for maintenance tasks

Example:
```
feat: add new utility function for string processing

- Add processString utility function
- Add comprehensive tests
- Update documentation
```

## Release Process

This project uses Git-based distribution with GitHub releases:

### For Maintainers

1. Update version in `package.json`
2. Update `CHANGELOG.md` with detailed changes
3. Commit changes:
   ```bash
   git add .
   git commit -m "Release v1.x.x"
   ```
4. Create and push tag:
   ```bash
   git tag v1.x.x
   git push origin main
   git push origin v1.x.x
   ```
5. GitHub Actions will automatically:
   - Run tests and linting
   - Build the project
   - Create a GitHub release
   - Upload build artifacts

### For Contributors

- Focus on code quality and testing
- Maintainers will handle the release process
- Ensure your changes are well-documented

## Git Workflow

Since this module is distributed via Git, built files are handled automatically:

1. **Don't commit `dist/` files** - they're built during release
2. **Always test locally**: `npm run build && npm test`
3. **Use `npm run release`** - runs full checks before release
4. **Built files are included in releases** - via GitHub Actions

## Installation Testing

Before releasing, test the installation process:

```bash
# Test local installation
npm pack
npm install ./your-module-name-1.0.0.tgz

# Test Git installation (after pushing)
npm install git+https://github.com/yourusername/your-module-name.git#your-branch
```

## Questions?

If you have questions about contributing, please open an issue or contact the maintainers.

Thank you for contributing! 