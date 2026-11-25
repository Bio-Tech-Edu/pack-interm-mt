/**
 * PACK Interativo — Forças Intermoleculares e Ação de Tensoativos
 * Projeto Pré-Enem Digit@l MT (SEDUC-MT)
 * Arquitetura ES6+ com SPA de abas, barra de progresso, carrossel, hotspots,
 * motor de quiz padrão ENEM (A–E) com análise de distratores e listener xAPI/H5P.
 */

const PACK_STATE = {
  visitedTabs: new Set(['partiu']),
  visitedSlides: new Set([1]),
  currentSlide: 1,
  totalSlides: 6,
  answeredQuestions: new Map(), // questionId -> { selectedKey, isCorrect }
};

const HOTSPOT_DATA = {
  nucleo: {
    title: '1. Núcleo de Gordura (Lipídios)',
    body: 'Composto por moléculas apolares (triglicerídeos/óleos). Fica protegido no centro da micela, isolado do contato direto com a água.',
  },
  cauda: {
    title: '2. Cauda Apolar (Hidrofóbica / Lipofílica)',
    body: 'Longa cadeia carbônica do detergente/sabão. Estabelece interações de dipolo induzido (Forças de London) com a gotícula de gordura.',
  },
  cabeca: {
    title: '3. Cabeça Polar/Iônica (Hidrofílica / Lipofóbica)',
    body: 'Grupo carboxilato (−COO⁻ nos sabões) ou sulfonato (−SO₃⁻ nos detergentes). Interage fortemente com a água por atrações íon-dipolo.',
  },
  agua: {
    title: '4. Meio Aquoso (Solvente Polar)',
    body: 'As moléculas polares de H₂O solvatam a superfície externa polar da micela, permitindo que toda a partícula seja arrastada pelo enxágue.',
  },
};

