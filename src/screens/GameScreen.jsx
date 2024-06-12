import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import LogoFont from "../components/LogoFont";
import { setOrder } from '../actions/actions'
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortablePlayer from '../components/SortablePlayer';
import { Button, Fade, Typography } from '@mui/material';
import { setGameState, setTeams } from '../actions/actions';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import InstructionSlide from '../components/InstructionSlide';
import ClueLoop from '../components/ClueLoop';
import CurrentScore from '../components/CurrentScore';

const GameScreen = (props) => {
    const theme = useSelector((state) => state.theme);
    const teams = useSelector((state) => state.teams);
    const mobile = useSelector((state) => state.mobile);
    const gameState = useSelector((state) => state.gameState);
    const order = useSelector((state) => state.order);
    const dispatch = useDispatch();

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const oldTeam = teams.teamOne.includes(activeId) ? 'teamOne' : 'teamTwo';
        const newTeam = teams.teamOne.includes(overId) ? 'teamOne' : 'teamTwo';

        if (oldTeam === newTeam) {
            const newItems = arrayMove(teams[oldTeam], teams[oldTeam].indexOf(activeId), teams[oldTeam].indexOf(overId));
            dispatch(setTeams({ ...teams, [oldTeam]: newItems }));
        } else {
            const newOldTeam = teams[oldTeam].filter(player => player !== activeId);
            const newNewTeam = [...teams[newTeam].slice(0, teams[newTeam].indexOf(overId)), activeId, ...teams[newTeam].slice(teams[newTeam].indexOf(overId))];
            dispatch(setTeams({ teamOne: oldTeam === 'teamOne' ? newOldTeam : newNewTeam, teamTwo: oldTeam === 'teamTwo' ? newOldTeam : newNewTeam }));
        }
    };

    const handleStart = () => {
        dispatch(setGameState(null))
        setTimeout(() => {
            dispatch(setGameState('roundOneInstruct'))    
        }, 500)
        const combinedTeams = [];
        for (let i = 0; i < Math.max(teams.teamOne.length, teams.teamTwo.length); i++) {
            if (teams.teamOne[i]) combinedTeams.push(teams.teamOne[i]);
            if (teams.teamTwo[i]) combinedTeams.push(teams.teamTwo[i]);
        }
        dispatch(setOrder(combinedTeams));
        console.log(teams)
    }
    useEffect(() => {console.log(order)}, [order])
    return (
        <Box style={{display: 'flex', flexDirection: "column", flex: 1, alignItems: 'center', height: '100vh', zIndex: 10, padding: '16px'}}>
            <LogoFont text="Fishbowl" color={theme.white} fontSize="30px" fontWeight={600} />
            {gameState !== null && gameState == 'teamBuild' ? (
                <Fade in={gameState == 'teamBuild'}>
                    <Box style={{display: 'flex', flexDirection: "column", flex: 1, width: '100%', paddingTop: '16px'}}>
                        <Box style={{display: 'flex', flexDirection: "row", width: '100%', paddingTop: '16px'}}>
                            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                <SortableContext items={teams.teamOne.concat(teams.teamTwo)} strategy={verticalListSortingStrategy}>
                                    <Box style={{display: 'flex', flex: 1, flexDirection: "column", alignItems: 'center'}}>
                                        <LogoFont text="Team One" color={theme.white} fontSize="25px" fontWeight={600} />
                                        {teams.teamOne.map((player) => (
                                            <SortablePlayer key={player} id={player} player={player} theme={theme} mobile={mobile} icon='left' />
                                        ))}
                                    </Box>
                                    <Box style={{display: 'flex', flex: 1, flexDirection: "column", alignItems: 'center'}}>
                                        <LogoFont text="Team Two" color={theme.white} fontSize="25px" fontWeight={400} />
                                        {teams.teamTwo.map((player) => (
                                            <SortablePlayer key={player} id={player} player={player} theme={theme} mobile={mobile} icon='right' />
                                        ))}
                                    </Box>
                                </SortableContext>
                            </DndContext>
                        </Box>
                        <Button
                            onClick={handleStart}
                            style={{
                                color: theme.white,
                                borderColor: theme.white,
                                borderWidth: '2px',
                                margin: '10px auto'
                            }}
                            variant="contained"
                        >
                            <span style={{fontWeight: 900}}>Start!</span>
                        </Button>
                    </Box>
                </Fade>
            ) : (
                <Box style={{display: 'flex', flex: 1, width: '100%'}}>
                    {gameState !== null && gameState == 'actualGame' && (
                        <Fade in={gameState == 'actualGame'}>
                            <Box style={{display: 'flex', flex: 1, width: '100%'}}>
                                <ClueLoop />
                            </Box>
                        </Fade>
                    )}
                    {gameState !== null && gameState == 'currentScore' && (
                        <Fade in={gameState == 'currentScore'}>
                            <Box style={{display: 'flex', flex: 1, width: '100%'}}>
                                <CurrentScore  handleStop={props.handleStop} />
                            </Box>
                        </Fade>
                    )}
                    {gameState !== null && gameState == 'roundOneInstruct' && (
                        <Fade in={gameState == 'roundOneInstruct'}>
                            <Box>
                                <InstructionSlide round={0} />
                            </Box>
                        </Fade>
                    )}
                    {gameState !== null && gameState == 'roundTwoInstruct' && (
                        <Fade in={gameState == 'roundTwoInstruct'}>
                            <Box>
                                <InstructionSlide round={1} />
                            </Box>
                        </Fade>
                    )}
                    {gameState !== null && gameState == 'roundThreeInstruct' && (
                        <Fade in={gameState == 'roundThreeInstruct'}>
                            <Box>
                                <InstructionSlide round={2} />
                            </Box>
                        </Fade>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default GameScreen;
