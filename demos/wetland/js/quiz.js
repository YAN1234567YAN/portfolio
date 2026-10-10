/* =========================================================
   鹤鸣盐城 · 湿地问答（8 题闯关 + 结果评价）
   ========================================================= */
(function () {
  "use strict";
  var HM = (window.HM = window.HM || {});
  var state = { idx: 0, score: 0, done: false, answered: false };
  var KEYS = ["A", "B", "C", "D"];

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* 首页：开始答题 */
  function renderStart() {
    var box = document.getElementById("quizBox");
    box.innerHTML =
      '<div class="quiz-start">' +
      '<div class="q-ic"><i class="fa-solid fa-dove"></i></div>' +
      '<span class="eyebrow">WETLAND CHALLENGE</span><h3>你有多了解这片湿地？</h3><div class="quiz-meta"><span>8 道精选题目</span><span>答后即看解析</span></div>' +
      "<p>从候鸟迁徙到潮间带生灵，<br>在每一道题里，发现自然的小秘密。</p>" +
      '<button class="btn-main" id="qStart">开始答题</button>' +
      "</div>";
    var btn = document.getElementById("qStart");
    btn.addEventListener("click", function () {
      state.idx = 0; state.score = 0; state.done = false;
      renderQ();
    });
  }

  /* 题目页 */
  function renderQ() {
    var list = HM.quiz;
    if (!list || !list.length) return;
    var q = list[state.idx];
    state.answered = false;
    var box = document.getElementById("quizBox");
    var pct = Math.round((state.idx / list.length) * 100);
    var optsHtml = "";
    for (var i = 0; i < q.opts.length; i++) {
      optsHtml +=
        '<button class="quiz-opt" data-i="' + i + '">' +
        '<span class="k">' + KEYS[i] + "</span><span>" + esc(q.opts[i]) + "</span></button>";
    }
    box.innerHTML =
      '<div class="quiz-progress">' +
      '<div class="bar"><i style="width:' + pct + '%"></i></div>' +
      "<span>" + (state.idx + 1) + " / " + list.length + "</span>" +
      "</div>" +
      '<div class="quiz-card">' +
      '<div class="quiz-q">' + esc(q.q) + "</div>" +
      '<div class="quiz-opts">' + optsHtml + "</div>" +
      '<div id="qFb" role="status"></div>' +
      '<button class="quiz-next" id="qNext" hidden>下一题 →</button>' +
      "</div>";

    document.getElementById('view-quiz').scrollTop = 0;
    var opts = box.querySelectorAll(".quiz-opt");
    for (var o = 0; o < opts.length; o++) {
      opts[o].addEventListener("click", (function (el) {
        return function () { answer(el); };
      })(opts[o]));
    }
    var next = document.getElementById("qNext");
    if (next) next.addEventListener("click", function () {
      if (state.idx + 1 >= list.length) renderEnd();
      else { state.idx++; renderQ(); }
    });
  }

  function answer(el) {
    if (state.answered || state.done) return;
    state.answered = true;
    var q = HM.quiz[state.idx];
    var chosen = parseInt(el.getAttribute("data-i"), 10);
    var correct = chosen === q.ans;
    if (correct) state.score++;

    var all = document.querySelectorAll("#quizBox .quiz-opt");
    for (var i = 0; i < all.length; i++) {
      all[i].classList.add("disabled");
      all[i].disabled = true;
      var oi = parseInt(all[i].getAttribute("data-i"), 10);
      if (oi === q.ans) all[i].classList.add("ok");
      else if (oi === chosen) all[i].classList.add("bad");
    }
    var fb = document.getElementById("qFb");
    var head = correct ? "🎉 回答正确！" : "😅 答错了，正确答案是 " + KEYS[q.ans] + "。";
    fb.innerHTML =
      '<div class="quiz-feedback ' + (correct ? "good" : "miss") + '">' +
      "<b>" + head + "</b><br>" + esc(q.exp) +
      "</div>";
    var next = document.getElementById("qNext");
    if (next) { next.hidden = false; next.textContent = state.idx === HM.quiz.length - 1 ? '查看我的成绩 →' : '下一题 →'; next.focus(); }
  }

  /* 结果页 */
  function renderEnd() {
    if (state.done) return;
    state.done = true;
    var total = HM.quiz.length;
    try { if (HM.stats && HM.stats.quizDone) HM.stats.quizDone(state.score, total); } catch (e) {}
    var box = document.getElementById("quizBox");
    var msg, note;
    if (state.score === total) { msg = "🌊 湿地守护大师！"; note = "满分！你已经是半个“湿地通”了，快把湿地故事讲给更多人听吧。"; }
    else if (state.score >= total - 2) { msg = "🦩 优秀湿地观察员"; note = "你对黄海湿地已经相当了解，继续加油，去看更多候鸟吧。"; }
    else if (state.score >= total / 2) { msg = "🐦 初识湿地的朋友"; note = "答对了一半以上，建议去“生灵图鉴”里再逛逛，你会认识更多湿地朋友。"; }
    else { msg = "🌱 湿地探索新人"; note = "没关系，从了解开始就是守护的第一步。返回图鉴，重新认识这片滩涂吧。"; }
    box.innerHTML =
      '<div class="quiz-end">' +
      '<div class="q-ic"><i class="fa-solid ' + (state.score >= total / 2 ? "fa-star" : "fa-droplet") + '"></i></div>' +
      "<h3>" + msg + "</h3>" +
      '<div class="score">' + state.score + "<small> / " + total + "</small></div>" +
      '<div class="score-line">' + note + "</div>" +
      '<button class="btn-main again" id="qAgain">再答一次</button>' +
      '<br><button class="btn-sec" id="qBack">返回首页</button>' +
      "</div>";
    document.getElementById("qAgain").addEventListener("click", function () {
      state.idx = 0; state.score = 0; state.done = false;
      renderQ();
    });
    document.getElementById("qBack").addEventListener("click", function () {
      if (HM.ui) HM.ui.go("home");
    });
  }

  HM.quizUI = { init: renderStart };
})();
