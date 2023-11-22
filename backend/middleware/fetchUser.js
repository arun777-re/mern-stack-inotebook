
const jwt = require('jsonwebtoken');
const JWT_SECRET = "arunrekha"

const fetchUser =  (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(400).json("please authenticate using a valid token");
    }

    try {
        const data = jwt.verify(token,JWT_SECRET);
         req.user = data.user
    next();
    } catch (error) {
        return res.status(500).json({error:"Internal server error"})
    }
    
}


module.exports = {fetchUser}