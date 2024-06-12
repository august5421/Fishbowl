import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import LogoFont from "./LogoFont";
import { setActiveEntry, setTeamOneScore, setTeamTwoScore, setAllEntries, setActiveTeam, setActivePlayer, setGameState, setActiveRound } from "../actions/actions"; 
import { useTimer } from 'use-timer';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
const ClueLoop = (props) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const gameState = useSelector((state) => state.gameState);
  const playerIndex = useSelector((state) => state.playerIndex);
  const order = useSelector((state) => state.order);
  const allEntries = useSelector((state) => state.allEntries);
  const activeEntry = useSelector((state) => state.activeEntry);
  const activeRound = useSelector((state) => state.activeRound);
  const activeTeam = useSelector((state) => state.activeTeam);
  const activePlayer = useSelector((state) => state.activePlayer);
  const teamOneScore = useSelector((state) => state.teamOneScore);
  const teamTwoScore = useSelector((state) => state.teamTwoScore);
  const timeLimit = useSelector((state) => state.timeLimit);

  const [open, setOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeOver, setTimeOver] = useState(false);

  const { time, start, pause, reset } = useTimer({
    initialTime: timeLimit,
    endTime: 0,
    timerType: 'DECREMENTAL',
    autostart: true,
    onTimeOver: () => {
        if (!timeOver) { 
            setTimeOver(true); 
        }
    },
  });

  useEffect(() => {
    if (allEntries.length > 0) {
      const randomIndex = Math.floor(Math.random() * allEntries.length);
      dispatch(setActiveEntry(randomIndex));
    }
  }, [allEntries, dispatch]);

  useEffect(() => {
    if (timeOver) {
        if (activePlayer !== order.length - 1) {
            dispatch(setActivePlayer(activePlayer + 1));
        } else {
            dispatch(setActivePlayer(0));
        }
        if (activeTeam === 'teamOne') {
            dispatch(setActiveTeam('teamTwo'));
        } else {
            dispatch(setActiveTeam('teamOne'));
        }
        setTimeout(() => {
            setOpen(true);
        }, 250);
    }
}, [timeOver]);


  const handleSkip = () => {
    if (activeEntry !== allEntries.length - 1) {
        dispatch(setActiveEntry(activeEntry + 1))
    } else {
        dispatch(setActiveEntry(0))
    }
  };

  const handleCorrect = () => {
    if (activeTeam === 'teamOne') {
        dispatch(setTeamOneScore(teamOneScore + 1));
    } else {
       dispatch(setTeamTwoScore(teamTwoScore + 1)); 
    }
    const updatedEntries = [...allEntries];
    updatedEntries.splice(activeEntry, 1);

    if (updatedEntries.length > 0) {
        const randomIndex = Math.floor(Math.random() * updatedEntries.length);
        dispatch(setActiveEntry(randomIndex));
        dispatch(setAllEntries(updatedEntries));
    } else {
      dispatch(setActivePlayer(activePlayer + 1));
      if (activePlayer !== order.length - 1) {
          dispatch(setActivePlayer(activePlayer + 1));
      } else {
          dispatch(setActivePlayer(0));
      }
      if (activeTeam === 'teamOne') {
          dispatch(setActiveTeam('teamTwo'));
      } else {
          dispatch(setActiveTeam('teamOne'));
      }
      const allEntries = playerIndex.map(player => player.entries).flat();
      function shuffle(array) {
          for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
      }
      const shuffledEntries = shuffle(allEntries);
      dispatch(setAllEntries(shuffledEntries));
      if (activeRound == 0) {
          dispatch(setGameState(null))
          setTimeout(() => {
              dispatch(setGameState('currentScore'))    
          }, 500)
          dispatch(setActiveRound(activeRound + 1))
      } else {
          dispatch(setGameState(null))
          setTimeout(() => {
              dispatch(setGameState('currentScore'))    
          }, 500)
          dispatch(setActiveRound(activeRound + 1))
      }
    }
  }
    

  const handleClose = () => {
    setTimeOver(false);
    setOpen(false);
    reset(); 
    start();
    const randomIndex = Math.floor(Math.random() * allEntries.length);
    dispatch(setActiveEntry(randomIndex));
  };

  const handlePause = () => {
    pause();
    setIsPaused(true);
  }

  const handlePlay = () => {
    start();
    setIsPaused(false);
  }

  const progress = (time / timeLimit) * 100;

  return (
    <Box style={{ position: 'relative', display: 'flex', flexDirection: "column", flex: 1, width: '100%', height: 'calc(100vh - 77px)', justifyContent: 'center', alignItems: 'center' }}>
      {gameState !== null && gameState == 'actualGame' && (
        <Box
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 11
          }}
        >
          {!isPaused ? (
            <IconButton style={{color: theme.white}} onClick={handlePause}>
              <PauseIcon style={{color: theme.white}} />
            </IconButton>
          ) : (
            <IconButton style={{color: theme.white}} onClick={handlePlay}>
              <PlayArrowIcon style={{color: theme.white}} />
            </IconButton>
          )}
          
        </Box>
      )}
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="determinate" value={progress} size={100} thickness={5} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <LogoFont text={`${Math.round(time)}s`} color={theme.white} fontSize="25px" fontWeight={600} />
        </Box>
      </Box>
      <LogoFont text={allEntries[activeEntry]} color={theme.white} fontSize="25px" fontWeight={600} />
      <Box style={{ position: 'absolute', bottom: 0, display: 'flex', flex: 1, width: '100%', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
        <Button variant="contained" color="error" onClick={handleSkip} style={{ display: 'flex', flex: 1, marginRight: '8px' }}>
          Skip
        </Button>
        <Button variant="contained" color="success" onClick={handleCorrect} style={{ display: 'flex', flex: 1, marginLeft: '8px' }}>
          Got it
        </Button>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="times-up-modal-title"
        aria-describedby="times-up-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '70%', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <Typography id="times-up-modal-title" variant="h6" component="h2">
            Time's Up!
          </Typography>
          <Typography id="times-up-modal-description" sx={{ mt: 2 }}>
            Your time for this round has ended. <span style={{fontWeight: 700, color: theme.blueThree}}>{order[activePlayer]}</span> from {activeTeam.replace(/([a-z])([A-Z])/, '$1 $2').toLowerCase()} is up next. Hand them the phone and get ready to play!
          </Typography>
          <Button onClick={handleClose} variant="contained" style={{width: '100%', marginTop: '15px'}}>Ready!</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ClueLoop;
