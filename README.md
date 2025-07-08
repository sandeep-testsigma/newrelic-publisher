# newrelic-publisher

newrelic-publisher

## Features

- **Vite Plugin Integration**: Seamlessly integrates with Vite build process to automatically upload sourcemaps to New Relic after builds
- **Automatic Sourcemap Discovery**: Recursively finds and uploads all `.map` files from your build directory
- **Environment Variable Support**: Configure using environment variables for secure API key management
- **Dry Run Mode**: Test your configuration without actually uploading sourcemaps
- **Sourcemap Cleanup**: Automatically removes sourcemap files after successful upload to keep your production builds clean
- **Error Handling**: Robust error handling with detailed logging and graceful failure recovery
- **TypeScript Support**: Full TypeScript support with comprehensive type definitions
- **Manual Upload API**: Utility function for manual sourcemap uploads outside of the build process
- **Duplicate Detection**: Handles already-published sourcemaps gracefully without errors
- **Flexible Configuration**: Support for custom build directories, JavaScript URL bases, and conditional enabling

## Installation

Install directly from GitHub:

```bash
npm install git+https://github.com/sandeep-testsigma/newrelic-publisher.git#v1.0.0
```

Or add to your package.json:

```json
{
  "dependencies": {
    "newrelic-publisher": "git+https://github.com/sandeep-testsigma/newrelic-publisher.git#v1.0.0"
  }
}
```

You can also install from a specific branch:

```bash
npm install git+https://github.com/sandeep-testsigma/newrelic-publisher.git#main
```

## Troubleshooting: GitHub Authentication Issues

If you have trouble installing from a **private GitHub repository**, it's usually due to authentication. Here are solutions:

### 1. Use SSH Instead of HTTPS (Recommended)

Configure Git to use SSH for all GitHub URLs:

```bash
git config --global url."git@github.com:".insteadOf "https://github.com/"
```

Or use the SSH URL directly:

```bash
npm install git+ssh://git@github.com/sandeep-testsigma/newrelic-publisher.git#v1.0.0
```

### 2. Use a Personal Access Token (HTTPS)

