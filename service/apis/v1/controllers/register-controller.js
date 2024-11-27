//Regiquired Imports
const { register } = require("module");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const User = require('../models/user-model.js'); // Updated import for your User schema
const saltRounds = 10;
const constants = require('../constants.js')


//Helper function
//  Nodemailer Config
async function sendOTPByEmail(email, otp, userName) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'Abhishekkange00@gmail.com', // Replace with your email
      pass: 'omfi djkw vzxn xrde', // Replace with app-specific password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: 'Abhishekkange00@gmail.com',
    to: email,
    subject: constants.title+' Verification OTP',
    html: `
    <p>Hello ${userName},</p>
    <p>Your OTP for verification is: <strong>${otp}</strong>.</p>
    `,
  };

  return transporter.sendMail(mailOptions);
}


//Required Functions
async function registerHandler(req,res)
{
    try {
        const { email, phone, username, password } = req.body;
    
        // Check if user exists
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists. Please log in.' });
        }
    
        // Hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
        // Send OTP for email verification
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Random 6-digit OTP
        await sendOTPByEmail(email, otp, username);

        // Save user to DB
        const newUser = new User({
          email,
          phone,
          username,
          password: hashedPassword,
          otp:otp,
          isVerified:false
        });
    
        await newUser.save();
    
        res.status(201).json({ message: 'User registered. Verify your email.', otp });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
}

module.exports = {registerHandler}