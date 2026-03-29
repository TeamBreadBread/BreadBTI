import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ThumbsUp, ThumbsDown, MessageCircle, Link2, BarChart3 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MBTI_PROFILE_MAP, isMbtiType, type MbtiType } from '../mbti';
import INTJImage from '../../assets/INTJ.png';
import INTPImage from '../../assets/INTP.png';
import ENTJImage from '../../assets/ENTJ.png';
import ENTPImage from '../../assets/ENTP.png';
import INFJImage from '../../assets/INFJ.png';
import INFPImage from '../../assets/INFP.png';
import ENFJImage from '../../assets/ENFJ.png';
import ENFPImage from '../../assets/ENFP.png';
import ISTJImage from '../../assets/ISTJ.png';
import ISFJImage from '../../assets/ISFJ.png';
import ESTJImage from '../../assets/ESTJ.png';
import ESFJImage from '../../assets/ESFJ.png';
import ISTPImage from '../../assets/ISTP.png';
import ISFPImage from '../../assets/ISFP.png';
import ESTPImage from '../../assets/ESTP.png';
import ESFPImage from '../../assets/ESFP.png';

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

const MBTI_IMAGE_MAP: Record<MbtiType, string> = {
  INTJ: INTJImage,
  INTP: INTPImage,
  ENTJ: ENTJImage,
  ENTP: ENTPImage,
  INFJ: INFJImage,
  INFP: INFPImage,
  ENFJ: ENFJImage,
  ENFP: ENFPImage,
  ISTJ: ISTJImage,
  ISFJ: ISFJImage,
  ESTJ: ESTJImage,
  ESFJ: ESFJImage,
  ISTP: ISTPImage,
  ISFP: ISFPImage,
  ESTP: ESTPImage,
  ESFP: ESFPImage,
};

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const kakaoJsKey = import.meta.env.VITE_KAKAO_JS_KEY || import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

  const mbtiFromState = (location.state as { mbti?: string } | null)?.mbti;
  const mbtiFromStorage = sessionStorage.getItem('bread-mbti-result');
  const normalizedCandidate = (mbtiFromState ?? mbtiFromStorage ?? '').trim().toUpperCase();

  const mbti: MbtiType = isMbtiType(normalizedCandidate)
    ? normalizedCandidate
    : 'INTJ';

  const profile = MBTI_PROFILE_MAP[mbti];
  const mbtiImage = MBTI_IMAGE_MAP[mbti];
  const shareText = `나는 ${mbti} ${profile.bread} 타입! 빵 MBTI 테스트 해보기`;
  const shareUrl = 'https://breadbti.vercel.app';
  const shareImageUrl = mbtiImage.startsWith('http') ? mbtiImage : `${shareUrl}${mbtiImage}`;

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
      objectType: 'feed',
      content: {
        title: `${mbti} ${profile.bread} 타입 결과`,
        description: shareText,
        imageUrl: shareImageUrl,
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
      buttons: [
        {
          title: '테스트 하러가기',
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
      ],
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
    <div className="min-h-screen bg-gradient-to-b from-[#FFF4E6] to-[#FFE8CC] pb-10 lg:pb-20">
      {/* Main Content */}
      <main className="mx-auto w-full max-w-6xl px-6 pt-10 lg:px-10 lg:pt-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:gap-10">
          <section className="rounded-[2rem] bg-white/50 p-8 shadow-lg backdrop-blur-sm lg:p-6">
            {/* Bread Image */}
            <div className="mb-0 flex items-center justify-center">
              <div className="h-72 w-72 rounded-3xl overflow-hidden lg:h-[26rem] lg:w-[26rem]">
                <ImageWithFallback
                  src={mbtiImage}
                  alt={`${mbti} bread result image`}
                  className="mx-auto h-full w-full object-contain"
                />
              </div>
            </div>

            {/* Result Title */}
            <h1 className="text-3xl font-bold text-[#D86A00] text-center mb-3 lg:text-4xl">
              당신은 {profile.bread}
            </h1>

            {/* Short Description */}
            <p className="text-lg text-[#B87333] text-center mb-8 lg:text-xl">
              {profile.oneLine}
            </p>

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
          </section>

          <section>
            {/* MBTI Info Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 lg:p-8">
              <div className="inline-block bg-[#FF8C42] text-white px-4 py-2 rounded-full font-bold mb-4 text-lg">
                {mbti}
              </div>
              <p className="text-[#5A4A3A] leading-relaxed lg:text-lg">
                {profile.description}
              </p>
            </div>

            {/* Match Section */}
            <div className="space-y-3 mb-8 lg:space-y-4">
              {/* Good Match */}
              <div className="bg-white rounded-2xl p-5 shadow-lg flex items-center gap-4 lg:p-6">
                <div className="w-12 h-12 bg-[#FFE8CC] rounded-full flex items-center justify-center flex-shrink-0 lg:w-14 lg:h-14">
                  <ThumbsUp size={24} className="text-[#FF8C42]" />
                </div>
                <div>
                  <div className="text-sm text-[#B87333] mb-1">잘 맞는 빵</div>
                  <div className="font-bold text-[#D86A00] lg:text-lg">
                    {profile.goodMatches
                      .map((match) => formatMatchLabel(match.bread, match.mbti))
                      .join(', ')}
                  </div>
                </div>
              </div>

              {/* Bad Match */}
              <div className="bg-white rounded-2xl p-5 shadow-lg flex items-center gap-4 lg:p-6">
                <div className="w-12 h-12 bg-[#FFE8CC] rounded-full flex items-center justify-center flex-shrink-0 lg:w-14 lg:h-14">
                  <ThumbsDown size={24} className="text-[#B87333]" />
                </div>
                <div>
                  <div className="text-sm text-[#B87333] mb-1">안 맞는 빵</div>
                  <div className="font-bold text-[#D86A00] lg:text-lg">
                    {profile.badMatches
                      .map((match) => formatMatchLabel(match.bread, match.mbti))
                      .join(', ')}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <button className="w-full bg-[#FF8C42] hover:bg-[#FF7A1F] text-white px-8 py-4 rounded-full font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 lg:text-lg">
                <BarChart3 size={20} />
                전체 유형 보러가기
              </button>

              <button
                onClick={() => navigate('/')}
                className="w-full bg-white hover:bg-[#FFF4E6] text-[#FF8C42] border-2 border-[#FF8C42] px-8 py-4 rounded-full font-bold shadow-lg transition-all active:scale-95 lg:text-lg"
              >
                다시 테스트하기
              </button>
            </div>

            {/* Optional CTAs */}
            <div className="space-y-2">
              <button className="w-full bg-[#FFF4E6] hover:bg-white text-[#D86A00] px-6 py-3 rounded-xl font-semibold transition-all active:scale-98 border border-[#FFE8CC] lg:py-4">
                이 빵 사러 가기 🛒
              </button>
              <button className="w-full bg-[#FFF4E6] hover:bg-white text-[#D86A00] px-6 py-3 rounded-xl font-semibold transition-all active:scale-98 border border-[#FFE8CC] lg:py-4">
                근처 빵집 추천받기 📍
              </button>
            </div>
          </section>
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

      </main>
    </div>
  );
}