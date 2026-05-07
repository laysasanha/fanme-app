# Fanme

Fanme é uma plataforma de roleplay interativo em formato de fanfic, onde o usuário entra na história como protagonista e interage em tempo real com personagens gerados por IA.

A proposta do produto é transformar fanfics em experiências interativas, imersivas e personalizadas no formato de chat.

---

## Sobre o projeto

O Fanme nasce com a proposta de unir:

* fanfic
* roleplay
* inteligência artificial
* narrativa interativa
* fandom culture

Ao invés de apenas consumir uma história, o usuário participa dela.

Cada escolha altera o rumo da narrativa.

---

## Objetivo

Construir uma plataforma focada em:

* experiências interativas de fanfic
* fandoms populares
* histórias personalizadas
* narrativa em português
* sistema de progressão e histórico

---

## Tecnologias

### Base atual

* React
* TypeScript
* Vite

### Stack planejada

* React Router DOM
* Zustand
* TanStack Query
* TailwindCSS
* Framer Motion
* vite-plugin-pwa

---

## Arquitetura planejada

```txt
src
├── components
├── features
│   ├── auth
│   ├── stories
│   ├── profile
│   ├── library
│   └── premium
├── pages
├── routes
├── hooks
├── services
├── store
├── types
├── utils
└── assets
```

---

## Funcionalidades planejadas

* autenticação de usuários
* feed de fandoms
* exploração de histórias
* sistema de personagens
* roleplay em tempo real
* histórico de sessões
* biblioteca pessoal
* perfil de usuário
* assinatura premium

---

## Fluxo do produto

```txt
Onboarding
↓
Cadastro/Login
↓
Home
↓
Explorar fandoms
↓
Escolher história
↓
Criar personagem
↓
Iniciar roleplay
↓
Interagir com IA
↓
Salvar progresso
```

---

## Como executar

Clone o repositório:

```bash
git clone <repo-url>
```

Entre na pasta:

```bash
cd fanme
```

Instale as dependências:

```bash
npm install
```

Execute localmente:

```bash
npm run dev
```

Gerar build:

```bash
npm run build
```

Preview da build:

```bash
npm run preview
```

---

## Convenção de commits

Padrão adotado:

```txt
feat: nova funcionalidade
fix: correção
refactor: refatoração
style: ajustes visuais
docs: documentação
chore: manutenção
```

Exemplo:

```bash
git commit -m "feat: add authentication flow"
```

---

## Status do projeto

Projeto em fase inicial de setup.

Atualmente contém:

* configuração base do React
* TypeScript
* Vite

Próximas etapas:

* configurar roteamento
* configurar estado global
* configurar PWA
* estruturar arquitetura
* iniciar desenvolvimento das telas

---

## Roadmap

### Fase 1

Estruturação da base

### Fase 2

Sistema de autenticação

### Fase 3

Sistema de histórias

### Fase 4

Integração com IA

### Fase 5

Chat interativo

### Fase 6

Sistema premium

### Fase 7

Deploy e lançamento

---

## Licença

Proprietary.

Todos os direitos reservados.
