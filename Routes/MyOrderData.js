//here we are creating routes for ordered data of user to show when click on orderData button 
const express = require('express');
const Orders = require('../models/Orders');
const router = express.Router();    //here accessing router() from express in mongooose router.post()... 
                                        //in mongodb we do like: const app = express() : app.post()...

//access here Schema   which used in two routers i.e. OrderData.js and MyOrderData.js
const Order = require('../models/Orders');   //here we accessing that Schema

router.post('/myorderData', async(req,res)=>{

    try {
        let myData = await  Order.findOne({'email':req.body.email}) //here we accessing requesting email from frontend and findOne()method gives that user all order mathced with email
        res.json({orderData:myData})

    } catch (error) {
        res.send("Server Error", error.massage)
    }
})


module.exports=router;
