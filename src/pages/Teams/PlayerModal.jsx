import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Select, MenuItem } from '@mui/material';

const PlayerModal = ({ customAxios, open, setOpen, data, setData, section, setPlayers }) => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('striker');
    const [height, setHeight] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (data !== null) {
            setName(data.name);
            setPosition(data.position);
            setHeight(data.height);
        } else {
            setName('');
            setPosition('striker');
            setHeight('');
        }
    }, [data]);

    const handlePositionChange = (e) => {
        setPosition(e.target.value);
    };

    const handleHeightChange = (e) => {
        const inputValue = e.target.value;
        if (!isNaN(inputValue)) {
            setHeight(inputValue);
            setError('');
        } else {
            setError('Height must be a number');
        }
    };

    const cleanupFunc = () => {
        setOpen(false);
        setData(null);
        setError('');
    };

    const handleSubmit = async () => {
        try {
            if (name.trim() === '' || position.trim() === '') {
                setError('All fields are required');
                return;
            }
            if (error !== '')
                return;
            if (data === null) {
                await customAxios.post("/add-player", { name, position, height, section });
                setPlayers((prev) => {
                    let arr = prev;
                    arr.push({ id: arr.length !== 0 ? arr[arr.length - 1].id + 1 : 0, name, position, height });
                    return arr;
                });
            } else {
                await customAxios.put("/update-player", { id: data.id, name, position, height });
                setPlayers((old) => {
                    let arr = [...old];
                    const index = arr.findIndex(x => x.id === data.id);
                    arr[index].name = name; arr[index].position = position; arr[index].height = height;
                    return arr;
                });
            }
        } catch (error) {
            alert("There is something wrong with the data you entered !");
        }
        cleanupFunc();
    };

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
                    {data === null ? "Add a new player" : "Edit player"}
                </Typography>
                <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    value={name}
                    sx={{ mb: 1 }}
                    onChange={(e) => setName(e.target.value)}
                    error={error.includes('name')}
                />
                <Select
                    fullWidth
                    label="Position"
                    variant="outlined"
                    value={position}
                    sx={{ mb: 1 }}
                    onChange={handlePositionChange}
                >
                    <MenuItem value="striker">Striker</MenuItem>
                    <MenuItem value="midfielder">Midfielder</MenuItem>
                    <MenuItem value="defender">Defender</MenuItem>
                    <MenuItem value="goalkeeper">Goalkeeper</MenuItem>
                </Select>
                <TextField
                    fullWidth
                    label="Height"
                    variant="outlined"
                    value={height}
                    sx={{ mb: 1 }}
                    onChange={handleHeightChange}
                    error={error.includes('Height')}
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

export default PlayerModal;
