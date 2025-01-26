import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Callback({ setToken }) {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (!code) {
            console.error('Authorization code not found.');
            return;
        }

        const body = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: import.meta.env.VITE_REDIRECT_URI,
        });

        const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
        const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
        const authHeader = btoa(`${client_id}:${client_secret}`);

        axios.post('https://accounts.spotify.com/api/token', body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${authHeader}`,
            },
        })
        .then((response) => {
            const accessToken = response.data.access_token;
            setToken(accessToken); // Save the token in App state
            navigate('/dashboard'); // Navigate to the dashboard
        })
        .catch((error) => {
            console.error('Error exchanging code for token:', error.response?.data || error.message);
        });
    }, [navigate, setToken]);

    return (
        <div>
            <h2>Callback</h2>
            <p>Authenticating.asda..</p>
        </div>
    );
}

export default Callback;
