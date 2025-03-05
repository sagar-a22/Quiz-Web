import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuestions, submitAnswer } from "../api";
import "bootstrap/dist/css/bootstrap.min.css";

const QuizPage = () => {
    const { quizId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    useEffect(() => {
        fetchQuestions(quizId).then(setQuestions);
    }, [quizId]);

    const handleInputChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
    };

    const handleSubmit = async () => {
        let totalScore = 0;
        const newResults = {};

        for (const questionId in answers) {
            const response = await submitAnswer({
                question: questionId,
                answer_text: answers[questionId],
            });

            newResults[questionId] = response;
            totalScore += response.score;
        }

        setResults(newResults);
        setScore(totalScore);
        localStorage.setItem("quizScore", totalScore);
        setQuizCompleted(true);
    };

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-center">
                <div className="card p-4 shadow-lg" style={{ maxWidth: "600px", width: "100%", borderRadius: "10px" }}>
                    <h2 className="text-center text-primary">📖 Quiz Time!</h2>

                    {/* Show Final Score */}
                    {quizCompleted ? (
                        <div className="alert alert-success text-center mt-3">
                            <h3>🎉 Quiz Completed!</h3>
                            <h4>Your Final Score: <span className="fw-bold">{score}</span></h4>
                            <button className="btn btn-primary mt-2" onClick={() => window.location.reload()}>
                                Retry Quiz
                            </button>
                        </div>
                    ) : (
                        <>
                            {questions.length > 0 && (
                                <div key={questions[currentQuestionIndex].id} className="mt-3">
                                    <h5 className="fw-bold">{`Question ${currentQuestionIndex + 1}/${questions.length}`}</h5>
                                    <p className="fs-5">{questions[currentQuestionIndex].text}</p>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={answers[questions[currentQuestionIndex].id] || ""}
                                        onChange={(e) => handleInputChange(questions[currentQuestionIndex].id, e.target.value)}
                                        placeholder="Type your answer here..."
                                    />
                                    {results[questions[currentQuestionIndex].id] && (
                                        <p className={`fw-bold mt-2 ${results[questions[currentQuestionIndex].id].is_correct ? "text-success" : "text-danger"}`}>
                                            {results[questions[currentQuestionIndex].id].is_correct
                                                ? "✅ Correct!"
                                                : `❌ Wrong! Correct Answer: ${results[questions[currentQuestionIndex].id].correct_answer}`}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Progress Bar */}
                            <div className="progress my-3">
                                <div
                                    className="progress-bar bg-success"
                                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                                ></div>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="d-flex justify-content-between">
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                                    disabled={currentQuestionIndex === 0}
                                >
                                    ⬅ Previous
                                </button>
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={() => setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                                    disabled={currentQuestionIndex === questions.length - 1}
                                >
                                    Next ➡
                                </button>
                            </div>

                            {/* Submit Button */}
                            <button className="btn btn-success mt-3 w-100" onClick={handleSubmit}>
                                Submit Answers ✅
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizPage;
