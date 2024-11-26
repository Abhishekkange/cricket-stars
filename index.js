const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

//mongo db connection


const app = express();

//middleware




app.listen(PORT,()=>{

        console.log("Listening at PORT "+PORT);
        
})
