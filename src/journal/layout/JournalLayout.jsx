
import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { NavBar, SideBar } from "../components";

const drawerWidth = 250;

export const JournalLayout = ({ children }, props) => {


  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const container = window !== undefined ? () => window().document.body : undefined;
    
  return (
    <Box sx={{ display: 'flex' }}>

      {/* NavBar */}
      <NavBar drawerWidth={ drawerWidth } handleDrawerToggle={handleDrawerToggle}/>

      {/* SideBar */}
      <SideBar drawerWidth={ drawerWidth } handleDrawerToggle={handleDrawerToggle} container={container} mobileOpen={mobileOpen} />
      
      {/* MAIN */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2.9,
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />
          { children }
      </Box>

    </Box>
  );
  }
  