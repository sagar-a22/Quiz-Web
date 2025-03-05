import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await axios.post("http://127.0.0.1:8000/api/auth/register/", {
                username,
                password,
            });

            navigate("/login"); // Redirect to login after signup
        } catch (err) {
            setError("Username already exists or invalid data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "10px" }}>
                <h2 className="text-center text-success mb-4">Sign Up</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSignUp}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Choose a username"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Create a strong password"
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100" disabled={loading}>
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>
                <p className="mt-3 text-center">
                    Already have an account? <a href="/login" className="text-decoration-none">Login</a>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
