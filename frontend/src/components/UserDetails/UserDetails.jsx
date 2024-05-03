import React, { useState, useEffect } from "react";
import { AxiosInstance, fetchUsers, deleteUser } from "../../api/axiosService";
import "./UserDetails.css";
import { Link } from "react-router-dom";

const UserDetails = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await fetchUsers();
                setUsers(users);
            } catch (error) {
                console.error('Error fetching users', error);
            }
        };
        fetchData();
    }, []);

    const handleDeleteUser = async (id) => {
        const confirmDel = window.confirm("Are you sure you want to delete this user?");
        if (confirmDel) {
            try {
                await deleteUser(id);
                window.location.reload();
                console.log("Successfully deletion");
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    }
    return (
        <div>
            <h1>Users</h1>
            <div className="User-details">
                <table className="Users-Table">
                    <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Position</th>
                            <th>University</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            
                            <tr key={user.user_id}>
                                <td>{user.first_name}</td>
                                <td>{user.surname}</td>
                                <td>{user.position}</td>
                                <td>{user.university}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <div className="Action-buttons">
                                    <Link to={`/manage/users/edit/${user._id}`}>
                                    <button className="Default-button">Edit role</button>
                                    </Link>
                                    <button onClick={() => handleDeleteUser(user._id)} className="Default-button">Delete</button>
                                    
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserDetails;