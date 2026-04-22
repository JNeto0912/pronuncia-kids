import { useState, useEffect } from "react";
import "./App.css";

const SCREEN = {
  HOME: "HOME",
  CATEGORIES: "CATEGORIES",
  TRAINING: "TRAINING",
};

// Processos fonológicos baseados na tabela (reintroduzido do seu App.jsx anterior)
const PROCESSOS_FONOLOGICOS = [
  {
    id: "reducao_silaba",
    nome: "Redução de sílaba",
    definicao: "Uma das sílabas da palavra é omitida.",
    idadeLimite: "2 anos e 6 meses",
  },
  {
    id: "harmonia_consonantal",
    nome: "Harmonia consonantal",
    definicao:
      "Um fonema da palavra é produzido com algum traço distintivo (ponto, modo ou vozeamento) presente em outra sílaba da palavra.",
    idadeLimite: "2 anos e 6 meses",
  },
  {
    id: "plosivacao_fricativas",
    nome: "Plosivação de fricativas",
    definicao:
      "Fonemas fricativos /f, v, s, z, ʃ, ʒ/ são substituídos por plosivos /p, b, t, d, k, g/.",
    idadeLimite: "2 anos e 6 meses",
  },
  {
    id: "ensurdecimento_plosivas",
    nome: "Ensurdecimento de plosivas",
    definicao:
      "Fonemas plosivos vozeados /b, d, g/ são substituídos por desvozeados /p, t, k/.",
    idadeLimite: "2 anos e 6 meses",
  },
  {
    id: "ensurdecimento_fricativas",
    nome: "Ensurdecimento de fricativas",
    definicao:
      "Fonemas fricativos vozeados /v, z, ʒ/ são substituídos por desvozeados /f, s, ʃ/.",
    idadeLimite: "2 anos e 6 meses",
  },
  {
    id: "sonorizacao_plosivas",
    nome: "Sonorização de plosivas",
    definicao:
      "Fonemas fricativos desvozeados /f, s, ʃ/ são produzidos como os vozeados /b, d, g/.",
    idadeLimite: "2 anos e 6 meses",
  },
  {
    id: "sonorizacao_fricativas",
    nome: "Sonorização de fricativas",
    definicao:
      "Fonemas fricativos desvozeados /f, s, ʃ/ são substituídos por vozeados /v, z, ʒ/.",
    idadeLimite: "2 anos e 6 meses",
  },
  {
    id: "frontalizacao_velar",
    nome: "Frontalização de velar",
    definicao:
      "Fonemas velares /k, g/ são substituídos por plosivos alveolares /t, d/.",
    idadeLimite: "3 anos",
  },
  {
    id: "posteriorizacao_velar",
    nome: "Posteriorização para velar",
    definicao:
      "Fonemas plosivos alveolares /t, d/ são substituídos por velares /k, g/.",
    idadeLimite: "3 anos e 6 meses",
  },
  {
    id: "simplificacao_liquida",
    nome: "Simplificação de líquida",
    definicao:
      "Fonemas líquidos /l, r, ʁ, ʎ/ são omitidos ou substituídos por outros líquidos.",
    idadeLimite: "3 anos e 6 meses",
  },
  {
    id: "frontalizacao_palatal",
    nome: "Frontalização de palatal",
    definicao:
      "Fonemas palatais /ʃ, ʒ/ são substituídos por fricativos alveolares /s, z/.",
    idadeLimite: "4 anos e 6 meses",
  },
  {
    id: "posteriorizacao_palatal",
    nome: "Posteriorização para palatal",
    definicao:
      "Fonemas fricativos alveolares /s, z/ são substituídos por palatais /ʃ, ʒ/.",
    idadeLimite: "4 anos e 6 meses",
  },
  {
    id: "simplificacao_consoante_final",
    nome: "Simplificação da consoante final",
    definicao:
      "As consoantes /s/ ou /r/ são omitidas ou substituídas pela semivogal /j/ em posição final de sílaba.",
    idadeLimite: "5 anos",
  },
  {
    id: "simplificacao_encontro_consonantal",
    nome: "Simplificação do encontro consonantal",
    definicao:
      "Os encontros consonantais com /r/ ou /l/ são omitidos ou substituídos.",
    idadeLimite: "5 anos",
  },
  {
    id: "outros",
    nome: "Outros",
    definicao:
      "Processos fonológicos que não foram observados no desenvolvimento típico de linguagem.",
    idadeLimite: null,
  },
];