const ENEM_QUESTIONS = [
  {
    id: 'q1',
    title: 'Questão 1',
    tags: ['C5 / H18', 'Nível TRI: Fácil', 'Volatilidade e Forças Intermoleculares'],
    context:
      'Em uma aula experimental, estudantes depositaram simultaneamente uma gota de mesmo volume de três líquidos incolores à temperatura ambiente (25 °C) e 1 atm sobre uma placa de vidro: Hexano (C₆H₁₄, apolar, MM = 86 g/mol, evaporou em 18 s), Etanol (C₂H₆O, polar, MM = 46 g/mol, evaporou em 45 s) e Água (H₂O, polar, MM = 18 g/mol, evaporou em 190 s).',
    command:
      'Mesmo apresentando a menor massa molar entre os três líquidos testados, a água evaporou mais lentamente porque:',
    correct: 'B',
    options: [
      {
        key: 'A',
        text: 'possui moléculas apolares mantidas unidas por ligações iônicas de elevada energia reticular.',
        feedback:
          'Distrator conceitual: a água é uma substância molecular polar (não apolar e não iônica). Ligações iônicas ocorrem em sais como o NaCl, não entre moléculas de água.',
      },
      {
        key: 'B',
        text: 'estabelece ligações de hidrogênio mais intensas e numerosas entre suas moléculas, exigindo maior energia para a passagem ao estado gasoso.',
        feedback:
          'Excelente! A água forma uma extensa rede tridimensional de ligações de hidrogênio. Como essa força intermolecular é muito intensa, exige mais energia térmica para separar as moléculas na vaporização, resultando em menor volatilidade.',
      },
      {
        key: 'C',
        text: 'apresenta ligações covalentes intramoleculares mais fracas que as do hexano, o que dificulta a vaporização.',
        feedback:
          'Pegadinha clássica evitada! A evaporação é uma mudança física que vence forças intermoleculares (entre moléculas), sem quebrar ligações covalentes intramoleculares (dentro da molécula).',
      },
      {
        key: 'D',
        text: 'tem menor massa molar e, por isso, suas moléculas precisam de maior agitação térmica para vencer a força da gravidade.',
        feedback:
          'Distrator de raciocínio invertido: para forças intermoleculares semelhantes, massas molares menores facilitam a evaporação. O fator decisivo aqui é a intensidade das ligações de hidrogênio, não a gravidade.',
      },
      {
        key: 'E',
        text: 'reage espontaneamente com o oxigênio atmosférico, formando uma película sólida superficial que retarda a evaporação.',
        feedback:
          'Distrator de confusão fenômeno físico × químico: a água não reage com o O₂ do ar formando película sólida à temperatura ambiente.',
      },
    ],
  },
  {
    id: 'q2',
    title: 'Questão 2',
    tags: ['C5 / H18', 'Nível TRI: Médio', 'Tensoativos e Micelas'],
    context:
      'Campanhas de saúde pública reforçam que higienizar as mãos com água e sabão por pelo menos 20 segundos reduz a transmissão de vírus envelopados (como Influenza e SARS-CoV-2). Esses vírus possuem uma bicamada lipídica externa majoritariamente apolar. Os tensoativos do sabão (como o estearato de sódio, CH₃(CH₂)₁₆COO⁻Na⁺) desestruturam essa camada e permitem que os fragmentos sejam removidos pela água corrente.',
    command:
      'A eficiência do sabão na desestruturação do envelope lipídico viral e no arraste dos fragmentos pela água ocorre porque suas moléculas:',
    correct: 'C',
    options: [
      {
        key: 'A',
        text: 'possuem extremidades polares que interagem com os lipídios do envelope viral e longas cadeias carbônicas que se solvatam diretamente na água.',
        feedback:
          'Cuidado com a inversão! Pela regra "semelhante dissolve semelhante", a cadeia carbônica apolar interage com os lipídios (apolares), enquanto a extremidade polar/iônica interage com a água (polar).',
      },
      {
        key: 'B',
        text: 'promovem uma reação de saponificação instantânea com o envelope lipídico, convertendo o material genético do vírus em sais inorgânicos solúveis.',
        feedback:
          'Atenção à diferença: saponificação é a reação química usada para fabricar o sabão. Na lavagem das mãos, o sabão já pronto atua por interação física (emulsificação e formação de micelas).',
      },
      {
        key: 'C',
        text: 'apresentam caráter anfifílico, interagindo com os lipídios virais por meio de sua cadeia carbônica apolar e com a água por meio de sua extremidade iônica polar, formando micelas.',
        feedback:
          'Mandou bem! O caráter anfifílico permite que a cauda apolar penetre e rompa a bicamada lipídica viral, encapsulando os fragmentos em micelas cuja superfície polar é arrastada pela água.',
      },
      {
        key: 'D',
        text: 'atuam como catalisadores químicos que diminuem a energia de ativação da reação de hidrólise da água, gerando radicais oxidantes letais ao vírus.',
        feedback:
          'Distrator de cinética/oxirredução: sabões comuns não funcionam como catalisadores nem como agentes oxidantes (esse último papel seria de desinfetantes como o hipoclorito de sódio).',
      },
      {
        key: 'E',
        text: 'são substâncias totalmente apolares que substituem a água como solvente principal, dissolvendo o envelope viral sem formar estruturas organizadas.',
        feedback:
          'Incorreto: o sabão não é totalmente apolar — ele possui uma cabeça carboxilato iônica (−COO⁻) essencial para interagir com a água e formar micelas.',
      },
    ],
  },
  {
    id: 'q3',
    title: 'Questão 3',
    tags: ['C7 / H24', 'Nível TRI: Difícil', 'Solubilidade e Teste da Gasolina'],
    context:
      'No "teste da proveta" da ANP para medir o teor de etanol anidro na gasolina, misturam-se 50 mL de gasolina (hidrocarbonetos como o octano, C₈H₁₈) com 50 mL de solução aquosa de NaCl (10% m/v). Após agitação e repouso, o sistema separa-se em duas fases e observa-se aumento significativo no volume da fase aquosa inferior devido à migração do etanol (CH₃CH₂OH) para essa fase.',
    command:
      'A transferência preferencial do etanol da gasolina para a fase aquosa salina nesse teste é explicada pelo fato de a molécula de etanol:',
    correct: 'D',
    options: [
      {
        key: 'A',
        text: 'ser completamente apolar, o que impede sua permanência junto aos hidrocarbonetos da gasolina quando há agitação mecânica.',
        feedback:
          'Distrator sobre polaridade: o etanol possui grupo hidroxila polar (−OH). Além disso, se fosse totalmente apolar, permaneceria na gasolina, e não migraria para a água.',
      },
      {
        key: 'B',
        text: 'reagir quimicamente com o cloreto de sódio presente na solução aquosa, formando um sal orgânico iônico insolúvel na fase orgânica.',
        feedback:
          'Não há reação química entre etanol e NaCl. O sal serve apenas para aumentar a força iônica e a densidade da fase aquosa, evitando emulsões e garantindo separação nítida.',
      },
      {
        key: 'C',
        text: 'ser repelida pelos hidrocarbonetos da gasolina, que estabelecem ligações de hidrogênio mais intensas entre si do que com o álcool.',
        feedback:
          'Erro conceitual importante: hidrocarbonetos (como C₈H₁₈) têm hidrogênio ligado apenas a carbono — eles NÃO realizam ligações de hidrogênio, apenas forças de dipolo induzido.',
      },
      {
        key: 'D',
        text: 'apresentar o grupo funcional hidroxila (−OH), capaz de estabelecer ligações de hidrogênio mais intensas com a água do que as interações dipolo induzido formadas com a gasolina.',
        feedback:
          'Perfeito! Embora a pequena cadeia carbônica do etanol permita solubilidade na gasolina anidra, na presença da fase aquosa prevalecem as ligações de hidrogênio muito mais fortes entre o grupo −OH do etanol e as moléculas de H₂O.',
      },
      {
        key: 'E',
        text: 'possuir densidade maior que a da água salgada, migrando espontaneamente para o fundo da proveta por ação exclusiva da decantação gravitacional.',
        feedback:
          'Distrator de densidade × solubilidade: a densidade do etanol (~0,79 g/cm³) é menor que a da água (~1,00 g/cm³). Ele migra para a fase inferior por afinidade intermolecular, não por gravidade.',
      },
    ],
  },
];

