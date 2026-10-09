# Curitiba Secreta — O Código das Araucárias

Este projeto não é uma caça ao tesouro que apenas troca nomes genéricos por pontos turísticos. A própria mecânica foi construída em cima de Curitiba: a rota começa no Marco Zero, atravessa o Setor Histórico, passa pela estufa do Jardim Botânico, pelo “Olho” do MON, pela estrutura da Ópera de Arame e termina sobre a antiga pedreira do Parque Tanguá.

A missão é recuperar seis fragmentos de uma palavra. Cada etapa apresenta um pequeno arquivo sobre o lugar, um enigma ligado à história ou à identidade daquele ponto e uma fonte oficial para consulta. Ao resolver as seis pistas, os fragmentos formam **ARAUCÁRIA**, a senha do cofre final.

## A rota 041

| Parada | Lugar | Ideia usada no enigma | Fragmento |
|---|---|---|---|
| 01 | Praça Tiradentes | ano da fundação de Curitiba na região do Marco Zero | `AR` |
| 02 | Largo da Ordem | nome da Igreja da Ordem Terceira de São Francisco | `AU` |
| 03 | Jardim Botânico | bioma representado pela flora da estufa | `CÁ` |
| 04 | Museu Oscar Niemeyer | apelido popular ligado ao formato do anexo | `R` |
| 05 | Ópera de Arame | ano de inauguração | `I` |
| 06 | Parque Tanguá | uso anterior do paredão de pedra | `A` |

A sequência não foi escolhida ao acaso. Ela cria uma leitura de Curitiba em camadas: origem da cidade → centro histórico → paisagem botânica → arquitetura moderna → equipamento cultural sobre uma pedreira → parque também criado a partir de uma antiga pedreira.

## Como funciona o jogo

Cada resposta correta vale **100 pontos**. Existe uma pista auxiliar em todas as etapas; usá-la reduz o valor daquela parada para **70 pontos**. Uma resposta errada não muda de fase e mostra um retorno imediato. O jogo normaliza caixa, acentos e pontuação, então respostas como `ARAUCÁRIA` e `araucaria` são tratadas da mesma forma.

O progresso é salvo em `localStorage`. Isso significa que fechar ou atualizar a página não apaga a investigação. O botão “reiniciar investigação” remove o estado salvo e volta à Praça Tiradentes.

Depois da sexta resposta correta, a tela de etapa é substituída pelo **Cofre 041**. Os fragmentos aparecem na ordem em que foram encontrados, e o jogador precisa deduzir a palavra final para liberar o encerramento e a pontuação obtida.

## Por que o visual é assim

A interface foi pensada como um dossiê urbano, e não como um mapa turístico tradicional. O número **041** aparece como código do arquivo, referência ao DDD de Curitiba. Verde pinheiro, papel claro, linhas de levantamento, coordenadas, carimbos e uma araucária desenhada apenas com CSS constroem a identidade visual.

Não há framework visual, imagem de banco ou template pronto. O objetivo era fazer a cidade aparecer também na linguagem gráfica do projeto, não apenas nos textos.

## Estrutura

```text
curitiba-secreta/
├── index.html          # estrutura semântica e telas do jogo
├── css/
│   └── style.css       # identidade visual, estados e responsividade
├── js/
│   └── script.js       # dados das etapas, regras, DOM e persistência
├── tests/
│   ├── game.test.js
│   ├── structure.test.js
│   └── project.test.js
└── README.md
```

A separação entre HTML, CSS e JavaScript é intencional e faz parte do requisito do projeto. O JavaScript usa funções puras para a lógica principal (`normalizeAnswer`, validação, progressão, dicas e senha final) e deixa a manipulação do DOM na inicialização do jogo.

## Rodando localmente

Não há dependências para instalar. Basta servir a pasta por HTTP. Um exemplo com Python:

```bash
python3 -m http.server 8000
```

Depois, abra `http://localhost:8000`.

Para executar os testes com o Node.js:

```bash
node --test
```

Os testes verificam normalização das respostas, pontuação, uso único de dica, avanço de etapas, formação dos fragmentos, senha final e a separação dos arquivos do projeto.

## Fontes usadas para construir as pistas

Os fatos que viraram enigmas foram baseados em páginas oficiais de turismo de Curitiba:

- [Praça Tiradentes — Turismo Curitiba](https://turismo.curitiba.pr.gov.br/conteudo/praca-tiradentes/1619)
- [Setor Histórico / Largo da Ordem — Turismo Curitiba](https://turismo.curitiba.pr.gov.br/conteudo/setor-historico/1697)
- [Jardim Botânico — Turismo Curitiba](https://turismo.curitiba.pr.gov.br/conteudo/curta-curitiba-ao-ar-livre/2679)
- [Museu Oscar Niemeyer — Linha Turismo](https://turismo.curitiba.pr.gov.br/conteudo/linhaturismo/10)
- [Ópera de Arame — Turismo Curitiba](https://turismo.curitiba.pr.gov.br/conteudo/opera-de-arame/1611)
- [Parque Tanguá — Turismo Curitiba](https://turismo.curitiba.pr.gov.br/conteudo/parque-tangua/1534)

Essas referências ficam também acessíveis durante a própria caça, pelo link “fonte oficial” de cada arquivo.

## Tecnologias

HTML5, CSS3 e JavaScript puro. Sem framework, sem API externa obrigatória e sem build step.

Projeto desenvolvido para uma atividade da Alura, transformando o exercício de caça ao tesouro em uma experiência específica sobre Curitiba.
