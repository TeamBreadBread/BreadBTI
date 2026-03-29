import { useState, type MouseEvent } from 'react';
import { useNavigate } from 'react-router';
import { INITIAL_SCORES, MBTI_QUESTIONS, getMbti, type MbtiTrait } from '../mbti';

export default function Question() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState(INITIAL_SCORES);

  const currentQuestion = MBTI_QUESTIONS[currentIndex];
  const progress = Math.round(((currentIndex + 1) / MBTI_QUESTIONS.length) * 100);

  const handleAnswer = (trait: MbtiTrait, event?: MouseEvent<HTMLButtonElement>) => {
    event?.currentTarget.blur();

    const nextScores = {
      ...scores,
      [trait]: scores[trait] + 1,
    };

    const isLastQuestion = currentIndex === MBTI_QUESTIONS.length - 1;

    if (isLastQuestion) {
      const mbti = getMbti(nextScores);
      sessionStorage.setItem('bread-mbti-result', mbti);
      navigate('/loading', { state: { mbti } });
      return;
    }

    setScores(nextScores);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF4E6] to-[#FFE8CC] flex flex-col">
      {/* Progress Bar */}
      <div className="mx-auto w-full max-w-6xl px-5 pt-6 lg:px-10 lg:pt-10">
        <div className="mb-2 text-center text-sm font-semibold text-[#D86A00]">
          {currentIndex + 1} / {MBTI_QUESTIONS.length}
        </div>
        <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
          <div
            className="bg-[#FF8C42] h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex flex-1 items-center px-6 pb-12 lg:px-10 lg:pb-20">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-center">
          <div key={currentIndex} className="w-full rounded-[2rem] bg-white/40 p-6 shadow-lg backdrop-blur-sm lg:p-12">
            {/* Question */}
            <h2 className="text-3xl font-bold text-[#D86A00] text-center mb-10 leading-relaxed lg:mb-14 lg:text-5xl">
              {currentQuestion.question}
            </h2>

            {/* Answer Options */}
            <div className="mx-auto grid w-full max-w-4xl gap-4 lg:grid-cols-2 lg:gap-6">
              <button
                className="w-full bg-white hover:bg-[#FFF4E6] active:scale-98 text-[#D86A00] px-8 py-6 rounded-2xl font-semibold shadow-lg transition-all border-2 border-transparent hover:border-[#FF8C42] lg:min-h-[160px] lg:text-xl"
                onClick={(event) => handleAnswer(currentQuestion.options[0].trait, event)}
              >
                {currentQuestion.options[0].label}
              </button>
              <button
                className="w-full bg-white hover:bg-[#FFF4E6] active:scale-98 text-[#D86A00] px-8 py-6 rounded-2xl font-semibold shadow-lg transition-all border-2 border-transparent hover:border-[#FF8C42] lg:min-h-[160px] lg:text-xl"
                onClick={(event) => handleAnswer(currentQuestion.options[1].trait, event)}
              >
                {currentQuestion.options[1].label}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}