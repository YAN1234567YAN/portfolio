/* =========================================================
   鹤鸣盐城 · 管理后台（仅管理员）
   数据看板 / 用户管理 / 留言管理 / 公告发布
   ========================================================= */
(function () {
  "use strict";
  var HM = (window.HM = window.HM || {});
  var seg = "users"; /* users | msgs | notice */

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
    var box = document.getElementById("view-admin");
    if (!box) return;
    var users = HM.auth.users();
    var msgs = HM.msgs.list();
    var stats = HM.stats.get();
    var unread = msgs.filter(function (m) { return !m.read; }).length;

    box.innerHTML =
      '<div class="admin-head">' +
      '<button class="back-btn" id="adBack" aria-label="返回个人中心"><i class="fa-solid fa-arrow-left"></i></button>' +
      "<div><h2>管理后台</h2><p>管理员：数据看板 · 用户 · 留言 · 公告</p></div>" +
      "</div>" +
      '<div class="admin-dash">' +
      "<div class='dash-card'><div class='dc-ic di1'><i class='fa-solid fa-users'></i></div><b>" + users.length + "</b><span>注册用户</span></div>" +
      "<div class='dash-card'><div class='dc-ic di2'><i class='fa-solid fa-envelope'></i></div><b>" + msgs.length + "</b><span>留言（未读 " + unread + "）</span></div>" +
      "<div class='dash-card'><div class='dc-ic di3'><i class='fa-solid fa-shoe-prints'></i></div><b>" + HM.stats.totalVisits() + "</b><span>功能访问次数</span></div>" +
      "<div class='dash-card'><div class='dc-ic di4'><i class='fa-solid fa-compass'></i></div><b>" + (stats.quizPlays || 0) + "</b><span>答题参与次数</span></div>" +
      "</div>" +
      '<div class="admin-seg">' +
      '<button class="' + (seg === "users" ? "on" : "") + '" data-seg="users">用户</button>' +
      '<button class="' + (seg === "msgs" ? "on" : "") + '" data-seg="msgs">留言</button>' +
      '<button class="' + (seg === "notice" ? "on" : "") + '" data-seg="notice">公告</button>' +
      "</div>" +
      '<div class="admin-list" id="adminBody"></div>';

    document.getElementById("adBack").addEventListener("click", function () {
      HM.mineUI.render();
      HM.ui.go("mine");
    });
    var segs = box.querySelectorAll(".admin-seg button");
    for (var i = 0; i < segs.length; i++) {
      segs[i].addEventListener("click", function () {
        seg = this.getAttribute("data-seg");
        render();
      });
    }
    renderBody();
  }

  function renderBody() {
    var body = document.getElementById("adminBody");
    if (!body) return;

    if (seg === "users") {
      var users = HM.auth.users();
      var html = "";
      for (var i = 0; i < users.length; i++) {
        var u = users[i];
        var roleTxt = u.role === "admin" ? "管理员" : (u.role === "guest" ? "游客" : "用户");
        html +=
          '<div class="admin-row">' +
          '<div class="ar-avatar" style="background:linear-gradient(135deg,' + avatarColor(u.nickname) + ',#173f52)">' + esc(u.nickname.charAt(0)) + "</div>" +
          "<div class='ar-main'><b>" + esc(u.nickname) + " · " + roleTxt + "</b>" +
          "<span>@" + esc(u.username) + " ｜ 注册 " + fmtTime(u.createdAt) + " ｜ 登录 " + (u.loginCount || 0) + " 次</span></div>" +
          (u.role === "admin" ? "" : '<button class="ar-del" data-del="' + u.id + '">删除</button>') +
          "</div>";
      }
      body.innerHTML = html || '<div class="admin-empty">暂无用户</div>';
      var dels = body.querySelectorAll("[data-del]");
      for (var j = 0; j < dels.length; j++) {
        dels[j].addEventListener("click", function () {
          if (!confirm("确定删除该用户？")) return;
          HM.auth.removeUser(this.getAttribute("data-del"));
          HM.ui.toast("已删除用户");
          render();
        });
      }
    } else if (seg === "msgs") {
      var msgs = HM.msgs.list().slice().reverse();
      var h2 = "";
      for (var k = 0; k < msgs.length; k++) {
        var m = msgs[k];
        h2 +=
          '<div class="admin-row" style="align-items:flex-start;">' +
          "<div class='ar-main'><b>" + esc(m.nickname) + (m.read ? "" : " 🔴") + "</b>" +
          "<span>" + fmtTime(m.time) + "</span>" +
          "<div class='msg-text'>" + esc(m.text) + "</div></div>" +
          '<button class="ar-btn" data-read="' + m.id + '">' + (m.read ? "标未读" : "标已读") + "</button>" +
          '<button class="ar-del" data-delmsg="' + m.id + '">删除</button>' +
          "</div>";
      }
      body.innerHTML = h2 || '<div class="admin-empty">暂无留言</div>';
      var reads = body.querySelectorAll("[data-read]");
      for (var r = 0; r < reads.length; r++) {
        reads[r].addEventListener("click", function () {
          HM.msgs.toggleRead(this.getAttribute("data-read"));
          render();
        });
      }
      var delmsgs = body.querySelectorAll("[data-delmsg]");
      for (var d2 = 0; d2 < delmsgs.length; d2++) {
        delmsgs[d2].addEventListener("click", function () {
          HM.msgs.remove(this.getAttribute("data-delmsg"));
          HM.ui.toast("已删除留言");
          render();
        });
      }
    } else {
      body.innerHTML =
        '<div class="admin-notice">' +
        "<p style='font-size:12px;color:#8ba09a;margin-bottom:8px;'>发布公告后，所有用户将在首页顶部看到公告条。</p>" +
        "<textarea id='noticeInput' placeholder='输入公告内容…'>" + esc(HM.notice.get()) + "</textarea>" +
        "<div class='save-row'>" +
        '<button class="btn-main" id="noticeSave">保存发布</button>' +
        '<span class="tip">当前公告：' + (HM.notice.get() ? "已发布" : "未发布") + "</span>" +
        "</div></div>";
      document.getElementById("noticeSave").addEventListener("click", function () {
        var v = document.getElementById("noticeInput").value.trim();
        HM.notice.set(v);
        HM.ui.toast(v ? "公告已发布" : "公告已清空");
        HM.notice.dismiss();
        render();
      });
    }
  }

  HM.adminUI = { render: render };
})();
