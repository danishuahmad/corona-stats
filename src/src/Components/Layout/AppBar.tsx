import {
    AppBar as MuiAppBar,
    IconButton,
    Toolbar,
    Typography,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import { AppName } from "../../../config/constants"

function AppBar() {
    return (
        <MuiAppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6">{AppName}</Typography>
            </Toolbar>
        </MuiAppBar>
    )
}
export default AppBar
