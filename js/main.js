/* ============================================================
   个人作品集网站交互脚本
   功能：导航高亮 / 移动端菜单 / 滚动入场 / 作品筛选 / 表单
   ============================================================ */

/* ---------- 1. 导航栏：滚动后加背景 ---------- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---------- 2. 移动端汉堡菜单 ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// 点击链接后自动收起菜单
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

/* ---------- 5. 作品分类筛选 ---------- */
const filterBar = document.getElementById('filterBar');
const workCards = document.querySelectorAll('.work-card');

filterBar.addEventListener('click', e => {
  if (!e.target.classList.contains('filter-btn')) return;

  // 切换按钮高亮
  filterBar.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  e.target.classList.add('active');

  const filter = e.target.dataset.filter;

  workCards.forEach(card => {
    const match = filter === 'all' || card.dataset.category === filter;
    card.classList.toggle('hide', !match);
    if (match) {
      // 重新播放入场动画
      card.style.animation = 'none';
      void card.offsetWidth; // 触发重排
      card.style.animation = '';
    }
  });
});

/* ---------- 6. 联系表单（演示：mailto 跳转） ---------- */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(contactForm);
  const subject = encodeURIComponent(data.get('subject') || '作品集合作咨询');
  const body = encodeURIComponent(
    `姓名：${data.get('name')}\n邮箱：${data.get('email')}\n\n需求：\n${data.get('message')}`
  );
  // 联系邮箱：2327149251@qq.com（徐昊）
  window.location.href = `mailto:2327149251@qq.com?subject=${subject}&body=${body}`;
});

/* ---------- 7. 页脚年份自动更新 ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
