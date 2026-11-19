(function () {
  'use strict';
  var dlg = document.getElementById('panel');
  var sheet = dlg.querySelector('.sheet');
  var panels = dlg.querySelectorAll('.pn');
  var valid = {};
  panels.forEach(function (p) { valid[p.id.replace('p-', '')] = true; });

  function showPanel(id) {
    panels.forEach(function (p) { p.hidden = p.id !== 'p-' + id; });
    var t = dlg.querySelector('#p-' + id + ' h2');
    dlg.setAttribute('aria-label', t ? t.textContent : 'Détails');
    sheet.scrollTop = 0;
    sheet.classList.toggle('sheet--rdv', id === 'rdv');
    if (id === 'rdv') loadCalendly();
  }

  function open(id, push) {
    if (!valid[id]) return;
    showPanel(id);
    if (!dlg.open) {
      dlg.showModal();
      document.body.classList.add('lock');
    }
    if (push !== false && location.hash !== '#' + id) {
      history.pushState({ panel: id }, '', '#' + id);
    }
  }

  function close(fromPop) {
    if (dlg.open) dlg.close();
    document.body.classList.remove('lock');
    if (!fromPop && valid[location.hash.slice(1)]) {
      history.pushState(null, '', location.pathname + location.search);
    }
  }

  document.addEventListener('click', function (e) {
    var o = e.target.closest('[data-open]');
    if (o) { e.preventDefault(); open(o.getAttribute('data-open')); return; }
    if (e.target.closest('[data-close]')) { close(false); return; }
    var tab = e.target.closest('[data-tab]');
    if (tab) {
      var which = tab.getAttribute('data-tab');
      document.getElementById('tab-dom').hidden = which !== 'dom';
      document.getElementById('tab-etab').hidden = which !== 'etab';
      dlg.querySelectorAll('[data-tab]').forEach(function (b) {
        b.setAttribute('aria-pressed', b === tab ? 'true' : 'false');
      });
    }
    // clic sur le fond (hors de la fiche) = fermeture
    if (e.target === dlg) close(false);
  });

  dlg.addEventListener('cancel', function (e) { e.preventDefault(); close(false); });
  dlg.addEventListener('close', function () { document.body.classList.remove('lock'); });

  window.addEventListener('popstate', function () {
    var id = location.hash.slice(1);
    if (valid[id]) { showPanel(id); if (!dlg.open) { dlg.showModal(); document.body.classList.add('lock'); } }
    else close(true);
  });

  // Calendly : chargé uniquement à l'ouverture du panneau « rendez-vous » (RGPD)
  var calLoaded = false;
  function loadCalendly() {
    if (calLoaded) return;
    calLoaded = true;
    var el = document.getElementById('cal');
    var s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    s.onload = function () {
      if (window.Calendly) window.Calendly.initInlineWidget({ url: el.getAttribute('data-url'), parentElement: el });
    };
    s.onerror = function () { calLoaded = false; };
    document.head.appendChild(s);
  }

  // ouverture directe via #adresse (ex. sbionmeunier.com/#tarifs)
  var first = location.hash.slice(1);
  if (valid[first]) open(first, false);
})();
