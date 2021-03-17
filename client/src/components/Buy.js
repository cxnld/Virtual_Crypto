import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios'

import 'fontsource-roboto'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'

const useStyles = makeStyles((theme) => ({
    mainContainer: { //backgroundColor: theme.palette.primary.light,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    textField: {
        margin: '0px 10px'
    },
    button: {
        backgroundColor: theme.palette.primary.light,
        height: '50px',
        width: '55px',
        fontWeight: 'bold'
    }
}));



const Buy = ({ coinInfo }) => {
    const classes = useStyles()
    const [balance, setBalance] = useState(0)
    const [buyQuantity, setBuyQuantity] = useState('')
    const [totalCost, setTotalCost] = useState('')
    const [sellQuantity, setSellQuantity] = useState('')
    const [totalSale, setTotalSale] = useState('')
    const history = useHistory()
    const [toggle, setToggle] = useState(true)
    const [owned, setOwned] = useState(false)
    const [ownedQuantity, setOwnedQuantity] = useState('')

    function handleToggle() {
        setToggle(!toggle)
    }

    // this is where we send to api
    const onSubmitBuy = () => {
        const data = {
            name: coinInfo.id,
            quantity: +buyQuantity,
            price_paid_per: coinInfo.market_data.current_price.usd  
        }
        console.log(balance)
        if (data.quantity*data.price_paid_per > balance) {
            alert('You do not have enough money to purchase.')
        } else {
            alert('Purchase successful.')
            history.push('/portfolio')
            axios.post(`http://localhost:3001/browse/${coinInfo.id}/buy`, data)
        }
    }

    const onSubmitSell = () => {
        const data = {
            name: coinInfo.id,
            quantity: +sellQuantity,
            price_sold_per: coinInfo.market_data.current_price.usd  
        }
        if (data.quantity > ownedQuantity) {
            alert('You do not have enough coins to sell')
        } else {
            alert('Sale successful.')
            history.push('/portfolio')
            axios.post(`http://localhost:3001/browse/${coinInfo.id}/sell`, data)
        }
    }


    useEffect(() => {
        axios.get("http://localhost:3001/portfolio").then((res) => {
            for (var i=0; i<res.data.length; i++) {
                if (res.data[i].name === coinInfo.id) {
                    setOwnedQuantity(res.data[i].quantity)
                    setOwned(true)
                }
                if (res.data[i].name === 'cash') {
                    setBalance(res.data[i].quantity)
                }
            }
        })
    }, [])


    return (
        <Container className={classes.mainContainer}>
            {owned &&
                <Switch
                    onChange={handleToggle}
                    color="default"
                />
            }

            {toggle ?
                <form>
                    <TextField
                        className={classes.textField}
                        type='number'
                        label='Buy Quantity'
                        variant="outlined"
                        onChange={(event) => {
                            setBuyQuantity(event.target.value)
                            setTotalCost(event.target.value*coinInfo.market_data.current_price.usd)
                        }}
                    />
                    <TextField
                        className={classes.textField}
                        label='Total Cost'
                        variant="standard"
                        disabled={true}
                        value={`$${totalCost.toLocaleString()}`}
                    />
                    <Button className={classes.button} onClick={onSubmitBuy} >Buy</Button>
                </form>
            :
                <form>
                    <TextField
                        className={classes.textField}
                        type='number'
                        label='Sell Quantity'
                        variant="outlined"
                        onChange={(event) => {
                            setSellQuantity(event.target.value)
                            setTotalSale(event.target.value*coinInfo.market_data.current_price.usd)
                        }}
                    />
                    <TextField
                        className={classes.textField}
                        label='Total Sale'
                        variant="standard"
                        disabled={true}
                        value={`$${totalSale.toLocaleString()}`}
                    />
                    <Button className={classes.button} onClick={onSubmitSell} >Sell</Button>
                </form>
            }

        </Container>

    )
}

export default Buy