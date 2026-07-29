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

export default function ProfessionalReview({ word, onSave }) {
  const [classification, setClassification] = useState("");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (!classification) return;
    onSave({
      wordId: word.id,
      palavra: word.palavra,
      classification,
      notes: notes.trim(),
    });
    setClassification("");
    setNotes("");
    setSaved(true);
  }

  return (
    <form className="professional-review" onSubmit={handleSubmit}>
      <h3>Registro profissional manual</h3>
      <p>Esta anotação é feita por uma pessoa e não é inferida pelo reconhecedor.</p>
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
      <button type="submit" disabled={!classification}>
        Registrar observação
      </button>
      {saved && <span role="status">Observação registrada nesta sessão.</span>}
    </form>
  );
}
