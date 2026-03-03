/* ════════════════════════════════════════
   1. CUSTOM CURSOR
════════════════════════════════════════ */
const cur  = document.getElementById('cur');
const ring = document.getElementById('curRing');
let mx=0, my=0;
let rx=0, ry=0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = (mx - 4) + 'px';
  cur.style.top  = (my - 4) + 'px';
});

function animRing() {
  rx += (mx - rx - 16) * .11;
  ry += (my - ry - 16) * .11;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a, button, .proj-card, .des-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.transform  = 'scale(2.4)';
    ring.style.width     = '52px';
    ring.style.height    = '52px';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.transform  = 'scale(1)';
    ring.style.width     = '32px';
    ring.style.height    = '32px';
  });
});


/* ════════════════════════════════════════
   2. THEME SWITCHER
════════════════════════════════════════ */
const themeDots = document.querySelectorAll('.theme-dot');
const themes    = ['theme-golden-white', 'theme-gray-minimal', 'theme-dark'];

const saved = localStorage.getItem('portfolio_theme') || 'theme-golden-white';
applyTheme(saved);

themeDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const t = dot.dataset.theme;
    applyTheme(t);
    localStorage.setItem('portfolio_theme', t);
  });
});

function applyTheme(t) {
  document.body.classList.remove(...themes);
  document.body.classList.add(t);
  themeDots.forEach(d => d.classList.toggle('active', d.dataset.theme === t));
}


/* ════════════════════════════════════════
   3. SCROLL PROGRESS BAR
════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  document.getElementById('scrollLine').style.width = pct + '%';
});


/* ════════════════════════════════════════
   4. NAV HIDE / SHOW
════════════════════════════════════════ */
let lastY = 0;
const navEl = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 100 && y > lastY) {
    navEl.classList.add('hidden');
  } else {
    navEl.classList.remove('hidden');
  }
  lastY = y;
});


/* ════════════════════════════════════════
   5. ANIMATED SECTION TITLE WORD REVEAL
════════════════════════════════════════ */
function wrapChars(el) {
  const temp = document.createElement('div');
  temp.innerHTML = el.innerHTML;

  function processNode(node) {
    if (node.nodeType === 3) {
      const words = node.textContent.split(/(\s+)/);
      const frag  = document.createDocumentFragment();
      words.forEach(w => {
        if (/\s+/.test(w)) {
          frag.appendChild(document.createTextNode(w));
        } else if (w) {
          const outer = document.createElement('span');
          outer.className = 'char-wrap';
          const inner = document.createElement('span');
          inner.className = 'char';
          inner.textContent = w;
          outer.appendChild(inner);
          frag.appendChild(outer);
        }
      });
      node.parentNode.replaceChild(frag, node);
    } else if (node.nodeType === 1 && node.tagName !== 'BR') {
      Array.from(node.childNodes).forEach(processNode);
    }
  }

  Array.from(temp.childNodes).forEach(processNode);
  el.innerHTML = temp.innerHTML;
}

document.querySelectorAll('.sec-title').forEach(title => wrapChars(title));


/* ════════════════════════════════════════
   6. SCROLL REVEAL
════════════════════════════════════════ */
const revObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.classList.add('visible');
        if (e.target.classList.contains('sec-title')) {
          e.target.classList.add('title-revealed');
        }
      }, i * 80);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));


/* ════════════════════════════════════════
   7. EXPERIENCE ROW STAGGER REVEAL
════════════════════════════════════════ */
const expObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 120);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.exp-row').forEach(el => expObs.observe(el));


