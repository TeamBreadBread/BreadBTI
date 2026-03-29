import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MessageCircle, Link2 } from 'lucide-react';
import breadCharacter from '../../assets/BreadBTI_home.png';

// Twitter X Logo Component
const TwitterXIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const allResults = [
  { rank: 1, bread: '도넛', emoji: '🍩', mbti: 'ENFP', count: 15234, percentage: 14.4 },
  { rank: 2, bread: '크로와상', emoji: '🥐', mbti: 'INTJ', count: 12458, percentage: 11.8 },
  { rank: 3, bread: '바게트', emoji: '🥖', mbti: 'ENTJ', count: 10892, percentage: 10.3 },
  { rank: 4, bread: '컵케이크', emoji: '🧁', mbti: 'INFP', count: 9876, percentage: 9.3 },
  { rank: 5, bread: '베이글', emoji: '🥯', mbti: 'ISFJ', count: 9234, percentage: 8.7 },
  { rank: 6, bread: '딸기 케이크', emoji: '🍓', mbti: 'ESFP', count: 8765, percentage: 8.3 },
  { rank: 7, bread: '치즈케이크', emoji: '🍰', mbti: 'INFJ', count: 8234, percentage: 7.8 },
  { rank: 8, bread: '프레첼', emoji: '🥨', mbti: 'ENTP', count: 7543, percentage: 7.1 },
  { rank: 9, bread: '초코 크로와상', emoji: '🥐', mbti: 'ISFP', count: 6892, percentage: 6.5 },
  { rank: 10, bread: '버터롤', emoji: '🍞', mbti: 'ESFJ', count: 5876, percentage: 5.6 },
  { rank: 11, bread: '식빵', emoji: '🍞', mbti: 'INTP', count: 4532, percentage: 4.3 },
  { rank: 12, bread: '통밀빵', emoji: '🍞', mbti: 'ISTJ', count: 3456, percentage: 3.3 },
  { rank: 13, bread: '생크림 케이크', emoji: '🎂', mbti: 'ENFJ', count: 2345, percentage: 2.2 },
  { rank: 14, bread: '핫도그', emoji: '🌭', mbti: 'ESTP', count: 1876, percentage: 1.8 },
  { rank: 15, bread: '샌드위치', emoji: '🥪', mbti: 'ISTP', count: 1234, percentage: 1.2 },
  { rank: 16, bread: '마늘바게트', emoji: '🥖', mbti: 'ESTJ', count: 987, percentage: 0.9 },
];

export default function AllResults() {
  const navigate = useNavigate();
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const kakaoJsKey = import.meta.env.VITE_KAKAO_JS_KEY || import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

  const shareText = '빵 MBTI 테스트 - 전체 유형 순위 보기';
  const shareUrl = 'https://breadbti.vercel.app/totalresult';
  const shareImageUrl = breadCharacter.startsWith('http') ? breadCharacter : `https://breadbti.vercel.app${breadCharacter}`;

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
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      alert('카카오 SDK 초기화가 아직 안 됐어요.');
      return;
    }

    const payload = {
      objectType: 'feed',
      content: {
        title: '빵 MBTI 전체 유형 순위',
        imageUrl: shareImageUrl,
        description: shareText,
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
      buttons: [
        {
          title: '순위 보러가기',
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
    <div className="min-h-screen bg-gradient-to-b from-[#FFF4E6] to-[#FFE8CC] pb-10">
      {/* Header */}
      <header className="pt-10 pb-6 px-6">
        <h1 className="text-3xl font-bold text-[#D86A00] text-center mb-2">
          전체 유형 순위
        </h1>
        <p className="text-[#B87333] text-center">
          가장 많이 나온 빵 유형은?
        </p>
      </header>

      {/* Main Content */}
      <main className="px-6 lg:px-10">
        {/* Results List */}
        <div className="space-y-3 mb-8">
          {allResults.map((result) => (
            <div
              key={result.rank}
              className="bg-white rounded-2xl p-5 shadow-lg flex items-center gap-3"
            >
              {/* Rank Badge */}
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-base ${
                  result.rank === 1
                    ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white'
                    : result.rank === 2
                    ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white'
                    : result.rank === 3
                    ? 'bg-gradient-to-br from-amber-600 to-amber-800 text-white'
                    : 'bg-[#FFE8CC] text-[#D86A00]'
                }`}
              >
                {result.rank}
              </div>

              {/* Bread Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-bold text-[#D86A00] text-base whitespace-nowrap">
                    {result.emoji}{result.bread}
                  </span>
                  <span className="bg-[#FF8C42] text-white px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap">
                    {result.mbti}
                  </span>
                </div>
                <div className="text-xs text-[#B87333]">
                  {result.count.toLocaleString()}명 참여
                </div>
              </div>

              {/* Percentage */}
              <div className="text-right flex-shrink-0">
                <div className="text-xl font-bold text-[#FF8C42]">
                  {result.percentage}%
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Share Section */}
        <div className="mb-4">
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

        {/* Action Button */}
        <button
          onClick={() => navigate('/')}
          className="w-full bg-[#FF8C42] hover:bg-[#FF7A1F] text-white px-8 py-4 rounded-full font-bold shadow-lg transition-all active:scale-95"
        >
          다시 테스트하기
        </button>

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