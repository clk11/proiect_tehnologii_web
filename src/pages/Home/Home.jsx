import React, { useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ setNavbarVisible }) => {
  useEffect(() => {
    setNavbarVisible(false);
    return () => {
      setNavbarVisible(true);
    }
  }, [])
  const navigate = useNavigate();
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url(/pose1.webp)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '2rem',
        textAlign: 'center',
        width: '100%',
        maxWidth: '37.5rem',
      }}>
        <Typography variant="h2" component="h1" style={{ marginBottom: '24px', color: 'white' }}>
          {"FC Reactive"}
        </Typography>
        <Typography variant="body1" style={{ color: 'white' }}>
          We are a passionate team dedicated to the game of football.
        </Typography>
        <Button onClick={() => { setNavbarVisible(true); navigate("/announcements"); }} variant="contained" color="primary" style={{ marginTop: '16px', animation: 'vibrate 0.5s infinite' }}>
          See more
        </Button>
      </div>
    </div>
  );
};

export default Home;
