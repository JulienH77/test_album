const travels = [
  {
    year: 2025,
    id: "2025_china",
    name: "May 2025 - China",
    cities: [
      {
        id: "beijing",
        name: "Beijing",
        lat: 40.02021,
        lng: 116.32324,
		zoom: 9,
        flatPhotos: [
		/*
		{ type: 'hotel', datedeb:'11/05/2025', datefin:'15/05/2025', coords:[116.4106, 39.90006] },
        { type: 'hotel', datedeb:'28/05/2025', datefin:'30/05/2025', coords:[116.38023, 39.86887] },
		*/
        /*The great wall*/
        { desc:'Entering the Great Wall', coords:[116.5379, 40.41597], src:'data/IMG/2025/China/Beijing/IMG_20250512_130110.jpg', rotation: 25 },
        { desc:'Arriving in cabble car', coords:[116.55903, 40.43878], src:'data/IMG/2025/China/Beijing/IMG_20250512_140556.jpg', rotation: 90 },
        { desc:'Me on the Great Wall', coords:[116.55938, 40.44054], src:'data/IMG/2025/China/Beijing/IMG_20250512_141016.jpg', rotation: 312 },
        { desc:'The long line of the Great Wall', coords:[116.56053, 40.43988], src:'data/IMG/2025/China/Beijing/IMG_20250512_141348.jpg', rotation: 157 },
        { desc:'The long line of the Great Wall', coords:[116.56099, 40.43901], src:'data/IMG/2025/China/Beijing/IMG_20250512_141844.jpg', rotation: 157 },
        { desc:'My fat body on the Great Wall', coords:[116.56119, 40.43869], src:'data/IMG/2025/China/Beijing/IMG_20250512_142025.jpg', rotation: 162 },
        { desc:'The beauty of the Great Wall', coords:[116.56122, 40.43815], src:'data/IMG/2025/China/Beijing/IMG_20250512_143901.jpg', rotation: 346 },
        { desc:'View of the Great Wall', coords:[116.55676, 40.44378], src:'data/IMG/2025/China/Beijing/IMG_20250512_150859.jpg', rotation: 327 },
        { desc:'The grand staircase of Mutianyu', coords:[116.55515, 40.44703], src:'data/IMG/2025/China/Beijing/IMG_20250512_152823.jpg', rotation: 319 },
        { desc:'Half way (my legs aaargh)', coords:[116.55456, 40.44756], src:'data/IMG/2025/China/Beijing/IMG_20250512_153650.jpg', rotation: 152 },
        { desc:'Finally at the end of Mutianyu', coords:[116.55376, 40.44816], src:'data/IMG/2025/China/Beijing/IMG_20250512_154257.jpg', rotation: 148 },
        { desc:'Going back to the cable car', coords:[116.55570, 40.44453], src:'data/IMG/2025/China/Beijing/IMG_20250512_161109.jpg', rotation: 131 },
        /*The forbidden city*/
        { desc:'Entering the forbidden city', coords:[116.39102, 39.91145], src:'data/IMG/2025/China/Beijing/IMG_20250513_120311_1.jpg', rotation: 336 },
        { desc:'Finally inside', coords:[116.39098, 39.91287], src:'data/IMG/2025/China/Beijing/IMG_20250513_122113.jpg', rotation: 340 },
        { desc:'Amazed by the colours', coords:[116.39134, 39.91361], src:'data/IMG/2025/China/Beijing/IMG_20250513_122329.jpg', rotation: 334 },
        { desc:'Visiting', coords:[116.39164, 39.91379], src:'data/IMG/2025/China/Beijing/IMG_20250513_122412.jpg', rotation: 1 },
        { desc:'Amazed big the big space', coords:[116.39163, 39.91413], src:'data/IMG/2025/China/Beijing/IMG_20250513_122506.jpg', rotation: 336 },
        { desc:'Dying from hunger and heat (took a mango ice cream)', coords:[116.39081, 39.91793], src:'data/IMG/2025/China/Beijing/IMG_20250513_125342.jpg', rotation: 350 },
        { desc:'Beautiful alley', coords:[116.39158, 39.91863], src:'data/IMG/2025/China/Beijing/IMG_20250513_131056.jpg', rotation: 90 },
        { desc:'Long alley', coords:[116.39336, 39.91869], src:'data/IMG/2025/China/Beijing/IMG_20250513_141109.jpg', rotation: 178 },
        { desc:'The 9 dragon wall', coords:[116.39401, 39.91718], src:'data/IMG/2025/China/Beijing/IMG_20250513_142120.jpg', rotation: 116 },
        { desc:'Throne of the palace of tranquil longevity', coords:[116.39411, 39.91848], src:'data/IMG/2025/China/Beijing/IMG_20250513_142625.jpg', rotation: 358 },
        { desc:'One of the side doors', coords:[116.39452, 39.91867], src:'data/IMG/2025/China/Beijing/IMG_20250513_143152.jpg', rotation: 207 },
        { desc:'Cool building', coords:[116.39443, 39.91872], src:'data/IMG/2025/China/Beijing/IMG_20250513_143154.jpg', rotation: 300 },
        { desc:'Opera building', coords:[116.39441, 39.91940], src:'data/IMG/2025/China/Beijing/IMG_20250513_145311.jpg', rotation: 129 },
        { desc:'Edge of the forbidden city', coords:[116.39537, 39.92195], src:'data/IMG/2025/China/Beijing/IMG_20250513_152620.jpg', rotation: 200 },
        /*The temple of heaven*/
        { desc:'The temple of Heaven', coords:[116.40722, 39.88007], src:'data/IMG/2025/China/Beijing/IMG_20250513_190240_1.jpg', rotation: 350 },
        { desc:'Huge hail storm', coords:[116.41425, 39.88223], src:'data/IMG/2025/China/Beijing/IMG_20250513_204322.jpg', rotation: 56 },
        /*Tiananmen square*/
        { desc:'Tiananmen square !', coords:[116.39270, 39.90391], src:'data/IMG/2025/China/Beijing/IMG_20250514_110050.jpg', rotation: 246 },
        { desc:'Mister Mao Zedong', coords:[116.39181, 39.90521], src:'data/IMG/2025/China/Beijing/IMG_20250514_110234.jpg', rotation: 349 },
        { desc:'The great hall of the people', coords:[116.38999, 39.90355], src:'data/IMG/2025/China/Beijing/IMG_20250514_110756.jpg', rotation: 270 },
        { desc:'Mao Zedong memorial hall', coords:[116.39138, 39.90269], src:'data/IMG/2025/China/Beijing/IMG_20250514_111114.jpg', rotation: 173 },
        { desc:'National Museum of China', coords:[116.39292, 39.90355], src:'data/IMG/2025/China/Beijing/IMG_20250514_111347.jpg', rotation: 84 },
        { desc:'Beautiful building and gate', coords:[116.39161, 39.89702], src:'data/IMG/2025/China/Beijing/IMG_20250514_125603.jpg', rotation: 152 },
        { desc:'Me', coords:[116.39175, 39.89465], src:'data/IMG/2025/China/Beijing/IMG_20250514_132806.jpg', rotation: 269 },
        { desc:'Dumb me', coords:[116.39179, 39.89463], src:'data/IMG/2025/China/Beijing/IMG_20250514_132809.jpg', rotation: 271 },
        { desc:'Beautiful gate', coords:[116.39175, 39.89653], src:'data/IMG/2025/China/Beijing/IMG_20250514_134125.jpg', rotation: 1 },
        /*The summer palace*/
        { desc:'Beautiful gate', coords:[116.26806, 40.00049], src:'data/IMG/2025/China/Beijing/IMG_20250514_144546.jpg', rotation: 176 },
        { desc:'The summer palace', coords:[116.26821, 39.99958], src:'data/IMG/2025/China/Beijing/IMG_20250514_144828.jpg', rotation: 171 },
        { desc:'As always, beautiful decoration', coords:[116.26825, 39.99909], src:'data/IMG/2025/China/Beijing/IMG_20250514_145106.jpg', rotation: 140 },
        { desc:'Beautiful building', coords:[116.26823, 39.99885], src:'data/IMG/2025/China/Beijing/IMG_20250514_145541.jpg', rotation: 115 },
        { desc:'Building full of Buddha', coords:[116.26785, 39.99839], src:'data/IMG/2025/China/Beijing/IMG_20250514_145953.jpg', rotation: 198 },
        { desc:'Cute resting building', coords:[116.26986, 39.99826], src:'data/IMG/2025/China/Beijing/IMG_20250514_151334.jpg', rotation: 305 },
        { desc:'Beautiful entrance', coords:[116.26821, 39.99644], src:'data/IMG/2025/China/Beijing/IMG_20250514_152031.jpg', rotation: 295 },
        { desc:'Beautiful building', coords:[116.26802, 39.99705], src:'data/IMG/2025/China/Beijing/IMG_20250514_152412.jpg', rotation: 345 },
        { desc:'Beautiful old lady', coords:[116.26824, 39.99692], src:'data/IMG/2025/China/Beijing/IMG_20250514_153233.jpg', rotation: 235 },
        { desc:'At the top of the summer palace, Buddhism temple', coords:[116.26802, 39.99778], src:'data/IMG/2025/China/Beijing/IMG_20250514_154020.jpg', rotation: 323 },
        { desc:'Cool view of Beijing and the lake', coords:[116.26792, 39.99765], src:'data/IMG/2025/China/Beijing/IMG_20250514_155039.jpg', rotation: 171 },
        { desc:'Cool pagoda in the landscape', coords:[116.26776, 39.99762], src:'data/IMG/2025/China/Beijing/IMG_20250514_155106.jpg', rotation: 356 },
        { desc:'Married couple', coords:[116.26771, 39.99727], src:'data/IMG/2025/China/Beijing/IMG_20250514_155451_1.jpg', rotation: 169 },
        { desc:'Cool view from under', coords:[116.26775, 39.99702], src:'data/IMG/2025/China/Beijing/IMG_20250514_155556.jpg', rotation: 11 },
        { desc:'Cute boats on the lake', coords:[116.26765, 39.99630], src:'data/IMG/2025/China/Beijing/IMG_20250514_155803_1.jpg', rotation: 141 },
        { desc:'Cool walk path well decorated', coords:[116.26642, 39.99666], src:'data/IMG/2025/China/Beijing/IMG_20250514_160017.jpg', rotation: 340 },
        { desc:'The stone boat', coords:[116.26400, 39.99664], src:'data/IMG/2025/China/Beijing/IMG_20250514_160447.jpg', rotation: 296 },
        { desc:'Cute bridge', coords:[116.26354, 39.99927], src:'data/IMG/2025/China/Beijing/IMG_20250514_161619.jpg', rotation: 290 },
        { desc:'Cute walk path', coords:[116.26195, 39.99852], src:'data/IMG/2025/China/Beijing/IMG_20250514_162344.jpg', rotation: 194 },
        { desc:'Cool bridge', coords:[116.261467, 39.99546], src:'data/IMG/2025/China/Beijing/IMG_20250514_163717.jpg', rotation: 181 },
        { desc:'BIIIG bridge', coords:[116.26069, 39.99215], src:'data/IMG/2025/China/Beijing/IMG_20250514_164547.jpg', rotation: 76 },
        { desc:'The summer palace from the lake side', coords:[116.26145, 39.99156], src:'data/IMG/2025/China/Beijing/IMG_20250514_164651.jpg', rotation: 37 },
        { desc:'Another cool bridge', coords:[116.26329, 39.99009], src:'data/IMG/2025/China/Beijing/IMG_20250514_165126.jpg', rotation: 136 },
        { desc:'Another cool bridge', coords:[116.26558, 39.98780], src:'data/IMG/2025/China/Beijing/IMG_20250514_170056.jpg', rotation: 170 },
        { desc:'Cool building', coords:[116.26777, 39.98518], src:'data/IMG/2025/China/Beijing/IMG_20250514_170821.jpg', rotation: 193 },
        { desc:'Another enormous bridge', coords:[116.27406, 39.98015], src:'data/IMG/2025/China/Beijing/IMG_20250514_172519.jpg', rotation: 280 },
        { desc:'Another enormous bridge', coords:[116.27404, 39.98026], src:'data/IMG/2025/China/Beijing/IMG_20250514_172615.jpg', rotation: 267 },
        { desc:'Beautiful landscape', coords:[116.27222, 39.98779], src:'data/IMG/2025/China/Beijing/IMG_20250514_174405.jpg', rotation: 280 },
        { desc:'Beautiful landscape', coords:[116.27224, 39.98771], src:'data/IMG/2025/China/Beijing/IMG_20250514_174407.jpg', rotation: 280 },
        { desc:'End of the Beijing journey', coords:[116.31481, 39.89339], src:'data/IMG/2025/China/Beijing/IMG_20250515_093400.jpg', rotation: 270 },
        /* last night in China*/
        { desc:'Last photo of my whole trip', coords:[116.38023, 39.86887], src:'data/IMG/2025/China/Beijing/IMG_20250530_001727.jpg', rotation: 176 }
        ]
      },
	  
	  {
        id: "xian",
        name: "Xi'an",
        lat: 34.28132,
        lng: 108.93905,
		zoom: 11,
        flatPhotos: [
		/*
		{ type: 'hotel', datedeb:'15/05/2025', datefin:'19/05/2025', coords:[108.927897, 34.247519] },
		*/
        { desc:'Arriving in Xi\'an', coords:[108.93470, 34.24256], src:'data/IMG/2025/China/Xian/IMG_20250515_145610.jpg', rotation: 348 },
        { desc:'View from my room', coords:[108.92789, 34.24751], src:'data/IMG/2025/China/Xian/IMG_20250515_201715.jpg', rotation: 91 },
        { desc:'The old rampart', coords:[108.92839, 34.25314], src:'data/IMG/2025/China/Xian/IMG_20250515_215025.jpg', rotation: 340 },
        { desc:'The bell tower', coords:[108.94197, 34.26035], src:'data/IMG/2025/China/Xian/IMG_20250515_221928.jpg', rotation: 32 },
        /*Museum of terracotta warriors*/
        { desc:'A very high neighborhood', coords:[108.99195, 34.25248], src:'data/IMG/2025/China/Xian/IMG_20250516_143603.jpg', rotation: 119 },
        { desc:'Musuem of terracotta', coords:[109.27895, 34.39095], src:'data/IMG/2025/China/Xian/IMG_20250516_151842.jpg', rotation: 180 },
        { desc:'A statue', coords:[109.27530, 34.38602], src:'data/IMG/2025/China/Xian/IMG_20250516_155047.jpg' /*PAS DE ROTATION*/ },
        { desc:'A statue', coords:[109.27522, 34.38610], src:'data/IMG/2025/China/Xian/IMG_20250516_155156.jpg' /*PAS DE ROTATION*/ },
        { desc:'Other statues', coords:[109.27534, 34.38622], src:'data/IMG/2025/China/Xian/IMG_20250516_155219.jpg' /*PAS DE ROTATION*/ },
        { desc:'A statue of an officer', coords:[109.27552, 34.38623], src:'data/IMG/2025/China/Xian/IMG_20250516_155253.jpg' /*PAS DE ROTATION*/ },
        { desc:'The famous terracotta warriors', coords:[109.27398, 34.38495], src:'data/IMG/2025/China/Xian/IMG_20250516_160317.jpg', rotation: 273 },
        { desc:'View from the side', coords:[109.27395, 34.38482], src:'data/IMG/2025/China/Xian/IMG_20250516_160509.jpg', rotation: 285 },
        { desc:'View from the side', coords:[109.27351, 34.38472], src:'data/IMG/2025/China/Xian/IMG_20250516_160852.jpg', rotation: 35 },
        { desc:'Restoration area', coords:[109.27246, 34.38475], src:'data/IMG/2025/China/Xian/IMG_20250516_161311.jpg', rotation: 340 },
        { desc:'What the excavations look like', coords:[109.27288, 34.38522], src:'data/IMG/2025/China/Xian/IMG_20250516_161934.jpg', rotation: 171 },
        { desc:'Poor warriors here since 2200 years', coords:[109.27297, 34.38522], src:'data/IMG/2025/China/Xian/IMG_20250516_161941.jpg', rotation: 171 },
        { desc:'A kneeling archer', coords:[109.27377, 34.38623], src:'data/IMG/2025/China/Xian/IMG_20250516_163227.jpg' /*PAS DE ROTATION*/ },
        { desc:'A high-ranking officer', coords:[109.27387, 34.38624], src:'data/IMG/2025/China/Xian/IMG_20250516_163347.jpg' /*PAS DE ROTATION*/ },
        { desc:'A middle-ranking officer', coords:[109.27393, 34.38620], src:'data/IMG/2025/China/Xian/IMG_20250516_163409.jpg' /*PAS DE ROTATION*/ },
        { desc:'A standing archer', coords:[109.27409, 34.38620], src:'data/IMG/2025/China/Xian/IMG_20250516_163507.jpg' /*PAS DE ROTATION*/ },
        { desc:'A cavalryman with his horse', coords:[109.27402, 34.386158], src:'data/IMG/2025/China/Xian/IMG_20250516_163518_1.jpg' /*PAS DE ROTATION*/ },
        { desc:'The second area that burned', coords:[109.27430, 34.38596], src:'data/IMG/2025/China/Xian/IMG_20250516_164030.jpg' /*PAS DE ROTATION*/ },
        { desc:'The third area', coords:[109.27226, 34.38543], src:'data/IMG/2025/China/Xian/IMG_20250516_171139.jpg' /*PAS DE ROTATION*/ },
        /*Visiting the city*/
        { desc:'Sandstorm coming...', coords:[108.92820, 34.24750], src:'data/IMG/2025/China/Xian/IMG_20250517_145854.jpg', rotation: 91 },
        { desc:'Rou jia mo (boiled meat burger from Xi\'an)', coords:[108.92050, 34.24581], src:'data/IMG/2025/China/Xian/IMG_20250517_203630.jpg' /*PAS DE ROTATION*/ },
        { desc:'Gods of the city\'s temple', coords:[108.93255, 34.26329], src:'data/IMG/2025/China/Xian/IMG_20250518_125153.jpg', rotation: 34 },
        { desc:'Old chinese alphabet', coords:[108.93268, 34.26282], src:'data/IMG/2025/China/Xian/IMG_20250518_125358.jpg', rotation: 275 },
        { desc:'One of the oldest mosque (705AD)', coords:[108.93160, 34.26380], src:'data/IMG/2025/China/Xian/IMG_20250518_130501.jpg', rotation: 236 },
        { desc:'A friend that showed me the whole neighborhood', coords:[108.934862, 34.26470], src:'data/IMG/2025/China/Xian/IMG_20250518_131254.jpg', rotation: 180 },
        { desc:'The muslim souk', coords:[108.93835, 34.26472], src:'data/IMG/2025/China/Xian/IMG_20250518_131603.jpg', rotation: 84 },
        { desc:'The great mosque', coords:[108.93598, 34.26329], src:'data/IMG/2025/China/Xian/IMG_20250518_141257.jpg', rotation: 325 },
        { desc:'An oooold map inside of the mosque', coords:[108.93676, 34.26323], src:'data/IMG/2025/China/Xian/IMG_20250518_142233.jpg', rotation: 107 },
        { desc:'The city wall', coords:[108.92680, 34.25262], src:'data/IMG/2025/China/Xian/IMG_20250518_214602.jpg', rotation: 343 },
        { desc:'The city wall', coords:[108.92673, 34.25264], src:'data/IMG/2025/China/Xian/IMG_20250518_214605.jpg', rotation: 343 },
        { desc:'The city wall', coords:[108.92600, 34.25264], src:'data/IMG/2025/China/Xian/IMG_20250518_214725.jpg', rotation: 39 },
        { desc:'The city wall', coords:[108.92587, 34.25265], src:'data/IMG/2025/China/Xian/IMG_20250518_214739.jpg', rotation: 320 },
        { desc:'The city wall', coords:[108.91970, 34.25283], src:'data/IMG/2025/China/Xian/IMG_20250518_215924.jpg', rotation: 46 }
		]
      },
	  
		{
        id: "shanghai",
        name: "Shanghai",
        lat: 31.23211,
        lng: 121.46278,
		zoom: 13,
        flatPhotos: [
		/*
		{ type: 'hotel', datedeb:'19/05/2025', datefin:'24/05/2025', coords:[121.44882, 31.24892] },
		*/
        /*First visit of the bund*/
        { desc:'The Bund', coords:[121.486234, 31.240105], src:'data/IMG/2025/China/Shanghai/IMG_20250519_221420.jpg', rotation: 97 },
        { desc:'The Bund', coords:[121.48624, 31.240071], src:'data/IMG/2025/China/Shanghai/IMG_20250519_221554.jpg', rotation: 97 },
        { desc:'the Bund with people', coords:[121.486022, 31.240349], src:'data/IMG/2025/China/Shanghai/IMG_20250519_221710.jpg', rotation: 97 },
        { desc:'The Bund', coords:[121.48623, 31.24055], src:'data/IMG/2025/China/Shanghai/IMG_20250519_224343.jpg', rotation: 97 },
        { desc:'The Bund', coords:[121.48711, 31.23689], src:'data/IMG/2025/China/Shanghai/IMG_20250519_225620.jpg', rotation: 82 },
        { desc:'The Bund', coords:[121.487199, 31.236728], src:'data/IMG/2025/China/Shanghai/IMG_20250519_225631.jpg', rotation: 82 },
        { desc:'Lego store', coords:[121.47036, 31.23660], src:'data/IMG/2025/China/Shanghai/IMG_20250519_235423.jpg', rotation: 130 },
        /*Visit of the french concession*/
        { desc:'A brick church', coords:[121.468823, 31.217345], src:'data/IMG/2025/China/Shanghai/IMG_20250520_134203.jpg', rotation: 62 },
        { desc:'French concession', coords:[121.462994, 31.210833], src:'data/IMG/2025/China/Shanghai/IMG_20250520_135906.jpg', rotation: 210 },
        { desc:'Tree forest art center', coords:[121.446222, 31.253172], src:'data/IMG/2025/China/Shanghai/IMG_20250520_190533.jpg', rotation: 248 },
        { desc:'Tree forest art center', coords:[121.4457, 31.253264], src:'data/IMG/2025/China/Shanghai/IMG_20250520_190612.jpg', rotation: 220 },
        { desc:'Cool view of Shanghai', coords:[121.44539, 31.245141], src:'data/IMG/2025/China/Shanghai/IMG_20250520_203940.jpg', rotation: 126 },
        /*Visit of the Buddha temple*/
        { desc:'3 big Buddhas', coords:[121.4403, 31.24340], src:'data/IMG/2025/China/Shanghai/IMG_20250522_115234.jpg', rotation: 14 },
        { desc:'The lying down Buddha', coords:[121.44083, 31.2433], src:'data/IMG/2025/China/Shanghai/IMG_20250522_115611.jpg', rotation: 318 },
        { desc:'The temple of Buddha', coords:[121.44058, 31.24343], src:'data/IMG/2025/China/Shanghai/IMG_20250522_115838.jpg', rotation: 179 },
        { desc:'The temple of Buddha', coords:[121.44030, 31.24319], src:'data/IMG/2025/China/Shanghai/IMG_20250522_121420.jpg', rotation: 3 },
        { desc:'The temple of Buddha', coords:[121.44062, 31.24282], src:'data/IMG/2025/China/Shanghai/IMG_20250522_123517.jpg', rotation: 12 },
        { desc:'The temple of Buddha', coords:[121.44041, 31.24334], src:'data/IMG/2025/China/Shanghai/IMG_20250522_125147.jpg', rotation: 136 },
        /*Visit of the Bund*/
        { desc:'The bund by day', coords:[121.48619, 31.24038], src:'data/IMG/2025/China/Shanghai/IMG_20250522_164733.jpg', rotation: 97 },
        { desc:'The oriental pearl', coords:[121.49299, 31.24002], src:'data/IMG/2025/China/Shanghai/IMG_20250522_170254.jpg', rotation: 49 },
        { desc:'The oriental pearl', coords:[121.49545, 31.24025], src:'data/IMG/2025/China/Shanghai/IMG_20250522_170749.jpg', rotation: 347 },
        { desc:'The oriental pearl', coords:[121.49629, 31.23967], src:'data/IMG/2025/China/Shanghai/IMG_20250522_170926.jpg', rotation: 339 },
        { desc:'The oriental pearl', coords:[121.49635, 31.23967], src:'data/IMG/2025/China/Shanghai/IMG_20250522_170933.jpg', rotation: 339 },
        { desc:'The big 3', coords:[121.49905, 31.23921], src:'data/IMG/2025/China/Shanghai/IMG_20250522_171629.jpg', rotation: 140 },
        { desc:'The big 3', coords:[121.50006, 31.23850], src:'data/IMG/2025/China/Shanghai/IMG_20250522_171852.jpg', rotation: 127 },
        /*The Bund by night*/
        { desc:'The view of the ground behind', coords:[121.50112, 31.23599], src:'data/IMG/2025/China/Shanghai/IMG_20250522_174301.jpg', rotation: 39 },
        { desc:'The view from the 119th floor (552m high)', coords:[121.50113, 31.23548], src:'data/IMG/2025/China/Shanghai/IMG_20250522_181211.jpg', rotation: 303 },
        { desc:'The view when lights turn on', coords:[121.50052, 31.235755], src:'data/IMG/2025/China/Shanghai/IMG_20250522_191006.jpg', rotation: 303 },
        { desc:'The view from behind at night', coords:[121.50145, 31.235975], src:'data/IMG/2025/China/Shanghai/IMG_20250522_193634.jpg', rotation: 48 },
        { desc:'The big 3 at night', coords:[121.49927, 31.23606], src:'data/IMG/2025/China/Shanghai/IMG_20250522_200940_1.jpg', rotation: 81 },
        { desc:'The big 3 at night', coords:[121.49914, 31.23708], src:'data/IMG/2025/China/Shanghai/IMG_20250522_201158.jpg', rotation: 91 },
        { desc:'The big 3 at night', coords:[121.49907, 31.23758], src:'data/IMG/2025/China/Shanghai/IMG_20250522_201412.jpg', rotation: 116 },
        { desc:'The area at night', coords:[121.49886, 31.23788], src:'data/IMG/2025/China/Shanghai/IMG_20250522_201436.jpg', rotation: 23 },
        { desc:'The oriental pearl at night', coords:[121.49868, 31.23884], src:'data/IMG/2025/China/Shanghai/IMG_20250522_201625.jpg', rotation: 317 },
        { desc:'The oriental pearl at night', coords:[121.49899, 31.23918], src:'data/IMG/2025/China/Shanghai/IMG_20250522_201803.jpg', rotation: 302 },
        { desc:'The oriental pearl at night', coords:[121.49908, 31.23928], src:'data/IMG/2025/China/Shanghai/IMG_20250522_201817.jpg', rotation: 305 },
        { desc:'The big 3 at night', coords:[121.49960, 31.23947], src:'data/IMG/2025/China/Shanghai/IMG_20250522_202027.jpg', rotation: 140 },
        { desc:'The oriental pearl at night', coords:[121.49709, 31.24056], src:'data/IMG/2025/China/Shanghai/IMG_20250522_202607.jpg', rotation: 307 },
        { desc:'The Bund', coords:[121.48631, 31.24173], src:'data/IMG/2025/China/Shanghai/IMG_20250522_204941.jpg', rotation: 104 },
        { desc:'Mao Zedong', coords:[121.48594, 31.24100], src:'data/IMG/2025/China/Shanghai/IMG_20250522_205306.jpg', rotation: 4 },
        { desc:'The people\'s brazer', coords:[121.48669, 31.24413], src:'data/IMG/2025/China/Shanghai/IMG_20250522_205940.jpg', rotation: 54 },
        { desc:'The bund with the brazer', coords:[121.48649, 31.24416], src:'data/IMG/2025/China/Shanghai/IMG_20250522_210154.jpg', rotation: 111 },
        /*Date with Xinrui*/
        { desc:'Start of my date with Xinrui', coords:[121.43297, 31.26360], src:'data/IMG/2025/China/Shanghai/IMG_20250523_000731.jpg' /*PAS DE ROTATION*/ }
		]
      },
	  
      {
        id: "hangzhou",
        name: "Hangzhou",
        lat: 30.27219,
        lng: 120.16244,
		zoom : 13,
        flatPhotos: [
		/*tourist street*/
        { desc:'Hefang street', coords:[120.16237, 30.24233], src:'data/IMG/2025/China/Hangzhou/IMG_20250521_102732.jpg', rotation: 87 },
        { desc:'Hefang street', coords:[120.16279, 30.24234], src:'data/IMG/2025/China/Hangzhou/IMG_20250521_102831.jpg', rotation: 23 },
        { desc:'Marco Polo\'s book in Chinese medicine museum', coords:[120.16425, 30.24220], src:'data/IMG/2025/China/Hangzhou/IMG_20250521_105933.jpg' /*PAS DE ROTATION*/  },
        /*Lake*/
        { desc:'Famous bridge', coords:[120.14823, 30.26160], src:'data/IMG/2025/China/Hangzhou/IMG_20250521_154618.jpg', rotation: 226 },
        { desc:'Beautiful walk', coords:[120.14517, 30.25887], src:'data/IMG/2025/China/Hangzhou/IMG_20250521_155357.jpg', rotation: 214 },
        { desc:'Beautiful gate', coords:[120.137691, 30.25252], src:'data/IMG/2025/China/Hangzhou/IMG_20250521_162017.jpg', rotation: 170 },
        { desc:'A little rest with duckling', coords:[120.13531, 30.25394], src:'data/IMG/2025/China/Hangzhou/IMG_20250521_175710_1.jpg' /*PAS DE ROTATION*/ },
        { desc:'City god pavillon above the lake', coords:[120.14120, 30.25955], src:'data/IMG/2025/China/Hangzhou/IMG_20250521_183158.jpg', rotation: 135 }
		]
      },
      {
        id: "guilin",
        name: "Guilin",
        lat: 25.19935,
        lng: 110.29449,
		zoom: 10,
        flatPhotos: [
		/*
		{ type: 'hotel', datedeb:'24/05/2025', datefin:'25/05/2025', coords:[110.29357, 25.27618] },
        { type: 'hotel', datedeb:'27/05/2025', datefin:'28/05/2025', coords:[110.28903, 25.28033] },
		*/
        /*The pagodas*/
        { desc:'The pagodas of moon and sun', coords:[110.29236, 25.27466], src:'data/IMG/2025/China/Guilin/IMG_20250524_203940.jpg', rotation: 259 },
        { desc:'The pagodas of moon and sun', coords:[110.29228, 25.27462], src:'data/IMG/2025/China/Guilin/IMG_20250524_203944.jpg', rotation: 259 },
        { desc:'The pagodas of moon and sun', coords:[110.291732, 25.27381], src:'data/IMG/2025/China/Guilin/IMG_20250524_204341.jpg', rotation: 293 },
        { desc:'The pagodas of moon and sun', coords:[110.29164, 25.27368], src:'data/IMG/2025/China/Guilin/IMG_20250524_204457.jpg', rotation: 297 },
        /*River trip*/
        { desc:'In the boat for the river trip to Yangshuo', coords:[110.42834, 25.14959], src:'data/IMG/2025/China/Guilin/IMG_20250525_113425.jpg', rotation: 329 },
        { desc:'The famous view of the 20RMB banknote', coords:[110.516288, 24.924486], src:'data/IMG/2025/China/Guilin/IMG_20250525_134720.jpg', rotation: 266 },
        { desc:'Cool view', coords:[110.51261, 24.91499], src:'data/IMG/2025/China/Guilin/IMG_20250525_135216.jpg', rotation: 294 },
        { desc:'Cool view', coords:[110.50263, 24.91022], src:'data/IMG/2025/China/Guilin/IMG_20250525_135454.jpg', rotation: 249 },
        /*Visiting*/
        { desc:'A little street', coords:[110.28963, 25.28083], src:'data/IMG/2025/China/Guilin/IMG_20250527_124224.jpg', rotation: 290 },
        /*Park*/
        { desc:'Dinosaur !', coords:[110.30750, 25.27165], src:'data/IMG/2025/China/Guilin/IMG_20250527_142433.jpg', rotation: 73 },
        { desc:'The 7 star park', coords:[110.30861, 25.27236], src:'data/IMG/2025/China/Guilin/IMG_20250527_142922.jpg', rotation: 292 },
        { desc:'Above the 7 star park viewing Guilin', coords:[110.30763, 25.27753], src:'data/IMG/2025/China/Guilin/IMG_20250527_151706.jpg', rotation: 289 },
        { desc:'Me going at the top', coords:[110.30750, 25.27736], src:'data/IMG/2025/China/Guilin/IMG_20250527_151931_1.jpg', rotation: 232 },
        { desc:'Free monkey in the park', coords:[110.30637, 25.27631], src:'data/IMG/2025/China/Guilin/IMG_20250527_152944.jpg', rotation: 125 },
        { desc:'Free red ass monkey', coords:[110.30529, 25.27427], src:'data/IMG/2025/China/Guilin/IMG_20250527_153507.jpg', rotation: 214 },
        /*ZOO*/
        { desc:'Tiger in the zoo', coords:[110.31151, 25.27326], src:'data/IMG/2025/China/Guilin/IMG_20250527_155156.jpg', rotation: 260 },
        { desc:'hippopotamus in the zoo', coords:[110.31153, 25.27311], src:'data/IMG/2025/China/Guilin/IMG_20250527_160108.jpg', rotation: 120 },
        { desc:'Flamingo', coords:[110.31182, 25.27274], src:'data/IMG/2025/China/Guilin/IMG_20250527_160408.jpg', rotation: 61 },
        { desc:'Japanese crane', coords:[110.31191, 25.27270], src:'data/IMG/2025/China/Guilin/IMG_20250527_160419_1.jpg', rotation: 14 },
        { desc:'Wolves', coords:[110.31245, 25.27215], src:'data/IMG/2025/China/Guilin/IMG_20250527_160609.jpg', rotation: 43 },
        /*Park*/
        { desc:'Ladies dressed', coords:[110.30856, 25.27219], src:'data/IMG/2025/China/Guilin/IMG_20250527_163909.jpg', rotation: 335 },
        { desc:'Longyin cave', coords:[110.30147, 25.27459], src:'data/IMG/2025/China/Guilin/IMG_20250527_170519.jpg', rotation: 89 },
        { desc:'Longyin cave', coords:[110.30176, 25.27465], src:'data/IMG/2025/China/Guilin/IMG_20250527_170628.jpg', rotation: 235 }
		]
      },
      {
        id: "yangshuo",
        name: "Yangshuo",
        lat: 24.74519,
        lng: 110.48126,
		zoom: 13,
        flatPhotos: [
		/*
		{ type: 'hotel', datedeb:'25/05/2025', datefin:'27/05/2025', coords:[110.49081, 24.77598] },
		*/
        /*Visiting the city*/
        { desc:'Arriving by boat at Yangshuo', coords:[110.49659, 24.78710], src:'data/IMG/2025/China/Yangshuo/IMG_20250525_145400.jpg', rotation: 17 },
        { desc:'The view outside of my hotel', coords:[110.48936, 24.77612], src:'data/IMG/2025/China/Yangshuo/IMG_20250525_175531.jpg', rotation: 319 },
        { desc:'A little walk in a park', coords:[110.48351, 24.77961], src:'data/IMG/2025/China/Yangshuo/IMG_20250525_181556.jpg', rotation: 119 },
        { desc:'A little walk in a park', coords:[110.48428, 24.77971], src:'data/IMG/2025/China/Yangshuo/IMG_20250525_181810.jpg', rotation: 97 },
        { desc:'A cute bridge', coords:[110.48458, 24.78024], src:'data/IMG/2025/China/Yangshuo/IMG_20250525_182453.jpg', rotation: 60 },
        { desc:'A cute little park', coords:[110.48617, 24.78034], src:'data/IMG/2025/China/Yangshuo/IMG_20250525_184237.jpg', rotation: 272 },
        { desc:'A little street', coords:[110.49183, 24.77960], src:'data/IMG/2025/China/Yangshuo/IMG_20250525_190324.jpg', rotation: 187 },
        /*Going to the little hills*/
        { desc:'View of the dragon path', coords:[110.45666, 24.69113], src:'data/IMG/2025/China/Yangshuo/IMG_20250526_123532.jpg', rotation: 22 },
        { desc:'View of the bridge', coords:[110.45639, 24.69131], src:'data/IMG/2025/China/Yangshuo/IMG_20250526_123542.jpg', rotation: 334 },
        { desc:'View of the dragon path', coords:[110.45633, 24.69120], src:'data/IMG/2025/China/Yangshuo/IMG_20250526_123804.jpg', rotation: 37 },
        { desc:'The bridge', coords:[110.45622, 24.69130], src:'data/IMG/2025/China/Yangshuo/IMG_20250526_124020.jpg', rotation: 347 },
        { desc:'The bridge full of wish from people', coords:[110.45611, 24.69139], src:'data/IMG/2025/China/Yangshuo/IMG_20250526_124050.jpg', rotation: 4 },
        { desc:'The bridge and the landscape', coords:[110.45614, 24.69133], src:'data/IMG/2025/China/Yangshuo/IMG_20250526_124223.jpg', rotation: 338 },
        { desc:'View from above', coords:[110.45458, 24.69437], src:'data/IMG/2025/China/Yangshuo/IMG_20250526_130243.jpg', rotation: 349 },
        { desc:'Me and the hills', coords:[110.45467, 24.69440], src:'data/IMG/2025/China/Yangshuo/IMG_20250526_130328.jpg', rotation: 352 },
        { desc:'View', coords:[110.45472, 24.69425], src:'data/IMG/2025/China/Yangshuo/IMG_20250526_130457.jpg', rotation: 78 },
        { desc:'Rabbit and pumpkin on the dragon path', coords:[110.45752, 24.69332], src:'data/IMG/2025/China/Yangshuo/IMG_20250526_132737.jpg', rotation: 152 },
        { desc:'Glass path on a cliff', coords:[110.45862, 24.69208], src:'data/IMG/2025/China/Yangshuo/IMG_20250526_133616.jpg', rotation: 172 },
        { desc:'Cable car leaving the hills', coords:[110.45896, 24.68943], src:'data/IMG/2025/China/Yangshuo/IMG_20250526_135945.jpg', rotation: 142 },
        /*Visiting the parks*/
        { desc:'A park', coords:[110.48247, 24.73450], src:'data/IMG/2025/China/Yangshuo/IMG_20250526_162002.jpg', rotation: 294 },
        { desc:'Sacred tree', coords:[110.48052, 24.73471], src:'data/IMG/2025/China/Yangshuo/IMG_20250526_165025.jpg', rotation: 141 },
        { desc:'Cool view', coords:[110.48557, 24.73719], src:'data/IMG/2025/China/Yangshuo/IMG_20250526_170650.jpg', rotation: 58 },
        { desc:'Cool view from the bridge', coords:[110.48621, 24.73716], src:'data/IMG/2025/China/Yangshuo/IMG_20250526_171317.jpg', rotation: 308 },
        { desc:'Me on the bridge', coords:[110.48627, 24.73727], src:'data/IMG/2025/China/Yangshuo/IMG_20250526_171349.jpg', rotation: 57 },
        { desc:'field of water lilies', coords:[110.49065, 24.74373], src:'data/IMG/2025/China/Yangshuo/IMG_20250526_173403.jpg', rotation: 167 },
        { desc:'Durian seller', coords:[110.48767, 24.75080], src:'data/IMG/2025/China/Yangshuo/IMG_20250526_174721.jpg', rotation: 2 },
        { desc:'Cool view', coords:[110.48708, 24.75336], src:'data/IMG/2025/China/Yangshuo/IMG_20250526_175136.jpg', rotation: 222 },
        { desc:'Big pink statue', coords:[110.48920, 24.7668], src:'data/IMG/2025/China/Yangshuo/IMG_20250526_181355.jpg', rotation: 263 },
        /*Impression Liu Sanjie*/
        { desc:'Enter of the Impression Liu Sanjie', coords:[110.50185, 24.76819], src:'data/IMG/2025/China/Yangshuo/IMG_20250526_195417.jpg', rotation: 54 },
        { desc:'Start of the show', coords:[110.50577, 24.77105], src:'data/IMG/2025/China/Yangshuo/IMG_20250526_200533.jpg', rotation: 42 },
        { desc:'Middle of the show', coords:[110.50581, 24.77104], src:'data/IMG/2025/China/Yangshuo/IMG_20250526_202232.jpg', rotation: 42 },
        { desc:'Going back from the show', coords:[110.49783, 24.76995], src:'data/IMG/2025/China/Yangshuo/IMG_20250526_212603.jpg', rotation: 324 }
		]
      },
      {
        id: "tianjin",
        name: "Tianjin",
        lat: 39.13891,
        lng: 117.18824,
		zoom: 13,
        flatPhotos: [
		/*visit of the city*/
        { desc:'Century clock', coords:[117.20000, 39.13255], src:'data/IMG/2025/China/Tianjin/IMG_20250529_100703.jpg', rotation: 280 },
        { desc:'Century clock', coords:[117.20001, 39.13251], src:'data/IMG/2025/China/Tianjin/IMG_20250529_100714.jpg', rotation: 280 },
        { desc:'La Défense from China', coords:[117.19594, 39.13045], src:'data/IMG/2025/China/Tianjin/IMG_20250529_102057.jpg', rotation: 246 },
        /*Antiquity streets*/
        { desc:'Antiquity street', coords:[117.19043, 39.12548], src:'data/IMG/2025/China/Tianjin/IMG_20250529_105243.jpg', rotation: 30 },
        { desc:'I think i bought it in this street maybe at 10/11am (took this photo in my hotel at night)', coords:[117.19054, 39.12562], src:'data/IMG/2025/China/Tianjin/IMG_20250529_225805.jpg' },
        /*Visiting*/
        { desc:'Beautiful bridge', coords:[117.18796, 39.13232], src:'data/IMG/2025/China/Tianjin/IMG_20250529_120417.jpg', rotation: 75 },
        { desc:'Beautiful bridge', coords:[117.18775, 39.13266], src:'data/IMG/2025/China/Tianjin/IMG_20250529_120546.jpg', rotation: 110 },
        { desc:'Beautiful bridge', coords:[117.18743, 39.13331], src:'data/IMG/2025/China/Tianjin/IMG_20250529_120712.jpg', rotation: 136 },
        { desc:'Italian style buildings', coords:[117.18722, 39.13622], src:'data/IMG/2025/China/Tianjin/IMG_20250529_121129.jpg', rotation: 61 },
        { desc:'Soviet tank', coords:[117.18681, 39.13988], src:'data/IMG/2025/China/Tianjin/IMG_20250529_121939.jpg', rotation: 285 },
        { desc:'Church', coords:[117.18629, 39.14004], src:'data/IMG/2025/China/Tianjin/IMG_20250529_122049.jpg', rotation: 190 },
        { desc:'Beautiful street with gate', coords:[117.18659, 39.140383], src:'data/IMG/2025/China/Tianjin/IMG_20250529_123102.jpg', rotation: 359 },
        { desc:'Beautiful buildings', coords:[117.18660, 39.14091], src:'data/IMG/2025/China/Tianjin/IMG_20250529_123140.jpg', rotation: 347 },
        { desc:'Beautiful street', coords:[117.18661, 39.14133], src:'data/IMG/2025/China/Tianjin/IMG_20250529_123309.jpg', rotation: 356 },
        { desc:'Beautiful street', coords:[117.18644, 39.14273], src:'data/IMG/2025/China/Tianjin/IMG_20250529_123715.jpg', rotation: 329 },
        { desc:'Tianjin\'s dock and the ferris wheel', coords:[117.18455, 39.14841], src:'data/IMG/2025/China/Tianjin/IMG_20250529_142105.jpg', rotation: 328 },
        { desc:'Buddhism temple', coords:[117.18300, 39.15381], src:'data/IMG/2025/China/Tianjin/IMG_20250529_144733.jpg', rotation: 65 },
        /*Italian concession*/
        { desc:'Cool church Sainte Victoire - 1869', coords:[117.18851, 39.14635], src:'data/IMG/2025/China/Tianjin/IMG_20250529_150828.jpg', rotation: 46 },
        { desc:'Statue of Dante', coords:[117.19398, 39.13291], src:'data/IMG/2025/China/Tianjin/IMG_20250529_164259.jpg', rotation: 42 },
        { desc:'Cool tower', coords:[117.19019, 39.13360], src:'data/IMG/2025/China/Tianjin/IMG_20250529_165031.jpg', rotation: 330 },
        { desc:'Stylish bridge', coords:[117.18958, 39.13238], src:'data/IMG/2025/China/Tianjin/IMG_20250529_165754.jpg', rotation: 275 },
        { desc:'Marco Polo square', coords:[117.19231, 39.13322], src:'data/IMG/2025/China/Tianjin/IMG_20250529_170730.jpg', rotation: 16 },
        { desc:'The bible of maps', coords:[117.19287, 39.13402], src:'data/IMG/2025/China/Tianjin/IMG_20250529_172047.jpg' /*PAS DE ROTATION*/ },
        { desc:'The interior of the library', coords:[117.19278, 39.13405], src:'data/IMG/2025/China/Tianjin/IMG_20250529_172230.jpg', rotation: 112 },
        { desc:'The exterior of the library', coords:[117.19265, 39.13408], src:'data/IMG/2025/China/Tianjin/IMG_20250529_172251.jpg', rotation: 116 },
        { desc:'Apéro time with my bible', coords:[117.1912, 39.13370], src:'data/IMG/2025/China/Tianjin/IMG_20250529_180516.jpg', rotation: 307 },
        /*Going back to the train station*/
        { desc:'Chinese la Défense by night', coords:[117.19112, 39.13077], src:'data/IMG/2025/China/Tianjin/IMG_20250529_195447.jpg', rotation: 174 },
        { desc:'Financial center tower', coords:[117.19313, 39.12997], src:'data/IMG/2025/China/Tianjin/IMG_20250529_195706.jpg', rotation: 119 },
        { desc:'Tianjin dock before leaving', coords:[117.19884, 39.13174], src:'data/IMG/2025/China/Tianjin/IMG_20250529_201045.jpg', rotation: 201 }
		]
      }
    ]
  },

  {
    year: 2025,
    id: "2025_central_europe",
    name: "July 2025 - Central Europe",
    cities: [
      {
	  id: "munich",
	  name: "Munich",
	  lat: 48.13877,
	  lng: 11.57375,
	  zoom: 13,
	  flatPhotos: [
		/*
		{ type: 'hotel', datedeb:'11/07/2025', datefin:'13/07/2025', coords:[11.622536, 48.136962] },
		*/
         { desc:'Marienplatz', coords:[11.57566, 48.13707], src:'data/IMG/2025/Central Europe/Munich/IMG_20250712_145518.jpg', rotation: 349 },
         { desc:'Cathedral', coords:[11.57251, 48.13863], src:'data/IMG/2025/Central Europe/Munich/IMG_20250712_173138.jpg', rotation: 100 },
         { desc:'Beer at the englischergarten', coords:[11.59248, 48.15229], src:'data/IMG/2025/Central Europe/Munich/IMG_20250712_193124.jpg', rotation: 70 },
         { desc:'Leaving the garten', coords:[11.596034, 48.1503655], src:'data/IMG/2025/Central Europe/Munich/IMG_20250712_203324.jpg', rotation: 340 },
         { desc:'Waiting for her laundry', coords:[11.60667, 48.12429], src:'data/IMG/2025/Central Europe/Munich/IMG_20250712_221519.jpg', rotation: 245 },
           
         { desc:'Last meal before the end', coords:[11.56099, 48.13865], src:'data/IMG/2025/Central Europe/Munich/IMG_20250727_140041.jpg', rotation: 270 }
	  ]
	},
      {
	  id: "marquartstein",
	  name: "Marquartstein",
	  lat: 47.75647,
	  lng: 12.46334,
	  zoom: 15,
	  flatPhotos: [
		{ desc:'On a walk', coords:[12.46436, 47.757624], src:'data/IMG/2025/Central Europe/Marquartstein/IMG_20250713_135813.jpg', rotation: 104 },
        { desc:'Cute girl and a bin', coords:[12.465336, 47.75557], src:'data/IMG/2025/Central Europe/Marquartstein/IMG_20250713_140715.jpg', rotation: 162 },
        { desc:'The lion girl', coords:[12.46704, 47.75209], src:'data/IMG/2025/Central Europe/Marquartstein/IMG_20250713_141521.jpg', rotation: 282 },
        { desc:'Barbie was lost', coords:[12.46681, 47.751229], src:'data/IMG/2025/Central Europe/Marquartstein/IMG_20250713_141835.jpg', rotation: 290 },
        { desc:'Fuck the rain', coords:[12.463480, 47.759179], src:'data/IMG/2025/Central Europe/Marquartstein/IMG_20250713_150552.jpg', rotation: 98 }
	  ]
	  },
      {
	  id: "salzburg",
	  name: "Salzburg",
	  lat: 47.80361,
	  lng: 13.04145,
	  zoom: 14,
	  flatPhotos: [
		/*
		{ type: 'hotel', datedeb:'13/07/2025', datefin:'15/07/2025', coords:[13.037606, 47.810420] },
		*/
        { desc:'Beautiful view of the old town', coords:[13.04112, 47.802834], src:'data/IMG/2025/Central Europe/Salzburg/IMG_20250713_183644.jpg', rotation: 151 },
        { desc:'Mozart Diner Concert', coords:[13.0441398, 47.7970268], src:'data/IMG/2025/Central Europe/Salzburg/IMG_20250713_185800.jpg', rotation: 120 },
        { desc:'Us after the Mozart Diner Concert on not very legal stands', coords:[13.04546, 47.797928], src:'data/IMG/2025/Central Europe/Salzburg/IMG_20250713_220915.jpg', rotation: 315 },

        { desc:'Beautiful night sky view', coords:[13.037349, 47.804998], src:'data/IMG/2025/Central Europe/Salzburg/IMG_20250714_012446.jpg', rotation: 151 },
        { desc:'My street', coords:[13.03803, 47.810573], src:'data/IMG/2025/Central Europe/Salzburg/IMG_20250714_115800.jpg', rotation: 1 },
        { desc:'Mozart Birth Place', coords:[13.043580, 47.79991], src:'data/IMG/2025/Central Europe/Salzburg/IMG_20250714_131540.jpg', rotation: 163 },
        { desc:'Roof of the Castle', coords:[13.046522, 47.794979], src:'data/IMG/2025/Central Europe/Salzburg/IMG_20250714_165226.jpg', rotation: 135 },
        { desc:'First evening apéro ', coords:[13.052116, 47.796713], src:'data/IMG/2025/Central Europe/Salzburg/IMG_20250714_214406.jpg', rotation: 10 }
	  ]
	  },
      { id: "budapest",
	  name: "Budapest",
	  lat: 47.50485,
	  lng: 19.06059,
	  zoom: 13,
	  flatPhotos: [
		/*
		{ type: 'hotel', datedeb:'18/07/2025', datefin:'21/07/2025', coords:[19.0628424, 47.4977553] },
		*/
        { desc:'Piece of Berlin wall', coords:[19.06529, 47.50668], src:'data/IMG/2025/Central Europe/Budapest/IMG_20250718_185336.jpg', rotation: 35 },
        { desc:'Iron curtain', coords:[19.06544, 47.50679], src:'data/IMG/2025/Central Europe/Budapest/IMG_20250718_185723.jpg', rotation: 210 },
        { desc:'Heroes square', coords:[19.077351, 47.514584], src:'data/IMG/2025/Central Europe/Budapest/IMG_20250718_191011.jpg', rotation: 41 },
        { desc:'The cutest', coords:[19.080105, 47.516005], src:'data/IMG/2025/Central Europe/Budapest/IMG_20250718_193447.jpg', rotation: 336 },
        { desc:'Us and the castle of Vajdahunyad', coords:[19.0816144, 47.5159559], src:'data/IMG/2025/Central Europe/Budapest/IMG_20250718_194127.jpg', rotation: 128 },
        { desc:'Us and the castel of Pest', coords:[19.08303, 47.51652], src:'data/IMG/2025/Central Europe/Budapest/IMG_20250718_195500.jpg', rotation: 209 },
        { desc:'Entering the Ruin bar', coords:[19.06335, 47.497006], src:'data/IMG/2025/Central Europe/Budapest/IMG_20250718_205500.jpg', rotation: 247 },
        { desc:'Me and a drunk guy', coords:[19.06284, 47.49683], src:'data/IMG/2025/Central Europe/Budapest/IMG_20250718_223000.jpg', rotation: 340 },
          
        { desc:'In the Ruin bar', coords:[19.06299, 47.49687], src:'data/IMG/2025/Central Europe/Budapest/IMG_20250719_002000.jpg', rotation: 87 },
        { desc:'Ruin bar', coords:[19.06287432, 47.49678406], src:'data/IMG/2025/Central Europe/Budapest/IMG_20250719_003008.jpg', rotation: 80 },
        { desc:'Snow White and the bird', coords:[19.06256, 47.497044], src:'data/IMG/2025/Central Europe/Budapest/IMG_20250719_121752.jpg', rotation: 248 },
        { desc:'Going to the Museum in the castle of Buda', coords:[19.041502, 47.495178], src:'data/IMG/2025/Central Europe/Budapest/IMG_20250719_133222.jpg', rotation: 26 },
        { desc:'Resting time in the museum', coords:[19.039736, 47.495084], src:'data/IMG/2025/Central Europe/Budapest/IMG_20250719_154009.jpg', rotation: 45 },
        { desc:'Photo of us', coords:[19.041387, 47.495095], src:'data/IMG/2025/Central Europe/Budapest/IMG_20250719_171040.jpg', rotation: 14 },
        { desc:'Fishermen\'s church', coords:[19.033740, 47.501323], src:'data/IMG/2025/Central Europe/Budapest/IMG_20250719_183722.jpg', rotation: 18 },
        { desc:'My beauty and the parliament', coords:[19.03952892, 47.506152106], src:'data/IMG/2025/Central Europe/Budapest/IMG_20250719_200219.jpg', rotation: 86 },
          
        { desc:'Parliament of Budapest', coords:[19.04688, 47.50800], src:'data/IMG/2025/Central Europe/Budapest/IMG_20250720_192616.jpg', rotation: 244 },
          
        { desc:'On the way to the thermal baths', coords:[19.06856, 47.50860], src:'data/IMG/2025/Central Europe/Budapest/IMG_20250721_111258_1.jpg', rotation: 43 },
        { desc:'Luggage locker', coords:[19.08311, 47.50028], src:'data/IMG/2025/Central Europe/Budapest/IMG_20250721_165000.jpg', rotation: 79 }
	  ]
	  },
      {
	  id: "prague",
	  name: "Prague",
	  lat: 50.08834,
	  lng: 14.41981,
	  zoom:14,
	  flatPhotos: [
		/*
		{ type: 'hotel', datedeb:'21/07/2025', datefin:'24/07/2025', coords:[14.454204, 50.094476] },
		*/
        { desc:'Distorting mirror', coords:[14.42559, 50.08526], src:'data/IMG/2025/Central Europe/Prague/IMG_20250722_135000.jpg', rotation: 40 },
        { desc:'Powder tower', coords:[14.42802, 50.08691], src:'data/IMG/2025/Central Europe/Prague/IMG_20250722_140357.jpg', rotation: 335 },
        { desc:'Astronomical clock', coords:[14.42091, 50.08690], src:'data/IMG/2025/Central Europe/Prague/IMG_20250722_144513.jpg', rotation: 328 },
        { desc:'Astronomical clock\'s square', coords:[14.42125, 50.08711], src:'data/IMG/2025/Central Europe/Prague/IMG_20250722_144953.jpg', rotation: 27 },
        { desc:'Forced to eat', coords:[14.41971, 50.08665], src:'data/IMG/2025/Central Europe/Prague/IMG_20250722_154732.jpg', rotation: 316 },
        { desc:'Riding a wooden D', coords:[14.42076, 50.08628], src:'data/IMG/2025/Central Europe/Prague/IMG_20250722_174552.jpg', rotation: 12 },
        { desc:'The biggest', coords:[14.42082, 50.08628], src:'data/IMG/2025/Central Europe/Prague/IMG_20250722_182000.jpg', rotation: 25 },
        { desc:'Old tavern', coords:[14.40156, 50.08898], src:'data/IMG/2025/Central Europe/Prague/IMG_20250722_204124.jpg', rotation: 114 },
        { desc:'Us in the tavern', coords:[14.40155, 50.08893], src:'data/IMG/2025/Central Europe/Prague/IMG_20250722_210000.jpg' /*PAS DE ROTATION CAR POINTE AU DESSUS*/ },
        /*{ desc:'How we see inside', coords:[14.40153, 50.08891], src:'data/IMG/2025/Central Europe/Prague/GIF_20250722_220100.gif' },*/
        
        { desc:'Church of the infant Jesus', coords:[14.40365, 50.08572], src:'data/IMG/2025/Central Europe/Prague/IMG_20250723_165037.jpg', rotation: 253 },
        { desc:'Man hanging out', coords:[14.41827, 50.08440], src:'data/IMG/2025/Central Europe/Prague/IMG_20250723_144739.jpg', rotation: 182 },
        { desc:'Umbrella man', coords:[14.41814, 50.07778], src:'data/IMG/2025/Central Europe/Prague/IMG_20250723_151216.jpg', rotation: 236 },
        { desc:'Umbrella woman', coords:[14.41788, 50.07753], src:'data/IMG/2025/Central Europe/Prague/IMG_20250723_151506.jpg', rotation: 41 },
        { desc:'The dancing house', coords:[14.41420, 50.07587], src:'data/IMG/2025/Central Europe/Prague/IMG_20250723_152347.jpg', rotation: 191 },
        { desc:'View of the famous bridge', coords:[14.41314, 50.08354], src:'data/IMG/2025/Central Europe/Prague/IMG_20250723_153923.jpg', rotation: 323 },
        { desc:'The Lennon Wall', coords:[14.40678, 50.08620], src:'data/IMG/2025/Central Europe/Prague/IMG_20250723_175453.jpg', rotation: 219 },
        { desc:'The Lennon wall', coords:[14.406930, 50.086249], src:'data/IMG/2025/Central Europe/Prague/IMG_20250723_180908.jpg', rotation: 11 },
        { desc:'Frog guy with a frog on the Lennon wall', coords:[14.406810, 50.086249], src:'data/IMG/2025/Central Europe/Prague/IMG_20250723_181500.jpg', rotation: 348 },
        { desc:'Delicious meal in a pub', coords:[14.40824, 50.08629], src:'data/IMG/2025/Central Europe/Prague/IMG_20250723_185200.jpg', rotation: 180 },
        { desc:'Us on the bridge', coords:[14.40961, 50.08667], src:'data/IMG/2025/Central Europe/Prague/IMG_20250723_202523.jpg', rotation: 162 },
        { desc:'London underground bar', coords:[14.41934, 50.08147], src:'data/IMG/2025/Central Europe/Prague/IMG_20250723_205251.jpg', rotation: 120 }
	  ]
	  },
      { 
	  id: "regensburg",
	  name: "Regensburg",
	  lat: 49.02090,
	  lng: 12.09817,
	  zoom: 14,
	  flatPhotos: [
	  	/*
		{ type: 'hotel', datedeb:'24/07/2025', datefin:'25/07/2025', coords:[12.107303, 49.014029] },
		*/
        { desc:'An old tower', coords:[12.10843, 49.01792], src:'data/IMG/2025/Central Europe/Regensburg/IMG_20250725_121358.jpg', rotation: 304 },
        { desc:'Café Lorraine', coords:[12.10154, 49.01750], src:'data/IMG/2025/Central Europe/Regensburg/IMG_20250725_125458.jpg', rotation: 90 },
        { desc:'Map of the middle-age town', coords:[12.09781, 49.02095], src:'data/IMG/2025/Central Europe/Regensburg/IMG_20250725_150953.jpg', rotation: 210 },
        { desc:'Us on the old bridge', coords:[12.09711, 49.02176], src:'data/IMG/2025/Central Europe/Regensburg/IMG_20250725_151922.jpg', rotation: 284 },
        { desc:'View of Regensburg', coords:[12.10189, 49.02126], src:'data/IMG/2025/Central Europe/Regensburg/IMG_20250725_165907.jpg', rotation: 248 },
        { desc:'A 2000 years old tower from roman empire', coords:[12.09900, 49.02013], src:'data/IMG/2025/Central Europe/Regensburg/IMG_20250725_170604.jpg', rotation: 275 }
	  ]
	  },
	  
      {
	  id: "ulm",
	  name: "Ulm",
	  lat: 48.39702,
	  lng: 9.99064,
	  zoom: 15,
	  flatPhotos: [
		/*
		{ type: 'hotel', datedeb:'25/07/2025', datefin:'27/07/2025', coords:[9.983286, 48.39558] },
		*/
        { desc:'No room...', coords:[9.983286, 48.39558], src:'data/IMG/2025/Central Europe/Ulm/IMG_20250726_031056.jpg', rotation: 5 },
        { desc:'The tallest cathedral in the world', coords:[9.990807, 48.39833], src:'data/IMG/2025/Central Europe/Ulm/IMG_20250726_143246.jpg', rotation: 69 },
        { desc:'The townhall', coords:[9.993648, 48.39700], src:'data/IMG/2025/Central Europe/Ulm/IMG_20250726_160509.jpg', rotation: 250 },
        { desc:'The most leaning hotel in the world', coords:[9.991303, 48.39557], src:'data/IMG/2025/Central Europe/Ulm/IMG_20250726_162846.jpg', rotation: 313 },
        { desc:'Cute bridge, river and us', coords:[9.9909279, 48.395416], src:'data/IMG/2025/Central Europe/Ulm/IMG_20250726_163153.jpg', rotation: 288 },
        { desc:'Mona loser', coords:[9.99772, 48.39899], src:'data/IMG/2025/Central Europe/Ulm/IMG_20250726_175104.jpg', rotation: 103 },
        { desc:'Einstein fountain', coords:[10.001146, 48.400465], src:'data/IMG/2025/Central Europe/Ulm/IMG_20250726_180211.jpg', rotation: 47 },
        { desc:'Einstein fountain', coords:[10.001115, 48.40041], src:'data/IMG/2025/Central Europe/Ulm/IMG_20250726_180300.jpg', rotation: 47 }
	  ]
	  }
    ]
  },

  {
    year: 2025,
    id: "2025_australia",
    name: "December 2025 - Australia",
    cities: [
      {
	  id: "adelaide",
	  name: "Adelaide",
	  lat: -34.92777,
	  lng: 138.59973,
	  zoom: 13,
	  flatPhotos: [
		/*
		{ type: 'hotel', datedeb:'06/12/2025', datefin:'13/12/2025', coords:[138.5928234706278,-34.92695859199718] },
        { type: 'hotel', datedeb:'13/12/2025', datefin:'18/12/2025', coords:[138.51148168154995,-35.0007250433274] },
        { type: 'hotel', datedeb:'18/12/2025', datefin:'20/12/2025', coords:[138.59888483173975,-34.92411928356853] },
		*/
        { desc:'She gave me the macca\'s hat', coords:[138.5927458,-34.926958], src:'data/IMG/2025/Australia/Adelaide/IMG_20251207_112751.jpg'},
        { desc:'Emergency :)', coords:[138.586609,-34.921057], src:'data/IMG/2025/Australia/Adelaide/IMG_20251207_145221.jpg'},
        { desc:'Korean BBQ', coords:[138.59547,-34.9305], src:'data/IMG/2025/Australia/Adelaide/IMG_20251207_182656.jpg' },
        { desc:'Second time at the emergency', coords:[138.586693,-34.920908], src:'data/IMG/2025/Australia/Adelaide/IMG_20251208_065357.jpg'},
        { desc:'At a vietnamese restaurant', coords:[138.592832,-34.923453], src:'data/IMG/2025/Australia/Adelaide/IMG_20251208_192544.jpg' },
        { desc:'The smelly cheese :)', coords:[138.59736,-34.92963], src:'data/IMG/2025/Australia/Adelaide/IMG_20251209_102235.jpg' },
        { desc:'KROISSANT', coords:[138.5975362,-34.92960], src:'data/IMG/2025/Australia/Adelaide/IMG_20251209_102730.jpg'},
        { desc:'Delicious', coords:[138.597292,-34.92934], src:'data/IMG/2025/Australia/Adelaide/IMG_20251209_110335.jpg'},
        { desc:'French-style cheese', coords:[138.59709,-34.92987], src:'data/IMG/2025/Australia/Adelaide/IMG_20251209_115738.jpg'},
        { desc:'Our car (Hyundai Venue)', coords:[138.592650,-34.92516], src:'data/IMG/2025/Australia/Adelaide/IMG_20251209_123452.jpg', rotation: 36 },
        { desc:'Beautiful trees', coords:[138.59357,-34.9261], src:'data/IMG/2025/Australia/Adelaide/IMG_20251209_141204.jpg', rotation: 173 },
        { desc:'Us', coords:[138.59364,-34.92617], src:'data/IMG/2025/Australia/Adelaide/IMG_20251209_141212.jpg'},
        { desc:'Gingerbread event', coords:[138.5977116,-34.92182292], src:'data/IMG/2025/Australia/Adelaide/IMG_20251209_142557.jpg'},
        { desc:'The designer at work', coords:[138.5977304,-34.92183011], src:'data/IMG/2025/Australia/Adelaide/IMG_20251209_150026.jpg'},
        { desc:'Hainanese retaurant', coords:[138.59926,-34.92567], src:'data/IMG/2025/Australia/Adelaide/IMG_20251210_141439.jpg'},
        { desc:'Cosplay before the cinema', coords:[138.59261507,-34.926999], src:'data/IMG/2025/Australia/Adelaide/IMG_20251210_172123.jpg'},
        { desc:'Photo at the cinema', coords:[138.60949,-34.92200], src:'data/IMG/2025/Australia/Adelaide/IMG_20251210_180337.jpg'},
        { desc:'At the restaurant just after the movie', coords:[138.60776,-34.92275], src:'data/IMG/2025/Australia/Adelaide/IMG_20251210_202010.jpg'},
        { desc:'Delicious steak and tiramisu', coords:[138.60771,-34.92268], src:'data/IMG/2025/Australia/Adelaide/IMG_20251210_202936.jpg'},
        { desc:'Brazilian restaurant', coords:[138.593251,-34.92716], src:'data/IMG/2025/Australia/Adelaide/IMG_20251211_160349.jpg'},
        { desc:'Cute photo', coords:[138.592527,-34.927179], src:'data/IMG/2025/Australia/Adelaide/IMG_20251211_164920.jpg'},
        { desc:'Cute photo', coords:[138.59255,-34.927158], src:'data/IMG/2025/Australia/Adelaide/IMG_20251211_164925.jpg'},
        { desc:'Too cute', coords:[138.5927599103,-34.925166459], src:'data/IMG/2025/Australia/Adelaide/IMG_20251211_223013.jpg'},
        { desc:'Too cute', coords:[138.59276527,-34.92510547], src:'data/IMG/2025/Australia/Adelaide/IMG_20251211_223031.jpg'},
        { desc:'Too cute', coords:[138.592719677,-34.9251200], src:'data/IMG/2025/Australia/Adelaide/IMG_20251211_223045.jpg'},
        { desc:'Chess at the uni at night', coords:[138.604356,-34.918901], src:'data/IMG/2025/Australia/Adelaide/IMG_20251211_234856.jpg'},
        { desc:'Chinese-size\'s tree', coords:[138.60451,-34.91856], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_002132.jpg', rotation: 220 },
        { desc:'View of a part of the city from a hill', coords:[138.69697233,-34.93144431], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_004713.jpg', rotation: 266 },
        { desc:'Us and the view', coords:[138.696913326,-34.9314501], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_010618.jpg', rotation: 266 },
        { desc:'Us', coords:[138.696827496,-34.9314111], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_010926.jpg'},
        { desc:'The spa', coords:[138.59307734,-34.926937], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_102104.jpg'},
        { desc:'The swimming pool', coords:[138.59307734,-34.926937], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_102046.jpg'},
        { desc:'The national wine center cave (full of french wine)', coords:[138.6140957,-34.919488], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_151342.jpg'},
        { desc:'Wine we tried', coords:[138.61387,-34.9197], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_154135.jpg'},
        { desc:'Wine we tried', coords:[138.61387,-34.9197], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_154150.jpg'},
        { desc:'Wine we tried', coords:[138.61387,-34.9197], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_155630.jpg'},
        { desc:'Wine we tried', coords:[138.61387,-34.9197], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_155646.jpg'},
        { desc:'Meal for the wines', coords:[138.61387,-34.9197], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_155649.jpg'},
        { desc:'Wine we tried', coords:[138.61387,-34.9197], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_161106.jpg'},
        { desc:'Wine we tried', coords:[138.61387,-34.9197], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_161813.jpg'},
        { desc:'Wine we tried', coords:[138.61387,-34.9197], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_164609.jpg'},
        { desc:'Wine we tried', coords:[138.61387,-34.9197], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_164621.jpg'},
        { desc:'Wine we tried', coords:[138.61387,-34.9197], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_165116.jpg'},
        { desc:'Wine we tried', coords:[138.61387,-34.9197], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_165130.jpg'},
        { desc:'Wine we tried', coords:[138.61387,-34.9197], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_165142.jpg'},
        { desc:'Punk pigeon', coords:[138.61302015,-34.919571], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_172129.jpg'},
        { desc:'A bird', coords:[138.61293432,-34.9194985], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_172351.jpg'},
        { desc:'another bird', coords:[138.6125910,-34.918978], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_172608.jpg'},
        { desc:'Hungry parrot', coords:[138.610834,-34.917878], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_181020.jpg'},
        { desc:'Hungry parrot', coords:[138.610785,-34.917908], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_181216.jpg'},
        { desc:'big trees alley', coords:[138.61028,-34.91781], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_181550.jpg', rotation: 358 },
        { desc:'Ibis', coords:[138.61032,-34.91674], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_181737.jpg'},
        { desc:'Beautiful tree', coords:[138.60702,-34.91638], src:'data/IMG/2025/Australia/Adelaide/IMG_20251212_182807.jpg', rotation: 350 },
        { desc:'Cute girl', coords:[138.59276,-34.92691], src:'data/IMG/2025/Australia/Adelaide/IMG_20251213_090504.jpg'},
        { desc:'My lego gf', coords:[138.60099,-34.9223], src:'data/IMG/2025/Australia/Adelaide/IMG_20251213_124641.jpg'},
        { desc:'Aahhh souvenirs', coords:[138.59992,-34.92282], src:'data/IMG/2025/Australia/Adelaide/IMG_20251213_140657.jpg'},
        { desc:'New apartment', coords:[138.511470,-35.00070], src:'data/IMG/2025/Australia/Adelaide/IMG_20251213_170452.jpg'},
        { desc:'Ouch remover', coords:[138.511470,-35.00070], src:'data/IMG/2025/Australia/Adelaide/IMG_20251213_172910.jpg'},
        { desc:'Sunset', coords:[138.511368249,-35.0007044], src:'data/IMG/2025/Australia/Adelaide/IMG_20251213_202324.jpg', rotation: 260 },
        { desc:'Tasting of French wine', coords:[138.5977248,-34.92235], src:'data/IMG/2025/Australia/Adelaide/IMG_20251214_000631.jpg'},
        { desc:'Moana beach', coords:[138.47078,-35.206842], src:'data/IMG/2025/Australia/Adelaide/IMG_20251215_003129.jpg', rotation: 339 },
        { desc:'Moana beach', coords:[138.470769,-35.206970], src:'data/IMG/2025/Australia/Adelaide/IMG_20251215_003203.jpg', rotation: 190 },
        { desc:'Beautiful view', coords:[138.511177,-35.00022], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_083637.jpg', rotation: 331 },
        { desc:'Beautiful view', coords:[138.51106,-34.99908], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_085231.jpg', rotation: 195 },
        { desc:'Beautiful view', coords:[138.511287,-35.00011], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_085409.jpg', rotation: 257 },
        { desc:'Mr Incredible car', coords:[138.608332,-34.91356], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_123715.jpg'},
        { desc:'Us', coords:[138.6079674,-34.913658], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_123856.jpg'},
        { desc:'The entrance and her', coords:[138.606580,-34.914833], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_124122.jpg', rotation: 314 },
        { desc:'Penguin !', coords:[138.605985,-34.91437], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_124837.jpg'},
        { desc:'Komodo dragon', coords:[138.60559,-34.914547], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_125726.jpg'},
        { desc:'Sleeping koala', coords:[138.605853,-34.913426], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_132419.jpg'},
        { desc:'Resting kangaroo', coords:[138.6057144,-34.913404], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_132534.jpg'},
        { desc:'Baby kangaroo', coords:[138.6057144,-34.913404], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_132551.jpg'},
        { desc:'Kangaroo', coords:[138.6057144,-34.913404], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_132925.jpg'},
        { desc:'King Julian', coords:[138.605521,-34.912882], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_133542.jpg'},
        { desc:'Kingfisher', coords:[138.60571,-34.912912], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_133914.jpg'},
        { desc:'Rock monkeys', coords:[138.60596,-34.9129927], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_134017.jpg'},
        { desc:'Great Bilbi', coords:[138.6055722,-34.912760], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_135538.jpg'},
        { desc:'The lion king guy', coords:[138.6073579,-34.9124963], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_141254.jpg'},
        { desc:'The seal and the girl', coords:[138.60748,-34.912922], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_142259.jpg'},
        { desc:'Capibaaaraaaa', coords:[138.608892,-34.91324], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_142635.jpg'},
        { desc:'Capibaaaraaaa', coords:[138.608892,-34.91324], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_142705.jpg'},
        { desc:'Beautiful old house', coords:[138.60747,-34.91323], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_145017.jpg', rotation: 109 },
        { desc:'Big bird', coords:[138.607543,-34.913575], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_145345.jpg'},
        { desc:'Hitler\'s bird', coords:[138.60754,-34.91365], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_145527.jpg'},
        { desc:'AHAHAH the beak', coords:[138.607500,-34.913724], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_150039.jpg'},
        { desc:'Torii gate and my girl', coords:[138.607023,-34.913537], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_150822.jpg'},
        { desc:'Casoar', coords:[138.606612,-34.91345], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_151308.jpg'},
        { desc:'The dragon tree', coords:[138.606602,-34.913473], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_151337.jpg'},
        { desc:'Ugh pelican xDDD', coords:[138.606393,-34.913321], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_151919.jpg'},
        { desc:'Welcome to China', coords:[138.6065329,-34.9136282], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_152115.jpg'},
        { desc:'Pandaaa', coords:[138.606632,-34.914256], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_152503.jpg'},
        { desc:'Red pandaaa', coords:[138.6063800,-34.91399090], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_152835.jpg'},
        { desc:'Family photo', coords:[138.6062807,-34.9140115], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_152910.jpg'},
        { desc:'Hungry otter', coords:[138.6059401,-34.914229], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_153051.jpg'},
        { desc:'Mr Hotpoter', coords:[138.5947061,-34.9298742], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_164002.jpg'},
        { desc:'Aussie style', coords:[138.5967982,-34.931735], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_175344.jpg', rotation: 14 },
        { desc:'Awww', coords:[138.51073,-35.00083], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_202307.jpg', rotation: 260 },
        { desc:'Sunset', coords:[138.51067,-35.00094], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_202318.jpg', rotation: 250 },
        { desc:'Showing the sunset', coords:[138.51074,-35.0009], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_202326.jpg', rotation: 260 },
        { desc:'You saw the sunset RIGHT ?!', coords:[138.51074,-35.0009], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_202344.jpg', rotation: 260 },
        { desc:'Me and the sunset', coords:[138.51062,-35.0011], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_202617.jpg', rotation: 250 },
        { desc:'Shoes 🙂', coords:[138.51057,-35.00122], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_202704.jpg' },
        { desc:'Us', coords:[138.51057,-35.00122], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_202657.jpg', rotation: 250 },
        { desc:'Beautiful sunset', coords:[138.5106,-35.0016], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_202833.jpg', rotation: 250 },
        { desc:'Wow', coords:[138.510734,-35.00171], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_202848.jpg', rotation: 250 },
        { desc:'Bisous', coords:[138.510964,-35.0031], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_203915.jpg'},
        { desc:'The suicid bee', coords:[138.51139,-35.0068], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_210036.jpg'},
        { desc:'J+X', coords:[138.51146,-35.00741], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_210428.jpg'},
        { desc:'Scary girl', coords:[138.51139,-35.00403], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_212455.jpg'},
        { desc:'Night view of the beach', coords:[138.51143,-35.00308], src:'data/IMG/2025/Australia/Adelaide/IMG_20251216_212752.jpg', rotation: 187 },
        { desc:'CowBoy style', coords:[138.538265,-34.97533], src:'data/IMG/2025/Australia/Adelaide/IMG_20251217_151654.jpg'},
        { desc:'Go to the national park !', coords:[138.702103,-34.90324], src:'data/IMG/2025/Australia/Adelaide/IMG_20251218_123534.jpg', rotation: 212 },
        { desc:'Going to the fresh air of the cave', coords:[138.70604,-34.90335], src:'data/IMG/2025/Australia/Adelaide/IMG_20251218_124431.jpg', rotation: 226 },
        { desc:'Fresh in the cave', coords:[138.70580,-34.90358], src:'data/IMG/2025/Australia/Adelaide/IMG_20251218_124626.jpg'},
        { desc:'Waterfall licking good', coords:[138.70788,-34.9063], src:'data/IMG/2025/Australia/Adelaide/IMG_20251218_130302.jpg', rotation: 189 },
        { desc:'Waterfall', coords:[138.70788,-34.9063], src:'data/IMG/2025/Australia/Adelaide/IMG_20251218_130314.jpg', rotation: 189 },
        { desc:'Beautiful girl under the sun', coords:[138.70706,-34.90487], src:'data/IMG/2025/Australia/Adelaide/IMG_20251218_131003.jpg', rotation: 31 },
        { desc:'WILD KOALAAA', coords:[138.70747,-34.90418], src:'data/IMG/2025/Australia/Adelaide/IMG_20251218_131149.jpg', rotation: 349 },
        { desc:'Us and the fat baby', coords:[138.707370,-34.9040], src:'data/IMG/2025/Australia/Adelaide/IMG_20251218_131325.jpg',},
        { desc:'fat baby', coords:[138.707370,-34.9040], src:'data/IMG/2025/Australia/Adelaide/IMG_20251218_131501.jpg'},
        { desc:'Cute baby and my baby', coords:[138.707370,-34.9040], src:'data/IMG/2025/Australia/Adelaide/IMG_20251218_131342.jpg', rotation: 152 },
        { desc:'Break on a bench', coords:[138.70681,-34.90306], src:'data/IMG/2025/Australia/Adelaide/IMG_20251218_132556.jpg'},
        { desc:'Choose your path', coords:[138.70532,-34.90306], src:'data/IMG/2025/Australia/Adelaide/IMG_20251218_133159.jpg', rotation: 259 },
        { desc:'Long live the AC', coords:[138.701721,-34.90296], src:'data/IMG/2025/Australia/Adelaide/IMG_20251218_133856.jpg'},
        { desc:'Toast of a eggplant\'s caviar and truffle', coords:[138.606567,-34.923673], src:'data/IMG/2025/Australia/Adelaide/IMG_20251218_203417.jpg'},
        { desc:'Us', coords:[138.606567,-34.923673], src:'data/IMG/2025/Australia/Adelaide/IMG_20251218_203426.jpg'},
        { desc:'Us in the mirror', coords:[138.606567,-34.923673], src:'data/IMG/2025/Australia/Adelaide/IMG_20251218_203745.jpg'},
        { desc:'Her ❤️', coords:[138.606567,-34.923673], src:'data/IMG/2025/Australia/Adelaide/IMG_20251218_210422.jpg'},
        { desc:'Marinated salmon with chive cream and pistachios', coords:[138.606567,-34.923673], src:'data/IMG/2025/Australia/Adelaide/IMG_20251218_204805.jpg'},
        { desc:'Coq au vin and confit de canard', coords:[138.606567,-34.923673], src:'data/IMG/2025/Australia/Adelaide/IMG_20251218_210844.jpg'},
        { desc:'Iced soufflé with chartreuse liquor and a crème brulée', coords:[138.606567,-34.923673], src:'data/IMG/2025/Australia/Adelaide/IMG_20251218_215930.jpg'},
        { desc:'Us for the 6 months', coords:[138.606567,-34.923673], src:'data/IMG/2025/Australia/Adelaide/IMG_20251218_203431.jpg'},
        { desc:'Playing chess after diner', coords:[138.59890,-34.92407], src:'data/IMG/2025/Australia/Adelaide/IMG_20251218_225018.jpg'},
        { desc:'Playing chess after diner', coords:[138.59890,-34.92407], src:'data/IMG/2025/Australia/Adelaide/IMG_20251218_230644.jpg'},
        { desc:'Breakfast', coords:[138.59884,-34.92422], src:'data/IMG/2025/Australia/Adelaide/IMG_20251219_121823.jpg'},
        { desc:'Us', coords:[138.59898,-34.91843], src:'data/IMG/2025/Australia/Adelaide/IMG_20251219_131328.jpg', rotation: 316 },
        { desc:'Christmas tree smelling like childhood', coords:[138.59816,-34.91275], src:'data/IMG/2025/Australia/Adelaide/IMG_20251219_134529.jpg'},
        { desc:'Entrance of the festival', coords:[138.59823,-34.91331], src:'data/IMG/2025/Australia/Adelaide/IMG_20251219_134850.jpg', rotation: 199 },
        { desc:'Watching cricket', coords:[138.59785,-34.91472], src:'data/IMG/2025/Australia/Adelaide/IMG_20251219_135725.jpg'},
        { desc:'Cathedral and her', coords:[138.598021,-34.91462], src:'data/IMG/2025/Australia/Adelaide/IMG_20251219_141510.jpg', rotation: 10 },
        { desc:'Beer break', coords:[138.59756,-34.91400], src:'data/IMG/2025/Australia/Adelaide/IMG_20251219_142031.jpg'},
        { desc:'In the ferry wheel', coords:[138.598022,-34.91437], src:'data/IMG/2025/Australia/Adelaide/IMG_20251219_150117.jpg'},
        { desc:'Cute', coords:[138.598022,-34.91437], src:'data/IMG/2025/Australia/Adelaide/IMG_20251219_150225.jpg'},
        { desc:'Chief shrimp cooking', coords:[138.59771,-34.91497], src:'data/IMG/2025/Australia/Adelaide/IMG_20251219_151909.jpg', rotation: 328 },
        { desc:'Snowman suffering from the heat', coords:[138.596139,-34.91890], src:'data/IMG/2025/Australia/Adelaide/IMG_20251219_153038.jpg', rotation: 205 },
        { desc:'Juice break', coords:[138.600417,-34.92256], src:'data/IMG/2025/Australia/Adelaide/IMG_20251219_164151.jpg'},
        { desc:'Diner', coords:[138.625720,-34.91457], src:'data/IMG/2025/Australia/Adelaide/IMG_20251219_211131.jpg'},
        { desc:'The spiciest chicken wings', coords:[138.625720,-34.91457], src:'data/IMG/2025/Australia/Adelaide/IMG_20251219_212036.jpg'},
        { desc:'She win the revenge', coords:[138.59890,-34.92407], src:'data/IMG/2025/Australia/Adelaide/IMG_20251220_003403.jpg'},
        { desc:'Dipping the LU !', coords:[138.59778,-34.92291], src:'data/IMG/2025/Australia/Adelaide/IMG_20251220_111433.jpg'},
        { desc:'Christmas concert', coords:[138.601151,-34.92292], src:'data/IMG/2025/Australia/Adelaide/IMG_20251220_113709.jpg', rotation: 7 },
        { desc:'Fake beautiful building aaah', coords:[138.60384,-34.92276], src:'data/IMG/2025/Australia/Adelaide/IMG_20251220_135406.jpg', rotation: 206 },
        { desc:'Fake beautiful building aaah', coords:[138.60087,-34.92289], src:'data/IMG/2025/Australia/Adelaide/IMG_20251220_140040.jpg', rotation: 203 },
        { desc:'Last lunch is greek', coords:[138.5990,-34.92288], src:'data/IMG/2025/Australia/Adelaide/IMG_20251220_142229.jpg'},
        { desc:'Resting before leaving', coords:[138.59783,-34.9223], src:'data/IMG/2025/Australia/Adelaide/IMG_20251220_172840.jpg'},
        { desc:'Waiting for the plane', coords:[138.53719,-34.93841], src:'data/IMG/2025/Australia/Adelaide/IMG_20251220_194720.jpg'},
        { desc:'Waiting for the plane', coords:[138.536923,-34.9382], src:'data/IMG/2025/Australia/Adelaide/IMG_20251220_203305.jpg'},
        { desc:'Last moment o7', coords:[138.53750,-34.93868], src:'data/IMG/2025/Australia/Adelaide/IMG_20251220_203658.jpg'},
	  ]
	  },
      {
	  id: "hahndorf",
	  name: "Hahndorf",
	  lat: -35.02944,
	  lng: 138.81242,
	  zoom: 15,
	  flatPhotos: [
	    { desc:'Walking the dog', coords:[138.80987,-35.029097], src:'data/IMG/2025/Australia/Hahndorf/IMG_20251215_121446.jpg', rotation: 61 },
        { desc:'Mmh mmh interesting writing', coords:[138.8100529,-35.02933], src:'data/IMG/2025/Australia/Hahndorf/IMG_20251215_122023.jpg', rotation: 78 },
        { desc:'Bon appétit', coords:[138.811517,-35.031382], src:'data/IMG/2025/Australia/Hahndorf/IMG_20251215_131923.jpg'},
        { desc:'Nice bone', coords:[138.811517,-35.031382], src:'data/IMG/2025/Australia/Hahndorf/IMG_20251215_134744.jpg'},
        { desc:'Elves\' domination', coords:[138.812445,-35.03311], src:'data/IMG/2025/Australia/Hahndorf/IMG_20251215_143731.jpg'},
        { desc:'Technologia', coords:[138.810605,-35.030579], src:'data/IMG/2025/Australia/Hahndorf/IMG_20251215_145403.jpg'},
        { desc:'Christmas tree', coords:[138.809741,-35.02893], src:'data/IMG/2025/Australia/Hahndorf/IMG_20251215_150413.jpg', rotation: 64 }
	  ]
	  }
    ]
  }
];