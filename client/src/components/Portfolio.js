import axios from 'axios'
import PortfolioCoins from './PortfolioCoins'

import { useState, useEffect } from 'react'

import 'fontsource-roboto'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { Line } from 'react-chartjs-2'

const useStyles = makeStyles((theme) => ({
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    equity: { //backgroundColor: '#eb4034',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%',
    },
    graph: { //backgroundColor: '#96eb34',
        display: 'flex',
        flexDirection: 'column',
        height: '45%',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    positions: { //backgroundColor: '#f030d3',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '45%',
        padding: '30px'
    }
}))

const Portfolio = () => {
    const classes = useStyles()
    const [coins, setCoins] = useState([])
    const [cash, setCash] = useState(0)
    const [equity, setEquity] = useState(0)

    const getPortfolio = () => {
        axios.get("http://localhost:3001/portfolio").then((res) => {
            let cash = res.data.find(item => item.name === 'cash').quantity
            setCash(cash)
            let noCash = res.data.filter(coin => coin.name !== 'cash')
            const requests = []
            for (const coin of noCash) {
                requests.push(
                    axios.get(`https://api.coingecko.com/api/v3/coins/${coin.name}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
                    .then((res) => {
                        coin.current_price = res.data.market_data.current_price.usd
                        return coin
                    })
                )
            }
            Promise.all(requests).then((data) => {
                calcEquity(data, cash)
                setCoins(data)
            })
        })
    }

    const calcEquity = (coins, cash) => {
        var val = 0
        for (const coin of coins) {
            val += (coin.quantity * coin.current_price)
        }
        setEquity(val+cash)
    }

    useEffect(() => {
        getPortfolio()
    }, [])


    return (
        <>
            <Container className={classes.contentContainer} disableGutters={true}>
                <Container className={classes.equity}>
                    <Typography variant='h3'>${equity.toFixed(2)}</Typography>
                    <Typography variant='h6'>${cash.toFixed(2)} Available to trade</Typography>
                    
                </Container>
                <Container className={classes.graph}>
                    <Line
                        data={{
                            labels: ['day 1', 'day 2', 'day 3'],
                            datasets: [{
                            data: [15,7,17],
                            pointRadius: 0.01,
                            borderColor: 'rgba(48, 164, 223, 1)',
                            backgroundColor: 'rgba(48, 164, 223, 0)',
                            borderWidth: 1.2
                            }]
                        }}
                        width={500}
                        options={{ maintainAspectRatio: false, responsive: true, legend: false}}
                    />
                </Container>
                <Container className={classes.positions}>
                    <PortfolioCoins coins={coins} />
                </Container>
            </Container>
        </>
    )
}

export default Portfolio