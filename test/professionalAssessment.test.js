import test from "node:test";
import assert from "node:assert/strict";
import {
  buildAutomaticProfessionalDraft,
  isAutomaticDraftCorrected,
} from "../src/domain/professionalAssessment.js";
import { analyzeTranscription } from "../src/domain/speechAnalysis.js";
import { WORDS } from "../src/data/words.js";

test("pré-preenche confirmação quando a transcrição corresponde ao alvo", () => {
  const word = WORDS.find((item) => item.id === "gato");
  const analysis = analyzeTranscription("gato", word);
  const draft = buildAutomaticProfessionalDraft({
    analysis,
    transcription: "gato",
    similarity: 1,
    recognitionConfidence: 0.91,
    targetWord: word,
  });

  assert.equal(draft.classification, "adequada_percebida");
  assert.equal(draft.elicitation, "nomeacao");
  assert.equal(draft.soundPosition, "nao_aplicavel");
  assert.equal(draft.requiresProfessionalReview, true);
});

test("sugere substituição e preserva a hipótese cadastrada", () => {
  const word = WORDS.find((item) => item.id === "gato");
  const analysis = analyzeTranscription("dato", word);
  const draft = buildAutomaticProfessionalDraft({
    analysis,
    transcription: "dato",
    similarity: 0.75,
    targetWord: word,
  });

  assert.equal(draft.classification, "substituicao");
  assert.equal(draft.soundPosition, "inicial");
  assert.deepEqual(draft.processIds, ["frontalizacao_velar"]);
});

test("marca como corrigida quando o profissional altera a sugestão", () => {
  const draft = {
    classification: "substituicao",
    elicitation: "nomeacao",
    soundPosition: "inicial",
    perceivedProduction: "dato",
    stimulability: "nao_avaliada",
    consistency: "nao_avaliada",
    intelligibility: "nao_avaliada",
  };

  assert.equal(isAutomaticDraftCorrected(draft, draft), false);
  assert.equal(
    isAutomaticDraftCorrected(draft, { ...draft, classification: "distorcao" }),
    true
  );
});
