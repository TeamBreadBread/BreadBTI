import { useNavigate } from 'react-router';
import { ThumbsUp, ThumbsDown, MessageCircle, Link2, BarChart3 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Twitter X Logo Component
const TwitterXIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Result() {
  const navigate = useNavigate();

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
          당신은 바삭한 크로와상
        </h1>
        
        {/* Short Description */}
        <p className="text-lg text-[#B87333] text-center mb-8">
          겉은 차가워 보이지만<br />속은 따뜻한 스타일
        </p>

        {/* MBTI Info Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="inline-block bg-[#FF8C42] text-white px-4 py-2 rounded-full font-bold mb-4">
            INTJ
          </div>
          <p className="text-[#5A4A3A] leading-relaxed">
            전략적이고 독립적인 성격으로, 목표를 향해 묵묵히 나아가는 타입이에요. 
            겉으로는 차가워 보이지만 가까운 사람들에게는 따뜻하고 충실한 친구랍니다. 
            새로운 아이디어를 좋아하고 완벽을 추구하는 당신!
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
              <div className="font-bold text-[#D86A00]">도넛 🍩</div>
            </div>
          </div>

          {/* Bad Match */}
          <div className="bg-white rounded-2xl p-5 shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FFE8CC] rounded-full flex items-center justify-center flex-shrink-0">
              <ThumbsDown size={24} className="text-[#B87333]" />
            </div>
            <div>
              <div className="text-sm text-[#B87333] mb-1">안 맞는 빵</div>
              <div className="font-bold text-[#D86A00]">통밀빵 🍞</div>
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
              <button className="flex items-center justify-center bg-[#FEE500] hover:bg-[#FDD000] w-12 h-12 rounded-full transition-all active:scale-95 shadow-md">
                <MessageCircle size={20} />
              </button>
              <button className="flex items-center justify-center bg-black hover:bg-gray-800 text-white w-12 h-12 rounded-full transition-all active:scale-95 shadow-md">
                <TwitterXIcon />
              </button>
              <button className="flex items-center justify-center bg-white hover:bg-gray-50 border-2 border-[#FF8C42] text-[#FF8C42] w-12 h-12 rounded-full transition-all active:scale-95 shadow-md">
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