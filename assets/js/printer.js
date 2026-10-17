// BH-80: prints each receipt line by line, and tears the slip off when you move to another page.
(() => {
  const feed = document.getElementById('feed');
  const printer = document.getElementById('printer');
  const led = document.getElementById('led');
  const reprint = document.getElementById('reprint');
  const first = feed && feed.querySelector('.paper');
  if (!first || !printer || !led) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pad = n => String(n).padStart(2, '0');
  const tilts = ['-1.4deg', '1.1deg', '-0.8deg', '1.5deg', '-1.1deg'];
  const pathOf = u => u.pathname + u.search;
  const cache = new Map();
  let job = 0;
  let nav = 0;
  let current = pathOf(location);
  let pristine = first.innerHTML;

  function stamp(paper) {
    const now = new Date();
    const text = `${pad(now.getMonth() + 1)}/${pad(now.getDate())}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    paper.querySelectorAll('[data-now]').forEach(el => { el.textContent = text; });
    paper.querySelectorAll('[data-order]').forEach(el => { el.textContent = String(now.getTime()).slice(-6); });
  }

  function barcodes(paper) {
    paper.querySelectorAll('svg.barcode[data-code]').forEach(svg => {
      let seed = [...svg.dataset.code].reduce((a, c) => a * 31 + c.charCodeAt(0) >>> 0, 7);
      const rand = () => (seed = seed * 1664525 + 1013904223 >>> 0) / 2 ** 32;
      let x = 0, bars = '';
      while (x < 300) {
        const w = 1 + Math.floor(rand() * 3.2);
        if (rand() > 0.42) bars += `<rect x="${x}" y="0" width="${w}" height="56"/>`;
        x += w;
      }
      svg.innerHTML = bars;
    });
  }

  // Every post image becomes a photo stapled onto the slip, each at its own slight angle.
  function staple(paper) {
    paper.querySelectorAll('.body img').forEach((img, i) => {
      if (img.parentElement.classList.contains('photo')) return;
      const photo = document.createElement('span');
      photo.className = 'photo';
      photo.style.setProperty('--tilt', tilts[i % tilts.length]);
      img.replaceWith(photo);
      photo.append(img);
    });
  }

  function prepare(paper) {
    paper.tabIndex = -1;
    paper.querySelectorAll('.body > *').forEach(el => el.classList.add('line'));
    staple(paper);
    stamp(paper);
    barcodes(paper);
  }

  function startPrinting(paper) {
    const id = ++job;
    const lines = [...paper.querySelectorAll('.line')];
    led.classList.remove('busy');
    if (reduced) { lines.forEach(l => l.classList.add('printed', 'instant')); return; }
    const queue = [];
    let queued = 0, printing = false;
    const pump = () => {
      if (id !== job) return;
      if (!queue.length) { printing = false; led.classList.remove('busy'); return; }
      printing = true; led.classList.add('busy');
      // Lines already scrolled past print instantly so the visible area never waits on them.
      while (queue.length > 1 && queue[0].getBoundingClientRect().bottom < 0) queue.shift().classList.add('printed', 'instant');
      queue.shift().classList.add('printed');
      setTimeout(pump, queue.length > 12 ? 18 : 55);
    };
    // Print every line up to the lowest one on screen, so fast scrolling never leaves gaps.
    const io = new IntersectionObserver(entries => {
      if (id !== job) return io.disconnect();
      const hit = entries.filter(e => e.isIntersecting).map(e => lines.indexOf(e.target));
      if (!hit.length) return;
      const upto = Math.max(...hit);
      while (queued <= upto) { io.unobserve(lines[queued]); queue.push(lines[queued++]); }
      if (!printing) pump();
    }, { rootMargin: '0px 0px -6% 0px' });
    setTimeout(() => lines.forEach(l => io.observe(l)), 550);
  }

  function tearOff(old) {
    const r = old.getBoundingClientRect();
    if (reduced || r.bottom < 0) { old.remove(); return; }
    old.querySelectorAll('.line:not(.printed)').forEach(l => l.classList.add('printed', 'instant'));
    Object.assign(old.style, { top: r.top + 'px', left: r.left + 'px', width: r.width + 'px' });
    old.classList.add('falling');
    old.addEventListener('animationend', e => e.target === old && old.remove());
    setTimeout(() => old.remove(), 1200);
  }

  function jolt() {
    printer.classList.remove('jolt');
    void printer.offsetWidth;
    printer.classList.add('jolt');
  }

  function mount(html) {
    const old = feed.querySelector('.paper:not(.falling)');
    if (old) { tearOff(old); jolt(); }
    scrollTo({ top: 0, behavior: 'instant' });
    const paper = document.createElement('article');
    paper.className = 'paper';
    paper.setAttribute('data-receipt', '');
    paper.innerHTML = html;
    feed.appendChild(paper);
    prepare(paper);
    startPrinting(paper);
    paper.focus({ preventScroll: true });
  }

  function syncKeys(keys) {
    document.querySelectorAll('.keys a').forEach((a, i) => {
      const k = keys[i] || {};
      a.classList.toggle('on', !!k.on);
      if (k.current) a.setAttribute('aria-current', k.current);
      else a.removeAttribute('aria-current');
    });
  }

  // Fetch another page of this site and pull out its receipt. Cached so hovering a link warms it up.
  function load(href) {
    if (!cache.has(href)) {
      cache.set(href, fetch(href).then(async res => {
        if (!res.ok && res.status !== 404) throw new Error(`HTTP ${res.status}`);
        const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
        const paper = doc.querySelector('#feed > .paper[data-receipt]');
        if (!paper) throw new Error('Not a receipt page');
        return {
          url: res.url || href,
          title: doc.title,
          html: paper.innerHTML,
          keys: [...doc.querySelectorAll('.keys a')].map(a => ({ on: a.classList.contains('on'), current: a.getAttribute('aria-current') })),
        };
      }).catch(err => { cache.delete(href); throw err; }));
    }
    return cache.get(href);
  }

  async function go(url, push) {
    const id = ++nav;
    led.classList.add('busy');
    try {
      const page = await load(url.href.split('#')[0]);
      if (id !== nav) return;
      const dest = new URL(page.url);
      dest.hash = url.hash;
      if (push && pathOf(dest) !== current) history.pushState(null, '', dest.href);
      else history.replaceState(null, '', dest.href);
      current = pathOf(dest);
      document.title = page.title;
      syncKeys(page.keys);
      pristine = page.html;
      mount(pristine);
      if (url.hash) {
        const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
        if (target) target.scrollIntoView();
      }
    } catch {
      if (id !== nav) return;
      if (push) location.assign(url.href);
      else location.reload();
    }
  }

  function eligible(a, e) {
    if (!(a instanceof HTMLAnchorElement)) return null;
    if ((a.target && a.target !== '_self') || a.hasAttribute('download')) return null;
    if (e && (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)) return null;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return null;
    if (pathOf(url) === current && url.hash) return null;
    if (/\.(xml|json|txt|png|jpe?g|gif|svg|webp|mp4|webm|pdf|zip)$/i.test(url.pathname)) return null;
    return url;
  }

  document.addEventListener('click', e => {
    const url = eligible(e.target.closest && e.target.closest('a[href]'), e);
    if (!url) return;
    e.preventDefault();
    go(url, true);
  });

  const warm = e => {
    const url = eligible(e.target.closest && e.target.closest('a[href]'));
    if (url && pathOf(url) !== current) load(url.href.split('#')[0]).catch(() => {});
  };
  document.addEventListener('mouseover', warm);
  document.addEventListener('touchstart', warm, { passive: true });

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  addEventListener('popstate', () => {
    if (pathOf(location) === current) return;
    go(new URL(location.href), false);
  });

  if (reprint) {
    reprint.hidden = false;
    reprint.addEventListener('click', () => mount(pristine));
  }

  prepare(first);
  startPrinting(first);
})();
