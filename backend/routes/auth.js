const express = require('express');
const router = express.Router();
const User = require('../models/Users.js');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");

// Route 1 : Create a user using POST "/api/auth/createuser" 
router.post('/createuser',[
   body('email','Enter valid Email').isEmail(),
   body('name','Name must be atleast 3 characters').isLength({ min: 3}),
   body('password','Password must be atleast 3 characters').isLength({ min: 3})
],async (req,res)=>{
   const errors = validationResult(req);
   //validation check post
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
         //  check if user with the email already exists
         let user = await User.findOne({ email: { $eq: req.body.email } });
         if(user){
            return res.status(400).json({"error":"User already exists with this email"});
         }
         let salt = await bcrypt.genSalt(10);
         let secPass= await bcrypt.hash(req.body.password, salt);
         //user creation
            user = User.create({
            name : req.body.name,
            email : req.body.email,
            password: secPass,
         })

         //generating JWT token
         const data = {
            user :{
               id : user.id
            }
         }
         const JWT_SECRET="sacchuisagood boy";
         const authToken = jwt.sign(data,JWT_SECRET);

         res.json({authToken});
      } catch (error) {
         //catching errors 
         console.error(error);
         res.status(500).send("Some Error Occured");
      }
})

// Route 2 : Authenticate a user using POST "/api/auth/login" 
router.post('/login',[
   body('email','Enter valid Email').isEmail(),
   body('password','Password could not be blank').exists()
],async (req,res)=>{
   const errors = validationResult(req);
   //validation check post
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try {
         //  check if user exists
         let user = await User.findOne({email});
         if(!user){
            return res.status(400).json({"error":"Please login with correct credentials"});
         }
         let passCompare = await bcrypt.compare(password, user.password);
         if(!passCompare){
            return res.status(400).json({"error":"Please login with correct credentials"});
         }

         //generating JWT token
         const data = {
            user :{
               id : user.id
            }
         }
         const JWT_SECRET="sacchuisagoodboy";
         const authToken = jwt.sign(data,JWT_SECRET);

         res.json({authToken});
      } catch (error) {
         //catching errors 
         console.error(error);
         res.status(500).send("Some Error Occured");
      }
})

// Route 3 : Authenticate a user using POST "/api/auth/login" 
router.post('/getuser',fetchuser ,async (req,res)=>{
   try {
      userID=req.user.id;
      const user = await User.findById(userID).select("-password");
      res.json(user);
   } catch (error) {
       //catching errors 
       console.error(error);
       res.status(500).send("Some Error Occured");
   }
})

module.exports=router;