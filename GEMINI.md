# Portfolio Cinematográfico — Daniel Ara Damasceno

> Fonte única de verdade para qualquer agente trabalhando neste projeto.
> Leia por inteiro antes da primeira ação. Em conflito entre chat e este
> arquivo, **peça confirmação ao Daniel**.

---

## 1. Função

Atue como um **Tecnólogo Criativo Sênior** e **Engenheiro Frontend Líder**.
Você constrói um portfólio pessoal cinematográfico, de alta fidelidade,
"1:1 Pixel Perfect". O resultado final deve parecer um **instrumento
digital** — cada rolagem intencional, cada animação com peso e
profissionalismo. Erradique todos os padrões genéricos de IA.

Este **não é** um portfólio de designer ou dev front-end. É o portfólio de
um **Customer Success Analyst com pegada analítica** que combina dados com
relacionamento ao cliente. O visual cinematográfico é a prova viva de que
ele entende ferramentas modernas e entrega execução acima da média.

---

## 2. Contexto do Daniel — dados reais

- **Nome completo:** Daniel Ara Damasceno
- **Localização:** São Paulo, Brasil
- **Telefone / WhatsApp:** +55 11 93774-7540
- **Email:** dddamasceno2017@gmail.com
- **LinkedIn:** linkedin.com/in/danielaradamasceno
- **Formação:** Bacharelado em Ciência de Dados e Inteligência Artificial
  — PUC-SP (2022–2025, diplomado)
- **Trajetória recente:** Flywheel Digital — Grupo Omnicom
  (Ago/2023 — Mar/2026), com promoção interna de
  *Data Insights & Customer Growth Intern* para *Retail Operations Analyst*
- **Trajetória anterior:** Frutifica (Jun/2018 — Out/2022) em atendimento,
  gestão financeira e desenvolvimento de negócios
- **Idiomas:** Português nativo · Inglês B2 · Espanhol intermediário (com
  uso profissional em QBRs)
- **Posicionamento atual:** Customer Success Analyst com pegada analítica
  — busca CLT e freelance Workana simultaneamente

### Bio curta (use no hero/about quando solicitado)

> Analista formado em Ciência de Dados e IA pela PUC-SP, com três anos
> de atuação na Flywheel Digital (Grupo Omnicom) em retail digital
> (Amazon, Mercado Livre). Combino fluência analítica com prática em
> treinamento de time, ciclos de renovação e apresentação de resultados
> direto ao cliente em PT e ES.

---

## 3. Públicos e objetivos

**Dois públicos com peso igual:**

1. **Recrutador CLT** — RH e hiring manager de empresas que contratam
   Customer Success Analyst, Data Analyst, Retail Media Analyst, Project
   Consultant. Tempo de leitura: 30s na home, 2min se converter. Quer ver:
   resultado mensurável, stack, experiência, fluência bilíngue.
2. **Cliente freelance Workana** — dono de SMB, e-commerce, pequena
   marca. Tempo: 1min. Decisão por "esse cara entende meu problema".

**Objetivos em ordem de prioridade:**

1. Converter visita de recrutador em **convite para entrevista**.
2. Converter visita de cliente em **lead qualificado** (email/WhatsApp).
3. Demonstrar fluência com **ferramentas agênticas** (este próprio
   projeto é prova).

Toda decisão de conteúdo, design e código deve ser avaliada contra esses
três objetivos, nessa ordem.

---

## 4. Fluxo do Agente — DEVE SEGUIR

**Esta v1 do projeto é uma construção em duas fases.** Não tente fazer
tudo de uma vez.

### Fase 1: Esqueleto + Design System (esta fase)

Quando o Daniel pedir para começar, faça **imediatamente**:

1. Confirme em 1 mensagem que leu o `GEMINI.md` e entendeu o escopo da
   Fase 1.
2. **Não faça perguntas de template de landing.** Os tokens estão fixados
   abaixo. O conteúdo virá da Fase 2.
3. Faça o scaffold do projeto Next.js conforme spec técnica abaixo.
4. Implemente o design system completo (paleta, tipografia, noise overlay,
   botões magnéticos, tokens).
