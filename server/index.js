const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
   user: "root",
   host: "localhost",
   password: "123123",
   database: "crypto_project",
});

app.get("/portfolio", (req, res) => {
    db.query("SELECT * FROM portfolio", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.post('/browse/:id/buy', (req, res) => {
    const name = req.body.name
    const quantity = req.body.quantity
    const price_paid_per = req.body.price_paid_per
    console.log(req.body)

    // Add the coins to the portfolio.
    db.query(`SELECT * FROM portfolio WHERE name = '${name}'`, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (result.length === 1) {
                var newQuantity = +quantity + +result[0].quantity
                var newAvgPricePaid = ((quantity*price_paid_per)+(result[0].quantity*result[0].average_price_paid))/newQuantity
                db.query(`UPDATE portfolio SET quantity = ${newQuantity}, average_price_paid = ${newAvgPricePaid} WHERE name = '${name}'`, (err, result) => {
                    if (err) { console.log(err) } else { res.send(result) }
                })
            } else {
                console.log('User does not own coin, creating new entry.')
                db.query('INSERT INTO portfolio (name, quantity, average_price_paid) VALUES (?,?,?)', [name, quantity, price_paid_per], (err, result) => {
                    if (err) { console.log(err) } else { res.send(result) }
                })
            }
        }
    })

    // Update cash balance.
    db.query(`SELECT * FROM portfolio WHERE name = 'cash'`, (err, result) => {
        console.log(result[0].quantity)

        console.log(name)
        console.log(quantity)
        console.log(price_paid_per)
        var newBalance = result[0].quantity - ( quantity * price_paid_per )
        console.log('newBalance: ', newBalance)
        db.query(`UPDATE portfolio SET quantity = ${newBalance} WHERE name = 'cash'`, (err, result) => {
            if (err) { console.log(err) } else { console.log('Cash balance updated.') }
        })
    })

})

app.post('/browse/:id/sell', (req, res) => {
    const name = req.body.name
    const quantity = req.body.quantity
    const price_sold_per = req.body.price_sold_per
    console.log(req.body)

    db.query(`SELECT * FROM portfolio WHERE name = '${name}'`, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (result.length === 1) {
                var newQuantity = +result[0].quantity - +quantity

                if (newQuantity === 0) {
                    db.query(`DELETE FROM portfolio where name = '${name}'`, (err, result) => {
                        if (err) { console.log(err) } else { res.send(result) }
                    })
                } else {
                    db.query(`UPDATE portfolio SET quantity = ${newQuantity} WHERE name = '${name}'`, (err, result) => {
                        if (err) { console.log(err) } else { res.send(result) }
                    })
                }
            } else {
                console.log('Error, more than one entry was found. Only one entry per name should exist')
            }
        }
    })

    db.query(`SELECT * FROM portfolio WHERE name = 'cash'`, (err, result) => {
        console.log(result[0].quantity)

        var newBalance = result[0].quantity + ( quantity * price_sold_per )
        console.log('newBalance: ', newBalance)
        db.query(`UPDATE portfolio SET quantity = ${newBalance} WHERE name = 'cash'`, (err, result) => {
            if (err) { console.log(err) } else { console.log('Cash balance updated.') }
        })
    })


})


app.listen(3001, () => {
   console.log("Yey, your server is running on port 3001");
});