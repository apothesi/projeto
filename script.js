const DATA_INICIO = new Date(2023, 10, 25, 0, 0, 0); 
const ANIVERSARIO_MES = 7; 
const ANIVERSARIO_DIA = 10;

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

(function heartsBackground(){
  const canvas = document.getElementById('hearts-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  if(reduceMotion){
    canvas.style.display = 'none';
    return;
  }

  const HEART_COUNT = 26;
  const hearts = [];

  function drawHeart(x, y, size, alpha, rotation){
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#e8a9a0';
    ctx.beginPath();
    const s = size;
    ctx.moveTo(0, s * 0.3);
    ctx.bezierCurveTo(-s, -s * 0.6, -s * 1.6, s * 0.4, 0, s * 1.3);
    ctx.bezierCurveTo(s * 1.6, s * 0.4, s, -s * 0.6, 0, s * 0.3);
    ctx.fill();
    ctx.restore();
  }

  function makeHeart(){
    return {
      x: Math.random() * w,
      y: h + Math.random() * h,
      size: 6 + Math.random() * 12,
      speed: 0.3 + Math.random() * 0.7,
      drift: (Math.random() - 0.5) * 0.4,
      alpha: 0.15 + Math.random() * 0.35,
      rotation: (Math.random() - 0.5) * 0.6
    };
  }

  for(let i = 0; i < HEART_COUNT; i++){
    const heart = makeHeart();
    heart.y = Math.random() * h;
    hearts.push(heart);
  }

  function animate(){
    ctx.clearRect(0, 0, w, h);
    hearts.forEach(heart => {
      heart.y -= heart.speed;
      heart.x += heart.drift;
      if(heart.y < -30){
        Object.assign(heart, makeHeart());
        heart.y = h + 30;
      }
      drawHeart(heart.x, heart.y, heart.size, heart.alpha, heart.rotation);
    });
    requestAnimationFrame(animate);
  }
  animate();
})();

(function botaoAbrirProcesso(){
  const btn = document.getElementById('abrir-processo');
  if(!btn) return;
  btn.addEventListener('click', () => {
    document.getElementById('fatos').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  });
})();

(function contadorDiasJuntos(){
  const elDias = document.getElementById('c-dias');
  const elHoras = document.getElementById('c-horas');
  const elMin = document.getElementById('c-min');
  const elSeg = document.getElementById('c-seg');
  if(!elDias) return;

  function atualizar(){
    const agora = new Date();
    let diff = agora - DATA_INICIO;
    if(diff < 0) diff = 0;

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const min = Math.floor((diff / (1000 * 60)) % 60);
    const seg = Math.floor((diff / 1000) % 60);

    elDias.textContent = dias;
    elHoras.textContent = String(horas).padStart(2, '0');
    elMin.textContent = String(min).padStart(2, '0');
    elSeg.textContent = String(seg).padStart(2, '0');
  }

  atualizar();
  setInterval(atualizar, 1000);
})();

(function contadorAniversario(){
  const elDias = document.getElementById('a-dias');
  const elHoras = document.getElementById('a-horas');
  const elMin = document.getElementById('a-min');
  const elSeg = document.getElementById('a-seg');
  const stamp = document.getElementById('stamp-parabens');
  if(!elDias) return;

  function proximoAniversario(){
    const agora = new Date();
    let alvo = new Date(agora.getFullYear(), ANIVERSARIO_MES, ANIVERSARIO_DIA, 0, 0, 0);
    if(alvo < agora){
      alvo = new Date(agora.getFullYear() + 1, ANIVERSARIO_MES, ANIVERSARIO_DIA, 0, 0, 0);
    }
    return alvo;
  }

  function ehHojeAniversario(){
    const agora = new Date();
    return agora.getMonth() === ANIVERSARIO_MES && agora.getDate() === ANIVERSARIO_DIA;
  }

  function atualizar(){
    if(ehHojeAniversario()){
      elDias.textContent = '0';
      elHoras.textContent = '00';
      elMin.textContent = '00';
      elSeg.textContent = '00';
      if(stamp) stamp.classList.add('show');
      return;
    }

    const alvo = proximoAniversario();
    const agora = new Date();
    const diff = alvo - agora;

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const min = Math.floor((diff / (1000 * 60)) % 60);
    const seg = Math.floor((diff / 1000) % 60);

    elDias.textContent = dias;
    elHoras.textContent = String(horas).padStart(2, '0');
    elMin.textContent = String(min).padStart(2, '0');
    elSeg.textContent = String(seg).padStart(2, '0');
  }

  atualizar();
  setInterval(atualizar, 1000);
})();

