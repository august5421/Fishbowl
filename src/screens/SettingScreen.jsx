import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, TextField } from "@mui/material";
import { resetPlayerIndex, setNumberOfEntries, setScrollPosition, setSettingDrawer, setTimeLimit } from '../actions/actions';
import LogoFont from "../components/LogoFont";
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const SettingScreen = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const numberOfEntries = useSelector((state) => state.numberOfEntries);
  const timeLimit = useSelector((state) => state.timeLimit);

  const handleNumberOfEntriesChange = (value) => {
    dispatch(setScrollPosition('main', -200));
    dispatch(setScrollPosition('onBoardingBlock', -100));
    if (value >= 3 && value <= 6) {
      dispatch(setNumberOfEntries(value));
      dispatch(resetPlayerIndex([{ playerName: '', entries: Array(value).fill('') }]));
    }
  };

  const handleCloseDrawer = () => {
    dispatch(setSettingDrawer(false));
  };

  const handleIncrement = (x) => {
    if (x === 'entries') {
        if (numberOfEntries < 6) {
            handleNumberOfEntriesChange(numberOfEntries + 1);
        }
    } else if (x === 'timeLimit') {
        if (timeLimit < 120) { 
            dispatch(setTimeLimit(timeLimit + 15)); 
        }
    }
  };

  const handleDecrement = (x) => {
    if (x === 'entries') {
        if (numberOfEntries > 3) {
            handleNumberOfEntriesChange(numberOfEntries - 1);
        }
    } else if (x === 'timeLimit') {
        if (timeLimit > 30) { 
            dispatch(setTimeLimit(timeLimit - 15)); 
        }
    }
  };

  return (
    <Box style={{display: 'flex', flexDirection: 'column', padding: '16px', color: theme.white}}>
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 10,
        }}
      >
        <IconButton onClick={handleCloseDrawer} style={{color: theme.white}}>
          <CloseIcon />
        </IconButton>
      </Box>
      <LogoFont text="Settings" color={theme.white} fontSize="30px" fontWeight={600} />
      <Divider style={{borderColor: theme.white, margin: '10px 0px 14px 0px'}} />
      <LogoFont text="Time Limit" color={theme.white} fontSize="20px" fontWeight={600} />
      <Box style={{display: "flex", flex: 1, flexDirection: 'row', margin: '15px 0px'}} alignItems="center">
        <Box style={{display: "flex", flex: 1, flexDirection: 'column'}} alignItems="center">
            <IconButton onClick={() => handleDecrement('timeLimit')} style={{ color: theme.white }}>
                <RemoveIcon />
            </IconButton>
        </Box>
        <Box style={{display: "flex", flex: 1, flexDirection: 'column'}} alignItems="center">
            <TextField
                type="number"
                value={timeLimit}
                inputProps={{ min: 30, max: 120, step: 15, style: { textAlign: 'center', color: theme.white } }}
                style={{ marginBottom: '10px', width: '100px', color: theme.white }}
                InputLabelProps={{
                    style: { color: theme.white },
                }}
                InputProps={{
                    style: { color: theme.white, textAlign: 'center', borderColor: theme.white },
                }}
            />
        </Box>
        <Box style={{display: "flex", flex: 1, flexDirection: 'column'}} alignItems="center">
            <IconButton onClick={() => handleIncrement('timeLimit')} style={{ color: theme.white }}>
                <AddIcon />
            </IconButton>
        </Box>
      </Box>
      <Divider style={{borderColor: theme.white, margin: '10px 0px 14px 0px'}} />
      <LogoFont text="Number of Entries" color={theme.white} fontSize="20px" fontWeight={600} />
      <Box style={{display: "flex", flex: 1, flexDirection: 'row', margin: '15px 0px'}} alignItems="center">
        <Box style={{display: "flex", flex: 1, flexDirection: 'column'}} alignItems="center">
            <IconButton onClick={() => handleDecrement('entries')} style={{ color: theme.white }}>
                <RemoveIcon />
            </IconButton>
        </Box>
        <Box style={{display: "flex", flex: 1, flexDirection: 'column'}} alignItems="center">
            <TextField
                type="number"
                value={numberOfEntries}
                onChange={(e) => handleNumberOfEntriesChange(parseInt(e.target.value, 10))}
                inputProps={{ min: 3, max: 6, style: { textAlign: 'center', color: theme.white } }}
                style={{ marginBottom: '10px', width: '100px', color: theme.white }}
                InputLabelProps={{
                    style: { color: theme.white },
                }}
                InputProps={{
                    style: { color: theme.white, textAlign: 'center', borderColor: theme.white },
                }}
            />
        </Box>
        <Box style={{display: "flex", flex: 1, flexDirection: 'column'}} alignItems="center">
            <IconButton onClick={() => handleIncrement('entries')} style={{ color: theme.white }}>
                <AddIcon />
            </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingScreen;
