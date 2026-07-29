export default function SettingsScreen({
  modoFonoAtivo,
  onFonoModeChange,
  onBack,
}) {
  return (
    <div className="settings-container">
      <header className="settings-header">
        <button className="icon-button" onClick={onBack} title="Início">
          🏠
        </button>
        <h2>Configurações e privacidade</h2>
        <div className="placeholder-button" />
      </header>

      <main className="settings-content">
        <section>
          <h3>Modo profissional</h3>
          <label className="settings-toggle">
            <input
              type="checkbox"
              checked={modoFonoAtivo}
              onChange={(event) => onFonoModeChange(event.target.checked)}
            />
            <span>Exibir análise orientativa e registro manual</span>
          </label>
        </section>

        <section>
          <h3>Como o microfone é usado</h3>
          <p>
            O app usa a Web Speech API do navegador para transformar fala em texto.
            Em alguns navegadores, o áudio pode ser enviado ao serviço de
            reconhecimento do fornecedor. O projeto não armazena gravações nem
            envia áudio para um servidor próprio.
          </p>
        </section>

        <section>
          <h3>Dados desta versão</h3>
          <ul>
            <li>A idade é mantida somente enquanto o aplicativo está aberto.</li>
            <li>Tentativas e notas profissionais não usam armazenamento permanente.</li>
            <li>Não é solicitado nome, e-mail ou data de nascimento.</li>
            <li>Recarregar a página apaga os dados da sessão.</li>
          </ul>
        </section>

        <section className="settings-warning">
          <h3>Limites</h3>
          <p>
            O reconhecimento automático não avalia fonemas com precisão e não
            substitui avaliação, triagem ou diagnóstico fonoaudiológico.
          </p>
        </section>
      </main>
    </div>
  );
}
