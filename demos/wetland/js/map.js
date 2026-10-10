/* =========================================================
   鹤鸣盐城 · 湿地导览（黄海遗产地图）
   手绘风地图 + 可点击标记，点击后展示片区插画与资料卡片
   ========================================================= */
(function () {
  "use strict";
  var HM = (window.HM = window.HM || {});

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* ---------- 手绘风黄海遗产地图（矢量） ---------- */
  var MAP_SVG =
    '<svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">' +
    "<defs>" +
    '<linearGradient id="map_sea" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#2e6f8e"/><stop offset="1" stop-color="#1a4760"/>' +
    "</linearGradient>" +
    '<linearGradient id="map_land" x1="0" y1="0" x2="1" y2="0">' +
    '<stop offset="0" stop-color="#a8c083"/><stop offset="1" stop-color="#8aa864"/>' +
    "</linearGradient>" +
    "</defs>" +
    '<rect width="420" height="300" fill="url(#map_sea)"/>' +
    '<path d="M254 0 C 258 60 248 120 258 170 C 266 220 250 270 256 300" stroke="#dcc692" stroke-width="22" fill="none" opacity=".85" stroke-linecap="round"/>' +
    '<path d="M0 0 L 244 0 C 248 60 238 120 248 170 C 256 220 240 270 246 300 L 0 300 Z" fill="url(#map_land)"/>' +
    '<g fill="#ffffff" opacity=".08">' +
    '<ellipse cx="60" cy="70" rx="46" ry="26"/>' +
    '<ellipse cx="150" cy="30" rx="40" ry="20"/>' +
    '<ellipse cx="90" cy="210" rx="50" ry="24"/>' +
    '<ellipse cx="190" cy="270" rx="44" ry="18"/>' +
    '<ellipse cx="40" cy="140" rx="34" ry="16"/>' +
    "</g>" +
    '<path d="M70 28 C 130 42 190 68 252 86" stroke="#86b8c6" stroke-width="7" fill="none" stroke-linecap="round" opacity=".85"/>' +
    '<path d="M60 208 C 130 198 190 214 252 228" stroke="#86b8c6" stroke-width="6" fill="none" stroke-linecap="round" opacity=".8"/>' +
    '<path d="M96 150 C 128 162 162 172 212 186" stroke="#86b8c6" stroke-width="4" fill="none" stroke-linecap="round" opacity=".6"/>' +
    '<g fill="#86b8c6" stroke="#6da29a" stroke-width="2">' +
    '<ellipse cx="88" cy="124" rx="26" ry="14"/>' +
    '<ellipse cx="120" cy="150" rx="22" ry="12"/>' +
    '<ellipse cx="86" cy="160" rx="18" ry="10"/>' +
    "</g>" +
    '<g stroke="#e6f0f2" opacity=".9">' +
    '<line x1="340" y1="142" x2="340" y2="104" stroke-width="1.8"/>' +
    '<path d="M340 104 L 326 96 M340 104 L 348 92 M340 104 L 340 88" stroke-width="1.3"/>' +
    '<line x1="372" y1="192" x2="372" y2="160" stroke-width="1.6"/>' +
    '<path d="M372 160 L 360 153 M372 160 L 379 150 M372 160 L 372 147" stroke-width="1.2"/>' +
    '<line x1="330" y1="250" x2="330" y2="218" stroke-width="1.6"/>' +
    '<path d="M330 218 L 319 211 M330 218 L 337 208 M330 218 L 330 205" stroke-width="1.2"/>' +
    "</g>" +
    '<path d="M300 180 q 5 -5 10 0 q 5 -5 10 0" stroke="#14343f" stroke-width="1.8" fill="none"/>' +
    '<path d="M356 76 q 5 -5 10 0 q 5 -5 10 0" stroke="#14343f" stroke-width="1.8" fill="none"/>' +
    '<text x="332" y="62" fill="#cfe8f2" opacity=".9" font-size="26" font-family="KaiTi, STKaiti, serif" letter-spacing="12">黄海</text>' +
    '<path d="M310 72 h14 M334 76 h14" stroke="#cfe8f2" stroke-width="1.4" opacity=".5" stroke-linecap="round"/>' +
    '<circle cx="392" cy="44" r="15" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.4)" stroke-width="1.4"/>' +
    '<polygon points="392,34 396.5,44 392,40.5 387.5,44" fill="#ffd9a0"/>' +
    '<text x="392" y="21" fill="#ffffff" font-size="10" text-anchor="middle" opacity=".75" font-family="Arial">N</text>' +
    '<circle cx="70" cy="272" r="4" fill="#ffffff" opacity=".8"/>' +
    '<circle cx="70" cy="272" r="8" fill="none" stroke="#ffffff" stroke-width="1.2" opacity=".5"/>' +
    '<text x="70" y="256" fill="#ffffff" font-size="11" text-anchor="middle" opacity=".8" letter-spacing="2">盐城市区</text>' +
    "</svg>";

  /* ---------- 右侧资料卡片 ---------- */
  function infoHtml(i) {
    var s = HM.sites[i];
    var tags = "";
    for (var k = 0; k < s.tags.length; k++) tags += "<span>" + esc(s.tags[k]) + "</span>";
    var facts = "";
    for (var f = 0; f < s.facts.length; f++) {
      facts += "<div class='f'><b>" + esc(s.facts[f][0]) + "</b><span>" + esc(s.facts[f][1]) + "</span></div>";
    }
    var chips = "";
    for (var c = 0; c < HM.sites.length; c++) {
      chips += "<button class='map-chip" + (c === i ? " active" : "") + "' data-i='" + c + "'>" + esc(HM.sites[c].n) + "</button>";
    }
    return (
      '<figure class="site-photo"><img src="' + s.photo + '" alt="' + esc(s.caption) + '" decoding="async"><figcaption>' + esc(s.caption) + '</figcaption></figure>' +
      "<h3>" + esc(s.n) + "</h3>" +
      "<div class='site-en'>" + esc(s.en) + "</div>" +
      "<div class='site-tags'>" + tags + "</div>" +
      "<div class='site-facts'>" + facts + "</div>" +
      "<p class='site-detail'>" + esc(s.detail) + "</p>" +
      "<div class='map-chips'>" + chips + "</div>" + HM.photoCredit
    );
  }

  function select(i) {
    HM.mapUI.current = i;
    var spots = document.querySelectorAll("#mapCanvas .map-spot");
    for (var p = 0; p < spots.length; p++) {
      spots[p].classList.toggle("active", parseInt(spots[p].getAttribute("data-i"), 10) === i);
      spots[p].setAttribute('aria-pressed', String(parseInt(spots[p].getAttribute('data-i'), 10) === i));
    }
    var info = document.getElementById("mapInfo");
    if (info) info.innerHTML = infoHtml(i);
    var chips = document.querySelectorAll("#mapInfo .map-chip");
    for (var q = 0; q < chips.length; q++) {
      chips[q].setAttribute('aria-pressed', String(parseInt(chips[q].getAttribute('data-i'), 10) === i));
      chips[q].addEventListener("click", (function (idx) {
        return function () { select(idx); };
      })(parseInt(chips[q].getAttribute("data-i"), 10)));
    }
  }

  HM.mapUI = {
    current: 0,
    build: function () {
      var canvas = document.getElementById("mapCanvas");
      if (!canvas || !HM.sites || !HM.sites.length) return;
      var spots = "";
      for (var i = 0; i < HM.sites.length; i++) {
        var s = HM.sites[i];
        spots +=
          "<button class='map-spot' aria-label='探索" + esc(s.n) + "' data-i='" + i + "' style='left:" + s.x + "%;top:" + s.y + "%;'>" +
          "<span>" + (i + 1) + "</span>" +
          "<i class='spot-label'>" + esc(s.n) + "</i></button>";
      }
      canvas.innerHTML = MAP_SVG + spots;
      var els = canvas.querySelectorAll(".map-spot");
      for (var j = 0; j < els.length; j++) {
        els[j].addEventListener("click", (function (idx) {
          return function () { select(idx); };
        })(parseInt(els[j].getAttribute("data-i"), 10)));
      }
      select(0);
    },
    select: select
  };
})();
