/* =========================================================
   鹤鸣盐城 · 黄海湿地互动数字作品 —— 数据文件
   包含：站点文案、动物图鉴（含矢量插画）、互动题库
   ========================================================= */
(function () {
  "use strict";
  var HM = (window.HM = window.HM || {});

  /* ---------- 全局文案 ---------- */
  HM.copy = {
    site: "中国黄（渤）海候鸟栖息地（第一期）于 2019 年列入《世界遗产名录》，成为我国第 54 处世界遗产、江苏首个世界自然遗产，其核心区域就在盐城。这里拥有太平洋西岸与亚洲大陆边缘面积最大、保存最完好的海岸型湿地，是东亚—澳大利西亚候鸟迁飞路线上最重要的“中转站”和“加油站”。",
    homeTitle: "鹤鸣盐城",
    homeSub: "黄海湿地互动数字作品",
    homeDesc1: "用数字技术讲述家乡故事 —— 这里是世界自然遗产地：<b>中国黄（渤）海候鸟栖息地</b>。",
    homeDesc2: "每年数百万只候鸟在此停歇、越冬与繁衍。请随我走进这片会呼吸的滩涂，认识湿地生灵，思考人与自然的未来。"
  };

  /* ---------- 首页模块卡片（ic 为 Font Awesome 类名） ---------- */
  HM.modules = [
    { id: "map",     ic: "fa-solid fa-map-location-dot", t: "湿地导览", d: "沿海岸，发现自然秘境" },
    { id: "gallery", ic: "fa-solid fa-dove", t: "生灵图鉴", d: "与 8 位湿地居民相遇" },
    { id: "quiz",    ic: "fa-solid fa-circle-question", t: "湿地问答", d: "开启你的自然知识挑战" },
    { id: "pledge",  ic: "fa-solid fa-hand-holding-heart", t: "守护宣言", d: "把热爱化作日常行动" }
  ];
})();
  /* ---------- 动物图鉴 ---------- */
  window.HM.animals = [
    {
      n: "丹顶鹤", en: "Red-crowned Crane", latin: "Grus japonensis", level: "国家一级保护动物",
      tags: ["世界易危", "长寿之鸟", "盐城越冬旗舰物种"],
      brief: "头顶一点丹红，人称“仙鹤”，是盐城黄海湿地最闪亮的明星。",
      detail: "丹顶鹤体态优雅、寿命可达五六十年，是我国传统文化中“松鹤延年”的象征。每年 11 月至次年 3 月，大批丹顶鹤从北方飞来盐城越冬。江苏盐城湿地珍禽国家级自然保护区，正是丹顶鹤最主要的越冬地之一，每年约有上千只丹顶鹤在此栖息。",
      fact: "上世纪 80 年代，护鹤姑娘徐秀娟为寻找走失的丹顶鹤献出生命，长眠于盐城的滩涂上。歌曲《一个真实的故事》传唱至今，让无数人记住了这片鹤之家园与守护者的精神。",
      art: `<g>
        <line x1="112" y1="124" x2="112" y2="146" stroke="#26221e" stroke-width="3" stroke-linecap="round"/>
        <line x1="126" y1="124" x2="126" y2="146" stroke="#26221e" stroke-width="3" stroke-linecap="round"/>
        <ellipse cx="86" cy="112" rx="15" ry="9" fill="#26221e"/>
        <ellipse cx="124" cy="112" rx="28" ry="17" fill="#ffffff"/>
        <ellipse cx="130" cy="106" rx="20" ry="8" fill="#eef3f0"/>
        <path d="M120 100 C 134 92 146 86 152 68" stroke="#ffffff" stroke-width="9" fill="none" stroke-linecap="round"/>
        <path d="M118 100 C 128 95 132 90 134 85" stroke="#26221e" stroke-width="4" fill="none" stroke-linecap="round"/>
        <circle cx="152" cy="63" r="6.5" fill="#ffffff" stroke="#cfd8d2" stroke-width="1"/>
        <ellipse cx="149" cy="57" rx="4.6" ry="3.2" fill="#d93a2b"/>
        <polygon points="157,60 177,62 157,67" fill="#3a3a3a"/>
      </g>`
    },
    {
      n: "麋鹿", en: "Père David's Deer", latin: "Elaphurus davidianus", level: "国家一级保护动物",
      tags: ["中国特有", "四不像", "野外绝迹后回归"],
      brief: "角似鹿非鹿、脸似马非马，传奇的“四不像”在大丰安了家。",
      detail: "麋鹿是中国的特有物种，因“角似鹿、面似马、蹄似牛、尾似驴”而得名“四不像”。它曾因栖息地丧失而在中国本土绝迹，后经多方努力从海外引回。位于盐城的大丰麋鹿国家级自然保护区，如今拥有世界上最大的麋鹿野生种群，数量已突破八千头。",
      fact: "大丰保护区为麋鹿打造了 78000 公顷的滨海家园，这里不仅是麋鹿的乐园，也是黄海湿地生物多样性的缩影，见证了“人与自然和谐共生”的中国方案。",
      art: `<g>
        <line x1="84" y1="106" x2="80" y2="146" stroke="#6b4a26" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="116" y1="106" x2="121" y2="146" stroke="#6b4a26" stroke-width="3.5" stroke-linecap="round"/>
        <ellipse cx="106" cy="102" rx="42" ry="20" fill="#8a5a33"/>
        <ellipse cx="120" cy="111" rx="26" ry="9" fill="#a5713f"/>
        <path d="M88 92 C 80 84 74 78 66 80" stroke="#8a5a33" stroke-width="12" fill="none" stroke-linecap="round"/>
        <ellipse cx="59" cy="78" rx="8" ry="12" fill="#8a5a33" transform="rotate(-16 59 78)"/>
        <ellipse cx="53" cy="69" rx="6" ry="4" fill="#8a5a33" transform="rotate(-26 53 69)"/>
        <ellipse cx="63" cy="68" rx="6" ry="4" fill="#8a5a33" transform="rotate(12 63 68)"/>
        <path d="M66 74 C 64 58 72 44 84 38" stroke="#5c3f22" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <path d="M84 38 C 96 34 105 38 110 46" stroke="#5c3f22" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M78 52 L 94 44" stroke="#5c3f22" stroke-width="3" stroke-linecap="round"/>
        <circle cx="56" cy="76" r="1.7" fill="#26221e"/>
        <path d="M146 98 q 12 -2 13 -10" stroke="#7a5230" stroke-width="3" fill="none" stroke-linecap="round"/>
      </g>`
    },
    {
      n: "勺嘴鹬", en: "Spoon-billed Sandpiper", latin: "Calidris pygmaea", level: "国家一级保护动物",
      tags: ["全球极危", "世界最濒危鸟类之一", "条子泥常客"],
      brief: "喙像一把小勺子，是全球最濒危的鸟类之一，盐城是它的“生命驿站”。",
      detail: "勺嘴鹬体型小巧，最特别的是它那像小勺子一样的喙，可以在滩涂泥浆里“扫食”小生物。它每年往返于西伯利亚繁殖地与东南亚越冬地之间，行程上万公里。盐城条子泥等滩涂是它迁徙途中最重要的补给站，全球种群数量仅有数百只，每一只都弥足珍贵。",
      fact: "条子泥湿地被誉为勺嘴鹬的“加油站”。科研人员曾连续多年在条子泥记录到全球种群近一半数量的勺嘴鹬在此停歇觅食，可见这片滩涂对全球物种保护有多重要。",
      art: `<g>
        <line x1="112" y1="122" x2="112" y2="146" stroke="#c99a5e" stroke-width="2.6" stroke-linecap="round"/>
        <line x1="124" y1="122" x2="124" y2="146" stroke="#c99a5e" stroke-width="2.6" stroke-linecap="round"/>
        <ellipse cx="120" cy="110" rx="17" ry="12" fill="#b7a183"/>
        <ellipse cx="124" cy="114" rx="11" ry="6" fill="#efe6d8"/>
        <circle cx="104" cy="100" r="7.5" fill="#b7a183"/>
        <circle cx="101" cy="98" r="1.4" fill="#26221e"/>
        <path d="M98 100 L 83 107" stroke="#3a3a3a" stroke-width="3.2" stroke-linecap="round"/>
        <circle cx="80" cy="109" r="3.4" fill="#2c2c2c"/>
        <path d="M110 95 l -7 -6" stroke="#8a6f4e" stroke-width="3" stroke-linecap="round"/>
      </g>`
    },
    {
      n: "东方白鹳", en: "Oriental Stork", latin: "Ciconia boyciana", level: "国家一级保护动物",
      tags: ["濒危物种", "湿地“白衣卫士”", "候鸟迁飞明星"],
      brief: "一身白衣、朱红长喙，被称为湿地里的“白衣卫士”。",
      detail: "东方白鹳是大型涉禽，站立时身高可达一米多，通体雪白，翅膀末端为黑色，喙和长腿呈鲜艳的红色。它们性情机警，喜欢在开阔的浅水湿地觅食鱼虾。作为濒危物种，东方白鹳在迁徙途中会在盐城沿海湿地停歇休整，补充长途飞行消耗的能量。",
      fact: "东方白鹳全球种群数量稀少，近年来在盐城湿地被观测到的个体数逐年增多，说明黄海湿地的生态修复正在产生实实在在的效果，越来越多的濒危鸟类愿意“落脚”。",
      art: `<g>
        <line x1="116" y1="122" x2="116" y2="148" stroke="#e2574b" stroke-width="3" stroke-linecap="round"/>
        <line x1="130" y1="122" x2="130" y2="148" stroke="#e2574b" stroke-width="3" stroke-linecap="round"/>
        <ellipse cx="90" cy="112" rx="15" ry="10" fill="#26221e"/>
        <ellipse cx="124" cy="108" rx="27" ry="18" fill="#ffffff"/>
        <ellipse cx="116" cy="100" rx="18" ry="9" fill="#26221e"/>
        <path d="M126 96 C 138 88 148 84 156 66" stroke="#ffffff" stroke-width="8.5" fill="none" stroke-linecap="round"/>
        <circle cx="158" cy="61" r="6.2" fill="#ffffff" stroke="#d5ddd7" stroke-width="1"/>
        <polygon points="154,59 130,55 153,67" fill="#e2574b"/>
        <circle cx="161" cy="59" r="1.3" fill="#26221e"/>
      </g>`
    },
    {
      n: "黑脸琵鹭", en: "Black-faced Spoonbill", latin: "Platalea minor", level: "国家一级保护动物",
      tags: ["全球濒危", "会“扫水”的觅食高手", "迁徙过境盐城"],
      brief: "黑色的脸上长着扁平的“饭勺嘴”，在浅水里左右扫动觅食。",
      detail: "黑脸琵鹭因脸部裸露皮肤呈黑色而得名，它的喙又长又扁、末端扩大成勺状，觅食时会把喙探入水中左右摆动，“扫”到小鱼小虾。它们繁殖于朝鲜半岛等地，冬季迁往我国南方越冬，迁徙途中常在盐城沿海滩涂停歇休整，是湿地生态质量的“指示物种”。",
      fact: "由于栖息地退化，黑脸琵鹭全球种群一度不足千只。经过多年保护，如今全球数量已回升到 6000 只以上——盐城等滨海湿地正是支撑这一奇迹的关键节点之一。",
      art: `<g>
        <line x1="122" y1="118" x2="120" y2="148" stroke="#1f1f1f" stroke-width="2.6" stroke-linecap="round"/>
        <line x1="136" y1="118" x2="140" y2="148" stroke="#1f1f1f" stroke-width="2.6" stroke-linecap="round"/>
        <ellipse cx="140" cy="106" rx="24" ry="15" fill="#ffffff"/>
        <path d="M134 97 C 128 89 120 86 113 78" stroke="#ffffff" stroke-width="7" fill="none" stroke-linecap="round"/>
        <circle cx="111" cy="74" r="6.6" fill="#ffffff"/>
        <path d="M107 70 c -5 0 -8 3 -9 7 c 0 4 3 7 7 7 c 4 0 7 -3 7 -7 c 0 -4 -3 -7 -5 -7 z" fill="#26221e"/>
        <path d="M98 78 C 88 76 76 75 66 74" stroke="#26221e" stroke-width="4.4" fill="none" stroke-linecap="round"/>
        <ellipse cx="62" cy="74" rx="7" ry="3.4" fill="#26221e"/>
        <circle cx="108" cy="72" r="1.2" fill="#ffffff"/>
      </g>`
    },
    {
      n: "震旦鸦雀", en: "Reed Parrotbill", latin: "Paradoxornis heudei", level: "国家二级保护动物",
      tags: ["中国特有", "“鸟中大熊猫”", "芦苇丛居民"],
      brief: "住在芦苇丛里的小精灵，因名字古老稀有，被称为“鸟中大熊猫”。",
      detail: "震旦鸦雀是中国特有的珍稀鸟种，“震旦”是古印度对中国的称呼，寓意“中国之鸟”。它喜欢成群生活在芦苇丛中，用粗短有力的喙撕开芦苇秆，捕食其中的昆虫。随着芦苇湿地退化，震旦鸦雀一度难觅踪迹，如今在盐城的芦苇荡里又能听到它们“嗒嗒”的啄食声。",
      fact: "震旦鸦雀分布区域狭窄、对芦苇湿地依赖极强，因此被科学界视为湿地生态健康的“哨兵”。保护芦苇荡，就是在保护这个物种的全部家园。",
      art: `<g>
        <path d="M162 150 C 160 110 158 66 156 18" stroke="#7c8a3d" stroke-width="3.6" fill="none" stroke-linecap="round"/>
        <path d="M158 104 L 102 110" stroke="#7c8a3d" stroke-width="2.8" stroke-linecap="round"/>
        <path d="M146 78 L 136 70" stroke="#7c8a3d" stroke-width="2.6" fill="none" stroke-linecap="round"/>
        <ellipse cx="124" cy="94" rx="16" ry="11" fill="#c08a52"/>
        <ellipse cx="122" cy="99" rx="12" ry="6" fill="#ead7b3"/>
        <path d="M108 88 q -12 -4 -20 -2" stroke="#a9713b" stroke-width="5" fill="none" stroke-linecap="round"/>
        <ellipse cx="120" cy="92" rx="11" ry="6" fill="#a9713b"/>
        <circle cx="138" cy="82" r="9" fill="#c08a52"/>
        <circle cx="141" cy="80" r="1.6" fill="#26221e"/>
        <polygon points="145,82 160,86 145,90" fill="#d9772f"/>
        <path d="M122 103 L 121 110" stroke="#9a6b3c" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M130 104 L 131 110" stroke="#9a6b3c" stroke-width="2.2" stroke-linecap="round"/>
      </g>`
    },
    {
      n: "黑嘴鸥", en: "Saunders's Gull", latin: "Saundersilarus saundersi", level: "国家一级保护动物",
      tags: ["全球易危", "盐城重要繁殖地", "滩涂上的“黑衣绅士”"],
      brief: "繁殖季戴上“黑头巾”的珍稀海鸥，在盐城滩涂生儿育女。",
      detail: "黑嘴鸥是世界濒危鸟类，全球种群仅一万余只。繁殖季节它的头颈变成黑色，像是戴上了一顶黑色礼帽，举止优雅。它选择在滩涂高处筑巢繁殖，盐城沿海湿地是其全球重要的繁殖地之一，每年春夏都有大量黑嘴鸥在此繁衍后代。",
      fact: "黑嘴鸥对繁殖地要求极为苛刻，潮位、植被、食物缺一不可。盐城通过退养还湿、生态修复，为黑嘴鸥保住了“育婴房”，是湿地保护成效的生动例证。",
      art: `<g>
        <line x1="120" y1="118" x2="118" y2="146" stroke="#c0442f" stroke-width="2.8" stroke-linecap="round"/>
        <line x1="134" y1="118" x2="138" y2="146" stroke="#c0442f" stroke-width="2.8" stroke-linecap="round"/>
        <ellipse cx="136" cy="106" rx="25" ry="16" fill="#ffffff"/>
        <ellipse cx="134" cy="102" rx="21" ry="9" fill="#c7d0d5"/>
        <ellipse cx="112" cy="104" rx="7" ry="6" fill="#26221e"/>
        <path d="M122 93 C 116 92 112 92 108 94" stroke="#ffffff" stroke-width="6" fill="none" stroke-linecap="round"/>
        <circle cx="106" cy="93" r="8" fill="#26221e"/>
        <circle cx="103" cy="91" r="2" fill="#ffffff"/>
        <polygon points="99,94 86,95 99,100" fill="#26221e"/>
        <ellipse cx="149" cy="113" rx="5" ry="3" fill="#26221e"/>
      </g>`
    },
    {
      n: "獐", en: "Chinese Water Deer", latin: "Hydropotes inermis", level: "国家二级保护动物",
      tags: ["中国特有", "无角小鹿", "滩涂与芦苇荡居民"],
      brief: "没有犄角的小鹿，雄獐嘴角还露出两颗小獠牙，胆小又机警。",
      detail: "獐又名河麂，是中国特有的小型鹿科动物。它不似其他鹿类头顶长角，雄性獐的“武器”是上颌露出的两颗细长獠牙。獐喜欢在滩涂、芦苇和草丛中活动，善于游泳，遇到危险会躲入水中。历史上獐曾在长江中下游广泛分布，如今盐城的湿地保护区为它保留了珍贵的家园。",
      fact: "“盐城”的“盐”字之外，这片土地古称“麋鹿之乡”“獐鹿之场”，獐与麋鹿共同见证着黄海湿地千万年的生态变迁，是湿地中的“原住民”。",
      art: `<g>
        <line x1="92" y1="108" x2="90" y2="148" stroke="#8a6a42" stroke-width="3" stroke-linecap="round"/>
        <line x1="108" y1="108" x2="110" y2="148" stroke="#8a6a42" stroke-width="3" stroke-linecap="round"/>
        <line x1="134" y1="108" x2="136" y2="148" stroke="#8a6a42" stroke-width="3" stroke-linecap="round"/>
        <line x1="150" y1="106" x2="152" y2="148" stroke="#8a6a42" stroke-width="3" stroke-linecap="round"/>
        <ellipse cx="118" cy="100" rx="40" ry="18" fill="#b98a54"/>
        <ellipse cx="128" cy="108" rx="25" ry="8" fill="#d2a86f"/>
        <path d="M144 92 C 150 88 156 88 160 90" stroke="#b98a54" stroke-width="9" fill="none" stroke-linecap="round"/>
        <ellipse cx="164" cy="89" rx="8" ry="7" fill="#c1915a"/>
        <ellipse cx="173" cy="90" rx="6" ry="4" fill="#e6d3b0"/>
        <ellipse cx="158" cy="76" rx="4" ry="9" fill="#a5713f" transform="rotate(-18 158 76)"/>
        <ellipse cx="168" cy="78" rx="4" ry="8" fill="#a5713f" transform="rotate(10 168 78)"/>
        <circle cx="162" cy="87" r="1.6" fill="#26221e"/>
        <polygon points="178,91 184,94 178,97" fill="#f4efe4"/>
        <ellipse cx="80" cy="98" rx="6" ry="4" fill="#e8dcc0"/>
        <circle cx="160" cy="85" r="1.3" fill="#8a6a42"/>
      </g>`
    }
  ];

  /* ---------- 互动题库（8 题） ---------- */
  window.HM.quiz = [
    {
      q: "中国黄（渤）海候鸟栖息地于哪一年被列入《世界遗产名录》，成为江苏首个世界自然遗产？",
      opts: ["2017 年", "2018 年", "2019 年", "2021 年"],
      ans: 2,
      exp: "2019 年 7 月，中国黄（渤）海候鸟栖息地（第一期）成功列入《世界遗产名录》，成为我国第 54 处世界遗产，其核心区域就在盐城。"
    },
    {
      q: "每年冬天，成千上万只头顶丹红的“仙鹤”飞来盐城越冬。它们是什么鸟？",
      opts: ["丹顶鹤", "白鹤", "灰鹤", "蓑羽鹤"],
      ans: 0,
      exp: "盐城湿地是丹顶鹤最主要的越冬地之一，每年冬季约有上千只丹顶鹤在此栖息，这也是作品名称《鹤鸣盐城》的由来。"
    },
    {
      q: "被誉为“四不像”的中国特有珍兽，如今在盐城大丰拥有世界上最大的野生种群，它是？",
      opts: ["梅花鹿", "驯鹿", "麋鹿", "驼鹿"],
      ans: 2,
      exp: "麋鹿角似鹿非鹿、脸似马非马、蹄似牛非牛、尾似驴非驴，故称“四不像”。大丰麋鹿国家级自然保护区的野生种群数量已突破八千头。"
    },
    {
      q: "它喙形如小勺、全球数量仅数百只，是全世界最濒危的鸟类之一，还常出现在条子泥。它是？",
      opts: ["勺嘴鹬", "反嘴鹬", "蛎鹬", "矶鹬"],
      ans: 0,
      exp: "勺嘴鹬因勺状的喙得名，繁殖于西伯利亚，迁徙途中在盐城条子泥等滩涂补给体力，是黄海湿地“国际名片”级明星。"
    },
    {
      q: "“鸟中大熊猫”震旦鸦雀最依赖哪种生境？",
      opts: ["针叶林", "芦苇丛", "沙滩", "城市公园"],
      ans: 1,
      exp: "震旦鸦雀几乎终身生活在芦苇丛中，用粗短的喙撕开芦苇秆取食昆虫，因此保护芦苇湿地就是保护它的全部家园。"
    },
    {
      q: "东亚—澳大利西亚候鸟迁徙路线上，盐城黄海湿地扮演着什么角色？",
      opts: ["迁徙起点", "终年定居地", "关键“中转站”与“加油站”", "与候鸟迁徙无关"],
      ans: 2,
      exp: "每年春秋，数百万只候鸟沿东亚—澳大利西亚迁飞路线跨越上万公里，盐城湿地正是它们途中最重要的停歇、补给与越冬地。"
    },
    {
      q: "为保护丹顶鹤而献出生命的“护鹤姑娘”徐秀娟，守护的是哪片湿地？",
      opts: ["盐城沿海湿地", "洞庭湖", "鄱阳湖", "青海湖"],
      ans: 0,
      exp: "上世纪 80 年代，徐秀娟在盐城珍禽保护区为寻找走失的丹顶鹤不幸牺牲，歌曲《一个真实的故事》让守护者的精神永远流传。"
    },
    {
      q: "每年的“世界湿地日”是哪一天？",
      opts: ["3 月 12 日", "2 月 2 日", "6 月 5 日", "4 月 22 日"],
      ans: 1,
      exp: "1971 年 2 月 2 日《湿地公约》签署，为纪念这一日子，每年的 2 月 2 日被定为“世界湿地日”。"
    }
  ];

  /* ---------- 守护宣言 ---------- */
  window.HM.pledge = [
    { t: "我听见", d: "鹤鸣穿透晨雾，在条子泥的潮声里，讲述亿万年的约定。" },
    { t: "我看见", d: "勺嘴鹬衔起一口滩涂，把疲惫的旅程，变成生命的接力。" },
    { t: "我懂得", d: "这片会呼吸的湿地，不只是鸟的家园，也是我们与自然共存的答卷。" },
    { t: "我承诺", d: "不惊扰、不投喂、不乱扔，做候鸟的安静路人，做湿地的守护者。" }
  ];
  window.HM.pledgeTail = "守护黄海湿地，就是守护我们自己。<br/>从你我开始，让鹤鸣永远嘹亮。";

  /* ---------- 湿地导览：黄海遗产地图 5 大片区 ---------- */
  window.HM.sites = [
    {
      n: "条子泥湿地", en: "Tiaozini Wetland", x: 66, y: 76,
      tags: ["世界自然遗产核心区", "勺嘴鹬“加油站”"],
      brief: "世界自然遗产核心区，潮起潮落间，全球濒危的勺嘴鹬在这里补充能量。",
      detail: "条子泥是黄海之滨一片巨大的潮间带滩涂，位于东台沿海。潮水退去后，广阔的滩涂露出水面，贝类、沙蚕等底栖生物丰富，成为东亚—澳大利西亚候鸟迁飞路线上最重要的补给站之一。全球种群仅数百只的极危物种勺嘴鹬，每年春秋都会在这里停歇觅食，积蓄继续飞行的能量。",
      facts: [["位置", "东台市沿海"], ["地位", "世界自然遗产核心区"], ["明星物种", "勺嘴鹬、小青脚鹬"], ["特色", "潮间带滩涂、“鸟类加油站”"]],
      art: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="tz_sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#fbeed2"/><stop offset=".55" stop-color="#f8d29a"/><stop offset="1" stop-color="#f3b06b"/>
          </linearGradient>
          <linearGradient id="tz_sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#e2a05e"/><stop offset="1" stop-color="#966b45"/>
          </linearGradient>
        </defs>
        <rect width="320" height="180" fill="url(#tz_sky)"/>
        <circle cx="250" cy="86" r="46" fill="#f7a94f" opacity=".16"/>
        <circle cx="250" cy="86" r="24" fill="#f7a94f"/>
        <rect y="92" width="320" height="88" fill="url(#tz_sea)"/>
        <path d="M228 96 h46" stroke="#f9c27c" stroke-width="3.4" opacity=".85" stroke-linecap="round"/>
        <path d="M236 109 h30" stroke="#f9c27c" stroke-width="2.6" opacity=".6" stroke-linecap="round"/>
        <path d="M244 122 h14" stroke="#f9c27c" stroke-width="2" opacity=".4" stroke-linecap="round"/>
        <path d="M0 138 C 58 128 116 138 172 131 C 230 124 282 132 320 126 L 320 180 L 0 180 Z" fill="#a37c50"/>
        <path d="M0 152 C 66 145 132 154 196 147 C 250 141 294 148 320 143 L 320 180 L 0 180 Z" fill="#7c5a39"/>
        <path d="M18 161 q 9 -3 18 0 t 18 0 t 18 0 t 18 0" stroke="#c8a878" stroke-width="1.7" fill="none" opacity=".55"/>
        <path d="M54 170 q 9 -3 18 0 t 18 0 t 18 0" stroke="#c8a878" stroke-width="1.7" fill="none" opacity=".45"/>
        <g fill="#4a3423">
          <ellipse cx="62" cy="150" rx="8" ry="5"/>
          <circle cx="55" cy="144" r="3.6"/>
          <path d="M51 143 L 44 146" stroke="#4a3423" stroke-width="2" stroke-linecap="round"/>
          <path d="M60 154 L 57 164" stroke="#4a3423" stroke-width="1.5"/>
          <path d="M66 154 L 69 164" stroke="#4a3423" stroke-width="1.5"/>
        </g>
        <g fill="#3d2c1e" opacity=".85">
          <ellipse cx="150" cy="145" rx="7" ry="4.4"/>
          <circle cx="144" cy="140" r="3.2"/>
          <path d="M141 139 L 136 142" stroke="#3d2c1e" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M148 148 L 146 157" stroke="#3d2c1e" stroke-width="1.3"/>
          <path d="M153 148 L 156 157" stroke="#3d2c1e" stroke-width="1.3"/>
        </g>
        <g fill="#3d2c1e" opacity=".6">
          <ellipse cx="230" cy="140" rx="6" ry="3.8"/>
          <circle cx="225" cy="136" r="3"/>
          <path d="M222 135 L 217 138" stroke="#3d2c1e" stroke-width="1.6" stroke-linecap="round"/>
        </g>
        <path d="M70 54 q 6 -6 12 0 q 6 -6 12 0" stroke="#8a5a35" stroke-width="2" fill="none"/>
        <path d="M104 40 q 5 -5 10 0 q 5 -5 10 0" stroke="#8a5a35" stroke-width="1.8" fill="none"/>
      </svg>`
    },
    {
      n: "盐城湿地珍禽国家级自然保护区", en: "Yancheng Rare Birds National Nature Reserve", x: 60, y: 45,
      tags: ["丹顶鹤主要越冬地", "国家级自然保护区"],
      brief: "丹顶鹤在中国最重要的越冬地之一，护鹤姑娘徐秀娟的故事就发生在这里。",
      detail: "保护区位于盐城沿海，拥有大面积滩涂、沼泽与芦苇湿地。每年 11 月至次年 3 月，上千只丹顶鹤从北方飞来越冬，这里因此被称为“丹顶鹤的第二故乡”。上世纪 80 年代，护鹤姑娘徐秀娟为寻找走失的丹顶鹤献出生命，长眠于此，《一个真实的故事》传唱至今。",
      facts: [["位置", "盐城沿海"], ["地位", "丹顶鹤主要越冬地"], ["明星物种", "丹顶鹤、东方白鹳"], ["特色", "滩涂沼泽、芦苇湿地"]],
      art: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="zb_sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#e9f3ee"/><stop offset=".6" stop-color="#d5e6dd"/><stop offset="1" stop-color="#f4d9ac"/>
          </linearGradient>
          <linearGradient id="zb_water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#6f9c8b"/><stop offset="1" stop-color="#3f6b5f"/>
          </linearGradient>
        </defs>
        <rect width="320" height="180" fill="url(#zb_sky)"/>
        <circle cx="76" cy="64" r="30" fill="#f5ca8c" opacity=".25"/>
        <circle cx="76" cy="64" r="16" fill="#f5ca8c"/>
        <rect y="116" width="320" height="64" fill="url(#zb_water)"/>
        <rect y="116" width="320" height="7" fill="#ffffff" opacity=".18"/>
        <rect y="128" width="320" height="4" fill="#ffffff" opacity=".12"/>
        <g stroke="#5c7042" stroke-width="3" stroke-linecap="round">
          <line x1="26" y1="130" x2="22" y2="86"/>
          <line x1="44" y1="130" x2="48" y2="78"/>
          <line x1="60" y1="130" x2="66" y2="92"/>
          <line x1="288" y1="130" x2="284" y2="80"/>
          <line x1="304" y1="130" x2="308" y2="72"/>
        </g>
        <g fill="#7a5a36">
          <ellipse cx="22" cy="84" rx="4" ry="9"/>
          <ellipse cx="48" cy="76" rx="4" ry="9"/>
          <ellipse cx="66" cy="90" rx="4" ry="9"/>
          <ellipse cx="284" cy="78" rx="4" ry="9"/>
          <ellipse cx="308" cy="70" rx="4" ry="9"/>
        </g>
        <ellipse cx="188" cy="137" rx="26" ry="3" fill="#2e574e" opacity=".35"/>
        <path d="M178 132 L 176 166 M 198 132 L 202 166" stroke="#2c2a27" stroke-width="2.6" stroke-linecap="round"/>
        <ellipse cx="188" cy="126" rx="30" ry="15" fill="#f7f9f6"/>
        <path d="M212 128 q 18 2 21 12 l -3 5" fill="#2c2a27"/>
        <path d="M164 122 C 154 108 148 98 140 88" stroke="#f7f9f6" stroke-width="9" fill="none" stroke-linecap="round"/>
        <circle cx="139" cy="86" r="7" fill="#f7f9f6"/>
        <ellipse cx="136" cy="80" rx="4.4" ry="3" fill="#d93a2b"/>
        <path d="M133 84 L 122 88" stroke="#2c2a27" stroke-width="3" stroke-linecap="round"/>
        <path d="M96 40 L 82 26" stroke="#f7f9f6" stroke-width="7" stroke-linecap="round"/>
        <path d="M100 38 L 114 24" stroke="#2c2a27" stroke-width="6" stroke-linecap="round"/>
        <circle cx="82" cy="25" r="4" fill="#f7f9f6"/>
      </svg>`
    },
    {
      n: "大丰麋鹿国家级自然保护区", en: "Dafeng Milu National Nature Reserve", x: 62, y: 60,
      tags: ["世界最大麋鹿野生种群", "中国特有物种回归地"],
      brief: "“四不像”麋鹿的家园，拥有世界上最大的麋鹿野生种群。",
      detail: "麋鹿是中国特有物种，因“角似鹿、面似马、蹄似牛、尾似驴”得名“四不像”。它曾在中国本土绝迹，后经引回与保护，在大丰这片广阔的滨海湿地重新繁衍生息。如今这里的野生麋鹿种群已突破八千头，成为世界最大的麋鹿野生种群，是“人与自然和谐共生”的生动写照。",
      facts: [["位置", "大丰区沿海"], ["地位", "世界最大麋鹿野生种群"], ["明星物种", "麋鹿"], ["特色", "野外绝迹物种的回归家园"]],
      art: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ml_sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#fdf3df"/><stop offset=".7" stop-color="#f5d8a8"/><stop offset="1" stop-color="#f0c88f"/>
          </linearGradient>
        </defs>
        <rect width="320" height="180" fill="url(#ml_sky)"/>
        <circle cx="282" cy="52" r="38" fill="#f6c98a" opacity=".22"/>
        <circle cx="282" cy="52" r="19" fill="#f6c98a"/>
        <path d="M0 120 C 70 108 150 126 230 116 C 280 110 310 114 320 112 L 320 180 L 0 180 Z" fill="#b6c78d"/>
        <path d="M0 142 C 80 132 170 148 250 138 C 290 132 315 138 320 136 L 320 180 L 0 180 Z" fill="#9bb56f"/>
        <path d="M0 164 C 90 156 190 168 270 160 L 320 162 L 320 180 L 0 180 Z" fill="#7d9c55"/>
        <g fill="#5f7c46" opacity=".9">
          <ellipse cx="18" cy="132" rx="10" ry="5"/>
          <ellipse cx="42" cy="126" rx="8" ry="4"/>
          <ellipse cx="300" cy="124" rx="10" ry="5"/>
        </g>
        <g fill="#6b4a26">
          <ellipse cx="148" cy="126" rx="34" ry="15"/>
          <path d="M164 118 C 172 106 178 98 186 92" stroke="#6b4a26" stroke-width="11" fill="none" stroke-linecap="round"/>
          <ellipse cx="190" cy="89" rx="9" ry="6" transform="rotate(14 190 89)"/>
          <path d="M184 88 C 180 74 174 62 164 54" stroke="#5c3f22" stroke-width="3.4" fill="none" stroke-linecap="round"/>
          <path d="M164 54 C 158 50 152 52 148 58" stroke="#5c3f22" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path d="M156 64 L 172 58" stroke="#5c3f22" stroke-width="3" stroke-linecap="round"/>
          <path d="M160 70 L 176 66" stroke="#5c3f22" stroke-width="3" stroke-linecap="round"/>
          <path d="M130 134 L 126 162 M 142 134 L 138 162" stroke="#6b4a26" stroke-width="4" stroke-linecap="round"/>
          <path d="M168 134 L 172 162 M 180 134 L 184 162" stroke="#6b4a26" stroke-width="4" stroke-linecap="round"/>
        </g>
        <g fill="#6b4a26" opacity=".9">
          <ellipse cx="92" cy="136" rx="24" ry="11"/>
          <path d="M102 130 C 106 122 110 116 116 112" stroke="#6b4a26" stroke-width="8" fill="none" stroke-linecap="round"/>
          <ellipse cx="118" cy="110" rx="7" ry="5" transform="rotate(12 118 110)"/>
          <path d="M82 144 L 80 164 M 92 144 L 90 164" stroke="#6b4a26" stroke-width="3.4" stroke-linecap="round"/>
          <path d="M104 144 L 108 164 M 114 144 L 118 164" stroke="#6b4a26" stroke-width="3.4" stroke-linecap="round"/>
        </g>
        <g fill="#7a5a33" opacity=".85">
          <ellipse cx="230" cy="142" rx="16" ry="8"/>
          <path d="M236 137 C 240 132 242 129 246 127" stroke="#7a5a33" stroke-width="6" fill="none" stroke-linecap="round"/>
          <circle cx="248" cy="126" r="4.6"/>
          <path d="M224 148 L 223 162 M 231 148 L 232 162" stroke="#7a5a33" stroke-width="2.8" stroke-linecap="round"/>
        </g>
        <path d="M40 48 q 5 -5 10 0 q 5 -5 10 0" stroke="#8a6a42" stroke-width="1.8" fill="none"/>
      </svg>`
    },
    {
      n: "射阳河口湿地", en: "Sheyang River Estuary Wetland", x: 62, y: 30,
      tags: ["河海交汇", "碱蓬红滩"],
      brief: "淡水与海水的交汇处，碱蓬草把滩涂染成“红海滩”。",
      detail: "射阳河由此入海，河海交汇带来丰富的养分，造就了多样的湿地生境。每年秋天，成片的碱蓬（盐地碱蓬）由绿转红，把滩涂铺成壮观的“红海滩”。这里是候鸟迁徙途中的重要驿站，也是湿地生态修复成效的展示窗口。",
      facts: [["位置", "射阳县沿海"], ["地位", "河海交汇、候鸟驿站"], ["明星物种", "黑嘴鸥、白腰杓鹬"], ["特色", "碱蓬红滩"]],
      art: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sy_sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#fdeee2"/><stop offset=".65" stop-color="#f8d8b2"/><stop offset="1" stop-color="#f3c494"/>
          </linearGradient>
          <linearGradient id="sy_river" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#7fb0ae"/><stop offset="1" stop-color="#4d8c86"/>
          </linearGradient>
        </defs>
        <rect width="320" height="180" fill="url(#sy_sky)"/>
        <circle cx="60" cy="56" r="34" fill="#f6d9a8" opacity=".3"/>
        <circle cx="60" cy="56" r="17" fill="#f6d9a8"/>
        <rect y="92" width="320" height="20" fill="#9fbfc2" opacity=".55"/>
        <path d="M200 92 C 208 118 218 140 236 160 L 268 180 L 180 180 C 188 160 192 136 192 112 Z" fill="url(#sy_river)"/>
        <path d="M204 100 C 210 122 216 142 226 160" stroke="#d8eee9" stroke-width="2" fill="none" opacity=".4"/>
        <path d="M0 112 C 40 106 80 112 120 108 C 156 105 178 104 194 106 L 188 180 L 0 180 Z" fill="#c2554a" opacity=".95"/>
        <ellipse cx="250" cy="150" rx="66" ry="34" fill="#c2554a"/>
        <path d="M0 138 C 50 130 110 140 150 134 L 146 180 L 0 180 Z" fill="#9e3d38" opacity=".85"/>
        <ellipse cx="252" cy="168" rx="60" ry="24" fill="#9e3d38"/>
        <g fill="#d97a6b" opacity=".8">
          <ellipse cx="60" cy="120" rx="30" ry="8"/>
          <ellipse cx="140" cy="116" rx="26" ry="7"/>
          <ellipse cx="230" cy="126" rx="22" ry="6"/>
        </g>
        <path d="M30 76 q 5 -6 10 0 q 5 -6 10 0" stroke="#fdf6ee" stroke-width="2.2" fill="none"/>
        <path d="M92 62 q 4 -5 8 0 q 4 -5 8 0" stroke="#fdf6ee" stroke-width="1.8" fill="none"/>
        <path d="M148 70 q 4 -5 8 0 q 4 -5 8 0" stroke="#fdf6ee" stroke-width="1.8" fill="none"/>
        <g stroke="#8fb6bf" stroke-width="1.6">
          <line x1="286" y1="92" x2="286" y2="62"/>
          <path d="M286 62 L 276 54 M286 62 L 292 52 M286 62 L 286 50" stroke-width="1.2"/>
          <line x1="306" y1="92" x2="306" y2="66"/>
          <path d="M306 66 L 297 59 M306 66 L 312 56 M306 66 L 306 55" stroke-width="1.1"/>
        </g>
      </svg>`
    },
    {
      n: "九龙口湿地", en: "Jiulongkou Wetland", x: 24, y: 44,
      tags: ["九河汇聚", "芦荡迷宫"],
      brief: "九条河流汇聚成湖，万亩芦苇荡如迷宫，是里下河腹地的“水乡明珠”。",
      detail: "九龙口位于建湖县，因九条河流汇聚成湖而得名，属于里下河地区的淡水湖荡湿地。湖中岛礁棋布、芦苇连片，形成独特的“芦荡迷宫”景观。这里水鸟翔集、鱼虾肥美，与沿海滩涂湿地互为补充，共同构成盐城多样化的湿地生态体系。",
      facts: [["位置", "建湖县"], ["地位", "里下河湖荡湿地代表"], ["明星物种", "白鹭、野鸭"], ["特色", "九河汇聚、芦荡迷宫"]],
      art: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="jl_sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#fdf6e8"/><stop offset=".7" stop-color="#f6e7c4"/><stop offset="1" stop-color="#efd9a8"/>
          </linearGradient>
          <linearGradient id="jl_water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#8fbfae"/><stop offset="1" stop-color="#5f9b8c"/>
          </linearGradient>
        </defs>
        <rect width="320" height="180" fill="url(#jl_sky)"/>
        <circle cx="282" cy="46" r="28" fill="#f6dfa0" opacity=".3"/>
        <circle cx="282" cy="46" r="14" fill="#f6dfa0"/>
        <rect y="96" width="320" height="84" fill="url(#jl_water)"/>
        <path d="M20 108 q 8 -2 16 0 M60 120 q 8 -2 16 0 M180 110 q 8 -2 16 0 M260 122 q 8 -2 16 0" stroke="#cfe6dd" stroke-width="1.8" fill="none" opacity=".5"/>
        <g fill="#6f8a4e">
          <ellipse cx="34" cy="98" rx="26" ry="8"/>
          <ellipse cx="286" cy="100" rx="24" ry="7"/>
        </g>
        <g fill="#4f7d4f">
          <ellipse cx="44" cy="140" rx="14" ry="7" transform="rotate(-8 44 140)"/>
          <ellipse cx="70" cy="152" rx="12" ry="6" transform="rotate(6 70 152)"/>
          <ellipse cx="252" cy="148" rx="14" ry="7" transform="rotate(-6 252 148)"/>
        </g>
        <g stroke="#3f6644" stroke-width="1.2" fill="none" opacity=".7">
          <path d="M40 140 L 38 145 M50 140 L 52 145"/>
          <path d="M66 152 L 64 157 M76 152 L 78 157"/>
        </g>
        <ellipse cx="168" cy="126" rx="58" ry="14" fill="#cbb27f"/>
        <ellipse cx="168" cy="126" rx="58" ry="14" fill="none" stroke="#b59a63" stroke-width="1.5"/>
        <path d="M144 126 L 144 104 M 192 126 L 192 104" stroke="#8a5a33" stroke-width="3" stroke-linecap="round"/>
        <path d="M150 126 L 150 108 M 186 126 L 186 108" stroke="#8a5a33" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M132 108 Q 168 94 204 108 L 198 102 Q 168 90 138 102 Z" fill="#c4553f"/>
        <path d="M144 102 Q 168 90 192 102 L 189 98 Q 168 87 147 98 Z" fill="#a33a2a"/>
        <path d="M138 102 Q 168 88 198 102" stroke="#e8a15c" stroke-width="2" fill="none"/>
        <circle cx="168" cy="86" r="2.6" fill="#f2c98a"/>
        <path d="M242 150 C 248 144 260 144 268 150 Z" fill="#8a5a33"/>
        <path d="M252 146 L 250 132" stroke="#4a3423" stroke-width="2" stroke-linecap="round"/>
        <circle cx="250" cy="129" r="3" fill="#4a3423"/>
        <path d="M108 60 q 4 -5 8 0 q 4 -5 8 0" stroke="#8a6a42" stroke-width="1.8" fill="none"/>
        <path d="M208 44 q 4 -5 8 0 q 4 -5 8 0" stroke="#8a6a42" stroke-width="1.6" fill="none"/>
      </svg>`
    }
  ];
