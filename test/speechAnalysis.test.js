import test from "node:test";
import assert from "node:assert/strict";
import { WORDS } from "../src/data/words.js";
import {
  analyzeTranscription,
  getAgeGuidance,
  getSimilarity,
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