const WORDS = [
  // ANIMAIS
  {
    id: "cachorro", // ID deve ser string para usar no src da imagem
    texto: "cachorro",
    categoria: "animais",
    imagemUrl: "/imagens/cachorro.png",
    fonemaAlvo: "/k/ /ʃ/ /ʁ/",
    regrasErro: [
      { padrao: "tachorro", processoId: "frontalizacao_velar" },
      { padrao: "cachoro", processoId: "simplificacao_consoante_final" },
      { padrao: "catorro", processoId: "plosivacao_fricativas" }, // Exemplo
    ],
  },
  {
    id: "gato",
    texto: "gato",
    categoria: "animais",
    imagemUrl: "/imagens/gato.png",
    fonemaAlvo: "/g/ /t/",
    regrasErro: [
      { padrao: "dato", processoId: "frontalizacao_velar" },
      { padrao: "ato", processoId: "reducao_silaba" },
    ],
  },
  {
    id: "pato",
    texto: "pato",
    categoria: "animais",
    imagemUrl: "/imagens/pato.png",
    fonemaAlvo: "/p/ /t/",
    regrasErro: [
      { padrao: "bato", processoId: "sonorizacao_plosivas" },
      { padrao: "ato", processoId: "reducao_silaba" },
    ],
  },
  {
    id: "elefante",
    texto: "elefante",
    categoria: "animais",
    imagemUrl: "/imagens/elefante.png",
    fonemaAlvo: "/l/ /f/ /n/ /t/",
    regrasErro: [
      { padrao: "efante", processoId: "reducao_silaba" },
      { padrao: "erefan", processoId: "simplificacao_consoante_final" },
    ],
  },
  {
    id: "macaco",
    texto: "macaco",
    categoria: "animais",
    imagemUrl: "/imagens/macaco.png",
    fonemaAlvo: "/m/ /k/",
    regrasErro: [
      { padrao: "mataco", processoId: "frontalizacao_velar" },
      { padrao: "acaco", processoId: "reducao_silaba" },
    ],
  },
  // COMIDA
  {
    id: "banana",
    texto: "banana",
    categoria: "comida",
    imagemUrl: "/imagens/banana.png",
    fonemaAlvo: "/b/ /n/",
    regrasErro: [
      { padrao: "nanana", processoId: "reducao_silaba" },
      { padrao: "manana", processoId: "harmonia_consonantal" },
    ],
  },
  {
    id: "maça",
    texto: "maçã",
    categoria: "comida",
    imagemUrl: "/imagens/maca.png",
    fonemaAlvo: "/m/ /s/",
    regrasErro: [
      { padrao: "ma", processoId: "simplificacao_consoante_final" },
      { padrao: "mata", processoId: "plosivacao_fricativas" },
    ],
  },
  {
    id: "pão",
    texto: "pão",
    categoria: "comida",
    imagemUrl: "/imagens/pao.png",
    fonemaAlvo: "/p/",
    regrasErro: [{ padrao: "bão", processoId: "sonorizacao_plosivas" }],
  },
  {
    id: "leite",
    texto: "leite",
    categoria: "comida",
    imagemUrl: "/imagens/leite.png",
    fonemaAlvo: "/l/ /t/",
    regrasErro: [
      { padrao: "eite", processoId: "reducao_silaba" },
      { padrao: "reite", processoId: "simplificacao_liquida" },
    ],
  },
  {
    id: "arroz",
    texto: "arroz",
    categoria: "comida",
    imagemUrl: "/imagens/arroz.png",
    fonemaAlvo: "/ʁ/ /s/",
    regrasErro: [
      { padrao: "aoz", processoId: "reducao_silaba" },
      { padrao: "aroz", processoId: "simplificacao_consoante_final" },
    ],
  },
  // BRINQUEDOS
  {
    id: "bola",
    texto: "bola",
    categoria: "brinquedos",
    imagemUrl: "/imagens/bola.png",
    fonemaAlvo: "/b/ /l/",
    regrasErro: [
      { padrao: "pola", processoId: "ensurdecimento_plosivas" },
      { padrao: "boda", processoId: "simplificacao_liquida" },
    ],
  },
  {
    id: "carro",
    texto: "carro",
    categoria: "brinquedos",
    imagemUrl: "/imagens/carro.png",
    fonemaAlvo: "/k/ /ʁ/",
    regrasErro: [
      { padrao: "tarro", processoId: "frontalizacao_velar" },
      { padrao: "caho", processoId: "simplificacao_consoante_final" },
    ],
  },
  {
    id: "boneca",
    texto: "boneca",
    categoria: "brinquedos",
    imagemUrl: "/imagens/boneca.png",
    fonemaAlvo: "/b/ /n/ /k/",
    regrasErro: [
      { padrao: "poneta", processoId: "ensurdecimento_plosivas" },
      { padrao: "boneta", processoId: "frontalizacao_velar" },
    ],
  },
  {
    id: "pipa",
    texto: "pipa",
    categoria: "brinquedos",
    imagemUrl: "/imagens/pipa.png",
    fonemaAlvo: "/p/",
    regrasErro: [{ padrao: "bipa", processoId: "sonorizacao_plosivas" }],
  },
  {
    id: "urso",
    texto: "urso",
    categoria: "brinquedos",
    imagemUrl: "/imagens/urso.png",
    fonemaAlvo: "/ʁ/ /s/",
    regrasErro: [
      { padrao: "uso", processoId: "simplificacao_consoante_final" },
      { padrao: "urto", processoId: "plosivacao_fricativas" },
    ],
  },
  // CASA
  {
    id: "mesa",
    texto: "mesa",
    categoria: "casa",
    imagemUrl: "/imagens/mesa.png",
    fonemaAlvo: "/m/ /z/",
    regrasErro: [
      { padrao: "meza", processoId: "ensurdecimento_fricativas" },
      { padrao: "meta", processoId: "plosivacao_fricativas" },
    ],
  },
  {
    id: "cadeira",
    texto: "cadeira",
    categoria: "casa",
    imagemUrl: "/imagens/cadeira.png",
    fonemaAlvo: "/k/ /d/ /ʁ/",
    regrasErro: [
      { padrao: "tadeira", processoId: "frontalizacao_velar" },
      { padrao: "cadeia", processoId: "simplificacao_liquida" },
    ],
  },
  {
    id: "cama",
    texto: "cama",
    categoria: "casa",
    imagemUrl: "/imagens/cama.png",
    fonemaAlvo: "/k/ /m/",
    regrasErro: [
      { padrao: "tama", processoId: "frontalizacao_velar" },
      { padrao: "ama", processoId: "reducao_silaba" },
    ],
  },
  {
    id: "porta",
    texto: "porta",
    categoria: "casa",
    imagemUrl: "/imagens/porta.png",
    fonemaAlvo: "/p/ /ʁ/ /t/",
    regrasErro: [
      { padrao: "pota", processoId: "simplificacao_liquida" },
      { padrao: "borta", processoId: "sonorizacao_plosivas" },
    ],
  },
  {
    id: "janela",
    texto: "janela",
    categoria: "casa",
    imagemUrl: "/imagens/janela.png",
    fonemaAlvo: "/ʒ/ /n/ /l/",
    regrasErro: [
      { padrao: "zanela", processoId: "frontalizacao_palatal" },
      { padrao: "anela", processoId: "reducao_silaba" },
    ],
  },
];

