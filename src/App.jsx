import { useState } from "react";
import "./App.css";
import { WORDS } from "./data/words";
import {
  AAC_ATALHOS,
  AAC_CATEGORIES,
  AAC_CORE_MESSAGES,
  AAC_CONTEXTS,
  AAC_ROUTINE_ITEMS,
  AAC_SYMBOLS,
  AAC_SLOTS,
} from "./data/symbols";
import {
  buildAACPhrase,
  buildAACSessionReport,
} from "./domain/aacCommunication";
import {
  analyzeTranscription,
  getSimilarity,
} from "./domain/speechAnalysis";
import ProfessionalReview from "./components/ProfessionalReview";
import TechnicalAnalysis from "./components/TechnicalAnalysis";
import SettingsScreen from "./screens/SettingsScreen";
import {
  buildSessionReport,
  getProfessionalLabel,
} from "./domain/sessionReport";

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
  onStartProfessional,
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
          <button className="home-btn home-btn-fono" onClick={onStartProfessional}>
            <span className="btn-icon">🧠</span>
            <span className="btn-text">Área do profissional</span>
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
              onChange={(event) =>
                onAgeChange(
                  event.target.value === "" ? "" : Number(event.target.value),
                  ageMonths
                )
              }
            >
              <option value="">Selecione</option>
              {Array.from({ length: 11 }, (_, value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </label>
          <label>
            Meses
            <select
              value={ageMonths}
              onChange={(event) =>
                onAgeChange(
                  ageYears,
                  event.target.value === "" ? "" : Number(event.target.value)
                )
              }
            >
              <option value="">Selecione</option>
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
          >
            <span className="category-emoji">{category.emoji}</span>
            <span className="category-label">{category.label}</span>
          </button>
        ))}
      </main>
      {!microphoneConsent && (
        <p id="category-consent-hint" className="consent-hint">
          Sem autorização, ainda é possível ouvir as palavras e praticar sem análise automática.
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
  ageInMonths,
  microphoneConsent,
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
  const [professionalTranscription, setProfessionalTranscription] = useState("");
  const [showCongrats, setShowCongrats] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [estrelasSessao, setEstrelasSessao] = useState(0);
  const [palavrasPontuadas, setPalavrasPontuadas] = useState(() => new Set());
  const objetivoSessao = 5;

  const currentWord =
    palavrasDaCategoria[currentIndex % palavrasDaCategoria.length];

  function processProduction(transcript, confidence = null, source = "speech_recognition") {
    const cleanTranscript = transcript.trim();
    if (!cleanTranscript) return;
    const automaticAnalysis = modoFonoAtivo
      ? analyzeTranscription(cleanTranscript, currentWord)
      : null;
    const sim = getSimilarity(currentWord.palavra, cleanTranscript);

    setSpokenText(cleanTranscript);
    setRecognitionConfidence(confidence);
    setAccuracy(sim);
    onAttempt({
      wordId: currentWord.id,
      palavra: currentWord.palavra,
      categoria: currentWord.categoria,
      transcricao: cleanTranscript,
      similaridade: sim,
      reconhecida: sim >= 0.85,
      transcriptionSource: source,
      automaticAssessment: automaticAnalysis,
    });
    setFeedback(
      modoFonoAtivo
        ? "Produção registrada. A avaliação automática está pronta para conferência."
        : "Muito bem por participar! Você pode tentar novamente ou seguir para a próxima palavra. 🎉"
    );
    if (!palavrasPontuadas.has(currentWord.id)) {
      setPalavrasPontuadas((previous) => {
        const updated = new Set(previous);
        updated.add(currentWord.id);
        return updated;
      });
      setEstrelasSessao((previous) => Math.min(objetivoSessao, previous + 1));
    }
    setShowCongrats(!modoFonoAtivo);
    setFonoInfo(automaticAnalysis);
  }

  function startListening() {
    if (!microphoneConsent) {
      setFeedback("O microfone não foi autorizado. Você ainda pode ouvir e praticar a palavra.");
      return;
    }
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
      processProduction(
        transcript,
        recognitionResult.confidence || null,
        "speech_recognition"
      );
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
    setProfessionalTranscription("");
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
    setProfessionalTranscription("");
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
          <div className="placeholder-button" aria-hidden="true" />
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
              disabled={!isSupported || isListening || !microphoneConsent}
              aria-label={isListening ? "Ouvindo" : "Falar a palavra"}
            >
              🎙️
            </button>
          </div>

          <div className="training-result-box" aria-live="polite">
            {modoFonoAtivo && (
              <>
                <p className="training-result-line">
                  <strong>Transcrição automática:</strong> {spokenText || "—"}
                </p>
                {accuracy !== null && (
                  <p className="training-result-line">
                    <strong>Semelhança ortográfica:</strong> {(accuracy * 100).toFixed(0)}%
                  </p>
                )}
              </>
            )}
            {!microphoneConsent && (
              <p className="training-feedback">
                Modo sem microfone: ouça a palavra e pratique no seu ritmo.
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
            <form
              className="professional-transcription-fallback"
              onSubmit={(event) => {
                event.preventDefault();
                processProduction(
                  professionalTranscription,
                  null,
                  "professional_transcription"
                );
                setProfessionalTranscription("");
              }}
            >
              <label>
                Se o navegador não reconhecer corretamente, digite a produção percebida
                <input
                  type="text"
                  value={professionalTranscription}
                  maxLength={120}
                  placeholder="Ex.: dato"
                  onChange={(event) => setProfessionalTranscription(event.target.value)}
                />
              </label>
              <button type="submit" disabled={!professionalTranscription.trim()}>
                Analisar produção
              </button>
            </form>
          )}

          {modoFonoAtivo && (
            <ProfessionalReview
              key={`${currentWord.id}:${spokenText}`}
              word={currentWord}
              automaticContext={{
                transcription: spokenText,
                similarity: accuracy,
                recognitionConfidence,
                analysis: fonoInfo,
                elicitation: "nomeacao",
              }}
              onSave={onProfessionalNote}
            />
          )}
        </main>

        {showCongrats && (
          <div className="congrats-overlay" role="presentation">
            <div className="congrats-card" role="dialog" aria-modal="true" aria-labelledby="congrats-title">
              <div className="congrats-star">⭐</div>
              <h2 id="congrats-title" className="congrats-title">Muito bem por tentar!</h2>
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


function ProgressScreen({
  attempts,
  professionalNotes,
  professionalMode,
  ageInMonths,
  onBack,
  onClear,
}) {
  const recognized = attempts.filter((attempt) => attempt.reconhecida).length;
  const average =
    attempts.length === 0
      ? 0
      : attempts.reduce((sum, attempt) => sum + attempt.similaridade, 0) /
        attempts.length;
  const recentAttempts = attempts.slice(-10).reverse();
  const practicedWords = new Set(attempts.map((attempt) => attempt.wordId)).size;

  function exportSessionReport() {
    const report = buildSessionReport({
      attempts,
      professionalNotes,
      ageInMonths,
    });
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const date = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `pronuncia-kids-sessao-${date}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

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
            <strong>{practicedWords}</strong>
            <span>Palavras praticadas</span>
          </div>
          {professionalMode && (
            <>
              <div className="progress-stat">
                <strong>{recognized}</strong>
                <span>Reconhecidas pela API</span>
              </div>
              <div className="progress-stat">
                <strong>{Math.round(average * 100)}%</strong>
                <span>Semelhança ortográfica média</span>
              </div>
            </>
          )}
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
                    {professionalMode && <small>Transcrição: {attempt.transcricao}</small>}
                  </span>
                  {professionalMode && (
                    <span className={attempt.reconhecida ? "recognized" : "try-again"}>
                      {Math.round(attempt.similaridade * 100)}%
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="progress-empty">
            Ainda não há tentativas nesta sessão. Escolha uma categoria e experimente
            uma palavra.
          </p>
        )}

        {(attempts.length > 0 || professionalNotes.length > 0) && (
          <div className="progress-actions">
            <button className="progress-clear" onClick={onClear}>
              Limpar dados desta sessão
            </button>
            {professionalMode && (
              <button className="progress-export" onClick={exportSessionReport}>
                Exportar ficha da sessão (.json)
              </button>
            )}
          </div>
        )}

        {professionalNotes.length > 0 && (
          <section className="professional-notes-summary">
            <h3>Registros profissionais</h3>
            <ul>
              {professionalNotes.slice(-10).reverse().map((note) => (
                <li key={note.id}>
                  <strong>{note.palavra}</strong>
                  {note.reviewStatus && (
                    <span className={`professional-review-status ${note.reviewStatus}`}>
                      {getProfessionalLabel(note.reviewStatus)}
                    </span>
                  )}
                  <span>{getProfessionalLabel(note.classification)}</span>
                  <small>
                    {getProfessionalLabel(note.elicitation)}
                    {note.soundPosition
                      ? ` • posição ${getProfessionalLabel(note.soundPosition).toLowerCase()}`
                      : ""}
                  </small>
                  {note.perceivedProduction && (
                    <small>Produção percebida: {note.perceivedProduction}</small>
                  )}
                  {note.automaticTranscription && (
                    <small>Transcrição automática vinculada: {note.automaticTranscription}</small>
                  )}
                  {note.automaticAssessment?.processNames?.length > 0 && (
                    <small>
                      Hipótese automática: {note.automaticAssessment.processNames.join(" + ")}
                    </small>
                  )}
                  <small>
                    Estimulabilidade: {getProfessionalLabel(note.stimulability)} • Consistência: {getProfessionalLabel(note.consistency)} • Inteligibilidade: {getProfessionalLabel(note.intelligibility)}
                  </small>
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
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("necessidades");
  const [slotsSelecionados, setSlotsSelecionados] = useState({
    quem: null,
    verbo: null,
    complemento: null,
  });
  const [professionalToolsOpen, setProfessionalToolsOpen] = useState(false);
  const [selectionSource, setSelectionSource] = useState("child_selection");
  const [symbolSize, setSymbolSize] = useState("large");
  const [symbolSearch, setSymbolSearch] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const [lastMessage, setLastMessage] = useState("");
  const [firstRoutineId, setFirstRoutineId] = useState("");
  const [thenRoutineId, setThenRoutineId] = useState("");

  const simbolosDaCategoria = AAC_SYMBOLS.filter(
    (s) =>
      s.categoria === categoriaSelecionada &&
      (s.contexto === "geral" || s.contexto === contexto) &&
      (!symbolSearch.trim() ||
        `${s.texto} ${s.fala}`
          .toLocaleLowerCase("pt-BR")
          .includes(symbolSearch.trim().toLocaleLowerCase("pt-BR")))
  );
  const atalhosDoContexto = AAC_ATALHOS.filter(
    (shortcut) =>
      shortcut.contexto === "geral" || shortcut.contexto === contexto
  );

  const falar = (texto, origin = "symbol") => {
    const cleanText = texto?.trim();
    if (!cleanText) return;
    if ("speechSynthesis" in window && "SpeechSynthesisUtterance" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "pt-BR";
      window.speechSynthesis.speak(utterance);
    }
    const spokenAt = new Date().toISOString();
    const entry = {
      id: `${spokenAt}-${messageHistory.length}`,
      text: cleanText,
      source: selectionSource,
      origin,
      spokenAt,
    };
    setMessageHistory((previous) => [...previous.slice(-49), entry]);
    setLastMessage(cleanText);
  };

  const limparTudo = () => {
    setSlotsSelecionados({ quem: null, verbo: null, complemento: null });
  };

  const falarFraseCompleta = () => {
    falar(buildAACPhrase(nivel, slotsSelecionados), "composed_phrase");
  };

  const firstRoutine = AAC_ROUTINE_ITEMS.find((item) => item.id === firstRoutineId);
  const thenRoutine = AAC_ROUTINE_ITEMS.find((item) => item.id === thenRoutineId);

  const exportAACSession = () => {
    const report = buildAACSessionReport({
      messages: messageHistory,
      firstItem: firstRoutine || null,
      thenItem: thenRoutine || null,
    });
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `comunicacao-alternativa-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleSymbolClick = (simbolo) => {
    // NÍVEL 1 — símbolo sozinho fala frase pronta
    if (nivel === 1) {
      // se no futuro você quiser, pode ter campo fala_sozinho em cada símbolo
      const frase =
        simbolo.fala_sozinho ||
        simbolo.fala ||
        simbolo.texto;
      falar(frase, "symbol");
      return;
    }

    // NÍVEL 2 — QUEM + COMPLEMENTO (verbo implícito)
    if (nivel === 2) {
      if (!simbolo.slot) {
        falar(simbolo.fala || simbolo.texto, "symbol");
        return;
      }

      // só permite preencher quem e complemento
      if (simbolo.slot === "verbo") {
        // verbo não é usado no nível 2
        falar(simbolo.fala || simbolo.texto, "symbol");
        return;
      }

      setSlotsSelecionados((prev) => ({
        ...prev,
        [simbolo.slot]: simbolo,
      }));

      // feedback imediato
      falar(simbolo.fala || simbolo.texto, "symbol");
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
      falar(simbolo.fala || simbolo.texto, "symbol");
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

      <section className="aac-core-section" aria-labelledby="aac-core-title">
        <div className="aac-section-heading">
          <div>
            <span className="aac-section-eyebrow">Sempre no mesmo lugar</span>
            <h3 id="aac-core-title">Comunicação essencial</h3>
          </div>
          <button
            className="aac-professional-toggle"
            aria-expanded={professionalToolsOpen}
            onClick={() => setProfessionalToolsOpen((open) => !open)}
          >
            🧠 {professionalToolsOpen ? "Fechar ferramentas" : "Ferramentas do profissional"}
          </button>
        </div>
        <div className="aac-core-grid">
          {AAC_CORE_MESSAGES.map((message) => (
            <button
              key={message.id}
              className={`aac-core-card aac-intent-${message.intent}`}
              onClick={() => falar(message.fala, "core_message")}
            >
              <span aria-hidden="true">{message.emoji}</span>
              <strong>{message.label}</strong>
            </button>
          ))}
        </div>
        <p className="aac-last-message" aria-live="polite">
          {lastMessage ? (
            <>Última mensagem: <strong>{lastMessage}</strong></>
          ) : (
            "Toque em uma mensagem para ouvi-la."
          )}
        </p>
      </section>

      {professionalToolsOpen && (
        <section className="aac-professional-panel" aria-labelledby="aac-professional-title">
          <div className="aac-section-heading">
            <div>
              <span className="aac-section-eyebrow">Apoio à intervenção</span>
              <h3 id="aac-professional-title">Ferramentas do profissional</h3>
            </div>
          </div>

          <div className="aac-professional-grid">
            <div className="aac-tool-card">
              <h4>Quem está selecionando?</h4>
              <p>Separe iniciativas da criança das modelagens feitas pelo parceiro.</p>
              <div className="aac-segmented-control">
                <button
                  className={selectionSource === "child_selection" ? "active" : ""}
                  aria-pressed={selectionSource === "child_selection"}
                  onClick={() => setSelectionSource("child_selection")}
                >
                  👧 Criança
                </button>
                <button
                  className={selectionSource === "partner_modeling" ? "active" : ""}
                  aria-pressed={selectionSource === "partner_modeling"}
                  onClick={() => setSelectionSource("partner_modeling")}
                >
                  🤝 Parceiro modelando
                </button>
              </div>
            </div>

            <div className="aac-tool-card">
              <h4>Tamanho dos símbolos</h4>
              <p>Ajuste a quantidade visual conforme acesso motor, visual e sensorial.</p>
              <div className="aac-segmented-control">
                <button
                  className={symbolSize === "large" ? "active" : ""}
                  aria-pressed={symbolSize === "large"}
                  onClick={() => setSymbolSize("large")}
                >
                  Grande
                </button>
                <button
                  className={symbolSize === "compact" ? "active" : ""}
                  aria-pressed={symbolSize === "compact"}
                  onClick={() => setSymbolSize("compact")}
                >
                  Compacto
                </button>
              </div>
            </div>
          </div>

          <div className="aac-routine-card">
            <h4>Apoio visual: primeiro e depois</h4>
            <div className="aac-routine-grid">
              <label>
                <span>1. Primeiro</span>
                <select value={firstRoutineId} onChange={(event) => setFirstRoutineId(event.target.value)}>
                  <option value="">Escolha uma atividade</option>
                  {AAC_ROUTINE_ITEMS.map((item) => (
                    <option key={item.id} value={item.id}>{item.emoji} {item.label}</option>
                  ))}
                </select>
              </label>
              <span className="aac-routine-arrow" aria-hidden="true">→</span>
              <label>
                <span>2. Depois</span>
                <select value={thenRoutineId} onChange={(event) => setThenRoutineId(event.target.value)}>
                  <option value="">Escolha uma atividade</option>
                  {AAC_ROUTINE_ITEMS.map((item) => (
                    <option key={item.id} value={item.id}>{item.emoji} {item.label}</option>
                  ))}
                </select>
              </label>
            </div>
            {(firstRoutine || thenRoutine) && (
              <div className="aac-routine-preview">
                <div>{firstRoutine?.emoji || "1️⃣"}<strong>{firstRoutine?.label || "Primeiro"}</strong></div>
                <span>depois</span>
                <div>{thenRoutine?.emoji || "2️⃣"}<strong>{thenRoutine?.label || "Depois"}</strong></div>
              </div>
            )}
            <button
              className="aac-routine-speak"
              disabled={!firstRoutine || !thenRoutine}
              onClick={() => falar(
                `Primeiro ${firstRoutine.fala}. Depois ${thenRoutine.fala}.`,
                "visual_routine"
              )}
            >
              🔊 Falar sequência
            </button>
          </div>

          <div className="aac-history-card">
            <div className="aac-history-heading">
              <div>
                <h4>Histórico desta sessão</h4>
                <p>{messageHistory.length} mensagens, sem nome ou identificação.</p>
              </div>
              <div>
                <button onClick={exportAACSession} disabled={messageHistory.length === 0}>
                  Exportar
                </button>
                <button onClick={() => setMessageHistory([])} disabled={messageHistory.length === 0}>
                  Limpar
                </button>
              </div>
            </div>
            {messageHistory.length > 0 && (
              <ul>
                {messageHistory.slice(-6).reverse().map((entry) => (
                  <li key={entry.id}>
                    <span>{entry.text}</span>
                    <small>{entry.source === "partner_modeling" ? "Modelagem do parceiro" : "Seleção da criança"}</small>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside className="aac-partner-guidance">
            <strong>Para o parceiro:</strong> modele tocando nos símbolos enquanto fala,
            aguarde a resposta e aceite fala, gesto, olhar ou seleção no painel. Não exija repetição.
          </aside>
        </section>
      )}

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
              setCategoriaSelecionada(nivel === 1 ? "necessidades" : "quem");
              setSymbolSearch("");
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
        <span className="aac-strip-label">Frases do contexto</span>
        {atalhosDoContexto.map((shortcut) => (
          <button
            key={shortcut.id}
            className="aac-atalho-card"
            onClick={() => falar(shortcut.fala, "context_shortcut")}
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
        <span className="aac-level-label">Construção da mensagem:</span>
        <button
          className={`aac-level-btn ${nivel === 1 ? "active" : ""}`}
          aria-label="Nível 1: símbolo único"
          aria-pressed={nivel === 1}
          onClick={() => {
            setNivel(1);
            setCategoriaSelecionada("necessidades");
            limparTudo();
          }}
        >
          1 toque
        </button>
        <button
          className={`aac-level-btn ${nivel === 2 ? "active" : ""}`}
          aria-label="Nível 2: quem e complemento"
          aria-pressed={nivel === 2}
          onClick={() => {
            setNivel(2);
            setCategoriaSelecionada("quem");
            limparTudo();
          }}
        >
          2 partes
        </button>
        <button
          className={`aac-level-btn ${nivel === 3 ? "active" : ""}`}
          aria-label="Nível 3: frase completa"
          aria-pressed={nivel === 3}
          onClick={() => {
            setNivel(3);
            setCategoriaSelecionada("quem");
            limparTudo();
          }}
        >
          Frase
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
      <label className="aac-symbol-search">
        <span>Buscar palavra</span>
        <input
          type="search"
          value={symbolSearch}
          placeholder="Ex.: água, brincar, medo"
          onChange={(event) => setSymbolSearch(event.target.value)}
        />
      </label>

      <div className="aac-categories-bar" aria-label="Categorias de palavras">
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
      <main className={`aac-symbols-grid aac-symbols-grid-${symbolSize}`}>
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
        {simbolosDaCategoria.length === 0 && (
          <p className="aac-no-symbols">Nenhuma palavra encontrada nesta categoria.</p>
        )}
      </main>
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState(SCREEN.HOME);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [modoFonoAtivo, setModoFonoAtivo] = useState(false);
  const [ageYears, setAgeYears] = useState("");
  const [ageMonths, setAgeMonths] = useState("");
  const [microphoneConsent, setMicrophoneConsent] = useState(false);
  const [sessionAttempts, setSessionAttempts] = useState([]);
  const [professionalNotes, setProfessionalNotes] = useState([]);

if (screen === SCREEN.HOME) {
  return (
    <HomeScreen
      onStart={() => {
        setModoFonoAtivo(false);
        setScreen(SCREEN.CATEGORIES);
      }}
      onStartProfessional={() => {
        setModoFonoAtivo(true);
        setScreen(SCREEN.CATEGORIES);
      }}
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
        microphoneConsent={microphoneConsent}
        ageInMonths={
          Number.isInteger(ageYears) && Number.isInteger(ageMonths)
            ? ageYears * 12 + ageMonths
            : null
        }
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
        professionalMode={modoFonoAtivo}
        ageInMonths={
          Number.isInteger(ageYears) && Number.isInteger(ageMonths)
            ? ageYears * 12 + ageMonths
            : null
        }
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
