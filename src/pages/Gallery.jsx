import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';

const galleryImages = [
  { id: 1, src: "/player5.webp", alt: "Player 2" },
  { id: 2, src: "/player.webp", alt: "Player 3" },
  { id: 3, src: "/captain.webp", alt: "Player 5" },
  { id: 4, src: "/player2.webp", alt: "Player 2" },
  { id: 5, src: "/pose1.webp", alt: "Player 3" },
  { id: 6, src: "/pose2.webp", alt: "Player 5" },
  { id: 7, src: "/pose3.webp", alt: "Player 2" },
  { id: 8, src: "/pose4.webp", alt: "Player 3" },
  { id: 9, src: "/post5.webp", alt: "Player 5" },
  { id: 10, src: "/player2.webp", alt: "Player 2" },
];

const Gallery = () => {
  return (
    <Container style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h4" component="h1" style={{ textAlign: 'center', marginBottom: '30px' }}>
        Gallery
      </Typography>
      <Grid container spacing={3}>
        {galleryImages.map((image) => (
          <Grid item key={image.id} xs={12} sm={6} md={4}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: '100%',
                overflow: 'hidden',
                borderRadius: '10px',
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Box
                component="img"
                src={image.src}
                alt={image.alt}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Gallery;
