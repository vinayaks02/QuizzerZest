import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EditQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    setQuizzes(storedQuizzes);
  }, []);

  const handleDeleteQuiz = (quizTitle) => {
    const updatedQuizzes = quizzes.filter((quiz) => quiz.quizTitle !== quizTitle);
    setQuizzes(updatedQuizzes);
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
  };

  return (
    <div className="container mt-5" style={{color:'yellow'}}>
      <h2 style={{ color: 'yellow', paddingTop:'60px'}}><center>Edit Quiz</center></h2>
      <ul className="list-group">
        {quizzes.map((quiz, index) => (
          <li className="list-group-item" key={index}>
            <strong>Quiz Title:</strong> {quiz.quizTitle}
            <ul>
              {quiz.questions.map((question, questionIndex) => (
                <li key={questionIndex}>
                  <strong>Question {questionIndex + 1}:</strong> {question.questionText} {/* Fix the property name here */}
                  <ul>
                    {question.options.map((option, optionIndex) => (
                      <li key={optionIndex}>
                        Option {optionIndex + 1}: {option}
                        {optionIndex === question.correctOptionIndex && <strong> (Correct)</strong>}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <Link to={`/edit/${quiz.quizTitle}`} className="btn btn-primary">
              Edit
            </Link>
            <button className="btn btn-danger ms-2" onClick={() => handleDeleteQuiz(quiz.quizTitle)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditQuiz;
