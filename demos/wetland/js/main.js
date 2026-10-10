/* =========================================================
   鹤鸣盐城 · 主控模块（APP 路由）
   登录态 / 底部导航 / 状态栏 / 首页 / 弹窗 / 提示 / 音频
   ========================================================= */
(function () {
  "use strict";
  var HM = (window.HM = window.HM || {});

  var TAB_PAGES = ["home", "map", "gallery", "mine"];
  var soundOn = false;
  var modalTrigger = null;

  function $(id) { return document.getElementById(id); }

  /* ---------- 错误提示 ---------- */
  HM.err = function (msg) {
    try {
      var el = $("errTip");
      if (el) { el.textContent = msg; el.hidden = false; }
      console.error("[鹤鸣盐城]", msg);
      setTimeout(function () { if (el) el.hidden = true; }, 9000);
    } catch (e) {}
  };

  /* ---------- 轻提示 ---------- */
  function toast(msg) {
    var el = $("toast");
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(el._t);
    el._t = setTimeout(function () { el.hidden = true; }, 2400);
  }

  /* ---------- 模态弹窗 ---------- */
  HM.modal = {
    open: function (html) {
      var m = $("modal"), b = $("modalBox");
      if (!m || !b) return;
      modalTrigger = document.activeElement;
      b.innerHTML = (html.indexOf('data-close') < 0 ? '<button class="modal-close" data-close="1" aria-label="关闭弹窗">×</button>' : '') + html;
      var title = b.querySelector('h2');
      b.setAttribute('aria-label', title ? title.textContent : '详情');
      var close = b.querySelector('[data-close]');
      if (close) close.setAttribute('aria-label', '关闭弹窗');
      m.hidden = false;
      b.focus();
    },
    close: function () {
      var m = $("modal");
      if (m) m.hidden = true;
      if (modalTrigger && document.contains(modalTrigger)) modalTrigger.focus();
    }
  };

  /* ---------- UI 门面 ---------- */
  HM.ui = {
    toast: toast,
    go: go,
    showLogin: showLogin,
    soundBtn: refreshSoundBtn
  };

  /* ---------- 屏幕模式 ---------- */
  function setScreenMode(mode) {
    var screen = $("screen");
    if (!screen) return;
    screen.classList.remove("mode-login", "mode-admin", "mode-app");
    if (mode) screen.classList.add("mode-" + mode);
  }

  /* ---------- 视图切换 ---------- */
  function go(name) {
    if (name !== "login" && !HM.auth.current()) { showLogin(); return; }
    var views = document.querySelectorAll("#views .view");
    for (var i = 0; i < views.length; i++) views[i].classList.remove("active");
    var target = $("view-" + name);
    if (!target) target = $("view-home");
    target.classList.remove("active");
    void target.offsetWidth;
    target.classList.add("active");

    /* 底部导航高亮 */
    var tabs = document.querySelectorAll("#tabbar .tab");
    for (var t = 0; t < tabs.length; t++) {
      tabs[t].classList.toggle("active", tabs[t].getAttribute("data-go") === name);
      if (tabs[t].getAttribute("data-go") === name) tabs[t].setAttribute('aria-current', 'page');
      else tabs[t].removeAttribute('aria-current');
    }

    if (name === "admin") {
      setScreenMode("admin");
    } else if (name === "login") {
      setScreenMode("login");
    } else {
      setScreenMode("app");
    }
    if (name !== "login" && name !== "admin") HM.stats.hit(name);
    if (name === 'mine' && HM.mineUI) HM.mineUI.render();
    var box = $("view-" + name);
    if (box) box.scrollTop = 0;
  }

  /* ---------- 登录页 ---------- */
  function showLogin() {
    setScreenMode("login");
    var views = document.querySelectorAll("#views .view");
    for (var i = 0; i < views.length; i++) views[i].classList.remove("active");
    var login = $("view-login");
    login.classList.add("active");
    stopSound();
  }

  /* ---------- 进入应用 ---------- */
  function appEnter() {
    setScreenMode("app");
    buildHome();
    buildPledge();
    HM.mineUI.render();
    HM.adminUI.render();
    refreshSoundBtn();
    go("home");
  }

  /* ---------- 守护宣言渲染 ---------- */
  function buildPledge() {
    var body = $("pledgeBody");
    if (!body) return;
    var html = "";
    if (HM.pledge) {
      for (var i = 0; i < HM.pledge.length; i++) {
        html += "<p><b>" + HM.pledge[i].t + " · </b>" + HM.pledge[i].d + "</p>";
      }
    }
    if (HM.pledgeTail) html += '<p class="big"><b>' + HM.pledgeTail + "</b></p>";
    body.innerHTML = html;
    var restart = $("btnRestart");
    if (restart) restart.onclick = function () {
      var v = $("view-pledge");
      v.classList.remove("active");
      void v.offsetWidth;
      v.classList.add("active");
    };
  }

  /* ---------- 首页渲染 ---------- */
  function buildHome() {
    var home = $("view-home");
    var u = HM.auth.current();
    if (!home || !u) return;
    var notice = HM.notice.get();
    var noticeHtml = "";
    if (notice && !HM.notice.isDismissed()) {
      noticeHtml =
        '<div class="notice-bar"><b><i class="fa-solid fa-bullhorn"></i> 公告</b>' +
        escHtml(notice) +
        '<button class="nc" id="noticeClose" aria-label="关闭公告"><i class="fa-solid fa-xmark"></i></button></div>';
    }
    var tiles = "";
    if (HM.modules) {
      for (var i = 0; i < HM.modules.length; i++) {
        var m = HM.modules[i];
        tiles +=
          '<button class="home-tile" data-go="' + m.id + '">' +
          '<span class="ic c' + (i + 1) + '"><i class="' + m.ic + '"></i></span>' +
          "<h3>" + m.t + "</h3><p>" + m.d + "</p>" +
          '<span class="tile-go"><i class="fa-solid fa-arrow-right"></i></span></button>';
      }
    }
    home.innerHTML =
      '<header class="home-top"><div><span class="eyebrow">YANCHENG WETLAND</span><div class="hello">鹤鸣盐城<span class="brand-seal">鹤</span></div></div>' +
      '<button class="sound-btn" id="homeSound" aria-label="开启环境音" title="环境音"><i class="fa-solid fa-volume-xmark"></i></button></header>' +
      noticeHtml +
      '<section class="nature-hero"><img src="assets/wetland.svg" alt="晨光下，丹顶鹤栖息在芦苇与潮汐之间的湿地插画" width="800" height="700">' +
      '<div class="hero-copy"><span class="hero-kicker">黄海之滨 · 世界自然遗产</span><h1>一城湿地<br>万物生息</h1><p>循着鹤鸣，走进会呼吸的海岸。</p>' +
      '<button class="hero-explore" data-go="map">开启自然之旅 <i class="fa-solid fa-arrow-right"></i></button></div>' +
      '<span class="hero-caption">01 / 盐城黄海湿地</span></section>' +
      '<div class="section-label"><h2>探索这片湿地</h2><span>EXPLORE</span></div>' +
      '<div class="home-grid">' + tiles + '</div>' +
      '<button class="field-feature" id="featuredAnimal"><div class="feature-copy"><span class="eyebrow">湿地来信 / 001</span><h3>你好，丹顶鹤</h3><p>认识这位远道而来的朋友</p><span class="feature-link">翻开自然手册 <i class="fa-solid fa-arrow-right"></i></span></div><svg viewBox="65 30 120 125" aria-hidden="true">' + HM.animals[0].art + '</svg></button>' +
      '<p class="home-foot">与自然同行，让守护发生。<br><span>盐城机电分院 · 数字媒体技术毕业设计</span></p>';

    var tilesEl = home.querySelectorAll("[data-go]");
    for (var j = 0; j < tilesEl.length; j++) {
      tilesEl[j].addEventListener("click", function () { go(this.getAttribute("data-go")); });
    }
    var hs = $("homeSound");
    if (hs) hs.addEventListener("click", function () { toggleSound(); });
    $("featuredAnimal").onclick = function () { HM.gallery.open(0); };
    refreshSoundBtn();
    var nc = $("noticeClose");
    if (nc) nc.addEventListener("click", function () {
      HM.notice.dismiss();
      buildHome();
    });
  }

  function escHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* ---------- 音频 ---------- */
  function startSound() {
    if (HM.audio && !HM.audio.isOn()) { try { HM.audio.start(); } catch (e) {} }
    soundOn = !!HM.audio && HM.audio.isOn();
    refreshSoundBtn();
  }
  function stopSound() {
    if (HM.audio) HM.audio.stop();
    soundOn = false;
  }
  function toggleSound() {
    if (HM.audio) {
      try {
        if (HM.audio.isOn()) { HM.audio.stop(); soundOn = false; }
        else { HM.audio.start(); soundOn = HM.audio.isOn(); }
      } catch (e) { soundOn = false; }
    }
    refreshSoundBtn();
    toast(soundOn ? "已开启湿地环境音" : "已静音");
  }
  function refreshSoundBtn() {
    soundOn = !!HM.audio && HM.audio.isOn();
    var hs = $("homeSound");
    if (hs) hs.innerHTML = '<i class="fa-solid ' + (soundOn ? "fa-volume-high" : "fa-volume-xmark") + '"></i>';
    if (hs) { hs.setAttribute('aria-label', soundOn ? '关闭环境音' : '开启环境音'); hs.setAttribute('aria-pressed', String(soundOn)); }
  }

  /* ---------- 登录表单 ---------- */
  function wireLogin() {
    var tabL = $("tabLogin"), tabR = $("tabReg");
    var fL = $("fLogin"), fR = $("fReg"), err = $("loginErr");
    function showErr(msg) {
      if (!err) return;
      err.textContent = msg;
      err.hidden = !msg;
    }
    tabL.addEventListener("click", function () {
      tabL.classList.add("on"); tabR.classList.remove("on");
      fL.hidden = false; fR.hidden = true; showErr("");
    });
    tabR.addEventListener("click", function () {
      tabR.classList.add("on"); tabL.classList.remove("on");
      fR.hidden = false; fL.hidden = true; showErr("");
    });
    $("btnLogin").addEventListener("click", function () {
      var r = HM.auth.login($("loginUser").value, $("loginPass").value);
      if (r.ok) {
        showErr("");
        $("loginPass").value = "";
        appEnter();
      } else showErr(r.msg);
    });
    $("loginPass").addEventListener("keydown", function (e) {
      if (e.key === "Enter") $("btnLogin").click();
    });
    $("btnReg").addEventListener("click", function () {
      var r = HM.auth.register($("regNick").value, $("regUser").value, $("regPass").value);
      if (r.ok) {
        showErr("");
        appEnter();
      } else showErr(r.msg);
    });
    $("btnGuest").addEventListener("click", function () {
      HM.auth.loginAsGuest();
      appEnter();
    });
  }

  /* ---------- 状态栏时钟 ---------- */
  function wireStatusbar() {
    function tick() {
      var el = $("sbTime");
      if (!el) return;
      var d = new Date();
      function p(n) { return n < 10 ? "0" + n : "" + n; }
      el.textContent = p(d.getHours()) + ":" + p(d.getMinutes());
    }
    tick();
    setInterval(tick, 20000);
  }

  /* ---------- 底部导航 ---------- */
  function wireTabbar() {
    var tabs = document.querySelectorAll("#tabbar .tab");
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener("click", function () {
        var pg = this.getAttribute("data-go");
        if (pg === "mine") HM.mineUI.render();
        go(pg);
      });
    }
    var backs = document.querySelectorAll(".btn-back[data-home]");
    for (var b = 0; b < backs.length; b++) {
      backs[b].addEventListener("click", function () { go("home"); });
    }
  }

  /* ---------- 弹窗 ---------- */
  function wireModal() {
    var mask = $("modal");
    if (!mask) return;
    mask.addEventListener("click", function (e) {
      if (e.target === mask || (e.target.closest && e.target.closest("[data-close]"))) {
        HM.modal.close();
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") HM.modal.close();
      if (e.key === 'Tab' && !mask.hidden) {
        var nodes = Array.from($("modalBox").querySelectorAll('button, input, textarea, a[href], [tabindex="0"]')).filter(function (el) { return !el.disabled && el.getClientRects().length; });
        var first = nodes[0], last = nodes[nodes.length - 1];
        if (!first) { e.preventDefault(); return; }
        if (e.shiftKey && (document.activeElement === first || document.activeElement === $("modalBox"))) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && (document.activeElement === last || document.activeElement === $("modalBox"))) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------- 启动 ---------- */
  function boot() {
    wireStatusbar();
    wireTabbar();
    wireModal();
    wireLogin();
    if (HM.gallery) HM.gallery.build();
    if (HM.mapUI) HM.mapUI.build();
    if (HM.quizUI) HM.quizUI.init();
    if (HM.intro) HM.intro.start(); /* 作为登录页背景动画 */

    /* 演示/测试参数：?demo=admin|student|guest 自动登录；?view=页面名 直达指定页 */
    var initialView = "home";
    try {
      var dm = /[?&]demo=(admin|student|guest)/.exec(window.location.search);
      if (dm) {
        if (dm[1] === "admin") HM.auth.login("admin", "admin123");
        else if (dm[1] === "student") HM.auth.login("student", "123456");
        else HM.auth.loginAsGuest();
      }
      var vm = /[?&]view=([a-z]+)/.exec(window.location.search);
      if (vm) initialView = vm[1];
    } catch (e) {}

    var u = HM.auth.current();
    if (u) {
      appEnter();
      if (initialView && initialView !== "home") go(initialView);
    } else showLogin();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
