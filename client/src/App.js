import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


import Home from './components/Home';
import Portfolio from './components/Portfolio';
import Browse from './components/Browse';
import CoinInfo from './components/CoinInfo';

import 'fontsource-roboto';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import HomeIcon from '@material-ui/icons/Home';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import theme from './theme'

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    mainContainer: {
    
    }, 
    appBar: {
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px'
    },
    contentContainer: {
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        backgroundColor: '#e5e5e5',
        height: '700px',
        
    },    
    navButton: {
        color: 'white',
        marginRight: '20px'
    },
}));


function App() {
  const classes = useStyles();

  return (
    <div className='App'>
        <Router>
            <ThemeProvider theme={theme}>
                <Container className={classes.mainContainer} disableGutters={true} maxWidth="md">
                    <AppBar position="static" className={classes.appBar}>
                        <Toolbar>
                            <Button className={classes.navButton} startIcon={<HomeIcon/>}           component={Link} to=''>             Home        </Button>
                            <Button className={classes.navButton} startIcon={<MonetizationOnIcon/>} component={Link} to='/portfolio'>   Portfolio   </Button>
                            <Button className={classes.navButton} startIcon={<ShoppingCartIcon/>}   component={Link} to='/browse'>      Browse      </Button>
                        </Toolbar>
                    </AppBar>

                    <Container className={classes.contentContainer} disableGutters={true}>
                        <Switch>
                            <Route path='/' exact component={Home}></Route>
                            <Route path='/portfolio' exact component={Portfolio}></Route>
                            <Route path='/browse' exact component={Browse}></Route>
                            <Route path='/browse/:id' exact component={CoinInfo}></Route>
                        </Switch>
                    </Container>
                </Container>
            </ThemeProvider>
        </Router>
    </div>
  );
}

export default App;