import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import LogoFont from "../components/LogoFont";
import { Button, Fade, Typography } from '@mui/material';
import { setActiveEntry, setTeamOneScore, setTeamTwoScore, setAllEntries, setActiveTeam, setActivePlayer, setGameState, setActiveRound } from "../actions/actions"; 

const CurrentScore = (props) => {
  const theme = useSelector((state) => state.theme);
  const teamOneScore = useSelector((state) => state.teamOneScore);
  const teamTwoScore = useSelector((state) => state.teamTwoScore);
  const activeRound = useSelector((state) => state.activeRound);
  const mobile = useSelector((state) => state.mobile);
  const dispatch = useDispatch();
  const handleNextRound = () => {
    if (activeRound == 1) {
        dispatch(setGameState(null))
        setTimeout(() => {
            dispatch(setGameState('roundTwoInstruct'))    
        }, 500)
    } else {
        dispatch(setGameState(null))
        setTimeout(() => {
            dispatch(setGameState('roundThreeInstruct'))    
        }, 500)
    }
    
  }
  const handleEndRound = () => {
    props.handleStop();
  }
  return (
    <Box style={{ position: 'relative', display: 'flex', flexDirection: "column", flex: 1, width: '100%', height: 'calc(100vh - 77px)', justifyContent: 'center', alignItems: 'center' }}>
        {activeRound == 3 && <LogoFont text="Game Over!" color={theme.white} fontSize="25px" fontWeight={600} />}
        <Box style={{display: 'flex', flexDirection: "column", flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <LogoFont text="Team One Score:" color={theme.white} fontSize="25px" fontWeight={600} />
            <LogoFont text={teamOneScore + " Points"} color={theme.blueOne} fontSize="25px" fontWeight={600} />
        </Box>
        <Box style={{display: 'flex', flexDirection: "column", flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <LogoFont text="Team Two Score:" color={theme.white} fontSize="25px" fontWeight={600} />
            <LogoFont text={teamTwoScore + " Points"} color={theme.blueOne} fontSize="25px" fontWeight={600} />
        </Box>
        {activeRound !== 3 ? (
            <Button
                onClick={handleNextRound}
                style={{
                    color: theme.white,
                    borderColor: theme.white,
                    borderWidth: '2px',
                    width: mobile ? '70%' : '50%',
                    margin: '10px auto'
                }}
                variant="contained"
            >
                <span style={{fontWeight: 900}}>Next Round!</span>
            </Button>
        ) : (
            <Button
                onClick={handleEndRound}
                style={{
                    color: theme.white,
                    borderColor: theme.white,
                    borderWidth: '2px',
                    width: mobile ? '70%' : '50%',
                    margin: '10px auto'
                }}
                variant="contained"
                color="error"
            >
                <span style={{fontWeight: 900}}>End Game</span>
            </Button>
        )}
    </Box>
  );
};

export default CurrentScore;