5. Construa **todas as seções com placeholders explícitos** (Lorem ipsum
   estruturado — nunca conteúdo inventado sobre o Daniel além do que
   está documentado na seção 2).
6. Entregue uma rota `/styleguide` mostrando todos os componentes
   isoladamente.
7. Pare nos checkpoints e peça revisão antes de seguir.

### Fase 2: Conteúdo real (depois da Fase 1 aprovada)

Daniel vai trazer os cases STAR completos e a foto profissional. Você
substitui placeholders **sem alterar estrutura ou design**.

---

## 5. Stack técnica (NÃO ALTERAR)

- **Framework:** Next.js 15 (App Router, TypeScript estrito)
- **Estilização:** Tailwind CSS 4 + CSS variables
- **Animação:** GSAP 3 + ScrollTrigger (NÃO use Framer Motion)
- **Ícones:** Lucide React
- **Fontes (via `next/font`):**
  - Body/UI: **Inter** (tracking ajustado, -0.02em)
  - Drama: **Playfair Display** Italic
  - Mono/Data: **JetBrains Mono**
- **Conteúdo:** TypeScript const objects em `src/content/` (não JSON,
  facilita tipagem). Sem CMS.
- **Imagens:** `next/image` sempre. URLs reais do Unsplash quando precisar
  de hero/textura. Foto do Daniel virá na Fase 2.
- **Deploy:** Vercel (Hobby plan, gratuito).
- **Repositório:** GitHub público (faz parte da prova técnica).

**Proibido sem justificativa explícita ao Daniel:**

- Framer Motion, Lottie, libs de carrossel/parallax/slider
- shadcn/ui (use só copy-paste dos 2-3 componentes que precisar)
- Mais de um icon pack
- Headless CMS, banco de dados, autenticação
- Qualquer dependência que não esteja na lista acima

**Regra:** se o portfólio funciona sem a dependência, ela não entra.

---

## 6. Design System — Midnight Luxe Adapted (NUNCA ALTERAR)

### Paleta

```css
--bg-primary:    #0D0D12;  /* Obsidiana — background base */
--bg-surface:    #14141B;  /* Cards e elevações */
--bg-elevated:   #1C1C26;  /* Modais, dropdowns */
--border:        #2A2A35;  /* Bordas sutis */
--text-primary:  #FAF8F5;  /* Marfim — texto principal */
--text-secondary:#A8A8B3;  /* Texto secundário */
--text-muted:    #6B6B78;  /* Captions, metadata */
--accent:        #3B5BFF;  /* Royal Electric — CTA, destaques */
--accent-glow:   #3B5BFF40;/* Glow do accent (40 = 25% opacidade) */

/* Alternativa Cyan (Daniel pode trocar 1 linha):
--accent:        #22D3EE;
--accent-glow:   #22D3EE40;
*/
```

**IMPORTANTE:** o accent `#3B5BFF` (Royal Electric) é o **mesmo usado no
CV em PDF** do Daniel. Mantenha consistência cross-deliverable.

### Tipografia

```css
--font-body:    'Inter', system-ui, sans-serif;
--font-drama:   'Playfair Display', Georgia, serif;  /* italic only */
--font-mono:    'JetBrains Mono', 'Courier New', monospace;
```

**Escala (mobile-first, dobra no desktop):**

- Hero principal: `clamp(3rem, 8vw, 7rem)` — 800 weight, tracking -0.04em
- Hero drama (serif italic): `clamp(3.5rem, 9vw, 8rem)` — italic, 400
- H2: `clamp(2rem, 5vw, 3.5rem)` — 700, tracking -0.03em
- H3: `clamp(1.5rem, 3vw, 2rem)` — 600
- Body: `1rem` (16px) — 400, line-height 1.6
- Body lg: `1.125rem` (18px) — 400, line-height 1.7
- Mono/data: `0.875rem` (14px) — 500, tracking 0.02em, uppercase

### Textura visual (aplicar globalmente)

- **Noise overlay:** filtro SVG inline `<feTurbulence baseFrequency="0.9">`
  com opacidade `0.05`, fixo em `position: fixed; inset: 0; pointer-events:
  none; z-index: 1`. Elimina gradientes digitais chapados.
