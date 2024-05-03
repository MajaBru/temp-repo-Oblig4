import React from 'react';
import Axios from 'axios';

const Logout = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.removeItem('authToken');
    
        Axios.post('http://localhost:3001/api/user/logout', null, {
            withCredentials: true,
        })
    
        window.location.href = '/login';
        
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