/* ════════════════════════════════════════
   8. DESIGN CAROUSEL
════════════════════════════════════════ */
(function() {
  const track   = document.getElementById('desTrack');
  if (!track) return;
  const cards   = Array.from(track.querySelectorAll('.des-card'));
  const dots    = Array.from(document.querySelectorAll('.des-dot-ind'));
  const btnPrev = document.getElementById('desPrev');
  const btnNext = document.getElementById('desNext');
  let activeIdx = 0;

  function setActive(idx) {
    idx = Math.max(0, Math.min(cards.length - 1, idx));
    cards.forEach((c, i) => c.classList.toggle('active', i === idx));
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    activeIdx = idx;
    const card = cards[idx];
    const trackRect = track.getBoundingClientRect();
    const cardRect  = card.getBoundingClientRect();
    const offset    = cardRect.left - trackRect.left - (trackRect.width / 2) + (cardRect.width / 2);
    track.scrollBy({ left: offset, behavior: 'smooth' });
  }

  if (btnPrev) btnPrev.addEventListener('click', () => setActive(activeIdx - 1));
  if (btnNext) btnNext.addEventListener('click', () => setActive(activeIdx + 1));
  dots.forEach(d => d.addEventListener('click', () => setActive(+d.dataset.idx)));

  cards.forEach((c, i) => {
    c.addEventListener('click', (e) => {
      if (!c.classList.contains('active')) {
        e.preventDefault();
        e.stopPropagation();
        setActive(i);
      }
    }, true);
  });

  // Drag-to-scroll
  let isDown = false, startX, scrollLeft;
  track.addEventListener('mousedown', e => { isDown = true; startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft; });
  track.addEventListener('mouseleave', () => isDown = false);
  track.addEventListener('mouseup',   () => isDown = false);
  track.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    track.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });
})();


/* ════════════════════════════════════════
   9. DES CARD SCROLL REVEAL
════════════════════════════════════════ */
const desCardObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.style.opacity   = '1';
        e.target.style.transform = e.target.classList.contains('active')
          ? 'translateY(-12px)'
          : 'translateY(0)';
        e.target.style.transition = 'opacity .5s ease, transform .5s ease, flex-basis .4s, box-shadow .35s, border-color .3s';
      }, i * 60);
    }
  });
}, { threshold: 0.05 });
document.querySelectorAll('.des-card').forEach(el => desCardObs.observe(el));


/* ════════════════════════════════════════
   10. CODE TYPING ANIMATION
════════════════════════════════════════ */
const lines = [
  { cls:'cm',  text:'// Siddhi Kolhe · Full Stack Dev' },
  { cls:'',    text:'' },
  { cls:'kw',  text:'const', extra:' developer = {' },
  { cls:'str', text:"  name: 'Siddhi Kolhe'," },
  { cls:'str', text:"  role: 'Full Stack Dev'," },
  { cls:'str', text:"  stack: ['React','ASP.NET'," },
  { cls:'str', text:"          'Node.js','SQL']," },
  { cls:'val', text:"  exp: '14+ months'," },
  { cls:'val', text:'  openToWork: true,' },
  { cls:'',    text:'}' },
  { cls:'',    text:'' },
  { cls:'kw',  text:'function', extra:' build() {' },
  { cls:'fn',  text:'  return (' },
  { cls:'tag', text:'    <Portfolio' },
  { cls:'tag', text:'      passion="max"' },
  { cls:'tag', text:'      quality="high"' },
  { cls:'fn',  text:'    />' },
  { cls:'',    text:'  )' },
  { cls:'',    text:'}' },
];

const codeBody = document.getElementById('codeBody');
let li = 0;
let ci = 0;

function typeLine() {
  if (li >= lines.length) {
    const last = codeBody.lastChild;
    if (last) {
      const caret = document.createElement('span');
      caret.className = 'caret';
      last.appendChild(caret);
    }
    return;
  }

  const line = lines[li];
  const full = (line.text || '') + (line.extra || '');

  if (ci === 0) {
    const sp = document.createElement('span');
    sp.className = 'cl';
    sp.id = 'aL';
    codeBody.appendChild(sp);
  }

  const active = document.getElementById('aL');
  const typed  = full.substring(0, ci + 1);
  active.innerHTML = '';

  if (line.cls) {
    const s = document.createElement('span');
    s.className = line.cls;
    const tLen = (line.text || '').length;
    if (typed.length <= tLen) {
      s.textContent = typed;
    } else {
      s.textContent = line.text || '';
    }
    active.appendChild(s);
    if (typed.length > tLen) {
      active.appendChild(document.createTextNode(typed.substring(tLen)));
    }
  } else {
    active.textContent = typed || ' ';
  }

  ci++;

  if (ci > full.length) {
    active.id = '';
    li++;
    ci = 0;
    setTimeout(typeLine, full.length === 0 ? 55 : 35);
  } else {
    setTimeout(typeLine, 28);
  }
}

setTimeout(typeLine, 900);