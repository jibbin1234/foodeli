const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "AennapalielMathaiMonJibbin";

router.post("/createuser",
[ body('email','Invalid email').isEmail(),
  body('name').notEmpty(),
  body('password','Invalid password').isLength({min:5}) ],
async (req,res)=>{
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt);
    try {
        await  User.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: secPassword
        })
        res.json({success:true})
    } catch (error) {
        console.log(error);
        res.json({success:false})
    }
})

router.post("/loginuser",
[ body('email','Invalid email').isEmail(),
  body('password','Invalid password').isLength({min:5}) ],    
async (req,res)=>{
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }
    let email = req.body.email;
    try {
        let userData = await User.findOne({email});
        if(!userData){
            return res.status(400).json({errors:"Invalid email"});
        }
        const passwordCompare = bcrypt.compare(req.body.password,userData.password);
        if(!passwordCompare){
            return res.status(400).json({errors: "Invalid password"});
        }
        const data = {
            user:{
                id:userData.id
            }
        }
        const authToken = jwt.sign(data,jwtSecret)
        return res.json({success:true, authToken:authToken});
    } catch (error) {
        console.log(error);
        res.json({success:false}) 
    }
})
module.exports = router;