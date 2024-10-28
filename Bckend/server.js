require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT=process.env.PORT || 8008
const bodyparser=require('body-parser')

const connectDB=require('./database/connection')

 const router =require('./Routes/auth.routes')

connectDB()
app.use(express.json())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));  

const corsOptions = {
    origin:'*',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type','Authorization']
}
app.use(cors(corsOptions))


app.use('/api/auth',router)


app.listen(PORT,()=>{
    console.log('Server runing on port',PORT)
})