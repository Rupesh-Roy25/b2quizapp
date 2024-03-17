import { useRouter } from 'next/router';
import quizData from '../../public/quiz.json'; // Importing quiz data
import 'tailwindcss/tailwind.css';

const ResultPage = () => {
  const router = useRouter();
  const { id, isCorrect } = router.query;
  const result = isCorrect === 'true';

  // Find the question based on the provided id
  const currentQuestion = quizData.find(question => question.id === id);
  const correctAnswer = currentQuestion ? currentQuestion.correctOption : '';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full md:max-w-md lg:max-w-xl xl:max-w-2xl bg-white rounded-lg shadow-lg p-6 text-center">
        <img src="/logo.png" alt="Logo" className="mx-auto mb-4" width={200} height={200} />
        <p className="mb-4">
          <span className={`text-xl font-semibold ${result ? 'text-green-500' : 'text-red-500'}`}>
            {result ? 'Correct Answer!!!' : 'Sorry!! This is the wrong answer'}
          </span>
        </p>
        {!result && (
          <p className="mb-4">
            <span className="text-l">Answer:</span>{' '}
            <span className="text-xl font-bold text-green-500">{correctAnswer}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
