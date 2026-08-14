import test from "node:test";
import assert from "node:assert/strict";
import {
  buildSessionReport,
  getProfessionalLabel,
  SESSION_REPORT_SCHEMA_VERSION,
} from "../src/domain/sessionReport.js";

test("monta relatório de sessão versionado sem inferir diagnóstico", () => {
  const report = buildSessionReport({
    attempts: [{ wordId: "pato" }],
    professionalNotes: [{ classification: "omissao" }],
    ageInMonths: 53,
    exportedAt: "2026-08-14T12:00:00.000Z",
  });

  assert.equal(report.schemaVersion, SESSION_REPORT_SCHEMA_VERSION);
  assert.equal(report.ageInMonths, 53);
  assert.equal(report.attempts.length, 1);
  assert.equal(report.professionalRecords.length, 1);
  assert.match(report.methodologicalNotice, /Exigem conferência/);
});

test("formata códigos profissionais para apresentação", () => {
  assert.equal(getProfessionalLabel("pista_visual"), "Após pista visual");
  assert.equal(getProfessionalLabel("nomeacao"), "Nomeação pela figura/palavra");
  assert.equal(
    getProfessionalLabel("confirmada_pelo_profissional"),
    "Sugestão automática confirmada"
  );
  assert.equal(getProfessionalLabel("valor_novo"), "valor novo");
});
