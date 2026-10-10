/* =========================================================
   鹤鸣盐城 · 片头动画（Canvas 手绘 MG 动画风格）
   日出湿地 → 芦苇轻摇 → 飞鹤掠过 → 标题浮现 → 进入
   ========================================================= */
(function () {
  "use strict";
  var HM = (window.HM = window.HM || {});
  var canvas, ctx, W = 0, H = 0, raf = null, running = false;
  var t0 = 0, elapsed = 0, done = false, readyShown = false;

  function resize() {
    if (!canvas) return;
    W = canvas.width = canvas.clientWidth * devicePixelRatio;
    H = canvas.height = canvas.clientHeight * devicePixelRatio;
  }

  /* ---- 太阳 ---- */
  function drawSun(t) {
    var cx = W * 0.72, baseY = H * 0.72, rise = Math.min(1, t / 3.2);
    var y = baseY - rise * (H * 0.16);
    var r = Math.min(W, H) * (0.05 + rise * 0.015);
    /* 光晕 */
    var glow = ctx.createRadialGradient(cx, y, r * 0.2, cx, y, r * 5);
    glow.addColorStop(0, "rgba(255,214,150,0.55)");
    glow.addColorStop(1, "rgba(255,214,150,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(cx - r * 5, y - r * 5, r * 10, r * 10);
    /* 日轮 */
    var sg = ctx.createRadialGradient(cx - r * 0.3, y - r * 0.3, r * 0.1, cx, y, r);
    sg.addColorStop(0, "#fff6dd");
    sg.addColorStop(0.55, "#ffd9a0");
    sg.addColorStop(1, "#f6a04c");
    ctx.fillStyle = sg;
    ctx.beginPath(); ctx.arc(cx, y, r, 0, Math.PI * 2); ctx.fill();
    return { cx: cx, y: y, r: r };
  }

  /* ---- 天与水 ---- */
  function drawSkyWater(sun) {
    var waterY = H * 0.74;
    var sky = ctx.createLinearGradient(0, 0, 0, waterY);
    sky.addColorStop(0, "#0a2a28");
    sky.addColorStop(0.55, "#123b3a");
    sky.addColorStop(1, "#2b5547");
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, waterY);

    var wg = ctx.createLinearGradient(0, waterY, 0, H);
    wg.addColorStop(0, "#2f6a58");
    wg.addColorStop(1, "#0a2a28");
    ctx.fillStyle = wg; ctx.fillRect(0, waterY, W, H - waterY);

    /* 水面日影 */
    if (sun) {
      var refl = ctx.createLinearGradient(sun.cx - sun.r * 0.6, waterY, sun.cx + sun.r * 0.6, H);
      refl.addColorStop(0, "rgba(255,217,160,0.5)");
      refl.addColorStop(1, "rgba(255,217,160,0)");
      ctx.fillStyle = refl;
      ctx.beginPath();
      ctx.moveTo(sun.cx - sun.r, waterY);
      ctx.lineTo(sun.cx + sun.r, waterY);
      ctx.lineTo(sun.cx + sun.r * 4, H);
      ctx.lineTo(sun.cx - sun.r * 4, H);
      ctx.closePath(); ctx.fill();
    }
  }

  /* ---- 芦苇剪影（近景）---- */
  function drawReeds(t) {
    ctx.fillStyle = "rgba(5,24,22,0.9)";
    /* 前景土坡 */
    ctx.beginPath();
    ctx.moveTo(0, H);
    ctx.lineTo(0, H * 0.94);
    ctx.quadraticCurveTo(W * 0.3, H * 0.9, W * 0.6, H * 0.945);
    ctx.quadraticCurveTo(W * 0.85, H * 0.965, W, H * 0.93);
    ctx.lineTo(W, H);
    ctx.closePath(); ctx.fill();

    var sway = Math.sin(t * 0.9) * 0.03;
    ctx.strokeStyle = "rgba(4,20,18,0.95)";
    ctx.lineCap = "round";
    /* 左侧芦苇丛 */
    for (var i = 0; i < 9; i++) {
      var x = W * (0.03 + i * 0.018);
      var h = H * (0.1 + (i % 3) * 0.03);
      var bx = x + Math.sin(t * 1.1 + i) * 3 * sway * 30;
      ctx.lineWidth = 2 + i % 2;
      ctx.beginPath();
      ctx.moveTo(bx, H * 0.97);
      ctx.quadraticCurveTo(bx + 8, H * 0.97 - h * 0.6, bx + 12 + sway * 20, H * 0.97 - h);
      ctx.stroke();
      /* 苇花（小椭圆点） */
      ctx.fillStyle = "rgba(6,26,23,0.9)";
      ctx.beginPath();
      ctx.ellipse(bx + 12 + sway * 20, H * 0.97 - h, 3, 8, -0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(4,20,18,0.95)";
    }
  }
  /* ---- 飞鹤剪影 ---- */
  function drawCrane(x, y, s, flap) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(s, s);
    ctx.strokeStyle = "#0b0e0c";
    ctx.fillStyle = "#0b0e0c";
    ctx.lineCap = "round";
    /* 细长的颈与身体轴线 */
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(-22, 14); ctx.lineTo(-6, -6); ctx.stroke();
    /* 头（小圆点） */
    ctx.beginPath(); ctx.arc(-26, 16, 2.4, 0, Math.PI * 2); ctx.fill();
    /* 双翅（扇动） */
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(-4, -4);
    ctx.quadraticCurveTo(6, -22 - flap * 10, 26, -14 - flap * 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-4, -4);
    ctx.quadraticCurveTo(-12, -24 - flap * 10, -30, -22 - flap * 4);
    ctx.stroke();
    /* 长腿向后收拢 */
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(-12, 6); ctx.lineTo(-14, 22); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-16, 7); ctx.lineTo(-20, 20); ctx.stroke();
    ctx.restore();
  }

  /* ---- 小群“人字形”候鸟 ---- */
  function drawFlock(t) {
    ctx.strokeStyle = "rgba(15,20,18,0.8)";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    for (var f = 0; f < 3; f++) {
      var phase = (t * (0.05 + f * 0.02) + f * 0.33) % 1;
      var x = W * (0.15 + phase * 0.8);
      var y = H * (0.16 + f * 0.07) + Math.sin(t + f * 2) * 4;
      var s = 0.5 + f * 0.25;
      ctx.beginPath();
      ctx.moveTo(x - 7 * s, y);
      ctx.quadraticCurveTo(x - 3 * s, y - 3.5 * s, x, y);
      ctx.quadraticCurveTo(x + 3 * s, y - 3.5 * s, x + 7 * s, y);
      ctx.stroke();
    }
  }

  /* ---- 标题打字机效果 ---- */
  function typeTitle() {
    var el = document.getElementById("introTitle");
    var sub = document.getElementById("introSub");
    var enter = document.getElementById("enterBtn");
    var hint = document.getElementById("introHint");
    if (!el) return;
    var text = "鹤鸣盐城";
    var i = 0;
    el.textContent = "";
    var iv = setInterval(function () {
      i++;
      el.textContent = text.slice(0, i);
      if (i >= text.length) {
        clearInterval(iv);
        setTimeout(function () {
          if (sub) sub.textContent = "—— 黄海湿地 · 互动数字作品 ——";
          if (sub) sub.classList.add("show");
        }, 260);
        setTimeout(function () {
          if (enter) enter.hidden = false;
          if (hint) hint.hidden = false;
          done = true;
        }, 700);
      }
    }, 420);
  }

  /* ---- 主循环 ---- */
  function frame(now) {
    if (!running) return;
    if (!t0) t0 = now;
    elapsed = (now - t0) / 1000;
    var t = elapsed;
    try {
      ctx.clearRect(0, 0, W, H);
      var sun = drawSun(t);
      drawSkyWater(sun);
      drawFlock(t);
      /* 主鹤：从右向左飞过，带一点起伏 */
      var cphase = (t * 0.12) % 1.4;
      if (cphase < 1) {
        var cx = W * (1.08 - cphase * 1.25);
        var cy = H * 0.3 + Math.sin(cphase * 6) * 12 - 30;
        var flap = Math.sin(t * 5.2) * 3;
        drawCrane(cx, cy, Math.min(W, H) * 0.004, flap);
      } else {
        /* 飞远后的远景小鹤 */
        drawCrane(W * -0.05, H * 0.2, Math.min(W, H) * 0.0016, Math.sin(t * 5) * 2);
      }
      drawReeds(t);
    } catch (e) { /* 画布异常不阻塞进入流程 */ }
    raf = requestAnimationFrame(frame);
  }

  /* ---- 对外接口 ---- */
  HM.intro = {
    start: function (onEnter) {
      canvas = document.getElementById("introCanvas");
      if (!canvas) { if (onEnter) onEnter(); return; }
      ctx = canvas.getContext("2d");
      running = true;
      resize();
      window.addEventListener("resize", resize);
      typeTitle();
      raf = requestAnimationFrame(frame);
      var enter = document.getElementById("enterBtn");
      if (enter) enter.addEventListener("click", function () {
        if (!onEnter) return;
        running = false;
        if (raf) cancelAnimationFrame(raf);
        var intro = document.getElementById("intro");
        if (intro) intro.style.display = "none";
        onEnter();
      });
    }
  };
})();
