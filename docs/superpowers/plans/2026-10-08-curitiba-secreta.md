# Curitiba Secreta Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir e publicar uma caça ao tesouro web de Curitiba com seis paradas reais, enigmas, dicas, pontuação, progresso persistente e cofre final.

**Architecture:** Site estático em HTML/CSS/JS puro. A lógica testável é isolada em funções puras no mesmo `js/script.js`, com inicialização do DOM protegida para permitir testes via Node.

**Tech Stack:** HTML5, CSS3, JavaScript ES2020 compatível com navegador, Node.js built-in test runner, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-10-08-curitiba-secreta-design.md`

## Global Constraints
- Arquivos principais separados: `index.html`, `css/style.css`, `js/script.js`.
- Sem framework.
- Responsivo.
- Progresso em localStorage.
- Respostas normalizadas sem acento, caixa ou pontuação.
- Conteúdo de Curitiba baseado em fontes oficiais.

## Review Focus
- Resposta correta com acento e sem acento deve ter o mesmo resultado.
- Resposta vazia não pode avançar.
- Dica só pode descontar uma vez por etapa.
- Recarregar estado concluído não pode ultrapassar seis etapas.
- Senha final deve aceitar `araucaria` sem acento.

---

### Task 1: Lógica do jogo
**Files:** Create `tests/game.test.js`; Create `js/script.js`.
**Interfaces:** Produces `normalizeAnswer`, `isCorrectAnswer`, `createInitialState`, `useHint`, `solveStage`, `isFinalCodeCorrect`, `stages`.
- [ ] Escrever testes de normalização e validação e confirmar RED.
- [ ] Implementar funções mínimas e confirmar GREEN.
- [ ] Adicionar testes de progressão, dica e senha final e confirmar RED.
- [ ] Completar lógica e confirmar GREEN.
- [ ] Commit.

### Task 2: Interface semântica e visual
**Files:** Create `index.html`; Create `css/style.css`; Modify `js/script.js`.
**Interfaces:** Consumes a lógica de Task 1; Produces uma aplicação navegável no browser.
- [ ] Criar teste estrutural para os IDs/classes essenciais e confirmar RED.
- [ ] Criar HTML semântico e CSS responsivo.
- [ ] Conectar eventos, renderização e localStorage.
- [ ] Confirmar testes e `node --check`.
- [ ] Commit.

### Task 3: README e validação de publicação
**Files:** Create `README.md`.
**Interfaces:** Documenta execução, arquitetura, rota e fontes.
- [ ] Criar teste/checagem de links locais e arquivos obrigatórios e confirmar RED antes do README final.
- [ ] Escrever README específico do projeto com referências oficiais.
- [ ] Rodar suite completa e servidor HTTP local.
- [ ] Commit.

### Task 4: Publicação
**Files:** Nenhum arquivo de produto obrigatório.
**Interfaces:** Consumes branch validada; Produces repositório público e GitHub Pages acessível.
- [ ] Mesclar feature em main após verificação.
- [ ] Criar/publicar repositório GitHub.
- [ ] Habilitar GitHub Pages na branch main/root.
- [ ] Verificar URL pública com HTTP 200 e conteúdo esperado.
