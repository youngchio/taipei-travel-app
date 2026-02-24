<!DOCTYPE html>
<html class="dark" lang="ko"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Taiwan Travel App Home Variant 2</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script>
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#137fec",
                        "background-light": "#f6f7f8",
                        "background-dark": "#101922",
                        "neutral-dark": "#1c2630",
                        "neutral-border": "#2c3945",
                    },
                    fontFamily: {
                        "display": ["Plus Jakarta Sans", "sans-serif"]
                    },
                    borderRadius: { "DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "full": "9999px" },
                },
            },
        }
    </script>
<style>
        body {
            min-height: max(884px, 100dvh);
        }
        .pb-safe {
            padding-bottom: env(safe-area-inset-bottom, 20px);
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-slate-100 min-h-screen flex flex-col overflow-x-hidden">
<header class="absolute top-0 left-0 w-full z-50 px-4 py-3 flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-white drop-shadow-md" style="font-size: 28px;">menu</span>
</div>
<h1 class="text-lg font-bold tracking-tight text-center flex-1 text-white drop-shadow-md">타이베이</h1>
<div class="flex items-center gap-3">
<button class="relative rounded-full overflow-hidden w-9 h-9 border border-white/30 backdrop-blur-sm">
<img alt="User Profile Avatar" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuaGJnu4KE4QefcmAkGh4A4vBZmZboinSSZprZncuONgaGzS0Xb2oflN5mtaiNWtI1IewzOcILocPaHAISOX95iMjNfi_KAX96W0v1RHvespcLh6F5FihNGfSW76c0M_Elw5XWc075PXmTabUk0kgCxHuUMZ225p5kkW8HjPB0Cg70hhM8xm_RFH7XKezwVH7CGtRAFmA7oukT5HpZVN-CtvQcYuLqN8oNTCGobtd97G-i6gCH448f5rfu1O4d1GJyd_tb3p04pBA"/>
</button>
</div>
</header>
<main class="flex-1 w-full pb-24">
<section class="relative w-full h-[420px] mb-6">
<div class="absolute inset-0">
<img alt="Taipei 101 Skyline Night View" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmDzUbISGqVm2AKgAwJXr2SgkfbAdILRWaPkQ1_hDz-i_icuQJBfHrgYxfjGX7WQeEHYIeCDSxREhxB2dS72BlPeFMGyy26SkkhbPb5gAKOt0s593A8Tl8BPphkAgRB4Jliv6e6DUnqX1mZ7_cHm9KKZuZW8Xs9KlF4RZrEECxGMbVmSR8BPev2bpDBe2zwehro-ZMmPiSCgEAl5saLTySkD4hnJ3-ME6WNTan-3_zboOe3NtlJRdSlE0yTsxDMMDq89dMatoGQnI"/>
<div class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background-light dark:to-background-dark"></div>
</div>
<div class="relative z-10 h-full flex flex-col justify-end px-4 pb-8 items-center text-center">
<h2 class="text-3xl font-bold leading-tight mb-6 text-white drop-shadow-lg">
                    계획은 가볍게,<br/>
<span class="text-primary-300">타이베이는 깊게</span>
</h2>
<label class="flex items-center gap-3 w-full h-12 bg-white/90 dark:bg-neutral-dark/90 backdrop-blur-md rounded-xl px-4 shadow-lg border border-white/20 dark:border-neutral-border focus-within:ring-2 focus-within:ring-primary/50 transition-all max-w-sm">
<span class="material-symbols-outlined text-slate-400">search</span>
<input class="w-full bg-transparent border-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-0 p-0 text-base" placeholder="어떤 경험을 찾고 계신가요?" type="text"/>
</label>
</div>
</section>
<section class="px-4 mb-8 overflow-x-auto scrollbar-hide">
<div class="flex gap-3 min-w-max">
<button class="px-4 py-2 rounded-full bg-primary text-white font-medium text-sm shadow-md shadow-primary/20 whitespace-nowrap">
                    전체
                </button>
<button class="px-4 py-2 rounded-full bg-white dark:bg-neutral-dark text-slate-600 dark:text-slate-300 font-medium text-sm border border-slate-100 dark:border-neutral-border whitespace-nowrap hover:bg-slate-50 dark:hover:bg-neutral-border/50 transition-colors">
                    맛집 &amp; 카페
                </button>
<button class="px-4 py-2 rounded-full bg-white dark:bg-neutral-dark text-slate-600 dark:text-slate-300 font-medium text-sm border border-slate-100 dark:border-neutral-border whitespace-nowrap hover:bg-slate-50 dark:hover:bg-neutral-border/50 transition-colors">
                    문화 예술
                </button>
<button class="px-4 py-2 rounded-full bg-white dark:bg-neutral-dark text-slate-600 dark:text-slate-300 font-medium text-sm border border-slate-100 dark:border-neutral-border whitespace-nowrap hover:bg-slate-50 dark:hover:bg-neutral-border/50 transition-colors">
                    자연 힐링
                </button>
<button class="px-4 py-2 rounded-full bg-white dark:bg-neutral-dark text-slate-600 dark:text-slate-300 font-medium text-sm border border-slate-100 dark:border-neutral-border whitespace-nowrap hover:bg-slate-50 dark:hover:bg-neutral-border/50 transition-colors">
                    액티비티
                </button>
</div>
</section>
<section class="px-4 mb-8">
<div class="flex items-center justify-between mb-4">
<h3 class="text-xl font-bold text-slate-900 dark:text-slate-100">내 주변 핫스팟</h3>
<button class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-neutral-border/50 text-slate-500">
<span class="material-symbols-outlined">my_location</span>
</button>
</div>
<div class="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md border border-slate-100 dark:border-neutral-border bg-slate-200 dark:bg-neutral-800">
<div class="absolute inset-0 bg-[#e5e3df] dark:bg-[#242f3e] opacity-80">
<div class="absolute top-1/4 left-0 w-full h-[2px] bg-white/50"></div>
<div class="absolute top-2/3 left-0 w-full h-[3px] bg-white/50"></div>
<div class="absolute top-0 left-1/3 h-full w-[2px] bg-white/50"></div>
<div class="absolute top-0 right-1/4 h-full w-[4px] bg-white/50"></div>
<svg class="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 400 300">
<path d="M-10,150 C100,120 150,200 410,180" fill="none" opacity="0.6" stroke="#aadaff" stroke-width="20"></path>
</svg>
</div>
<div class="absolute top-[30%] left-[40%] flex flex-col items-center">
<div class="bg-primary text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg mb-1 whitespace-nowrap">딘타이펑 본점</div>
<span class="material-symbols-outlined text-primary text-3xl drop-shadow-md" style="font-variation-settings: 'FILL' 1">location_on</span>
</div>
<div class="absolute top-[60%] left-[70%] flex flex-col items-center">
<span class="material-symbols-outlined text-rose-500 text-3xl drop-shadow-md" style="font-variation-settings: 'FILL' 1">location_on</span>
</div>
<div class="absolute top-[20%] right-[15%] flex flex-col items-center">
<div class="bg-white dark:bg-neutral-dark text-slate-900 dark:text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg mb-1 whitespace-nowrap border border-slate-100 dark:border-neutral-border">융캉제 거리</div>
<div class="w-3 h-3 bg-slate-900 dark:bg-white rounded-full shadow-sm ring-2 ring-white dark:ring-neutral-dark"></div>
</div>
<div class="absolute bottom-4 left-1/2 -translate-x-1/2">
<button class="bg-white dark:bg-neutral-dark text-slate-900 dark:text-white font-medium text-sm px-5 py-2.5 rounded-full shadow-lg border border-slate-100 dark:border-neutral-border flex items-center gap-2 hover:scale-105 transition-transform">
<span class="material-symbols-outlined text-lg">map</span>
                        지도로 보기
                    </button>
</div>
</div>
</section>
<section class="mb-8">
<div class="flex items-center justify-between px-4 mb-4">
<h3 class="text-xl font-bold text-slate-900 dark:text-slate-100">추천 여행 코스</h3>
<a class="text-primary text-sm font-medium hover:underline" href="#">모두 보기</a>
</div>
<div class="flex overflow-x-auto gap-4 px-4 pb-4 snap-x snap-mandatory scrollbar-hide">
<div class="snap-start shrink-0 w-[280px] group cursor-pointer">
<div class="relative h-[360px] rounded-xl overflow-hidden mb-3 shadow-lg">
<img alt="Jiufen Old Street with red lanterns at night" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI9vcxZi0rJzOJb0Hf_epPrPTWeiPNVc8if8IA3LyDVxCvGgzvm8SdsVWrCK-x9Dse3xaJvLpXn0JDMdTnkwFw2anyHc_ayTdXv4vk0bUK71ezobndPJArDqt3B6256XDB-C40iKtSklWehmD7kN--0HiBC4RQDbRUjYxH4JE_WJND-DdtKXeklaMwD54KTVyb-aBfbZebRqX-FgwRKdQroqjcjNInYtSlolEtEL3DSYjI80hwWD_mazYJtWewjOP4kJ_cnpVmVGg"/>
<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
<div class="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
                            인기 1위
                        </div>
<div class="absolute bottom-4 left-4 right-4">
<h4 class="text-white text-lg font-bold mb-1">지우펀의 저녁과 찻집</h4>
<p class="text-white/80 text-sm line-clamp-2">홍등이 빛나는 산골 마을의 마법 같은 분위기를 느껴보세요.</p>
</div>
</div>
<div class="flex justify-between items-center px-1">
<div class="flex items-center gap-1 text-yellow-500">
<span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1">star</span>
<span class="text-slate-900 dark:text-slate-100 text-sm font-bold">4.9</span>
<span class="text-slate-500 text-xs">(128)</span>
</div>
<span class="text-primary font-bold">₩55,000</span>
</div>
</div>
<div class="snap-start shrink-0 w-[280px] group cursor-pointer">
<div class="relative h-[360px] rounded-xl overflow-hidden mb-3 shadow-lg">
<img alt="Taipei 101 tower rising above the city" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmDzUbISGqVm2AKgAwJXr2SgkfbAdILRWaPkQ1_hDz-i_icuQJBfHrgYxfjGX7WQeEHYIeCDSxREhxB2dS72BlPeFMGyy26SkkhbPb5gAKOt0s593A8Tl8BPphkAgRB4Jliv6e6DUnqX1mZ7_cHm9KKZuZW8Xs9KlF4RZrEECxGMbVmSR8BPev2bpDBe2zwehro-ZMmPiSCgEAl5saLTySkD4hnJ3-ME6WNTan-3_zboOe3NtlJRdSlE0yTsxDMMDq89dMatoGQnI"/>
<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
<div class="absolute bottom-4 left-4 right-4">
<h4 class="text-white text-lg font-bold mb-1">타이베이 101 야경 투어</h4>
<p class="text-white/80 text-sm line-clamp-2">도시를 한눈에 내려다보는 시크릿 전망대 입장권.</p>
</div>
</div>
<div class="flex justify-between items-center px-1">
<div class="flex items-center gap-1 text-yellow-500">
<span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1">star</span>
<span class="text-slate-900 dark:text-slate-100 text-sm font-bold">4.8</span>
<span class="text-slate-500 text-xs">(84)</span>
</div>
<span class="text-primary font-bold">₩32,000</span>
</div>
</div>
<div class="snap-start shrink-0 w-[280px] group cursor-pointer">
<div class="relative h-[360px] rounded-xl overflow-hidden mb-3 shadow-lg">
<img alt="Taiwanese street food dumplings" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMKigBOnNdJC1Yzdkb-3H8jFbI8e4Y9YXAQoawSkgX4DXk44hutBqTzPePkYefGAGPcRw0XuTqkkxUV1JHLhfIRIB4exOeCAzRxWgv_Y4rVl7LPLBQJeOaifm0x_LbExTWrrRRlsII7mEVz3b2e-2ghnmips8Z0ajcy1umZ130Mnq4_-tmGbBMhJyx1kJH33f7_gLg0Prffkr-Ot9opK6t_rAOBnPVglpF-tJAiJVh-nRjffYOQrCpaPVW05DlnEfvjgmKiVwZOXk"/>
<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
<div class="absolute bottom-4 left-4 right-4">
<h4 class="text-white text-lg font-bold mb-1">미슐랭 미식 가이드</h4>
<p class="text-white/80 text-sm line-clamp-2">현지 전문가와 함께하는 최고의 딤섬 맛집 투어.</p>
</div>
</div>
<div class="flex justify-between items-center px-1">
<div class="flex items-center gap-1 text-yellow-500">
<span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1">star</span>
<span class="text-slate-900 dark:text-slate-100 text-sm font-bold">5.0</span>
<span class="text-slate-500 text-xs">(210)</span>
</div>
<span class="text-primary font-bold">₩48,000</span>
</div>
</div>
</div>
</section>
<section class="px-4 mb-6">
<h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">지금 뜨는 장소</h3>
<div class="grid grid-cols-2 gap-4">
<div class="bg-white dark:bg-neutral-dark rounded-xl p-3 shadow-sm border border-slate-100 dark:border-neutral-border">
<div class="relative h-32 rounded-lg overflow-hidden mb-3">
<img alt="Beitou Hot Springs" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHacHkFrrtoPxt44_rq4qsxizVL10jzcBwo8GRUfmWX7wOvJot41IeLhwzcTO4nw5X0d4-e3QIq70Yj55BltSDWj7HmCaVuBw31FE5XqgVRAFv6uFEPDp6hTqZkeKCQtAG8LIfKC5dX9GJMgzr9xDkaRBjiEkV-h_XlHt8psDcFu6e5Ms_m1ZcV5UDCZwge4BzUUcID8BcWg07btBNHtQ1sEb0lAmPnA75RgR6cD0k2G5g9VGUatDpzAfrFY4PQ3ZT8PiaACbqAX4"/>
<div class="absolute top-2 right-2 bg-black/50 rounded-full p-1">
<span class="material-symbols-outlined text-white text-sm">favorite</span>
</div>
</div>
<h4 class="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">베이터우 온천</h4>
<p class="text-xs text-slate-500 dark:text-slate-400">도심 속 힐링</p>
</div>
<div class="bg-white dark:bg-neutral-dark rounded-xl p-3 shadow-sm border border-slate-100 dark:border-neutral-border">
<div class="relative h-32 rounded-lg overflow-hidden mb-3">
<img alt="National Palace Museum" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfPHiSlfftb8Tf8Tv2EfOcGOXGrAElfX7LhfuEbflpDyq--y_om1tioaW2EYSDbewVEC0vuktK7g995ONdVDSdFQCQHucb6XVwxM9XgREyh_NtK_zfFrfZQhRJpOymNWHhIpn8samL6rA5HIexoNE2UPO89HDaJdrsvcdAlIw2tOuoO24rxXBjF95tstvYoH_ekqbtOO9foveMTFQCkoSJKQJ2OQ3mOkUnHRa7mDe-zZqYE1Hwv7cQEgWnrOAakt_q-LNepF5-G6s"/>
<div class="absolute top-2 right-2 bg-black/50 rounded-full p-1">
<span class="material-symbols-outlined text-white text-sm">favorite</span>
</div>
</div>
<h4 class="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">국립 고궁 박물관</h4>
<p class="text-xs text-slate-500 dark:text-slate-400">역사와 예술</p>
</div>
</div>
</section>
</main>
<nav class="fixed bottom-0 left-0 w-full bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-slate-200 dark:border-neutral-border pb-safe pt-2 px-2 z-50">
<div class="flex justify-around items-center h-16">
<a class="flex flex-col items-center justify-center w-full gap-1 text-primary" href="#">
<span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1">home</span>
<span class="text-[10px] font-medium">홈</span>
</a>
<a class="flex flex-col items-center justify-center w-full gap-1 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition-colors" href="#">
<span class="material-symbols-outlined text-2xl">explore</span>
<span class="text-[10px] font-medium">탐색</span>
</a>
<a class="flex flex-col items-center justify-center w-full gap-1 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition-colors" href="#">
<div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center -mt-6 shadow-lg shadow-primary/30 border-4 border-background-light dark:border-background-dark">
<span class="material-symbols-outlined text-white text-2xl">add</span>
</div>
</a>
<a class="flex flex-col items-center justify-center w-full gap-1 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition-colors" href="#">
<span class="material-symbols-outlined text-2xl">bookmark</span>
<span class="text-[10px] font-medium">저장</span>
</a>
<a class="flex flex-col items-center justify-center w-full gap-1 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition-colors" href="#">
<span class="material-symbols-outlined text-2xl">person</span>
<span class="text-[10px] font-medium">프로필</span>
</a>
</div>
</nav>

</body></html>