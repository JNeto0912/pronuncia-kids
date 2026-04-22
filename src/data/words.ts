// src/data/words.js

// Tipos de processos fonológicos – ajuste os nomes conforme a tabela da fono
// (Em JavaScript puro, não usamos 'export type', mas sim comentários para documentar)
/*
export type ProcessoFonologico =
  | 'Substituição de fonema'
  | 'Simplificação de encontro consonantal'
  | 'Redução de sílaba'
  | 'Outros';

export type RegraErro = {
  erro: string;              // como a criança costuma falar (transcrição simples)
  processo: ProcessoFonologico;
  descricao: string;         // explicação para fono
  idadeEsperada: string;     // ex.: 'até 4:0', 'até 5:6'
};

export type PalavraTreino = {
  id: string; // usado no código (chave)
  palavra: string; // como aparece para a criança
  categoria: 'animais' | 'comidas' | 'brinquedos' | 'casa';
  regrasErro?: RegraErro[]; // opcional, pode não ter ainda
};
*/

export const WORDS = [
  {
    id: 'cachorro',
    palavra: 'cachorro',
    categoria: 'animais',
    regrasErro: [
      {
        erro: 'tatorro',
        processo: 'Substituição de fonema',
        descricao: 'Substituição do /k/ por /t/ na sílaba inicial em “cachorro”.',
        idadeEsperada: 'até 4:0',
      },
      {
        erro: 'caaro',
        processo: 'Redução de sílaba',
        descricao: 'Omissão da sílaba medial em “cachorro” (redução de trissílaba).',
        idadeEsperada: 'até 3:6',
      },
    ],
  },
  {
    id: 'gato',
    palavra: 'gato',
    categoria: 'animais',
    regrasErro: [
      {
        erro: 'dato',
        processo: 'Substituição de fonema',
        descricao: 'Substituição do som /g/ por /d/ em posição inicial.',
        idadeEsperada: 'até 4:0',
      },
      {
        erro: 'gao',
        processo: 'Redução de sílaba',
        descricao: 'Omissão da consoante final /t/ em “gato”.',
        idadeEsperada: 'até 3:0',
      },
    ],
  },
  {
    id: 'pato',
    palavra: 'pato',
    categoria: 'animais',
    regrasErro: [
      {
        erro: 'fato',
        processo: 'Substituição de fonema',
        descricao: 'Troca de /p/ por /f/ em posição inicial.',
        idadeEsperada: 'até 4:0',
      },
      {
        erro: 'pao',
        processo: 'Redução de sílaba',
        descricao: 'Omissão da consoante final /t/ em “pato”.',
        idadeEsperada: 'até 3:0',
      },
    ],
  },
  {
    id: 'vaca',
    palavra: 'vaca',
    categoria: 'animais',
    regrasErro: [
      {
        erro: 'faca',
        processo: 'Substituição de fonema',
        descricao: 'Substituição do /v/ por /f/ em posição inicial.',
        idadeEsperada: 'até 4:0',
      },
      {
        erro: 'vaa',
        processo: 'Redução de sílaba',
        descricao: 'Omissão da consoante final /k/ em “vaca”.',
        idadeEsperada: 'até 3:0',
      },
    ],
  },
  {
    id: 'maca',
    palavra: 'maçã',
    categoria: 'comidas',
    regrasErro: [
      {
        erro: 'masa',
        processo: 'Substituição de fonema',
        descricao: 'Substituição do som /s̃/ por /s/ simples em “maçã”.',
        idadeEsperada: 'até 4:6',
      },
      {
        erro: 'maa',
        processo: 'Redução de sílaba',
        descricao: 'Simplificação da sílaba final nasalizada.',
        idadeEsperada: 'até 3:6',
      },
    ],
  },
  {
    id: 'banana',
    palavra: 'banana',
    categoria: 'comidas',
    regrasErro: [
      {
        erro: 'anana',
        processo: 'Redução de sílaba',
        descricao: 'Omissão da sílaba inicial em “banana”.',
        idadeEsperada: 'até 3:0',
      },
      {
        erro: 'baba',
        processo: 'Redução de sílaba',
        descricao: 'Redução de trissílaba para dissílaba, com repetição da sílaba inicial.',
        idadeEsperada: 'até 3:0',
      },
    ],
  },
  // Adicione mais palavras aqui seguindo o mesmo padrão
];