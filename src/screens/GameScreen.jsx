import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import LogoFont from "../components/LogoFont";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortablePlayer from '../components/SortablePlayer';
import { setTeams } from '../actions/actions';

const GameScreen = () => {
    const theme = useSelector((state) => state.theme);
    const teams = useSelector((state) => state.teams);
    const mobile = useSelector((state) => state.mobile);
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

    return (
        <Box style={{display: 'flex', flexDirection: "column", flex: 1, alignItems: 'center', height: '100vh', zIndex: 10, padding: '16px'}}>
            <LogoFont text="Fishbowl" color={theme.white} fontSize="30px" fontWeight={600} />
            <Box style={{display: 'flex', flexDirection: "row", flex: 1, width: '100%', paddingTop: '16px'}}>
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={teams.teamOne.concat(teams.teamTwo)} strategy={verticalListSortingStrategy}>
                        <Box style={{display: 'flex', flex: 1, flexDirection: "column", alignItems: 'center'}}>
                            <LogoFont text="Team One" color={theme.white} fontSize="30px" fontWeight={600} />
                            {teams.teamOne.map((player) => (
                                <SortablePlayer key={player} id={player} player={player} theme={theme} mobile={mobile} icon='left' />
                            ))}
                        </Box>
                        <Box style={{display: 'flex', flex: 1, flexDirection: "column", alignItems: 'center'}}>
                            <LogoFont text="Team Two" color={theme.white} fontSize="30px" fontWeight={400} />
                            {teams.teamTwo.map((player) => (
                                <SortablePlayer key={player} id={player} player={player} theme={theme} mobile={mobile} icon='right' />
                            ))}
                        </Box>
                    </SortableContext>
                </DndContext>
            </Box>
        </Box>
    );
};

export default GameScreen;
