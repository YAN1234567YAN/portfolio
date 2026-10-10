/* 本地摄影素材。出处见 assets/photos/sources.json 与 图片来源.html。 */
(function () {
  'use strict';
  var HM = window.HM;
  var animalKeys = ['crane', 'deer', 'sandpiper', 'stork', 'spoonbill', 'parrotbill', 'gull', 'water-deer'];
  var siteKeys = ['tiaozini', 'reserve', 'dafeng', 'sheyang', 'jiulong'];
  var captions = ['条子泥 · 潮汐雕刻的海岸', '盐城珍禽保护区 · 鹤群栖息地', '大丰沿海湿地 · 麋鹿家园', '射阳沿海沙洲 · 区域实景', '九龙口 · 九河交汇的水乡'];
  animalKeys.forEach(function (key, i) { HM.animals[i].photo = 'assets/photos/' + key + '.jpg'; });
  siteKeys.forEach(function (key, i) { HM.sites[i].photo = 'assets/photos/' + key + '.jpg'; HM.sites[i].caption = captions[i]; });
  HM.photoCredit = '<a class="photo-credit" href="图片来源.html" target="_blank" rel="noopener">摄影作品 · 查看图片来源 ↗</a>';
})();
