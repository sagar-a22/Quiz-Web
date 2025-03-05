# 🧠 Quiz App

A **Full-Stack Quiz Application** built with **Django REST Framework** (Backend) and **React** (Frontend).  
This app allows users to take quizzes, track their progress, and validate answers in real-time.  

## 🚀 Features

✅ **User Authentication** (Signup/Login)  
✅ **Interactive Quiz Interface**  
✅ **Real-time Answer Validation**  
✅ **Progress Tracker** (e.g., "Question 3 of 10")  
✅ **Dark Mode Toggle 🌙**  
✅ **Responsive & User-Friendly UI**  

---

## 🛠️ Tech Stack

### **Backend (Django REST Framework)**
- Django 🐍  
- Django REST Framework 🌐  
- PostgreSQL (or SQLite for local development)  

### **Frontend (React)**
- React ⚛️  
- React Router  
- Bootstrap for Styling 🎨  

---

## 📂 Project Setup

### **Backend (Django)**
1. Clone the repository:  
   
   git clone https://github.com/your-username/quiz-app.git
   cd quiz-app/backend
   
Create a virtual environment:
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Apply migrations & start the server:

python manage.py migrate
python manage.py runserver

The API will be available at:

http://127.0.0.1:8000/api/
Frontend (React)

Navigate to the frontend directory:
cd ../frontend

Install dependencies:
npm install

Start the development server:

npm run dev
The frontend will run on:

http://localhost:5173/
