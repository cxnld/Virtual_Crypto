import React from 'react'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: 275,
        marginTop: '10px',
        padding: '5px 20px'
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    mktcaprank: {
        marginRight: '15px',
        width: '23px',
    },
    image: {
        height: '20px',
        width: '20px',
        marginRight: '10px',
    },
    name: {
        width: '170px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    symbol: {
        marginRight: '50px',
        width: '60px',
        textTransform: 'uppercase',
    },
    price: {
        marginRight: '15px',
        width: '110px',
        textAlign: 'right'
    },
    mktcap: {
        marginRight: '15px',
        width: '185px',
        textAlign: 'right'
    },
    change24pos: {
        marginRight: '15px',
        width: '120px',
        color: 'green',
        textAlign: 'right'
    },    
    change24neg: {
        marginRight: '15px',
        width: '120px',
        color: 'red',
        textAlign: 'right'
    },

}));

const CoinBrief = ({ coin }) => {
    const classes = useStyles();
    const change24color = (coin.price_change_percentage_24h > 0) ? classes.change24pos : classes.change24neg

    return (
        <Card className={classes.card} raised={true}>
            <CardActionArea className={classes.content} disableRipple={true} component={Link} to={`/browse/${coin.id}`}>
                <Typography className={classes.mktcaprank}  variant="h6">   {coin.market_cap_rank}                     </Typography>
                <CardMedia className={classes.image} component="img" src={coin.image}></CardMedia>
                <Typography className={classes.name}        variant="h6">   {coin.name}                                </Typography>
                <Typography className={classes.symbol}      variant="h6">   {coin.symbol}                              </Typography>
                <Typography className={classes.price}       variant="h6">   ${coin.current_price.toLocaleString()}     </Typography>
                <Typography className={change24color}       variant="h6">   {coin.price_change_percentage_24h}%        </Typography>
                <Typography className={classes.mktcap}      variant="h6">   ${coin.market_cap.toLocaleString()}        </Typography>
            </CardActionArea>
        </Card>
    )
}

export default CoinBrief
