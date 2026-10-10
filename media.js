(() => {
  'use strict';
  const records = window.MEDIA || {};
  const pending = new Map();
  const connection = navigator.connection;
  const economical = Boolean(connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || '') || (connection?.downlink && connection.downlink < 1));
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const choices = (path, full = false) => {
    const media = records[path];
    if (!media) return { src: path, srcset: '', width: 900, height: 600 };
    const variants = [media.small, media.large, ...(full && media.full ? [media.full] : [])].filter(Boolean);
    const unique = variants.filter((item, index) => variants.findIndex(other => other.width === item.width) === index);
    return { src: unique[unique.length - 1].src, srcset: unique.map(item => item.src + ' ' + item.width + 'w').join(', '), width: media.width, height: media.height };
  };
  const image = (path, alt, options = {}) => {
    const media = records[path];
    const dimensions = choices(path);
    const sizes = options.sizes || '100vw';
    return '<img class="progressive-image ' + esc(options.className || '') + '" src="' + esc(media?.preview || path) + '" data-media="' + esc(path) + '" data-media-sizes="' + esc(sizes) + '" data-media-full="' + Boolean(options.full) + '" data-media-eager="' + Boolean(options.eager) + '" alt="' + esc(alt) + '" width="' + dimensions.width + '" height="' + dimensions.height + '" decoding="async"' + (options.priority ? ' fetchpriority="high"' : '') + '>';
  };
  const load = (path, options = {}) => {
    const choice = choices(path, options.full);
    const sizes = options.sizes || '100vw';
    const key = choice.srcset + '|' + choice.src + '|' + sizes + '|' + innerWidth + '|' + devicePixelRatio;
    if (pending.has(key)) return pending.get(key);
    const promise = new Promise((resolve, reject) => {
      const img = new Image();
      img.decoding = 'async';
      img.fetchPriority = options.priority ? 'high' : 'low';
      img.onload = async () => {
        try { await img.decode(); } catch { /* A loaded image can still be used if decoding is unavailable. */ }
        resolve(img.currentSrc || img.src);
      };
      img.onerror = () => reject(new Error('Image unavailable: ' + path));
      img.sizes = sizes;
      if (choice.srcset) img.srcset = choice.srcset;
      img.src = choice.src;
    });
    pending.set(key, promise);
    promise.catch(() => pending.delete(key));
    if (pending.size > 64) pending.delete(pending.keys().next().value);
    return promise;
  };
  const upgrade = img => {
    if (!img.isConnected || img.dataset.mediaLoading || img.dataset.mediaComplete) return;
    img.dataset.mediaLoading = 'true';
    load(img.dataset.media, { full: img.dataset.mediaFull === 'true', sizes: img.dataset.mediaSizes, priority: img.getAttribute('fetchpriority') === 'high' })
      .then(src => {
        if (!img.isConnected) return;
        img.src = src;
        img.dataset.mediaComplete = 'true';
        img.classList.add('media-ready');
      })
      .catch(() => { delete img.dataset.mediaLoading; img.classList.add('media-fallback'); });
  };
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { observer.unobserve(entry.target); upgrade(entry.target); }
      else if (!entry.target.isConnected) observer.unobserve(entry.target);
    });
  }, { rootMargin: economical ? '160px' : '500px' }) : null;
  const activate = (scope = document) => {
    scope.querySelectorAll('img[data-media]').forEach(img => {
      if (img.dataset.mediaObserved) return;
      img.dataset.mediaObserved = 'true';
      if (img.dataset.mediaEager === 'true' || !observer) upgrade(img);
      else observer.observe(img);
    });
  };
  const warm = (path, options = {}) => {
    if (!economical) load(path, options).catch(() => {});
  };
  window.SiteMedia = { image, activate, load, warm, choices, records, economical };

  // Register after critical images finish. Only visited pages and requested assets are cached.
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    addEventListener('load', () => {
      const register = () => navigator.serviceWorker.register('sw.js', { scope: './' }).then(async registration => {
        const ready = await navigator.serviceWorker.ready;
        const worker = ready.active || registration.active;
        const urls = performance.getEntriesByType('resource').map(entry => entry.name).filter(name => {
          const url = new URL(name);
          return url.origin === location.origin && !url.pathname.includes('/documents/') && !url.pathname.includes('/demos/') && /\.(css|js|woff2|webp|png|svg)$/.test(url.pathname);
        });
        worker?.postMessage({ type: 'CACHE_VISITED_ASSETS', page: location.href, urls: [...new Set(urls)].slice(0, 40) });
      }).catch(() => { /* Static file previews work without a service worker. */ });
      if ('requestIdleCallback' in window) requestIdleCallback(register, { timeout: 4000 });
      else setTimeout(register, 1500);
    }, { once: true });
  }
})();
