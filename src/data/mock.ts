export type Character = {
  id: string
  name: string
  short?: string
  color: string
  voz?: string
  bio?: string
}

export type Story = {
  id: string
  authorId: string
  title: string
  premise: string
  fandom: string
  fandomLabel: string
  cover: string
  coverEmoji: string
  rating: 'geral' | 'teen' | 'adult'
  tags: string[]
  cast: Character[]
  tone: string
  turns: number
  last?: string
  lastSeen?: string
}

export type Author = {
  id: string
  name: string
  handle: string
  color: string
  verified: boolean
  followers: number
  following: number
  bio: string
  stories: number
}

export type Fandom = { id: string; name: string; emoji: string }

export type Tone = { id: string; label: string; sub: string; sample: string }

export const FANDOMS: Fandom[] = [
  { id: 'hp',     name: 'Harry Potter', emoji: '⚡' },
  { id: 'kpop',   name: 'K-pop',        emoji: '✦' },
  { id: 'marvel', name: 'Marvel',       emoji: '🕷' },
  { id: 'anime',  name: 'Animes',       emoji: '🌸' },
  { id: 'dc',     name: 'DC',           emoji: '🦇' },
  { id: 'rl',     name: 'Real Life',    emoji: '💫' },
]

export const TONES: Tone[] = [
  { id: 'tension', label: 'Tensão',   sub: 'Dark romance · atmosférico', sample: 'Ele não se move. Não precisa. A distância entre vocês já diz tudo que ele quer que você entenda.' },
  { id: 'dialog',  label: 'Diálogos', sub: 'Natural · fluido',           sample: '— Você de novo — ele diz, sem surpresa. Você sorri apesar de si mesma.' },
  { id: 'fluff',   label: 'Fluff',    sub: 'Leve · fofo',                sample: 'Ele tenta esconder o sorriso. Fica óbvio demais. Você finge não ver.' },
  { id: 'chat',    label: 'Chatfic',  sub: 'Mensagens · informal',       sample: 'draco_m: oi\nvocê: ??\ndraco_m: só testando se esse número é real' },
  { id: 'action',  label: 'Ação',     sub: 'Aventura · intenso',         sample: 'Não há tempo pra pensar. Você corre. Ele corre junto.' },
]

export const AUTHORS: Record<string, Author> = {
  bea: { id: 'bea', name: 'Beatriz Sol',  handle: '@beabsol',  color: '#f59e0b', verified: true,  followers: 28000, following: 88,  bio: 'hp era. draco forever. sem arrependimentos.',      stories: 14 },
  mari: { id: 'mari', name: 'Mariana K.',  handle: '@marik',    color: '#0ea5e9', verified: false, followers: 3800,  following: 410, bio: 'amo BTS e não me arrependo ✦',                     stories: 3  },
  luna: { id: 'luna', name: 'Luna Vega',   handle: '@lunavega', color: '#7c3aed', verified: true,  followers: 12400, following: 203, bio: 'escritora de dark romance e slow burn ☾ ela/dela', stories: 8  },
}

export const ME: Author = {
  id: 'me', name: 'Você', handle: '@voce', color: '#E8315A',
  verified: false, followers: 0, following: 0, bio: '', stories: 0,
}

export const STORIES: Story[] = [
  {
    id: 's1', authorId: 'bea',
    title: 'O Corredor da Ala Leste',
    premise: 'Você e Draco Malfoy ficam presos no castelo durante uma tempestade. Ele não é o que você pensava — ou talvez seja, e é isso que assusta.',
    fandom: 'hp', fandomLabel: 'Harry Potter',
    cover: 'linear-gradient(135deg, #1a0533 0%, #2d1060 50%, #0f0520 100%)',
    coverEmoji: '⚡', rating: 'teen',
    tags: ['#dracomalfoy', '#slowburn', '#darkromance', '#hogwarts'],
    tone: 'tension', turns: 24,
    last: 'Ele se apoia na parede, te olhando como se você fosse um problema que ele ainda não sabe resolver.',
    lastSeen: 'há 2h',
    cast: [
      { id: 'draco', name: 'Draco Malfoy', short: 'DM', color: '#4a4a6a', voz: 'irônico, distante, mas atento', bio: 'Prefeito da Sonserina. Mais complexo do que aparenta.' },
      { id: 'luna',  name: 'Luna Lovegood', short: 'LL', color: '#7c6fa0', voz: 'suave, surreal, sábia',         bio: 'Aparece quando você menos espera.' },
    ],
  },
  {
    id: 's2', authorId: 'mari',
    title: 'Last Train to Seoul',
    premise: 'Você encontra um idol da sua banda favorita no metrô de Seul às 2h da manhã. Nenhum dos dois deveria estar ali.',
    fandom: 'kpop', fandomLabel: 'K-pop',
    cover: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0c0a1e 100%)',
    coverEmoji: '✦', rating: 'teen',
    tags: ['#idol', '#kpop', '#chatfic', '#encontroreallife'],
    tone: 'chat', turns: 0,
    cast: [
      { id: 'j', name: 'Jay', short: 'JY', color: '#3b82f6', voz: 'casual, tímido online, diferente pessoalmente', bio: 'Parece cansado.' },
    ],
  },
  {
    id: 's3', authorId: 'luna',
    title: 'Nenhum Herói Aqui',
    premise: 'Você trabalha no Stark Tower e Peter Parker nunca deveria ter entrado no arquivo errado.',
    fandom: 'marvel', fandomLabel: 'Marvel',
    cover: 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 50%, #1c0202 100%)',
    coverEmoji: '🕷', rating: 'teen',
    tags: ['#peterparker', '#starktower', '#slowburn'],
    tone: 'dialog', turns: 7,
    last: 'Ele tentou não parecer nervoso. Não funcionou.',
    lastSeen: 'ontem',
    cast: [
      { id: 'peter', name: 'Peter Parker', short: 'PP', color: '#dc2626', voz: 'ansioso, engraçado, honesto demais', bio: 'Estagiário. Herói. Desastre.' },
      { id: 'tony',  name: 'Tony Stark',   short: 'TS', color: '#f59e0b', voz: 'sarcástico, protetor',             bio: 'Aparece quando complica.' },
    ],
  },
  {
    id: 's4', authorId: 'bea',
    title: 'Flor de Cerejeira',
    premise: 'Transfer para o Japão. Novo colégio. E o garoto mais quieto da turma que de alguma forma sempre aparece quando você está perdida.',
    fandom: 'anime', fandomLabel: 'Anime',
    cover: 'linear-gradient(135deg, #0c0c0c 0%, #1a0a1a 50%, #2d1040 100%)',
    coverEmoji: '🌸', rating: 'geral',
    tags: ['#romance', '#slice-of-life', '#fluff', '#escola'],
    tone: 'fluff', turns: 0,
    cast: [
      { id: 'ren', name: 'Ren', short: 'RN', color: '#8b5cf6', voz: 'quieto, observador, surpreendente', bio: 'Parece frio. Não é.' },
    ],
  },
]

export const RESUMING = ['s1', 's3']