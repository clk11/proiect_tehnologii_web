import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, Paper, Button } from '@mui/material';
import AnnouncementModal from './AnnouncementModal.jsx';
import customAxios from '../../server/utils/customAxios.js';
import { AuthContext } from '../../App.jsx';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';

const Announcements = () => {
  const [data, setData] = useState(null);
  const { isAuth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const results = await customAxios.get('/get-announcements');
      setAnnouncements(results.data.announcements);
      setLoading(false);
    }
    fetch();
  }, []);

  const onDelete = async (id) => {
    try {
      await customAxios.delete(`/delete-announcement/${id}`);
      setAnnouncements(announcements.filter(x => x.id !== id));
    } catch (error) {
      alert("Something wrong happened !")
    }
  }
  return (
    <>
      {!loading ? (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 3 }}>
          {isAuth && (
            <AnnouncementModal data={data} setData={setData} setAnnouncements={setAnnouncements} open={open} setOpen={setOpen} />
          )}
          {isAuth && (
            <Button onClick={() => { setOpen(true) }} sx={{ mb: 3 }} variant='contained' color='primary'>Add a new announcement</Button>
          )}
          <Typography variant="h4" component="h1" sx={{ marginBottom: 3, textAlign: 'center' }}>
            Football Announcements
          </Typography>
          {announcements.map((announcement) => (
            <Paper
              key={announcement.id}
              sx={{
                marginBottom: 3,
                padding: 3,
                backgroundColor: '#f7f7f7',
                borderRadius: 2,
                maxWidth: 600,
                width: '100%',
                boxShadow: 3,
                '&:hover': {
                  boxShadow: 6,
                },
                display: 'flex',
                alignItems: 'center'
              }}
              variant="outlined"
            >
              <div style={{ flex: 1 }}>
                <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
                  {announcement.title}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  {announcement.description}
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                  Date: {announcement.date}
                </Typography>
              </div>
              {isAuth && <DeleteIcon onClick={async () => { await onDelete(announcement.id) }} sx={{ color: 'red', mr: 2 }} />}
              {isAuth && <EditIcon onClick={() => { setData(announcement); setOpen(true); }} sx={{ color: 'blue' }} />}
            </Paper>
          ))}
        </Container>
      ) : (
        <CircularProgress sx={{ textAlign: 'center' }} />
      )}
    </>
  );
};

export default Announcements;