/* ==================== TELEMETRIA xAPI / H5P ==================== */
const xApiLog = [];

function emitXApiEvent(verbId, verbDisplay, objectName, extraResult = null) {
  const statement = {
    timestamp: new Date().toISOString(),
    verb: { id: verbId, display: { 'pt-BR': verbDisplay } },
    object: {
      id: `https://seduc-mt.github.io/pack-forcas-intermoleculares/${objectName}`,
      definition: { name: { 'pt-BR': objectName } },
    },
    ...(extraResult ? { result: extraResult } : {}),
  };

  xApiLog.push(statement);
  if (typeof window !== 'undefined') {
    window.PACK_XAPI_LOG = xApiLog;
  }

  if (window.H5P && window.H5P.externalDispatcher) {
    window.H5P.externalDispatcher.trigger('xAPI', statement);
  }
}

function initH5PDispatcherListener() {
  const statusBadge = document.getElementById('xapi-status');
  if (window.H5P && window.H5P.externalDispatcher) {
    statusBadge.textContent = 'Telemetria xAPI: Conectado ao H5P';
    window.H5P.externalDispatcher.on('xAPI', (event) => {
      const verb = event.getVerb ? event.getVerb() : 'interacted';
      const score = event.getScore ? event.getScore() : null;
      const maxScore = event.getMaxScore ? event.getMaxScore() : null;
      if (verb === 'completed' || verb === 'answered') {
        statusBadge.textContent =
          score !== null && maxScore !== null
            ? `xAPI H5P: ${verb} (${score}/${maxScore})`
            : `xAPI H5P: ${verb}`;
      }
    });
  } else {
    statusBadge.textContent = 'Telemetria xAPI: Modo Standalone Ativo';
  }
}

/* ==================== BARRA DE PROGRESSO ==================== */
function updateProgress() {
  const tabScore = (PACK_STATE.visitedTabs.size / 3) * 25;
  const slideScore = (PACK_STATE.visitedSlides.size / PACK_STATE.totalSlides) * 35;
  const quizScore = (PACK_STATE.answeredQuestions.size / ENEM_QUESTIONS.length) * 40;
  const totalPercent = Math.min(100, Math.round(tabScore + slideScore + quizScore));

  const fill = document.getElementById('progress-fill');
  const label = document.getElementById('progress-label');
  const track = document.querySelector('.progress-track');

  fill.style.width = `${totalPercent}%`;
  label.innerHTML = `Progresso do Roteiro: <strong>${totalPercent}%</strong>`;
  track.setAttribute('aria-valuenow', String(totalPercent));

  if (totalPercent === 100) {
    const correctCount = [...PACK_STATE.answeredQuestions.values()].filter((q) => q.isCorrect).length;
    emitXApiEvent('http://adlnet.gov/expapi/verbs/completed', 'concluiu', 'pack-forcas-intermoleculares', {
      completion: true,
      score: { raw: correctCount, min: 0, max: ENEM_QUESTIONS.length },
    });
  }
}

