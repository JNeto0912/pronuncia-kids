import { PHONOLOGICAL_PROCESSES } from "../data/phonologicalProcesses.js";

export function normalizeText(text = "") {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function getSimilarity(first, second) {
  if (!first || !second) return 0;
  const normalizedFirst = normalizeText(first);
  const normalizedSecond = normalizeText(second);
  const costs = [];

  for (let i = 0; i <= normalizedFirst.length; i += 1) {
    let lastValue = i;
    for (let j = 0; j <= normalizedSecond.length; j += 1) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (normalizedFirst.charAt(i - 1) !== normalizedSecond.charAt(j - 1)) {
          newValue = Math.min(newValue, lastValue, costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[normalizedSecond.length] = lastValue;
  }

  const distance = costs[normalizedSecond.length];
  const maxLength = Math.max(normalizedFirst.length, normalizedSecond.length);
  return maxLength === 0 ? 1 : 1 - distance / maxLength;
}

export function parseAgeLimitInMonths(label) {
  if (!label) return null;
  const compactMatch = label.match(/(\d+)\s*:\s*(\d+)/);
  if (compactMatch) {
    return Number(compactMatch[1]) * 12 + Number(compactMatch[2]);
  }

  const years = label.match(/(\d+)\s*anos?/i);
  const months = label.match(/(\d+)\s*meses?/i);
  if (!years && !months) return null;
  return Number(years?.[1] || 0) * 12 + Number(months?.[1] || 0);
}

export function getAgeGuidance(ageInMonths, process) {
  const limit = parseAgeLimitInMonths(process?.idadeLimite);
  if (ageInMonths === null || limit === null) return null;

  if (ageInMonths <= limit) {
    return "Este processo pode aparecer na faixa etária informada. Observe a frequência e converse com um fonoaudiólogo se houver preocupação.";
  }

  return "A idade informada está acima da referência cadastrada para este processo. Uma ocorrência isolada não fecha diagnóstico; procure avaliação fonoaudiológica se isso for frequente.";
}

export function formatAgeInMonths(ageInMonths) {
  if (!Number.isFinite(ageInMonths) || ageInMonths < 0) return "Não informada";
  const years = Math.floor(ageInMonths / 12);
  const months = ageInMonths % 12;
  return `${years}a ${months}m`;
}

export function getTechnicalStatus(analysis) {
  if (!analysis) {
    return { code: "sem_dados", label: "Sem dados", tone: "neutral" };
  }
  if (analysis.tipo === "acerto") {
    return {
      code: "correspondencia_alvo",
      label: "Transcrição correspondente ao alvo",
      tone: "positive",
    };
  }
  if (analysis.tipo === "erro_especifico") {
    return {
      code: "variante_cadastrada",
      label: "Correspondência com variante cadastrada",
      tone: "attention",
    };
  }
  return {
    code: "nao_classificada",
    label: "Transcrição não classificada",
    tone: "neutral",
  };
}

export function formatRecognitionConfidence(confidence) {
  if (!Number.isFinite(confidence) || confidence <= 0) return "Não fornecida";
  return `${Math.round(confidence * 100)}%`;
}

function findRegisteredProcesses(processIds = []) {
  return processIds
    .map((processId) =>
      PHONOLOGICAL_PROCESSES.find((process) => process.id === processId)
    )
    .filter(Boolean);
}

export function analyzeTranscription(spoken, targetWord) {
  const spokenNormalized = normalizeText(spoken);
  const targetNormalized = normalizeText(targetWord.palavra);

  if (spokenNormalized === targetNormalized) {
    return {
      tipo: "acerto",
      descricao: "A transcrição corresponde à palavra esperada.",
    };
  }

  for (const rule of targetWord.regrasErro || []) {
    if (spokenNormalized !== normalizeText(rule.erro)) continue;
    const registeredProcesses = findRegisteredProcesses(rule.processIds);
    const fallbackProcess = {
      id: null,
      nome: rule.processo,
      definicao: rule.descricao,
      idadeLimite: rule.idadeEsperada,
      revisaoPendente: true,
    };
    const processes =
      registeredProcesses.length > 0 ? registeredProcesses : [fallbackProcess];
    return {
      tipo: "erro_especifico",
      processo: processes[0],
      processos: processes,
      descricao: rule.descricao,
      ipaCorreto: rule.ipaCorreto,
      ipaErro: rule.ipaErro,
    };
  }

  return {
    tipo: "nao_classificado",
    descricao: "A transcrição não corresponde a uma variante cadastrada.",
  };
}
