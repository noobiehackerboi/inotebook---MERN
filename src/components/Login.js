import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const host = process.env.HOST;
    const navigate = useNavigate();

    const [user, setUser] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/routes/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        const json = await response.json();
        // console.log(json);
        if (json.success) {
            localStorage.setItem('auth-token', json.authToken);
            props.showAlert("Login successful", "success");
            navigate("/");
        } else {
            props.showAlert("Invalid credentials", "danger");
        }
    }
    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={user.email} onChange={onChange} className="form-control" name="email" id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={user.password} onChange={onChange} className="form-control" name='password' id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
