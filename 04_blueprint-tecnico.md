# 4. Blueprint Técnico (HTML5 + CSS3 + JavaScript + H5P) e Documentação GitHub
## 4.1. Mapeamento de Objetos H5P (Arquitetura Pedagógica Interativa)

| Seção do PACK | Contêiner / Objeto H5P | Finalidade Pedagógica no Roteiro | Configuração Obrigatória | 
|:--:|:--:|:--|--:|
|Estrutura Global | H5P.InteractiveBook (ou H5P.Column) | Agrupar as 3 etapas com sumário lateral e rastreamento de progresso unificado. | Habilitar barra de progresso e relatório sumário xAPI no capítulo final. |
| Etapa 1: #partiu | H5P.AdvancedText + H5P.Image (GIF) + H5P.Accordion | Apresentar o gancho cotidiano, mídia comparativa água/óleo/detergente e 3 hipóteses expansíveis.| Inserir texto alternativo (alt) completo e dicas reflexivas sem entregar a definição pronta.| 
|Etapa 2: Bora lá! (Slides 1–3, 6) | H5P.CoursePresentation | Carrossel progressivo em microlearning (1/6 a 6/6) com gráficos e flip cards (H5P.Dialogcards). | Navegação sequencial habilitada + aria-label nos controles de slide.| 
|Etapa 2: Bora lá! (Slide 4) | H5P.ImageJuxtaposition | Comparação interativa "antes × depois" da proveta no teste de etanol na gasolina. | Rótulos claros: "Antes da agitação" e "Após agitação e repouso".|
|Etapa 2: Bora lá! (Slide 5) | H5P.ImageHotspots | Exploração ativa da anatomia da micela (gordura, cauda apolar, cabeça polar e água). | 4 hotspots com explicação concisa da força intermolecular em cada ponto.|
|Etapa 3: E aí, entendeu? | H5P.QuestionSet + 3× H5P.MultiChoice | Verificação formativa com 3 itens inéditos padrão ENEM (A–E). | Obrigatório: 5 opções (A–E), randomização desativada (para preservar letras A–E) e campo Feedback if chosen preenchido para todas as 5 alternativas (justificativa da correta + erro de cada distrator em conjunto).|