# Curitiba Secreta — O Código das Araucárias

## Objetivo
Criar uma caça ao tesouro digital para atividade da Alura, ambientada especificamente em Curitiba e executável diretamente no navegador. O jogador percorre seis pontos reais da cidade, resolve enigmas ligados a fatos e elementos de cada lugar, recebe fragmentos de uma senha e abre um cofre final.

## Experiência
A interface simula um dossiê urbano contemporâneo, identificado como “DOSSIÊ 041”. A rota passa por Praça Tiradentes, Largo da Ordem, Jardim Botânico, Museu Oscar Niemeyer, Ópera de Arame e Parque Tanguá. Cada parada possui texto narrativo, contexto local, enigma, dica opcional e um fragmento da senha final ARAUCÁRIA.

## Regras
- HTML, CSS e JavaScript separados em `index.html`, `css/style.css` e `js/script.js`.
- Sem frameworks ou bibliotecas obrigatórias.
- Funcionar em desktop e celular.
- Salvar progresso no `localStorage`.
- Aceitar respostas sem diferenciar maiúsculas, acentos, pontuação ou espaços extras.
- Dicas reduzem a pontuação possível da parada.
- Resposta errada gera feedback sem avançar.
- Após seis paradas, o jogador deve digitar ARAUCÁRIA para abrir o cofre final.
- O conteúdo local deve ser baseado em fontes oficiais de turismo de Curitiba.

## Rota e enigmas
1. Praça Tiradentes — identificar o ano de fundação de Curitiba indicado no contexto: 1693. Fragmento: `AR`.
2. Largo da Ordem — completar o nome da Igreja da Ordem Terceira de São Francisco com a palavra `Ordem`. Fragmento: `AU`.
3. Jardim Botânico — identificar o bioma citado para a flora preservada na estufa: `Mata Atlântica`. Fragmento: `CÁ`.
4. Museu Oscar Niemeyer — identificar o apelido popular do anexo elíptico: `Museu do Olho`/`Olho`. Fragmento: `R`.
5. Ópera de Arame — informar o ano de inauguração: `1992`. Fragmento: `I`.
6. Parque Tanguá — identificar o uso anterior do paredão de pedra: `pedreira`. Fragmento: `A`.

## Arquitetura
`js/script.js` contém os dados das etapas, funções puras de normalização/validação e o controlador da interface. As funções puras ficam exportáveis em Node para testes e o DOM só é inicializado quando existe `document`. O HTML contém a estrutura semântica; o CSS concentra toda apresentação e responsividade.

## Visual
Paleta de verde pinheiro, papel envelhecido claro, grafite e amarelo de sinalização urbana. Elementos: linha de rota vertical, carimbos de etapa, coordenadas estilizadas, marca “041”, textura topográfica em CSS, cartões com bordas assimétricas e tipografia de dossiê. Sem aparência de template escolar genérico.

## Verificação
Testes automatizados com `node --test` cobrem normalização, respostas válidas, progressão, uso de dicas, persistência serializável e senha final. Verificações adicionais: `node --check`, servidor HTTP local e checagem dos caminhos de assets.
