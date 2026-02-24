import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Map as MapIcon, 
  Newspaper, 
  Info, 
  User, 
  Plus, 
  Minus, 
  Sun, 
  Moon, 
  CloudRain,
  Navigation,
  TrendingUp,
  AlertCircle,
  MapPin,
  ExternalLink,
  ChevronRight,
  Filter,
  Search,
  Star,
  Zap,
  MessageCircle,
  Clock,
  DollarSign,
  Trash2,
  Share2,
  PieChart
} from 'lucide-react';

const EXCHANGE_RATE = 42.5;

// 기존 13개 + 신규 10개 = 총 23개 방대한 데이터베이스
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

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [myCourses, setMyCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('전체');
  const [weather] = useState({ temp: 24, status: 'Sunny', location: 'Taipei' });

  // CSS 스크롤바 및 테일윈드 설정 주입
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(script);

    const style = document.createElement('style');
    style.innerHTML = `
      .custom-scrollbar::-webkit-scrollbar {
        height: 6px;
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: #cbd5e1;
        border-radius: 20px;
      }
      .dark .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: #475569;
      }
    `;
    document.head.appendChild(style);
  }, []);

  const addCourse = (course) => {
    setMyCourses([...myCourses, { ...course, uniqueId: Date.now() }]);
  };

  const removeCourse = (uniqueId) => {
    setMyCourses(myCourses.filter(item => item.uniqueId !== uniqueId));
  };

  const clearAllCourses = () => {
    setMyCourses([]);
  };

  const totalTwd = myCourses.reduce((sum, item) => sum + item.price, 0);
  const totalKrw = Math.round(totalTwd * EXCHANGE_RATE);

  const Header = () => (
    <header className="flex justify-between items-center px-6 py-4 sticky top-0 z-50 bg-inherit backdrop-blur-md border-b border-black/5">
      <div className="flex items-center gap-2">
        <div className={`p-2 rounded-full ${isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-50 text-blue-600'}`}>
          <CloudRain size={18} />
        </div>
        <div>
          <p className="text-[10px] font-bold opacity-50 uppercase tracking-tighter">{weather.location} Now</p>
          <p className="text-sm font-black">{weather.temp}°C {weather.status}</p>
        </div>
      </div>
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`p-3 rounded-2xl transition-all shadow-sm ${isDarkMode ? 'bg-slate-800 text-yellow-400' : 'bg-white text-slate-400 border border-slate-100'}`}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );

  const HomeTab = () => (
    <div className="pb-32 animate-in fade-in duration-500">
      <div className="px-6 py-6">
        <h1 className="text-3xl font-black leading-tight mb-2">계획은 가볍게,<br/>타이베이는 깊게.</h1>
        <p className="opacity-60 text-sm font-medium text-slate-500">인크로스 현대샵 기획전 퀄리티로 엄선한 핫플</p>
      </div>
      <div className="px-6 mb-8">
        <div className="relative h-48 rounded-[2.5rem] overflow-hidden shadow-xl group">
          <img src="https://love.seoul.go.kr/tmda/editor/article/2025/02/19/article_202502_13_01.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
            <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-md w-fit mb-2">EDITOR'S PICK</span>
            <h3 className="text-white font-bold text-xl">현지인이 줄 서서 먹는 우육면 TOP 3</h3>
          </div>
        </div>
      </div>
      <div className="px-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-black">추천 코스</h3>
          <button onClick={() => setActiveTab('course')} className="text-sm font-bold text-blue-600 flex items-center gap-1">전체보기 <ChevronRight size={14} /></button>
        </div>
        <div className="flex flex-col gap-4">
          {INITIAL_COURSES.slice(0, 3).map((course) => (
            <div key={course.id} className={`flex gap-4 p-3 rounded-3xl border transition-all ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
              <img src={course.img} className="w-24 h-24 rounded-2xl object-cover" alt="" />
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <span className="text-[10px] font-bold text-blue-500 mb-1 block">{course.tag}</span>
                  <h4 className="font-bold text-sm leading-snug">{course.title}</h4>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="font-black text-sm">{course.price.toLocaleString()} TWD</p>
                  <button onClick={() => addCourse(course)} className="p-2 bg-blue-600 text-white rounded-xl hover:scale-110 transition-transform">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CourseTab = () => {
    const filteredCourses = INITIAL_COURSES.filter(course => {
      const matchSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchTag = selectedTag === '전체' || course.tag === selectedTag;
      return matchSearch && matchTag;
    });
    const tags = ['전체', '먹거리', '풍경', '랜드마크', '역사', '문화', '예술', '휴식'];

    return (
      <div className="pb-44 animate-in fade-in duration-500">
        {/* 상단 Sticky 필터 영역 (지도와 겹침 방지) */}
        <div className={`px-6 py-6 sticky top-0 z-40 border-b ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <h2 className="text-2xl font-black mb-4">코스 메이커</h2>
          <div className={`relative flex items-center px-4 py-3 rounded-2xl border transition-all mb-4 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
            <Search size={18} className="text-slate-400 mr-3" />
            <input type="text" placeholder="장소를 검색하세요" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-transparent border-none outline-none w-full text-sm font-medium" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {tags.map(tag => (
              <button key={tag} onClick={() => setSelectedTag(tag)} className={`px-4 py-2 rounded-full text-[11px] font-black whitespace-nowrap transition-all ${selectedTag === tag ? 'bg-blue-600 text-white' : (isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-white text-slate-500 border border-slate-100')}`}>{tag}</button>
            ))}
          </div>
        </div>
        
        {/* 지도 영역 (마진 확보로 겹침 해결) */}
        <div className="px-6 mt-6 mb-8">
          <div className="relative h-64 rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl">
            <iframe title="Google Maps" width="100%" height="100%" frameBorder="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.9038290299!2d121.56228351500624!3d25.033963883972416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb6da9c911d%3A0x8a898730c6224c3a!2z7YOA7J2067Kg7J20IDEwMQ!5e0!3m2!1sko!2skr!4v1625000000000!5m2!1sko!2skr" style={{ filter: isDarkMode ? 'invert(90%) hue-rotate(180deg)' : 'none' }}></iframe>
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg flex items-center gap-3 text-slate-900">
              <MapPin className="text-red-500" size={20} />
              <p className="text-[10px] font-black">타이베이 전역 실시간 맵 가동 중</p>
            </div>
          </div>
        </div>

        <div className="px-6 flex flex-col gap-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">{filteredCourses.length} results found</p>
          </div>
          {filteredCourses.map((course) => (
            <div key={course.id} className={`flex gap-4 p-3 rounded-3xl border transition-all ${isDarkMode ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800' : 'bg-white border-slate-100 shadow-sm hover:shadow-md'}`}>
              <div className="relative w-24 h-24 shrink-0">
                <img src={course.img} className="w-full h-full rounded-2xl object-cover" alt="" />
                <div className="absolute -top-1 -left-1 bg-white/90 p-1 rounded-lg flex items-center gap-0.5 shadow-sm"><Star size={10} className="text-yellow-500 fill-yellow-500" /><span className="text-[9px] font-black text-slate-700">{course.rating}</span></div>
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div><div className="flex justify-between items-start"><span className="text-[9px] font-bold text-blue-500 uppercase">{course.tag}</span><span className="text-[9px] font-bold opacity-30 tracking-tighter">{course.location}</span></div><h4 className="font-bold text-sm leading-tight mt-1">{course.title}</h4></div>
                <div className="flex justify-between items-center"><p className="font-black text-sm">{course.price.toLocaleString()} TWD</p><button onClick={() => addCourse(course)} className="p-2 bg-slate-100 dark:bg-slate-700 rounded-xl hover:bg-blue-600 hover:text-white shadow-sm"><Plus size={14} /></button></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const NowTab = () => {
    // 실제 외부 기사/웹사이트로 연결되는 링크 데이터
    const newsData = [
      { id: 1, title: '대만관광청, 한국인 여행객 대상 10만원 지원금 연장', time: '1시간 전', url: 'https://www.taiwantour.or.kr/' },
      { id: 2, title: '타이베이 101 카운트다운 이벤트 한정 패스 예약 오픈', time: '3시간 전', url: 'https://www.taipei-101.com.tw/kr/' },
      { id: 3, title: 'CNN 선정 아시아 최고 길거리 음식 도시, 타이베이', time: '어제', url: 'https://edition.cnn.com/travel' }
    ];

    return (
      <div className="px-6 pb-40 animate-in fade-in duration-500">
        <div className="py-6"><h2 className="text-2xl font-black mb-1">타이베이 나우</h2><p className="text-xs opacity-50 font-bold uppercase tracking-widest">Real-time Local Intel</p></div>
        
        {/* 긴급 공지 (URL 연동) */}
        <a href="https://english.metro.taipei/" target="_blank" rel="noreferrer" className="block bg-red-50 border border-red-100 p-4 rounded-3xl mb-6 flex items-start gap-3 hover:bg-red-100 transition-colors">
          <AlertCircle className="text-red-500 shrink-0" size={20} />
          <div className="flex-1">
            <h4 className="text-xs font-black text-red-900 mb-1">긴급 공지: MRT 단수이선 지연</h4>
            <p className="text-[10px] text-red-700 opacity-80">현재 신베이터우역 인근 신호 장애. 공식 홈페이지에서 상황 확인하기</p>
          </div>
          <ExternalLink size={14} className="text-red-300" />
        </a>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className={`p-5 rounded-[2rem] border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}><TrendingUp className="text-blue-500 mb-2" size={20} /><p className="text-[10px] font-bold opacity-50 uppercase">Today's Rate</p><p className="text-lg font-black">1 TWD = {EXCHANGE_RATE}원</p></div>
          <a href="https://www.vogue.com.tw/" target="_blank" rel="noreferrer" className={`block p-5 rounded-[2rem] border hover:border-yellow-400 transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}><Zap className="text-yellow-500 mb-2" size={20} /><p className="text-[10px] font-bold opacity-50 uppercase">Hot Topic</p><p className="text-lg font-black">시먼딩 팝업</p></a>
        </div>

        <h3 className="text-lg font-black mb-4">현재 화제인 소식</h3>
        <div className="flex flex-col gap-4">
          {newsData.map(news => (
            <a key={news.id} href={news.url} target="_blank" rel="noreferrer" className={`p-4 rounded-3xl border ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:shadow-md shadow-sm'} flex items-center gap-4 transition-all group`}>
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors"><Newspaper size={20} className="text-blue-500 opacity-60" /></div>
              <div className="flex-1">
                <h4 className="text-sm font-bold leading-tight">{news.title}</h4>
                <p className="text-[10px] opacity-40 mt-1">{news.time} · 웹사이트 이동</p>
              </div>
              <ExternalLink size={16} className="opacity-20 group-hover:opacity-100 group-hover:text-blue-500 transition-all" />
            </a>
          ))}
        </div>
      </div>
    );
  };

  const LocalTab = () => (
    <div className="px-6 pb-40 animate-in slide-in-from-bottom-4 duration-500">
      <div className="py-6"><h2 className="text-2xl font-black mb-1">로컬 인사이트</h2><p className="text-xs opacity-50 font-bold uppercase tracking-widest">Insider Guide by CEO</p></div>
      <div className="bg-blue-600 p-6 rounded-[2.5rem] text-white mb-6 relative overflow-hidden">
        <MessageCircle className="absolute -bottom-4 -right-4 opacity-10" size={120} />
        <h3 className="text-xl font-bold mb-2 leading-tight">중국어 한 마디로<br/>현지인 대우받기</h3>
        <p className="text-xs opacity-80 mb-4">대표님의 현지 경험이 담긴 주문 꿀팁</p>
        <button className="bg-white text-blue-600 px-4 py-2 rounded-xl text-xs font-bold shadow-xl">지금 확인하기</button>
      </div>
      <h3 className="text-lg font-black mb-4">이달의 로컬 픽</h3>
      <div className="grid grid-cols-2 gap-4">
        {[
          { title: "숨겨진 다원 투어", tag: "체험" },
          { title: "아침 시장 가이드", tag: "생활" },
          { title: "가성비 발마사지", tag: "휴식" },
          { title: "번체자 읽는 법", tag: "교육" }
        ].map((item, idx) => (
          <div key={idx} className={`p-5 rounded-[2rem] border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
            <span className="text-[9px] font-black text-blue-500 mb-1 block uppercase">{item.tag}</span>
            <h4 className="font-bold text-sm leading-tight mb-2">{item.title}</h4>
            <ChevronRight size={16} className="opacity-20" />
          </div>
        ))}
      </div>
    </div>
  );

  const MyTripTab = () => {
    const foodBudget = myCourses.filter(c => c.tag === '먹거리').reduce((sum, item) => sum + item.price, 0);
    const tourBudget = totalTwd - foodBudget;

    return (
      <div className="px-6 pb-44 animate-in slide-in-from-right duration-500">
        <div className="flex justify-between items-end py-6">
          <h2 className="text-2xl font-black">나의 예산 리포트</h2>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold opacity-50 italic">{myCourses.length} items</span>
            {myCourses.length > 0 && (
              <button onClick={clearAllCourses} className="text-[10px] font-bold text-red-500 flex items-center gap-1 bg-red-50 px-2 py-1 rounded-md"><Trash2 size={12}/> 비우기</button>
            )}
          </div>
        </div>

        {myCourses.length === 0 ? (
          <div className={`flex flex-col items-center justify-center py-20 rounded-[3rem] border-2 border-dashed ${isDarkMode ? 'border-slate-700 bg-slate-800/30' : 'border-slate-200 bg-slate-50'}`}><AlertCircle size={48} className="mb-4 opacity-20" /><p className="text-sm font-bold opacity-40">담긴 코스가 없습니다.</p></div>
        ) : (
          <>
            {/* 강화된 예산 분석 위젯 */}
            <div className={`p-5 mb-6 rounded-[2rem] border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
              <div className="flex items-center gap-2 mb-3">
                <PieChart size={16} className="text-blue-500" />
                <h4 className="text-xs font-black">지출 카테고리 분석</h4>
              </div>
              <div className="flex h-3 rounded-full overflow-hidden mb-3 bg-slate-100">
                <div style={{ width: `${(foodBudget/totalTwd)*100}%` }} className="bg-yellow-400"></div>
                <div style={{ width: `${(tourBudget/totalTwd)*100}%` }} className="bg-blue-500"></div>
              </div>
              <div className="flex justify-between text-[10px] font-bold opacity-60">
                <span>식비: {foodBudget.toLocaleString()} TWD</span>
                <span>관광/기타: {tourBudget.toLocaleString()} TWD</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-6">
              {myCourses.map((item) => (
                <div key={item.uniqueId} className={`flex items-center gap-4 p-4 rounded-3xl ${isDarkMode ? 'bg-slate-800 shadow-inner' : 'bg-white shadow-sm border border-slate-100'}`}>
                  <img src={item.img} className="w-14 h-14 rounded-xl object-cover" alt="" /><div className="flex-1"><h4 className="text-xs font-black mb-1">{item.title}</h4><p className="text-[10px] text-blue-500 font-bold">{item.price.toLocaleString()} TWD</p></div>
                  <button onClick={() => removeCourse(item.uniqueId)} className="p-2 text-red-500/30 hover:text-red-500 transition-colors"><Minus size={20} /></button>
                </div>
              ))}
            </div>

            {/* 바이럴을 위한 공유하기 버튼 추가 */}
            <button className="w-full flex justify-center items-center gap-2 bg-yellow-400 text-yellow-950 font-black py-4 rounded-2xl shadow-lg hover:bg-yellow-300 transition-colors mb-20">
              <MessageCircle size={18} fill="currentColor" /> 카카오톡으로 일정 공유하기
            </button>
          </>
        )}

        <div className={`fixed bottom-28 left-6 right-6 p-6 rounded-[2.5rem] shadow-2xl transition-all duration-500 flex justify-between items-center z-50 ${myCourses.length > 0 ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'} ${isDarkMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}`}>
          <div><p className="text-[9px] font-black opacity-50 uppercase tracking-widest mb-1">Estimated Budget</p><div className="flex items-baseline gap-1"><span className="text-2xl font-black">{totalTwd.toLocaleString()}</span><span className="text-[10px] font-bold opacity-50">TWD</span></div></div>
          <div className="text-right"><p className="text-lg font-black text-blue-500">≈ {totalKrw.toLocaleString()}원</p><p className="text-[8px] font-bold opacity-30 mt-1">환율 1 TWD = {EXCHANGE_RATE}원 적용</p></div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-md mx-auto relative min-h-screen flex flex-col shadow-2xl bg-inherit">
        {!['course'].includes(activeTab) && <Header />}
        
        <main className="flex-1 overflow-y-auto no-scrollbar relative">
          {activeTab === 'home' && <HomeTab />}
          {activeTab === 'course' && <CourseTab />}
          {activeTab === 'now' && <NowTab />}
          {activeTab === 'insight' && <LocalTab />}
          {activeTab === 'mytrip' && <MyTripTab />}
        </main>
        
        <nav className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto px-8 pt-4 pb-10 flex justify-between items-center z-50 backdrop-blur-xl border-t ${isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]'}`}>
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'home' ? 'text-blue-600 scale-110' : 'text-slate-400 opacity-50'}`}><Home size={22} fill={activeTab === 'home' ? 'currentColor' : 'none'} /><span className="text-[10px] font-black">홈</span></button>
          <button onClick={() => setActiveTab('course')} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'course' ? 'text-blue-600 scale-110' : 'text-slate-400 opacity-50'}`}><Navigation size={22} fill={activeTab === 'course' ? 'currentColor' : 'none'} /><span className="text-[10px] font-black">코스</span></button>
          <button onClick={() => setActiveTab('now')} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'now' ? 'text-blue-600 scale-110' : 'text-slate-400 opacity-50'}`}><Zap size={22} fill={activeTab === 'now' ? 'currentColor' : 'none'} /><span className="text-[10px] font-black">나우</span></button>
          <button onClick={() => setActiveTab('insight')} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'insight' ? 'text-blue-600 scale-110' : 'text-slate-400 opacity-50'}`}><Newspaper size={22} /><span className="text-[10px] font-black">로컬</span></button>
          <button onClick={() => setActiveTab('mytrip')} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'mytrip' ? 'text-blue-600 scale-110' : 'text-slate-400 opacity-50'} relative`}><div className="relative"><User size={22} fill={activeTab === 'mytrip' ? 'currentColor' : 'none'} />{myCourses.length > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-black text-white shadow-sm">{myCourses.length}</span>}</div><span className="text-[10px] font-black">마이</span></button>
        </nav>
      </div>
    </div>
  );
};

export default App;