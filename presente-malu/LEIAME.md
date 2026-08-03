# Para a Malu

Um presente em quatro atos, numa página só (`index.html`), sem nenhuma
dependência externa: todo o desenho é SVG e CSS, todo o texto está no código.

## Os quatro atos

1. **A chave** — o cadeado J + ML respira; ela gira a chave (toque ou arraste) e ele abre.
2. **O ponto exato** — noite sobre o Sena, Notre-Dame ao fundo, a grade de
   cadeados e o nosso pulsando em dourado, com as coordenadas do lugar.
3. **A sentença** — Autos nº 0001-JML/2026, Vara Única dos Afetos, comarca de
   Passos. Datilografada linha a linha (com botão *pular*) e assinada com o dedo.
4. **O jardim** — nasce uma tulipa para cada dia desde a primeira conversa
   (2026-06-01). O contador cresce sozinho, para sempre.

## Como editar

Abra o `index.html` e procure o bloco `CONFIG` no topo do `<script>` — nomes,
coordenadas, datas e ajustes estão lá, comentados em português. Nada mais
precisa ser mexido.

## Como publicar de novo

Dentro desta pasta:

```
npx vercel --prod
```

Sem build, sem npm install: é um arquivo estático.
