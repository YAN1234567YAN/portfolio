window.PORTFOLIO = {
  name: '徐昊', email: '2327149251@qq.com', douyin: 'ycjdxyq',
  projects: [
    {
      id: 'wetland', title: '鹤鸣盐城', subtitle: '黄海湿地互动数字应用', category: 'development', label: '交互设计 / 前端开发', type: '毕业设计', year: '2026',
      cover: 'assets/projects/wetland-preview.webp', color: '#d6e8de',
      intro: '把家乡湿地，变成一册可以探索的数字自然手册。',
      role: '内容规划、信息架构、视觉与交互、前端实现',
      stack: ['HTML / CSS / JavaScript', 'Canvas 2D', 'Web Audio API', 'localStorage'],
      problem: '生态科普需要让人愿意探索。这个毕业设计将湿地景观、生灵知识与互动问答组织成移动应用式体验，让阅读、识别和参与形成连续的路径。',
      work: ['将 5 处湿地导览、8 种生灵图鉴和 8 道问答组织成清晰的应用结构。', '实现搜索、分类、详情、即时判题与个人成绩记录，并提供游客入口。', '完成 Canvas 片头、合成环境音和桌面 / 手机适配，交付完整应用与毕业设计报告。'],
      result: '可运行的静态交互应用、使用说明、答辩材料与毕业设计报告。',
      note: '账号、留言与成绩保存在当前浏览器，属于本地交互演示。摄影素材来自项目中的来源记录，非个人摄影作品；公开使用授权尚待确认。报告为已有原稿，部分插画描述对应早期版本。',
      links: [{ label: '体验毕业设计', href: 'demos/wetland/index.html', icon: 'arrow-up-right' }, { label: '毕业设计报告', href: 'assets/documents/xuhao-graduation-report.pdf', icon: 'file-text' }, { label: '摄影素材来源', href: 'demos/wetland/图片来源.html', icon: 'external-link' }],
      images: ['assets/projects/wetland-mobile.png', 'assets/projects/wetland-map.png', 'assets/projects/wetland-gallery.png'],
      captions: ['应用首页', '湿地导览', '生灵图鉴']
    },
    {
      id: 'contentflow', title: '创流 · AI 工作台', subtitle: '内容生产 AI 智能体工作流', category: 'development', label: 'AI 产品 / 软件开发', type: '个人项目', year: '2026.04 - 06',
      cover: 'assets/projects/ai-preview.webp', color: '#ededf1',
      intro: '让一次创意，成为可审核、可追踪的内容生产流程。',
      role: '需求分析、产品结构、业务节点、界面与开发整合',
      stack: ['Node.js', 'SQLite', 'Python / LangGraph', 'HTTP API'],
      problem: '选题、脚本、素材、交付和复盘散落在多个工具中。我将这些阶段组织进桌面 Web 工作空间，在关键节点保留人工确认，让流程状态与产物可以被追踪。',
      work: ['设计需求 → 选题 → 人工采纳 → 脚本分镜 → 素材任务 → 交付登记 → 复盘的内容流程。', '结合 LangGraph 状态图、Node.js 业务规则与 SQLite 存储，实现业务校验、分支执行和检查点。', '实现通用 HTTP 工具连接、异步任务记录、CSV / JSON 数据导入与独立管理页面。'],
      result: '本地工作台、后台管理、API 文档、隔离测试与开发方案。基于开源框架开发业务节点，使用 AI 辅助需求分析、编码与测试。',
      note: '本页为隔离演示环境的真实界面截图。历史内容和统计为演示数据；素材、成片及发布按真实产物或人工记录登记。完整应用依赖本地后端。',
      links: [{ label: '查看界面流程', href: '#project-images', icon: 'scan-eye' }, { label: 'AI 视频竞品分析', href: 'report.html?id=video', icon: 'file-text' }],
      images: ['assets/projects/ai-workflow.png', 'assets/projects/ai-script.png', 'assets/projects/ai-tools.png'],
      captions: ['选题与人工审核流程', '脚本与分镜阶段', '工具连接界面']
    },
    {
      id: 'meijing', title: '梅景合院', subtitle: '民宿品牌视觉系统', category: 'design', label: '品牌策略 / 视觉设计', type: '品牌设计', year: '作品集',
      cover: 'assets/projects/brand-preview.webp', color: '#418a89',
      intro: '从一片屋瓦，延展出完整的民宿品牌语言。',
      role: '品牌定位、标志、视觉规范与应用延展', stack: ['Illustrator', 'Photoshop', '视觉识别系统'],
      problem: '围绕南昌梅岭民宿的目标客群，建立带有返璞归真气质的品牌识别。用简化的屋瓦形态与青绿色形成稳定的视觉语言。',
      work: ['从民宿客群与品牌定位出发，提炼屋瓦图形并组织标志组合。', '将图形、色彩和字体贯穿名片、纸品、门牌与营业信息。', '用实际应用图版说明品牌在不同接触点中的一致性。'],
      result: '品牌标志、定位说明、基础视觉与应用图版。第十一届未来设计师全国高校数字艺术设计大赛浙江省赛区一等奖。',
      note: '奖项与项目名称来自个人简历及作品集记录。',
      links: [{ label: '完整作品集', href: 'assets/documents/xuhao-portfolio.pdf', icon: 'file-text' }],
      images: ['brand-02', 'brand-03', 'brand-04', 'brand-05', 'brand-06'].map(x => 'assets/design/images/' + x + '.webp'),
      captions: ['标志与品牌说明', '客群与定位', '品牌叙事', '基础视觉应用', '空间与导视应用']
    },
    {
      id: 'keycaps', title: '键帽与文创', subtitle: '从屏幕图形，到实体产品', category: 'design', label: '图形设计 / 产品应用', type: '系列设计', year: '作品集',
      cover: 'assets/projects/keycap-preview.webp', color: '#d1e781',
      intro: '把一个主题，铺进每一颗键帽和每一次开箱。',
      role: '主题视觉、键位图案、包装与周边延展', stack: ['Illustrator', 'Photoshop', '图形与包装设计'],
      problem: '键帽不只是单张图案。系列设计需要兼顾不同键位的阅读、主题识别，以及包装和周边的一致表达。',
      work: ['围绕潘朵拉之星、北极熊和企鹅、去野餐吧等主题，建立各自的图形语言。', '将角色与主题图案适配到不同键位，形成完整的键位图版。', '延展包装、感谢卡与主题周边，并通过实物照片展示落地形态。'],
      result: '键位设计图版、包装展开图、主题周边与实物展示。',
      links: [{ label: '完整作品集', href: 'assets/documents/xuhao-portfolio.pdf', icon: 'file-text' }],
      images: ['keycap-02', 'keycap-03', 'keycap-04', 'keycap-05', 'keycap-06', 'keycap-07'].map(x => 'assets/design/images/' + x + '.webp'),
      captions: ['潘朵拉之星 · 键位设计', '潘朵拉之星 · 包装与实物', '北极熊和企鹅 · 主题设计', '北极熊和企鹅 · 实物展示', '去野餐吧 · 键位设计', '去野餐吧 · 包装与实物']
    },
    {
      id: 'eatwell', title: '食好 App', subtitle: '美食文化分享界面设计', category: 'design', label: 'UI / 信息设计', type: '界面设计', year: '作品集',
      cover: 'assets/projects/ui-preview.webp', color: '#fff4ce',
      intro: '让美食内容的发现、阅读和分享更有秩序。',
      role: '产品定位、标志与移动端界面表达', stack: ['移动端 UI', '图标设计', '视觉与信息层级'],
      problem: '围绕美食文化推广与学习分享场景，探索首页推荐、内容浏览、食谱详情和个人中心的组织方式。',
      work: ['为产品建立食好标志和温暖的视觉基调。', '组织关注、推荐、内容分类、消息与个人中心等页面层级。', '设计图文内容与食谱详情，让图片、材料与步骤各有明确位置。'],
      result: '产品定位图版、标志、页面设计与内容详情界面。',
      note: '本作品为界面设计方案，未作为已上线 App 展示。',
      links: [{ label: '查看全部 UI 图版', href: 'gallery.html?category=ui', icon: 'grid-2x2' }],
      images: ['ui-03', 'ui-04', 'ui-05', 'ui-06', 'ui-07'].map(x => 'assets/design/images/' + x + '.webp'),
      captions: ['产品标志', '定位与功能结构', '启动、登录与引导', '内容流与个人中心', '内容与食谱详情']
    },
    {
      id: 'unity', title: 'Unity 学习导航', subtitle: '可检索的特效课程资源产品', category: 'development', label: '前端开发 / 资源组织', type: '个人工具', year: '2026',
      cover: 'assets/projects/unity-courses.png', color: '#18191c',
      intro: '把零散课程，变成一条有方向的学习路径。',
      role: '资源组织、信息架构与前端交互', stack: ['HTML / CSS / JavaScript', '搜索与筛选', 'URL 状态同步'],
      problem: '学习 Shader、粒子和 VFX Graph 时，课程常散落在多个页面。这个导航用课程分类、难度与学习路线，帮助使用者按目标找到资源。',
      work: ['整理 71 门课程、6 个分类，并组织四阶段学习路线。', '实现关键词搜索、难度筛选、排序、空状态与一键重置。', '将筛选同步到 URL，支持分享当前条件，并提供原作者课程入口。'],
      result: '可运行的静态课程导航，数据版本为 2026-06-18。',
      note: '课程内容归各原作者所有，本项目展示资源组织与前端开发能力。页面使用本地整理数据。',
      links: [{ label: '打开课程导航', href: 'demos/unity/index.html', icon: 'arrow-up-right' }],
      images: ['assets/projects/unity-courses.png'], captions: ['课程筛选与学习路线']
    }
  ],
  categories: [
    { id: 'brand', title: '品牌设计', count: 6 }, { id: 'poster', title: '海报设计', count: 6 },
    { id: 'logo', title: '标志设计', count: 7 }, { id: 'ui', title: 'UI 与图标', count: 7 },
    { id: 'keycap', title: '键帽与包装', count: 7 }, { id: 'other', title: 'IP 与文创', count: 5 }
  ],
  galleryTitles: {
    brand: ['品牌设计 · 章节页', '梅景合院 · 标志与理念', '梅景合院 · 定位与辅助图形', '梅景合院 · 品牌叙事', '梅景合院 · 名片与纸品', '梅景合院 · 招牌与导视'],
    poster: ['海报设计 · 章节页', '阅读与书展活动海报', '校园活动海报与易拉宝', '反诈告示 · 系列海报', '中秋、国庆与元旦海报', '廉洁主题与山水画展海报'],
    logo: ['标志设计 · 章节页', '诗画江南 活力浙江 · 标志释义', '诗画江南 活力浙江 · 标准色', '诗画江南 活力浙江 · 视觉应用', '宁波家风馆 · 标志释义', '家风主题 · 友勤忍孝海报', '宁波家风馆 · 文创应用'],
    ui: ['UI 界面设计 · 章节页', '系统功能图标设计', '食好 App · 标志', '食好 App · 定位与功能', '食好 App · 启动、登录与引导', '食好 App · 内容流与个人中心', '食好 App · 菜品详情与做法'],
    keycap: ['键帽设计 · 章节页', '潘朵拉之星 · 键位与图形', '潘朵拉之星 · 包装与实物', '北极熊和企鹅 · 键位与图形', '北极熊和企鹅 · 包装与实物', '去野餐吧 · 键位与图形', '去野餐吧 · 包装与实物'],
    other: ['小治 IP · 角色形象', '小治 IP · 角色设定', '小治 IP · 三视图、表情与应用', '龙年文创 · 图形与红包', '龙年文创 · 系列产品']
  }
};