- **Bordas:** sistema de `rounded-[1.5rem]` a `rounded-[2.5rem]` para
  todos os contêineres. Cantos vivos só em elementos pequenos
  (badges, tags).
- **Espaçamento:** sistema base 4px. Use múltiplos de 8 para layout.

### Micro-interações (aplicar em todo elemento interativo)

- **Botões — sensação magnética:** `scale(1.03)` no hover com
  `cubic-bezier(0.25, 0.46, 0.45, 0.94)`, duração 250ms.
- **Botões primários:** `overflow-hidden` com `<span>` de fundo deslizante
  (transição de cor accent → accent-glow no hover, slide left-to-right).
- **Links:** levantamento de `translateY(-1px)` no hover + underline
  animado (left-to-right) com `currentColor`.
- **Cards interativos:** `translateY(-4px)` + border passa de
  `--border` para `--accent` no hover.
- **Foco (acessibilidade):** outline `2px solid var(--accent)` com
  `outline-offset: 4px` em todos elementos focáveis.

### Ciclo de vida da animação

- Use `gsap.context()` dentro de `useEffect` para TODAS as animações.
  Retorne `ctx.revert()` no cleanup.
- **Easing padrão:**
  - Entradas (fade/slide in): `power3.out`
  - Transformações (morph, move): `power2.inOut`
  - Spring/bounce: `cubic-bezier(0.34, 1.56, 0.64, 1)`
- **Stagger:**
  - Texto (palavra por palavra, linha por linha): `0.08`
  - Cards/contêineres: `0.15`
- **Duração padrão:**
  - Micro (hover, focus): 250ms
  - Macro (entrada de seção): 800ms

### Acessibilidade obrigatória

- Respeite `prefers-reduced-motion`: se ativo, anime apenas opacidade
  (sem `y`, sem `scale`, sem `rotate`).
- Contraste mínimo WCAG AA em todos os textos.
- Todo elemento interativo tem `aria-label` claro.
- Navegação por teclado funciona em 100% do site.

---

## 7. Arquitetura de seções (estrutura fixa — conteúdo na Fase 2)

### A. NAVBAR — "Ilha Flutuante"

Pílula `fixed` centralizada horizontalmente no topo, com margem do
viewport.

- **Estado inicial (sobre hero):** transparente, texto `--text-primary`.
- **Estado scrollado:** `bg-[--bg-surface]/60` + `backdrop-blur-xl` +
  border `1px solid --border`. Transição com `IntersectionObserver`
  observando o final do hero.
- **Conteúdo:** logo (texto "DANIEL ARA" em mono uppercase, tracking
  largo) + 4 links (`Cases`, `Sobre`, `Stack`, `Contato`) + CTA "Trabalhar
  comigo" (accent, magnético).
- **Mobile (<768px):** colapsa em hamburger → drawer lateral
  full-height com mesma estética.

### B. HERO — "Cena de Abertura"

- **Altura:** `100dvh` (não `100vh` — respeita address bar mobile).
- **Background:** gradiente vertical de `--bg-primary` (topo) para
  `--bg-surface` (base) + noise overlay global por cima.
  - **Sem imagem hero por padrão.** Daniel pode adicionar foto profissional
    na Fase 2; nesse caso aplique gradiente from-primary-to-transparent
    sobre a imagem.
- **Layout:** conteúdo no **terço inferior esquerdo** (padding-left
  generoso, padding-bottom alto).
- **Estrutura de texto (padrão Midnight Luxe):**

  ```
  [LINHA 1 — sans bold, grande]
  Dados que viram

  [LINHA 2 — serif italic, MASSIVA, 1.3x a linha 1]
  decisão.

  [SUBHEADING — body lg, --text-secondary, max-width 600px]
  Customer Success Analyst com pegada analítica. Três anos transformando
  operação de retail digital em conversa útil com cliente — Amazon,
  Mercado Livre, ciclo de renovação, treinamento de time.

  [CTAs lado a lado]
  [PRIMÁRIO accent] Ver cases
  [SECUNDÁRIO ghost] Falar comigo
  ```

  > **NOTA:** o texto acima é o **único conteúdo real** que pode entrar
  > na Fase 1, porque é posicionamento, não case. Daniel pode pedir
  > ajustes na revisão.

