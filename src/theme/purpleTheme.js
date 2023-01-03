import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const purpleTheme = createTheme({
    palette: {
        primary: {
            // main: '#262254'
            main: '#2D4263'
        },
        secondary: {
            main: '#A12568'
        },
        error: {
            main: red.A400
        }
    }
})

