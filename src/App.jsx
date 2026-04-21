import { useState, useEffect } from "react";
import "./App.css";

const SCREEN = {
  HOME: "HOME",
  CATEGORIES: "CATEGORIES",
  TRAINING: "TRAINING",
};

// Processos fonológicos baseados na tabela
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
    id: 1,
    texto: "cachorro",
    categoria: "animais",
    imagemUrl: "/imagens/cachorro.png",
    fonemaAlvo: "/k/ /ʃ/ /ʁ/",
    regrasErro: [
      { padrao: "tachorro", processoId: "frontalizacao_velar" },
      { padrao: "cachoro", processoId: "simplificacao_consoante_final" },
      { padrao: "catorro", processoId: "frontalizacao_velar" },
    ],
  },
  {
    id: 2,
    texto: "gato",
    categoria: "animais",
    imagemUrl: "/imagens/gato.png",
    fonemaAlvo: "/g/ /t/",
    regrasErro: [
      { padrao: "dato", processoId: "frontalizacao_velar" },
      { padrao: "kato", processoId: "ensurdecimento_plosivas" },
      { padrao: "tato", processoId: "frontalizacao_velar" },
    ],
  },
  {
    id: 3,
    texto: "pato",
    categoria: "animais",
    imagemUrl: "/imagens/pato.png",
    fonemaAlvo: "/p/ /t/",
    regrasErro: [
      { padrao: "bato", processoId: "sonorizacao_plosivas" },
      { padrao: "ато", processoId: "reducao_silaba" },
    ],
  },
  {
    id: 4,
    texto: "rato",
    categoria: "animais",
    imagemUrl: "/imagens/rato.png",
    fonemaAlvo: "/ʁ/",
    regrasErro: [
      { padrao: "lato", processoId: "simplificacao_liquida" },
      { padrao: "ato", processoId: "simplificacao_liquida" },
      { padrao: "dato", processoId: "simplificacao_liquida" },
    ],
  },
  {
    id: 5,
    texto: "vaca",
    categoria: "animais",
    imagemUrl: "/imagens/vaca.png",
    fonemaAlvo: "/v/ /k/",
    regrasErro: [
      { padrao: "faca", processoId: "ensurdecimento_fricativas" },
      { padrao: "baca", processoId: "sonorizacao_plosivas" },
      { padrao: "vata", processoId: "frontalizacao_velar" },
    ],
  },

  // COMIDA
  {
    id: 6,
    texto: "maçã",
    categoria: "comida",
    imagemUrl: "/imagens/maca.png",
    fonemaAlvo: "/m/ /s/",
    regrasErro: [
      { padrao: "massa", processoId: "posteriorizacao_palatal" },
      { padrao: "maça", processoId: "simplificacao_consoante_final" },
    ],
  },
  {
    id: 7,
    texto: "banana",
    categoria: "comida",
    imagemUrl: "/imagens/banana.png",
    fonemaAlvo: "/b/ /n/",
    regrasErro: [
      { padrao: "panana", processoId: "ensurdecimento_plosivas" },
      { padrao: "babana", processoId: "harmonia_consonantal" },
      { padrao: "nanana", processoId: "harmonia_consonantal" },
    ],
  },
  {
    id: 8,
    texto: "bolo",
    categoria: "comida",
    imagemUrl: "/imagens/bolo.png",
    fonemaAlvo: "/b/ /l/",
    regrasErro: [
      { padrao: "polo", processoId: "ensurdecimento_plosivas" },
      { padrao: "boo", processoId: "simplificacao_liquida" },
      { padrao: "boto", processoId: "simplificacao_liquida" },
    ],
  },
  {
    id: 9,
    texto: "suco",
    categoria: "comida",
    imagemUrl: "/imagens/suco.png",
    fonemaAlvo: "/s/ /k/",
    regrasErro: [
      { padrao: "tuco", processoId: "plosivacao_fricativas" },
      { padrao: "zuco", processoId: "sonorizacao_fricativas" },
      { padrao: "suto", processoId: "frontalizacao_velar" },
    ],
  },
  {
    id: 10,
    texto: "pizza",
    categoria: "comida",
    imagemUrl: "/imagens/pizza.png",
    fonemaAlvo: "/p/ /z/",
    regrasErro: [
      { padrao: "pissa", processoId: "ensurdecimento_fricativas" },
      { padrao: "bizza", processoId: "sonorizacao_plosivas" },
    ],
  },

  // BRINQUEDOS
  {
    id: 11,
    texto: "bola",
    categoria: "brinquedos",
    imagemUrl: "/imagens/bola.png",
    fonemaAlvo: "/b/ /l/",
    regrasErro: [
      { padrao: "pola", processoId: "ensurdecimento_plosivas" },
      { padrao: "boa", processoId: "simplificacao_liquida" },
      { padrao: "boto", processoId: "simplificacao_liquida" },
    ],
  },
  {
    id: 12,
    texto: "boneca",
    categoria: "brinquedos",
    imagemUrl: "/imagens/boneca.png",
    fonemaAlvo: "/b/ /n/ /k/",
    regrasErro: [
      { padrao: "poneca", processoId: "ensurdecimento_plosivas" },
      { padrao: "boneta", processoId: "frontalizacao_velar" },
      { padrao: "moneca", processoId: "harmonia_consonantal" },
    ],
  },
  {
    id: 13,
    texto: "carrinho",
    categoria: "brinquedos",
    imagemUrl: "/imagens/carrinho.png",
    fonemaAlvo: "/k/ /ʁ/",
    regrasErro: [
      { padrao: "calinho", processoId: "simplificacao_liquida" },
      { padrao: "cainho", processoId: "simplificacao_liquida" },
      { padrao: "tarinho", processoId: "frontalizacao_velar" },
    ],
  },
  {
    id: 14,
    texto: "urso",
    categoria: "brinquedos",
    imagemUrl: "/imagens/urso.png",
    fonemaAlvo: "/ʁ/ /s/",
    regrasErro: [
      { padrao: "ulso", processoId: "simplificacao_liquida" },
      { padrao: "uso", processoId: "simplificacao_liquida" },
      { padrao: "utso", processoId: "plosivacao_fricativas" },
    ],
  },
  {
    id: 15,
    texto: "pipa",
    categoria: "brinquedos",
    imagemUrl: "/imagens/pipa.png",
    fonemaAlvo: "/p/",
    regrasErro: [
      { padrao: "bipa", processoId: "sonorizacao_plosivas" },
      { padrao: "piba", processoId: "sonorizacao_plosivas" },
    ],
  },

  // CASA
  {
    id: 16,
    texto: "cama",
    categoria: "casa",
    imagemUrl: "/imagens/cama.png",
    fonemaAlvo: "/k/ /m/",
    regrasErro: [
      { padrao: "tama", processoId: "frontalizacao_velar" },
      { padrao: "cana", processoId: "harmonia_consonantal" },
    ],
  },
  {
    id: 17,
    texto: "mesa",
    categoria: "casa",
    imagemUrl: "/imagens/mesa.png",
    fonemaAlvo: "/m/ /z/",
    regrasErro: [
      { padrao: "meza", processoId: "sonorizacao_fricativas" },
      { padrao: "messa", processoId: "ensurdecimento_fricativas" },
      { padrao: "nesa", processoId: "harmonia_consonantal" },
    ],
  },
  {
    id: 18,
    texto: "porta",
    categoria: "casa",
    imagemUrl: "/imagens/porta.png",
    fonemaAlvo: "/p/ /ʁ/",
    regrasErro: [
      { padrao: "pota", processoId: "simplificacao_encontro_consonantal" },
      { padrao: "porta", processoId: "simplificacao_consoante_final" },
      { padrao: "polda", processoId: "simplificacao_liquida" },
    ],
  },
  {
    id: 19,
    texto: "janela",
    categoria: "casa",
    imagemUrl: "/imagens/janela.png",
    fonemaAlvo: "/ʒ/ /l/",
    regrasErro: [
      { padrao: "zanela", processoId: "frontalizacao_palatal" },
      { padrao: "janea", processoId: "simplificacao_liquida" },
      { padrao: "chanela", processoId: "outros" },
    ],
  },
  {
    id: 20,
    texto: "sofá",
    categoria: "casa",
    imagemUrl: "/imagens/sofa.png",
    fonemaAlvo: "/s/ /f/",
    regrasErro: [
      { padrao: "tofa", processoId: "plosivacao_fricativas" },
      { padrao: "sofa", processoId: "simplificacao_consoante_final" },
      { padrao: "zofá", processoId: "sonorizacao_fricativas" },
    ],
  },
];

