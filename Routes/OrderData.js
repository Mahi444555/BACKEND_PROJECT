//here we creating Routes for orders Schema here we accessing that Schema 
const express = require('express')
const router = express.Router() //its same as const app = express() calling and assining i.e. app.post()..thes use in mongodb
//here same router.post()  , router.get()  ... in mongoose
const Order = require('../models/Orders');   //here we accessing that Schema

router.post('/OrderData', async (req, res) => {
    let data = req.body.order_data          //these Order_data accessin form frontend Cart.js and email also
    await data.splice(0, 0, { Order_date: req.body.order_date })  //0000000000000000000000000

    // if email not existing in db then create : else: Insertmany()
    let eId = await Order.findOne({ 'email': req.body.email })
    console.log(eId)
    if (eId === null) {
        try {
           // console.log(email)
           // console.log(data)
            await Order.create({
                email: req.body.email,
                order_data:[data],
                order_date:req.body.order_date
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("server Error", error.message)
        }
    }

    else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push:{order_data: data } }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }

})

module.exports = router