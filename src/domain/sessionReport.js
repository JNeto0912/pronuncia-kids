export const SESSION_REPORT_SCHEMA_VERSION = 2;

const PROFESSIONAL_LABELS = {
  adequada_percebida: "Produção percebida como esperada",
  omissao: "Omissão percebida",
  substituicao: "Substituição percebida",
  distorcao: "Distorção percebida",
  inconclusiva: "Observação inconclusiva",
  outro: "Outro",
  espontanea: "Produção espontânea",
  nomeacao: "Nomeação pela figura/palavra",
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
  confirmada_pelo_profissional: "Sugestão automática confirmada",
  corrigida_pelo_profissional: "Sugestão automática corrigida",
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
      "As pré-avaliações são sugestões auxiliares geradas a partir da transcrição da Web Speech API e de regras cadastradas. Exigem conferência do fonoaudiólogo e não constituem diagnóstico.",
    attempts,
    professionalRecords: professionalNotes,
  };
}