- **Animação de entrada:** GSAP fade-up em stagger (y: 40 → 0,
  opacity: 0 → 1) — primeiro a linha 1, depois a linha 2 (com delay
  maior), depois subheading, depois CTAs.
- **Indicador de scroll:** seta minúscula no bottom-center com animação
  de bounce suave (translateY infinito).

### C. CASES — "Os Trabalhos"

Lista de **3-6 cases** em formato STAR. Layout em **grid alternado** (1
case por linha em desktop, ocupando largura total).

**Estrutura por card de case:**

- Lado esquerdo (40%): número grande (`01`, `02`, em mono, accent color,
  font-size huge), título do case (H2 sans), cliente/contexto (mono
  uppercase pequeno), tags (badges com border, accent on hover).
- Lado direito (60%): estrutura STAR em 4 blocos verticais com label
  mono uppercase (`SITUATION`, `TASK`, `ACTION`, `RESULT`). O bloco
  `RESULT` tem destaque: número ou frase de impacto em serif italic
  accent color, descrição abaixo.
- **Alternância:** cases ímpares (1, 3, 5) com lado-esquerdo à esquerda;
  cases pares (2, 4, 6) com lado-esquerdo à direita (espelho).
- **Animação:** ScrollTrigger fade-up com stagger entre os blocos STAR
  (0.15s entre cada um) quando o card entra no viewport.
- **Hover no card:** border passa de `--border` para `--accent`,
  translateY -4px, sutil glow accent.

**FASE 1:** estruture com 3 cases placeholder. Cada um com:

```ts
{
  title: "Case Placeholder #1",
  client: "CLIENTE — INDÚSTRIA",
  tags: ["Tag A", "Tag B", "Tag C"],
  situation: "Lorem ipsum dolor sit amet, consectetur...",
  task: "Lorem ipsum dolor sit amet, consectetur...",
  action: "Lorem ipsum dolor sit amet, consectetur...",
  result_metric: "FRASE OU NÚMERO DE IMPACTO",
  result_text: "Lorem ipsum dolor sit amet.",
}
```

### D. STACK — "Arsenal"

Grid de **categorias de skill** com cards densos estilo "telemetria".

- **Categorias (4 colunas em desktop, 2 em tablet, 1 em mobile) — usar
  os valores reais documentados na seção 10 deste arquivo.**
- **Card por categoria:** título (H3 sans), lista vertical de tools
  (mono uppercase, com leading-relaxed), micro-indicador de nível
  opcional (3 pontinhos preenchidos/vazios).
- **Animação:** fade-in cascateado quando entra no viewport.

### E. PHILOSOPHY — "Manifesto"

Seção full-width com **fundo `--bg-primary`** (mais escuro que o resto),
border-top e border-bottom sutis em accent.

- **Imagem de textura** (Unsplash: `dark marble texture` ou `architectural
  shadow`) com `opacity: 0.08` no background, com parallax suave
  (ScrollTrigger).
- **Conteúdo (centro, max-width 900px):**
  ```
  [Pequeno, mono, --text-muted]
  COMO EU TRABALHO

  [Sans bold, neutro, médio]
  A maioria foca em dashboards bonitos.

  [Serif italic, MASSIVO, accent na palavra-chave]
  Eu foco em decisões certas.
  ```
- **Animação:** GSAP SplitText revelando palavra-por-palavra com
  ScrollTrigger.

### F. ABOUT — "Quem Sou"

Layout 2 colunas (desktop): foto à esquerda, texto à direita.

- **Foto:** placeholder na Fase 1 (`<div>` com gradient subtle + borda
  rounded-[2rem]). Foto real entra na Fase 2.
- **Texto na Fase 1:** use a bioShort do `profile.ts` (dado real). Em
  seguida, deixe um segundo parágrafo como placeholder Lorem ipsum para
  Daniel preencher na Fase 2.
- **Stats em mono abaixo da bio (3 colunas pequenas):** use o objeto
  `stats` do `profile.ts`.
- **Mobile:** empilha foto em cima, texto embaixo.

### G. CONTACT — "Trabalhar Comigo"

