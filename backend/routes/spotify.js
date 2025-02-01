const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/top-tracks", async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send("Unauthorized");
    }

    try {
        const response = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
            headers: { Authorization: authorization },
        });
        res.json(response.data.items);
    } catch (error) {
        console.error("Error fetching top tracks:", error);
        res.status(500).send("Failed to fetch top tracks");
    }
});

module.exports = router;
