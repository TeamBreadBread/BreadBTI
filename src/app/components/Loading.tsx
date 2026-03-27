import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';

export default function Loading() {
  const navigate = useNavigate();
  const location = useLocation();
  const mbtiFromState = (location.state as { mbti?: string } | null)?.mbti;
  const mbtiFromStorage = sessionStorage.getItem('bread-mbti-result');
  const mbti = mbtiFromState ?? mbtiFromStorage;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/result', { state: { mbti } });
    }, 3000);

    return () => clearTimeout(timer);
  }, [mbti, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF4E6] to-[#FFE8CC] flex flex-col items-center justify-center px-6">
      {/* Loading Animation */}
      <div className="mb-8">
        <div className="relative w-32 h-32">
          {/* Oven/Baking Animation */}
          <div className="absolute inset-0 bg-[#FF8C42]/20 rounded-3xl animate-pulse" />
          <div className="absolute inset-4 bg-[#FF8C42]/30 rounded-2xl animate-pulse delay-150" />
          <div className="absolute inset-8 bg-[#FF8C42]/40 rounded-xl animate-pulse delay-300" />
          
          {/* Center Bread Icon */}
          <div className="absolute inset-0 flex items-center justify-center text-5xl animate-bounce">
            🥐
          </div>
        </div>
      </div>

      {/* Main Text */}
      <h2 className="text-2xl font-bold text-[#D86A00] text-center mb-3">
        당신의 빵을 굽는 중... 🥐
      </h2>

      {/* Subtext */}
      <p className="text-base text-[#B87333] text-center">
        오븐에서 결과를 만드는 중이에요
      </p>

      {/* Loading Dots */}
      <div className="flex gap-2 mt-8">
        <div className="w-2 h-2 bg-[#FF8C42] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-[#FF8C42] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-[#FF8C42] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}