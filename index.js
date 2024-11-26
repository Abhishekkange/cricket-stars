const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const connectToMongoose = require('./service/apis/v1/db/db')

//mongo db connection


const app = express();

//middleware
app.use('/api/v1',require('./service/apis/v1/routers/auth-router')) //AUTHENTICATION ROUTE


app.listen(PORT,()=>{

    console.log("Listening at PORT "+PORT);
        
})
