import { useState, useEffect } from "react";
import "./App.css";
import { WORDS } from "./data/words";

const SCREEN = {
  HOME: "HOME",
  CATEGORIES: "CATEGORIES",
  TRAINING: "TRAINING",
};

// ---------------- PROCESSOS FONOLÓGICOS ----------------
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
    idadeLimite: "2 anos e 2 meses",
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

// Função de similaridade (Levenshtein Distance)
function getSimilarity(s1, s2) {
  if (!s1 || !s2) return 0;

  // Removendo a normalização de diacríticos aqui para que a comparação seja mais "bruta"
  // e a análise fono possa lidar com isso de forma mais controlada.
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

// Função para analisar fonologicamente (ajustada para igualdade exata do erro)
const analisarFono = (spoken, targetWord) => {
  // Normaliza ambas as strings para remover acentos e caracteres especiais
  const spokenNormalized = spoken.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
  const targetNormalized = targetWord.palavra.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

  // Acerto perfeito
  if (spokenNormalized === targetNormalized) {
    return { tipo: "acerto", descricao: "A produção da palavra está adequada." };
  }

  // Procura por regras de erro específicas para a palavra
  if (targetWord.regrasErro) {
    for (const regra of targetWord.regrasErro) {
      const erroNormalized = regra.erro.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
      // Compara se a fala do usuário é EXATAMENTE igual ao erro esperado
      if (spokenNormalized === erroNormalized) {
        const processoEncontrado = PROCESSOS_FONOLOGICOS.find(
          (p) => p.nome === regra.processo // Busca pelo nome do processo
        );
        return {
          tipo: "erro_especifico",
          processo: processoEncontrado || { nome: regra.processo, definicao: regra.descricao, idadeLimite: regra.idadeEsperada },
          descricao: regra.descricao,
          ipaCorreto: regra.ipaCorreto,
          ipaErro: regra.ipaErro,
        };
      }
    }
  }

  // Se não classificou, mas é um erro
  return { tipo: "nao_classificado", descricao: "Erro de pronúncia não classificado." };
};

// Componente HomeScreen
function HomeScreen({ onStart, modoFonoAtivo, setModoFonoAtivo }) {
  return (
    <div className="home-container">
      <div className="home-header">
        <div className="home-mascot-circle">
          <img
            src="/icons/fox_avatar.png"
            alt="Mascote"
            className="home-mascot-image"
          />
        </div>
        <div className="home-logo-wrapper">
          <h1 className="home-logo">
            <span className="home-logo-pronuncia">Pronúncia</span>
            <span className="home-logo-kids">Kids</span>
          </h1>
        </div>
      </div>

      <main className="home-main">
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
          {/* Botão do Modo Fono na Home */}
          <button
            className={`home-btn home-btn-fono ${modoFonoAtivo ? 'active' : ''}`}
            onClick={() => setModoFonoAtivo(!modoFonoAtivo)}
          >
            <span className="btn-icon">🎧</span>
            <span className="btn-text">Modo Fono</span>
            <div className={`toggle-switch ${modoFonoAtivo ? 'on' : 'off'}`}>
              <div className="toggle-handle"></div>
            </div>
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
      </main>
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
            {/* Se você tiver imagens para as categorias, pode usar aqui */}
            {/* <img src={`/icons/${category.id}.png`} alt={category.label} className="category-icon" /> */}
            <span className="category-emoji">{category.emoji}</span>
            <span className="category-label">{category.label}</span>
          </button>
        ))}
      </main>
    </div>
  );
}

/* -------- TRAINING SCREEN -------- */
function TrainingScreen({ categoriaSelecionada, onBack, modoFonoAtivo, setModoFonoAtivo }) {
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

  const [estrelasSessao, setEstrelasSessao] = useState(0);
  const objetivoSessao = 5; // Por exemplo: a cada 5 acertos, completa uma "figurinha"

  const currentWord =
    palavrasDaCategoria[currentIndex % palavrasDaCategoria.length];

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) setIsSupported(false);
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
    resetState();
    setEstrelasSessao(0); // Reseta as estrelas ao mudar de categoria
  }, [categoriaSelecionada]);

  const resetState = () => {
    setSpokenText("");
    setFeedback("");
    setAccuracy(null);
    setFonoInfo(null);
    setShowCongrats(false);
  };

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

      const sim = getSimilarity(currentWord.palavra, transcript); // Usar currentWord.palavra
      setAccuracy(sim);

      if (sim >= 0.85) {
        setFeedback("Parabéns! Pronúncia excelente! 🎉");
        setEstrelasSessao((prevStars) => prevStars + 1); // Incrementa as estrelas
        setShowCongrats(true);
      } else if (sim >= 0.6) {
        setFeedback("Quase lá! Tente falar mais devagar.");
      } else {
        setFeedback("Vamos tentar de novo, tudo bem?");
      }

      if (modoFonoAtivo) {
        const analise = analisarFono(transcript, currentWord);
        setFonoInfo(analise);
      }
    };

    recognition.onerror = () => {
      setFeedback("Erro ao escutar. Tente novamente.");
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

  if (!currentWord) {
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
            <div className="placeholder-button"></div> {/* Para alinhamento */}
          </header>
          <main className="training-card">
            <p>Nenhuma palavra encontrada para a categoria "{categoriaNome[categoriaSelecionada]}".</p>
            <button className="nav-pill" onClick={onBack}>Voltar para Categorias</button>
          </main>
        </div>
      </div>
    );
  }

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
            <span className="training-logo-kids">Kids</span>
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

          {/* NOVO: Estrelas da sessão */}
          <div style={{ textAlign: 'center', marginBottom: '0.8rem' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#FFD700', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
              Estrelas desta sessão:
              {Array.from({ length: objetivoSessao }).map((_, i) => (
                <span key={i} style={{ fontSize: '1.5rem', margin: '0 2px', opacity: i < estrelasSessao ? 1 : 0.3 }} >
                  ⭐
                </span>
              ))}
              <span style={{ marginLeft: 8, fontSize: '0.9rem' }}>
                ({estrelasSessao} de {objetivoSessao})
              </span>
            </p>
          </div>

          {currentWord.imagemUrl && (
            <div className="training-image-wrapper">
              <img
                src={currentWord.imagemUrl}
                alt={currentWord.palavra}
                className="training-image"
              />
            </div>
          )}

          <p className="training-word">{currentWord.palavra.toUpperCase()}</p>

          <div className="training-audio-row">
            <button
              className="audio-button"
              onClick={() => {
                const utterance = new SpeechSynthesisUtterance(
                  currentWord.palavra
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
                    {fonoInfo.ipaCorreto && (
                      <p>
                        <strong>IPA Correto:</strong> {fonoInfo.ipaCorreto}
                      </p>
                    )}
                    {fonoInfo.ipaErro && (
                      <p>
                        <strong>IPA Erro:</strong> {fonoInfo.ipaErro}
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
                {currentWord.palavra.toUpperCase()}
              </p>
              <p className="congrats-sub">
                Você já tem {estrelasSessao} de {objetivoSessao} estrelas
                nesta sessão!
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
  const [modoFonoAtivo, setModoFonoAtivo] = useState(false);

  if (screen === SCREEN.HOME) {
    return (
      <HomeScreen
        onStart={() => setScreen(SCREEN.CATEGORIES)}
        modoFonoAtivo={modoFonoAtivo}
        setModoFonoAtivo={setModoFonoAtivo}
      />
    );
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
        modoFonoAtivo={modoFonoAtivo}
        setModoFonoAtivo={setModoFonoAtivo}
      />
    );
  }

  return null;
}

export default App;