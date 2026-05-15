# Fanme — Agent Guide

## O que é o Fanme

App de roleplay interativo de fanfic, inteiramente em português do Brasil. O usuário não lê a história — está dentro dela. A IA gera narração, falas dos personagens e choices em tempo real enquanto o usuário reage e escreve livremente.

**Público:** fãs de fanfic brasileiras, 16–28 anos (TikTok, Twitter, AO3, Wattpad, Character.AI).
**Fandoms:** Harry Potter, Animes, Marvel, DC, K-pop, Real Life e mais.

---

## Problema que o Fanme resolve

| Plataforma | Problema |
|---|---|
| Y/n | Inglês, passivo — só leitura |
| Character.AI | Sem contexto de fandom, sem narrativa |
| Wattpad / AO3 | A história não reage ao usuário |
| Mercado BR | Não existe app de roleplay interativo em PT-BR |

---

## Tela central — Chat de Roleplay

Três camadas simultâneas numa única tela de chat:

1. **Narração** — texto literário/cinematográfico gerado pela IA descrevendo a cena
2. **Falas dos personagens** — avatar + nome colorido + bolha própria; ações em itálico como fanfic
3. **Interação** — choices rápidas (botões) + campo livre (usuário digita qualquer ação)

---

## Tons narrativos (MVP)

| Tom | Exemplo |
|---|---|
| Atmosférico · literário | "O corredor respira. Os olhares se encontram — e o ar muda." |
| Diálogos · natural | "— Você de novo — ele diz, sem surpresa." |
| Tensão · dark romance | "Ele não se move. Não precisa. A distância já diz tudo." |
| Leve · fluff | "Ele tenta esconder o sorriso. Fica óbvio demais." |
| **Chatfic** ✦ | `draco_m: oi / você: ?? / draco_m: só testando se esse número é real` |
| Ação · aventura | "Não há tempo pra pensar. Você corre. Ele corre junto." |

O **chatfic** é diferencial único — formato que a comunidade adora e que nenhum app implementou com IA.

---

## Fluxo de IA

```
Ação do usuário
    ↓
App monta contexto (últimas 5–8 trocas + dados da história)
    ↓
Supabase Edge Function → Gemini API
    ↓
JSON estruturado: narracao + falas + choices
    ↓
Exibido em streaming no chat
```

A IA não tem memória entre chamadas — o app sempre envia o histórico recente como contexto.

**Formato de retorno esperado da IA:**
```json
{
  "narracao": "2-3 parágrafos de cena",
  "falas": [{ "personagem": "...", "acao": "...", "fala": "..." }],
  "choices": ["*ação sugerida 1*", "*ação sugerida 2*"]
}
```

---

## 11 telas do MVP

1. Splash + Onboarding
2. Cadastro / Login — email+senha ou Google; nome e pronome do protagonista
3. Home — Feed — destaques, histórias populares, continuar onde parou
4. Explorar Fandoms — grid de fandoms; dentro de cada um: histórias da comunidade
5. Lista de Histórias — sinopse, rating, tom, personagens, criador
6. Detalhe da História — capa, elenco, tom, preview de estilo, salvar favorito
7. Criação de Personagem — nome, pronome, aparência opcional
8. **Chat de Roleplay** — tela central do produto
9. Perfil — histórias salvas, histórico, conquistas, plano atual
10. Criar História — premise, personagens (até 15), tom, rating, author notes, tags, visibilidade
11. Fanme Plus — paywall

---

## UGC — Histórias da comunidade

Qualquer usuária cria e publica histórias. Outras jogam gerando sessões próprias (cada uma com suas próprias escolhas). Visibilidade: **pública** (feed geral + página do fandom) ou **privada** (só o criador).

Loop de crescimento: jogar → querer criar → publicar → outras jogam → comunidade cresce.

---

## Tech Stack

| Camada | Tecnologia |
|---|---|
| App mobile | React Native + Expo |
| Banco de dados + Auth | Supabase |
| IA — roleplay | Gemini API |
| Backend serverless | Supabase Edge Functions |
| Web (v2.0) | Next.js |

> O repositório atual usa **React + Vite** — protótipo web antes de migrar para React Native / Next.js.

---

## Monetização

**Grátis:** 3 sessões/dia · fandoms básicos · choices + campo livre · rating até Teen

**Fanme Plus — R$ 12,90/mês:** sessões ilimitadas · respostas mais rápidas · fandoms exclusivos · sem anúncios · histórico completo · (futuro) conteúdo 18+

---

## Stack atual do repositório (protótipo web)

| Camada | Ferramenta | Versão |
|---|---|---|
| UI | React | ^19.2.5 |
| Linguagem | TypeScript | ~6.0.2 |
| Build / dev | Vite | ^8.0.10 |
| Linter | ESLint (flat config) | ^10.2.1 |

### Comandos

```bash
npm run dev       # dev server com HMR
npm run build     # tsc -b + bundle (type-check é bloqueante)
npm run lint      # ESLint sobre todos .ts/.tsx
npm run preview   # serve o build de produção
```

### Convenções TypeScript

- Target ES2023, moduleResolution bundler, `verbatimModuleSyntax`
- Flags ativas: `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`, `noFallthroughCasesInSwitch`
- Imports de tipo com `import type { … }`; sem `any`

### Convenções React

- React 19 — preferir hooks novos; evitar padrões legados
- Um componente por arquivo; nome do arquivo = nome do componente; default export
- Estado local: `useState` / `useReducer`

### Estilo

- CSS co-localizado com o componente (`App.css` ao lado de `App.tsx`)
- Tokens globais em `index.css` como CSS custom properties
- Dark mode via `prefers-color-scheme` — sem toggle JS
- Ícones via SVG sprite: `<use href="/icons.svg#icon-id" />`
- Assets importados como módulos ES: `import img from './assets/img.png'`

### Estrutura de pastas ao crescer

```
src/
├── components/    # UI primitivos compartilhados
├── features/      # componentes + lógica por feature
├── hooks/         # custom hooks
├── services/      # chamadas à Gemini API / Supabase
├── types/         # tipos TypeScript compartilhados
└── utils/         # funções puras
```

### O que ainda não existe (adicionar só quando pedido)

- Router · estado global · data-fetching library
- Testes (Vitest + React Testing Library)
- Integração com Gemini API / Supabase
- Autenticação
