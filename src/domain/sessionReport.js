export const SESSION_REPORT_SCHEMA_VERSION = 1;

const PROFESSIONAL_LABELS = {
  adequada_percebida: "Produção percebida como esperada",
  omissao: "Omissão percebida",
  substituicao: "Substituição percebida",
  distorcao: "Distorção percebida",
  inconclusiva: "Observação inconclusiva",
  outro: "Outro",
  espontanea: "Produção espontânea",
  imitacao: "Imitação após modelo",
  pista_visual: "Após pista visual",
  pista_verbal: "Após pista verbal",
  inicial: "Inicial",
  medial: "Medial",
  final: "Final",
  encontro: "Encontro consonantal",
  nao_aplicavel: "Não aplicável",
  nao_avaliada: "Não avaliada",
  presente: "Presente",
  parcial: "Parcial",
  ausente: "Ausente",
  consistente: "Consistente",
  inconsistente: "Inconsistente",
  totalmente_compreensivel: "Totalmente compreensível",
  parcialmente_compreensivel: "Parcialmente compreensível",
  pouco_compreensivel: "Pouco compreensível",
};

export function getProfessionalLabel(value) {
  return PROFESSIONAL_LABELS[value] || value?.replaceAll("_", " ") || "Não informado";
}

export function buildSessionReport({
  attempts = [],
  professionalNotes = [],
  ageInMonths = null,
  exportedAt = new Date().toISOString(),
}) {
  return {
    schemaVersion: SESSION_REPORT_SCHEMA_VERSION,
    exportedAt,
    ageInMonths: Number.isInteger(ageInMonths) ? ageInMonths : null,
    methodologicalNotice:
      "As transcrições automáticas são dados auxiliares da Web Speech API e não constituem avaliação fonética, triagem ou diagnóstico.",
    attempts,
    professionalRecords: professionalNotes,
  };
}
