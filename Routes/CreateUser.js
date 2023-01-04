 const express = require('express')
 const router = express.Router();   //accessing Router() method which stored inside express 
                                    //as we write const app = express(): app.get/post/put... then same here we using router(): router.post()...
const User = require('../models/User')  //here we importing that UserSchema presnt inside => ../models/User
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



router.post("/creatuser", 

        [   //here we validating the email & password

            body('email').isEmail(),
            // password must be at least 5 chars long
            body('password','err Invalid password  5 character!!').isLength({ min: 5 })
        ],

async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    //here we converting password into bcrypt format which coming from req from postman's body
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt)

    try {
       await User.create({
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mobile,
            // password:req.body.password
            password:secPassword
        })
        // res.json({success:true});

        res.send({msg:"data stored successfully"})

    } catch (error) {
        console.log(error)
        // res.json({success:false});
        res.send({msg:"something went wrong try again"})
        
    }
})

module.exports = router;