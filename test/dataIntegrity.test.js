import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { WORDS } from "../src/data/words.js";
import { PHONOLOGICAL_PROCESSES } from "../src/data/phonologicalProcesses.js";
import {
  AAC_ATALHOS,
  AAC_CATEGORIES,
  AAC_CONTEXTS,
  AAC_SLOTS,
  AAC_SYMBOLS,
} from "../src/data/symbols.js";

function assertUniqueIds(items, collectionName) {
  const ids = items.map((item) => item.id);
  assert.equal(
    new Set(ids).size,
    ids.length,
    `${collectionName} contém identificadores duplicados`
  );
}

test("palavras têm identificadores únicos e categorias conhecidas", () => {
  const validCategories = new Set(["animais", "comidas", "brinquedos", "casa"]);
  assertUniqueIds(WORDS, "WORDS");

  for (const word of WORDS) {
    assert.ok(word.palavra, `Palavra ausente em ${word.id}`);
    assert.ok(validCategories.has(word.categoria), `Categoria inválida em ${word.id}`);
    assert.ok(
      word.imagemUrl || word.emoji,
      `${word.id} precisa de imagem ou fallback visual`
    );
    if (word.imagemUrl) {
      const imagePath = fileURLToPath(
        new URL(`../public${word.imagemUrl}`, import.meta.url)
      );
      assert.ok(existsSync(imagePath), `Imagem ausente para ${word.id}`);
    }
  }
});

test("variantes de fala têm os campos necessários", () => {
  const processIds = new Set(PHONOLOGICAL_PROCESSES.map((process) => process.id));
  for (const word of WORDS) {
    for (const rule of word.regrasErro || []) {
      assert.ok(rule.erro, `Variante sem transcrição em ${word.id}`);
      assert.ok(rule.processo, `Variante sem processo em ${word.id}`);
      assert.ok(rule.descricao, `Variante sem descrição em ${word.id}`);
      assert.ok(rule.idadeEsperada, `Variante sem idade de referência em ${word.id}`);
      assert.ok(rule.processIds?.length, `Variante sem processIds em ${word.id}`);
      for (const processId of rule.processIds) {
        assert.ok(
          processIds.has(processId),
          `Processo ${processId} não cadastrado na variante de ${word.id}`
        );
      }
    }
  }
});

test("dados de comunicação alternativa são internamente consistentes", () => {
  const categoryIds = new Set(AAC_CATEGORIES.map((category) => category.id));
  const contextIds = new Set(AAC_CONTEXTS.map((context) => context.id));
  const slots = new Set(AAC_SLOTS);

  assertUniqueIds(AAC_SYMBOLS, "AAC_SYMBOLS");
  assertUniqueIds(AAC_ATALHOS, "AAC_ATALHOS");

  for (const symbol of AAC_SYMBOLS) {
    assert.ok(categoryIds.has(symbol.categoria), `Categoria inválida em ${symbol.id}`);
    assert.ok(contextIds.has(symbol.contexto), `Contexto inválido em ${symbol.id}`);
    assert.ok(!symbol.slot || slots.has(symbol.slot), `Slot inválido em ${symbol.id}`);
    assert.ok(symbol.texto && symbol.fala, `Texto ou fala ausente em ${symbol.id}`);
  }

  for (const shortcut of AAC_ATALHOS) {
    assert.ok(contextIds.has(shortcut.contexto), `Contexto inválido em ${shortcut.id}`);
    assert.ok(shortcut.label && shortcut.fala, `Atalho incompleto em ${shortcut.id}`);
  }
});
