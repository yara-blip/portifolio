(function () {
  var root = document.documentElement, tbtn = document.getElementById('theme'), tlabel = document.getElementById('theme-label');
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    tbtn.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
    tlabel.textContent = t === 'dark' ? 'Modo claro' : 'Modo escuro';
  }
  var fadeTimer;
  var saved = null;
  try { saved = localStorage.getItem('yara-theme'); } catch (e) {}
  applyTheme(saved === 'dark' ? 'dark' : 'light');
  tbtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.classList.add('theme-fade');
    applyTheme(next);
    clearTimeout(fadeTimer);
    fadeTimer = setTimeout(function () { root.classList.remove('theme-fade'); }, 800);
    try { localStorage.setItem('yara-theme', next); } catch (e) {}
  });

  var total = document.getElementById('total');
  function fmt(n) { return 'R$ ' + (Math.round(n * 100) / 100).toLocaleString('pt-BR', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }); }
  function calc() {
    var base = Number(document.querySelector('input[name="tipo"]:checked').value);
    var c = document.querySelector('input[name="comp"]:checked').value.split(',').map(Number);
    var lo = base * (1 + c[0] / 100), hi = base * (1 + c[1] / 100);
    total.textContent = lo === hi ? fmt(lo) : fmt(lo) + ' a ' + fmt(hi);
  }
  document.querySelectorAll('input[name="tipo"], input[name="comp"]').forEach(function (i) { i.addEventListener('change', calc); });
  calc();

  var btn = document.getElementById('copy'), at = document.getElementById('at');
  function selectText() { var r = document.createRange(); r.selectNodeContents(at); var s = getSelection(); s.removeAllRanges(); s.addRange(r); }
  btn.addEventListener('click', function () {
    var done = function () { btn.textContent = 'Copiado!'; setTimeout(function () { btn.textContent = 'Copiar @'; }, 1800); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(at.textContent).then(done, function () { selectText(); btn.textContent = 'Selecionado'; });
    } else { selectText(); btn.textContent = 'Selecionado'; }
  });
})();
