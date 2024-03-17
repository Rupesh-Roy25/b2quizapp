import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getQuizQuestions } from '../utils/quizUtils';
import 'tailwindcss/tailwind.css';

const IndexPage = ({ randomQuestion }) => {
  const router = useRouter();
  
  const handleOptionClick = (id, selectedOption) => {
    const isCorrect = selectedOption === randomQuestion.correctOption;
    router.push({
      pathname: '/result',
      query: { id: id, isCorrect: isCorrect },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full md:max-w-md lg:max-w-xl xl:max-w-2xl bg-white rounded-lg shadow-lg p-6">
        {/* Logo */}
        <img src="/logo.png" alt="Logo" className="mx-auto mb-4" width={200} height={200} />

        {/* Main content */}
        {randomQuestion && (
          <div>
            <p className="text-2xl font-semibold mb-4">{randomQuestion.question}</p>
            <ul>
              {randomQuestion.options.map((option, index) => (
                <li key={index} className="mb-2">
                  <button 
                    onClick={() => handleOptionClick(randomQuestion.id, option)}
                    className="w-full sm:w-64 md:w-auto max-w-[420px] bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}  
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const quizQuestions = getQuizQuestions();
  const randomIndex = Math.floor(Math.random() * quizQuestions.length);
  const randomQuestion = quizQuestions[randomIndex];

  return {
    props: {
      randomQuestion,
    },
  };
}

export default IndexPage;
