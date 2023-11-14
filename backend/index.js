const express =require('express');
const cors = require('cors');
 const bodyparser  =require('body-parser')
const app = express();
const main = require('./db')

const port = 5000;



// middlewares
app.use(express.json())
app.use(cors());
app.use(bodyparser.json());



// routes
app.use("/api/user",require('./routes/user'));
app.use("/api/notes",require('./routes/notes'));



app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})