If you prefer HTTPS, create a [Personal Access Token](https://github.com/settings/tokens) and use it in the URL:

```bash
npm install https://YOUR_TOKEN@github.com/sandeep-testsigma/newrelic-publisher.git#v1.0.0
```

### 3. Configure npm to Use SSH for GitHub

```bash
npm config set git-protocol ssh
```

### 4. Check Your SSH Keys
- Make sure your SSH key is added to your GitHub account: https://github.com/settings/keys
- Test with: `ssh -T git@github.com`

### 5. Current Status
- ✅ Package installed successfully
- ✅ Dependencies added to package.json
- ✅ SSH authentication working properly

If you see authentication errors, try the above solutions. For more help, see the [npm docs on installing from git](https://docs.npmjs.com/cli/v10/commands/npm-install#git).

## Usage

### Basic Usage - Vite Plugin

The primary use case is as a Vite plugin to automatically upload sourcemaps to New Relic after build:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { newRelicSourcemapPlugin } from 'newrelic-publisher';

export default defineConfig({
  plugins: [
    newRelicSourcemapPlugin({
      applicationId: 'your-newrelic-app-id',
      apiKey: 'your-newrelic-api-key',
      javascriptUrlBase: 'https://your-domain.com/assets',
      buildOutputDir: 'dist', // optional, defaults to 'dist'
      dryRun: false, // optional, set to true for testing
      isNewRelicEnabled: true // optional, defaults to true
    })
  ],
  // ... other config
});
```

### Environment Variables

You can also configure the plugin using environment variables:

```bash
# .env file
NEWRELIC_VITE_PLUGIN_APPLICATION_ID=your-newrelic-app-id
NEWRELIC_VITE_PLUGIN_API_KEY=your-newrelic-api-key
NEWRELIC_VITE_PLUGIN_JAVASCRIPTURL_BASE=https://your-domain.com/assets
```

```typescript
// vite.config.ts - uses environment variables automatically
import { newRelicSourcemapPlugin } from 'newrelic-publisher';

export default defineConfig({
  plugins: [
    newRelicSourcemapPlugin({
      // Will use environment variables if not specified
    })
  ]
});
```

### Manual Sourcemap Publishing

For manual control or use outside of Vite, use the utility function:

```typescript
import { publishSourcemapAsync } from 'newrelic-publisher';

async function uploadSourcemap() {
  try {
    const result = await publishSourcemapAsync({
      applicationId: 'your-newrelic-app-id',
      apiKey: 'your-newrelic-api-key',
      sourcemapPath: './dist/assets/app.js.map',
      javascriptUrl: 'https://your-domain.com/assets/app.js'
    });
    
    console.log('Upload successful:', result);
  } catch (error) {
    console.error('Upload failed:', error);
  }
}
```

### TypeScript Support

The package includes full TypeScript support with exported types:

```typescript
import type { 
  NewRelicSourcemapPluginOptions,
  PublishSourcemapError,
  PublishSourcemapResponse 
} from 'newrelic-publisher';

const config: NewRelicSourcemapPluginOptions = {
  applicationId: 'your-app-id',
  apiKey: 'your-api-key',
  javascriptUrlBase: 'https://your-domain.com',
  dryRun: true
};
```

## API Reference

### `newRelicSourcemapPlugin(options: NewRelicSourcemapPluginOptions)`

A Vite plugin that automatically uploads sourcemaps to New Relic after the build process.

**Parameters:**
- `options` (NewRelicSourcemapPluginOptions): Configuration options for the plugin

**Returns:**
- Vite plugin object with `name` and `closeBundle` hook

**Example:**
```typescript
import { newRelicSourcemapPlugin } from 'newrelic-publisher';

const plugin = newRelicSourcemapPlugin({
  applicationId: 'your-app-id',
  apiKey: 'your-api-key',
  javascriptUrlBase: 'https://your-domain.com/assets'
});
```

### `publishSourcemapAsync(options: NewRelicSourcemapPluginOptions): Promise<string | PublishSourcemapResponse>`

Manually publishes a sourcemap to New Relic.

**Parameters:**
- `options` (NewRelicSourcemapPluginOptions): Configuration options including sourcemap path and JavaScript URL

**Returns:**
- `Promise<string | PublishSourcemapResponse>`: Returns 'already published' if sourcemap exists, or response data on success

**Throws:**
- `PublishSourcemapError`: When upload fails

**Example:**
```typescript
const result = await publishSourcemapAsync({
  applicationId: 'your-app-id',
  apiKey: 'your-api-key',
  sourcemapPath: './dist/app.js.map',
  javascriptUrl: 'https://your-domain.com/app.js'
});
```

### Types

#### `NewRelicSourcemapPluginOptions`

Configuration interface for the plugin and utility functions.

```typescript
interface NewRelicSourcemapPluginOptions {
  isNewRelicEnabled?: boolean;     // Enable/disable New Relic integration
  applicationId?: string;          // New Relic application ID
  apiKey?: string;                // New Relic API key
  javascriptUrlBase?: string;     // Base URL for JavaScript files
  buildOutputDir?: string;        // Build output directory (plugin only)
  dryRun?: boolean;              // Test mode without actual uploads (plugin only)
  sourcemapPath?: string;        // Path to sourcemap file (manual upload only)
  javascriptUrl?: string;        // Full URL to JavaScript file (manual upload only)
}
```

#### `PublishSourcemapResponse`

Response object returned on successful sourcemap upload.

```typescript
type PublishSourcemapResponse = {
  success: boolean;
  message: string;
  data: unknown;
};
```

#### `PublishSourcemapError`

Error object thrown when sourcemap upload fails.

```typescript
type PublishSourcemapError = Error & {
  response: {
    body: {
      code: number;
    };
  };
};
```

## Examples

See the [examples](./examples) directory for more detailed usage examples.

## Releases

This module is distributed via GitHub releases. Each release includes:
- Built JavaScript files in the `dist/` directory
- Type definitions
- Source maps
- A tarball attachment

To use a specific version, reference the tag in your installation:
```bash
npm install git+https://github.com/sandeep-testsigma/newrelic-publisher.git#v1.2.3
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sandeep-testsigma/newrelic-publisher.git
   cd newrelic-publisher
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Run tests:
   ```bash
   npm test
   ```

5. Run linting:
   ```bash
   npm run lint
   ```

### Scripts

- `npm run build` - Build the project
- `npm run dev` - Build in watch mode
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run clean` - Clean build directory
- `npm run release` - Run full release checks (build, test, lint)

### Creating a Release

1. Update version in `package.json`
2. Update `CHANGELOG.md` with changes
3. Commit changes: `git commit -am "Release v1.x.x"`
4. Create and push tag: `git tag v1.x.x && git push origin main && git push origin v1.x.x`
5. GitHub Actions will automatically create the release

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes between versions.

## Support

If you encounter any issues or have questions, please:

1. Check the [documentation](https://github.com/sandeep-testsigma/newrelic-publisher#readme)
2. Search [existing issues](https://github.com/sandeep-testsigma/newrelic-publisher/issues)
3. Create a [new issue](https://github.com/sandeep-testsigma/newrelic-publisher/issues/new)

## Acknowledgments

- Thanks to contributors and maintainers
- Inspired by [related project]
- Built with [technology stack] 