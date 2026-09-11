/* ══════════════════════════════════════════════════
   АРУЖАН QYZ UZATU v3 — JavaScript
   Countdown + Calendar + WhatsApp RSVP + Scroll FX
══════════════════════════════════════════════════ */

/* ── CONFIG — WhatsApp нөмірін осында өзгертіңіз ── */
const WA_NUMBER = '77007251149';   // Format: 77001234567 мен басталатын цифрлар
var WA_YES = 'Сәлеметсіз бе! Аружанның қыз ұзату тойына келемін\nМені тізімге қосыңыз!';
var WA_NO  = 'Сәлеметсіз бе! Аружанның қыз ұзату тойына келе алмаймын';

/* ── WHATSAPP ── */
function sendWA(type) {
  var msg = type === 'yes' ? WA_YES : WA_NO;
  var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);

  var btn = document.getElementById('btn-' + type);
  if (btn) {
    var orig = btn.innerHTML;
    btn.textContent = type === 'yes' ? '✅ Жіберілді!' : '❌ Жіберілді!';
    btn.style.opacity = '0.7';
    setTimeout(function() {
      btn.innerHTML = orig;
      btn.style.opacity = '1';
    }, 2500);
  }

  window.open(url, '_blank');
}

/* ── COUNTDOWN — 24 қазан 2026 сағат 12:00 (UTC+5) ── */
(function() {
  var target = new Date('2026-10-24T12:00:00+05:00').getTime();

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    var now  = Date.now();
    var diff = target - now;
    if (diff < 0) diff = 0;

    var d = Math.floor(diff / 86400000);
    var h = Math.floor((diff % 86400000) / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);

    var elD = document.getElementById('days');
    var elH = document.getElementById('hours');
    var elM = document.getElementById('minutes');
    var elS = document.getElementById('seconds');

    if (elD) elD.textContent = pad(d);
    if (elH) elH.textContent = pad(h);
    if (elM) elM.textContent = pad(m);
    if (elS) elS.textContent = pad(s);
  }

  tick();
  setInterval(tick, 1000);
})();

/* ── CALENDAR — Қазан / October 2026 ── */
(function() {
  var grid = document.getElementById('cal-grid');
  if (!grid) return;

  // Oct 2026: 31 days, starts on Thursday
  // Mon=0, Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6
  var START_DAY   = 3;   // Thursday
  var TOTAL_DAYS  = 31;
  var HIGHLIGHT   = 24;  // wedding day

  // Empty cells before day 1
  for (var e = 0; e < START_DAY; e++) {
    var empty = document.createElement('div');
    empty.className = 'cal-cell empty';
    grid.appendChild(empty);
  }

  for (var d = 1; d <= TOTAL_DAYS; d++) {
    var cell = document.createElement('div');
    cell.className = 'cal-cell';
    cell.textContent = d;

    var dow = (START_DAY + d - 1) % 7; // Sat=5, Sun=6
    if (dow === 5 || dow === 6) cell.classList.add('weekend');
    if (d === HIGHLIGHT) cell.classList.add('today');

    grid.appendChild(cell);
  }
})();

/* ── SCROLL REVEAL (subtle fade) ── */
(function() {
  var allSections = document.querySelectorAll(
    '.invite-sec, .schedule-sec, .countdown-sec, .location-sec, .hosts-sec, .calendar-sec, .rsvp-sec'
  );

  // Add initial opacity style
  allSections.forEach(function(el) {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(28px)';
    el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
  });

  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  allSections.forEach(function(el) { io.observe(el); });
})();

// ── Music Player ──
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
let isFirstPlay = true;

musicToggle.addEventListener('click', () => {
  if (bgMusic.paused) {
    if (isFirstPlay) {
      bgMusic.currentTime = 8;
      isFirstPlay = false;
    }
    bgMusic.play().then(() => {
      musicToggle.classList.add('playing');
    }).catch(e => console.log('Audio play failed:', e));
  } else {
    bgMusic.pause();
    musicToggle.classList.remove('playing');
  }
});

