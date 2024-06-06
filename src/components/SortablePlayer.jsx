import React from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import Box from '@mui/material/Box';
import LogoFont from "./LogoFont";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const SortablePlayer = ({ id, player, theme, mobile, icon }) => {
    const { attributes, listeners, setNodeRef: setDraggableNodeRef, transform, transition } = useDraggable({
        id
    });
    const { setNodeRef: setDroppableNodeRef } = useDroppable({
        id
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        color: theme.blueThree,
        backgroundColor: theme.white,
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        width: mobile ? '70%' : '50%',
        padding: '10px',
        margin: '5px 0px',
        cursor: 'grab',
        position: 'relative'
    };

    return (
        <Box ref={node => { setDraggableNodeRef(node); setDroppableNodeRef(node); }} style={style} {...attributes} {...listeners}>
            <DragIndicatorIcon style={{ color: theme.blueThree, position: 'absolute', right: icon === 'right' ? 0 : 'auto', left: icon !== 'right' ? 0 : 'auto' }} />
            <LogoFont text={player} color={theme.blueThree} fontSize="20px" fontWeight={600} />
        </Box>
    );
};

export default SortablePlayer;
