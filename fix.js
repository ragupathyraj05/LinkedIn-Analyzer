import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.js') || file.endsWith('.jsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Fix escaped template literal variables \${ -> ${
  content = content.replace(/\\\$\{/g, '${');
  
  // Fix escaped backticks \` -> `
  content = content.replace(/\\`/g, '`');
  
  // Fix over-escaped newlines in prompts.js \\n -> \n
  content = content.replace(/\\\\n/g, '\\n');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed: ${file}`);
  }
});

console.log('Fix complete.');
