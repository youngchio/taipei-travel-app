import React, { useState, useEffect, useMemo } from 'react';

// --- 외부 의존성 0% 독립형 아이콘 엔진 (체크박스 아이콘 포함 및 문법 오류 완벽 해결) ---
const Icon = ({ name, size = 24, color = "currentColor", fill = "none" }) => {
  const icons = {
    home: (
      <React.Fragment>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </React.Fragment>
    ),
    map: <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    news: (
      <React.Fragment>
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Z" />
        <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" />
      </React.Fragment>
    ),
    user: (
      <React.Fragment>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </React.Fragment>
    ),
    plus: (
      <React.Fragment>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </React.Fragment>
    ),
    minus: <line x1="5" y1="12" x2="19" y2="12" />,
    moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
    sun: (
      <React.Fragment>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" /><path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" /><path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
      </React.Fragment>
    ),
    share: (
      <React.Fragment>
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
      </React.Fragment>
    ),
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
    chart: (
      <React.Fragment>
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path d="M22 12A10 10 0 0 0 12 2v10Z" />
      </React.Fragment>
    ),
    trash: (
      <React.Fragment>
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </React.Fragment>
    ),
    alert: (
      <React.Fragment>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </React.Fragment>
    ),
    chevronRight: <path d="m9 18 6-6-6-6" />,
    search: (
      <React.Fragment>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </React.Fragment>
    ),
    external: (
      <React.Fragment>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
      </React.Fragment>
    ),
    message: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
    check: <polyline points="20 6 9 17 4 12" />
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      {icons[name]}
    </svg>
  );
};

const EXCHANGE_RATE = 42.5;

