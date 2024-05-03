/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/user/login', userData, {
            withCredentials: true
        })
            .then(response => {
                console.log("Successful login", response);
                localStorage.setItem('authToken', response.data.token)
            })
            .catch(err => {
                console.error('Error posting', err);
            });
    };

    return (
        <div>
            <h1>Login</h1>
            <form className="Login-form" onSubmit={handleSubmit}>

                <label>Email</label>
                <input type="text" name="email" id="email" value={userData.email} onChange={handleChange} />

                <label>Password</label>
                <input type="text" name="password" id="password" value={userData.password} onChange={handleChange} />

                <button type="submit" className="Default-button">Login</button>
            </form>
        </div>
    );
}

export default Login;
