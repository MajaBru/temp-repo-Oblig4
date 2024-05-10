import React, { useState } from "react";
import { AxiosInstance } from "../../api/axiosService";
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
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await AxiosInstance.post('http://localhost:3001/api/user/login', userData);

            localStorage.setItem("user", JSON.stringify(response.data.user));
            console.log(localStorage.getItem("user"));
            navigate('/dashboard'); // we want to redirect based on user role
            // We need to reload react doesn't rerender when localStorage changes
            window.location.reload();

        } catch (error) {
            console.error('Error', error);
        }
    };


    return (
        <div>
            <h1>Login</h1>
            <form className="Login-form" onSubmit={handleSubmit}>

                <label>Email</label>
                <input type="text" name="email" id="email" value={userData.email} onChange={handleChange} />

                <label>Password</label>
                <input type="password" name="password" id="password" value={userData.password} onChange={handleChange} />

                <button type="submit" className="Default-button">Login</button>
            </form>
        </div>
    );
}

export default Login;
