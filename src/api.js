import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

export const fetchQuizzes = async () => {
    const response = await axios.get(`${API_URL}quizzes/`);
    return response.data;
};

export const fetchQuestions = async (quizId) => {
    const response = await axios.get(`${API_URL}quizzes/${quizId}/questions/`); 
    return response.data;
};

export const submitAnswer = async (answerData) => {
    const response = await axios.post(`${API_URL}useranswers/`, answerData); 
    return response.data;
};
