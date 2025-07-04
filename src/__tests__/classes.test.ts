import { YourClass } from '../classes';
import type { YourClassOptions } from '../types';

describe('YourClass', () => {
  const validOptions: YourClassOptions = {
    option1: 'test1',
    option2: 'test2',
  };

  describe('constructor', () => {
    it('should create instance with valid options', () => {
      const instance = new YourClass(validOptions);
      expect(instance).toBeInstanceOf(YourClass);
    });

    it('should throw error for missing options', () => {
      expect(() => new YourClass(null as any)).toThrow('Options are required');
    });

    it('should throw error for invalid option1', () => {
      expect(() => new YourClass({ ...validOptions, option1: '' })).toThrow(
        'option1 must be a non-empty string'
      );
    });

    it('should throw error for invalid option2', () => {
      expect(() => new YourClass({ ...validOptions, option2: '' })).toThrow(
        'option2 must be a non-empty string'
      );
    });
  });

  describe('process', () => {
    it('should process data correctly', async () => {
      const instance = new YourClass(validOptions);
      const result = await instance.process();
      expect(result).toBe('test1 - test2');
    });

    it('should process data with optional option', async () => {
      const instance = new YourClass({ ...validOptions, optionalOption: true });
      const result = await instance.process();
      expect(result).toBe('enhanced: test1 - test2');
    });
  });

  describe('validate', () => {
    it('should return true for valid state', () => {
      const instance = new YourClass(validOptions);
      expect(instance.validate()).toBe(true);
    });
  });

  describe('getOptions', () => {
    it('should return a copy of options', () => {
      const instance = new YourClass(validOptions);
      const options = instance.getOptions();
      
      expect(options).toEqual(validOptions);
      expect(options).not.toBe(validOptions); // Should be a copy
    });
  });

  describe('createResult', () => {
    it('should create a valid result object', () => {
      const instance = new YourClass(validOptions);
      const result = instance.createResult('test data');
      
      expect(result).toEqual({
        success: true,
        data: 'test data',
        timestamp: expect.any(Date),
      });
    });
  });
}); 