const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

function read(relative) {
  return fs.readFileSync(path.join(root, relative), 'utf8');
}

test('index conecta CSS e JS separados', () => {
  const html = read('index.html');
  assert.match(html, /href="css\/style\.css"/);
  assert.match(html, /src="js\/script\.js"/);
});

test('index possui as areas essenciais da experiencia', () => {
  const html = read('index.html');
  ['route-list', 'stage-card', 'answer-form', 'hint-button', 'fragment-list', 'final-vault', 'reset-button'].forEach((id) => {
    assert.match(html, new RegExp(`id="${id}"`));
  });
});

test('CSS inclui breakpoint mobile e identidade do dossie', () => {
  const css = read('css/style.css');
  assert.match(css, /@media\s*\(max-width:/);
  assert.match(css, /--pine:/);
  assert.match(css, /\.route-stop/);
});
