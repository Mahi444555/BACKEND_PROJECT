//here we creating routes for login page and accessing Schema from ../models/Login  here nedd express()
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require('express')
const jwtSecret = "MynameisEndtoEndyouTubeChannel$#"
const router = express.Router();  //its same as const app = express()  : app.post(), app.get(), app.put... and 
//here we accessing router() from express() method: router.post, router.get()...
// const User = require('../models/Login') //here we accessing that Schema module 


//but now we don't need schema for these login page we just entering emailid and password & checking 
//is entered email and password is correct / matched with any email&password which already created in models/User Schema hence we using/accessing ../models/User Schema

const User = require('../models/User')

router.post("/creatlogin",
    [   //here we validating the email & password

        body('email').isEmail(),
        // password must be at least 5 chars long
        body('password', 'err Invalid password  5 character!!').isLength({ min: 5 })
    ],

    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        let email = req.body.email;   //these email coming from postman's body or inputFiled and assing to email

        try {
            let userData = await User.findOne({ email });   //findOne() returns entire obecet if email/ any key matched which we passing here

            console.log(userData);

            if (!userData) {        //so now userData storing entire object which we findOne 
                return res.status(400).send({ msg: "use correct emailId" })
            }


            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)  //here we we checking if login page password is match with database bcrypted password or not


            if (!pwdCompare) {
                return res.status(400).send({ msg: "use correct password" })

            }
            const data = {
                user: {
                    id: userData.id         //here userData is connected to database from ther we access id assing to id => user
                }
            }
            const authToken = jwt.sign(data, jwtSecret)
            return res.send({ msg: "Sucessfully login", authToken: authToken })
            // return res.send({success:true,authToken:authToken})



        } catch (error) {
            console.log(error)
            res.status(400).send({ msg: "someting went wrong" });
        }
    })
module.exports = router
