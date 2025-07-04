import type { YourClassOptions, ProcessResult } from './types';
import { isValidString } from './utils';

/**
 * A class that provides advanced functionality
 */
export class YourClass {
  private options: YourClassOptions;

  constructor(options: YourClassOptions) {
    this.validateOptions(options);
    this.options = options;
  }

  /**
   * Validates the constructor options
   * @param options - The options to validate
   * @throws Error if options are invalid
   */
  private validateOptions(options: YourClassOptions): void {
    if (!options) {
      throw new Error('Options are required');
    }

    if (!isValidString(options.option1)) {
      throw new Error('option1 must be a non-empty string');
    }

    if (!isValidString(options.option2)) {
      throw new Error('option2 must be a non-empty string');
    }
  }

  /**
   * Processes data asynchronously
   * @returns Promise with the processing result
   */
  async process(): Promise<string> {
    const result = `${this.options.option1} - ${this.options.option2}`;
    
    if (this.options.optionalOption) {
      return `enhanced: ${result}`;
    }
    
    return result;
  }

  /**
   * Validates the current state
   * @returns True if the state is valid
   */
  validate(): boolean {
    return isValidString(this.options.option1) && isValidString(this.options.option2);
  }

  /**
   * Gets the current options
   * @returns A copy of the current options
   */
  getOptions(): YourClassOptions {
    return { ...this.options };
  }

  /**
   * Creates a process result object
   * @param data - The data to include in the result
   * @returns A ProcessResult object
   */
  createResult(data: string): ProcessResult {
    return {
      success: true,
      data,
      timestamp: new Date(),
    };
  }
} 