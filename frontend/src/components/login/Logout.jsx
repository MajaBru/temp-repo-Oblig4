import React from 'react';
import { AxiosInstance } from '../../api/axiosService';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        AxiosInstance.get('http://localhost:3001/api/user/logout', null)
            .then(response => {
                console.log(response.data)
                localStorage.removeItem("user");
                navigate('/');
                // We need to reload react doesn't rerender when localStorage changes
                window.location.reload();
            })
            .catch(err => {
                console.error('Error posting', err);
            });
    };

    return (
        <div>
            <h1>Log out</h1>
            <form className="Logout-form" onSubmit={handleSubmit}>
                <button type="submit" className="Default-button">Logout</button>
            </form>
        </div>
    );
};

export default Logout;
