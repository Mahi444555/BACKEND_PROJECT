//here we are using mongoose to connect with backed not with mongodb i.e. MongoClient 
const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const app = express();  //calling express method
// const port =5000
const port = process.env.PORT  || 5000
app.use(express.json())

////////middleware
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})



const createConnection = require("./db")         //here we accessing mongoDB method from ./db file and from here we calling that method to executes
createConnection();


app.get("/", (req,res)=>{
    res.send("hello world!")
})

app.use('/api', require("./Routes/CreateUser"));     //created routers path : calling / accessing  that Route api has user data
app.use('/api', require('./Routes/CreatLogin'));
app.use('/api', require('./Routes/DisplayData'));   //these routes calling/accessing from Routes=>DisplayData which used to display/get foot-itesm and category 
app.use('/api', require('./Routes/OrderData'));
app.use('/api', require('./Routes/MyOrderData'));       
app.listen(port, ()=>{
    console.log("server is running on " + port);
})