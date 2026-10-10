/* Lucide icons: ISC License, see lucide.LICENSE. Generated subset. */
(() => {
const shapes = {"arrow-left":[["path",{"d":"m12 19-7-7 7-7"}],["path",{"d":"M19 12H5"}]],"file-text":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M10 9H8"}],["path",{"d":"M16 13H8"}],["path",{"d":"M16 17H8"}]],"asterisk":[["path",{"d":"M12 5v14"}],["path",{"d":"m18.065 8.496-12.125 7"}],["path",{"d":"m5.94 8.504 12.125 7"}]],"search":[["path",{"d":"m21 21-4.34-4.34"}],["circle",{"cx":"11","cy":"11","r":"8"}]],"arrow-right":[["path",{"d":"M5 12h14"}],["path",{"d":"m12 5 7 7-7 7"}]],"x":[["path",{"d":"M18 6 6 18"}],["path",{"d":"m6 6 12 12"}]],"arrow-down-right":[["path",{"d":"m7 7 10 10"}],["path",{"d":"M17 7v10H7"}]],"arrow-up-right":[["path",{"d":"M7 7h10v10"}],["path",{"d":"M7 17 17 7"}]],"play":[["path",{"d":"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]],"map-pin":[["path",{"d":"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"}],["circle",{"cx":"12","cy":"10","r":"3"}]],"book-open":[["path",{"d":"M12 5v16"}],["path",{"d":"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"}]],"chart-no-axes-combined":[["path",{"d":"M12 16v5"}],["path",{"d":"M16 14.639V21"}],["path",{"d":"M20 10.656V21"}],["path",{"d":"m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"}],["path",{"d":"M4 18.463V21"}],["path",{"d":"M8 14.656V21"}]],"library":[["path",{"d":"m16 6 4 14"}],["path",{"d":"M12 6v14"}],["path",{"d":"M8 8v12"}],["path",{"d":"M4 4v16"}]],"download":[["path",{"d":"M12 15V3"}],["path",{"d":"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{"d":"m7 10 5 5 5-5"}]],"copy":[["rect",{"width":"14","height":"14","x":"8","y":"8","rx":"2","ry":"2"}],["path",{"d":"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]],"menu":[["path",{"d":"M4 5h16"}],["path",{"d":"M4 12h16"}],["path",{"d":"M4 19h16"}]],"arrow-up":[["path",{"d":"m5 12 7-7 7 7"}],["path",{"d":"M12 19V5"}]],"maximize-2":[["path",{"d":"M15 3h6v6"}],["path",{"d":"m21 3-7 7"}],["path",{"d":"m3 21 7-7"}],["path",{"d":"M9 21H3v-6"}]],"external-link":[["path",{"d":"M15 3h6v6"}],["path",{"d":"M10 14 21 3"}],["path",{"d":"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]],"scan-eye":[["path",{"d":"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{"d":"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{"d":"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{"d":"M7 21H5a2 2 0 0 1-2-2v-2"}],["circle",{"cx":"12","cy":"12","r":"1"}],["path",{"d":"M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"}]],"grid-2x2":[["path",{"d":"M12 3v18"}],["path",{"d":"M3 12h18"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]]};
const ns = 'http://www.w3.org/2000/svg';
window.lucide = { createIcons(options = {}) {
  document.querySelectorAll('i[data-lucide]').forEach(source => {
    const name = source.dataset.lucide;
    if (!shapes[name]) return;
    const svg = document.createElementNS(ns, 'svg');
    const attrs = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...(options.attrs || {}) };
    for (const [key, value] of Object.entries(attrs)) svg.setAttribute(key, String(value));
    svg.setAttribute('class', 'lucide lucide-' + name + (source.className ? ' ' + source.className : ''));
    for (const [tag, attributes] of shapes[name]) {
      const child = document.createElementNS(ns, tag);
      for (const [key, value] of Object.entries(attributes)) child.setAttribute(key, value);
      svg.appendChild(child);
    }
    source.replaceWith(svg);
  });
} };
})();
