const mongoose = require('mongoose');
require('dotenv').config();

let connection;

const connectToMongoose = () => {
  if(!connection) {
    
    const uri = process.env.MONGO_URL; // Use environment variable for MongoDB connection URI
    const dbName = "cricket_stars"; // Your database name
  
   connection =  mongoose.connect(`${uri}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log("Connection is successful.");
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
      });
    
  }

};


// Invoke the function to establish the connection immediately
connectToMongoose();

module.exports = connectToMongoose;