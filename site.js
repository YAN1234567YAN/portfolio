(() => {
  'use strict';
  const page = document.body.dataset.page;
  const qs = (selector) => document.querySelector(selector);
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const icon = (name) => '<i data-lucide="' + esc(name) + '" aria-hidden="true"></i>';
  const icons = () => window.lucide?.createIcons({ attrs: { 'stroke-width': 1.6, 'aria-hidden': 'true' } });
  const header = qs('#site-header');
  header.innerHTML = '<div class="header-inner wrap"><a class="brand" href="index.html" aria-label="徐昊 首页"><span class="brand-mark">XH' + icon('asterisk') + '</span><span class="brand-name">徐昊<br><small>DESIGN & BUILD</small></span></a><nav class="header-nav" id="header-nav" aria-label="主导航"><a href="index.html#work"' + (page === 'home' || page === 'project' ? ' class="active"' : '') + '>精选作品</a><a href="gallery.html"' + (page === 'gallery' ? ' class="active"' : '') + '>设计作品库</a><a href="video.html"' + (page === 'video' ? ' class="active"' : '') + '>视频创作</a><a href="index.html#about">关于我</a></nav><div class="header-actions"><a class="contact-link" href="mailto:2327149251@qq.com">联系' + icon('arrow-up-right') + '</a><button class="icon-button menu-toggle" aria-label="打开导航" aria-expanded="false" aria-controls="header-nav" title="导航菜单">' + icon('menu') + '</button></div></div>';
  qs('#site-footer').innerHTML = '<div class="footer-inner wrap"><a class="footer-name" href="index.html">XU HAO<span>徐昊 · 设计与数字创作</span></a><nav class="footer-nav" aria-label="页脚导航"><a href="gallery.html">设计作品</a><a href="tools.html">软件项目</a><a href="video.html">视频作品</a><a href="assets/documents/xuhao-resume.pdf" target="_blank" rel="noopener">简历' + icon('arrow-up-right') + '</a></nav><div class="footer-meta"><span>© 2026 徐昊</span><span>FROM IDEA TO REALITY.</span><a href="#main" aria-label="返回顶部" title="返回顶部">' + icon('arrow-up') + '</a></div></div>';
  const menu = qs('.menu-toggle');
  const setMenu = (open) => {
    header.classList.toggle('menu-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
  };
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  qs('.header-nav').addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
  document.addEventListener('click', event => { if (!header.contains(event.target)) setMenu(false); });

  if (page === 'home') {
    const renderProjects = (category) => {
      const projects = PORTFOLIO.projects.filter(project => category === 'all' || project.category === category);
      qs('#project-grid').innerHTML = projects.map(project => '<article class="project-card"><a href="project.html?id=' + project.id + '"><div class="project-image" style="background:' + project.color + '"><img src="' + project.cover + '" alt="' + esc(project.subtitle) + '" loading="lazy" width="900" height="600"><span class="project-card-arrow">' + icon('arrow-up-right') + '</span></div><div class="project-meta"><span>' + esc(project.label) + '</span><span>' + esc(project.type) + '</span></div><div class="project-card-title"><h3>' + esc(project.title) + '</h3><p>' + esc(project.subtitle) + '</p></div></a></article>').join('');
      icons();
    };
    renderProjects('all');
    document.querySelectorAll('[data-project-filter]').forEach(button => button.addEventListener('click', () => {
      document.querySelectorAll('[data-project-filter]').forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      renderProjects(button.dataset.projectFilter);
    }));
  }

  if (page === 'project') {
    const id = new URLSearchParams(location.search).get('id');
    const project = PORTFOLIO.projects.find(item => item.id === id);
    if (!project) {
      qs('#project-detail').innerHTML = '<div class="wrap empty-state"><h1>项目不存在</h1><a class="button dark" href="index.html#work">返回作品</a></div>';
    } else {
      document.title = project.title + ' · 徐昊';
      const next = PORTFOLIO.projects[(PORTFOLIO.projects.indexOf(project) + 1) % PORTFOLIO.projects.length];
      const links = project.links.map((link, index) => '<a class="button ' + (index ? 'outline' : 'dark') + '" href="' + esc(link.href) + '"' + (link.href.startsWith('#') || link.href.includes('.html') ? '' : ' target="_blank" rel="noopener"') + '>' + esc(link.label) + icon(link.icon) + '</a>').join('');
      qs('#project-detail').innerHTML = '<section class="wrap project-intro"><a class="back-link" href="index.html#work">' + icon('arrow-left') + '精选作品</a><div class="project-kicker"><p class="eyebrow">' + esc(project.label) + '</p><span>' + esc(project.type) + ' / ' + esc(project.year) + '</span></div><h1 class="project-title">' + esc(project.title) + '<span class="accent-period">.</span></h1><p class="project-lede">' + esc(project.intro) + '</p><dl class="project-meta-grid"><div><dt>我的工作</dt><dd>' + esc(project.role) + '</dd></div><div><dt>工具与实现</dt><dd>' + project.stack.map(esc).join(' / ') + '</dd></div></dl><div class="project-actions">' + links + '</div></section><div class="project-cover" style="background:' + project.color + '"><img src="' + project.cover + '" alt="' + esc(project.subtitle) + '"></div><section class="wrap case-body"><div class="case-column"><p class="eyebrow">CONTEXT / 项目思考</p><h2>' + esc(project.subtitle) + '</h2><p>' + esc(project.problem) + '</p></div><div class="case-work"><p class="eyebrow">PROCESS / 我的实践</p><ol>' + project.work.map(item => '<li>' + esc(item) + '</li>').join('') + '</ol><h3>最终交付</h3><p>' + esc(project.result) + '</p></div></section><section class="wrap project-images ' + (project.id === 'wetland' ? 'phone-images' : '') + '" id="project-images">' + project.images.map((image, index) => '<figure class="project-figure"><a href="' + esc(image) + '" target="_blank" rel="noopener" aria-label="查看完整图版：' + esc(project.captions[index]) + '"><img src="' + esc(image) + '" alt="' + esc(project.captions[index]) + '" loading="lazy"></a><figcaption><span>' + String(index + 1).padStart(2, '0') + '</span>' + esc(project.captions[index]) + '</figcaption></figure>').join('') + '</section>' + (project.note ? '<div class="wrap"><p class="project-note">' + esc(project.note) + '</p></div>' : '') + '<section class="project-next"><a class="wrap" href="project.html?id=' + next.id + '"><span>下一个项目 / NEXT</span><h2>' + esc(next.title) + '</h2>' + icon('arrow-up-right') + '</a></section>';
    }
  }

  if (page === 'gallery') {
    let category = new URLSearchParams(location.search).get('category') || 'all';
    if (!PORTFOLIO.categories.some(item => item.id === category)) category = 'all';
    let term = '';
    let visible = [];
    let activeIndex = 0;
    const all = PORTFOLIO.categories.flatMap(cat => Array.from({ length: cat.count }, (_, index) => {
      const number = String(index + 1).padStart(2, '0');
      return { id: cat.id + '-' + number, category: cat.id, label: cat.title, title: PORTFOLIO.galleryTitles[cat.id][index], full: 'assets/design/images/' + cat.id + '-' + number + '.webp', thumb: 'assets/design/images/' + cat.id + '-' + number + '-t.webp', chapter: index === 0 && cat.id !== 'other' };
    })).filter(item => !item.chapter);
    qs('#gallery-filters').innerHTML = [{ id: 'all', title: '全部' }, ...PORTFOLIO.categories].map(cat => '<button data-category="' + cat.id + '">' + esc(cat.title) + '</button>').join('');
    const update = () => {
      visible = all.filter(item => (category === 'all' || item.category === category) && (item.title + item.label).toLowerCase().includes(term.toLowerCase()));
      qs('#gallery-grid').innerHTML = visible.map((item, index) => '<button class="gallery-item" data-image-index="' + index + '" aria-label="查看作品：' + esc(item.title) + '"><span class="gallery-thumb"><img src="' + item.thumb + '" alt="' + esc(item.title) + '" loading="lazy" width="760" height="428"><span>' + icon('maximize-2') + '</span></span><span class="gallery-caption"><strong>' + esc(item.title) + '</strong><span>' + esc(item.label) + '</span></span></button>').join('');
      qs('#gallery-count').textContent = visible.length + ' 张设计图版';
      qs('#gallery-empty').hidden = visible.length > 0;
      document.querySelectorAll('[data-category]').forEach(button => {
        const active = button.dataset.category === category;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      icons();
    };
    qs('#gallery-filters').addEventListener('click', event => {
      const button = event.target.closest('[data-category]');
      if (!button) return;
      category = button.dataset.category;
      const url = new URL(location.href);
      if (category === 'all') url.searchParams.delete('category'); else url.searchParams.set('category', category);
      try { history.replaceState(null, '', url); } catch { /* Local file preview does not require history updates. */ }
      update();
    });
    qs('#gallery-search').addEventListener('input', event => { term = event.target.value.trim(); update(); });
    qs('#reset-gallery').addEventListener('click', () => { term = ''; category = 'all'; qs('#gallery-search').value = ''; update(); });
    const dialog = qs('#lightbox');
    const show = () => {
      const item = visible[activeIndex];
      qs('#lightbox-title').textContent = item.title;
      qs('#lightbox-image').src = item.full;
      qs('#lightbox-image').alt = item.title;
      qs('#lightbox-counter').textContent = (activeIndex + 1) + ' / ' + visible.length;
    };
    const step = delta => { activeIndex = (activeIndex + delta + visible.length) % visible.length; show(); };
    qs('#gallery-grid').addEventListener('click', event => {
      const button = event.target.closest('[data-image-index]');
      if (!button) return;
      activeIndex = Number(button.dataset.imageIndex); show(); dialog.showModal(); document.body.classList.add('dialog-open');
    });
    qs('#lightbox-close').addEventListener('click', () => dialog.close());
    qs('#lightbox-prev').addEventListener('click', () => step(-1));
    qs('#lightbox-next').addEventListener('click', () => step(1));
    dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
    dialog.addEventListener('click', event => {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    document.addEventListener('keydown', event => {
      if (!dialog.open) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); step(event.key === 'ArrowRight' ? 1 : -1); }
    });
    let touchStart = null;
    dialog.addEventListener('touchstart', event => { touchStart = event.touches[0].clientX; }, { passive: true });
    dialog.addEventListener('touchend', event => {
      if (touchStart === null) return;
      const delta = event.changedTouches[0].clientX - touchStart;
      if (Math.abs(delta) > 70) step(delta < 0 ? 1 : -1);
      touchStart = null;
    }, { passive: true });
    update();
  }

  if (page === 'report') {
    const report = window.REPORTS?.[new URLSearchParams(location.search).get('id')];
    if (report) {
      document.title = report.title + ' · 徐昊';
      qs('#report-detail').innerHTML = '<header class="report-header"><p class="eyebrow">PRODUCT RESEARCH / 徐昊</p><h1>' + esc(report.title) + '</h1><p>个人产品分析原稿 · 内容与判断以原稿时间为准</p><a href="' + esc(report.download) + '" download class="button dark">下载分析报告' + icon('download') + '</a></header><article class="report-content">' + report.html + '</article>';
    } else {
      qs('#report-detail').innerHTML = '<div class="empty-state"><h1>报告不存在</h1><a class="button dark" href="index.html#documents">返回资料</a></div>';
    }
  }

  let toastTimer;
  document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
    try {
      const value = button.dataset.copy;
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(value);
      else {
        const field = document.createElement('textarea');
        field.value = value; field.style.position = 'fixed'; field.style.opacity = '0'; document.body.appendChild(field); field.select();
        const copied = document.execCommand('copy'); field.remove(); if (!copied) throw new Error('copy unavailable');
      }
      const toast = qs('#toast');
      toast.textContent = '已复制：' + value; toast.classList.add('visible');
      clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('visible'), 2500);
    } catch {
      qs('#toast').textContent = '复制未完成：' + button.dataset.copy; qs('#toast').classList.add('visible');
    }
  }));
  icons();
})();
