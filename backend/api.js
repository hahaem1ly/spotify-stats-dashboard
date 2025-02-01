const axios = require("axios");

const fetchTopTracks = async (req, res) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) return res.status(401).json({ error: "No token provided" });

        const response = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
            headers: { Authorization: authorization },
        });

        res.json(response.data.items);
    } catch (error) {
        console.error("Error fetching top tracks from Spotify:", error);
        res.status(500).json({ error: "Failed to fetch top tracks" });
    }
};

module.exports = { fetchTopTracks };