// Similaridade entre duas strings (distância de edição)
function getSimilarity(a, b) {
  if (!a || !b) return 0;
  a = a.toLowerCase().trim();
  b = b.toLowerCase().trim();
  if (a === b) return 1;

  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  const longerLength = longer.length;

  const editDistance = (s1, s2) => {
    const costs = [];
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
            newValue =
              Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  };

  const distance = editDistance(longer, shorter);
  return (longerLength - distance) / longerLength;
}

// Análise fonoaudiológica baseada nos processos da tabela
function analisarFono(transcript, palavraAlvo) {
  if (!transcript) return null;
  const falado = transcript.toLowerCase().trim();
  const alvo = palavraAlvo.texto.toLowerCase().trim();

  if (falado === alvo) {
    return {
      tipo: "acerto",
      processo: null,
      descricao: "Produção adequada da palavra alvo.",
    };
  }

  if (palavraAlvo.regrasErro && palavraAlvo.regrasErro.length > 0) {
    // 1) padrão exato
    const regraExata = palavraAlvo.regrasErro.find(
      (r) => r.padrao.toLowerCase().trim() === falado
    );

    if (regraExata) {
      const processo = PROCESSOS_FONOLOGICOS.find(
        (p) => p.id === regraExata.processoId
      ) || null;
      return {
        tipo: "erro_classificado",
        processo,
        descricao: processo
          ? `${processo.nome}: ${processo.definicao}`
          : "Erro com padrão conhecido para esta palavra.",
      };
    }

    // 2) padrão aproximado
    let melhorRegra = null;
    let melhorSim = 0;
    for (const regra of palavraAlvo.regrasErro) {
      const sim = getSimilarity(falado, regra.padrao);
      if (sim > melhorSim) {
        melhorSim = sim;
        melhorRegra = regra;
      }
    }

    if (melhorRegra && melhorSim > 0.7) {
      const processo = PROCESSOS_FONOLOGICOS.find(
        (p) => p.id === melhorRegra.processoId
      ) || null;
      return {
        tipo: "erro_classificado_aproximado",
        processo,
        descricao: processo
          ? `${processo.nome}: ${processo.definicao} (padrão aproximado).`
          : "Erro com padrão aproximado conhecido.",
      };
    }
  }

  return {
    tipo: "nao_classificado",
    processo: null,
    descricao:
      "Produção diferente da palavra alvo, sem padrão fonológico mapeado.",
  };
}

