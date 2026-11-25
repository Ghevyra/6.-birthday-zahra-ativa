/* =========================================================
   AMARA — Digital Birthday Letter — interaction script
   ========================================================= */
(() => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const audio = document.getElementById('bgAudio');
  let current = 0;
  let autoTimer = null;

  // -------- Personalisation text (edit freely) --------
  const LETTER_PARAGRAPHS = [
    "Selamat ulang tahun yang ke-17, Zahra Ativa! 🤍🎂",
    "Selamat datang di usia 17 tahun, usia yang penuh dengan cerita, harapan, dan langkah-langkah baru menuju masa depan. Semoga di usia ini, Zahra selalu diberikan kesehatan, kebahagiaan, dan dikelilingi oleh orang-orang yang benar-benar tulus menyayangi dan menghargai Zahra.",
    "Semoga semua impian yang sedang Zahra perjuangkan bisa perlahan menjadi kenyataan. Kalau nanti ada hari-hari yang terasa berat, jangan pernah merasa bahwa Zahra harus menghadapi semuanya sendirian. Tetap percaya pada diri sendiri, karena Zahra lebih kuat dan lebih berharga daripada yang mungkin Zahra sadari.",
    "Terima kasih sudah menjadi pribadi yang begitu berarti bagi orang-orang di sekitar. Semoga senyum Zahra selalu punya alasan untuk hadir, semoga langkah Zahra selalu dipermudah, dan semoga perjalanan di usia 17 ini dipenuhi banyak momen indah yang nantinya akan menjadi kenangan yang tak terlupakan.",
    "Sekali lagi, happy sweet seventeen, Zahra Ativa! 🥳💐 Semoga di usia 17 tahun ini, Zahra semakin dewasa tanpa kehilangan sisi baik dan cerianya. Kejar apa yang Zahra impikan, nikmati setiap prosesnya, dan jangan lupa untuk selalu bahagia.",
    "Semoga 17 menjadi awal dari banyak hal indah dalam hidup Zahra. Selamat ulang tahun! 🤍✨"
  ];

  let letterTimers = [];

  /* ---------------- Slide engine ---------------- */
  function goTo(index, { fromEnvelope = false } = {}) {
    if (index < 0 || index >= slides.length) return;
    if (index === current && !fromEnvelope) return;
    clearTimeout(autoTimer);

    const prevEl = slides[current];
    const nextEl = slides[index];

    if (prevEl && prevEl !== nextEl) {
      prevEl.removeAttribute('data-active');
    }
    nextEl.setAttribute('data-active', 'true');
    current = index;

    runSlideBehavior(nextEl.id);
  }

  function scheduleNext(ms) {
    clearTimeout(autoTimer);
    if (typeof ms === 'number' && ms > 0) {
      autoTimer = setTimeout(() => goNext(), ms);
    }
  }

  function runSlideBehavior(id) {
    switch (id) {
      case 'slide-1':
        startBlinking();
        break;

      case 'slide-2':
        break;

      case 'slide-3':
        runLetterReveal();
        break;

      case 'slide-4':
        break;

      case 'slide-5':
        break;

      case 'slide-6':
        break;

      case 'slide-7':
        setupScratchCards();
        break;

      case 'slide-8':
        stopAudio();
        break;

      default:
        break;
    }
  }

  /* ---------------- Envelope open ---------------- */
  const envelope = document.getElementById('envelope');
  const waxSeal = document.getElementById('waxSeal');

  function openEnvelope() {
    if (!envelope || envelope.dataset.open === 'true') return;
    envelope.dataset.open = 'true';
    startAudio();
    setTimeout(() => goTo(1, { fromEnvelope: true }), 1150);
  }

  if (waxSeal) waxSeal.addEventListener('click', openEnvelope);
  if (envelope) envelope.addEventListener('click', openEnvelope);

  /* ---------------- Audio control ---------------- */
  function startAudio() {
    if (!audio) return;
    audio.currentTime = 0;
    audio.volume = 0.85;
    const p = audio.play();
    if (p && p.catch) p.catch(() => {});
  }

  function stopAudio() {
    if (!audio) return;
    audio.pause();
  }

  function restartAudioFromZero() {
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }

  /* ---------------- Slide 1 — blinking eyes ---------------- */
  let blinkInterval = null;
  function startBlinking() {
    clearInterval(blinkInterval);
    const photo = document.getElementById('blinkPhoto');
    if (!photo) return;
    blinkInterval = setInterval(() => {
      photo.classList.remove('blinking');
      void photo.offsetWidth;
      photo.classList.add('blinking');
    }, 3400);
  }

  /* ---------------- Slide 3 — paragraph reveal ---------------- */
  function runLetterReveal() {
    const container = document.getElementById('letterBody');
    const card = document.querySelector('.letter-card');
    if (!container) return;

    letterTimers.forEach((t) => clearTimeout(t));
    letterTimers = [];
    container.innerHTML = '';
    if (card) card.scrollTop = 0;

    LETTER_PARAGRAPHS.forEach((text, index) => {
      const p = document.createElement('p');
      p.className = 'letter-para';
      p.textContent = text;
      container.appendChild(p);

      const timer = setTimeout(() => {
        p.classList.add('show');
        if (card && index >= 2) {
          card.scrollTo({
            top: card.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, index * 650);

      letterTimers.push(timer);
    });
  }

  /* ---------------- Slide 7 — scratch cards ---------------- */
  let resizeHandlers = [];

  function setupScratchCards() {
    const cards = document.querySelectorAll('.scratch-card');
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) continueBtn.classList.remove('show');

    // Bersihkan listener resize lama bila masuk ulang slide 7
    resizeHandlers.forEach((fn) => window.removeEventListener('resize', fn));
    resizeHandlers = [];

    cards.forEach((card) => {
      card.classList.remove('revealed');
      let canvas = card.querySelector('canvas');
      if (canvas) canvas.remove();

      canvas = document.createElement('canvas');
      card.appendChild(canvas);

      const resize = () => {
        canvas.width = card.clientWidth;
        canvas.height = card.clientHeight;
        paintScratchSurface(canvas);
      };
      resize();
      window.addEventListener('resize', resize);
      resizeHandlers.push(resize);

      const ctx = canvas.getContext('2d');
      let drawing = false;

      function pos(e) {
        const rect = canvas.getBoundingClientRect();
        const cx = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const cy = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
        return {
          x: cx * (canvas.width / rect.width),
          y: cy * (canvas.height / rect.height)
        };
      }

      function scratchAt(x, y) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, Math.max(canvas.width, canvas.height) * 0.09, 0, Math.PI * 2);
        ctx.fill();
      }

      function checkRevealProgress() {
        if (!canvas.width || !canvas.height) return;
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let cleared = 0;
        const step = 40;
        let sampled = 0;
        for (let p = 3; p < data.length; p += 4 * step) {
          sampled++;
          if (data[p] < 40) cleared++;
        }
        const ratio = sampled ? cleared / sampled : 0;
        if (ratio > 0.55 && !card.classList.contains('revealed')) {
          card.classList.add('revealed');
          checkAllRevealed();
        }
      }

      function start(e) {
        drawing = true;
        const { x, y } = pos(e);
        scratchAt(x, y);
        e.preventDefault();
      }
      function move(e) {
        if (!drawing) return;
        const { x, y } = pos(e);
        scratchAt(x, y);
      }
      function end() {
        if (!drawing) return;
        drawing = false;
        checkRevealProgress();
      }

      canvas.addEventListener('mousedown', start);
      canvas.addEventListener('mousemove', move);
      window.addEventListener('mouseup', end);
      canvas.addEventListener('touchstart', start, { passive: false });
      canvas.addEventListener('touchmove', move, { passive: false });
      canvas.addEventListener('touchend', end);
    });

    function checkAllRevealed() {
      const all = document.querySelectorAll('.scratch-card');
      const done = document.querySelectorAll('.scratch-card.revealed');
      if (continueBtn && done.length >= all.length) {
        continueBtn.classList.add('show');
      }
    }

    if (continueBtn) {
      continueBtn.onclick = () => goTo(8);
    }
  }

  function paintScratchSurface(canvas) {
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#F7C2F5');
    grad.addColorStop(1, '#EE96EC');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#4E204B';
    ctx.font = `600 ${Math.round(canvas.height * 0.16)}px "Playfair Display", serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Open Me ♡', canvas.width / 2, canvas.height / 2);
  }

  /* ---------------- Restart ---------------- */
  const restartBtn = document.getElementById('restartBtn');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      clearTimeout(autoTimer);
      clearInterval(blinkInterval);
      letterTimers.forEach((t) => clearTimeout(t));
      letterTimers = [];
      restartAudioFromZero();
      slides.forEach((s) => s.removeAttribute('data-active'));
      if (envelope) envelope.dataset.open = 'false';
      current = 0;
      if (slides[0]) slides[0].setAttribute('data-active', 'true');
    });
  }

  /* ---------------- Navigation helper ---------------- */
  function goNext() {
    if (current < slides.length - 1) {
      goTo(current + 1);
    }
  }

  window.goNext = goNext;
  window.goNextSlide = goNext;
})();