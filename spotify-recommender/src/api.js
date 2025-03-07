//to handle api calls to fastapi backend

import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Change when deployed

export const loginToSpotify = () => {
    window.location.href = `${API_BASE_URL}/`;
};

export const fetchRecentlyPlayed = async () => {
    const response = await axios.get(`${API_BASE_URL}/recently_played`);
    return response.data;
};

export const fetchRecommendations = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/recommendations`, {
            timeout: 60000, // 60 seconds timeout
        });

        console.log("API Response:", response.data); // ✅ Log response

        if (!response.data || !response.data.recommendations) {
            throw new Error("Invalid API response structure");
        }

        return response.data;
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        return { recommendations: [] }; // Return an empty object to prevent crashes
    }
};