/* ==================== NAVEGAÇÃO POR ABAS ==================== */
function activateTab(tabName) {
  const tabs = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach((btn) => {
    const isActive = btn.dataset.tab === tabName;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
  });

  panels.forEach((panel) => {
    const isTarget = panel.id === `panel-${tabName}`;
    panel.classList.toggle('active', isTarget);
    panel.hidden = !isTarget;
  });

  PACK_STATE.visitedTabs.add(tabName);
  emitXApiEvent('http://adlnet.gov/expapi/verbs/experienced', 'acessou', `aba-${tabName}`);
  updateProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initTabs() {
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
  });

  document.querySelectorAll('[data-go-tab]').forEach((btn) => {
    btn.addEventListener('click', () => activateTab(btn.dataset.goTab));
  });
}

/* ==================== ACORDEÃO (#PARTIU) ==================== */
function initAccordion() {
  document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      trigger.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;
      trigger.querySelector('.icon').textContent = expanded ? '+' : '−';
    });
  });
}

/* ==================== CARROSSEL (BORA LÁ!) ==================== */
function renderSlide(slideNumber) {
  PACK_STATE.currentSlide = slideNumber;
  PACK_STATE.visitedSlides.add(slideNumber);

  document.querySelectorAll('.slide').forEach((el) => {
    el.classList.toggle('active', Number(el.dataset.slide) === slideNumber);
  });

  document.getElementById('slide-counter').textContent = `Slide ${slideNumber} de ${PACK_STATE.totalSlides}`;
  document.getElementById('prev-slide').disabled = slideNumber === 1;
  document.getElementById('next-slide').disabled = slideNumber === PACK_STATE.totalSlides;

  document.querySelectorAll('.dot').forEach((dot) => {
    dot.classList.toggle('active', Number(dot.dataset.slide) === slideNumber);
  });

  emitXApiEvent('http://adlnet.gov/expapi/verbs/experienced', 'visualizou', `slide-${slideNumber}`);
  updateProgress();
}

function initCarousel() {
  const dotsContainer = document.getElementById('slide-dots');
  for (let i = 1; i <= PACK_STATE.totalSlides; i += 1) {
    const dot = document.createElement('button');
    dot.className = `dot ${i === 1 ? 'active' : ''}`;
    dot.dataset.slide = String(i);
    dot.setAttribute('aria-label', `Ir para o slide ${i}`);
    dot.addEventListener('click', () => renderSlide(i));
    dotsContainer.appendChild(dot);
  }

  document.getElementById('prev-slide').addEventListener('click', () => {
    if (PACK_STATE.currentSlide > 1) renderSlide(PACK_STATE.currentSlide - 1);
  });

  document.getElementById('next-slide').addEventListener('click', () => {
    if (PACK_STATE.currentSlide < PACK_STATE.totalSlides) renderSlide(PACK_STATE.currentSlide + 1);
  });
}

/* ==================== HOTSPOTS DA MICELA ==================== */
function initHotspots() {
  const infoBox = document.getElementById('hotspot-info');
  document.querySelectorAll('.hotspot-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.hotspot-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const data = HOTSPOT_DATA[btn.dataset.hotspot];
      infoBox.innerHTML = `<h4>${data.title}</h4><p>${data.body}</p>`;
      emitXApiEvent('http://adlnet.gov/expapi/verbs/interacted', 'explorou', `hotspot-${btn.dataset.hotspot}`);
    });
  });
}

