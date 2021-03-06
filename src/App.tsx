import AppBar from "./src/Components/Layout/AppBar"
import Dashboard from "./src/Components/Dashboard/Index"
import Warning from "./src/Components/Alerts/Warning"
import { MuiThemeProvider } from "@material-ui/core/styles"
import defaultTheme from "./src/Components/Layout/theme"
import CssBaseline from "@material-ui/core/CssBaseline"

function App() {
  return (
        <MuiThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppBar />
            <Dashboard/>
            <Warning />
        </MuiThemeProvider>
    )
}

export default App;
