import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        background: {
            default: '#13C983'
        }
    },
    typography: {
        fontFamily: [
            '"Jura"',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'sans-serif',
            '"Apple Color Emoji"'
            ].join(','),
    }
})

export default theme;
