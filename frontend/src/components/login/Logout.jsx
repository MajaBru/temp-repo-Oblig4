import React from 'react';
import { AxiosInstance } from '../../api/axiosService';

const Logout = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.removeItem('authToken');
    
        AxiosInstance.get('http://localhost:3001/api/user/logout', null)
    
        //window.location.href = '/login';
        
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