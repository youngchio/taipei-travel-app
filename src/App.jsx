import React, { useState, useEffect, useMemo } from 'react';

// --- [V6.2] GLOBAL CONSTANTS & DATA (10년차 개발자의 설계: 데이터와 로직의 분리) ---
const EXCHANGE_RATE = 42.5;

const INITIAL_COURSES = [
  { id: 1, title: '스린 야시장 먹방 정복', price: 500, img: 'https://www.travel.taipei/content/images/attractions/221601/480x360_attractions-image-md3doqs0yk28-exmxhkuiw.jpg', tag: '먹거리', location: 'Shilin District', rating: 4.8 },
  { id: 2, title: '지우펀 감성 찻집 투어', price: 850, img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/81864740-8e98-4821-9435-635846ad7e0a.jpeg', tag: '풍경', location: 'New Taipei City', rating: 4.5 },
  { id: 3, title: '타이베이 101 야경 코스', price: 1200, img: 'https://www.notion.so/image/https%3A%2F%2Fpostfiles.pstatic.net%2FMjAyMzExMTBfMTQz%2FMDAxNjk5NTk5MTc3NzQ2.mH1XqS2HZXAjd5RzfBgHdFlG1--cOF9MOkHt4bZFy1og.Wz6f4eQRDK9dWYxXy5dWRKjmuUkbG1-hENAvVZiZmTMg.JPEG.yomolabs%2F%25ED%2583%2580%25EC%259D%25B4%25EB%25B2%25A0%25EC%259D%25B4_101.jpg%3Ftype%3Dw580?table=block&id=4642abd3-eaf1-45ae-a526-87c86ee3914b&cache=v2', tag: '랜드마크', location: 'Xinyi District', rating: 4.9 },
  { id: 17, title: '라오허제 야시장 화덕만두', price: 150, img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/68310ca4-5f31-4964-b416-51d4aea29fc5.jpeg', tag: '먹거리', location: 'Songshan', rating: 4.6 },
  { id: 4, title: '고궁 박물관', price: 300, img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/66b1db08-c2a1-47d1-9db1-60ab7bd1144d.jpeg', tag: '볼거리', location: 'Zhishan Rd', rating: 4.7 },
  { id: 5, title: '중정기념당 근위병 교대식', price: 0, img: 'https://www.travel.taipei/content/images/attractions/222959/1024x768_attractions-image-nh5ij7pepuajwbsqhfyu5q.jpg', tag: '문화', location: 'Zhongzheng District', rating: 4.6 },
  { id: 6, title: '화산 1914 창의문화단지', price: 0, img: 'https://i.pinimg.com/1200x/41/7a/67/417a6772e2f4c478e36ae332b84f0333.jpg', tag: '예술', location: 'Zhongzheng District', rating: 4.4 },
  { id: 7, title: '용산사 소원 빌기 & 야경', price: 0, img: 'https://storage.doopedia.co.kr/upload/_upload/image5/travel/editor/2021/12/28/20211228195949534_thumb.jpg', tag: '문화', location: 'Wanhua District', rating: 4.8 },
  { id: 8, title: '단수이 일몰 자전거 투어', price: 150, img: 'https://tripool-article-production.s3.ap-southeast-1.amazonaws.com/uploads/article/cover_image/348/N_7_1.jpg', tag: '풍경', location: 'Tamsui District', rating: 4.7 },
  { id: 9, title: '마오콩 곤돌라 차 마시기', price: 120, img: 'https://thumb.tidesquare.com/tour/public/product/PRV3000549802/PRD3011023563/origin/353000f6-72aa-464d-a0ae-28cca9d2f1b0-png?type=square', tag: '휴식', location: 'Wenshan District', rating: 4.3 },
  { id: 10, title: '샹산 전망대 타이베이 뷰', price: 0, img: 'https://i.namu.wiki/i/D_lavqjgmRoGxvp1YbTJq1C15-3j2xY3mDnDL2h08euGWf_z_lnCGx0xmjzNyRqXFGnPAIH7deApj8Xc6kSWMw.webp', tag: '풍경', location: 'Xinyi District', rating: 4.9 },
  { id: 11, title: '베이터우 노천온천 체험', price: 60, img: 'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/i2LY/image/r20SFRw2nLTszFaTLpn68F-I6fI.jpg', tag: '휴식', location: 'Beitou District', rating: 4.5 },
  { id: 12, title: '시먼딩 스트릿 푸드 투어', price: 400, img: 'https://i.pinimg.com/736x/c0/5a/7c/c05a7ca2109770960db307286796c537.jpg', tag: '먹거리', location: 'Wanhua District', rating: 4.6 },
  { id: 13, title: '송산 문창원구 디자인 산책', price: 0, img: 'https://i.pinimg.com/736x/92/f9/03/92f9030bb9a34d84d94d3106afd6f2aa.jpg', tag: '예술', location: 'Xinyi District', rating: 4.4 },
  { id: 14, title: '타이베이 시립 미술관', price: 30, img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/4f4dc6f6-7494-41e7-b45a-7ba159e757bc.jpeg', tag: '예술', location: 'Zhongshan', rating: 4.5 },
  { id: 15, title: '닝샤 야시장 미슐랭 투어', price: 300, img: 'https://cdn.tripstore.kr/IMAGE/76bbce46e0d2649d92ed3620cf02cc45.jpg?q=85&w=1440', tag: '먹거리', location: 'Datong', rating: 4.7 },
  { id: 16, title: '딘타이펑 본점 샤오롱바오', price: 800, img: 'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/5ZTq/image/e4EkeOnvaEIbLExiWAenQr_gKco.jpg', tag: '먹거리', location: 'Da-an', rating: 4.9 },
  { id: 18, title: '예류 지질공원 여왕머리', price: 120, img: 'https://pimg.mk.co.kr/news/cms/202401/08/news-p.v1.20231227.943425e4671e48c69d8623a2954c43fd_P1.png', tag: '풍경', location: 'New Taipei', rating: 4.4 },
  { id: 19, title: '스펀 폭포 및 천등 날리기', price: 200, img: 'https://blog.kakaocdn.net/dna/lEjcA/btsitZXaEeI/AAAAAAAAAAAAAAAAAAAAAB69KgKr6z4gUceyoFE3fbKfLhOFTNs4rOIRsA3vOGQV/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=bKARVhE6u0A5BwzmhIQ0qwyfBtE%3D', tag: '문화', location: 'New Taipei', rating: 4.8 },
  { id: 20, title: '미라마 관람차 야경 감상', price: 200, img: 'https://t1.daumcdn.net/cfile/blog/215A303B58E25C5E0A', tag: '랜드마크', location: 'Zhongshan', rating: 4.5 },
  { id: 21, title: '임가화원 전통 정원 산책', price: 80, img: 'https://mblogthumb-phinf.pstatic.net/MjAyMzAzMDNfMjA4/MDAxNjc3ODU1NTkxMTg2.mlQfU2i4Wy67-QcdTwjrhO44Zpiw_Zz3ww8Fc30wyUUg.LaIZzmOoAyc6KeXJJVj4LDchZdIO9q4VX0LqFe8xnrAg.JPEG.soje1234/SE-50dd57b7-8343-44ab-9177-be811d930a0c.jpg?type=w800', tag: '역사', location: 'Banqiao', rating: 4.6 },
  { id: 22, title: '키키레스토랑 사천요리', price: 1000, img: 'https://mblogthumb-phinf.pstatic.net/MjAyNDA4MDlfODMg/MDAxNzIzMTY2MTg5MDAx.wefkRG1KZojJIi3bhQgxzKJ-Dekv36sPAZljG1nWI5Qg.wYmY5kospZSt3PxZKnL1DKSUEfjrTM_2rv69erdmgIgg.JPEG/0D2A0455.jpg?type=w800', tag: '먹거리', location: 'Xinyi', rating: 4.7 },
  { id: 23, title: '우라이 마을 프라이빗 온천', price: 1500, img: 'https://storage.doopedia.co.kr/upload/_upload/image5/travel/editor/2023/04/22/20230422225045705.jpg', tag: '휴식', location: 'Wulai', rating: 4.8 }
];

const LOCAL_PHRASES = [
  { id: 1, category: '카페', ko: '우유 적게, 당도는 30%로 해주세요.', tc: '牛奶少一點，三分糖。', pron: '니우나이 샤오 이디엔, 싼펀탕' },
  { id: 2, category: '식당', ko: '고수 빼고 만들어 주세요.', tc: '不要放香菜。', pron: '부야오 팡 샹차이' },
  { id: 3, category: '식당', ko: '계산은 카드로 가능한가요?', tc: '可以用信用卡結帳嗎？', pron: '커이용 신용카 지에짱 마?' },
  { id: 4, category: '교통', ko: '타이베이 메인역으로 가주세요.', tc: '請載我去台北車站。', pron: '칭 짜이 워 취 타이베이 처잔' }
];

const NEWS_DATA = [
  { id: 1, title: '대만관광청 한국인 여행지원금 이벤트 연장', url: 'https://www.taiwantour.or.kr/', tag: '혜택' },
  { id: 2, title: '타이베이 101 전망대 특별 야간 개장 안내', url: 'https://www.taipei-101.com.tw/kr/', tag: '소식' }
];

// --- [V6.2] CORE UI ENGINE (사파리 대응 하이엔드 아이콘 및 스타일) ---
const Icon = ({ name, size = 24, color = "currentColor", fill = "none" }) => {
  const icons = {
    home: <React.Fragment><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></React.Fragment>,
    map: <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    news: <React.Fragment><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Z" /><path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" /></React.Fragment>,
    user: <React.Fragment><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></React.Fragment>,
    plus: <React.Fragment><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></React.Fragment>,
    minus: <line x1="5" y1="12" x2="19" y2="12" />,
    clock: <React.Fragment><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></React.Fragment>,
    check: <polyline points="20 6 9 17 4 12" />,
    moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
    sun: <React.Fragment><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></React.Fragment>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
    chart: <React.Fragment><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10Z" /></React.Fragment>,
    external: <React.Fragment><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></React.Fragment>,
    volume: <React.Fragment><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></React.Fragment>,
    trash: <React.Fragment><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></React.Fragment>
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      {icons[name]}
    </svg>
  );
};

// --- [V6.2] MAIN COMPONENT ---
const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [myCourses, setMyCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('전체');
  const [orderModal, setOrderModal] = useState(null);
  const [checklist, setChecklist] = useState([
    { id: 1, text: '여권 및 비자 서류', checked: true },
    { id: 2, text: '대만 eSIM / 유심', checked: true },
    { id: 3, text: '트래블로그 / 이지카드', checked: false },
    { id: 4, text: '110V 돼지코 어댑터', checked: false },
    { id: 5, text: '우산 또는 우비', checked: false }
  ]);

  // --- [V6.2] 인프라 최적화: 사파리 & 모바일 완벽 대응 ---
  useEffect(() => {
    let meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = "viewport";
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
    meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";

    const script = document.createElement('script');
    script.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(script);

    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;900&display=swap');
      body { font-family: 'Noto Sans KR', sans-serif; margin: 0; padding: 0; overflow-x: hidden; width: 100%; -webkit-font-smoothing: antialiased; background-color: ${isDarkMode ? '#020617' : '#f8fafc'}; }
      .backdrop-blur-xl { -webkit-backdrop-filter: blur(20px); backdrop-filter: blur(20px); }
      .h-dynamic { height: 100dvh; }
      .safe-pb { padding-bottom: calc(env(safe-area-inset-bottom) + 90px); }
      .safe-pt { padding-top: env(safe-area-inset-top); }
      .text-shadow { text-shadow: 0 4px 12px rgba(0,0,0,0.8); }
      input, button { -webkit-tap-highlight-color: transparent; outline: none; }
      .no-scrollbar::-webkit-scrollbar { display: none; }
    `;
    document.head.appendChild(style);
  }, [isDarkMode]);

  // --- BUSINESS LOGIC ---
  const sortedMyCourses = useMemo(() => {
    return [...myCourses].sort((a, b) => (a.time || "99:99").localeCompare(b.time || "99:99"));
  }, [myCourses]);

  const addCourse = (course) => setMyCourses([...myCourses, { ...course, uniqueId: Date.now(), time: "12:00" }]);
  const updateTime = (uid, time) => setMyCourses(myCourses.map(c => c.uniqueId === uid ? { ...c, time } : c));
  const removeCourse = (uid) => setMyCourses(myCourses.filter(c => c.uniqueId !== uid));
  const clearAll = () => setMyCourses([]);
  const toggleCheck = (id) => setChecklist(checklist.map(i => i.id === id ? { ...i, checked: !i.checked } : i));

  const totalTwd = myCourses.reduce((sum, c) => sum + c.price, 0);
  const totalKrw = Math.round(totalTwd * EXCHANGE_RATE);

  // --- SUB-VIEWS (Render Logic) ---

  const Header = () => (
    <header className={`px-5 py-4 flex justify-between items-center sticky top-0 z-50 backdrop-blur-xl border-b transition-colors safe-pt ${isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-100'}`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl shadow-inner ${isDarkMode ? 'bg-blue-900/40 text-blue-300' : 'bg-blue-50 text-blue-600'}`}>
          <Icon name="sun" size={20} />
        </div>
        <div>
          <p className="text-[9px] font-black opacity-40 uppercase tracking-widest">TAIPEI NOW</p>
          <p className={`text-xs font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>24°C Sunny</p>
        </div>
      </div>
      <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2.5 rounded-xl shadow-lg active:scale-90 transition-all ${isDarkMode ? 'bg-slate-800 text-yellow-400' : 'bg-white border border-slate-100 text-slate-400'}`}>
        <Icon name={isDarkMode ? 'sun' : 'moon'} size={18} />
      </button>
    </header>
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className="max-w-md mx-auto relative min-h-screen flex flex-col shadow-2xl bg-inherit overflow-x-hidden border-x border-transparent sm:border-slate-100 sm:dark:border-slate-800 h-dynamic">
        {activeTab !== 'course' && <Header />}
        
        <main className="flex-1 overflow-y-auto no-scrollbar relative px-5">
          {activeTab === 'home' && (
            <div className="pb-36 animate-fade-in">
              <div className="py-8">
                <h1 className={`text-3xl font-black leading-tight mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>계획은 가볍게,<br/>타이베이는 깊게.</h1>
                <p className={`text-xs font-medium opacity-60 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>인크로스 현대샵 퀄리티의 프리미엄 로컬 가이드.</p>
              </div>
              <div className="mb-10 relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-white dark:border-slate-800">
                <img src="https://love.seoul.go.kr/tmda/editor/article/2025/02/19/article_202502_13_01.png" className="w-full h-full object-cover" alt="Banner" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-7 text-white">
                  <span className="bg-blue-600 text-[10px] font-black px-4 py-1.5 rounded-full w-fit mb-2 uppercase tracking-tighter">Premium Collection</span>
                  <h3 className="font-bold text-2xl leading-tight text-shadow italic">타이베이의 새로운 시선</h3>
                </div>
              </div>
              <div className="flex justify-between items-center mb-5 font-black">
                <h3 className={isDarkMode ? 'text-white' : 'text-slate-900'}>HOT 명소 TOP 3</h3>
                <button onClick={() => setActiveTab('course')} className="text-xs text-blue-600">전체보기</button>
              </div>
              <div className="flex flex-col gap-4">
                {INITIAL_COURSES.slice(0, 3).map(c => (
                  <div key={c.id} className={`p-4 rounded-3xl border flex gap-4 transition-all active:scale-[0.97] ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-100 shadow-xl shadow-slate-100'}`}>
                    <img src={c.img} className="w-20 h-20 rounded-2xl object-cover shadow-sm" alt="" />
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div>
                        <span className="text-[10px] font-black text-blue-500 uppercase">{c.tag}</span>
                        <h4 className={`font-bold text-sm leading-tight mt-0.5 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{c.title}</h4>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className={`font-black text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{c.price.toLocaleString()} TWD</p>
                        <button onClick={() => addCourse(c)} className="p-2 bg-blue-600 text-white rounded-xl shadow-lg active:scale-90 transition-all"><Icon name="plus" size={16} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'course' && (
            <div className="pb-48 animate-fade-in">
              <div className={`py-6 sticky top-0 z-40 border-b transition-colors safe-pt ${isDarkMode ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50/90 border-slate-200'} backdrop-blur-xl`}>
                <h2 className={`text-xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>코스 메이커</h2>
                <div className={`relative flex items-center px-4 py-3 rounded-2xl border mb-4 shadow-inner ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'}`}>
                  <Icon name="search" size={18} color="#94a3b8" className="mr-2" />
                  <input type="text" placeholder="검색어를 입력하세요" className="bg-transparent w-full outline-none text-sm font-bold" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                  {['전체', '먹거리', '풍경', '랜드마크', '역사', '문화', '예술', '휴식'].map(t => (
                    <button key={t} onClick={() => setSelectedTag(t)} className={`px-4 py-2 rounded-full text-[11px] font-black whitespace-nowrap transition-all ${selectedTag === t ? 'bg-blue-600 text-white shadow-md scale-105' : (isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-white text-slate-500 border border-slate-200')}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="mt-6 mb-8 relative aspect-video rounded-[2.5rem] overflow-hidden border-2 border-white dark:border-slate-800 shadow-xl">
                <iframe title="map" width="100%" height="100%" frameBorder="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.9!2d121.56!3d25.03!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb6da9c911d%3A0x8a898730c6224c3a!2z7YOA7J2067Kg7J20 IDEwMQ!5e0!3m2!1sko!2skr!4v1625000000000" style={{ filter: isDarkMode ? 'invert(90%) hue-rotate(180deg)' : '' }}></iframe>
              </div>
              <div className="flex flex-col gap-4">
                {INITIAL_COURSES.filter(c => c.title.includes(searchTerm) && (selectedTag === '전체' || c.tag === selectedTag)).map(c => (
                  <div key={c.id} className={`p-3 rounded-3xl border flex gap-4 transition-all ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-100 shadow-md'}`}>
                    <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-2xl">
                      <img src={c.img} className="w-full h-full object-cover" alt="" />
                      <div className="absolute top-1.5 left-1.5 bg-white/90 px-1.5 py-0.5 rounded-lg flex items-center gap-0.5 shadow-sm font-black text-[9px]"><Icon name="star" size={8} color="#eab308" fill="#eab308" />{c.rating}</div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1 overflow-hidden">
                      <div className="flex justify-between items-start"><span className="text-[9px] font-black text-blue-500 uppercase">{c.tag}</span><span className="text-[9px] font-bold opacity-30 truncate">{c.location}</span></div>
                      <h4 className={`font-bold text-sm leading-tight truncate ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{c.title}</h4>
                      <div className="flex justify-between items-center">
                        <p className={`font-black text-base ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{c.price.toLocaleString()} <span className="text-[10px] opacity-40">TWD</span></p>
                        <button onClick={() => addCourse(c)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Icon name="plus" size={14} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'now' && (
            <div className="pb-40 animate-fade-in">
              <div className="py-8"><h2 className={`text-2xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>타이베이 나우</h2><p className="text-xs opacity-50 font-bold uppercase tracking-widest italic text-slate-500">Live Dashboard</p></div>
              <a href="https://english.metro.taipei/" target="_blank" className="block bg-red-50 border border-red-100 p-6 rounded-[2.5rem] mb-8 flex items-start gap-5 hover:bg-red-100 shadow-xl shadow-red-100/20">
                <Icon name="alert" size={28} color="#ef4444" /><div className="flex-1"><h4 className="text-sm font-black text-red-900 mb-1 italic">교통 긴급 안내</h4><p className="text-[11px] text-red-700 opacity-80 leading-relaxed font-bold">지하철 단수이선 지연 상황을 실시간으로 확인하세요.</p></div><Icon name="external" size={16} color="#fca5a5" />
              </a>
              <div className="grid grid-cols-2 gap-5 mb-10">
                <div className={`p-6 rounded-[2.5rem] border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white shadow-xl'}`}><Icon name="chart" size={22} color="#3b82f6" /><p className="text-[10px] font-black opacity-40 uppercase mt-4 text-slate-500">Exchange Rate</p><p className={`text-xl font-black mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>1 : {EXCHANGE_RATE}</p></div>
                <div className={`p-6 rounded-[2.5rem] border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white shadow-xl'}`}><Icon name="zap" size={22} color="#eab308" /><p className="text-[10px] font-black opacity-40 uppercase mt-4 text-slate-500">Topic</p><p className={`text-xl font-black mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>시먼딩 팝업</p></div>
              </div>
              <h3 className={`text-lg font-black mb-5 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>최신 여행 뉴스</h3>
              <div className="flex flex-col gap-4">
                {NEWS_DATA.map(n => (
                  <a key={n.id} href={n.url} target="_blank" className={`p-5 rounded-3xl border flex items-center gap-4 transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-white border-slate-100 shadow-md hover:shadow-xl'}`}>
                    <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center shrink-0"><Icon name="news" size={22} color="#3b82f6" /></div>
                    <div className="flex-1 overflow-hidden"><span className="text-[8px] font-black text-blue-500 uppercase">{n.tag}</span><h4 className={`text-sm font-bold truncate ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{n.title}</h4></div>
                    <Icon name="external" size={16} color="#94a3b8" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'insight' && (
            <div className="pb-40 animate-fade-in relative">
              <div className="py-8"><h2 className={`text-2xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>로컬 인사이트</h2><p className="text-xs opacity-50 font-bold uppercase tracking-widest italic text-slate-500">Interactive Guide</p></div>
              <div className="bg-blue-600 p-8 rounded-[3.5rem] text-white mb-10 relative overflow-hidden shadow-2xl border-4 border-white/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
                <h3 className="text-2xl font-black mb-3 leading-tight tracking-tight">주문이 두렵지 않은<br/>마법의 주문 카드</h3>
                <p className="text-sm opacity-90 mb-8 font-medium leading-relaxed">현지 직원에게 카드를 직접 보여주세요.<br/>대표님이 직접 검수한 필수 문장입니다.</p>
                <button className="bg-white text-blue-600 px-8 py-3.5 rounded-2xl text-xs font-black shadow-2xl active:scale-95 transition-all">전체 리스트 보기</button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {LOCAL_PHRASES.map(p => (
                  <button key={p.id} onClick={() => setOrderModal(p)} className={`p-6 rounded-[2rem] border text-left transition-all active:scale-95 flex items-center gap-5 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white shadow-xl'}`}>
                    <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center shrink-0"><Icon name="volume" size={24} color="#3b82f6" /></div>
                    <div className="flex-1"><span className="text-[9px] font-black text-blue-500 mb-1 block uppercase">{p.category}</span><h4 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{p.ko}</h4></div>
                    <Icon name="chevronRight" size={18} color="#cbd5e1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'mytrip' && (
            <div className="pb-48 animate-fade-in">
              <div className={`flex justify-between items-end py-8 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <h2 className="text-2xl font-black font-bold tracking-tight text-shadow">나의 스마트 플래너</h2>
                <button onClick={clearAll} className="text-[10px] font-black text-red-500 flex items-center gap-1 bg-red-50 px-4 py-2 rounded-2xl active:scale-90 transition-all"><Icon name="trash" size={12}/> 비우기</button>
              </div>
              <div className={`p-7 mb-8 rounded-[3rem] border ${isDarkMode ? 'bg-slate-900 border-slate-800 shadow-blue-900/10' : 'bg-white shadow-xl'}`}>
                <div className="flex items-center gap-3 mb-6"><Icon name="check" size={20} color="#3b82f6" /><h4 className="text-base font-black">여행 체크리스트</h4></div>
                <div className="flex flex-col gap-3.5">
                  {checklist.map(item => (
                    <button key={item.id} onClick={() => toggleCheck(item.id)} className="flex items-center gap-3 text-left">
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${item.checked ? 'bg-blue-600 border-blue-600 shadow-md' : 'border-slate-300'}`}>{item.checked && <Icon name="check" size={12} color="white" />}</div>
                      <span className={`text-[13px] font-bold transition-all ${item.checked ? 'opacity-30 line-through' : (isDarkMode ? 'text-slate-200' : 'text-slate-700')}`}>{item.text}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className={`p-7 mb-8 rounded-[3.5rem] border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white shadow-2xl shadow-blue-100'}`}>
                <div className="flex items-center gap-3 mb-6"><Icon name="clock" size={20} color="#3b82f6" /><h4 className="text-base font-black italic">타임라인 플래너</h4></div>
                {myCourses.length === 0 ? <p className="py-10 text-center opacity-30 text-sm font-black italic">장소를 추가하고 일정을 짜보세요.</p> : (
                  <div className="flex flex-col gap-6 relative">
                    <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-blue-100 dark:bg-slate-800 z-0" />
                    {sortedMyCourses.map(c => (
                      <div key={c.uniqueId} className="flex gap-5 items-center relative z-10">
                        <input type="time" value={c.time} onChange={(e) => updateTime(c.uniqueId, e.target.value)} className={`bg-transparent text-[13px] font-black ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} w-14 shrink-0`} />
                        <div className="w-3 h-3 rounded-full bg-blue-600 border-4 border-white dark:border-slate-900 shadow-md shrink-0" />
                        <div className={`flex-1 p-4 rounded-3xl border flex items-center gap-3 ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                          <img src={c.img} className="w-10 h-10 rounded-xl object-cover shadow-sm shrink-0" alt="" />
                          <h4 className={`text-[13px] font-bold truncate flex-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{c.title}</h4>
                          <button onClick={() => removeCourse(c.uniqueId)} className="p-1.5 text-slate-300 active:text-red-500 transition-colors"><Icon name="minus" size={16}/></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {myCourses.length > 0 && (
                <div className="animate-fade-in"><div className={`p-7 rounded-[3rem] border mb-8 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white shadow-2xl'}`}><p className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-4">Budget Result</p><div className="flex h-3.5 rounded-full overflow-hidden mb-5 bg-slate-100 dark:bg-slate-800 shadow-inner"><div style={{ width: `${Math.min((totalTwd / 5000) * 100, 100)}%` }} className="bg-blue-500 transition-all duration-1000"></div></div><div className={`flex justify-between items-end font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}><div><span className="text-2xl tracking-tighter">{totalTwd.toLocaleString()}</span><span className="text-xs ml-1 opacity-40 uppercase">TWD</span></div><span className="text-xl text-blue-500">≈ {totalKrw.toLocaleString()}원</span></div></div><button className="w-full flex justify-center items-center gap-4 bg-yellow-400 text-yellow-950 font-black py-6 rounded-[2.5rem] shadow-2xl shadow-yellow-200 active:scale-95 transition-all text-lg font-bold"><Icon name="message" size={24} fill="currentColor" /> 카카오톡으로 일정 공유</button></div>
              )}
            </div>
          )}
        </main>

        <nav className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto px-6 pt-4 pb-12 safe-pb flex justify-between items-center z-50 backdrop-blur-xl border-t transition-all ${isDarkMode ? 'bg-slate-950/95 border-slate-800 shadow-[0_-12px_40px_rgba(0,0,0,0.6)]' : 'bg-white/95 border-slate-100 shadow-[0_-12px_40px_rgba(0,0,0,0.08)]'}`}>
          {[
            { id: 'home', name: '홈', icon: 'home' },
            { id: 'course', name: '코스', icon: 'map' },
            { id: 'now', name: '나우', icon: 'zap' },
            { id: 'insight', name: '로컬', icon: 'news' },
            { id: 'mytrip', name: '마이', icon: 'user' }
          ].map(tab => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); window.scrollTo(0,0); }} className={`flex flex-col items-center gap-1.5 transition-all relative ${activeTab === tab.id ? 'text-blue-600 scale-110' : 'text-slate-400 opacity-50'}`}>
              <div className={`p-3 rounded-2xl transition-all ${activeTab === tab.id ? 'bg-blue-50 dark:bg-blue-900/30' : ''}`}><Icon name={tab.icon} size={22} fill={activeTab === tab.id ? 'currentColor' : 'none'} /></div>
              <span className="text-[10px] font-black uppercase font-black">{tab.name}</span>
              {tab.id === 'mytrip' && myCourses.length > 0 && <span className="absolute top-1 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center text-[8px] font-black text-white shadow-xl animate-bounce">{myCourses.length}</span>}
            </button>
          ))}
        </nav>

        {/* [INTERACTIVE MODAL] 사파리 최적화 로컬 주문 카드 */}
        {orderModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/70 animate-in fade-in duration-300">
            <div className={`w-full max-w-sm rounded-[3.5rem] p-10 shadow-2xl relative transition-all transform scale-105 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
              <button onClick={() => setOrderModal(null)} className="absolute top-8 right-8 p-2 text-slate-400 hover:text-red-500 transition-colors"><Icon name="minus" size={28} /></button>
              <div className="text-center">
                <span className="text-xs font-black text-blue-600 mb-6 block uppercase tracking-widest">{orderModal.category} 커스텀 주문</span>
                <p className={`text-lg font-bold mb-10 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>"{orderModal.ko}"</p>
                <div className={`p-8 rounded-[3rem] mb-8 border-2 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                  <p className={`text-4xl font-black mb-6 leading-tight ${isDarkMode ? 'text-white' : 'text-slate-950'}`} style={{ wordBreak: 'keep-all' }}>{orderModal.tc}</p>
                  <div className="flex items-center justify-center gap-2 text-blue-500 bg-blue-50 dark:bg-blue-900/30 py-2.5 px-5 rounded-full inline-flex font-black text-sm"><Icon name="volume" size={16} />{orderModal.pron}</div>
                </div>
                <p className="text-[10px] font-black opacity-40 uppercase animate-pulse">상단 문장을 점원에게 직접 보여주세요</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;