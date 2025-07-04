/**
 * Main entry point for the module
 */

export { publishSourcemapAsync } from './utils';
export { newRelicSourcemapPlugin } from './publisher';

export type {
  NewRelicSourcemapPluginOptions,
  PublishSourcemapError,
  PublishSourcemapResponse,
} from './types';

