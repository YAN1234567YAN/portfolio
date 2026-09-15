/* ============================================================
   个人作品集网站交互脚本
   导航高亮 / 移动端菜单 / 滚动入场 / 作品网格 / 筛选 / 灯箱 / 表单
   ============================================================ */

/* ---------- 1. 导航栏：滚动后加背景 ---------- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ---------- 2. 移动端汉堡菜单 ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ---------- 3. 滚动高亮当前区块 ---------- */
const sections = document.querySelectorAll('section[id]');
const menuLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      menuLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });

sections.forEach(sec => sectionObserver.observe(sec));

/* ---------- 4. 滚动入场动画 ---------- */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ============================================================
   作品数据：图片位于 images/，命名 <分类>-<序号>.webp，缩略图加 -t
   ============================================================ */
const CATS = [
  ['brand',  '品牌设计', 6],
  ['poster', '海报设计', 6],
  ['logo',   '标志设计', 7],
  ['ui',     'UI 设计',  7],
  ['keycap', '键帽设计', 7],
  ['other',  '其他设计', 5]
];

const WORKS = [];
CATS.forEach(function (c) {
  const slug = c[0], name = c[1], n = c[2];
  for (let i = 1; i <= n; i++) {
    const no = String(i).padStart(2, '0');
    WORKS.push({
      cat: slug,
      catName: name,
      no: no,
      full: 'images/' + slug + '-' + no + '.webp',
      thumb: 'images/' + slug + '-' + no + '-t.webp',
      title: name + ' · ' + no
    });
  }
});

/* ---------- 5. 渲染作品网格 ---------- */
const grid = document.getElementById('worksGrid');

WORKS.forEach(function (w, i) {
  const el = document.createElement('div');
  el.className = 'work-item';
  el.dataset.cat = w.cat;
  el.dataset.i = i;
  el.style.setProperty('--i', i % 9);
  el.innerHTML =
    '<img src="' + w.thumb + '" alt="' + w.title + '" loading="lazy" decoding="async" />' +
    '<span class="work-zoom">⤢</span>' +
    '<div class="work-cap"><b>' + w.catName + '</b><i>' + w.no + '</i></div>';
  el.addEventListener('click', function () { openLb(i); });
  grid.appendChild(el);
});

const gridItems = Array.prototype.slice.call(grid.querySelectorAll('.work-item'));

/* 网格进入视口时逐张淡入 */
const gridObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) {
      grid.classList.add('in');
      gridObserver.unobserve(grid);
    }
  });
}, { threshold: 0.05 });
gridObserver.observe(grid);

/* ---------- 6. 作品分类筛选 ---------- */
let visible = WORKS.map(function (_, i) { return i; });

const filterBar = document.getElementById('filterBar');

filterBar.addEventListener('click', function (e) {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;

  filterBar.querySelectorAll('.filter-btn').forEach(function (b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');

  const filter = btn.dataset.filter;
  visible = [];
  const shown = [];

  WORKS.forEach(function (w, i) {
    const show = filter === 'all' || w.cat === filter;
    gridItems[i].classList.toggle('hide', !show);
    if (show) { visible.push(i); shown.push(gridItems[i]); }
  });

  /* 重算错峰延迟，让筛选后的动画更紧凑 */
  shown.forEach(function (el, pos) {
    el.style.setProperty('--i', pos % 9);
  });
  grid.classList.remove('in');
  void grid.offsetWidth;
  grid.classList.add('in');
});

/* ============================================================
   7. 作品大图灯箱
   ============================================================ */
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCat = document.getElementById('lbCat');
const lbCount = document.getElementById('lbCount');
const lbThumbs = document.getElementById('lbThumbs');

let lbList = [];   // 当前可见作品的索引数组
let lbPos = 0;     // 在 lbList 中的位置

function buildThumbs() {
  lbThumbs.innerHTML = '';
  lbList.forEach(function (wi, pos) {
    const img = document.createElement('img');
    img.src = WORKS[wi].thumb;
    img.alt = WORKS[wi].title;
    img.loading = 'lazy';
    img.addEventListener('click', function (ev) {
      ev.stopPropagation();
      lbPos = pos;
      refreshLb();
    });
    lbThumbs.appendChild(img);
  });
}

function refreshLb() {
  const w = WORKS[lbList[lbPos]];
  lbImg.src = w.full;
  lbImg.alt = w.title;
  lbCat.textContent = w.catName;
  lbCount.textContent = (lbPos + 1) + ' / ' + lbList.length;

  const thumbs = lbThumbs.querySelectorAll('img');
  thumbs.forEach(function (t, i) {
    t.classList.toggle('active', i === lbPos);
  });
  const act = lbThumbs.querySelector('img.active');
  if (act && act.scrollIntoView) {
    act.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }
}

function openLb(workIndex) {
  lbList = visible.slice();
  lbPos = lbList.indexOf(workIndex);
  if (lbPos < 0) lbPos = 0;
  buildThumbs();
  refreshLb();
  lb.classList.add('open');
  lb.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lb-open');
  document.getElementById('lbClose').focus();
}

function closeLb() {
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lb-open');
}

function navLb(step) {
  if (!lbList.length) return;
  lbPos = (lbPos + step + lbList.length) % lbList.length;
  refreshLb();
}

document.getElementById('lbClose').addEventListener('click', closeLb);
document.getElementById('lbPrev').addEventListener('click', function () { navLb(-1); });
document.getElementById('lbNext').addEventListener('click', function () { navLb(1); });

/* 点击空白处关闭 */
lb.addEventListener('click', function (e) {
  if (e.target === lb || e.target.id === 'lbStage') closeLb();
});

/* 键盘：← → 切换，Esc 关闭 */
document.addEventListener('keydown', function (e) {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb();
  else if (e.key === 'ArrowLeft') navLb(-1);
  else if (e.key === 'ArrowRight') navLb(1);
});

/* 触屏左右滑动切换 */
let touchX = null;
lb.addEventListener('touchstart', function (e) {
  touchX = e.touches[0].clientX;
}, { passive: true });
lb.addEventListener('touchend', function (e) {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) navLb(dx > 0 ? -1 : 1);
  touchX = null;
}, { passive: true });

/* ============================================================
   8. 联系表单（mailto 跳转）
   ============================================================ */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const data = new FormData(contactForm);
  const subject = encodeURIComponent(data.get('subject') || '作品集合作咨询');
  const body = encodeURIComponent(
    '姓名：' + data.get('name') + '\n' +
    '邮箱：' + data.get('email') + '\n\n' +
    '需求：\n' + data.get('message')
  );
  window.location.href = 'mailto:2327149251@qq.com?subject=' + subject + '&body=' + body;
});

/* ---------- 9. 页脚年份自动更新 ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
