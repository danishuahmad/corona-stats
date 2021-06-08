import { Link, Typography } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            bottom: 0,
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
            backgroundColor: theme.palette.primary.main
        },
    }),
);

function Warning() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography align='center' color={"secondary"} variant="h6" component="h6">
                This app is using 
                <Link color={"inherit"} href="https://github.com/marlon360/rki-covid-api">
                    {" RKI-Covid-API "}
                </Link>
                <br/>
                It has a request limit of <b>15</b> requests/min.
            </Typography>
        </div>
    );
}

export default Warning