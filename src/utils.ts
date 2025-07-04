/**
 * Utility functions for the module
 */

/**
 * Processes the input string and returns a result
 * @param input - The input string to process
 * @returns The processed result
 */
export function yourFunction(input: string): string {
  if (!input || typeof input !== 'string') {
    throw new Error('Input must be a non-empty string');
  }
  
  return `processed ${input}`;
}

/**
 * Validates if a string is not empty
 * @param str - The string to validate
 * @returns True if the string is not empty
 */
export function isValidString(str: string): boolean {
  return typeof str === 'string' && str.trim().length > 0;
}

/**
 * Formats a string with proper casing
 * @param str - The string to format
 * @returns The formatted string
 */
export function formatString(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
} 