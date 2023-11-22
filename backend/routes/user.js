const express=require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const { User } = require('../modals/User');
const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');
const sendEamail = require('../cors/email');
const { fetchUser } = require('../middleware/fetchUser');
const { useRouteError } = require('react-router-dom');
const JWT_SECRET = "arunrekha"

// Route1:signupuser using credentials /api/user/createuser no login required
router.post('/createuser',[
    body("name","Name must be atleast 3 characters").exists().isLength({min:3}),
    body("email","Enter the correct form of email").exists().isEmail(),
    body("password","Password  must be atleast 7 characters").exists().isLength({min:7})
],async(req,res)=>{
   const errors = validationResult(req);
   if(!errors.isEmpty()){
    return errors.mapped()
   }

      let success = '';
   const {name,email,password,cpassword} = req.body;
//    handle duplicate key error
     let user = await User.findOne({email:req.body.email});
     if(user){
        return res.status(400).json("user already exists");
     }
    //  adding the validation whether password is equal to the cpassword
    success= false;
    if(req.body.cpassword!==password){
        return res.status(400).json(success,"enter the same password");
    }
    //    hashing the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt)
     user = await new User({
       name, email,password:hash,
     }).save();

    //  creating the jwt token to verify user
    const data = {
        user:{
            id:user.id
        }
    };

    const authtoken = jwt.sign(data,JWT_SECRET);
    const url ="http://localhost:5000/api/user/getuser"
    console.log(url)
    await sendEamail(user.email,"Verifying email",url)
    success = true;
    console.log(user)
// return res.redirect(201,url);
     return res.status(200).json({success,authtoken});

});


// Route2: login user using credentials /api/user/loginuser no login required
router.post('/loginuser',async(req,res)=>{
    
    let success = ''
    let user = await User.findOne({email:req.body.email});
    if(!user){
        success=false;
        return res.status(400).json(success,"Invalid credentials")
    }
    console.log(user);
    const pass = await bcrypt.compare(req.body.password,user.password);
    console.log(pass);
    // compare the password
    
    if(!pass){
        success=false
        return res.status(400).json(success,"Invalid Credentials");
    }
    if(!user.verified){
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET);
        const url = "http://localhost:5000/api/user/getuser";
        await sendEamail(user.email,"Verifying email",url);
        
        console.log(user)
        success=true
        res.status(200).send({success,
             authtoken
        
        });
    }
     res.status("loginsuccesfully");
})


// Router:3 get the user using /api/user/getuser login required
router.get('/getuser',fetchUser,async(req,res)=>{
    try {
        const userid = req.user.id;
        let user = await User.findById(userid).select('-password');
        user.verified=true
        console.log(user)
        return res.status(200).json(user)
        // return res.redirect(201,'http://localhost:5000/api/user/loginuser');
    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
   
})







module.exports = router;