// 대표님이 검수한 23개 명소 데이터 (화덕만두 이미지 교체 완료 및 문법 오류 해결)
const INITIAL_COURSES = [
  { id: 1, title: '스린 야시장 먹방 정복', price: 500, img: 'https://www.travel.taipei/content/images/attractions/221601/480x360_attractions-image-md3doqs0yk28-exmxhkuiw.jpg', tag: '먹거리', location: 'Shilin District', rating: 4.8 },
  { id: 2, title: '지우펀 감성 찻집 투어', price: 850, img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/81864740-8e98-4821-9435-635846ad7e0a.jpeg', tag: '풍경', location: 'New Taipei City', rating: 4.5 },
  { id: 3, title: '타이베이 101 야경 코스', price: 1200, img: 'https://www.notion.so/image/https%3A%2F%2Fpostfiles.pstatic.net%2FMjAyMzExMTBfMTQz%2FMDAxNjk5NTk5MTc3NzQ2.mH1XqS2HZXAjd5RzfBgHdFlG1--cOF9MOkHt4bZFy1og.Wz6f4eQRDK9dWYxXy5dWRKjmuUkbG1-hENAvVZiZmTMg.JPEG.yomolabs%2F%25ED%2583%2580%25EC%259D%25B4%25EB%25B2%25A0%25EC%259D%25B4_101.jpg%3Ftype%3Dw580?table=block&id=4642abd3-eaf1-45ae-a526-87c86ee3914b&cache=v2', tag: '랜드마크', location: 'Xinyi District', rating: 4.9 },
  { id: 4, title: '고궁 박물관', price: 300, img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/66b1db08-c2a1-47d1-9db1-60ab7bd1144d.jpeg', tag: '볼거리', location: 'Zhishan Rd', rating: 4.7 },
  { id: 5, title: '중정기념당 근위병 교대식', price: 0, img: 'https://www.travel.taipei/content/images/attractions/222959/1024x768_attractions-image-nh5ij7pepuajwbsqhfyu5q.jpg', tag: '문화', location: 'Zhongzheng District', rating: 4.6 },
  { id: 6, title: '화산 1914 창의문화단지 산책', price: 0, img: 'https://i.pinimg.com/1200x/41/7a/67/417a6772e2f4c478e36ae332b84f0333.jpg', tag: '예술', location: 'Zhongzheng District', rating: 4.4 },
  { id: 7, title: '용산사 소원 빌기 & 야경', price: 0, img: 'https://storage.doopedia.co.kr/upload/_upload/image5/travel/editor/2021/12/28/20211228195949534_thumb.jpg', tag: '문화', location: 'Wanhua District', rating: 4.8 },
  { id: 8, title: '단수이 일몰 자전거 투어', price: 150, img: 'https://tripool-article-production.s3.ap-southeast-1.amazonaws.com/uploads/article/cover_image/348/N_7_1.jpg', tag: '풍경', location: 'Tamsui District', rating: 4.7 },
  { id: 9, title: '마오콩 곤돌라 차 마시기', price: 120, img: 'https://thumb.tidesquare.com/tour/public/product/PRV3000549802/PRD3011023563/origin/353000f6-72aa-464d-a0ae-28cca9d2f1b0-png?type=square', tag: '휴식', location: 'Wenshan District', rating: 4.3 },
  { id: 10, title: '샹산 전망대 타이베이 뷰', price: 0, img: 'https://i.namu.wiki/i/D_lavqjgmRoGxvp1YbTJq1C15-3j2xY3mDnDL2h08euGWf_z_lnCGx0xmjzNyRqXFGnPAIH7deApj8Xc6kSWMw.webp', tag: '풍경', location: 'Xinyi District', rating: 4.9 },
  { id: 11, title: '베이터우 노천온천 체험', price: 60, img: 'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/i2LY/image/r20SFRw2nLTszFaTLpn68F-I6fI.jpg', tag: '휴식', location: 'Beitou District', rating: 4.5 },
  { id: 12, title: '시먼딩 스트릿 푸드 투어', price: 400, img: 'https://i.pinimg.com/736x/c0/5a/7c/c05a7ca2109770960db307286796c537.jpg', tag: '먹거리', location: 'Wanhua District', rating: 4.6 },
  { id: 13, title: '송산 문창원구 디자인 산책', price: 0, img: 'https://i.pinimg.com/736x/92/f9/03/92f9030bb9a34d84d94d3106afd6f2aa.jpg', tag: '예술', location: 'Xinyi District', rating: 4.4 },
  { id: 14, title: '타이베이 시립 미술관 관람', price: 30, img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/4f4dc6f6-7494-41e7-b45a-7ba159e757bc.jpeg', tag: '예술', location: 'Zhongshan', rating: 4.5 },
  { id: 15, title: '닝샤 야시장 미슐랭 투어', price: 300, img: 'https://cdn.tripstore.kr/IMAGE/76bbce46e0d2649d92ed3620cf02cc45.jpg?q=85&w=1440', tag: '먹거리', location: 'Datong', rating: 4.7 },
  { id: 16, title: '딘타이펑 본점 샤오롱바오', price: 800, img: 'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/5ZTq/image/e4EkeOnvaEIbLExiWAenQr_gKco.jpg', tag: '먹거리', location: 'Da-an', rating: 4.9 },
  // id 17: 대표님이 요청하신 라오허제 화덕만두 이미지로 정밀 교체
  { id: 17, title: '라오허제 야시장 화덕만두', price: 150, img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/68310ca4-5f31-4964-b416-51d4aea29fc5.jpeg', tag: '먹거리', location: 'Songshan', rating: 4.6 },
  { id: 18, title: '예류 지질공원 여왕머리 바위', price: 120, img: 'https://pimg.mk.co.kr/news/cms/202401/08/news-p.v1.20231227.943425e4671e48c69d8623a2954c43fd_P1.png', tag: '풍경', location: 'New Taipei', rating: 4.4 },
  { id: 19, title: '스펀 폭포 및 천등 날리기', price: 200, img: 'https://blog.kakaocdn.net/dna/lEjcA/btsitZXaEeI/AAAAAAAAAAAAAAAAAAAAAB69KgKr6z4gUceyoFE3fbKfLhOFTNs4rOIRsA3vOGQV/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=bKARVhE6u0A5BwzmhIQ0qwyfBtE%3D', tag: '문화', location: 'New Taipei', rating: 4.8 },
  { id: 20, title: '미라마 관람차 야경 감상', price: 200, img: 'https://t1.daumcdn.net/cfile/blog/215A303B58E25C5E0A', tag: '랜드마크', location: 'Zhongshan', rating: 4.5 },
  { id: 21, title: '임가화원 전통 정원 산책', price: 80, img: 'https://mblogthumb-phinf.pstatic.net/MjAyMzAzMDNfMjA4/MDAxNjc3ODU1NTkxMTg2.mlQfU2i4Wy67-QcdTwjrhO44Zpiw_Zz3ww8Fc30wyUUg.LaIZzmOoAyc6KeXJJVj4LDchZdIO9q4VX0LqFe8xnrAg.JPEG.soje1234/SE-50dd57b7-8343-44ab-9177-be811d930a0c.jpg?type=w800', tag: '역사', location: 'Banqiao', rating: 4.6 },
  { id: 22, title: '키키레스토랑 사천요리', price: 1000, img: 'https://mblogthumb-phinf.pstatic.net/MjAyNDA4MDlfODMg/MDAxNzIzMTY2MTg5MDAx.wefkRG1KZojJIi3bhQgxzKJ-Dekv36sPAZljG1nWI5Qg.wYmY5kospZSt3PxZKnL1DKSUEfjrTM_2rv69erdmgIgg.JPEG/0D2A0455.jpg?type=w800', tag: '먹거리', location: 'Xinyi', rating: 4.7 },
  { id: 23, title: '우라이 마을 프라이빗 온천', price: 1500, img: 'https://storage.doopedia.co.kr/upload/_upload/image5/travel/editor/2023/04/22/20230422225045705.jpg', tag: '휴식', location: 'Wulai', rating: 4.8 }
];

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [myCourses, setMyCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('전체');
  const [weather] = useState({ temp: 24, status: 'Sunny', location: 'Taipei' });
  
  // 마이 탭: 준비물 체크리스트 상태
  const [checklist, setChecklist] = useState([
    { id: 1, text: '여권 및 사본 (사진 찍어두기)', checked: true },
    { id: 2, text: '대만 온라인 입국신고서 작성', checked: false },
    { id: 3, text: '이지카드(EasyCard) 구매/준비', checked: false },
    { id: 4, text: 'eSIM 또는 유심칩 구매', checked: true },
    { id: 5, text: '트래블로그 카드 및 환전 현금', checked: false },
    { id: 6, text: '110V 돼지코 어댑터', checked: false },
    { id: 7, text: '우산 및 우비 (비가 자주 와요)', checked: false }
  ]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(script);

    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;900&display=swap');
      body { font-family: 'Noto Sans KR', sans-serif; margin: 0; padding: 0; }
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .custom-scrollbar::-webkit-scrollbar { height: 4px; }
      .custom-scrollbar::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }
      .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      .text-shadow { text-shadow: 0 2px 12px rgba(0,0,0,0.8); }
    `;
    document.head.appendChild(style);
  }, []);

  const addCourse = (course) => setMyCourses([...myCourses, { ...course, uniqueId: Date.now() }]);
  const removeCourse = (uid) => setMyCourses(myCourses.filter(c => c.uniqueId !== uid));
  const clearAll = () => setMyCourses([]);
  const toggleCheck = (id) => setChecklist(checklist.map(i => i.id === id ? { ...i, checked: !i.checked } : i));

  const totalTwd = myCourses.reduce((sum, c) => sum + c.price, 0);
  const totalKrw = Math.round(totalTwd * EXCHANGE_RATE);

  const Header = () => (
    <header className={`px-6 py-5 flex justify-between items-center sticky top-0 z-50 backdrop-blur-xl border-b transition-colors ${isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-100'}`}>
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-2xl shadow-inner ${isDarkMode ? 'bg-blue-900/40 text-blue-300' : 'bg-blue-50 text-blue-600'}`}>
          <Icon name="sun" size={20} />
        </div>
        <div>
          <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">{weather.location} NOW</p>
          <p className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{weather.temp}°C {weather.status}</p>
        </div>
      </div>
      <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-3 rounded-2xl transition-all shadow-lg active:scale-90 ${isDarkMode ? 'bg-slate-800 text-yellow-400' : 'bg-white border border-slate-100 text-slate-400'}`}>
        <Icon name={isDarkMode ? 'sun' : 'moon'} size={20} />
      </button>
    </header>
  );

  const HomeTab = () => (
    <div className="pb-32 animate-fade-in px-6">
      <div className="py-8">
        <h1 className={`text-4xl font-black leading-tight mb-3 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>계획은 가볍게,<br/>타이베이는 깊게.</h1>
        <p className={`text-sm font-medium opacity-60 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>대표님이 직접 큐레이션한 프리미엄 기획전.</p>
      </div>
      <div className="mb-10">
        <div className="relative h-64 rounded-[3.5rem] overflow-hidden shadow-2xl group border-4 border-white dark:border-slate-800">
          {/* 대표님이 요청하신 홈 메인 배너 이미지 반영 */}
          <img src="https://love.seoul.go.kr/tmda/editor/article/2025/02/19/article_202502_13_01.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Home Banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
            <span className="bg-blue-600 text-[10px] font-black px-4 py-1.5 rounded-full w-fit mb-3 uppercase tracking-tighter shadow-lg">Premium Pick</span>
            <h3 className="font-bold text-2xl leading-tight text-shadow italic font-bold">감성 가득한<br/>타이베이 시티투어</h3>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-end mb-6">
          <h3 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>추천 명소</h3>
          <button onClick={() => setActiveTab('course')} className="text-sm font-bold text-blue-600 underline underline-offset-4 flex items-center gap-1">전체보기 <Icon name="chevronRight" size={14} /></button>
        </div>
        <div className="flex flex-col gap-5">
          {INITIAL_COURSES.slice(0, 3).map(c => (
            <div key={c.id} className={`p-4 rounded-[2.5rem] border flex gap-5 transition-all active:scale-[0.98] ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-100 shadow-xl shadow-slate-100'}`}>
              <div className="w-24 h-24 shrink-0 rounded-3xl overflow-hidden shadow-md">
                <img src={c.img} className="w-full h-full object-cover" alt={c.title} />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{c.tag}</span>
                  <h4 className={`font-bold text-base leading-tight mt-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{c.title}</h4>
                </div>
                <div className="flex justify-between items-center">
                  <p className={`font-black text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{c.price.toLocaleString()} <span className="text-xs opacity-40 font-bold">TWD</span></p>
                  <button onClick={() => addCourse(c)} className="p-2.5 bg-blue-600 text-white rounded-2xl hover:scale-110 shadow-lg active:scale-90 transition-all"><Icon name="plus" size={18} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CourseTab = () => {
    const filtered = INITIAL_COURSES.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()) && (selectedTag === '전체' || c.tag === selectedTag));
    const tags = ['전체', '먹거리', '풍경', '랜드마크', '역사', '문화', '예술', '휴식'];

    return (
      <div className="pb-44 animate-fade-in">
        <div className={`px-6 py-8 sticky top-0 z-40 border-b transition-colors ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <h2 className={`text-2xl font-black mb-5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>코스 메이커</h2>
          <div className={`relative flex items-center px-5 py-4 rounded-[1.5rem] border mb-5 shadow-inner transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <Icon name="search" size={20} color="#94a3b8" className="mr-3" />
            <input type="text" placeholder="장소를 검색하세요" className="bg-transparent w-full outline-none text-sm font-bold" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 custom-scrollbar">
            {tags.map(t => (
              <button key={t} onClick={() => setSelectedTag(t)} className={`px-6 py-2.5 rounded-full text-[12px] font-black whitespace-nowrap transition-all ${selectedTag === t ? 'bg-blue-600 text-white shadow-xl shadow-blue-300 scale-105' : (isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-white text-slate-500 border border-slate-200 hover:border-blue-400')}`}>{t}</button>
            ))}
          </div>
        </div>

        <div className="px-6 mt-8 mb-10">
          <div className="relative h-64 rounded-[3.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
            <iframe title="map" width="100%" height="100%" frameBorder="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.9!2d121.56!3d25.03!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb6da9c911d%3A0x8a898730c6224c3a!2z7YOA7J2067Kg7J20 IDEwMQ!5e0!3m2!1sko!2skr!4v1625000000000" style={{ filter: isDarkMode ? 'invert(90%) hue-rotate(180deg)' : '' }}></iframe>
            <div className={`absolute bottom-5 left-5 right-5 p-4 backdrop-blur-md rounded-3xl shadow-xl flex items-center gap-3 border border-white/20 ${isDarkMode ? 'bg-black/60 text-white' : 'bg-white/80 text-slate-900'}`}>
              <Icon name="map" size={22} color="#ef4444" />
              <p className="text-[11px] font-black uppercase tracking-tight italic">Real-time Map: {filtered.length} spots found</p>
            </div>
          </div>
        </div>

        <div className="px-6 flex flex-col gap-6">
          {filtered.map(c => (
            <div key={c.id} className={`p-4 rounded-[2.5rem] border flex gap-5 transition-all hover:shadow-2xl ${isDarkMode ? 'bg-slate-900/50 border-slate-800 hover:bg-slate-800' : 'bg-white border-slate-100 shadow-xl shadow-slate-100'}`}>
              <div className="relative w-28 h-28 shrink-0 overflow-hidden rounded-[2rem] shadow-lg">
                <img src={c.img} className="w-full h-full object-cover" alt={c.title} />
                <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-xl flex items-center gap-1 shadow-md">
                  <Icon name="star" size={10} color="#eab308" fill="#eab308" />
                  <span className="text-[10px] font-black text-slate-800">{c.rating}</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{c.tag}</span>
                    <span className="text-[10px] font-bold opacity-30 tracking-tighter text-slate-400">{c.location}</span>
                  </div>
                  <h4 className={`font-bold text-lg leading-tight mt-1 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{c.title}</h4>
                </div>
                <div className="flex justify-between items-center">
                  <p className={`font-black text-xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{c.price.toLocaleString()} <span className="text-xs opacity-50">TWD</span></p>
                  <button onClick={() => addCourse(c)} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-90"><Icon name="plus" size={18} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const NowTab = () => (
    <div className="px-6 pb-40 animate-fade-in">
      <div className="py-8"><h2 className={`text-2xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>타이베이 나우</h2><p className="text-xs opacity-50 font-bold uppercase tracking-widest italic text-slate-500">Live Updates</p></div>
      <a href="https://english.metro.taipei/" target="_blank" rel="noreferrer" className="block bg-red-50 border border-red-100 p-6 rounded-[3rem] mb-8 flex items-start gap-5 hover:bg-red-100 transition-all shadow-xl shadow-red-100/20">
        <div className="mt-1"><Icon name="alert" size={28} color="#ef4444" /></div>
        <div className="flex-1">
          <h4 className="text-sm font-black text-red-900 mb-1">긴급: MRT 단수이선 지연 안내</h4>
          <p className="text-[11px] text-red-700 opacity-80 leading-relaxed font-bold text-shadow">신호 장애로 인해 10분 지연 운행 중입니다. 공식 홈페이지에서 상황을 확인하세요.</p>
        </div>
        <Icon name="external" size={16} color="#fca5a5" />
      </a>
      <div className="grid grid-cols-2 gap-5 mb-10">
        <div className={`p-7 rounded-[3rem] border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl shadow-slate-100'}`}>
          <Icon name="chart" size={22} color="#3b82f6" />
          <p className="text-[11px] font-black opacity-40 uppercase mt-4 text-slate-500">Today Rate</p>
          <p className={`text-xl font-black mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{EXCHANGE_RATE} KRW</p>
        </div>
        <a href="https://www.vogue.com.tw/" target="_blank" rel="noreferrer" className={`block p-7 rounded-[3rem] border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-yellow-500' : 'bg-white border-slate-100 shadow-xl shadow-slate-100 hover:border-yellow-400'}`}>
          <Icon name="zap" size={22} color="#eab308" />
          <p className="text-[11px] font-black opacity-40 uppercase mt-4 text-slate-500">Hot Topic</p>
          <p className={`text-xl font-black mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>시먼딩 팝업</p>
        </a>
      </div>
      <h3 className={`text-xl font-black mb-5 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>실시간 여행 소식</h3>
      <div className="flex flex-col gap-5">
        {[
          { id: 1, title: '대만관광청 한국인 10만원 지원금 연장 확정', url: 'https://www.taiwantour.or.kr/', tag: '혜택' },
          { id: 2, title: '타이베이 101 카운트다운 한정 티켓 예약 개시', url: 'https://www.taipei-101.com.tw/kr/', tag: '축제' }
        ].map(n => (
          <a key={n.id} href={n.url} target="_blank" rel="noreferrer" className={`p-6 rounded-[2.5rem] border flex items-center gap-5 transition-all group ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-white border-slate-100 shadow-xl shadow-slate-100 hover:shadow-2xl'}`}>
            <div className="w-14 h-14 bg-blue-50 dark:bg-slate-800 rounded-[1.5rem] flex items-center justify-center group-hover:bg-blue-100 transition-colors shadow-inner"><Icon name="news" size={24} color="#3b82f6" /></div>
            <div className="flex-1">
              <span className="text-[9px] font-black text-blue-500 uppercase tracking-tighter">{n.tag}</span>
              <h4 className={`text-base font-bold leading-tight mt-1 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{n.title}</h4>
            </div>
            <Icon name="external" size={18} color="#94a3b8" className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>
    </div>
  );

  const LocalTab = () => (
    <div className="px-6 pb-40 animate-fade-in">
      <div className="py-8"><h2 className={`text-2xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>로컬 인사이트</h2><p className="text-xs opacity-50 font-bold uppercase tracking-widest italic text-slate-500">Insiders Guide</p></div>
      <div className="bg-blue-600 p-10 rounded-[4rem] text-white mb-10 relative overflow-hidden shadow-2xl shadow-blue-200">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-12 -mt-12 blur-3xl" />
        <h3 className="text-3xl font-black mb-4 leading-tight tracking-tight text-shadow font-bold">중국어 한 마디로<br/>현지인 대우받기</h3>
        <p className="text-base opacity-90 mb-8 font-medium leading-relaxed font-bold">인크로스 대표님의 현지 경험이 담긴<br/>상황별 주문 카드 & 꿀팁 가이드</p>
        <button className="bg-white text-blue-600 px-8 py-4 rounded-[2rem] text-sm font-black shadow-2xl hover:scale-105 active:scale-95 transition-all font-bold">카드 보러가기</button>
      </div>
      <h3 className={`text-xl font-black mb-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>이달의 로컬 픽</h3>
      <div className="grid grid-cols-2 gap-5">
        {[
          { title: "숨겨진 다원 투어", tag: "체험" },
          { title: "아침 시장 가이드", tag: "생활" },
          { title: "가성비 발마사지", tag: "휴식" },
          { title: "번체자 읽는 법", tag: "교육" }
        ].map((item, idx) => (
          <div key={idx} className={`p-7 rounded-[3rem] border transition-all active:scale-95 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl shadow-slate-100 hover:border-blue-400'}`}>
            <span className="text-[10px] font-black text-blue-500 mb-2 block uppercase font-bold tracking-widest">{item.tag}</span>
            <h4 className={`font-bold text-base leading-tight mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{item.title}</h4>
            <Icon name="chevronRight" size={18} color="#cbd5e1" />
          </div>
        ))}
      </div>
    </div>
  );

  const MyTripTab = () => {
    const foodSum = myCourses.filter(c => c.tag === '먹거리').reduce((s, i) => s + i.price, 0);
    const tourSum = totalTwd - foodSum;

    return (
      <div className="px-6 pb-44 animate-fade-in">
        <div className={`flex justify-between items-end py-8 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          <h2 className="text-3xl font-black tracking-tight font-bold">나의 여행 관리</h2>
          <div className="flex items-center gap-3">
            {myCourses.length > 0 && <button onClick={clearAll} className="text-[11px] font-black text-red-500 flex items-center gap-1 bg-red-50 px-4 py-2 rounded-2xl transition-colors hover:bg-red-100"><Icon name="trash" size={14}/> 코스 비우기</button>}
          </div>
        </div>

        {/* 신규 기능: 여행 준비물 체크리스트 */}
        <div className={`p-8 mb-10 rounded-[3.5rem] border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl shadow-slate-100'}`}>
          <div className="flex items-center gap-3 mb-6">
            <Icon name="news" size={22} color="#3b82f6" />
            <h4 className="text-lg font-black tracking-tight">준비물 체크리스트</h4>
          </div>
          <div className="flex flex-col gap-4">
            {checklist.map(item => (
              <button key={item.id} onClick={() => toggleCheck(item.id)} className="flex items-center gap-4 group">
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${item.checked ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}>
                  {item.checked && <Icon name="check" size={14} color="white" />}
                </div>
                <span className={`text-sm font-bold transition-all ${item.checked ? 'opacity-30 line-through' : (isDarkMode ? 'text-slate-200' : 'text-slate-700')}`}>{item.text}</span>
              </button>
            ))}
          </div>
        </div>

        {myCourses.length > 0 && (
          <>
            <div className={`p-8 mb-10 rounded-[3.5rem] border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl shadow-slate-100'}`}>
              <div className="flex items-center gap-3 mb-6">
                <Icon name="chart" size={22} color="#3b82f6" />
                <h4 className="text-[11px] font-black uppercase tracking-widest opacity-40 text-slate-500">Expenditure Analysis</h4>
              </div>
              <div className="flex h-5 rounded-full overflow-hidden mb-6 bg-slate-100 dark:bg-slate-800 shadow-inner">
                <div style={{ width: `${(foodSum/totalTwd)*100}%` }} className="bg-yellow-400 transition-all duration-1000 shadow-sm"></div>
                <div style={{ width: `${(tourSum/totalTwd)*100}%` }} className="bg-blue-500 transition-all duration-1000 shadow-sm"></div>
              </div>
              <div className={`flex justify-between text-xs font-black ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm"/><span>식비: {foodSum.toLocaleString()} TWD</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm"/><span>기타: {tourSum.toLocaleString()} TWD</span></div>
              </div>
            </div>
            <div className="flex flex-col gap-5 mb-10">
              {myCourses.map(c => (
                <div key={c.uniqueId} className={`flex items-center gap-5 p-5 rounded-[2.5rem] transition-all ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white shadow-xl shadow-slate-100 border border-slate-50'}`}>
                  <img src={c.img} className="w-16 h-16 rounded-[1.5rem] object-cover shadow-sm" alt={c.title} />
                  <div className="flex-1">
                    <h4 className={`text-base font-bold mb-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{c.title}</h4>
                    <p className="text-xs text-blue-500 font-black tracking-tight">{c.price.toLocaleString()} TWD</p>
                  </div>
                  <button onClick={() => removeCourse(c.uniqueId)} className="p-2.5 text-slate-300 hover:text-red-500 transition-colors active:scale-90"><Icon name="minus" size={20} /></button>
                </div>
              ))}
            </div>
            <button className="w-full flex justify-center items-center gap-4 bg-yellow-400 text-yellow-950 font-black py-6 rounded-[2.5rem] shadow-2xl shadow-yellow-200 hover:bg-yellow-300 active:scale-95 transition-all mb-32 text-xl font-bold">
              <Icon name="message" size={24} fill="currentColor" /> 카카오톡으로 일정 공유
            </button>
          </>
        )}
        
        {myCourses.length === 0 && (
          <div className={`flex flex-col items-center justify-center py-20 rounded-[4rem] border-2 border-dashed ${isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50'}`}>
            <Icon name="alert" size={56} color="#cbd5e1" className="mb-5 opacity-50" />
            <p className="text-base font-black opacity-30 text-slate-500">담긴 코스가 없습니다.</p>
            <button onClick={() => setActiveTab('home')} className="mt-5 text-blue-600 text-sm font-black underline underline-offset-8 uppercase tracking-widest font-bold">코스 담으러 가기</button>
          </div>
        )}

        <div className={`fixed bottom-32 left-6 right-6 p-8 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-700 flex justify-between items-center z-50 transform border border-white/10 ${myCourses.length > 0 ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-32 opacity-0 scale-95 pointer-events-none'} ${isDarkMode ? 'bg-slate-900 shadow-blue-900/30' : 'bg-slate-900 shadow-slate-900/40'}`}>
          <div className="text-slate-100">
            <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em] mb-2 font-bold">Estimated Total</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black tracking-tighter text-white font-bold">{totalTwd.toLocaleString()}</span>
              <span className="text-xs font-black opacity-40 text-white font-bold">TWD</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-blue-400 tracking-tighter shadow-sm italic font-bold">≈ {totalKrw.toLocaleString()}원</p>
            <p className="text-[10px] font-black opacity-30 mt-2 uppercase tracking-widest italic text-white font-bold text-shadow">Rate 1:42.5 applied</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className="max-w-md mx-auto relative min-h-screen flex flex-col shadow-2xl bg-inherit overflow-x-hidden border-x border-slate-100 dark:border-slate-800">
        {activeTab !== 'course' && <Header />}
        <main className="flex-1 overflow-y-auto no-scrollbar relative">
          {activeTab === 'home' && <HomeTab />}
          {activeTab === 'course' && <CourseTab />}
          {activeTab === 'now' && <NowTab />}
          {activeTab === 'insight' && <LocalTab />}
          {activeTab === 'mytrip' && <MyTripTab />}
        </main>
        <nav className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto px-8 pt-5 pb-14 flex justify-between items-center z-50 backdrop-blur-2xl border-t transition-all ${isDarkMode ? 'bg-slate-950/90 border-slate-800 shadow-[0_-10px_40px_rgba(0,0,0,0.4)]' : 'bg-white/90 border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]'}`}>
          {[
            { id: 'home', name: '홈', icon: 'home' },
            { id: 'course', name: '코스', icon: 'map' },
            { id: 'now', name: '나우', icon: 'zap' },
            { id: 'insight', name: '로컬', icon: 'news' },
            { id: 'mytrip', name: '마이', icon: 'user' }
          ].map(tab => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); window.scrollTo(0,0); }} className={`flex flex-col items-center gap-2 transition-all relative ${activeTab === tab.id ? 'text-blue-600 scale-110' : 'text-slate-400 opacity-40 hover:opacity-100'}`}>
              <div className={`p-3 rounded-[1.2rem] transition-all ${activeTab === tab.id ? 'bg-blue-50 dark:bg-blue-900/30 shadow-inner' : ''}`}>
                <Icon name={tab.icon} size={24} fill={activeTab === tab.id ? 'currentColor' : 'none'} />
              </div>
              <span className="text-[11px] font-black uppercase tracking-tighter font-bold">{tab.name}</span>
              {tab.id === 'mytrip' && myCourses.length > 0 && (
                <span className="absolute top-2 right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center text-[8px] font-black text-white shadow-xl animate-pulse font-bold">
                  {myCourses.length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default App;