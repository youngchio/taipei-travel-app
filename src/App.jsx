import React, { useState, useEffect, useMemo } from 'react';

// --- 아이콘 엔진 최적화: React.Fragment를 명시적으로 사용하여 문법 에러를 원천 차단합니다 ---
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
    message: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      {icons[name]}
    </svg>
  );
};

const EXCHANGE_RATE = 42.5;

// 대표님이 검수한 23개 데이터 및 지정하신 고유 이미지 주소 완벽 적용
const INITIAL_COURSES = [
  { id: 1, title: '스린 야시장 먹방 정복', price: 500, img: 'https://www.travel.taipei/content/images/attractions/221601/480x360_attractions-image-md3doqs0yk28-exmxhkuiw.jpg', tag: '먹거리', location: 'Shilin District' },
  { id: 2, title: '지우펀 감성 찻집 투어', price: 850, img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/81864740-8e98-4821-9435-635846ad7e0a.jpeg', tag: '풍경', location: 'New Taipei City' },
  { id: 3, title: '타이베이 101 야경 코스', price: 1200, img: 'https://www.notion.so/image/https%3A%2F%2Fpostfiles.pstatic.net%2FMjAyMzExMTBfMTQz%2FMDAxNjk5NTk5MTc3NzQ2.mH1XqS2HZXAjd5RzfBgHdFlG1--cOF9MOkHt4bZFy1og.Wz6f4eQRDK9dWYxXy5dWRKjmuUkbG1-hENAvVZiZmTMg.JPEG.yomolabs%2F%25ED%2583%2580%25EC%259D%25B4%25EB%25B2%25A0%25EC%259D%25B4_101.jpg%3Ftype%3Dw580?table=block&id=4642abd3-eaf1-45ae-a526-87c86ee3914b&cache=v2', tag: '랜드마크', location: 'Xinyi District' },
  { id: 4, title: '고궁 박물관', price: 300, img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/66b1db08-c2a1-47d1-9db1-60ab7bd1144d.jpeg', tag: '볼거리', location: 'Zhishan Rd' },
  { id: 5, title: '중정기념당 근위병 교대식', price: 0, img: 'https://www.travel.taipei/content/images/attractions/222959/1024x768_attractions-image-nh5ij7pepuajwbsqhfyu5q.jpg', tag: '문화', location: 'Zhongzheng District' },
  { id: 6, title: '화산 1914 창의문화단지 산책', price: 0, img: 'https://i.pinimg.com/1200x/41/7a/67/417a6772e2f4c478e36ae332b84f0333.jpg', tag: '예술', location: 'Zhongzheng District' },
  { id: 7, title: '용산사 소원 빌기 & 야경', price: 0, img: 'https://storage.doopedia.co.kr/upload/_upload/image5/travel/editor/2021/12/28/20211228195949534_thumb.jpg', tag: '문화', location: 'Wanhua District' },
  { id: 8, title: '단수이 일몰 자전거 투어', price: 150, img: 'https://tripool-article-production.s3.ap-southeast-1.amazonaws.com/uploads/article/cover_image/348/N_7_1.jpg', tag: '풍경', location: 'Tamsui District' },
  { id: 9, title: '마오콩 곤돌라 차 마시기', price: 120, img: 'https://thumb.tidesquare.com/tour/public/product/PRV3000549802/PRD3011023563/origin/353000f6-72aa-464d-a0ae-28cca9d2f1b0-png?type=square', tag: '휴식', location: 'Wenshan District' },
  { id: 10, title: '샹산 전망대 타이베이 뷰', price: 0, img: 'https://i.namu.wiki/i/D_lavqjgmRoGxvp1YbTJq1C15-3j2xY3mDnDL2h08euGWf_z_lnCGx0xmjzNyRqXFGnPAIH7deApj8Xc6kSWMw.webp', tag: '풍경', location: 'Xinyi District' },
  { id: 11, title: '베이터우 노천온천 체험', price: 60, img: 'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/i2LY/image/r20SFRw2nLTszFaTLpn68F-I6fI.jpg', tag: '휴식', location: 'Beitou District' },
  { id: 12, title: '시먼딩 스트릿 푸드 투어', price: 400, img: 'https://i.pinimg.com/736x/c0/5a/7c/c05a7ca2109770960db307286796c537.jpg', tag: '먹거리', location: 'Wanhua District' },
  { id: 13, title: '송산 문창원구 디자인 산책', price: 0, img: 'https://i.pinimg.com/736x/92/f9/03/92f9030bb9a34d84d94d3106afd6f2aa.jpg', tag: '예술', location: 'Xinyi District' },

  { id: 14, title: '타이베이 시립 미술관 관람', price: 30, img: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/4f4dc6f6-7494-41e7-b45a-7ba159e757bc.jpeg', tag: '예술', location: 'Zhongshan', rating: 4.5, reviews: 410 },
  { id: 15, title: '닝샤 야시장 미슐랭 투어', price: 300, img: 'https://cdn.tripstore.kr/IMAGE/76bbce46e0d2649d92ed3620cf02cc45.jpg?q=85&w=1440', tag: '먹거리', location: 'Datong', rating: 4.7, reviews: 2100 },
  { id: 16, title: '딘타이펑 본점 샤오롱바오', price: 800, img: 'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/5ZTq/image/e4EkeOnvaEIbLExiWAenQr_gKco.jpg', tag: '먹거리', location: 'Da-an', rating: 4.9, reviews: 9800 },
  { id: 17, title: '라오허제 야시장 화덕만두', price: 150, img: 'https://mblogthumb-phinf.pstatic.net/MjAxNzExMDRfMSAg/MDAxNTA5Nzk1MTk5ODUx.ymfLutCq0B7nsBVLxyhVycjqUrkmfwU8tEwr8ZNxDBEg.bF1tKNysI8qWzDbNZsIvYdqF0eOuUAamHlI_mR7PmPwg.JPEG.lllsarulll/%EB%8C%80%EB%A7%8C_%EB%9D%BC%EC%98%A4%ED%97%88%EC%A0%9C_%EC%95%BC%EC%8B%9C%EC%9E%A5_%ED%99%94%EB%8D%95%EB%A7%8C%EB%91%90_%EB%A8%B9%EA%B1%B0%EB%A6%AC_%289%29.JPG?type=w800', tag: '먹거리', location: 'Songshan', rating: 4.6, reviews: 1850 },
  { id: 18, title: '예류 지질공원 여왕머리 바위', price: 120, img: 'https://pimg.mk.co.kr/news/cms/202401/08/news-p.v1.20231227.943425e4671e48c69d8623a2954c43fd_P1.png', tag: '풍경', location: 'New Taipei', rating: 4.4, reviews: 3100 },
  { id: 19, title: '스펀 폭포 및 천등 날리기', price: 200, img: 'https://blog.kakaocdn.net/dna/lEjcA/btsitZXaEeI/AAAAAAAAAAAAAAAAAAAAAB69KgKr6z4gUceyoFE3fbKfLhOFTNs4rOIRsA3vOGQV/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=bKARVhE6u0A5BwzmhIQ0qwyfBtE%3D', tag: '문화', location: 'New Taipei', rating: 4.8, reviews: 4200 },
  { id: 20, title: '미라마 관람차 야경 감상', price: 200, img: 'https://t1.daumcdn.net/cfile/blog/215A303B58E25C5E0A', tag: '랜드마크', location: 'Zhongshan', rating: 4.5, reviews: 1300 },
  { id: 21, title: '임가화원 전통 정원 산책', price: 80, img: 'https://mblogthumb-phinf.pstatic.net/MjAyMzAzMDNfMjA4/MDAxNjc3ODU1NTkxMTg2.mlQfU2i4Wy67-QcdTwjrhO44Zpiw_Zz3ww8Fc30wyUUg.LaIZzmOoAyc6KeXJJVj4LDchZdIO9q4VX0LqFe8xnrAg.JPEG.soje1234/SE-50dd57b7-8343-44ab-9177-be811d930a0c.jpg?type=w800', tag: '역사', location: 'Banqiao', rating: 4.6, reviews: 950 },
  { id: 22, title: '키키레스토랑 사천요리', price: 1000, img: 'https://mblogthumb-phinf.pstatic.net/MjAyNDA4MDlfODMg/MDAxNzIzMTY2MTg5MDAx.wefkRG1KZojJIi3bhQgxzKJ-Dekv36sPAZljG1nWI5Qg.wYmY5kospZSt3PxZKnL1DKSUEfjrTM_2rv69erdmgIgg.JPEG/0D2A0455.jpg?type=w800', tag: '먹거리', location: 'Xinyi', rating: 4.7, reviews: 4500 },
  { id: 23, title: '우라이 마을 프라이빗 온천', price: 1500, img: 'https://storage.doopedia.co.kr/upload/_upload/image5/travel/editor/2023/04/22/20230422225045705.jpg', tag: '휴식', location: 'Wulai', rating: 4.8, reviews: 2200 },
];

];

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [myCourses, setMyCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('전체');
  const [weather] = useState({ temp: 24, status: 'Sunny', location: 'Taipei' });

  // 환경 독립형 배포를 위해 인라인 스타일 및 Tailwind 자동 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(script);

    const style = document.createElement('style');
    style.innerHTML = `
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      .custom-scrollbar::-webkit-scrollbar { height: 4px; }
      .custom-scrollbar::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }
      .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      .text-shadow { text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
    `;
    document.head.appendChild(style);
  }, []);

  const addCourse = (course) => setMyCourses([...myCourses, { ...course, uniqueId: Date.now() }]);
  const removeCourse = (uid) => setMyCourses(myCourses.filter(c => c.uniqueId !== uid));
  const clearAll = () => setMyCourses([]);

  const totalTwd = myCourses.reduce((sum, c) => sum + c.price, 0);
  const totalKrw = Math.round(totalTwd * EXCHANGE_RATE);

  const Header = () => (
    <header className={`px-6 py-4 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-100'}`}>
      <div className="flex items-center gap-2">
        <div className={`p-2 rounded-full ${isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-50 text-blue-600'}`}>
          <Icon name="sun" size={18} />
        </div>
        <div>
          <p className="text-[10px] font-black opacity-50 uppercase tracking-tighter text-slate-500 dark:text-slate-400">{weather.location} Now</p>
          <p className="text-sm font-black text-slate-900 dark:text-white">{weather.temp}°C {weather.status}</p>
        </div>
      </div>
      <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-3 rounded-2xl transition-all shadow-sm ${isDarkMode ? 'bg-slate-800 text-yellow-400' : 'bg-white text-slate-400 border border-slate-100'}`}>
        <Icon name={isDarkMode ? 'sun' : 'moon'} size={20} />
      </button>
    </header>
  );

  const HomeTab = () => (
    <div className="pb-32 animate-fade-in">
      <div className="px-6 py-6">
        <h1 className="text-3xl font-black leading-tight mb-2 text-slate-900 dark:text-white">계획은 가볍게,<br/>타이베이는 깊게.</h1>
        <p className="opacity-60 text-sm font-medium text-slate-600 dark:text-slate-400">인크로스 현대샵 기획전 감성을 담은 프리미엄 큐레이션</p>
      </div>
      <div className="px-6 mb-8">
        <div className="relative h-56 rounded-[2.5rem] overflow-hidden shadow-2xl group">
          <img src="https://love.seoul.go.kr/tmda/editor/article/2025/02/19/article_202502_13_01.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Taipei" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
            <span className="bg-blue-600 text-[10px] font-black px-3 py-1 rounded-full w-fit mb-3 uppercase tracking-widest">Hot Pick</span>
            <h3 className="font-bold text-2xl leading-tight text-shadow">현지인만 아는<br/>융캉제 숨은 카페 투어</h3>
          </div>
        </div>
      </div>
      <div className="px-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-slate-800 dark:text-slate-200">인기 코스</h3>
          <button onClick={() => setActiveTab('course')} className="text-sm font-bold text-blue-600 underline flex items-center gap-1">전체보기 <Icon name="chevronRight" size={14} /></button>
        </div>
        <div className="flex flex-col gap-4">
          {INITIAL_COURSES.slice(0, 3).map(c => (
            <div key={c.id} className={`p-4 rounded-3xl border flex gap-4 transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
              <img src={c.img} className="w-20 h-20 rounded-2xl object-cover shadow-sm" alt={c.title} />
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <span className="text-[9px] font-black text-blue-500 uppercase tracking-tighter">{c.tag}</span>
                  <h4 className="font-bold text-sm leading-tight mt-1 text-slate-800 dark:text-slate-200">{c.title}</h4>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-black text-sm text-slate-900 dark:text-slate-100">{c.price.toLocaleString()} TWD</p>
                  <button onClick={() => addCourse(c)} className="p-2 bg-blue-600 text-white rounded-xl hover:scale-110 active:scale-95 transition-all shadow-md"><Icon name="plus" size={16} /></button>
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
        <div className={`px-6 py-6 sticky top-0 z-40 border-b transition-colors ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <h2 className="text-2xl font-black mb-4 text-slate-900 dark:text-white">코스 메이커</h2>
          <div className={`relative flex items-center px-4 py-3 rounded-2xl border mb-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-inner'}`}>
            <Icon name="search" size={18} color="#94a3b8" className="mr-3" />
            <input type="text" placeholder="장소를 검색하세요" className="bg-transparent w-full outline-none text-sm font-medium text-slate-700 dark:text-slate-300" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 custom-scrollbar">
            {tags.map(t => (
              <button key={t} onClick={() => setSelectedTag(t)} className={`px-5 py-2 rounded-full text-[11px] font-black whitespace-nowrap transition-all ${selectedTag === t ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : (isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-white text-slate-500 border border-slate-200 hover:border-blue-300')}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="px-6 mt-8 mb-8">
          <div className="relative h-64 rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl">
            <iframe title="map" width="100%" height="100%" frameBorder="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.9!2d121.56!3d25.03!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb6da9c911d%3A0x8a898730c6224c3a!2z7YOA7J2067Kg7J20 IDEwMQ!5e0!3m2!1sko!2skr!4v1625000000000" style={{ filter: isDarkMode ? 'invert(90%) hue-rotate(180deg)' : '' }}></iframe>
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg flex items-center gap-3 text-slate-900 border border-white">
              <Icon name="map" size={20} color="#ef4444" />
              <p className="text-[10px] font-black uppercase tracking-tight">Real-time Map: {filtered.length} spots found</p>
            </div>
          </div>
        </div>
        <div className="px-6 flex flex-col gap-4">
          {filtered.map(c => (
            <div key={c.id} className={`p-4 rounded-3xl border flex gap-4 transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm hover:shadow-md'}`}>
              <div className="relative w-20 h-20 shrink-0">
                <img src={c.img} className="w-full h-full rounded-2xl object-cover shadow-sm" alt={c.title} />
                <div className="absolute -top-1 -left-1 bg-white/90 p-1 rounded-lg flex items-center gap-0.5 shadow-sm">
                  <Icon name="star" size={10} color="#eab308" fill="#eab308" />
                  <span className="text-[9px] font-black text-slate-700">{c.rating}</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-black text-blue-500 uppercase tracking-tighter">{c.tag}</span>
                    <span className="text-[9px] font-bold opacity-30 tracking-tighter text-slate-500 dark:text-slate-400">{c.location}</span>
                  </div>
                  <h4 className="font-bold text-sm leading-tight mt-1 text-slate-800 dark:text-slate-200">{c.title}</h4>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-black text-sm text-slate-900 dark:text-slate-100">{c.price.toLocaleString()} TWD</p>
                  <button onClick={() => addCourse(c)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"><Icon name="plus" size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const NowTab = () => {
    const news = [
      { id: 1, title: '대만관광청 한국인 10만원 지원금 연장 확정', url: 'https://www.taiwantour.or.kr/', tag: '혜택' },
      { id: 2, title: '타이베이 101 카운트다운 한정 티켓 예약 개시', url: 'https://www.taipei-101.com.tw/kr/', tag: '축제' },
      { id: 3, title: 'CNN 선정 아시아 최고 길거리 음식 도시 타이베이', url: 'https://edition.cnn.com/travel', tag: '뉴스' }
    ];

    return (
      <div className="px-6 pb-40 animate-fade-in">
        <div className="py-8"><h2 className="text-2xl font-black mb-1 text-slate-900 dark:text-white">타이베이 나우</h2><p className="text-xs opacity-50 font-bold uppercase tracking-widest italic text-slate-500">Real-time Local Insights</p></div>
        <a href="https://english.metro.taipei/" target="_blank" rel="noreferrer" className="block bg-red-50 border border-red-100 p-5 rounded-[2.5rem] mb-6 flex items-start gap-4 hover:bg-red-100 transition-colors shadow-sm">
          <div className="mt-1"><Icon name="trash" size={24} color="#ef4444" /></div>
          <div className="flex-1">
            <h4 className="text-xs font-black text-red-900 mb-1 text-slate-900">긴급: MRT 단수이선 지연 안내</h4>
            <p className="text-[10px] text-red-700 opacity-80 leading-relaxed">신호 장애로 인해 10분 지연 운행 중입니다. 공식 홈페이지에서 상황을 확인하세요.</p>
          </div>
          <Icon name="external" size={14} color="#fca5a5" />
        </a>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className={`p-6 rounded-[2.5rem] border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
            <Icon name="chart" size={20} color="#3b82f6" />
            <p className="text-[10px] font-black opacity-40 uppercase mt-3 text-slate-500">Today Rate</p>
            <p className="text-lg font-black text-slate-900 dark:text-white">{EXCHANGE_RATE} KRW</p>
          </div>
          <a href="https://www.vogue.com.tw/" target="_blank" rel="noreferrer" className={`block p-6 rounded-[2.5rem] border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-yellow-400' : 'bg-white border-slate-100 shadow-sm hover:shadow-md'}`}>
            <Icon name="zap" size={20} color="#eab308" />
            <p className="text-[10px] font-black opacity-40 uppercase mt-3 text-slate-500">Hot Topic</p>
            <p className="text-lg font-black text-slate-900 dark:text-white">시먼딩 팝업</p>
          </a>
        </div>
        <h3 className="text-lg font-black mb-4 text-slate-800 dark:text-slate-200">현재 화제인 소식</h3>
        <div className="flex flex-col gap-4">
          {news.map(n => (
            <a key={n.id} href={n.url} target="_blank" rel="noreferrer" className={`p-5 rounded-3xl border flex items-center gap-4 transition-all group ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-white border-slate-100 shadow-sm hover:shadow-md'}`}>
              <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors shadow-inner"><Icon name="news" size={20} color="#3b82f6" /></div>
              <div className="flex-1">
                <span className="text-[8px] font-black text-blue-500 uppercase tracking-tighter">{n.tag}</span>
                <h4 className="text-sm font-bold leading-tight mt-1 text-slate-800 dark:text-slate-200">{n.title}</h4>
              </div>
              <Icon name="external" size={16} color="#94a3b8" className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    );
  };

  const LocalTab = () => (
    <div className="px-6 pb-40 animate-fade-in">
      <div className="py-8"><h2 className="text-2xl font-black mb-1 text-slate-900 dark:text-white">로컬 인사이트</h2><p className="text-xs opacity-50 font-bold uppercase tracking-widest italic text-slate-500">Exclusive Editor Pick</p></div>
      <div className="bg-blue-600 p-8 rounded-[3rem] text-white mb-8 relative overflow-hidden shadow-2xl shadow-blue-100">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
        <h3 className="text-2xl font-black mb-3 leading-tight tracking-tight text-shadow">중국어 한 마디로<br/>현지인 대우받기</h3>
        <p className="text-sm opacity-90 mb-6 font-medium leading-relaxed">인크로스 대표님의 현지 경험이 담긴<br/>상황별 주문 카드 & 꿀팁 가이드</p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-2xl text-xs font-black shadow-xl hover:scale-105 active:scale-95 transition-all">카드 확인하기</button>
      </div>
      <h3 className="text-lg font-black mb-4 text-slate-800 dark:text-slate-200">이달의 로컬 픽</h3>
      <div className="grid grid-cols-2 gap-4">
        {[
          { title: "숨겨진 다원 투어", tag: "체험" },
          { title: "아침 시장 가이드", tag: "생활" },
          { title: "가성비 발마사지", tag: "휴식" },
          { title: "번체자 읽는 법", tag: "교육" }
        ].map((item, idx) => (
          <div key={idx} className={`p-6 rounded-[2rem] border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm hover:border-blue-400 hover:shadow-lg'}`}>
            <span className="text-[9px] font-black text-blue-500 mb-2 block uppercase">{item.tag}</span>
            <h4 className="font-bold text-sm leading-tight mb-3 text-slate-800 dark:text-slate-200">{item.title}</h4>
            <Icon name="chevronRight" size={16} color="#cbd5e1" />
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
        <div className="flex justify-between items-end py-8 text-slate-900 dark:text-white">
          <h2 className="text-2xl font-black">나의 예산 리포트</h2>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold opacity-50 italic text-slate-600 dark:text-slate-400">{myCourses.length} spots</span>
            {myCourses.length > 0 && <button onClick={clearAll} className="text-[10px] font-black text-red-500 flex items-center gap-1 bg-red-50 px-3 py-1.5 rounded-xl transition-colors hover:bg-red-100"><Icon name="trash" size={12}/> 비우기</button>}
          </div>
        </div>
        {myCourses.length === 0 ? (
          <div className={`flex flex-col items-center justify-center py-24 rounded-[3.5rem] border-2 border-dashed ${isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50'}`}>
            <Icon name="alert" size={48} color="#cbd5e1" className="mb-4 opacity-50" />
            <p className="text-sm font-black opacity-30 text-slate-500">담긴 코스가 없습니다.</p>
            <button onClick={() => setActiveTab('home')} className="mt-4 text-blue-600 text-xs font-black underline underline-offset-4">코스 담으러 가기</button>
          </div>
        ) : (
          <>
            <div className={`p-6 mb-8 rounded-[3rem] border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl shadow-blue-50'}`}>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="chart" size={18} color="#3b82f6" />
                <h4 className="text-xs font-black uppercase tracking-widest opacity-60 text-slate-500">Expenditure Analysis</h4>
              </div>
              <div className="flex h-4 rounded-full overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800 shadow-inner">
                <div style={{ width: `${(foodSum/totalTwd)*100}%` }} className="bg-yellow-400 transition-all duration-700"></div>
                <div style={{ width: `${(tourSum/totalTwd)*100}%` }} className="bg-blue-500 transition-all duration-700"></div>
              </div>
              <div className="flex justify-between text-[11px] font-black text-slate-800 dark:text-slate-200">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-sm"/><span>식비: {foodSum.toLocaleString()} TWD</span></div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm"/><span>기타: {tourSum.toLocaleString()} TWD</span></div>
              </div>
            </div>
            <div className="flex flex-col gap-4 mb-8">
              {myCourses.map(c => (
                <div key={c.uniqueId} className={`flex items-center gap-4 p-4 rounded-3xl transition-all ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white shadow-sm border border-slate-50'}`}>
                  <img src={c.img} className="w-14 h-14 rounded-xl object-cover shadow-sm" alt={c.title} />
                  <div className="flex-1">
                    <h4 className="text-xs font-black mb-1 text-slate-800 dark:text-slate-200">{c.title}</h4>
                    <p className="text-[10px] text-blue-500 font-bold tracking-tight">{c.price.toLocaleString()} TWD</p>
                  </div>
                  <button onClick={() => removeCourse(c.uniqueId)} className="p-2 text-slate-300 hover:text-red-500 transition-colors active:scale-90"><Icon name="minus" size={18} /></button>
                </div>
              ))}
            </div>
            <button className="w-full flex justify-center items-center gap-3 bg-yellow-400 text-yellow-950 font-black py-5 rounded-[2rem] shadow-xl shadow-yellow-100 hover:bg-yellow-300 active:scale-95 transition-all mb-24">
              <Icon name="message" size={20} fill="currentColor" /> 카카오톡으로 일정 공유하기
            </button>
          </>
        )}
        <div className={`fixed bottom-28 left-6 right-6 p-7 rounded-[2.5rem] shadow-2xl transition-all duration-500 flex justify-between items-center z-50 transform border border-white/10 ${myCourses.length > 0 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'} ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-900 text-white'}`}>
          <div className="text-slate-100">
            <p className="text-[9px] font-black opacity-40 uppercase tracking-[0.2em] mb-1">Estimated Total</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white">{totalTwd.toLocaleString()}</span>
              <span className="text-[10px] font-bold opacity-40 uppercase text-slate-900 dark:text-white">TWD</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-black text-blue-400 tracking-tighter shadow-sm">≈ {totalKrw.toLocaleString()}원</p>
            <p className="text-[8px] font-black opacity-30 mt-1 uppercase tracking-widest italic">Rate 1:42.5 fixed</p>
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'home', name: '홈', icon: 'home' },
    { id: 'course', name: '코스', icon: 'map' },
    { id: 'now', name: '나우', icon: 'zap' },
    { id: 'insight', name: '로컬', icon: 'news' },
    { id: 'mytrip', name: '마이', icon: 'user' }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className="max-w-md mx-auto relative min-h-screen flex flex-col shadow-2xl bg-inherit overflow-x-hidden">
        {activeTab !== 'course' && <Header />}
        <main className="flex-1 overflow-y-auto no-scrollbar relative">
          {activeTab === 'home' && <HomeTab />}
          {activeTab === 'course' && <CourseTab />}
          {activeTab === 'now' && <NowTab />}
          {activeTab === 'insight' && <LocalTab />}
          {activeTab === 'mytrip' && <MyTripTab />}
        </main>
        <nav className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto px-8 pt-4 pb-12 flex justify-between items-center z-50 backdrop-blur-xl border-t ${isDarkMode ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-100 shadow-[0_-4px_30px_rgba(0,0,0,0.04)]'}`}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); window.scrollTo(0,0); }} className={`flex flex-col items-center gap-1.5 transition-all relative ${activeTab === tab.id ? 'text-blue-600 scale-110' : 'text-slate-400 opacity-40 hover:opacity-100'}`}>
              <div className={`p-2 rounded-2xl transition-all ${activeTab === tab.id ? 'bg-blue-50 dark:bg-blue-900/30 shadow-sm' : ''}`}>
                <Icon name={tab.icon} size={22} fill={activeTab === tab.id ? 'currentColor' : 'none'} />
              </div>
              <span className="text-[10px] font-black">{tab.name}</span>
              {tab.id === 'mytrip' && myCourses.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center text-[8px] font-black text-white shadow-sm animate-pulse">
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