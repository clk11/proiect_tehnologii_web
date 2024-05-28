import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import customAxios from '../../server/utils/customAxios.js';

const AnnouncementModal = ({ open, setOpen, setAnnouncements, data, setData }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (data !== null) {
            setTitle(data.title);
            setDescription(data.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [data]);

    const handleSubmit = async () => {
        try {
            if (title.trim() === '' || description.trim() === '') {
                setError('Title and description are required');
                return;
            }
            setError('');

            if (data === null) {
                const date = getDate();
                await customAxios.post('/add-announcement', { title, description, date });
                setAnnouncements((old) => {
                    let arr = [...old];
                    const newId = arr.length !== 0 ? arr[0].id + 1 : 0;
                    arr.unshift({ id: newId, title, description, date });
                    return arr;
                });
            } else {
                if (data.title !== title || data.description !== description) {
                    await customAxios.put("/update-announcement", { id: data.id, title, description });
                    setAnnouncements((old) => {
                        let arr = [...old];
                        const index = arr.findIndex(x => x.id === data.id);
                        arr[index].title = title; arr[index].description = description;
                        return arr;
                    });
                }
            }
        } catch (error) {
            alert("There is something wrong with the data you entered !");
        }
        cleanupFunc();
    };

    const cleanupFunc = () => {
        setOpen(false);
        setData(null);
        setTitle('');
        setDescription('');
        setError('');
    };

    const getDate = () => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }

    return (
        <Modal open={open} onClose={cleanupFunc}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" component="h2" align="center" gutterBottom>
                    {data === null ? "Add a new announcement" : "Edit the announcement"}
                </Typography>
                <TextField
                    fullWidth
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                    error={error.includes('Title')}
                />
                <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    margin="normal"
                    error={error.includes('description')}
                />
                {error && (
                    <Typography variant="body2" color="error">
                        {error}
                    </Typography>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSubmit}
                    sx={{ mt: 2 }}
                >
                    {data === null ? "Submit" : "Update"}
                </Button>
            </Box>
        </Modal>
    );
};

export default AnnouncementModal;
