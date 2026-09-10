/* ============================================================
   Adel's Little Scrapbook ♡ — script.js
   GSAP + ScrollTrigger animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     0. RANDOMIZE DECORATION PLACEMENT (subtle, per reload)
  --------------------------------------------------------- */
  document.querySelectorAll('.deco').forEach(el => {
    const dx = (Math.random() * 16 - 8).toFixed(1);
    const dy = (Math.random() * 16 - 8).toFixed(1);
    const drot = (Math.random() * 10 - 5).toFixed(1);
    el.style.transform = `translate(${dx}px, ${dy}px) rotate(${drot}deg)`;
  });

  /* ---------------------------------------------------------
     1. COVER ENTRANCE ANIMATION
  --------------------------------------------------------- */
  const coverTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

  coverTl
    .from('.cover-page', { opacity: 0, duration: 1.2 })
    .from('.deco', {
      opacity: 0,
      scale: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'back.out(1.7)'
    }, '-=0.6')
    .from('.cover-illustration', { opacity: 0, scale: 0.7, duration: 0.9 }, '-=0.3')
    .from('.cover-eyebrow', { opacity: 0, y: 14, duration: 0.7 }, '-=0.5')
    .from('.cover-name', { opacity: 0, y: 24, duration: 0.9 }, '-=0.4')
    .from('.cover-sub', { opacity: 0, y: 14, duration: 0.7 }, '-=0.5')
    .from('.btn-open', { opacity: 0, y: 14, duration: 0.7 }, '-=0.4');

  /* ---------------------------------------------------------
     2. OPEN SCRAPBOOK
  --------------------------------------------------------- */
  const openBtn = document.getElementById('openBtn');
  const bgMusic = document.getElementById('bgMusic');
  const musicPlayer = document.getElementById('musicPlayer');
  const musicIcon = document.getElementById('musicIcon');
  const playPauseBtn = document.getElementById('playPauseBtn');

  let scrapbookOpened = false;

  openBtn.addEventListener('click', () => {
    if (scrapbookOpened) return;
    scrapbookOpened = true;

    const openTl = gsap.timeline();

    openTl
      .to(openBtn, { scale: 0.92, duration: 0.15, ease: 'power1.in' })
      .to('.cover-content', { opacity: 0, y: -20, duration: 0.6, ease: 'power2.in' }, '-=0.05')
      .to('.deco', { opacity: 0, scale: 0.6, duration: 0.5, stagger: 0.04 }, '<')
      .to('.cover-page', {
        opacity: 0,
        duration: 0.7,
        onComplete: () => {
          playTornTransition(() => {
            document.getElementById('about').scrollIntoView({ behavior: 'auto' });
          });
        }
      }, '-=0.3');

    // reveal music player + attempt play (user-triggered click satisfies autoplay policies)
    musicPlayer.classList.add('show');
    bgMusic.volume = 0.6;
    bgMusic.play().then(() => {
      musicIcon.classList.add('spin');
      playPauseBtn.textContent = '❚❚';
    }).catch(() => {
      // autoplay blocked; user can press play manually
      playPauseBtn.textContent = '▶';
    });
  });

  /* ---------------------------------------------------------
     3. MUSIC PLAYER CONTROLS
  --------------------------------------------------------- */
  playPauseBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicIcon.classList.add('spin');
      playPauseBtn.textContent = '❚❚';
    } else {
      bgMusic.pause();
      musicIcon.classList.remove('spin');
      playPauseBtn.textContent = '▶';
    }
  });

  const muteBtn = document.getElementById('muteBtn');
  let isMuted = false;
  muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    bgMusic.muted = isMuted;
    muteBtn.textContent = isMuted ? '🔇' : '🔊';
  });

  const volumeSlider = document.getElementById('volumeSlider');
  volumeSlider.addEventListener('input', (e) => {
    bgMusic.volume = parseFloat(e.target.value);
  });

  /* ---------------------------------------------------------
     5. SCROLL REVEAL ANIMATIONS (ScrollTrigger)
  --------------------------------------------------------- */
  const scrollDefaults = reduceMotion ? { duration: 0.01 } : {};

  // About section
  gsap.utils.toArray('[data-reveal="up"]').forEach(el => {
    gsap.from(el, {
      ...scrollDefaults,
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 80%' }
    });
  });

  gsap.utils.toArray('[data-reveal="paper"]').forEach((el, i) => {
    gsap.from(el, {
      ...scrollDefaults,
      opacity: 0,
      y: 46,
      rotate: '+=10',
      duration: 0.8,
      delay: i * 0.12,
      ease: 'back.out(1.8)',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  // Favorite cards
  gsap.utils.toArray('[data-reveal="card"]').forEach((el, i) => {
    gsap.from(el, {
      ...scrollDefaults,
      opacity: 0,
      y: 50,
      rotate: 0,
      duration: 0.7,
      delay: i * 0.12,
      ease: 'back.out(1.5)',
      scrollTrigger: { trigger: '.favorites-grid', start: 'top 80%' }
    });
  });

  // Photo wall — directional entrances
  const photoDirections = {
    'from-left': { x: -80, y: 0 },
    'from-right': { x: 80, y: 0 },
    'from-bottom': { x: 0, y: 80 }
  };

  gsap.utils.toArray('.polaroid').forEach((el, i) => {
    const dirKey = el.getAttribute('data-reveal');
    const dir = photoDirections[dirKey] || { x: 0, y: 60 };
    gsap.from(el, {
      ...scrollDefaults,
      opacity: 0,
      x: dir.x,
      y: dir.y,
      rotate: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.photo-wall', start: 'top 80%' }
    });
  });

  // Memories timeline
  gsap.utils.toArray('.memory-item').forEach((el, i) => {
    const paper = el.querySelector('.memory-paper');
    const photo = el.querySelector('.memory-photo');

    gsap.from(paper, {
      ...scrollDefaults,
      opacity: 0,
      x: -60,
      rotate: '+=8',
      duration: 0.85,
      ease: 'back.out(1.6)',
      scrollTrigger: { trigger: el, start: 'top 82%' }
    });

    gsap.from(photo, {
      ...scrollDefaults,
      opacity: 0,
      x: 50,
      duration: 0.8,
      delay: 0.15,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 82%' }
    });
  });

  // Timeline vertical line grows with scroll
  gsap.to('#timelineLine', {
    height: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.timeline',
      start: 'top 70%',
      end: 'bottom 80%',
      scrub: 1
    }
  });

  // Last page
  gsap.utils.toArray('[data-reveal="fade"]').forEach((el, i) => {
    gsap.from(el, {
      ...scrollDefaults,
      opacity: 0,
      y: 20,
      duration: 0.9,
      delay: i * 0.2,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.last-page', start: 'top 75%' }
    });
  });

  /* ---------------------------------------------------------
     6. GENTLE FLOATING DECORATIONS
  --------------------------------------------------------- */
  if (!reduceMotion) {
    gsap.utils.toArray('[data-float]').forEach((el, i) => {
      gsap.to(el, {
        y: '+=10',
        rotation: i % 2 === 0 ? 6 : -6,
        duration: 3 + (i % 3),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3
      });
    });
  }

  /* ---------------------------------------------------------
     7. LETTER ENVELOPE ANIMATION
  --------------------------------------------------------- */
  const envelope = document.getElementById('envelope');
  const envelopeLetter = document.getElementById('envelopeLetter');
  const envelopeHint = document.getElementById('envelopeHint');
  const envelopeSeal = document.getElementById('envelopeSeal');
  let letterOpened = false;

  envelope.addEventListener('click', () => {
    if (letterOpened) return;
    letterOpened = true;

    const letterTl = gsap.timeline();

    letterTl
      .to(envelope, { scale: 1.05, duration: 0.2, ease: 'power1.out' })
      .to('.envelope-flap', { rotateX: 180, duration: 0.6, ease: 'power2.inOut', transformOrigin: 'top' }, '+=0.05')
      .to(envelopeSeal, { opacity: 0, scale: 0.6, duration: 0.3, ease: 'power1.in' }, '<')
      .set('.envelope-flap', { zIndex: 1 })
      .set(envelopeSeal, { display: 'none' })
      .to(envelopeLetter, {
        y: -90,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.2')
      .to(envelope, { scale: 1, duration: 0.3 }, '-=0.3')
      .to(envelopeHint, { opacity: 0, duration: 0.3 }, '-=0.6');

    // confetti burst of little hearts & flowers falling from above the envelope
    spawnConfetti(envelope);
  });

  /* ---------------------------------------------------------
     8. HEART TAP / CLICK TRAIL
  --------------------------------------------------------- */
  const tapSymbols = ['♡', '✿', '❀'];

  function spawnTapHeart(x, y) {
    if (reduceMotion) return;
    const el = document.createElement('span');
    el.className = 'tap-heart';
    el.textContent = tapSymbols[Math.floor(Math.random() * tapSymbols.length)];
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    document.body.appendChild(el);

    gsap.fromTo(el,
      { opacity: 1, scale: 0.6, y: 0, x: 0 },
      {
        opacity: 0,
        scale: 1.1,
        y: -50 - Math.random() * 30,
        x: (Math.random() * 40 - 20),
        rotation: (Math.random() * 40 - 20),
        duration: 0.9,
        ease: 'power1.out',
        onComplete: () => el.remove()
      }
    );
  }

  document.addEventListener('click', (e) => {
    // skip clicks on interactive controls and on text content, to avoid covering readable text
    if (e.target.closest('button, input, .music-player, .envelope, p, h1, h2, h3, span, figcaption, a')) return;
    spawnTapHeart(e.clientX, e.clientY);
  });

  /* ---------------------------------------------------------
     9. SCROLL PROGRESS INDICATOR
  --------------------------------------------------------- */
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.innerHTML = '<div class="scroll-progress-fill"></div>';
  document.body.appendChild(progressBar);
  const progressFill = progressBar.querySelector('.scroll-progress-fill');

  ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      gsap.set(progressFill, { height: (self.progress * 100) + '%' });
    }
  });

  /* ---------------------------------------------------------
     10. GENTLE SCROLL PARALLAX ON DECORATIONS
  --------------------------------------------------------- */
  if (!reduceMotion) {
    gsap.utils.toArray('.deco').forEach((el, i) => {
      const depth = 20 + (i % 4) * 12; // varying depth per element
      const direction = i % 2 === 0 ? 1 : -1;
      gsap.to(el, {
        x: direction * depth,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2
        }
      });
    });
  }

  /* ---------------------------------------------------------
     11. POLAROID WIGGLE ON HOVER / TAP
  --------------------------------------------------------- */
  document.querySelectorAll('.polaroid').forEach(el => {
    let wiggling = false;
    const doWiggle = () => {
      if (wiggling) return;
      wiggling = true;
      gsap.timeline({ onComplete: () => { wiggling = false; } })
        .to(el, { rotation: '+=4', duration: 0.12, ease: 'sine.inOut' })
        .to(el, { rotation: '-=8', duration: 0.16, ease: 'sine.inOut' })
        .to(el, { rotation: '+=4', duration: 0.12, ease: 'sine.inOut' });
    };
    el.addEventListener('mouseenter', doWiggle);
    el.addEventListener('touchstart', doWiggle, { passive: true });
  });

  /* ---------------------------------------------------------
     12. TORN-PAPER TRANSITION (Cover → About)
  --------------------------------------------------------- */
  function buildTornEdgePath() {
    // generates a jagged top edge as a clip-path polygon string
    let points = ['0% 100%', '0% 12%'];
    const teeth = 14;
    for (let i = 0; i <= teeth; i++) {
      const x = (i / teeth) * 100;
      const y = i % 2 === 0 ? 4 : 16;
      points.push(`${x}% ${y}%`);
    }
    points.push('100% 100%');
    return `polygon(${points.join(',')})`;
  }

  const tearOverlay = document.createElement('div');
  tearOverlay.className = 'tear-overlay';
  tearOverlay.style.clipPath = buildTornEdgePath();
  document.body.appendChild(tearOverlay);

  function playTornTransition(onMid) {
    if (reduceMotion) {
      if (onMid) onMid();
      return;
    }
    const tl = gsap.timeline();
    tl.to(tearOverlay, { y: '0%', duration: 0.55, ease: 'power2.inOut' })
      .call(() => { if (onMid) onMid(); })
      .to(tearOverlay, { y: '-100%', duration: 0.6, ease: 'power2.inOut', delay: 0.05 })
      .set(tearOverlay, { y: '100%' });
  }

  gsap.set(tearOverlay, { y: '100%' });

  /* ---------------------------------------------------------
     13. CONFETTI BURST (used when the letter opens)
  --------------------------------------------------------- */
  const confettiSymbols = ['♡', '✿', '❀', '✦'];

  function spawnConfetti(anchorEl) {
    if (reduceMotion) return;
    const rect = anchorEl.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top;

    for (let i = 0; i < 14; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti-piece';
      piece.textContent = confettiSymbols[Math.floor(Math.random() * confettiSymbols.length)];
      const startX = originX + (Math.random() * rect.width - rect.width / 2);
      piece.style.left = startX + 'px';
      piece.style.top = (originY - 20) + 'px';
      piece.style.opacity = '0';
      document.body.appendChild(piece);

      gsap.to(piece, {
        opacity: 1,
        y: 140 + Math.random() * 100,
        x: (Math.random() * 80 - 40),
        rotation: (Math.random() * 180 - 90),
        duration: 1.4 + Math.random() * 0.8,
        delay: i * 0.05,
        ease: 'power1.in',
        onComplete: () => piece.remove()
      });
      gsap.to(piece, {
        opacity: 0,
        duration: 0.5,
        delay: i * 0.05 + 1.2,
        ease: 'power1.in'
      });
    }
  }
});