// Função de similaridade (Levenshtein Distance)
function getSimilarity(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(newValue, lastValue, costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) {
      costs[s2.length] = lastValue;
    }
  }
  const distance = costs[s2.length];
  const maxLength = Math.max(s1.length, s2.length);
  return 1 - distance / maxLength;
}

// Função para analisar erros fonológicos (reintroduzido do seu App.jsx anterior)
function analisarFono(transcricao, palavraAlvo) {
  const transcricaoLimpa = transcricao.toLowerCase().trim();
  const palavraAlvoLimpa = palavraAlvo.texto.toLowerCase().trim();

  // Acerto perfeito
  if (transcricaoLimpa === palavraAlvoLimpa) {
    return { tipo: "acerto", descricao: "Produção adequada." };
  }

  // Tentar encontrar um processo fonológico
  for (const regra of palavraAlvo.regrasErro || []) {
    if (transcricaoLimpa.includes(regra.padrao.toLowerCase())) {
      const processo = PROCESSOS_FONOLOGICOS.find(
        (p) => p.id === regra.processoId
      );
      if (processo) {
        return {
          tipo: "erro_fonologico",
          processo: processo,
          descricao: `Pode indicar ${processo.nome}.`,
        };
      }
    }
  }

  // Se não classificou, mas é um erro
  return {
    tipo: "nao_classificado",
    descricao: "Erro de pronúncia não classificado.",
  };
}

