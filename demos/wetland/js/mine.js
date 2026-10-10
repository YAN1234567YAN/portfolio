/* =========================================================
   鹤鸣盐城 · 我的页（个人中心）
   头像 / 统计 / 公告 / 管理入口 / 留言 / 关于 / 退出
   ========================================================= */
(function () {
  "use strict";
  var HM = (window.HM = window.HM || {});

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function fmtTime(t) {
    var d = new Date(t);
    function p(n) { return n < 10 ? "0" + n : "" + n; }
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes());
  }
  function avatarColor(name) {
    var colors = ["#2e8b86", "#e76f51", "#5d8a9e", "#8a6bb5", "#b5833a", "#4c9a5f", "#b0545a", "#4f78a8"];
    var n = 0;
    for (var i = 0; i < name.length; i++) n += name.charCodeAt(i);
    return colors[n % colors.length];
  }

  function render() {
    var box = document.getElementById("view-mine");
    if (!box) return;
    var u = HM.auth.current();
    if (!u) { box.innerHTML = ""; return; }
    var stats = HM.stats.get();
    var myMsgs = HM.msgs.list().filter(function (m) { return m.uid === u.id; });
    var badge = u.role === "admin"
      ? '<span class="mine-badge badge-admin">管理员</span>'
      : (u.role === "guest"
        ? '<span class="mine-badge badge-user">游客</span>'
        : '<span class="mine-badge badge-user">注册用户</span>');
    var adminItem = (u.role === "admin")
      ? '<button class="mine-item" id="miAdmin"><span class="mi-ic"><i class="fa-solid fa-gauge-high"></i></span>管理后台<span class="mi-arrow"><i class="fa-solid fa-chevron-right"></i></span></button>'
      : "";

    box.innerHTML =
      '<div class="mine-header">' +
      '<div class="mine-avatar" style="background:linear-gradient(135deg,' + avatarColor(u.nickname) + ',#173f52)">' + esc(u.nickname.charAt(0)) + "</div>" +
      "<div><div class='mine-name'>" + esc(u.nickname) + "</div>" +
      "<div class='mine-user'>@" + esc(u.username) + "</div>" + badge + "</div>" +
      "</div>" +
      '<div class="mine-stats">' +
      "<div class='st'><b>" + (u.loginCount || 0) + "</b><span>登录次数</span></div>" +
      "<div class='st'><b>" + myMsgs.length + "</b><span>我的留言</span></div>" +
      "<div class='st'><b>" + (stats.quizBest || 0) + "<small>/8</small></b><span>答题最佳</span></div>" +
      "</div>" +
      '<div class="mine-menu">' +
      '<button class="mine-item" id="miNotice"><span class="mi-ic"><i class="fa-solid fa-bullhorn"></i></span>湿地公告<span class="mi-arrow"><i class="fa-solid fa-chevron-right"></i></span></button>' +
      adminItem +
      '<button class="mine-item" id="miMsg"><span class="mi-ic"><i class="fa-solid fa-comment-dots"></i></span>我要留言<span class="mi-arrow"><i class="fa-solid fa-chevron-right"></i></span></button>' +
      '<button class="mine-item" id="miSound"><span class="mi-ic"><i class="fa-solid fa-volume-high"></i></span>环境音效<span class="mi-val" id="miSoundVal">' + (HM.audio && HM.audio.isOn() ? "已开启" : "已关闭") + '</span><span class="mi-arrow"><i class="fa-solid fa-chevron-right"></i></span></button>' +
      '<button class="mine-item" id="miAbout"><span class="mi-ic"><i class="fa-solid fa-circle-info"></i></span>关于作品<span class="mi-arrow"><i class="fa-solid fa-chevron-right"></i></span></button>' +
      '<button class="mine-item danger" id="miLogout"><span class="mi-ic"><i class="fa-solid fa-arrow-right-from-bracket"></i></span>退出登录<span class="mi-arrow"><i class="fa-solid fa-chevron-right"></i></span></button>' +
      "</div>" +
      '<div class="mine-note"><span class="eyebrow">MY NATURE JOURNAL</span><h3>每一次了解，都是守护的开始。</h3><p>继续探索，让这本自然手册更加丰厚。</p><button class="btn-back" id="mineExplore">去认识湿地生灵 <i class="fa-solid fa-arrow-right"></i></button></div><p class="home-foot">鹤鸣盐城 · 自然手册</p>';

    wire();
  }

  function wire() {
    document.getElementById('mineExplore').onclick = function () { HM.ui.go('gallery'); };
    var miAdmin = document.getElementById("miAdmin");
    if (miAdmin) miAdmin.addEventListener("click", function () {
      HM.adminUI.render();
      HM.ui.go("admin");
    });

    var miNotice = document.getElementById("miNotice");
    if (miNotice) miNotice.addEventListener("click", function () {
      var n = HM.notice.get();
      HM.modal.open(
        "<h2><i class='fa-solid fa-bullhorn'></i> 湿地公告</h2>" +
        "<p>" + (n ? esc(n) : "暂无公告。管理员可以在「管理后台」发布公告。") + "</p>"
      );
    });

    var miMsg = document.getElementById("miMsg");
    if (miMsg) miMsg.addEventListener("click", function () {
      HM.modal.open(
        "<h2><i class='fa-solid fa-comment-dots'></i> 我要留言</h2>" +
        "<p style='font-size:12px;color:#8ba09a;'>写下你对作品的建议、想了解的湿地知识，或想对湿地说的话。</p>" +
        "<textarea id='msgInput' style='width:100%;height:110px;border-radius:12px;border:1.5px solid #dce6e0;background:#f4f8f5;padding:11px 12px;font-size:13.5px;line-height:1.8;resize:vertical;color:#22332e;'></textarea>" +
        "<button class='btn-main' id='msgSend' style='margin-top:12px;width:100%;border-radius:13px;padding:12px;font-size:14.5px;'>提交留言</button>"
      );
      document.getElementById("msgSend").addEventListener("click", function () {
        var t = document.getElementById("msgInput").value.trim();
        if (!t) { HM.ui.toast("请先写点内容再提交哦"); return; }
        HM.msgs.add(t);
        HM.modal.close();
        HM.ui.toast("留言已提交，感谢支持 🦩");
        render();
      });
    });

    var miSound = document.getElementById("miSound");
    if (miSound) miSound.addEventListener("click", function () {
      var on = HM.audio ? HM.audio.toggle() : false;
      HM.ui.soundBtn();
      var v = document.getElementById("miSoundVal");
      if (v) v.textContent = on ? "已开启" : "已关闭";
    });

    var miAbout = document.getElementById("miAbout");
    if (miAbout) miAbout.addEventListener("click", function () {
      HM.modal.open(
        "<h2><i class='fa-solid fa-circle-info'></i> 关于作品</h2>" +
        "<p>《鹤鸣盐城》是一款以盐城黄海湿地为主题的互动数字应用：<br>" +
        "· 湿地导览：手绘遗产地图 + 5 大片区插画资料<br>" +
        "· 生灵图鉴：8 种珍稀动物的原创矢量插画<br>" +
        "· 湿地问答：8 道湿地知识闯关<br>" +
        "· 守护宣言：人与自然和谐共生<br><br>" +
        "作品为江苏联合职业技术学院盐城机电分院数字媒体技术专业毕业设计，完全离线运行。</p>"
      );
    });

    var miLogout = document.getElementById("miLogout");
    if (miLogout) miLogout.addEventListener("click", function () {
      HM.modal.open(
        "<h2>退出登录</h2><p>确定要退出当前账号吗？</p>" +
        "<div style='display:flex;gap:10px;margin-top:14px;'>" +
        "<button class='btn-main' id='lgYes' style='flex:1;border-radius:13px;padding:11px;font-size:14px;'>退出</button>" +
        "<button class='btn-sec' id='lgNo' style='flex:1;border-radius:13px;padding:11px;font-size:14px;'>取消</button></div>"
      );
      document.getElementById("lgYes").addEventListener("click", function () {
        HM.modal.close();
        HM.auth.logout();
        HM.ui.showLogin();
      });
      document.getElementById("lgNo").addEventListener("click", function () { HM.modal.close(); });
    });
  }

  HM.mineUI = { render: render };
})();
