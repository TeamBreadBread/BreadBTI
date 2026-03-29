import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { MessageCircle, Link2 } from 'lucide-react';
import breadCharacter from '../../assets/BreadBTI_home.png';

// X(트위터) 아이콘은 lucide에 없어 SVG로 직접 정의
const TwitterXIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// 하단 바운스 데코: 각 이모지의 위치, 크기, 시작 지연, 애니메이션 길이
const bouncingBreads = [
  { name: '🥞', left: '6%', size: '3.25rem', delay: '0s', duration: '2.4s' },
  { name: '🥐', left: '17%', size: '3.25rem', delay: '0.2s', duration: '2.1s' },
  { name: '🍞', left: '28%', size: '3.25rem', delay: '0.4s', duration: '2.6s' },
  { name: '🥖', left: '39%', size: '3.25rem', delay: '0.1s', duration: '2.3s' },
  { name: '🥨', left: '50%', size: '3.25rem', delay: '0.5s', duration: '2.7s' },
  { name: '🥪', left: '61%', size: '3.25rem', delay: '0.3s', duration: '2.2s' },
  { name: '🍰', left: '72%', size: '3.25rem', delay: '0.6s', duration: '2.5s' },
  { name: '🍩', left: '83%', size: '3.25rem', delay: '0.8s', duration: '2.4s' },
  { name: '🍪', left: '94%', size: '3.25rem', delay: '0.7s', duration: '2.6s' },
];

declare global {
  interface Window {
    Kakao?: {
      isInitialized: () => boolean;
      init: (key: string) => void;
      Share?: {
        sendDefault: (options: Record<string, unknown>) => void;
      };
      Link?: {
        sendDefault: (options: Record<string, unknown>) => void;
      };
    };
  }
}

