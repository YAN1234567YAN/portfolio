/* =========================================================
   鹤鸣盐城 · 用户与数据层（localStorage 本地存储）
   账号系统 / 会话 / 使用统计 / 留言板 / 公告
   ========================================================= */
(function () {
  "use strict";
  var HM = (window.HM = window.HM || {});

  /* ---------- 存储工具 ---------- */
  HM.store = {
    get: function (k, d) {
      try {
        var v = localStorage.getItem("hm_" + k);
        return v ? JSON.parse(v) : d;
      } catch (e) { return d; }
    },
    set: function (k, v) {
      try { localStorage.setItem("hm_" + k, JSON.stringify(v)); } catch (e) {}
    }
  };

  /* ---------- 用户 ---------- */
  function seedUsers() {
    var users = HM.store.get("users", null);
    if (!users || !users.length) {
      users = [
        { id: "u_admin", username: "admin", password: "admin123", nickname: "系统管理员", role: "admin", createdAt: Date.now() - 86400000 * 30, loginCount: 0 },
        { id: "u_student", username: "student", password: "123456", nickname: "小鹤同学", role: "user", createdAt: Date.now() - 86400000 * 20, loginCount: 0 }
      ];
      HM.store.set("users", users);
    }
    return users;
  }

  HM.auth = {
    users: function () { return HM.store.get("users", []); },
    current: function () {
      var id = HM.store.get("session", null);
      if (!id) return null;
      var users = HM.auth.users();
      for (var i = 0; i < users.length; i++) if (users[i].id === id) return users[i];
      return null;
    },
    isAdmin: function () {
      var u = HM.auth.current();
      return !!u && u.role === "admin";
    },
    isGuest: function () {
      var u = HM.auth.current();
      return !!u && u.role === "guest";
    },
    login: function (username, password) {
      var users = HM.auth.users();
      for (var i = 0; i < users.length; i++) {
        if (users[i].username === username.trim()) {
          if (users[i].password === password) {
            users[i].loginCount = (users[i].loginCount || 0) + 1;
            HM.store.set("users", users);
            HM.store.set("session", users[i].id);
            return { ok: true };
          }
          return { ok: false, msg: "密码不正确，请重试" };
        }
      }
      return { ok: false, msg: "账号不存在，请先注册" };
    },
    register: function (nickname, username, password) {
      nickname = nickname.trim();
      username = username.trim();
      if (!nickname) return { ok: false, msg: "请填写昵称" };
      if (!/^[a-zA-Z0-9_]{3,16}$/.test(username)) return { ok: false, msg: "账号需为 3-16 位字母、数字或下划线" };
      if (!password || password.length < 4) return { ok: false, msg: "密码至少 4 位" };
      var users = HM.auth.users();
      for (var i = 0; i < users.length; i++) {
        if (users[i].username === username) return { ok: false, msg: "该账号已被注册" };
      }
      var u = {
        id: "u_" + Date.now().toString(36),
        username: username, password: password, nickname: nickname,
        role: "user", createdAt: Date.now(), loginCount: 1
      };
      users.push(u);
      HM.store.set("users", users);
      HM.store.set("session", u.id);
      return { ok: true };
    },
    loginAsGuest: function () {
      var users = HM.auth.users();
      var g = null;
      for (var i = 0; i < users.length; i++) if (users[i].role === "guest") g = users[i];
      if (!g) {
        g = { id: "u_guest", username: "guest", password: "", nickname: "湿地访客", role: "guest", createdAt: Date.now(), loginCount: 0 };
        users.push(g);
        HM.store.set("users", users);
      }
      g.loginCount = (g.loginCount || 0) + 1;
      HM.store.set("users", users);
      HM.store.set("session", g.id);
      return g;
    },
    logout: function () {
      try { localStorage.removeItem("hm_session"); } catch (e) {}
    },
    removeUser: function (id) {
      var users = HM.auth.users();
      if (id === "u_admin") return false;
      users = users.filter(function (u) { return u.id !== id; });
      HM.store.set("users", users);
      if (HM.store.get("session", null) === id) HM.auth.logout();
      return true;
    }
  };
  seedUsers();

  /* ---------- 使用统计 ---------- */
  HM.stats = {
    get: function () {
      var s = HM.store.get("stats", null);
      if (!s) {
        s = { visits: { home: 0, map: 0, gallery: 0, quiz: 0, pledge: 0, mine: 0, admin: 0 }, quizPlays: 0, quizBest: 0 };
        HM.store.set("stats", s);
      }
      return s;
    },
    hit: function (page) {
      var s = HM.stats.get();
      if (s.visits[page] !== undefined) s.visits[page]++;
      HM.store.set("stats", s);
    },
    quizDone: function (score, total) {
      var s = HM.stats.get();
      s.quizPlays = (s.quizPlays || 0) + 1;
      var best = s.quizBest || 0;
      if (score > best) s.quizBest = score;
      HM.store.set("stats", s);
    },
    totalVisits: function () {
      var s = HM.stats.get(), n = 0;
      for (var k in s.visits) n += s.visits[k] || 0;
      return n;
    }
  };

  /* ---------- 留言板 ---------- */
  HM.msgs = {
    list: function () { return HM.store.get("msgs", []); },
    add: function (text) {
      var u = HM.auth.current();
      var msgs = HM.msgs.list();
      msgs.push({
        id: "m_" + Date.now().toString(36),
        uid: u ? u.id : "guest",
        nickname: u ? u.nickname : "访客",
        text: text,
        time: Date.now(),
        read: false
      });
      HM.store.set("msgs", msgs);
      return true;
    },
    remove: function (id) {
      var msgs = HM.msgs.list().filter(function (m) { return m.id !== id; });
      HM.store.set("msgs", msgs);
    },
    toggleRead: function (id) {
      var msgs = HM.msgs.list();
      for (var i = 0; i < msgs.length; i++) {
        if (msgs[i].id === id) { msgs[i].read = !msgs[i].read; break; }
      }
      HM.store.set("msgs", msgs);
    },
    myCount: function () {
      var u = HM.auth.current();
      if (!u) return 0;
      return HM.msgs.list().filter(function (m) { return m.uid === u.id; }).length;
    }
  };

  /* ---------- 公告 ---------- */
  HM.notice = {
    get: function () { return HM.store.get("notice", ""); },
    set: function (t) { HM.store.set("notice", t.trim()); },
    dismiss: function () { HM.store.set("noticeDismiss", Date.now()); },
    isDismissed: function () {
      var d = HM.store.get("noticeDismiss", 0);
      return (Date.now() - d) < 3600000; /* 1 小时内不重复弹 */
    }
  };
})();
