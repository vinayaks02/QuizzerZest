import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const Quiz = () => {
  const { quizTitle } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [quizData, setQuizData] = useState({
    quizTitle: '',
    questions: [
      {
        questionText: '',
        options: ['', '', '', ''],
        correctOptionIndex: 0,
      },
    ],
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const selectedQuiz = storedQuizzes.find((quiz) => quiz.quizTitle === quizTitle);
    if (selectedQuiz) {
      setQuizData(selectedQuiz);
    } else {
      navigate('/quizlist'); // Redirect to the QuizList page if the quiz is not found
    }
  }, [quizTitle, navigate]);

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      if (selectedOption === quizData.questions[currentIndex].correctOptionIndex) {
        setScore((prevScore) => prevScore + 1);
      }
      setSelectedOption(null);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleRetryQuiz = () => {
    // Reset quiz state and show the quiz again
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowQuiz(true);
  };

  const handleGoToHome = () => {
    navigate('/');
  };

  const handleSubmitUsername = (e) => {
    e.preventDefault();
    setShowQuiz(true); // Show the quiz after submitting the username
  };

  useEffect(() => {
    if (!showQuiz) {
      return; // Do nothing if the quiz is not finished
    }

    // Retrieve previous score data from local storage
    const storedScores = JSON.parse(localStorage.getItem('scores')) || {};

    // Merge previous scores with the current score and store it in local storage
    const updatedScores = {
      ...storedScores,
      [quizTitle]: [{ username, score, totalQuestions: quizData.questions.length }],
    };
    localStorage.setItem('scores', JSON.stringify(updatedScores));
  }, [showQuiz, quizTitle, username, score, quizData.questions.length]);

  return (
    <Container>
      {showQuiz ? (
        <Row className="mt-5">
          <Col>
            <h1 style={{ color: 'yellow' }}>Welcome to {quizTitle} Quiz</h1>
          </Col>
        </Row>
      ) : (
        <Row className="mt-5">
          <Col>
            <h1 style={{ color: 'yellow' }}>Quiz: {quizData.quizTitle}</h1>
          </Col>
        </Row>
      )}
      {showQuiz ? (
        <Row className="mt-4">
          <Col md={8} className="mx-auto">
            {currentIndex < quizData.questions.length ? (
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title style={{ color: 'black' }}>Question {currentIndex + 1}</Card.Title>
                  <Card.Text style={{ color: 'black' }}>{quizData.questions[currentIndex].questionText}</Card.Text>
                  <Form>
                    {quizData.questions[currentIndex].options.map((option, optionIndex) => (
                      <Form.Check
                        key={optionIndex}
                        type="radio"
                        id={`option-${optionIndex}`}
                        label={option}
                        name="optionRadios"
                        checked={selectedOption === optionIndex}
                        onChange={() => handleOptionSelect(optionIndex)}
                        style={{ color: 'black' }}
                      />
                    ))}
                  </Form>
                  <Button variant="primary" onClick={handleNextQuestion}>
                    Next Question
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              <Card>
                <Card.Body>
                  <Card.Title><h2 style={{ color: 'yellow' }}>Quiz Finished!</h2></Card.Title>
                  <Card.Text><h3 style={{ color: 'yellow' }}>Dear {username}, your final score is {score} out of {quizData.questions.length}.</h3></Card.Text>
                  <Button variant="primary" onClick={handleRetryQuiz}>
                    Retry Quiz
                  </Button>
                  <Button variant="secondary" className="ml-2" onClick={handleGoToHome}>
                    Close
                  </Button>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      ) : (
        <Row className="mt-4">
          <Col md={8} className="mx-auto">
            <Form onSubmit={handleSubmitUsername}>
              <Form.Group controlId="username">
                <Form.Label style={{ color: 'yellow' }}>Enter Your Username:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Start Quiz
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Quiz;
