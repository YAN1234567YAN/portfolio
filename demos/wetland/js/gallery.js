/* =========================================================
   鹤鸣盐城 · 生灵图鉴（卡片网格 + 详情弹窗）
   ========================================================= */
(function () {
  "use strict";
  var HM = (window.HM = window.HM || {});
  var filter = 'all', query = '', wired = false;

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* ---------- 渲染卡片 ---------- */
  HM.gallery = {
    build: function () {
      var grid = document.getElementById("animalGrid");
      if (!grid || !HM.animals) return;
      var html = "";
      var count = 0;
      for (var i = 0; i < HM.animals.length; i++) {
        var a = HM.animals[i];
        var category = ['麋鹿', '獐'].indexOf(a.n) >= 0 ? 'mammal' : 'bird';
        if ((filter !== 'all' && category !== filter) || (a.n + a.en + a.brief).toLowerCase().indexOf(query) < 0) continue;
        count++;
        html +=
          '<button class="animal-card" data-i="' + i + '" aria-label="认识' + esc(a.n) + '">' +
          '<div class="animal-photo"><img src="' + a.photo + '" alt="' + esc(a.n) + '实拍照片" loading="lazy" decoding="async"></div>' +
          '<span class="animal-index">FIELD NOTE / 0' + (i + 1) + '</span>' +
          "<h3>" + esc(a.n) + "</h3>" +
          '<span class="animal-en">' + esc(a.en) + '</span>' +
          '<span class="tag">' + esc(a.level) + "</span>" +
          "<p>" + esc(a.brief) + "</p>" +
          "</button>";
      }
      grid.innerHTML = html || '<div class="gallery-empty"><i class="fa-solid fa-search"></i><h3>暂时没有找到这位朋友</h3><p>试试“鹤”“鹿”，或切换到全部分类。</p></div>';
      document.getElementById('galleryCount').textContent = '收录 ' + count + ' 位湿地居民';
      var cards = grid.querySelectorAll(".animal-card");
      for (var j = 0; j < cards.length; j++) {
        cards[j].addEventListener("click", (function (idx) {
          return function () { HM.gallery.open(idx); };
        })(Number(cards[j].dataset.i)));
      }
      if (!wired) {
        wired = true;
        document.getElementById('animalSearch').addEventListener('input', function () { query = this.value.trim().toLowerCase(); HM.gallery.build(); });
        document.querySelectorAll('[data-filter]').forEach(function (button) {
          button.addEventListener('click', function () {
            filter = button.dataset.filter;
            document.querySelectorAll('[data-filter]').forEach(function (item) { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); });
            HM.gallery.build();
          });
        });
      }
    },

    /* ---------- 详情弹窗 ---------- */
    open: function (i) {
      var a = HM.animals[i];
      if (!a) return;
      var tags = "";
      for (var k = 0; k < a.tags.length; k++) {
        tags += "<span>" + esc(a.tags[k]) + "</span>";
      }
      var html =
        '<button class="modal-close" data-close="1">✕</button>' +
        '<figure class="animal-portrait"><img src="' + a.photo + '" alt="' + esc(a.n) + '实拍照片"><figcaption>' + HM.photoCredit + '</figcaption></figure>' +
        "<h2>" + esc(a.n) + "</h2>" +
        '<div class="m-en">' + esc(a.en) + " · " + esc(a.latin) + "</div>" +
        '<div class="m-tags">' + tags + "</div>" +
        "<p><b>" + esc(a.level) + "。</b>" + esc(a.detail) + "</p>" +
        '<div class="m-fact"><b>💡 你知道吗：</b>' + esc(a.fact) + "</div>";
      if (HM.modal) HM.modal.open(html);
    }
  };
})();
