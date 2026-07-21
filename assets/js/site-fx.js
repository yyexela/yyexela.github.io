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

  /* ---------------- konami code easter egg ---------------- */
  var KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  var progress = 0;
  document.addEventListener('keydown', function (e) {
    var key = e.key && e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === KONAMI[progress]) {
      progress++;
      if (progress === KONAMI.length) {
        progress = 0;
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
