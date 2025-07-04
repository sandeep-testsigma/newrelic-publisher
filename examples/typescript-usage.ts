// This example shows how to use the module with TypeScript after installing from Git
// Install with: npm install git+https://github.com/yourusername/your-module-name.git#v1.0.0

import { yourFunction, YourClass, type YourClassOptions } from '../src';

// Basic function usage with TypeScript
console.log('Basic function usage:');
const result: string = yourFunction('hello world');
console.log(result); // Output: processed hello world

// Class usage with TypeScript
console.log('\nClass usage:');
const options: YourClassOptions = {
  option1: 'Hello',
  option2: 'World'
};

const instance = new YourClass(options);

instance.process().then((result: string) => {
  console.log(result); // Output: Hello - World
});

// Class with optional option
console.log('\nClass with optional option:');
const enhancedOptions: YourClassOptions = {
  option1: 'Hello',
  option2: 'World',
  optionalOption: true
};

const enhancedInstance = new YourClass(enhancedOptions);

enhancedInstance.process().then((result: string) => {
  console.log(result); // Output: enhanced: Hello - World
});

// Using utility functions
import { isValidString, formatString } from '../src';

console.log('\nUtility functions:');
console.log('isValidString("hello"):', isValidString('hello')); // true
console.log('isValidString(""):', isValidString('')); // false
console.log('formatString("hello world"):', formatString('hello world')); // Hello world 