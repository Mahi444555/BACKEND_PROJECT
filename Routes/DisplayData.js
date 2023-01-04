//now we creating routs for DisplayData
const express = require("express")
const router = express.Router();    //its same as const app = express() indside mongodb but in mongoose we use express.Router()
                                    //like in mongodb: app.post(),app.get().., same router.post(),router.get()..
                    //here we not accessing to connect any Schema data 

router.post("/foodData",async(req,res)=>{
    try {
        // console.log(global.food_items);
        await  res.send([global.food_items,  global.food_category])   //here we using gobal declared variable which is present inside db.js which assigned by "data" which we fetching from backed i.e. sample(food_items) & category
    } catch (error) {
        console.log(error) 
        res.send("server error");
    }
})

module.exports=router