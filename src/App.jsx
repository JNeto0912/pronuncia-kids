import { useState } from "react";
import "./App.css";
import { WORDS } from "./data/words";
import {
  AAC_ATALHOS,
  AAC_CATEGORIES,
  AAC_CONTEXTS,
  AAC_SYMBOLS,
  AAC_SLOTS,
} from "./data/symbols";
import {
  analyzeTranscription,
  getSimilarity,
} from "./domain/speechAnalysis";
import ProfessionalReview from "./components/ProfessionalReview";
import TechnicalAnalysis from "./components/TechnicalAnalysis";
import SettingsScreen from "./screens/SettingsScreen";

const SCREEN = {
  HOME: "HOME",
  CATEGORIES: "CATEGORIES",
  TRAINING: "TRAINING",
  AAC: "AAC",
  PROGRESS: "PROGRESS",
  SETTINGS: "SETTINGS",
};

// ============================================================
// COMPONENTE: HomeScreen
// ============================================================
function HomeScreen({
  onStart,
  modoFonoAtivo,
  setModoFonoAtivo,
  onOpenAAC,
  onOpenProgress,
  onOpenSettings,
}) {
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
      onClick={onOpenAAC}
    >
      <span className="btn-icon">🗣️</span>
      <span className="btn-text">Comunicação Alternativa</span>
    </button>

          <button
            className="home-btn home-btn-progress"
            onClick={onOpenProgress}
          >
            <span className="btn-icon">📊</span>
            <span className="btn-text">Meu Progresso</span>
          </button>
          <button
            className="home-btn home-btn-settings"
            onClick={onOpenSettings}
          >
            <span className="btn-icon">⚙️</span>
            <span className="btn-text">Configurações</span>
          </button>
          <button
            className={`home-btn home-btn-fono ${modoFonoAtivo ? "active" : ""}`}
            onClick={() => setModoFonoAtivo(!modoFonoAtivo)}
          >
            <span className="btn-icon">🎧</span>
            <span className="btn-text">Modo Fono</span>
            <div className={`toggle-switch ${modoFonoAtivo ? "on" : "off"}`}>
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

// ============================================================
// COMPONENTE: CategoriesScreen
// ============================================================
function CategoriesScreen({
  onBack,
  onSelectCategory,
  ageYears,
  ageMonths,
  onAgeChange,
  microphoneConsent,
  onConsentChange,
}) {
  const categories = [
    { id: "animais", emoji: "🦁", label: "Animais", colorClass: "category-animals" },
    { id: "comidas", emoji: "🍎", label: "Comida", colorClass: "category-food" },
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
        <div className="placeholder-button"></div>
      </header>
      <section className="child-profile-card" aria-labelledby="child-profile-title">
        <h3 id="child-profile-title">Faixa etária</h3>
        <p>Informe somente a idade. Não precisamos do nome nem da data de nascimento.</p>
        <div className="age-fields">
          <label>
            Anos
            <select
              value={ageYears}
              onChange={(event) => onAgeChange(Number(event.target.value), ageMonths)}
            >
              {Array.from({ length: 11 }, (_, value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </label>
          <label>
            Meses
            <select
              value={ageMonths}
              onChange={(event) => onAgeChange(ageYears, Number(event.target.value))}
            >
              {Array.from({ length: 12 }, (_, value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="microphone-consent">
          <input
            type="checkbox"
            checked={microphoneConsent}
            onChange={(event) => onConsentChange(event.target.checked)}
          />
          <span>
            Sou responsável pela criança e autorizo o uso do microfone nesta sessão.
            Dependendo do navegador, o áudio pode ser processado por um serviço externo.
            O app não salva gravações.
          </span>
        </label>
      </section>
      <main className="categories-grid">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-card ${category.colorClass}`}
            onClick={() => onSelectCategory(category.id)}
            disabled={!microphoneConsent}
            aria-describedby={!microphoneConsent ? "category-consent-hint" : undefined}
          >
            <span className="category-emoji">{category.emoji}</span>
            <span className="category-label">{category.label}</span>
          </button>
        ))}
      </main>
      {!microphoneConsent && (
        <p id="category-consent-hint" className="consent-hint">
          Confirme a autorização acima para iniciar uma atividade com microfone.
        </p>
      )}
    </div>
  );
}

// ============================================================
// COMPONENTE: TrainingScreen
// ============================================================
function TrainingScreen({
  categoriaSelecionada,
  onBack,
  modoFonoAtivo,
  setModoFonoAtivo,
  ageInMonths,
  onAttempt,
  onProfessionalNote,
}) {
  const palavrasDaCategoria = WORDS.filter(
    (w) => w.categoria === categoriaSelecionada
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSupported, setIsSupported] = useState(
    () => Boolean(window.SpeechRecognition || window.webkitSpeechRecognition)
  );
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [accuracy, setAccuracy] = useState(null);
  const [recognitionConfidence, setRecognitionConfidence] = useState(null);
  const [fonoInfo, setFonoInfo] = useState(null);
  const [showCongrats, setShowCongrats] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [estrelasSessao, setEstrelasSessao] = useState(0);
  const [palavrasPontuadas, setPalavrasPontuadas] = useState(() => new Set());
  const objetivoSessao = 5;

  const currentWord =
    palavrasDaCategoria[currentIndex % palavrasDaCategoria.length];

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
    setRecognitionConfidence(null);
    setFeedback("");
    setShowCongrats(false);
    setFonoInfo(null);

    recognition.onresult = (event) => {
      const recognitionResult = event.results[0][0];
      const transcript = recognitionResult.transcript.trim();
      setSpokenText(transcript);
      setRecognitionConfidence(recognitionResult.confidence || null);
      const sim = getSimilarity(currentWord.palavra, transcript);
      setAccuracy(sim);
      onAttempt({
        wordId: currentWord.id,
        palavra: currentWord.palavra,
        categoria: currentWord.categoria,
        transcricao: transcript,
        similaridade: sim,
        reconhecida: sim >= 0.85,
      });
      if (sim >= 0.85) {
        setFeedback("Muito bem! O aplicativo reconheceu a palavra esperada. 🎉");
        if (!palavrasPontuadas.has(currentWord.id)) {
          setPalavrasPontuadas((previous) => {
            const updated = new Set(previous);
            updated.add(currentWord.id);
            return updated;
          });
          setEstrelasSessao((previous) => Math.min(objetivoSessao, previous + 1));
        }
        setShowCongrats(true);
      } else if (sim >= 0.6) {
        setFeedback("O reconhecedor encontrou uma palavra parecida. Tente novamente com calma.");
      } else {
        setFeedback("O aplicativo não reconheceu a palavra desta vez. Isso pode ser uma limitação do microfone ou do reconhecedor.");
      }
      if (modoFonoAtivo) {
        const analise = analyzeTranscription(transcript, currentWord);
        setFonoInfo(analise);
      }
    };
    recognition.onerror = (event) => {
      const message =
        event.error === "not-allowed"
          ? "O acesso ao microfone foi bloqueado. Libere a permissão no navegador."
          : event.error === "no-speech"
          ? "Não detectamos fala. Tente novamente em um lugar mais silencioso."
          : "Não foi possível usar o reconhecimento de voz. Tente novamente.";
      setFeedback(message);
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
    setRecognitionConfidence(null);
    setFeedback("");
    setFonoInfo(null);
    setImageFailed(false);
    setCurrentIndex((prev) =>
      prev + 1 < palavrasDaCategoria.length ? prev + 1 : 0
    );
  }

  function previousWord() {
    setShowCongrats(false);
    setSpokenText("");
    setAccuracy(null);
    setRecognitionConfidence(null);
    setFeedback("");
    setFonoInfo(null);
    setImageFailed(false);
    setCurrentIndex((prev) =>
      prev - 1 >= 0 ? prev - 1 : palavrasDaCategoria.length - 1
    );
  }

  const categoriaNome = {
    animais: "Animais",
    comidas: "Comida",
    brinquedos: "Brinquedos",
    casa: "Casa",
  };

  if (!currentWord) {
    return (
      <div className="training-screen-bg">
        <div className="training-pattern" />
        <div className="training-screen">
          <header className="training-topbar">
            <button className="icon-button" onClick={onBack} title="Início">🏠</button>
            <div className="training-logo-full">
              <span className="training-logo-main">Pronúncia</span>
              <span className="training-logo-sub">Kids</span>
            </div>
            <div className="placeholder-button"></div>
          </header>
          <main className="training-card">
            <p>Nenhuma palavra encontrada para "{categoriaNome[categoriaSelecionada]}".</p>
            <button className="nav-pill" onClick={onBack}>Voltar</button>
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
          <button className="icon-button" onClick={onBack} title="Início">🏠</button>
          <div className="training-logo-full">
            <span className="training-logo-main">Pronúncia</span>
            <span className="training-logo-kids">Kids</span>
          </div>
          <button
            className={`icon-button ${modoFonoAtivo ? "icon-button-active" : ""}`}
            onClick={() => setModoFonoAtivo(!modoFonoAtivo)}
            title={modoFonoAtivo ? "Desativar Modo Fono" : "Ativar Modo Fono"}
          >
            {modoFonoAtivo ? "🧠" : "💡"}
          </button>
        </header>

        <main className="training-card">
          <p className="training-category">{categoriaNome[categoriaSelecionada]}</p>

          <div style={{ textAlign: "center", marginBottom: "0.8rem" }}>
            <p style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#FFD700", textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}>
              Estrelas desta sessão:
              {Array.from({ length: objetivoSessao }).map((_, i) => (
                <span key={i} style={{ fontSize: "1.5rem", margin: "0 2px", opacity: i < estrelasSessao ? 1 : 0.3 }}>
                  ⭐
                </span>
              ))}
              <span style={{ marginLeft: 8, fontSize: "0.9rem" }}>
                ({estrelasSessao} de {objetivoSessao})
              </span>
            </p>
          </div>

          {(currentWord.imagemUrl || currentWord.emoji) && (
            <div className="training-image-wrapper">
              {currentWord.imagemUrl && !imageFailed ? (
                <img
                  src={currentWord.imagemUrl}
                  alt={currentWord.palavra}
                  className="training-image"
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <span
                  className="training-image-fallback"
                  role="img"
                  aria-label={currentWord.palavra}
                >
                  {currentWord.emoji || "🖼️"}
                </span>
              )}
            </div>
          )}

          <p className="training-word">{currentWord.palavra.toUpperCase()}</p>

          <div className="training-audio-row">
            <button
              className="audio-button"
              onClick={() => {
                const utterance = new SpeechSynthesisUtterance(currentWord.palavra);
                utterance.lang = "pt-BR";
                speechSynthesis.speak(utterance);
              }}
              aria-label={`Ouvir a palavra ${currentWord.palavra}`}
            >
              🔊
            </button>
            <button
              className={`mic-button ${isListening ? "mic-button-listening" : ""}`}
              onClick={startListening}
              disabled={!isSupported || isListening}
              aria-label={isListening ? "Ouvindo" : "Falar a palavra"}
            >
              🎙️
            </button>
          </div>

          <div className="training-result-box" aria-live="polite">
            <p className="training-result-line">
              <strong>Você disse:</strong> {spokenText || "—"}
            </p>
            {accuracy !== null && (
              <p className="training-result-line">
                <strong>Semelhança da transcrição:</strong> {(accuracy * 100).toFixed(0)}%
              </p>
            )}
            {feedback && <p className="training-feedback">{feedback}</p>}

            {modoFonoAtivo && fonoInfo && (
              <TechnicalAnalysis
                targetWord={currentWord}
                spokenText={spokenText}
                similarity={accuracy}
                recognitionConfidence={recognitionConfidence}
                analysis={fonoInfo}
                ageInMonths={ageInMonths}
              />
            )}
          </div>

          <div className="training-bottom-buttons">
            <button className="nav-pill nav-pill-left" onClick={previousWord}>◀ Anterior</button>
            <button className="nav-pill nav-pill-right" onClick={nextWord}>Próxima ▶</button>
          </div>

          {modoFonoAtivo && (
            <ProfessionalReview
              key={currentWord.id}
              word={currentWord}
              onSave={onProfessionalNote}
            />
          )}
        </main>

        {showCongrats && (
          <div className="congrats-overlay" role="presentation">
            <div className="congrats-card" role="dialog" aria-modal="true" aria-labelledby="congrats-title">
              <div className="congrats-star">⭐</div>
              <h2 id="congrats-title" className="congrats-title">Muito bem!</h2>
              <p className="congrats-word">{currentWord.palavra.toUpperCase()}</p>
              <p className="congrats-sub">
                Você já tem {estrelasSessao} de {objetivoSessao} estrelas nesta sessão!
              </p>
              <button className="congrats-button" onClick={nextWord}>Próxima palavra ▶</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


function ProgressScreen({ attempts, professionalNotes, onBack, onClear }) {
  const recognized = attempts.filter((attempt) => attempt.reconhecida).length;
  const average =
    attempts.length === 0
      ? 0
      : attempts.reduce((sum, attempt) => sum + attempt.similaridade, 0) /
        attempts.length;
  const recentAttempts = attempts.slice(-10).reverse();

  return (
    <div className="progress-container">
      <header className="progress-header">
        <button className="icon-button" onClick={onBack} title="Início">
          🏠
        </button>
        <h2>Progresso desta sessão</h2>
        <div className="placeholder-button" />
      </header>

      <main className="progress-content">
        <section className="progress-summary" aria-label="Resumo da sessão">
          <div className="progress-stat">
            <strong>{attempts.length}</strong>
            <span>Tentativas</span>
          </div>
          <div className="progress-stat">
            <strong>{recognized}</strong>
            <span>Reconhecidas</span>
          </div>
          <div className="progress-stat">
            <strong>{Math.round(average * 100)}%</strong>
            <span>Semelhança média</span>
          </div>
          <div className="progress-stat">
            <strong>{professionalNotes.length}</strong>
            <span>Registros manuais</span>
          </div>
        </section>

        <p className="progress-explanation">
          Estes números mostram apenas como o reconhecedor automático transcreveu
          as tentativas. Eles não representam nota, diagnóstico ou evolução clínica.
        </p>

        {recentAttempts.length > 0 ? (
          <>
            <h3>Últimas tentativas</h3>
            <ul className="progress-list">
              {recentAttempts.map((attempt) => (
                <li key={attempt.id}>
                  <span>
                    <strong>{attempt.palavra}</strong>
                    <small>Transcrição: {attempt.transcricao}</small>
                  </span>
                  <span className={attempt.reconhecida ? "recognized" : "try-again"}>
                    {Math.round(attempt.similaridade * 100)}%
                  </span>
                </li>
              ))}
            </ul>
            <button className="progress-clear" onClick={onClear}>
              Limpar dados desta sessão
            </button>
          </>
        ) : (
          <p className="progress-empty">
            Ainda não há tentativas nesta sessão. Escolha uma categoria e experimente
            uma palavra.
          </p>
        )}

        {professionalNotes.length > 0 && (
          <section className="professional-notes-summary">
            <h3>Registros profissionais</h3>
            <ul>
              {professionalNotes.slice(-10).reverse().map((note) => (
                <li key={note.id}>
                  <strong>{note.palavra}</strong>
                  <span>{note.classification.replaceAll("_", " ")}</span>
                  {note.notes && <small>{note.notes}</small>}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

// ============================================================
// COMPONENTE: AACScreen — Comunicação Alternativa
// ============================================================
// ============================================================
// COMPONENTE: AACScreen — Comunicação Alternativa com Níveis
// ============================================================
function AACScreen({ onBack }) {
  const [nivel, setNivel] = useState(1); // 1, 2 ou 3
  const [contexto, setContexto] = useState("geral");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("quem");
  const [slotsSelecionados, setSlotsSelecionados] = useState({
    quem: null,
    verbo: null,
    complemento: null,
  });

  const simbolosDaCategoria = AAC_SYMBOLS.filter(
    (s) =>
      s.categoria === categoriaSelecionada &&
      (s.contexto === "geral" || s.contexto === contexto)
  );
  const atalhosDoContexto = AAC_ATALHOS.filter(
    (shortcut) =>
      shortcut.contexto === "geral" || shortcut.contexto === contexto
  );

  const falar = (texto) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = "pt-BR";
    window.speechSynthesis.speak(u);
  };

  const limparTudo = () => {
    setSlotsSelecionados({ quem: null, verbo: null, complemento: null });
  };

  const falarFraseCompleta = () => {
    // Nível 1: não tem slots, então não faz nada especial aqui
    if (nivel === 1) return;

    // Nível 2: QUEM + COMPLEMENTO, verbo implícito
    if (nivel === 2) {
      const quem = slotsSelecionados.quem;
      const comp = slotsSelecionados.complemento;
      if (!comp && !quem) return;

      // Se só complemento: "Eu quero água"
      if (comp && !quem) {
        falar(`Eu quero ${comp.fala || comp.texto}`);
        return;
      }

      // Se tem quem e complemento: "Eu quero brincar", "Eu estou triste" (dá pra ajustar depois)
      if (quem && comp) {
        falar(`${quem.fala || quem.texto} quer ${comp.fala || comp.texto}`);
        return;
      }

      return;
    }

    // Nível 3: usa os 3 slots (modelo atual)
    if (nivel === 3) {
      const partes = AAC_SLOTS.map((slot) => {
        const s = slotsSelecionados[slot];
        return s ? (s.fala || s.texto) : null;
      }).filter(Boolean);

      if (partes.length === 0) return;

      // Se só complemento: completa com "Eu quero ..."
      if (
        partes.length === 1 &&
        slotsSelecionados.complemento &&
        !slotsSelecionados.quem &&
        !slotsSelecionados.verbo
      ) {
        falar(
          `Eu quero ${
            slotsSelecionados.complemento.fala ||
            slotsSelecionados.complemento.texto
          }`
        );
        return;
      }

      falar(partes.join(" "));
    }
  };

  const handleSymbolClick = (simbolo) => {
    // NÍVEL 1 — símbolo sozinho fala frase pronta
    if (nivel === 1) {
      // se no futuro você quiser, pode ter campo fala_sozinho em cada símbolo
      const frase =
        simbolo.fala_sozinho ||
        simbolo.fala ||
        simbolo.texto;
      falar(frase);
      return;
    }

    // NÍVEL 2 — QUEM + COMPLEMENTO (verbo implícito)
    if (nivel === 2) {
      if (!simbolo.slot) {
        falar(simbolo.fala || simbolo.texto);
        return;
      }

      // só permite preencher quem e complemento
      if (simbolo.slot === "verbo") {
        // verbo não é usado no nível 2
        falar(simbolo.fala || simbolo.texto);
        return;
      }

      setSlotsSelecionados((prev) => ({
        ...prev,
        [simbolo.slot]: simbolo,
      }));

      // feedback imediato
      falar(simbolo.fala || simbolo.texto);
      return;
    }

    // NÍVEL 3 — QUEM + VERBO + COMPLEMENTO (como já era)
    if (nivel === 3) {
      if (simbolo.slot) {
        setSlotsSelecionados((prev) => ({
          ...prev,
          [simbolo.slot]: simbolo,
        }));
      }
      falar(simbolo.fala || simbolo.texto);
    }
  };

  const temAlgoSelecionado =
    slotsSelecionados.quem ||
    slotsSelecionados.verbo ||
    slotsSelecionados.complemento;

  return (
    <div className="aac-container">
      {/* Header */}
      <header className="aac-header">
        <button className="icon-button" onClick={onBack} title="Início">
          🏠
        </button>
        <h2 className="aac-title">Comunicação Alternativa</h2>
        <div className="placeholder-button"></div>
      </header>

      <nav className="aac-context-bar" aria-label="Contexto da comunicação">
        {AAC_CONTEXTS.map((context) => (
          <button
            key={context.id}
            className={`aac-context-btn ${
              contexto === context.id ? "active" : ""
            }`}
            aria-pressed={contexto === context.id}
            onClick={() => {
              setContexto(context.id);
              setCategoriaSelecionada("quem");
              limparTudo();
            }}
          >
            <span className="aac-context-emoji" aria-hidden="true">
              {context.emoji}
            </span>
            <span className="aac-context-label">{context.label}</span>
          </button>
        ))}
      </nav>

      <section className="aac-atalhos-bar" aria-label="Frases rápidas">
        {atalhosDoContexto.map((shortcut) => (
          <button
            key={shortcut.id}
            className="aac-atalho-card"
            onClick={() => falar(shortcut.fala)}
          >
            <span className="aac-atalho-emoji" aria-hidden="true">
              {shortcut.emoji}
            </span>
            <span className="aac-atalho-label">{shortcut.label}</span>
          </button>
        ))}
      </section>

      {/* Seletor de Nível */}
      <div className="aac-level-bar">
        <span className="aac-level-label">Nível:</span>
        <button
          className={`aac-level-btn ${nivel === 1 ? "active" : ""}`}
          aria-label="Nível 1: símbolo único"
          aria-pressed={nivel === 1}
          onClick={() => {
            setNivel(1);
            limparTudo();
          }}
        >
          1
        </button>
        <button
          className={`aac-level-btn ${nivel === 2 ? "active" : ""}`}
          aria-label="Nível 2: quem e complemento"
          aria-pressed={nivel === 2}
          onClick={() => {
            setNivel(2);
            limparTudo();
          }}
        >
          2
        </button>
        <button
          className={`aac-level-btn ${nivel === 3 ? "active" : ""}`}
          aria-label="Nível 3: frase completa"
          aria-pressed={nivel === 3}
          onClick={() => {
            setNivel(3);
            limparTudo();
          }}
        >
          3
        </button>
      </div>

      {/* Barra de frase com slots – só no nível 2 e 3 */}
      {nivel > 1 && (
        <div className="aac-phrase-bar">
          <p className="aac-phrase-bar-label">Monte sua frase:</p>
          <div className="aac-phrase-slots">
            {AAC_SLOTS.map((slot) => {
              // no nível 2, ignoramos o slot verbo visualmente
              if (nivel === 2 && slot === "verbo") return null;

              const s = slotsSelecionados[slot];
              const label =
                slot === "quem"
                  ? "👤 Quem?"
                  : slot === "verbo"
                  ? "⚙️ Verbo"
                  : "💬 O quê?";
              return (
                <div
                  key={slot}
                  className={`aac-slot ${s ? "aac-slot-filled" : ""}`}
                >
                  <span className="aac-slot-label">{label}</span>
                  {s ? (
                    <div className="aac-slot-token">
                      <span className="aac-slot-emoji">{s.emoji}</span>
                      <span className="aac-slot-text">{s.texto}</span>
                    </div>
                  ) : (
                    <div className="aac-slot-empty">—</div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="aac-phrase-actions">
            <button
              className="aac-action-btn aac-btn-clear"
              onClick={limparTudo}
              disabled={!temAlgoSelecionado}
            >
              🗑️ Limpar
            </button>
            <button
              className="aac-action-btn aac-btn-speak"
              onClick={falarFraseCompleta}
              disabled={!temAlgoSelecionado}
            >
              🔊 Falar frase
            </button>
          </div>
        </div>
      )}

      {/* Abas de categorias */}
      <div className="aac-categories-bar">
        {AAC_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`aac-cat-btn ${
              categoriaSelecionada === cat.id ? "active" : ""
            }`}
            aria-pressed={categoriaSelecionada === cat.id}
            onClick={() => setCategoriaSelecionada(cat.id)}
          >
            <span className="aac-cat-emoji">{cat.emoji}</span>
            <span className="aac-cat-label">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Grid de símbolos */}
      <main className="aac-symbols-grid">
        {simbolosDaCategoria.map((simbolo) => (
          <button
            key={simbolo.id}
            className={`aac-symbol-card ${
              slotsSelecionados[simbolo.slot]?.id === simbolo.id
                ? "aac-symbol-card-selected"
                : ""
            }`}
            onClick={() => handleSymbolClick(simbolo)}
          >
            <span className="aac-symbol-emoji">{simbolo.emoji}</span>
            <span className="aac-symbol-label">{simbolo.texto}</span>
          </button>
        ))}
      </main>
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState(SCREEN.HOME);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [modoFonoAtivo, setModoFonoAtivo] = useState(false);
  const [ageYears, setAgeYears] = useState(4);
  const [ageMonths, setAgeMonths] = useState(0);
  const [microphoneConsent, setMicrophoneConsent] = useState(false);
  const [sessionAttempts, setSessionAttempts] = useState([]);
  const [professionalNotes, setProfessionalNotes] = useState([]);

if (screen === SCREEN.HOME) {
  return (
    <HomeScreen
      onStart={() => setScreen(SCREEN.CATEGORIES)}
      modoFonoAtivo={modoFonoAtivo}
      setModoFonoAtivo={setModoFonoAtivo}
      onOpenAAC={() => setScreen(SCREEN.AAC)}
      onOpenProgress={() => setScreen(SCREEN.PROGRESS)}
      onOpenSettings={() => setScreen(SCREEN.SETTINGS)}
    />
  );
}

  if (screen === SCREEN.CATEGORIES) {
    return (
      <CategoriesScreen
        onBack={() => setScreen(SCREEN.HOME)}
        ageYears={ageYears}
        ageMonths={ageMonths}
        microphoneConsent={microphoneConsent}
        onConsentChange={setMicrophoneConsent}
        onAgeChange={(years, months) => {
          setAgeYears(years);
          setAgeMonths(months);
        }}
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
        ageInMonths={ageYears * 12 + ageMonths}
        onAttempt={(attempt) =>
          setSessionAttempts((previous) => [
            ...previous,
            {
              ...attempt,
              id: `${Date.now()}-${previous.length}`,
            },
          ])
        }
        onProfessionalNote={(note) =>
          setProfessionalNotes((previous) => [
            ...previous,
            {
              ...note,
              id: `${Date.now()}-${previous.length}`,
            },
          ])
        }
      />
    );
  }

  if (screen === SCREEN.AAC) {
    return <AACScreen onBack={() => setScreen(SCREEN.HOME)} />;
  }

  if (screen === SCREEN.PROGRESS) {
    return (
      <ProgressScreen
        attempts={sessionAttempts}
        professionalNotes={professionalNotes}
        onBack={() => setScreen(SCREEN.HOME)}
        onClear={() => {
          setSessionAttempts([]);
          setProfessionalNotes([]);
        }}
      />
    );
  }

  if (screen === SCREEN.SETTINGS) {
    return (
      <SettingsScreen
        modoFonoAtivo={modoFonoAtivo}
        onFonoModeChange={setModoFonoAtivo}
        onBack={() => setScreen(SCREEN.HOME)}
      />
    );
  }

  return null;
}

export default App;