Duas colunas com **CTAs separados por público** (estratégia chave).

- **Esquerda — "Recrutadores":**
  - Título: "Buscando talento?" (sans bold)
  - Subtexto: "Customer Success Analyst com pegada analítica, aberto a
    oportunidades CLT em SP ou remoto."
  - Botões:
    - `Baixar CV (PT)` → `profile.cvPt`
    - `Download CV (EN)` → desabilitado se `profile.cvEn === null`
    - `LinkedIn` → `profile.linkedin`
  - Email mono clicável: `profile.email` →
    `mailto:${profile.email}`

- **Direita — "Clientes":**
  - Título: "Precisa resolver um problema?" (sans bold)
  - Subtexto: "Projetos freelance de análise de dados, automação de
    operação e implementação de IA para SMB."
  - Botões:
    - `WhatsApp` → `profile.whatsapp`
    - `Workana` → placeholder na Fase 1 (Daniel preenche link na Fase 2)
    - `Email` → `mailto:${profile.email}`

- **Animação:** ambas colunas com fade-up + slide lateral (esquerda
  vem da esquerda, direita vem da direita) em stagger.

### H. FOOTER

- Fundo `--bg-primary` (mais escuro), `rounded-t-[3rem]`, padding generoso.
- Grid 3 colunas:
  - **Col 1:** logo "DANIEL ARA" + bio curta de 1 linha
  - **Col 2:** links rápidos (Cases, Sobre, Stack, Contato)
  - **Col 3:** redes sociais (LinkedIn, GitHub, Instagram se Daniel quiser)
- **Indicador "System Operational":** ponto verde pulsante +
  `STATUS_ONLINE` em mono. Easter egg simpático que sinaliza atenção a
  detalhe.
- Copyright em mono pequeno: `© 2026 DANIEL ARA DAMASCENO`.
- Link "Built with Claude + Antigravity" minúsculo — vira parte do
  pitch técnico.

---

## 8. Estrutura de arquivos

```
portfolio-daniel/
├── GEMINI.md                    ← este arquivo
├── AGENTS.md                    ← cópia portável
├── README.md
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── .gitignore
├── public/
│   ├── favicon.ico
│   ├── og-image.png             ← gerar na Fase 2
│   └── Daniel_Ara_Damasceno_Customer_Success.pdf  ← CV PT (Daniel adiciona)
├── src/
│   ├── app/
│   │   ├── layout.tsx           ← fonts, metadata, noise overlay global
│   │   ├── page.tsx             ← home (todas as seções)
│   │   ├── styleguide/
│   │   │   └── page.tsx         ← FASE 1: prova de design system
│   │   ├── globals.css          ← tokens CSS, base styles
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Cases.tsx
│   │   │   ├── Stack.tsx
│   │   │   ├── Philosophy.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/
│   │   │   ├── Navbar.tsx
│   │   │   ├── MagneticButton.tsx
│   │   │   ├── NoiseOverlay.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── ScrollIndicator.tsx
│   │   └── animations/
│   │       ├── SplitText.tsx
│   │       └── FadeUp.tsx
│   ├── content/
│   │   ├── profile.ts           ← bio, contatos, links (DADOS REAIS)
│   │   ├── cases.ts             ← array de cases (placeholder Fase 1)
│   │   └── stack.ts             ← categorias de skill (DADOS REAIS)
│   ├── lib/
│   │   ├── gsap.ts              ← config GSAP + plugins
│   │   └── fonts.ts             ← next/font config
│   └── styles/
│       └── tokens.css           ← CSS variables
```

---

## 9. Conteúdo real para `src/content/profile.ts`

Use exatamente este objeto no Checkpoint 5:

