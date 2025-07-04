// This example shows how to use the module after installing from Git
// Install with: npm install git+https://github.com/yourusername/your-module-name.git#v1.0.0

const { yourFunction, YourClass } = require('../dist');

// Basic function usage
console.log('Basic function usage:');
const result = yourFunction('hello world');
console.log(result); // Output: processed hello world

// Class usage
console.log('\nClass usage:');
const instance = new YourClass({
  option1: 'Hello',
  option2: 'World'
});

instance.process().then(result => {
  console.log(result); // Output: Hello - World
});

// Class with optional option
console.log('\nClass with optional option:');
const enhancedInstance = new YourClass({
  option1: 'Hello',
  option2: 'World',
  optionalOption: true
});

enhancedInstance.process().then(result => {
  console.log(result); // Output: enhanced: Hello - World
}); 