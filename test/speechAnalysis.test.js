import test from "node:test";
import assert from "node:assert/strict";
import { WORDS } from "../src/data/words.js";
import {
  analyzeTranscription,
  formatAgeInMonths,
  formatRecognitionConfidence,
  getAgeGuidance,
  getSimilarity,
  getTechnicalStatus,
  normalizeText,
  parseAgeLimitInMonths,
} from "../src/domain/speechAnalysis.js";

test("normaliza acentos, pontuação e espaços", () => {
  assert.equal(normalizeText("  MAÇÃ!  "), "maca");
});

test("considera palavras com e sem acento equivalentes", () => {
  assert.equal(getSimilarity("JACARÉ", "jacare"), 1);
});

test("converte idades textuais e compactas para meses", () => {
  assert.equal(parseAgeLimitInMonths("2 anos e 6 meses"), 30);
  assert.equal(parseAgeLimitInMonths("até 3:6"), 42);
});

test("identifica transcrição correspondente à palavra", () => {
  const word = WORDS.find((item) => item.id === "gato");
  assert.equal(analyzeTranscription("GATO", word).tipo, "acerto");
});

test("identifica uma variante cadastrada sem apresentar diagnóstico", () => {
  const word = WORDS.find((item) => item.id === "gato");
  const result = analyzeTranscription("dato", word);
  assert.equal(result.tipo, "erro_especifico");
  assert.equal(result.processo.revisaoPendente, true);
});

test("gera orientação diferente antes e depois da idade de referência", () => {
  const process = { idadeLimite: "3 anos" };
  assert.match(getAgeGuidance(30, process), /pode aparecer/);
  assert.match(getAgeGuidance(48, process), /acima da referência/);
});

test("formata idade e confiança para o painel técnico", () => {
  assert.equal(formatAgeInMonths(53), "4a 5m");
  assert.equal(formatAgeInMonths(null), "Não informada");
  assert.equal(formatRecognitionConfidence(0.876), "88%");
  assert.equal(formatRecognitionConfidence(0), "Não fornecida");
});

test("distingue os estados técnicos sem emitir diagnóstico", () => {
  assert.deepEqual(getTechnicalStatus({ tipo: "acerto" }), {
    code: "correspondencia_alvo",
    label: "Transcrição correspondente ao alvo",
    tone: "positive",
  });
  assert.equal(
    getTechnicalStatus({ tipo: "erro_especifico" }).code,
    "variante_cadastrada"
  );
  assert.equal(
    getTechnicalStatus({ tipo: "nao_classificado" }).code,
    "nao_classificada"
  );
});
