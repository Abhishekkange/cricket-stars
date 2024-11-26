const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/user-model'); // Updated import for your User schema
const fetchUser = require("../middleware/fetchUser");
const { otpgeneration, OTP } = require('../middlewares/sendotp');
const constants = require('../constants');
const registerController = require('../controllers/register-controller.js')
const loginController = require('../controllers/login-controller.js')
const serviceController = require('../controllers/service-controller.js')

const Router = express.Router();
const saltRounds = 10;


// Register User
Router.post('/register',registerController.register);

// Verify OTP
Router.post('/verifyotp',serviceController.verifyOtp);

// Login User
Router.post('/login',loginController.login);

// Forgot Password
Router.post('/forgotpassword',loginController.forgetpassword);

// Verify OTP for Password Reset
Router.post('/forgotpassword/verifyotp',serviceController.forgetpasswordotp);

// Update Password
Router.post('/forgotpassword/update',loginController.updatePassword);

module.exports = Router;
