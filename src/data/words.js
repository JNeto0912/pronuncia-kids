// src/data/words.js

export const WORDS = [
  // --- CATEGORIA: ANIMAIS ---
  {
    id: 'cachorro',
    palavra: 'CACHORRO',
    categoria: 'animais',
    imagemUrl: '/imagens/cachorro.png',
    regrasErro: [
      {
        erro: 'tatorro',
        ipaCorreto: '/kaˈʃoʁu/',
        ipaErro: '/taˈtoʁu/',
        processo: 'Harmonia Consonantal / Anteriorização',
        descricao: 'Substituição do /k/ por /t/ na sílaba inicial por influência da sílaba seguinte.',
        idadeEsperada: 'até 3:0',
      },
      {
        erro: 'caaro',
        ipaCorreto: '/kaˈʃoʁu/',
        ipaErro: '/kaˈaʁu/',
        processo: 'Omissão de Fricativa',
        descricao: 'Omissão da sílaba medial /ʃo/.',
        idadeEsperada: 'até 3:0',
      },
      {
        erro: 'cacolo',
        ipaCorreto: '/kaˈʃoʁu/',
        ipaErro: '/kaˈkolu/',
        processo: 'Simplificação de Líquida / Posteriorização',
        descricao: 'Substituição da vibrante /ʁ/ pela lateral /l/ e fricativa /ʃ/ por oclusiva /k/.',
        idadeEsperada: 'até 4:0',
      },
    ],
  },
  {
    id: 'gato',
    palavra: 'GATO',
    categoria: 'animais',
    imagemUrl: '/imagens/gato.png',
    regrasErro: [
      {
        erro: 'dato',
        ipaCorreto: '/ˈgatu/',
        ipaErro: '/ˈdatu/',
        processo: 'Anteriorização',
        descricao: 'Troca de /g/ (velar) por /d/ (alveolar).',
        idadeEsperada: 'até 3:0',
      },
      {
        erro: 'gao',
        ipaCorreto: '/ˈgatu/',
        ipaErro: '/ˈgaw/',
        processo: 'Omissão de Consoante',
        descricao: 'Omissão do /t/ na sílaba final.',
        idadeEsperada: 'até 2:6',
      },
    ],
  },
  {
    id: 'pato',
    palavra: 'PATO',
    categoria: 'animais',
    imagemUrl: '/imagens/pato.png',
    regrasErro: [
      {
        erro: 'bato',
        ipaCorreto: '/ˈpatu/',
        ipaErro: '/ˈbatu/',
        processo: 'Sonorização',
        descricao: 'Troca da consoante surda /p/ pela sonora /b/.',
        idadeEsperada: 'até 2:6',
      },
    ],
  },
  {
    id: 'rato',
    palavra: 'RATO',
    categoria: 'animais',
    imagemUrl: '/imagens/rato.png',
    regrasErro: [
      {
        erro: 'lato',
        ipaCorreto: '/ˈʁatu/',
        ipaErro: '/ˈlatu/',
        processo: 'Simplificação de Líquida',
        descricao: 'Substituição da vibrante /ʁ/ pela lateral /l/.',
        idadeEsperada: 'até 4:0',
      },
      {
        erro: 'ato',
        ipaCorreto: '/ˈʁatu/',
        ipaErro: '/ˈatu/',
        processo: 'Omissão de Consoante',
        descricao: 'Omissão do /ʁ/ inicial.',
        idadeEsperada: 'até 3:0',
      },
    ],
  },
  {
    id: 'vaca',
    palavra: 'VACA',
    categoria: 'animais',
    imagemUrl: '/imagens/vaca.png',
    regrasErro: [
      {
        erro: 'baca',
        ipaCorreto: '/ˈvakɐ/',
        ipaErro: '/ˈbakɐ/',
        processo: 'Oclusivização',
        descricao: 'Troca da fricativa /v/ pela oclusiva /b/.',
        idadeEsperada: 'até 3:0',
      },
      {
        erro: 'faca',
        ipaCorreto: '/ˈvakɐ/',
        ipaErro: '/ˈfakɐ/',
        processo: 'Ensurdecimento',
        descricao: 'Troca da sonora /v/ pela surda /f/.',
        idadeEsperada: 'até 3:0',
      },
    ],
  },
  {
    id: 'jacare',
    palavra: 'JACARÉ',
    categoria: 'animais',
    imagemUrl: '/imagens/jacare.png',
    regrasErro: [
      {
        erro: 'dacale',
        ipaCorreto: '/ʒakaˈɾɛ/',
        ipaErro: '/dakaˈlɛ/',
        processo: 'Oclusivização e Simplificação de Líquida',
        descricao: 'Troca de /ʒ/ por /d/ e /ɾ/ por /l/.',
        idadeEsperada: 'até 4:0',
      },
      {
        erro: 'zacale',
        ipaCorreto: '/ʒakaˈɾɛ/',
        ipaErro: '/zakaˈlɛ/',
        processo: 'Substituição de Fricativa e Líquida',
        descricao: 'Troca de /ʒ/ por /z/ e /ɾ/ por /l/.',
        idadeEsperada: 'até 4:0',
      },
    ],
  },

  // --- CATEGORIA: COMIDAS ---
  {
    id: 'maca',
    palavra: 'MAÇÃ',
    categoria: 'comidas',
    imagemUrl: '/imagens/maca.png',
    regrasErro: [
      {
        erro: 'masa',
        ipaCorreto: '/maˈsɐ̃/',
        ipaErro: '/ˈmasa/',
        processo: 'Desnasalização',
        descricao: 'Perda da característica nasal da vogal final.',
        idadeEsperada: 'até 3:0',
      },
      {
        erro: 'maca',
        ipaCorreto: '/maˈsɐ̃/',
        ipaErro: '/ˈmaka/',
        processo: 'Oclusivização',
        descricao: 'Troca da fricativa /s/ pela oclusiva /k/.',
        idadeEsperada: 'até 3:0',
      },
    ],
  },
  {
    id: 'banana',
    palavra: 'BANANA',
    categoria: 'comidas',
    imagemUrl: '/imagens/banana.png',
    regrasErro: [
      {
        erro: 'nanana',
        ipaCorreto: '/baˈnɐ̃nɐ/',
        ipaErro: '/naˈnɐ̃nɐ/',
        processo: 'Redução de Sílaba / Harmonia',
        descricao: 'Omissão ou substituição da sílaba inicial átona.',
        idadeEsperada: 'até 3:0',
      },
    ],
  },
  {
    id: 'suco',
    palavra: 'SUCO',
    categoria: 'comidas',
    imagemUrl: '/imagens/suco.png',
    regrasErro: [
      {
        erro: 'tuco',
        ipaCorreto: '/ˈsuku/',
        ipaErro: '/ˈtuku/',
        processo: 'Oclusivização',
        descricao: 'Troca da fricativa /s/ pela oclusiva /t/.',
        idadeEsperada: 'até 3:0',
      },
    ],
  },
  {
    id: 'sorvete',
    palavra: 'SORVETE',
    categoria: 'comidas',
    imagemUrl: '/imagens/sorvete.png',
    regrasErro: [
      {
        erro: 'sovete',
        ipaCorreto: '/soʁˈvete/',
        ipaErro: '/soˈvete/',
        processo: 'Omissão de Consoante Final (Coda)',
        descricao: 'Omissão do /ʁ/ no final da sílaba.',
        idadeEsperada: 'até 3:6',
      },
      {
        erro: 'tovete',
        ipaCorreto: '/soʁˈvete/',
        ipaErro: '/toˈvete/',
        processo: 'Oclusivização e Omissão',
        descricao: 'Troca de /s/ por /t/ e omissão do /ʁ/.',
        idadeEsperada: 'até 3:0',
      },
    ],
  },

  // --- CATEGORIA: BRINQUEDOS ---
  {
    id: 'bola',
    palavra: 'BOLA',
    categoria: 'brinquedos',
    imagemUrl: '/imagens/bola.png',
    regrasErro: [
      {
        erro: 'boa',
        ipaCorreto: '/ˈbɔlɐ/',
        ipaErro: '/ˈbɔa/',
        processo: 'Omissão de Líquida',
        descricao: 'Omissão do fonema lateral /l/.',
        idadeEsperada: 'até 3:0',
      },
    ],
  },
  {
    id: 'carro',
    palavra: 'CARRO',
    categoria: 'brinquedos',
    imagemUrl: '/imagens/carro.png',
    regrasErro: [
      {
        erro: 'calo',
        ipaCorreto: '/ˈkaʁu/',
        ipaErro: '/ˈkalu/',
        processo: 'Simplificação de Líquida',
        descricao: 'Substituição da vibrante forte /ʁ/ pela lateral /l/.',
        idadeEsperada: 'até 4:0',
      },
    ],
  },
  {
    id: 'trem',
    palavra: 'TREM',
    categoria: 'brinquedos',
    imagemUrl: '/imagens/trem.png',
    regrasErro: [
      {
        erro: 'tem',
        ipaCorreto: '/ˈtɾẽj/',
        ipaErro: '/ˈtẽj/',
        processo: 'Simplificação de Encontro Consonantal',
        descricao: 'Omissão da líquida /ɾ/ no encontro consonantal.',
        idadeEsperada: 'até 5:0',
      },
    ],
  },

  // --- CATEGORIA: CASA ---
  {
    id: 'mesa',
    palavra: 'MESA',
    categoria: 'casa',
    imagemUrl: '/imagens/mesa.png',
    regrasErro: [
      {
        erro: 'meda',
        ipaCorreto: '/ˈmezɐ/',
        ipaErro: '/ˈmedɐ/',
        processo: 'Oclusivização',
        descricao: 'Troca da fricativa sonora /z/ pela oclusiva /d/.',
        idadeEsperada: 'até 3:0',
      },
    ],
  },
  {
    id: 'porta',
    palavra: 'PORTA',
    categoria: 'casa',
    imagemUrl: '/imagens/porta.png',
    regrasErro: [
      {
        erro: 'pota',
        ipaCorreto: '/ˈpɔʁtɐ/',
        ipaErro: '/ˈpɔtɐ/',
        processo: 'Omissão de Consoante Final (Coda)',
        descricao: 'Omissão do /ʁ/ medial (arquifonema R).',
        idadeEsperada: 'até 3:6',
      },
    ],
  },
  {
    id: 'prato',
    palavra: 'PRATO',
    categoria: 'casa',
    imagemUrl: '/imagens/prato.png',
    regrasErro: [
      {
        erro: 'pato',
        ipaCorreto: '/ˈpɾatu/',
        ipaErro: '/ˈpatu/',
        processo: 'Simplificação de Encontro Consonantal',
        descricao: 'Omissão do /ɾ/ no encontro /pɾ/.',
        idadeEsperada: 'até 5:0',
      },
      {
        erro: 'plato',
        ipaCorreto: '/ˈpɾatu/',
        ipaErro: '/ˈplatu/',
        processo: 'Substituição no Encontro Consonantal',
        descricao: 'Troca de /ɾ/ por /l/ dentro do encontro.',
        idadeEsperada: 'até 5:0',
      },
    ],
  },
];