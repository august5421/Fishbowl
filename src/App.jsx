import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Typography, Drawer } from '@mui/material';
import LogoFont from './components/LogoFont';
import { Button, Fade } from '@mui/material';
import './app.css';
import { setScrollPosition, setSettingDrawer, setScreenState, resetPlayerIndex, setTeams, setNumberOfEntries, setTimeLimit, setPlayerCount, setAllEntries, setOrder, setGameState, setActiveEntry, setTeamOneScore, setTeamTwoScore, setActiveTeam, setActivePlayer, setActiveRound } from './actions/actions';
import PlayerForm from './components/PlayerForm.jsx';
import SettingsIcon from '@mui/icons-material/Settings';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SettingScreen from './screens/SettingScreen.jsx';
import sound from './assets/mp3/bubbles.mp3';
import GameScreen from './screens/GameScreen.jsx';
import StopIcon from '@mui/icons-material/Stop';

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const teams = useSelector((state) => state.teams);
  const screenState = useSelector((state) => state.screenState);
  const scrollPosition = useSelector((state) => state.scrollPosition);
  const playerIndex = useSelector((state) => state.playerIndex);
  const settingDrawer = useSelector((state) => state.settingDrawer);
  const mobile = useSelector((state) => state.mobile);
  const playerErrors = useSelector((state) => state.playerErrors);
  const useGlobalInputBlurListener = () => {
    useEffect(() => {
      const handleBlur = (event) => {
        if (event.target.tagName === 'INPUT') {
          document.documentElement.scrollTop = 0;
        }
      };
      document.addEventListener('blur', handleBlur, true);
      return () => {
        document.removeEventListener('blur', handleBlur, true);
      };
    }, []);
  };
  useGlobalInputBlurListener();
  const handleScroll = () => {
    if (scrollPosition.main > -1900) {
      dispatch(setScrollPosition('main', scrollPosition.main - 100));
    }
    dispatch(setScrollPosition('onBoardingBlock', scrollPosition.main - 100));
    const audio = new Audio(sound);
    audio.play().catch(error => {
        console.error("Failed to play audio:", error);
    });
  };

  const handleSettings = () => {
    dispatch(setSettingDrawer(true));
  };

  const handleCloseDrawer = () => {
    dispatch(setSettingDrawer(false));
  };

  const handleStop = () => {
    dispatch(setScreenState('start'));
    dispatch(setGameState('teamBuild'));
    dispatch(resetPlayerIndex([{ playerName: '', entries: ['', '', ''] }]));
    dispatch(setNumberOfEntries(3));
    dispatch(setTimeLimit(60)); 
    dispatch(setPlayerCount(1));
    dispatch(setTeams({
      teamOne: [],
      teamTwo: []
    }));
    dispatch(setOrder([]))
    dispatch(setAllEntries([]))
    dispatch(setActiveEntry(0)) 
    dispatch(setTeamOneScore(0)) 
    dispatch(setTeamTwoScore(0))
    dispatch(setActiveTeam('teamOne')) 
    dispatch(setActivePlayer(0)) 
    dispatch(setActiveRound(0))
  }

  const handlePlay = () => {
    const players = [...playerIndex];
    const shuffledPlayers = players.sort(() => 0.5 - Math.random());
    const filteredPlayers = shuffledPlayers.filter(player => player.playerName !== '');
    dispatch(resetPlayerIndex(filteredPlayers));
    const midIndex = Math.ceil(filteredPlayers.length / 2);
    const teamOne = filteredPlayers.slice(0, midIndex).map(player => player.playerName);
    const teamTwo = filteredPlayers.slice(midIndex).map(player => player.playerName);
    const allEntries = playerIndex.map(player => player.entries).flat();
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }const shuffledEntries = shuffle(allEntries);
    dispatch(setTeams({ teamOne, teamTwo }));
    dispatch(setAllEntries(shuffledEntries));
    console.log(shuffledEntries)
    dispatch(setScrollPosition('main', 0));
    dispatch(setScrollPosition('onBoardingBlock', 0));
    const audio = new Audio(sound);
    audio.play().catch(error => {
        console.error("Failed to play audio:", error);
    });
    setTimeout(() => {
        dispatch(setScreenState('game'));
    }, 250);
  };

  const isFourthPlayerComplete = () => {
    if (playerIndex.length < 4) return false;
    const fourthPlayer = playerIndex[3];
    return (
      fourthPlayer.playerName.trim() !== '' &&
      fourthPlayer.entries.every(entry => entry.trim() !== '')
    );
  };

  return (
    <>
      <Box style={{display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'top 1s ease-in-out', height: 'calc(100vh * 20)', position: 'absolute', top: `${scrollPosition.main}vh`, left: 0, right: 0, backgroundImage: 
        `linear-gradient(360deg, ${theme.black} 0%, ${theme.blueOne} 20%, ${theme.blueTwo} 58%, ${theme.blueThree} 100%)`
      }}>
      </Box>
      <Box style={{display: 'flex', flexDirection: "column", alignItems: 'center', position: 'absolute', transition: 'top 1s ease-in-out', height: 'calc(100vh * 19)', top: `${scrollPosition.onBoardingBlock}vh`, left: 0, right: 0, bottom: 0, zIndex: 10}}>
        {screenState === 'start' && (
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
            <IconButton style={{color: theme.white}} onClick={handleSettings}>
              <SettingsIcon style={{color: theme.white}} />
            </IconButton>
          </Box>
        )}
        <Fade in={playerIndex.length >= 4 && isFourthPlayerComplete()}>
          <Box
            sx={{
              position: 'fixed',
              top: 16,
              right: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 11
            }}
          >
            {screenState === 'start' ? (
              <IconButton style={{color: theme.white}} onClick={handlePlay}>
                <PlayArrowIcon style={{color: theme.white}} />
              </IconButton>
            ) : (
              <IconButton style={{color: theme.white}} onClick={handleStop}>
                <StopIcon style={{color: theme.white}} />
              </IconButton>
            )}
          </Box>
        </Fade>
        {screenState === 'game' && (
          <Fade in={screenState === 'game'}>
            <Box style={{display: 'flex', flex: 1, width: '100vw'}}>
              <GameScreen handleStop={handleStop} />
            </Box>
          </Fade>
        )}
        <Fade in={screenState === 'start'}>
          <Box>
            <Box style={{display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
              <LogoFont text="Fishbowl" color={theme.white} fontSize="60px" fontWeight={600} />
              <Button
                onClick={handleScroll}
                style={{
                  color: theme.white,
                  borderColor: theme.white,
                  borderWidth: '2px',
                }} variant="contained">{playerIndex.length == 1 ? (<span style={{fontWeight: 900}}>Start!</span>) : (<span style={{fontWeight: 900}}>Build Teams!</span>)}</Button>
            </Box>
            {playerIndex.map((player, index) => (
                <Box key={index} style={{display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <PlayerForm index={index} />
                </Box>
            ))}
          </Box>
        </Fade>
        
      </Box>
      <Drawer
        open={settingDrawer}
        onClose={handleCloseDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: mobile ? '100%' : '400px',
            height: '100%',
            backgroundColor: theme.grey,
          },
        }}
      >
        
        <SettingScreen />
      </Drawer>
    </>
  );
}

export default App;
