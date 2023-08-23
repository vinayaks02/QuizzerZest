import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const EditSpecificQuiz = () => {
  const { quizTitle } = useParams();
  const navigate = useNavigate();

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

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const selectedQuiz = storedQuizzes.find((quiz) => quiz.quizTitle === quizTitle);
    if (selectedQuiz) {
      setQuizData(selectedQuiz);
    } else {
      navigate('/edit'); // Redirect to the EditQuiz page if the quiz is not found
    }
  }, [quizTitle, navigate]);

  const handleSaveQuiz = () => {
    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const quizIndex = storedQuizzes.findIndex((quiz) => quiz.quizTitle === quizTitle);
    if (quizIndex !== -1) {
      storedQuizzes[quizIndex] = quizData;
      setQuizData(storedQuizzes[quizIndex]);
      localStorage.setItem('quizzes', JSON.stringify(storedQuizzes));
      setShowAlert(true);
    } else {
      navigate('/edit'); // Redirect to the EditQuiz page if the quiz is not found
    }
  };

  const handleDeleteQuiz = () => {
    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const updatedQuizzes = storedQuizzes.filter((quiz) => quiz.quizTitle !== quizTitle);
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
    navigate('/edit'); // Redirect to the EditQuiz page after deleting the quiz
  };

  const handleAddQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        {
          questionText: '',
          options: ['', '', '', ''],
          correctOptionIndex: 0,
        },
      ],
    });
  };

  const handleDeleteQuestion = (index) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.filter((_, questionIndex) => questionIndex !== index),
    });
  };

  const handleQuestionChange = (index, field, value) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map((question, questionIndex) =>
        questionIndex === index ? { ...question, [field]: value } : question
      ),
    });
  };

  const handleCancel = () => {
    navigate('/edit');
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1 style={{ color: 'yellow' }}>Edit Quiz</h1>
        </Col>
      </Row>
      {showAlert && (
        <Row className="mt-4">
          <Col md={8} className="mx-auto">
            <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
              <span style={{ color: 'yellow' }}>Quiz Updated</span>
            </Alert>
          </Col>
        </Row>
      )}
      <Row className="mt-4">
        <Col md={8} className="mx-auto">
          <Form>
            <Form.Group controlId="quizTitle">
              <Form.Label style={{ color: 'yellow' }}>Quiz Title</Form.Label>
              <Form.Control type="text" value={quizData.quizTitle} disabled />
            </Form.Group>
            {quizData.questions.map((question, questionIndex) => (
              <div key={questionIndex} className="mb-4">
                <h4 style={{ color: 'yellow' }}>Question {questionIndex + 1}</h4>
                <Form.Group controlId={`questionText-${questionIndex}`}>
                  <Form.Label style={{ color: 'yellow' }}>Question Text</Form.Label>
                  <Form.Control
                    type="text"
                    value={question.questionText}
                    onChange={(e) => handleQuestionChange(questionIndex, 'questionText', e.target.value)}
                  />
                </Form.Group>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <Form.Group controlId={`option-${questionIndex}-${optionIndex}`}>
                      <Form.Label style={{ color: 'yellow' }}>{`Option ${String.fromCharCode(65 + optionIndex)}`}</Form.Label>
                      <Form.Control
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleQuestionChange(
                            questionIndex,
                            'options',
                            question.options.map((op, idx) => (idx === optionIndex ? e.target.value : op))
                          )
                        }
                      />
                    </Form.Group>
                  </div>
                ))}
                <Form.Group controlId={`correctOption-${questionIndex}`}>
                  <Form.Label style={{ color: 'yellow' }}>Correct Option</Form.Label>
                  <Form.Control
                    as="select"
                    value={question.correctOptionIndex}
                    onChange={(e) => handleQuestionChange(questionIndex, 'correctOptionIndex', parseInt(e.target.value))}
                  >
                    {question.options.map((_, optionIndex) => (
                      <option key={optionIndex} value={optionIndex}>
                        {String.fromCharCode(65 + optionIndex)}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                {quizData.questions.length > 1 && (
                  <Button variant="danger" onClick={() => handleDeleteQuestion(questionIndex)}>
                    Delete Question
                  </Button>
                )}
              </div>
            ))}
            <Button variant="primary" onClick={handleAddQuestion}>
              Add New Question
            </Button>
            <Button variant="success" className="ms-2" onClick={handleSaveQuiz}>
              Save Quiz
            </Button>
            <Button variant="danger" className="ms-2" onClick={handleDeleteQuiz}>
              Delete Quiz
            </Button>
            <Button variant="secondary" className="ms-2" onClick={handleCancel}>
              Cancel
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditSpecificQuiz;