const express = require('express');
const registerController = require('../controllers/register-controller.js')
const loginController = require('../controllers/login-controller.js')
const serviceController = require('../controllers/service-controller.js')
const Router = express.Router();



// Register User
Router.post('/register',registerController.registerHandler);

// Verify OTP
Router.post('/verifyotp',registerController.verifyOtp);

// Login User
Router.post('/login',loginController.login);

//JWT verification : Get userId from JWT
Router.post('/getUserId', registerController.verifyJwt);

// Forgot Password
Router.post('/forgotpassword',loginController.forgetpassword);

// Verify OTP for Password Reset
Router.post('/forgotpassword/verifyotp',serviceController.forgetpasswordotp);

// Update Password
Router.post('/forgotpassword/update',loginController.updatePassword);

module.exports = Router;
