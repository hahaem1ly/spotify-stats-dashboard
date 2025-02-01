import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import Dashboard from "./Dashboard";

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${

    import.meta.env.VITE_SPOTIFY_CLIENT_ID
}&response_type=code&redirect_uri=${encodeURIComponent(
    import.meta.env.VITE_REDIRECT_URI
)}&scope=user-read-private%20user-read-email%20user-top-read`;

console.log("Client ID:", import.meta.env.VITE_SPOTIFY_CLIENT_ID);
console.log("Redirect URI:", import.meta.env.VITE_REDIRECT_URI);


function Login() {
    return (
        <div className="vinyl-container">
            <div className="vinyl-wrapper">
                <img
                    src="../vinyl.png"
                    alt="Vinyl Record"
                    className="vinyl"
                />
            </div>
            <div className="content">
                <h1 className="title">
                    <span className="highlight">Spotify Dashboard</span>
                </h1>
                <p className="subtitle">
                    Dive into your Spotify stats and favorite tracks.
                </p>
                <a href={AUTH_URL}>
                    <button className="login-btn">Login with Spotify</button>
                </a>
            </div>
        </div>
    );
}

function Callback() {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            // Exchange the authorization code for an access token
            axios
                .post(
                    "https://accounts.spotify.com/api/token",
                    new URLSearchParams({
                        grant_type: "authorization_code",
                        code: code,
                        redirect_uri: import.meta.env.VITE_REDIRECT_URI,
                        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
                        client_secret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
                    }),
                    {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    }
                )
                .then((response) => {
                    const { access_token } = response.data;
                    localStorage.setItem("spotify_token", access_token);
                    navigate("/dashboard");
                })
                .catch((error) => {
                    console.error("Error exchanging code for token:", error);
                });
        }
    }, [navigate]);

    return (
        <div className="callback-container">
            <h1>Processing your Spotify login...</h1>
        </div>
    );
}

function App() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("spotify_token");
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/callback" element={<Callback />} />
                <Route path="/dashboard" element={<Dashboard token={token} />} />
            </Routes>
        </Router>
    );
}

export default App;
