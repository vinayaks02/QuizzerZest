import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    setQuizzes(storedQuizzes);
  }, []);

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={10} sm={8} md={6}>
          <h2 className="text-center mb-4 mt-3" style={{ color: 'yellow', paddingTop:'60px'}}>
            Welcome to Quizzerzest
          </h2>
          {quizzes.map((quiz, index) => (
            <Card key={index} className="mb-3 border-0">
              <Card.Body className="bg-info rounded-lg p-4 text-center">
                <Card.Title className="mb-3">
                  <span className="h4" style={{ color: 'yellow' }}>
                    {quiz.quizTitle}
                  </span>
                </Card.Title>
                <Link to={`/quiz/${quiz.quizTitle}`} className="btn btn-primary btn-block">
                  Start Quiz
                </Link>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default QuizList;
