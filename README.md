# 徐昊 · 个人作品网站

静态 HTML / CSS / JavaScript 网站。双击 index.html 即可打开，不需要安装依赖或启动服务。

## 页面

- index.html：个人首页、精选项目、能力实践、经历、荣誉与资料。
- gallery.html：33 张设计内容图版，支持分类、搜索和大图查看。
- project.html?id=wetland：毕业设计；其他案例为 contentflow、meijing、keycaps、eatwell、unity。
- video.html：视频创作演示页，抖音号 ycjdxyq，链接打开抖音账号搜索。
- tools.html：网页采集与视频处理软件项目。
- report.html?id=video / recruitment：两份原有产品分析报告的在线阅读。
- demos/wetland/、demos/unity/：可运行的静态项目演示。
- assets/documents/：简历、42 页作品集、毕业设计原稿和产品分析原稿。

## 修改与维护

个人项目和设计标题在 content.js，报告在 reports.js，页面在各 HTML 文件。基础样式在 site.css，视觉细节在 polish.css，交互在 site.js。图片、字体与精简 Lucide 图标均在本地，无运行时 CDN 依赖。作品图版保留完整原图，首页的部分预览按展示比例裁切。

media.js 与 assets/media-manifest.js 提供内嵌预览和不同尺寸的 WebP。作品先显示预览，再按屏幕宽度加载清晰图片；画廊大图沿用已显示的预览，并在可用网络下预加载相邻作品。sw.js 缓存已访问页面和图片，首次高清图仍需要网络下载。双击打开时预览功能可用；通过 HTTPS 或 localhost 访问时才启用持久缓存。

新增作品或修改文案后，可安装 Pillow、fonttools 和 brotli，运行 `python scripts/optimize-media.py` 更新媒体与字体；只修改文案时运行 `python scripts/optimize-media.py --fonts-only`。此脚本仅用于维护，网页运行和部署不需要 Python。修改已缓存的 CSS、JS 或图片后，同时更新 sw.js 的 CACHE 版本名称。

## 材料说明

所有经历、奖项与设计归属依据已有个人简历及作品集。AI 工作台截图来自无密钥隔离演示，统计样例不作为个人运营业绩。UI 作品是设计方案，软件项目的后台功能仍在原本的本地项目中。

毕业设计的摄影素材不是个人摄影，副本保留原项目来源说明。其公开使用许可尚未确认，公开部署前应换为许可明确素材或原项目已有插画。毕业设计报告为既有 17 页原稿，部分描述属于旧版本。

## 发布

使用 GitHub Pages 静态托管，相对路径兼容 /portfolio/ 子目录。仓库地址为 https://github.com/YAN1234567YAN/portfolio，页面地址为 https://yan1234567yan.github.io/portfolio/。更新 main 分支后由 GitHub Pages 发布。
