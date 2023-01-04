const mongoose = require('mongoose')
 
const { Schema } = mongoose;   //destructuring the mongoose which connected to mongoURI cloud so using Schema variable we passing data inside of mongoose  
                                //send data from here destructuring the all data which stored mongoose(online) and storing inside of schema 

const UserSchema = new Schema({     //here we created Schema object 
    name:{
        type:String,
        required: true
    },

    email:{
        type:String,
        required:true
    },

    mobile:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('user',UserSchema)  //where 'user' is collection which we creating and with that exporting UserSchema which holds entire schema


