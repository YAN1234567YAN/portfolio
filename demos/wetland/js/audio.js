/* =========================================================
   鹤鸣盐城 · 环境音效（Web Audio 实时合成，无外部音频文件）
   低音氛围垫 + 潺潺水声 + 偶尔的鸟鸣，音量温和可随时静音
   ========================================================= */
(function () {
  "use strict";
  var HM = (window.HM = window.HM || {});
  var ctx = null, master = null, started = false, timers = [];

  function osc(type, freq, peak, stopIn) {
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.linearRampToValueAtTime(peak, ctx.currentTime + stopIn * 0.35);
    o.connect(g); g.connect(master);
    o.start();
    return { o: o, g: g, stopIn: stopIn };
  }

  /* 鸟鸣：一次快速的滑音“啁啾” */
  function chirp() {
    try {
      var t0 = ctx.currentTime;
      var f = 1800 + Math.random() * 900;
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(f, t0);
      o.frequency.exponentialRampToValueAtTime(f * 1.5, t0 + 0.05);
      o.frequency.exponentialRampToValueAtTime(f * 0.8, t0 + 0.12);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.linearRampToValueAtTime(0.05, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.18);
      o.connect(g); g.connect(master);
      o.start(t0); o.stop(t0 + 0.25);
    } catch (e) { /* 忽略偶发错误 */ }
  }

  function scheduleBirds() {
    function loop() {
      var wait = 6000 + Math.random() * 9000;
      timers.push(setTimeout(function () {
        if (!started) return;
        chirp();
        if (Math.random() < 0.4) setTimeout(chirp, 400 + Math.random() * 500);
        loop();
      }, wait));
    }
    loop();
  }

  HM.audio = {
    isOn: function () { return started; },
    toggle: function () {
      if (!HM.audio.enabled) return false;
      if (started) { HM.audio.stop(); return false; }
      HM.audio.start(); return true;
    },
    start: function () {
      try {
        if (started) return;
        if (!ctx) {
          var AC = window.AudioContext || window.webkitAudioContext;
          if (!AC) { HM.audio.enabled = false; return; }
          ctx = new AC();
        }
        if (ctx.state === "suspended") ctx.resume();
        master = ctx.createGain();
        master.gain.value = 0.5;
        master.connect(ctx.destination);
        started = true;

        /* 低音氛围垫：缓慢起伏的和声 */
        var pad = [82.4, 110, 164.8, 246.9];
        for (var i = 0; i < pad.length; i++) {
          (function (idx, freq) {
            var p = osc("sine", freq, 0.02, 4);
            /* 为每个振荡器加一个缓慢的增益 LFO，让声音“呼吸” */
            var lfo = ctx.createOscillator(), lg = ctx.createGain();
            lfo.frequency.value = 0.06 + idx * 0.02;
            lg.gain.value = 0.012;
            lfo.connect(lg); lg.connect(p.g);
            lfo.start();
            p.o.stop(ctx.currentTime + 60);
            timers.push(setTimeout(function () { try { lfo.stop(); } catch (e) {} }, 60000));
          })(i, pad[i]);
        }

        /* 水声：滤波后的柔和噪声，模拟潮汐起伏 */
        var nLen = ctx.sampleRate * 2;
        var buf = ctx.createBuffer(1, nLen, ctx.sampleRate);
        var ch = buf.getChannelData(0);
        for (var j = 0; j < nLen; j++) ch[j] = (Math.random() * 2 - 1) * 0.5;
        var src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
        var filt = ctx.createBiquadFilter(); filt.type = "lowpass"; filt.frequency.value = 420;
        var wg = ctx.createGain(); wg.gain.value = 0.028;
        src.connect(filt); filt.connect(wg); wg.connect(master);
        src.start();

        scheduleBirds();
      } catch (e) { started = false; HM.audio.enabled = false; }
    },
    stop: function () {
      started = false;
      try {
        for (var i = 0; i < timers.length; i++) clearTimeout(timers[i]);
        timers = [];
        if (ctx) ctx.suspend();
      } catch (e) {}
    }
  };
  HM.audio.enabled = true;
})();
