import { normalizeText } from "./speechAnalysis.js";

function inferClassification(analysis) {
  if (analysis?.tipo === "acerto") return "adequada_percebida";
  if (analysis?.tipo !== "erro_especifico") return "inconclusiva";

  const description = normalizeText(
    [
      analysis.descricao,
      ...(analysis.processos || []).map((process) => process.nome),
    ]
      .filter(Boolean)
      .join(" ")
  );

  const suggestsOmission = /omissao|reducao|perda/.test(description);
  const suggestsSubstitution = /troca|substituicao|frontalizacao|posteriorizacao|sonorizacao|ensurdecimento|oclusivizacao/.test(
    description
  );

  if (suggestsSubstitution) return "substituicao";
  if (suggestsOmission) return "omissao";
  return "inconclusiva";
}

function inferSoundPosition(analysis, transcription, targetWord) {
  if (analysis?.tipo === "acerto") return "nao_aplicavel";
  const description = normalizeText(analysis?.descricao || "");
  if (/encontro consonantal/.test(description)) return "encontro";
  if (/inicial|silaba inicial/.test(description)) return "inicial";
  if (/final|coda/.test(description)) return "final";
  if (/medial|silaba medial/.test(description)) return "medial";

  const spoken = normalizeText(transcription);
  const target = normalizeText(targetWord?.palavra);
  if (spoken && target && spoken !== target) {
    if (spoken[0] !== target[0]) return "inicial";
    if (spoken.at(-1) !== target.at(-1)) return "final";
    return "medial";
  }
  return "";
}

function buildSummary(analysis) {
  if (analysis?.tipo === "acerto") {
    return "A transcrição automática corresponde à palavra-alvo.";
  }
  if (analysis?.tipo === "erro_especifico") {
    const processNames = (analysis.processos || [])
      .map((process) => process.nome)
      .filter(Boolean);
    return processNames.length > 0
      ? `A transcrição coincide com uma variante cadastrada: ${processNames.join(" + ")}.`
      : "A transcrição coincide com uma variante cadastrada.";
  }
  return "A transcrição não coincide com a palavra-alvo nem com uma variante cadastrada.";
}

export function buildAutomaticProfessionalDraft({
  analysis,
  transcription,
  similarity,
  recognitionConfidence,
  elicitation = "nomeacao",
  targetWord,
}) {
  const cleanTranscription = transcription?.trim() || "";
  if (!cleanTranscription || !analysis) return null;

  return {
    classification: inferClassification(analysis),
    elicitation,
    soundPosition: inferSoundPosition(analysis, cleanTranscription, targetWord),
    perceivedProduction: cleanTranscription,
    stimulability: "nao_avaliada",
    consistency: "nao_avaliada",
    intelligibility: "nao_avaliada",
    analysisType: analysis.tipo,
    processIds: (analysis.processos || [])
      .map((process) => process.id)
      .filter(Boolean),
    processNames: (analysis.processos || [])
      .map((process) => process.nome)
      .filter(Boolean),
    summary: buildSummary(analysis),
    similarity: Number.isFinite(similarity) ? similarity : null,
    recognitionConfidence: Number.isFinite(recognitionConfidence)
      ? recognitionConfidence
      : null,
    source: "web_speech_and_registered_rules",
    requiresProfessionalReview: true,
  };
}

export function isAutomaticDraftCorrected(draft, reviewedValues) {
  if (!draft) return false;
  return [
    "classification",
    "elicitation",
    "soundPosition",
    "perceivedProduction",
    "stimulability",
    "consistency",
    "intelligibility",
  ].some((field) => (reviewedValues[field] || "") !== (draft[field] || ""));
}
