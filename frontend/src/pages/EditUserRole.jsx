import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditUserRole = () => {
    const { id } = useParams();
    const [role, setRole] = useState("");
    const [currentRole, setCurrentRole] = useState("");

    const handleChange = (e) => {

        setRole(e.target.value);
    };

    useEffect(() => {
        const updateUserRole = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/user/${id}`);
                setRole(response.data.role);
                setCurrentRole(response.data.role);
            } catch (error) {
                console.error("Error fetching user role", error);
            }
        };
        updateUserRole();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/api/user/role/${id}`, { role });
            console.log("updated user role");
            alert("User role was updated");
            setCurrentRole(role);
        } catch (error) {
            console.error("Error updating user role:", error);
        }
    };

    return (
        <div>
            <h1>Edit User Role</h1>
            <p>Current role: {currentRole}</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Role:
                    <select
                        name="role"
                        value={role} 
                        onChange={handleChange}>

                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>
                </label>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}
export default EditUserRole;