/* ==================== MOTOR DE QUIZ ENEM (A–E) ==================== */
function renderQuiz() {
  const container = document.getElementById('quiz-container');
  container.innerHTML = '';

  ENEM_QUESTIONS.forEach((q) => {
    const article = document.createElement('article');
    article.className = 'quiz-item';
    article.id = `card-${q.id}`;

    const tagsHtml = q.tags.map((tag) => `<span class="quiz-tag">${tag}</span>`).join('');
    const optionsHtml = q.options
      .map(
        (opt) => `
        <label class="option-label" data-q="${q.id}" data-key="${opt.key}">
          <input type="radio" name="${q.id}" value="${opt.key}" />
          <span><strong>${opt.key})</strong> ${opt.text}</span>
        </label>
      `
      )
      .join('');

    article.innerHTML = `
      <div class="quiz-meta">${tagsHtml}</div>
      <h3>${q.title}</h3>
      <div class="quiz-context">${q.context}</div>
      <p class="quiz-command">${q.command}</p>
      <div class="options-list" role="radiogroup" aria-label="Alternativas da ${q.title}">
        ${optionsHtml}
      </div>
      <div style="margin-top: 0.9rem;">
        <button class="btn btn-primary" data-check="${q.id}">Conferir Resposta</button>
      </div>
      <div id="feedback-${q.id}" class="feedback-box" hidden aria-live="polite"></div>
    `;

    container.appendChild(article);
  });

  container.querySelectorAll('[data-check]').forEach((btn) => {
    btn.addEventListener('click', () => evaluateQuestion(btn.dataset.check));
  });
}

function evaluateQuestion(questionId) {
  const question = ENEM_QUESTIONS.find((q) => q.id === questionId);
  const selectedInput = document.querySelector(`input[name="${questionId}"]:checked`);
  const feedbackEl = document.getElementById(`feedback-${questionId}`);

  if (!selectedInput) {
    feedbackEl.hidden = false;
    feedbackEl.className = 'feedback-box error';
    feedbackEl.innerHTML = '<strong>Selecione uma alternativa (A a E)</strong> antes de conferir sua resposta.';
    return;
  }

  const chosenKey = selectedInput.value;
  const isCorrect = chosenKey === question.correct;
  const chosenOption = question.options.find((opt) => opt.key === chosenKey);
  const correctOption = question.options.find((opt) => opt.key === question.correct);

  document.querySelectorAll(`.option-label[data-q="${questionId}"]`).forEach((label) => {
    label.classList.remove('correct', 'incorrect');
    if (label.dataset.key === question.correct) {
      label.classList.add('correct');
    } else if (label.dataset.key === chosenKey && !isCorrect) {
      label.classList.add('incorrect');
    }
  });

  feedbackEl.hidden = false;
  feedbackEl.className = `feedback-box ${isCorrect ? 'success' : 'error'}`;
  feedbackEl.innerHTML = isCorrect
    ? `<strong>Resposta correta (${question.correct})!</strong> ${chosenOption.feedback}`
    : `<strong>Você marcou a alternativa ${chosenKey}.</strong> ${chosenOption.feedback}<br><br><strong>Gabarito correto (${question.correct}):</strong> ${correctOption.feedback}`;

  PACK_STATE.answeredQuestions.set(questionId, { selectedKey: chosenKey, isCorrect });

  emitXApiEvent('http://adlnet.gov/expapi/verbs/answered', 'respondeu', questionId, {
    success: isCorrect,
    response: chosenKey,
    score: { raw: isCorrect ? 1 : 0, min: 0, max: 1 },
  });

  updateQuizSummary();
  updateProgress();
}

function updateQuizSummary() {
  const summaryEl = document.getElementById('quiz-summary');
  if (PACK_STATE.answeredQuestions.size < ENEM_QUESTIONS.length) {
    summaryEl.hidden = true;
    return;
  }

  const totalCorrect = [...PACK_STATE.answeredQuestions.values()].filter((r) => r.isCorrect).length;
  const scoreText = document.getElementById('quiz-score-text');
  scoreText.innerHTML = `Você acertou <strong>${totalCorrect} de ${ENEM_QUESTIONS.length}</strong> questões estilo ENEM! Revise os comentários pedagógicos acima para consolidar cada conceito.`;
  summaryEl.hidden = false;
}

function initQuizReset() {
  document.getElementById('btn-reset-quiz').addEventListener('click', () => {
    PACK_STATE.answeredQuestions.clear();
    document.getElementById('quiz-summary').hidden = true;
    renderQuiz();
    updateProgress();
  });
}

/* ==================== INICIALIZAÇÃO ==================== */
document.addEventListener('DOMContentLoaded', () => {
  initH5PDispatcherListener();
  initTabs();
  initAccordion();
  initCarousel();
  initHotspots();
  renderQuiz();
  initQuizReset();
  updateProgress();
});