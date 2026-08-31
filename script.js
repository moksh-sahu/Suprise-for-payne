/* =========================================================
   PAYNE'S BIRTHDAY — script.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  /* ---------------------------------------------------------
     0. UTIL
  --------------------------------------------------------- */
  const rand = (min, max) => Math.random() * (max - min) + min;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  /* ---------------------------------------------------------
     1. LOADER
  --------------------------------------------------------- */
  const loader = document.getElementById('loader');
  const loaderSparkleWrap = document.getElementById('loaderSparkles');

  for (let i = 0; i < 22; i++) {
    const s = document.createElement('span');
    s.className = 'spark';
    s.textContent = pick(['✦', '✧', '⋆', '✩']);
    s.style.left = rand(0, 100) + '%';
    s.style.top = rand(20, 90) + '%';
    s.style.fontSize = rand(8, 18) + 'px';
    s.style.animationDelay = rand(0, 3) + 's';
    s.style.animationDuration = rand(2.5, 4.5) + 's';
    loaderSparkleWrap.appendChild(s);
  }

  window.addEventListener('load', () => {
    setTimeout(() => {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
        onComplete: () => {
          loader.style.display = 'none';
          initPageAnimations();
        }
      });
    }, 2000);
  });

  // Fallback in case 'load' already fired
  if (document.readyState === 'complete') {
    setTimeout(() => {
      gsap.to(loader, {
        opacity: 0, duration: 0.9, ease: 'power2.out',
        onComplete: () => { loader.style.display = 'none'; initPageAnimations(); }
      });
    }, 2000);
  }

  /* ---------------------------------------------------------
     2. AMBIENT GLOBAL DECOR (clouds + tiny sparkles drifting)
  --------------------------------------------------------- */
  const ambientLayer = document.getElementById('ambientLayer');
  const ambientEmojis = ['☁️', '✦', '✧'];
  for (let i = 0; i < 10; i++) {
    const el = document.createElement('div');
    el.className = 'ambient-item';
    el.textContent = pick(ambientEmojis);
    el.style.left = rand(0, 100) + '%';
    el.style.top = rand(0, 100) + '%';
    el.style.fontSize = rand(14, 30) + 'px';
    el.style.color = pick(['#FF7FB5', '#7B5DFF', '#ffffff']);
    ambientLayer.appendChild(el);
    gsap.to(el, {
      y: rand(-40, 40),
      x: rand(-30, 30),
      duration: rand(6, 12),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: rand(0, 3)
    });
  }

  /* ---------------------------------------------------------
     3. FLOATING PETALS (per section)
  --------------------------------------------------------- */
  function spawnPetals(containerId, count, emojis) {
    const container = document.getElementById(containerId);
    if (!container) return;
    for (let i = 0; i < count; i++) {
      const petal = document.createElement('span');
      petal.className = 'petal';
      petal.textContent = pick(emojis);
      petal.style.left = rand(0, 100) + '%';
      petal.style.fontSize = rand(12, 22) + 'px';
      petal.style.opacity = rand(0.4, 0.9);
      container.appendChild(petal);

      const duration = rand(9, 18);
      const delay = rand(0, 10);
      const drift = rand(-80, 80);

      gsap.set(petal, { y: -60, x: 0, rotation: rand(-30, 30) });
      gsap.to(petal, {
        y: '110vh',
        x: drift,
        rotation: rand(180, 400),
        duration,
        delay,
        repeat: -1,
        ease: 'none',
        onRepeat: () => {
          gsap.set(petal, { y: -60, x: 0 });
        }
      });
    }
  }

  spawnPetals('petalsHero', 10, ['🌸', '✦', '✧']);
  spawnPetals('petalsGallery', 8, ['🌸', '🌷']);
  spawnPetals('petalsLetter', 6, ['🌸', '✦']);

  /* ---------------------------------------------------------
     4. HERO FLOATERS (hearts / sparkles / butterflies)
  --------------------------------------------------------- */
  const heroFloaters = document.getElementById('heroFloaters');
  const heroEmojis = ['💗', '✦', '🦋', '✧', '💕'];
  for (let i = 0; i < 14; i++) {
    const f = document.createElement('span');
    f.className = 'floater';
    f.textContent = pick(heroEmojis);
    f.style.left = rand(2, 96) + '%';
    f.style.top = rand(5, 95) + '%';
    f.style.fontSize = rand(14, 26) + 'px';
    heroFloaters.appendChild(f);
    gsap.to(f, {
      y: rand(-24, 24),
      x: rand(-16, 16),
      rotation: rand(-15, 15),
      duration: rand(3, 6),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: rand(0, 2)
    });
  }

  /* ---------------------------------------------------------
     5. PAGE ANIMATIONS (hero entrance + scroll reveals)
  --------------------------------------------------------- */
  function initPageAnimations() {
    // Hero entrance sequence
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero-card', { opacity: 0, y: 60, scale: 0.94, duration: 1.1 })
      .from('.ribbon', { opacity: 0, y: -30, scale: 0.5, duration: 0.7 }, '-=0.6')
      .from('.eyebrow-script', { opacity: 0, y: 14, duration: 0.6 }, '-=0.3')
      .from('.hero-title-line', { opacity: 0, y: 14, duration: 0.6 }, '-=0.35')
      .from('.hero-title-name', { opacity: 0, y: 20, scale: 0.92, duration: 0.7 }, '-=0.3')
      .from('.hero-subtitle', { opacity: 0, y: 14, duration: 0.6 }, '-=0.3')
      .from('#openGiftBtn', { opacity: 0, y: 14, duration: 0.6 }, '-=0.3')
      .from('.deco', { opacity: 0, scale: 0, stagger: 0.06, duration: 0.5 }, '-=0.5');

    // subtle parallax blobs
    gsap.to('.blob-1', { y: 40, x: 20, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.blob-2', { y: -30, x: -20, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.blob-3', { y: 26, x: -16, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    // Section heading reveals
    gsap.utils.toArray('.section-heading-wrap').forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 82%' }
      });
    });

    // Polaroid staggered reveal
    gsap.utils.toArray('.polaroid').forEach((card, i) => {
      const finalRotation = getComputedStyle(card).transform;
      gsap.to(card, {
        opacity: 1,
        duration: 0.9,
        delay: (i % 3) * 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%' }
      });
      gsap.from(card, {
        y: 70,
        rotate: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%' }
      });
    });

    // Gallery parallax on scroll
    gsap.utils.toArray('.polaroid').forEach((card) => {
      const speed = parseFloat(card.dataset.speed || 1);
      gsap.to(card, {
        y: (speed - 1) * -80,
        ease: 'none',
        scrollTrigger: {
          trigger: '.gallery-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });

    // Letter envelope + cake zoom in
    gsap.from('.envelope-wrap', {
      opacity: 0,
      scale: 0.9,
      y: 40,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.envelope-wrap', start: 'top 85%' }
    });

    gsap.from('.cake-wrap', {
      opacity: 0,
      y: 50,
      scale: 0.9,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.cake-wrap', start: 'top 85%' }
    });

    gsap.from('.btn-celebrate', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.btn-celebrate', start: 'top 92%' }
    });

    // Ending fade/scale in
    gsap.from('.ending-content', {
      opacity: 0,
      y: 50,
      scale: 0.96,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.ending-section', start: 'top 70%' }
    });

    ScrollTrigger.refresh();
  }

  /* ---------------------------------------------------------
     6. SMOOTH SCROLL: hero button -> gallery
  --------------------------------------------------------- */
  document.getElementById('openGiftBtn').addEventListener('click', () => {
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------------------------------------------------------
     7. SIDE NAV SCROLLSPY + smooth scroll
  --------------------------------------------------------- */
  const navDots = document.querySelectorAll('.side-nav .dot');
  navDots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(dot.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const sections = document.querySelectorAll('main .section');
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navDots.forEach((d) => d.classList.toggle('active', d.getAttribute('href') === '#' + id));
        }
      });
    },
    { threshold: 0.5 }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  /* ---------------------------------------------------------
     8. MUSIC TOGGLE
  --------------------------------------------------------- */
  const musicBtn = document.getElementById('musicToggle');
  const audio = document.getElementById('bgMusic');
  let musicPlaying = false;

  musicBtn.addEventListener('click', () => {
    if (!musicPlaying) {
      audio.play().then(() => {
        musicPlaying = true;
        musicBtn.setAttribute('aria-pressed', 'true');
        musicBtn.setAttribute('aria-label', 'Pause music');
      }).catch(() => {
        // No audio file provided / autoplay restrictions — fail silently
        musicBtn.classList.add('shake-note');
      });
    } else {
      audio.pause();
      musicPlaying = false;
      musicBtn.setAttribute('aria-pressed', 'false');
      musicBtn.setAttribute('aria-label', 'Play music');
    }
  });

  /* ---------------------------------------------------------
     9. LETTER — ENVELOPE OPEN + TYPEWRITER
  --------------------------------------------------------- */
  const envelope = document.getElementById('envelope');
  const openLetterBtn = document.getElementById('openLetterBtn');
  const typewriterEl = document.getElementById('typewriterText');

  const letterMessage =
`Happy Birthday, Payne!! 🥹💗

I just want to say how truly grateful I am that you were born. Being an only child, I never really experienced having a sibling, but somehow you became the big sister and friend I never knew I needed.

You've always been there for me, like an older sibling, telling me when I'm doing something wrong and guiding me in your own funny and sassy way 😭😂 I honestly love you just the way you are.

It's still so surprising to me that someone I met online could become such an important person in my life. I really hope our bond stays forever because I never want to lose you. It's been almost 1 or 2 years already, na? Haha 🥹

Thank you for always being there, bebe 💗 And please remember, whenever you need me, I'll always be here for you too hehe.

Love youuu and happy birthday once again!! 🎂🎀`;

  let typewriterStarted = false;

  function typeWriter(text, el, speed = 28) {
    let i = 0;
    el.textContent = '';
    el.classList.remove('done');
    function step() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        // vary speed slightly for a natural hand-written feel
        const jitter = /[,.\n!?]/.test(text.charAt(i - 1)) ? speed * 5 : speed * rand(0.6, 1.3);
        setTimeout(step, jitter);
      } else {
        el.classList.add('done');
      }
    }
    step();
  }

  openLetterBtn.addEventListener('click', () => {
    envelope.classList.toggle('open');
    const isOpen = envelope.classList.contains('open');
    openLetterBtn.querySelector('span').textContent = isOpen ? 'Close Letter' : 'Open Letter';

    if (isOpen && !typewriterStarted) {
      typewriterStarted = true;
      setTimeout(() => typeWriter(letterMessage, typewriterEl, 26), 900);
    }

    if (isOpen) {
      // gentle celebratory sparkle burst near the envelope
      burstMiniSparkles(envelope);
    }
  });

  function burstMiniSparkles(target) {
    const rect = target.getBoundingClientRect();
    for (let i = 0; i < 10; i++) {
      const s = document.createElement('div');
      s.textContent = pick(['✦', '✧', '💗']);
      s.style.position = 'fixed';
      s.style.left = rect.left + rect.width / 2 + 'px';
      s.style.top = rect.top + 'px';
      s.style.pointerEvents = 'none';
      s.style.zIndex = 999;
      s.style.fontSize = rand(12, 20) + 'px';
      s.style.color = pick(['#FF7FB5', '#7B5DFF']);
      document.body.appendChild(s);
      gsap.to(s, {
        x: rand(-120, 120),
        y: rand(-140, -40),
        opacity: 0,
        rotation: rand(-90, 90),
        duration: rand(1, 1.6),
        ease: 'power2.out',
        onComplete: () => s.remove()
      });
    }
  }

  /* ---------------------------------------------------------
     10. CELEBRATION — CONFETTI, FIREWORKS, BALLOONS, HEARTS
  --------------------------------------------------------- */
  const celebrateBtn = document.getElementById('celebrateBtn');
  const confettiCanvas = document.getElementById('confettiCanvas');
  const balloonsLayer = document.getElementById('balloonsLayer');
  const fireworksLayer = document.getElementById('fireworksLayer');
  const heartParticlesLayer = document.getElementById('heartParticles');
  const cake = document.getElementById('cake');

  function resizeConfettiCanvas() {
    confettiCanvas.width = confettiCanvas.offsetWidth;
    confettiCanvas.height = confettiCanvas.offsetHeight;
  }
  resizeConfettiCanvas();
  window.addEventListener('resize', resizeConfettiCanvas);

  const myConfetti = window.confetti ? window.confetti.create(confettiCanvas, { resize: true, useWorker: true }) : null;

  function launchConfetti() {
    if (!myConfetti) return;
    const colors = ['#FFD6E8', '#FF7FB5', '#E8D8FF', '#7B5DFF', '#FFFFFF'];
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      myConfetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 }, colors });
      myConfetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();

    myConfetti({ particleCount: 140, spread: 100, origin: { y: 0.5 }, colors, startVelocity: 45, scalar: 1.1 });
  }

  function spawnBalloons() {
    const emojis = [{ color: '#FF7FB5' }, { color: '#E8D8FF' }, { color: '#FFD6E8' }, { color: '#7B5DFF' }];
    for (let i = 0; i < 9; i++) {
      const b = document.createElement('div');
      b.className = 'balloon';
      const c = pick(emojis).color;
      b.style.background = `radial-gradient(circle at 35% 30%, #ffffff88, ${c})`;
      b.style.left = rand(2, 92) + '%';
      balloonsLayer.appendChild(b);
      gsap.to(b, {
        y: -window.innerHeight - 200,
        x: rand(-60, 60),
        rotation: rand(-12, 12),
        duration: rand(6, 10),
        ease: 'power1.out',
        delay: rand(0, 1.2),
        onComplete: () => b.remove()
      });
    }
  }

  function spawnFireworks() {
    const positions = [
      { x: 0.2, y: 0.3 }, { x: 0.5, y: 0.2 }, { x: 0.8, y: 0.35 }, { x: 0.35, y: 0.5 }, { x: 0.65, y: 0.45 }
    ];
    positions.forEach((pos, idx) => {
      setTimeout(() => {
        const cx = window.innerWidth * pos.x;
        const cy = document.getElementById('celebrate').getBoundingClientRect().top + window.innerHeight * pos.y;
        const colors = ['#FFD6E8', '#FF7FB5', '#E8D8FF', '#7B5DFF', '#FFFFFF'];
        for (let i = 0; i < 24; i++) {
          const p = document.createElement('div');
          p.className = 'firework-particle';
          p.style.background = pick(colors);
          p.style.left = cx + 'px';
          p.style.top = (cy - window.scrollY) + 'px';
          fireworksLayer.appendChild(p);
          const angle = (Math.PI * 2 * i) / 24;
          const dist = rand(60, 140);
          gsap.to(p, {
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist,
            opacity: 0,
            scale: 0.3,
            duration: rand(0.9, 1.4),
            ease: 'power2.out',
            onComplete: () => p.remove()
          });
        }
      }, idx * 260);
    });
  }

  function spawnHeartParticles() {
    for (let i = 0; i < 18; i++) {
      const h = document.createElement('div');
      h.className = 'heart-particle';
      h.textContent = pick(['💗', '💕', '💖', '✦']);
      h.style.left = rand(2, 96) + '%';
      h.style.fontSize = rand(14, 26) + 'px';
      heartParticlesLayer.appendChild(h);
      gsap.to(h, {
        y: -(window.innerHeight + 100),
        x: rand(-50, 50),
        rotation: rand(-40, 40),
        opacity: 0,
        duration: rand(3.5, 5.5),
        delay: rand(0, 1),
        ease: 'power1.out',
        onComplete: () => h.remove()
      });
    }
  }

  let celebrated = false;
  celebrateBtn.addEventListener('click', () => {
    launchConfetti();
    spawnBalloons();
    spawnFireworks();
    spawnHeartParticles();

    gsap.fromTo(cake, { scale: 1 }, { scale: 1.08, duration: 0.35, yoyo: true, repeat: 3, ease: 'power1.inOut' });
    gsap.fromTo('.candle .flame', { scale: 1 }, { scale: 1.4, duration: 0.3, yoyo: true, repeat: 5, ease: 'power1.inOut' });

    celebrateBtn.classList.add('celebrated');
    if (!celebrated) {
      celebrated = true;
      gsap.fromTo(celebrateBtn, { scale: 1 }, { scale: 1.06, duration: 0.2, yoyo: true, repeat: 1 });
    }
  });

  /* ---------------------------------------------------------
     11. ENDING — HEARTS FOREVER
  --------------------------------------------------------- */
  const heartsForeverLayer = document.getElementById('heartsForever');
  let endingHeartsStarted = false;

  function spawnForeverHeart() {
    const h = document.createElement('div');
    h.textContent = pick(['💗', '💕', '💖']);
    h.style.position = 'absolute';
    h.style.bottom = '-40px';
    h.style.left = rand(0, 100) + '%';
    h.style.fontSize = rand(14, 28) + 'px';
    h.style.opacity = rand(0.5, 0.9);
    heartsForeverLayer.appendChild(h);
    gsap.to(h, {
      y: -(window.innerHeight + 100),
      x: rand(-40, 40),
      rotation: rand(-30, 30),
      opacity: 0,
      duration: rand(6, 11),
      ease: 'none',
      onComplete: () => h.remove()
    });
  }

  const endingObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !endingHeartsStarted) {
        endingHeartsStarted = true;
        setInterval(spawnForeverHeart, 700);
        for (let i = 0; i < 6; i++) setTimeout(spawnForeverHeart, i * 150);
      }
    });
  }, { threshold: 0.3 });
  endingObserver.observe(document.getElementById('ending'));

});
