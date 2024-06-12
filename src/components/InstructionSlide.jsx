import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import LogoFont from "../components/LogoFont";
import { Button, Fade, Typography } from '@mui/material';
import { setGameState } from '../actions/actions';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import PasswordIcon from '@mui/icons-material/Password';

const InstructionSlide = (props) => {
  const theme = useSelector((state) => state.theme);
  const teams = useSelector((state) => state.teams);
  const activeTeam = useSelector((state) => state.activeTeam);
  const mobile = useSelector((state) => state.mobile);
  const order = useSelector((state) => state.order);
  const activePlayer = useSelector((state) => state.activePlayer);
  const dispatch = useDispatch();
  
  const handleStartClueLoop = () => {
    dispatch(setGameState(null))
    setTimeout(() => {
        dispatch(setGameState('actualGame'))    
    }, 500)
  }
  const instructions = [{
    title: 'Round One - Taboo',
    description: 'Describe the clue without using words from the clue itself and try to get your team to guess as many clues as possible. Players can’t use rhymes, parts of the clue, or hand gestures.',
    icon: <RecordVoiceOverIcon style={{color: theme.white, fontSize: '250px', margin: '15px'}} />,
  },
  {
    title: 'Round Two - Charades',
    description: 'Act out the clue without speaking and try to get your team to guess as many clues as possible. Players can’t make any sounds or use props.',
    icon: <AccessibilityNewIcon style={{color: theme.white, fontSize: '250px', margin: '15px'}} />,
  },
  {
    title: 'Round Three - Password',
    description: 'Use one word to describe the clue without using the word itself or any part of it and try to get your team to guess as many clues as possible.',
    icon: <PasswordIcon style={{color: theme.white, fontSize: '250px', margin: '15px'}} />,
  },
]

  return (
    <Box style={{display: 'flex', flexDirection: "column", flex: 1, width: mobile ? '100%' : '50%', paddingTop: '16px', alignItems: 'center'}}>
        <LogoFont text={instructions[props.round].title} color={theme.white} fontSize="25px" fontWeight={600} />
        <Typography align="center" color={theme.white}>
            {instructions[props.round].description}
        </Typography>
        {instructions[props.round].icon}
        <Box style={{display: 'flex', flexDirection: "row", width: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
            <Typography align="center" color={theme.white}>
                <span style={{fontWeight: 700, color: theme.white}}>{order[activePlayer]}</span> from {activeTeam.replace(/([a-z])([A-Z])/, '$1 $2').toLowerCase()} is up first. Pass them the phone and get ready to play
            </Typography>
        </Box>
        <Button
            onClick={handleStartClueLoop}
            style={{
                color: theme.white,
                borderColor: theme.white,
                borderWidth: '2px',
                width: mobile ? '70%' : '50%',
                margin: '10px auto'
            }}
            variant="contained"
        >
            <span style={{fontWeight: 900}}>Go!</span>
        </Button>
    </Box>
  );
};

export default InstructionSlide;

