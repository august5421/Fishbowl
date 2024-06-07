import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, IconButton, Typography, Drawer, Button, Fade } from '@mui/material';
import { setScrollPosition, setSettingDrawer, setScreenState, resetPlayerIndex, setTeams, setNumberOfEntries, setPlayerCount, setTimeLimit } from './actions/actions';
import SettingsIcon from '@mui/icons-material/Settings';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import LogoFont from './components/LogoFont';
import PlayerForm from './components/PlayerForm';
import SettingScreen from './screens/SettingScreen';
import GameScreen from './screens/GameScreen';
import sound from './assets/mp3/bubbles.mp3';
import './app.css';

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const screenState = useSelector((state) => state.screenState);
  const scrollPosition = useSelector((state) => state.scrollPosition);
  const playerIndex = useSelector((state) => state.playerIndex);
  const settingDrawer = useSelector((state) => state.settingDrawer);
  const mobile = useSelector((state) => state.mobile);

  // Utility function to find the nearest multiple of 100
  const nearestMultipleOf100 = (value) => {
    return Math.round(value / 100) * 100;
  };

  // useEffect to listen for changes in scrollPosition.onBoardingBlock
  useEffect(() => {
    if (scrollPosition.onBoardingBlock % 100 !== 0) {
      const correctedPosition = nearestMultipleOf100(scrollPosition.onBoardingBlock);
      dispatch(setScrollPosition('onBoardingBlock', correctedPosition));
    }
  }, [scrollPosition.onBoardingBlock, dispatch]);

  const handleScroll = () => {
    if (scrollPosition.main > -1900) {
      dispatch(setScrollPosition('main', scrollPosition.main - 100));
    }
    dispatch(setScrollPosition('onBoardingBlock', scrollPosition.main - 100));
    const audio = new Audio(sound);
    audio.play().catch((error) => {
      console.error('Failed to play audio:', error);
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
    dispatch(resetPlayerIndex([{ playerName: '', entries: ['', '', ''] }]));
    dispatch(setNumberOfEntries(3));
    dispatch(setTimeLimit(60));
    dispatch(setPlayerCount(1));
    dispatch(setTeams({ teamOne: [], teamTwo: [] }));
  };

  const handlePlay = () => {
    const players = [...playerIndex];
    const shuffledPlayers = players.sort(() => 0.5 - Math.random());
    const filteredPlayers = shuffledPlayers.filter((player) => player.playerName !== '');
    dispatch(resetPlayerIndex(filteredPlayers));
    const midIndex = Math.ceil(filteredPlayers.length / 2);
    const teamOne = filteredPlayers.slice(0, midIndex).map((player) => player.playerName);
    const teamTwo = filteredPlayers.slice(midIndex).map((player) => player.playerName);

    dispatch(setTeams({ teamOne, teamTwo }));

    dispatch(setScrollPosition('main', 0));
    dispatch(setScrollPosition('onBoardingBlock', 0));
    const audio = new Audio(sound);
    audio.play().catch((error) => {
      console.error('Failed to play audio:', error);
    });
    setTimeout(() => {
      dispatch(setScreenState('game'));
    }, 250);
  };

  return (
    <>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'top 1s ease-in-out',
          height: 'calc(100vh * 20)',
          position: 'absolute',
          top: `${scrollPosition.main}vh`,
          left: 0,
          right: 0,
          backgroundImage: `linear-gradient(360deg, ${theme.black} 0%, ${theme.blueOne} 20%, ${theme.blueTwo} 58%, ${theme.blueThree} 100%)`,
        }}
      ></Box>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          transition: 'top 1s ease-in-out',
          height: 'calc(100vh * 19)',
          top: `${scrollPosition.onBoardingBlock}vh`,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 11,
          }}
        >
          <IconButton style={{ color: theme.white }} onClick={handleSettings}>
            <SettingsIcon style={{ color: theme.white }} />
          </IconButton>
        </Box>
        <Fade in={playerIndex.length >= 4}>
          <Box
            sx={{
              position: 'fixed',
              top: 16,
              right: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 11,
            }}
          >
            {screenState === 'start' ? (
              <IconButton style={{ color: theme.white }} onClick={handlePlay}>
                <PlayArrowIcon style={{ color: theme.white }} />
              </IconButton>
            ) : (
              <IconButton style={{ color: theme.white }} onClick={handleStop}>
                <StopIcon style={{ color: theme.white }} />
              </IconButton>
            )}
          </Box>
        </Fade>
        {screenState === 'game' && (
          <Fade in={screenState === 'game'}>
            <Box style={{ display: 'flex', flex: 1, width: '100vw' }}>
              <GameScreen />
            </Box>
          </Fade>
        )}
        <Fade in={screenState === 'start'}>
          <Box>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
              }}
            >
              <LogoFont text="Fishbowl" color={theme.white} fontSize="60px" fontWeight={600} />
              <Button
                onClick={handleScroll}
                style={{
                  color: theme.white,
                  borderColor: theme.white,
                }}
                variant="outlined"
              >
                Start!
              </Button>
            </Box>
            {playerIndex.map((player, index) => (
              <Box
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                }}
              >
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
};

export default App;
