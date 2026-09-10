/* ============================================================
   Adel's Little Scrapbook ♡ — script.js
   GSAP + ScrollTrigger animations
   ============================================================ */

   document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
  
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
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
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
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
        y: 30,
        duration: 0.7,
        delay: i * 0.12,
        ease: 'power2.out',
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
        x: -50,
        duration: 0.8,
        ease: 'power2.out',
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
    let letterOpened = false;
  
    envelope.addEventListener('click', () => {
      if (letterOpened) return;
      letterOpened = true;
  
      const letterTl = gsap.timeline();
  
      letterTl
        .to(envelope, { scale: 1.05, duration: 0.2, ease: 'power1.out' })
        .to('.envelope-flap', { rotateX: 180, duration: 0.6, ease: 'power2.inOut', transformOrigin: 'top' }, '+=0.05')
        .set('.envelope-flap', { zIndex: 1 })
        .to(envelopeLetter, {
          y: -90,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out'
        }, '-=0.2')
        .to(envelope, { scale: 1, duration: 0.3 }, '-=0.3')
        .to(envelopeHint, { opacity: 0, duration: 0.3 }, '-=0.6');
    });
  });