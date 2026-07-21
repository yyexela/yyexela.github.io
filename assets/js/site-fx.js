(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- console easter egg ---------------- */
  try {
    console.log('%c( =^-ω-^=) hi!', 'font-size:16px;');
    console.log(
      '%cPoking around the code? There is a Konami code hidden on this page: ↑ ↑ ↓ ↓ ← → ← → B A',
      'font-size:12px;color:#888;'
    );
  } catch (e) {}

  /* ---------------- walking pixel pet (Mametchi) ---------------- */
  var PET_NAME = 'Mametchi';
  var grid = document.getElementById('site-pet-grid');
  var petBtn = document.getElementById('site-pet-btn');
  var walker = document.querySelector('.site-pet-walker');
  var bubble = document.getElementById('site-pet-bubble');
  var zzz = document.getElementById('site-pet-zzz');
  var petReady = false;
  var asleep = false;
  var idleTimer = null;
  var bubbleTimer = null;

  var MESSAGES = [
    'hi hi!',
    "let's go for a walk!",
    'got any beans? 🫘',
    'thanks for visiting!',
    'you’re doing great!',
    '*happy wiggle*',
    '♪ ~ ♪',
    'stay a while :)'
  ];

  function showBubble(text) {
    if (!bubble) return;
    bubble.textContent = text;
    bubble.hidden = false;
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(function () {
      bubble.hidden = true;
    }, 2600);
  }

  function setAsleep(value) {
    asleep = value;
    petBtn.classList.toggle('is-asleep', value);
    if (walker) walker.classList.toggle('is-asleep', value);
    if (zzz) zzz.classList.toggle('is-visible', value);
  }

  function wake() {
    if (!petReady) return;
    if (asleep) setAsleep(false);
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () {
      setAsleep(true);
    }, 60000);
  }

  function partyMode() {
    if (!petReady) return;
    wake();
    petBtn.classList.add('is-party');
    showBubble('🎉 party time!');
    setTimeout(function () {
      petBtn.classList.remove('is-party');
    }, 4000);
  }

  if (grid && petBtn) {
    var SPRITE_ROWS = [
      '..###....###..',
      '.#####..#####.',
      '.#####..#####.',
      '.############.',
      '.############.',
      '.#@@@@@@@@@@#.',
      '#@###@@@###@@#',
      '#@##.#@@##.#@#',
      '#@##.#@@##.#@#',
      '#@###@@@###@@#',
      '.#@@@@##@@@@#.',
      '..##########..',
      '...#@@@@@@#...',
      '..#@#@@@@#@#..',
      '..###@@@@###..',
      '....#@##@#....',
      '....##..##....'
    ];
    var COLORS = { '#': '#1f1f1f', '@': '#ffe27a' };
    var FRAME = SPRITE_ROWS.join('').split('');

    for (var i = 0; i < FRAME.length; i++) {
      var cell = document.createElement('span');
      cell.className = 'site-pet-px';
      cell.style.background = FRAME[i] === '.' ? 'transparent' : COLORS[FRAME[i]];
      grid.appendChild(cell);
    }

    if (walker) {
      walker.addEventListener('animationiteration', function (e) {
        if (e.animationName === 'site-pet-pace') {
          grid.classList.toggle('is-flipped');
        }
      });
    }

    petReady = true;
    wake();

    petBtn.addEventListener('click', function () {
      wake();
      petBtn.classList.remove('is-happy');
      void petBtn.offsetWidth;
      petBtn.classList.add('is-happy');
      var count = Number(localStorage.getItem('site-pet-pets') || 0) + 1;
      try {
        localStorage.setItem('site-pet-pets', String(count));
      } catch (e) {}
      showBubble(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
    });

    try {
      var last = localStorage.getItem('site-pet-last-visit');
      var now = Date.now();
      localStorage.setItem('site-pet-last-visit', String(now));
      if (last && now - Number(last) > 1000 * 60 * 60 * 12) {
        setTimeout(function () { showBubble(PET_NAME + ' missed you!'); }, 1200);
      } else if (!last) {
        setTimeout(function () { showBubble('hi, I’m ' + PET_NAME + '!'); }, 1200);
      }
    } catch (e) {}
  }

  /* ---------------- konami code easter egg ---------------- */
  var KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  var progress = 0;
  document.addEventListener('keydown', function (e) {
    var key = e.key && e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === KONAMI[progress]) {
      progress++;
      if (progress === KONAMI.length) {
        progress = 0;
        partyMode();
        confetti();
      }
    } else {
      progress = key === KONAMI[0] ? 1 : 0;
    }
  });

  function confetti() {
    if (reduceMotion) return;
    var colors = ['#6fd6c9', '#f3a6c6', '#b8a6f0', '#ffd166', '#52adc8'];
    var count = 60;
    for (var k = 0; k < count; k++) {
      var piece = document.createElement('span');
      piece.className = 'site-confetti-piece';
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = 2.5 + Math.random() * 1.5 + 's';
      piece.style.animationDelay = Math.random() * 0.4 + 's';
      piece.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
      document.body.appendChild(piece);
      (function (el) {
        el.addEventListener('animationend', function () {
          el.remove();
        });
      })(piece);
    }
  }
})();
