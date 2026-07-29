// src/data/symbols.js

// Slots da frase
export const AAC_SLOTS = ["quem", "verbo", "complemento"];

// Contextos principais
export const AAC_CONTEXTS = [
  { id: "geral", label: "Geral", emoji: "🏠" },
  { id: "terapia", label: "Terapia", emoji: "🎧" },
  { id: "casa", label: "Casa", emoji: "🏡" },
  { id: "escola", label: "Escola", emoji: "🏫" },
];

// Categorias visuais
export const AAC_CATEGORIES = [
  { id: "quem", label: "Quem?", emoji: "👤" },
  { id: "verbo", label: "Ação", emoji: "⚙️" },
  { id: "sentimentos", label: "Sentimentos", emoji: "💖" },
  { id: "necessidades", label: "Necessidades", emoji: "🧩" },
  { id: "acoes", label: "Brincar / Fazer", emoji: "🏃" },
  { id: "alimentos", label: "Comer / Beber", emoji: "🍎" },
  { id: "pessoas", label: "Pessoas", emoji: "👨‍👩‍👧" },
];

// Atalhos clínicos fundamentais (sempre com figura/emoji)
export const AAC_ATALHOS = [
  // Regulação geral
  {
    id: "nao_entendi",
    label: "Não entendi",
    fala: "Eu não entendi",
    emoji: "❓",
    contexto: "geral",
  },
  {
    id: "quero_parar",
    label: "Quero parar",
    fala: "Eu quero parar",
    emoji: "⏹️",
    contexto: "geral",
  },
  {
    id: "quero_pausa",
    label: "Quero pausa",
    fala: "Eu quero uma pausa",
    emoji: "⏸️",
    contexto: "geral",
  },
  {
    id: "quero_ajuda",
    label: "Quero ajuda",
    fala: "Eu preciso de ajuda",
    emoji: "🆘",
    contexto: "geral",
  },
  {
    id: "nao_quero_isso",
    label: "Não quero isso",
    fala: "Eu não quero isso",
    emoji: "🙅",
    contexto: "geral",
  },

  // Sensações / ambiente
  {
    id: "muito_barulho",
    label: "Muito barulho",
    fala: "Está muito barulho",
    emoji: "🔊",
    contexto: "geral",
  },
  {
    id: "muita_luz",
    label: "Muita luz",
    fala: "Está muita luz",
    emoji: "💡",
    contexto: "geral",
  },
  {
    id: "estou_cansado",
    label: "Estou cansado",
    fala: "Eu estou cansado",
    emoji: "😴",
    contexto: "geral",
  },

  // Emoções
  {
    id: "estou_nervoso",
    label: "Estou nervoso",
    fala: "Eu estou nervoso",
    emoji: "😠",
    contexto: "geral",
  },
  {
    id: "estou_com_medo",
    label: "Estou com medo",
    fala: "Eu estou com medo",
    emoji: "😨",
    contexto: "geral",
  },
  {
    id: "estou_triste",
    label: "Estou triste",
    fala: "Eu estou triste",
    emoji: "😢",
    contexto: "geral",
  },
  {
    id: "estou_feliz",
    label: "Estou feliz",
    fala: "Eu estou feliz",
    emoji: "😊",
    contexto: "geral",
  },

  // Dor
  {
    id: "estou_com_dor",
    label: "Estou com dor",
    fala: "Eu estou com dor",
    emoji: "🤕",
    contexto: "geral",
  },

  // Terapia
  {
    id: "esta_dificil",
    label: "Está difícil",
    fala: "Está difícil",
    emoji: "🧩",
    contexto: "terapia",
  },
  {
    id: "nao_consigo",
    label: "Não consigo",
    fala: "Eu não consigo",
    emoji: "😣",
    contexto: "terapia",
  },
];

