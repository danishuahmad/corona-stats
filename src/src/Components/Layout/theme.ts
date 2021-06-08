import { createMuiTheme } from "@material-ui/core/styles"
const defaultTheme = createMuiTheme({
    palette: {
        background: {
            default: "#CAD3C8"
        },
        primary: {
            main: "#c23616",
            contrastText: "#FFF",
        },
        secondary: {
            main: "#FFF",
            contrastText: "##2f3640",
        },
    }
})

export default defaultTheme