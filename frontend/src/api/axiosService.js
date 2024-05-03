import Axios from "axios";

const BASE_URL = "http://localhost:3001";

const token = localStorage.getItem('authToken');
/*
const AxiosInstance = Axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})
*/
const Authconfig = {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
};

const FileConfig = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
};

// operations
export const fetchMissionCards = async () => {
    try {
        const response = await Axios.get(`${BASE_URL}/search?card_type=Mission`, Authconfig);
        return response.data;
    } catch (error) {
        console.error("Error fetching mission cards", error);
    }
    };

export const fetchAssessmentCards = async () => {
    try {
        const response = await Axios.get(`${BASE_URL}/search?card_type=Assessment`, Authconfig);
        return response.data;
    } catch (error) {
        console.error("Error fetching assessment cards", error);
    }
};

// get one card from all cards
export const fetchCard = async (id) => {
    try {
        const response = await Axios.get(`${BASE_URL}/cards/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching card", error);
    }
};

export const fetchUsers = async () => {
    try {
        const response = await Axios.get(`${BASE_URL}/api/user`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users", error);
    }
};


export const fetchUser = async (id) => {
    try {
        const response = await Axios.get(`${BASE_URL}/api/user/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user", error);
    }
};

export const updateUserRole = async (id, role) => {
    try {
        const response = await Axios.put(`${BASE_URL}/api/user/${id}`, role, Authconfig);
        return response.data;
    } catch (error) {
        console.error("Error updating user role", error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await Axios.delete(`${BASE_URL}/api/user/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting user", error);
    }
};


export const createMissionCard = async (cardData) => {
    try {
        const response = await Axios.post(`${BASE_URL}/missioncards`, cardData, Authconfig);
        return response.data;
    } catch (error) {
        console.error("Error creating mission card", error);
    }
};

export const createAssessmentCard = async (cardData) => {
    try {
        const response = await Axios.post(`${BASE_URL}/assessmentcards`, cardData, Authconfig);
        return response.data;
    } catch (error) {
        console.error("Error creating assessment card", error);
    }
};


export const deleteMissionCard = async (cardId) => {
    try {
        const response = await Axios.delete(`${BASE_URL}/missioncards/${cardId}`, Authconfig);
        return response.data;
    } catch (error) {
        console.error("Error deleting mission card", error);
    }
};

export const deleteAssessmentCard = async (cardId) => {
    try {
        const response = await Axios.delete(`${BASE_URL}/assessmentcards/${cardId}`, Authconfig);
        return response.data;
    } catch (error) {
        console.error("Error deleting assessment card", error);
    }
};

export const updateMissionCard = async (id, updatedCard) => {
    try {
        const response = await Axios.put(`${BASE_URL}/missioncards/${id}`, updatedCard, Authconfig);
        return response.data;
    } catch (error) {
        console.error("Error updating mission card", error);
    }
};

export const updateAssessmentCard = async (id, updatedCard) => {
    try {
        const response = await Axios.put(`${BASE_URL}/assessmentcards/${id}`, updatedCard, Authconfig);
        return response.data;
    } catch (error) {
        console.error("Error updating assessment card", error);
    }
}

export const updateMissionCardIcon = async (id, cardIcon) => {
    try {
        const formData = new FormData();
        formData.append('file', cardIcon);
        const response = await Axios.put(`${BASE_URL}/missioncards/upload/${id}`, formData, FileConfig);
        return response.data;
    } catch (error) {
        console.error("Error updating mission card icon", error);
    }
};

export const updateAssessmentCardIcon = async (id, cardIcon) => {
    try {
        const formData = new FormData();
        formData.append('file', cardIcon);
        const response = await Axios.put(`${BASE_URL}/assessmentcards/upload/${id}`, formData, FileConfig);
        return response.data;
    } catch (error) {
        console.error("Error updating assessment card icon", error);
    }
};