// Componente FeedbackModal (reintroduzido do seu App.jsx anterior)
function FeedbackModal({
  word,
  isCorrect,
  onNextWord,
  modoFonoAtivo,
  processoDetectado,
  transcription,
}) {
  const title = isCorrect ? "Muito bem!" : "Vamos tentar de novo?";
  const icon = isCorrect ? "⭐" : "🤔";
  const subText = isCorrect
    ? "Você falou direitinho. Vamos para a próxima palavra?"
    : `A palavra era "${word}". Você disse "${transcription}".`;
  const buttonText = isCorrect ? "Próxima palavra ▶" : "Tentar novamente";

  return (
    <div className="feedback-modal-overlay">
      <div className={`feedback-modal-card ${isCorrect ? "correct" : "incorrect"}`}>
        <div className="feedback-modal-icon">{icon}</div>
        <h2 className={`feedback-modal-title ${isCorrect ? "correct" : "incorrect"}`}>
          {title}
        </h2>
        <p className="feedback-modal-word">{word.toUpperCase()}</p>
        <p className="feedback-modal-spoken">{subText}</p>

        {modoFonoAtivo && processoDetectado && (
          <div className="fono-box-modal">
            <h4>Análise Fonoaudiológica:</h4>
            {processoDetectado.processo ? (
              <>
                <p>
                  <strong>Processo:</strong> {processoDetectado.processo.nome}
                </p>
                <p>
                  <strong>Definição:</strong> {processoDetectado.processo.definicao}
                </p>
                {processoDetectado.processo.idadeLimite && (
                  <p>
                    <strong>Idade esperada de eliminação:</strong>{" "}
                    {processoDetectado.processo.idadeLimite}
                  </p>
                )}
              </>
            ) : (
              <p>
                <strong>Tipo:</strong>{" "}
                {processoDetectado.tipo === "acerto"
                  ? "Produção adequada ✅"
                  : processoDetectado.tipo === "nao_classificado"
                  ? "Erro não classificado"
                  : processoDetectado.tipo}
              </p>
            )}
            {processoDetectado.descricao && (
              <p>
                <strong>Resumo:</strong> {processoDetectado.descricao}
              </p>
            )}
          </div>
        )}

        <button className="feedback-modal-button" onClick={onNextWord}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

/* -------- HOME SCREEN -------- */
// Recebe modoFonoAtivo e setModoFonoAtivo do App
function HomeScreen({ onStart, modoFonoAtivo, setModoFonoAtivo }) {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="home-mascot-circle">
            {/* Substitua o <span>🦊</span> por esta tag <img> */}
            <img src="/icons/fox_avatar.png" alt="Mascote" className="home-mascot-image" />
        </div>
        <div className="home-logo-wrapper">
          <h1 className="home-logo">
            <span className="home-logo-pronuncia">Pronúncia</span>
            <span className="home-logo-kids">Kids</span>
          </h1>
        </div>
      </header>

      <main className="home-main">
        <div className="home-buttons">
          <button className="home-btn home-btn-start" onClick={onStart}>
            <span className="btn-icon">▶</span>
            <span className="btn-text">Começar</span>
          </button>
          <button className="home-btn home-btn-progress">
            <span className="btn-icon">📊</span>
            <span className="btn-text">Meu Progresso</span>
          </button>
          <button className="home-btn home-btn-settings">
            <span className="btn-icon">⚙️</span>
            <span className="btn-text">Configurações</span>
          </button>
        </div>

        {/* NOVO: Botão de toggle para o Modo Fono */}
        <div className="fono-toggle-container">
          <span className="fono-toggle-icon">🎧</span>
          <span className="fono-toggle-label">Modo Fono</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={modoFonoAtivo}
              onChange={() => setModoFonoAtivo(!modoFonoAtivo)}
            />
            <span className="slider round"></span>
          </label>
          <span className="fono-toggle-status">{modoFonoAtivo ? "ON" : "OFF"}</span>
        </div>
      </main>

      <footer className="home-footer">
        <div className="home-clouds">
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
          <div className="cloud cloud-3"></div>
        </div>
        <p className="home-hint">
          App em desenvolvimento. Use sempre com a supervisão de um adulto ou
          fonoaudiólogo.
        </p>
      </footer>
      {/* Elementos decorativos */}
      <div className="decorative-elements">
        <span className="note note-1">🎵</span>
        <span className="note note-2">🎶</span>
        <span className="letter letter-a">A</span>
        <span className="letter letter-b">B</span>
        <span className="letter letter-c">C</span>
        <span className="star star-1">⭐</span>
        <span className="star star-2">✨</span>
      </div>
    </div>
  );
}

/* -------- CATEGORIES SCREEN -------- */

function CategoriesScreen({ onBack, onSelectCategory }) {
  const categories = [
    { id: "animais", emoji: "🦁", label: "Animais", colorClass: "category-animals" },
    { id: "comida", emoji: "🍎", label: "Comida", colorClass: "category-food" },
    { id: "brinquedos", emoji: "🧸", label: "Brinquedos", colorClass: "category-toys" },
    { id: "casa", emoji: "🏠", label: "Casa", colorClass: "category-home" },
  ];

  return (
    <div className="categories-container">
      <header className="categories-header">
        <button className="icon-button" onClick={onBack} title="Voltar">
          ◀
        </button>
        <h2 className="categories-title">Escolha uma Categoria</h2>
        {/* Placeholder para manter o alinhamento, já que a HomeScreen tem 3 itens no header */}
        <div className="placeholder-button"></div>
      </header>

      <main className="categories-grid">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-card ${category.colorClass}`}
            onClick={() => onSelectCategory(category.id)}
          >
            <span className="category-emoji">{category.emoji}</span>
            <span className="category-label">{category.label}</span>
          </button>
        ))}
      </main>
    </div>
  );
}

/* -------- TRAINING SCREEN -------- */
// Recebe modoFonoAtivo e setModoFonoAtivo do App
function TrainingScreen({ categoriaSelecionada, onBack }) {
  const palavrasDaCategoria = WORDS.filter(
    (w) => w.categoria === categoriaSelecionada
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isSupported, setIsSupported] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [accuracy, setAccuracy] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showCongrats, setShowCongrats] = useState(false);

  // NOVO: estado para modo fono e info de fono
  const [modoFonoAtivo, setModoFonoAtivo] = useState(false);
  const [fonoInfo, setFonoInfo] = useState(null);

  const currentWord = palavrasDaCategoria[currentIndex];

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }
    setIsSupported(true);
  }, []);

  function getSimilarity(expected, spoken) {
    if (!expected || !spoken) return 0;

    const a = expected.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    const b = spoken.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

    // distância de Levenshtein simples
    const dp = Array.from({ length: a.length + 1 }, () =>
      Array(b.length + 1).fill(0)
    );
    for (let i = 0; i <= a.length; i++) dp[i][0] = i;
    for (let j = 0; j <= b.length; j++) dp[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
      }
    }

    const dist = dp[a.length][b.length];
    const maxLen = Math.max(a.length, b.length) || 1;
    const similarity = 1 - dist / maxLen;
    return Math.max(0, Math.min(1, similarity));
  }

  function analisarFono(palavra, falado) {
    if (!falado) {
      return {
        tipo: "sem_dado",
        descricao: "Nenhuma produção de fala capturada.",
      };
    }

    const faladoNorm = falado.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    const alvoNorm = palavra.texto.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

    if (faladoNorm === alvoNorm) {
      return {
        tipo: "acerto",
        descricao: "Produção adequada da palavra alvo.",
      };
    }

    // tenta casar com regras fonológicas definidas na palavra
    for (const regra of palavra.regrasErro || []) {
      const padraoNorm = regra.padrao
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");

      if (faladoNorm === padraoNorm) {
        const processo = PROCESSOS_FONOLOGICOS.find(
          (p) => p.id === regra.processoId
        );
        return {
          tipo: "processo_encontrado",
          processo,
          descricao: processo
            ? `Possível ocorrência de ${processo.nome}.`
            : "Processo fonológico não identificado na tabela.",
        };
      }
    }

    return {
      tipo: "nao_classificado",
      descricao:
        "Houve diferença na produção, mas não foi possível classificar em um dos processos cadastrados.",
    };
  }

  function startListening() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    setSpokenText("");
    setAccuracy(null);
    setFeedback("");
    setShowCongrats(false);
    setFonoInfo(null); // limpa análise anterior

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      setSpokenText(transcript);

      const sim = getSimilarity(currentWord.texto, transcript);
      setAccuracy(sim);

      if (sim >= 0.85) {
        setFeedback("Muito bem! Você falou direitinho.");
        setShowCongrats(true);
      } else if (sim >= 0.6) {
        setFeedback("Quase lá! Tente falar mais devagar.");
      } else {
        setFeedback("Vamos tentar de novo, tudo bem?");
      }

      if (modoFonoAtivo) {
        const analise = analisarFono(currentWord, transcript);
        setFonoInfo(analise);
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }

  function nextWord() {
    setShowCongrats(false);
    setSpokenText("");
    setAccuracy(null);
    setFeedback("");
    setFonoInfo(null);
    setCurrentIndex((prev) =>
      prev + 1 < palavrasDaCategoria.length ? prev + 1 : 0
    );
  }

  function previousWord() {
    setShowCongrats(false);
    setSpokenText("");
    setAccuracy(null);
    setFeedback("");
    setFonoInfo(null);
    setCurrentIndex((prev) =>
      prev - 1 >= 0 ? prev - 1 : palavrasDaCategoria.length - 1
    );
  }

  const categoriaNome = {
    animais: "Animais",
    comida: "Comida",
    brinquedos: "Brinquedos",
    casa: "Casa",
  };

  return (
    <div className="training-screen-bg">
      <div className="training-pattern" />

      <div className="training-screen">
        <header className="training-topbar">
          <button className="icon-button" onClick={onBack} title="Início">
            🏠
          </button>
          <div className="training-logo-full">
            <span className="training-logo-main">Pronúncia</span>
            <span className="training-logo-sub">Kids</span>
          </div>
          <button
            className={`icon-button ${
              modoFonoAtivo ? "icon-button-active" : ""
            }`}
            onClick={() => setModoFonoAtivo(!modoFonoAtivo)}
            title={modoFonoAtivo ? "Desativar Modo Fono" : "Ativar Modo Fono"}
          >
            {modoFonoAtivo ? "🧠" : "💡"}
          </button>
        </header>

        <main className="training-card">
          <p className="training-category">
            {categoriaNome[categoriaSelecionada]}
          </p>

          {currentWord.imagemUrl && (
            <div className="training-image-wrapper">
              <img
                src={currentWord.imagemUrl}
                alt={currentWord.texto}
                className="training-image"
              />
            </div>
          )}

          <p className="training-word">{currentWord.texto.toUpperCase()}</p>

          <div className="training-audio-row">
            <button
              className="audio-button"
              onClick={() => {
                const utterance = new SpeechSynthesisUtterance(
                  currentWord.texto
                );
                utterance.lang = "pt-BR";
                speechSynthesis.speak(utterance);
              }}
            >
              🔊
            </button>

            <button
              className={`mic-button ${
                isListening ? "mic-button-listening" : ""
              }`}
              onClick={startListening}
              disabled={!isSupported || isListening}
            >
              🎙️
            </button>
          </div>

          <div className="training-result-box">
            <p className="training-result-line">
              <strong>Você disse:</strong> {spokenText || "—"}
            </p>

            {accuracy !== null && (
              <p className="training-result-line">
                <strong>Similaridade:</strong>{" "}
                {(accuracy * 100).toFixed(0)}%
              </p>
            )}

            {feedback && <p className="training-feedback">{feedback}</p>}

            {modoFonoAtivo && fonoInfo && (
              <div className="fono-box">
                <p>
                  <strong>Análise fonoaudiológica:</strong>
                </p>

                {fonoInfo.processo ? (
                  <>
                    <p>
                      <strong>Processo:</strong> {fonoInfo.processo.nome}
                    </p>
                    <p>
                      <strong>Definição:</strong>{" "}
                      {fonoInfo.processo.definicao}
                    </p>
                    {fonoInfo.processo.idadeLimite && (
                      <p>
                        <strong>Idade esperada de eliminação:</strong>{" "}
                        {fonoInfo.processo.idadeLimite}
                      </p>
                    )}
                  </>
                ) : (
                  <p>
                    <strong>Tipo:</strong>{" "}
                    {fonoInfo.tipo === "acerto"
                      ? "Produção adequada ✅"
                      : fonoInfo.tipo === "nao_classificado"
                      ? "Erro não classificado"
                      : fonoInfo.tipo}
                  </p>
                )}

                {fonoInfo.descricao && (
                  <p>
                    <strong>Resumo:</strong> {fonoInfo.descricao}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="training-bottom-buttons">
            <button
              className="nav-pill nav-pill-left"
              onClick={previousWord}
            >
              ◀ Anterior
            </button>
            <button
              className="nav-pill nav-pill-right"
              onClick={nextWord}
            >
              Próxima ▶
            </button>
          </div>
        </main>

        {showCongrats && (
          <div className="congrats-overlay">
            <div className="congrats-card">
              <div className="congrats-star">⭐</div>
              <h2 className="congrats-title">Muito bem!</h2>
              <p className="congrats-word">
                {currentWord.texto.toUpperCase()}
              </p>
              <p className="congrats-sub">
                Você falou direitinho. Vamos para a próxima palavra?
              </p>
              <button className="congrats-button" onClick={nextWord}>
                Próxima palavra ▶
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------- APP RAIZ -------- */

function App() {
  const [screen, setScreen] = useState(SCREEN.HOME);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [modoFonoAtivo, setModoFonoAtivo] = useState(false); // Estado global para o modo fono

  return (
    <>
      {screen === SCREEN.HOME && (
        <HomeScreen
          onStart={() => setScreen(SCREEN.CATEGORIES)}
          modoFonoAtivo={modoFonoAtivo}
          setModoFonoAtivo={setModoFonoAtivo}
        />
      )}

      {screen === SCREEN.CATEGORIES && (
        <CategoriesScreen
          onBack={() => setScreen(SCREEN.HOME)}
          onSelectCategory={(cat) => {
            setCategoriaSelecionada(cat);
            setScreen(SCREEN.TRAINING);
          }}
        />
      )}

      {screen === SCREEN.TRAINING && categoriaSelecionada && (
        <TrainingScreen
          categoriaSelecionada={categoriaSelecionada}
          onBack={() => setScreen(SCREEN.CATEGORIES)}
          modoFonoAtivo={modoFonoAtivo}
          setModoFonoAtivo={setModoFonoAtivo}
        />
      )}
    </>
  );
}

export default App;