// pages/api/questions.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Read questions from the quiz.json file
    const filePath = path.join(process.cwd(), 'public', 'quiz.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const questions = JSON.parse(jsonData);
    res.status(200).json(questions);
  } else if (req.method === 'DELETE') {
    // Delete a question from the quiz.json file
    const { index } = req.body;
    const filePath = path.join(process.cwd(), 'public', 'quiz.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const questions = JSON.parse(jsonData);
    questions.splice(index, 1);
    fs.writeFileSync(filePath, JSON.stringify(questions, null, 2));
    res.status(200).json({ message: 'Question deleted successfully' });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
