import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import 'fontsource-roboto';

const useStyles = makeStyles((theme) => ({
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        borderRadius: '15px'
    },
    text: {
        marginBottom: '30px'
    }
}));

const Home = () => {
    const classes = useStyles();

    return (
        <Container className={classes.contentContainer}>
            <Typography className={classes.text} variant='h3'>Welcome to VirtualCrypto</Typography>
            <Typography className={classes.text}variant='h4'>Click on the tabs above to begin</Typography>
            <img
                className={classes.img}
                src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
                alt="new"
            />
        </Container>
    )
}

export default Home