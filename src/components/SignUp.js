import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
    const host = process.env.HOST;
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "", email: "", password: "", cpassword: "" });
    const { name, email, password } = user;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/routes/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        // console.log(json);
        if (json.success) {
            localStorage.setItem('auth-token', json.authToken);
            props.showAlert("User created successfully", "success");
            navigate("/");
        } else {
            props.showAlert("Invalid credentials", "danger");
        }
    }
    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} required minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} required minLength={5} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
