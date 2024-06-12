import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Fade, TextField, Box } from '@mui/material';
import { updatePlayerField, addPlayer, setScrollPosition, setPlayerCount, setPlayerErrors } from '../actions/actions';
import LogoFont from "./LogoFont";
import './components.css';
import sound from '../assets/mp3/bubbles.mp3';

const PlayerForm = ({ index }) => {
    const dispatch = useDispatch();
    const playerIndex = useSelector((state) => state.playerIndex);
    const playerCount = useSelector((state) => state.playerCount);
    const numberOfEntries = useSelector((state) => state.numberOfEntries);
    const theme = useSelector((state) => state.theme);
    const scrollPosition = useSelector((state) => state.scrollPosition);
    const playerErrors = useSelector((state) => state.playerErrors);
    const [formErrors, setFormErrors] = useState('');

    const handleAdd = () => {
        const currentPlayer = playerIndex[playerIndex.length - 1];
        const entryErrors = currentPlayer.entries.map(entry => entry === '');

        // Check for empty fields
        if (currentPlayer.playerName === '' || entryErrors.includes(true)) {
            const errors = {
                playerName: currentPlayer.playerName === '',
                entries: entryErrors,
            };
            setFormErrors('Please fill out all fields before adding a new player.');
            dispatch(setPlayerErrors(errors));
            return;
        }

        const uniqueEntries = new Set(currentPlayer.entries);
        const duplicateEntryIndexes = currentPlayer.entries
            .map((entry, idx) => uniqueEntries.has(entry) ? idx : null)
            .filter(idx => idx !== null);
        
        if (duplicateEntryIndexes.length !== currentPlayer.entries.length) {
            const errors = {
                playerName: false,
                entries: currentPlayer.entries.map((entry, idx) => duplicateEntryIndexes.includes(idx))
            };
            setFormErrors('Duplicate entries are not allowed.');
            dispatch(setPlayerErrors(errors));
            return;
        }

        const allEntries = playerIndex.flatMap(player => player.entries);
        const duplicateAcrossPlayers = currentPlayer.entries.map(entry => 
            allEntries.filter(e => e === entry).length > 1
        );

        if (duplicateAcrossPlayers.includes(true)) {
            const errors = {
                playerName: false,
                entries: duplicateAcrossPlayers
            };
            setFormErrors('Duplicate entries are not allowed.');
            dispatch(setPlayerErrors(errors));
            return;
        }

        const playerNames = playerIndex.map(player => player.playerName);
        if (playerNames.filter(name => name === currentPlayer.playerName).length > 1) {
            const errors = {
                playerName: true,
                entries: Array(numberOfEntries).fill(false),
            };
            setFormErrors('Player names must be unique.');
            dispatch(setPlayerErrors(errors));
            return;
        }

        dispatch(addPlayer());
        setTimeout(() => {
            dispatch(setPlayerCount(playerCount + 1));
        }, 400);
        dispatch(setScrollPosition('onBoardingBlock', scrollPosition.onBoardingBlock - 100));
        const audio = new Audio(sound);
        audio.play().catch(error => {
            console.error("Failed to play audio:", error);
        });
        if (scrollPosition.main > -1900) {
            dispatch(setScrollPosition('main', scrollPosition.main - 100));
        }
    };

    const handleFieldChange = (field, value) => {
        setFormErrors('');
        const errors = { playerName: false, entries: Array(numberOfEntries).fill(false) };
        dispatch(setPlayerErrors(errors));
        dispatch(updatePlayerField(index, field, value));
    };
    
    return (
        <>
            <Fade in={true}>
                <Box>
                    <LogoFont text={"Player " + (index + 1)} color={theme.white} fontSize="40px" align="center" fontWeight={600} />
                    {formErrors !== '' && (<div style={{color: '#c44242', textAlign: 'center', fontFamily: 'arial', fontWeight: '600', margin: '0px 0px 15px 0px'}}>{formErrors}</div>)}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField
                            label="Player Name"
                            value={playerIndex[index].playerName}
                            onChange={(e) => handleFieldChange('playerName', e.target.value)}
                            variant="filled"
                            style={{ marginBottom: '10px', width: '300px' }}
                            InputLabelProps={{
                                style: { color: theme.white },
                            }}
                            InputProps={{
                                style: { color: theme.white, borderColor: theme.white },
                            }}
                            error={playerErrors.playerName}
                        />
                        {playerIndex[index].entries.map((entry, entryIndex) => (
                            <TextField
                                key={entryIndex}
                                label={`Entry ${entryIndex + 1}`}
                                value={entry}
                                onChange={(e) => handleFieldChange(entryIndex, e.target.value)}
                                variant="filled"
                                style={{ marginBottom: '10px', width: '300px' }}
                                InputLabelProps={{
                                    style: { color: theme.white },
                                }}
                                InputProps={{
                                    style: { color: theme.white, borderColor: theme.white },
                                }}
                                error={playerErrors.entries[entryIndex]}
                            />
                        ))}
                    </div>
                </Box>
            </Fade>
            {index === playerIndex.length - 1 ? (
                <Button
                    onClick={handleAdd}
                    style={{
                        color: theme.white,
                        borderColor: theme.white,
                        borderWidth: '2px',
                        margin: '10px auto'
                    }}
                    variant="contained"
                >
                    <span style={{fontWeight: 900}}>Add!</span>
                </Button>
            ) : null}
        </>
    );
};

export default PlayerForm;
