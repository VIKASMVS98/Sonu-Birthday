/* ==========================================================================
   SONU KUMAR VIP BIRTHDAY WEBSITE JAVASCRIPT LOGIC
   15 August Independence Day Special Edition
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. STATE & PERSISTENCE ---
  let pageState = {
    friendName: localStorage.getItem('sonu_friendName') || 'Sonu Kumar',
    degree: localStorage.getItem('sonu_degree') || 'BCA Graduate & Tech Whiz',
    wishSubtitle: localStorage.getItem('sonu_wishSubtitle') || 'Celebrating our favorite BCA Graduate, Tech Whiz & Bhai of all Bhais! 💻🚀🇮🇳',
    theme: localStorage.getItem('sonu_theme') || 'patriot',
    candlesLit: 3,
    poppedCount: 0,
    musicPlaying: false,
    currentQuizIndex: 0,
    quizScore: 0,
    lightboxRotation: 0,
    wheelSpinning: false,
    wheelAngle: 0,
    wishIndex: 0
  };

  const heroWishes = [
    "\"Wishing Sonu Kumar the happiest 15 August Birthday! May your BCA graduation lead to top career success, highest LPA package & lifelong joy with friends!\"",
    "\"15th August Legend Sonu Bhai! Born on Independence Day to achieve greatness in coding, tech leadership & true brotherhood! 🇮🇳🚀\"",
    "\"To our favorite BCA Graduate & Tech Genius Sonu Kumar — May your future be bug-free, full of laughter & limitless accomplishments! 💻👑\"",
    "\"Happy 15 August Birthday Sonu! A true leader, loyal friend & master developer who makes every moment memorable! 🎉✨\"",
    "\"May Sonu Kumar reach the pinnacle of software engineering success, surrounded by true friends & endless blessings! 🏆🌟\""
  ];

  const updateDOMFromState = () => {
    document.getElementById('displayFriendName').textContent = pageState.friendName;
    document.getElementById('displayDegree').textContent = pageState.degree;
    document.getElementById('editName').value = pageState.friendName;
    document.getElementById('editDegree').value = pageState.degree;
    document.getElementById('editWish').value = pageState.wishSubtitle;

    document.body.setAttribute('data-theme', pageState.theme);
    document.getElementById('themeSelector').value = pageState.theme;
  };

  updateDOMFromState();

  // Theme Switcher Listener
  document.getElementById('themeSelector').addEventListener('change', (e) => {
    pageState.theme = e.target.value;
    localStorage.setItem('sonu_theme', pageState.theme);
    document.body.setAttribute('data-theme', pageState.theme);
  });

  // --- SCROLL ENTRANCE ANIMATION OBSERVER ---
  const sections = document.querySelectorAll('.section-container');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(sec => sectionObserver.observe(sec));

  // --- OFFICIAL BIRTHDAY WISH BANNER HANDLER ---
  const heroWishText = document.getElementById('heroWishText');
  const generateWishBtn = document.getElementById('generateWishBtn');
  const copyWishBtn = document.getElementById('copyWishBtn');

  generateWishBtn.addEventListener('click', () => {
    pageState.wishIndex = (pageState.wishIndex + 1) % heroWishes.length;
    heroWishText.textContent = heroWishes[pageState.wishIndex];
    playToneEffect('confetti');
    launchConfetti(window.innerWidth / 2, window.innerHeight * 0.3);
  });

  copyWishBtn.addEventListener('click', () => {
    const textToCopy = `🎂 Happy 15 August Birthday Sonu Kumar! 🇮🇳\n\n${heroWishText.textContent}\n\nCelebrate Sonu's Birthday Bash here: http://localhost:8085`;
    navigator.clipboard.writeText(textToCopy);
    playToneEffect('cheer');
    alert('📋 Birthday Wish copied to clipboard! Share it on WhatsApp now! 📲🎉');
  });

  // --- 2. CUSTOM SPARKLE TRAIL PARTICLES FOR CROWN CURSOR ---
  const sparkleColors = ['#FFD700', '#FF9933', '#FFFFFF', '#138808', '#00f5d4', '#9d4edd'];
  let lastSparkleTime = 0;

  window.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSparkleTime > 40) {
      lastSparkleTime = now;

      const p = document.createElement('div');
      p.className = 'sparkle-trail-particle';
      const size = Math.random() * 8 + 4;
      const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];

      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.background = color;
      p.style.boxShadow = `0 0 10px ${color}`;
      p.style.left = (e.clientX - size / 2) + 'px';
      p.style.top = (e.clientY - size / 2) + 'px';

      document.body.appendChild(p);
      setTimeout(() => p.remove(), 800);
    }
  });

  // 3D Card Tilt Effect on Mouse Movement
  const tiltCards = document.querySelectorAll('.polaroid-card, .dj-pad, .quiz-card, .terminal-card, .hero-timer-box, .gift-box-stage, .timeline-content, .audio-card, .official-wish-banner');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });

  // --- 3. FLOATING EMOJI REACTIONS ---
  const reactionBtns = document.querySelectorAll('.reaction-btn');
  const reactionsContainer = document.getElementById('floatingReactionsContainer');

  reactionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const emoji = btn.getAttribute('data-emoji');
      playToneEffect('confetti');

      for (let i = 0; i < 5; i++) {
        const floatEl = document.createElement('div');
        floatEl.className = 'floating-emoji';
        floatEl.textContent = emoji;
        floatEl.style.left = Math.random() * 80 + 10 + '%';
        floatEl.style.animationDuration = (Math.random() * 1.5 + 2) + 's';
        reactionsContainer.appendChild(floatEl);

        setTimeout(() => floatEl.remove(), 3000);
      }
    });
  });

  // --- 4. FIREWORKS & CONFETTI CANVAS ---
  const canvas = document.getElementById('fireworksCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.radius = Math.random() * 4 + 2;
      this.vx = (Math.random() - 0.5) * 14;
      this.vy = (Math.random() - 0.5) * 14;
      this.alpha = 1;
      this.decay = Math.random() * 0.02 + 0.015;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 12;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.restore();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.15;
      this.alpha -= this.decay;
    }
  }

  function launchConfetti(x, y) {
    const colors = ['#FF9933', '#FFFFFF', '#138808', '#FFD700', '#9d4edd', '#00f5d4'];
    for (let i = 0; i < 75; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push(new Particle(x, y, color));
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].alpha <= 0) {
        particles.splice(i, 1);
      }
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // Page Load Confetti Burst
  setTimeout(() => {
    launchConfetti(window.innerWidth / 2, window.innerHeight * 0.3);
  }, 500);

  // 10-Second Fireworks Spectacle Show
  const fireworksShowBtn = document.getElementById('fireworksShowBtn');
  fireworksShowBtn.addEventListener('click', () => {
    playToneEffect('cheer');
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const x = Math.random() * (window.innerWidth * 0.8) + (window.innerWidth * 0.1);
        const y = Math.random() * (window.innerHeight * 0.6) + (window.innerHeight * 0.1);
        launchConfetti(x, y);
      }, i * 500);
    }
  });

  window.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'A' && e.target.tagName !== 'SELECT') {
      launchConfetti(e.clientX, e.clientY);
    }
  });

  // --- 5. WEB AUDIO SYNTHESIZER & DJ SOUNDBOARD ---
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playToneEffect(type) {
    initAudio();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;

    if (type === 'pop') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.1);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'blow') {
      const bufferSize = audioCtx.sampleRate * 0.3;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.25, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      noise.connect(noiseGain);
      noiseGain.connect(audioCtx.destination);
      noise.start(now);
    } else if (type === 'cheer' || type === 'confetti' || type === 'applause') {
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, idx) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(freq, now + idx * 0.05);
        g.gain.setValueAtTime(0.2, now + idx * 0.05);
        g.gain.linearRampToValueAtTime(0.01, now + idx * 0.05 + 0.25);
        o.connect(g);
        g.connect(audioCtx.destination);
        o.start(now + idx * 0.05);
        o.stop(now + idx * 0.05 + 0.3);
      });
    } else if (type === 'bass') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.4);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'guitar' || type === 'horn' || type === 'whistle' || type === 'chant') {
      const freqs = type === 'horn' ? [300, 450, 600] : (type === 'whistle' ? [1200, 1600] : [220, 330, 440, 550]);
      freqs.forEach((f, i) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = 'square';
        o.frequency.setValueAtTime(f, now + i * 0.08);
        g.gain.setValueAtTime(0.15, now + i * 0.08);
        g.gain.linearRampToValueAtTime(0.01, now + i * 0.08 + 0.3);
        o.connect(g);
        g.connect(audioCtx.destination);
        o.start(now + i * 0.08);
        o.stop(now + i * 0.08 + 0.35);
      });
    }
  }

  document.querySelectorAll('.dj-pad').forEach(pad => {
    pad.addEventListener('click', () => {
      const soundType = pad.getAttribute('data-sound');
      playToneEffect(soundType);
      launchConfetti(window.innerWidth / 2, window.innerHeight * 0.5);
    });
  });

  // Synthesized Happy Birthday Song Loop
  let birthdayMelodyTimer = null;
  const hbNotes = [
    { note: 264, duration: 0.3 }, { note: 264, duration: 0.3 }, { note: 297, duration: 0.6 },
    { note: 264, duration: 0.6 }, { note: 352, duration: 0.6 }, { note: 330, duration: 1.0 },
    { note: 264, duration: 0.3 }, { note: 264, duration: 0.3 }, { note: 297, duration: 0.6 },
    { note: 264, duration: 0.6 }, { note: 396, duration: 0.6 }, { note: 352, duration: 1.0 }
  ];

  function playMelodyStep(index) {
    if (!pageState.musicPlaying) return;
    initAudio();

    const currentNote = hbNotes[index % hbNotes.length];
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.value = currentNote.note;
    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + currentNote.duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + currentNote.duration);

    birthdayMelodyTimer = setTimeout(() => {
      playMelodyStep(index + 1);
    }, currentNote.duration * 1000 + 100);
  }

  const musicBtn = document.getElementById('musicToggleBtn');
  musicBtn.addEventListener('click', () => {
    initAudio();
    pageState.musicPlaying = !pageState.musicPlaying;
    const btnText = document.getElementById('musicBtnText');

    if (pageState.musicPlaying) {
      btnText.textContent = 'Music: ON';
      musicBtn.classList.add('btn-gold');
      playMelodyStep(0);
    } else {
      btnText.textContent = 'Music: OFF';
      musicBtn.classList.remove('btn-gold');
      if (birthdayMelodyTimer) clearTimeout(birthdayMelodyTimer);
    }
  });

  // --- 6. 🎡 LUCKY BIRTHDAY SPINNER WHEEL LOGIC ---
  const spinWheelBtn = document.getElementById('spinWheelBtn');
  const wheelContainer = document.getElementById('wheelContainer');
  const wheelResultBox = document.getElementById('wheelResultBox');
  const wheelResultTitle = document.getElementById('wheelResultTitle');
  const wheelResultDesc = document.getElementById('wheelResultDesc');

  const wheelFortunes = [
    { title: "👑 King of BCA Squad!", desc: "Sonu Kumar is officially crowned the undisputed Leader of the BCA Squad!" },
    { title: "🚀 Highest LPA Package!", desc: "Sonu's destiny is sealed with top software engineering placements & highest LPA!" },
    { title: "🇮🇳 15 August Legend!", desc: "Born on Independence Day — Sonu Kumar receives double national honors & love!" },
    { title: "🍕 Grand Party Treat!", desc: "Sonu Bhai is treating everyone to a huge birthday feast & cold drinks!" },
    { title: "💻 FAANG Level Developer!", desc: "May Sonu's code compile error-free and break all tech records!" },
    { title: "💖 Yaaron Ka Yaar!", desc: "Unbreakable bond of brotherhood with all his best friends forever!" }
  ];

  spinWheelBtn.addEventListener('click', () => {
    if (pageState.wheelSpinning) return;
    pageState.wheelSpinning = true;

    playToneEffect('confetti');

    const randomSegmentIndex = Math.floor(Math.random() * wheelFortunes.length);
    const extraRounds = 5 * 360;
    const segmentAngle = 360 / wheelFortunes.length;
    const targetRotation = pageState.wheelAngle + extraRounds + (randomSegmentIndex * segmentAngle) + (segmentAngle / 2);

    pageState.wheelAngle = targetRotation;
    wheelContainer.style.transform = `rotate(${targetRotation}deg)`;

    setTimeout(() => {
      pageState.wheelSpinning = false;
      const fortune = wheelFortunes[randomSegmentIndex];
      wheelResultTitle.textContent = `🎉 You Landed On: ${fortune.title}`;
      wheelResultDesc.textContent = fortune.desc;
      wheelResultBox.style.display = 'block';

      playToneEffect('cheer');
      launchConfetti(window.innerWidth / 2, window.innerHeight * 0.4);
    }, 4000);
  });

  // --- 7. 🎙️ AUDIO VOICE BLESSINGS BOOTH ---
  const playSpeechBtn = document.getElementById('playSpeechBtn');
  const playAnthemBtn = document.getElementById('playAnthemBtn');

  playSpeechBtn.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance("Happy 15th August Birthday to Sonu Kumar! Our favorite BCA Graduate, coding genius, and best friend for life! Wish you infinite success!");
      utterance.rate = 0.95;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
      playToneEffect('cheer');
      launchConfetti(window.innerWidth / 2, window.innerHeight * 0.5);
    } else {
      alert("Happy 15th August Birthday Sonu Kumar! 🎉 (Speech synthesis not supported on browser)");
    }
  });

  playAnthemBtn.addEventListener('click', () => {
    initAudio();
    playToneEffect('guitar');
    playToneEffect('horn');
    launchConfetti(window.innerWidth / 2, window.innerHeight * 0.5);
  });

  // --- 8. 📜 OFFICIAL BIRTHDAY CERTIFICATE MODAL ---
  const openCertificateBtn = document.getElementById('openCertificateBtn');
  const certificateModal = document.getElementById('certificateModal');
  const closeCertModalBtn = document.getElementById('closeCertModalBtn');
  const printCertBtn = document.getElementById('printCertBtn');

  openCertificateBtn.addEventListener('click', () => {
    certificateModal.classList.add('active');
    playToneEffect('cheer');
    launchConfetti(window.innerWidth / 2, window.innerHeight * 0.5);
  });

  closeCertModalBtn.addEventListener('click', () => {
    certificateModal.classList.remove('active');
  });

  printCertBtn.addEventListener('click', () => {
    window.print();
  });

  // --- 9. 🎁 MYSTERY GIFT UNBOXING LOGIC ---
  const giftBox = document.getElementById('giftBox');
  const trophyCard = document.getElementById('trophyCard');
  const claimTrophyBtn = document.getElementById('claimTrophyBtn');

  giftBox.addEventListener('click', () => {
    if (giftBox.classList.contains('opened')) return;

    giftBox.classList.add('opened');
    playToneEffect('cheer');
    launchConfetti(window.innerWidth / 2, window.innerHeight * 0.4);

    setTimeout(() => {
      giftBox.style.display = 'none';
      trophyCard.classList.add('active');
    }, 600);
  });

  claimTrophyBtn.addEventListener('click', () => {
    playToneEffect('cheer');
    launchConfetti(window.innerWidth / 2, window.innerHeight / 2);
    alert(`🏆 Congratulations Sonu Kumar! 15 August Birthday Special Award claimed! Keep shining as the best BCA developer & leader! 🇮🇳🥳🌟`);
  });

  // --- 10. 🧠 DOSTI TRIVIA QUIZ LOGIC ---
  const quizData = [
    {
      q: "Why is Sonu Kumar's Birthday on 15th August so special?",
      options: [
        "Born on Independence Day — Double National Celebration! 🇮🇳🎉",
        "Top BCA Developer & True Leader status 👑",
        "Extra big party with friends & full tabahi 🔥",
        "All of the above! 🌟"
      ],
      correct: 3
    },
    {
      q: "What is Sonu Kumar's ultimate BCA Coding Superpower?",
      options: [
        "Debugging code & fixing everyone's errors in 10 seconds ⚡",
        "Writing bug-free Java & C++ scripts 💻",
        "Full Tabahi in every college project 🔥",
        "All of the above! 👑"
      ],
      correct: 3
    },
    {
      q: "What is our main birthday wish for Sonu Kumar?",
      options: [
        "Highest LPA Package in Software Engineering 🚀",
        "Infinite happiness, health & success 💖",
        "Lifelong unbreakable friendship 🤝",
        "100% All of the above! 🎉"
      ],
      correct: 3
    }
  ];

  const quizNum = document.getElementById('quizNum');
  const quizQuestion = document.getElementById('quizQuestion');
  const quizOptions = document.getElementById('quizOptions');
  const quizResult = document.getElementById('quizResult');
  const quizScoreText = document.getElementById('quizScoreText');
  const restartQuizBtn = document.getElementById('restartQuizBtn');

  function renderQuizQuestion() {
    if (pageState.currentQuizIndex >= quizData.length) {
      quizQuestion.style.display = 'none';
      quizOptions.style.display = 'none';
      quizResult.style.display = 'block';
      quizScoreText.textContent = `Score: ${pageState.quizScore}/${quizData.length}!`;
      playToneEffect('cheer');
      launchConfetti(window.innerWidth / 2, window.innerHeight * 0.6);
      return;
    }

    const q = quizData[pageState.currentQuizIndex];
    quizNum.textContent = pageState.currentQuizIndex + 1;
    quizQuestion.textContent = q.q;
    quizOptions.innerHTML = '';

    q.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.textContent = optText;

      btn.addEventListener('click', () => {
        if (idx === q.correct) {
          btn.classList.add('correct');
          pageState.quizScore++;
          playToneEffect('confetti');
        } else {
          btn.classList.add('wrong');
          playToneEffect('pop');
        }

        setTimeout(() => {
          pageState.currentQuizIndex++;
          renderQuizQuestion();
        }, 800);
      });

      quizOptions.appendChild(btn);
    });
  }

  renderQuizQuestion();

  restartQuizBtn.addEventListener('click', () => {
    pageState.currentQuizIndex = 0;
    pageState.quizScore = 0;
    quizResult.style.display = 'none';
    quizQuestion.style.display = 'block';
    quizOptions.style.display = 'flex';
    renderQuizQuestion();
  });

  // --- 11. CAKE & CANDLE BLOWING INTERACTION ---
  const blowCandlesBtn = document.getElementById('blowCandlesBtn');
  const micBlowBtn = document.getElementById('micBlowBtn');
  const cutCakeBtn = document.getElementById('cutCakeBtn');
  const candles = document.querySelectorAll('.candle');
  const cakeStatusBadge = document.getElementById('cakeStatusBadge');

  function blowOutCandles() {
    if (pageState.candlesLit === 0) return;
    playToneEffect('blow');

    candles.forEach(c => c.classList.add('out'));
    pageState.candlesLit = 0;

    cakeStatusBadge.innerHTML = '<i class="fa-solid fa-check"></i> Candles blown out! Make a wish and slice the cake!';
    cakeStatusBadge.style.background = 'rgba(0, 245, 212, 0.2)';
    cakeStatusBadge.style.borderColor = '#00f5d4';

    cutCakeBtn.disabled = false;
    cutCakeBtn.classList.remove('secondary-btn');
    cutCakeBtn.classList.add('gold-pulse');

    launchConfetti(window.innerWidth / 2, window.innerHeight * 0.6);
  }

  blowCandlesBtn.addEventListener('click', blowOutCandles);
  candles.forEach(candle => candle.addEventListener('click', blowOutCandles));

  micBlowBtn.addEventListener('click', async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micBlowBtn.innerHTML = '<i class="fa-solid fa-waveform"></i> Listening for blow...';
      micBlowBtn.style.background = '#00f5d4';
      micBlowBtn.style.color = '#000';

      const audioCtxMic = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioCtxMic.createAnalyser();
      const microphone = audioCtxMic.createMediaStreamSource(stream);
      microphone.connect(analyser);

      analyser.fftSize = 256;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      function checkVolume() {
        if (pageState.candlesLit === 0) return;
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
        let average = sum / dataArray.length;

        if (average > 45) {
          blowOutCandles();
          stream.getTracks().forEach(track => track.stop());
          micBlowBtn.innerHTML = '<i class="fa-solid fa-microphone"></i> Mic Blow Success!';
          return;
        }
        requestAnimationFrame(checkVolume);
      }
      checkVolume();
    } catch (err) {
      alert('Microphone access denied or not available. Use the "Blow Candles (Click)" button!');
    }
  });

  cutCakeBtn.addEventListener('click', () => {
    if (pageState.candlesLit > 0) {
      alert('Blow out the candles first!');
      return;
    }
    playToneEffect('cheer');
    launchConfetti(window.innerWidth / 2, window.innerHeight * 0.5);

    cakeStatusBadge.innerHTML = '🎉 CAKE CUT! Happy 15 August Birthday Sonu Kumar! 🇮🇳🎉';
    cutCakeBtn.innerHTML = '<i class="fa-solid fa-heart"></i> Cake Sliced & Shared!';
    cutCakeBtn.disabled = true;

    setTimeout(() => {
      alert(`🎉 Wish Granted! May Sonu Kumar have a brilliant 15 August BCA graduation celebration, fantastic career ahead & lifelong joy! 🇮🇳🥳🚀`);
    }, 400);
  });

  // --- 12. PHOTO & VIDEO GALLERY UPLOAD WITH LOCALSTORAGE PERSISTENCE ---
  const imageFileInput = document.getElementById('imageFileInput');
  const galleryGrid = document.getElementById('galleryGrid');

  let savedMedia = JSON.parse(localStorage.getItem('sonu_user_media') || '[]');

  function renderMediaItem(item, prepend = true) {
    const newCard = document.createElement('div');
    newCard.className = 'polaroid-card';
    const isVideo = item.type === 'video' || (item.src && item.src.startsWith('data:video'));

    newCard.innerHTML = `
      <div class="pin">📌</div>
      <div class="polaroid-img-wrapper">
        ${isVideo ? 
          `<video src="${item.src}" controls class="gallery-img" style="object-fit:cover; width:100%; height:100%;"></video>` : 
          `<img src="${item.src}" alt="${item.caption || 'Uploaded Photo'}" class="gallery-img" loading="lazy" decoding="async">`
        }
      </div>
      <div class="polaroid-caption">
        <h3>${item.caption || "Sonu's Celebration Memory ✨"}</h3>
        <p>${item.subtitle || "Uploaded Memory 💾"}</p>
      </div>
    `;

    if (prepend) {
      galleryGrid.prepend(newCard);
    } else {
      galleryGrid.appendChild(newCard);
    }

    if (!isVideo) {
      attachLightboxEvents(newCard.querySelector('.gallery-img'));
    }
  }

  // Load saved user uploaded photos & videos on page load
  savedMedia.forEach(item => renderMediaItem(item, true));

  imageFileInput.addEventListener('change', async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(async (file) => {
      const isVideo = file.type.startsWith('video/');
      const caption = file.name.split('.')[0] || "Sonu's Celebration Memory ✨";

      // Show temporary loading card
      const tempCard = document.createElement('div');
      tempCard.className = 'polaroid-card';
      tempCard.innerHTML = `
        <div class="pin">📌</div>
        <div class="polaroid-img-wrapper" style="display:flex; align-items:center; justify-content:center; background:#140a24; color:#FFD700;">
          <p style="padding:20px; font-weight:800;"><i class="fa-solid fa-spinner fa-spin"></i> Uploading to Cloud...</p>
        </div>
        <div class="polaroid-caption">
          <h3>Uploading to Cloud... ☁️</h3>
          <p>Please wait 2 seconds...</p>
        </div>
      `;
      galleryGrid.prepend(tempCard);

      if (!isVideo) {
        // Upload photo to ImgBB Public Cloud Storage
        try {
          const formData = new FormData();
          formData.append('image', file);

          const res = await fetch('https://api.imgbb.com/1/upload?key=6d702677d1614f48b77077045f3ddd32', {
            method: 'POST',
            body: formData
          });
          const resData = await res.json();

          tempCard.remove();

          if (resData && resData.data && resData.data.url) {
            const publicUrl = resData.data.url;
            const item = {
              type: 'image',
              src: publicUrl,
              caption: caption,
              subtitle: 'Cloud Uploaded Photo ☁️📸'
            };

            savedMedia.push(item);
            localStorage.setItem('sonu_user_media', JSON.stringify(savedMedia));

            renderMediaItem(item, true);
            pushToCloudSync('media', item);
            playToneEffect('confetti');
            launchConfetti(window.innerWidth / 2, window.innerHeight * 0.4);
            alert('☁️ Photo uploaded to Cloud! It is now visible to all friends on all devices live! 🌐🎉');
          } else {
            throw new Error('Upload failed');
          }
        } catch (err) {
          // Fallback to local DataURL if offline
          tempCard.remove();
          const reader = new FileReader();
          reader.onload = function(event) {
            const item = {
              type: 'image',
              src: event.target.result,
              caption: caption,
              subtitle: 'Uploaded Photo 📸'
            };
            savedMedia.push(item);
            localStorage.setItem('sonu_user_media', JSON.stringify(savedMedia));
            renderMediaItem(item, true);
            pushToCloudSync('media', item);
          };
          reader.readAsDataURL(file);
        }
      } else {
        // Video local fallback
        tempCard.remove();
        const reader = new FileReader();
        reader.onload = function(event) {
          const item = {
            type: 'video',
            src: event.target.result,
            caption: caption,
            subtitle: 'Uploaded Video Clip 🎥'
          };
          savedMedia.push(item);
          localStorage.setItem('sonu_user_media', JSON.stringify(savedMedia));
          renderMediaItem(item, true);
          pushToCloudSync('media', item);
        };
        reader.readAsDataURL(file);
      }
    });
  });

  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const rotateImgBtn = document.getElementById('rotateImgBtn');

  function closeLightbox() {
    lightboxModal.classList.remove('active');
  }

  function attachLightboxEvents(imgEl) {
    imgEl.addEventListener('click', () => {
      lightboxImg.src = imgEl.src;
      pageState.lightboxRotation = 0;
      lightboxImg.style.transform = `rotate(${pageState.lightboxRotation}deg)`;
      lightboxCaption.textContent = imgEl.alt || 'Sonu Kumar Celebration Memory';
      lightboxModal.classList.add('active');
    });
  }

  rotateImgBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    pageState.lightboxRotation = (pageState.lightboxRotation + 90) % 360;
    lightboxImg.style.transform = `rotate(${pageState.lightboxRotation}deg)`;
  });

  document.querySelectorAll('.gallery-img').forEach(attachLightboxEvents);

  lightboxClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });

  // --- 13. BALLOON POPPER MINI-GAME ---
  const balloonField = document.getElementById('balloonField');
  const popCountSpan = document.getElementById('popCount');
  const blessingPopup = document.getElementById('blessingPopup');
  const blessingText = document.getElementById('blessingText');
  const closePopupBtn = document.getElementById('closePopupBtn');
  const spawnBalloonsBtn = document.getElementById('spawnBalloonsBtn');

  const blessings = [
    "🇮🇳 Happy 15 August Birthday Sonu! Top placement & highest LPA package in Software Engineering!",
    "💻 May Sonu's code always compile with 0 Errors & 0 Warnings!",
    "🔥 Unbreakable bond of brotherhood with all his best friends!",
    "🎉 Infinite health, boundless wealth & endless happiness for Sonu!",
    "🚀 Future Tech Genius & BCA Class of 2026 Champion!",
    "👑 Sonu Bhai ki jai ho! Always stay happy & victorious!"
  ];

  const colors = ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0', '#FFD700', '#00f5d4'];

  function createBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';

    const color = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.backgroundColor = color;
    balloon.style.left = Math.random() * 80 + 5 + '%';
    balloon.style.animationDuration = (Math.random() * 4 + 4) + 's';
    balloon.innerHTML = '🎈';

    balloon.addEventListener('click', () => {
      playToneEffect('pop');
      pageState.poppedCount++;
      popCountSpan.textContent = pageState.poppedCount;

      balloon.remove();

      const randomWish = blessings[Math.floor(Math.random() * blessings.length)];
      blessingText.textContent = randomWish;
      blessingPopup.classList.add('active');
    });

    balloonField.appendChild(balloon);
  }

  function spawnInitialBalloons() {
    balloonField.innerHTML = '';
    for (let i = 0; i < 6; i++) {
      setTimeout(createBalloon, i * 600);
    }
  }

  spawnBalloonsBtn.addEventListener('click', spawnInitialBalloons);
  spawnInitialBalloons();

  closePopupBtn.addEventListener('click', () => {
    blessingPopup.classList.remove('active');
  });

  // --- 14. WISHES WALL POSTING FORM WITH LOCALSTORAGE PERSISTENCE ---
  const wishForm = document.getElementById('wishForm');
  const wishesWall = document.getElementById('wishesWall');

  let savedWishes = JSON.parse(localStorage.getItem('sonu_user_wishes') || '[]');

  function renderWishItem(wish, prepend = true) {
    const wishCard = document.createElement('div');
    wishCard.className = 'wish-item-card';
    wishCard.innerHTML = `
      <div class="wish-card-header">
        <span class="wish-author"><i class="fa-solid fa-user"></i> ${wish.sender}</span>
        <span class="wish-tag">${wish.vibe}</span>
      </div>
      <p class="wish-body">"${wish.msg}"</p>
      <div class="wish-card-footer">❤️ Posted on Wishes Wall 💾</div>
    `;

    if (prepend) {
      wishesWall.prepend(wishCard);
    } else {
      wishesWall.appendChild(wishCard);
    }
  }

  // Load saved user wishes/comments on page load
  savedWishes.forEach(wish => renderWishItem(wish, true));

  wishForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const sender = document.getElementById('senderName').value;
    const vibe = document.getElementById('wishCategory').value;
    const msg = document.getElementById('wishMessage').value;

    const newWish = { sender, vibe, msg, date: new Date().toLocaleDateString() };

    // Save to localStorage
    savedWishes.push(newWish);
    localStorage.setItem('sonu_user_wishes', JSON.stringify(savedWishes));

    renderWishItem(newWish, true);
    pushToCloudSync('wish', newWish);
    wishForm.reset();
    playToneEffect('confetti');
    launchConfetti(window.innerWidth * 0.7, window.innerHeight * 0.8);
    alert('💬 Your birthday wish comment has been permanently saved & synced across all devices! 🌐🎉');
  });

  // --- 15. CUSTOMIZATION MODAL ---
  const customizeBtn = document.getElementById('customizeBtn');
  const customModal = document.getElementById('customModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const saveCustomBtn = document.getElementById('saveCustomBtn');

  customizeBtn.addEventListener('click', () => customModal.classList.add('active'));
  closeModalBtn.addEventListener('click', () => customModal.classList.remove('active'));

  saveCustomBtn.addEventListener('click', () => {
    pageState.friendName = document.getElementById('editName').value;
    pageState.degree = document.getElementById('editDegree').value;
    pageState.wishSubtitle = document.getElementById('editWish').value;

    localStorage.setItem('sonu_friendName', pageState.friendName);
    localStorage.setItem('sonu_degree', pageState.degree);
    localStorage.setItem('sonu_wishSubtitle', pageState.wishSubtitle);

    updateDOMFromState();
    customModal.classList.remove('active');
    alert('Page updated successfully!');
  });

  // --- 16. 15 AUGUST MIDNIGHT COUNTDOWN TIMER ---
  function start15AugustTimer() {
    const targetDate = new Date('2026-08-15T00:00:00+05:30').getTime();

    setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        document.getElementById('daysNum').textContent = '00';
        document.getElementById('hoursNum').textContent = '00';
        document.getElementById('minsNum').textContent = '00';
        document.getElementById('secsNum').textContent = '00';
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById('daysNum').textContent = String(d).padStart(2, '0');
      document.getElementById('hoursNum').textContent = String(h).padStart(2, '0');
      document.getElementById('minsNum').textContent = String(m).padStart(2, '0');
      document.getElementById('secsNum').textContent = String(s).padStart(2, '0');
    }, 1000);
  }
  start15AugustTimer();

  // --- 17. 🤖 AI CYBER VOICE SPEECH ANNOUNCER ---
  const cyberVoiceBtn = document.getElementById('cyberVoiceBtn');
  if (cyberVoiceBtn) {
    cyberVoiceBtn.addEventListener('click', () => {
      playToneEffect('cheer');
      launchConfetti(window.innerWidth / 2, window.innerHeight * 0.4);

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const textToSpeak = `Initiating Sonu Kumar Birthday Protocol 2.0! Happy Birthday Sonu Kumar! BCA Tech Leader, Born Leader, and 15 August Legend! Wishing you maximum career success and high LPA package!`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 1.0;
        utterance.pitch = 1.1;
        utterance.volume = 1.0;
        
        // Find English voice
        const voices = window.speechSynthesis.getVoices();
        const engVoice = voices.find(v => v.lang.includes('en'));
        if (engVoice) utterance.voice = engVoice;

        window.speechSynthesis.speak(utterance);
      } else {
        alert("🤖 AI Cyber Speech: Happy Birthday Sonu Kumar! 15 August Special BCA Tech Leader!");
      }
    });
  }

  // --- 18. 💌 SECRET VIP BIRTHDAY LETTER HANDLER ---
  const openSecretLetterBtn = document.getElementById('openSecretLetterBtn');
  const secretLetterModal = document.getElementById('secretLetterModal');
  const closeLetterModalBtn = document.getElementById('closeLetterModalBtn');

  if (openSecretLetterBtn && secretLetterModal) {
    openSecretLetterBtn.addEventListener('click', () => {
      secretLetterModal.classList.add('active');
      playToneEffect('confetti');
      launchConfetti(window.innerWidth / 2, window.innerHeight * 0.4);
    });

    if (closeLetterModalBtn) {
      closeLetterModalBtn.addEventListener('click', () => {
        secretLetterModal.classList.remove('active');
      });
    }
  }

  // --- 19. 🇮🇳 JAI HO PATRIOTIC SONG HANDLER ---
  function playJaiHoMelody() {
    initAudio();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;
    // Jai Ho Chorus Note Frequencies: G4, A4, C5, D5, E5, G5
    const jaiHoNotes = [
      { f: 392.00, d: 0.2, t: 0.0 },  // G4
      { f: 440.00, d: 0.2, t: 0.25 }, // A4
      { f: 523.25, d: 0.3, t: 0.5 },  // C5
      { f: 587.33, d: 0.3, t: 0.85 }, // D5
      { f: 659.25, d: 0.4, t: 1.2 },  // E5
      { f: 783.99, d: 0.5, t: 1.65 }, // G5 (JAI HO!)
      { f: 659.25, d: 0.3, t: 2.2 },
      { f: 783.99, d: 0.6, t: 2.55 }  // JAI HO!
    ];

    jaiHoNotes.forEach(note => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(note.f, now + note.t);
      gain.gain.setValueAtTime(0.25, now + note.t);
      gain.gain.exponentialRampToValueAtTime(0.01, now + note.t + note.d);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + note.t);
      osc.stop(now + note.t + note.d);
    });
  }

  const jaiHoSongBtn = document.getElementById('jaiHoSongBtn');
  const jaiHoVideoModal = document.getElementById('jaiHoVideoModal');
  const closeJaiHoModalBtn = document.getElementById('closeJaiHoModalBtn');
  const jaiHoIframe = document.getElementById('jaiHoIframe');

  if (jaiHoSongBtn && jaiHoVideoModal) {
    jaiHoSongBtn.addEventListener('click', () => {
      jaiHoVideoModal.classList.add('active');
      if (jaiHoIframe) {
        jaiHoIframe.src = "https://www.youtube.com/embed/xwwAVRyNmgQ?autoplay=1&enablejsapi=1";
      }
      playToneEffect('cheer');
      launchConfetti(window.innerWidth / 2, window.innerHeight * 0.3);
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const x = Math.random() * window.innerWidth;
          const y = Math.random() * (window.innerHeight * 0.5);
          launchConfetti(x, y);
        }, i * 300);
      }
    });

    if (closeJaiHoModalBtn) {
      closeJaiHoModalBtn.addEventListener('click', () => {
        jaiHoVideoModal.classList.remove('active');
        if (jaiHoIframe) {
          jaiHoIframe.src = "https://www.youtube.com/embed/xwwAVRyNmgQ?enablejsapi=1";
        }
      });
    }
  }
  // --- 20. 🌐 EXPORT & IMPORT SHARED CELEBRATION MEMORIES FILE HANDLER ---
  const exportMemoriesBtn = document.getElementById('exportMemoriesBtn');
  const importFileInput = document.getElementById('importFileInput');

  // BroadcastChannel for instant cross-tab & multi-window sync
  const syncChannel = 'BroadcastChannel' in window ? new BroadcastChannel('sonu_birthday_bash_sync') : null;

  if (syncChannel) {
    syncChannel.onmessage = (event) => {
      if (event.data && event.data.type === 'NEW_MEDIA') {
        renderMediaItem(event.data.item, true);
      } else if (event.data && event.data.type === 'NEW_WISH') {
        renderWishItem(event.data.item, true);
      }
    };
  }

  if (exportMemoriesBtn) {
    exportMemoriesBtn.addEventListener('click', () => {
      const backupData = {
        friendName: pageState.friendName,
        degree: pageState.degree,
        userMedia: JSON.parse(localStorage.getItem('sonu_user_media') || '[]'),
        userWishes: JSON.parse(localStorage.getItem('sonu_user_wishes') || '[]'),
        exportDate: new Date().toISOString()
      };

      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `Sonu_Kumar_15August_Birthday_Memories.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      alert('📥 Shared Celebration Backup exported! Send this JSON file on WhatsApp so any friend on Vercel can click "Import Memories 📤" and see all photos, videos & comments! 🌐🎉');
    });
  }

  if (importFileInput) {
    importFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(event) {
        try {
          const importedData = JSON.parse(event.target.result);
          let mediaUpdated = false;
          let wishesUpdated = false;

          if (importedData.userMedia && Array.isArray(importedData.userMedia)) {
            let existingMedia = JSON.parse(localStorage.getItem('sonu_user_media') || '[]');
            importedData.userMedia.forEach(item => {
              if (!existingMedia.some(m => m.src === item.src)) {
                existingMedia.push(item);
                mediaUpdated = true;
              }
            });
            localStorage.setItem('sonu_user_media', JSON.stringify(existingMedia));
          }

          if (importedData.userWishes && Array.isArray(importedData.userWishes)) {
            let existingWishes = JSON.parse(localStorage.getItem('sonu_user_wishes') || '[]');
            importedData.userWishes.forEach(wish => {
              if (!existingWishes.some(w => w.msg === wish.msg && w.sender === wish.sender)) {
                existingWishes.push(wish);
                wishesUpdated = true;
              }
            });
            localStorage.setItem('sonu_user_wishes', JSON.stringify(existingWishes));
          }

          alert('📤 Shared Memories imported successfully! Refreshing page to display all friends\' media & comments! 🌐✨');
          window.location.reload();
        } catch (err) {
          alert('⚠️ Invalid backup file format!');
        }
      };
      reader.readAsText(file);
    });
  }
  async function pushToCloudSync(type, data) {
    try {
      if (syncChannel) {
        syncChannel.postMessage({ type: type === 'media' ? 'NEW_MEDIA' : 'NEW_WISH', item: data });
      }
      
      const currentMedia = JSON.parse(localStorage.getItem('sonu_user_media') || '[]');
      const currentWishes = JSON.parse(localStorage.getItem('sonu_user_wishes') || '[]');
      
      const payload = {
        media: currentMedia.slice(-15),
        wishes: currentWishes.slice(-30),
        lastUpdated: new Date().toISOString()
      };

      fetch('https://api.myjson.online/v1/records/sonu_birthday_bash_2026', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null);

    } catch (e) {
      console.warn("Cloud sync push fallback active");
    }
  }

  async function pullFromCloudSync() {
    try {
      const res = await fetch('https://api.myjson.online/v1/records/sonu_birthday_bash_2026', { cache: 'no-store' }).catch(() => null);
      if (res && res.ok) {
        const cloudData = await res.json();
        if (cloudData && cloudData.data) {
          const remoteMedia = cloudData.data.media || [];
          const remoteWishes = cloudData.data.wishes || [];

          let localMedia = JSON.parse(localStorage.getItem('sonu_user_media') || '[]');
          let mediaAdded = false;
          remoteMedia.forEach(item => {
            if (!localMedia.some(m => m.src === item.src)) {
              localMedia.push(item);
              renderMediaItem(item, true);
              mediaAdded = true;
            }
          });
          if (mediaAdded) localStorage.setItem('sonu_user_media', JSON.stringify(localMedia));

          let localWishes = JSON.parse(localStorage.getItem('sonu_user_wishes') || '[]');
          let wishesAdded = false;
          remoteWishes.forEach(wish => {
            if (!localWishes.some(w => w.msg === wish.msg && w.sender === wish.sender)) {
              localWishes.push(wish);
              renderWishItem(wish, true);
              wishesAdded = true;
            }
          });
          if (wishesAdded) localStorage.setItem('sonu_user_wishes', JSON.stringify(localWishes));
        }
      }
    } catch (e) {
      // Quiet fail if offline
    }
  }

  // Poll cloud database every 6 seconds for live multi-device updates on Vercel
  setInterval(pullFromCloudSync, 6000);
  pullFromCloudSync();

});

