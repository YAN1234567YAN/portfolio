/* ===== Unity特效学习导航 - 应用逻辑 ===== */
(function () {
  "use strict";

  var DATA = window.COURSE_DATA;
  var courses = DATA.courses || [];
  var CATS = DATA.categories || {};

  var state = {
    q: "",
    cat: "all",
    level: "all",
    sort: "recommend",
  };

  /* ---------- DOM ---------- */
  var $grid = document.getElementById("course-grid");
  var $chips = document.getElementById("cat-chips");
  var $search = document.getElementById("search-input");
  var $level = document.getElementById("level-select");
  var $sort = document.getElementById("sort-select");
  var $reset = document.getElementById("reset-btn");
  var $info = document.getElementById("result-info");
  var $empty = document.getElementById("empty-state");
  var $countBadge = document.getElementById("course-count-badge");
  var $emptyReset = document.getElementById("empty-reset-btn");
  var $backTop = document.getElementById("back-to-top");

  /* ---------- 工具函数 ---------- */
  function fmtViews(n) {
    if (n >= 10000) return (n / 10000).toFixed(1).replace(/\.0$/, "") + "万播放";
    return n + "播放";
  }
  function fmtDuration(sec) {
    if (!sec) return "";
    var h = Math.floor(sec / 3600);
    var m = Math.round((sec % 3600) / 60);
    if (h > 0) return h + "小时" + (m > 0 ? m + "分" : "");
    return m + "分钟";
  }
  function fmtDateLike(n) {
    if (n >= 10000) return (n / 10000).toFixed(1).replace(/\.0$/, "") + "万赞";
    return n + "赞";
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function debounce(fn, wait) {
    var t = null;
    return function () {
      var args = arguments, self = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(self, args); }, wait);
    };
  }

  /* ---------- 渲染分类 chips ---------- */
  function renderChips() {
    var chips = [{ key: "all", label: "全部" }];
    for (var k in CATS) chips.push({ key: k, label: CATS[k] });
    $chips.innerHTML = chips.map(function (c) {
      var cls = "chip" + (state.cat === c.key ? " active" : "");
      return '<button type="button" class="' + cls + '" data-cat="' + c.key + '" role="button" aria-pressed="' + (state.cat === c.key) + '">' + c.label + "</button>";
    }).join("");
    Array.prototype.forEach.call($chips.querySelectorAll(".chip"), function (btn) {
      btn.addEventListener("click", function () {
        state.cat = btn.getAttribute("data-cat");
        renderChips();
        render();
        saveState();
      });
    });
  }

  /* ---------- 卡片模板 ---------- */
  function cardHtml(c) {
    var lvCls = { "入门": "beginner", "进阶": "intermediate", "高级": "advanced" }[c.level] || "beginner";
    var avatarChar = escapeHtml((c.up || "UP").charAt(0).toUpperCase());
    return (
      '<article class="course-card">' +
        '<div class="card-top">' +
          '<h3 class="card-title"><a href="' + c.url + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(c.title) + "</a></h3>" +
          '<div class="badges">' +
            '<span class="badge badge-cat">' + escapeHtml(CATS[c.category] || "课程") + "</span>" +
            '<span class="badge badge-lv-' + lvCls + '">' + escapeHtml(c.level) + "</span>" +
          "</div>" +
        "</div>" +
        '<p class="card-desc">' + escapeHtml(c.desc || "") + "</p>" +
        '<div class="card-meta">' +
          '<span class="card-up"><span class="avatar" aria-hidden="true">' + avatarChar + "</span>" +
            '<span class="up-name">' + escapeHtml(c.up || "UP主") + "</span></span>" +
          '<span class="dot" aria-hidden="true">·</span><span>⏱ ' + fmtDuration(c.duration) + "</span>" +
          '<span class="dot" aria-hidden="true">·</span><span>👍 ' + fmtDateLike(c.likes) + "</span>" +
        "</div>" +
        '<div class="card-footer">' +
          '<span class="card-views">👁 ' + fmtViews(c.views) + "</span>" +
          '<a class="card-link" href="' + c.url + '" target="_blank" rel="noopener noreferrer">去B站学习 <span aria-hidden="true">→</span></a>' +
        "</div>" +
      "</article>"
    );
  }

  /* ---------- 筛选与排序 ---------- */
  function filterCourses() {
    var q = state.q.trim().toLowerCase();
    var list = courses.filter(function (c) {
      if (state.cat !== "all" && c.category !== state.cat) return false;
      if (state.level !== "all" && c.level !== state.level) return false;
      if (q) {
        var hay = (c.title + " " + c.up + " " + (c.desc || "") + " " + (CATS[c.category] || "") + " " + c.level).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
    list.sort(function (a, b) {
      switch (state.sort) {
        case "views": return b.views - a.views;
        case "long": return b.duration - a.duration;
        case "short": return a.duration - b.duration;
        default:
          return b.views - a.views; // recommend = views
      }
    });
    return list;
  }

  /* ---------- 渲染 ---------- */
  function render() {
    var list = filterCourses();
    if (list.length === 0) {
      $grid.innerHTML = "";
      $grid.setAttribute("hidden", "hidden");
      $empty.hidden = false;
      $info.textContent = "没有匹配的课程，试试调整条件";
      return;
    }
    $empty.hidden = true;
    $grid.removeAttribute("hidden");
    var html = list.map(function (c, i) {
      return cardHtml(c).replace("<article", '<article style="animation-delay:' + Math.min(i * 0.035, 0.5) + 's"');
    }).join("");
    $grid.innerHTML = html;
    $info.textContent = "共找到 " + list.length + " 门课程（共 " + courses.length + " 门）" +
      (state.q ? " · 搜索：" + state.q : "");
  }

  /* ---------- URL 状态同步 ---------- */
  function saveState() {
    var p = [];
    if (state.q) p.push("q=" + encodeURIComponent(state.q));
    if (state.cat !== "all") p.push("cat=" + state.cat);
    if (state.level !== "all") p.push("level=" + encodeURIComponent(state.level));
    if (state.sort !== "recommend") p.push("sort=" + state.sort);
    var hash = p.length ? "#" + p.join("&") : "";
    try {
      if (history.replaceState) {
        history.replaceState(null, "", hash || window.location.pathname);
      }
    } catch (e) {
      /* file:// 或旧浏览器降级方案 */
      try { window.location.hash = hash; } catch (e2) { /* 忽略 */ }
    }
  }
  function loadState() {
    var h = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    if (!h) return;
    h.split("&").forEach(function (kv) {
      var parts = kv.split("=");
      if (parts.length === 2) {
        var k = parts[0], v = parts[1];
        if (k === "q") state.q = v;
        else if (k === "cat" && CATS[v]) state.cat = v;
        else if (k === "level" && ["入门", "进阶", "高级"].indexOf(v) > -1) state.level = v;
        else if (k === "sort") state.sort = v;
      }
    });
    $search.value = state.q;
    $level.value = state.level;
    $sort.value = state.sort;
  }

  /* ---------- 统计数字动画 ---------- */
  function animateStats() {
    Array.prototype.forEach.call(document.querySelectorAll(".stat-num"), function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10);
      var start = null, dur = 1200;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  /* ---------- 事件绑定 ---------- */
  $search.addEventListener("input", debounce(function () {
    state.q = $search.value;
    render();
    saveState();
  }, 220));
  $level.addEventListener("change", function () {
    state.level = $level.value;
    render();
    saveState();
  });
  $sort.addEventListener("change", function () {
    state.sort = $sort.value;
    render();
    saveState();
  });
  $reset.addEventListener("click", function () {
    state = { q: "", cat: "all", level: "all", sort: "recommend" };
    $search.value = "";
    $level.value = "all";
    $sort.value = "recommend";
    renderChips();
    render();
    saveState();
    $search.focus();
  });
  $emptyReset.addEventListener("click", function () { $reset.click(); });

  window.addEventListener("scroll", function () {
    var y = window.scrollY || document.documentElement.scrollTop;
    $backTop.classList.toggle("show", y > 600);
  }, { passive: true });
  $backTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- 初始化 ---------- */
  function init() {
    if (!courses.length) {
      $grid.innerHTML = '<p class="result-info">课程数据加载失败，请刷新页面重试。</p>';
      return;
    }
    $countBadge.textContent = "· " + courses.length + " 门";
    loadState();
    renderChips();
    render();
    animateStats();
  }
  init();
})();
