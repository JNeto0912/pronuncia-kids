import { useState } from "react";

const OBSERVATION_OPTIONS = [
  { value: "", label: "Selecione uma observação" },
  { value: "adequada_percebida", label: "Produção percebida como esperada" },
  { value: "omissao", label: "Omissão percebida" },
  { value: "substituicao", label: "Substituição percebida" },
  { value: "distorcao", label: "Distorção percebida" },
  { value: "inconclusiva", label: "Observação inconclusiva" },
  { value: "outro", label: "Outro" },
];

export default function ProfessionalReview({ word, automaticContext, onSave }) {
  const [classification, setClassification] = useState("");
  const [elicitation, setElicitation] = useState("");
  const [soundPosition, setSoundPosition] = useState("");
  const [perceivedProduction, setPerceivedProduction] = useState("");
  const [stimulability, setStimulability] = useState("nao_avaliada");
  const [consistency, setConsistency] = useState("nao_avaliada");
  const [intelligibility, setIntelligibility] = useState("nao_avaliada");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (!classification || !elicitation) return;
    onSave({
      wordId: word.id,
      palavra: word.palavra,
      classification,
      elicitation,
      soundPosition,
      perceivedProduction: perceivedProduction.trim(),
      stimulability,
      consistency,
      intelligibility,
      notes: notes.trim(),
      automaticTranscription: automaticContext?.transcription || null,
      automaticSimilarity: Number.isFinite(automaticContext?.similarity)
        ? automaticContext.similarity
        : null,
      recognitionConfidence: Number.isFinite(automaticContext?.recognitionConfidence)
        ? automaticContext.recognitionConfidence
        : null,
      recordedAt: new Date().toISOString(),
    });
    setClassification("");
    setElicitation("");
    setSoundPosition("");
    setPerceivedProduction("");
    setStimulability("nao_avaliada");
    setConsistency("nao_avaliada");
    setIntelligibility("nao_avaliada");
    setNotes("");
    setSaved(true);
  }

  return (
    <form className="professional-review" onSubmit={handleSubmit}>
      <h3>Registro profissional manual</h3>
      <p>Esta anotação é feita por uma pessoa e não é inferida pelo reconhecedor.</p>
      {automaticContext?.transcription && (
        <p className="professional-automatic-context">
          Transcrição automática vinculada: <strong>{automaticContext.transcription}</strong>
        </p>
      )}
      <label>
        Observação
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
            <option value="espontanea">Produção espontânea</option>
            <option value="imitacao">Imitação após modelo</option>
            <option value="pista_visual">Após pista visual</option>
            <option value="pista_verbal">Após pista verbal</option>
          </select>
        </label>
        <label>
          Posição observada
          <select value={soundPosition} onChange={(event) => setSoundPosition(event.target.value)}>
            <option value="">Não informada</option>
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
            <option value="nao_avaliada">Não avaliada</option>
            <option value="presente">Presente</option>
            <option value="parcial">Parcial</option>
            <option value="ausente">Ausente</option>
          </select>
        </label>
        <label>
          Consistência
          <select value={consistency} onChange={(event) => setConsistency(event.target.value)}>
            <option value="nao_avaliada">Não avaliada</option>
            <option value="consistente">Consistente</option>
            <option value="inconsistente">Inconsistente</option>
          </select>
        </label>
        <label>
          Inteligibilidade percebida
          <select value={intelligibility} onChange={(event) => setIntelligibility(event.target.value)}>
            <option value="nao_avaliada">Não avaliada</option>
            <option value="totalmente_compreensivel">Totalmente compreensível</option>
            <option value="parcialmente_compreensivel">Parcialmente compreensível</option>
            <option value="pouco_compreensivel">Pouco compreensível</option>
          </select>
        </label>
      </div>
      <label>
        Produção percebida ou transcrição manual
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
        Notas da sessão
        <textarea
          value={notes}
          maxLength={500}
          placeholder="Contexto, posição do fonema ou observações relevantes"
          onChange={(event) => {
            setNotes(event.target.value);
            setSaved(false);
          }}
        />
      </label>
      <button type="submit" disabled={!classification || !elicitation}>
        Registrar observação
      </button>
      {saved && <span role="status">Observação registrada nesta sessão.</span>}
    </form>
  );
}
