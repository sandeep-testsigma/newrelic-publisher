# Getting Started

This guide will help you set up and start developing your npm module using this boilerplate for Git-based distribution.

## Quick Start

1. **Clone or download this boilerplate**
   ```bash
   git clone <your-repo-url>
   cd your-module-name
   ```

2. **Run the setup script**
   ```bash
   npm run setup
   ```
   This will prompt you for:
   - Module name
   - Description
   - Author information
   - GitHub username
   - Keywords

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Run tests**
   ```bash
   npm test
   ```

## Project Structure

```
├── src/                    # Source code
│   ├── index.ts           # Main entry point
│   ├── types.ts           # TypeScript type definitions
│   ├── utils.ts           # Utility functions
│   ├── classes.ts         # Class implementations
│   └── __tests__/         # Test files
├── examples/              # Usage examples
├── dist/                  # Compiled output (built during release)
├── .github/               # GitHub Actions workflows
├── scripts/               # Build and setup scripts
├── package.json           # NPM package configuration
├── tsconfig.json          # TypeScript configuration
├── jest.config.js         # Jest test configuration
├── .eslintrc.js           # ESLint configuration
├── .prettierrc            # Prettier configuration
├── README.md              # Project documentation
├── CONTRIBUTING.md        # Contribution guidelines
├── CHANGELOG.md           # Version history
└── LICENSE                # MIT License
```

## Development Workflow

### 1. Making Changes

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes in the `src/` directory

3. Add tests in `src/__tests__/`

4. Update examples in `examples/` if needed

### 2. Testing Your Changes

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### 3. Building

```bash
# Build for production
npm run build

# Build in watch mode (for development)
npm run dev

# Run full release checks
npm run release
```

### 4. Testing the Build

```bash
# Test the compiled output
node examples/basic-usage.js

# Test local installation
npm pack
npm install ./your-module-name-1.0.0.tgz
```

## Git-Based Distribution

This boilerplate is configured for Git-based distribution, meaning users install directly from your GitHub repository.

### Installation by Users

Users can install your module in several ways:

```bash
# Install from a specific release tag
npm install git+https://github.com/yourusername/your-module-name.git#v1.0.0

# Install from main branch
npm install git+https://github.com/yourusername/your-module-name.git#main

# Install from a specific branch
npm install git+https://github.com/yourusername/your-module-name.git#develop
```

Or in `package.json`:
```json
{
  "dependencies": {
    "your-module-name": "git+https://github.com/yourusername/your-module-name.git#v1.0.0"
  }
}
```

### Creating Releases

Simple 3-step process:

1. **Update version and changelog**
   ```bash
   npm version patch  # or minor, major
   # Then update CHANGELOG.md
   ```

2. **Commit and push tag**
   ```bash
   git add .
   git commit -m "Release v1.0.1"
   git push origin main
   git push origin v1.0.1
   ```

3. **GitHub Actions automatically handles the rest:**
   - Runs tests and linting
   - Builds the project fresh
   - Creates GitHub release
   - Uploads build artifacts

### Key Differences from NPM Distribution

- **Built files NOT in Git**: `dist/` directory is built during release
- **No npm registry**: Users install directly from GitHub
- **Tag-based versioning**: Use Git tags for version management
- **Release automation**: GitHub Actions handles building and release creation

## Configuration Files

### TypeScript (`tsconfig.json`)
- Configured for ES2020 target
- Strict type checking enabled
- Declaration files generated
- Source maps enabled

### Jest (`jest.config.js`)
- TypeScript support with ts-jest
- Coverage reporting
- Test file patterns configured

### ESLint (`.eslintrc.js`)
- TypeScript-aware linting
- Recommended rules enabled
- Customizable rule set

### Prettier (`.prettierrc`)
- Consistent code formatting
- 80 character line width
- Single quotes preferred

## Customization

### Adding Dependencies

```bash
# Add production dependency
npm install package-name

# Add development dependency
npm install --save-dev package-name
```

### Updating Configuration

- **TypeScript**: Modify `tsconfig.json`
- **Testing**: Modify `jest.config.js`
- **Linting**: Modify `.eslintrc.js`
- **Formatting**: Modify `.prettierrc`

### Adding New Features

1. Create new files in `src/`
2. Export from `src/index.ts`
3. Add tests in `src/__tests__/`
4. Update examples
5. Update documentation
6. Build and test: `npm run release`

## Troubleshooting

### Common Issues

1. **TypeScript compilation errors**
   - Check `tsconfig.json` configuration
   - Ensure all imports are correct
   - Run `npm run lint` to check for issues

2. **Test failures**
   - Check test file syntax
   - Ensure all dependencies are installed
   - Run `npm run test:coverage` for detailed output

3. **Build issues**
   - Clean the dist directory: `npm run clean`
   - Reinstall dependencies: `rm -rf node_modules && npm install`
   - Check TypeScript configuration

4. **Git installation issues**
   - Ensure tags are pushed to GitHub
   - Verify GitHub repository is accessible
   - Check that release workflow completed successfully

### Getting Help

- Check the [documentation](README.md)
- Review [contributing guidelines](CONTRIBUTING.md)
- Search [existing issues](https://github.com/yourusername/your-module-name/issues)
- Create a [new issue](https://github.com/yourusername/your-module-name/issues/new)

## Next Steps

1. **Customize the code**: Replace the example code with your actual implementation
2. **Add more tests**: Ensure comprehensive test coverage
3. **Update documentation**: Modify README.md and examples
4. **Set up CI/CD**: The GitHub Actions are already configured
5. **Create your first release**: Follow the simple 3-step process above

## Git Workflow Best Practices

1. **Don't commit built files**: Let GitHub Actions handle building
2. **Use conventional commits**: Follow the commit message guidelines
3. **Test locally first**: `npm run release` runs all checks
4. **Keep releases clean**: Only release from main branch
5. **Document changes**: Update CHANGELOG.md for every release

Happy coding! 🚀 