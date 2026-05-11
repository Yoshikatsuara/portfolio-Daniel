export const cases = [
  {
    slug: "case-01-streamlit-i9",
    client: "FRUTIFICA · OPERAÇÃO INTERNA",
    title: "Sistema de estoque que substituiu planilha",
    tags: ["PYTHON", "STREAMLIT", "BLING API"],
    description: "Controle de estoque rodava em Google Forms + Excel, com preenchimento manual diário e divergências frequentes entre movimento, consumo e saldo. Migrei tudo para um app Streamlit conectado direto à API do Bling V3 e ao Google Sheets via gspread, com páginas separadas para movimento, consumo, entradas e relatório de saldo. Estoque virou fonte única, consultável em tempo real.",
    result_metric: "1 sistema",
    result_text: "substituiu 3 ferramentas dispersas"
  },
  {
    slug: "case-02-looker-frutifica",
    client: "FRUTIFICA · GESTÃO",
    title: "Painel de fechamento mensal com MoM e YoY",
    tags: ["LOOKER STUDIO", "BI", "DATA STORYTELLING"],
    description: "Família precisava acompanhar fechamento mensal mas fazia tudo em planilhas soltas, sem visão de tendência. Estruturei dashboard no Looker Studio com painel de Meta vs Realizado, comparativos MoM e YoY, e diagnóstico de discrepâncias entre fontes. Fechamento mensal passou de coletânea de planilhas para uma única tela compartilhável.",
    result_metric: "Horas → min",
    result_text: "fechamento mensal automatizado"
  },
  {
    slug: "case-03-scraper-mlm",
    client: "FLYWHEEL DIGITAL · OPERAÇÃO INTERNA",
    title: "Scraper de MLM por iniciativa própria",
    tags: ["PYTHON", "SCRAPING", "AUTOMAÇÃO"],
    description: "Time coletava códigos MLM do Mercado Livre manualmente para montar PDPs de monitoramento — 150 produtos por dia, cerca de 1h diária consumida em copy e paste. Por iniciativa própria, desenvolvi um scraper em Python que cruzava uma base de EANs com os MLMs correspondentes do marketplace. Depois embrulhei em uma interface limpa e integrei ao fluxo do time.",
    result_metric: "+1000%\nEficiência",
    result_text: "mapeamento de 800 produtos em 10min (vs 1h p/ 150)"
  },
  {
    slug: "case-04-sentimentos-scj",
    client: "SCJ MÉXICO · FLYWHEEL DIGITAL",
    title: "Análise de sentimentos a partir de reviews Amazon",
    tags: ["NLP", "AMAZON", "INSIGHT DE PRODUTO"],
    description: "Cliente SCJ no México pediu visão de performance qualitativa de um produto na Amazon. Propus ao meu gestor entregar uma análise de sentimentos a partir da coleta dos comentários do produto, identificando padrões de dor e elogio que números de venda não mostravam. Entregamos o output e o cliente elogiou explicitamente o valor adicionado.",
    result_metric: "Validado",
    result_text: "review → insight acionável"
  }
] as const;
