/* Offline stroke icons. No icon font or network dependency. */
(function () {
  'use strict';
  var icons = {
    'house': '<path d="m3 10 9-7 9 7v10H3Z"/><path d="M9 20v-7h6v7"/>',
    'map-location-dot': '<path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2Z"/><path d="M9 3v16M15 5v16"/>',
    'dove': '<path d="M3 12c3 0 5-2 7-6 0 3 1 5 3 5l3-4a3 3 0 0 1 5 2l-2 2c-1 7-7 10-12 7Z"/><path d="m3 12 7 2M19 8h.01"/>',
    'circle-user': '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="9" r="3"/><path d="M5 18c2-5 12-5 14 0"/>',
    'circle-question': '<circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 5m0 3h.01"/>',
    'circle-info': '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10h.01"/>',
    'hand-holding-heart': '<path d="M12 11 7 6C3 1 0 8 5 11l7 6 7-6c5-3 2-10-2-5Z"/><path d="M3 21h18"/>',
    'feather': '<path d="M5 19C1 9 13 1 21 3c2 8-6 20-16 16Zm-2 2L16 8m-7 7h7"/>',
    'volume-high': '<path d="m11 4-6 5H2v6h3l6 5ZM15 8c3 2 3 6 0 8m3-11c5 4 5 10 0 14"/>',
    'volume-xmark': '<path d="m11 4-6 5H2v6h3l6 5ZM16 9l5 6m0-6-5 6"/>',
    'arrow-right': '<path d="M4 12h16m-6-6 6 6-6 6"/>',
    'arrow-left': '<path d="M20 12H4m6-6-6 6 6 6"/>',
    'chevron-right': '<path d="m9 5 7 7-7 7"/>',
    'xmark': '<path d="m6 6 12 12M6 18 18 6"/>',
    'user': '<circle cx="12" cy="7" r="4"/><path d="M4 21v-3c0-7 16-7 16 0v3"/>',
    'users': '<circle cx="9" cy="7" r="3"/><path d="M2 21v-3c0-7 14-7 14 0v3M17 4a3 3 0 0 1 0 6m2 4c3 1 3 4 3 7"/>',
    'lock': '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2"/>',
    'key': '<circle cx="8" cy="8" r="5"/><path d="m12 12 9 9m-5-5 3-3m0 6 3-3"/>',
    'at': '<circle cx="12" cy="12" r="4"/><path d="M16 8v7c0 4 6 2 6-3a10 10 0 1 0-4 8"/>',
    'right-to-bracket': '<path d="M14 3h7v18h-7M2 12h14m-5-5 5 5-5 5"/>',
    'arrow-right-from-bracket': '<path d="M10 3H3v18h7m0-9h12m-5-5 5 5-5 5"/>',
    'comment-dots': '<path d="M21 11c0 8-10 12-15 7l-4 3 1-7C-1 2 21-2 21 11Z"/><path d="M7 10h.01M12 10h.01M17 10h.01"/>',
    'bullhorn': '<path d="M3 9v6h5l12 5V4L8 9Zm5 6 2 6h4l-2-5M8 9v6"/>',
    'star': '<path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z"/>',
    'droplet': '<path d="M12 2S4 11 4 15a8 8 0 0 0 16 0c0-4-8-13-8-13Z"/>',
    'compass': '<circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6Z"/>',
    'gauge-high': '<path d="M3 18a10 10 0 1 1 18 0Zm9-3 5-7"/>',
    'envelope': '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 5 10 8L22 5"/>',
    'search': '<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/>'
  };
  icons['feather-pointed'] = icons.feather;
  icons['user-group'] = icons.users;
  icons['user-plus'] = icons.users;
  icons['shoe-prints'] = icons.compass;
  function paint(root) {
    var nodes = root.querySelectorAll('i.fa-solid:not([data-icon-ready])');
    nodes.forEach(function (node) {
      var key = Array.from(node.classList).find(function (c) { return c !== 'fa-solid' && c.indexOf('fa-') === 0; });
      node.dataset.iconReady = '1';
      node.setAttribute('aria-hidden', 'true');
      node.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + (icons[(key || '').slice(3)] || icons.feather) + '</svg>';
    });
  }
  paint(document);
  new MutationObserver(function () { paint(document); }).observe(document.body, {childList:true, subtree:true});
})();
