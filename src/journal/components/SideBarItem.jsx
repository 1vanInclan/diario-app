import { TurnedInNot, StickyNote2 } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNow } from '../../store/journal';


export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {

    const dispatch = useDispatch()

    const onClickNote = () => {
        dispatch(setActiveNow({title, body, id, date, imageUrls}));
    }

    const newTitle = useMemo( () => {
        return title.length > 17
            ? title.substring(0,17) + '...'
            : title;
    },[title] )



    return (
        <ListItem disablePadding>
            <ListItemButton onClick={onClickNote}>
                <ListItemIcon>
                    <StickyNote2 color='secondary'/>
                </ListItemIcon>
                <Grid container sx={{alignItems: 'center'}}>
                    <ListItemText primary={newTitle}/>
                    <ListItemText secondary={body}/>
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
