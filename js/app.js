/* FLORSIMINTEX · app.js — interacțiuni minime, fără dependențe. */
(function () {
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* anul curent în footer */
  var y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();

  /* meniu mobil */
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
    });
  }

  /* reveal la scroll, cu mic decalaj pe grupuri */
  var revs = [].slice.call(document.querySelectorAll('.reveal'));
  if (reduce || !('IntersectionObserver' in window)) {
    revs.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var sibs = [].slice.call((el.parentElement || document).children).filter(function (c) { return c.classList && c.classList.contains('reveal'); });
        var idx = Math.max(0, sibs.indexOf(el));
        el.style.transitionDelay = Math.min(idx * 80, 320) + 'ms';
        el.classList.add('in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revs.forEach(function (el) { io.observe(el); });
  }

  /* count-up pentru statistici numerice */
  var counted = false;
  function runCount() {
    if (counted) return; counted = true;
    document.querySelectorAll('.stat b[data-count]').forEach(function (el) {
      var raw = el.getAttribute('data-count');
      var m = /^(\d+)(.*)$/.exec(raw);
      if (!m || raw.indexOf('/') > -1 || reduce) { el.textContent = raw; return; }
      var target = parseInt(m[1], 10), suffix = m[2] || '', t0 = null, dur = 1200;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        var e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * e) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  var statsEl = document.querySelector('.stats');
  if (statsEl && 'IntersectionObserver' in window && !reduce) {
    var io2 = new IntersectionObserver(function (e) {
      if (e[0].isIntersecting) { runCount(); io2.disconnect(); }
    }, { threshold: 0.4 });
    io2.observe(statsEl);
  } else { runCount(); }

  /* header: umbră la scroll */
  var head = document.querySelector('.site-head');
  if (head) {
    var onScroll = function () { head.classList.toggle('scrolled', window.scrollY > 8); };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  /* parallax subtil pe hero + banda hazard ca progres de citire */
  var heroImg = document.querySelector('.hero-media img');
  var chevFill = document.querySelector('.chevron-bar__fill');
  if (!reduce && (heroImg || chevFill)) {
    var fxTick = false;
    var runFx = function () {
      var y = window.scrollY || 0;
      var doc = document.documentElement;
      var max = (doc.scrollHeight - doc.clientHeight) || 1;
      var p = Math.min(Math.max(y / max, 0), 1);
      if (chevFill) {
        chevFill.style.right = (100 - p * 100).toFixed(2) + '%';
        chevFill.style.backgroundPositionX = (-y * 0.35) + 'px';
      }
      if (heroImg && y < innerHeight) {
        heroImg.style.transform = 'translate3d(0,' + (y * 0.08).toFixed(1) + 'px,0) scale(1.12)';
      }
      fxTick = false;
    };
    if (heroImg) { heroImg.style.transformOrigin = 'center'; heroImg.style.transform = 'scale(1.12)'; }
    addEventListener('scroll', function () { if (!fxTick) { fxTick = true; requestAnimationFrame(runFx); } }, { passive: true });
    runFx();
  }

  /* carusel recenzii pe mobil: dots + sincronizare cu swipe */
  var track = document.getElementById('reviews-track');
  var dotsWrap = document.querySelector('.review-dots');
  if (track && dotsWrap) {
    var rcards = [].slice.call(track.querySelectorAll('.review'));
    if (rcards.length > 1) {
      rcards.forEach(function (c, i) {
        var b = document.createElement('button');
        b.className = 'dot'; b.type = 'button';
        b.setAttribute('aria-label', 'Recenzia ' + (i + 1));
        if (i === 0) b.setAttribute('aria-current', 'true');
        b.addEventListener('click', function () {
          c.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
        });
        dotsWrap.appendChild(b);
      });
      var dots = [].slice.call(dotsWrap.children);
      if ('IntersectionObserver' in window) {
        var rio = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (!en.isIntersecting) return;
            var idx = rcards.indexOf(en.target);
            dots.forEach(function (d, di) {
              if (di === idx) d.setAttribute('aria-current', 'true');
              else d.removeAttribute('aria-current');
            });
          });
        }, { root: track, threshold: 0.6 });
        rcards.forEach(function (c) { rio.observe(c); });
      }
    }
  }

  /* carduri: tilt 3D mic + spotlight care urmărește cursorul (doar desktop, mouse) */
  var fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  if (fine && !reduce) {
    [].slice.call(document.querySelectorAll('.services .card')).forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (y * 100).toFixed(1) + '%');
        var rx = (0.5 - y) * 5, ry = (x - 0.5) * 5;
        card.style.transform = 'perspective(820px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(-6px)';
      });
      card.addEventListener('pointerleave', function () { card.style.transform = ''; });
    });
  }

  /* hartă „facade": încarcă iframe-ul Google DOAR la click (economie ~1MB la load) */
  var facade = document.querySelector('.map-facade');
  if (facade) {
    var loadMap = function () {
      var src = facade.getAttribute('data-map');
      if (!src) return;
      var f = document.createElement('iframe');
      f.title = 'Hartă FLORSIMINTEX';
      f.src = src;
      f.loading = 'lazy';
      f.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      facade.innerHTML = '';
      facade.classList.remove('map-facade');
      facade.removeAttribute('role'); facade.removeAttribute('tabindex'); facade.removeAttribute('aria-label');
      facade.appendChild(f);
    };
    facade.addEventListener('click', loadMap);
    facade.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); loadMap(); }
    });
  }

  /* „Sunt blocat aici": trimite locația GPS live pe WhatsApp */
  [].slice.call(document.querySelectorAll('a[data-geo]')).forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (!navigator.geolocation) return; /* fallback: linkul WhatsApp normal */
      e.preventDefault();
      var wa = el.getAttribute('data-wa');
      var fallback = el.getAttribute('href');
      var done = false;
      var go = function (href) { if (!done) { done = true; window.open(href, '_blank', 'noopener'); } };
      el.classList.add('loc-loading');
      navigator.geolocation.getCurrentPosition(function (pos) {
        el.classList.remove('loc-loading');
        var lat = pos.coords.latitude.toFixed(6), lng = pos.coords.longitude.toFixed(6);
        var msg = encodeURIComponent('Bună ziua! Am rămas în pană și am nevoie de tractare. Sunt blocat aici: https://maps.google.com/?q=' + lat + ',' + lng);
        go('https://wa.me/' + wa + '?text=' + msg);
      }, function () {
        el.classList.remove('loc-loading');
        go(fallback);
      }, { enableHighAccuracy: true, timeout: 9000, maximumAge: 60000 });
    });
  });

  /* pauză animație ticker când nu e vizibil (economie CPU/baterie) */
  var ticker = document.querySelector('.ticker-track');
  if (ticker && !reduce && 'IntersectionObserver' in window) {
    var tio = new IntersectionObserver(function (en) {
      ticker.style.animationPlayState = en[0].isIntersecting ? 'running' : 'paused';
    }, { threshold: 0 });
    tio.observe(document.querySelector('.ticker'));
  }

  /* service worker — offline + load instant repetat */
  if ('serviceWorker' in navigator) {
    addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }
})();
