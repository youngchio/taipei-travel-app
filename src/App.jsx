import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Clock, 
  Utensils, 
  Beer, 
  Bus, 
  Plane, 
  Map as MapIcon, 
  User, 
  Heart, 
  ShoppingBag, 
  Landmark, 
  Camera, 
  Calendar,
  Info,
  Navigation,
  CloudRain,
  Sun,
  Wind,
  Shirt,
  ChevronRight,
  CheckSquare,
  Square,
  Backpack,
  Gift,
  ExternalLink,
  Navigation2,
  Footprints,
  Wallet,
  Plus,
  Trash2,
  X,
  Sparkles,
  Flower2,
  Star,
  CreditCard,
  Zap,
  Quote,
  ChefHat,
  Train,
  ChevronDown,
  PartyPopper,
  Camera as CameraIcon,
  Moon,
  Sunset,
  Droplets,
  Edit2,
  MoreVertical,
  Share2,
  CheckCircle2,
  Bed,
  BellRing,
  Store,
  Pill,
  Phone,
  Ticket,
  Search
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('day1'); 
  const [isRaining, setIsRaining] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  
  const [showConfetti, setShowConfetti] = useState(false);
  const [dDayText, setDDayText] = useState('');
  const [showDDayModal, setShowDDayModal] = useState(false);
  
  const [showNightConcierge, setShowNightConcierge] = useState(false);
  const [conciergeDismissed, setConciergeDismissed] = useState(false);
  
  const [selectedExpense, setSelectedExpense] = useState(null);
  const pressTimer = useRef(null);

  const [toastMessage, setToastMessage] = useState('');
  const [showBannerModal, setShowBannerModal] = useState(false);
  
  const [weather, setWeather] = useState({
    temp: 21,
    condition: '구름 조금',
    icon: <Sun className="w-5 h-5 text-blue-500" />
  });

  const EXCHANGE_RATE = 42.5;

  const [totalBudget, setTotalBudget] = useState(20000);
  const [expenses, setExpenses] = useState([
    { id: 1, title: '롱하오스 점심', amount: 350, category: 'Food', date: '03.20' },
    { id: 2, title: '가발란 & 고량주', amount: 4200, category: 'Shopping', date: '03.20' },
    { id: 3, title: '예스지 투어 간식비', amount: 800, category: 'Food', date: '03.21' },
    { id: 4, title: '산해루 파인 다이닝', amount: 5200, category: 'Food', date: '03.22' }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('Food');

  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remainingBudget = totalBudget - totalSpent;
  const isBudgetLow = remainingBudget <= totalBudget * 0.15;

  const categoryStats = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, { Food: 0, Shopping: 0, Tour: 0, Etc: 0 });

  const recommendedShoppingBudget = totalBudget * 0.3;
  const currentShoppingExpense = categoryStats.Shopping;
  const remainingShoppingBudget = recommendedShoppingBudget - currentShoppingExpense;
  const shoppingProgress = Math.min(100, Math.max(0, (currentShoppingExpense / recommendedShoppingBudget) * 100));

  useEffect(() => {
    const calculateDDay = () => {
      const tripDate = new Date('2026-03-20T00:00:00');
      const today = new Date();
      
      const tripDay = new Date(tripDate.getFullYear(), tripDate.getMonth(), tripDate.getDate());
      const currentDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const diffTime = tripDay.getTime() - currentDay.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        setDDayText(`D-${diffDays}`);
      } else if (diffDays === 0) {
        setDDayText('D-Day');
        setShowDDayModal(true);
      } else {
        setDDayText(`D+${Math.abs(diffDays)}`);
      }
    };
    calculateDDay();
  }, []);

  useEffect(() => {
    const checkTimeForConcierge = () => {
      const currentHour = new Date().getHours();
      if ((currentHour >= 22 || currentHour < 6 || isNightMode) && !conciergeDismissed) {
        const timer = setTimeout(() => setShowNightConcierge(true), 1000);
        return () => clearTimeout(timer);
      }
    };
    checkTimeForConcierge();
  }, [isNightMode, conciergeDismissed]);

  useEffect(() => {
    setExpandedItem(null);
  }, [activeTab]);

  const handleAddOrEditExpense = (e) => {
    e.preventDefault();
    if (!newTitle || !newAmount) return;
    
    if (isEditing) {
      setExpenses(expenses.map(exp => 
        exp.id === editId 
          ? { ...exp, title: newTitle, amount: parseInt(newAmount), category: newCategory }
          : exp
      ));
    } else {
      const newExpense = {
        id: Date.now(),
        title: newTitle,
        amount: parseInt(newAmount),
        category: newCategory,
        date: new Date().toLocaleDateString('ko-KR', {month: '2-digit', day: '2-digit'}).replace('. ', '.')
      };
      setExpenses([newExpense, ...expenses]);
    }
    
    setNewTitle('');
    setNewAmount('');
    setNewCategory('Food');
    setIsAdding(false);
    setIsEditing(false);
    setEditId(null);
  };

  const handleEditClick = () => {
    if (!selectedExpense) return;
    setNewTitle(selectedExpense.title);
    setNewAmount(selectedExpense.amount.toString());
    setNewCategory(selectedExpense.category);
    setIsEditing(true);
    setEditId(selectedExpense.id);
    setIsAdding(true);
    setSelectedExpense(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
    setSelectedExpense(null);
  };

  const handlePressStart = (exp) => {
    pressTimer.current = setTimeout(() => {
      if (navigator.vibrate) navigator.vibrate(50);
      setSelectedExpense(exp);
    }, 400); 
  };

  const handlePressEnd = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
  };

  const handleCopySummary = () => {
    const summary = `✈️ YK.C 타이베이 센서리 여정\n\n[비행 일정]\n출발: 03.20 (금) 09:00 인천 -> 11:00 타오위안\n귀국: 03.22 (일) 19:25 타오위안 -> 22:55 인천\n\n[핵심 일정]\nDay 1: 로컬 미식 & 위스키 심야 헌팅\nDay 2: 감성 스팟 & 예스지 낭만 투어\nDay 3: 화산 1914 & 신예 파인다이닝(불도장)\n\n[현재 예산 잔액]\n${remainingBudget.toLocaleString()} TWD (약 ${(remainingBudget * EXCHANGE_RATE).toLocaleString('ko-KR', {maximumFractionDigits:0})}원)\n\n디렉터 최영관님이 준비한 완벽한 코스입니다. 🥂`;

    const textArea = document.createElement("textarea");
    textArea.value = summary;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setToastMessage('여정 요약본이 클립보드에 복사되었습니다! 카카오톡에 붙여넣기 해보세요.');
      setTimeout(() => setToastMessage(''), 4000);
    } catch (err) {
      console.error('복사 실패', err);
    }
    document.body.removeChild(textArea);
  };

  const bannerContent = {
    day1: {
      title: 'Starter & Whisky',
      desc: '입국 가이드 및 까르푸 쇼핑 팁',
      icon: <Beer className="w-5 h-5" />,
      textColor: isNightMode ? 'text-indigo-400' : 'text-blue-600',
      bgColor: isNightMode ? 'bg-indigo-500/20' : 'bg-blue-500/10',
      iconBgColor: isNightMode ? 'bg-indigo-400' : 'bg-blue-500 text-white',
      modalTitle: '입국 & 까르푸 쇼핑 팁',
      modalIcon: <Beer className={`w-5 h-5 ${isNightMode ? 'text-indigo-900' : 'text-blue-600'}`} />,
      modalItems: [
        { title: '01 e-Gate & 공항철도', desc: '사전 신청한 e-Gate로 빠르게 입국하세요. 시내로 이동하실 때는 꼭 보라색 급행열차(Express)를 타셔야 합니다.' },
        { title: '02 위스키 & 금문고량주', desc: '일정상 주류 쇼핑 시간이 부족하니, 첫날 자정 까르푸 방문 시 가발란과 금문고량주 58도를 한 번에 구매하는 것을 추천합니다.' },
        { title: '03 택스리펀 주의사항 (필독)', desc: '쇼핑 금액이 2000TWD 이상이면 택스리펀을 받을 수 있습니다. 이때 여권이 꼭 필요하니 지참하세요. 결제 후 6층 면세 카운터에서 환급 서류를 받고, 출국 시 공항에서 환급금을 수령합니다. 단, 대만에서 소비할 품목(과일, 맥주, 과자, 라면 등)은 면세 품목과 반드시 따로 계산해야 합니다.' }
      ],
      link: 'https://blog.naver.com/imboldn_kr/223818589910'
    },
    day2: {
      title: 'Yeshi Ji Tour',
      desc: '인생샷 & 야시장 완벽 공략법',
      icon: <Camera className="w-5 h-5" />,
      textColor: isNightMode ? 'text-emerald-400' : 'text-sky-600',
      bgColor: isNightMode ? 'bg-emerald-500/20' : 'bg-sky-500/10',
      iconBgColor: isNightMode ? 'bg-emerald-400' : 'bg-sky-500 text-white',
      modalTitle: '투어 & 야시장 가이드',
      modalIcon: <Camera className={`w-5 h-5 ${isNightMode ? 'text-emerald-900' : 'text-sky-600'}`} />,
      modalItems: [
        { title: '01 스펀 천등 날리기', desc: '천등을 날릴 때는 사진보다 동영상 모드로 그 순간을 남기세요. 4면에 각기 다른 소원을 미리 생각해두는 센스가 필요합니다.' },
        { title: '02 지우펀 사진 명당', desc: '복잡한 거리를 지나 아메이차루 맞은편에 위치한 해열루(Sea Yue) 찻집 계단에 서시면 가장 완벽한 배경의 커플샷을 건질 수 있습니다.' },
        { title: '03 야시장 효율적 동선', desc: '라오허제 야시장에 도착하면 입구의 화덕 만두(후자오빙)를 가장 먼저 구매한 후, 현지인들의 흐름에 따라 일방통행으로 도는 것이 효율적입니다.' }
      ],
      link: null
    },
    day3: {
      title: 'Culture & Goodbye',
      desc: '마지막 날 핫플 & 출국 가이드',
      icon: <CameraIcon className="w-5 h-5" />,
      textColor: isNightMode ? 'text-cyan-400' : 'text-blue-600',
      bgColor: isNightMode ? 'bg-cyan-500/20' : 'bg-blue-500/10',
      iconBgColor: isNightMode ? 'bg-cyan-400' : 'bg-blue-600 text-white',
      modalTitle: '마지막 날 완벽 가이드',
      modalIcon: <CameraIcon className={`w-5 h-5 ${isNightMode ? 'text-amber-900' : 'text-blue-600'}`} />,
      modalItems: [
        { title: '01 화산 1914 & 융캉제', desc: '오전에 화산 1914의 Science Factory에서 이색 기념품을 사고, 융캉제에서 총좌빙을 가볍게 맛보며 알차게 보내세요.' },
        { title: '02 신예 만찬 & 공항 이동', desc: '대만 최고급 불도장을 맛본 후, 늦어도 16시에는 호텔에서 짐을 찾아 보라색 공항철도(급행)를 타러 가야 합니다.' },
        { title: '03 공항 면세점 털기', desc: '수속 후 남은 이지카드 잔액은 공항 면세점이나 자판기에서 써니힐 펑리수, 젤리 등을 사며 깔끔하게 소진하세요.' }
      ],
      link: 'https://blog.naver.com/jslnlsl/224067306720'
    }
  };

  const currentBanner = bannerContent[activeTab];

  const getSchedule = (day) => {
    const base = {
      day1: {
        date: '2026.03.20 (금)',
        concept: isRaining ? 'Indoor: Cultural Shelter' : 'Solo: History & Night Vibe',
        mapQuery: isRaining ? 'Taipei+Fine+Arts+Museum' : 'Chiang+Kai-shek+Memorial+Hall',
        items: isRaining ? [
          { 
            time: '11:00', title: '타오위안 공항 도착 (KE201)', desc: '인천 09:00 출발, 대만 타오위안 11:00 도착', icon: <Plane />, transport: '공항철도(급행)', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Taoyuan+International+Airport+Terminal+2', 
            reviewQuery: '타오위안 공항 입국',
            story: '설레는 대만의 관문. 빗소리가 맞이해주는 운치 있는 시작입니다.', 
            tips: '공항에서 시내로 들어갈 땐 보라색 급행열차(Express)를 탑승하세요. 파란색 일반열차보다 훨씬 빠릅니다.' 
          },
          { 
            time: '12:30', title: '시먼딩 숙소 체크인', desc: '호텔 로비 짐 보관 및 입실', icon: <Bed />, transport: '도보', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Ximen+Station+Taipei', 
            reviewQuery: '시먼딩 호텔 추천',
            story: '우리의 든든한 베이스캠프가 될 시먼딩 지역입니다.', 
            tips: '비가 오는 날엔 프론트 데스크에 우산 대여가 가능한지 먼저 문의해 보세요.' 
          },
          { 
            time: '13:00', title: '롱하오스 (籠好食)', desc: '육즙 가득 샤오롱바오와 따뜻한 우동', icon: <Utensils />, transport: '도보 10분', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=籠好食+No.+315號+Xining+Rd', 
            reviewQuery: '시먼딩 롱하오스',
            story: '대만 도착 후 맛보는 첫 현지식. 김이 모락모락 나는 샤오롱바오가 비 오는 날의 운치를 더해줍니다.', 
            tips: '시그니처 메뉴인 샤오롱바오(小籠湯包)와 우동(烏龍麵) 조합을 추천합니다. 육즙이 뜨거우니 숟가락에 얹어 만두피를 살짝 찢은 뒤 드세요.' 
          },
          { 
            time: '14:30', title: '타이베이 시립 미술관', desc: '모던 아트와 함께하는 실내 데이트', icon: <Landmark />, transport: 'MRT 단수이신이선', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Taipei+Fine+Arts+Museum', 
            reviewQuery: '타이베이 시립 미술관 전시',
            story: '아시아 최고 수준의 현대 미술을 전시하는 공간입니다. 비 오는 날 특유의 차분함이 돋보입니다.', 
            tips: '미술관 1층의 거대한 통유리창 앞은 비가 올 때 더욱 몽환적인 사진이 나오는 숨겨진 포토존입니다. 관람 후에는 지하 1층에 위치한 로스터리 카페에서 타이완 스페셜티 우롱차를 드시며 비 멍을 때리는 시간을 가져보세요.' 
          },
          { 
            time: '17:30', title: '성품생활 남서점 (중산)', desc: '복합 문화 쇼핑몰 및 서점', icon: <ShoppingBag />, transport: 'MRT 쑹산신뎬선', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Eslite+Spectrum+Nanxi', 
            reviewQuery: '성품생활 남서점 소품',
            story: '대만 젊은이들이 가장 사랑하는 트렌디한 서점이자 셀렉트 샵입니다.', 
            tips: '단순한 서점이 아니라 라이프스타일 층을 구경하는 재미가 큽니다. 특히 4층 문구류 코너에는 대만 로컬 디자이너들이 만든 독특한 마스킹 테이프와 엽서가 많아 지인들을 위한 작고 센스 있는 선물을 고르기에 최적의 장소입니다.' 
          },
          { 
            time: '00:00', title: '까르푸 꾸이린점 심야 쇼핑', desc: '자정, 위스키 & 금문고량주 헌팅', icon: <ShoppingBag />, transport: '도보 (시먼역 방면)', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Carrefour+Guilin+Store+Taipei', 
            reviewLink: 'https://blog.naver.com/bonniegets/224068500513',
            story: '일정상 위스키를 살 시간이 부족해 첫날 밤에 가발란과 금문고량주 58도를 미리 구매합니다. 인파가 적어 여유롭게 쇼핑할 수 있습니다.', 
            tips: '대만 까르푸 쇼핑리스트가 2000TWD 이상이라면 택스리펀드를 받을 수 있습니다. 이때 꼭 필요한 건 여권입니다! 그리고 6층 면세 카운터에서 환급 서류를 받고 출국 시 공항에서 환급금을 수령하는 순서입니다. 주의할 점은 면세를 받을 품목과 대만에서 소비할 품목(과일, 맥주, 야식 등)의 영수증을 구분해야 하니 따로 계산하세요.' 
          }
        ] : [
          { 
            time: '11:00', title: '타오위안 공항 도착 (KE201)', desc: '인천 09:00 출발, 대만 타오위안 11:00 도착', icon: <Plane />, transport: '공항철도 급행', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Taoyuan+International+Airport+Terminal+2',
            reviewQuery: '타오위안 공항 럭키랜드',
            story: '드디어 시작되는 여정. 입국장을 나서면 특유의 덥고 습한 공기가 이국적인 설렘을 안겨줍니다.', 
            tips: '온라인으로 사전 입국신고서를 작성해 두셨다면 e-Gate(자동출입국심사) 라인으로 가서 지문만 찍고 바로 통과하세요. 시간을 최소 30분 이상 아낄 수 있습니다. 시내 진입을 위한 공항철도는 바닥에 그려진 보라색 선을 따라가시면 쉽게 급행열차 탑승구에 도달하실 수 있습니다.'
          },
          { 
            time: '12:30', title: '시먼딩 숙소 체크인', desc: '시먼역 근처 베이스캠프 체크인 및 짐 보관', icon: <Bed />, transport: '도보', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Ximen+Station+Taipei',
            reviewQuery: '시먼딩 가성비 호텔',
            story: '여행의 중심지, 시먼딩. 활기찬 이 거리에 우리의 아늑한 숙소가 있습니다.', 
            tips: '얼리 체크인이 안 되더라도 로비에 캐리어를 먼저 안전하게 보관하고 가벼운 몸으로 점심 식사를 하러 나갑니다. 호텔 명함을 한 장 챙겨두시면 길을 찾거나 택시를 탈 때 유용합니다.'
          },
          { 
            time: '13:00', title: '롱하오스 (籠好食)', desc: '현지 감성 가득한 샤오롱바오 맛집', icon: <Utensils />, transport: '도보 10분', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=籠好食+No.+315號+Xining+Rd',
            reviewQuery: '시먼딩 롱하오스',
            story: '시먼딩 인근 골목에 숨겨진 현지인 맛집입니다. 갓 쪄낸 샤오롱바오의 진한 육즙으로 여행의 첫 시작을 엽니다.', 
            tips: '샤오롱바오(小籠湯包)와 우동(烏龍麵)을 하나씩 시켜 나눠 드시는 것을 추천합니다. 매장에 비치된 간장에 흑초와 생강채를 듬뿍 넣어 곁들여 드시면 풍미가 극대화됩니다.'
          },
          { 
            time: '14:00', title: '총통부', desc: '르네상스 양식의 대만 총통부 건물 감상', icon: <Landmark />, transport: '도보 15분', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Presidential+Office+Building+Taipei',
            reviewQuery: '대만 총통부',
            story: '식사 후 소화도 시킬 겸 대만 정치의 중심인 총통부로 걸어갑니다. 붉은 벽돌과 흰 대리석이 어우러진 르네상스 양식의 건축물이 인상적입니다.', 
            tips: '건물 외관을 배경으로 멋진 인증샷을 남겨보세요. 건물 주변은 경비가 삼엄하므로 정해진 포토존에서 촬영하는 것이 좋습니다. 관람 후 바로 택시를 잡아 고궁박물관으로 이동합니다.'
          },
          { 
            time: '15:00', title: '국립고궁박물관', desc: '세계 4대 박물관, 진귀한 보물 탐방', icon: <Camera />, transport: '택시 이동 (약 25분)', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=National+Palace+Museum+Taipei',
            reviewQuery: '대만 고궁박물관 취옥백채',
            story: '프랑스 루브르와 어깨를 나란히 하는 곳. 오후 5시 마감 전 택시를 타고 빠르게 도착해 핵심 유물을 집중적으로 관람합니다.', 
            tips: '가장 유명한 하이라이트 유물인 취옥백채(배추)와 육형석(동파육)은 3층에 전시되어 있으므로, 3층으로 먼저 올라가 관람한 뒤 내려오는 동선을 강력히 추천합니다. 1층 기념품 샵의 어명 마스킹 테이프는 베스트셀러입니다.'
          },
          { 
            time: '17:30', title: '쓰린 야시장 탐방', desc: '고궁박물관 인근 대만 최대 규모 야시장', icon: <MapPin />, transport: 'MRT 단수이선 (젠탄역) 또는 버스', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Shilin+Night+Market',
            reviewQuery: '쓰린 야시장 먹거리',
            story: '박물관 관람 후 바로 이동하기 좋은 동선입니다. 상인과 여행객이 뒤엉켜 만들어내는 활기가 엄청납니다.', 
            tips: '야시장 초입에 있는 썰어 놓은 과일 가게들은 바가지가 심하므로 피하시는 것이 좋습니다. 본격적인 식사 전 지파이(거대 닭튀김)나 망고 빙수 같은 길거리 간식으로 가볍게 식욕을 돋워보세요.'
          },
          { 
            time: '18:30', title: '츠유 철판구이 (喫尤平價鐵板燒)', desc: '쓰린 야시장 내 가성비 로컬 철판 요리', icon: <Utensils />, transport: '도보', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=喫尤平價鐵板燒+士林店+No.+50+Danan+Rd',
            reviewQuery: '쓰린 야시장 철판구이',
            story: '현지인들로 항상 북적이는 대만식 가성비 철판구이 식당입니다. 눈앞에서 펼쳐지는 화려한 웍질과 고소한 냄새가 매력적입니다.', 
            tips: '소고기 볶음과 철판 두부가 특히 인기 있습니다. 밥과 국, 음료가 무한으로 제공되니, 든든하게 배를 채우며 대만 특유의 시끌벅적한 로컬 식문화를 즐겨보세요.'
          },
          { 
            time: '21:30', title: '호텔 복귀 및 휴식', desc: '호텔 복귀 및 야간 휴식', icon: <Bed />, transport: 'MRT 단수이선', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Ximen+Station+Taipei',
            reviewQuery: '대만 18일 맥주 파는곳',
            story: '가장 알차게 보낸 첫날 일정을 마무리하며 호텔에서 피로를 풉니다.', 
            tips: '숙소 주변 편의점에서 파는 18일 맥주(18天台灣生啤酒)는 유통기한이 짧은 신선한 한정판 맥주입니다. 보이면 무조건 집어와 샤워 후 시원하게 즐기며 다리에 휴족시간을 붙여주세요.'
          },
          { 
            time: '22:30', title: '시먼홍루 노천바 산책', desc: '이국적인 테라스 거리에서의 로맨틱한 밤', icon: <Beer />, transport: '도보', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Ximen+Red+House+South+Square',
            reviewQuery: '시먼홍루 노천바',
            story: '시먼홍루 남광장 뒷골목은 밤이 되면 붉은 조명과 야외 펍들이 어우러져 이태원이나 방콕 같은 이국적인 분위기를 자아냅니다.', 
            tips: '술을 많이 드시지 않더라도 선선한 밤공기를 맞으며 걷기 좋은 핫플레이스입니다. 가벼운 과일 칵테일이나 타이완 생맥주를 한잔하며 여행 첫날의 설렘을 나눠보세요.'
          },
          { 
            time: '00:00', title: '까르푸 꾸이린점 심야 쇼핑', desc: '자정, 위스키 & 금문고량주 헌팅', icon: <ShoppingBag />, transport: '도보', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Carrefour+Guilin+Store+Taipei',
            reviewLink: 'https://blog.naver.com/bonniegets/224068500513',
            story: '일정상 위스키를 살 시간이 부족해 첫날 밤에 가발란과 금문고량주 58도를 미리 구매합니다. 인파가 적어 여유롭게 쇼핑할 수 있습니다.', 
            tips: '쇼핑 금액이 2000TWD 이상이면 택스리펀이 가능합니다. 여권을 챙겨가 6층 카운터에서 환급 서류를 받으세요(환급은 공항에서). 가장 중요한 건 면세받을 물건과 대만에서 먹을 물건(야식, 맥주 등)을 꼭 따로 결제해야 한다는 점입니다.'
          }
        ]
      },
      day2: {
        date: '2026.03.21 (토)',
        concept: isRaining ? 'Indoor: Craft & Creative' : 'Couple: Local Vibe & Tour',
        mapQuery: isRaining ? 'Huashan+1914+Creative+Park' : 'Raohe+Street+Night+Market',
        items: isRaining ? [
          { 
            time: '11:00', title: '화산 1914 창의공원', desc: '과거 양조장을 개조한 실내 감성 스팟', icon: <Camera />, transport: 'MRT 반난선', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Huashan+1914+Creative+Park', 
            reviewQuery: '화산 1914 창의공원 오르골',
            story: '1914년에 세워진 옛 청주 양조장이 멋진 전시 공간과 편집샵으로 재탄생했습니다. 빗물 젖은 벽돌이 오히려 감성적입니다.', 
            tips: 'Wooderful life 오르골 매장에 들어가시면 직접 파츠를 골라 커스텀 오르골을 만들 수 있습니다. 빗소리와 나무 오르골 소리가 어우러져 굉장히 로맨틱한 시간을 보낼 수 있습니다.' 
          },
          { 
            time: '14:00', title: '송산 문창원구', desc: '비 소리를 들으며 즐기는 디자인 갤러리', icon: <Sparkles />, transport: 'MRT 반난선', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Songshan+Cultural+and+Creative+Park', 
            reviewQuery: '송산 문창원구 성품서점',
            story: '옛 담배 공장 부지가 힙스터들의 성지가 되었습니다. 아기자기한 공방과 카페가 가득합니다.', 
            tips: '단지 내 위치한 성품서점(Eslite) 3층에 위치한 프라이빗 카페 창가 자리를 선점하세요. 창밖으로 떨어지는 빗방울을 보며 우롱차와 정갈한 다과 세트를 즐기는 것이 이곳 최고의 사치입니다.' 
          },
          { 
            time: '18:00', title: '브리즈 센터 (Breeze Center)', desc: '쾌적한 실내에서의 럭셔리 쇼핑', icon: <ShoppingBag />, transport: 'MRT 반난선', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Breeze+Center+Taipei', 
            reviewQuery: '타이베이 브리즈 센터 맛집',
            story: '비 오는 날의 완벽한 피난처. 타이베이의 고급 쇼핑몰에서 쾌적하게 쇼핑과 미식을 해결합니다.', 
            tips: '식당가에 위치한 딘타이펑이나 키키레스토랑 등은 비 오는 날 웨이팅이 길어지므로 몰에 도착하자마자 지하로 내려가 번호표부터 뽑아두고 쇼핑을 시작하시는 것이 시간을 아끼는 비결입니다.' 
          },
        ] : [
          {
            time: '09:00', title: '호텔 출발 & 인증샷', desc: '시먼 무지개 횡단보도 사진 촬영', icon: <Bed />, transport: '도보',
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Ximen+Rainbow+Crosswalk',
            reviewQuery: '시먼딩 무지개 횡단보도 포토존',
            story: '시먼딩의 아침은 상쾌합니다. 관광객이 몰리기 전 사람 없는 무지개 횡단보도 위에서 예쁜 커플 사진을 남깁니다.',
            tips: '아이폰 광각 모드(0.5x)를 활용하여 카메라를 아래로 살짝 기울이세요. 바닥의 거대한 TAIWAN 글씨와 무지개색 타일, 그리고 뒤쪽의 붉은 건물(홍루)이 한 화면에 담기게 찍는 것이 인스타그램 공식 앵글입니다.'
          },
          {
            time: '10:00', title: '시먼딩 & 시먼홍루 투어', desc: '100년 역사의 붉은 벽돌과 젊음의 거리', icon: <MapPin />, transport: '도보',
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Ximen+Red+House',
            reviewQuery: '시먼홍루 크리에이티브 마켓',
            story: '과거와 현재가 공존하는 시먼딩 골목길 산책. 붉은 벽돌의 시먼홍루는 그 자체로 훌륭한 사진 배경이 됩니다.',
            tips: '시먼홍루 내부에 위치한 16공방 크리에이티브 마켓은 대만 청년 디자이너들의 독특한 수공예품을 판매합니다. 다른 곳에서는 구할 수 없는 유니크한 에코백이나 엽서를 찾아보는 재미가 쏠쏠합니다.'
          },
          {
            time: '11:00', title: '천천리 (天天利美食坊)', desc: '현지인처럼 즐기는 돼지고기 덮밥', icon: <Utensils />, transport: '도보',
            mapLink: 'https://www.google.com/maps/search/?api=1&query=天天利美食坊+No.+1號+Lane+32+Hanzhong+St+Wanhua+District',
            reviewQuery: '시먼딩 천천리 돼지고기 덮밥',
            story: '시먼딩의 소울 푸드. 달짝지근한 돼지고기 덮밥(루로우판)과 고소한 굴전으로 본격적인 점심 식사를 시작합니다.',
            tips: '주문 시 루로우판(滷肉飯)에 반숙 계란 후라이(加蛋, 지아단)를 꼭 추가하세요. 계란 노른자를 톡 터뜨려 밥과 비벼 먹는 것이 핵심입니다.'
          },
          {
            time: '11:45', title: '아종면선 (阿宗麵線)', desc: '시먼딩 명물 진한 곱창 국수', icon: <Utensils />, transport: '도보',
            mapLink: 'https://www.google.com/maps/search/?api=1&query=阿宗麵線+No.+8-1號+Emei+St+Wanhua+District',
            reviewQuery: '시먼딩 아종면선 곱창국수',
            story: '천천리에서 식사 후 도보로 이동하여, 가쓰오부시 육수의 감칠맛이 일품인 곱창 국수를 간식처럼 즐겨봅니다.',
            tips: '앉아서 먹을 공간이 없으니 서서 드셔야 합니다. 큰 사이즈 1개를 시켜 여자친구분과 나눠 드시고, 고수를 못 드신다면 꼭 주문 시 "부야오 시앙차이"를 외쳐주세요.'
          },
          {
            time: '12:30', title: '펑다 커피 (休)', desc: '1956년부터 이어져 온 레트로 감성 찻집', icon: <Beer />, transport: '도보',
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Fong+Da+Coffee+Taipei',
            reviewQuery: '시먼딩 펑다 커피 호두과자',
            story: '투어 출발 전, 대만 특유의 레트로한 분위기가 흐르는 로컬 카페에서 진한 커피 향과 함께 휴식을 취합니다.',
            tips: '이곳의 명물인 유리병에 담긴 호두 과자(합도소)와 아몬드 쿠키를 바구니에서 골라 카운터로 가져가세요. 산미가 없는 묵직한 아이스 드립 커피와 곁들여 먹으면 완벽한 당 충전이 됩니다.'
          },
          { 
            time: '13:20', title: '예스지 버스 투어 출발', desc: '시먼역 5번 출구 미팅 및 출발', icon: <Bus />, transport: '투어 버스', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Ximen+Station+Exit+5',
            reviewQuery: '대만 예스지 버스투어 후기',
            story: '복잡한 도심을 벗어나 대만 외곽의 경이로운 자연과 마주하러 떠납니다. 쾌적한 버스에서 바깥 풍경을 즐기세요.', 
            tips: '대만의 투어 버스는 에어컨이 매우 강력하게 가동되므로 얇은 가디건이나 바람막이를 반드시 챙겨 탑승하세요. 예류로 이동할 때 바다 풍경을 감상하시려면 버스의 우측 창가 자리에 앉는 것이 좋습니다.' 
          },
          { 
            time: '14:30', title: '예류 지질공원', desc: '외계 행성에 온 듯한 기암괴석 탐방', icon: <MapIcon />, transport: '투어 버스', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Yehliu+Geopark',
            reviewQuery: '대만 예류 여왕머리 바위',
            story: '수만 년의 풍화 작용과 해식 작용이 빚어낸 신비로운 바위들이 푸른 바다와 어우러져 압도적인 장관을 이룹니다.', 
            tips: '가장 유명한 여왕머리 바위 앞은 대기 줄이 매우 깁니다. 시간이 촉박하다면 제2 여왕머리 바위(복제품)에서 빠르게 사진을 찍거나, 숨겨진 하트 바위를 찾아 커플 인증샷을 남겨보세요.' 
          },
          { 
            time: '16:30', title: '스펀 천등 마을', desc: '기찻길 위에서 띄워 보내는 우리의 소원', icon: <Sparkles />, transport: '투어 버스', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Shifen+Old+Street',
            reviewQuery: '스펀 천등 닭날개 볶음밥',
            story: '실제 기차가 지나가는 아슬아슬한 철로 위에서 커플의 소망을 담은 천등을 하늘 높이 날려 보내는 낭만적인 시간입니다.', 
            tips: '천등 4면에 각기 다른 소원을 적을 수 있으니 버스에서 미리 생각해 두세요. 천등을 날린 후에는 꼭 고수를 뺀 닭날개 볶음밥과 달콤한 땅콩 아이스크림을 맛보셔야 합니다.' 
          },
          { 
            time: '18:30', title: '지우펀 홍등가', desc: '센과 치히로의 행방불명 모티브가 된 야경', icon: <Camera />, transport: '투어 버스', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Jiufen+Old+Street',
            reviewQuery: '지우펀 해열루 찻집 야경',
            story: '해가 지면 좁은 골목마다 붉은 홍등이 켜지며 애니메이션 속 한 장면 같은 몽환적이고 로맨틱한 분위기가 연출됩니다.', 
            tips: '유명한 아메이차루(수치루) 앞 계단은 사람이 매우 많습니다. 맞은편에 위치한 해열루(Sea Yue) 찻집이나 조금 위쪽의 뷰포인트로 이동하면 훨씬 여유롭고 완벽한 배경의 커플샷을 건질 수 있습니다.' 
          },
          { 
            time: '20:30', title: '야시장 하차 및 탐방', desc: '라오허제 야시장의 화려한 네온사인', icon: <MapPin />, transport: '도보', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Raohe+Street+Night+Market',
            reviewQuery: '라오허제 야시장 먹거리 추천',
            story: '투어가 종료되고 활기찬 야시장에 내립니다. 입구의 화려한 사원을 시작으로 끝없이 늘어선 먹거리 탐험이 시작됩니다.', 
            tips: '도착 직후 압도적인 스케일의 자오궁 사원 정문을 배경으로 조명이 번지는 야간 인증샷을 남긴 뒤, 현지인들의 발길을 따라 일방통행으로 우측으로 걸어가며 탐방을 시작하세요.' 
          },
          { 
            time: '20:40', title: '야시장 먹거리 헌팅', desc: '화덕 만두와 버섯 구이 등 로컬 스트릿 푸드', icon: <Utensils />, transport: '도보', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Raohe+Street+Night+Market',
            reviewQuery: '라오허제 후자오빙',
            story: '현지인들이 줄 서는 노점상들이 진짜 맛집입니다. 후추 향이 강렬한 고기 육즙과 달콤한 과일 주스가 미각을 깨웁니다.', 
            tips: '입구 초입에 항상 길게 줄 서 있는 후자오빙(胡椒餅, 화덕 고기만두)은 회전율이 빨라 금방 살 수 있으니 포기하지 말고 꼭 구매하세요. 갓 구워져 나와 매우 뜨거우니 육즙에 화상을 입지 않도록 입천장을 조심하며 베어 무셔야 합니다.' 
          },
          { 
            time: '21:30', title: '가성비 현지 철판구이', desc: '화려한 불쇼와 함께 즐기는 야시장 철판 요리', icon: <Beer />, transport: '도보', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Teppanyaki+Raohe+Night+Market',
            reviewQuery: '라오허제 야시장 철판구이',
            story: '뜨거운 철판 위에서 셰프가 즉석으로 볶아내는 요리. 투어의 피로를 단숨에 잊게 해주는 뜨끈하고 든든한 식사입니다.', 
            tips: '철판구이 노점에 앉아 세트 메뉴를 주문하면 아삭하게 볶은 양배추와 숙주나물이 기본으로 제공됩니다. 소고기 볶음을 메인으로 선택하고, 타이완 골드메달 맥주를 한 병 시켜 얼음잔과 함께 곁들이면 완벽한 로컬 감성의 저녁이 완성됩니다.' 
          },
          { 
            time: '22:40', title: '심야 푸홍우육면', desc: '시먼딩 복귀 후 즐기는 24시간 로컬 식당', icon: <Utensils />, transport: 'MRT 쑹산신뎬선 (시먼 복귀)', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Fuhong+Beef+Noodles+Taipei',
            reviewQuery: '시먼딩 푸홍우육면 솬차이',
            story: '호텔로 돌아오기 전, 24시간 불이 꺼지지 않는 시먼딩의 우육면 노포에서 현지인들과 섞여 뜨끈한 야식을 즐깁니다.', 
            tips: '주문 시 중국어로 "콴미엔(넓고 두꺼운 면)"을 외쳐보세요. 쫄깃한 식감이 일품입니다. 자리에 비치된 주황색 소기름(우지)과 솬차이(갓절임)를 국물에 한 스푼 듬뿍 넣어주면 국물의 감칠맛이 폭발적으로 상승합니다.' 
          },
          { 
            time: '23:30', title: '호텔 복귀 및 휴식', desc: '가장 꽉 채운 둘째 날의 완벽한 마무리', icon: <Bed />, transport: '도보', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Ximen+Station+Taipei',
            reviewQuery: '대만 휴족시간 추천',
            story: '아침부터 심야까지, 대만의 모든 매력을 오감으로 완벽하게 흡수한 알찬 둘째 날이 저물어갑니다.', 
            tips: '하루 종일 투어와 야시장 탐방으로 다리에 피로가 많이 쌓였을 시간입니다. 편의점에서 구매한 타이완 파스나 휴족시간을 종아리와 발바닥에 꼼꼼히 붙이고, 따뜻한 물로 반신욕을 하며 내일의 파인다이닝을 위한 컨디션을 끌어올려 주세요.' 
          }
        ]
      },
      day3: {
        date: '2026.03.22 (일)',
        concept: 'Couple: Culture, Boutique & Fine Dining',
        mapQuery: 'Shin+Yeh+Original+Restaurant+Taipei',
        specialDinner: {
          name: '신예 대만요리 본점 (Shin Yeh Original)',
          desc: '미슐랭 가이드에 선정된 대만 최고급 연회 요리의 정수. 잊지 못할 불도장 한 그릇.',
          price: '약 3,000 - 5,000 TWD (2인 기준)',
          link: 'https://www.google.com/maps/search/?api=1&query=Shin+Yeh+Original+Restaurant+Taipei',
          menus: [
            { name: '불도장 (Buddha Jumps Over the Wall)', desc: '스님이 담장을 넘을 만큼 매혹적인 향을 가진, 진귀한 해산물과 산해진미를 고아낸 최고의 보양식' },
            { name: '돼지 간 튀김 (Fried Pork Liver)', desc: '신예의 시그니처 에피타이저. 겉은 바삭하고 속은 푸아그라처럼 부드럽습니다.' },
            { name: '수제 아몬드 모찌 (Almond Tofu)', desc: '식사의 대미를 장식하는, 쫀득하고 달콤한 식감의 고급스러운 디저트' }
          ]
        },
        items: [
          { 
            time: '09:00', title: '호텔 체크아웃 및 짐 보관', desc: '가벼운 발걸음으로 시작하는 마지막 날', icon: <Bed />, transport: '도보', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Ximen+Station+Taipei',
            reviewQuery: '시먼딩 호텔 체크아웃',
            story: '아쉬움을 뒤로하고 호텔 체크아웃을 진행합니다. 무거운 짐은 로비에 맡겨두고 산뜻하게 나섭니다.', 
            tips: '첫날 까르푸에서 산 위스키와 금문고량주, 깨지기 쉬운 찻잎 등 면세 한도에 맞춰 구매한 기념품들이 캐리어 안쪽에 옷으로 잘 패킹되어 완충 작용을 하고 있는지 마지막으로 한 번 더 점검해 주세요.' 
          },
          { 
            time: '09:30', title: '중정기념당', desc: '대만의 근현대사를 마주하는 시간', icon: <Landmark />, transport: 'MRT 쑹산신뎬선', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Chiang+Kai-shek+Memorial+Hall',
            reviewLink: 'https://blog.naver.com/w00nobi/224092422044', 
            story: '아침의 상쾌한 공기와 함께 압도적인 스케일의 광장을 걸어봅니다. 대만 역사의 중심이자 가장 아름다운 산책로입니다.', 
            tips: '오전 9시부터 오후 5시까지 매시 정각에 근위병 교대식이 진행됩니다. 10시 교대식을 보기 위해 10분 전에 미리 본당 4층 중앙에 자리를 잡는 것을 추천합니다.'
          },
          { 
            time: '10:30', title: '천진총좌빙 (天津蔥抓餅)', desc: '융캉제 명물, 대만식 파전으로 아침 식사', icon: <Utensils />, transport: 'MRT 둥먼역', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=天津蔥抓餅+No.+1+Lane+6+Yongkang+St+Da\'an+District',
            reviewQuery: '융캉제 천진총좌빙',
            story: '중정기념당 관람 후 융캉제로 이동하여 현지인들이 줄 서서 먹는 대만식 파전으로 든든한 아침을 맞이합니다. 겹겹이 찢어지는 쫄깃한 반죽과 고소한 파향이 일품입니다.', 
            tips: '메뉴판의 번호를 보고 주문하시면 편합니다. 햄계란(훠투이 찌아단) 메뉴에 매콤한 소스를 살짝 발라 드시는 것을 추천하며, 대기 줄이 길어도 회전율이 엄청나게 빠르니 안심하고 기다려보세요.' 
          },
          { 
            time: '11:30', title: '화산 1914 & Science Factory', desc: '복합 문화 공간 및 이색 기념품 샵 탐방', icon: <Camera />, transport: 'MRT 반난선/도보', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Science+Factory+Zhongzheng+District+Taipei+100',
            reviewLink: 'https://blog.naver.com/every_fresh/223908441900',
            story: '1914년에 지어진 옛 청주 양조장이 타이베이 최고의 감성 문화 스팟으로 변신했습니다. 특히 독특한 아이디어 굿즈를 파는 Science Factory 방문이 이번 동선의 핵심입니다.', 
            tips: 'Science Factory(위치: 중정 구 타이베이 100)는 우주, 과학, 자연을 모티브로 한 이색적인 소품이 가득한 기념품 샵입니다. 지인들에게 선물할 유니크하고 센스 있는 아이템을 이곳에서 찾아보세요.' 
          },
          { 
            time: '13:30', title: '점심 만찬 (신예 본점)', desc: '불도장과 함께하는 완벽한 파인 다이닝', icon: <Star />, transport: 'MRT 중산국교역 도보 5분', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Shin+Yeh+Original+Restaurant+Taipei',
            reviewQuery: '신예 대만요리 본점 불도장',
            story: '대문을 대표하는 전통 고급 요리점. 이 여행의 클라이맥스인 최고급 불도장을 맛보며 로맨틱한 점심을 즐깁니다.', 
            tips: '고급 레스토랑인 만큼 스마트 캐주얼 이상의 깔끔한 복장이 좋습니다. 구글 맵이나 공홈을 통해 사전에 창가 자리를 요청해 두시고, 불도장은 한 그릇에 모든 정수가 담겨 있으니 여자친구분께 국물을 먼저 덜어드리며 진한 향을 함께 음미해 보세요.' 
          },
          { 
            time: '15:00', title: '중산역 카페거리 & 편집샵', desc: '트렌디한 감성이 돋보이는 디자인 거리', icon: <Camera />, transport: 'MRT 단수이신이선', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Zhongshan+Linear+Park+Taipei',
            reviewQuery: '타이베이 중산 카페거리 편집샵',
            story: '최근 대만 MZ세대에게 가장 사랑받는 거리입니다. 식사 후 소화도 시킬 겸 짧게 산책하며 감각적인 편집샵을 구경합니다.', 
            tips: '츠펑제(Chifeng Street) 골목을 따라 걸으며 숨겨져 있는 레트로 필름 카메라 샵이나 대만 로컬 브랜드 디자인 문구샵들을 탐방해 보는 것을 강력히 추천합니다.' 
          },
          { 
            time: '16:00', title: '호텔 짐 찾기 & 공항 이동', desc: '시먼딩 복귀 후 타오위안 공항으로 출발', icon: <Backpack />, transport: '공항철도 급행', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Taoyuan+Airport+MRT+Taipei+Main+Station',
            reviewQuery: '타이베이 메인역 공항철도 타는법',
            story: '안전한 귀국을 위해 여유롭게 짐을 챙겨 공항으로 향합니다.', 
            tips: '비행기 출발 3시간 전입니다. 시먼역에서 타이베이 메인역으로 이동한 후 공항철도로 환승하는 구간이 꽤 머니 여유를 두고 이동하세요. 꼭 보라색 급행열차를 탑승해야 합니다.' 
          },
          { 
            time: '17:25', title: '타오위안 공항 수속 (KE2028)', desc: '공항 도착 및 탑승 준비 (19:25 출발)', icon: <Plane />, transport: '비행기', 
            mapLink: 'https://www.google.com/maps/search/?api=1&query=Taoyuan+International+Airport+Terminal+1',
            reviewQuery: '타오위안 공항 면세점 쇼핑',
            story: '성공적인 비즈니스 영감과 로맨스를 모두 잡은 영관 디렉터님의 완벽한 일정이 마무리됩니다.', 
            tips: '출국 수속과 면세구역 진입을 마치셨다면, 비행기 탑승 전 남은 이지카드 잔액을 공항 면세점이나 자판기에서 깔끔하게 털어버리시는 것이 최고의 마무리입니다.',
            dutyFreeList: [
              { name: '써니힐 펑리수 (SunnyHills)', desc: '공항 면세구역 내 입점. 고급스러운 버터 향과 파인애플의 산미가 특징인 프리미엄 선물입니다.' },
              { name: '가발란 위스키 라스트 헌팅', desc: '시내에서 미처 구하지 못한 특수 배치나 솔리스트 라인업이 공항 면세점에 숨어있는 경우가 있습니다.' },
              { name: '대만 국민 간식 털기', desc: '남은 이지카드 잔액으로 이메이 퍼프(I-Mei Puff) 과자나 누가크래커를 자판기/편의점에서 구매해 보세요.' }
            ]
          },
        ]
      }
    };
    return base[day];
  };

  const [items, setItems] = useState({
    shopping: [
      { id: 1, text: '가발란 솔리스트 비노바리끄', checked: false },
      { id: 2, text: '치아더 펑리수 (한정판)', checked: false },
      { id: 3, text: '라뜰리에 루터스 누가크래커', checked: false },
      { id: 4, text: '오르골 (화산 1914 구입)', checked: false },
      { id: 5, text: '금문고량주 58도', checked: false },
      { id: 6, text: '에그 포테이토 (이메이 퍼프)', checked: false },
      { id: 7, text: '유키앤러브 망고젤리 & 푸딩', checked: false },
    ],
    essentials: [
      { id: 8, text: '여권 및 항공권 (KE201/KE2028)', checked: true },
      { id: 9, text: '이지카드 충전 확인', checked: false },
      { id: 10, text: '110V 전용 어댑터', checked: false },
      { id: 11, text: '휴대용 우산 (3월 필수)', checked: false },
      { id: 16, text: '보조배터리 (기내 수하물 지참)', checked: false },
      { id: 17, text: '지갑 (신분증 및 현지 현금)', checked: false },
      { id: 18, text: '트래블월렛 카드 (결제 및 출금용)', checked: false },
    ],
    missions: [
      { id: 12, text: '👫 손잡고 걷는 런웨이 포즈 (시먼 횡단보도)', checked: false },
      { id: 13, text: '👩‍❤️‍👨 서로 마주보며 꿀 떨어지는 눈맞춤 (지우펀)', checked: false },
      { id: 14, text: '🫶 머리 위로 큰 커플 하트 (총통부 앞)', checked: false },
      { id: 15, text: '🥢 길거리 음식 서로 먹여주며 웃는 찰나 (야시장)', checked: false },
    ]
  });

  const toggleCheck = (category, id) => {
    setItems(prev => ({
      ...prev,
      [category]: prev[category].map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    }));
  };

  const isAllChecked = items.shopping.every(item => item.checked) && 
                       items.essentials.every(item => item.checked) && 
                       items.missions.every(item => item.checked);
  
  useEffect(() => {
    if (isAllChecked) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [isAllChecked]);

  const paperStyle = {
    backgroundColor: isNightMode ? '#0f0f13' : '#ffffff',
    backgroundImage: isNightMode 
      ? `radial-gradient(circle at 10% 20%, rgba(236,72,153,0.05) 0%, transparent 30%),
         radial-gradient(circle at 90% 80%, rgba(6,182,212,0.05) 0%, transparent 30%)`
      : `radial-gradient(circle at 10% 20%, rgba(59,130,246,0.03) 0%, transparent 20%),
         radial-gradient(circle at 80% 50%, rgba(14,165,233,0.03) 0%, transparent 30%),
         linear-gradient(135deg, transparent 45%, rgba(59,130,246,0.02) 50%, transparent 55%)`,
    backgroundSize: '100% 100%, 100% 100%, 40px 40px',
    transition: 'background-color 0.5s ease',
    filter: isNightMode ? 'none' : 'contrast(1.02) brightness(0.99)'
  };

  const CardVisual = ({ exp }) => {
    const config = {
      Food: { color: 'from-blue-500 to-blue-600', icon: <Utensils className="w-4 h-4" />, label: 'Dining' },
      Shopping: { color: 'from-sky-400 to-sky-500', icon: <ShoppingBag className="w-4 h-4" />, label: 'Luxury' },
      Tour: { color: 'from-indigo-400 to-indigo-500', icon: <MapIcon className="w-4 h-4" />, label: 'Exp.' },
      Etc: { color: 'from-slate-400 to-slate-500', icon: <CreditCard className="w-4 h-4" />, label: 'Misc' }
    };
    const c = config[exp.category] || config.Etc;
    const krwAmount = Math.floor(exp.amount * EXCHANGE_RATE);

    return (
      <div 
        className={`w-full bg-gradient-to-br ${c.color} rounded-[1.5rem] p-5 text-white shadow-lg relative overflow-hidden group transition-transform active:scale-95 cursor-pointer`}
        onTouchStart={() => handlePressStart(exp)}
        onTouchEnd={handlePressEnd}
        onMouseDown={() => handlePressStart(exp)}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
      >
        <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 pointer-events-none">
          {React.cloneElement(c.icon, { className: 'w-20 h-20' })}
        </div>
        <div className="flex justify-between items-start mb-6 relative z-10 pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
               {c.icon}
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest">{c.label}</span>
          </div>
          <span className="text-[10px] font-bold opacity-70 tracking-widest">{exp.date}</span>
        </div>
        <div className="space-y-1 relative z-10 text-left pointer-events-none">
           <h5 className="text-xs font-bold opacity-90 leading-tight line-clamp-1">{exp.title}</h5>
           <div className="flex items-end gap-2">
             <p className="text-2xl font-black tracking-tight">{exp.amount.toLocaleString()} <span className="text-sm font-bold opacity-80">TWD</span></p>
           </div>
           <p className="text-[10px] font-bold opacity-60">≈ {krwAmount.toLocaleString()} KRW</p>
        </div>
        
        <div className="absolute top-5 right-4 w-8 h-8 rounded-full bg-black/20 text-white backdrop-blur-md flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical className="w-4 h-4" />
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen flex justify-center pb-32 relative overflow-hidden transition-colors duration-500 ${isNightMode ? 'text-stone-200' : 'text-stone-800'}`} style={paperStyle}>
      <style>
        {`
          @keyframes confetti-fall {
            0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
          .animate-confetti {
            animation: confetti-fall 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
          @keyframes twinkle-star {
            0%, 100% { opacity: 0.1; transform: scale(0.8); }
            50% { opacity: 0.8; transform: scale(1.2); }
          }
          .animate-twinkle {
            animation: twinkle-star linear infinite;
          }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      {isNightMode && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* 배너 클릭 시 노출되는 모달 (내용 확장 및 스크롤 적용) */}
      {showBannerModal && currentBanner && (
        <div className="fixed inset-0 z-[800] bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className={`rounded-[3rem] p-8 w-full max-w-sm shadow-2xl relative flex flex-col max-h-[85vh] text-left border ${isNightMode ? 'bg-stone-900 border-stone-700' : 'bg-white border-stone-100'}`}>
             <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-50 pointer-events-none" style={{ backgroundColor: currentBanner.iconBgColor }} />
             
             <div className="flex justify-between items-start mb-2 relative z-10 shrink-0">
               <div className="flex items-center gap-3">
                 <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-inner ${isNightMode ? 'bg-stone-800' : 'bg-stone-100'}`}>
                   {currentBanner.modalIcon}
                 </div>
                 <h3 className={`text-xl font-black tracking-tight ${isNightMode ? 'text-white' : 'text-stone-900'}`}>{currentBanner.modalTitle}</h3>
               </div>
               <button onClick={() => setShowBannerModal(false)} className={`transition-colors ${isNightMode ? 'text-stone-500 hover:text-white' : 'text-stone-400 hover:text-stone-900'}`}>
                 <X className="w-6 h-6" />
               </button>
             </div>

             <div className="space-y-4 relative z-10 mt-6 overflow-y-auto no-scrollbar flex-1 pr-1">
                {currentBanner.modalItems.map((item, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl border transition-colors ${isNightMode ? 'bg-stone-800/50 hover:bg-stone-800 border-stone-700' : 'bg-stone-50 hover:bg-stone-100 border-stone-100'}`}>
                    <p className={`text-[11px] font-black mb-1.5 ${currentBanner.textColor}`}>{item.title}</p>
                    <p className={`text-[10px] leading-relaxed ${isNightMode ? 'text-stone-400' : 'text-stone-600'}`}>{item.desc}</p>
                  </div>
                ))}
             </div>
             
             <button onClick={() => setShowBannerModal(false)} className={`w-full mt-6 py-4 rounded-full text-[11px] font-black tracking-[0.2em] uppercase shadow-lg transition-colors shrink-0 ${isNightMode ? 'bg-stone-800 text-white hover:bg-stone-700' : 'bg-stone-900 text-white hover:bg-stone-800'}`}>
               닫기
             </button>
           </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[1000] animate-in slide-in-from-top-5 fade-in duration-300 w-[90%] max-w-xs">
          <div className="bg-stone-900 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-bold tracking-wide border border-stone-700 leading-snug">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            {toastMessage}
          </div>
        </div>
      )}

      {showNightConcierge && (
        <div className="fixed inset-0 z-[800] bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-500">
           <div className="bg-stone-900 border border-stone-700 rounded-[3rem] p-8 w-full max-w-sm shadow-2xl relative overflow-hidden">
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
             
             <div className="flex justify-between items-start mb-6 relative z-10">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-stone-800 rounded-2xl flex items-center justify-center text-blue-400 shadow-inner">
                   <BellRing className="w-5 h-5 animate-pulse" />
                 </div>
                 <h3 className="text-xl font-black text-white tracking-tight">야간 컨시어지</h3>
               </div>
               <button onClick={() => { setShowNightConcierge(false); setConciergeDismissed(true); }} className="text-stone-500 hover:text-white transition-colors">
                 <X className="w-6 h-6" />
               </button>
             </div>

             <p className="text-[12px] font-bold text-stone-400 mb-8 relative z-10 leading-relaxed font-serif">
               "영관 디렉터님, 밤이 깊었습니다.<br/>시먼딩 호텔 주변의 심야 편의점과 24시간 약국 정보를 준비해 두었습니다. 편안한 밤 보내세요."
             </p>

             <div className="space-y-3 relative z-10">
                <a href="https://www.google.com/maps/search/?api=1&query=Convenience+store+near+Ximen+Station+Taipei" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-stone-800/50 hover:bg-stone-800 p-4 rounded-2xl transition-colors border border-stone-700">
                  <Store className="w-5 h-5 text-emerald-400" />
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-white">24시 편의점 찾기</p>
                    <p className="text-[9px] text-stone-500">세븐일레븐, 패밀리마트 경로 안내</p>
                  </div>
                </a>
                <a href="https://www.google.com/maps/search/?api=1&query=24+hour+pharmacy+near+Ximen+Station+Taipei" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-stone-800/50 hover:bg-stone-800 p-4 rounded-2xl transition-colors border border-stone-700">
                  <Pill className="w-5 h-5 text-pink-400" />
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-white">심야 약국 찾기</p>
                    <p className="text-[9px] text-stone-500">소화제, 상비약이 필요할 때</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 bg-stone-800/50 p-4 rounded-2xl border border-stone-700">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-white">긴급 연락망</p>
                    <p className="text-[9px] text-stone-500">경찰서 110 / 주타이베이 한국 대표부</p>
                  </div>
                </div>
             </div>
           </div>
        </div>
      )}

      {showDDayModal && (
        <div className="fixed inset-0 z-[600] bg-stone-900/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-500">
           <div className={`bg-white rounded-[3rem] p-10 w-full max-w-sm text-center shadow-2xl relative overflow-hidden border ${isNightMode ? 'border-stone-700' : 'border-blue-100'}`}>
             <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl ${isNightMode ? 'bg-amber-400/20' : 'bg-sky-400/20'}`} />
             <div className={`absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-2xl ${isNightMode ? 'bg-blue-400/20' : 'bg-blue-400/20'}`} />
             <PartyPopper className={`w-16 h-16 mx-auto mb-6 relative z-10 ${isNightMode ? 'text-amber-500' : 'text-blue-500'}`} />
             <h2 className="text-3xl font-black text-stone-900 mb-2 relative z-10">It's D-Day!</h2>
             <p className="text-[13px] font-bold text-stone-500 mb-8 relative z-10 leading-relaxed">
               기다려줘서 고마워,<br/>완벽한 여행을 만들자.
             </p>
             <button 
               onClick={() => setShowDDayModal(false)}
               className={`text-white w-full py-4 rounded-full text-[11px] font-black tracking-[0.2em] uppercase shadow-lg transition-colors relative z-10 ${isNightMode ? 'bg-stone-900 hover:bg-stone-800' : 'bg-blue-600 hover:bg-blue-700'}`}
             >
               여정 시작하기
             </button>
           </div>
        </div>
      )}

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[500] flex justify-center overflow-hidden">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti shadow-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                animationDelay: `${Math.random() * 1.5}s`,
                backgroundColor: ['#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#ec4899', '#8b5cf6'][Math.floor(Math.random() * 6)],
                width: `${Math.random() * 8 + 6}px`,
                height: `${Math.random() * 12 + 6}px`,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              }}
            />
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md px-8 py-6 rounded-[2rem] shadow-2xl flex flex-col items-center gap-3 animate-in zoom-in duration-500 pointer-events-auto border border-blue-100">
            <span className="text-4xl drop-shadow-sm">🥂</span>
            <h3 className="text-xl font-black text-stone-900 tracking-tight">Perfect!</h3>
            <p className={`text-[11px] font-bold text-center leading-relaxed ${isNightMode ? 'text-amber-600' : 'text-blue-600'}`}>
              디렉터 영관님의<br/>완벽한 여행 준비가 끝났습니다.
            </p>
          </div>
        </div>
      )}

      {selectedExpense && (
        <div className="fixed inset-0 z-[700] flex items-end justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setSelectedExpense(null)}>
           <div className={`w-full max-w-sm rounded-[2.5rem] p-6 shadow-2xl animate-in slide-in-from-bottom-10 ${isNightMode ? 'bg-stone-900 border border-stone-800' : 'bg-white border border-blue-100'}`} onClick={(e) => e.stopPropagation()}>
              <div className="w-12 h-1.5 bg-stone-300 rounded-full mx-auto mb-6 opacity-50" />
              <div className="text-left mb-6 px-2">
                <span className={`text-[10px] font-black uppercase tracking-widest ${isNightMode ? 'text-cyan-400' : 'text-blue-600'}`}>{selectedExpense.category}</span>
                <h4 className={`text-lg font-bold truncate mt-1 ${isNightMode ? 'text-stone-200' : 'text-stone-800'}`}>{selectedExpense.title}</h4>
                <p className="text-xl font-black mt-2">
                  {selectedExpense.amount.toLocaleString()} TWD 
                  <span className="text-xs font-bold text-stone-400 ml-2">({Math.floor(selectedExpense.amount * EXCHANGE_RATE).toLocaleString()} KRW)</span>
                </p>
              </div>
              <div className="flex gap-3">
                 <button onClick={handleEditClick} className={`flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest transition-colors ${isNightMode ? 'bg-stone-800 text-stone-300 hover:bg-stone-700' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}>
                    <Edit2 className="w-4 h-4" /> Edit
                 </button>
                 <button onClick={() => handleDeleteExpense(selectedExpense.id)} className={`flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest transition-colors ${isNightMode ? 'bg-red-950/50 text-red-400 hover:bg-red-900/50 border border-red-900/50' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}>
                    <Trash2 className="w-4 h-4" /> Delete
                 </button>
              </div>
           </div>
        </div>
      )}

      <div className={`absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/p6-mini.png')] z-0`} />
      
      <div className={`max-w-md w-full relative z-10 backdrop-blur-[8px] rounded-b-[4.5rem] p-6 md:p-8 shadow-[0_40px_80px_rgba(0,0,0,0.08)] border-x border-b overflow-y-auto no-scrollbar transition-colors duration-500 ${isNightMode ? 'bg-stone-950/80 border-pink-500/20 shadow-[0_0_50px_rgba(236,72,153,0.05)]' : 'bg-white/70 border-white/70'}`}>
        
        <header className="mb-10 pt-4">
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[9px] font-black tracking-[0.4em] text-stone-400 uppercase">Archive No. 2026-03</span>
              </div>
              <h1 className={`text-4xl font-black tracking-tighter leading-none text-left transition-all duration-500 ${isNightMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.4)]' : 'text-stone-900 drop-shadow-sm'}`}>
                TAIPEI<br/><span className={`font-serif italic ${isNightMode ? 'text-cyan-300' : 'text-blue-600'}`}>sensory</span>
              </h1>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <div className={`shadow-xl p-3 rounded-2xl border flex flex-col items-center min-w-[85px] transition-colors ${isNightMode ? 'bg-stone-900 border-stone-800' : 'bg-white/90 border-blue-50'}`}>
                {isRaining ? <CloudRain className="w-5 h-5 text-blue-500" /> : <Sun className={`w-5 h-5 ${isNightMode ? 'text-pink-400' : 'text-blue-500'}`} />}
                <span className={`text-[11px] font-black mt-1 ${isNightMode ? 'text-stone-200' : 'text-stone-800'}`}>{isRaining ? '19°C' : '22°C'}</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={handleCopySummary}
                  className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${isNightMode ? 'bg-stone-800 text-stone-300 hover:bg-stone-700' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                >
                  <Share2 className="w-2.5 h-2.5" /> Share
                </button>
                <button 
                  onClick={() => setIsRaining(!isRaining)}
                  className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${isRaining ? 'bg-blue-600 text-white shadow-lg' : (isNightMode ? 'bg-stone-800 text-stone-300 hover:bg-stone-700' : 'bg-blue-50 text-blue-400 hover:text-blue-600')}`}
                >
                  <Zap className="w-2.5 h-2.5" /> Rainy
                </button>
                <button 
                  onClick={() => setIsNightMode(!isNightMode)}
                  className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${isNightMode ? 'bg-pink-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]' : 'bg-blue-600 text-white shadow-lg hover:scale-105'}`}
                >
                  <Moon className="w-2.5 h-2.5" /> Night
                </button>
              </div>
            </div>
          </div>

          {/* ✨ 일자별 동적 배너 렌더링 영역 */}
          {currentBanner && (
             currentBanner.link ? (
               <a 
                 href={currentBanner.link}
                 target="_blank"
                 rel="noopener noreferrer"
                 className={`block rounded-[2.5rem] p-6 flex items-center justify-between shadow-2xl relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02] border ${isNightMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-blue-100'}`}
               >
                 <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl ${currentBanner.bgColor}`} />
                 <div className="relative z-10 text-left">
                   <h4 className={`text-[10px] font-black uppercase tracking-widest mb-1 ${currentBanner.textColor}`}>{currentBanner.title}</h4>
                   <p className="text-[11px] text-stone-400 font-bold">{currentBanner.desc}</p>
                 </div>
                 <div className={`relative z-10 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${currentBanner.iconBgColor}`}>
                   {currentBanner.icon}
                 </div>
               </a>
             ) : (
               <button 
                 onClick={() => setShowBannerModal(true)}
                 className={`w-full text-left block rounded-[2.5rem] p-6 flex items-center justify-between shadow-2xl relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02] border ${isNightMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-blue-100'}`}
               >
                 <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl ${currentBanner.bgColor}`} />
                 <div className="relative z-10 text-left">
                   <h4 className={`text-[10px] font-black uppercase tracking-widest mb-1 ${currentBanner.textColor}`}>{currentBanner.title}</h4>
                   <p className="text-[11px] text-stone-400 font-bold">{currentBanner.desc}</p>
                 </div>
                 <div className={`relative z-10 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${currentBanner.iconBgColor}`}>
                   {currentBanner.icon}
                 </div>
               </button>
             )
          )}
        </header>

        <main className="space-y-16">
          {activeTab.startsWith('day') && (
            <section className="animate-in fade-in duration-700">
              
              <a 
                href="https://www.youtube.com/results?search_query=%ED%83%80%EC%9D%B4%EB%B2%A0%EC%9D%B4+%EC%97%AC%ED%96%89+%EB%B8%8C%EC%9D%B4%EB%A1%9C%EA%B7%B8" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`block rounded-3xl p-5 mb-6 flex justify-between items-center shadow-2xl relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform duration-300 ${isNightMode ? 'bg-gradient-to-r from-stone-800 to-stone-900 border border-stone-700' : 'bg-gradient-to-r from-blue-600 to-blue-800 border border-blue-500'}`}
              >
                <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full blur-xl transition-all ${isNightMode ? 'bg-pink-500/20 group-hover:bg-pink-500/30' : 'bg-white/10 group-hover:bg-white/20'}`} />
                <div className="relative z-10 text-left">
                  <p className={`text-[9px] font-black uppercase tracking-widest mb-1 flex items-center gap-1.5 ${isNightMode ? 'text-pink-400' : 'text-blue-200'}`}>
                    <Calendar className={`w-3 h-3 ${isNightMode ? 'text-pink-400' : 'text-blue-300'}`} /> Countdown
                  </p>
                  <p className={`text-sm font-bold ${isNightMode ? 'text-stone-200' : 'text-white'} group-hover:text-white transition-colors`}>설레는 여정, 미리보기 📺</p>
                </div>
                <div className="relative z-10 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/5 flex flex-col items-center justify-center">
                  <span className={`text-2xl font-black tracking-tighter drop-shadow-md ${isNightMode ? 'text-pink-300' : 'text-white'}`}>{dDayText}</span>
                </div>
              </a>

              <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
                <div className={`px-4 py-2 rounded-full border flex items-center gap-2 shrink-0 shadow-sm transition-colors ${isNightMode ? 'bg-stone-900/80 border-stone-700' : 'bg-white/90 border-blue-50'}`}>
                   <Wind className={`w-3.5 h-3.5 ${isNightMode ? 'text-emerald-400' : 'text-sky-500'}`} />
                   <span className={`text-[10px] font-black tracking-wide ${isNightMode ? 'text-stone-300' : 'text-blue-800'}`}>AQI 42 (좋음)</span>
                </div>
                <div className={`px-4 py-2 rounded-full border flex items-center gap-2 shrink-0 shadow-sm transition-colors ${isNightMode ? 'bg-stone-900/80 border-stone-700' : 'bg-white/90 border-blue-50'}`}>
                   <Sunset className={`w-3.5 h-3.5 ${isNightMode ? 'text-orange-400' : 'text-orange-500'}`} />
                   <span className={`text-[10px] font-black tracking-wide ${isNightMode ? 'text-stone-300' : 'text-blue-800'}`}>일몰 18:15</span>
                </div>
                <div className={`px-4 py-2 rounded-full border flex items-center gap-2 shrink-0 shadow-sm transition-colors ${isNightMode ? 'bg-stone-900/80 border-stone-700' : 'bg-white/90 border-blue-50'}`}>
                   <Droplets className={`w-3.5 h-3.5 ${isNightMode ? 'text-blue-400' : 'text-blue-500'}`} />
                   <span className={`text-[10px] font-black tracking-wide ${isNightMode ? 'text-stone-300' : 'text-blue-800'}`}>습도 78%</span>
                </div>
              </div>

              <div className={`relative overflow-hidden rounded-[2rem] p-6 mb-10 border shadow-md transition-colors duration-500 text-left ${isNightMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-blue-100'}`}>
                <div className="absolute -top-10 -right-10 p-4 opacity-[0.03] pointer-events-none">
                  <Plane className={`w-48 h-48 transform rotate-45 ${isNightMode ? 'text-white' : 'text-stone-900'}`} />
                </div>
                <div className="relative z-10 flex justify-between items-end">
                  <div>
                     <div className="flex items-center gap-2 mb-2">
                       <Ticket className={`w-4 h-4 ${isNightMode ? 'text-pink-400' : 'text-blue-500'}`} />
                       <p className={`text-[10px] font-black tracking-[0.3em] uppercase ${isNightMode ? 'text-pink-400' : 'text-blue-600'}`}>TPE Boarding</p>
                     </div>
                     <h2 className={`text-3xl font-black tracking-tighter mb-1 ${isNightMode ? 'text-white' : 'text-stone-900'}`}>{getSchedule(activeTab).date.split(' ')[0]}</h2>
                     <p className={`text-xs font-bold ${isNightMode ? 'text-stone-400' : 'text-stone-500'}`}>{getSchedule(activeTab).concept}</p>
                  </div>
                  {isRaining && <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[9px] font-black uppercase shadow-sm whitespace-nowrap"><CloudRain className="w-3 h-3 inline mr-1 -mt-0.5"/>Rainy</div>}
                </div>
              </div>

              <div className="space-y-0 relative px-2 mt-4">
                {getSchedule(activeTab).items.map((item, index) => {
                  const isLast = index === getSchedule(activeTab).items.length - 1;
                  const timeParts = item.time.split(':');
                  
                  return (
                  <div key={index} className="flex gap-4 relative group">
                    
                    {!isLast && <div className={`absolute left-[3.25rem] top-10 bottom-[-2rem] w-[2px] border-l-2 border-dashed ${isNightMode ? 'border-stone-800' : 'border-blue-200'}`} />}
                    
                    <div className="flex flex-col items-center w-[4.5rem] shrink-0 pt-2 z-10">
                      <div className={`text-2xl font-black leading-none tracking-tighter ${isNightMode ? 'text-stone-200' : 'text-stone-800'}`}>{timeParts[0]}</div>
                      <div className={`text-xs font-bold leading-none mb-3 ${isNightMode ? 'text-pink-400' : 'text-blue-500'}`}>{timeParts[1]}</div>
                      <div className={`w-3 h-3 rounded-full border-2 shadow-sm transition-transform duration-300 group-hover:scale-125 ${expandedItem === index ? (isNightMode ? 'bg-pink-600 border-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.5)]' : 'bg-blue-600 border-blue-300 shadow-[0_0_10px_rgba(37,99,235,0.3)]') : (isNightMode ? 'bg-stone-800 border-stone-600' : 'bg-white border-blue-300')}`}>
                      </div>
                    </div>

                    <div className={`flex-1 mb-8 relative cursor-pointer transition-all duration-300 transform ${expandedItem === index ? 'scale-[1.02]' : ''}`} onClick={() => setExpandedItem(expandedItem === index ? null : index)}>
                       <div className={`rounded-3xl border overflow-hidden ${isNightMode ? 'bg-stone-900/80 border-stone-800 shadow-[0_4px_20px_rgba(0,0,0,0.3)]' : 'bg-white border-blue-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)]'}`}>
                         
                         <div className={`h-1.5 w-full ${isNightMode ? 'bg-gradient-to-r from-pink-600 to-cyan-600' : 'bg-gradient-to-r from-blue-400 to-sky-400'}`}></div>
                         
                         <div className="p-4 text-left">
                           <div className="flex justify-between items-start mb-1">
                             <h3 className={`text-sm font-black tracking-tight pr-2 ${isNightMode ? 'text-stone-100' : 'text-stone-800'}`}>{item.title}</h3>
                             <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${expandedItem === index ? (isNightMode ? 'rotate-180 text-pink-500' : 'rotate-180 text-blue-500') : 'text-stone-400'}`} />
                           </div>
                           <p className={`text-[11px] font-medium leading-snug line-clamp-2 ${isNightMode ? 'text-stone-400' : 'text-stone-500'}`}>{item.desc}</p>
                           
                           <div className="flex flex-wrap gap-2 mt-3">
                             {item.transport && item.transport !== '-' && (
                               <span className={`flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded border ${isNightMode ? 'bg-stone-800 text-stone-300 border-stone-700' : 'bg-sky-50 text-sky-600 border-sky-100'}`}>
                                 <Train className="w-2.5 h-2.5" /> {item.transport}
                               </span>
                             )}
                             {item.mapLink && item.mapLink !== '#' && (
                               <a href={item.mapLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className={`flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded border transition-colors ${isNightMode ? 'bg-cyan-900/30 text-cyan-300 border-cyan-800/50 hover:bg-cyan-900/50' : 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100'}`}>
                                 <MapPin className="w-2.5 h-2.5" /> 구글맵
                               </a>
                             )}
                           </div>
                         </div>

                         {/* 펼쳐지는 상세 팁 (Director's Tip) */}
                         <div className={`grid transition-all duration-300 ease-in-out text-left ${expandedItem === index ? 'grid-rows-[1fr] border-t' : 'grid-rows-[0fr] border-t-0'} ${isNightMode ? 'border-stone-800' : 'border-blue-50'}`}>
                           <div className="overflow-hidden">
                             <div className={`p-4 ${isNightMode ? 'bg-stone-950/50' : 'bg-blue-50/50'}`}>
                               <p className={`text-[11px] font-bold leading-relaxed mb-3 font-serif italic ${isNightMode ? 'text-pink-200' : 'text-blue-800'}`}>"{item.story}"</p>
                               <div className={`p-3 rounded-xl border flex gap-2.5 items-start ${isNightMode ? 'bg-stone-900 border-stone-800 shadow-inner' : 'bg-white border-blue-100 shadow-sm'}`}>
                                 <Info className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isNightMode ? 'text-pink-400' : 'text-blue-500'}`} />
                                 <div className="space-y-1">
                                   <span className={`text-[9px] font-black uppercase tracking-widest block ${isNightMode ? 'text-pink-400' : 'text-blue-600'}`}>Director's Tip</span>
                                   <p className={`text-[10px] font-medium leading-relaxed whitespace-pre-wrap ${isNightMode ? 'text-stone-400' : 'text-stone-600'}`}>{item.tips}</p>
                                 </div>
                               </div>

                               {/* 면세점 쇼핑 가이드 (Day 3 공항) */}
                               {item.dutyFreeList && (
                                 <div className={`mt-4 border-t pt-4 ${isNightMode ? 'border-stone-800' : 'border-blue-100/50'}`}>
                                   <span className={`text-[10px] font-black uppercase tracking-widest block mb-2 flex items-center gap-1 ${isNightMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
                                     <ShoppingBag className="w-3 h-3" /> Last Minute Shopping Top 3
                                   </span>
                                   <div className="space-y-2">
                                     {item.dutyFreeList.map((df, idx) => {
                                       const dfKey = Object.keys(df)[0];
                                       const dfName = df.name || dfKey;
                                       const dfDesc = df.desc || df[dfKey];
                                       return (
                                       <div key={idx} className={`p-2.5 rounded-lg border ${isNightMode ? 'bg-stone-900 border-stone-700' : 'bg-white border-indigo-50'}`}>
                                         <p className={`text-[10px] font-bold ${isNightMode ? 'text-stone-200' : 'text-stone-800'}`}>{idx + 1}. {dfName}</p>
                                         <p className={`text-[9px] font-medium leading-relaxed mt-0.5 ${isNightMode ? 'text-stone-400' : 'text-stone-500'}`}>{dfDesc}</p>
                                       </div>
                                     )})}
                                   </div>
                                 </div>
                               )}

                               {/* 리뷰 링크 연동 (직접 링크 우선, 없으면 검색) */}
                               <div className="mt-4 flex justify-end">
                                 <a 
                                   href={item.reviewLink || `https://search.naver.com/search.naver?where=view&query=${encodeURIComponent(item.reviewQuery || item.title)}`} 
                                   target="_blank" 
                                   rel="noopener noreferrer" 
                                   onClick={(e) => e.stopPropagation()}
                                   className={`inline-flex items-center gap-1 text-[9px] font-black px-3 py-1.5 rounded-lg transition-colors ${isNightMode ? 'bg-stone-800 text-pink-300 hover:bg-stone-700' : 'bg-stone-100 text-blue-600 hover:bg-stone-200'}`}
                                 >
                                   <Search className="w-2.5 h-2.5" /> 실제 리뷰 보기
                                 </a>
                               </div>

                             </div>
                           </div>
                         </div>

                       </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            </section>
          )}

          {activeTab === 'checklist' && (
            <section className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
              
              {/* Shopping Budget Guide Banner */}
              <div className={`mb-8 p-6 rounded-[2.5rem] border shadow-md relative overflow-hidden transition-colors duration-500 ${isNightMode ? 'bg-stone-900 border-stone-800' : 'bg-gradient-to-br from-blue-50 to-sky-50 border-blue-100'}`}>
                <div className="absolute -top-4 -right-4 p-4 opacity-[0.07] pointer-events-none">
                  <ShoppingBag className="w-32 h-32 rotate-12" />
                </div>
                <div className="relative z-10 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className={`w-4 h-4 ${isNightMode ? 'text-pink-400' : 'text-blue-500'}`} />
                    <h3 className={`text-[10px] font-black uppercase tracking-widest ${isNightMode ? 'text-pink-400' : 'text-blue-600'}`}>Shopping Budget Guide</h3>
                  </div>
                  <p className={`text-[11px] font-bold mb-6 ${isNightMode ? 'text-stone-300' : 'text-stone-700'}`}>전체 예산의 30%를 쇼핑에 할당하는 것을 권장합니다.</p>
                  
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <p className="text-[9px] font-bold text-stone-500 uppercase tracking-widest mb-1">권장 쇼핑 예산</p>
                      <p className={`text-2xl font-black tracking-tight ${isNightMode ? 'text-white' : 'text-blue-900'}`}>{recommendedShoppingBudget.toLocaleString()} <span className="text-[10px] opacity-50 font-bold">TWD</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-bold text-stone-500 uppercase tracking-widest mb-1">현재 사용 금액</p>
                      <p className={`text-lg font-black tracking-tight ${currentShoppingExpense > recommendedShoppingBudget ? 'text-red-500 animate-pulse' : (isNightMode ? 'text-cyan-400' : 'text-sky-600')}`}>{currentShoppingExpense.toLocaleString()} <span className="text-[10px] opacity-50 font-bold">TWD</span></p>
                    </div>
                  </div>
                  
                  <div className={`w-full h-2.5 rounded-full overflow-hidden mt-2 ${isNightMode ? 'bg-stone-800' : 'bg-white shadow-inner'}`}>
                    <div 
                      className={`h-full transition-all duration-1000 ${currentShoppingExpense > recommendedShoppingBudget ? 'bg-red-500' : (isNightMode ? 'bg-gradient-to-r from-pink-500 to-cyan-400' : 'bg-gradient-to-r from-blue-400 to-sky-400')}`} 
                      style={{ width: `${shoppingProgress}%` }} 
                    />
                  </div>
                  <p className={`text-[10px] font-black mt-3 text-right ${currentShoppingExpense > recommendedShoppingBudget ? 'text-red-500' : (isNightMode ? 'text-stone-400' : 'text-blue-800')}`}>
                    {remainingShoppingBudget >= 0 ? `여유: ${remainingShoppingBudget.toLocaleString()} TWD 남음` : `초과: ${Math.abs(remainingShoppingBudget).toLocaleString()} TWD 초과`}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className={`text-xs font-black flex items-center gap-4 uppercase tracking-[0.5em] px-2 text-left ${isNightMode ? 'text-stone-100' : 'text-blue-900'}`}>Essentials</h3>
                <div className={`rounded-[3rem] p-8 border shadow-sm space-y-5 text-left ${isNightMode ? 'bg-stone-900/80 border-stone-800' : 'bg-white border-blue-100'}`}>
                  {items.essentials.map(item => (
                    <div key={item.id} onClick={() => toggleCheck('essentials', item.id)} className="flex items-center gap-4 cursor-pointer group py-1">
                      {item.checked ? <CheckSquare className={`w-5 h-5 shrink-0 ${isNightMode ? 'text-stone-500' : 'text-blue-600'}`} /> : <Square className={`w-5 h-5 shrink-0 transition-colors ${isNightMode ? 'text-stone-700 group-hover:text-stone-500' : 'text-stone-200 group-hover:text-blue-300'}`} />}
                      <span className={`text-[11px] font-bold tracking-tight leading-snug ${item.checked ? 'text-stone-400 line-through' : (isNightMode ? 'text-stone-300' : 'text-stone-700')}`}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className={`text-xs font-black flex items-center gap-4 uppercase tracking-[0.5em] px-2 text-left ${isNightMode ? 'text-pink-400' : 'text-blue-600'}`}>
                  <CameraIcon className="w-4 h-4 animate-pulse" /> Photo Missions
                </h3>
                <div className={`rounded-[3rem] p-8 border shadow-inner space-y-5 text-left transition-colors duration-500 ${isNightMode ? 'bg-pink-950/20 border-pink-900/30' : 'bg-blue-50/50 border-blue-100'}`}>
                  {items.missions.map(item => (
                    <div key={item.id} onClick={() => toggleCheck('missions', item.id)} className="flex items-center gap-4 cursor-pointer group py-1">
                      {item.checked ? <CheckSquare className={`w-5 h-5 shrink-0 ${isNightMode ? 'text-pink-600' : 'text-blue-600'}`} /> : <Square className={`w-5 h-5 shrink-0 transition-colors ${isNightMode ? 'text-pink-900 group-hover:text-pink-700' : 'text-blue-200 group-hover:text-blue-400'}`} />}
                      <span className={`text-[11px] font-bold tracking-tight leading-snug ${item.checked ? (isNightMode ? 'text-pink-800/50 line-through' : 'text-blue-800/50 line-through') : (isNightMode ? 'text-pink-200' : 'text-blue-900')}`}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`rounded-[3rem] p-8 relative overflow-hidden shadow-xl text-left border ${isNightMode ? 'bg-[#0a0a0c] border-stone-800' : 'bg-blue-950 border-blue-900'}`}>
                <h3 className="text-xs font-black text-blue-200 mb-8 uppercase tracking-[0.5em]">Collector's Items</h3>
                <div className="space-y-5 relative z-10 text-white">
                  {items.shopping.map(item => (
                    <div key={item.id} onClick={() => toggleCheck('shopping', item.id)} className="flex items-center gap-4 cursor-pointer py-1">
                      {item.checked ? <CheckSquare className="w-5 h-5 shrink-0 text-blue-400" /> : <Square className="w-5 h-5 shrink-0 text-stone-600" />}
                      <span className={`text-[11px] font-black tracking-widest uppercase leading-snug ${item.checked ? 'text-stone-500 line-through' : 'text-stone-200'}`}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeTab === 'budget' && (
            <section className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-10">
              
              {/* Premium Budget Dashboard */}
              <div className={`rounded-[3.5rem] p-8 md:p-10 relative overflow-hidden shadow-2xl border ${isNightMode ? 'bg-[#121214] border-stone-800 text-white' : 'bg-white border-blue-100 text-stone-900'}`}>
                <div className="relative z-10 text-center space-y-2 mb-8">
                  <p className="text-[9px] font-black text-stone-500 uppercase tracking-[0.6em] mb-4">Total Balance</p>
                  
                  <div className="flex justify-center items-end gap-2">
                    <h2 className={`text-6xl font-black tracking-tighter transition-colors duration-500 ${isBudgetLow ? 'text-red-500 animate-pulse' : (isNightMode ? 'text-amber-500' : 'text-blue-600')}`}>
                      {remainingBudget.toLocaleString()}
                    </h2>
                    <span className={`text-xl font-bold opacity-40 mb-2 ${isNightMode ? '' : 'text-stone-500'}`}>TWD</span>
                  </div>
                  
                  <div className={`inline-block border px-4 py-1.5 rounded-full mt-2 ${isNightMode ? 'bg-white/5 border-white/10' : 'bg-blue-50 border-blue-100'}`}>
                     <p className={`text-[11px] font-bold tracking-wide flex items-center justify-center gap-1.5 ${isNightMode ? 'text-stone-300' : 'text-blue-700'}`}>
                       ≈ {(remainingBudget * EXCHANGE_RATE).toLocaleString('ko-KR', {maximumFractionDigits:0})} <span className="text-[9px] opacity-60">KRW</span>
                     </p>
                  </div>

                  <div className="w-full bg-stone-200 h-2.5 rounded-full mt-8 overflow-hidden border border-stone-100">
                    <div className={`h-full transition-all duration-1000 ${isBudgetLow ? 'bg-gradient-to-r from-red-600 to-red-400' : 'bg-gradient-to-r from-blue-600 to-sky-400'}`} style={{ width: `${Math.max(0, (remainingBudget / totalBudget) * 100)}%` }} />
                  </div>
                </div>

                <div className={`mt-8 pt-8 border-t space-y-4 ${isNightMode ? 'border-stone-800/50' : 'border-stone-100'}`}>
                  {[
                    { label: 'Food', amount: categoryStats.Food, color: 'bg-blue-500' },
                    { label: 'Shopping', amount: categoryStats.Shopping, color: 'bg-sky-400' },
                    { label: 'Tour', amount: categoryStats.Tour, color: 'bg-indigo-400' }
                  ].map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <span className="text-[9px] font-black text-stone-500 uppercase tracking-widest w-16 text-left">{stat.label}</span>
                      <div className="flex-1 bg-stone-200 h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full ${stat.color} transition-all duration-1000`} style={{ width: `${Math.min(100, (stat.amount / totalBudget) * 100)}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-stone-500 w-12 text-right">{stat.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center px-2">
                  <div className="text-left">
                    <h3 className={`text-xs font-black uppercase tracking-[0.5em] mb-1 ${isNightMode ? 'text-stone-100' : 'text-blue-900'}`}>Digital Wallet</h3>
                    <p className="text-[9px] font-bold text-stone-400">카드를 꾹 누르면 수정/삭제 가능</p>
                  </div>
                  <button onClick={() => {setIsAdding(!isAdding); setIsEditing(false); setNewTitle(''); setNewAmount('');}} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md ${isAdding ? 'bg-stone-200 text-stone-600' : (isNightMode ? 'bg-pink-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]' : 'bg-blue-600 text-white hover:scale-105')}`}>
                    {isAdding ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </button>
                </div>

                {isAdding && (
                  <form onSubmit={handleAddOrEditExpense} className={`p-6 rounded-[2.5rem] border shadow-xl animate-in zoom-in-95 duration-300 ${isNightMode ? 'bg-stone-900/90 border-stone-800' : 'bg-white border-blue-100'}`}>
                    <div className="flex items-center gap-2 mb-6">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isEditing ? 'bg-indigo-100 text-indigo-600' : 'bg-blue-100 text-blue-600'}`}>
                        {isEditing ? <Edit2 className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isNightMode ? 'text-stone-300' : 'text-blue-800'}`}>
                        {isEditing ? 'Edit Record' : 'Add New Record'}
                      </span>
                    </div>
                    <div className="space-y-4 text-left">
                      <input required type="text" placeholder="어디서 사용하셨나요?" className={`w-full border-none rounded-2xl px-5 py-4 text-xs font-bold focus:ring-2 outline-none transition-all ${isNightMode ? 'bg-stone-950 text-white focus:ring-pink-500 placeholder-stone-600' : 'bg-stone-50 text-stone-900 focus:ring-blue-300 placeholder-stone-400'}`} value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                      
                      <div className="grid grid-cols-5 gap-3">
                        <div className="col-span-3 relative">
                          <input required type="number" placeholder="금액 (TWD)" className={`w-full border-none rounded-2xl px-5 py-4 text-xs font-bold focus:ring-2 outline-none transition-all ${isNightMode ? 'bg-stone-950 text-white focus:ring-pink-500 placeholder-stone-600' : 'bg-stone-50 text-stone-900 focus:ring-blue-300 placeholder-stone-400'}`} value={newAmount} onChange={(e) => setNewAmount(e.target.value)} />
                          {newAmount && (
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-bold text-stone-400">
                              ≈ {Math.floor(newAmount * EXCHANGE_RATE).toLocaleString()}원
                            </span>
                          )}
                        </div>
                        <select className={`col-span-2 border-none rounded-2xl px-3 py-4 text-[10px] font-black uppercase appearance-none focus:ring-2 outline-none transition-all text-center ${isNightMode ? 'bg-stone-950 text-white focus:ring-pink-500' : 'bg-stone-50 text-stone-700 focus:ring-blue-300'}`} value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                          <option value="Food">Food 🍔</option>
                          <option value="Shopping">Shop 🛍️</option>
                          <option value="Tour">Tour 🎫</option>
                          <option value="Etc">Etc 💳</option>
                        </select>
                      </div>
                      
                      <button type="submit" className={`w-full text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-md transition-transform active:scale-95 mt-2 ${isNightMode ? 'bg-pink-600 hover:bg-pink-500' : 'bg-blue-600 hover:bg-blue-700'}`}>
                        {isEditing ? 'Update' : 'Save'}
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-4 pt-2">
                  {expenses.length === 0 ? (
                    <div className="w-full text-center py-16 opacity-30">
                      <Wallet className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-blue-800">No Expenses</p>
                    </div>
                  ) : (
                    expenses.map(exp => (
                      <CardVisual key={exp.id} exp={exp} />
                    ))
                  )}
                </div>
              </div>
            </section>
          )}
        </main>

        <footer className="mt-32 py-16 border-t border-stone-200/50 text-center relative group select-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] transition-all duration-700 group-hover:w-48 bg-stone-300/50" />
          
          <div className="flex flex-col items-center justify-center space-y-3 mt-6">
            <span className="text-[8px] font-black text-stone-400 tracking-[0.6em] uppercase">
              Exclusive Itinerary For Us
            </span>
            <div className="flex items-center gap-4">
              <span className="w-8 h-[1px] bg-stone-300/50" />
              <h2 className={`font-serif italic text-3xl tracking-wider pr-2 drop-shadow-sm ${isNightMode ? 'text-stone-300' : 'text-blue-900'}`}>
                Young Kwan
              </h2>
              <span className="w-8 h-[1px] bg-stone-300/50" />
            </div>
            <div className="flex flex-col items-center justify-center gap-1 mt-2">
              <p className={`text-[9px] font-black tracking-[0.8em] uppercase ml-2 px-4 py-1 rounded-full border ${isNightMode ? 'text-cyan-400 bg-cyan-950/30 border-cyan-900/50' : 'text-blue-600 bg-blue-50 border-blue-100'}`}>
                디렉터 최영관
              </p>
              <p className="text-[7px] font-bold text-stone-400 tracking-widest uppercase mt-1">
                © 2026 YK.C All rights reserved
              </p>
            </div>
          </div>
          
          <div className="flex justify-center gap-8 mt-10 opacity-30 filter grayscale transition-all duration-700 group-hover:opacity-60 group-hover:grayscale-0">
             <Landmark className={`w-4 h-4 ${isNightMode ? 'text-stone-400' : 'text-stone-600'}`} />
             <Plane className={`w-4 h-4 ${isNightMode ? 'text-cyan-400' : 'text-blue-600'}`} />
             <Heart className="w-4 h-4 text-pink-600 animate-pulse" />
          </div>
        </footer>
      </div>

      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-4 rounded-[3rem] z-[200] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border w-[90%] max-w-sm justify-between transition-colors duration-500 ${isNightMode ? 'bg-stone-900/90 backdrop-blur-2xl border-stone-800' : 'bg-white/90 backdrop-blur-2xl border-blue-50'}`}>
        {[
          { id: 'day1', num: '1', label: 'D1' },
          { id: 'day2', num: '2', label: 'D2' },
          { id: 'day3', num: '3', label: 'D3' },
          { id: 'checklist', icon: <CheckSquare className="w-5 h-5" />, label: 'Chk' },
          { id: 'budget', icon: <Wallet className="w-5 h-5" />, label: 'Pay' }
        ].map(nav => (
          <button
            key={nav.id}
            onClick={() => setActiveTab(nav.id)}
            className="group flex flex-col items-center gap-1.5"
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm relative ${
              activeTab === nav.id 
              ? (isNightMode ? 'bg-pink-600 text-white shadow-[0_10px_25px_rgba(236,72,153,0.3)] scale-105' : 'bg-blue-600 text-white shadow-[0_10px_25px_rgba(37,99,235,0.3)] scale-105')
              : (nav.id === 'budget' && isBudgetLow 
                 ? 'bg-red-500/20 text-red-500 animate-pulse border border-red-500/50' 
                 : (isNightMode ? 'bg-stone-800 text-stone-500 hover:bg-stone-700' : 'bg-white text-stone-400 hover:bg-blue-50'))
            }`}>
              {nav.num ? <span className="text-sm font-black">{nav.num}</span> : nav.icon}
              {activeTab === nav.id && <div className={`absolute -bottom-1 w-1 h-1 rounded-full ${isNightMode ? 'bg-pink-400' : 'bg-blue-600'}`} />}
            </div>
            <span className={`text-[7px] font-black tracking-widest transition-opacity duration-300 ${activeTab === nav.id ? (isNightMode ? 'opacity-100 text-pink-400' : 'opacity-100 text-blue-600') : 'opacity-0'}`}>
              {nav.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;