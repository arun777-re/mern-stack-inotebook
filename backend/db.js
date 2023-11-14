const mongoose = require('mongoose');

const main = async()=>{
    const uri = "mongodb://127.0.0.1:27017/tyagi"
   mongoose.connect(uri);
   console.log("Server is connected to database")
};

main().catch((err)=>{
    console.log("connection refused"); 
});


module.exports = {main}


// file to connect server with database