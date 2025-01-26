import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboardstyles.css"; // Import the separate stylesheet

function Dashboard({ token }) {
    const [topTracks, setTopTracks] = useState([]);

    useEffect(() => {
        if (!token) return;

        // Fetch user's top tracks
        axios
            .get("https://api.spotify.com/v1/me/top/tracks", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setTopTracks(response.data.items);
            })
            .catch((error) => {
                console.error("Error fetching top tracks:", error);
            });
    }, [token]);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Your Spotify Dashboard</h1>
            <h2 className="dashboard-subtitle">Your Top Tracks</h2>
            <ul className="track-list">
                {topTracks.map((track) => (
                    <li className="track-item" key={track.id}>
                        <div className="track-info">
                            <img
                                className="track-image"
                                src={track.album.images[0]?.url}
                                alt={track.name}
                            />
                            <div>
                                <p className="track-name">{track.name}</p>
                                <p className="track-artist">{track.artists[0].name}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
