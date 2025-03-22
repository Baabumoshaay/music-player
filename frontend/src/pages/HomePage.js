import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MusicPlayer from "../components/MusicPlayer";
import MusicList from "../components/MusicList";
import "../styles/HomePage.css";

const HomePage = () => {
  const [musicTracks, setMusicTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/music");
        setMusicTracks(response.data);
      } catch (error) {
        console.error("Error fetching music:", error);
      }
    };
    fetchMusic();
  }, []);

  const handleTrackEnd = () => {
    const currentIndex = musicTracks.findIndex((track) => track.id === currentTrack.id);
    const nextTrack = musicTracks[(currentIndex + 1) % musicTracks.length];
    setCurrentTrack(nextTrack);
  };

  return (
    <div className="home-page">
      <header className="navbar">
        <div className="logo">🎵 Cloud Music</div>
        <nav className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </header>

      <section className="hero">
        <h1>Welcome to Cloud Music Player</h1>
        <p>Stream your favorite music anytime, anywhere. 🎧</p>
      </section>

      <section className="music-preview">
        <h2>🎶 Preview a Track</h2>
        <MusicPlayer
          currentTrack={currentTrack}
          onTrackEnd={handleTrackEnd}
          audioRef={audioRef}
          setIsPlaying={() => {}}
        />
        <MusicList musicTracks={musicTracks.slice(0, 3)} onSelectTrack={setCurrentTrack} />
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Cloud Music Player. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
