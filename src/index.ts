/**
 * Main entry point for the module
 */

export { yourFunction, isValidString, formatString } from './utils';
export { YourClass } from './classes';
export type { YourClassOptions, ProcessResult } from './types';

// Default export for convenience
import { yourFunction } from './utils';
import { YourClass } from './classes';

export default {
  yourFunction,
  YourClass,
}; 