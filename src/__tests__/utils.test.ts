import { yourFunction, isValidString, formatString } from '../utils';

describe('Utils', () => {
  describe('yourFunction', () => {
    it('should process a valid string', () => {
      const result = yourFunction('hello world');
      expect(result).toBe('processed hello world');
    });

    it('should throw error for empty string', () => {
      expect(() => yourFunction('')).toThrow('Input must be a non-empty string');
    });

    it('should throw error for null input', () => {
      expect(() => yourFunction(null as any)).toThrow('Input must be a non-empty string');
    });

    it('should throw error for undefined input', () => {
      expect(() => yourFunction(undefined as any)).toThrow('Input must be a non-empty string');
    });
  });

  describe('isValidString', () => {
    it('should return true for valid string', () => {
      expect(isValidString('hello')).toBe(true);
    });

    it('should return false for empty string', () => {
      expect(isValidString('')).toBe(false);
    });

    it('should return false for whitespace only string', () => {
      expect(isValidString('   ')).toBe(false);
    });

    it('should return false for non-string input', () => {
      expect(isValidString(null as any)).toBe(false);
      expect(isValidString(undefined as any)).toBe(false);
      expect(isValidString(123 as any)).toBe(false);
    });
  });

  describe('formatString', () => {
    it('should format string with proper casing', () => {
      expect(formatString('hello world')).toBe('Hello world');
    });

    it('should handle single character', () => {
      expect(formatString('a')).toBe('A');
    });

    it('should handle already formatted string', () => {
      expect(formatString('Hello World')).toBe('Hello world');
    });
  });
}); 