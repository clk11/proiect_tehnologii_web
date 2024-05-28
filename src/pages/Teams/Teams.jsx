import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import DetailsModal from './DetailsModal.jsx';
import customAxios from '../../server/utils/customAxios.js';
const teams = [
  {
    id: 1,
    name: "Male's roadster",
    section: "men_football",
    description: "Our top-tier team competing in the professional league.",
    imageUrl: "./men_team.webp",
  },
  {
    id: 2,
    name: "Females roadster",
    section: "female_football",
    description: "Empowering women in sports with our competitive team.",
    imageUrl: "./women_team.webp",
  },
  {
    id: 3,
    name: "Young fellas",
    section: "young_football",
    description: "Nurturing young talents for future success of our team.",
    imageUrl: "young_team.webp",
  },
];

const Teams = () => {
  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState(null);
  const [section, setSection] = useState(null);
  const triggerDetailsModal = async (section) => {
    const res = (await customAxios.get(`/get-players/${section}`));
    setPlayers(res.data);
    setSection(section);
    setOpen(true);
  }
  return (
    <Container style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <DetailsModal customAxios={customAxios} section={section} players={players} setPlayers={setPlayers} open={open} setOpen={setOpen} />
      <Typography variant="h4" component="h1" style={{ textAlign: 'center', marginBottom: '30px' }}>
        Our Teams
      </Typography>
      <Grid container spacing={3}>
        {teams.map((team) => (
          <Grid item key={team.id} xs={12} sm={6} md={4}>
            <Card
              onClick={() => triggerDetailsModal(team.section)}
              sx={{
                backgroundColor: '#f9f9f9',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  cursor: 'pointer'
                },
              }}
            >
              <CardMedia
                component="img"
                alt={team.name}
                height="140"
                image={team.imageUrl}
                sx={{ borderRadius: '10px 10px 0 0' }}
              />
              <CardContent>
                <Typography variant="h5" component="h2" sx={{ marginBottom: '10px' }}>
                  {team.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {team.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Teams;
