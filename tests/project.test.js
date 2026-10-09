const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

test('projeto mantém HTML CSS e JS separados', () => {
  ['index.html', 'css/style.css', 'js/script.js'].forEach((file) => assert.equal(exists(file), true, `${file} deve existir`));
});

test('README documenta a rota real de Curitiba e não é boilerplate', () => {
  assert.equal(exists('README.md'), true, 'README.md deve existir');
  const readme = read('README.md');
  [
    'Praça Tiradentes',
    'Largo da Ordem',
    'Jardim Botânico',
    'Museu Oscar Niemeyer',
    'Ópera de Arame',
    'Parque Tanguá',
    'ARAUCÁRIA',
    'localStorage',
    'node --test',
    'turismo.curitiba.pr.gov.br',
  ].forEach((text) => assert.match(readme, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')));
});