// Símbolos de frase (quem + verbo + complemento) por contexto
export const AAC_SYMBOLS = [
  // QUEM (geral)
  {
    id: "eu",
    contexto: "geral",
    categoria: "quem",
    slot: "quem",
    texto: "eu",
    fala: "Eu",
    emoji: "🧒",
  },
  {
    id: "voce",
    contexto: "geral",
    categoria: "quem",
    slot: "quem",
    texto: "você",
    fala: "Você",
    emoji: "👉",
  },
  {
    id: "ele",
    contexto: "geral",
    categoria: "quem",
    slot: "quem",
    texto: "ele",
    fala: "Ele",
    emoji: "👦",
  },
  {
    id: "ela",
    contexto: "geral",
    categoria: "quem",
    slot: "quem",
    texto: "ela",
    fala: "Ela",
    emoji: "👧",
  },
  {
    id: "nos",
    contexto: "geral",
    categoria: "quem",
    slot: "quem",
    texto: "nós",
    fala: "Nós",
    emoji: "👨‍👩‍👧",
  },

  // VERBOS (geral)
  {
    id: "quero",
    contexto: "geral",
    categoria: "verbo",
    slot: "verbo",
    texto: "quero",
    fala: "quero",
    emoji: "✨",
  },
  {
    id: "gosto",
    contexto: "geral",
    categoria: "verbo",
    slot: "verbo",
    texto: "gosto de",
    fala: "gosto de",
    emoji: "💙",
  },
  {
    id: "vou",
    contexto: "geral",
    categoria: "verbo",
    slot: "verbo",
    texto: "vou",
    fala: "vou",
    emoji: "➡️",
  },
  {
    id: "estou",
    contexto: "geral",
    categoria: "verbo",
    slot: "verbo",
    texto: "estou",
    fala: "estou",
    emoji: "📍",
  },

  // SENTIMENTOS (como complementos)
  {
    id: "feliz",
    contexto: "geral",
    categoria: "sentimentos",
    slot: "complemento",
    texto: "feliz",
    fala: "feliz",
    emoji: "😊",
  },
  {
    id: "triste",
    contexto: "geral",
    categoria: "sentimentos",
    slot: "complemento",
    texto: "triste",
    fala: "triste",
    emoji: "😢",
  },
  {
    id: "bravo",
    contexto: "geral",
    categoria: "sentimentos",
    slot: "complemento",
    texto: "bravo",
    fala: "bravo",
    emoji: "😠",
  },
  {
    id: "com_medo",
    contexto: "geral",
    categoria: "sentimentos",
    slot: "complemento",
    texto: "com medo",
    fala: "com medo",
    emoji: "😨",
  },

  // NECESSIDADES
  {
    id: "banheiro",
    contexto: "geral",
    categoria: "necessidades",
    slot: "complemento",
    texto: "ir ao banheiro",
    fala: "ir ao banheiro",
    emoji: "🚻",
  },
  {
    id: "agua",
    contexto: "geral",
    categoria: "necessidades",
    slot: "complemento",
    texto: "água",
    fala: "água",
    emoji: "💧",
  },
  {
    id: "descansar",
    contexto: "geral",
    categoria: "necessidades",
    slot: "complemento",
    texto: "descansar",
    fala: "descansar",
    emoji: "🛌",
  },
  {
    id: "dor",
    contexto: "geral",
    categoria: "necessidades",
    slot: "complemento",
    texto: "com dor",
    fala: "com dor",
    emoji: "🤕",
  },

  // AÇÕES
  {
    id: "brincar",
    contexto: "geral",
    categoria: "acoes",
    slot: "complemento",
    texto: "brincar",
    fala: "brincar",
    emoji: "🧸",
  },
  {
    id: "sair",
    contexto: "geral",
    categoria: "acoes",
    slot: "complemento",
    texto: "sair",
    fala: "sair",
    emoji: "🚪",
  },
  {
    id: "ouvir_musica",
    contexto: "geral",
    categoria: "acoes",
    slot: "complemento",
    texto: "ouvir música",
    fala: "ouvir música",
    emoji: "🎵",
  },
  {
    id: "assistir_tv",
    contexto: "geral",
    categoria: "acoes",
    slot: "complemento",
    texto: "assistir TV",
    fala: "assistir TV",
    emoji: "📺",
  },

  // ALIMENTOS
  {
    id: "comer",
    contexto: "geral",
    categoria: "alimentos",
    slot: "complemento",
    texto: "comer",
    fala: "comer",
    emoji: "🍽️",
  },
  {
    id: "suco",
    contexto: "geral",
    categoria: "alimentos",
    slot: "complemento",
    texto: "suco",
    fala: "suco",
    emoji: "🥤",
  },
  {
    id: "fruta",
    contexto: "geral",
    categoria: "alimentos",
    slot: "complemento",
    texto: "fruta",
    fala: "fruta",
    emoji: "🍌",
  },
  {
    id: "biscoito",
    contexto: "geral",
    categoria: "alimentos",
    slot: "complemento",
    texto: "biscoito",
    fala: "biscoito",
    emoji: "🍪",
  },

  // PESSOAS
  {
    id: "mae",
    contexto: "geral",
    categoria: "pessoas",
    slot: "complemento",
    texto: "a mamãe",
    fala: "a mamãe",
    emoji: "👩",
  },
  {
    id: "pai",
    contexto: "geral",
    categoria: "pessoas",
    slot: "complemento",
    texto: "o papai",
    fala: "o papai",
    emoji: "👨",
  },
  {
    id: "professora",
    contexto: "geral",
    categoria: "pessoas",
    slot: "complemento",
    texto: "a professora",
    fala: "a professora",
    emoji: "👩‍🏫",
  },

  // Alguns exemplos extras só para contexto TERAPIA
  {
    id: "brincar_terapia",
    contexto: "terapia",
    categoria: "acoes",
    slot: "complemento",
    texto: "brincar aqui",
    fala: "brincar na terapia",
    emoji: "🧸",
  },
  {
    id: "atividade_dificil",
    contexto: "terapia",
    categoria: "necessidades",
    slot: "complemento",
    texto: "atividade difícil",
    fala: "a atividade está difícil",
    emoji: "🧩",
  },
];