```ts
export const profile = {
  name: "Daniel Ara Damasceno",
  shortName: "Daniel Ara",
  role: "Customer Success Analyst · Data-Driven",
  location: "São Paulo, Brasil",
  phone: "+55 11 93774-7540",
  whatsapp: "https://wa.me/5511937747540?text=Oi%20Daniel%2C%20vim%20do%20seu%20portf%C3%B3lio",
  email: "dddamasceno2017@gmail.com",
  linkedin: "https://linkedin.com/in/danielaradamasceno",
  cvPt: "/Daniel_Ara_Damasceno_Customer_Success.pdf",
  cvEn: null, // preencher quando versão EN existir
  bioShort:
    "Analista formado em Ciência de Dados e IA pela PUC-SP, com três " +
    "anos de atuação na Flywheel Digital (Grupo Omnicom) em retail " +
    "digital. Acostumado a operar carteiras amplas, participar de " +
    "ciclos de renovação e apresentar resultados ao cliente em PT e ES.",
  stats: {
    yearsExp: "03",
    clients: "12+",
    based: "SP / BR",
  },
} as const;
```

---

## 10. Conteúdo real para `src/content/stack.ts`

Use exatamente este array no Checkpoint 5:

```ts
export const stack = [
  {
    category: "Customer Success",
    items: [
      "Apresentação a cliente",
      "QBR",
      "Ciclo de renovação",
      "Data storytelling",
      "Relacionamento bilíngue (PT/ES)",
    ],
  },
  {
    category: "Análise de Dados",
    items: [
      "Python (pandas)",
      "SQL básico",
      "Looker Studio",
      "Power BI",
      "Excel avançado",
    ],
  },
  {
    category: "Retail & E-commerce",
    items: [
      "Amazon Seller Central",
      "Mercado Livre",
      "Buy Box",
      "Digital Shelf",
      "Share competitivo",
      "Análise de preços",
    ],
  },
  {
    category: "IA Aplicada",
    items: [
      "Claude (Code, API)",
      "Gemini",
      "Prompting de produção",
      "Automação com LLMs",
      "Antigravity IDE",
    ],
  },
] as const;
```

---

## 11. Sequência de construção (Fase 1)

Execute nesta ordem. **Pare e peça revisão entre cada checkpoint.**

### Checkpoint 1: Scaffold + dependências (15 min)
1. `npx create-next-app@latest . --typescript --tailwind --app
   --src-dir --import-alias "@/*" --no-eslint`
2. Instale: `gsap lucide-react`
3. Confirme com Daniel a árvore de pastas antes de criar componentes.
4. **Pare. Mostre `package.json` e estrutura. Aguarde "ok".**

### Checkpoint 2: Design system base (30 min)
1. Configure `next/font` com Inter, Playfair Display, JetBrains Mono.
2. Crie `tokens.css` com todas as variáveis da seção 6.
3. Configure Tailwind para consumir as variáveis (`theme.extend.colors`
   apontando para `var(--accent)` etc.).
4. Crie `NoiseOverlay.tsx` (componente client, SVG inline com
   `<feTurbulence>`).
5. Crie `layout.tsx` aplicando fontes, noise overlay e metadata base
   (title: "Daniel Ara Damasceno · Customer Success Analyst",
   description: bioShort do profile.ts).
6. **Pare. Peça pra Daniel rodar `npm run dev` e ver `/` (vai estar
   vazia mas com fontes e cor de fundo certas). Aguarde "ok".**

### Checkpoint 3: Styleguide (40 min)
1. Crie `/styleguide/page.tsx` mostrando:
   - Todos os níveis tipográficos (H1, H2, H3, body, body lg, mono)
   - Paleta de cores em swatches
   - Botão primário (magnético, fundo deslizante)
   - Botão secundário (ghost)
   - Badge / tag
   - Card básico
   - Link com underline animado
   - Stat em mono
2. **Pare. Daniel revisa visualmente. Pequenos ajustes aqui são baratos.
   Aguarde "ok".**

### Checkpoint 4: Navbar + Hero (45 min)
1. Construa Navbar com IntersectionObserver + estados scrolled/initial.
2. Construa Hero com texto real (única exceção de conteúdo na Fase 1),
   animação GSAP de entrada, scroll indicator.
3. **Pare. Mostre `/`. Aguarde "ok".**

### Checkpoint 5: Cases (placeholders) + Stack (45 min)
1. Crie `src/content/profile.ts` usando o objeto da seção 9.
2. Crie `src/content/stack.ts` usando o array da seção 10.
3. Crie `src/content/cases.ts` com 3 entradas placeholder estruturadas.
4. Construa seção Cases com layout alternado + animações.
5. Construa seção Stack com grid + cards.
6. **Pare. Aguarde "ok".**

### Checkpoint 6: Philosophy + About + Contact + Footer (45 min)
1. Philosophy com SplitText + parallax de textura.
2. About com placeholder de foto + bioShort do profile.ts (dado real).
3. Contact com layout 2-colunas + CTAs separados, usando todos os
   links reais do profile.ts.
4. Footer com status pulsante.
5. **Pare. Aguarde revisão final da Fase 1.**

### Checkpoint 7: Polimento Fase 1 (30 min)
1. Configure `sitemap.ts`, `robots.ts`, metadata por página.
2. Configure `prefers-reduced-motion` em todas as animações.
3. Rode Lighthouse, ajuste o que estiver abaixo de 90.
4. Verifique se `Daniel_Ara_Damasceno_Customer_Success.pdf` está em
   `public/` (Daniel adiciona o arquivo manualmente).
5. Crie README.md profissional (descrição do projeto, stack, comandos,
   link para o site em produção quando houver).
6. Commit final da Fase 1: `feat: complete v1 skeleton with design system`.

---

## 12. Regras de execução invioláveis

1. **Conteúdo sobre Daniel:** SÓ use o que está nas seções 2, 9 e 10.
   Cases reais, números de impacto, bio longa — tudo placeholder até a
   Fase 2.
2. **Nunca instale dependência fora da lista (seção 5) sem perguntar.**
3. **Comentários no código em português, identificadores em inglês.**
4. **Sempre teste no navegador antes de dizer "pronto".** Peça ao Daniel
   pra abrir e confirmar.
5. **Mobile-first em toda implementação.** Se uma seção não responde bem
   em 375px, não está pronta.
6. **Performance é parte do design.** Imagens via `next/image`, fontes via
   `next/font`, sem libs pesadas, animações com `will-change` correto.
7. **Pare nos checkpoints.** Velocidade aqui é menos importante que
   acurácia. Daniel revisa cada bloco.

---

## 13. Diretriz final

> Não construa um portfólio; construa um **instrumento digital de prova**.
> Cada seção é evidência de que o Daniel entrega execução acima da média.
> Cada animação deve ter peso e propósito — nunca decoração. Erradique
> todos os padrões genéricos de IA: gradiente roxo-rosa, headlines tipo
> "Welcome to my portfolio", emojis no hero, ilustrações abstratas
> coloridas, depoimentos falsos.
>
> Se uma escolha não serve aos três objetivos (entrevista CLT, lead
> Workana, prova de fluência agêntica), ela não entra.

---

## 14. Protocolo de aprovação de checkpoint (REFORÇO)

Esta seção foi adicionada após observação prática: o agente
demonstrou tendência a executar múltiplos checkpoints quando
recebia mensagens curtas do Daniel (ex: pedido de correção
pontual interpretado como autorização implícita para avançar).

**Regra absoluta:** o avanço entre checkpoints exige UM destes
gatilhos:

1. Mensagem do Daniel contendo a string literal `"ok"`
   (em qualquer caixa: ok, Ok, OK) referente ao checkpoint atual
2. Mensagem do Daniel contendo `"pode seguir"` + nome ou número
   do próximo checkpoint
3. Mensagem do Daniel contendo `"aprovado"` + referência clara

**Nada mais conta como aprovação:**

- "Beleza" não é aprovação
- "Show" não é aprovação
- "Funcionou" não é aprovação
- "Gostei" não é aprovação
- Um pedido de correção pontual NÃO é autorização para fazer
  a correção + avançar

**Comportamento esperado em ambiguidade:** se Daniel pedir uma
correção pontual sem dar "ok" explícito ao checkpoint atual,
o agente faz APENAS a correção e responde com:

> "Correção aplicada. Aguardo seu 'ok' explícito para seguir
> para o Checkpoint [N]."

**Comportamento esperado ao final de cada checkpoint:** o agente
SEMPRE termina sua mensagem com a frase:

> "Aguardo seu 'ok' explícito para iniciar o Checkpoint [N+1]
> ([nome do checkpoint])."

Sem exceções. Sem "já adiantei". Sem "aproveitei e fiz".