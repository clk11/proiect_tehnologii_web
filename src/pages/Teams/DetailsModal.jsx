import React, { useEffect, useState, useContext } from 'react';
import { Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { AuthContext } from '../../App.jsx';
import PlayerModal from './PlayerModal.jsx';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const DetailsModal = ({ customAxios, setPlayers, players, section, open, setOpen }) => {
    const { isAuth } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [playerModalOpen, setPlayerModalOpen] = useState(false);
    const [playerData, setPlayerData] = useState(null);
    useEffect(() => {
        if (players && section)
            setLoading(false);
    }, [players, section]);

    const handleEditPlayer = (player) => {
        setPlayerData(player);
        setPlayerModalOpen(true);
    };

    const handleAddPlayer = () => {
        setPlayerData(null);
        setPlayerModalOpen(true);
    }

    const handleDeletePlayer = async (id) => {
        try {
            await customAxios.delete(`/delete-player/${id}`);
            setPlayers(players.filter(x => x.id !== id));
        } catch (error) {
            alert("Something wrong happened !");
        }
    }

    return (
        <>
            {!loading && (
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, minWidth: 500, maxHeight: '80vh', overflowY: 'auto' }}>
                        <PlayerModal
                            open={playerModalOpen} setOpen={setPlayerModalOpen}
                            data={playerData} setData={setPlayerData}
                            setPlayers={setPlayers}
                            customAxios={customAxios} section={section}
                        />
                        <Typography sx={{ textAlign: 'center' }} variant="h5" gutterBottom id="player-details-modal">
                            Player Details
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table aria-label="player-details-table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Position</TableCell>
                                        <TableCell>Height (cm)</TableCell>
                                        {isAuth && (
                                            <TableCell style={{ textAlign: 'center' }}>Edit/Delete</TableCell>
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {players.map((player, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{player.name}</TableCell>
                                            <TableCell>{player.position}</TableCell>
                                            <TableCell>{player.height}</TableCell>
                                            <TableCell>
                                                {isAuth && <DeleteIcon onClick={() => handleDeletePlayer(player.id)} sx={{ color: 'red', mr: 2 }} />}
                                                {isAuth && <EditIcon onClick={() => handleEditPlayer(player)} sx={{ color: 'blue', mt: 2 }} />}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {isAuth && (
                                        <TableRow>
                                            <TableCell colSpan={3} align="left">
                                                <Button onClick={handleAddPlayer} variant="contained">Add a new player</Button>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Modal>
            )}
        </>
    );
};

export default DetailsModal;
