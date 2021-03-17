import { useHistory } from 'react-router-dom';

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 500,
        maxHeight: 300,
        position: 'relative',
        overflow: 'auto',
    }
}))

const PortfolioCoins = ({ coins }) => {
    const classes = useStyles()
    const history = useHistory()
    console.log(coins)

    return (
        <List className={classes.root} disablePadding={true}>
            <ListItem>
                <ListItemText 
                    style={{
                        display:'flex',
                        justifyContent:'flex-start',
                        width: '0px', 
                    }}
                    primary={'Name'} />
                <ListItemText
                    style={{
                        display:'flex',
                        justifyContent:'center',
                        width: '10%', 
                    }}
                    primary={'Quantity'} />
                <ListItemText
                    style={{
                        display:'flex',
                        justifyContent:'center',
                        width: '10%', 
                    }}
                    primary={'Total Value'} />
            </ListItem>
            <Divider />

            {coins.map((coin, index) => {
                return (
                    <ListItem key={index} button onClick={() => {history.push(`/browse/${coin.name}`)}} >
                        <ListItemText 
                            style={{
                                display:'flex',
                                justifyContent:'flex-start',
                                width: '0px', 
                            }}
                            primary={coin.name} />
                        <ListItemText
                            style={{
                                display:'flex',
                                justifyContent:'center',
                                width: '10%',
                            }}
                            primary={coin.quantity} />
                        <ListItemText
                            style={{
                                display:'flex',
                                justifyContent:'center',
                                width: '10%', 
                            }}
                            primary={`$${(coin.quantity*coin.current_price).toFixed(2)}`} />
                    </ListItem>
                )
            })}
        </List>
    )
}

export default PortfolioCoins