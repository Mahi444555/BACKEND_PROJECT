//These Schema we don't need becuase Login page don't want any Schema we only cheking which user entring data i.e.
//email and password they are matching or not if yes then successfully login or give error form
// form the user.js body we fetching backend data so no need to create Schema for login page we don't want 
// to create collection for these page and stored data ...
//here we creating Schema for Login page and connecting with mongoose Schema mongoURI
const mongoose = require('mongoose')

const {Schema} = mongoose   //here we destructuring the mongoose which connected to mongoURI online cloud we can access/fetch the online data or
                                //or we can send the data from here 

const loginSchema = new Schema({        //now create the object for Schema and create Schema body
    email:{
        type : String,
        require:true
    },
    password:{
        type:String,
        require:true
    }

})

module.exports=mongoose.model("loginUser",loginSchema)  //here we exporting module and creating collection of name: "loginUser" and exporting loginSchema
