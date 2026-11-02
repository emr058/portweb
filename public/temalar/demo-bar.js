// Portfolyodaki demo kopyalarına eklenir; tema kaynağında yoktur. Çerçeve içinde (görüntüleyicide) gizlenir.
(function () {
  if (window.self !== window.top) return;
  var tag = document.currentScript;
  var id = tag && tag.getAttribute('data-theme');
  if (!id) return;
  var bar = document.createElement('div');
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', 'Demo bilgisi');
  bar.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:2147483000;display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap;padding:10px 16px;background:#0b1424;color:#edf2fa;font:500 15px/1.3 system-ui,-apple-system,Segoe UI,sans-serif;';
  var a = 'color:inherit;text-decoration:none;min-height:44px;display:inline-flex;align-items:center;';
  bar.innerHTML = '<a href="/temalar" style="' + a + '">← Tüm demolar</a>' +
    '<span style="flex:1 1 220px;color:#a9b8cc">Bu bir örnek demodur. İçerik ve fotoğraflar değişir.</span>' +
    '<a href="/basvuru?tema=' + encodeURIComponent(id) + '" style="' + a + 'padding:0 18px;background:#c2d8ff;color:#10213c;font-weight:600">Bu tasarımı iste</a>';
  document.body.appendChild(bar);
  document.body.style.paddingBottom = (bar.offsetHeight + 8) + 'px';
})();
