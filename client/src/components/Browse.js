import CoinBrief from './CoinBrief'

import axios from "axios"
import { useState, useEffect } from 'react'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import 'fontsource-roboto'

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: '100%',
        padding: '0px 45px 20px',
    },
    coinContainer: {
        marginBottom: '20px',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        color: 'white', 
        backgroundColor: '#c51162',
        margin: '0px 7px'
    },

    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '10px',
    },
    mktcaprank: {
        width: '20px',
        marginLeft: '18px',
        marginRight: '50px'
    },
    name: {
        marginRight: '136px',
    },
    symbol: {
        marginRight: '120px',
    },
    price: {
        marginRight: '95px',
    },
    change24: {
        marginRight: '135px',
    },

}));

const Browse = () => {
    const classes = useStyles()
    const [coins, setCoins] = useState([])
    const [page, setPage] = useState(1)

    // on start and on page change, call api then setCoins, setCoins issues a render and the page updates with the correct coins
    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=11&page=${page}&sparkline=false`)
        .then((res) => {
            setCoins(res.data);
        })
        .catch(() => { alert('Something went wrong during retrieval.') })
    }, [page])


   return (
        <Container className={classes.mainContainer} disableGutters={true}>

            <Container className={classes.coinContainer} disableGutters={true}>

                <Container className={classes.header} disableGutters={true}>
                    <Typography className={classes.mktcaprank}>#</Typography>
                    <Typography className={classes.name}>Name</Typography>
                    <Typography className={classes.symbol}>Symbol</Typography>
                    <Typography className={classes.price}>Price</Typography>
                    <Typography className={classes.change24}>24h</Typography>
                    <Typography>Mkt Cap</Typography>
                </Container>

                {coins.map((coin, index) => {
                    return(
                        <CoinBrief key={index} coin={coin}></CoinBrief>
                    )
                })}

            </Container>

            <Container className={classes.buttonContainer}> 
                <Button 
                    className={classes.button} 
                    variant='contained' 
                    disableRipple={true}
                    onClick={() => {
                        setPage(page-1)
                    }}
                    disabled={page===1 ? true : false}
                >
                    Prev
                </Button>

                <Typography>Page {page}</Typography>

                <Button disableFocusRipple={true}
                    className={classes.button} 
                    variant='contained' 
                    disableRipple={true}
                    onClick={() => {
                        setPage(page+1)
                    }}
                >
                    Next
                </Button>
            </Container>
        </Container>
   )
}

export default Browse
