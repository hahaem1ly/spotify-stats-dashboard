import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchTopTracks } from "../../backend/api";
import "./dashboardstyles.css";
import TopNav from "./components/TopNav";
import TopTracksGallery from "./components/GalleryTracks";

function Dashboard({ token }) {
    const [topTracks, setTopTracks] = useState([]); // State for top tracks
    const [currentView, setCurrentView] = useState("dashboard"); // State for switching views

    // Fetch top tracks
    useEffect(() => {
        const getTopTracks = async () => {
            if (!token) return;
            try {
                const tracks = await fetchTopTracks(token);
                setTopTracks(tracks);
            } catch (error) {
                console.error("Error fetching top tracks:", error);
            }
        };

        getTopTracks();
    }, [token]);

    // Handle navigation between views
    const handleNavigation = (view) => {
        setCurrentView(view);
    };

    return (
        <>
            <TopNav onNavigate={handleNavigation} /> {/* Navigation bar */}
            
            {/* Conditional rendering based on `currentView` */}
            {currentView === "dashboard" && (
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
            )}

            {currentView === "gallery" && (
                <div className="gallery-view">
                    <TopTracksGallery tracks={topTracks} />
                </div>
            )}
        </>
    );
}

Dashboard.propTypes = {
    token: PropTypes.string,
};

export default Dashboard;
