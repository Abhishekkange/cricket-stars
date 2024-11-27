const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const connectToMongoose = require('./service/apis/v1/db/db')

//mongo db connection
connectToMongoose();



const app = express();

//middleware to parse json
app.use(express.json());

//middleware
app.use('/api/v1',require('./service/apis/v1/routers/auth-router')) //AUTHENTICATION ROUTE
app.use('/api/v1',require('./service/apis/v1/routers/product-router')) //PRODUCT ROUTE


app.listen(PORT,()=>{

    console.log("Listening at PORT "+PORT);
        
})
