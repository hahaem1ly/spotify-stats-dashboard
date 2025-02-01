import axios from "axios";

export const fetchTopTracks = async (token) => {
    if (!token) return [];

    try {
        const response = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.items;
    } catch (error) {
        console.error("Error fetching top tracks:", error);
        return [];
    }
};
