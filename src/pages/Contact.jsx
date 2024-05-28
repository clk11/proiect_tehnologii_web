import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { LocationOn, Phone, Email } from '@mui/icons-material';

const contactInfo = {
  address: "Strada infrangerii nr 11, Craiova, Romania",
  phone: "0727356847",
  email: "contact@reactive.ro",
};

const ContactPage = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: 4, marginBottom: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <InfoItem icon={<LocationOn />} title="Address" content={contactInfo.address} />
        <InfoItem icon={<Phone />} title="Phone" content={contactInfo.phone} />
        <InfoItem icon={<Email />} title="Email" content={contactInfo.email} />
      </Box>
    </Container>
  );
};

const InfoItem = ({ icon, title, content }) => {
  return (
    <Box sx={{ backgroundColor: '#f9f9f9', padding: 3, borderRadius: 2, boxShadow: 1, flex: 1, display: 'flex', alignItems: 'center' }}>
      <Box sx={{ marginRight: 2 }}>{icon}</Box>
      <Box>
        <Typography variant="h5" gutterBottom>{title}</Typography>
        <Typography variant="body1">{content}</Typography>
      </Box>
    </Box>
  );
};

export default ContactPage;
