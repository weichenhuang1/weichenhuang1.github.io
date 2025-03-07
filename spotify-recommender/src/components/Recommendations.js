import React, { useState } from "react";
import { fetchRecommendations } from "../api";
import PlaylistButton from "./PlaylistButton";

const Recommendations = () => {
    const [songs, setSongs] = useState([]);
    const [playlistUrl, setPlaylistUrl] = useState(null);
    const [loading, setLoading] = useState(false); // 🔹 Track loading state
    const [buttonText, setButtonText] = useState("Get Recommendations");

    const getRecommendations = async () => {
        setLoading(true); // ✅ Show "Loading..."
        setButtonText("Loading...");
        
        try {
            const data = await fetchRecommendations();
            setSongs(data.recommendations);
            setPlaylistUrl(data.playlist_url);
            setButtonText("Happy Listening!");
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        } finally {
            setLoading(false); // ✅ Hide "Loading..." after fetching
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>Recommended Songs</h2>

            <button onClick={getRecommendations} style={styles.button} disabled={loading}>
                {buttonText}  {/* ✅ Button text dynamically updates */}
            </button>

            {loading && <p style={{ color: "blue" }}>Loading...</p>}

            <ul style={styles.list}>
                {songs.map((song, index) => (
                    <li key={index} style={styles.item}>
                        {song.artist} - {song.track} (<a href={song.url} target="_blank" rel="noopener noreferrer">Listen</a>)
                    </li>
                ))}
            </ul>

            {songs.length > 0 && <PlaylistButton />}
            {playlistUrl && <p><a href={playlistUrl} target="_blank">View Playlist</a></p>}
        </div>
    );
};

const styles = {
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#1DB954",
        color: "white",
        border: "none",
        borderRadius: "20px",
        cursor: "pointer",
        margin: "10px",
    },
    list: { listStyle: "none", padding: 0 },
    item: { padding: "10px", fontSize: "18px" },
};

export default Recommendations;
