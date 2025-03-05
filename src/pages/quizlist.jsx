import React, { useEffect, useState } from "react";
import { fetchQuizzes } from "../api";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQuizzes().then((data) => {
            setQuizzes(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading quizzes...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4 fw-bold text-primary">Available Quizzes</h2>
            <div className="row justify-content-center">
                {quizzes.map((quiz) => (
                    <div key={quiz.id} className="col-lg-4 col-md-6 mb-4">
                        <div className="card quiz-card border-0 shadow-lg">
                            <div className="card-body text-center">
                                <h5 className="card-title fw-bold text-dark">{quiz.title}</h5>
                                <p className="card-text text-muted">{quiz.description}</p>
                                <Link to={`/quiz/${quiz.id}`} className="btn btn-warning fw-bold mt-2 shadow">
                                    Start Quiz
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuizList;
