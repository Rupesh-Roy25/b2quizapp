import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('/api/questions')
      .then(response => response.json())
      .then(data => setQuestions(data));
  }, []);

  const handleDelete = (index) => {
    fetch('/api/questions', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ index }),
    })
      .then(response => response.json())
      .then(() => {
        setQuestions(prevQuestions => prevQuestions.filter((_, i) => i !== index));
      });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">List of Questions</h1>
      <ul>
        {questions.map((question, index) => (
          <li key={index} className="bg-white rounded-lg shadow-lg p-4 mb-4 flex items-center justify-between">
            <p>Id:{question.id}</p> 
            <p className="text-lg">{question.question}</p>
            <button onClick={() => handleDelete(index)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
          </li>
        ))}
      </ul>
      <Link href="/addquestion">
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
         Add Question
        </button>
      </Link>
    </div>
  );
};

export default QuestionsPage;
