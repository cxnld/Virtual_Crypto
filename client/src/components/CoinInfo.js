import { React, useState, useEffect } from 'react'
import axios from 'axios'

import Buy from './Buy'

import 'fontsource-roboto'
import Container from '@material-ui/core/Container'
import CardMedia from '@material-ui/core/CardMedia'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import { Line } from 'react-chartjs-2'

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '80%',
        padding: '30px 40px 10px'
    },
    buttonContainer: { //backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%'
    },
    infoText: { //backgroundColor: 'lightblue',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '400  px',
        maxWidth: '400px',
    },
    rowName: { //backgroundColor: 'purple',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: '10px'
    },
    smallText: {
        margin: '5px'
    },
    textGroup: {
        margin: '5px 20px'
    },
    pos: {
        color: 'green'
    },
    neg: {
        color: 'red'
    },
    infoGraph: { //backgroundColor: 'pink',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '30px',
        paddingBottom: '50px',
        width: '100%'
    },
    button: {
        backgroundColor: theme.palette.primary.light,
        height: '45px',
        width: '55px'
    },
    icon: {
        height: '50px',
        width: '50px',
        marginRight: '10px',
    }
}));

const CoinInfo = ({ match }) => {
    const classes = useStyles()
    const [loading1, setLoading1] = useState(true)
    const [loading2, setLoading2] = useState(true)
    const [coinInfo, setCoinInfo] = useState([])
    const [graphData, setGraphData] = useState([])
    const [labelData, setLabelData] = useState([])

    const sign = (value) => {
        return(value > 0 ? classes.pos : classes.neg)
    }

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${match.params.id}?tickers=false`)
        .then((res) => { //console.log(res.data)
            setCoinInfo(res.data)
            setLoading1(false)
        })
        .catch(() => { alert('Something went wrong during retrieval.') })


        const end = Math.round((Date.now()/1000))
        const start = Math.round((Date.now()/1000))-2592000
        axios.get(`https://api.coingecko.com/api/v3/coins/${match.params.id}/market_chart/range?vs_currency=usd&from=${start}&to=${end}`)
        .then((res) => {
            const data = res.data.prices.map((item) => {
                return {x: item[0], y: item[1]}
            })
            const label = res.data.prices.map((item) => {
                var date = new Date(item[0])
                return `${date.getMonth()}-${date.getDate()}`
            })
            setGraphData(data)
            setLabelData(label)
            setLoading2(false)
        })
        .catch(() => { alert('Something went wrong during retrieval.') })
    }, [match.params.id])


    return (
        <Container className={classes.mainContainer} disableGutters={true}>
            {(!loading1 && !loading2) ?
                <Container className={classes.infoContainer} disableGutters={true}>
                    <Container className={classes.infoText} disableGutters={true}>
                        <Container className={classes.rowName} disableGutters={true}>
                            <CardMedia className={classes.icon} component="img" src={coinInfo.image.large}></CardMedia>
                            <Typography variant='h4'>{coinInfo.name} ({coinInfo.symbol.toUpperCase()})</Typography>
                        </Container>
                        
                        <Container className={classes.textGroup} disableGutters={true}>
                            <Typography variant='h5'>Market Cap:</Typography>
                            <Typography variant='h6'>${coinInfo.market_data.market_cap.usd.toLocaleString()}</Typography>
                        </Container>

                        <Container className={classes.textGroup} disableGutters={true}>
                            <Typography variant='h5'>Current Price:</Typography>
                            <Typography variant='h6'>${coinInfo.market_data.current_price.usd.toLocaleString()}</Typography>
                        </Container>

                        <Container className={classes.textGroup} disableGutters={true}>
                            <Typography variant='h5'>24h Change:</Typography>
                            <Typography
                                variant='h6'
                                className={sign(coinInfo.market_data.price_change_percentage_24h)}
                            >
                                {coinInfo.market_data.price_change_percentage_24h}%
                            </Typography>                        
                        </Container>

                        <Container className={classes.textGroup} disableGutters={true}>
                            <Typography variant='h5'>7d Change:</Typography>
                            <Typography
                                variant='h6'
                                className={sign(coinInfo.market_data.price_change_percentage_7d)}
                            >
                                {coinInfo.market_data.price_change_percentage_7d}%
                            </Typography>                       
                        </Container>

                        <Container className={classes.textGroup} disableGutters={true}>
                            <Typography variant='h5'>30d Change:</Typography>
                            <Typography
                                variant='h6'
                                className={sign(coinInfo.market_data.price_change_percentage_30d)}
                            >
                                {coinInfo.market_data.price_change_percentage_30d}%
                            </Typography>
                        </Container>
                    </Container>
                    
                    <Container className={classes.infoGraph} disableGutters={true}>
                        <Line
                            data={{
                                labels: labelData,
                                datasets: [{
                                    data: graphData,
                                    pointRadius: 0.01,
                                    borderColor: 'rgba(48, 164, 223, 1)',
                                    backgroundColor: 'rgba(48, 164, 223, 0)',
                                    borderWidth: 1.2
                                }]
                            }}
                            options={{ maintainAspectRatio: false, responsive: true, legend: false}}
                        
                        />
                    </Container>
                </Container> 
                :
                <Typography>Loading...</Typography>
            }


            {!loading1 &&
                <Container className={classes.buttonContainer} disableGutters={true}>
                    <Buy coinInfo={coinInfo} owned={match.params.owned}/>
                </Container>
            }

        </Container>
    )
}

export default CoinInfo
