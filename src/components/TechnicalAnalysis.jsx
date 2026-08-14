import {
  formatAgeInMonths,
  formatRecognitionConfidence,
  getAgeGuidance,
  getTechnicalStatus,
} from "../domain/speechAnalysis";

export default function TechnicalAnalysis({
  targetWord,
  spokenText,
  similarity,
  recognitionConfidence,
  analysis,
  ageInMonths,
}) {
  const status = getTechnicalStatus(analysis);
  const processes = analysis?.processos || (analysis?.processo ? [analysis.processo] : []);

  return (
    <section className="technical-analysis" aria-labelledby="technical-title">
      <header className="technical-header">
        <div>
          <span className="technical-eyebrow">Modo Fono</span>
          <h3 id="technical-title">Análise técnica da transcrição</h3>
        </div>
        <span className={`technical-status ${status.tone}`}>{status.label}</span>
      </header>

      <div className="technical-grid">
        <dl className="technical-card">
          <div>
            <dt>Palavra-alvo</dt>
            <dd>{targetWord.palavra}</dd>
          </div>
          <div>
            <dt>Transcrição do reconhecedor</dt>
            <dd>{spokenText || "—"}</dd>
          </div>
          <div>
            <dt>Semelhança ortográfica</dt>
            <dd>{similarity === null ? "—" : `${Math.round(similarity * 100)}%`}</dd>
          </div>
          <div>
            <dt>Confiança informada pela API</dt>
            <dd>{formatRecognitionConfidence(recognitionConfidence)}</dd>
          </div>
        </dl>

        <dl className="technical-card">
          <div>
            <dt>Idade informada</dt>
            <dd>{formatAgeInMonths(ageInMonths)}</dd>
          </div>
          <div>
            <dt>Tipo de correspondência</dt>
            <dd>{status.code}</dd>
          </div>
          <div>
            <dt>Origem da classificação</dt>
            <dd>
              {analysis?.tipo === "erro_especifico"
                ? "Comparação exata com variante cadastrada"
                : "Comparação da transcrição com a palavra-alvo"}
            </dd>
          </div>
          <div>
            <dt>Status da regra</dt>
            <dd>
              {processes.some((process) => process.revisaoPendente)
                ? "Revisão clínica pendente"
                : processes.length > 0
                ? "Presente no catálogo provisório"
                : "Não aplicável"}
            </dd>
          </div>
        </dl>
      </div>

      {processes.length > 0 && (
        <div className="technical-process">
          <h4>Hipóteses associadas à variante cadastrada</h4>
          {processes.map((process) => (
            <dl key={process.id || process.nome}>
              <div>
                <dt>Processo</dt>
                <dd>{process.nome}</dd>
              </div>
              {process.id && (
                <div>
                  <dt>Identificador</dt>
                  <dd><code>{process.id}</code></dd>
                </div>
              )}
              <div>
                <dt>Descrição cadastrada</dt>
                <dd>{process.definicao}</dd>
              </div>
              <div>
                <dt>Referência etária cadastrada</dt>
                <dd>{process.idadeLimite || "Não informada"}</dd>
              </div>
            </dl>
          ))}
          <dl>
            {analysis.ipaCorreto && (
              <div>
                <dt>IPA alvo</dt>
                <dd className="technical-ipa">{analysis.ipaCorreto}</dd>
              </div>
            )}
            {analysis.ipaErro && (
              <div>
                <dt>IPA da variante</dt>
                <dd className="technical-ipa">{analysis.ipaErro}</dd>
              </div>
            )}
          </dl>
        </div>
      )}

      {analysis?.descricao && (
        <p className="technical-summary">
          <strong>Descrição:</strong> {analysis.descricao}
        </p>
      )}
      {processes.map((process) => {
        const guidance = getAgeGuidance(ageInMonths, process);
        return guidance ? (
          <p className="technical-age" key={`age-${process.id || process.nome}`}>
            <strong>{process.nome} — leitura etária orientativa:</strong> {guidance}
          </p>
        ) : null;
      })}

      <aside className="technical-limit">
        <strong>Limite metodológico:</strong> o painel analisa texto produzido pela
        Web Speech API. Ele não mede diretamente o sinal acústico, os fonemas ou os
        movimentos articulatórios e não estabelece diagnóstico.
      </aside>
    </section>
  );
}
