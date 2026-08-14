import { useMemo, useState } from "react";
import {
  buildAutomaticProfessionalDraft,
  isAutomaticDraftCorrected,
} from "../domain/professionalAssessment.js";

const OBSERVATION_OPTIONS = [
  { value: "", label: "Selecione uma observação" },
  { value: "adequada_percebida", label: "Produção correspondente ao alvo" },
  { value: "omissao", label: "Omissão percebida" },
  { value: "substituicao", label: "Substituição percebida" },
  { value: "distorcao", label: "Distorção percebida" },
  { value: "inconclusiva", label: "Observação inconclusiva" },
  { value: "outro", label: "Outro" },
];

export default function ProfessionalReview({ word, automaticContext, onSave }) {
  const {
    analysis,
    transcription,
    similarity,
    recognitionConfidence,
    elicitation: automaticElicitation,
  } = automaticContext || {};
  const automaticDraft = useMemo(
    () =>
      buildAutomaticProfessionalDraft({
        analysis,
        transcription,
        similarity,
        recognitionConfidence,
        elicitation: automaticElicitation || "nomeacao",
        targetWord: word,
      }),
    [
      analysis,
      transcription,
      similarity,
      recognitionConfidence,
      automaticElicitation,
      word,
    ]
  );
  const [classification, setClassification] = useState(
    automaticDraft?.classification || ""
  );
  const [elicitation, setElicitation] = useState(
    automaticDraft?.elicitation || ""
  );
  const [soundPosition, setSoundPosition] = useState(
    automaticDraft?.soundPosition || ""
  );
  const [perceivedProduction, setPerceivedProduction] = useState(
    automaticDraft?.perceivedProduction || ""
  );
  const [stimulability, setStimulability] = useState(
    automaticDraft?.stimulability || "nao_avaliada"
  );
  const [consistency, setConsistency] = useState(
    automaticDraft?.consistency || "nao_avaliada"
  );
  const [intelligibility, setIntelligibility] = useState(
    automaticDraft?.intelligibility || "nao_avaliada"
  );
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const reviewedValues = {
    classification,
    elicitation,
    soundPosition,
    perceivedProduction: perceivedProduction.trim(),
    stimulability,
    consistency,
    intelligibility,
  };
  const corrected = isAutomaticDraftCorrected(automaticDraft, reviewedValues);

  function handleSubmit(event) {
    event.preventDefault();
    if (!automaticDraft || !classification || !elicitation) return;
    onSave({
      wordId: word.id,
      palavra: word.palavra,
      ...reviewedValues,
      notes: notes.trim(),
      automaticTranscription: transcription || null,
      automaticSimilarity: automaticDraft.similarity,
      recognitionConfidence: automaticDraft.recognitionConfidence,
      automaticAssessment: {
        analysisType: automaticDraft.analysisType,
        suggestedClassification: automaticDraft.classification,
        suggestedElicitation: automaticDraft.elicitation,
        suggestedSoundPosition: automaticDraft.soundPosition,
        processIds: automaticDraft.processIds,
        processNames: automaticDraft.processNames,
        summary: automaticDraft.summary,
        source: automaticDraft.source,
      },
      reviewStatus: corrected
        ? "corrigida_pelo_profissional"
        : "confirmada_pelo_profissional",
      reviewedAt: new Date().toISOString(),
      recordedAt: new Date().toISOString(),
    });
    setSaved(true);
  }

  return (
    <form className="professional-review" onSubmit={handleSubmit}>
      <div className="professional-review-heading">
        <div>
          <span className="automatic-review-badge">Sugestão automática</span>
          <h3>Avaliação para conferência</h3>
        </div>
        {automaticDraft && (
          <span className="review-required-badge">Revisão obrigatória</span>
        )}
      </div>

      {!automaticDraft ? (
        <p className="professional-waiting">
          Grave uma tentativa. A sugestão será preenchida automaticamente para o
          profissional confirmar ou corrigir.
        </p>
      ) : (
        <>
          <div className="professional-automatic-context">
            <strong>{automaticDraft.summary}</strong>
            <span>
              Transcrição: {transcription}
              {automaticDraft.processNames.length > 0
                ? ` • Hipótese: ${automaticDraft.processNames.join(" + ")}`
                : ""}
            </span>
            <small>
              Resultado auxiliar baseado no reconhecedor de voz e nas regras
              cadastradas. Confirme ouvindo a produção da criança.
            </small>
          </div>

          <label>
            Classificação sugerida
            <select
              value={classification}
              onChange={(event) => {
                setClassification(event.target.value);
                setSaved(false);
              }}
            >
              {OBSERVATION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <div className="professional-fields-grid">
            <label>
              Contexto da produção
              <select
                value={elicitation}
                onChange={(event) => {
                  setElicitation(event.target.value);
                  setSaved(false);
                }}
              >
                <option value="">Selecione o contexto</option>
                <option value="nomeacao">Nomeação pela figura/palavra</option>
                <option value="espontanea">Produção espontânea</option>
                <option value="imitacao">Imitação após modelo</option>
                <option value="pista_visual">Após pista visual</option>
                <option value="pista_verbal">Após pista verbal</option>
              </select>
            </label>
            <label>
              Posição sugerida
              <select value={soundPosition} onChange={(event) => setSoundPosition(event.target.value)}>
                <option value="">Não identificada</option>
                <option value="inicial">Inicial</option>
                <option value="medial">Medial</option>
                <option value="final">Final</option>
                <option value="encontro">Encontro consonantal</option>
                <option value="nao_aplicavel">Não aplicável</option>
              </select>
            </label>
            <label>
              Estimulabilidade
              <select value={stimulability} onChange={(event) => setStimulability(event.target.value)}>
                <option value="nao_avaliada">Não avaliada automaticamente</option>
                <option value="presente">Presente</option>
                <option value="parcial">Parcial</option>
                <option value="ausente">Ausente</option>
              </select>
            </label>
            <label>
              Consistência
              <select value={consistency} onChange={(event) => setConsistency(event.target.value)}>
                <option value="nao_avaliada">Não avaliada automaticamente</option>
                <option value="consistente">Consistente</option>
                <option value="inconsistente">Inconsistente</option>
              </select>
            </label>
            <label>
              Inteligibilidade percebida
              <select value={intelligibility} onChange={(event) => setIntelligibility(event.target.value)}>
                <option value="nao_avaliada">Confirmar manualmente</option>
                <option value="totalmente_compreensivel">Totalmente compreensível</option>
                <option value="parcialmente_compreensivel">Parcialmente compreensível</option>
                <option value="pouco_compreensivel">Pouco compreensível</option>
              </select>
            </label>
          </div>
          <label>
            Produção transcrita
            <input
              type="text"
              value={perceivedProduction}
              maxLength={120}
              placeholder="Ex.: /ˈpatu/ ou descrição breve da produção"
              onChange={(event) => {
                setPerceivedProduction(event.target.value);
                setSaved(false);
              }}
            />
          </label>
          <label>
            Notas opcionais do profissional
            <textarea
              value={notes}
              maxLength={500}
              placeholder="Acrescente somente se precisar complementar a avaliação"
              onChange={(event) => {
                setNotes(event.target.value);
                setSaved(false);
              }}
            />
          </label>
          <button type="submit" disabled={!classification || !elicitation}>
            {corrected
              ? "Salvar avaliação corrigida"
              : "Confirmar avaliação automática"}
          </button>
          {saved && (
            <span role="status">
              {corrected
                ? "Avaliação corrigida e registrada nesta sessão."
                : "Avaliação automática confirmada e registrada nesta sessão."}
            </span>
          )}
        </>
      )}
    </form>
  );
}
