const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model.js'); // Updated import for your User schema


async function login(req,res)
{
    const { emailOrPhone, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      '7211821',
      { expiresIn: '7d' } // Token valid for 7 days
    );

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


async function forgetpassword(req,res){

    const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Random 6-digit OTP
    await sendOTPByEmail(email, otp, user.username);

    res.json({ message: 'OTP sent to your email', otp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending OTP', error: error.message });
  }
}

async function updatePassword(req,res)
{
    const { email, newPassword } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  
      const user = await User.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
  
      if (user) {
        res.json({ message: 'Password updated successfully', user });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating password', error: error.message });
    }
}

module.exports = {login,forgetpassword,updatePassword}