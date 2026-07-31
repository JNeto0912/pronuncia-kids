# Pronúncia Kids

Protótipo de atividades lúdicas de fala infantil e comunicação alternativa.

## Aviso importante

O reconhecimento automático informa se o navegador entendeu a palavra esperada. Ele não avalia fonemas com precisão e não substitui triagem, avaliação ou diagnóstico realizado por fonoaudiólogo.

Dependendo do navegador, o áudio capturado pela Web Speech API pode ser processado por um serviço externo. O aplicativo não implementa armazenamento próprio das gravações.

## Desenvolvimento

```bash
npm install
npm run dev
```

Verificações:

```bash
npm run lint
npm test
npm run build
```

## Estrutura atual

- `src/App.jsx`: telas de início, categorias, treinamento e comunicação alternativa.
- `src/data/words.js`: palavras e variantes cadastradas para orientação profissional.
- `src/data/phonologicalProcesses.js`: catálogo provisório de processos.
- `src/data/symbols.js`: símbolos de comunicação alternativa.
- `src/domain/speechAnalysis.js`: normalização, similaridade e orientação etária.
- `src/components`: componentes reutilizáveis, incluindo registro profissional.
- `src/screens`: telas extraídas do componente principal.
- `test`: testes automatizados da lógica de análise.
- `docs/CLINICAL_REVIEW.md`: pendências obrigatórias de validação profissional.
- `docs/PRIVACY.md`: estado atual e checklist para publicação.
- `public/imagens`: imagens disponíveis para as atividades.

As referências etárias e regras fonológicas devem ser revisadas e versionadas por profissional habilitado antes de uso fora de ambiente de protótipo.

O progresso e as observações profissionais desta versão existem somente durante a sessão atual e são removidos quando a página é recarregada.

No Modo Fono, o painel técnico separa os dados do reconhecedor (transcrição, semelhança ortográfica e confiança fornecida pela API) das variantes e processos cadastrados. A classificação automática continua sendo orientativa e deve ser confirmada pelo profissional.
