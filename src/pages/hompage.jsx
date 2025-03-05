import React from "react";
import { Link, useNavigate } from "react-router-dom";
import DarkModeToggle from "./darkmode";

const HomePage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove JWT token
        navigate("/login"); // Redirect to login page
    };

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/">QuizMaster</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/quizzes">Quizzes</Link>
                            </li>
                            <li className="nav-item">
                                <DarkModeToggle />
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-danger ms-3" onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            
            <div className="container-fluid text-center d-flex align-items-center justify-content-center"
                 style={{ height: "80vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white" }}>
                <div>
                    <h1 className="display-3 fw-bold">Welcome to QuizMaster!</h1>
                    <p className="lead">Test your knowledge with interactive quizzes across various categories.</p>
                    <Link to="/quizzes" className="btn btn-warning btn-lg mt-3 shadow">Start Quiz</Link>
                </div>
            </div>

            {/* Features Section */}
            <div className="container my-5">
                <div className="row text-center">
                    <div className="col-md-4">
                        <i className="bi bi-lightbulb-fill text-primary" style={{ fontSize: "3rem" }}></i>
                        <h4 className="mt-3">Improve Your Knowledge</h4>
                        <p>Challenge yourself with quizzes from different categories and learn new things.</p>
                    </div>
                    <div className="col-md-4">
                        <i className="bi bi-trophy-fill text-success" style={{ fontSize: "3rem" }}></i>
                        <h4 className="mt-3">Compete with Friends</h4>
                        <p>Play quizzes with friends and compare your scores on the leaderboard.</p>
                    </div>
                    <div className="col-md-4">
                        <i className="bi bi-clock-history text-danger" style={{ fontSize: "3rem" }}></i>
                        <h4 className="mt-3">Timed Challenges</h4>
                        <p>Set a timer and test how quickly you can answer quiz questions correctly!</p>
                    </div>
                </div>
            </div>

            {/* Image Section */}
            <div className="text-center my-5">
                <img
                    src="#"
                    alt="Quiz Illustration"
                    className="img-fluid rounded shadow-lg"
                />
            </div>
        </>
    );
};

export default HomePage;
