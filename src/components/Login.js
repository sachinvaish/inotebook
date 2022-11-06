import React, { useContext, useState } from 'react';
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

function Login() {

    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { showAlert } = context;
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = credentials.email;
        const password = credentials.password;
        try {
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const json = await response.json();
            if (json.authToken) {
                localStorage.authToken = json.authToken;
                localStorage.userName = json.user.name;
                showAlert(json.message);
                navigate("/");
            } else {
                showAlert(json.message);
            }
        } catch (error) {
            showAlert("Server connection failed");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="container">
            <h3 className="my-2">Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input required type="email" pattern="+@globex\.com" size="30" className="form-control" onChange={onChange} value={credentials.email} id="email" name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input required type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name="password" />
                </div>
                <button type="submit" className="btn btn-primary">Log in</button>
            </form>
        </div>
    );
}

export default Login;
