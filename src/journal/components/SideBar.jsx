import { Avatar, Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import { SideBarItem } from "./";

export const SideBar = ({ drawerWidth, container, handleDrawerToggle, mobileOpen }) => {

    const { displayName, photoURL } = useSelector( state => state.auth );
    const { notes } = useSelector( state => state.journal )

    return (
    <Box
        component='nav'
        sx={{ width: {sm: drawerWidth}, flexShrink: { sm: 0 } }}
    >
        <Drawer
            container={container}
            variant='temporary' //temporary
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
            keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
        
        >
            {/* drawer */}
            <Toolbar sx={{ gap: '20px'}}>
                <Avatar src={photoURL}/>
                <Typography variant='h6' noWrap component='div'>{displayName}</Typography>
            </Toolbar>
            <Divider/>
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>Diarios</Typography>
            </Toolbar>

            <List>
                {
                    notes.map( note => (
                        <SideBarItem key={note.id} {...note}/>
                    ))
                }
            </List>
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <Toolbar sx={{ gap: '20px'}}>
                <Avatar src={photoURL}/>
                <Typography variant='h6' noWrap component='div'>{displayName}</Typography>
            </Toolbar>
            <Divider/>
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>Diarios</Typography>
            </Toolbar>

            <List>
                {
                    notes.map( note => (
                        <SideBarItem key={note.id} {...note}/>
                    ))
                }
            </List>
        </Drawer>

    </Box>
    )
}
