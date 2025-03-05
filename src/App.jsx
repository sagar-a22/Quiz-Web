import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuizList from "./pages/quizList";
import HomePage from "./pages/hompage";
import QuizPage from "./pages/quiz";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/quizzes" element={<QuizList/>}/>
                <Route path="/quiz/:quizId" element={<QuizPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
            </Routes>
        </Router>
    );
}

export default App;
