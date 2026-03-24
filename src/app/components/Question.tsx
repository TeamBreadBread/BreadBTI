import { useNavigate } from 'react-router';

export default function Question() {
  const navigate = useNavigate();

  const handleAnswer = () => {
    navigate('/loading');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF4E6] to-[#FFE8CC] flex flex-col">
      {/* Progress Bar */}
      <div className="p-5">
        <div className="mb-2 text-center text-sm font-semibold text-[#D86A00]">
          3 / 10
        </div>
        <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-[#FF8C42] h-full rounded-full transition-all duration-300"
            style={{ width: '30%' }}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Question */}
        <h2 className="text-3xl font-bold text-[#D86A00] text-center mb-16 leading-relaxed">
          친구랑 빵집에 갔을 때<br />나는?
        </h2>

        {/* Answer Options */}
        <div className="w-full max-w-sm space-y-4">
          <button className="w-full bg-white hover:bg-[#FFF4E6] active:scale-98 text-[#D86A00] px-8 py-6 rounded-2xl font-semibold shadow-lg transition-all border-2 border-transparent hover:border-[#FF8C42]" onClick={handleAnswer}>
            인기 메뉴를 고른다
          </button>
          <button className="w-full bg-white hover:bg-[#FFF4E6] active:scale-98 text-[#D86A00] px-8 py-6 rounded-2xl font-semibold shadow-lg transition-all border-2 border-transparent hover:border-[#FF8C42]" onClick={handleAnswer}>
            내가 끌리는 걸 고른다
          </button>
        </div>
      </main>
    </div>
  );
}