export default function Landing() {
  // 시작 버튼 클릭 시 질문 페이지로 이동
  const navigate = useNavigate();
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const kakaoJsKey = import.meta.env.VITE_KAKAO_JS_KEY || import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

  const shareText = '나는 어떤 빵일까? MBTI 테스트 해보기';
  const shareUrl = 'https://breadbti.vercel.app';

  useEffect(() => {
    if (!kakaoJsKey) {
      console.error('카카오 JS 키 없음');
      return;
    }

    const initializeKakao = () => {
      if (!window.Kakao) return;
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(kakaoJsKey);
      }

      console.log('Kakao initialized:', window.Kakao.isInitialized());
      console.log('Origin:', window.location.origin);
      console.log('Key:', kakaoJsKey);
    };

    if (window.Kakao) {
      initializeKakao();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js';
    script.async = true;
    script.onload = initializeKakao;
    script.onerror = () => {
      console.error('카카오 SDK 스크립트 로드 실패');
    };
    document.body.appendChild(script);
  }, [kakaoJsKey]);

  const openShareWindow = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleKakaoShare = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      alert('카카오 SDK 초기화가 아직 안 됐어요.');
      return;
    }

    const payload = {
      objectType: 'text',
      text: shareText,
      link: {
        mobileWebUrl: shareUrl,
        webUrl: shareUrl,
      },
      buttonTitle: '테스트 하러가기',
    };

    if (window.Kakao.Share?.sendDefault) {
      window.Kakao.Share.sendDefault(payload);
      return;
    }

    if (window.Kakao.Link?.sendDefault) {
      window.Kakao.Link.sendDefault(payload);
      return;
    }

    const fallbackUrl = `https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(shareUrl)}`;
    openShareWindow(fallbackUrl);
  };

  const handleTwitterShare = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    openShareWindow(twitterShareUrl);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const tempInput = document.createElement('textarea');
      tempInput.value = shareUrl;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
    }

    setIsCopyModalOpen(true);
  };

  return (
    // relative + overflow-hidden: 하단 이모지 애니메이션을 안전하게 클리핑
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#FFF4E6] to-[#FFE8CC] flex flex-col">
      {/* 상단 브랜드 라벨 */}
      <header className="p-5 text-center lg:py-8">
        <div className="text-xs font-semibold text-[#FF8C42] lg:text-sm">
          BREAD MBTI
        </div>
      </header>

      {/* 메인 컨텐츠: 제목, 대표 이미지, CTA, 공유 버튼 */}
      <main className="flex-1 px-6 pb-16 lg:px-10 lg:pb-24">
        <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col items-center justify-center gap-10 lg:grid lg:grid-cols-2 lg:gap-14">
          <section className="order-1 flex w-full max-w-xl flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
            {/* 랜딩 메인 카피 */}
            <h1 className="text-5xl font-black text-[#D86A00] leading-tight lg:text-7xl">
              나는<br />어떤 빵일까?
            </h1>

            {/* 보조 설명 */}
            <p className="mt-3 text-base text-[#B87333] lg:text-xl">
              MBTI로 알아보는 나의 빵 성격
            </p>

            {/* 핵심 액션 버튼 */}
            <button
              onClick={() => navigate('/question')}
              className="mt-8 hidden bg-[#FF8C42] hover:bg-[#FF7A10] active:scale-95 text-white px-12 py-4 rounded-full font-bold shadow-lg transition-all lg:inline-flex lg:px-16 lg:py-5 lg:text-lg"
            >
              테스트 시작하기
            </button>

            {/* 신뢰도 보강용 참여자 수 */}
            <div className="mt-4 hidden text-sm text-[#B87333] lg:block lg:text-base">
              참여자수 | 105,789명
            </div>

            {/* 공유 섹션: 카카오/엑스/링크 아이콘 버튼 */}
            <div className="mt-10 hidden w-full max-w-xs lg:block lg:max-w-sm">
              <p className="text-sm font-semibold text-[#D86A00] text-center mb-4 lg:text-left">
                테스트 공유하기
              </p>
              <div className="flex gap-3 justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={handleKakaoShare}
                  className="flex items-center justify-center bg-[#FEE500] hover:bg-[#FDD000] w-12 h-12 rounded-full transition-all active:scale-95 shadow-md"
                >
                  <MessageCircle size={20} />
                </button>
                <button
                  type="button"
                  onClick={handleTwitterShare}
                  className="flex items-center justify-center bg-black hover:bg-gray-800 text-white w-12 h-12 rounded-full transition-all active:scale-95 shadow-md"
                >
                  <TwitterXIcon />
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex items-center justify-center bg-white hover:bg-gray-50 border-2 border-[#FF8C42] text-[#FF8C42] w-12 h-12 rounded-full transition-all active:scale-95 shadow-md"
                >
                  <Link2 size={20} />
                </button>
              </div>
            </div>
          </section>

          {/* 대표 빵 캐릭터 이미지: 부드럽게 떠오르는 히어로 모션 */}
          <section className="order-2 flex w-full justify-center lg:order-2 lg:justify-end">
            <div className="hero-wrap w-full max-w-md lg:max-w-xl">
              <div className="hero-shadow" />
              <img
                src={breadCharacter}
                alt="Bread Character"
                className="hero-image mb-0 block w-full h-auto"
              />
            </div>
          </section>

          <section className="order-3 flex w-full max-w-xs flex-col items-center lg:hidden">
            <button
              onClick={() => navigate('/question')}
              className="w-full bg-[#FF8C42] hover:bg-[#FF7A10] active:scale-95 text-white px-12 py-4 rounded-full font-bold shadow-lg transition-all"
            >
              테스트 시작하기
            </button>

            <div className="mt-4 text-sm text-[#B87333]">
              참여자수 | 105,789명
            </div>

            <div className="mt-8 w-full">
              <p className="text-sm font-semibold text-[#D86A00] text-center mb-4">
                테스트 공유하기
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleKakaoShare}
                  className="flex items-center justify-center bg-[#FEE500] hover:bg-[#FDD000] w-12 h-12 rounded-full transition-all active:scale-95 shadow-md"
                >
                  <MessageCircle size={20} />
                </button>
                <button
                  type="button"
                  onClick={handleTwitterShare}
                  className="flex items-center justify-center bg-black hover:bg-gray-800 text-white w-12 h-12 rounded-full transition-all active:scale-95 shadow-md"
                >
                  <TwitterXIcon />
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex items-center justify-center bg-white hover:bg-gray-50 border-2 border-[#FF8C42] text-[#FF8C42] w-12 h-12 rounded-full transition-all active:scale-95 shadow-md"
                >
                  <Link2 size={20} />
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {isCopyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
          <div className="w-full max-w-xs rounded-2xl bg-white p-5 text-center shadow-xl">
            <p className="text-base font-semibold text-[#D86A00]">
              링크가 복사되었습니다.
            </p>
            <button
              type="button"
              onClick={() => setIsCopyModalOpen(false)}
              className="mt-4 w-full rounded-xl bg-[#FF8C42] py-2.5 font-bold text-white hover:bg-[#FF7A10]"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* Bottom Hint */}
      <footer className="pb-10 text-center">
      </footer>

      {/* 화면 하단 데코: 이모지를 반복 바운스시켜 생동감 추가 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 lg:h-52">
        {bouncingBreads.map((bread) => (
          <div
            key={bread.name}
            className="absolute bottom-[-42px] -translate-x-1/2"
            style={{ left: bread.left }}
          >
            <div
              className="bread-bounce leading-none"
              style={{
                fontSize: bread.size,
                // 각 이모지별 타이밍을 다르게 줘서 리듬감 형성
                animationDelay: bread.delay,
                animationDuration: bread.duration,
              }}
            >
              {bread.name}
            </div>
          </div>
        ))}
      </div>

      {/* 컴포넌트 전용 애니메이션 스타일 */}
      <style>{`
        .hero-wrap {
          position: relative;
        }

        .hero-image {
          position: relative;
          z-index: 2;
          transform-origin: center bottom;
          animation: heroFloat 3.6s ease-in-out infinite;
          will-change: transform;
        }

        .hero-shadow {
          position: absolute;
          left: 50%;
          bottom: -14px;
          z-index: 1;
          width: 68%;
          height: 16px;
          border-radius: 999px;
          background: rgba(145, 82, 24, 0.25);
          filter: blur(8px);
          transform: translateX(-50%);
          animation: heroShadow 3.6s ease-in-out infinite;
          will-change: transform, opacity;
        }

        .bread-bounce {
          animation-name: breadPop;
          animation-timing-function: cubic-bezier(0.2, 0.9, 0.3, 1);
          animation-iteration-count: infinite;
          will-change: transform;
        }

        /* 대표 이미지: 위아래로 떠오르며 아주 살짝 회전 */
        @keyframes heroFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-12px) rotate(-0.8deg) scale(1.01);
          }
          50% {
            transform: translateY(-18px) rotate(0.6deg) scale(1.015);
          }
          75% {
            transform: translateY(-10px) rotate(-0.4deg) scale(1.005);
          }
        }

        /* 떠오를 때 그림자는 작고 옅어지고, 내려오면 다시 진해짐 */
        @keyframes heroShadow {
          0%,
          100% {
            opacity: 0.24;
            transform: translateX(-50%) scale(1);
          }
          50% {
            opacity: 0.14;
            transform: translateX(-50%) scale(0.88);
          }
        }

        /* 아래에서 위로 통통 튀는 모션 */
        @keyframes breadPop {
          0%,
          100% {
            /* 바닥 기준 원위치 */
            transform: translateY(5px) scale(1);
          }
          25% {
            /* 1차 크게 상승 (위로 이동) */
            transform: translateY(-100px) scale(1.04);
          }
          40% {
            /* 1차 하강 후 반동 준비 (아래로 복귀) */
            transform: translateY(-10px) scale(0.98);
          }
          60% {
            /* 2차 재상승 (위로 다시 튐) */
            transform: translateY(-50px) scale(1.02);
          }
          80% {
            /* 착지 직전 (아래로 거의 복귀) */
            transform: translateY(-5px) scale(0.99);
          }
        }

        /* 모션 최소화 환경에서는 애니메이션 비활성화 */
        @media (prefers-reduced-motion: reduce) {
          .hero-image,
          .hero-shadow,
          .bread-bounce {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
