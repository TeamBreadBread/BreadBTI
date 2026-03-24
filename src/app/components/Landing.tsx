import { useNavigate } from 'react-router';
import { MessageCircle, Link2 } from 'lucide-react';
import breadCharacter from '../../assets/0cbcb9ac676b70ec41682ad11652521922aa4d9d.png';

// Twitter X Logo Component
const TwitterXIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF4E6] to-[#FFE8CC] flex flex-col">
      {/* Minimal Header */}
      <header className="p-5 text-center">
        <div className="text-xs font-semibold text-[#FF8C42]">
          BREAD MBTI
        </div>
      </header>

      {/* Main Content - Centered */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-16">
        {/* Title */}
        <h1 className="text-5xl font-black text-[#D86A00] text-center mb-2 leading-tight">
          나는<br />어떤 빵일까?
        </h1>

        {/* Subtitle */}
        <p className="text-base text-[#B87333] text-center mb-8">
          MBTI로 알아보는 나의 빵 성격
        </p>

        {/* Bread Character */}
        <div className="mb-16 w-96">
          <img
            src={breadCharacter}
            alt="Bread Character"
            className="w-full h-auto"
          />
        </div>

        {/* CTA Button */}
        <button 
          onClick={() => navigate('/question')}
          className="bg-[#FF8C42] hover:bg-[#FF7A1F] active:scale-95 text-white px-12 py-4 rounded-full font-bold shadow-lg transition-all"
        >
          테스트 시작하기
        </button>

        {/* Participant Count */}
        <div className="mt-4 text-sm text-[#B87333]">
          참여자수 | 105,789명
        </div>

        {/* Share Section */}
        <div className="mt-12 w-full max-w-xs">
          <p className="text-sm font-semibold text-[#D86A00] text-center mb-4">
            테스트 공유하기
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
      </main>

      {/* Bottom Hint */}
      <footer className="pb-10 text-center">
      </footer>
    </div>
  );
}
