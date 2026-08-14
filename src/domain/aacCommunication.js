export const AAC_SESSION_SCHEMA_VERSION = 1;

function symbolSpeech(symbol) {
  return symbol?.fala || symbol?.texto || "";
}

function wantingVerb(subject) {
  if (subject?.id === "nos") return "queremos";
  if (subject?.id === "eu" || !subject) return "quero";
  return "quer";
}

export function buildAACPhrase(level, slots = {}) {
  const subject = slots.quem;
  const verb = slots.verbo;
  const complement = slots.complemento;

  if (level === 2) {
    if (!subject && !complement) return "";
    if (!subject) return `Eu quero ${symbolSpeech(complement)}`.trim();
    if (!complement) return symbolSpeech(subject);
    return `${symbolSpeech(subject)} ${wantingVerb(subject)} ${symbolSpeech(complement)}`.trim();
  }

  if (level === 3) {
    const selected = [subject, verb, complement].filter(Boolean);
    if (selected.length === 0) return "";
    if (!subject && !verb && complement) {
      return `Eu quero ${symbolSpeech(complement)}`.trim();
    }
    return selected.map(symbolSpeech).filter(Boolean).join(" ").trim();
  }

  return "";
}

export function buildAACSessionReport({
  messages = [],
  firstItem = null,
  thenItem = null,
  exportedAt = new Date().toISOString(),
}) {
  return {
    schemaVersion: AAC_SESSION_SCHEMA_VERSION,
    exportedAt,
    privacyNotice: "O relatório não contém nome ou identificação da criança.",
    visualRoutine: {
      first: firstItem,
      then: thenItem,
    },
    messages,
  };
}