(function quiz(){
  const container = document.getElementById('quiz-container');
  if(!container) return;

  const perguntas = [
    {
      pergunta: 'Quando penso em novembro de 2023, eu sinto:',
      opcoes: [
        'Que o Vini merece um agradecimento formal',
        'Que foi o começo de uma confusão maravilhosa',
        'Um pouco de saudade de como tudo começou',
        'Todas as anteriores, sem exceção'
      ]
    },
    {
      pergunta: 'Se eu ficar 1 dia sem falar com você, o mais provável é que eu:',
      opcoes: [
        'Sinta um pouco de falta, mas sobrevivo',
        'Fique enviando memes até você responder',
        'Monte outro site pra chamar sua atenção',
        'Finja que está tudo bem (não está)'
      ]
    },
    {
      pergunta: 'A parte mais "eu não aguento mais você" da nossa relação é:',
      opcoes: [
        'Quando eu fico enrolando pra decidir o que comer',
        'Quando eu conto a mesma piada 5 vezes',
        'Quando eu mando bom dia até você acordar de mau humor',
        'Sinceramente? Nenhuma, eu aguento numa boa'
      ]
    },
    {
      pergunta: 'Se este site fosse um processo judicial de verdade, o veredito seria:',
      opcoes: [
        'Culpado(a) de ser fofo(a) demais',
        'Inocente, mas precisa parar de se fazer de difícil',
        'Condenado(a) a me aturar por muito mais tempo',
        'Caso encerrado com pedido de casamento (relaxa, não hoje)'
      ]
    }
  ];

  const resultados = [
    {
      titulo: 'Veredito: você ainda me aguenta (e gosta disso).',
      texto: 'O tribunal analisou suas respostas e concluiu: por trás dessa fama de "difícil", tem alguém que também não larga o osso. Recurso negado, processo continua.'
    }
  ];

  let atual = 0;

  function render(){
    container.innerHTML = '';

    perguntas.forEach((p, index) => {
      const div = document.createElement('div');
      div.className = 'quiz-question' + (index === atual ? ' active' : '');
      div.dataset.index = index;

      const progresso = document.createElement('p');
      progresso.className = 'quiz-progress';
      progresso.textContent = `Pergunta ${index + 1} de ${perguntas.length}`;
      div.appendChild(progresso);

      const h3 = document.createElement('h3');
      h3.textContent = p.pergunta;
      div.appendChild(h3);

      p.opcoes.forEach(opcao => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quiz-option';
        btn.textContent = opcao;
        btn.addEventListener('click', () => {
          atual++;
          if(atual >= perguntas.length){
            mostrarResultado();
          } else {
            atualizarPergunta();
          }
        });
        div.appendChild(btn);
      });

      container.appendChild(div);
    });

    const resultDiv = document.createElement('div');
    resultDiv.className = 'quiz-result';
    resultDiv.id = 'quiz-result';
    const res = resultados[0];
    resultDiv.innerHTML = `<h3>${res.titulo}</h3><p>${res.texto}</p>`;
    container.appendChild(resultDiv);
  }

  function atualizarPergunta(){
    container.querySelectorAll('.quiz-question').forEach((el, i) => {
      el.classList.toggle('active', i === atual);
    });
  }

  function mostrarResultado(){
    container.querySelectorAll('.quiz-question').forEach(el => el.classList.remove('active'));
    document.getElementById('quiz-result').classList.add('active');
  }

  render();
})();