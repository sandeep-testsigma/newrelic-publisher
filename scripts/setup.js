#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setup() {
  console.log('🚀 Setting up your npm module boilerplate...\n');

  // Get module information
  const moduleName = await question('Module name (e.g., my-awesome-module): ');
  const description = await question('Description: ');
  const author = await question('Author name: ');
  const email = await question('Author email: ');
  const githubUsername = await question('GitHub username: ');
  const keywords = await question('Keywords (comma-separated): ');

  // Update package.json
  const packagePath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  packageJson.name = moduleName;
  packageJson.description = description;
  packageJson.author = `${author} <${email}>`;
  packageJson.keywords = keywords.split(',').map(k => k.trim());
  packageJson.repository.url = `git+https://github.com/${githubUsername}/${moduleName}.git`;
  packageJson.bugs.url = `https://github.com/${githubUsername}/${moduleName}/issues`;
  packageJson.homepage = `https://github.com/${githubUsername}/${moduleName}#readme`;

  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));

  // Update README.md
  const readmePath = path.join(__dirname, '..', 'README.md');
  let readme = fs.readFileSync(readmePath, 'utf8');
  
  readme = readme.replace(/Your Module Name/g, moduleName);
  readme = readme.replace(/your-module-name/g, moduleName);
  readme = readme.replace(/yourusername/g, githubUsername);
  readme = readme.replace(/A brief description of what your module does and why it's useful\./g, description);

  fs.writeFileSync(readmePath, readme);

  // Update LICENSE
  const licensePath = path.join(__dirname, '..', 'LICENSE');
  let license = fs.readFileSync(licensePath, 'utf8');
  license = license.replace(/Your Name/g, author);
  fs.writeFileSync(licensePath, license);

  // Update CONTRIBUTING.md
  const contributingPath = path.join(__dirname, '..', 'CONTRIBUTING.md');
  let contributing = fs.readFileSync(contributingPath, 'utf8');
  contributing = contributing.replace(/Your Module Name/g, moduleName);
  contributing = contributing.replace(/yourusername/g, githubUsername);
  fs.writeFileSync(contributingPath, contributing);

  console.log('\n✅ Setup complete!');
  console.log('\nNext steps:');
  console.log('1. Run: npm install');
  console.log('2. Run: npm run build');
  console.log('3. Run: npm test');
  console.log('4. Update the source code in src/ directory');
  console.log('5. Update examples in examples/ directory');
  console.log('6. Commit your changes and push to GitHub');
  console.log('7. Create a release to publish to npm');

  rl.close();
}

setup().catch(console.error); 