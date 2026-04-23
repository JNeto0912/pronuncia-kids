// src/data/words.js

export const WORDS = [
  // --- CATEGORIA: ANIMAIS ---
  {
    id: 'cachorro',
    palavra: 'CACHORRO',
    categoria: 'animais',
    imagemUrl: '/imagens/cachorro.png', // Adicionado!
    regrasErro: [
      {
        erro: 'tatorro',
        ipaCorreto: '/kaˈʃoʁu/',
        ipaErro: '/taˈtoʁu/',
        processo: 'Substituição de fonema',
        descricao: 'Substituição do /k/ por /t/ na sílaba inicial.',
        idadeEsperada: 'até 4:0',
      },
      {
        erro: 'caaro',
        ipaCorreto: '/kaˈʃoʁu/',
        ipaErro: '/kaˈaʁu/',
        processo: 'Redução de sílaba',
        descricao: 'Omissão da sílaba medial.',
        idadeEsperada: 'até 3:6',
      },
    ],
  },
  {
    id: 'gato',
    palavra: 'GATO',
    categoria: 'animais',
    imagemUrl: '/imagens/gato.png', // Adicionado!
    regrasErro: [
      {
        erro: 'dato',
        ipaCorreto: '/ˈgatu/',
        ipaErro: '/ˈdatu/',
        processo: 'Substituição de fonema',
        descricao: 'Troca de /g/ por /d/.',
        idadeEsperada: 'até 4:0',
      },
      {
        erro: 'gao',
        ipaCorreto: '/ˈgatu/',
        ipaErro: '/ˈgaw/',
        processo: 'Omissão de consoante',
        descricao: 'Omissão do /t/.',
        idadeEsperada: 'até 3:0',
      },
    ],
  },
  {
    id: 'pato',
    palavra: 'PATO',
    categoria: 'animais',
    imagemUrl: '/imagens/pato.png', // Adicionado!
    regrasErro: [
      {
        erro: 'bato',
        ipaCorreto: '/ˈpatu/',
        ipaErro: '/ˈbatu/',
        processo: 'Sonorização',
        descricao: 'Troca de /p/ por /b/.',
        idadeEsperada: 'até 3:6',
      },
      {
        erro: 'pao',
        ipaCorreto: '/ˈpatu/',
        ipaErro: '/ˈpaw/',
        processo: 'Omissão',
        descricao: 'Omissão do /t/.',
        idadeEsperada: 'até 3:0',
      },
    ],
  },
  {
    id: 'rato',
    palavra: 'RATO',
    categoria: 'animais',
    imagemUrl: '/imagens/rato.png', // Adicionado!
    regrasErro: [
      {
        erro: 'lato',
        ipaCorreto: '/ˈʁatu/',
        ipaErro: '/ˈlatu/',
        processo: 'Substituição de líquida',
        descricao: 'Troca de /ʁ/ por /l/.',
        idadeEsperada: 'até 4:0',
      },
      {
        erro: 'ato',
        ipaCorreto: '/ˈʁatu/',
        ipaErro: '/ˈatu/',
        processo: 'Omissão',
        descricao: 'Omissão do /ʁ/.',
        idadeEsperada: 'até 3:0',
      },
    ],
  },
  {
    id: 'vaca',
    palavra: 'VACA',
    categoria: 'animais',
    imagemUrl: '/imagens/vaca.png', // Adicionado!
    regrasErro: [
      {
        erro: 'baca',
        ipaCorreto: '/ˈvakɐ/',
        ipaErro: '/ˈbakɐ/',
        processo: 'Substituição',
        descricao: 'Troca de /v/ por /b/.',
        idadeEsperada: 'até 3:6',
      },
      {
        erro: 'aca',
        ipaCorreto: '/ˈvakɐ/',
        ipaErro: '/ˈakɐ/',
        processo: 'Omissão',
        descricao: 'Omissão do /v/.',
        idadeEsperada: 'até 3:0',
      },
    ],
  },

  // --- COMIDAS ---
  {
    id: 'maca',
    palavra: 'MAÇÃ',
    categoria: 'comidas',
    imagemUrl: '/imagens/maca.png', // Adicionado!
    regrasErro: [
      {
        erro: 'masa',
        ipaCorreto: '/maˈsɐ̃/',
        ipaErro: '/ˈmasa/',
        processo: 'Desnasalização',
        descricao: 'Perda da nasalidade.',
        idadeEsperada: 'até 4:6',
      },
      {
        erro: 'maa',
        ipaCorreto: '/maˈsɐ̃/',
        ipaErro: '/ˈma.a/',
        processo: 'Redução',
        descricao: 'Simplificação da sílaba final.',
        idadeEsperada: 'até 3:6',
      },
    ],
  },
  {
    id: 'banana',
    palavra: 'BANANA',
    categoria: 'comidas',
    imagemUrl: '/imagens/banana.png', // Adicionado!
    regrasErro: [
      {
        erro: 'anana',
        ipaCorreto: '/baˈnɐ̃nɐ/',
        ipaErro: '/aˈnɐ̃nɐ/',
        processo: 'Omissão',
        descricao: 'Omissão da sílaba inicial.',
        idadeEsperada: 'até 3:0',
      },
      {
        erro: 'baba',
        ipaCorreto: '/baˈnɐ̃nɐ/',
        ipaErro: '/ˈbaba/',
        processo: 'Redução',
        descricao: 'Simplificação silábica.',
        idadeEsperada: 'até 3:0',
      },
    ],
  },
  {
    id: 'suco',
    palavra: 'SUCO',
    categoria: 'comidas',
    imagemUrl: '/imagens/suco.png', // Adicionado!
    regrasErro: [
      {
        erro: 'tuco',
        ipaCorreto: '/ˈsuku/',
        ipaErro: '/ˈtuku/',
        processo: 'Substituição',
        descricao: 'Troca de /s/ por /t/.',
        idadeEsperada: 'até 4:0',
      },
      {
        erro: 'suo',
        ipaCorreto: '/ˈsuku/',
        ipaErro: '/ˈsuo/',
        processo: 'Omissão',
        descricao: 'Omissão do /k/.',
        idadeEsperada: 'até 3:0',
      },
    ],
  },

  // --- BRINQUEDOS ---
  {
    id: 'bola',
    palavra: 'BOLA',
    categoria: 'brinquedos',
    imagemUrl: '/imagens/bola.png', // Adicionado!
    regrasErro: [
      {
        erro: 'boa',
        ipaCorreto: '/ˈbɔlɐ/',
        ipaErro: '/ˈbɔa/',
        processo: 'Omissão de líquida',
        descricao: 'Omissão do /l/.',
        idadeEsperada: 'até 3:0',
      },
      {
        erro: 'dola',
        ipaCorreto: '/ˈbɔlɐ/',
        ipaErro: '/ˈdɔlɐ/',
        processo: 'Substituição',
        descricao: 'Troca de /b/ por /d/.',
        idadeEsperada: 'até 3:6',
      },
    ],
  },

  // --- CASA ---
  {
    id: 'mesa',
    palavra: 'MESA',
    categoria: 'casa',
    imagemUrl: '/imagens/mesa.png', // Adicionado!
    regrasErro: [
      {
        erro: 'mea',
        ipaCorreto: '/ˈmezɐ/',
        ipaErro: '/ˈmea/',
        processo: 'Omissão',
        descricao: 'Omissão do /z/.',
        idadeEsperada: 'até 3:0',
      },
    ],
  },
];