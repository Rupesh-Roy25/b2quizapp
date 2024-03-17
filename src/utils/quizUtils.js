// src/utils/quizUtils.js
const fs = require('fs');
const path = require('path');

export function getQuizQuestions() {
  const filePath = path.join(process.cwd(), 'public', 'quiz.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}
