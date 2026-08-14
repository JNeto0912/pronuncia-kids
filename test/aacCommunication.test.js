import test from "node:test";
import assert from "node:assert/strict";
import {
  buildAACPhrase,
  buildAACSessionReport,
} from "../src/domain/aacCommunication.js";

const eu = { id: "eu", fala: "Eu" };
const quero = { id: "quero", fala: "quero" };
const agua = { id: "agua", fala: "água" };

test("monta frase de duas partes com verbo funcional implícito", () => {
  assert.equal(
    buildAACPhrase(2, { quem: eu, complemento: agua }),
    "Eu quero água"
  );
});

test("monta frase completa preservando a ordem dos símbolos", () => {
  assert.equal(
    buildAACPhrase(3, { quem: eu, verbo: quero, complemento: agua }),
    "Eu quero água"
  );
});

test("exporta histórico sem solicitar identificação da criança", () => {
  const report = buildAACSessionReport({
    messages: [{ text: "Eu quero água" }],
    exportedAt: "2026-08-14T12:00:00.000Z",
  });
  assert.equal(report.messages.length, 1);
  assert.equal("childName" in report, false);
  assert.match(report.privacyNotice, /não contém nome/);
});
