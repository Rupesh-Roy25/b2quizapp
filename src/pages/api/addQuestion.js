import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { id, question, options, correctOption } = req.body;

    // Create a new question object
    const newQuestion = {
      id,
      question,
      options: options.split(',').map(option => option.trim()),
      correctOption,
    };

    try {
      // Read existing quiz data from the quiz.json file
      const filePath = path.join(process.cwd(), 'public', 'quiz.json');
      const existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      // Append the new question to the existing data
      const newData = [...existingData, newQuestion];

      // Write the updated data back to the quiz.json file
      fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));

      res.status(200).json({ message: 'Question added successfully!' });
    } catch (error) {
      console.error('Error adding question:', error);
      res.status(500).json({ message: 'An error occurred while adding the question.' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
