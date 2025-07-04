/**
 * Type definitions for the module
 */

export interface YourClassOptions {
  option1: string;
  option2: string;
  optionalOption?: boolean;
}

export interface ProcessResult {
  success: boolean;
  data: string;
  timestamp: Date;
} 