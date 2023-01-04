//here we creating Schema for orders which comming from frontend by users and we storing that in db
const mongoose = require('mongoose')
const {Schema} = mongoose //here we destructuring the mongoose we can access/fetch data from mongoose which conneceted to mongoURI or we can send from here
            
const OrderSchema = new Schema({ //here created Schema object 

    email:{
        type:String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required:true,
    },
});

module.exports=mongoose.model("orders",OrderSchema) //here creating "orders" ie. collection and passing OrderSchema 


