import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctOption: 0 },
  ]);
  const [isDeleteAlertVisible, setDeleteAlertVisible] = useState(false);

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctOption: 0 }]);
  };

  const handleQuestionTextChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionText = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectOptionChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctOption = parseInt(e.target.value);
    setQuestions(updatedQuestions);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
    setDeleteAlertVisible(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement the quiz creation or update functionality here

    // Fetch the existing quizzes from local storage
    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

    // Create a new quiz object
    const newQuiz = {
      quizTitle: quizTitle,
      questions: questions,
    };

    // Check if the quiz already exists
    const existingQuizIndex = storedQuizzes.findIndex((quiz) => quiz.quizTitle === quizTitle);

    if (existingQuizIndex !== -1) {
      // If the quiz already exists, update it
      storedQuizzes[existingQuizIndex] = newQuiz;
    } else {
      // If the quiz does not exist, add it to the array of quizzes
      storedQuizzes.push(newQuiz);
    }

    // Update the quizzes in local storage
    localStorage.setItem('quizzes', JSON.stringify(storedQuizzes));

    // Show a success alert or perform any other action
    alert('Quiz ' + (existingQuizIndex !== -1 ? 'updated' : 'created') + ' successfully!');
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1 className="text-center text-white" style={{ color: 'yellow', paddingTop:'60px'}}>Create Quiz</h1>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={8} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="quizTitle">
              <Form.Label className="text-white" style={{ color: 'yellow' }}>Quiz Title</Form.Label>
              <Form.Control
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                required
              />
            </Form.Group>
            {questions.map((question, index) => (
              <div key={index} className="mb-4">
                <h4 style={{ color: 'yellow' }}>Question {index + 1}</h4>
                <Form.Group controlId={`questionText-${index}`}>
                  <Form.Label style={{ color: 'yellow' }}>Question Text</Form.Label>
                  <Form.Control
                    type="text"
                    value={question.questionText}
                    onChange={(e) => handleQuestionTextChange(index, e)}
                    required
                  />
                </Form.Group>
                {question.options.map((option, optionIndex) => (
                  <Form.Group key={optionIndex} controlId={`option-${index}-${optionIndex}`}>
                    <Form.Label style={{ color: 'yellow' }}>{`Option ${String.fromCharCode(65 + optionIndex)}`}</Form.Label>
                    <Form.Control
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, optionIndex, e)}
                      required
                    />
                  </Form.Group>
                ))}
                <Form.Group controlId={`correctOption-${index}`}>
                  <Form.Label style={{ color: 'yellow' }}>Correct Option</Form.Label>
                  <Form.Control
                    as="select"
                    value={question.correctOption}
                    onChange={(e) => handleCorrectOptionChange(index, e)}
                  >
                    {question.options.map((_, optionIndex) => (
                      <option key={optionIndex} value={optionIndex}>
                        {String.fromCharCode(65 + optionIndex)}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                {questions.length > 1 && (
                  <Button variant="danger" onClick={() => handleDeleteQuestion(index)}>
                    Delete Question
                  </Button>
                )}
              </div>
            ))}
            <Button variant="primary" onClick={handleAddQuestion}>
              Add Question
            </Button>
            <Button type="submit" variant="success" className="ml-2">
              Create Quiz
            </Button>
          </Form>
          {isDeleteAlertVisible && (
            <Alert variant="info" className="mt-3">
              Question deleted. Save your changes to update the quiz.
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateQuiz;