/* -------- HOME -------- */

function HomeScreen({ onStart }) {
  return (
    <div className="home-container">
      <div className="home-header">
        <div className="home-mascot-circle">
          <span className="home-mascot-emoji">🦊</span>
        </div>
        <div className="home-logo-wrapper">
          <h1 className="home-logo">
            <span className="home-logo-pronuncia">Pronúncia</span>
            <span className="home-logo-kids">Kids</span>
          </h1>
        </div>
      </div>

      <div className="home-buttons">
        <button className="home-btn home-btn-start" onClick={onStart}>
          <span className="btn-icon">▶</span>
          <span className="btn-text">Começar</span>
        </button>
        <button
          className="home-btn home-btn-progress"
          onClick={() => alert("Meu Progresso — em breve!")}
        >
          <span className="btn-icon">📊</span>
          <span className="btn-text">Meu Progresso</span>
        </button>
        <button
          className="home-btn home-btn-settings"
          onClick={() => alert("Configurações — em breve!")}
        >
          <span className="btn-icon">⚙️</span>
          <span className="btn-text">Configurações</span>
        </button>
      </div>

      <div className="home-footer">
        <div className="home-clouds">
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
          <div className="cloud cloud-3"></div>
        </div>
        <p className="home-hint">
          App em desenvolvimento. Use sempre com acompanhamento de um
          fonoaudiólogo.
        </p>
      </div>
    </div>
  );
}

/* -------- CATEGORIAS -------- */

function CategoriesScreen({ onSelectCategory, onBack }) {
  return (
    <div className="categories-container">
      <header className="categories-header">
        <button className="icon-button" onClick={onBack}>
          ⬅
        </button>
        <div className="training-logo">
          <span className="training-logo-main">Pronúncia</span>
          <span className="training-logo-sub">Kids</span>
        </div>
        <div style={{ width: 40 }} />
      </header>

      <h2 className="categories-title">Escolha uma categoria:</h2>

      <div className="categories-grid">
        <button
          className="category-card category-animals"
          onClick={() => onSelectCategory("animais")}
        >
          <span className="category-emoji">🐶</span>
          <span className="category-label">Animais</span>
        </button>
        <button
          className="category-card category-food"
          onClick={() => onSelectCategory("comida")}
        >
          <span className="category-emoji">🍎</span>
          <span className="category-label">Comida</span>
        </button>
        <button
          className="category-card category-toys"
          onClick={() => onSelectCategory("brinquedos")}
        >
          <span className="category-emoji">🎈</span>
          <span className="category-label">Brinquedos</span>
        </button>
        <button
          className="category-card category-home"
          onClick={() => onSelectCategory("casa")}
        >
          <span className="category-emoji">🏠</span>
          <span className="category-label">Casa</span>
        </button>
      </div>
    </div>
  );
}

/* -------- TREINO -------- */

function TrainingScreen({ categoriaSelecionada, onBack }) {
  const palavrasDaCategoria = WORDS.filter(
    (w) => w.categoria === categoriaSelecionada
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSupported, setIsSupported] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [accuracy, setAccuracy] = useState(null);
  const [fonoInfo, setFonoInfo] = useState(null);
  const [showCongrats, setShowCongrats] = useState(false);

  const currentWord =
    palavrasDaCategoria[currentIndex % palavrasDaCategoria.length];

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) setIsSupported(false);
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
    resetState();
  }, [categoriaSelecionada]);

  const resetState = () => {
    setSpokenText("");
    setFeedback("");
    setAccuracy(null);
    setFonoInfo(null);
    setShowCongrats(false);
  };

  const startListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setIsSupported(false);
      return;
    }

    const recognition = new SR();
    recognition.lang = "pt-BR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    setShowCongrats(false);
    setFeedback("");
    setAccuracy(null);
    setFonoInfo(null);
    setSpokenText("");

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSpokenText(transcript);

      const sim = getSimilarity(transcript, currentWord.texto);
      setAccuracy(sim);

      if (sim > 0.85) {
        setFeedback("Muito bem! Você falou corretamente! 🌟");
        setShowCongrats(true);
      } else if (sim > 0.6) {
        setFeedback("Quase lá! Vamos tentar de novo devagarinho. 😊");
      } else {
        setFeedback(
          `Vamos tentar de novo? A palavra é "${currentWord.texto}". 💪`
        );
      }

      setFonoInfo(analisarFono(transcript, currentWord));
      setIsListening(false);
    };

    recognition.onerror = () => {
      setFeedback("Erro ao escutar. Tente novamente.");
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const nextWord = () => {
    resetState();
    setCurrentIndex((prev) => (prev + 1) % palavrasDaCategoria.length);
  };

  const previousWord = () => {
    resetState();
    setCurrentIndex((prev) =>
      prev === 0 ? palavrasDaCategoria.length - 1 : prev - 1
    );
  };

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
            className="icon-button"
            onClick={() => alert("Recompensas em breve!")}
          >
            ⭐
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

          <p className="training-word">
            {currentWord.texto.toUpperCase()}
          </p>

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

            {feedback && (
              <p className="training-feedback">{feedback}</p>
            )}

            {fonoInfo && (
              <div className="fono-box">
                <p>
                  <strong>Análise fonoaudiológica:</strong>
                </p>

                {fonoInfo.processo ? (
                  <>
                    <p>
                      <strong>Processo:</strong>{" "}
                      {fonoInfo.processo.nome}
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

  if (screen === SCREEN.HOME) {
    return <HomeScreen onStart={() => setScreen(SCREEN.CATEGORIES)} />;
  }

  if (screen === SCREEN.CATEGORIES) {
    return (
      <CategoriesScreen
        onBack={() => setScreen(SCREEN.HOME)}
        onSelectCategory={(cat) => {
          setCategoriaSelecionada(cat);
          setScreen(SCREEN.TRAINING);
        }}
      />
    );
  }

  if (screen === SCREEN.TRAINING && categoriaSelecionada) {
    return (
      <TrainingScreen
        categoriaSelecionada={categoriaSelecionada}
        onBack={() => setScreen(SCREEN.CATEGORIES)}
      />
    );
  }

  return null;
}

export default App;