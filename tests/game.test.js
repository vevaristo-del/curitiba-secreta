const test = require('node:test');
const assert = require('node:assert/strict');

const {
  stages,
  normalizeAnswer,
  isCorrectAnswer,
  createInitialState,
  useHint,
  solveStage,
  isFinalCodeCorrect,
} = require('../js/script.js');

test('normalizeAnswer remove acentos, pontuacao e espacos extras', () => {
  assert.equal(normalizeAnswer('  Mata   Atlântica! '), 'mata atlantica');
  assert.equal(normalizeAnswer('ARAUCÁRIA'), 'araucaria');
});

test('isCorrectAnswer aceita variantes previstas e rejeita vazio', () => {
  assert.equal(isCorrectAnswer(stages[2], 'mata atlantica'), true);
  assert.equal(isCorrectAnswer(stages[3], 'Olho'), true);
  assert.equal(isCorrectAnswer(stages[3], 'Museu do Olho'), true);
  assert.equal(isCorrectAnswer(stages[0], ''), false);
});

test('createInitialState inicia na primeira etapa com 600 pontos possiveis', () => {
  assert.deepEqual(createInitialState(), {
    currentStage: 0,
    score: 0,
    solved: [],
    hintsUsed: [],
    fragments: [],
    completed: false,
  });
});

test('useHint marca apenas uma vez a etapa e nao altera pontuacao acumulada', () => {
  const state = createInitialState();
  const once = useHint(state, 0);
  const twice = useHint(once, 0);
  assert.deepEqual(once.hintsUsed, [0]);
  assert.deepEqual(twice.hintsUsed, [0]);
  assert.equal(twice.score, 0);
});

test('solveStage avanca, soma 100 ou 70 pontos e entrega fragmento', () => {
  let state = createInitialState();
  state = solveStage(state, 0, '1693');
  assert.equal(state.currentStage, 1);
  assert.equal(state.score, 100);
  assert.deepEqual(state.fragments, ['AR']);

  state = useHint(state, 1);
  state = solveStage(state, 1, 'ordem');
  assert.equal(state.currentStage, 2);
  assert.equal(state.score, 170);
  assert.deepEqual(state.fragments, ['AR', 'AU']);
});

test('solveStage nao avanca com resposta errada ou etapa ja resolvida', () => {
  const initial = createInitialState();
  const wrong = solveStage(initial, 0, '1993');
  assert.deepEqual(wrong, initial);

  const solved = solveStage(initial, 0, '1693');
  const repeated = solveStage(solved, 0, '1693');
  assert.deepEqual(repeated, solved);
});

test('ultima etapa marca completed sem ultrapassar o limite', () => {
  let state = createInitialState();
  const answers = ['1693', 'ordem', 'mata atlantica', 'olho', '1992', 'pedreira'];
  answers.forEach((answer, index) => {
    state = solveStage(state, index, answer);
  });
  assert.equal(state.currentStage, 6);
  assert.equal(state.completed, true);
  assert.equal(state.fragments.join(''), 'ARAUCÁRIA');
  assert.equal(state.score, 600);
});

test('isFinalCodeCorrect aceita senha com ou sem acento', () => {
  assert.equal(isFinalCodeCorrect('ARAUCÁRIA'), true);
  assert.equal(isFinalCodeCorrect('araucaria'), true);
  assert.equal(isFinalCodeCorrect('curitiba'), false);
});
