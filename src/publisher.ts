import fs from 'fs/promises';
import path from 'path';
import { publishSourcemapAsync } from './utils';
import { config } from 'dotenv';

config();

interface NewRelicSourcemapPluginOptions {
  dryRun?: boolean;
  isNewRelicEnabled?: boolean;
  applicationId?: string;
  apiKey?: string;
  javascriptUrlBase?: string;
}

export const newRelicSourcemapPlugin = ({
  dryRun = false,
  isNewRelicEnabled = true,
  applicationId = process.env['NEWRELIC_VITE_PLUGIN_APPLICATION_ID'],
  apiKey = process.env['NEWRELIC_VITE_PLUGIN_API_KEY'],
  javascriptUrlBase = process.env['NEWRELIC_VITE_PLUGIN_JAVASCRIPTURL_BASE'],
}: NewRelicSourcemapPluginOptions) => {
  return {
    name: 'newrelic-sourcemap-publish-plugin',

    closeBundle: async () => {
      if (isNewRelicEnabled) {
        try {
          console.log('🚀 Starting New Relic sourcemap upload...');

          if (!applicationId || !apiKey) {
            console.error(
              '❌ New Relic configuration missing required parameters',
            );
            return;
          }

          // Get the build output directory (usually 'dist' for Vite)
          const buildDir = path.resolve(process.cwd(), 'dist');

          // Function to recursively find and upload .map files
          const uploadMapFiles = async (dir: string) => {
            try {
              const entries = await fs.readdir(dir, { withFileTypes: true });

              for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);

                if (entry.isDirectory()) {
                  // Recursively process subdirectories
                  await uploadMapFiles(fullPath);
                } else if (entry.isFile() && entry.name.endsWith('.map')) {
                  // Upload .map file to New Relic
                  try {
                    // Get the relative path from dist directory
                    const relativePath = path.relative(buildDir, fullPath);
                    // Remove .map extension to get the JavaScript file name
                    const jsFileName = relativePath
                      .replace(/\.map$/, '')
                      .replace(/^ui\//, '');

                    const javascriptUrl = `${javascriptUrlBase}/${jsFileName}`;

                    // Validate that javascriptUrl is not empty
                    if (!javascriptUrl || !jsFileName) {
                      console.error(`❌ Invalid javascriptUrl or jsFileName:`, {
                        javascriptUrl,
                        jsFileName,
                      });
                      throw new Error('javascriptUrl or jsFileName is empty');
                    }

                    const publishOptions = {
                      applicationId,
                      apiKey,
                      sourcemapPath: fullPath,
                      javascriptUrl: javascriptUrl,
                    };

                    console.log(
                      `📤 Uploading sourcemap: ${relativePath} -> ${javascriptUrl}`,
                    );
                    if (!dryRun) {
                      const result = await publishSourcemapAsync(
                        publishOptions,
                      );
                      if (result === 'already published') {
                        console.log(
                          `✅ Sourcemap already published: ${relativePath}`,
                        );
                      } else {
                        console.log(
                          `✅ Sourcemap uploaded successfully: ${relativePath}`,
                        );
                      }
                    } else {
                      console.log(
                        `🔍 Dry run: Would upload sourcemap: ${relativePath} -> ${javascriptUrl}`,
                      );
                    }

                    // Remove the .map file after successful upload
                    await fs.unlink(fullPath);
                    console.log(`🗑️ Removed: ${fullPath}`);
                  } catch (uploadError) {
                    console.error(
                      `❌ Failed to upload sourcemap ${entry.name}:`,
                      uploadError,
                    );
                    // Don't remove the file if upload failed
                  }
                }
              }
            } catch (error: unknown) {
              // Ignore errors for non-existent directories
              if (error instanceof Error && 'code' in error && error.code !== 'ENOENT') {
                console.warn(
                  `⚠️ Error processing directory ${dir}:`,
                  error.message,
                );
              } else {
                console.error('❌ Failed to upload New Relic sourcemaps:', String(error));
              }
            }
          };

          // Upload .map files from build directory
          await uploadMapFiles(buildDir);
          console.log('✅ New Relic sourcemap upload completed');
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error('❌ Failed to upload New Relic sourcemaps:', error.message);
          } else {
            console.error('❌ Failed to upload New Relic sourcemaps:', String(error));
          }
        }
      }
    },
  };
};
