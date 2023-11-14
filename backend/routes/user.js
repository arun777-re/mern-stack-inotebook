const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "arunrekha";
const {body,validationResult} = require('express-validator');
const User = require('../modals/User');
const { fetchUser } = require('../middleware/fetchUser');

// Route:1 to create the user
router.post('/createuser',[
    body("name","name must be atleast 3 characters").isLength({min:3}),
    body("email","Enter the correct form of email").exists().isEmail(),
    body("password","Password  must be atleast 7 characters").isLength({min:7}),
],async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return errors.mapped()
    }
    const {name,email,password,cpassword} = req.body;
    // handle the duplicate key error
    let user = await User.findOne({email})
    if(user){
        return res.status(400).json("please use a unique email")
    }else{
        // hashing the passwoird using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt);

        user = await User.create({
            name,email,password:hash
        });

        // creates the jwt token

        const data ={
            user:{
                id:user.id
            }
        }

        const authtoken = jwt.sign(data,JWT_SECRET);
        return res.status(200).json({success,authtoken});
    }
});

// Router2: to login the user using "/api/user/loginuser"
router.post('/loginuser',[
    body("email","Please enter the correct form of email").exists().isEmail(),
    body("email","Password must be atleast 7 characters").exists().isLength({min:7}),
],async(req,res)=>{
   const errors = validationResult(req);
   if(!errors.isEmpty()){
    return errors.mapped();
   }
   try {
    const {email,password} = req.body;
    //    check whether the user exists with the same email
    let success = ''
       const user = await User.findOne({email});
       if(!user){
        success = false
        return res.status(400).json({success,error:"Please enter the valid email"})
       }
        // compare the password
        const pass = await bcrypt.compare(password,user.password);
        success = false
        if(!pass){
          return res.status(400).json({success,error:"Invalid Credentials"})
        }
        // send the jwt token
        // payload
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET);
        success = true
        return res.status(200).json({success,authtoken})
    
   } catch (error) {
    return res.status(500).json("Internal Server Error");
   }
 

})


// Route:3 to get the user using /api/user/getuser login required
router.get('/getuser',fetchUser,async(req,res)=>{
    try {
        const user = req.user.id;
        const users = await User.findById(user).select("-password")
        res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})








module.exports = router;