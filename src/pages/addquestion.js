import React, { useState } from 'react';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';

const AddQuestionPage = () => {
  const [id, setId] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState('');
  const [correctOption, setCorrectOption] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      id,
      question,
      options,
      correctOption,
    };

    try {
      const response = await fetch('/api/addQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setMessage(data.message);
      router.push('/questions');
    } catch (error) {
      console.error('Error adding question:', error);
      setMessage('An error occurred while adding the question.');
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Add New Question</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Id:</label>
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} className="w-full border-gray-300 border rounded px-3 py-2" required />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Question:</label>
            <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full border-gray-300 border rounded px-3 py-2" required />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Options (comma-separated):</label>
            <input type="text" value={options} onChange={(e) => setOptions(e.target.value)} className="w-full border-gray-300 border rounded px-3 py-2" required />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Correct Option:</label>
            <input type="text" value={correctOption} onChange={(e) => setCorrectOption(e.target.value)} className="w-full border-gray-300 border rounded px-3 py-2" required />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Question</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default AddQuestionPage;
