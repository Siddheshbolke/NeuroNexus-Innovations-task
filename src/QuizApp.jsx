import React, { useState } from 'react';
import './QuizApp.css';

function QuizApp() {
  const [page, setPage] = useState('menu');
  const [quiz, setQuiz] = useState([]);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  const handleAddQuestion = () => {
    setQuiz([...quiz, { question, options, correctAnswer }]);
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer(0);
  };

  const handleQuizSubmit = () => {
    setPage('result');
  };

  const calculateScore = () => {
    let score = 0;
    quiz.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="container">
      <h1>Quiz Platform</h1>

      {page === 'menu' && (
        <div className="menu">
          <button onClick={() => setPage('create')}>Create Quiz</button>
          {quiz.length > 0 && <button onClick={() => setPage('take')}>Take Quiz</button>}
        </div>
      )}

      {page === 'create' && (
        <div className="create-quiz">
          <input
            type="text"
            placeholder="Enter question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          {options.map((opt, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Option ${idx + 1}`}
              value={opt}
              onChange={(e) => {
                const updatedOptions = [...options];
                updatedOptions[idx] = e.target.value;
                setOptions(updatedOptions);
              }}
            />
          ))}
          <select value={correctAnswer} onChange={(e) => setCorrectAnswer(Number(e.target.value))}>
            {options.map((_, idx) => (
              <option key={idx} value={idx}>Correct Answer: Option {idx + 1}</option>
            ))}
          </select>
          <button onClick={handleAddQuestion}>Add Question</button>
          <button onClick={() => setPage('menu')}>Back to Menu</button>

          <h3>Quiz Preview:</h3>
          <ul>
            {quiz.map((q, idx) => (
              <li key={idx}>{q.question}</li>
            ))}
          </ul>
        </div>
      )}

      {page === 'take' && (
        <div className="take-quiz">
          {quiz.map((q, idx) => (
            <div key={idx} className="question-block">
              <p>{q.question}</p>
              {q.options.map((opt, optIdx) => (
                <label key={optIdx}>
                  <input
                    type="radio"
                    name={`question-${idx}`}
                    value={optIdx}
                    onChange={() => setUserAnswers({ ...userAnswers, [idx]: optIdx })}
                  />
                  {opt}
                </label>
              ))}
            </div>
          ))}
          <button onClick={handleQuizSubmit}>Submit Quiz</button>
        </div>
      )}

      {page === 'result' && (
        <div className="result">
          <h2>Your Score: {calculateScore()} / {quiz.length}</h2>
          <button onClick={() => setPage('menu')}>Back to Menu</button>
        </div>
      )}
    </div>
  );
}

export default QuizApp;
