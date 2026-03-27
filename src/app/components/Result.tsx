import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ThumbsUp, ThumbsDown, MessageCircle, Link2, BarChart3 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MBTI_PROFILE_MAP, isMbtiType, type MbtiType } from '../mbti';

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

// Twitter X Logo Component
const TwitterXIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const BREAD_EMOJI_MAP: Record<string, string> = {
  크로와상: '🥐',
  '초코 크로와상': '🥐',
  식빵: '🍞',
  통밀빵: '🍞',
  버터롤: '🍞',
  바게트: '🥖',
  마늘바게트: '🥖',
  프레첼: '🥨',
  베이글: '🥯',
  샌드위치: '🥪',
  핫도그: '🌭',
  도넛: '🍩',
  컵케이크: '🧁',
  치즈케이크: '🍰',
  '생크림 케이크': '🎂',
  생크림케이크: '🎂',
  '딸기 케이크': '🍰',
  딸기케이크: '🍰',
};

const formatMatchLabel = (bread: string, mbti: MbtiType) => {
  const emoji = BREAD_EMOJI_MAP[bread] ?? '🥐';
  return `${bread} ${emoji}(${mbti})`;
};

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const kakaoJsKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

  const mbtiFromState = (location.state as { mbti?: string } | null)?.mbti;
  const mbtiFromStorage = sessionStorage.getItem('bread-mbti-result');
  const normalizedCandidate = (mbtiFromState ?? mbtiFromStorage ?? '').trim().toUpperCase();

  const mbti: MbtiType = isMbtiType(normalizedCandidate)
    ? normalizedCandidate
    : 'INTJ';

  const profile = MBTI_PROFILE_MAP[mbti];
  const shareText = `나는 ${mbti} ${profile.bread} 타입! 빵 MBTI 테스트 해보기`;
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';

  useEffect(() => {
    if (!kakaoJsKey) return;

    const initializeKakao = () => {
      if (!window.Kakao) return;
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(kakaoJsKey);
      }
    };

    if (window.Kakao) {
      initializeKakao();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js';
    script.async = true;
    script.onload = initializeKakao;
    document.body.appendChild(script);
  }, [kakaoJsKey]);

  const openShareWindow = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleKakaoShare = () => {
    if (!window.Kakao) {
      const fallbackUrl = `https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(shareUrl)}`;
      openShareWindow(fallbackUrl);
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
    <div className="min-h-screen bg-gradient-to-b from-[#FFF4E6] to-[#FFE8CC] pb-10">
      {/* Main Content */}
      <main className="px-6 pt-10">
        {/* Bread Image */}
        <div className="mb-8 flex justify-center">
          <div className="w-64 h-64 rounded-3xl overflow-hidden shadow-xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1751151856149-5ebf1d21586a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnklMjBiYWtlcnl8ZW58MXx8fHwxNzc0MjcyNjk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Croissant"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Result Title */}
        <h1 className="text-3xl font-bold text-[#D86A00] text-center mb-3">
          당신은 {profile.bread}
        </h1>
        
        {/* Short Description */}
        <p className="text-lg text-[#B87333] text-center mb-8">
          {profile.oneLine}
        </p>

        {/* MBTI Info Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="inline-block bg-[#FF8C42] text-white px-4 py-2 rounded-full font-bold mb-4">
            {mbti}
          </div>
          <p className="text-[#5A4A3A] leading-relaxed">
            {profile.description}
          </p>
        </div>

        {/* Match Section */}
        <div className="space-y-3 mb-8">
          {/* Good Match */}
          <div className="bg-white rounded-2xl p-5 shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FFE8CC] rounded-full flex items-center justify-center flex-shrink-0">
              <ThumbsUp size={24} className="text-[#FF8C42]" />
            </div>
            <div>
              <div className="text-sm text-[#B87333] mb-1">잘 맞는 빵</div>
              <div className="font-bold text-[#D86A00]">
                {profile.goodMatches
                  .map((match) => formatMatchLabel(match.bread, match.mbti))
                  .join(', ')}
              </div>
            </div>
          </div>

          {/* Bad Match */}
          <div className="bg-white rounded-2xl p-5 shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FFE8CC] rounded-full flex items-center justify-center flex-shrink-0">
              <ThumbsDown size={24} className="text-[#B87333]" />
            </div>
            <div>
              <div className="text-sm text-[#B87333] mb-1">안 맞는 빵</div>
              <div className="font-bold text-[#D86A00]">
                {profile.badMatches
                  .map((match) => formatMatchLabel(match.bread, match.mbti))
                  .join(', ')}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          {/* Share Section */}
          <div className="w-full">
            <p className="text-sm font-semibold text-[#D86A00] text-center mb-4">
              결과 공유하기
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
          <button className="w-full bg-[#FF8C42] hover:bg-[#FF7A1F] text-white px-8 py-4 rounded-full font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
            <BarChart3 size={20} />
            전체 유형 보러가기
          </button>

          <button 
            onClick={() => navigate('/')}
            className="w-full bg-white hover:bg-[#FFF4E6] text-[#FF8C42] border-2 border-[#FF8C42] px-8 py-4 rounded-full font-bold shadow-lg transition-all active:scale-95"
          >
            다시 테스트하기
          </button>
        </div>

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

        {/* Optional CTAs */}
        <div className="space-y-2">
          <button className="w-full bg-[#FFF4E6] hover:bg-white text-[#D86A00] px-6 py-3 rounded-xl font-semibold transition-all active:scale-98 border border-[#FFE8CC]">
            이 빵 사러 가기 🛒
          </button>
          <button className="w-full bg-[#FFF4E6] hover:bg-white text-[#D86A00] px-6 py-3 rounded-xl font-semibold transition-all active:scale-98 border border-[#FFE8CC]">
            근처 빵집 추천받기 📍
          </button>
        </div>
      </main>
    </div>
  );
}