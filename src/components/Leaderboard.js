import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // Retrieve scores data from local storage
    const storedScores = JSON.parse(localStorage.getItem('scores')) || {};
    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

    // Filter out leaderboard data for quizzes that do not exist anymore
    const filteredLeaderboardData = Object.keys(storedScores)
      .filter((title) => storedQuizzes.some((quiz) => quiz.quizTitle === title))
      .map((quizTitle) => ({
        quizTitle,
        scores: storedScores[quizTitle],
      }));

    setLeaderboardData(filteredLeaderboardData);
  }, []);

  const handleDeleteQuizScores = (quizTitle) => {
    const storedScores = JSON.parse(localStorage.getItem('scores')) || {};
    delete storedScores[quizTitle];
    localStorage.setItem('scores', JSON.stringify(storedScores));

    // Update the leaderboard data after deleting the quiz scores
    setLeaderboardData((prevData) => prevData.filter((data) => data.quizTitle !== quizTitle));
  };

  return (
    <Container className="mt-5" style={{ color: 'yellow' }}>
      <h1 style={{ color: 'yellow', paddingTop:'60px'}}><center>Leaderboard</center></h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Quiz Title</th>
            <th>Username</th>
            <th>Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((score, index) => (
            score.scores.map((entry, entryIndex) => (
              <tr key={`${score.quizTitle}-${entryIndex}`}>
                {entryIndex === 0 && <td rowSpan={score.scores.length}>{index + 1}</td>}
                {entryIndex === 0 && <td rowSpan={score.scores.length}>{score.quizTitle}</td>}
                <td>{entry.username}</td>
                <td>{`${entry.score}/${entry.totalQuestions}`}</td>
                {entryIndex === 0 && (
                  <td rowSpan={score.scores.length}>
                    <Button variant="danger" onClick={() => handleDeleteQuizScores(score.quizTitle)}>
                      Delete
                    </Button>
                  </td>
                )}
              </tr>
            ))
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Leaderboard;
