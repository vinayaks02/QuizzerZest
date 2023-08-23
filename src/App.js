import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppNavbar from "./components/Navbar";
import Home from "./components/Home";
import CreateQuiz from "./components/CreateQuiz";
import Leaderboard from "./components/Leaderboard";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import EditQuiz from './components/EditQuiz';
import ErrorPage from './components/ErrorPage';
import EditSpecificQuiz from './components/EditSpecificQuiz';
import Quiz from './components/Quiz';
import './App.css'

function App() {
  return (
    <>
    <AppNavbar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/quiz/:quizTitle" element={<Quiz/>} />
        <Route path="/create" element={<CreateQuiz/>} />
        <Route path="/edit" element={<EditQuiz /> } />
        <Route path="/edit/:quizTitle" element={<EditSpecificQuiz />} />
        <Route path="/leaderboard" element={<Leaderboard/>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App