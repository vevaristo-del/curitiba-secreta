const stages = [
  {
    id: 'praca-tiradentes',
    stop: '01',
    location: 'Praça Tiradentes',
    district: 'Centro · Marco Zero',
    coordinates: '25°25′44″S · 49°16′19″W',
    kicker: 'Onde Curitiba começa',
    archive: 'A praça é o marco zero da cidade. O Instituto Municipal de Turismo registra que Curitiba foi fundada nesta região em 29 de março de 1693; antes do nome atual, o lugar também foi Largo da Matriz e Praça D. Pedro II.',
    clue: 'O primeiro cadeado usa quatro algarismos. Eles formam o ano em que Curitiba foi fundada nesta região. Qual é o código?',
    hint: 'Procure no arquivo a data de 29 de março. Você precisa apenas do ano.',
    answers: ['1693'],
    fragment: 'AR',
    source: 'https://turismo.curitiba.pr.gov.br/conteudo/praca-tiradentes/1619',
  },
  {
    id: 'largo-da-ordem',
    stop: '02',
    location: 'Largo da Ordem',
    district: 'São Francisco · Setor Histórico',
    coordinates: '25°25′43″S · 49°16′30″W',
    kicker: 'Pedra, feira e memória',
    archive: 'O Setor Histórico reúne algumas das edificações mais antigas de Curitiba. Entre elas está uma igreja de 1737 cujo nome também batiza popularmente este pedaço do centro.',
    clue: 'Na ficha rasgada ficou escrito: “Igreja da ___ Terceira de São Francisco”. Qual palavra desapareceu?',
    hint: 'É a mesma palavra que aparece no nome “Largo da ...”.',
    answers: ['ordem'],
    fragment: 'AU',
    source: 'https://turismo.curitiba.pr.gov.br/conteudo/setor-historico/1697',
  },
  {
    id: 'jardim-botanico',
    stop: '03',
    location: 'Jardim Botânico',
    district: 'Jardim Botânico · Estufa',
    coordinates: '25°26′32″S · 49°14′23″W',
    kicker: 'Vidro sobre a flora paranaense',
    archive: 'Inaugurado em 1991, o Jardim Botânico Francisca Maria Garfunkel Rischbieter tem jardins de inspiração francesa. Sua estufa abriga exemplares vegetais naturais e ornamentais de um importante bioma brasileiro.',
    clue: 'O terceiro fragmento está catalogado pelo bioma. Qual é a formação vegetal citada como referência da flora guardada na estufa?',
    hint: 'O nome tem duas palavras e lembra a grande floresta que acompanha boa parte do litoral brasileiro.',
    answers: ['mata atlantica', 'mata atlântica'],
    fragment: 'CÁ',
    source: 'https://turismo.curitiba.pr.gov.br/conteudo/curta-curitiba-ao-ar-livre/2679',
  },
  {
    id: 'museu-oscar-niemeyer',
    stop: '04',
    location: 'Museu Oscar Niemeyer',
    district: 'Centro Cívico · MON',
    coordinates: '25°24′39″S · 49°16′05″W',
    kicker: 'A cidade observa de volta',
    archive: 'O complexo do MON combina o prédio principal, projetado em 1967, e um anexo concebido em 2001. A forma elíptica e as paredes de vidro deram ao conjunto um apelido conhecido por qualquer curitibano.',
    clue: 'A mensagem diz: “Não procure pelo nome do arquiteto. Procure pelo que parece estar te encarando.” Qual é o apelido popular do museu/anexo?',
    hint: 'É uma parte do rosto. Também aparece na expressão “Museu do ...”.',
    answers: ['olho', 'museu do olho'],
    fragment: 'R',
    source: 'https://turismo.curitiba.pr.gov.br/conteudo/linhaturismo/10',
  },
  {
    id: 'opera-de-arame',
    stop: '05',
    location: 'Ópera de Arame',
    district: 'Abranches · Parque Jaime Lerner',
    coordinates: '25°23′05″S · 49°16′35″W',
    kicker: 'Teatro entre pedra e água',
    archive: 'A estrutura tubular com teto transparente virou um dos símbolos de Curitiba. Cercada por lago, vegetação e paredões, a Ópera de Arame foi inaugurada no início da década de 1990.',
    clue: 'No corrimão há quatro números riscados. Eles correspondem ao ano de inauguração da Ópera de Arame. Qual é?',
    hint: 'Foi inaugurada um ano depois do Jardim Botânico.',
    answers: ['1992'],
    fragment: 'I',
    source: 'https://turismo.curitiba.pr.gov.br/conteudo/opera-de-arame/1611',
  },
  {
    id: 'parque-tangua',
    stop: '06',
    location: 'Parque Tanguá',
    district: 'Pilarzinho · Mirante',
    coordinates: '25°22′41″S · 49°17′01″W',
    kicker: 'O último corte na pedra',
    archive: 'O mirante semicircular do Tanguá fica sobre um paredão de pedra. O cenário de pôr do sol esconde no próprio relevo a atividade que existia ali antes de o espaço virar parque.',
    clue: 'Para recuperar o último fragmento, diga o que funcionava nesse paredão antes do parque existir.',
    hint: 'É um local de extração de pedra — e Curitiba transformou mais de um deles em espaço de lazer e cultura.',
    answers: ['pedreira', 'uma pedreira', 'antiga pedreira'],
    fragment: 'A',
    source: 'https://turismo.curitiba.pr.gov.br/conteudo/parque-tangua/1534',
  },
];

function normalizeAnswer(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isCorrectAnswer(stage, answer) {
  const normalized = normalizeAnswer(answer);
  if (!normalized || !stage || !Array.isArray(stage.answers)) return false;
  return stage.answers.some((candidate) => normalizeAnswer(candidate) === normalized);
}

function createInitialState() {
  return {
    currentStage: 0,
    score: 0,
    solved: [],
    hintsUsed: [],
    fragments: [],
    completed: false,
  };
}

function useHint(state, stageIndex) {
  if (!Number.isInteger(stageIndex) || stageIndex < 0 || stageIndex >= stages.length) return { ...state };
  if (state.hintsUsed.includes(stageIndex)) return { ...state, hintsUsed: [...state.hintsUsed] };
  return { ...state, hintsUsed: [...state.hintsUsed, stageIndex] };
}

function solveStage(state, stageIndex, answer) {
  if (stageIndex !== state.currentStage) return { ...state, solved: [...state.solved], hintsUsed: [...state.hintsUsed], fragments: [...state.fragments] };
  if (state.solved.includes(stageIndex) || !isCorrectAnswer(stages[stageIndex], answer)) {
    return { ...state, solved: [...state.solved], hintsUsed: [...state.hintsUsed], fragments: [...state.fragments] };
  }

  const solved = [...state.solved, stageIndex];
  const fragments = [...state.fragments, stages[stageIndex].fragment];
  const points = state.hintsUsed.includes(stageIndex) ? 70 : 100;
  const nextStage = Math.min(stageIndex + 1, stages.length);

  return {
    ...state,
    currentStage: nextStage,
    score: state.score + points,
    solved,
    fragments,
    completed: solved.length === stages.length,
  };
}

function isFinalCodeCorrect(value) {
  return normalizeAnswer(value) === 'araucaria';
}

const gameApi = {
  stages,
  normalizeAnswer,
  isCorrectAnswer,
  createInitialState,
  useHint,
  solveStage,
  isFinalCodeCorrect,
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = gameApi;
}


function initGame() {
  const STORAGE_KEY = 'curitiba-secreta-v1';
  const VAULT_KEY = 'curitiba-secreta-vault';
  const byId = (id) => document.getElementById(id);

  const els = {
    routeList: byId('route-list'),
    routeProgress: byId('route-progress'),
    fragmentList: byId('fragment-list'),
    stageCard: byId('stage-card'),
    stageNumber: byId('stage-number'),
    stageDistrict: byId('stage-district'),
    stageCoordinates: byId('stage-coordinates'),
    stageKicker: byId('stage-kicker'),
    stageLocation: byId('stage-location'),
    stageArchive: byId('stage-archive'),
    stageSource: byId('stage-source'),
    stageClue: byId('stage-clue'),
    answerForm: byId('answer-form'),
    answerInput: byId('answer-input'),
    feedback: byId('feedback'),
    hintButton: byId('hint-button'),
    hintText: byId('hint-text'),
    resetButton: byId('reset-button'),
    finalVault: byId('final-vault'),
    finalFragments: byId('final-fragments'),
    vaultForm: byId('vault-form'),
    vaultInput: byId('vault-input'),
    vaultFeedback: byId('vault-feedback'),
    treasureReveal: byId('treasure-reveal'),
    finalScore: byId('final-score'),
  };

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved || !Array.isArray(saved.solved) || !Array.isArray(saved.hintsUsed) || !Array.isArray(saved.fragments)) {
        return createInitialState();
      }
      const solved = saved.solved.filter((item) => Number.isInteger(item) && item >= 0 && item < stages.length);
      const currentStage = Math.min(Math.max(Number(saved.currentStage) || 0, 0), stages.length);
      return {
        currentStage,
        score: Math.max(Number(saved.score) || 0, 0),
        solved,
        hintsUsed: saved.hintsUsed.filter((item) => Number.isInteger(item) && item >= 0 && item < stages.length),
        fragments: saved.fragments.slice(0, stages.length),
        completed: solved.length === stages.length,
      };
    } catch {
      return createInitialState();
    }
  }

  let state = loadState();

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function setFeedback(element, message, type = '') {
    element.textContent = message;
    element.className = `feedback${type ? ` ${type}` : ''}`;
  }

  function renderRoute() {
    els.routeList.innerHTML = stages.map((stage, index) => {
      const status = state.solved.includes(index) ? 'done' : index === state.currentStage ? 'active' : '';
      const statusText = status === 'done' ? 'resolvida' : status === 'active' ? 'pista atual' : 'bloqueada';
      return `
        <li class="route-stop ${status}">
          <div class="route-node"><span>${stage.stop}</span></div>
          <div class="route-name">
            <strong>${stage.location}</strong>
            <small>${statusText}</small>
          </div>
        </li>
      `;
    }).join('');
    els.routeProgress.textContent = `${state.solved.length}/${stages.length}`;
  }

  function renderFragments() {
    els.fragmentList.innerHTML = stages.map((stage, index) => {
      const recovered = state.solved.includes(index);
      const placeholder = stage.fragment.length > 1 ? '??' : '?';
      return `<span class="${recovered ? 'recovered' : ''}">${recovered ? stage.fragment : placeholder}</span>`;
    }).join('');
  }

  function renderFinal() {
    els.stageCard.hidden = true;
    els.finalVault.hidden = false;
    els.finalFragments.innerHTML = state.fragments.map((fragment) => `<span>${fragment}</span>`).join('');
    els.finalScore.textContent = String(state.score).padStart(3, '0');
    const unlocked = localStorage.getItem(VAULT_KEY) === '1';
    els.treasureReveal.hidden = !unlocked;
    if (unlocked) {
      setFeedback(els.vaultFeedback, 'Cofre 041 aberto. Arquivo final recuperado.', 'success');
    }
  }

  function renderStage() {
    renderRoute();
    renderFragments();

    if (state.completed || state.currentStage >= stages.length) {
      renderFinal();
      return;
    }

    els.stageCard.hidden = false;
    els.finalVault.hidden = true;
    const stage = stages[state.currentStage];

    els.stageNumber.textContent = stage.stop;
    els.stageDistrict.textContent = stage.district;
    els.stageCoordinates.textContent = stage.coordinates;
    els.stageKicker.textContent = stage.kicker;
    els.stageLocation.textContent = stage.location;
    els.stageArchive.textContent = stage.archive;
    els.stageSource.href = stage.source;
    els.stageClue.textContent = stage.clue;
    els.answerInput.value = '';
    setFeedback(els.feedback, '');

    const hintUsed = state.hintsUsed.includes(state.currentStage);
    els.hintText.textContent = stage.hint;
    els.hintText.hidden = !hintUsed;
    els.hintButton.disabled = hintUsed;
    els.hintButton.innerHTML = hintUsed
      ? 'pista auxiliar aberta <span>−30 pts</span>'
      : '+ abrir pista auxiliar <span>−30 pts</span>';
  }

  els.answerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const answer = els.answerInput.value;
    const stageIndex = state.currentStage;

    if (!normalizeAnswer(answer)) {
      setFeedback(els.feedback, 'Digite uma resposta antes de validar.', 'error');
      return;
    }

    if (!isCorrectAnswer(stages[stageIndex], answer)) {
      setFeedback(els.feedback, 'Código recusado. Releia o arquivo ou abra a pista auxiliar.', 'error');
      els.answerInput.select();
      return;
    }

    state = solveStage(state, stageIndex, answer);
    saveState();
    setFeedback(els.feedback, `Pista resolvida. Fragmento ${stages[stageIndex].fragment} recuperado.`, 'success');

    window.setTimeout(() => {
      renderStage();
      if (!state.completed) els.answerInput.focus();
      else els.finalVault.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 550);
  });

  els.hintButton.addEventListener('click', () => {
    if (state.completed) return;
    const stageIndex = state.currentStage;
    state = useHint(state, stageIndex);
    saveState();
    els.hintText.textContent = stages[stageIndex].hint;
    els.hintText.hidden = false;
    els.hintButton.disabled = true;
    els.hintButton.innerHTML = 'pista auxiliar aberta <span>−30 pts</span>';
  });

  els.vaultForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!isFinalCodeCorrect(els.vaultInput.value)) {
      setFeedback(els.vaultFeedback, 'A sequência não abre o cofre. Una os fragmentos na ordem da rota.', 'error');
      els.vaultInput.select();
      return;
    }
    localStorage.setItem(VAULT_KEY, '1');
    els.treasureReveal.hidden = false;
    els.finalScore.textContent = String(state.score).padStart(3, '0');
    setFeedback(els.vaultFeedback, 'Senha reconhecida. Cofre 041 desbloqueado.', 'success');
    els.treasureReveal.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  els.resetButton.addEventListener('click', () => {
    const confirmed = window.confirm('Reiniciar a investigação e apagar todo o progresso desta rota?');
    if (!confirmed) return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(VAULT_KEY);
    state = createInitialState();
    renderStage();
    window.scrollTo({ top: document.getElementById('missao').offsetTop, behavior: 'smooth' });
  });

  renderStage();
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initGame);
}
